import Link from 'next/link';

const diagnostics = ['DPE', 'Amiante', 'Plomb', 'Gaz', 'Électricité', 'ERP', 'Mesurage'];

export default function DiagnosticsPage() {
  return (
    <main className="container-page pt-28">
      <h1 className="text-3xl font-bold text-ralBlue">Diagnostics immobiliers</h1>
      <p className="mt-3 text-slate-700">Découvrez les diagnostics obligatoires pour la vente, la location et la mise en conformité de votre bien.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {diagnostics.map((name) => (
          <article key={name} className="rounded-xl border bg-white p-4 font-semibold shadow-sm">
            {name}
          </article>
        ))}
      </div>
      <Link href="/devis" className="mt-6 inline-block rounded-lg bg-ralBlue px-4 py-2 font-semibold text-white">
        Demander un devis
      </Link>
    </main>
  );
}
