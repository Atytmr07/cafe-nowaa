import { readCollection } from './firestore-rest';
import { REVALIDATE_SECONDS } from './menu-server';
import {
  byGalleryOrder,
  isGalleryItemVisible,
  type GalleryItem,
} from './gallery-types';

/**
 * The café's own gallery posts, read on the server once per revalidation
 * window — same reasoning as the menu (see lib/menu-server.ts): the cost is
 * a function of time, not traffic, and no Firebase SDK reaches the homepage.
 *
 * Every admin gallery write pings /api/revalidate-gallery, so a new post is
 * live on the next request; the window is only a safety net.
 *
 * Tagged separately from the menu so a new photo doesn't also force the
 * ~170-document menu read, and vice versa.
 */
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const docs = await readCollection('gallery', {
      revalidate: REVALIDATE_SECONDS,
      tags: ['gallery'],
    });
    return (docs as unknown as GalleryItem[])
      .filter((item) => item.url && isGalleryItemVisible(item))
      .sort(byGalleryOrder);
  } catch {
    // Rules not deployed yet, Firestore down: the built-in photos still
    // make a complete gallery, so fail quiet rather than break the page.
    return [];
  }
}
