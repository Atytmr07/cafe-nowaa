/**
 * Single source of truth for real-world business details.
 * Wired into the Navbar, Hero, Location, Footer, /menu header and JSON-LD.
 */
export const BUSINESS = {
  name: 'Cafe Nowaa',
  tagline: "İstanbul'un Kalbinde, Bostancı'nın Yeni Adresi",
  phone: '0551 310 10 10',
  phoneHref: 'tel:05513101010',
  address:
    'Bostancı Mah. Bostan Tariki Sk. No: A1, Bostancı Marmaray Girişi Yanı, İstanbul',
  instagram: 'https://www.instagram.com/cafe_nowaa/',
  instagramHandle: '@cafe_nowaa',
  hours: 'Her gün 07:00 – 00:00', // placeholder — confirm real hours with client
  // Directions deep-link — replace query with the exact Google Maps place URL
  // once the client's Google Business profile is confirmed.
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(
      'Cafe Nowaa, Bostancı Mah. Bostan Tariki Sk. No: A1, Bostancı, İstanbul'
    ),
} as const;
