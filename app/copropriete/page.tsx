import Link from 'next/link';

export default function CoproprietePage() {
  return (
    <main className="container-page pt-28">
      <h1 className="text-3xl font-bold text-ralBlue">Copropriété : PPT & DTG</h1>
      <p className="mt-3 text-slate-700">Prestations dédiées syndics et copropriétés. Devis sur demande selon les besoins de la résidence.</p>
      <Link href="/contact" className="mt-4 inline-block rounded-lg bg-ralBlue px-4 py-2 font-semibold text-white">
        Demander un devis
      </Link>
    </main>
  );
}
