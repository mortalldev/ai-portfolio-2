import { useTranslations } from 'next-intl';
import { Briefcase, Globe2, MapPin, Sparkles } from 'lucide-react';
import { Badge, Container, Reveal, SectionHeading } from '@/shared/ui';
import { siteConfig } from '@/shared/config/site';

export function About() {
  const t = useTranslations('about');
  const paragraphs = t.raw('paragraphs') as string[];
  const interests = t.raw('interests') as string[];

  const facts = [
    { icon: MapPin, label: siteConfig.location },
    { icon: Briefcase, label: siteConfig.role },
    { icon: Globe2, label: 'UZ · RU · EN' },
  ];

  return (
    <section id="about" className="section-py relative">
      <Container className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading kicker={t('kicker')} title={t('title')} />

          <Reveal as="p" className="text-pretty text-lg leading-relaxed text-foreground/90">
            {t('lead')}
          </Reveal>

          <div className="flex flex-col gap-4">
            {paragraphs.map((paragraph, i) => (
              <Reveal
                key={i}
                as="p"
                delay={i * 0.05}
                className="text-pretty leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>

          <Reveal className="flex flex-col gap-3 pt-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              {t('interestsTitle')}
            </span>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest} className="px-3 py-1.5 text-sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Quick facts card */}
        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          <div className="card-surface relative overflow-hidden rounded-3xl p-7 shadow-card">
            <div className="absolute inset-0 -z-10 bg-radial-fade opacity-60" />
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-gradient font-display text-2xl font-bold text-primary-foreground">
                {siteConfig.firstName[0]}
                {siteConfig.lastName[0]}
              </span>
              <div>
                <p className="font-display text-lg font-semibold">
                  {siteConfig.name}
                </p>
                <p className="text-sm text-muted-foreground">{siteConfig.role}</p>
              </div>
            </div>

            <div className="my-6 h-px w-full bg-border/70" />

            <ul className="flex flex-col gap-4">
              {facts.map((fact) => (
                <li
                  key={fact.label}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted/60 text-primary">
                    <fact.icon className="h-4 w-4" />
                  </span>
                  {fact.label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
