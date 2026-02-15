'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Sparkles, Copy } from 'lucide-react';

const DIAGNOSIS = `Found 3 errors in generate_response over the last 60 minutes.

Root Cause: The OpenAI API returns 429 (Rate Limit) when concurrent requests exceed 50 RPM. The retry logic uses a fixed 1s backoff — insufficient for burst traffic.

Recommendation: Implement exponential backoff with jitter. Increase max retries from 3 to 5.`;

const SUGGESTED_FIX = `@retry(max_retries=5, backoff=exponential_jitter)
async def complete(self, prompt: str) -> str:
    return await self.client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": prompt}],
        timeout=30
    )`;

function useTyping(text: string, enabled: boolean, speed: number = 20, delay: number = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Skip animation for users who prefer reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    let idx = 0;
    setDisplayed('');
    setDone(false);

    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        idx++;
        if (idx >= text.length) {
          setDisplayed(text);
          setDone(true);
          clearInterval(timer);
        } else {
          setDisplayed(text.slice(0, idx));
        }
      }, speed);
      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [enabled, text, speed, delay]);

  return { displayed, done };
}

export default function MockHealer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const diagnosis = useTyping(DIAGNOSIS, inView, 15, 300);
  const fix = useTyping(SUGGESTED_FIX, diagnosis.done, 10, 400);

  return (
    <div ref={ref} className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[rgba(223,255,0,0.12)] flex items-center justify-center">
          <Sparkles size={16} color="#DFFF00" aria-hidden="true" />
        </div>
        <div>
          <span className="text-xs font-semibold text-[#DFFF00]">AI Healer</span>
          <span className="text-[10px] text-[#444] ml-2">generate_response</span>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[12px] p-4">
        <p className="text-[10px] font-semibold text-[#666] uppercase tracking-wider mb-2">Diagnosis</p>
        <p className="text-xs text-[#B0B0B0] leading-relaxed whitespace-pre-wrap min-h-[80px]">
          {diagnosis.displayed}
          {!diagnosis.done && <span className="animate-pulse text-[#DFFF00]">|</span>}
        </p>
      </div>

      {/* Suggested Fix */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[12px] p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-[#666] uppercase tracking-wider">Suggested Fix</p>
          {fix.done && (
            <button aria-label="Copy suggested fix" className="text-[#444] hover:text-[#666] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet rounded">
              <Copy size={12} aria-hidden="true" />
            </button>
          )}
        </div>
        <pre className="text-xs text-[#DFFF00]/80 font-mono leading-relaxed whitespace-pre-wrap min-h-[60px]">
          {fix.displayed}
          {diagnosis.done && !fix.done && <span className="animate-pulse text-[#DFFF00]">|</span>}
        </pre>
      </div>
    </div>
  );
}
