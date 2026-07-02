'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { Product } from '@/data/menu';

type ProductGridProps = {
  categorySlug: string;
  products: Product[];
};

/**
 * Animated product grid for one category. Mounted inside AnimatePresence
 * (keyed by category) so tab switches slide the grid in from the right
 * while cards stagger upward.
 */
export default function ProductGrid({
  categorySlug,
  products,
}: ProductGridProps) {
  const prefersReducedMotion = useReducedMotion();

  const gridVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, staggerChildren: 0.05 },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <motion.div
      role="tabpanel"
      id={`panel-${categorySlug}`}
      aria-labelledby={`tab-${categorySlug}`}
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
