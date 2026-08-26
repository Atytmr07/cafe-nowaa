import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import MenuTeaser from '@/components/MenuTeaser';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { BUSINESS } from '@/config/business';
import { SITE_URL } from '@/config/site';
import { getMenu, REVALIDATE_SECONDS } from '@/lib/menu-server';

// The teaser's dishes come from Firestore, read server-side once per
// window rather than once per visitor. See lib/menu-server.ts.
export const revalidate = REVALIDATE_SECONDS;

export const metadata: Metadata = {
  title: { absolute: 'Cafe Nowaa — Bostancı Marmaray' },
  description:
    'Bostancı Marmaray girişinin hemen yanında kahve, kahvaltı, taş fırın pizza, burger, makarna ve ana yemekler. İstanbul’un kalbinde şık bir mola: Cafe Nowaa.',
  keywords: [
    'Cafe Nowaa',
    'Bostancı kahvaltı',
    'Bostancı cafe',
    'Marmaray kahve',
    'Bostancı pizza',
    'Bostancı burger',
    'Kadıköy brunch',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Cafe Nowaa — Bostancı Marmaray',
    description:
      'Kahve, kahvaltı, taş fırın pizza ve burger — Marmaray’ın hemen yanı başında, şık bir mola.',
    url: '/',
    siteName: 'Cafe Nowaa',
    locale: 'tr_TR',
    type: 'website',
    // Image comes from app/opengraph-image.tsx (the gold NV mark on
    // espresso) — resolved automatically by the file convention, so no
    // images array here.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cafe Nowaa — Bostancı Marmaray',
    description:
      'Kahve, kahvaltı, taş fırın pizza ve burger — Marmaray’ın hemen yanı başında.',
  },
};

// LocalBusiness structured data with the real address, hours and the exact
// coordinates of the venue's own Google Business listing.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: BUSINESS.name,
  url: SITE_URL,
  telephone: '+905513101010',
  image: `${SITE_URL}/icon.svg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bostancı Mah. Bostan Tariki Sk. No: A1',
    addressLocality: 'Kadıköy',
    addressRegion: 'İstanbul',
    addressCountry: 'TR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '09:00',
    closes: '02:00',
  },
  hasMenu: `${SITE_URL}/menu`,
  servesCuisine: [
    'Kahve',
    'Kahvaltı',
    'Pizza',
    'Burger',
    'Makarna',
    'Ana Yemekler',
    'Tatlı',
  ],
  priceRange: '₺₺',
  hasMap: BUSINESS.mapsUrl,
  sameAs: [BUSINESS.instagram, BUSINESS.mapsUrl],
};

export default async function HomePage() {
  const menu = await getMenu();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <MenuTeaser menu={menu} />
        <Gallery />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
