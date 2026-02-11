'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise3D, curlNoise2D } from '@/lib/simplex';

const PARTICLE_COUNT_DESKTOP = 12000;
const PARTICLE_COUNT_MOBILE = 5000;
const NOISE_SCALE = 0.0018;
const NOISE_SPEED = 0.00012;
const BASE_SPEED = 0.45;
const MOUSE_RADIUS = 150;
const MOUSE_FORCE = 80;

// Phase timing (frames at ~60fps)
const ORBIT_HOLD = 180;       // 3s — pure orbit
const TRANSITION_LEN = 180;   // 3s — blend orbit → free flow

// Amber (#f59e0b) → Cyan (#06b6d4)
const COLOR_AMBER = new THREE.Color(0xf59e0b);
const COLOR_CYAN = new THREE.Color(0x06b6d4);

export default function VectorFieldCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    let w = container.clientWidth;
    let h = container.clientHeight;
    const camera = new THREE.OrthographicCamera(0, w, 0, h, -1, 1);
    camera.position.z = 1;

    // --- Noise ---
    const noise = createNoise3D(42);

    // --- Particles — initial position: spiral rings around center ---
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const vx = new Float32Array(count);
    const vy = new Float32Array(count);

    // Per-particle orbit data (fixed at init)
    const orbitRadius = new Float32Array(count);
    const orbitAngle = new Float32Array(count);    // initial angle
    const orbitSpeed = new Float32Array(count);     // rad/frame
    const orbitDir = new Float32Array(count);       // +1 or -1

    const centerX = w * 0.5;
    const centerY = h * 0.5;
    const maxOrbitR = Math.min(w, h) * 0.42;

    for (let i = 0; i < count; i++) {
      // Distribute in concentric spirals with some randomness
      const t = i / count;
      const r = 30 + t * maxOrbitR + (Math.random() - 0.5) * 60;
      const angle = t * Math.PI * 24 + Math.random() * 0.5; // spiral

      orbitRadius[i] = r;
      orbitAngle[i] = angle;
      orbitSpeed[i] = (0.008 + Math.random() * 0.012) * (isMobile ? 0.8 : 1);
      orbitDir[i] = Math.random() < 0.5 ? 1 : -1;

      positions[i * 3] = centerX + Math.cos(angle) * r;
      positions[i * 3 + 1] = centerY + Math.sin(angle) * r;
      positions[i * 3 + 2] = 0;

      sizes[i] = 1.5 + Math.random() * 2;
      alphas[i] = 0.25 + Math.random() * 0.35;
      COLOR_AMBER.toArray(colors, i * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: { uPixelRatio: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute float aAlpha;
        uniform float uPixelRatio;
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = aAlpha;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float alpha = vAlpha * smoothstep(0.5, 0.05, d);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Mouse ---
    const mouse = { x: -9999, y: -9999 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    // --- Animation ---
    let time = 0;
    let animId = 0;
    let prevTimestamp = 0;
    const tempColor = new THREE.Color();

    const animate = (timestamp: number) => {
      animId = requestAnimationFrame(animate);
      if (!prevTimestamp) { prevTimestamp = timestamp; return; }
      const dtSec = Math.min((timestamp - prevTimestamp) / 1000, 0.05);
      prevTimestamp = timestamp;
      const dtScale = dtSec * 60; // 1.0 at 60fps
      time += dtScale;

      // Phase: 0 = orbit, 1 = free flow
      const rawPhase = (time - ORBIT_HOLD) / TRANSITION_LEN;
      const phase = Math.max(0, Math.min(1, rawPhase));
      // Smooth easing (ease-in-out cubic)
      const t3 = phase < 0.5
        ? 4 * phase * phase * phase
        : 1 - Math.pow(-2 * phase + 2, 3) / 2;

      const cx = w * 0.5;
      const cy = h * 0.5;

      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const colAttr = geometry.getAttribute('color') as THREE.BufferAttribute;
      const sizeAttr = geometry.getAttribute('aSize') as THREE.BufferAttribute;
      const alphaAttr = geometry.getAttribute('aAlpha') as THREE.BufferAttribute;

      for (let i = 0; i < count; i++) {
        const px = positions[i * 3];
        const py = positions[i * 3 + 1];

        // ── Orbit force ──────────────────────────────
        // Update orbit angle
        orbitAngle[i] += orbitSpeed[i] * orbitDir[i] * dtScale;

        // Target orbit position
        const targetX = cx + Math.cos(orbitAngle[i]) * orbitRadius[i];
        const targetY = cy + Math.sin(orbitAngle[i]) * orbitRadius[i];

        // Spring force toward orbit position
        const orbitFx = (targetX - px) * 0.06 * dtScale;
        const orbitFy = (targetY - py) * 0.06 * dtScale;

        // ── Curl noise force ─────────────────────────
        const [noiseX, noiseY] = curlNoise2D(
          noise,
          px * NOISE_SCALE,
          py * NOISE_SCALE,
          time * NOISE_SPEED,
        );
        const noiseFx = noiseX * BASE_SPEED * 0.1 * dtScale;
        const noiseFy = noiseY * BASE_SPEED * 0.1 * dtScale;

        // ── Blend forces based on phase ──────────────
        vx[i] += orbitFx * (1 - t3) + noiseFx * t3;
        vy[i] += orbitFy * (1 - t3) + noiseFy * t3;

        // Mouse repulsion (always active)
        const mdx = px - mouse.x;
        const mdy = py - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = (1 - mDist / MOUSE_RADIUS) * MOUSE_FORCE;
          vx[i] += (mdx / mDist) * force * 0.05 * dtScale;
          vy[i] += (mdy / mDist) * force * 0.05 * dtScale;
        }

        // Damping — tighter during orbit, looser when free
        const damping = 0.88 + t3 * 0.04; // 0.88 → 0.92
        const dampPow = Math.pow(damping, dtScale);
        vx[i] *= dampPow;
        vy[i] *= dampPow;

        // Update position
        positions[i * 3] += vx[i] * dtScale;
        positions[i * 3 + 1] += vy[i] * dtScale;

        // Wrap around
        if (positions[i * 3] < -20) positions[i * 3] = w + 20;
        else if (positions[i * 3] > w + 20) positions[i * 3] = -20;
        if (positions[i * 3 + 1] < -20) positions[i * 3 + 1] = h + 20;
        else if (positions[i * 3 + 1] > h + 20) positions[i * 3 + 1] = -20;

        // Speed-based visuals
        const speed = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
        const speedNorm = Math.min(speed / 4, 1);

        sizes[i] = 1.5 + speedNorm * 2;
        alphas[i] = 0.25 + speedNorm * 0.4;

        tempColor.copy(COLOR_AMBER).lerp(COLOR_CYAN, speedNorm * 0.8);
        tempColor.toArray(colors, i * 3);
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
      alphaAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // --- Resize ---
    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      w = nw;
      h = nh;
      renderer.setSize(nw, nh);
      camera.right = nw;
      camera.bottom = nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'auto' }}
      aria-hidden="true"
    />
  );
}
