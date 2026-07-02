/**
 * MOCK GALLERY — placeholder Unsplash imagery for the demo build.
 * Replace every entry with real photography of the venue (interior,
 * storefront at night, coffee close-ups, plated dishes) before launch.
 */

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  /** Tailwind aspect class — drives the editorial masonry rhythm */
  aspect: string;
};

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    src: img('photo-1554118811-1e0d58224f24'),
    alt: 'Sıcak ışıklı kafe iç mekanı',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g2',
    src: img('photo-1447933601403-0c6688de566e'),
    alt: 'Taze demlenmiş filtre kahve yakın çekim',
    aspect: 'aspect-square',
  },
  {
    id: 'g3',
    src: img('photo-1511920170033-f8396924c348'),
    alt: 'Barista latte hazırlarken',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'g4',
    src: img('photo-1504674900247-0877df9cc836'),
    alt: 'Özenle tabaklanmış ana yemek',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g5',
    src: img('photo-1521017432531-fbd92d768814'),
    alt: 'Ahşap detaylı oturma alanı',
    aspect: 'aspect-square',
  },
  {
    id: 'g6',
    src: img('photo-1555507036-ab1f4038808a'),
    alt: 'Tereyağlı kruvasan ve kahve',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g7',
    src: img('photo-1498804103079-a6351b050096'),
    alt: 'Espresso makinesinden akan kahve',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g8',
    src: img('photo-1453614512568-c4024d13c247'),
    alt: 'Akşam ışığında kafe vitrini',
    aspect: 'aspect-[4/5]',
  },
];
