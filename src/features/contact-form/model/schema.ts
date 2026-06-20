import { z } from 'zod';

type Translate = (key: string) => string;

/** Builds the contact schema with locale-aware validation messages. */
export function createContactSchema(t: Translate) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t('nameRequired'))
      .min(2, t('nameShort'))
      .max(120),
    phone: z
      .string()
      .trim()
      .min(1, t('phoneRequired'))
      .regex(/^[+()\d\s-]{7,20}$/, t('phoneInvalid')),
    message: z
      .string()
      .trim()
      .max(1000, t('messageLong'))
      .optional()
      .default(''),
  });
}

export type ContactValues = {
  name: string;
  phone: string;
  message: string;
};
