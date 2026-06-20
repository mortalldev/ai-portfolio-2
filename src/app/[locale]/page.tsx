import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HomeView } from '@/views/home-view';
import { siteConfig, socials } from '@/shared/config/site';
import { skillGroups } from '@/shared/config/data';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'meta' });

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: t('description'),
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    image: `${siteConfig.url}/opengraph-image`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressCountry: 'UZ',
    },
    sameAs: socials.filter((s) => s.icon !== 'mail').map((s) => s.href),
    knowsAbout: skillGroups.flatMap((group) => group.items),
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <HomeView />
    </>
  );
}
