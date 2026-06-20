'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Moon, Sun } from 'lucide-react';
import { useMounted } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('theme');
  const mounted = useMounted();

  // Default to dark before hydration to match the dark-first experience.
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <button
      type="button"
      aria-label={t('toggle')}
      title={t('toggle')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-border/70 bg-card/50 text-foreground transition-colors duration-300 hover:border-primary/50 hover:text-primary',
        className,
      )}
    >
      <Sun
        className={cn(
          'absolute h-[1.15rem] w-[1.15rem] transition-all duration-500',
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100',
        )}
      />
      <Moon
        className={cn(
          'absolute h-[1.15rem] w-[1.15rem] transition-all duration-500',
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0',
        )}
      />
    </button>
  );
}
