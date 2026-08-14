'use client';

import { motion } from 'framer-motion';
import { Flame, Star, ZoomIn } from 'lucide-react';
import Photo from '@/components/Photo';
import { formatPrice, type MenuProduct } from '@/lib/menu-types';

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } },
};

/**
 * One line of the card: name, dotted leader, price, then description and
 * the kcal / allergen strip. A plated photo, when present, opens the
 * lightbox.
 */
export default function MenuItemRow({
  product,
  onZoom,
}: {
  product: MenuProduct;
  /** Id rather than a built LightboxItem: the parent owns the photographed-
   *  product list (in card order) so the lightbox can page through it. */
  onZoom: (productId: string) => void;
}) {
  const hasImage = Boolean(product.imageUrl);
  const allergens = product.allergens ?? [];

  return (
    <motion.article
      variants={rowVariants}
      className="flex gap-4 py-5 transition-colors duration-300 hover:bg-gold/[0.05] sm:gap-5"
    >
      {hasImage && (
        <button
          type="button"
          onClick={() => onZoom(product.id)}
          aria-label={`${product.name} görselini büyüt`}
          className="group relative h-24 w-20 flex-none overflow-hidden sm:h-28 sm:w-24"
        >
          <Photo
            src={product.imageUrl!}
            alt={product.name}
            sizes="96px"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-1.5 border border-ivory/40 transition-colors duration-300 group-hover:border-ivory/80"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <ZoomIn className="h-5 w-5 text-pearl" strokeWidth={1.4} />
          </span>
        </button>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="font-display text-[17px] leading-snug tracking-tight text-ink sm:text-lg">
            {product.name}
          </h4>
          <span
            aria-hidden="true"
            className="mb-1 h-px min-w-5 flex-1 border-b border-dotted border-ink/25"
          />
          <span className="flex-none text-sm font-semibold tabular-nums tracking-wide text-gold-deep">
            {product.price === null ? (
              <span className="text-[10px] uppercase tracking-[0.16em] text-steel">
                Sorunuz
              </span>
            ) : (
              formatPrice(product.price)
            )}
          </span>
        </div>

        {product.description && (
          <p className="mt-2 text-[13px] font-light leading-relaxed text-steel">
            {product.description}
          </p>
        )}

        {(product.priceNote ||
          product.isFeatured ||
          product.kcal ||
          allergens.length > 0) && (
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {product.isFeatured && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                Şefin Önerisi
              </span>
            )}

            {product.kcal ? (
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-steel">
                <Flame className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
                {product.kcal} kcal
              </span>
            ) : null}

            {product.priceNote && (
              <span className="text-[10px] uppercase tracking-[0.16em] text-steel">
                {product.priceNote}
              </span>
            )}

            {allergens.length > 0 && (
              <span className="flex flex-wrap items-center gap-1.5">
                <span className="sr-only">Alerjenler:</span>
                {allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[10px] tracking-wide text-steel"
                  >
                    {allergen}
                  </span>
                ))}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
