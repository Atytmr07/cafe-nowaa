'use client';

import { useEffect, useState } from 'react';
import StaticPhoto from './StaticPhoto';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import AnimatedNVLogo, { NV_DRAW_DURATION } from './AnimatedNVLogo';
import Magnetic from './Magnetic';
import GrainOverlay from './GrainOverlay';
import { BUSINESS } from '@/config/business';
import { trackEvent } from '@/lib/firebase';

const EASE = [0.22, 1, 0.36, 1] as const;
const LOGO_DELAY = 0.1;
/** The instant the V's last stroke lands — the halo lifts to meet it */
const REVEAL_AT = LOGO_DELAY + NV_DRAW_DURATION;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [revealed, setRevealed] = useState(false);

  // The composition settles back as the page moves on
  const markY = useTransform(scrollY, [0, 800], [0, 140]);
  const contentY = useTransform(scrollY, [0, 800], [0, 60]);
  const fade = useTransform(scrollY, [0, 520], [1, 0]);

  // Lifts the halo once, right as the mark finishes drawing itself in.
  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }
    const timer = window.setTimeout(() => setRevealed(true), REVEAL_AT * 1000);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  const rise = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <header className="relative flex min-h-[100svh] flex-col overflow-hidden bg-obsidian">
      {/*
        The venue itself, drifting. This screen used to be an empty black
        rectangle with a logo on it — the single biggest reason the site felt
        lifeless, since a café's first screen should show the café. The image
        carries `priority` because it is the LCP element.
      */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <StaticPhoto
          src="/photos/cafe-nowaa-vitrin-gece.jpeg"
          alt=""
          priority
          sizes="100vw"
          // Crop to the lit doorway: centred, the shot's own CAFE NOWAA sign
          // sat behind the NV mark and the street signpost stayed legible
          // enough to compete with the headline.
          imgClassName={`object-[58%_68%] ${
            prefersReducedMotion ? '' : 'animate-ken-burns'
          }`}
        />
        {/* Scrim: heavy enough that pearl text clears AA contrast over the
            brightest part of the shot (the lit doorway) */}
        <div className="absolute inset-0 bg-obsidian/[0.78]" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/45 to-obsidian" />
        <div className="absolute inset-0 bg-slats" />
      </div>

      <GrainOverlay />

      {/* Ambient wash — the sconce light pooling on a black wall, breathing gently */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_38%,rgba(217,164,65,0.18),transparent_70%)] ${
          !prefersReducedMotion ? 'animate-drift' : ''
        }`}
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
        {/* The mark, orbited by a slow dashed ring, in gold */}
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : markY }}
          className="relative flex items-center justify-center"
        >
          {/* The halo behind the mark. It sits low while the mark inks in,
              then lifts to full strength as the last stroke lands and stays
              there, breathing — the sign lit, rather than a flashbulb. */}
          {/* Two layers on purpose: the outer one handles the one-off lift
              with a plain CSS transition, the inner one breathes. Driving
              both from the same element would put Framer's inline opacity
              and the keyframe animation in a fight over the same property. */}
          <div
            aria-hidden="true"
            className={`absolute h-56 w-56 transition-opacity duration-1000 ease-out sm:h-72 sm:w-72 ${
              revealed ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div
              className={`h-full w-full rounded-full bg-gold/25 blur-3xl ${
                revealed && !prefersReducedMotion ? 'animate-glow-breathe' : ''
              }`}
            />
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="animate-orbit absolute h-36 w-36 text-gold/40 sm:h-48 sm:w-48"
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
            delay={LOGO_DELAY}
            weight={4.2}
            metal
            className="relative h-24 w-24 text-gold-bright drop-shadow-[0_0_28px_rgba(245,206,109,0.55)] sm:h-32 sm:w-32"
          />
        </motion.div>

        <motion.div
          style={{ y: prefersReducedMotion ? 0 : contentY }}
          className="mt-10 flex flex-col items-center"
        >
          {/* Eyebrow between two hairlines. Copy leads rather than waiting
              for the logo to finish drawing — the mark keeps inking in
              behind it, but the headline must not cost seconds of LCP. */}
          <motion.p
            {...rise(0.15)}
            className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-luxe text-silver sm:text-[11px]"
          >
            <span aria-hidden="true" className="h-px w-8 bg-gold/40 sm:w-14" />
            Bostancı Marmaray · İstanbul
            <span aria-hidden="true" className="h-px w-8 bg-gold/40 sm:w-14" />
          </motion.p>

          <h1 className="mt-7 max-w-5xl font-display font-normal leading-[1.02] tracking-tight">
            <motion.span
              {...rise(0.25)}
              className="shimmer-text block"
              style={{ fontSize: 'clamp(2.75rem, 9vw, 6.5rem)' }}
            >
              İstanbul&apos;un Kalbinde
            </motion.span>
            <motion.span
              {...rise(0.37)}
              className="mt-1 block italic text-pearl/90"
              style={{ fontSize: 'clamp(2.25rem, 7.2vw, 5.25rem)' }}
            >
              Bostancı&apos;nın Yeni Adresi
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.5)}
            className="mt-8 max-w-xl text-balance text-sm font-light leading-relaxed text-silver sm:text-base"
          >
            Kahve, kahvaltı, taş fırın pizza, burger ve daha fazlası —
            Marmaray&apos;ın hemen yanı başında, şık bir mola.
          </motion.p>

          <motion.div
            {...rise(0.62)}
            className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Magnetic>
              <Link
                href="/menu"
                onClick={() => trackEvent('cta_click', { cta: 'hero_menu' })}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-gold-bright px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-obsidian shadow-glow-gold transition-all duration-300 hover:bg-gold hover:shadow-glow-gold-strong"
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
                href={BUSINESS.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_click', { cta: 'hero_directions' })}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-pearl/25 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-pearl transition-colors duration-300 hover:border-gold/50 hover:bg-pearl/[0.04]"
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
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 flex justify-center pb-10"
      >
        <span className="relative block h-14 w-px overflow-hidden bg-pearl/15">
          {!prefersReducedMotion && (
            <motion.span
              className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-gold-bright to-transparent"
              animate={{ y: ['-100%', '260%'] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </span>
      </motion.div>
    </header>
  );
}
