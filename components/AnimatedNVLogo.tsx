'use client';

import { motion, useReducedMotion } from 'framer-motion';
import NVLogo from './NVLogo';

/**
 * Stroke-draw version of the NV roundel: the rings draw themselves in
 * (pathLength 0→1), then the monogram fades up — echoing the backlit
 * sign flickering on. Falls back to the static logo under reduced motion.
 */
type AnimatedNVLogoProps = {
  className?: string;
  decorative?: boolean;
  delay?: number;
};

const DRAW_EASE = [0.65, 0, 0.35, 1] as const;

export default function AnimatedNVLogo({
  className = 'h-10 w-10',
  decorative = false,
  delay = 0,
}: AnimatedNVLogoProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <NVLogo className={className} decorative={decorative} />;
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
        r="46"
        stroke="currentColor"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: DRAW_EASE, delay }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="38.5"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.55"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: DRAW_EASE, delay: delay + 0.2 }}
      />
      <motion.text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontSize="32"
        fontWeight="600"
        letterSpacing="2"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: delay + 1 }}
      >
        NV
      </motion.text>
    </svg>
  );
}
