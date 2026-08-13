'use client';

import { motion } from 'framer-motion';
import MenuItemRow from './MenuItemRow';
import type { LightboxItem } from '@/components/Lightbox';
import { groupProducts, type MenuCategory, type MenuProduct } from '@/lib/menu-types';

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

/**
 * One category of the single-page menu: a display-serif title, then each
 * sub-section with its items. The id anchors both the scrollspy and rail
 * navigation; scroll-mt clears the sticky rail.
 */
export default function CategorySection({
  category,
  products,
  onZoom,
}: {
  category: MenuCategory;
  products: MenuProduct[];
  onZoom: (item: LightboxItem) => void;
}) {
  const buckets = groupProducts(category, products);
  if (buckets.length === 0) return null;

  return (
    <section
      id={`kategori-${category.id}`}
      aria-labelledby={`baslik-${category.id}`}
      className="scroll-mt-20 pt-16 first:pt-12"
    >
      <div className="text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-6 block h-10 w-px bg-pearl/15"
        />
        <h2
          id={`baslik-${category.id}`}
          className="font-display text-3xl leading-tight tracking-tight text-pearl sm:text-4xl"
        >
          {category.label}
        </h2>
      </div>

      {buckets.map(({ subcategory, items }) => (
        <div key={subcategory || '_'} className="mt-12">
          {subcategory && subcategory !== category.label && (
            <div className="mb-2 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-6 bg-gold/40" />
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                {subcategory}
              </h3>
              <span aria-hidden="true" className="h-px flex-1 bg-pearl/10" />
            </div>
          )}

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="divide-y divide-pearl/[0.07]"
          >
            {items.map((product) => (
              <MenuItemRow
                key={product.id}
                product={product}
                onZoom={onZoom}
              />
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}
