'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Editorial masked-line reveal: each line slides up out of an
 * overflow-hidden mask (y: 110% → 0), staggered per line.
 * Reduced motion falls back to a plain fade.
 */
type MaskedTextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'p';
  lines: ReactNode[];
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** 'mount' animates immediately (hero); 'view' waits for scroll into view */
  trigger?: 'mount' | 'view';
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MaskedText({
  as: Tag = 'h2',
  lines,
  className,
  style,
  delay = 0,
  trigger = 'view',
}: MaskedTextProps) {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? { opacity: 0 } : { y: '110%' };
  const target = prefersReducedMotion ? { opacity: 1 } : { y: '0%' };

  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => (
        // pb/-mb keep descenders (g, y, ç) from clipping in tight line-heights
        <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <motion.span
            className="block will-change-transform"
            initial={initial}
            {...(trigger === 'mount'
              ? { animate: target }
              : {
                  whileInView: target,
                  viewport: { once: true, margin: '-80px' },
                })}
            transition={{
              duration: prefersReducedMotion ? 0.4 : 0.9,
              ease: EASE,
              delay: delay + i * 0.12,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
