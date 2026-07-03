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
import { BUSINESS } from '@/config/business';

export const metadata: Metadata = {
  title: { absolute: 'Cafe Nowaa — Bostancı Marmaray' },
  description:
    'Bostancı Marmaray girişinin hemen yanında kahve, pizza, burger, kahvaltı, makarna ve soslu tavuk. İstanbul’un kalbinde şık bir mola: Cafe Nowaa.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Cafe Nowaa — Bostancı Marmaray',
    description:
      'Kahve, pizza, burger ve kahvaltı — Marmaray’ın hemen yanı başında, şık bir mola.',
    url: '/',
    siteName: 'Cafe Nowaa',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        // Placeholder OG image — replace with a real storefront/hero shot.
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Cafe Nowaa iç mekanı',
      },
    ],
  },
};

// LocalBusiness structured data with the real address and hours.
// Geo coordinates are approximate (Bostancı Marmaray) — confirm with client.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: BUSINESS.name,
  url: 'https://cafenowaa.com',
  telephone: '+905513101010',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bostancı Mah. Bostan Tariki Sk. No: A1',
    addressLocality: 'Kadıköy',
    addressRegion: 'İstanbul',
    addressCountry: 'TR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.9524,
    longitude: 29.0961,
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
  servesCuisine: ['Kahve', 'Pizza', 'Burger', 'Kahvaltı', 'Makarna', 'Tavuk'],
  priceRange: '₺₺',
  sameAs: [BUSINESS.instagram],
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
    </>
  );
}
