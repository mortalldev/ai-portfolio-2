import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Inter, Sora, JetBrains_Mono } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import { siteConfig } from '@/shared/config/site';
import { Providers } from '../providers';
import '../globals.css';

const fontSans = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const fontDisplay = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

type LayoutParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const path = locale === routing.defaultLocale ? '' : `/${locale}`;
  const canonical = `${siteConfig.url}${path || '/'}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('title'),
      template: `%s · ${siteConfig.name}`,
    },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical,
      languages: {
        uz: siteConfig.url,
        ru: `${siteConfig.url}/ru`,
        en: `${siteConfig.url}/en`,
        'x-default': siteConfig.url,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: canonical,
      siteName: siteConfig.name,
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    category: 'technology',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <body className="min-h-svh bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Skip to content
            </a>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
