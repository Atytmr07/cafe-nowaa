'use client';

import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import GrainOverlay from './GrainOverlay';
import CoffeeBeans from './decor/CoffeeBeans';
import SectionWave from './decor/SectionWave';
import { REVIEWS } from '@/data/reviews';

function StarRow({ rating, name }: { rating: number; name: string }) {
  return (
    <div
      className="flex gap-1.5"
      role="img"
      aria-label={`${name}: 5 üzerinden ${rating} yıldız`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          strokeWidth={1}
          className={`h-3.5 w-3.5 ${
            i < rating ? 'fill-gold text-gold' : 'fill-none text-silver/30'
          }`}
        />
      ))}
    </div>
  );
}

/** Gentle, resumable idle timer — used to un-pause after a manual scroll. */
function useIdleResume(pausedRef: React.MutableRefObject<boolean>, delay = 2600) {
  const timerRef = useRef<number>();
  return () => {
    pausedRef.current = true;
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  };
}

export default function Reviews() {
  const trackRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const directionRef = useRef<1 | -1>(1);
  const prefersReducedMotion = useReducedMotion();
  const pauseThenResume = useIdleResume(pausedRef);

  // A slow ping-pong auto-scroll — sways gently, reverses at each end,
  // and steps aside the moment a visitor hovers, drags, or swipes.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    let raf: number;
    let last = performance.now();
    const pxPerSecond = 26;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) {
        const max = track.scrollWidth - track.clientWidth;
        if (max > 1) {
          let next = track.scrollLeft + directionRef.current * pxPerSecond * dt;
          if (next >= max) {
            next = max;
            directionRef.current = -1;
          } else if (next <= 0) {
            next = 0;
            directionRef.current = 1;
          }
          track.scrollLeft = next;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  return (
    <section
      id="yorumlar"
      className="relative overflow-hidden bg-obsidian py-24 md:py-32"
    >
      <GrainOverlay />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-3xl"
      />
      <CoffeeBeans
        tone="gold"
        className="pointer-events-none absolute -right-4 bottom-8 h-16 w-28 rotate-[-16deg] opacity-[0.16] sm:right-10"
      />
      <CoffeeBeans
        tone="pearl"
        className="pointer-events-none absolute left-6 top-28 h-14 w-24 rotate-[20deg] opacity-[0.1] sm:left-14"
      />
      {/* The seam into Location */}
      <SectionWave fill="var(--pearl)" className="absolute inset-x-0 bottom-0 h-10 w-full sm:h-14" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-luxe text-silver">
              Yorumlar
            </p>
          </Reveal>

          <MaskedText
            as="h2"
            lines={[
              <>
                Misafirlerimiz <em className="italic text-gold-bright">Ne Diyor?</em>
              </>,
            ]}
            className="mt-5 font-display text-4xl leading-[1.08] tracking-tight text-pearl sm:text-6xl"
          />
        </div>

        {/* Auto-swaying, swipeable carousel — pauses the instant a visitor
            hovers, touches, or scrolls it themselves */}
        <Reveal className="mt-16">
          <ul
            ref={trackRef}
            className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8"
            aria-label="Misafir yorumları"
            onPointerEnter={() => (pausedRef.current = true)}
            onPointerLeave={() => (pausedRef.current = false)}
            onTouchStart={() => (pausedRef.current = true)}
            onTouchEnd={pauseThenResume}
            onWheel={pauseThenResume}
          >
            {REVIEWS.map((review) => (
              <li
                key={review.id}
                className="w-[86%] flex-none snap-center border border-pearl/10 bg-onyx p-8 transition-colors duration-500 hover:border-gold/30 sm:w-[420px] sm:p-10"
              >
                <span
                  aria-hidden="true"
                  className="block font-display text-5xl leading-none text-gold/25"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-4">
                  <p className="font-display text-lg font-light italic leading-relaxed text-pearl/90">
                    {review.quote}
                  </p>
                </blockquote>
                <div className="mt-8 h-px w-full bg-pearl/10" aria-hidden="true" />
                <footer className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm tracking-wide text-pearl">
                      {review.name}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-steel">
                      {review.source}
                    </p>
                  </div>
                  <StarRow rating={review.rating} name={review.name} />
                </footer>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
