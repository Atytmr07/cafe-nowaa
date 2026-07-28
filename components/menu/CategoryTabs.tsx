'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { MenuCategory } from '@/lib/menu-types';

type CategoryTabsProps = {
  categories: MenuCategory[];
  activeSlug: string;
  onSelect: (id: string) => void;
};

/**
 * Sticky category rail over the single-page menu, doubling as scrollspy:
 * the pearl pill slides to whichever category is on screen, and tapping a
 * label scrolls to its section. The rail keeps the active label centred.
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
      className="sticky top-0 z-30 border-b border-pearl/10 bg-obsidian/92 backdrop-blur-xl"
    >
      <div
        ref={railRef}
        className="scrollbar-hide mx-auto flex max-w-5xl gap-1.5 overflow-x-auto px-4 py-3 sm:px-6"
      >
        {categories.map((category) => {
          const active = category.id === activeSlug;
          return (
            <button
              key={category.id}
              type="button"
              data-slug={category.id}
              aria-current={active ? 'true' : undefined}
              onClick={() => onSelect(category.id)}
              className={`relative min-h-11 whitespace-nowrap rounded-full px-5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                active ? 'text-obsidian' : 'text-silver hover:text-pearl'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="active-category-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-pearl"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 420, damping: 34 }
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
