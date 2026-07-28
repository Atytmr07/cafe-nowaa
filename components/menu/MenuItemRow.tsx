'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Photo from '@/components/Photo';
import { formatPrice, type Product } from '@/data/menu';

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

/**
 * One line of the printed card: name, a dotted leader running to the
 * price, and the description beneath. Signature dishes carry a portrait
 * plate and the "Şefin Önerisi" mark.
 */
export default function MenuItemRow({ product }: { product: Product }) {
  const featured = Boolean(product.isFeatured && product.imageUrl);

  return (
    <motion.article
      variants={rowVariants}
      className={`flex gap-5 py-5 ${
        featured ? 'border-y border-pearl/10 bg-pearl/[0.02] px-4 sm:px-5' : ''
      }`}
    >
      {featured && (
        <div className="relative h-24 w-20 flex-none overflow-hidden sm:h-28 sm:w-24">
          <Photo
            src={product.imageUrl!}
            alt={product.name}
            sizes="96px"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-1.5 border border-pearl/25"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="font-display text-[17px] leading-snug tracking-tight text-pearl sm:text-lg">
            {product.name}
          </h4>
          <span
            aria-hidden="true"
            className="mb-1 h-px min-w-6 flex-1 border-b border-dotted border-pearl/25"
          />
          <span className="flex-none text-sm font-medium tabular-nums tracking-wide text-platinum">
            {product.price === null ? (
              <span className="text-[10px] uppercase tracking-[0.16em] text-silver">
                Sorunuz
              </span>
            ) : (
              formatPrice(product.price)
            )}
          </span>
        </div>

        {product.description && (
          <p className="mt-2 text-[13px] font-light leading-relaxed text-silver">
            {product.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          {product.priceNote && (
            <p className="text-[10px] uppercase tracking-[0.16em] text-steel">
              {product.priceNote}
            </p>
          )}
          {featured && (
            <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-platinum">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              Şefin Önerisi
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
