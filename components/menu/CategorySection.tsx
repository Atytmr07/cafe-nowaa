'use client';

import { motion } from 'framer-motion';
import MenuItemRow from './MenuItemRow';
import { groupedProducts, type Category } from '@/data/menu';

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

/**
 * One category of the single-page menu: a display-serif title, then each
 * printed sub-section (Ara Sıcaklar, Soğuk Kahveler…) with its items.
 * The id anchors both the scrollspy and rail navigation; scroll-mt
 * compensates for the sticky rail.
 */
export default function CategorySection({ category }: { category: Category }) {
  const buckets = groupedProducts(category);

  return (
    <section
      id={`kategori-${category.slug}`}
      aria-labelledby={`baslik-${category.slug}`}
      className="scroll-mt-20 pt-16 first:pt-12"
    >
      <div className="text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-6 block h-10 w-px bg-pearl/15"
        />
        <h2
          id={`baslik-${category.slug}`}
          className="font-display text-3xl leading-tight tracking-tight text-pearl sm:text-4xl"
        >
          {category.label}
        </h2>
      </div>

      {buckets.map(({ group, items }) => (
        <div key={group} className="mt-12">
          {/* Only label the sub-section when it adds information */}
          {group !== category.label && (
            <div className="mb-2 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-6 bg-platinum/40" />
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-platinum">
                {group}
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
              <MenuItemRow key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}
