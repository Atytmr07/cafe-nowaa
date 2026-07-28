/**
 * Seed menu — the printed card transcribed in data/menu.ts, reshaped into
 * the MenuCategory / MenuProduct model.
 *
 * This is what renders server-side (so /menu stays static and indexable)
 * and what the admin's "Firestore'a aktar" action publishes. Once
 * Firestore holds data, live values take over on the client.
 */
import { CATEGORIES, PRODUCTS } from './menu';
import type { MenuCategory, MenuData, MenuProduct } from '@/lib/menu-types';

export const SEED_CATEGORIES: MenuCategory[] = CATEGORIES.map(
  (category, index) => ({
    id: category.slug,
    label: category.label,
    order: index,
    subcategories: [...category.groups],
  })
);

/**
 * Allergens inferred only where the printed ingredient list makes them
 * unambiguous (peynir → Süt, ekşi mayalı ekmek → Gluten). Anything less
 * than certain is left blank for the kitchen to confirm in the admin —
 * a wrong allergen claim is worse than a missing one.
 */
const ALLERGENS: Record<string, string[]> = {
  'sefin-kahvalti-tabagi': ['Süt', 'Yumurta'],
  'serpme-kahvalti': ['Gluten', 'Süt', 'Yumurta'],
  'peynirli-omlet': ['Süt', 'Yumurta'],
  'kasarli-omlet': ['Süt', 'Yumurta'],
  'sebzeli-omlet': ['Yumurta'],
  'sucuk-kasarli-omlet': ['Süt', 'Yumurta'],
  menemen: ['Yumurta', 'Süt'],
  mihlama: ['Süt'],
  pastirmali: ['Gluten', 'Süt', 'Yumurta'],
  'hindi-fumeli': ['Gluten', 'Süt', 'Yumurta'],
  avokadolu: ['Gluten', 'Süt', 'Yumurta', 'Hardal'],
  nowaakado: ['Gluten', 'Süt', 'Yumurta'],
  'sade-kruvasan': ['Gluten', 'Süt'],
  'hindi-fumeli-kruvasan': ['Gluten', 'Süt', 'Yumurta'],
  'avokado-kruvasan': ['Gluten', 'Süt', 'Yumurta'],
  'meyveli-kruvasan': ['Gluten', 'Süt', 'Yumurta'],
  'kasarli-tost': ['Gluten', 'Süt'],
  'karisik-tost': ['Gluten', 'Süt'],
  'kavurmali-tost': ['Gluten', 'Süt'],
  'beyaz-peynirli-gozleme': ['Gluten', 'Süt'],
  'kasar-peynirli-gozleme': ['Gluten', 'Süt'],
  'patatesli-gozleme': ['Gluten'],
  'klasik-hamburger': ['Gluten'],
  cheeseburger: ['Gluten', 'Süt'],
  'nowaa-burger': ['Gluten'],
  'double-nowaa-burger': ['Gluten', 'Süt'],
  'margarita-pizza': ['Gluten', 'Süt'],
  'nowaa-karisik-pizza': ['Gluten', 'Süt'],
  'tonbalikli-pizza': ['Gluten', 'Süt', 'Balık'],
  'sucuk-sever-pizza': ['Gluten', 'Süt'],
  'pesto-soslu-penne': ['Gluten', 'Süt'],
  'spagetti-bolonez': ['Gluten'],
  'penne-arrabbiata': ['Gluten', 'Süt'],
  manti: ['Gluten', 'Süt'],
  'citir-manti': ['Gluten', 'Süt'],
  'kori-soslu-tavuk': ['Süt'],
  'kremali-kekikli-tavuk': ['Süt'],
  'soya-soslu-tavuk': ['Soya'],
  'meksika-soslu-tavuk': ['Süt'],
  'tavuk-fajita': ['Gluten', 'Süt'],
  'hellimli-avokadolu-salata': ['Süt'],
  'citir-tavuklu-salata': ['Gluten'],
  'tonbalikli-salata': ['Balık'],
  'sezar-salata': ['Gluten', 'Süt', 'Yumurta', 'Balık'],
  'kofteli-wrap': ['Gluten', 'Süt'],
  'barbeku-soslu-wrap': ['Gluten'],
  'tavuklu-wrap': ['Gluten'],
  'meksika-soslu-wrap': ['Gluten'],
  'soya-soslu-wrap': ['Gluten', 'Soya'],
  latte: ['Süt'],
  cappuccino: ['Süt'],
  'flat-white': ['Süt'],
  cortado: ['Süt'],
  mocha: ['Süt'],
  'white-mocha': ['Süt'],
  affogato: ['Süt'],
  'caramel-macchiato': ['Süt'],
  'espresso-macchiato': ['Süt'],
  'vanilya-latte': ['Süt'],
  'karamel-latte': ['Süt'],
  'hazelnut-latte': ['Süt', 'Yemiş'],
  'coconut-latte': ['Süt'],
  'lotus-latte': ['Süt', 'Gluten'],
  'matcha-latte': ['Süt'],
  'ice-latte': ['Süt'],
  'ice-matcha-latte': ['Süt'],
  'ice-strawberry-matcha': ['Süt'],
  'ice-cappuccino': ['Süt'],
  'ice-mocha': ['Süt'],
  'ice-white-mocha': ['Süt'],
  'ice-vanilya-latte': ['Süt'],
  'ice-hazelnut-latte': ['Süt', 'Yemiş'],
  'ice-chocolate-latte': ['Süt'],
  'ice-chai-tea-latte': ['Süt'],
  'ice-caramel-latte': ['Süt'],
  'beyaz-sicak-cikolata': ['Süt'],
  'findikli-salep': ['Süt', 'Yemiş'],
  sahlep: ['Süt'],
  'balli-sut': ['Süt'],
  'oreolu-sicak-cikolata': ['Süt', 'Gluten'],
  'sicak-cikolata': ['Süt'],
  ayran: ['Süt'],
  'cikolatali-frappe': ['Süt'],
  'oreolu-frappe': ['Süt', 'Gluten'],
  'muzlu-frappe': ['Süt'],
  'elmali-frappe': ['Süt'],
  'cikolatali-smoothie': ['Süt'],
  'muzlu-smoothie': ['Süt'],
  'elmali-smoothie': ['Süt'],
  'cilekli-milkshake': ['Süt'],
  'muzlu-milkshake': ['Süt'],
  'oreolu-milkshake': ['Süt', 'Gluten'],
  'cikolatali-milkshake': ['Süt'],
  'vanilya-karamel-milkshake': ['Süt'],
  'cupta-limonlu-cheesecake': ['Süt', 'Gluten', 'Yumurta'],
  spoonful: ['Süt', 'Gluten'],
  'hamsikoy-firin-sutlac': ['Süt'],
  'kupta-tiramisu': ['Süt', 'Gluten', 'Yumurta'],
  'cheesecake-cesitleri': ['Süt', 'Gluten', 'Yumurta'],
  'cevizli-tarcinli-kek': ['Süt', 'Gluten', 'Yumurta', 'Yemiş'],
  'san-sebastian': ['Süt', 'Yumurta', 'Gluten'],
  'mozaik-pasta': ['Süt', 'Gluten'],
  'beyaz-cikolatali-browni': ['Süt', 'Gluten', 'Yumurta'],
  'pasta-cesitleri': ['Süt', 'Gluten', 'Yumurta'],
  'cilekli-magnolia': ['Süt', 'Gluten'],
  'muzlu-magnolia': ['Süt', 'Gluten'],
  'red-velvet-cookie': ['Gluten', 'Süt', 'Yumurta'],
  'lotuslu-cookie': ['Gluten', 'Süt', 'Yumurta'],
  'klasik-cookie': ['Gluten', 'Süt', 'Yumurta'],
  'oreolu-cookie': ['Gluten', 'Süt', 'Yumurta'],
  'nutella-cookie': ['Gluten', 'Süt', 'Yumurta', 'Yemiş'],
  'nutella-lotuslu-cookie': ['Gluten', 'Süt', 'Yumurta', 'Yemiş'],
  'dondurma-cesitleri': ['Süt'],
};

export const SEED_PRODUCTS: MenuProduct[] = PRODUCTS.map((product, index) => ({
  id: product.id,
  name: product.name,
  ...(product.description ? { description: product.description } : {}),
  price: product.price,
  ...(product.priceNote ? { priceNote: product.priceNote } : {}),
  // Left null on purpose: publishing invented calorie figures for a real
  // kitchen would be misleading. The admin has the field ready.
  kcal: null,
  allergens: ALLERGENS[product.id] ?? [],
  categoryId: product.categorySlug,
  subcategory: product.group,
  order: index,
  ...(product.isFeatured ? { isFeatured: true } : {}),
  ...(product.imageUrl ? { imageUrl: product.imageUrl } : {}),
}));

export const SEED_MENU: MenuData = {
  categories: SEED_CATEGORIES,
  products: SEED_PRODUCTS,
};

export const SEED_FEATURED = SEED_PRODUCTS.filter(
  (p): p is MenuProduct & { imageUrl: string } =>
    Boolean(p.isFeatured && p.imageUrl)
);
