'use client';

import { motion, useReducedMotion } from 'framer-motion';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { BUSINESS } from '@/config/business';
import { trackEvent } from '@/lib/firebase';

/**
 * Floating WhatsApp action, pinned bottom-right on the public pages.
 * WhatsApp green on purpose: recognisability converts better here than
 * palette purity, and it is the sole colour accent on the site.
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
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-depth transition-colors hover:bg-[#1fbd59]"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}
