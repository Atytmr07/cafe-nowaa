'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/firebase';

/**
 * Logs a Firebase `page_view` on every App Router navigation.
 * Deliberately reads only the pathname — touching useSearchParams would
 * opt the whole tree out of static rendering.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent('page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
