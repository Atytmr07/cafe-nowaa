import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yönetim Paneli',
  // Staff tooling must never surface in search results
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
