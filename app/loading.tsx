import { NVMonogram } from '@/components/NVLogo';

/**
 * Route-transition state: the NV monogram inside a slowly rotating
 * dashed ring — the roundel as a loader.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-[100svh] items-center justify-center bg-obsidian"
      role="status"
      aria-label="Yükleniyor"
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full animate-spin text-pearl [animation-duration:1.6s]"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="70 220"
          />
        </svg>
        <NVMonogram className="h-11 w-11 text-pearl" weight={6} />
      </div>
      <span className="sr-only">Yükleniyor…</span>
    </div>
  );
}
