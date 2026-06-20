import { useTranslations } from 'next-intl';
import { ArrowUpRight, Github } from 'lucide-react';
import {
  Badge,
  Container,
  Reveal,
  SectionHeading,
  TechIcon,
} from '@/shared/ui';
import { projects } from '@/shared/config/data';
import { cn } from '@/shared/lib/cn';

export function Projects() {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="section-py relative">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          kicker={t('kicker')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => {
            const spanFull =
              i === projects.length - 1 && projects.length % 2 !== 0;
            return (
              <Reveal
                key={project.key}
                delay={(i % 2) * 0.06}
                className={cn(spanFull && 'md:col-span-2')}
              >
                <article className="card-surface hover-glow group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl p-6 sm:p-8">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs uppercase tracking-wider text-primary">
                        {t(`items.${project.key}.category`)}
                      </span>
                      <h3 className="font-display text-2xl font-bold">
                        {project.name}
                      </h3>
                    </div>
                    {project.status === 'ongoing' ? (
                      <Badge className="border-accent/40 bg-accent/10 text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {t('ongoing')}
                      </Badge>
                    ) : (
                      project.featured && (
                        <Badge className="border-primary/40 bg-primary/10 text-primary">
                          {t('featured')}
                        </Badge>
                      )
                    )}
                  </div>

                  <p className="text-pretty font-medium text-foreground/90">
                    {t(`items.${project.key}.tagline`)}
                  </p>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {t(`items.${project.key}.description`)}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        <TechIcon name={tech} className="h-3.5 w-3.5" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  {(project.live || project.source) && (
                    <div className="flex items-center gap-4 pt-1">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                          {t('live')}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {project.source && (
                        <a
                          href={project.source}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                          <Github className="h-4 w-4" />
                          {t('source')}
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
