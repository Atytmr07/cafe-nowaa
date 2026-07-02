import Link from 'next/link';
import { Instagram, MapPin, Phone } from 'lucide-react';
import NVLogo from './NVLogo';
import FooterWordmark from './FooterWordmark';
import { BUSINESS } from '@/config/business';

const PAGE_LINKS = [
  { href: '/menu', label: 'Menü' },
  { href: '#hakkimizda', label: 'Hakkımızda' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#yorumlar', label: 'Yorumlar' },
  { href: '#konum', label: 'Konum' },
];

export default function Footer() {
  return (
    <footer
      id="iletisim"
      className="relative overflow-hidden bg-noir pt-20 md:pt-28"
    >
      {/* Oversized typographic backdrop with scroll-linked drift */}
      <FooterWordmark />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="flex min-h-12 items-center gap-3"
              aria-label="Cafe Nowaa ana sayfa"
            >
              <NVLogo className="h-10 w-10 text-gold" />
              <span className="font-display text-xl font-semibold tracking-tight text-cream">
                Cafe Nowaa
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone">
              {BUSINESS.tagline}. Kahve, pizza, burger ve kahvaltı —
              Marmaray&apos;ın hemen yanı başında.
            </p>
          </div>

          <nav aria-label="Sayfa bağlantıları">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Sayfalar
            </h3>
            <ul className="mt-5 space-y-1">
              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      className="inline-flex min-h-10 items-center text-sm text-stone transition-colors hover:text-gold-bright"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex min-h-10 items-center text-sm text-stone transition-colors hover:text-gold-bright"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">
              İletişim
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-stone">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
                <a
                  href={BUSINESS.phoneHref}
                  className="transition-colors hover:text-gold-bright"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-bright"
                >
                  {BUSINESS.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Çalışma Saatleri
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-stone">
              {BUSINESS.hours}
            </p>
            <p className="mt-2 text-xs text-stone/70">
              Bayram ve özel günlerde çalışma saatleri değişebilir.
            </p>
          </div>
        </div>

        {/* Gold hairline above the bottom bar */}
        <div className="mt-16 h-px w-full bg-gold/25" aria-hidden="true" />

        <div className="flex flex-col items-center justify-between gap-3 py-7 sm:flex-row">
          <p className="text-xs text-stone">
            © {new Date().getFullYear()} Cafe Nowaa. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-stone/70">
            Bostancı Marmaray Girişi Yanı, İstanbul
          </p>
        </div>
      </div>
    </footer>
  );
}
