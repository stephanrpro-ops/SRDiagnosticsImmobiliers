const sources = [
  { name: 'Legifrance', url: 'https://www.legifrance.gouv.fr/rss', enabled: true, tags: 'juridique' },
  { name: 'Service-Public', url: 'https://www.service-public.fr/particuliers/actualites/rss', enabled: true, tags: 'habitat' }
];

const drafts = [
  { title: 'Mise à jour DPE (brouillon)', source: 'ADEME', status: 'draft' }
];

export default function AdminVeillePage() {
  return (
    <main className="container-page space-y-6">
      <h1 className="text-3xl font-bold text-ralBlue">Admin Veille</h1>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Sources RSS</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {sources.map((s) => <li key={s.url}>{s.name} — {s.url} — {s.enabled ? 'actif' : 'inactif'} — tags: {s.tags}</li>)}
        </ul>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Brouillons à valider</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {drafts.map((d) => <li key={d.title}>{d.title} ({d.source}) — {d.status}</li>)}
        </ul>
      </section>
    </main>
  );
}
