'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * The oversized "Nowaa" backdrop, drifting up gently as the footer
 * scrolls into view (scroll-linked parallax).
 */
export default function FooterWordmark() {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '0%']);

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      style={{ x: '-50%', y: prefersReducedMotion ? '0%' : y }}
      className="pointer-events-none absolute -bottom-[3vw] left-1/2 select-none whitespace-nowrap font-display text-[26vw] italic leading-none tracking-tight text-gold/[0.05]"
    >
      Nowaa
    </motion.span>
  );
}
