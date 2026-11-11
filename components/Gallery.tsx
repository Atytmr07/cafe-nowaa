'use client';

import { useMemo, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Play, ZoomIn } from 'lucide-react';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import Photo from './Photo';
import ColumnDivider from './ColumnDivider';
import Lightbox, { type LightboxItem } from './Lightbox';
import DotWeave from './decor/DotWeave';
import OrganicBlob from './decor/OrganicBlob';
import CoffeeBeans from './decor/CoffeeBeans';
import { GALLERY_IMAGES } from '@/data/gallery';
import {
  DEFAULT_CAPTION,
  SHAPE_ASPECT,
  type GalleryItem,
} from '@/lib/gallery-types';

/** One tile, whether it came from the code or from the admin panel. */
type Tile = {
  id: string;
  kind: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  /** Tailwind aspect class */
  aspect: string;
};

/**
 * Upper bound on tiles in the grid. The café's posts go first, so as they
 * accumulate they push the built-in photos out rather than the section
 * growing forever; older posts can be hidden or reordered in the admin.
 */
const MAX_TILES = 18;

const BUILT_IN_TILES: Tile[] = GALLERY_IMAGES.map((image) => ({
  id: image.id,
  kind: image.kind ?? 'image',
  src: image.src,
  poster: image.poster,
  alt: image.alt,
  aspect: image.aspect,
}));

export default function Gallery({ uploads = [] }: { uploads?: GalleryItem[] }) {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  const tiles = useMemo<Tile[]>(
    () =>
      [
        ...uploads.map<Tile>((item) => ({
          id: item.id,
          kind: item.kind,
          src: item.url,
          poster: item.posterUrl,
          alt: item.caption || DEFAULT_CAPTION,
          aspect: SHAPE_ASPECT[item.shape] ?? SHAPE_ASPECT.portrait,
        })),
        ...BUILT_IN_TILES,
      ].slice(0, MAX_TILES),
    [uploads]
  );

  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      tiles.map((tile) => ({
        src: tile.src,
        alt: tile.alt,
        kind: tile.kind,
        poster: tile.poster,
      })),
    [tiles]
  );

  return (
    <section id="galeri" className="relative overflow-hidden bg-pearl py-24 md:py-32">
      <DotWeave className="pointer-events-none absolute inset-0 opacity-[0.045]" />
      <OrganicBlob
        tone="gold"
        className="pointer-events-none absolute -left-28 bottom-0 h-80 w-80 opacity-[0.08] blur-3xl animate-drift"
      />
      {/* In the empty margin beside the centred heading. */}
      <CoffeeBeans
        tone="ink"
        className="pointer-events-none absolute left-4 top-28 h-16 w-24 -rotate-[16deg] opacity-[0.22] sm:left-8 sm:h-20 sm:w-[7.5rem]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ColumnDivider tone="light" className="mb-16" />

        <div className="text-center">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-luxe text-steel">
              Galeri
            </p>
          </Reveal>

          <MaskedText
            as="h2"
            lines={[
              <>
                Mekandan <em className="italic">Kareler</em>
              </>,
            ]}
            className="mt-5 font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-6xl"
          />
        </div>

        {/* Editorial masonry — CSS columns keep varied ratios flowing */}
        <Reveal className="mt-16">
          <div className="columns-2 gap-4 md:columns-3 md:gap-6 [&>*]:mb-4 md:[&>*]:mb-6">
            {tiles.map((tile, i) => (
              <GalleryTile
                key={tile.id}
                tile={tile}
                index={i}
                onZoom={setZoomedIndex}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <Lightbox
        item={zoomedIndex != null ? lightboxItems[zoomedIndex] : null}
        items={lightboxItems}
        index={zoomedIndex}
        onNavigate={setZoomedIndex}
        onClose={() => setZoomedIndex(null)}
      />
    </section>
  );
}

/**
 * One tile of the masonry. Two kinds of motion, both independent of hover —
 * which matters because on a phone there is no hover, and without this the
 * whole gallery sat frozen once its entrance had played:
 *
 *  - the image drifts continuously (Ken Burns), alternating direction so
 *    neighbours never move in lockstep
 *  - the tile itself is offset by scroll position, so the grid breathes as
 *    the visitor scrolls rather than arriving and stopping
 */
function GalleryTile({
  tile,
  index,
  onZoom,
}: {
  tile: Tile;
  index: number;
  onZoom: (index: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Alternating magnitude keeps the columns from sliding as one slab
  const drift = [22, -14, 18][index % 3];
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    // The transform lives on an inner element, never on the figure itself:
    // a transformed child of a CSS multi-column container gets fragmented
    // wrongly and half the tiles simply vanished. Keeping the figure
    // untransformed also means its layout height stays put, so neighbouring
    // tiles don't reflow as this one drifts — which is what parallax wants.
    <figure ref={ref} className="break-inside-avoid">
      <motion.div style={{ y: prefersReducedMotion ? 0 : y }}>
        <button
          type="button"
          onClick={() => onZoom(index)}
          aria-label={`${tile.alt} — ${tile.kind === 'video' ? 'videoyu oynat' : 'büyüt'}`}
          className="group relative block w-full overflow-hidden shadow-soft"
        >
          <div className={`relative ${tile.aspect}`}>
            {tile.kind === 'video' ? (
              <>
                {/*
                  Only the still loads here — the clip itself downloads
                  when someone presses play in the lightbox, so a visitor
                  who scrolls past costs ~40 kB, not megabytes.
                */}
                {tile.poster ? (
                  // eslint-disable-next-line @next/next/no-img-element -- a
                  // small pre-sized JPEG; nothing for next/image to gain.
                  <img
                    src={tile.poster}
                    alt={tile.alt}
                    loading="lazy"
                    decoding="async"
                    className="luxe-photo absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <video
                    src={tile.src}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="luxe-photo absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-obsidian/20 transition-colors duration-300 group-hover:bg-obsidian/30"
                />
                {/* Always shown, not on hover — phones have no hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-pearl/50 bg-obsidian/45 text-pearl shadow-soft backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-gold/70 group-hover:text-gold-bright">
                    <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" strokeWidth={0} />
                  </span>
                </span>
              </>
            ) : (
              <Photo
                src={tile.src}
                alt={tile.alt}
                sizes="(min-width: 768px) 33vw, 50vw"
                imgClassName={
                  prefersReducedMotion
                    ? ''
                    : index % 2 === 0
                      ? 'animate-ken-burns'
                      : 'animate-ken-burns-alt'
                }
              />
            )}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 border border-pearl/0 transition-colors duration-500 group-hover:border-gold/60"
            />
            {tile.kind !== 'video' && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-pearl/40 bg-obsidian/40 text-pearl backdrop-blur-sm">
                  <ZoomIn className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </span>
            )}
          </div>
        </button>
      </motion.div>
    </figure>
  );
}
