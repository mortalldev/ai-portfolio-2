import { useTranslations } from 'next-intl';
import { Mail, Phone, Send } from 'lucide-react';
import { Container, Reveal, SectionHeading, SocialIcon } from '@/shared/ui';
import { ContactForm } from '@/features/contact-form';
import { siteConfig, socials } from '@/shared/config/site';

export function Contact() {
  const t = useTranslations('contact');

  const directLinks = [
    { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: siteConfig.phone, href: siteConfig.phoneHref },
    {
      icon: Send,
      label: `@${siteConfig.handles.telegram}`,
      href: `https://t.me/${siteConfig.handles.telegram}`,
    },
  ];

  return (
    <section id="contact" className="section-py relative overflow-hidden">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            kicker={t('kicker')}
            title={t('title')}
            subtitle={t('subtitle')}
          />

          <Reveal className="flex flex-col gap-4">
            <span className="text-sm font-semibold text-foreground">
              {t('directTitle')}
            </span>
            <ul className="flex flex-col gap-3">
              {directLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-card/50 text-primary transition-colors group-hover:border-primary/40">
                      <link.icon className="h-4 w-4" />
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.name}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <SocialIcon name={social.icon} className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="card-surface rounded-3xl p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
