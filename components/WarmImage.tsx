import Image from 'next/image';

/**
 * Unified photographic treatment for every mock photo on the site:
 * a warm film grade (see .warm-photo in globals.css), a gold tint,
 * a grounding bottom shade, and a blur-up placeholder — so the mixed
 * Unsplash set reads as one art-directed shoot.
 *
 * Must be rendered inside a `relative` container (uses next/image fill).
 */
const BLUR_DATA_URL =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6"><rect width="8" height="6" fill="#1e1b17"/><rect width="8" height="3" y="3" fill="#3a3227"/></svg>'
  );

type WarmImageProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Extra classes for the <img> itself (e.g. hover scale transitions) */
  imgClassName?: string;
};

export default function WarmImage({
  src,
  alt,
  sizes,
  imgClassName = '',
}: WarmImageProps) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes={sizes}
        className={`warm-photo object-cover ${imgClassName}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gold/10 mix-blend-overlay"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/20 to-transparent mix-blend-multiply"
      />
    </>
  );
}
