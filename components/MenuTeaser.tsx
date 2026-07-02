'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import MaskedText from './MaskedText';
import WarmImage from './WarmImage';
import GrainOverlay from './GrainOverlay';
import { FEATURED_PRODUCTS, formatPrice } from '@/data/menu';

/**
 * Homepage-only preview: a deliberately incomplete taste of the menu.
 * The full category-tabbed experience lives EXCLUSIVELY at /menu —
 * never render category tabs or the complete product list here.
 */
export default function MenuTeaser() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-noir py-20 md:py-28">
      <GrainOverlay />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Menü
            </p>
          </Reveal>

          <MaskedText
            as="h2"
            lines={['Lezzetlerimizden Bir Kesit']}
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl"
          />

          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone">
              Şefin öne çıkardığı birkaç imza lezzet — tamamı için menümüze göz
              atın.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.slice(0, 4).map((product, i) => (
            <Reveal key={product.id} delay={i * 0.08}>
              <article className="group overflow-hidden rounded-2xl bg-noir-surface shadow-warm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <WarmImage
                    src={product.imageUrl}
                    alt={product.name}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-cream">
                    {product.name}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm leading-relaxed text-stone">
                    {product.description}
                  </p>
                  <p className="mt-3 font-sans text-base font-bold text-gold">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* The doorway to the dedicated /menu experience */}
        <Reveal className="mt-14 text-center">
          <motion.div
            className="inline-block"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Link
              href="/menu"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-gold px-10 py-5 text-sm font-semibold uppercase tracking-widest text-noir shadow-glow transition-all hover:bg-gold-bright hover:shadow-glow-strong"
            >
              Tüm Menüyü Gör
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
