import { renderBrandCard, OG_SIZE } from '@/lib/og-image';

// See app/opengraph-image.tsx — same Node-runtime font-loader failure.
export const runtime = 'edge';
export const alt = 'Cafe Nowaa';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function TwitterImage() {
  return renderBrandCard();
}
