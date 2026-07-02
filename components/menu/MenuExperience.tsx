'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CategoryTabs from './CategoryTabs';
import ProductGrid from './ProductGrid';
import { CATEGORIES, productsByCategory } from '@/data/menu';

/**
 * The stateful heart of the /menu micro-site: owns the active category
 * and composes the sticky tab rail with the animated product grid.
 */
export default function MenuExperience() {
  const [activeSlug, setActiveSlug] = useState(CATEGORIES[0].slug);

  return (
    <>
      <CategoryTabs
        categories={CATEGORIES}
        activeSlug={activeSlug}
        onSelect={setActiveSlug}
      />

      <section
        aria-label="Menü ürünleri"
        className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <ProductGrid
            key={activeSlug}
            categorySlug={activeSlug}
            products={productsByCategory(activeSlug)}
          />
        </AnimatePresence>
      </section>
    </>
  );
}
