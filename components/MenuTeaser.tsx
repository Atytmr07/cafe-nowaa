'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Flame, Star, ZoomIn } from 'lucide-react';
import Magnetic from './Magnetic';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import Photo from './Photo';
import CountUp from './CountUp';
import Lightbox, { type LightboxItem } from './Lightbox';
import { formatPrice } from '@/lib/menu-types';
import type { TeaserData, TeaserItem } from '@/lib/menu-teaser';
import { trackEvent } from '@/lib/firebase';

/**
 * Homepage preview — an editorial spread rather than a wall of photos:
 * one plated signature on the left, a genuine excerpt of the printed
 * card on the right, and the category index beneath. Deliberately
 * incomplete; the whole card lives at /menu.
 *
 * Takes a pre-reduced `teaser` rather than the whole MenuData. This is a
 * client component, so its props are serialised into the page payload —
 * passing all 156 products to render ten of them put roughly 150 products
 * of dead weight into the homepage HTML. The selection rules now live in
 * lib/menu-teaser.ts and run on the server.
 */
export default function MenuTeaser({ teaser }: { teaser: TeaserData }) {
  const [zoomed, setZoomed] = useState<LightboxItem | null>(null);
  const { categories, hero, excerpts, pricedCount } = teaser;

  return (
    <section className="relative overflow-hidden bg-ivory py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_45%_100%_at_50%_0%,rgba(217,164,65,0.14),transparent_72%)]"
      />
      {/* No wave into Gallery: ivory and pearl are too close in value for
          the curve to read against — see About.tsx for the same call */}

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-luxe text-steel">
              Menü
            </p>
          </Reveal>

          <MaskedText
            as="h2"
            lines={[
              <>
                Lezzetlerimizden <em className="italic text-gold-deep">Bir Kesit</em>
              </>,
            ]}
            className="mt-5 font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-6xl"
          />

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-lg text-sm font-light leading-relaxed text-steel">
              Kahvaltıdan taş fırın pizzaya, özenle demlenen kahvelerden
              tatlılara — kartımızdan küçük bir bölüm.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Signature plate. Until the admin marks a dish as "Şefin Önerisi"
              and gives it a photo there is nothing to plate, so a real venue
              shot holds the column rather than collapsing the layout — and it
              is captioned as a venue shot, not dressed up as a named dish. */}
          {!hero?.imageUrl && (
            <Reveal className="lg:col-span-5">
              <button
                type="button"
                onClick={() =>
                  setZoomed({
                    src: '/tatli.jpeg',
                    alt: 'Neon Cafe Nowaa tabelasının altında sıcak servis edilen tatlı',
                    caption: 'Mutfağımızdan',
                  })
                }
                aria-label="Mutfağımızdan bir kare — görseli büyüt"
                className="group relative block w-full overflow-hidden shadow-soft"
              >
                <div className="relative aspect-[4/5]">
                  <Photo
                    src="/tatli.jpeg"
                    alt="Neon Cafe Nowaa tabelasının altında sıcak servis edilen tatlı"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-4 border border-pearl/25 transition-colors duration-500 group-hover:border-gold/70"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent px-7 pb-7 pt-16 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-bright">
                    Mutfağımızdan
                  </span>
                  <span className="mt-2 block font-display text-2xl text-pearl sm:text-3xl">
                    Sıcak servis, tatlı bitiş
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-pearl/25 bg-ink/50 text-pearl opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                >
                  <ZoomIn className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            </Reveal>
          )}

          {hero?.imageUrl && (
            <Reveal className="lg:col-span-5">
              <button
                type="button"
                onClick={() =>
                  setZoomed({
                    src: hero.imageUrl!,
                    alt: hero.name,
                    caption: hero.name,
                    meta: hero.description,
                  })
                }
                aria-label={`${hero.name} görselini büyüt`}
                className="group relative block w-full overflow-hidden"
              >
                <div className="relative aspect-[4/5]">
                  <Photo
                    src={hero.imageUrl}
                    alt={hero.name}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-4 border border-pearl/25 transition-colors duration-500 group-hover:border-pearl/50"
                />

                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent px-7 pb-7 pt-16 text-left">
                  {hero.isFeatured && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-bright">
                      <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                      Şefin Önerisi
                    </span>
                  )}
                  <span className="mt-3 flex items-baseline gap-3">
                    <span className="font-display text-2xl text-pearl sm:text-3xl">
                      {hero.name}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-pearl/20" />
                    <span className="text-base font-medium tabular-nums text-gold-bright">
                      {hero.price !== null ? formatPrice(hero.price) : ''}
                    </span>
                  </span>
                  {hero.description && (
                    <span className="mt-2.5 line-clamp-2 block text-xs font-light leading-relaxed text-silver">
                      {hero.description}
                    </span>
                  )}
                  {hero.kcal ? (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-silver">
                      <Flame className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
                      {hero.kcal} kcal
                    </span>
                  ) : null}
                </span>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-pearl/25 bg-ink/50 text-pearl opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                >
                  <ZoomIn className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            </Reveal>
          )}

          {/* A genuine excerpt of the card */}
          <div className="lg:col-span-7">
            <div className="grid gap-10 sm:grid-cols-2">
              {excerpts.map(({ category, items }, columnIndex) => (
                <Reveal key={category.id} delay={columnIndex * 0.1}>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl text-ink">
                      {category.label}
                    </h3>
                    <span aria-hidden="true" className="h-px flex-1 bg-ink/15" />
                  </div>

                  <ul className="mt-5 space-y-4">
                    {items.map((product) => (
                      <li key={product.id}>
                        <ExcerptRow product={product} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {/* Category index — a running line, not a row of boxed pills */}
            <Reveal delay={0.2}>
              <div className="mt-12 border-t border-ink/10 pt-8">
                <p className="text-[10px] font-medium uppercase tracking-luxe text-steel">
                  Tüm kategoriler
                </p>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-1 gap-y-2 text-[13px] tracking-wide text-steel">
                  {categories.map((category, i) => (
                    <span key={category.id} className="inline-flex items-baseline">
                      <Link
                        href={`/menu#kategori-${category.id}`}
                        className="min-h-9 py-1.5 underline decoration-ink/0 decoration-1 underline-offset-4 transition-colors duration-200 hover:text-gold-deep hover:decoration-gold"
                      >
                        {category.label}
                      </Link>
                      {i < categories.length - 1 && (
                        <span aria-hidden="true" className="ml-1 text-ink/20">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </p>

                <p className="mt-6 font-display text-lg italic text-gold-deep">
                  <CountUp to={categories.length} /> kategori ·{' '}
                  <CountUp to={pricedCount} suffix="+" /> lezzet
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16 text-center">
          <Magnetic>
            <Link
              href="/menu"
              onClick={() => trackEvent('cta_click', { cta: 'teaser_full_menu' })}
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-gold px-11 py-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink shadow-soft transition-all duration-300 hover:bg-gold-bright hover:shadow-glow-gold"
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

      <Lightbox item={zoomed} onClose={() => setZoomed(null)} />
    </section>
  );
}

/** A single quoted line of the card: name, leader, price. */
function ExcerptRow({ product }: { product: TeaserItem }) {
  return (
    <>
      <span className="flex items-baseline gap-3">
        <span className="font-display text-[15px] leading-snug text-ink">
          {product.name}
        </span>
        <span
          aria-hidden="true"
          className="mb-1 h-px min-w-4 flex-1 border-b border-dotted border-ink/25"
        />
        <span className="flex-none text-[13px] font-semibold tabular-nums text-gold-deep">
          {formatPrice(product.price)}
        </span>
      </span>
      {product.description && (
        <span className="mt-1 line-clamp-1 block text-[11px] font-light leading-relaxed text-steel">
          {product.description}
        </span>
      )}
    </>
  );
}
