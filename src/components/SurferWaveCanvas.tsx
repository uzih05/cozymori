'use client';

import { useEffect, useRef } from 'react';

/* ── wave config ───────────────────────────────────────── */
interface WaveLayer {
  freq: number;
  amp: number;
  speed: number;
  color: string;
  opacity: number;
}

const LAYERS: WaveLayer[] = [
  { freq: 1.4, amp: 0.12, speed: 0.55, color: '#7c3aed', opacity: 0.65 },
  { freq: 2.0, amp: 0.08, speed: 0.40, color: '#8b5cf6', opacity: 0.45 },
  { freq: 2.8, amp: 0.06, speed: 0.70, color: '#a78bfa', opacity: 0.28 },
];

const SPRAY_COUNT = 22;
const POINTS = 160;

/* ── spray particle ────────────────────────────────────── */
interface Spray {
  x: number;
  y: number;
  r: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
}

function createSpray(sx: number, sy: number): Spray {
  const angle = -Math.PI * 0.3 + Math.random() * Math.PI * 0.5;
  const speed = 1.5 + Math.random() * 3;
  return {
    x: sx,
    y: sy,
    r: 1 + Math.random() * 3,
    life: 0,
    maxLife: 50 + Math.random() * 70,
    vx: Math.cos(angle) * speed * -1,
    vy: Math.sin(angle) * speed,
  };
}

/* ── wave Y ────────────────────────────────────────────── */
function waveY(nx: number, t: number, layer: WaveLayer, w: number, h: number, baseY: number) {
  const a = layer.amp * Math.min(w * 0.6, h);
  const f = layer.freq;
  const s = layer.speed;
  const y1 = Math.sin(nx * Math.PI * 2 * f + t * s) * a;
  const y2 = Math.sin(nx * Math.PI * 2 * f * 1.8 + t * s * 1.4) * a * 0.35;
  const y3 = Math.sin(nx * Math.PI * 2 * f * 0.5 + t * s * 0.6) * a * 0.2;
  return baseY + y1 + y2 + y3;
}

/* ── component ─────────────────────────────────────────── */
export default function SurferWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    let t = 0;
    let prevTimestamp = 0;
    const sprays: Spray[] = [];

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = (timestamp: number) => {
      raf = requestAnimationFrame(draw);
      if (!prevTimestamp) { prevTimestamp = timestamp; return; }
      const dt = Math.min((timestamp - prevTimestamp) / 1000, 0.05);
      prevTimestamp = timestamp;
      t += dt;

      const w = container.clientWidth;
      const h = container.clientHeight;

      ctx.clearRect(0, 0, w, h);

      const baseY = h * 0.35;

      // wave layers
      for (let li = LAYERS.length - 1; li >= 0; li--) {
        const layer = LAYERS[li];
        const layerBaseY = baseY + li * h * 0.09;

        ctx.beginPath();
        for (let i = 0; i <= POINTS; i++) {
          const nx = i / POINTS;
          const y = waveY(nx, t, layer, w, h, layerBaseY);
          if (i === 0) ctx.moveTo(0, y);
          else ctx.lineTo(nx * w, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, layerBaseY - layer.amp * h * 1.5, 0, h);
        grad.addColorStop(0, layer.color + alphaHex(layer.opacity));
        grad.addColorStop(0.35, layer.color + alphaHex(layer.opacity * 0.6));
        grad.addColorStop(1, '#050508' + alphaHex(layer.opacity * 0.2));
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        for (let i = 0; i <= POINTS; i++) {
          const nx = i / POINTS;
          const y = waveY(nx, t, layer, w, h, layerBaseY);
          if (i === 0) ctx.moveTo(0, y);
          else ctx.lineTo(nx * w, y);
        }
        ctx.strokeStyle = layer.color + alphaHex(layer.opacity * 0.6);
        ctx.lineWidth = li === 0 ? 2 : 1;
        ctx.stroke();
      }

      // spray particles along wave crest
      const dtScale = dt * 60;
      const spawnNx = 0.55 + Math.sin(t * 0.2) * 0.08;
      const spawnY = waveY(spawnNx, t, LAYERS[0], w, h, baseY);
      if (Math.random() < 0.35 * dtScale) {
        sprays.push(createSpray(spawnNx * w, spawnY));
      }

      for (let i = sprays.length - 1; i >= 0; i--) {
        const sp = sprays[i];
        sp.life += dtScale;
        sp.x += sp.vx * dtScale;
        sp.y += sp.vy * dtScale;
        sp.vy += 0.04 * dtScale;

        if (sp.life > sp.maxLife) {
          sprays.splice(i, 1);
          continue;
        }

        const progress = sp.life / sp.maxLife;
        const alpha = progress < 0.12 ? progress / 0.12 : 1 - (progress - 0.12) / 0.88;

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${alpha * 0.55})`;
        ctx.fill();
      }

      if (sprays.length > SPRAY_COUNT * 3) sprays.splice(0, sprays.length - SPRAY_COUNT * 2);
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

function alphaHex(a: number) {
  return Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0');
}
