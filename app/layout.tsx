import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Jost } from 'next/font/google';
import Analytics from '@/components/Analytics';
import './globals.css';

/** Didone display face — hairline contrast, the couture register */
const bodoni = Bodoni_Moda({
  subsets: ['latin', 'latin-ext'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  // Next ships no metric overrides for Bodoni Moda; naming Didone-adjacent
  // system faces keeps the pre-swap render close instead of defaulting to
  // Times with mismatched metrics.
  adjustFontFallback: false,
  fallback: ['Didot', 'Bodoni MT', 'Playfair Display', 'Georgia', 'serif'],
});

/** Geometric grotesk — echoes the circular construction of the NV mark */
const jost = Jost({
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
  themeColor: '#0B0B0C',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${bodoni.variable} ${jost.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
