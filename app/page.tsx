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
import WhatsAppButton from '@/components/WhatsAppButton';
import { BUSINESS } from '@/config/business';
import { SITE_URL } from '@/config/site';

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
    images: [
      {
        // Placeholder OG image — replace with a real storefront/interior shot
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Cafe Nowaa iç mekanı',
      },
    ],
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
    opens: '07:00',
    closes: '00:00',
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

export default function HomePage() {
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
        <MenuTeaser />
        <Gallery />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
