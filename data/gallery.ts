/**
 * GALLERY — real venue photography, supplied by the client.
 * Files live in public/photos/; renamed from the original WhatsApp export
 * names to descriptive, URL-safe kebab-case.
 */

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  /** Tailwind aspect class — drives the editorial masonry rhythm */
  aspect: string;
};

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g0',
    src: '/tatli.jpeg',
    alt: 'Neon Cafe Nowaa tabelasının altında, döküm tavada sıcak servis edilen tatlı',
    aspect: 'aspect-[3/4]',
  },
  // cafe-nowaa-vitrin-gece.jpeg is deliberately absent: it now sits behind
  // the hero, and repeating it here would show the same shot twice on one page.
  {
    id: 'g2',
    src: '/photos/cafe-nowaa-giris-merdiven.jpeg',
    alt: 'Giriş merdiveni ve NV logolu cam kapı',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g3',
    src: '/photos/cafe-nowaa-kahve-bari.jpeg',
    alt: 'Espresso makinesi ve tatlı vitrini olan kahve barı',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g4',
    src: '/photos/cafe-nowaa-oturma-koseleri.jpeg',
    alt: 'Bonzai ağacı ve rahat koltuklarla oturma köşesi',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g5',
    src: '/photos/cafe-nowaa-vip-oda.jpeg',
    alt: 'Cafe Nowaa VIP oda — toplantı ve özel günler için',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g6',
    src: '/photos/cafe-nowaa-salon-koltuklari.jpeg',
    alt: 'Salon oturma alanı, ahşap masalar ve rahat koltuklar',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g7',
    src: '/photos/cafe-nowaa-koridor-vitrin.jpeg',
    alt: 'Tatlı vitrini ve menü ekranlarının bulunduğu koridor',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g8',
    src: '/photos/cafe-nowaa-teras-1.jpeg',
    alt: 'Açılabilir tavanlı dış mekan terası, gece görünümü',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g9',
    src: '/photos/cafe-nowaa-teras-ay-detay.jpeg',
    alt: 'Terasta ay temalı duvar aydınlatma detayı',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g10',
    src: '/photos/cafe-nowaa-salon-genis.jpeg',
    alt: 'Geniş iç mekan salonu, alt kata inen merdivenle',
    aspect: 'aspect-[4/3]',
  },
];
