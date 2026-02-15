'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/vectorwave' as const, label: 'VectorWave', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
    { href: '/vectorsurf' as const, label: 'VectorSurfer', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
    { href: '/docs' as const, label: t('docs') },
  ];

  return (
    <>
      {/* Trigger — cozymori icon */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(true)}
            className="fixed top-6 left-6 z-50 w-10 h-10 rounded-full glass-card border border-glass-border hover:border-glass-border-hover flex items-center justify-center transition-colors duration-200 shadow-lg shadow-black/20"
            aria-label="Open navigation"
          >
            <div className="relative w-5 h-5">
              <Image src="/icon.svg" alt="" fill className="object-contain" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-6 left-6 z-50 w-56 glass-panel rounded-2xl p-5 shadow-2xl shadow-black/40"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 group"
                >
                  <div className="relative w-5 h-5">
                    <Image src="/icon.svg" alt="" fill className="object-contain" />
                  </div>
                  <span className="font-heading text-sm font-semibold gradient-text-amber">
                    cozymori
                  </span>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 text-text-tertiary hover:text-text-primary transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.08 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                          isActive
                            ? 'bg-white/8 font-medium'
                            : 'hover:bg-white/5'
                        }`}
                        style={
                          link.gradient && isActive
                            ? {
                                background: link.gradient,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                              }
                            : undefined
                        }
                      >
                        <span
                          className={
                            isActive && !link.gradient
                              ? 'text-text-primary'
                              : link.gradient && !isActive
                                ? 'text-text-secondary hover:text-text-primary'
                                : 'text-text-secondary hover:text-text-primary'
                          }
                          style={
                            link.gradient && !isActive
                              ? {
                                  background: link.gradient,
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  opacity: 0.6,
                                }
                              : undefined
                          }
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* GitHub */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.08 }}
                >
                  <a
                    href="https://github.com/cozymori"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-lg text-sm text-text-tertiary hover:text-text-secondary hover:bg-white/5 transition-colors duration-200"
                  >
                    GitHub ↗
                  </a>
                </motion.div>
              </nav>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
