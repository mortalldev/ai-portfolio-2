import { defineRouting } from 'next-intl/routing';

export const locales = ['uz', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'uz';

export const localeLabels: Record<Locale, { native: string; short: string }> = {
  uz: { native: "O'zbekcha", short: 'UZ' },
  ru: { native: 'Русский', short: 'RU' },
  en: { native: 'English', short: 'EN' },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});
