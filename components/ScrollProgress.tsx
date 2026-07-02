'use client';

import { motion, useReducedMotion, useScroll } from 'framer-motion';

/** Hairline gold reading-progress bar pinned above the navbar. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
