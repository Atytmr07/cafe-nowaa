import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';
import NVLogo from '@/components/NVLogo';
import { BUSINESS } from '@/config/business';

/**
 * Compact masthead for the standalone /menu experience — deliberately
 * not the homepage Navbar. The mark, a way back, and tap-to-call.
 */
export default function MenuHeader() {
  return (
    <header className="relative border-b border-pearl/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_140%_at_50%_0%,rgba(246,245,242,0.07),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center gap-2 justify-self-start text-[10px] font-medium uppercase tracking-[0.2em] text-silver transition-colors hover:text-pearl"
          aria-label="Ana sayfaya dön"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
          <span className="hidden sm:inline">Ana Sayfa</span>
        </Link>

        <div className="flex flex-col items-center gap-2">
          <NVLogo className="h-11 w-11 text-pearl" />
          <span className="font-display text-sm tracking-[0.18em] text-pearl">
            CAFE NOWAA
          </span>
        </div>

        <a
          href={BUSINESS.phoneHref}
          className="inline-flex min-h-12 min-w-12 items-center justify-center justify-self-end text-silver transition-colors hover:text-pearl"
          aria-label={`Bizi arayın: ${BUSINESS.phone}`}
        >
          <Phone className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
