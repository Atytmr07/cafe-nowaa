import { resolvePhoto } from '@/lib/photos';

/**
 * A venue photo served straight from the CDN as pre-built WebP — no
 * next/image, so no Vercel image transformation is ever billed for it.
 * See lib/photos.ts for why.
 *
 * Drops into the same `relative` containers next/image's `fill` mode used,
 * by reproducing what `fill` does in CSS: absolutely positioned, filling
 * the box, object-cover.
 */
export default function StaticPhoto({
  src,
  alt,
  sizes,
  imgClassName = '',
  priority = false,
}: {
  /** Canonical `/photos/<file>.jpeg` key — see lib/photos.ts */
  src: string;
  alt: string;
  sizes: string;
  imgClassName?: string;
  /** Set on the LCP image so it isn't lazy-loaded */
  priority?: boolean;
}) {
  const photo = resolvePhoto(src);
  if (!photo) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- deliberate:
    // bypassing next/image is the entire point of this component.
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      alt={alt}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={`luxe-photo absolute inset-0 h-full w-full object-cover ${imgClassName}`}
    />
  );
}
