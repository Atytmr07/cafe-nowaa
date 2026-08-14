import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import Analytics from '@/components/Analytics';
import './globals.css';

/**
 * Display face. Bodoni Moda was doing the site no favours — a Didone's
 * hairline serifs and vertical stress read as cold fashion-house, not warm
 * café. Fraunces is a soft, high-contrast old-style serif with real warmth
 * in the terminals, and its `SOFT` and `WONK` axes give the headlines a
 * hand-cut character that flat geometric faces can't.
 */
const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

/** Body grotesk — DM Sans is warmer and rounder in the bowls than Jost */
const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: 'variable',
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  // Update once the client's production domain is live
  metadataBase: new URL('https://cafe-nowaa.web.app'),
  title: {
    default: 'Cafe Nowaa — Bostancı Marmaray',
    template: '%s | Cafe Nowaa',
  },
  applicationName: 'Cafe Nowaa',
  authors: [{ name: 'Cafe Nowaa' }],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#17120E',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
