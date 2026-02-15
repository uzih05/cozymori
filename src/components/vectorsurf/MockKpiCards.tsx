'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, CheckCircle2, AlertTriangle, Database, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface KpiItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  dimBg: string;
  format: 'number' | 'percent' | 'ms';
}

const KPI_DATA: KpiItem[] = [
  { label: 'Total Executions', value: 12847, icon: Activity, color: '#DFFF00', dimBg: 'rgba(223,255,0,0.12)', format: 'number' },
  { label: 'Success Rate', value: 98.4, icon: CheckCircle2, color: '#00FFCC', dimBg: 'rgba(0,255,204,0.12)', format: 'percent' },
  { label: 'Errors', value: 23, icon: AlertTriangle, color: '#FF4D6A', dimBg: 'rgba(255,77,106,0.12)', format: 'number' },
  { label: 'Cache Hit Rate', value: 67.2, icon: Database, color: '#00FFCC', dimBg: 'rgba(0,255,204,0.12)', format: 'percent' },
  { label: 'Avg Duration', value: 142, icon: Clock, color: '#FF9F43', dimBg: 'rgba(255,159,67,0.12)', format: 'ms' },
];

function formatValue(value: number, format: KpiItem['format']): string {
  switch (format) {
    case 'number':
      return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toLocaleString();
    case 'percent':
      return `${value.toFixed(1)}%`;
    case 'ms':
      return `${Math.round(value)}ms`;
  }
}

function CountUp({ target, format, color }: { target: number; format: KpiItem['format']; color: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(target * eased);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-xl font-bold tabular-nums" style={{ color }}>
      {formatValue(current, format)}
    </span>
  );
}

export default function MockKpiCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {KPI_DATA.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[14px] p-4 flex flex-col gap-3"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: kpi.dimBg }}
          >
            <kpi.icon size={16} style={{ color: kpi.color }} />
          </div>
          <div>
            <CountUp target={kpi.value} format={kpi.format} color={kpi.color} />
            <p className="text-[11px] text-[#666] mt-1">{kpi.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
