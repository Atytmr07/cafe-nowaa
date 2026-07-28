'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** Hairline pearl reading-progress bar pinned above the navbar. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-pearl"
      style={{ scaleX }}
    />
  );
}
