import type { IconType } from 'react-icons';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiPrisma,
  SiMongodb,
  SiGit,
  SiGithub,
  SiFigma,
  SiRedux,
  SiVitest,
  SiEslint,
  SiGreensock,
  SiThreedotjs,
  SiSocketdotio,
  SiReactrouter,
  SiReactquery,
} from 'react-icons/si';
import { cn } from '@/shared/lib/cn';

/** Tech name → brand icon. Unmapped entries fall back to a monogram. */
const ICONS: Record<string, IconType> = {
  HTML5: SiHtml5,
  CSS3: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  NestJS: SiNestjs,
  Prisma: SiPrisma,
  MongoDB: SiMongodb,
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
  Redux: SiRedux,
  'RTK Query': SiRedux,
  'TanStack Query': SiReactquery,
  Vitest: SiVitest,
  ESLint: SiEslint,
  GSAP: SiGreensock,
  'Three.js': SiThreedotjs,
  'Socket.IO': SiSocketdotio,
  'React Router': SiReactrouter,
};

export function TechIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name];
  if (Icon) return <Icon className={className} aria-hidden />;

  const initials = name
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className={cn(
        'grid place-items-center text-[0.62em] font-bold leading-none',
        className,
      )}
      aria-hidden
    >
      {initials}
    </span>
  );
}
