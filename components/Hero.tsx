'use client';

import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import AnimatedNVLogo from './AnimatedNVLogo';
import Magnetic from './Magnetic';
import GrainOverlay from './GrainOverlay';
import { BUSINESS } from '@/config/business';
import { trackEvent } from '@/lib/firebase';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // The composition settles back as the page moves on
  const markY = useTransform(scrollY, [0, 800], [0, 140]);
  const contentY = useTransform(scrollY, [0, 800], [0, 60]);
  const fade = useTransform(scrollY, [0, 520], [1, 0]);

  const rise = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <header className="relative flex min-h-[100svh] flex-col overflow-hidden bg-obsidian bg-slats">
      <GrainOverlay />

      {/* Ambient wash — the sconce light pooling on a black wall */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_38%,rgba(246,245,242,0.09),transparent_70%)]"
      />

      {/* Inset hairline frame, drawn corner to corner */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 border border-pearl/[0.07] sm:inset-6 lg:inset-8"
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />

      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : fade }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:px-10"
      >
        {/* The mark, orbited by a slow dashed ring */}
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : markY }}
          className="relative flex items-center justify-center"
        >
          <div
            aria-hidden="true"
            className="absolute h-56 w-56 rounded-full bg-pearl/[0.07] blur-3xl sm:h-72 sm:w-72"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="animate-orbit absolute h-40 w-40 text-platinum/25 sm:h-52 sm:w-52"
            fill="none"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="1 5"
              strokeLinecap="round"
            />
          </svg>
          <AnimatedNVLogo
            delay={0.35}
            weight={4.2}
            className="relative h-24 w-24 text-pearl drop-shadow-[0_0_28px_rgba(246,245,242,0.22)] sm:h-32 sm:w-32"
          />
        </motion.div>

        <motion.div
          style={{ y: prefersReducedMotion ? 0 : contentY }}
          className="mt-10 flex flex-col items-center"
        >
          {/* Eyebrow between two hairlines */}
          <motion.p
            {...rise(1.5)}
            className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-luxe text-silver sm:text-[11px]"
          >
            <span aria-hidden="true" className="h-px w-8 bg-platinum/40 sm:w-14" />
            Bostancı Marmaray · İstanbul
            <span aria-hidden="true" className="h-px w-8 bg-platinum/40 sm:w-14" />
          </motion.p>

          <h1 className="mt-7 max-w-5xl font-display font-normal leading-[1.02] tracking-tight">
            <motion.span
              {...rise(1.62)}
              className="shimmer-text block"
              style={{ fontSize: 'clamp(2.75rem, 9vw, 6.5rem)' }}
            >
              İstanbul&apos;un Kalbinde
            </motion.span>
            <motion.span
              {...rise(1.76)}
              className="mt-1 block italic text-pearl/90"
              style={{ fontSize: 'clamp(2.25rem, 7.2vw, 5.25rem)' }}
            >
              Bostancı&apos;nın Yeni Adresi
            </motion.span>
          </h1>

          <motion.p
            {...rise(1.9)}
            className="mt-8 max-w-xl text-balance text-sm font-light leading-relaxed text-silver sm:text-base"
          >
            Kahve, kahvaltı, taş fırın pizza, burger ve daha fazlası —
            Marmaray&apos;ın hemen yanı başında, şık bir mola.
          </motion.p>

          <motion.div
            {...rise(2.04)}
            className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Magnetic>
              <Link
                href="/menu"
                onClick={() => trackEvent('cta_click', { cta: 'hero_menu' })}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-pearl px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-obsidian shadow-halo transition-all duration-300 hover:bg-ivory hover:shadow-halo-strong"
              >
                Menüyü Keşfet
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Magnetic>

            <Magnetic>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_click', { cta: 'hero_directions' })}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-pearl/25 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-pearl transition-colors duration-300 hover:border-pearl/60 hover:bg-pearl/[0.04]"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Yol Tarifi
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — a light travelling down a hairline */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="relative z-10 flex justify-center pb-10"
      >
        <span className="relative block h-14 w-px overflow-hidden bg-pearl/15">
          {!prefersReducedMotion && (
            <motion.span
              className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-pearl to-transparent"
              animate={{ y: ['-100%', '260%'] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </span>
      </motion.div>
    </header>
  );
}
