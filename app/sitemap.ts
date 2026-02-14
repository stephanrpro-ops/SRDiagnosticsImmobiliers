import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
  const routes = ['', '/prestations', '/devis', '/tarifs', '/contact', '/actualites', '/valeurs', '/copro'];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() }));
}
