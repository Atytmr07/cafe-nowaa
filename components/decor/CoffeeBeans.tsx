/**
 * A small scattered cluster of coffee-bean outlines — a quiet nod to the
 * kitchen rather than literal illustration. Pure line art, no fill, so it
 * reads as an engraving on the paper rather than a sticker sitting on top
 * of it. Server component: no state, no reason to ship it as client JS.
 *
 * This is the site's ONLY bean motif. An earlier pass had three systems
 * running at once (this, an all-over tiled BeanField, and a third copy
 * clipped inside the section waves), which stacked into visual noise; the
 * other two are gone and are not coming back — extra presence is bought by
 * making these bigger and bolder, never by adding another layer behind
 * them.
 *
 * Four beans in a 3:2 box, sized so callers can use matching Tailwind
 * pairs (h-16 w-24, h-20 w-[7.5rem]) and get no letterboxing.
 *
 * Two tones: ink on cream sections, pearl on espresso ones.
 */
const BEAN =
  'M20 2C10 2 3 16 3 32C3 48 10 58 20 58C30 58 37 48 37 32C37 16 30 2 20 2Z M20 6C14 16 14 44 20 54';

export default function CoffeeBeans({
  className = '',
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'pearl';
}) {
  const color = tone === 'pearl' ? 'var(--pearl)' : 'var(--ink)';

  return (
    <svg aria-hidden="true" viewBox="0 0 150 100" className={className} fill="none">
      {/* Stroke scales with the box rather than staying hairline-thin:
          these render two to three times larger than the first pass, and a
          1.3 stroke that read as an engraving at 48px reads as a faint
          scratch at 120px. */}
      <g stroke={color} strokeWidth="1.6" strokeLinecap="round">
        <path d={BEAN} transform="translate(6,10) rotate(-14 20 32) scale(0.95)" />
        <path d={BEAN} transform="translate(54,0) rotate(24 20 32) scale(0.68)" />
        <path d={BEAN} transform="translate(92,34) rotate(-30 20 32) scale(0.52)" />
        <path d={BEAN} transform="translate(116,4) rotate(8 20 32) scale(0.4)" />
      </g>
    </svg>
  );
}
