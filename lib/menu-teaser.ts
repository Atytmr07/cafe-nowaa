import { byOrder, type MenuData, type MenuProduct } from './menu-types';

/**
 * Reduces the full menu to just what the homepage teaser renders.
 *
 * MenuTeaser is a client component, so whatever it takes as a prop gets
 * serialised into the page's RSC payload and shipped to every visitor.
 * It used to take the entire MenuData — all 156 products, with their
 * descriptions, allergen arrays and image URLs — to display one plated
 * dish, two four-line excerpt columns and a list of category names. That
 * put roughly 150 products of dead weight into the homepage HTML, on a
 * page whose whole job is to load fast.
 *
 * Running the selection here instead means the payload carries ~10
 * products and a dozen {id,label} pairs. The picking rules below are
 * unchanged — they simply moved off the client.
 */

export type TeaserCategory = { id: string; label: string };

export type TeaserItem = Pick<MenuProduct, 'id' | 'name' | 'description'> & {
  price: number;
};

export type TeaserColumn = {
  category: TeaserCategory;
  items: TeaserItem[];
};

export type TeaserHero = Pick<
  MenuProduct,
  'name' | 'price' | 'description' | 'kcal' | 'isFeatured' | 'imageUrl'
>;

export type TeaserData = {
  categories: TeaserCategory[];
  hero: TeaserHero | null;
  excerpts: TeaserColumn[];
  /** Products carrying a figure — the "N+ lezzet" counter */
  pricedCount: number;
};

/** Kahvaltı and Yeni Nesil Kahvaltı both read as "breakfast" to a visitor —
 *  used so the teaser doesn't accidentally quote breakfast twice over. */
const isBreakfast = (category: TeaserCategory) =>
  category.label.toLocaleLowerCase('tr').includes('kahvalt');

const toItem = (p: MenuProduct): TeaserItem => ({
  id: p.id,
  name: p.name,
  ...(p.description ? { description: p.description } : {}),
  price: p.price as number,
});

export function buildTeaser(menu: MenuData): TeaserData {
  const categories: TeaserCategory[] = [...menu.categories]
    .sort(byOrder)
    .map((c) => ({ id: c.id, label: c.label }));

  /**
   * The signature plate: the first featured, photographed dish that ISN'T
   * a breakfast item — Kahvaltı already anchors the first excerpt column,
   * so the hero plate is where pizza/burger/ana yemek get to make the case.
   * Falls back to any featured photo, then any photo at all.
   */
  const withPhoto = menu.products.filter((p) => p.isFeatured && p.imageUrl);
  const nonBreakfast = withPhoto.find((p) => {
    const category = categories.find((c) => c.id === p.categoryId);
    return !category || !isBreakfast(category);
  });
  const heroProduct =
    nonBreakfast ?? withPhoto[0] ?? menu.products.find((p) => p.imageUrl);

  const hero: TeaserHero | null = heroProduct
    ? {
        name: heroProduct.name,
        price: heroProduct.price,
        ...(heroProduct.description
          ? { description: heroProduct.description }
          : {}),
        kcal: heroProduct.kcal ?? null,
        ...(heroProduct.isFeatured ? { isFeatured: true } : {}),
        ...(heroProduct.imageUrl ? { imageUrl: heroProduct.imageUrl } : {}),
      }
    : null;

  /**
   * Two columns quoting real rows. The first is whichever category leads
   * the card; the second is deliberately the first NON-breakfast category
   * with enough priced items, so the excerpt reads as "the whole kitchen"
   * rather than "just kahvaltı" — a genuine bug in an earlier pass, since
   * Kahvaltı and Yeni Nesil Kahvaltı sit first and second on the card.
   */
  const usable: TeaserColumn[] = categories
    .map((category) => ({
      category,
      items: menu.products
        .filter((p) => p.categoryId === category.id && p.price !== null)
        .sort(byOrder)
        .slice(0, 4)
        .map(toItem),
    }))
    .filter((column) => column.items.length >= 3);

  let excerpts: TeaserColumn[];
  if (usable.length <= 2) {
    excerpts = usable;
  } else {
    const first = usable[0];
    const second =
      usable.find(
        (c) => c.category.id !== first.category.id && !isBreakfast(c.category)
      ) ?? usable[1];
    excerpts = [first, second];
  }

  return {
    categories,
    hero,
    excerpts,
    pricedCount: menu.products.filter((p) => p.price !== null).length,
  };
}
