import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://srdiagnosticsimmobiliers.com';
  const routes = [
    '',
    '/prestations',
    '/prestations/dpe',
    '/prestations/amiante',
    '/prestations/plomb',
    '/prestations/electricite',
    '/prestations/gaz',
    '/prestations/termites',
    '/prestations/erp',
    '/prestations/ppt',
    '/prestations/dtg',
    '/devis',
    '/actualites',
    '/valeurs',
    '/contact',
    '/mentions-legales',
    '/confidentialite',
    '/cgv',
    '/login'
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7
  }));
}
