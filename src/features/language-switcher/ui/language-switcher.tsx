'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeLabels, type Locale } from '@/i18n/routing';
import { cn } from '@/shared/lib/cn';

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations('language');
  const activeLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function selectLocale(next: Locale) {
    setOpen(false);
    if (next === activeLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('select')}
        disabled={isPending}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border/70 bg-card/50 px-3 text-sm font-medium text-foreground transition-colors duration-300 hover:border-primary/50 hover:text-primary disabled:opacity-60"
      >
        <Globe className="h-4 w-4" />
        <span className="tabular-nums">{localeLabels[activeLocale].short}</span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-300',
            open && 'rotate-180',
          )}
        />
      </button>

      <div
        role="listbox"
        className={cn(
          'glass absolute right-0 top-12 z-50 w-44 origin-top-right rounded-2xl p-1.5 shadow-card transition-all duration-200',
          open
            ? 'visible scale-100 opacity-100'
            : 'invisible scale-95 opacity-0',
        )}
      >
        {locales.map((loc) => {
          const active = loc === activeLocale;
          return (
            <button
              key={loc}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => selectLocale(loc)}
              className={cn(
                'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted',
              )}
            >
              <span>{localeLabels[loc].native}</span>
              {active && <Check className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
