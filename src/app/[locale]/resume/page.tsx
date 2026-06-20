import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SocialIcon } from '@/shared/ui';
import { siteConfig, socials } from '@/shared/config/site';
import {
  experiences,
  projects,
  resumeLanguages,
  skillGroups,
  softSkills,
} from '@/shared/config/data';
import { PrintButton } from './print-button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: t('resume'),
    robots: { index: false, follow: true },
  };
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('resume');
  const tHero = await getTranslations('hero');
  const tExp = await getTranslations('experience');
  const tProj = await getTranslations('projects');
  const tSkills = await getTranslations('skills');

  return (
    <div className="min-h-svh bg-zinc-100 py-8 text-zinc-800 print:bg-white print:py-0">
      {/* Screen-only toolbar */}
      <div className="no-print mx-auto mb-6 flex max-w-[820px] items-center justify-between px-5">
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Link>
        <PrintButton />
      </div>

      {/* Resume sheet */}
      <article className="mx-auto max-w-[820px] bg-white px-8 py-10 shadow-sm print:max-w-none print:px-0 print:py-0 print:shadow-none sm:px-12 sm:py-12">
        {/* Header */}
        <header className="border-b border-zinc-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="mt-1 text-lg font-medium text-indigo-600">
            {siteConfig.role}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-zinc-600">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-1.5 hover:text-indigo-600"
            >
              <Mail className="h-3.5 w-3.5" />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-1.5 hover:text-indigo-600"
            >
              <Phone className="h-3.5 w-3.5" />
              {siteConfig.phone}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {siteConfig.location}
            </span>
            {socials
              .filter((s) => s.icon !== 'mail')
              .map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="inline-flex items-center gap-1.5 hover:text-indigo-600"
                >
                  <SocialIcon name={social.icon} className="h-3.5 w-3.5" />
                  {social.handle}
                </a>
              ))}
          </div>
        </header>

        <div className="grid gap-8 pt-6 sm:grid-cols-[1.7fr_1fr]">
          {/* Main column */}
          <div className="flex flex-col gap-7">
            <Section title={t('summaryTitle')}>
              <p className="text-sm leading-relaxed text-zinc-600">
                {tHero('summary')}
              </p>
            </Section>

            <Section title={t('experienceTitle')}>
              <div className="flex flex-col gap-5">
                {experiences.map((exp) => (
                  <div key={exp.key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm font-semibold text-zinc-900">
                        {tExp(`items.${exp.key}.role`)}
                      </h3>
                      <span className="shrink-0 text-xs font-medium text-zinc-500">
                        {exp.start} —{' '}
                        {exp.end === 'present' ? t('present') : exp.end}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-indigo-600">
                      {exp.company} · {exp.location}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                      {tExp(`items.${exp.key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={t('projectsTitle')}>
              <div className="flex flex-col gap-4">
                {projects.map((project) => (
                  <div key={project.key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm font-semibold text-zinc-900">
                        {project.name}
                      </h3>
                      <span className="shrink-0 text-xs text-zinc-500">
                        {tProj(`items.${project.key}.category`)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm leading-relaxed text-zinc-600">
                      {tProj(`items.${project.key}.tagline`)}.{' '}
                      {tProj(`items.${project.key}.description`)}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {project.tech.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-7">
            <Section title={t('skillsTitle')}>
              <div className="flex flex-col gap-4">
                {skillGroups.map((group) => (
                  <div key={group.category}>
                    <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      {tSkills(`categories.${group.category}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-700">
                      {group.items.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={t('softTitle')}>
              <ul className="flex flex-col gap-1.5">
                {softSkills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-start gap-2 text-sm text-zinc-700"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-500" />
                    {tSkills(`soft.${skill}`)}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title={t('educationTitle')}>
              <ul className="flex flex-col gap-1.5">
                {resumeLanguages.map((lang) => (
                  <li key={lang} className="text-sm text-zinc-700">
                    {t(`languages.${lang}`)}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      </article>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-900">
        {title}
      </h2>
      {children}
    </section>
  );
}
