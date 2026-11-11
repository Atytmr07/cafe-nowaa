'use client';

import { useEffect, useRef } from 'react';

/**
 * A silent, looping clip for a gallery tile.
 *
 * Nothing downloads until the tile is actually on screen (`preload="none"`
 * plus play-on-intersect), and it pauses again once scrolled past — the
 * file is served from Storage, which bills per byte, and a grid of videos
 * all buffering at once would also stall the photos around them.
 *
 * With reduced motion it never autoplays; the poster stands in, and the
 * lightbox still plays it on request.
 */
export default function GalleryVideo({
  src,
  poster,
  autoPlay,
}: {
  src: string;
  poster?: string;
  autoPlay: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoPlay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Rejected when the browser blocks autoplay (e.g. data saver) —
          // the poster is a fine resting state, nothing to recover.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className="luxe-photo absolute inset-0 h-full w-full object-cover"
    />
  );
}
