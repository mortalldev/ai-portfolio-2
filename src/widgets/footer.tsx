import { useTranslations } from 'next-intl';
import { Container, SocialIcon } from '@/shared/ui';
import { navItems } from '@/shared/config/data';
import { siteConfig, socials } from '@/shared/config/site';

export function Footer() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const year = new Date().getFullYear();
  const initials = `${siteConfig.firstName[0]}${siteConfig.lastName[0]}`;

  return (
    <footer className="relative border-t border-border/60 bg-card/20">
      <Container className="flex flex-col gap-12 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a
              href="#home"
              className="inline-flex items-center gap-3"
              aria-label={siteConfig.name}
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient font-display text-sm font-bold text-primary-foreground">
                {initials}
              </span>
              <span className="font-display text-lg font-semibold">
                {siteConfig.name}
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {tFooter('tagline')}
            </p>
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.name}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-foreground">
              {tFooter('navTitle')}
            </span>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {tNav(item)}
              </a>
            ))}
          </nav>

          {/* Elsewhere */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-foreground">
              {tFooter('socialTitle')}
            </span>
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. {tFooter('rights')}
          </p>
          <p className="text-xs text-muted-foreground">{tFooter('builtWith')}</p>
        </div>
      </Container>
    </footer>
  );
}
