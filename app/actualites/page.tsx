import Link from 'next/link';

const posts = [
  {
    title: 'Veille réglementaire diagnostics 2026',
    source: 'Quotidiag',
    date: '2026-02-14',
    summary: 'Résumé original des évolutions réglementaires récentes, à vérifier dans la source.',
    url: 'https://www.quotidiag.fr/'
  }
];

export default function ActualitesPage() {
  return (
    <main className="container-page">
      <h1 className="text-3xl font-bold text-ralBlue">Actualités & veille</h1>
      <p className="mt-2 text-sm">Fiches originales, sans copie intégrale d’articles externes.</p>
      <div className="mt-4 space-y-4">
        {posts.map((post) => (
          <article key={post.title} className="rounded-xl border bg-white p-5">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm">Source: {post.source} · {post.date}</p>
            <p className="mt-2">{post.summary}</p>
            <Link className="mt-2 inline-block text-ralBlue underline" href={post.url} target="_blank">Lire la source</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
