'use client';

import { useId } from 'react';

/**
 * Inline SVG recreation of the real Cafe Nowaa roundel.
 *
 * Geometry measured off the storefront sign: the monogram fills ~68% of
 * the ring's inner width and ~55% of its height, N and V are near-equal
 * widths overlapping by ~9 units, and the V's left arm crosses the N's
 * right stem just below centre.
 *
 * Two details keep it from reading crooked:
 *  - each letter is ONE polyline, so its corners mitre like a real
 *    letterform instead of leaving open joints;
 *  - the group is clipped to the cap-height band, which trims the mitre
 *    spikes flat. Without it the V's point overshoots the N's baseline by
 *    6 units and the whole mark hangs to one side.
 */
const CAP_TOP = 28;
const BASELINE = 72;

export const NV_PATHS = {
  /** left stem ↑, diagonal ↘, right stem ↑ */
  n: 'M24 72 V28 L54 72 V28',
  /** left arm ↘ to the apex, right arm ↗ */
  v: 'M45 28 L60.5 72 L76 28',
} as const;

type MonogramProps = {
  className?: string;
  weight?: number;
};

/** The NV letters alone, without the ring. */
export function NVMonogram({
  className = 'h-10 w-10',
  weight = 4.2,
}: MonogramProps) {
  const clipId = useId();

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
  weight = 4.2,
}: NVLogoProps) {
  const clipId = useId();

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
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="4.5" />
      <g
        clipPath={`url(#${clipId})`}
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <path d={NV_PATHS.n} />
        <path d={NV_PATHS.v} />
      </g>
    </svg>
  );
}
