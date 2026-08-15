/**
 * A soft curved seam between two sections, replacing the dead-flat cut a
 * plain background-colour change leaves. Sits at the TOP of a section,
 * filled with that section's own background colour; everything above the
 * curve is transparent, so the section above it — flat right up to the
 * boundary — shows through the "valleys" and reads as one continuous wave
 * rather than two rectangles stacked on top of each other.
 *
 * Deliberately a single gentle curve rather than a busy multi-wave beach
 * scene: the brand's other dividers (ColumnDivider) are thin and precise,
 * and a loud wave would be the odd one out.
 */
export default function SectionWave({
  className = '',
  fill,
}: {
  className?: string;
  fill: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M0,34 C220,58 420,6 720,26 C1020,46 1220,10 1440,30 L1440,80 L0,80 Z"
        fill={fill}
      />
    </svg>
  );
}
