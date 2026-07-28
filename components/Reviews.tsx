'use client';

import { Star } from 'lucide-react';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import GrainOverlay from './GrainOverlay';
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
            i < rating ? 'fill-platinum text-platinum' : 'fill-none text-silver/30'
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      id="yorumlar"
      className="relative overflow-hidden bg-obsidian py-24 md:py-32"
    >
      <GrainOverlay />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-pearl/[0.05] blur-3xl"
      />

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
                Misafirlerimiz <em className="italic text-platinum">Ne Diyor?</em>
              </>,
            ]}
            className="mt-5 font-display text-4xl leading-[1.08] tracking-tight text-pearl sm:text-6xl"
          />
        </div>

        {/* Horizontal scroll-snap carousel — swipeable on mobile */}
        <Reveal className="mt-16">
          <ul
            className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8"
            aria-label="Misafir yorumları"
          >
            {REVIEWS.map((review) => (
              <li
                key={review.id}
                className="w-[86%] flex-none snap-center border border-pearl/10 bg-onyx p-8 transition-colors duration-500 hover:border-pearl/25 sm:w-[420px] sm:p-10"
              >
                <span
                  aria-hidden="true"
                  className="block font-display text-5xl leading-none text-pearl/20"
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
