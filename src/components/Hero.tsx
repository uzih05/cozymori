'use client';

import { motion } from 'framer-motion';
import VectorFieldCanvas from '@/components/VectorFieldCanvas';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <VectorFieldCanvas />

      <div className="relative z-10 text-center px-6 pointer-events-none">
        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-heading text-[14vw] sm:text-[12vw] lg:text-[11vw] font-bold tracking-tighter-custom leading-[1.1] select-none"
        >
          <span className="gradient-text-amber">cozymori</span>
          <span className="text-text-primary/20">.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-6 text-base sm:text-lg text-text-secondary/60 tracking-wide"
        >
          {t('tagline')}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 5, duration: 2 }}
      >
        <motion.div
          className="w-[1px] h-10 rounded-full"
          style={{ background: 'linear-gradient(to bottom, rgba(245,158,11,0.4), transparent)' }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
