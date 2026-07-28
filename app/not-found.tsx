import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import NVLogo from '@/components/NVLogo';

export const metadata = {
  title: 'Sayfa Bulunamadı',
};

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-obsidian bg-slats px-6 text-center">
      <NVLogo className="h-16 w-16 text-pearl" />

      <p className="mt-10 text-[10px] font-medium uppercase tracking-luxe text-silver">
        404
      </p>
      <h1 className="mt-5 font-display text-4xl leading-tight tracking-tight text-pearl sm:text-5xl">
        Aradığınız sayfa
        <br />
        <em className="italic text-platinum">bulunamadı</em>
      </h1>
      <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-silver">
        Bağlantı taşınmış ya da hiç var olmamış olabilir. Sizi menümüze veya
        ana sayfaya götürelim.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-pearl px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ivory"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Ana Sayfa
        </Link>
        <Link
          href="/menu"
          className="inline-flex min-h-12 items-center rounded-full border border-pearl/25 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-pearl transition-colors hover:border-pearl/60"
        >
          Menü
        </Link>
      </div>
    </main>
  );
}
