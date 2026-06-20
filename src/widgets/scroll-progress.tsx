'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/shared/lib/gsap';

/** Thin gradient bar pinned to the top, scrubbed to page scroll. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  });

  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left scale-x-0 bg-brand-gradient"
      aria-hidden
    />
  );
}
