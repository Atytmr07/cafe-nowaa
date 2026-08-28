/**
 * A small scattered cluster of coffee-bean outlines — a quiet nod to the
 * kitchen rather than literal illustration. Pure line art, no fill, so it
 * reads as an engraving on the paper rather than a sticker sitting on top
 * of it. Server component: no state, no reason to ship it as client JS.
 *
 * This is now the site's ONLY bean motif, and it is used sparingly — three
 * placements across the whole page. An earlier pass had three systems
 * running at once (this, an all-over tiled BeanField, and a third copy
 * clipped inside the section waves), which stacked into visual noise; the
 * other two are gone.
 *
 * Three beans, not seven. A cluster is a glance-sized detail, and the
 * extra four only registered as clutter at the size these actually render.
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
    <svg aria-hidden="true" viewBox="0 0 120 80" className={className} fill="none">
      <g stroke={color} strokeWidth="1.3" strokeLinecap="round">
        <path d={BEAN} transform="translate(4,6) rotate(-14 20 32) scale(0.85)" />
        <path d={BEAN} transform="translate(46,-2) rotate(24 20 32) scale(0.6)" />
        <path d={BEAN} transform="translate(74,26) rotate(-30 20 32) scale(0.45)" />
      </g>
    </svg>
  );
}
