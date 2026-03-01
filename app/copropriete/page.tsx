import Link from 'next/link';

export default function CoproprietePage() {
  return (
    <main className="container-page pt-28">
      <h1 className="text-3xl font-bold text-ralBlue">Copropriété</h1>
      <p className="mt-3 text-slate-700">
        Cette prestation n’est actuellement pas proposée. Notre équipe reste disponible pour vous orienter vers les
        diagnostics immobiliers adaptés à votre projet.
      </p>
      <Link href="/prestations" className="mt-4 inline-block rounded-lg bg-ralBlue px-4 py-2 font-semibold text-white">
        Voir les prestations disponibles
      </Link>
    </main>
  );
}
