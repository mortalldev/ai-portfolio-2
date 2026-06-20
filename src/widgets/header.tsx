'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { navItems } from '@/shared/config/data';
import { siteConfig } from '@/shared/config/site';
import { Container, buttonVariants } from '@/shared/ui';
import { ThemeToggle } from '@/features/theme-toggle';
import { LanguageSwitcher } from '@/features/language-switcher';
import { cn } from '@/shared/lib/cn';

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const initials = `${siteConfig.firstName[0]}${siteConfig.lastName[0]}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const ids = ['home', ...navItems];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <a
          href="#home"
          className="group relative grid h-10 w-10 place-items-center rounded-xl border border-border/70 bg-card/50 font-display text-sm font-bold transition-colors hover:border-primary/50 hover:text-primary"
          aria-label={siteConfig.name}
        >
          {initials}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                active === item
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t(item)}
              {active === item && (
                <span className="absolute inset-x-3 -bottom-0.5 h-px bg-primary" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <ThemeToggle />
          <Link
            href="/resume"
            className={cn(
              buttonVariants({ size: 'sm' }),
              'hidden md:inline-flex',
            )}
          >
            <Download className="h-4 w-4" />
            {t('downloadCv')}
          </Link>

          <button
            type="button"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/50 text-foreground transition-colors hover:border-primary/50 hover:text-primary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 top-16 z-40 origin-top bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden',
          open
            ? 'visible opacity-100'
            : 'pointer-events-none invisible opacity-0',
        )}
      >
        <Container className="flex flex-col gap-2 py-8">
          {navItems.map((item, i) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 50 + 80}ms` : '0ms' }}
              className={cn(
                'border-b border-border/50 py-4 font-display text-2xl font-semibold transition-all duration-300',
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                active === item ? 'text-primary' : 'text-foreground',
              )}
            >
              {t(item)}
            </a>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <LanguageSwitcher />
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className={buttonVariants({ size: 'md' })}
            >
              <Download className="h-4 w-4" />
              {t('downloadCv')}
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
