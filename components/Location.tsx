'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Instagram, MapPin, Phone } from 'lucide-react';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import ColumnDivider from './ColumnDivider';
import { BUSINESS } from '@/config/business';

export default function Location() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="konum" className="bg-marble py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ColumnDivider tone="light" className="mb-12" />

        <div className="text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Konum
            </p>
          </Reveal>

          <MaskedText
            as="h2"
            lines={[<>Konum &amp; İletişim</>]}
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone-soft">
                    Adres
                  </p>
                  <p className="mt-1 text-base leading-relaxed text-ink">
                    {BUSINESS.address}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone-soft">
                    Telefon
                  </p>
                  <a
                    href={BUSINESS.phoneHref}
                    className="mt-1 inline-flex min-h-12 items-center text-lg font-semibold text-ink transition-colors hover:text-gold"
                    aria-label={`Telefon: ${BUSINESS.phone}`}
                  >
                    {BUSINESS.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone-soft">
                    Çalışma Saatleri
                  </p>
                  <p className="mt-1 text-base text-ink">{BUSINESS.hours}</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone-soft">
                    Instagram
                  </p>
                  <a
                    href={BUSINESS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-12 items-center text-base font-medium text-ink transition-colors hover:text-gold"
                  >
                    {BUSINESS.instagramHandle}
                  </a>
                </div>
              </li>
            </ul>

            <motion.div
              className="mt-8 inline-block"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-noir shadow-glow transition-all hover:bg-gold-bright hover:shadow-glow-strong"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Yol Tarifi Al
              </a>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1}>
            {/*
              MAP PLACEHOLDER — replace with the real Google Maps iframe embed
              once the client's Google Business profile / exact coordinates are
              confirmed, e.g.:

              <iframe
                src="https://www.google.com/maps/embed?pb=..." // Bostancı Marmaray girişi yanı,
                // Bostancı Mah. Bostan Tariki Sk. No: A1, Bostancı, İstanbul
                className="h-full w-full rounded-2xl border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Cafe Nowaa konumu"
              />
            */}
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-2xl border border-ink/10 bg-marble-surface p-8 text-center shadow-soft">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                <MapPin className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="mt-5 font-display text-xl font-semibold text-ink">
                Bostancı Marmaray Girişi Yanı
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone-soft">
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
