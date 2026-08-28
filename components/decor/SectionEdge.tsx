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
 * whole palette is built to avoid.
 *
 * It went through gold-deep briefly — reasoning that it should be the same
 * brown as the WhatsApp button rather than a bespoke invented one — but
 * against the actual wave shapes that read as yellow, not brown, and
 * clashed with the cream front layer it sits behind. Cream (platinum, a
 * shade deeper than pearl) reads as this wave's own material catching a
 * shadow, the way the rest of the site's warm-cream palette already does,
 * rather than introducing a second colour into a two-layer shape.
 */
const CREAM_SHADOW = '#E0D6C6';

const TONES = {
  onyx: { fill: '#211A14', shadow: CREAM_SHADOW },
  obsidian: { fill: '#17120E', shadow: CREAM_SHADOW },
  pearl: { fill: '#F8F4EC', shadow: CREAM_SHADOW },
  ivory: { fill: '#FFFCF6', shadow: CREAM_SHADOW },
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

/**
 * Half the crests, for narrow screens.
 *
 * The viewBox is stretched to the section's width, so on a phone the
 * four-crest path compresses from one crest every ~360px to one every ~97px
 * and the seam turns choppy — a ripple rather than a wave. This is the same
 * curve language with a single crossing, which is all a 390px-wide edge has
 * room to state.
 */
const WAVE_FRONT_NARROW =
  'M0,0 H1440 V50 ' +
  'C1200,50 960,92 720,92 ' +
  'C480,92 240,46 0,46 Z';

const WAVE_BACK_NARROW =
  'M0,0 H1440 V82 ' +
  'C1200,82 960,46 720,46 ' +
  'C480,46 240,84 0,84 Z';

/** One wide shallow dome — the awning note, kept away from the wavy seams */
const ARCH_FRONT = 'M0,0 H1440 V26 C1100,116 340,116 0,26 Z';
const ARCH_BACK = 'M0,0 H1440 V44 C1160,104 280,104 0,44 Z';

const SHAPES = {
  wave: {
    front: WAVE_FRONT,
    back: WAVE_BACK,
    narrowFront: WAVE_FRONT_NARROW,
    narrowBack: WAVE_BACK_NARROW,
  },
  // A single dome already reads at any width — no narrow variant needed
  arch: {
    front: ARCH_FRONT,
    back: ARCH_BACK,
    narrowFront: ARCH_FRONT,
    narrowBack: ARCH_BACK,
  },
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
  const { front, back, narrowFront, narrowBack } = SHAPES[variant];

  // Two elements swapped by media query rather than one path chosen in JS:
  // the crest count has to change at the same breakpoint the layout does,
  // and a resize must not need a re-render to correct it.
  const box = `pointer-events-none absolute inset-x-0 top-0 h-16 w-full md:h-24 ${className}`;

  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`${box} md:hidden`}
      >
        <path d={narrowBack} fill={shadow} />
        <path d={narrowFront} fill={fill} />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`${box} hidden md:block`}
      >
        <path d={back} fill={shadow} />
        <path d={front} fill={fill} />
      </svg>
    </>
  );
}
