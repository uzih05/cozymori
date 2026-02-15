'use client';

import ScrollReveal from '@/components/ScrollReveal';
import GlowCard from '@/components/GlowCard';
import SurferWaveCanvas from '@/components/SurferWaveCanvas';
import MockKpiCards from '@/components/vectorsurf/MockKpiCards';
import MockTimeline from '@/components/vectorsurf/MockTimeline';
import MockWaterfall from '@/components/vectorsurf/MockWaterfall';
import MockHealer from '@/components/vectorsurf/MockHealer';
import MockScatter from '@/components/vectorsurf/MockScatter';
import MockGauge from '@/components/vectorsurf/MockGauge';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function VectorSurfPage() {
  const t = useTranslations('vectorsurf');

  return (
    <>
      {/* ── Section 1: Hero ─────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <SurferWaveCanvas />
        </div>
        <div className="absolute inset-0 pointer-events-none hero-glow-violet" />
        <div className="absolute inset-0 pointer-events-none light-beam-violet" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-violet/20 bg-violet/5 text-xs font-semibold text-violet tracking-wider uppercase mb-6">
              {t('badge')}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter-custom leading-[0.95] mb-6">
              <span className="gradient-text-violet">{t('heroTitle1')}</span>
              <br />
              <span className="text-text-primary">{t('heroTitle2')}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
              {t('heroDescription')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://test3-six-rose.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-violet hover:bg-violet/80 text-white font-semibold text-sm transition-colors duration-200"
              >
                {t('openDashboard')}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass-card text-text-secondary hover:text-text-primary font-semibold text-sm transition-colors duration-200"
              >
                {t('viewDocs')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <ChevronDown size={20} className="text-text-tertiary/40 animate-bounce-down" />
        </div>
      </section>

      {/* ── Section 2: Dashboard ────────────────────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter-custom text-text-primary leading-tight">
                {t('dashboardTitle')}
              </h2>
              <p className="mt-4 text-base text-text-secondary max-w-xl mx-auto">
                {t('dashboardDescription')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlowCard className="p-5 sm:p-7 glow-violet bg-violet/[0.02]">
              <MockKpiCards />
              <div className="mt-5">
                <MockTimeline />
              </div>
            </GlowCard>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
      </div>

      {/* ── Section 3: Trace ────────────────────────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <ScrollReveal>
                <span className="inline-block font-heading text-sm font-semibold tracking-wider uppercase mb-4 text-violet">
                  {t('traceBadge')}
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tighter-custom text-text-primary leading-tight mb-5">
                  {t('traceTitle')}
                </h2>
                <p className="text-base text-text-secondary leading-relaxed max-w-md">
                  {t('traceDescription')}
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.15}>
              <GlowCard className="p-5 glow-violet bg-violet/[0.02]">
                <MockWaterfall />
              </GlowCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
      </div>

      {/* ── Section 4: Healer ───────────────────────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal delay={0.15}>
              <GlowCard className="p-5 glow-violet bg-violet/[0.02]">
                <MockHealer />
              </GlowCard>
            </ScrollReveal>
            <div className="lg:order-first order-first lg:order-last">
              <ScrollReveal>
                <span className="inline-block font-heading text-sm font-semibold tracking-wider uppercase mb-4 text-violet">
                  {t('healerBadge')}
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tighter-custom text-text-primary leading-tight mb-5">
                  {t('healerTitle')}
                </h2>
                <p className="text-base text-text-secondary leading-relaxed max-w-md">
                  {t('healerDescription')}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
      </div>

      {/* ── Section 5: Analysis ─────────────────────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter-custom text-text-primary leading-tight">
                {t('analysisTitle')}
              </h2>
              <p className="mt-4 text-base text-text-secondary max-w-xl mx-auto">
                {t('analysisDescription')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScrollReveal>
              <GlowCard className="p-5 glow-violet bg-violet/[0.02] h-full">
                <p className="text-xs font-semibold text-[#666] uppercase tracking-wider mb-3">{t('scatterLabel')}</p>
                <MockScatter />
              </GlowCard>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <GlowCard className="p-5 glow-violet bg-violet/[0.02] h-full flex flex-col items-center justify-center">
                <p className="text-xs font-semibold text-[#666] uppercase tracking-wider mb-3 self-start">{t('gaugeLabel')}</p>
                <MockGauge />
              </GlowCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
      </div>

      {/* ── Section 6: VectorWave Integration ───────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block font-heading text-sm font-semibold tracking-wider uppercase mb-4 text-cyan">
              VectorWave
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tighter-custom text-text-primary leading-tight mb-5">
              {t('vectorwaveTitle')}
            </h2>
            <p className="text-base text-text-secondary leading-relaxed mb-8">
              {t('vectorwaveDescription')}
            </p>
            <Link
              href="/vectorwave"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:text-cyan/80 transition-colors duration-200"
            >
              {t('vectorwaveLink')}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 7: CTA ──────────────────────────────── */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <SurferWaveCanvas />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter-custom text-text-primary leading-tight">
              {t('ctaTitle')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {t('ctaDescription')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://test3-six-rose.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-violet hover:bg-violet/80 text-white font-semibold text-sm transition-colors duration-200"
              >
                {t('ctaButton')}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass-card text-text-secondary hover:text-text-primary font-semibold text-sm transition-colors duration-200"
              >
                {t('ctaDocs')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
