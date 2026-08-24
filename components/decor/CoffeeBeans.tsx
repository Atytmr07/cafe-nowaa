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
    <svg aria-hidden="true" viewBox="0 0 170 100" className={className} fill="none">
      <g stroke={color} strokeWidth="1.1" strokeLinecap="round">
        <path d={BEAN} transform="translate(2,10) rotate(-14 20 32)" />
        <path d={BEAN} transform="translate(50,-6) rotate(22 20 32) scale(0.8)" />
        <path d={BEAN} transform="translate(86,20) rotate(-34 20 32) scale(0.6)" />
        <path d={BEAN} transform="translate(112,-2) rotate(10 20 32) scale(0.46)" />
        <path d={BEAN} transform="translate(30,52) rotate(48 20 32) scale(0.4)" />
        <path d={BEAN} transform="translate(138,28) rotate(-6 20 32) scale(0.34)" />
        <path d={BEAN} transform="translate(66,58) rotate(30 20 32) scale(0.3)" />
      </g>
    </svg>
  );
}
