/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Mock/demo food photography is served from Unsplash for now.
    // Remove this once real client photography lives in /public.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Dish photography uploaded through the admin panel
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    // Every `sizes` prop on the site resolves to one of these breakpoints
    // (see components/*.tsx) or one of the two fixed admin-thumbnail sizes
    // (48px, 96px). The Next.js defaults add six more buckets nothing here
    // ever requests (16/32/64/384px, and 2048/3840 device widths — no
    // source photo exceeds 2000px anyway, so those just upscale-cap to the
    // same result as 1920). Fewer buckets means fewer distinct
    // (width, format) pairs to generate, which is what the Hobby plan's
    // Image Transformations quota actually counts against.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 96],
    // A year. Every image here is either a static file in /public or a
    // Firestore-hosted upload whose path is timestamped on write
    // (`${productId}-${Date.now()}.${ext}`, see lib/menu-repo.ts) — a
    // replaced photo is a new URL, not a cache-invalidation problem. Safe
    // to hold onto a transform indefinitely, which keeps both Image Cache
    // Writes and Transformations from being re-spent on repeat visitors.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
