import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cafe Nowaa — Bostancı Marmaray',
    short_name: 'Cafe Nowaa',
    description:
      'Kahve, kahvaltı, taş fırın pizza ve burger — Bostancı Marmaray girişinin hemen yanında.',
    start_url: '/',
    display: 'standalone',
    background_color: '#17120E',
    theme_color: '#17120E',
    lang: 'tr',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
