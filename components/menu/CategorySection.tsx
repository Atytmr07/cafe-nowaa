'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { Category, Product } from '@/data/menu';

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

/**
 * One category block on the single-page menu: editorial header
 * (title · hairline · item count) + staggered product grid.
 * The id anchors both the scrollspy and tab-click navigation;
 * scroll-mt compensates for the sticky category rail.
 */
type CategorySectionProps = {
  category: Category;
  products: Product[];
};

export default function CategorySection({
  category,
  products,
}: CategorySectionProps) {
  return (
    <section
      id={`kategori-${category.slug}`}
      aria-labelledby={`baslik-${category.slug}`}
      className="scroll-mt-24 pt-10 md:pt-14"
    >
      <div className="mb-6 flex items-baseline gap-4">
        <h2
          id={`baslik-${category.slug}`}
          className="font-display text-2xl font-semibold tracking-tight text-cream sm:text-3xl"
        >
          {category.label}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-gold/20" />
        <span className="flex-none text-xs uppercase tracking-widest text-stone">
          {products.length} ürün
        </span>
      </div>

      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  );
}
