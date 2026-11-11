import { readCollection } from './firestore-rest';
import { SEED_MENU } from '@/data/seed';
import {
  byOrder,
  isProductVisible,
  type MenuCategory,
  type MenuData,
  type MenuProduct,
} from './menu-types';

/**
 * The public menu, read once per revalidation window instead of once per
 * visitor.
 *
 * The client used to open an `onSnapshot` over both collections from the
 * homepage teaser AND from /menu. With 157 products and 13 categories that
 * is 170 document reads per page view — the Spark plan's 50,000 reads/day
 * runs out at roughly 150 visitors. Worse, the homepage paid for all 170 to
 * show five featured dishes, and dragged the ~175 kB Firestore SDK into the
 * browser to do it.
 *
 * Reading here instead makes the cost a function of time rather than
 * traffic: ~170 reads every REVALIDATE_SECONDS no matter how many people
 * visit, and the Firebase SDK never loads on a public page at all.
 *
 * The REST plumbing lives in lib/firestore-rest.ts, shared with the gallery.
 *
 * Server components only. There is no `server-only` guard because the
 * package isn't a dependency here; importing this from a client component
 * would ship a pointless fetch to the browser rather than fail loudly.
 */

/**
 * Six hours — a pure safety net, not the mechanism a save relies on.
 *
 * Every admin write now calls /api/revalidate-menu right after it commits
 * (see notifyPublicMenuChanged in menu-repo.ts), which clears this cache
 * on the spot. That made the time-based window redundant for the normal
 * path; it only still matters if that fire-and-forget ping is ever lost
 * (an offline admin tab, a cold-started API route), so it only has to be
 * short enough that a missed ping self-heals in a reasonable time, not
 * short enough to BE the update mechanism.
 *
 * At 900s (the original setting, sized for that job) the public site read
 * both collections roughly 96 times a day regardless of whether anything
 * changed — about 16,000 Firestore reads/day on its own, a third of the
 * Spark plan's free quota, just for a menu that in practice changes a
 * handful of times a week. At 21600s that drops to ~4 reads/day from
 * scheduled revalidation, with on-demand pings covering every real edit
 * immediately on top.
 */
export const REVALIDATE_SECONDS = 21600;

const MENU_CACHE = { revalidate: REVALIDATE_SECONDS, tags: ['menu'] };

/**
 * Live menu when Firestore has one, the printed card when it doesn't.
 *
 * Never throws: an empty collection, denied rules, or Firestore being down
 * all fall back to the seed, which is a complete and correct menu. A café's
 * menu page going blank because a database is unreachable would be a far
 * worse failure than showing a card that's a revalidation window stale.
 */
export async function getMenu(): Promise<MenuData> {
  try {
    const [categories, products] = await Promise.all([
      readCollection('categories', MENU_CACHE),
      readCollection('products', MENU_CACHE),
    ]);

    // An empty `categories` means the admin has never published; the seed
    // is the truth in that case, not an empty page.
    if (!categories.length) return SEED_MENU;

    return {
      categories: (categories as unknown as MenuCategory[])
        .map((c) => ({ ...c, subcategories: c.subcategories ?? [] }))
        .sort(byOrder),
      // 86'd dishes (setAvailability, admin only) stay in Firestore and in
      // the admin's own view — just not on the page a visitor sees.
      products: (products as unknown as MenuProduct[])
        .filter(isProductVisible)
        .sort(byOrder),
    };
  } catch {
    return SEED_MENU;
  }
}
