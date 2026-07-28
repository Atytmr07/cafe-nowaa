import Image from 'next/image';

/**
 * Unified photographic treatment: a restrained monochrome-leaning grade
 * plus a soft bottom shade, so the mixed placeholder set reads as one
 * art-directed shoot alongside the pearl-on-black identity.
 *
 * Must be rendered inside a `relative` container (uses next/image fill).
 */
const BLUR_DATA_URL =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6"><rect width="8" height="6" fill="#131315"/><rect width="8" height="3" y="3" fill="#26262a"/></svg>'
  );

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Extra classes for the <img> itself (e.g. hover scale transitions) */
  imgClassName?: string;
};

export default function Photo({
  src,
  alt,
  sizes,
  imgClassName = '',
}: PhotoProps) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes={sizes}
        className={`luxe-photo object-cover ${imgClassName}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/35 via-transparent to-transparent"
      />
    </>
  );
}
