import Link from 'next/link';

const pages = ['dpe', 'amiante', 'plomb', 'electricite', 'gaz', 'termites', 'erp'];

export default function PrestationsListPage() {
  return (
    <main className="container-page">
      <h1 className="text-3xl font-bold text-ralBlue">Prestations</h1>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {pages.map((slug) => (
          <Link key={slug} href={`/prestations/${slug}`} className="rounded border bg-white p-4 font-semibold capitalize">
            {slug}
          </Link>
        ))}
      </div>
    </main>
  );
}
