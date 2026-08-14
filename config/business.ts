/**
 * Single source of truth for real-world business details.
 * Wired into the Navbar, Hero, Location, Footer, /menu header and JSON-LD.
 */
export const BUSINESS = {
  name: 'Cafe Nowaa',
  tagline: "İstanbul'un Kalbinde, Bostancı'nın Yeni Adresi",
  phone: '0551 310 10 10',
  phoneHref: 'tel:05513101010',
  whatsapp:
    'https://wa.me/905513101010?text=' +
    encodeURIComponent('Merhaba, Cafe Nowaa hakkında bilgi almak istiyorum.'),
  address:
    'Bostancı Mah. Bostan Tariki Sk. No: A1, Bostancı Marmaray Girişi Yanı, İstanbul',
  instagram: 'https://www.instagram.com/cafe_nowaa/',
  instagramHandle: '@cafe_nowaa',
  hours: 'Her gün 09:00 – 02:00',
  /** Exact coordinates of the real Google Business listing */
  geo: { lat: 40.9541456, lng: 29.0956178 },
  /**
   * Opens the actual Google Maps listing rather than a name search. The CID
   * is the decimal form of the `0x9e5237c4a70d5d0d` id in the embed URL, so
   * this can never drift onto a same-named place elsewhere.
   */
  mapsUrl: 'https://maps.google.com/?cid=11408242123838676237',
  /** Turn-by-turn straight to the door */
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=40.9541456%2C29.0956178',
  /** Place-anchored embed, supplied from the venue's own Maps listing */
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.248002351296!2d29.095617800000003!3d40.9541456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac7b302cffe9b%3A0x9e5237c4a70d5d0d!2sCafe%20Nowaa!5e0!3m2!1str!2str!4v1786689363055!5m2!1str!2str',
} as const;
