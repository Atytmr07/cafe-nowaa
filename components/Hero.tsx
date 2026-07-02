'use client';

import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import AnimatedNVLogo from './AnimatedNVLogo';
import CoffeeSteam from './CoffeeSteam';
import MaskedText from './MaskedText';
import GrainOverlay from './GrainOverlay';
import { BUSINESS } from '@/config/business';

const EASE = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Roundel drifts down slower than the page scrolls (parallax)
  const { scrollY } = useScroll();
  const roundelY = useTransform(scrollY, [0, 700], [0, 110]);

  const item = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  return (
    <header className="relative flex min-h-[100svh] items-center overflow-hidden bg-noir bg-slats">
      <GrainOverlay />

      {/* Oversized NV roundel: draws itself in, breathes gold, drifts on scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 sm:-right-12 lg:right-[8%]"
      >
        <motion.div
          className="relative"
          style={{ y: prefersReducedMotion ? 0 : roundelY }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gold/25 blur-3xl"
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <CoffeeSteam className="absolute -top-20 left-1/2 h-24 w-16 -translate-x-1/2 text-gold" />
          <AnimatedNVLogo
            decorative
            delay={0.4}
            className="relative h-72 w-72 text-gold opacity-[0.16] sm:h-96 sm:w-96 lg:h-[28rem] lg:w-[28rem] lg:opacity-25"
          />
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:pt-32 lg:px-8"
      >
        <motion.p variants={item}>
          <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-gold">
            <span aria-hidden="true">★</span> Bostancı Marmaray Girişi Yanı
          </span>
        </motion.p>

        <MaskedText
          as="h1"
          trigger="mount"
          delay={0.15}
          className="mt-8 max-w-4xl font-display font-bold tracking-tight text-cream"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: 1.05 }}
          lines={[
            <>İstanbul&apos;un Kalbinde,</>,
            <>
              <em className="italic text-gold">Bostancı&apos;nın</em> Yeni
              Adresi.
            </>,
          ]}
        />

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base leading-relaxed text-stone sm:text-lg"
        >
          Kahve, pizza, burger, kahvaltı ve daha fazlası — Marmaray&apos;ın
          hemen yanı başında, şık bir mola.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          {/* Primary conversion action of the whole site → /menu */}
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Link
              href="/menu"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-noir shadow-glow transition-all hover:bg-gold-bright hover:shadow-glow-strong"
            >
              Menüyü Keşfet
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:border-gold-bright hover:text-gold-bright"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Yol Tarifi Al
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
  );
}
