import { cn } from '@/shared/lib/cn';

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('container-px', className)} {...props} />;
}
