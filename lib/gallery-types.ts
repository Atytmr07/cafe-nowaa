/**
 * Gallery items uploaded by the café through the admin panel.
 *
 * They sit in the `gallery` Firestore collection, with the files themselves
 * in Storage under `gallery/`. The venue photography shipped with the site
 * (data/gallery.ts) is not stored here — it stays in the code and fills the
 * grid after whatever the café has posted.
 */

export type GalleryKind = 'image' | 'video';

/** Coarse shape, picked from the file's real dimensions on upload. */
export type GalleryShape = 'portrait' | 'landscape' | 'square';

export type GalleryItem = {
  id: string;
  kind: GalleryKind;
  /** Public download URL of the photo or video */
  url: string;
  /** Storage path, kept so the file can be deleted with the item */
  path: string;
  /** Still frame shown before a video plays */
  posterUrl?: string;
  posterPath?: string;
  /** Short description; doubles as the alt text */
  caption?: string;
  shape: GalleryShape;
  /**
   * Sort key, ascending. New uploads take `-Date.now()` so the latest post
   * lands first without renumbering anything; reordering swaps two keys.
   */
  order: number;
  /** Off = hidden from the site, kept in the admin */
  isVisible?: boolean;
  createdAt: number;
};

/** Tailwind classes must appear literally for the JIT to emit them. */
export const SHAPE_ASPECT: Record<GalleryShape, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
};

export function shapeFor(width: number, height: number): GalleryShape {
  const ratio = width / height;
  if (ratio < 0.9) return 'portrait';
  if (ratio > 1.1) return 'landscape';
  return 'square';
}

export const DEFAULT_CAPTION = 'Cafe Nowaa’dan bir kare';

/** `undefined` means never toggled off — visible. */
export const isGalleryItemVisible = (item: GalleryItem) =>
  item.isVisible !== false;

export const byGalleryOrder = (a: GalleryItem, b: GalleryItem) =>
  a.order - b.order;
