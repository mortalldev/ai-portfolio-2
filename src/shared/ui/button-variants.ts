import { cn } from '@/shared/lib/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg' | 'icon';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-glow hover:brightness-110 active:scale-[0.98]',
  secondary: 'bg-muted text-foreground hover:bg-muted/70 active:scale-[0.98]',
  outline:
    'border border-border bg-transparent text-foreground hover:border-primary/60 hover:bg-primary/5 active:scale-[0.98]',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
  icon: 'h-11 w-11',
};

export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export type { Variant as ButtonVariant, Size as ButtonSize };
