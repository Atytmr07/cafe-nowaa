/**
 * Fluted marble-column motif — thin vertical lines abstracted from the
 * real storefront column. Used as a quiet section-break ornament where
 * dark and light sections meet.
 */
type ColumnDividerProps = {
  /** 'light' renders on marble sections, 'dark' on noir sections */
  tone?: 'light' | 'dark';
  className?: string;
};

const FLUTES = [8, 20, 32, 44, 56, 68, 80, 92, 104];

export default function ColumnDivider({
  tone = 'light',
  className = '',
}: ColumnDividerProps) {
  const stroke = tone === 'light' ? '#C6A15B' : '#C6A15B';
  const opacity = tone === 'light' ? 0.45 : 0.35;

  return (
    <div aria-hidden="true" className={`flex justify-center ${className}`}>
      <svg width="112" height="40" viewBox="0 0 112 40" fill="none">
        {FLUTES.map((x, i) => {
          const isEdge = i === 0 || i === FLUTES.length - 1;
          const isCenter = i === Math.floor(FLUTES.length / 2);
          const inset = isEdge ? 12 : isCenter ? 2 : 7;
          return (
            <line
              key={x}
              x1={x}
              y1={inset}
              x2={x}
              y2={40 - inset}
              stroke={stroke}
              strokeWidth="1"
              opacity={opacity}
            />
          );
        })}
      </svg>
    </div>
  );
}
