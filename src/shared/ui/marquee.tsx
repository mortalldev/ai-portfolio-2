import { cn } from '@/shared/lib/cn';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
}

/** Seamless infinite marquee — duplicates content and scrolls -50%. */
export function Marquee({ children, className, reverse }: MarqueeProps) {
  return (
    <div className={cn('mask-fade-x flex overflow-hidden', className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 animate-marquee items-center gap-4 pr-4',
            reverse && '[animation-direction:reverse]',
          )}
          aria-hidden={i === 1}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
