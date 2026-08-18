/**
 * A shaped boundary between two sections — the departing section's colour
 * spilling into the arriving one as a solid, crisp form.
 *
 * Same placement principle as the gradient fade: it sits at the TOP of the
 * arriving section and is painted in the DEPARTING section's colour, so the
 * first pixel row of the new section is still entirely the old one and there
 * is never a straight line to find. What differs is the edge itself — a
 * drawn shape rather than a ramp, with no blur and no opacity falloff on the
 * front layer, so it reads as intentional rather than smudged.
 *
 * Two layers, not one: a back copy in antiphase at low opacity, then the
 * solid front. The back layer's crests peek out from behind the front's
 * troughs and give the edge depth — a single curve reads as a sticker, two
 * read as surf.
 *
 * `preserveAspectRatio="none"` stretches the fixed 1440×120 viewBox to
 * whatever box the CSS gives it, so the wave keeps its proportions relative
 * to the section rather than to the viewport.
 */

/**
 * `fill` is the departing section's own colour; `shadow` is the back layer.
 *
 * The back layer is NOT the same colour at reduced opacity, which is the
 * obvious thing to reach for and the wrong one: cream at 38% over espresso
 * resolves to a flat grey, and a grey band is exactly the muddiness the
 * whole palette is built to avoid. These are explicit warm mid-tones sampled
 * between the two sections instead — the shadow a cream wave would actually
 * cast in a room lit by warm bulbs.
 */
const TONES = {
  onyx: { fill: '#211A14', shadow: '#8A7B69' },
  obsidian: { fill: '#17120E', shadow: '#8A7B69' },
  pearl: { fill: '#F8F4EC', shadow: '#5E4E3C' },
  ivory: { fill: '#FFFCF6', shadow: '#5E4E3C' },
} as const;

/**
 * Every segment leaves and enters its endpoints horizontally (control points
 * pulled straight out to the sides), which makes the joins C1-continuous —
 * that's what stops a hand-written bezier wave from showing kinks at the
 * seams between segments.
 */
const WAVE_FRONT =
  'M0,0 H1440 V56 ' +
  'C1320,56 1200,92 1080,92 ' +
  'C960,92 840,44 720,44 ' +
  'C600,44 480,96 360,96 ' +
  'C240,96 120,52 0,52 Z';

const WAVE_BACK =
  'M0,0 H1440 V84 ' +
  'C1320,84 1200,40 1080,40 ' +
  'C960,40 840,96 720,96 ' +
  'C600,96 480,52 360,52 ' +
  'C240,52 120,88 0,88 Z';

/** One wide shallow dome — the awning note, kept away from the wavy seams */
const ARCH_FRONT = 'M0,0 H1440 V26 C1100,116 340,116 0,26 Z';
const ARCH_BACK = 'M0,0 H1440 V44 C1160,104 280,104 0,44 Z';

const SHAPES = {
  wave: { front: WAVE_FRONT, back: WAVE_BACK },
  arch: { front: ARCH_FRONT, back: ARCH_BACK },
} as const;

export default function SectionEdge({
  from,
  variant = 'wave',
  className = '',
}: {
  /** Colour of the section directly above this one */
  from: keyof typeof TONES;
  variant?: keyof typeof SHAPES;
  className?: string;
}) {
  const { fill, shadow } = TONES[from];
  const { front, back } = SHAPES[variant];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 top-0 h-16 w-full md:h-24 ${className}`}
    >
      <path d={back} fill={shadow} />
      <path d={front} fill={fill} />
    </svg>
  );
}
