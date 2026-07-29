'use client';

import { useId } from 'react';

/**
 * Inline SVG recreation of the real Cafe Nowaa roundel.
 *
 * The monogram is a ligature of exactly THREE strokes across the top:
 * the N's left stem, then the V's two arms. The N has NO right stem —
 * its diagonal runs down-right and simply ends at the baseline, and the
 * V begins at the top where that stem would have stood. Earlier passes
 * drew the missing stem and had to carve the V out of it; removing it is
 * what finally untangles the mark.
 *
 * Proportions traced off the storefront sign:
 *   monogram ≈ 70% of the ring's inner width · cap 27 → baseline 73
 *   (paths overshoot and are clipped so diagonal ends cut flat, while
 *   the V's mitred point lands exactly on the baseline)
 */
const CAP_TOP = 27;
const BASELINE = 73;

export const NV_PATHS = {
  /** left stem ↑, diagonal ↘ — no right stem */
  n: 'M25.8 76 V27 L54.2 76',
  /**
   * V's arms; the centreline stops at y=65.2 so the miter carries the
   * apex to a true point on the baseline instead of a clipped flat.
   */
  v: 'M47.4 24 L61.3 65.2 L75.2 24',
} as const;

export const NV_STROKE = {
  ring: 4.6,
  letters: 5,
} as const;

type MonogramProps = {
  className?: string;
  weight?: number;
};

/** The NV ligature alone, without the ring. */
export function NVMonogram({
  className = 'h-10 w-10',
  weight = NV_STROKE.letters,
}: MonogramProps) {
  const clipId = `nv-clip-${useId()}`;

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y={CAP_TOP} width="100" height={BASELINE - CAP_TOP} />
        </clipPath>
      </defs>
      <g
        clipPath={`url(#${clipId})`}
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={8}
      >
        <path d={NV_PATHS.n} />
        <path d={NV_PATHS.v} />
      </g>
    </svg>
  );
}

type NVLogoProps = MonogramProps & {
  /** Decorative instances (backdrops) are hidden from assistive tech */
  decorative?: boolean;
};

export default function NVLogo({
  className = 'h-10 w-10',
  decorative = false,
  weight = NV_STROKE.letters,
}: NVLogoProps) {
  const clipId = `nv-clip-${useId()}`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Cafe Nowaa NV logosu'}
      aria-hidden={decorative || undefined}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y={CAP_TOP} width="100" height={BASELINE - CAP_TOP} />
        </clipPath>
      </defs>

      <circle
        cx="50"
        cy="50"
        r="42"
        stroke="currentColor"
        strokeWidth={NV_STROKE.ring}
      />

      <g
        clipPath={`url(#${clipId})`}
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={8}
      >
        <path d={NV_PATHS.n} />
        <path d={NV_PATHS.v} />
      </g>
    </svg>
  );
}
