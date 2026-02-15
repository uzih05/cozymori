'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === 'ko' ? 'en' : 'ko';
  const label = locale === 'ko' ? 'EN' : 'KO';

  function handleSwitch() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full glass-card border border-glass-border hover:border-glass-border-hover flex items-center justify-center text-xs font-semibold text-text-secondary hover:text-text-primary transition-[color,border-color] duration-200 shadow-lg shadow-black/20"
      aria-label={`Switch to ${nextLocale === 'ko' ? 'Korean' : 'English'}`}
    >
      {label}
    </button>
  );
}
