import './globals.css';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'SR Diagnostics Immobiliers',
  description: 'Diagnostics immobiliers en France: DPE, amiante, plomb, électricité, gaz, termites, ERP, PPT, DTG.',
  openGraph: {
    title: 'SR Diagnostics Immobiliers',
    description: 'Bâtir votre confiance dans les règles de l’art',
    type: 'website',
    locale: 'fr_FR'
  }
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SR Diagnostics Immobiliers',
  founder: 'Raspado Stephan',
  slogan: 'Bâtir votre confiance dans les règles de l’art',
  telephone: '+33767076761',
  email: 'stephanr.pro@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '328 boulevard Fosse 2',
    postalCode: '62320',
    addressLocality: 'Rouvroy',
    addressCountry: 'FR'
  },
  openingHours: 'Mo-Su 08:00-20:00'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
