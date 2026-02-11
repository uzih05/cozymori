'use client';

import { useEffect, useRef } from 'react';

/* ── wave layer config ─────────────────────────────────── */
interface WaveLayer {
  freq: number;
  amp: number;
  speed: number;
  opacity: number;
}

const LAYERS: WaveLayer[] = [
  { freq: 1.2, amp: 0.09, speed: 0.35, opacity: 0.60 },
  { freq: 1.6, amp: 0.065, speed: 0.25, opacity: 0.45 },
  { freq: 2.0, amp: 0.05, speed: 0.45, opacity: 0.32 },
  { freq: 2.6, amp: 0.04, speed: 0.55, opacity: 0.22 },
];

const FOAM_COUNT = 30;
const POINTS = 160;

/* ── color interpolation ──────────────────────────────── */
// Cyan (#06b6d4) → Violet (#8b5cf6)
const CYAN = { r: 6, g: 182, b: 212 };
const VIOLET = { r: 139, g: 92, b: 246 };

function lerpColor(progress: number): { r: number; g: number; b: number } {
  const t = Math.max(0, Math.min(1, progress));
  return {
    r: Math.round(CYAN.r + (VIOLET.r - CYAN.r) * t),
    g: Math.round(CYAN.g + (VIOLET.g - CYAN.g) * t),
    b: Math.round(CYAN.b + (VIOLET.b - CYAN.b) * t),
  };
}

function colorToHex(c: { r: number; g: number; b: number }) {
  return `#${c.r.toString(16).padStart(2, '0')}${c.g.toString(16).padStart(2, '0')}${c.b.toString(16).padStart(2, '0')}`;
}

/* ── foam particle ─────────────────────────────────────── */
interface Foam {
  x: number;
  y: number;
  r: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
}

function createFoam(w: number, h: number): Foam {
  return {
    x: Math.random(),
    y: h * (0.25 + Math.random() * 0.15),
    r: 1.5 + Math.random() * 3.5,
    life: 0,
    maxLife: 100 + Math.random() * 140,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -(0.4 + Math.random() * 0.8),
  };
}

/* ── wave Y helper ─────────────────────────────────────── */
function waveY(nx: number, t: number, layer: WaveLayer, w: number, h: number, baseY: number, breathe: number) {
  const a = layer.amp * Math.min(w * 0.6, h) * breathe;
  const f = layer.freq;
  const s = layer.speed;
  const y1 = Math.sin(nx * Math.PI * 2 * f + t * s) * a;
  const y2 = Math.sin(nx * Math.PI * 2 * f * 1.7 + t * s * 1.3) * a * 0.35;
  const y3 = Math.sin(nx * Math.PI * 2 * f * 0.6 + t * s * 0.7) * a * 0.2;
  return baseY + y1 + y2 + y3;
}

function alphaHex(a: number) {
  return Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0');
}

/* ── component ─────────────────────────────────────────── */
interface Props {
  scrollProgressRef: React.RefObject<number>;
}

export default function UnifiedWaveCanvas({ scrollProgressRef }: Props) {
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
    const foams: Foam[] = [];

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
      const progress = scrollProgressRef.current ?? 0;
      const color = lerpColor(progress);
      const hex = colorToHex(color);

      // Secondary color (lighter variant)
      const lightColor = lerpColor(Math.max(0, progress - 0.15));
      const lightHex = colorToHex({
        r: Math.min(255, lightColor.r + 40),
        g: Math.min(255, lightColor.g + 40),
        b: Math.min(255, lightColor.b + 40),
      });

      ctx.clearRect(0, 0, w, h);

      const breathe = 1 + Math.sin(t * 0.3) * 0.15;
      const baseY = h * 0.38;

      // Layer colors based on progress
      const layerColors = [hex, hex, lightHex, lightHex];

      // wave layers (back to front)
      for (let li = LAYERS.length - 1; li >= 0; li--) {
        const layer = LAYERS[li];
        const layerBaseY = baseY + li * h * 0.08;
        const layerColor = layerColors[li];

        ctx.beginPath();
        for (let i = 0; i <= POINTS; i++) {
          const nx = i / POINTS;
          const y = waveY(nx, t, layer, w, h, layerBaseY, breathe);
          if (i === 0) ctx.moveTo(0, y);
          else ctx.lineTo(nx * w, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, layerBaseY - layer.amp * h * 1.5, 0, h);
        grad.addColorStop(0, layerColor + alphaHex(layer.opacity));
        grad.addColorStop(0.35, layerColor + alphaHex(layer.opacity * 0.6));
        grad.addColorStop(1, '#050508' + alphaHex(layer.opacity * 0.2));
        ctx.fillStyle = grad;
        ctx.fill();

        // stroke
        ctx.beginPath();
        for (let i = 0; i <= POINTS; i++) {
          const nx = i / POINTS;
          const y = waveY(nx, t, layer, w, h, layerBaseY, breathe);
          if (i === 0) ctx.moveTo(0, y);
          else ctx.lineTo(nx * w, y);
        }
        ctx.strokeStyle = layerColor + alphaHex(layer.opacity * 0.6);
        ctx.lineWidth = li === 0 ? 2 : 1;
        ctx.stroke();
      }

      // foam particles
      const dtScale = dt * 60;
      while (foams.length < FOAM_COUNT) foams.push(createFoam(w, h));

      for (let i = foams.length - 1; i >= 0; i--) {
        const f = foams[i];
        f.life += dtScale;
        f.x += f.vx / w * dtScale;
        f.y += f.vy * dtScale;

        if (f.life > f.maxLife || f.y < -20) {
          foams[i] = createFoam(w, h);
          continue;
        }

        const prog = f.life / f.maxLife;
        const alpha = prog < 0.15 ? prog / 0.15 : 1 - (prog - 0.15) / 0.85;

        ctx.beginPath();
        ctx.arc(f.x * w, f.y, f.r * (1 - prog * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.35})`;
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [scrollProgressRef]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
