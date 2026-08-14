'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Section-break ornament: a fluted-column motif abstracted from the real
 * marble pilaster, flanked by hairlines that extend as it enters view.
 */
type ColumnDividerProps = {
  /** 'light' renders on pearl sections, 'dark' on obsidian sections */
  tone?: 'light' | 'dark';
  className?: string;
};

const FLUTES = [0, 1, 2, 3, 4, 5, 6];

export default function ColumnDivider({
  tone = 'light',
  className = '',
}: ColumnDividerProps) {
  const prefersReducedMotion = useReducedMotion();
  const stroke = '#D9A441';
  const peak = tone === 'light' ? 0.55 : 0.6;

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-5 ${className}`}
    >
      <motion.span
        className={`h-px flex-1 origin-right ${
          tone === 'light' ? 'bg-ink/10' : 'bg-pearl/12'
        }`}
        initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <svg width="86" height="26" viewBox="0 0 86 26" fill="none">
        {FLUTES.map((i) => {
          const x = 7 + i * 12;
          const inset = i === 3 ? 1 : i === 0 || i === 6 ? 9 : 5;
          return (
            <motion.line
              key={x}
              x1={x}
              y1={inset}
              x2={x}
              y2={26 - inset}
              stroke={stroke}
              strokeWidth="1"
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { pathLength: 0, opacity: 0 }
              }
              whileInView={{ pathLength: 1, opacity: peak }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.06 }}
            />
          );
        })}
      </svg>

      <motion.span
        className={`h-px flex-1 origin-left ${
          tone === 'light' ? 'bg-ink/10' : 'bg-pearl/12'
        }`}
        initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
}
