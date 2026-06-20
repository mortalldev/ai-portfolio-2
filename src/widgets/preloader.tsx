'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap';
import { usePrefersReducedMotion } from '@/shared/lib/hooks';
import { siteConfig } from '@/shared/config/site';

/** Full-screen intro overlay that counts to 100% then slides away. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const reduced = usePrefersReducedMotion();
  const initials = `${siteConfig.firstName[0]}${siteConfig.lastName[0]}`;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      if (reduced) {
        gsap.set(el, { display: 'none' });
        ScrollTrigger.refresh();
        return;
      }

      document.body.style.overflow = 'hidden';
      const progress = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          ScrollTrigger.refresh();
        },
      });

      tl.to(progress, {
        value: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.round(progress.value)),
      })
        .to('[data-pre-bar]', { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0)
        .to(
          '[data-pre-content]',
          { y: -24, opacity: 0, duration: 0.5, ease: 'power2.in' },
          '+=0.15',
        )
        .to(el, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.1')
        .set(el, { display: 'none' });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
    >
      <div data-pre-content className="flex flex-col items-center gap-6">
        <span className="font-display text-3xl font-bold tracking-tight text-gradient">
          {initials}
        </span>
        <div className="h-px w-44 overflow-hidden bg-border">
          <div
            data-pre-bar
            className="h-full w-full origin-left scale-x-0 bg-brand-gradient"
          />
        </div>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {count.toString().padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
}
