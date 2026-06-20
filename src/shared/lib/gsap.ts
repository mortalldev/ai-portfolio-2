'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins once, on the client only.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // Sensible global defaults for a cohesive motion language.
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });
}

export { gsap, ScrollTrigger, useGSAP };

/** Shared easing + timing tokens so motion feels consistent across the site. */
export const motion = {
  ease: 'power3.out',
  easeInOut: 'power2.inOut',
  expo: 'expo.out',
  fast: 0.45,
  base: 0.9,
  slow: 1.3,
  stagger: 0.08,
} as const;
