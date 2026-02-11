'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: boolean;
  blur?: boolean;
}

const directionOffsets = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  scale: enableScale = false,
  blur: enableBlur = false,
}: ScrollRevealProps) {
  const offset = directionOffsets[direction];

  const initial: Record<string, any> = { opacity: 0, ...offset };
  const animate: Record<string, any> = { opacity: 1, x: 0, y: 0 };

  if (enableScale) {
    initial.scale = 0.95;
    animate.scale = 1;
  }

  if (enableBlur) {
    initial.filter = 'blur(10px)';
    animate.filter = 'blur(0px)';
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
