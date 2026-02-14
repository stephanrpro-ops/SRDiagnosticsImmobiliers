import Link from 'next/link';

const items = [
  { title: 'Évolutions DPE : points de vigilance', source: 'ADEME', date: '2026-02-01', tag: 'DPE', url: 'https://www.ademe.fr/', summary: 'Résumé généré automatiquement : vérifiez les mises à jour et impacts opérationnels avant application.' },
  { title: 'Cadre ERP : rappels pratiques', source: 'Service-Public', date: '2026-01-15', tag: 'ERP', url: 'https://www.service-public.fr/', summary: '' }
];

const tags = ['Tous', 'DPE', 'Audit', 'Amiante', 'Plomb', 'Élec', 'Gaz', 'ERP', 'Copro', 'PPT/DTG'];

export default function ActualitesPage() {
  return (
    <main className="container-page space-y-4">
      <h1 className="text-3xl font-bold text-ralBlue">Actualités & veille</h1>
      <p className="text-sm text-slate-600">Sources officielles/RSS uniquement. Aucun contenu intégral externe n’est republié.</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => <span key={tag} className="rounded-full border bg-white px-3 py-1 text-xs">{tag}</span>)}
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-sm text-slate-600">{item.source} · {item.date} · tag: {item.tag}</p>
            {item.summary && (
              <p className="mt-2 text-sm text-slate-700">
                {item.summary} <span className="font-semibold">(Résumé généré automatiquement)</span>
              </p>
            )}
            <Link className="mt-3 inline-block text-ralBlue underline" href={item.url} target="_blank" rel="noopener">Lire la source</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
