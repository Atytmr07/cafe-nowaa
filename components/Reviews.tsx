'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import GrainOverlay from './GrainOverlay';
import CoffeeBeans from './decor/CoffeeBeans';
import SectionEdge from './decor/SectionEdge';
import { BUSINESS } from '@/config/business';
import { REVIEWS } from '@/data/reviews';

/**
 * Formatted here rather than with toLocaleString: the value is static and
 * this keeps server and client output byte-identical, which a locale-aware
 * formatter can't promise across Node's ICU build and the browser's.
 */
const AVERAGE = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;
const AVERAGE_LABEL = AVERAGE.toFixed(1).replace('.', ',');

function StarRow({
  rating,
  label,
  size = 'sm',
}: {
  rating: number;
  label: string;
  size?: 'sm' | 'lg';
}) {
  const box = size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5';
  return (
    <div
      className={`flex ${size === 'lg' ? 'gap-1.5' : 'gap-1'}`}
      role="img"
      aria-label={`${label}: 5 üzerinden ${rating} yıldız`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          strokeWidth={1}
          className={`${box} ${
            i < Math.round(rating)
              ? 'fill-gold text-gold'
              : 'fill-none text-silver/30'
          }`}
        />
      ))}
    </div>
  );
}

/** Gentle, resumable idle timer — used to un-pause after a manual scroll. */
function useIdleResume(pausedRef: React.MutableRefObject<boolean>, delay = 5000) {
  const timerRef = useRef<number>();
  return useCallback(() => {
    pausedRef.current = true;
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  }, [pausedRef, delay]);
}

export default function Reviews() {
  const trackRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const directionRef = useRef<1 | -1>(1);
  const prefersReducedMotion = useReducedMotion();
  const pauseThenResume = useIdleResume(pausedRef);
  const [active, setActive] = useState(0);

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

  // Which card is under the middle of the viewport — drives the dots and
  // the arrows' disabled states. Measured from the DOM rather than tracked
  // as state, so it stays correct whether the movement came from the
  // auto-scroll, a swipe, or an arrow press.
  //
  // Both this and goTo depend on the track carrying `relative`: offsetLeft
  // is measured from the nearest *positioned* ancestor, and with a static
  // track that resolved to the section — so every card's offsetLeft came
  // back inflated by the width of the score panel beside it, and the dots
  // tracked the wrong card while the arrows scrolled to the wrong place.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      const cards = Array.from(track.children) as HTMLElement[];

      // At the extremes, snap the reading to the end card. A card wider
      // than half the track can never actually reach the centre line, so
      // pure nearest-to-middle leaves the last one permanently
      // unreachable — the "next" arrow would stay lit with nothing left
      // to go to.
      if (max > 1 && track.scrollLeft >= max - 1) {
        setActive(cards.length - 1);
        return;
      }
      if (track.scrollLeft <= 1) {
        setActive(0);
        return;
      }

      const middle = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      cards.forEach((card, i) => {
        const centre = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(centre - middle);
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      });
      setActive(nearest);
    };

    onScroll();
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    pauseThenResume();
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

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
      {/* Bottom margin, below the carousel controls rather than beside
          them — the arrows already occupy the right edge of that row. */}
      <CoffeeBeans
        tone="pearl"
        className="pointer-events-none absolute bottom-8 right-4 h-16 w-24 rotate-[-16deg] opacity-[0.2] sm:right-8 sm:h-20 sm:w-[7.5rem]"
      />
      <SectionEdge from="pearl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/*
            The score panel, not a second column of quotes. A visitor
            deciding where to have breakfast wants the verdict before the
            testimony — this section used to open with a centred heading
            and go straight into prose, which buried the one number that
            actually persuades.
          */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-[10px] font-medium uppercase tracking-luxe text-silver">
                Yorumlar
              </p>
            </Reveal>

            <MaskedText
              as="h2"
              lines={[
                <>
                  Misafirlerimiz{' '}
                  <em className="italic text-gold-bright">Ne Diyor?</em>
                </>,
              ]}
              className="mt-5 font-display text-4xl leading-[1.08] tracking-tight text-pearl sm:text-5xl"
            />

            <Reveal delay={0.1}>
              <div className="mt-10 border-t border-pearl/12 pt-8">
                <div className="flex items-end gap-4">
                  <span className="font-display text-6xl leading-none text-pearl">
                    {AVERAGE_LABEL}
                  </span>
                  <div className="pb-1.5">
                    <StarRow
                      rating={AVERAGE}
                      label="Ortalama puan"
                      size="lg"
                    />
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-steel">
                      {REVIEWS.length} yorum
                    </p>
                  </div>
                </div>

                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-12 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-pearl transition-colors hover:text-gold-bright"
                >
                  Google&apos;da tümünü gör
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            {/* Auto-swaying, swipeable carousel — pauses the instant a
                visitor hovers, touches, scrolls or uses the arrows */}
            <Reveal>
              <ul
                ref={trackRef}
                // `relative` is load-bearing — see the scroll effect above.
                // Proximity rather than mandatory snapping: mandatory
                // re-snaps after every programmatic scroll, so it fought
                // the rAF drift and made it stutter between cards instead
                // of gliding. Proximity still assists a swipe.
                className="scrollbar-hide relative -mx-5 flex snap-x snap-proximity gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
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
                    className="group flex w-[85%] flex-none snap-center flex-col border border-pearl/10 bg-onyx p-7 transition-colors duration-500 hover:border-gold/30 sm:w-[360px] sm:p-9"
                  >
                    <span
                      aria-hidden="true"
                      className="block font-display text-5xl leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold/40"
                    >
                      &ldquo;
                    </span>

                    <blockquote className="mt-3 flex-1">
                      <p className="font-display text-lg font-light italic leading-relaxed text-pearl/90">
                        {review.quote}
                      </p>
                    </blockquote>

                    <div className="mt-8 h-px w-full bg-pearl/10" aria-hidden="true" />

                    <footer className="mt-5 flex items-center gap-3.5">
                      {/* Initial disc: five identical text blocks read as
                          one wall of prose, and a name needs a face even
                          when there isn't one to show. */}
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-pearl/15 font-display text-sm text-pearl/70"
                      >
                        {review.name.charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm tracking-wide text-pearl">
                          {review.name}
                        </p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-steel">
                          {review.source}
                        </p>
                      </div>
                      <StarRow rating={review.rating} label={review.name} />
                    </footer>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/*
              Manual controls. The carousel drifted on its own before with
              no way to steer it — fine as ambient motion, useless to
              someone who wanted to read the next one.
            */}
            <Reveal delay={0.1}>
              <div className="mt-7 flex items-center justify-between gap-6">
                <div className="flex items-center gap-2.5" aria-hidden="true">
                  {REVIEWS.map((review, i) => (
                    <button
                      key={review.id}
                      type="button"
                      tabIndex={-1}
                      onClick={() => goTo(i)}
                      className={`h-px transition-all duration-500 ${
                        i === active ? 'w-8 bg-gold' : 'w-4 bg-pearl/25'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Önceki yorum"
                    disabled={active === 0}
                    onClick={() => goTo(active - 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-pearl/15 text-pearl transition-colors hover:border-gold/50 hover:text-gold-bright disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-pearl/15 disabled:hover:text-pearl"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Sonraki yorum"
                    disabled={active === REVIEWS.length - 1}
                    onClick={() => goTo(active + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-pearl/15 text-pearl transition-colors hover:border-gold/50 hover:text-gold-bright disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-pearl/15 disabled:hover:text-pearl"
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
