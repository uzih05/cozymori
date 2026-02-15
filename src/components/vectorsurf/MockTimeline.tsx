'use client';

import { motion } from 'framer-motion';

const TIMELINE_DATA = [
  { time: '08:00', success: 42, error: 2, cache: 15 },
  { time: '09:00', success: 58, error: 4, cache: 22 },
  { time: '10:00', success: 71, error: 6, cache: 28 },
  { time: '11:00', success: 63, error: 3, cache: 35 },
  { time: '12:00', success: 85, error: 2, cache: 40 },
  { time: '13:00', success: 92, error: 5, cache: 38 },
  { time: '14:00', success: 78, error: 2, cache: 45 },
  { time: '15:00', success: 88, error: 1, cache: 42 },
];

const W = 600;
const H = 200;
const PAD = { top: 20, right: 20, bottom: 30, left: 10 };
const MAX_VAL = 100;

const SERIES = [
  { key: 'success' as const, color: '#DFFF00', label: 'Success' },
  { key: 'error' as const, color: '#FF4D6A', label: 'Error' },
  { key: 'cache' as const, color: '#00FFCC', label: 'Cache Hit' },
];

function toX(i: number): number {
  return PAD.left + (i / (TIMELINE_DATA.length - 1)) * (W - PAD.left - PAD.right);
}

function toY(val: number): number {
  return PAD.top + (1 - val / MAX_VAL) * (H - PAD.top - PAD.bottom);
}

function toSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

function toAreaPath(points: { x: number; y: number }[]): string {
  const line = toSmoothPath(points);
  const bottomY = H - PAD.bottom;
  return `${line} L ${points[points.length - 1].x},${bottomY} L ${points[0].x},${bottomY} Z`;
}

export default function MockTimeline() {
  const gridLines = [0.25, 0.5, 0.75].map((pct) => toY(MAX_VAL * pct));

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-3 px-1">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-[10px] text-[#666]">{s.label}</span>
          </div>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          {SERIES.map((s) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>

        {/* Grid lines */}
        {gridLines.map((y, i) => (
          <line key={i} x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#222" strokeWidth={0.5} strokeDasharray="3 3" />
        ))}

        {/* X axis labels */}
        {TIMELINE_DATA.map((d, i) => (
          <text key={i} x={toX(i)} y={H - 8} textAnchor="middle" fontSize={9} fill="#444">
            {d.time}
          </text>
        ))}

        {/* Area fills */}
        {SERIES.map((s, si) => {
          const points = TIMELINE_DATA.map((d, i) => ({ x: toX(i), y: toY(d[s.key]) }));
          return (
            <motion.path
              key={`area-${s.key}`}
              d={toAreaPath(points)}
              fill={`url(#grad-${s.key})`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 + si * 0.2 }}
            />
          );
        })}

        {/* Stroke lines */}
        {SERIES.map((s, si) => {
          const points = TIMELINE_DATA.map((d, i) => ({ x: toX(i), y: toY(d[s.key]) }));
          return (
            <motion.path
              key={`line-${s.key}`}
              d={toSmoothPath(points)}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: si * 0.2, ease: 'easeOut' }}
            />
          );
        })}
      </svg>
    </div>
  );
}
