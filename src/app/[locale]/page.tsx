'use client';

import { useRef, useEffect } from 'react';
import Hero from '@/components/Hero';
import UnifiedWaveCanvas from '@/components/UnifiedWaveCanvas';
import GlowCard from '@/components/GlowCard';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, ArrowUpRight, Sparkles, Globe, Code, Terminal, BarChart3 } from 'lucide-react';
import MiniDashboard from '@/components/vectorsurf/MiniDashboard';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

/* ── short code snippets ──────────────────────────────── */
const waveCode = `from vectorwave import vectorize

@vectorize(
    semantic_cache=True,
    cache_threshold=0.95,
    capture_return_value=True
)
async def generate(query: str):
    return await llm.complete(query)

# Similar queries → cached in ~0.02s
# Every call vectorized & traced to Weaviate`;


export default function Home() {
  const tIntro = useTranslations('intro');
  const tProjects = useTranslations('projects');
  const tPhilosophy = useTranslations('philosophy');
  const tEcosystem = useTranslations('ecosystem');
  const tTrust = useTranslations('trust');
  const tCta = useTranslations('cta');

  const waveSectionRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  useEffect(() => {
    const section = waveSectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrolled = viewportHeight - rect.top;
      const total = sectionHeight + viewportHeight;
      scrollProgressRef.current = Math.max(0, Math.min(1, scrolled / total));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Hero />

      {/* ── Scene 1: Identity ──────────────────────────── */}
      <section className="relative py-36 sm:py-44 lg:py-52">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter-custom text-text-primary leading-tight">
              {tIntro('headline')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-text-tertiary max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
              {tIntro('sub')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Scene 2–3: Product Showcase ───────────────── */}
      <div ref={waveSectionRef} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <UnifiedWaveCanvas scrollProgressRef={scrollProgressRef} />
        </div>

        {/* VectorWave */}
        <section className="relative z-20 pt-32 sm:pt-40 pb-20 sm:pb-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <ScrollReveal>
                  <span className="inline-block font-heading text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: '#22d3ee' }}>
                    {tProjects('vectorwave.badge')}
                  </span>
                  <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tighter-custom leading-[0.95] mb-5">
                    <span className="gradient-text-cyan">{tProjects('vectorwave.title')}</span>
                  </h2>
                  <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-md">
                    {tProjects('vectorwave.description')}
                  </p>
                  <Link
                    href="/vectorwave"
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-cyan/20 bg-cyan/5 text-sm font-semibold text-cyan hover:bg-cyan/10 hover:border-cyan/30 transition-colors duration-200"
                  >
                    {tProjects('vectorwave.cta')}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={0.15}>
                <GlowCard className="overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-glass-border">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-[11px] text-text-tertiary font-mono">vectorize.py</span>
                  </div>
                  <pre className="p-5 text-[13px] text-text-secondary leading-relaxed overflow-x-auto font-mono"><code>{waveCode}</code></pre>
                </GlowCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <div className="relative z-20 mx-auto max-w-3xl px-6 lg:px-8 py-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* VectorSurfer */}
        <section className="relative z-20 pt-20 sm:pt-28 pb-32 sm:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal delay={0.15}>
                <div className="lg:order-1 order-2">
                  <GlowCard className="overflow-hidden glow-violet">
                    <MiniDashboard />
                  </GlowCard>
                </div>
              </ScrollReveal>
              <div className="lg:order-2 order-1">
                <ScrollReveal>
                  <span className="inline-block font-heading text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: '#a78bfa' }}>
                    {tProjects('vectorsurf.badge')}
                  </span>
                  <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tighter-custom leading-[0.95] mb-5">
                    <span className="gradient-text-violet">{tProjects('vectorsurf.title')}</span>
                  </h2>
                  <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-md">
                    {tProjects('vectorsurf.description')}
                  </p>
                  <Link
                    href="/vectorsurf"
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-violet/20 bg-violet/5 text-sm font-semibold text-violet hover:bg-violet/10 hover:border-violet/30 transition-colors duration-200"
                  >
                    {tProjects('vectorsurf.cta')}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Scene 4: Philosophy ────────────────────────── */}
      <section className="relative py-32 sm:py-40">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter-custom text-text-primary text-center leading-tight mb-16">
              {tPhilosophy('title')}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: tPhilosophy('simpleTitle'), body: tPhilosophy('simpleBody') },
              { icon: Globe, title: tPhilosophy('openTitle'), body: tPhilosophy('openBody') },
              { icon: Code, title: tPhilosophy('devTitle'), body: tPhilosophy('devBody') },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-7 h-full">
                  <item.icon size={20} className="text-accent mb-4" />
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-tertiary leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scene 5: Ecosystem ──────────────────────────── */}
      <section className="relative py-32 sm:py-40">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter-custom text-text-primary leading-tight">
                {tEcosystem('title')}
              </h2>
              <p className="mt-4 text-base text-text-tertiary max-w-lg mx-auto">
                {tEcosystem('sub')}
              </p>
            </div>
          </ScrollReveal>

          {/* 3-step flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { step: '01', label: tEcosystem('step1'), sub: tEcosystem('step1sub'), color: '#06b6d4' },
              { step: '02', label: tEcosystem('step2'), sub: tEcosystem('step2sub'), color: '#8b5cf6' },
              { step: '03', label: tEcosystem('step3'), sub: tEcosystem('step3sub'), color: '#f59e0b' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-7 text-center h-full">
                  <span className="font-heading text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: item.color }}>
                    {item.step}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    {item.sub}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Connectors between steps (desktop) */}
          <div className="hidden md:flex justify-center mb-12">
            <div className="h-px w-full max-w-2xl bg-gradient-to-r from-cyan/30 via-violet/30 to-accent/30" />
          </div>

          {/* Additional tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal delay={0.05}>
              <div className="glass-card rounded-2xl p-7 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <Terminal size={18} className="text-cyan" />
                  <span className="font-heading text-sm font-semibold text-text-primary">
                    {tEcosystem('vectorcheck')}
                  </span>
                </div>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  {tEcosystem('vectorcheckDesc')}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="glass-card rounded-2xl p-7 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 size={18} className="text-violet" />
                  <span className="font-heading text-sm font-semibold text-text-primary">
                    {tEcosystem('vectorsurferstl')}
                  </span>
                </div>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  {tEcosystem('vectorsurferstlDesc')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Scene 6: Trust ──────────────────────────────── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {[
                tTrust('license'),
                tTrust('python'),
                tTrust('version'),
                tTrust('opensource'),
              ].map((label, i) => (
                <span
                  key={i}
                  className="px-5 py-2.5 rounded-full border border-glass-border bg-glass-bg text-xs sm:text-sm font-medium text-text-tertiary"
                >
                  {label}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Scene 7: CTA ──────────────────────────────── */}
      <section className="relative py-32 sm:py-40 lg:py-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter-custom text-text-primary leading-tight">
              {tCta('title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {tCta('description')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-gradient-amber text-sm font-semibold"
              >
                {tCta('docs')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com/cozymori"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass-card text-text-secondary hover:text-text-primary font-semibold text-sm transition-colors duration-200"
              >
                {tCta('github')}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
