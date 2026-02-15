import '@/app/globals.css';
import { GeistSans } from 'geist/font/sans';
import { hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import LenisProvider from '@/components/LenisProvider';
import NoiseOverlay from '@/components/NoiseOverlay';
import Footer from '@/components/Footer';
import FloatingNav from '@/components/FloatingNav';
import LocaleToggle from '@/components/LocaleToggle';
import type { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const baseUrl = 'https://cozymori.com';

  return {
    title: {
      default: t('title'),
      template: '%s | cozymori',
    },
    description: t('description'),
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/icon.png', type: 'image/png', sizes: '1024x1024' },
      ],
      apple: '/icon.png',
    },
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'cozymori',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      url: baseUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    other: {
      'theme-color': '#050506',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={GeistSans.variable} style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-bg-primary text-text-primary font-body">
        <NextIntlClientProvider>
          <LenisProvider>
            <NoiseOverlay />
            <FloatingNav />
            <LocaleToggle />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
