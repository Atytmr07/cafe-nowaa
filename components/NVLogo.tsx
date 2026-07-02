/**
 * Inline SVG recreation of the real backlit "NV" roundel sign —
 * circular ring + NV monogram in gold stroke. Swap for the client's
 * vector logo file when it becomes available.
 */
type NVLogoProps = {
  className?: string;
  /** Decorative instances (e.g. hero backdrop) should pass true */
  decorative?: boolean;
};

export default function NVLogo({
  className = 'h-10 w-10',
  decorative = false,
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
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" />
      <circle
        cx="50"
        cy="50"
        r="38.5"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.55"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontSize="32"
        fontWeight="600"
        letterSpacing="2"
        fill="currentColor"
      >
        NV
      </text>
    </svg>
  );
}
