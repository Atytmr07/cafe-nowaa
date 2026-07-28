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
  },
};

export default nextConfig;
