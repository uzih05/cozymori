'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const MINI_KPI = [
  { label: 'Executions', value: 12847, display: '12.8K', color: '#DFFF00' },
  { label: 'Success', value: 98.4, display: '98.4%', color: '#00FFCC' },
  { label: 'Cache Hit', value: 67.2, display: '67.2%', color: '#00FFCC' },
];

const CHART_POINTS = [20, 35, 28, 42, 55, 48, 62, 58, 70, 65, 72, 68];

function MiniCountUp({ display, color }: { display: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <span ref={ref} className="text-lg font-bold tabular-nums transition-opacity duration-500" style={{ color, opacity: show ? 1 : 0 }}>
      {show ? display : '—'}
    </span>
  );
}

function toPath(points: number[], w: number, h: number): string {
  const maxVal = Math.max(...points) * 1.2;
  const stepX = w / (points.length - 1);
  const coords = points.map((v, i) => ({ x: i * stepX, y: h - (v / maxVal) * h }));

  let d = `M ${coords[0].x},${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[Math.max(0, i - 1)];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[Math.min(coords.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

export default function MiniDashboard() {
  const chartW = 300;
  const chartH = 70;
  const linePath = toPath(CHART_POINTS, chartW, chartH);
  const last = CHART_POINTS.length - 1;
  const areaPath = `${linePath} L ${last * (chartW / (CHART_POINTS.length - 1))},${chartH} L 0,${chartH} Z`;

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-[#DFFF00] flex items-center justify-center">
          <span className="text-[8px] font-black text-black">VS</span>
        </div>
        <span className="text-[11px] text-text-tertiary font-medium">VectorSurfer Dashboard</span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2">
        {MINI_KPI.map((kpi) => (
          <div key={kpi.label} className="bg-white/[0.02] border border-glass-border rounded-xl p-3">
            <p className="text-[10px] text-text-tertiary mb-1">{kpi.label}</p>
            <MiniCountUp display={kpi.display} color={kpi.color} />
          </div>
        ))}
      </div>

      {/* Mini chart */}
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="mini-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DFFF00" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#DFFF00" stopOpacity={0} />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill="url(#mini-grad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="#DFFF00"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}
