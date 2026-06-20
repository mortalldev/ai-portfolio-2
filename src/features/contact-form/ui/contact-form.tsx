'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  RotateCcw,
  Send,
} from 'lucide-react';
import { createContactSchema, type ContactValues } from '../model/schema';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<keyof ContactValues, string>>;

const inputClass =
  'w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tv = useTranslations('contact.form.validation');

  const [values, setValues] = useState<ContactValues>({
    name: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');

  function update<K extends keyof ContactValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const schema = createContactSchema((k) => tv(k));
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    // Silently accept bot submissions that fill the hidden field.
    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setValues({ name: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="card-surface flex flex-col items-center gap-4 rounded-2xl p-8 text-center sm:p-10">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <div className="space-y-1.5">
          <h3 className="font-display text-xl font-semibold">
            {t('successTitle')}
          </h3>
          <p className="text-sm text-muted-foreground">{t('successText')}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStatus('idle')}
          className="mt-2"
        >
          <RotateCcw className="h-4 w-4" />
          {t('submit')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Field label={t('name')} error={errors.name} htmlFor="contact-name">
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t('namePlaceholder')}
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          aria-invalid={!!errors.name}
          className={cn(inputClass, errors.name && 'border-red-500/70')}
        />
      </Field>

      <Field label={t('phone')} error={errors.phone} htmlFor="contact-phone">
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={t('phonePlaceholder')}
          value={values.phone}
          onChange={(e) => update('phone', e.target.value)}
          aria-invalid={!!errors.phone}
          className={cn(inputClass, errors.phone && 'border-red-500/70')}
        />
      </Field>

      <Field
        label={t('message')}
        error={errors.message}
        htmlFor="contact-message"
      >
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={!!errors.message}
          className={cn(
            inputClass,
            'resize-none',
            errors.message && 'border-red-500/70',
          )}
        />
      </Field>

      {/* Honeypot — hidden from users, catches naive bots. */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-medium">{t('errorTitle')}</p>
            <p className="text-red-400/80">{t('errorText')}</p>
          </div>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        className="mt-1 w-full"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('submitting')}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t('submit')}
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground/90"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
