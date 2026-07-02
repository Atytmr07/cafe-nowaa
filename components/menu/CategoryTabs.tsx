'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Category } from '@/data/menu';

type CategoryTabsProps = {
  categories: Category[];
  activeSlug: string;
  onSelect: (slug: string) => void;
};

/**
 * Sticky horizontal category rail — the primary navigation of the
 * QR-menu experience. The gold pill physically slides between tabs
 * (shared layout animation) and the tapped tab centers itself in view.
 */
export default function CategoryTabs({
  categories,
  activeSlug,
  onSelect,
}: CategoryTabsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="sticky top-0 z-30 border-b border-gold/10 bg-noir/95 backdrop-blur-md">
      <div
        role="tablist"
        aria-label="Menü kategorileri"
        className="scrollbar-hide mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 sm:px-6"
      >
        {categories.map((category) => {
          const active = category.slug === activeSlug;
          return (
            <button
              key={category.slug}
              type="button"
              role="tab"
              id={`tab-${category.slug}`}
              aria-selected={active}
              aria-controls={`panel-${category.slug}`}
              onClick={(event) => {
                onSelect(category.slug);
                event.currentTarget.scrollIntoView({
                  behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
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
    </div>
  );
}
