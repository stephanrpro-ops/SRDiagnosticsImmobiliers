import Link from 'next/link';

export default function LocationPage() {
  return (
    <main className="container-page pt-28">
      <h1 className="text-3xl font-bold text-ralBlue">Location : diagnostics obligatoires</h1>
      <p className="mt-3 text-slate-700">Constituez un dossier locatif conforme avec des rapports clairs, remis rapidement.</p>
      <Link href="/diagnostics" className="mt-4 inline-block rounded-lg bg-ralBlue px-4 py-2 font-semibold text-white">
        Voir les diagnostics obligatoires
      </Link>
    </main>
  );
}
