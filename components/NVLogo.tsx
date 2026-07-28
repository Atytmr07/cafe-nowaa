'use client';

import { useId } from 'react';

/**
 * Inline SVG recreation of the real Cafe Nowaa roundel.
 *
 * The mark is a ligature, not the letters N and V set side by side: they
 * overlap, and the V passes IN FRONT — its left arm interrupts the N's
 * right stem where they cross. That knockout is what keeps the two
 * letters readable; drawn on one layer they fuse into a single mass.
 *
 * Geometry traced off the storefront sign at a 0.126 scale:
 *   monogram ≈ 68% of the ring's inner width · cap height 46
 *   N stems 32.2 apart · V half-width 12.65 · crossing 55% down
 */
const CAP_TOP = 27;
const BASELINE = 73;

/** Half the dark channel left around the V where it crosses the N. */
const CUT = 2;

export const NV_PATHS = {
  /** left stem ↑, diagonal ↘, right stem ↑ */
  n: 'M25.5 73 V27 L57.7 73 V27',
  /**
   * left arm ↘ to the mitred point, right arm ↗.
   * The centreline stops at y=64.8 so the mitre carries the apex to
   * exactly y=73 and the letter ends in a true point. Running it to the
   * baseline instead lets the clip shear the tip flat, and that flat
   * merges with the foot of the N's right stem.
   */
  v: 'M49.2 27 L61.85 64.8 L74.5 27',
} as const;

type MonogramProps = {
  className?: string;
  weight?: number;
};

/** The NV ligature alone, without the ring. */
export function NVMonogram({
  className = 'h-10 w-10',
  weight = 5.2,
}: MonogramProps) {
  const uid = useId();
  const clipId = `nv-clip-${uid}`;
  const maskId = `nv-mask-${uid}`;

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y={CAP_TOP} width="100" height={BASELINE - CAP_TOP} />
        </clipPath>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <path
            d={NV_PATHS.v}
            stroke="black"
            strokeWidth={weight + CUT * 2}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit={8}
            fill="none"
          />
        </mask>
      </defs>

      <g
        clipPath={`url(#${clipId})`}
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={8}
      >
        <path d={NV_PATHS.n} mask={`url(#${maskId})`} />
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
  weight = 5.2,
}: NVLogoProps) {
  const uid = useId();
  const clipId = `nv-clip-${uid}`;
  const maskId = `nv-mask-${uid}`;

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
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <path
            d={NV_PATHS.v}
            stroke="black"
            strokeWidth={weight + CUT * 2}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit={8}
            fill="none"
          />
        </mask>
      </defs>

      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="4.6" />

      <g
        clipPath={`url(#${clipId})`}
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={8}
      >
        <path d={NV_PATHS.n} mask={`url(#${maskId})`} />
        <path d={NV_PATHS.v} />
      </g>
    </svg>
  );
}
