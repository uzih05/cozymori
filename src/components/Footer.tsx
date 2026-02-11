'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  const footerLinks = {
    [t('products')]: [
      { href: '/vectorwave' as const, label: 'VectorWave' },
      { href: '/vectorsurf' as const, label: 'VectorSurfer' },
    ],
    [t('resources')]: [
      { href: '/docs' as const, label: t('documentation') },
      { href: 'https://github.com/cozymori' as const, label: 'GitHub', external: true },
    ],
  };

  return (
    <footer className="border-t border-glass-border bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8">
                <Image src="/icon.svg" alt="cozymori" fill className="object-contain" />
              </div>
              <span className="font-heading text-lg font-semibold text-text-primary">
                cozymori
              </span>
            </Link>
            <p className="text-sm text-text-tertiary max-w-md leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-tertiary hover:text-text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href as '/vectorwave' | '/vectorsurf' | '/docs'}
                        className="text-sm text-text-tertiary hover:text-text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-glass-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
          <p className="text-xs text-text-tertiary">
            {t('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
