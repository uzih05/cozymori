'use client';

import { motion } from 'framer-motion';

interface Point {
  x: number;
  y: number;
  status: 'SUCCESS' | 'CACHE_HIT' | 'ERROR';
}

const POINTS: Point[] = [
  { x: 0.12, y: 0.78, status: 'SUCCESS' }, { x: 0.22, y: 0.65, status: 'SUCCESS' },
  { x: 0.35, y: 0.82, status: 'SUCCESS' }, { x: 0.18, y: 0.45, status: 'CACHE_HIT' },
  { x: 0.42, y: 0.38, status: 'SUCCESS' }, { x: 0.55, y: 0.72, status: 'SUCCESS' },
  { x: 0.62, y: 0.28, status: 'CACHE_HIT' }, { x: 0.48, y: 0.55, status: 'SUCCESS' },
  { x: 0.72, y: 0.85, status: 'ERROR' }, { x: 0.28, y: 0.92, status: 'SUCCESS' },
  { x: 0.38, y: 0.15, status: 'CACHE_HIT' }, { x: 0.85, y: 0.42, status: 'SUCCESS' },
  { x: 0.15, y: 0.32, status: 'SUCCESS' }, { x: 0.68, y: 0.58, status: 'SUCCESS' },
  { x: 0.78, y: 0.18, status: 'CACHE_HIT' }, { x: 0.52, y: 0.48, status: 'SUCCESS' },
  { x: 0.32, y: 0.68, status: 'SUCCESS' }, { x: 0.88, y: 0.72, status: 'ERROR' },
  { x: 0.45, y: 0.88, status: 'SUCCESS' }, { x: 0.58, y: 0.35, status: 'CACHE_HIT' },
  { x: 0.25, y: 0.52, status: 'SUCCESS' }, { x: 0.75, y: 0.65, status: 'SUCCESS' },
  { x: 0.92, y: 0.55, status: 'SUCCESS' }, { x: 0.08, y: 0.62, status: 'SUCCESS' },
  { x: 0.65, y: 0.92, status: 'ERROR' }, { x: 0.82, y: 0.32, status: 'CACHE_HIT' },
];

const STATUS_COLORS: Record<string, string> = {
  SUCCESS: '#00FFCC',
  CACHE_HIT: '#DFFF00',
  ERROR: '#FF4D6A',
};

const W = 400;
const H = 280;
const PAD = 30;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const dot = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 0.75, scale: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 15 } },
};

export default function MockScatter() {
  const gridPcts = [0.25, 0.5, 0.75];

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {gridPcts.map((pct) => {
          const x = PAD + pct * (W - 2 * PAD);
          const y = PAD + pct * (H - 2 * PAD);
          return (
            <g key={pct}>
              <line x1={x} y1={PAD} x2={x} y2={H - PAD} stroke="#1a1a1a" strokeWidth={0.5} />
              <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#1a1a1a" strokeWidth={0.5} />
            </g>
          );
        })}

        {/* Border */}
        <rect x={PAD} y={PAD} width={W - 2 * PAD} height={H - 2 * PAD} fill="none" stroke="#222" strokeWidth={0.5} />

        {/* Points */}
        <motion.g
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {POINTS.map((p, i) => (
            <motion.circle
              key={i}
              variants={dot}
              cx={PAD + p.x * (W - 2 * PAD)}
              cy={PAD + (1 - p.y) * (H - 2 * PAD)}
              r={4}
              fill={STATUS_COLORS[p.status]}
            />
          ))}
        </motion.g>

        {/* Axis labels */}
        <text x={W / 2} y={H - 6} textAnchor="middle" fontSize={9} fill="#333">PC1</text>
        <text x={8} y={H / 2} textAnchor="middle" fontSize={9} fill="#333" transform={`rotate(-90, 8, ${H / 2})`}>PC2</text>
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 px-1">
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[9px] text-[#444]">{status.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
