'use client';

import { useId } from 'react';

/**
 * A whisper-fine dot grid — the paper-stock texture a flat cream or ivory
 * fill was missing. Same instinct as GrainOverlay (opacity in the 0.03–0.05
 * range so it reads as material, not pattern), but a regular grid instead
 * of noise, which suits the light "menu card" sections better than a photo
 * grain would.
 *
 * `useId` keeps the pattern id unique per instance — the homepage renders
 * several of these on one page, and a shared literal id would mean every
 * instance after the first quietly resolves to the first one's fill colour.
 */
export default function DotWeave({
  className = '',
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'pearl';
}) {
  const patternId = `dotweave-${useId()}`;
  const color = tone === 'pearl' ? 'var(--pearl)' : 'var(--ink)';

  return (
    <svg aria-hidden="true" className={className} width="100%" height="100%">
      <defs>
        <pattern
          id={patternId}
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.1" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
