import Link from 'next/link';
import { Instagram, MapPin, Phone } from 'lucide-react';
import NVLogo from './NVLogo';
import FooterWordmark from './FooterWordmark';
import OpenStatus from './OpenStatus';
import CoffeeBeans from './decor/CoffeeBeans';
import SectionEdge from './decor/SectionEdge';
import WhatsAppIcon from './icons/WhatsAppIcon';
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
      className="relative overflow-hidden bg-obsidian pt-24 md:pt-32"
    >
      <FooterWordmark />
      {/* Sits below the fade's reach, or it would be washed out entirely */}
      <CoffeeBeans
        tone="gold"
        className="pointer-events-none absolute right-6 top-36 h-14 w-24 rotate-[12deg] opacity-[0.14] sm:right-12 md:top-44"
      />
      <CoffeeBeans
        tone="pearl"
        className="pointer-events-none absolute left-6 top-40 h-12 w-20 -rotate-[10deg] opacity-[0.08] sm:left-12 md:top-48"
      />
      <SectionEdge from="pearl" variant="arch" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="flex min-h-12 items-center gap-3"
              aria-label="Cafe Nowaa ana sayfa"
            >
              <NVLogo className="h-10 w-10 text-pearl" />
              <span className="font-display text-lg tracking-wide text-pearl">
                CAFE NOWAA
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-silver">
              {BUSINESS.tagline}. Kahve, kahvaltı, pizza ve burger —
              Marmaray&apos;ın hemen yanı başında.
            </p>
          </div>

          <nav aria-label="Sayfa bağlantıları">
            <h3 className="text-[10px] font-medium uppercase tracking-luxe text-steel">
              Sayfalar
            </h3>
            <ul className="mt-6 space-y-1">
              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      className="inline-flex min-h-10 items-center text-sm font-light text-silver transition-colors hover:text-pearl"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex min-h-10 items-center text-sm font-light text-silver transition-colors hover:text-pearl"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-luxe text-steel">
              İletişim
            </h3>
            <ul className="mt-6 space-y-4 text-sm font-light text-silver">
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 flex-none text-platinum"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <a
                  href={BUSINESS.phoneHref}
                  className="transition-colors hover:text-pearl"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 flex-none text-platinum" />
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-pearl"
                >
                  WhatsApp&apos;tan yazın
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-none text-platinum"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Instagram
                  className="mt-0.5 h-4 w-4 flex-none text-platinum"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-pearl"
                >
                  {BUSINESS.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-luxe text-steel">
              Çalışma Saatleri
            </h3>
            <p className="mt-6 font-display text-2xl text-pearl">
              09:00 — 02:00
            </p>
            <p className="mt-2 text-sm font-light text-silver">Her gün açığız</p>
            <OpenStatus className="mt-3" />
            <p className="mt-4 text-xs font-light leading-relaxed text-steel">
              Bayram ve özel günlerde çalışma saatleri değişebilir.
            </p>
          </div>
        </div>

        <div className="mt-20 h-px w-full bg-pearl/12" aria-hidden="true" />

        <div className="flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
          <p className="text-[11px] font-light tracking-wide text-steel">
            © {new Date().getFullYear()} Cafe Nowaa. Tüm hakları saklıdır.
          </p>
          <p className="text-[11px] font-light tracking-wide text-steel">
            Bostancı Marmaray Girişi Yanı, İstanbul
          </p>
        </div>
      </div>
    </footer>
  );
}
