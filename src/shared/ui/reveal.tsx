'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, useGSAP, motion } from '@/shared/lib/gsap';
import { usePrefersReducedMotion } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/cn';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Fade + rise a single element into view on scroll. */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reduced) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: motion.base,
          ease: motion.ease,
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: once
              ? 'play none none none'
              : 'play none none reverse',
          },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={cn(className)}>
      {children}
    </Tag>
  );
}
