/**
 * Inline SVG recreation of the real Cafe Nowaa roundel: an outer ring
 * enclosing the interlocking "NV" monogram, where the V's left arm
 * crosses the N's right stem. Drawn in currentColor so it inherits
 * pearl / platinum / ink depending on the surface.
 */
type NVLogoProps = {
  className?: string;
  /** Decorative instances (backdrops) are hidden from assistive tech */
  decorative?: boolean;
  /** Stroke weight of the monogram itself */
  weight?: number;
};

export default function NVLogo({
  className = 'h-10 w-10',
  decorative = false,
  weight = 4.6,
}: NVLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Cafe Nowaa NV logosu'}
      aria-hidden={decorative || undefined}
    >
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="5.5" />
      <g
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {/* N — left stem, diagonal, right stem */}
        <path d="M31 32 V68" />
        <path d="M31 32 L51 68" />
        <path d="M51 32 V68" />
        {/* V — left arm crosses the N's right stem, as on the real sign */}
        <path d="M45 32 L57 68 L69 32" />
      </g>
    </svg>
  );
}
