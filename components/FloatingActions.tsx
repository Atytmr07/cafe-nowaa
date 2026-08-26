'use client';

import { Instagram } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { BUSINESS } from '@/config/business';
import { trackEvent } from '@/lib/firebase';

/**
 * Floating action stack, pinned bottom-right on the public pages: Instagram
 * above WhatsApp, in that visual order because WhatsApp — the highest-intent
 * action, a visitor ready to ask something directly — stays anchored at the
 * very corner where a thumb already expects it.
 *
 * WhatsApp keeps the solid brass treatment (see its own comment below);
 * Instagram is deliberately quieter — an outlined ink disc, not a second
 * gold blob — so the pair reads as primary-plus-secondary instead of two
 * competing calls to action.
 */
export default function FloatingActions() {
  const prefersReducedMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  });

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <motion.a
        href={BUSINESS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('cta_click', { cta: 'instagram_float' })}
        aria-label="Instagram'da takip edin"
        {...rise(1.35)}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.07 }}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-pearl/25 bg-obsidian/85 text-pearl shadow-depth backdrop-blur-sm transition-colors duration-300 hover:border-gold/60 hover:text-gold-bright"
      >
        <Instagram className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </motion.a>

      {/*
        Brass rather than the brand's pearl: it floats over both the dark
        hero and the cream menu card, and pearl-on-cream left it all but
        invisible on the page where a visitor is most likely to want to ask
        a question. The slow pulse ring keeps a faint sign of life without
        demanding attention.
      */}
      <motion.a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('cta_click', { cta: 'whatsapp' })}
        aria-label="WhatsApp üzerinden yazın"
        {...rise(1.2)}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.07 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-glow-gold transition-all duration-300 hover:bg-gold-bright hover:shadow-glow-gold-strong"
      >
        {!prefersReducedMotion && (
          <span
            aria-hidden="true"
            className="animate-pulse-ring absolute inset-0 rounded-full border border-gold-bright"
          />
        )}
        <WhatsAppIcon className="relative h-7 w-7" />
      </motion.a>
    </div>
  );
}
