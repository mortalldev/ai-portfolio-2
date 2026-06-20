/**
 * Single source of truth for site-wide constants: identity, contacts and the
 * canonical URL used across SEO metadata, sitemap and structured data.
 */

const RAW_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://muhammad.dev';

export const siteConfig = {
  name: 'Tursunboev Muhammad',
  firstName: 'Muhammad',
  lastName: 'Tursunboev',
  role: 'Software Engineer & Frontend Developer',
  url: RAW_URL.replace(/\/$/, ''),
  locale: 'uz',
  email: 't.mukhammedjohn@gmail.com',
  phone: '+998 90 700 20 30',
  phoneHref: 'tel:+998907002030',
  whatsapp: 'https://wa.me/998907002030',
  location: 'Tashkent, Uzbekistan',
  handles: {
    github: 'mortalldev',
    linkedin: 'mortalldev',
    telegram: 'mortalldev',
  },
} as const;

export const socials = [
  {
    name: 'GitHub',
    icon: 'github',
    href: `https://github.com/${siteConfig.handles.github}`,
    handle: `@${siteConfig.handles.github}`,
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    href: `https://linkedin.com/in/${siteConfig.handles.linkedin}`,
    handle: `in/${siteConfig.handles.linkedin}`,
  },
  {
    name: 'Telegram',
    icon: 'telegram',
    href: `https://t.me/${siteConfig.handles.telegram}`,
    handle: `@${siteConfig.handles.telegram}`,
  },
  {
    name: 'Email',
    icon: 'mail',
    href: `mailto:${siteConfig.email}`,
    handle: siteConfig.email,
  },
] as const;

export type Social = (typeof socials)[number];
