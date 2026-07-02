'use client';

import Reveal from './Reveal';
import MaskedText from './MaskedText';
import WarmImage from './WarmImage';
import ColumnDivider from './ColumnDivider';
import { GALLERY_IMAGES } from '@/data/gallery';

export default function Gallery() {
  return (
    <section id="galeri" className="bg-marble py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ColumnDivider tone="light" className="mb-12" />

        <div className="text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Galeri
            </p>
          </Reveal>

          <MaskedText
            as="h2"
            lines={['Mekandan Kareler']}
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          />
        </div>

        {/* Editorial masonry — CSS columns keep varied aspect ratios flowing */}
        <Reveal className="mt-14">
          <div className="columns-2 gap-4 md:columns-3 md:gap-5 [&>*]:mb-4 md:[&>*]:mb-5">
            {GALLERY_IMAGES.map((image) => (
              <figure
                key={image.id}
                className="group relative break-inside-avoid overflow-hidden rounded-2xl shadow-soft"
              >
                <div className={`relative ${image.aspect}`}>
                  <WarmImage
                    src={image.src}
                    alt={image.alt}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
