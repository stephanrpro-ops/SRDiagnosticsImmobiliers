import Link from 'next/link';

export default function CoproPage() {
  return (
    <main className="container-page">
      <article className="rounded-xl border bg-white p-6">
        <h1 className="text-3xl font-bold text-ralBlue">Copropriété</h1>
        <p className="mt-3">Cette prestation n’est actuellement pas proposée.</p>
        <Link href="/prestations" className="mt-4 inline-block rounded bg-ralBlue px-4 py-2 font-bold text-white">
          Retour aux prestations
        </Link>
      </article>
    </main>
  );
}
