'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';
import WarmImage from '@/components/WarmImage';
import { formatPrice, type Product } from '@/data/menu';

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

/**
 * Tap-to-expand product card: collapsed shows photo, name, one-liner and
 * price; expanding reveals the full description and allergens inline.
 */
export default function ProductCard({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const detailsId = `details-${product.id}`;

  return (
    <motion.article
      variants={cardVariants}
      className="relative overflow-hidden rounded-2xl bg-noir-surface shadow-warm"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <WarmImage
          src={product.imageUrl}
          alt={product.name}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        {product.isFeatured && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-noir shadow-glow">
            <Star className="h-3 w-3 fill-current" aria-hidden="true" />
            Şefin Önerisi
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight text-cream">
            {product.name}
          </h3>
          <p className="flex-none font-sans text-base font-bold text-gold">
            {formatPrice(product.price)}
          </p>
        </div>

        <p
          className={`mt-1.5 text-sm leading-relaxed text-stone ${
            expanded ? '' : 'line-clamp-1'
          }`}
        >
          {product.description}
        </p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={detailsId}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 300, damping: 30 }
              }
              className="overflow-hidden"
            >
              <p className="mt-3 text-sm leading-relaxed text-cream/85">
                {product.longDescription}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-stone">
                  Alerjenler:
                </span>
                {product.allergens.length > 0 ? (
                  product.allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="rounded-full border border-gold/30 px-3 py-1 text-[11px] font-medium text-gold"
                    >
                      {allergen}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-stone">
                    Bilinen alerjen içermez
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-stone/80">
          {expanded ? 'Kapat' : 'Detaylar'}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            aria-hidden="true"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        </div>
      </div>

      {/* Stretched invisible button — whole card is one ≥48px tap target */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={detailsId}
        aria-label={
          expanded
            ? `${product.name} detaylarını kapat`
            : `${product.name} detaylarını göster`
        }
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      />
    </motion.article>
  );
}
