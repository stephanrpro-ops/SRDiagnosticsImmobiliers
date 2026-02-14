import './globals.css';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'SR Diagnostics Immobiliers',
  description: 'Diagnostics immobiliers sur Arras, Lens, Hénin, Beaumont, Douai et Béthune.',
  openGraph: {
    title: 'SR Diagnostics Immobiliers',
    description: 'Bâtir votre confiance dans les règles de l’art',
    type: 'website',
    locale: 'fr_FR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SR Diagnostics Immobiliers',
    description: 'Bâtir votre confiance dans les règles de l’art'
  }
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SR Diagnostics Immobiliers',
  telephone: '07 67 07 67 61',
  email: 'stephanr.pro@gmail.com',
  openingHours: 'Mo-Su 08:00-20:00',
  areaServed: ['Arras', 'Lens', 'Hénin', 'Beaumont', 'Douai', 'Béthune']
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
