import Link from 'next/link';

export default function DevisMerciPage() {
  return (
    <main className="container-page max-w-2xl">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-ralBlue">Merci, votre demande est bien envoyée.</h1>
        <p className="mt-3 text-slate-700">
          Votre demande de devis a bien été traitée. Notre équipe a reçu la notification sur
          <strong> stephanr.pro@gmail.com</strong> et vous recontactera rapidement.
        </p>
        <p className="mt-2 text-slate-700">En cas d’urgence: 07 67 07 67 61.</p>
        <Link href="/" className="mt-5 inline-block rounded bg-ralBlue px-4 py-2 font-semibold text-white">
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
