'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import NVLogo, { NV_PATHS } from './NVLogo';

/**
 * The roundel drawing itself: the ring sweeps closed, the N inks in, then
 * the V draws over it — and the knockout that lets the V cut the N is
 * animated on the same pathLength, so the channel opens exactly as the
 * V's arm arrives. Masking it in up front would put a gap in the N
 * before there is anything crossing it.
 */
type AnimatedNVLogoProps = {
  className?: string;
  decorative?: boolean;
  delay?: number;
  weight?: number;
};

const EASE = [0.65, 0, 0.35, 1] as const;
const CUT = 2;

export default function AnimatedNVLogo({
  className = 'h-10 w-10',
  decorative = false,
  delay = 0,
  weight = 5.2,
}: AnimatedNVLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const uid = useId();
  const clipId = `nva-clip-${uid}`;
  const maskId = `nva-mask-${uid}`;

  if (prefersReducedMotion) {
    return (
      <NVLogo className={className} decorative={decorative} weight={weight} />
    );
  }

  const vTransition = {
    duration: 0.7,
    ease: EASE,
    delay: delay + 1.1,
  };

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
          <rect x="0" y="27" width="100" height="46" />
        </clipPath>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <motion.path
            d={NV_PATHS.v}
            stroke="black"
            strokeWidth={weight + CUT * 2}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit={8}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={vTransition}
          />
        </mask>
      </defs>

      <motion.circle
        cx="50"
        cy="50"
        r="42"
        stroke="currentColor"
        strokeWidth="4.6"
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
        strokeMiterlimit={8}
      >
        <motion.path
          d={NV_PATHS.n}
          mask={`url(#${maskId})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: delay + 0.5 }}
        />
        <motion.path
          d={NV_PATHS.v}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={vTransition}
        />
      </g>
    </svg>
  );
}
