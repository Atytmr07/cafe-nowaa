'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import NVLogo, { NV_PATHS, NV_STROKE } from './NVLogo';

/**
 * The roundel drawing itself: the ring sweeps closed, the N's two strokes
 * ink in, then the V's arms follow — the sign switching on.
 *
 * When `metal` is set the strokes are filled with a brushed-brass gradient
 * rather than flat currentColor, a highlight sweeps across them as the last
 * stroke lands, and four small star flares pop on the ring — the look of a
 * polished sign catching the light, which is what the reference photo of the
 * real storefront mark actually shows. An earlier pass fired a fan of twelve
 * radiating lines instead; it read as a cartoon sunburst, not as shine.
 *
 * Geometry is shared with NVLogo so the marks can never drift apart.
 */
type AnimatedNVLogoProps = {
  className?: string;
  decorative?: boolean;
  delay?: number;
  weight?: number;
  /** Brass gradient + shine sweep + star flares (hero only) */
  metal?: boolean;
};

const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * Seconds from `delay` to the moment the V's last stroke lands — callers
 * that stage a payoff on completion read this instead of re-deriving the
 * 1.05 + 0.7 schedule by hand.
 */
export const NV_DRAW_DURATION = 1.75;

/**
 * Where the flares sit on the ring (r=42 about 50,50), as [x, y, delay].
 * Spread around the circle rather than evenly spaced, so they read as
 * catch-lights rather than a mechanical pattern.
 */
const FLARES: [number, number, number][] = [
  [71.0, 13.6, 0.0],
  [89.5, 64.4, 0.22],
  [10.5, 64.4, 0.4],
  [35.6, 10.5, 0.56],
];

/** A four-point twinkle — long thin arms with concave sides. */
const STAR =
  'M0 -9 C0.7 -2.6 2.6 -0.7 9 0 C2.6 0.7 0.7 2.6 0 9 C-0.7 2.6 -2.6 0.7 -9 0 C-2.6 -0.7 -0.7 -2.6 0 -9 Z';

export default function AnimatedNVLogo({
  className = 'h-10 w-10',
  decorative = false,
  delay = 0,
  weight = NV_STROKE.letters,
  metal = false,
}: AnimatedNVLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const clipId = `nva-clip-${uid}`;
  const brassId = `nva-brass-${uid}`;
  const bandId = `nva-band-${uid}`;
  const sweepId = `nva-sweep-${uid}`;

  if (prefersReducedMotion) {
    return (
      <NVLogo className={className} decorative={decorative} weight={weight} />
    );
  }

  const strokePaint = metal ? `url(#${brassId})` : 'currentColor';
  /** The shine and the flares both cue off the last stroke landing */
  const payoff = delay + NV_DRAW_DURATION;

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

        {metal && (
          <>
            {/* Brushed brass: deep at the edges, near-white at the bevel */}
            <linearGradient id={brassId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9C6F22" />
              <stop offset="28%" stopColor="#F5CE6D" />
              <stop offset="46%" stopColor="#FFF6DC" />
              <stop offset="62%" stopColor="#D9A441" />
              <stop offset="100%" stopColor="#9C6F22" />
            </linearGradient>

            {/* Soft-edged band that rides across the mark once */}
            <linearGradient id={bandId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>

            <mask id={sweepId} maskUnits="userSpaceOnUse">
              <motion.g
                initial={{ x: -70 }}
                animate={{ x: 130 }}
                transition={{ duration: 1.15, ease: 'easeInOut', delay: payoff }}
              >
                <rect x="0" y="-10" width="46" height="120" fill={`url(#${bandId})`} />
              </motion.g>
            </mask>
          </>
        )}
      </defs>

      <motion.circle
        cx="50"
        cy="50"
        r="42"
        stroke={strokePaint}
        strokeWidth={NV_STROKE.ring}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        style={{ transformOrigin: '50% 50%', rotate: -90 }}
        transition={{ duration: 1.7, ease: EASE, delay }}
      />

      <g
        clipPath={`url(#${clipId})`}
        stroke={strokePaint}
        strokeWidth={weight}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={8}
      >
        <motion.path
          d={NV_PATHS.n}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: delay + 0.5 }}
        />
        <motion.path
          d={NV_PATHS.v}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: delay + 1.05 }}
        />
      </g>

      {metal && (
        <>
          {/* The highlight: the same mark redrawn in near-white, revealed
              only through the travelling band */}
          <motion.g
            mask={`url(#${sweepId})`}
            stroke="#FFFBF0"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.3, times: [0, 0.12, 0.8, 1], delay: payoff }}
          >
            <circle cx="50" cy="50" r="42" strokeWidth={NV_STROKE.ring} />
            <g
              clipPath={`url(#${clipId})`}
              strokeWidth={weight}
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit={8}
            >
              <path d={NV_PATHS.n} />
              <path d={NV_PATHS.v} />
            </g>
          </motion.g>

          {/* Catch-lights on the ring, popping in sequence then settling
              into a slow twinkle */}
          {FLARES.map(([x, y, stagger]) => (
            <motion.path
              key={`${x}-${y}`}
              d={STAR}
              fill="#FFF6DC"
              style={{ translateX: x, translateY: y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.35, 0.75, 0.35], scale: [0, 1.15, 0.6, 0.85, 0.6] }}
              transition={{
                duration: 3.2,
                times: [0, 0.18, 0.42, 0.7, 1],
                ease: 'easeOut',
                delay: payoff + stagger,
                repeat: Infinity,
                repeatDelay: 2.4,
              }}
            />
          ))}
        </>
      )}
    </svg>
  );
}
