import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { Container, Reveal, SectionHeading } from '@/shared/ui';
import { experiences } from '@/shared/config/data';
import { cn } from '@/shared/lib/cn';

export function Experience() {
  const t = useTranslations('experience');

  return (
    <section id="experience" className="section-py relative">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          kicker={t('kicker')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="flex flex-col">
          {experiences.map((exp, i) => {
            const isLast = i === experiences.length - 1;
            const period = `${exp.start} — ${exp.end === 'present' ? t('present') : exp.end}`;

            return (
              <Reveal
                key={exp.key}
                delay={i * 0.04}
                className="grid grid-cols-[auto_1fr] gap-x-5"
              >
                {/* Timeline marker + connector */}
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      'mt-1.5 grid h-4 w-4 place-items-center rounded-full border-2 bg-background',
                      i === 0 ? 'border-primary' : 'border-border',
                    )}
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        i === 0 ? 'bg-primary' : 'bg-muted-foreground/50',
                      )}
                    />
                  </span>
                  {!isLast && (
                    <span className="my-1.5 w-px flex-1 bg-gradient-to-b from-border to-border/30" />
                  )}
                </div>

                {/* Content */}
                <div className={cn('flex flex-col gap-1.5', isLast ? 'pb-0' : 'pb-10')}>
                  <span className="font-mono text-xs tracking-wide text-primary">
                    {period}
                  </span>
                  <h3 className="font-display text-lg font-semibold">
                    {t(`items.${exp.key}.role`)}
                  </h3>
                  <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm font-medium text-foreground/90">
                    {exp.company}
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </span>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {t(`items.${exp.key}.description`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
