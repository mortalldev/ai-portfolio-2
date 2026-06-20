import { cn } from '@/shared/lib/cn';

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}
