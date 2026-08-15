import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * The share-preview image used for both Open Graph and Twitter cards — the
 * gold NV mark on the espresso ground, geometry copied from app/icon.svg
 * (the canonical favicon rendition, "manually kept in sync" with the live
 * NVLogo component per its own comment) so every place the mark appears —
 * tab, home-screen icon, share card — is pixel-consistent with the brand.
 */
export function renderBrandCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#17120E',
        }}
      >
        <svg width="230" height="230" viewBox="0 0 100 100" fill="none">
          <clipPath id="nv-cap">
            <rect x="0" y="28.1" width="100" height="43.8" />
          </clipPath>
          <circle cx="50" cy="50" r="40" stroke="#F5CE6D" strokeWidth={4.6} fill="none" />
          <g clipPath="url(#nv-cap)">
            <path
              d="M27 74.8 V28.1 L54 74.8"
              stroke="#F5CE6D"
              strokeWidth={4.76}
              fill="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit={8}
            />
            <path
              d="M47.5 25.2 L60.76 64.5 L74 25.2"
              stroke="#F5CE6D"
              strokeWidth={4.76}
              fill="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit={8}
            />
          </g>
        </svg>

        <div
          style={{
            marginTop: 36,
            display: 'flex',
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: 12,
            color: '#F8F4EC',
          }}
        >
          CAFE NOWAA
        </div>

        <div
          style={{
            marginTop: 22,
            display: 'flex',
            width: 90,
            height: 1,
            background: 'rgba(217,164,65,0.55)',
          }}
        />

        <div
          style={{
            marginTop: 24,
            display: 'flex',
            fontSize: 24,
            letterSpacing: 5,
            color: '#B3A796',
          }}
        >
          BOSTANCI MARMARAY · İSTANBUL
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
