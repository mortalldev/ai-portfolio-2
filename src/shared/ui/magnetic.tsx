'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/shared/lib/gsap';
import { usePrefersReducedMotion } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/cn';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Pulls its child toward the cursor on hover — used for primary CTAs & icons. */
export function Magnetic({
  children,
  className,
  strength = 0.4,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: ref, dependencies: [reduced, strength] },
  );

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {children}
    </span>
  );
}
