'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP } from '@/shared/lib/gsap';
import { usePrefersReducedMotion } from '@/shared/lib/hooks';
import { stats } from '@/shared/config/data';
import { Container } from '@/shared/ui';

export function Stats() {
  const t = useTranslations('stats');
  const scope = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('[data-stat]').forEach((el) => {
        const numEl = el.querySelector<HTMLElement>('[data-stat-value]');
        if (!numEl) return;
        const target = Number(numEl.dataset.target);

        if (reduced) {
          numEl.textContent = String(target);
          return;
        }

        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          snap: { value: 1 },
          onUpdate: () => {
            numEl.textContent = String(Math.round(obj.value));
          },
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section className="relative border-y border-border/50 bg-card/30 py-14">
      <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.key}
            data-stat
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <div className="font-display text-4xl font-bold tabular-nums sm:text-5xl">
              <span data-stat-value data-target={stat.value}>
                0
              </span>
              <span className="text-gradient">{stat.suffix}</span>
            </div>
            <span className="text-sm text-muted-foreground">{t(stat.key)}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}
