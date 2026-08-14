'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Coffee, Croissant, Flame } from 'lucide-react';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import Photo from './Photo';
import ColumnDivider from './ColumnDivider';
import CoffeeBeans from './decor/CoffeeBeans';
import DotWeave from './decor/DotWeave';
import OrganicBlob from './decor/OrganicBlob';

const MARKS = [
  { icon: Coffee, label: 'Günlük Taze Kavrulmuş Kahve' },
  { icon: Flame, label: 'Taş Fırından Taze Pizza' },
  { icon: Croissant, label: 'Zengin Kahvaltı Sofrası' },
];

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="hakkimizda"
      className="relative overflow-hidden bg-pearl py-24 md:py-32"
    >
      {/* Quiet texture, breaking up what was a flat cream fill */}
      <DotWeave className="pointer-events-none absolute inset-0 opacity-[0.045]" />
      <OrganicBlob
        tone="gold"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 opacity-[0.09] blur-3xl animate-drift"
      />
      <CoffeeBeans
        tone="ink"
        className="pointer-events-none absolute bottom-10 left-6 h-16 w-28 opacity-[0.14] sm:bottom-16 sm:left-10"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ColumnDivider tone="light" className="mb-16" />

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <div
              ref={imageRef}
              className="relative aspect-[4/5] overflow-hidden shadow-soft"
            >
              <motion.div
                className="absolute inset-x-0 -inset-y-10"
                style={{ y: prefersReducedMotion ? 0 : parallaxY }}
              >
                <Photo
                  src="/giris.jpeg"
                  alt="Cafe Nowaa'nın aydınlatılmış girişi ve sütunlu cephesi, akşamüstü"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  imgClassName={prefersReducedMotion ? '' : 'animate-ken-burns'}
                />
              </motion.div>
              {/* Hairline frame inside the image */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 border border-pearl/25"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[10px] font-medium uppercase tracking-luxe text-steel">
                Hakkımızda
              </p>
            </Reveal>

            <MaskedText
              as="h2"
              lines={[<>Hikayemiz</>]}
              className="mt-5 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl"
            />

            <Reveal delay={0.15}>
              <div className="mt-7 h-px w-14 bg-ink/25" aria-hidden="true" />

              <div className="mt-9 space-y-6 text-[15px] font-light leading-[1.85] text-steel sm:text-base">
                <p>
                  Cafe Nowaa, Bostancı Marmaray&apos;ın hemen yanı başında,
                  şehrin telaşına şık bir mola vermek için doğdu. Siyah ahşap
                  cephemizin ardında; taze kavrulmuş kahve kokusu, taş fırından
                  yeni çıkmış pizzalar ve gün boyu süren kahvaltı sofraları sizi
                  bekliyor.
                </p>
                <p>
                  Sabah trene yetişmeden önce alınan bir filtre kahve, öğlen
                  arası özenli bir burger, akşamüstü uzayan bir makarna
                  sohbeti… Nowaa, günün her saatine eşlik eden bir mahalle
                  bistrosu.
                </p>
                <p className="font-display text-xl italic leading-snug text-ink">
                  Lüks hissettiren ama herkesin kendini evinde bulduğu bir
                  buluşma noktası.
                </p>
              </div>

              <ul className="mt-12 grid gap-px overflow-hidden border border-ink/10 sm:grid-cols-3">
                {MARKS.map(({ icon: Icon, label }) => (
                  <motion.li
                    key={label}
                    className="group flex flex-col items-center gap-3 bg-ivory px-4 py-7 text-center transition-colors duration-300 hover:bg-gold/[0.06]"
                    whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Icon
                      className="h-5 w-5 text-steel transition-colors duration-300 group-hover:text-gold"
                      strokeWidth={1.2}
                      aria-hidden="true"
                    />
                    <p className="text-[11px] font-medium uppercase leading-relaxed tracking-[0.16em] text-ink">
                      {label}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
