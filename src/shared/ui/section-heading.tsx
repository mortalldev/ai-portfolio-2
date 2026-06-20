import { cn } from '@/shared/lib/cn';
import { Reveal } from './reveal';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex max-w-2xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {kicker && (
        <Reveal
          as="span"
          className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
        >
          <span className="h-px w-8 bg-primary/60" aria-hidden />
          {kicker}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={0.05}
        className="text-balance font-display text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.85rem]"
      >
        {title}
      </Reveal>
      {subtitle && (
        <Reveal
          as="p"
          delay={0.1}
          className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
