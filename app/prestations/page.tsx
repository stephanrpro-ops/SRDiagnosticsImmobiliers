import Link from 'next/link';

const pages = [
  ['dpe', 'DPE'],
  ['amiante', 'Amiante'],
  ['plomb', 'Plomb'],
  ['electricite', 'Électricité'],
  ['gaz', 'Gaz'],
  ['termites', 'Termites'],
  ['erp', 'ERP'],
  ['ppt', 'PPT'],
  ['dtg', 'DTG']
] as const;

export default function PrestationsListPage() {
  return (
    <main className="container-page space-y-4">
      <h1 className="text-3xl font-bold text-ralBlue">Prestations</h1>
      <p className="text-slate-700">Diagnostic vente/location, risques, copropriété : sélectionnez une fiche.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {pages.map(([slug, label]) => (
          <Link key={slug} href={`/prestations/${slug}`} className="rounded-xl border bg-white p-4 font-semibold shadow-sm hover:border-ralBlue">
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
}
