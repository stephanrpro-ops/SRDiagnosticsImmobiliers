import Link from 'next/link';

const services = ['DPE', 'Amiante', 'Plomb', 'Électricité', 'Gaz', 'Termites', 'ERP', 'PPT', 'DTG'];

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
          <Link href="/devis" className="rounded-lg bg-white px-5 py-3 font-bold text-ralBlue">Demander un devis</Link>
          <Link href="/client" className="rounded-lg border border-white px-5 py-3 font-bold">Espace client</Link>
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

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-ralBlue">Zones d’intervention</h2>
          <p className="mt-2 text-slate-700">Rouvroy et alentours (placeholder): Arras, Lens, Hénin-Beaumont, Douai, Béthune.</p>
        </article>
        <article className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-ralBlue">Pourquoi nous choisir</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
            <li>Qualité de mesure et restitution pédagogique</li>
            <li>Matériel professionnel et méthodologie claire</li>
            <li>Délai cible de remise: 24h (placeholder)</li>
            <li>Suivi de vos questions après intervention</li>
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-ralBlue">Avis clients</h2>
        <p className="mt-2 text-slate-600">Section placeholder: intégration de témoignages vérifiés à venir.</p>
      </section>
    </main>
  );
}
