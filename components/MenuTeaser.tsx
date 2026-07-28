'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import Photo from './Photo';
import GrainOverlay from './GrainOverlay';
import { FEATURED_PRODUCTS, formatPrice } from '@/data/menu';
import { trackEvent } from '@/lib/firebase';

/**
 * Homepage-only preview: a deliberately incomplete taste of the card.
 * The full category menu lives EXCLUSIVELY at /menu — never render the
 * category rail or the complete product list here.
 */
export default function MenuTeaser() {
  return (
    <section className="relative overflow-hidden bg-obsidian py-24 md:py-32">
      <GrainOverlay />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_45%_100%_at_50%_0%,rgba(246,245,242,0.08),transparent_72%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-luxe text-silver">
              Menü
            </p>
          </Reveal>

          <MaskedText
            as="h2"
            lines={[
              <>
                Lezzetlerimizden <em className="italic text-platinum">Bir Kesit</em>
              </>,
            ]}
            className="mt-5 font-display text-4xl leading-[1.08] tracking-tight text-pearl sm:text-6xl"
          />

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-lg text-sm font-light leading-relaxed text-silver">
              Şefin öne çıkardığı birkaç imza lezzet — kahvaltıdan taş fırın
              pizzaya, tüm menümüz için kartı açın.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.slice(0, 4).map((product, i) => (
            <Reveal key={product.id} delay={i * 0.08}>
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Photo
                    src={product.imageUrl}
                    alt={product.name}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 border border-pearl/20 transition-colors duration-500 group-hover:border-pearl/45"
                  />
                </div>

                <div className="flex items-baseline gap-3 pt-5">
                  <h3 className="font-display text-lg tracking-tight text-pearl">
                    {product.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-pearl/15"
                  />
                  <span className="text-sm font-medium tabular-nums text-platinum">
                    {formatPrice(product.price!)}
                  </span>
                </div>
                {product.description && (
                  <p className="mt-2 line-clamp-2 text-xs font-light leading-relaxed text-silver">
                    {product.description}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* The doorway to the dedicated /menu experience */}
        <Reveal className="mt-16 text-center">
          <Magnetic>
            <Link
              href="/menu"
              onClick={() => trackEvent('cta_click', { cta: 'teaser_full_menu' })}
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-pearl px-11 py-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-obsidian shadow-halo transition-all duration-300 hover:bg-ivory hover:shadow-halo-strong"
            >
              Tüm Menüyü Gör
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
