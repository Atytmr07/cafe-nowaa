import type { Metadata } from 'next';
import MenuHeader from '@/components/menu/MenuHeader';
import MenuExperience from '@/components/menu/MenuExperience';

/**
 * The standalone digital menu — architected as its own micro-site.
 * This is the destination for table QR codes: full-screen noir,
 * mobile-first, with its own compact header (no homepage Navbar/Footer).
 */
export const metadata: Metadata = {
  title: { absolute: 'Cafe Nowaa — Menü' },
  description:
    'Cafe Nowaa dijital menüsü: kahvaltı, taş fırın pizza, burger, makarna, soslu tavuk, kahve ve içecekler. Bostancı Marmaray girişi yanı.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title: 'Cafe Nowaa — Menü',
    description:
      'Kahvaltıdan taş fırın pizzaya, burgerden özenle demlenen kahvelere — Cafe Nowaa’nın tüm menüsü.',
    url: '/menu',
    siteName: 'Cafe Nowaa',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        // Placeholder OG image — replace with a real signature-dish shot.
        url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Cafe Nowaa imza burgeri',
      },
    ],
  },
};

export default function MenuPage() {
  return (
    <main className="min-h-[100svh] bg-noir">
      <MenuHeader />
      <MenuExperience />
    </main>
  );
}
