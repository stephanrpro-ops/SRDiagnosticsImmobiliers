import Link from 'next/link';

const commitments = [
  ['Confiance', 'Des diagnostics fiables, conformes et impartiaux pour sécuriser vos décisions.'],
  ['Transparence', 'Des résultats expliqués simplement et des rapports lisibles, sans jargon inutile.'],
  ['Honnêteté', 'Aucune complaisance, aucun diagnostic bâclé : uniquement des constats objectifs.'],
  ['Efficacité', 'Une organisation carrée et des délais tenus, de la visite à la remise du rapport.'],
  ['Engagement', 'Un suivi réel et des réponses à vos questions, même après la remise des documents.']
];

const whyUs = [
  'Intervention rigoureuse, jamais “à la chaîne”.',
  'Explications simples : vous comprenez ce que vous signez.',
  'Matériel professionnel et méthodologie éprouvée.',
  'Réactivité et disponibilité 7j/7 (8h–20h).'
];

const diagnostics = ['DPE', 'Amiante', 'Plomb', 'Gaz', 'Électricité', 'ERP', 'Mesurage'];

const cities = ['Arras', 'Lens', 'Hénin-Beaumont', 'Douai', 'Béthune'];

const processSteps = [
  'Prise de rendez-vous rapide',
  'Visite et contrôles',
  'Analyse et rédaction',
  'Remise du rapport et explication'
];

export default function HomePage() {
  return (
    <main className="container-page space-y-12 pt-28">
      <section className="rounded-2xl bg-ralBlue p-8 text-white shadow-sm md:p-10">
        <p className="text-sm uppercase tracking-wide">Diagnostics immobiliers</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Diagnostics immobiliers fiables pour vendre ou louer sereinement</h1>
        <p className="mt-3 max-w-3xl text-white/90">Arras • Lens • Hénin • Beaumont • Douai • Béthune (rayon 50 km)</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
          <span className="rounded-full bg-white/15 px-3 py-1">Intervention sous 48 h</span>
          <span className="rounded-full bg-white/15 px-3 py-1">Rapport sous 24 h</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/devis" className="rounded-lg bg-white px-5 py-3 font-bold text-ralBlue">
            Demander un devis
          </Link>
          <Link href="/diagnostics" className="rounded-lg border border-white px-5 py-3 font-bold">
            Voir les diagnostics
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ralBlue">Nos engagements</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {commitments.map(([title, text]) => (
            <article key={title} className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-bold text-ralBlue">{title}</h3>
              <p className="mt-2 text-sm text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-ralBlue">Pourquoi SR Diagnostics</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {whyUs.map((item) => (
            <li key={item} className="rounded-xl bg-slate-50 p-4 text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ralBlue">Votre situation</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold">Je vends un bien</h3>
            <p className="mt-2 text-slate-600">Préparez votre dossier avec les diagnostics obligatoires selon votre bien.</p>
            <Link href="/vente" className="mt-4 inline-block rounded-lg bg-ralBlue px-4 py-2 font-semibold text-white">
              Voir les diagnostics obligatoires
            </Link>
          </article>
          <article className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold">Je loue un bien</h3>
            <p className="mt-2 text-slate-600">Sécurisez votre location avec un dossier conforme, clair et complet.</p>
            <Link href="/location" className="mt-4 inline-block rounded-lg bg-ralBlue px-4 py-2 font-semibold text-white">
              Voir les diagnostics obligatoires
            </Link>
          </article>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-ralBlue">Nos diagnostics</h2>
          <Link href="/diagnostics" className="rounded-lg bg-ralBlue px-4 py-2 text-sm font-semibold text-white">
            Tous les diagnostics
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {diagnostics.map((service) => (
            <article key={service} className="rounded-2xl border bg-white p-5 text-center font-semibold shadow-sm">
              {service}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-ralBlue">Copropriété : PPT & DTG</h2>
        <p className="mt-2 text-slate-700">Prestations dédiées syndics et copropriétés. Devis sur demande.</p>
        <Link href="/copropriete" className="mt-4 inline-block rounded-lg bg-ralBlue px-4 py-2 font-semibold text-white">
          PPT & DTG
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-ralBlue">Comment ça se passe</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <article key={step} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-ralBlue">Étape {index + 1}</p>
              <p className="mt-2 text-slate-700">{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-ralBlue">Un bilan clair, pas juste des PDF</h2>
        <p className="mt-2 text-slate-700">
          On synthétise l’état du bien (sécurité, conformité, énergie) pour une lecture simple et actionnable.
        </p>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-ralBlue">Raspado Stephan – Diagnostiqueur immobilier</h2>
        <p className="mt-2 text-slate-700">Approche rigoureuse, pédagogique et indépendante.</p>
        <Link href="/a-propos" className="mt-4 inline-block rounded-lg bg-ralBlue px-4 py-2 font-semibold text-white">
          Découvrir SR Diagnostics
        </Link>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-ralBlue">Devis express</h2>
        <form className="mt-4 grid gap-3 md:grid-cols-2" action="/devis">
          <input className="rounded-lg border p-3" name="type" placeholder="Type de bien" />
          <input className="rounded-lg border p-3" name="surface" placeholder="Surface" />
          <input className="rounded-lg border p-3" name="annee" placeholder="Année de construction" />
          <input className="rounded-lg border p-3" name="gaz" placeholder="Gaz fixe ?" />
          <input className="rounded-lg border p-3 md:col-span-2" name="electricite" placeholder="Électricité ?" />
          <button type="submit" className="rounded-lg bg-ralBlue px-4 py-3 font-semibold text-white md:col-span-2">
            Recevoir un devis
          </button>
        </form>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-ralBlue">Zone d’intervention</h2>
        <p className="mt-2 text-slate-700">{cities.join(' • ')} • rayon maximum 50 km autour de Rouvroy.</p>
      </section>
    </main>
  );
}
