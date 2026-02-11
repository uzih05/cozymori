'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import GlowCard from '@/components/GlowCard';
import SurferWaveCanvas from '@/components/SurferWaveCanvas';
import { LayoutGrid, GitBranch, ShieldCheck, RotateCcw, Search, Languages, ArrowRight, ChevronDown, Copy, Check, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const codeExample = `from vectorwave import VectorWaveHealer, VectorWaveReplayer

# AI-powered error diagnosis + auto-fix
healer = VectorWaveHealer(model="gpt-4-turbo")
diagnosis = healer.diagnose_and_heal(
    function_name="generate_response",
    lookback_minutes=60,
    create_pr=True  # opens GitHub PR with fix
)

# Replay past executions for regression testing
replayer = VectorWaveReplayer()
results = replayer.replay(
    function_full_name="app.generate_response",
    limit=20,
    golden_only=True
)
# → { passed: 18, failed: 2 }`;

const cloneCommand = 'git clone https://github.com/Cozymori/VectorSurfer';

export default function VectorSurferPage() {
  const t = useTranslations('vectorsurf');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { icon: <LayoutGrid size={20} />, title: t('feature1Title'), description: t('feature1Description') },
    { icon: <GitBranch size={20} />, title: t('feature2Title'), description: t('feature2Description') },
    { icon: <ShieldCheck size={20} />, title: t('feature3Title'), description: t('feature3Description') },
    { icon: <RotateCcw size={20} />, title: t('feature4Title'), description: t('feature4Description') },
    { icon: <Search size={20} />, title: t('feature5Title'), description: t('feature5Description') },
    { icon: <Languages size={20} />, title: t('feature6Title'), description: t('feature6Description') },
  ];

  /* Dashboard preview mock widgets */
  const dashboardWidgets = [
    { label: 'Total Calls', span: 'col-span-1' },
    { label: 'Avg Latency', span: 'col-span-1' },
    { label: 'Error Rate', span: 'col-span-1' },
    { label: 'Cache Hit %', span: 'col-span-1' },
    { label: 'Timeline', span: 'col-span-2 row-span-2' },
    { label: 'Error Distribution', span: 'col-span-2 row-span-2' },
  ];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Canvas background */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <SurferWaveCanvas />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 hero-glow-violet pointer-events-none" />

        {/* Light beam */}
        <div className="absolute inset-0 light-beam-violet pointer-events-none" />

        {/* Grid texture */}
        <div className="absolute inset-0 grid-bg-fade opacity-50 animate-grid-fade pointer-events-none" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8"
            >
              <LayoutGrid size={14} className="text-violet" />
              <span className="text-xs font-medium text-text-secondary">{t('badge')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter-custom leading-[0.92] mb-6"
            >
              <span className="gradient-text-violet">{t('heroTitle1')}</span>
              <br />
              <span className="text-text-primary">{t('heroTitle2')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-text-secondary max-w-lg leading-relaxed mb-8"
            >
              {t('heroDescription')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet hover:bg-violet/80 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-violet-glow"
              >
                {t('getStarted')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com/Cozymori/VectorSurfer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-text-secondary hover:text-text-primary font-medium text-sm transition-all duration-200"
              >
                {t('sourceCode')}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        >
          <span className="text-[10px] uppercase tracking-widest text-text-tertiary">Scroll</span>
          <ChevronDown size={16} className="text-text-tertiary animate-float" />
        </motion.div>
      </section>

      {/* ── Code Section — 2-column reversed layout ── */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: code (reversed from VectorWave) */}
            <ScrollReveal delay={0.15}>
              <div className="lg:order-1 order-2">
                <GlowCard className="overflow-hidden glow-violet">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-glass-border">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-[11px] text-text-tertiary font-mono">diagnose.py</span>
                  </div>
                  <pre className="p-5 text-[13px] text-text-secondary leading-relaxed overflow-x-auto font-mono">
                    <code>{codeExample}</code>
                  </pre>
                </GlowCard>
              </div>
            </ScrollReveal>

            {/* Right: text */}
            <div className="lg:order-2 order-1">
              <ScrollReveal>
                <span className="inline-block font-heading text-sm font-semibold tracking-wider uppercase mb-4 text-violet">
                  {t('badge')}
                </span>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tighter-custom leading-[0.95] mb-5">
                  {t('codeTitle')}
                </h2>
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-md">
                  {t('codeDescription')}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-3xl px-6 mt-24">
          <div className="divider-violet" />
        </div>
      </section>

      {/* ── Dashboard Preview (VectorSurfer exclusive) ─ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tighter-custom text-text-primary mb-4">
                {t('demoTitle')}
              </h2>
              <p className="text-base text-text-secondary max-w-md mx-auto">
                {t('demoDescription')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} scale>
            <div className="max-w-4xl mx-auto">
              <GlowCard className="p-6 sm:p-8 glow-violet">
                {/* Bento grid mock dashboard */}
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                  {dashboardWidgets.map((widget) => (
                    <div
                      key={widget.label}
                      className={`${widget.span} rounded-xl border border-glass-border bg-white/[0.02] p-4 sm:p-5 flex flex-col justify-between min-h-[80px]`}
                    >
                      <span className="text-[11px] uppercase tracking-wider text-text-tertiary font-medium">
                        {widget.label}
                      </span>
                      <div className="mt-2 h-2 w-2/3 rounded-full bg-violet/10" />
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-text-tertiary mt-6">
                  {t('demoPlaceholder')}
                </p>
              </GlowCard>
            </div>
          </ScrollReveal>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-3xl px-6 mt-24">
          <div className="divider-violet" />
        </div>
      </section>

      {/* ── Features — Bento Grid ──────────────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/30 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tighter-custom text-text-primary mb-4">
                {t('featuresTitle')}
              </h2>
              <p className="text-base text-text-secondary max-w-md mx-auto">
                {t('featuresDescription')}
              </p>
            </div>
          </ScrollReveal>

          {/* Large cards — first 2 features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {features.slice(0, 2).map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <GlowCard className="p-8 h-full group transition-all duration-300 card-accent-bar-violet bg-violet/[0.03]">
                  <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center mb-5 text-violet transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-base text-text-tertiary leading-relaxed">
                    {feature.description}
                  </p>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Small cards — remaining 4 features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.slice(2).map((feature, i) => (
              <ScrollReveal key={feature.title} delay={(i + 2) * 0.1}>
                <GlowCard className="p-6 h-full group transition-all duration-300 card-accent-bar-violet">
                  <div className="w-10 h-10 rounded-lg bg-violet/10 flex items-center justify-center mb-4 text-violet transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-tertiary leading-relaxed">
                    {feature.description}
                  </p>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Canvas background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <SurferWaveCanvas />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-[15%] w-64 h-64 rounded-full bg-violet/5 blur-3xl animate-orb-drift pointer-events-none" />
        <div className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-violet/5 blur-3xl animate-orb-drift animation-delay-3000 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tighter-custom text-text-primary mb-6">
              Launch the <span className="gradient-text-violet">dashboard</span>
            </h2>
            <p className="text-base text-text-secondary max-w-md mx-auto mb-10">
              {t('ctaDescription')}
            </p>

            {/* Terminal command with copy */}
            <div className="inline-flex items-center gap-3 glass-card rounded-xl px-5 py-3 font-mono text-sm text-text-secondary mb-8">
              <span className="text-text-tertiary select-none">$</span>
              <span className="truncate max-w-[320px] sm:max-w-none">{cloneCommand}</span>
              <button
                onClick={handleCopy}
                className="ml-2 p-1 rounded-md hover:bg-white/10 transition-colors text-text-tertiary hover:text-text-primary"
                aria-label="Copy command"
              >
                {copied ? <Check size={14} className="text-violet" /> : <Copy size={14} />}
              </button>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-violet/20 bg-violet/5 text-sm font-semibold text-violet hover:bg-violet/10 hover:border-violet/30 transition-all duration-200"
              >
                <BookOpen size={16} />
                Documentation
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com/Cozymori/VectorSurfer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-text-secondary hover:text-text-primary font-medium text-sm transition-all duration-200"
              >
                GitHub
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
