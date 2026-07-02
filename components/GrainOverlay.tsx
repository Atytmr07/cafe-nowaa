'use client';

import { useId } from 'react';

/**
 * Whisper-quiet feTurbulence noise overlay for dark sections only.
 * Rendered absolutely inside a `relative` parent.
 */
export default function GrainOverlay() {
  const filterId = useId();

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
    >
      <filter id={filterId}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  );
}
