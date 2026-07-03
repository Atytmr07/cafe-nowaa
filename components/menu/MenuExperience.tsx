'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import CategoryTabs from './CategoryTabs';
import CategorySection from './CategorySection';
import { CATEGORIES, productsByCategory } from '@/data/menu';

/** Sticky rail height + breathing room — the scrollspy trigger line */
const SPY_OFFSET = 110;

/**
 * The single-page menu: every category rendered in sequence, with a
 * scrollspy keeping the sticky rail in sync. Tapping a category label
 * smooth-scrolls to its section.
 */
export default function MenuExperience() {
  const [activeSlug, setActiveSlug] = useState(CATEGORIES[0].slug);
  const lockUntil = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  // Scrollspy: the last section whose top has passed the rail is active
  useEffect(() => {
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      let current = CATEGORIES[0].slug;
      for (const category of CATEGORIES) {
        const el = document.getElementById(`kategori-${category.slug}`);
        if (el && el.getBoundingClientRect().top <= SPY_OFFSET) {
          current = category.slug;
        }
      }
      setActiveSlug(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSelect = (slug: string) => {
    // Briefly mute the spy so the pill glides straight to the target
    // instead of hopping through every category passed mid-scroll
    lockUntil.current = Date.now() + 1000;
    setActiveSlug(slug);
    document.getElementById(`kategori-${slug}`)?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <CategoryTabs
        categories={CATEGORIES}
        activeSlug={activeSlug}
        onSelect={handleSelect}
      />

      <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        {CATEGORIES.map((category) => (
          <CategorySection
            key={category.slug}
            category={category}
            products={productsByCategory(category.slug)}
          />
        ))}
      </div>
    </>
  );
}
