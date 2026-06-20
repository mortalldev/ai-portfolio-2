'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowDown, Download, MapPin, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { gsap, useGSAP, motion } from '@/shared/lib/gsap';
import { usePrefersReducedMotion } from '@/shared/lib/hooks';
import { socials, siteConfig } from '@/shared/config/site';
import {
  AnimatedText,
  Container,
  Magnetic,
  SocialIcon,
  TechIcon,
  buttonVariants,
} from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

export function Hero() {
  const t = useTranslations('hero');
  const scope = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set('[data-hero]', { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        '[data-hero]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: motion.base,
          ease: motion.ease,
          stagger: 0.12,
          delay: 0.2,
        },
      );
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section
      id="home"
      ref={scope}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pt-20"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ── Copy ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-6">
          <span
            data-hero
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t('available')}
          </span>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            <span
              data-hero
              className="block text-lg font-medium text-muted-foreground/80 sm:text-xl"
            >
              {t('greeting')}
            </span>
            <AnimatedText
              text={`${t('name')} ${t('lastName')}`}
              as="span"
              delay={0.35}
              className="text-gradient"
            />
          </h1>

          <div
            data-hero
            className="flex items-center gap-2 font-display text-xl font-semibold sm:text-2xl"
          >
            <Sparkles className="h-5 w-5 text-accent" />
            <HeroRoles />
          </div>

          <p
            data-hero
            className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t('summary')}
          </p>

          <div data-hero className="flex flex-wrap items-center gap-3 pt-2">
            <Magnetic>
              <a href="#projects" className={buttonVariants({ size: 'lg' })}>
                {t('primaryCta')}
              </a>
            </Magnetic>
            <a
              href="#contact"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              {t('secondaryCta')}
            </a>
            <Link
              href="/resume"
              className={buttonVariants({ variant: 'ghost', size: 'lg' })}
            >
              <Download className="h-4 w-4" />
              {t('downloadCv')}
            </Link>
          </div>

          <div
            data-hero
            className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4"
          >
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {t('locationLabel')}
            </span>
            <div className="flex items-center gap-1">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.name}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  <SocialIcon
                    name={s.icon}
                    className="h-[1.05rem] w-[1.05rem]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Visual ───────────────────────────────────────────── */}
        <div
          data-hero
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <HeroVisual />
        </div>
      </Container>

      <a
        href="#about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary lg:flex"
      >
        {t('scrollHint')}
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}

function HeroRoles() {
  const t = useTranslations('hero');
  const roles = t.raw('roles') as string[];
  const ref = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ref.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
      );
    },
    { dependencies: [index, reduced] },
  );

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="inline-flex h-[1.4em] items-center overflow-hidden text-primary">
      <span ref={ref} className="inline-block whitespace-nowrap">
        {roles[index]}
      </span>
    </span>
  );
}

const FLOATING_TECH = [
  { name: 'React', className: 'left-[-4%] top-[18%]' },
  { name: 'Next.js', className: 'right-[-2%] top-[8%]' },
  { name: 'TypeScript', className: 'right-[4%] bottom-[20%]' },
  { name: 'Node.js', className: 'left-[2%] bottom-[12%]' },
  { name: 'GSAP', className: 'left-[44%] top-[-6%]' },
  { name: 'Tailwind CSS', className: 'right-[-6%] top-[46%]' },
];

function HeroVisual() {
  const scope = useRef<HTMLDivElement>(null);
  const initials = `${siteConfig.firstName[0]}${siteConfig.lastName[0]}`;
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>('[data-chip]').forEach((chip, i) => {
        gsap.to(chip, {
          y: i % 2 === 0 ? -16 : 16,
          duration: 2.6 + i * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        });
      });
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <div ref={scope} className="relative aspect-square w-full">
      {/* Pulse rings */}
      <div className="absolute inset-[12%] rounded-full border border-primary/20" />
      <div className="absolute inset-[24%] rounded-full border border-primary/15" />

      {/* Core */}
      <div className="card-surface absolute inset-[18%] flex flex-col items-center justify-center gap-4 rounded-[2rem] shadow-card">
        <div className="absolute inset-0 -z-10 rounded-[2rem] bg-radial-fade" />
        <span className="text-gradient font-display text-7xl font-bold sm:text-8xl">
          {initials}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {siteConfig.role.split(' & ')[0]}
        </span>
      </div>

      {/* Floating tech chips */}
      {FLOATING_TECH.map((tech) => (
        <div
          key={tech.name}
          data-chip
          className={cn(
            'glass absolute grid h-12 w-12 place-items-center rounded-2xl shadow-card sm:h-14 sm:w-14',
            tech.className,
          )}
        >
          <TechIcon
            name={tech.name}
            className="h-6 w-6 text-foreground sm:h-7 sm:w-7"
          />
        </div>
      ))}
    </div>
  );
}
