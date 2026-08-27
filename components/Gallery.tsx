'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import Photo from './Photo';
import ColumnDivider from './ColumnDivider';
import Lightbox, { type LightboxItem } from './Lightbox';
import CoffeeBeans from './decor/CoffeeBeans';
import BeanField from './decor/BeanField';
import DotWeave from './decor/DotWeave';
import OrganicBlob from './decor/OrganicBlob';
import { GALLERY_IMAGES, type GalleryImage } from '@/data/gallery';

const LIGHTBOX_ITEMS: LightboxItem[] = GALLERY_IMAGES.map((image) => ({
  src: image.src,
  alt: image.alt,
}));

export default function Gallery() {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  return (
    <section id="galeri" className="relative overflow-hidden bg-pearl py-24 md:py-32">
      <DotWeave className="pointer-events-none absolute inset-0 opacity-[0.045]" />
      <BeanField tone="ink" className="pointer-events-none absolute inset-0 opacity-[0.1]" />
      <OrganicBlob
        tone="gold"
        className="pointer-events-none absolute -left-28 bottom-0 h-80 w-80 opacity-[0.08] blur-3xl animate-drift"
      />
      <CoffeeBeans
        tone="ink"
        className="pointer-events-none absolute right-6 top-24 h-14 w-24 rotate-[-18deg] opacity-[0.12] sm:right-14"
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
            {GALLERY_IMAGES.map((image, i) => (
              <GalleryTile
                key={image.id}
                image={image}
                index={i}
                onZoom={setZoomedIndex}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <Lightbox
        item={zoomedIndex != null ? LIGHTBOX_ITEMS[zoomedIndex] : null}
        items={LIGHTBOX_ITEMS}
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
  image,
  index,
  onZoom,
}: {
  image: GalleryImage;
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
          aria-label={`${image.alt} — büyüt`}
          className="group relative block w-full overflow-hidden shadow-soft"
        >
          <div className={`relative ${image.aspect}`}>
            <Photo
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 768px) 33vw, 50vw"
              imgClassName={
                prefersReducedMotion
                  ? ''
                  : index % 2 === 0
                    ? 'animate-ken-burns'
                    : 'animate-ken-burns-alt'
              }
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 border border-pearl/0 transition-colors duration-500 group-hover:border-gold/60"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-pearl/40 bg-obsidian/40 text-pearl backdrop-blur-sm">
                <ZoomIn className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </span>
          </div>
        </button>
      </motion.div>
    </figure>
  );
}
