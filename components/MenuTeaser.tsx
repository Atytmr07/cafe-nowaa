'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Flame, Star, ZoomIn } from 'lucide-react';
import Magnetic from './Magnetic';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import Photo from './Photo';
import GrainOverlay from './GrainOverlay';
import Lightbox, { type LightboxItem } from './Lightbox';
import { useMenu } from '@/hooks/useMenu';
import { byOrder, formatPrice, type MenuProduct } from '@/lib/menu-types';
import { trackEvent } from '@/lib/firebase';

/**
 * Homepage preview — an editorial spread rather than a wall of photos:
 * one plated signature on the left, a genuine excerpt of the printed
 * card on the right, and the category index beneath. Deliberately
 * incomplete; the whole card lives at /menu.
 */
export default function MenuTeaser() {
  const { menu } = useMenu();
  const [zoomed, setZoomed] = useState<LightboxItem | null>(null);

  const categories = useMemo(
    () => [...menu.categories].sort(byOrder),
    [menu.categories]
  );

  /** The signature plate: first featured item that actually has a photo. */
  const hero = useMemo(
    () =>
      menu.products.find((p) => p.isFeatured && p.imageUrl) ??
      menu.products.find((p) => p.imageUrl),
    [menu.products]
  );

  /** Two columns quoting real rows, so the preview reads as a menu. */
  const excerpts = useMemo(() => {
    const usable = categories
      .map((category) => ({
        category,
        items: menu.products
          .filter((p) => p.categoryId === category.id && p.price !== null)
          .sort(byOrder)
          .slice(0, 4),
      }))
      .filter((column) => column.items.length >= 3);
    return usable.slice(0, 2);
  }, [categories, menu.products]);

  const priced = menu.products.filter((p) => p.price !== null);

  return (
    <section className="relative overflow-hidden bg-obsidian py-24 md:py-32">
      <GrainOverlay />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_45%_100%_at_50%_0%,rgba(246,245,242,0.08),transparent_72%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
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
              Kahvaltıdan taş fırın pizzaya, özenle demlenen kahvelerden
              tatlılara — kartımızdan küçük bir bölüm.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Signature plate */}
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

                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-transparent px-7 pb-7 pt-16 text-left">
                  {hero.isFeatured && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-platinum">
                      <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                      Şefin Önerisi
                    </span>
                  )}
                  <span className="mt-3 flex items-baseline gap-3">
                    <span className="font-display text-2xl text-pearl sm:text-3xl">
                      {hero.name}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-pearl/20" />
                    <span className="text-base font-medium tabular-nums text-platinum">
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
                  className="pointer-events-none absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-pearl/25 bg-obsidian/50 text-pearl opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
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
                    <h3 className="font-display text-xl text-pearl">
                      {category.label}
                    </h3>
                    <span aria-hidden="true" className="h-px flex-1 bg-pearl/15" />
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

            {/* Category index */}
            <Reveal delay={0.2}>
              <div className="mt-12 border-t border-pearl/10 pt-8">
                <p className="text-[10px] font-medium uppercase tracking-luxe text-steel">
                  Tüm kategoriler
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/menu#kategori-${category.id}`}
                        className="inline-flex min-h-9 items-center rounded-full border border-pearl/15 px-4 text-[11px] tracking-wide text-silver transition-colors hover:border-pearl/45 hover:text-pearl"
                      >
                        {category.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 font-display text-lg italic text-platinum">
                  {categories.length} kategori · {priced.length}+ lezzet
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

      <Lightbox item={zoomed} onClose={() => setZoomed(null)} />
    </section>
  );
}

/** A single quoted line of the card: name, leader, price. */
function ExcerptRow({ product }: { product: MenuProduct }) {
  return (
    <>
      <span className="flex items-baseline gap-3">
        <span className="font-display text-[15px] leading-snug text-pearl">
          {product.name}
        </span>
        <span
          aria-hidden="true"
          className="mb-1 h-px min-w-4 flex-1 border-b border-dotted border-pearl/25"
        />
        <span className="flex-none text-[13px] font-medium tabular-nums text-platinum">
          {formatPrice(product.price as number)}
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
