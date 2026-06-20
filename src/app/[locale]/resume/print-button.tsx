'use client';

import { Printer } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function PrintButton() {
  const t = useTranslations('resume');
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-full bg-indigo-600 px-5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
    >
      <Printer className="h-4 w-4" />
      {t('download')}
    </button>
  );
}
