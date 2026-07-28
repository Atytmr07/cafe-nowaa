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
        <svg
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          className="h-12 w-12 text-pearl"
        >
          <g
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="square"
          >
            <path d="M31 32 V68" />
            <path d="M31 32 L51 68" />
            <path d="M51 32 V68" />
            <path d="M45 32 L57 68 L69 32" />
          </g>
        </svg>
      </div>
      <span className="sr-only">Yükleniyor…</span>
    </div>
  );
}
