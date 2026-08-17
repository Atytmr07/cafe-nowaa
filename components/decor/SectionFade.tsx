'use client';

import { useId } from 'react';

/**
 * The seam between two sections, dissolved.
 *
 * An earlier attempt drew a curved SVG divider here and it never landed — a
 * shape at a boundary is still a boundary, just a wigglier one. What actually
 * merges two flat colour fields is a ramp, and the whole difficulty is that a
 * naive `linear-gradient(A, B)` doesn't read as one: its slope starts and
 * stops abruptly, so the eye finds two new edges where the ramp begins and
 * ends, and the middle looks like a smear between them. Three details fix it:
 *
 *  1. EASED STOPS. The alpha ramp follows smoothstep — t²(3−2t) — sampled at
 *     eight points. Slope is zero at both ends, so the fade has no detectable
 *     start or finish; it only has a middle.
 *
 *  2. EXPLICIT ZERO-ALPHA COLOUR. `transparent` is rgba(0,0,0,0), and
 *     interpolating toward it drags the ramp through grey — the classic
 *     "muddy gradient". Both ends are the same RGB, only alpha moves.
 *
 *  3. DITHER. A 96–128px ramp across this much luminance banks into visible
 *     bands on 8-bit displays. A whisper of feTurbulence noise over the ramp
 *     breaks the steps up, the same trick a print gradient uses.
 *
 * Sits at the TOP of the arriving section, painted in the DEPARTING section's
 * colour: at its first pixel row the new section is still entirely the old
 * one, so there is no line to see anywhere. Render it after a section's decor
 * (so the fade covers it) and before the content wrapper (so text stays crisp
 * above it).
 */

const TONES = {
  onyx: '33, 26, 20',
  obsidian: '23, 18, 14',
  pearl: '248, 244, 236',
  ivory: '255, 252, 246',
} as const;

/** smoothstep, sampled — positions in %, alpha at each */
const RAMP = [
  [0, 1],
  [12.5, 0.957],
  [25, 0.844],
  [37.5, 0.684],
  [50, 0.5],
  [62.5, 0.316],
  [75, 0.156],
  [87.5, 0.043],
  [100, 0],
] as const;

export default function SectionFade({
  from,
  className = '',
}: {
  /** Colour of the section directly above this one */
  from: keyof typeof TONES;
  className?: string;
}) {
  const filterId = useId();
  const rgb = TONES[from];
  const stops = RAMP.map(([pos, a]) => `rgba(${rgb}, ${a}) ${pos}%`).join(', ');

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 h-24 md:h-32 ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `linear-gradient(to bottom, ${stops})` }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.028]">
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  );
}
