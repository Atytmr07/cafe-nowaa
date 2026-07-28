'use client';

import { motion, useReducedMotion } from 'framer-motion';
import NVLogo from './NVLogo';

/**
 * The roundel drawing itself: the ring sweeps closed, then the N and V
 * strokes ink in one after another — the sign switching on. Falls back
 * to the static mark under reduced motion.
 */
type AnimatedNVLogoProps = {
  className?: string;
  decorative?: boolean;
  delay?: number;
  weight?: number;
};

const EASE = [0.65, 0, 0.35, 1] as const;

const STROKES = [
  'M31 32 V68',
  'M31 32 L51 68',
  'M51 32 V68',
  'M45 32 L57 68 L69 32',
];

export default function AnimatedNVLogo({
  className = 'h-10 w-10',
  decorative = false,
  delay = 0,
  weight = 4.6,
}: AnimatedNVLogoProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <NVLogo className={className} decorative={decorative} weight={weight} />
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Cafe Nowaa NV logosu'}
      aria-hidden={decorative || undefined}
    >
      <motion.circle
        cx="50"
        cy="50"
        r="42"
        stroke="currentColor"
        strokeWidth="5.5"
        initial={{ pathLength: 0, rotate: -90 }}
        animate={{ pathLength: 1 }}
        style={{ transformOrigin: '50% 50%', rotate: -90 }}
        transition={{ duration: 1.7, ease: EASE, delay }}
      />
      <g
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {STROKES.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.55,
              ease: EASE,
              delay: delay + 0.75 + i * 0.14,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
