/**
 * Route-transition loading state: the NV monogram inside a
 * spinning gold dash ring — the roundel as a loader.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-[100svh] items-center justify-center bg-noir"
      role="status"
      aria-label="Yükleniyor"
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full animate-spin text-gold [animation-duration:1.4s]"
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="170 94"
          />
        </svg>
        <span className="font-display text-xl font-semibold text-gold">NV</span>
      </div>
      <span className="sr-only">Yükleniyor…</span>
    </div>
  );
}
