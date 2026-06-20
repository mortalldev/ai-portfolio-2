'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Aurora, buttonVariants } from '@/shared/ui';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <Aurora />
      <p className="text-gradient font-display text-8xl font-bold sm:text-9xl">
        404
      </p>
      <h1 className="mt-6 font-display text-2xl font-bold sm:text-3xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t('description')}</p>
      <Link href="/" className={`${buttonVariants({ size: 'lg' })} mt-8`}>
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </Link>
    </main>
  );
}
