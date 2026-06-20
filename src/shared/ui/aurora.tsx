import { cn } from '@/shared/lib/cn';

/** Ambient blurred gradient blobs + subtle grid — the site's atmospheric base. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className,
      )}
      aria-hidden
    >
      <div className="absolute -left-20 top-[-10%] h-[36rem] w-[36rem] animate-aurora rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute right-[-10%] top-1/3 h-[28rem] w-[28rem] animate-aurora rounded-full bg-accent/20 blur-[120px] [animation-delay:-7s]" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
    </div>
  );
}
