'use client';

import { useId } from 'react';

/**
 * The coffee-bean motif spread across a whole section instead of parked in
 * corners — a scattered field rather than discrete clusters.
 *
 * Same construction as DotWeave: one irregular tile of beans, repeated via
 * an SVG `<pattern>` rather than hand-placed instances, so the motif covers
 * the full section for the cost of a handful of paths instead of dozens.
 * Two things keep a repeating tile from reading as wallpaper:
 *
 *  - the beans inside one tile are scattered at uneven positions, scales
 *    and rotations rather than gridded, so there's no obvious repeat unit
 *    to spot at a glance
 *  - `patternTransform` rotates the whole tile off-axis, which breaks the
 *    horizontal/vertical seams a grid-aligned repeat would otherwise show
 *
 * Opacity is expected to do the rest. Deliberately louder than
 * DotWeave/GrainOverlay's paper-grain range (0.03–0.05) — those are
 * neutral material texture, while this is the site's actual motif and is
 * meant to be recognised as coffee beans on a quick glance, not just felt
 * as grain.
 */
const BEAN =
  'M20 2C10 2 3 16 3 32C3 48 10 58 20 58C30 58 37 48 37 32C37 16 30 2 20 2Z M20 6C14 16 14 44 20 54';

export default function BeanField({
  className = '',
  tone = 'ink',
}: {
  className?: string;
  /** Ink on cream sections, pearl on espresso ones — see CoffeeBeans */
  tone?: 'ink' | 'pearl';
}) {
  const patternId = `beanfield-${useId()}`;
  const color = tone === 'pearl' ? 'var(--pearl)' : 'var(--ink)';

  return (
    <svg aria-hidden="true" className={className} width="100%" height="100%">
      <defs>
        <pattern
          id={patternId}
          width="300"
          height="260"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(7)"
        >
          <g stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none">
            <path d={BEAN} transform="translate(4,-6) rotate(-18 20 32) scale(0.36)" />
            <path d={BEAN} transform="translate(118,18) rotate(26 20 32) scale(0.26)" />
            <path d={BEAN} transform="translate(206,-14) rotate(-6 20 32) scale(0.42)" />
            <path d={BEAN} transform="translate(48,108) rotate(42 20 32) scale(0.3)" />
            <path d={BEAN} transform="translate(158,132) rotate(-32 20 32) scale(0.22)" />
            <path d={BEAN} transform="translate(248,96) rotate(14 20 32) scale(0.32)" />
            <path d={BEAN} transform="translate(96,192) rotate(-10 20 32) scale(0.24)" />
            <path d={BEAN} transform="translate(268,206) rotate(30 20 32) scale(0.28)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
