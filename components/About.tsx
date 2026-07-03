'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Coffee, Croissant, Pizza } from 'lucide-react';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import WarmImage from './WarmImage';
import ColumnDivider from './ColumnDivider';

const STATS = [
  { icon: Coffee, label: 'Günlük Taze Kavrulmuş Kahve' },
  { icon: Pizza, label: 'Taş Fırından Taze Pizza' },
  { icon: Croissant, label: 'Zengin Kahvaltı Sofrası' },
];

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Editorial image drifts slower than the page while in view
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-26, 26]);

  return (
    <section id="hakkimizda" className="bg-marble py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ColumnDivider tone="light" className="mb-12" />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            {/* PLACEHOLDER — swap for real interior photography of the venue
                (wood-slat façade, marble column, sconce lighting). */}
            <div
              ref={imageRef}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft"
            >
              <motion.div
                className="absolute inset-x-0 -inset-y-8"
                style={{ y: prefersReducedMotion ? 0 : parallaxY }}
              >
                <WarmImage
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
                  alt="Cafe Nowaa sıcak ışıklı iç mekanı"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </motion.div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                Hakkımızda
              </p>
            </Reveal>

            <MaskedText
              as="h2"
              lines={['Hikayemiz']}
              className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            />

            <Reveal delay={0.15}>
              <div className="mt-6 h-px w-16 bg-gold" aria-hidden="true" />

              <div className="mt-8 space-y-5 text-base leading-relaxed text-stone-soft sm:text-lg">
                <p>
                  Cafe Nowaa, Bostancı Marmaray&apos;ın hemen yanı başında,
                  şehrin telaşına şık bir mola vermek için doğdu. Siyah ahşap
                  cephemizin ardında; taze kavrulmuş kahve kokusu, taş fırından
                  yeni çıkmış pizzalar ve gün boyu süren kahvaltı sofraları sizi
                  bekliyor.
                </p>
                <p>
                  Sabah trene yetişmeden önce alınan bir filtre kahve, öğlen
                  arası hızlı ama özenli bir burger, akşamüstü uzayan bir
                  makarna sohbeti… Nowaa, günün her saatine eşlik eden bir
                  mahalle bistrosu.
                </p>
                <p>
                  Amacımız basit: lüks hissettiren ama herkesin kendini evinde
                  bulduğu, İstanbul&apos;a yakışan sıcak bir buluşma noktası
                  olmak.
                </p>
              </div>

              <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                {STATS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="rounded-2xl bg-marble-surface p-4 text-center shadow-soft"
                  >
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-3 text-sm font-medium leading-snug text-ink">
                      {label}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
