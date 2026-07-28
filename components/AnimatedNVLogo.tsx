'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import NVLogo, { NV_PATHS } from './NVLogo';

/**
 * The roundel drawing itself: the ring sweeps closed, then the N and the
 * V ink in — the sign switching on. Geometry (and the cap-height clip)
 * is shared with NVLogo so the two marks can never drift apart.
 */
type AnimatedNVLogoProps = {
  className?: string;
  decorative?: boolean;
  delay?: number;
  weight?: number;
};

const EASE = [0.65, 0, 0.35, 1] as const;

export default function AnimatedNVLogo({
  className = 'h-10 w-10',
  decorative = false,
  delay = 0,
  weight = 4.2,
}: AnimatedNVLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const clipId = useId();

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
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="28" width="100" height="44" />
        </clipPath>
      </defs>

      <motion.circle
        cx="50"
        cy="50"
        r="42"
        stroke="currentColor"
        strokeWidth="4.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        style={{ transformOrigin: '50% 50%', rotate: -90 }}
        transition={{ duration: 1.7, ease: EASE, delay }}
      />

      <g
        clipPath={`url(#${clipId})`}
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        {[NV_PATHS.n, NV_PATHS.v].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.7,
              ease: EASE,
              delay: delay + 0.8 + i * 0.3,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
