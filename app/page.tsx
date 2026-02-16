import Link from 'next/link';
import { PricingGrid } from '@/components/pricing-grid';

const services = ['DPE', 'Amiante', 'Plomb', 'Électricité', 'Gaz', 'Termites', 'ERP', 'PPT', 'DTG'];

const pages = [
  { label: 'Accueil', href: '/' },
  { label: 'Devis', href: '/devis' },
  { label: 'Prestations', href: '/prestations' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Tarifs', href: '/tarifs' }
];

export default function HomePage() {
  return (
    <main className="container-page space-y-10">
      <section className="rounded-2xl bg-ralBlue p-10 text-white shadow-sm">
        <p className="text-sm uppercase tracking-wide">SR Diagnostics Immobiliers</p>
        <h1 className="mt-2 text-4xl font-extrabold">Bâtir votre confiance dans les règles de l’art</h1>
        <p className="mt-3 max-w-3xl text-white/90">
          Accompagnement diagnostic immobilier à Rouvroy et dans le secteur Arras, Lens, Hénin-Beaumont, Douai, Béthune.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/devis" className="rounded-lg bg-white px-5 py-3 font-bold text-ralBlue">
            Demander un devis
          </Link>
          <Link href="/tarifs" className="rounded-lg border border-white px-5 py-3 font-bold">
            Voir la grille tarifaire
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ralBlue">Pages principales</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-xl border bg-white p-4 text-center font-semibold shadow-sm hover:border-ralBlue"
            >
              {page.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ralBlue">Prestations</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service} className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">{service}</h3>
              <p className="mt-1 text-sm text-slate-600">Intervention conforme, compte-rendu clair, délais rapides.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-ralBlue">Grille tarifaire</h2>
          <Link href="/tarifs" className="rounded-lg bg-ralBlue px-4 py-2 text-sm font-semibold text-white">
            Ouvrir la page tarifs complète
          </Link>
        </div>
        <PricingGrid compact />
      </section>
    </main>
  );
}
