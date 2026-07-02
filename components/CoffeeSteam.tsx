'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Signature micro-animation: three wavy steam wisps rising and fading
 * on a staggered loop — the brand's coffee warmth, drawn in gold.
 * Hidden entirely under reduced motion.
 */
const WISPS = [
  { d: 'M10 52 C4 42, 16 34, 10 24 C5 16, 14 10, 10 4', delay: 0 },
  { d: 'M24 54 C18 44, 30 36, 24 26 C19 18, 28 12, 24 4', delay: 1.1 },
  { d: 'M38 52 C32 42, 44 34, 38 24 C33 16, 42 10, 38 4', delay: 2.2 },
];

export default function CoffeeSteam({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {WISPS.map((wisp) => (
        <motion.path
          key={wisp.d}
          d={wisp.d}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 0.45, 0], y: [10, -14] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: wisp.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
}
