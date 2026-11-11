import { firebaseConfig } from './firebase';

/**
 * Server-side Firestore reads over the REST API, shared by the menu and
 * the gallery.
 *
 * This goes through REST rather than the client SDK on purpose — the SDK
 * opens a persistent WebChannel and caches in ways that make no sense in a
 * serverless render, while a plain `fetch` slots straight into Next's data
 * cache, is deduped across pages for free, and can be dropped on demand by
 * tag (see app/api/revalidate-*).
 *
 * Server components only.
 */

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
 * a collection silently truncating as it grows is a bad way to find out.
 * Throws on a non-2xx response; callers decide what the fallback is.
 */
export async function readCollection(
  name: string,
  cache: { revalidate: number; tags: string[] }
): Promise<Record<string, unknown>[]> {
  const documents: RestDocument[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${BASE}/${name}`);
    url.searchParams.set('pageSize', '300');
    url.searchParams.set('key', firebaseConfig.apiKey);
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const response = await fetch(url, { next: cache });
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
