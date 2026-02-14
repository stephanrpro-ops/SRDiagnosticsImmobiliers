import Link from 'next/link';

const kpis = [
  ['Demandes de devis', '12'],
  ['Missions en cours', '4'],
  ['CA (placeholder)', '—'],
  ['Impayés', '2']
];

export default function AdminPage() {
  return (
    <main className="container-page space-y-6">
      <h1 className="text-3xl font-bold text-ralBlue">Admin</h1>
      <p className="text-slate-700">Pilotage CRM, missions, documents PDF, facturation et veille.</p>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(([label, value]) => (
          <article key={label} className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-ralBlue">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-ralBlue">CRM / Missions</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
            <li>Créer mission (manuelle ou depuis devis)</li>
            <li>Associer client et bien</li>
            <li>Upload de rapports PDF (Supabase Storage)</li>
            <li>Statuts: à_planifier, en_cours, rapport_envoye, clos</li>
          </ul>
        </article>

        <article className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-ralBlue">Facturation / Relances</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
            <li>Statuts facture: brouillon → mise_en_demeure</li>
            <li>Journal de relances par facture</li>
            <li>Export CSV (à brancher)</li>
          </ul>
        </article>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/veille" className="rounded bg-ralBlue px-4 py-2 font-bold text-white">Gérer la veille RSS</Link>
        <Link href="/dashboard" className="rounded border px-4 py-2">Dashboard rôles</Link>
      </div>
    </main>
  );
}
