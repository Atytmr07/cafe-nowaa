import { renderBrandCard, OG_SIZE } from '@/lib/og-image';

// Edge runtime: @vercel/og's Node-runtime code path fails to resolve its
// bundled default font on this toolchain (`new URL()` on a malformed path
// inside its own compiled font loader) and the build hard-fails. Edge uses a
// different loader that doesn't hit this. The image is static content
// either way — this only changes how it's served, not what it does.
export const runtime = 'edge';
export const alt = 'Cafe Nowaa';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return renderBrandCard();
}
