/**
 * The menu shape shared by the seed file, Firestore and every renderer.
 *
 * Ordering is explicit (`order`) rather than array position so the admin
 * can reorder without rewriting whole collections, and so a partial read
 * still sorts correctly.
 */

export type MenuCategory = {
  id: string;
  label: string;
  order: number;
  /** Ordered sub-section labels, e.g. ["Ara Sıcaklar"] */
  subcategories: string[];
};

export type MenuProduct = {
  id: string;
  name: string;
  description?: string;
  /** null when the kitchen quotes on the day */
  price: number | null;
  /** Small qualifier printed beside the price, e.g. "2 kişilik" */
  priceNote?: string;
  /** Energy per serving; null until the kitchen supplies verified figures */
  kcal?: number | null;
  allergens?: string[];
  categoryId: string;
  /** Must match one of the category's `subcategories` entries */
  subcategory?: string;
  order: number;
  isFeatured?: boolean;
  /** Off = temporarily 86'd — hidden from the public menu, kept in the admin */
  isAvailable?: boolean;
  imageUrl?: string;
  /** Storage path, kept so the old file can be deleted on replace */
  imagePath?: string;
};

export type MenuData = {
  categories: MenuCategory[];
  products: MenuProduct[];
};

/** The allergen vocabulary offered in the admin picker. */
export const ALLERGEN_OPTIONS = [
  'Gluten',
  'Süt',
  'Yumurta',
  'Yemiş',
  'Fıstık',
  'Susam',
  'Soya',
  'Balık',
  'Kabuklu Deniz Ürünü',
  'Hardal',
  'Kereviz',
  'Sülfit',
] as const;

export const formatPrice = (price: number) => `${price} ₺`;

export const byOrder = <T extends { order: number }>(a: T, b: T) =>
  a.order - b.order;

/** `undefined` means "never toggled off" — existing products default to visible. */
export const isProductVisible = (product: MenuProduct) =>
  product.isAvailable !== false;

/** Products of one category, bucketed into its sub-sections, all ordered. */
export function groupProducts(category: MenuCategory, products: MenuProduct[]) {
  const mine = products
    .filter((p) => p.categoryId === category.id)
    .sort(byOrder);

  const buckets = category.subcategories.map((subcategory) => ({
    subcategory,
    items: mine.filter((p) => p.subcategory === subcategory),
  }));

  // Anything pointing at a removed sub-section still has to render
  const orphans = mine.filter(
    (p) => !p.subcategory || !category.subcategories.includes(p.subcategory)
  );
  if (orphans.length) {
    buckets.push({ subcategory: '', items: orphans });
  }

  return buckets.filter((bucket) => bucket.items.length > 0);
}
