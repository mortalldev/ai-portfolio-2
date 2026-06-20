import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import {
  Container,
  Marquee,
  Reveal,
  SectionHeading,
  TechIcon,
} from '@/shared/ui';
import { marqueeTech, skillGroups, softSkills } from '@/shared/config/data';

export function Skills() {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="section-py relative overflow-hidden">
      <Container>
        <SectionHeading
          kicker={t('kicker')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
        />
      </Container>

      <Reveal className="py-12">
        <Marquee>
          {marqueeTech.map((tech) => (
            <span
              key={tech}
              className="mx-2 inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-card/40 px-5 py-2.5 text-sm font-medium text-muted-foreground"
            >
              <TechIcon name={tech} className="h-5 w-5 text-foreground" />
              {tech}
            </span>
          ))}
        </Marquee>
      </Reveal>

      <Container>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.category}
              delay={i * 0.05}
              className="card-surface hover-glow group flex flex-col gap-5 rounded-2xl p-6"
            >
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-xl font-semibold">
                  {t(`categories.${group.category}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`categories.${group.category}.description`)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-1.5 text-sm transition-colors group-hover:border-primary/30"
                  >
                    <TechIcon name={item} className="h-4 w-4 text-foreground" />
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}

          {/* Soft skills */}
          <Reveal
            delay={0.1}
            className="card-surface flex flex-col gap-5 rounded-2xl p-6 md:col-span-2 lg:col-span-2"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-xl font-semibold">
                {t('categories.soft.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('categories.soft.description')}
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {softSkills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2.5 text-sm text-foreground/90"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t(`soft.${skill}`)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
