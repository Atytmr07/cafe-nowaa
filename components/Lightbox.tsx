'use client';

import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
  meta?: string;
};

/**
 * Full-screen image viewer. Closes on Escape, backdrop click or the
 * button; locks page scroll and returns focus behaviour to the browser
 * by rendering a real dialog.
 */
export default function Lightbox({
  item,
  onClose,
}: {
  item: LightboxItem | null;
  onClose: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const open = Boolean(item);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previous;
    };
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-obsidian/95 p-5 backdrop-blur-md sm:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Görseli kapat"
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-pearl/20 text-pearl transition-colors hover:border-pearl/60 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
          </button>

          <motion.figure
            // Clicks inside the frame must not fall through to the backdrop
            onClick={(event) => event.stopPropagation()}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex max-h-full w-full max-w-3xl flex-col"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="luxe-photo object-contain"
                unoptimized
              />
            </div>

            {(item.caption || item.meta) && (
              <figcaption className="mt-5 text-center">
                {item.caption && (
                  <p className="font-display text-xl text-pearl sm:text-2xl">
                    {item.caption}
                  </p>
                )}
                {item.meta && (
                  <p className="mt-2 text-xs font-light tracking-wide text-silver">
                    {item.meta}
                  </p>
                )}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
