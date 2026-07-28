'use client';

import { useEffect } from 'react';
import NVLogo from '@/components/NVLogo';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in the hosting logs; wire to a reporter when one exists
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-obsidian px-6 text-center">
      <NVLogo className="h-16 w-16 text-pearl" />

      <h1 className="mt-10 font-display text-4xl leading-tight tracking-tight text-pearl sm:text-5xl">
        Bir şeyler
        <br />
        <em className="italic text-platinum">ters gitti</em>
      </h1>
      <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-silver">
        Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.
      </p>

      <button
        type="button"
        onClick={reset}
        className="mt-10 inline-flex min-h-12 items-center rounded-full bg-pearl px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ivory"
      >
        Tekrar Dene
      </button>
    </main>
  );
}
