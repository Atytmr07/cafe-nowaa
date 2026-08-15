import { ImageResponse } from 'next/og';

// See app/opengraph-image.tsx — Node-runtime font loader fails on this
// toolchain; edge avoids it.
export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * iOS home-screen / share-sheet icon. app/icon.svg already covers the
 * browser-tab favicon, but Apple's touch icon needs a raster PNG — same
 * geometry, just re-rendered at the pixel size Apple asks for.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#17120E',
        }}
      >
        <svg width="146" height="146" viewBox="0 0 100 100" fill="none">
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
      </div>
    ),
    { ...size }
  );
}
