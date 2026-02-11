'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LocaleToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextLocale = locale === 'ko' ? 'en' : 'ko';

  const handleSwitch = () => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className={`fixed top-6 right-6 z-50 px-3 py-1.5 rounded-full glass-card border border-glass-border hover:border-glass-border-hover text-xs font-medium text-text-tertiary hover:text-text-secondary transition-all duration-200 shadow-lg shadow-black/20 ${
        isPending ? 'opacity-50' : ''
      }`}
      aria-label={`Switch to ${nextLocale === 'ko' ? '한국어' : 'English'}`}
    >
      {locale === 'ko' ? 'EN' : 'KO'}
    </button>
  );
}
