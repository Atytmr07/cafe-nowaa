'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, Search, X } from 'lucide-react';
import CategoryTabs from './CategoryTabs';
import CategorySection from './CategorySection';
import MenuItemRow from './MenuItemRow';
import Lightbox, { type LightboxItem } from '@/components/Lightbox';
import { useMenu } from '@/hooks/useMenu';
import { byOrder } from '@/lib/menu-types';
import { trackEvent } from '@/lib/firebase';

/** Sticky rail height plus breathing room — the scrollspy trigger line */
const SPY_OFFSET = 150;

/** Turkish-aware, case-insensitive contains. */
const matches = (haystack: string, needle: string) =>
  haystack.toLocaleLowerCase('tr').includes(needle);

export default function MenuExperience() {
  const { menu } = useMenu();
  const [activeId, setActiveId] = useState(menu.categories[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [zoomed, setZoomed] = useState<LightboxItem | null>(null);
  const [showTop, setShowTop] = useState(false);
  const lockUntil = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const categories = useMemo(
    () => [...menu.categories].sort(byOrder),
    [menu.categories]
  );

  const searching = query.trim().length > 0;

  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr');
    if (!q) return [];
    return menu.products
      .filter(
        (p) =>
          matches(p.name, q) ||
          matches(p.description ?? '', q) ||
          (p.allergens ?? []).some((a) => matches(a, q))
      )
      .sort(byOrder);
  }, [menu.products, query]);

  // Scrollspy: the last section whose top has passed the rail wins
  useEffect(() => {
    if (searching) return;
    const onScroll = () => {
      setShowTop(window.scrollY > 900);
      if (Date.now() < lockUntil.current) return;
      let current = categories[0]?.id ?? '';
      for (const category of categories) {
        const el = document.getElementById(`kategori-${category.id}`);
        if (el && el.getBoundingClientRect().top <= SPY_OFFSET) {
          current = category.id;
        }
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [categories, searching]);

  const handleSelect = (id: string) => {
    // Briefly mute the spy so the pill glides straight to the target
    // instead of hopping through every category passed mid-scroll
    lockUntil.current = Date.now() + 1000;
    setActiveId(id);
    trackEvent('menu_category_select', { category: id });
    document.getElementById(`kategori-${id}`)?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      {/* Search sits above the rail so filtering never hides the nav */}
      <div className="bg-pearl">
        <div className="mx-auto max-w-3xl px-5 py-4 sm:px-8">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-steel"
              strokeWidth={1.4}
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Menüde ara"
              placeholder="Menüde ara — ürün, içerik, alerjen…"
              className="min-h-12 w-full rounded-full border border-ink/15 bg-ivory pl-11 pr-11 text-sm text-ink shadow-soft placeholder:text-steel focus:border-gold focus:outline-none"
            />
            {searching && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Aramayı temizle"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-steel transition-colors hover:text-ink"
              >
                <X className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {!searching && (
        <CategoryTabs
          categories={categories}
          activeSlug={activeId}
          onSelect={handleSelect}
        />
      )}

      <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {searching ? (
          <section aria-label="Arama sonuçları" className="pt-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-steel">
              {results.length} sonuç
            </p>
            {results.length === 0 ? (
              <p className="mt-8 text-center text-sm font-light text-steel">
                “{query}” için sonuç bulunamadı.
              </p>
            ) : (
              <div className="mt-4 divide-y divide-ink/10">
                {results.map((product) => (
                  <MenuItemRow
                    key={product.id}
                    product={product}
                    onZoom={setZoomed}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              products={menu.products}
              onZoom={setZoomed}
            />
          ))
        )}

        <div className="mt-20 border-t border-ink/10 pt-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-steel">
            Fiyatlarımıza KDV dahildir
          </p>
          <p className="mx-auto mt-3 max-w-md text-[11px] font-light leading-relaxed text-steel">
            Alerjen bilgileri ürün içeriklerine göre hazırlanmıştır. Ciddi
            alerjiniz varsa lütfen sipariş öncesi personelimize danışın.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showTop && !searching && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
              })
            }
            aria-label="Başa dön"
            // Stacked above the floating WhatsApp button (bottom-5, h-14)
            className="fixed bottom-[5.75rem] right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-ivory/90 text-ink shadow-soft backdrop-blur-md transition-colors hover:border-gold"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <Lightbox item={zoomed} onClose={() => setZoomed(null)} />
    </>
  );
}
