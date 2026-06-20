'use client';

import { useRef, type ElementType } from 'react';
import { gsap, useGSAP, motion } from '@/shared/lib/gsap';
import { usePrefersReducedMotion } from '@/shared/lib/hooks';
import { cn } from '@/shared/lib/cn';

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate when scrolled into view (default) vs. immediately on mount. */
  onScroll?: boolean;
}

/** Word-by-word masked reveal — the signature headline animation. */
export function AnimatedText({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  stagger = 0.055,
  onScroll = false,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.split(' ');

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = el.querySelectorAll('[data-word]');

      if (reduced) {
        gsap.set(targets, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        targets,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: motion.base,
          ease: motion.expo,
          delay,
          stagger,
          scrollTrigger: onScroll
            ? { trigger: el, start: 'top 88%' }
            : undefined,
        },
      );
    },
    { scope: ref, dependencies: [reduced, text] },
  );

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn('inline-flex flex-wrap', className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden py-[0.05em]"
        >
          <span
            data-word
            className="inline-block will-change-transform"
            aria-hidden
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
