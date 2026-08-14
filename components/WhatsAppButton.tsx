'use client';

import { motion, useReducedMotion } from 'framer-motion';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { BUSINESS } from '@/config/business';
import { trackEvent } from '@/lib/firebase';

/**
 * Floating WhatsApp action, pinned bottom-right on the public pages.
 *
 * Brass rather than the brand's pearl: it floats over both the dark hero and
 * the cream menu card, and pearl-on-cream left it all but invisible on the
 * page where a visitor is most likely to want to ask a question. The slow
 * pulse ring keeps a faint sign of life without demanding attention.
 */
export default function WhatsAppButton() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={BUSINESS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('cta_click', { cta: 'whatsapp' })}
      aria-label="WhatsApp üzerinden yazın"
      initial={
        prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.8 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 1.2 }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.07 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-glow-gold transition-all duration-300 hover:bg-gold-bright hover:shadow-glow-gold-strong"
    >
      {!prefersReducedMotion && (
        <span
          aria-hidden="true"
          className="animate-pulse-ring absolute inset-0 rounded-full border border-gold-bright"
        />
      )}
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
