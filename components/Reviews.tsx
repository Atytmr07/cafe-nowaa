'use client';

import { Star } from 'lucide-react';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import GrainOverlay from './GrainOverlay';
import { REVIEWS } from '@/data/reviews';

function StarRow({ rating, name }: { rating: number; name: string }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`${name}: 5 üzerinden ${rating} yıldız`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`h-4 w-4 ${
            i < rating ? 'fill-gold text-gold' : 'fill-none text-stone/40'
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
      className="relative overflow-hidden bg-noir py-20 md:py-28"
    >
      <GrainOverlay />

      {/* Ambient gold glow accent — recalls the sconce lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Yorumlar
            </p>
          </Reveal>

          <MaskedText
            as="h2"
            lines={['Misafirlerimiz Ne Diyor?']}
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl"
          />
        </div>

        {/* Horizontal scroll-snap carousel — swipeable on mobile */}
        <Reveal className="mt-14">
          <ul
            className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6"
            aria-label="Misafir yorumları"
          >
            {REVIEWS.map((review) => (
              <li
                key={review.id}
                className="w-[85%] flex-none snap-center rounded-2xl bg-noir-surface p-7 shadow-warm sm:w-[420px] sm:p-8"
              >
                <StarRow rating={review.rating} name={review.name} />
                <blockquote className="mt-5">
                  <p className="text-base italic leading-relaxed text-cream/90">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </blockquote>
                <footer className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-semibold text-cream">
                    {review.name}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-stone">
                    {review.source}
                  </p>
                </footer>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
