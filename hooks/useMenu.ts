'use client';

import { useEffect, useState } from 'react';
import { SEED_MENU } from '@/data/seed';
import type { MenuData } from '@/lib/menu-types';

/**
 * Live menu with the printed card as the floor.
 *
 * The seed renders server-side so /menu stays static and indexable; if
 * Firestore holds data the hook swaps it in. It never blanks the menu.
 *
 * The repo (and with it the Firestore SDK, ~175 kB) is imported inside
 * the effect on purpose: a static import would pull the whole SDK into
 * the homepage's initial bundle for a section most visitors scroll past.
 * This way it loads as a separate chunk after paint.
 */
export function useMenu(): { menu: MenuData; isLive: boolean } {
  const [menu, setMenu] = useState<MenuData>(SEED_MENU);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;

    void import('@/lib/menu-repo')
      .then(({ subscribeToMenu }) => {
        // The component may have unmounted while the chunk loaded
        if (cancelled) return;
        stop = subscribeToMenu(
          (data) => {
            if (data) {
              setMenu(data);
              setIsLive(true);
            }
          },
          () => {
            // Offline, blocked, or rules deny reads — the seed stands in
            setIsLive(false);
          }
        );
      })
      .catch(() => setIsLive(false));

    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return { menu, isLive };
}
