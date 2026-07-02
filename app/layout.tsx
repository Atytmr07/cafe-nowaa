import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  // Variable font: full wght range + the large optical-size axis
  // that gives the tall, confident display cut.
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  // Placeholder domain — update when the client's domain is confirmed.
  metadataBase: new URL('https://cafenowaa.com'),
  title: {
    default: 'Cafe Nowaa — Bostancı Marmaray',
    template: '%s | Cafe Nowaa',
  },
};

export const viewport: Viewport = {
  themeColor: '#141210',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
