import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/shared/config/site';

function urlFor(locale: string, route: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${siteConfig.url}${prefix}${route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/resume'];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : 0.6,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, urlFor(locale, route)]),
      ),
    },
  }));
}
