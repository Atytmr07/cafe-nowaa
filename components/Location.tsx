'use client';

import { Clock, Instagram, MapPin, Phone } from 'lucide-react';
import Magnetic from './Magnetic';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import ColumnDivider from './ColumnDivider';
import { BUSINESS } from '@/config/business';
import { trackEvent } from '@/lib/firebase';

export default function Location() {
  return (
    <section id="konum" className="bg-pearl py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
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
                href={BUSINESS.mapsUrl}
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
            {/*
              MAP PLACEHOLDER — swap for the real Google Maps iframe once the
              client's Business Profile / exact coordinates are confirmed:

              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                className="h-full w-full border-0"
                loading="lazy" allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Cafe Nowaa konumu"
              />
            */}
            <div className="relative flex h-full min-h-[420px] flex-col items-center justify-center bg-ivory p-10 text-center shadow-soft">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 border border-ink/10"
              />
              <MapPin
                className="h-7 w-7 text-steel"
                strokeWidth={1}
                aria-hidden="true"
              />
              <p className="mt-6 font-display text-2xl leading-snug text-ink">
                Bostancı Marmaray
                <br />
                <em className="italic">Girişi Yanı</em>
              </p>
              <span className="mt-5 h-px w-12 bg-ink/20" aria-hidden="true" />
              <p className="mt-5 max-w-xs text-xs font-light leading-relaxed text-steel">
                Harita gömme alanı — gerçek Google Maps embed&apos;i burada yer
                alacak.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
