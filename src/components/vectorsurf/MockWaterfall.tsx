'use client';

import { motion } from 'framer-motion';

interface Span {
  name: string;
  start: number;
  duration: number;
  status: 'SUCCESS' | 'CACHE_HIT' | 'ERROR';
  depth: number;
}

const TOTAL_DURATION = 342;

const SPANS: Span[] = [
  { name: 'api.generate_response', start: 0, duration: 342, status: 'SUCCESS', depth: 0 },
  { name: 'cache.check', start: 3, duration: 5, status: 'SUCCESS', depth: 1 },
  { name: 'llm.complete', start: 12, duration: 285, status: 'SUCCESS', depth: 1 },
  { name: 'tokenizer.encode', start: 15, duration: 8, status: 'CACHE_HIT', depth: 2 },
  { name: 'gpt4.infer', start: 25, duration: 260, status: 'SUCCESS', depth: 2 },
  { name: 'db.log_execution', start: 300, duration: 38, status: 'SUCCESS', depth: 1 },
  { name: 'webhook.notify', start: 310, duration: 15, status: 'ERROR', depth: 1 },
];

const STATUS_COLORS: Record<string, string> = {
  SUCCESS: '#DFFF00',
  CACHE_HIT: '#00FFCC',
  ERROR: '#FF4D6A',
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const row = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function MockWaterfall() {
  return (
    <div className="space-y-1">
      {/* Time axis */}
      <div className="flex items-center mb-2 px-1">
        <div className="w-28 sm:w-36 shrink-0" />
        <div className="flex-1 flex justify-between text-[9px] text-[#444]">
          <span>0ms</span>
          <span>{Math.round(TOTAL_DURATION / 2)}ms</span>
          <span>{TOTAL_DURATION}ms</span>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="space-y-1"
      >
        {SPANS.map((span, i) => {
          const leftPct = (span.start / TOTAL_DURATION) * 100;
          const widthPct = Math.max((span.duration / TOTAL_DURATION) * 100, 1.5);
          const color = STATUS_COLORS[span.status];

          return (
            <motion.div key={i} variants={row} className="flex items-center gap-2">
              {/* Function name */}
              <div
                className="w-28 sm:w-36 shrink-0 text-[10px] sm:text-[11px] text-[#B0B0B0] font-mono truncate"
                style={{ paddingLeft: span.depth * 10 }}
              >
                {span.depth > 0 && <span className="text-[#333] mr-1">{'└'}</span>}
                {span.name}
              </div>

              {/* Bar container */}
              <div className="flex-1 relative h-5 bg-[#1a1a1a] rounded">
                <motion.div
                  className="absolute top-0 h-full rounded flex items-center justify-center"
                  style={{
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    backgroundColor: color,
                    minWidth: 4,
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                >
                  {widthPct > 8 && (
                    <span className="text-[8px] font-semibold text-black">
                      {span.duration}ms
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 px-1">
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
