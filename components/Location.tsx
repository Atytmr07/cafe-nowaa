'use client';

import { Clock, Instagram, MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import Magnetic from './Magnetic';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import ColumnDivider from './ColumnDivider';
import CoffeeBeans from './decor/CoffeeBeans';
import DotWeave from './decor/DotWeave';
import SectionWave from './decor/SectionWave';
import { BUSINESS } from '@/config/business';
import { trackEvent } from '@/lib/firebase';

export default function Location() {
  return (
    <section id="konum" className="relative overflow-hidden bg-pearl py-24 md:py-32">
      <DotWeave className="pointer-events-none absolute inset-0 opacity-[0.045]" />
      <CoffeeBeans
        tone="gold"
        className="pointer-events-none absolute -right-4 top-16 h-16 w-28 rotate-[18deg] opacity-[0.16] sm:right-10"
      />
      <CoffeeBeans
        tone="ink"
        className="pointer-events-none absolute bottom-14 left-8 h-14 w-24 -rotate-[12deg] opacity-[0.1] sm:left-16"
      />
      {/* The seam into Footer */}
      <SectionWave fill="var(--obsidian)" className="absolute inset-x-0 bottom-0 h-10 w-full sm:h-14" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ColumnDivider tone="light" className="mb-16" />

        <div className="text-center">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-luxe text-steel">
              Konum
            </p>
          </Reveal>

          <MaskedText
            as="h2"
            lines={[
              <>
                Konum &amp; <em className="italic">İletişim</em>
              </>,
            ]}
            className="mt-5 font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-6xl"
          />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              <li className="flex items-start gap-5 py-6">
                <MapPin
                  className="mt-0.5 h-5 w-5 flex-none text-steel"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-steel">
                    Adres
                  </p>
                  <p className="mt-2 text-[15px] font-light leading-relaxed text-ink">
                    {BUSINESS.address}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-5 py-6">
                <Phone
                  className="mt-0.5 h-5 w-5 flex-none text-steel"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-steel">
                    Telefon
                  </p>
                  <a
                    href={BUSINESS.phoneHref}
                    onClick={() => trackEvent('cta_click', { cta: 'call' })}
                    className="mt-1 inline-flex min-h-12 items-center font-display text-2xl text-ink transition-opacity hover:opacity-60"
                    aria-label={`Telefon: ${BUSINESS.phone}`}
                  >
                    {BUSINESS.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-5 py-6">
                <WhatsAppIcon className="mt-0.5 h-5 w-5 flex-none text-steel" />
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-steel">
                    WhatsApp
                  </p>
                  <a
                    href={BUSINESS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cta_click', { cta: 'whatsapp_location' })}
                    className="mt-1 inline-flex min-h-12 items-center text-[15px] font-light text-ink transition-opacity hover:opacity-60"
                  >
                    WhatsApp&apos;tan yazın
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-5 py-6">
                <Clock
                  className="mt-0.5 h-5 w-5 flex-none text-steel"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-steel">
                    Çalışma Saatleri
                  </p>
                  <p className="mt-2 text-[15px] font-light text-ink">
                    {BUSINESS.hours}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-5 py-6">
                <Instagram
                  className="mt-0.5 h-5 w-5 flex-none text-steel"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-steel">
                    Instagram
                  </p>
                  <a
                    href={BUSINESS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-12 items-center text-[15px] font-light text-ink transition-opacity hover:opacity-60"
                  >
                    {BUSINESS.instagramHandle}
                  </a>
                </div>
              </li>
            </ul>

            <Magnetic className="mt-10 inline-block">
              <a
                href={BUSINESS.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_click', { cta: 'directions' })}
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-pearl transition-colors duration-300 hover:bg-obsidian"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                Yol Tarifi Al
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full min-h-[420px] overflow-hidden shadow-soft">
              <iframe
                src={BUSINESS.mapEmbedUrl}
                title="Cafe Nowaa konumu — Google Haritalar"
                className="h-full min-h-[420px] w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 border border-ink/10"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
