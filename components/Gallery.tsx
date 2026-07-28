'use client';

import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import Photo from './Photo';
import ColumnDivider from './ColumnDivider';
import Lightbox, { type LightboxItem } from './Lightbox';
import { GALLERY_IMAGES } from '@/data/gallery';

export default function Gallery() {
  const [zoomed, setZoomed] = useState<LightboxItem | null>(null);

  return (
    <section id="galeri" className="bg-pearl py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
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
            {GALLERY_IMAGES.map((image) => (
              <figure key={image.id} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() =>
                    setZoomed({ src: image.src, alt: image.alt })
                  }
                  aria-label={`${image.alt} — büyüt`}
                  className="group relative block w-full overflow-hidden shadow-soft"
                >
                  <div className={`relative ${image.aspect}`}>
                    <Photo
                      src={image.src}
                      alt={image.alt}
                      sizes="(min-width: 768px) 33vw, 50vw"
                      imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-3 border border-pearl/0 transition-colors duration-500 group-hover:border-pearl/35"
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
              </figure>
            ))}
          </div>
        </Reveal>
      </div>

      <Lightbox item={zoomed} onClose={() => setZoomed(null)} />
    </section>
  );
}
