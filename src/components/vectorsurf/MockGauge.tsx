'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const CACHE_HIT_RATE = 67.2;
const GOLDEN_RATIO = 28.5;

const R_OUTER = 75;
const R_INNER = 60;
const STROKE = 10;
const CX = 100;
const CY = 100;

function circumference(r: number) {
  return 2 * Math.PI * r;
}

function GaugeCountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        const eased = 1 - Math.pow(1 - step / steps, 3);
        setCurrent(target * eased);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-2xl font-bold text-white tabular-nums">
      {current.toFixed(1)}%
    </span>
  );
}

export default function MockGauge() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const outerCirc = circumference(R_OUTER);
  const innerCirc = circumference(R_INNER);
  const outerOffset = outerCirc * (1 - CACHE_HIT_RATE / 100);
  const innerOffset = innerCirc * (1 - GOLDEN_RATIO / 100);

  return (
    <div className="flex flex-col items-center">
      <svg ref={ref} viewBox="0 0 200 200" className="w-48 h-48">
        {/* Outer ring background */}
        <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="#1e1e1e" strokeWidth={STROKE} />
        {/* Inner ring background */}
        <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke="#1e1e1e" strokeWidth={STROKE} />

        {/* Outer ring - cache hit rate (cyan) */}
        <motion.circle
          cx={CX} cy={CY} r={R_OUTER}
          fill="none"
          stroke="#00FFCC"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={outerCirc}
          transform={`rotate(-90 ${CX} ${CY})`}
          initial={{ strokeDashoffset: outerCirc }}
          animate={inView ? { strokeDashoffset: outerOffset } : {}}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Inner ring - golden ratio (lime) */}
        <motion.circle
          cx={CX} cy={CY} r={R_INNER}
          fill="none"
          stroke="#DFFF00"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={innerCirc}
          transform={`rotate(-90 ${CX} ${CY})`}
          initial={{ strokeDashoffset: innerCirc }}
          animate={inView ? { strokeDashoffset: innerOffset } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Center text */}
        <foreignObject x={CX - 40} y={CY - 16} width={80} height={32}>
          <div className="flex items-center justify-center h-full">
            <GaugeCountUp target={CACHE_HIT_RATE} />
          </div>
        </foreignObject>
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3">
        {[
          { label: 'Cache Hit', color: '#00FFCC', value: `${CACHE_HIT_RATE}%` },
          { label: 'Golden', color: '#DFFF00', value: `${GOLDEN_RATIO}%` },
          { label: 'Miss', color: '#333', value: `${(100 - CACHE_HIT_RATE).toFixed(1)}%` },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[9px] text-[#444]">{item.label}</span>
            <span className="text-[9px] text-[#666] font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
