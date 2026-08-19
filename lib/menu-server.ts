import { firebaseConfig } from './firebase';
import { SEED_MENU } from '@/data/seed';
import { byOrder, type MenuCategory, type MenuData, type MenuProduct } from './menu-types';

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
 * This goes through the REST API rather than the client SDK on purpose —
 * the SDK opens a persistent WebChannel and caches in ways that make no
 * sense in a serverless render, while a plain `fetch` slots straight into
 * Next's data cache and gets deduped across both pages for free.
 *
 * Server components only. There is no `server-only` guard because the
 * package isn't a dependency here; importing this from a client component
 * would ship a pointless fetch to the browser rather than fail loudly.
 */

/**
 * Fifteen minutes. A café menu does not change faster than that, and it
 * caps Firestore at ~16,000 reads/day — a third of the free tier, with the
 * rest left for the admin panel's live editing session.
 *
 * The admin's own view is unaffected: it subscribes directly and still
 * updates instantly. This window is only how long a price edit takes to
 * reach the public page.
 */
export const REVALIDATE_SECONDS = 900;

const BASE = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

/** One field as Firestore's REST API wraps it — a tagged union by key. */
type RestValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  nullValue?: null;
  arrayValue?: { values?: RestValue[] };
};

type RestDocument = {
  /** Full resource path; the document id is the last segment */
  name: string;
  fields?: Record<string, RestValue>;
};

function decode(value: RestValue): unknown {
  if ('stringValue' in value) return value.stringValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('arrayValue' in value) return (value.arrayValue?.values ?? []).map(decode);
  // nullValue, and anything Firestore adds later that we don't model
  return null;
}

function toObject(doc: RestDocument): Record<string, unknown> {
  const fields = doc.fields ?? {};
  const out: Record<string, unknown> = { id: doc.name.split('/').pop() };
  for (const [key, value] of Object.entries(fields)) out[key] = decode(value);
  return out;
}

/**
 * Every document in a collection. Paginates rather than assuming one page —
 * the menu is under Firestore's default page size today, but a collection
 * silently truncating as the kitchen adds dishes is a bad way to find out.
 */
async function readCollection(name: string): Promise<Record<string, unknown>[]> {
  const documents: RestDocument[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${BASE}/${name}`);
    url.searchParams.set('pageSize', '300');
    url.searchParams.set('key', firebaseConfig.apiKey);
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ['menu'] },
    });
    if (!response.ok) throw new Error(`Firestore ${name}: ${response.status}`);

    const page = (await response.json()) as {
      documents?: RestDocument[];
      nextPageToken?: string;
    };
    documents.push(...(page.documents ?? []));
    pageToken = page.nextPageToken;
  } while (pageToken);

  return documents.map(toObject);
}

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
      readCollection('categories'),
      readCollection('products'),
    ]);

    // An empty `categories` means the admin has never published; the seed
    // is the truth in that case, not an empty page.
    if (!categories.length) return SEED_MENU;

    return {
      categories: (categories as unknown as MenuCategory[])
        .map((c) => ({ ...c, subcategories: c.subcategories ?? [] }))
        .sort(byOrder),
      products: (products as unknown as MenuProduct[]).sort(byOrder),
    };
  } catch {
    return SEED_MENU;
  }
}
