'use client';

import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
  meta?: string;
};

/**
 * Full-screen image viewer. Closes on Escape, backdrop click or the button;
 * locks page scroll and returns focus behaviour to the browser by rendering
 * a real dialog.
 *
 * `items` + `index` are optional: pass them when the trigger is one photo
 * among a set worth browsing (the gallery grid, a menu category) and arrow
 * controls appear, with ←/→ and edge-to-edge swipe wired up so a visitor
 * never has to close and reopen to see the next shot. A caller with a
 * single photo can omit them entirely and gets the plain viewer.
 */
export default function Lightbox({
  item,
  items,
  index,
  onNavigate,
  onClose,
}: {
  item: LightboxItem | null;
  items?: LightboxItem[];
  index?: number | null;
  onNavigate?: (index: number) => void;
  onClose: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const open = Boolean(item);
  const canNavigate = Boolean(items && items.length > 1 && onNavigate);
  const count = items?.length ?? 0;

  const go = useCallback(
    (delta: 1 | -1) => {
      if (!canNavigate || index == null || !onNavigate) return;
      onNavigate((index + delta + count) % count);
    },
    [canNavigate, index, onNavigate, count]
  );

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    },
    [onClose, go]
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

  // Basic swipe: a horizontal drag past the threshold steps to the
  // neighbouring photo instead of closing, so touch users get the same
  // "keep browsing without leaving" behaviour as the arrow buttons.
  const SWIPE_THRESHOLD = 60;

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
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-pearl/20 text-pearl transition-colors hover:border-gold/60 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
          </button>

          {canNavigate && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  go(-1);
                }}
                aria-label="Önceki görsel"
                className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-pearl/20 text-pearl transition-colors hover:border-gold/60 sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  go(1);
                }}
                aria-label="Sonraki görsel"
                className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-pearl/20 text-pearl transition-colors hover:border-gold/60 sm:right-6"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
              </button>
            </>
          )}

          <motion.figure
            key={item.src}
            // Clicks inside the frame must not fall through to the backdrop
            onClick={(event) => event.stopPropagation()}
            drag={canNavigate && !prefersReducedMotion ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, dragInfo) => {
              if (dragInfo.offset.x <= -SWIPE_THRESHOLD) go(1);
              else if (dragInfo.offset.x >= SWIPE_THRESHOLD) go(-1);
            }}
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
                className="luxe-photo pointer-events-none object-contain"
                unoptimized
                draggable={false}
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

            {canNavigate && index != null && (
              <p className="mt-4 text-center text-[11px] tracking-[0.2em] text-steel">
                {index + 1} / {count}
              </p>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
