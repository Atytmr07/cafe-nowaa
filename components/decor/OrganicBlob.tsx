/**
 * A single soft, asymmetric blob — the organic counterpart to the site's
 * hard-edged hairlines and columns. Left unblurred and un-positioned here;
 * callers size, place and blur it with Tailwind (`blur-3xl`, `opacity-[...]`,
 * `animate-drift`) the same way Hero's ambient glows already work, so every
 * instance stays consistent with the rest of the motion language instead of
 * introducing a second styling convention.
 */
export default function OrganicBlob({
  className = '',
  tone = 'gold',
}: {
  className?: string;
  tone?: 'gold' | 'pearl' | 'gold-bright';
}) {
  const color =
    tone === 'pearl'
      ? 'var(--pearl)'
      : tone === 'gold-bright'
        ? 'var(--gold-bright)'
        : 'var(--gold)';

  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" className={className}>
      <path
        d="M100 20 C135 20 175 45 178 85 C181 122 155 160 115 175 C78 189 35 178 18 145 C2 113 12 70 42 45 C63 27 82 20 100 20 Z"
        fill={color}
      />
    </svg>
  );
}
