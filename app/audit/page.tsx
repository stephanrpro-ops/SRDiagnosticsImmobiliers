import Link from 'next/link';

export default function AuditPage() {
  return (
    <main className="container-page pt-28">
      <h1 className="text-3xl font-bold text-ralBlue">Audit</h1>
      <p className="mt-3 text-slate-700">Audit énergétique et accompagnement sur l’amélioration de la performance du logement.</p>
      <Link href="/devis" className="mt-4 inline-block rounded-lg bg-ralBlue px-4 py-2 font-semibold text-white">
        Demander un devis
      </Link>
    </main>
  );
}
