/**
 * Structural, non-translatable data. All human-readable copy lives in
 * `messages/*.json` and is referenced here only by key, so the same data drives
 * every locale and the print resume.
 */

export const navItems = [
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
] as const;

export type NavItem = (typeof navItems)[number];

export const stats = [
  { key: 'years', value: 4, suffix: '+' },
  { key: 'projects', value: 30, suffix: '+' },
  { key: 'companies', value: 5, suffix: '' },
  { key: 'technologies', value: 20, suffix: '+' },
] as const;

/** Skill categories — `items` are technology ids resolved to icons in the UI. */
export const skillGroups = [
  {
    category: 'frontend',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'shadcn/ui',
    ],
  },
  {
    category: 'backend',
    items: ['Node.js', 'NestJS', 'Prisma', 'MongoDB'],
  },
  {
    category: 'tools',
    items: [
      'Git',
      'GitHub',
      'Figma',
      'Redux',
      'RTK Query',
      'TanStack Query',
      'Zustand',
      'Zod',
      'ESLint',
      'Vitest',
      'CI/CD',
    ],
  },
] as const;

export const softSkills = [
  'teamwork',
  'learning',
  'problemSolving',
  'deadlines',
] as const;

/** Marquee tech list (a curated subset, order tuned for visual rhythm). */
export const marqueeTech = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'NestJS',
  'Redux',
  'TanStack Query',
  'Zustand',
  'Prisma',
  'MongoDB',
  'GSAP',
  'Figma',
  'Git',
] as const;

export type ProjectStatus = 'shipped' | 'ongoing';

export interface Project {
  key: string;
  /** Brand name — identical across locales, so it lives here, not in messages. */
  name: string;
  tech: string[];
  status: ProjectStatus;
  featured: boolean;
  /** Optional external links — rendered only when present. */
  live?: string;
  source?: string;
}

export const projects: Project[] = [
  {
    key: 'mentour',
    name: 'Mentour',
    tech: ['Next.js', 'Tailwind CSS', 'Zustand', 'TanStack Query'],
    status: 'ongoing',
    featured: true,
  },
  {
    key: 'lactalis',
    name: 'Lactalis CRM',
    tech: ['React', 'Tailwind CSS', 'Redux', 'RTK Query', 'AWS S3'],
    status: 'shipped',
    featured: true,
  },
  {
    key: 'goavto',
    name: 'Go Avto',
    tech: ['Next.js', 'Tailwind CSS', 'Redux', 'RTK Query', 'Three.js'],
    status: 'shipped',
    featured: false,
  },
  {
    key: 'oxygen',
    name: 'Oxygen House',
    tech: ['React', 'Tailwind CSS', 'Redux', 'TanStack Query', 'Three.js'],
    status: 'shipped',
    featured: false,
  },
  {
    key: 'navbatda',
    name: 'Navbatda',
    tech: ['React', 'Redux', 'RTK Query', 'React Router', 'Socket.IO'],
    status: 'shipped',
    featured: false,
  },
];

export interface Experience {
  key: string;
  company: string;
  start: string;
  /** `'present'` resolves to a localized label in the UI. */
  end: string;
  location: string;
}

export const experiences: Experience[] = [
  {
    key: 'tune',
    company: 'TUNE Consulting',
    start: '2026',
    end: 'present',
    location: 'Tashkent, Uzbekistan',
  },
  {
    key: 'algoritm',
    company: 'Algoritm Learning Center',
    start: '2025',
    end: '2026',
    location: 'Namangan, Uzbekistan',
  },
  {
    key: 'technova',
    company: 'Technova IT Academy',
    start: '2024',
    end: '2025',
    location: 'Namangan, Uzbekistan',
  },
  {
    key: 'realsoft',
    company: 'Realsoft',
    start: '2023',
    end: '2024',
    location: 'Namangan, Uzbekistan',
  },
  {
    key: 'nisd',
    company: 'NISD',
    start: '2022',
    end: '2023',
    location: 'Namangan, Uzbekistan',
  },
];

export const resumeLanguages = ['uz', 'ru', 'en'] as const;
