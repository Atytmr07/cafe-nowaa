/**
 * A soft curved seam between two sections, replacing the dead-flat cut a
 * plain background-colour change leaves. Lives at the BOTTOM of the
 * section it dips OUT of, filled with the NEXT section's colour — putting
 * it at the top of the section it enters doesn't work, since that section
 * already paints its own solid background across its full height and the
 * wave's fill would just match what's already behind it and vanish.
 *
 * The first version used a ~50-unit amplitude on an 80-unit canvas — fine
 * on paper, but squashed into an actual 40–56px strip that reads as a soft
 * blobby smear rather than a line, especially once a screenshot or chat
 * client recompresses it. This one moves within an 18-unit band, which is
 * the difference between "a ripple" and "a stain."
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
        d="M0,46 C240,54 480,38 720,46 C960,54 1200,38 1440,46 L1440,80 L0,80 Z"
        fill={fill}
      />
    </svg>
  );
}
