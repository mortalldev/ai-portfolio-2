'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/shared/lib/gsap';
import { useMediaQuery } from '@/shared/lib/hooks';

/** A dot + trailing ring that follows the cursor and grows over interactive nodes. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery('(pointer: fine)');

  useGSAP(
    () => {
      if (!fine) return;
      const d = dot.current;
      const r = ring.current;
      if (!d || !r) return;

      gsap.set([d, r], { xPercent: -50, yPercent: -50 });

      const dx = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3' });
      const dy = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3' });
      const rx = gsap.quickTo(r, 'x', { duration: 0.4, ease: 'power3' });
      const ry = gsap.quickTo(r, 'y', { duration: 0.4, ease: 'power3' });

      const move = (e: MouseEvent) => {
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      };
      const isInteractive = (t: EventTarget | null) =>
        t instanceof Element && t.closest('a, button, [data-cursor]');
      const over = (e: MouseEvent) => {
        if (isInteractive(e.target))
          gsap.to(r, { scale: 1.9, opacity: 0.5, duration: 0.3 });
      };
      const out = (e: MouseEvent) => {
        if (isInteractive(e.target))
          gsap.to(r, { scale: 1, opacity: 1, duration: 0.3 });
      };

      window.addEventListener('mousemove', move);
      document.addEventListener('mouseover', over);
      document.addEventListener('mouseout', out);
      return () => {
        window.removeEventListener('mousemove', move);
        document.removeEventListener('mouseover', over);
        document.removeEventListener('mouseout', out);
      };
    },
    { dependencies: [fine] },
  );

  if (!fine) return null;

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 rounded-full border border-primary/70 mix-blend-difference lg:block"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-primary lg:block"
      />
    </>
  );
}
