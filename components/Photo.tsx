import Image from 'next/image';
import StaticPhoto from './StaticPhoto';
import { isLocalPhoto } from '@/lib/photos';

/**
 * Unified photographic treatment: a restrained monochrome-leaning grade
 * plus a soft bottom shade, so the mixed placeholder set reads as one
 * art-directed shoot alongside the pearl-on-black identity.
 *
 * Must be rendered inside a `relative` container (uses next/image fill).
 *
 * Two paths behind one API. Venue photography is pre-built into WebP
 * variants at commit time and served as static files (see lib/photos.ts),
 * because it never changes and every optimizer request for it is a billed
 * transformation. Dish photos uploaded through the admin can't be
 * pre-built, so those still go through next/image. Call sites don't need
 * to know which is which.
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
      {isLocalPhoto(src) ? (
        <StaticPhoto src={src} alt={alt} sizes={sizes} imgClassName={imgClassName} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes={sizes}
          className={`luxe-photo object-cover ${imgClassName}`}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/35 via-transparent to-transparent"
      />
    </>
  );
}
