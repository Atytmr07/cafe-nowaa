'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Category } from '@/data/menu';

type CategoryTabsProps = {
  categories: Category[];
  activeSlug: string;
  onSelect: (slug: string) => void;
};

/**
 * Sticky category rail over the single-page menu. Acts as scrollspy
 * navigation: the gold pill slides to whichever category is on screen,
 * and tapping a label scrolls to its section. The rail keeps the active
 * label centered as the page scrolls.
 */
export default function CategoryTabs({
  categories,
  activeSlug,
  onSelect,
}: CategoryTabsProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const rail = railRef.current;
    const button = rail?.querySelector<HTMLButtonElement>(
      `[data-slug="${activeSlug}"]`
    );
    if (!rail || !button) return;
    rail.scrollTo({
      left: button.offsetLeft - (rail.clientWidth - button.clientWidth) / 2,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [activeSlug, prefersReducedMotion]);

  return (
    <nav
      aria-label="Menü kategorileri"
      className="sticky top-0 z-30 border-b border-gold/10 bg-noir/95 backdrop-blur-md"
    >
      <div
        ref={railRef}
        className="scrollbar-hide mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 sm:px-6"
      >
        {categories.map((category) => {
          const active = category.slug === activeSlug;
          return (
            <button
              key={category.slug}
              type="button"
              data-slug={category.slug}
              aria-current={active ? 'true' : undefined}
              onClick={() => onSelect(category.slug)}
              className={`relative min-h-12 whitespace-nowrap rounded-full px-5 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
                active ? 'text-noir' : 'text-stone hover:text-cream'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="active-category-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-gold shadow-glow"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 400, damping: 32 }
                  }
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
