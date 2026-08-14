/**
 * A small scattered cluster of coffee-bean outlines — a quiet nod to the
 * kitchen rather than literal illustration. Pure line art, no fill, so it
 * reads as an engraving on the paper rather than a sticker sitting on top
 * of it. Server component: no state, no reason to ship it as client JS.
 */
const BEAN =
  'M20 2C10 2 3 16 3 32C3 48 10 58 20 58C30 58 37 48 37 32C37 16 30 2 20 2Z M20 6C14 16 14 44 20 54';

export default function CoffeeBeans({
  className = '',
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'gold' | 'pearl';
}) {
  const color =
    tone === 'gold' ? 'var(--gold)' : tone === 'pearl' ? 'var(--pearl)' : 'var(--ink)';

  return (
    <svg aria-hidden="true" viewBox="0 0 140 90" className={className} fill="none">
      <g stroke={color} strokeWidth="1.1" strokeLinecap="round">
        <path d={BEAN} transform="translate(2,8) rotate(-14 20 32)" />
        <path d={BEAN} transform="translate(52,-4) rotate(22 20 32) scale(0.78)" />
        <path d={BEAN} transform="translate(86,22) rotate(-34 20 32) scale(0.56)" />
      </g>
    </svg>
  );
}
