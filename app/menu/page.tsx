import type { Metadata } from 'next';
import MenuHeader from '@/components/menu/MenuHeader';
import MenuExperience from '@/components/menu/MenuExperience';
import { CATEGORIES, PRODUCTS, groupedProducts } from '@/data/menu';
import { BUSINESS } from '@/config/business';
import { SITE_URL } from '@/config/site';

/**
 * The standalone digital menu — architected as its own micro-site and
 * the destination for table QR codes: full-bleed obsidian, mobile-first,
 * with its own masthead rather than the homepage navigation.
 */
export const metadata: Metadata = {
  title: { absolute: 'Cafe Nowaa — Menü' },
  description:
    'Cafe Nowaa dijital menüsü: kahvaltı, yeni nesil kahvaltı, tost, burger, pizza, makarna, ana yemekler, salata, kahve, içecekler ve tatlılar. Bostancı Marmaray girişi yanı.',
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
        // Placeholder OG image — replace with a real signature-dish shot
        url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Cafe Nowaa serpme kahvaltı',
      },
    ],
  },
};

/** Schema.org Menu so search engines can surface individual dishes. */
const menuJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: `${BUSINESS.name} Menü`,
  url: `${SITE_URL}/menu`,
  inLanguage: 'tr-TR',
  hasMenuSection: CATEGORIES.map((category) => ({
    '@type': 'MenuSection',
    name: category.label,
    hasMenuSection: groupedProducts(category).map(({ group, items }) => ({
      '@type': 'MenuSection',
      name: group,
      hasMenuItem: items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        ...(item.price !== null
          ? {
              offers: {
                '@type': 'Offer',
                price: item.price,
                priceCurrency: 'TRY',
              },
            }
          : {}),
      })),
    })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <main className="min-h-[100svh] bg-obsidian">
        <MenuHeader />
        <MenuExperience />
        <p className="sr-only">
          Menümüzde toplam {PRODUCTS.length} ürün bulunmaktadır.
        </p>
      </main>
    </>
  );
}
