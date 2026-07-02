import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';
import NVLogo from '@/components/NVLogo';
import { BUSINESS } from '@/config/business';

/**
 * Compact header for the standalone /menu experience — intentionally
 * NOT the homepage Navbar. Just the mark, a way back, and tap-to-call.
 */
export default function MenuHeader() {
  return (
    <header className="border-b border-gold/10">
      <div className="mx-auto grid max-w-5xl grid-cols-3 items-center px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center gap-2 justify-self-start text-xs font-semibold uppercase tracking-widest text-stone transition-colors hover:text-gold-bright"
          aria-label="Ana sayfaya dön"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Ana Sayfa</span>
        </Link>

        <div className="flex items-center justify-center gap-2.5">
          <NVLogo className="h-9 w-9 text-gold" />
          <span className="font-display text-lg font-semibold tracking-tight text-cream">
            Cafe Nowaa
          </span>
        </div>

        <a
          href={BUSINESS.phoneHref}
          className="inline-flex min-h-12 min-w-12 items-center justify-center justify-self-end text-stone transition-colors hover:text-gold-bright"
          aria-label={`Bizi arayın: ${BUSINESS.phone}`}
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
