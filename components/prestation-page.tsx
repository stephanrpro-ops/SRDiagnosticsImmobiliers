import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  mandatoryFor: string;
  includes: string[];
  process: string[];
};

export function PrestationPage({ title, description, mandatoryFor, includes, process }: Props) {
  return (
    <main className="container-page space-y-6">
      <article className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-ralBlue">{title}</h1>
        <p className="mt-3 text-slate-700">{description}</p>
      </article>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-ralBlue">Pour qui / Quand c’est obligatoire</h2>
          <p className="mt-2 text-slate-700">{mandatoryFor}</p>
          <p className="mt-2 text-xs text-slate-500">Information générale non exhaustive, à confirmer selon votre situation.</p>
        </article>
        <article className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-ralBlue">Ce que comprend la prestation</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
            {includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <article className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-ralBlue">Déroulé de l’intervention</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-6 text-slate-700">
          {process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-3 text-slate-700"><strong>Délais de remise :</strong> 24h (placeholder selon dossier).</p>
      </article>

      <div className="rounded-2xl bg-ralBlue p-6 text-white">
        <p className="text-lg font-semibold">Besoin d’un chiffrage rapide ?</p>
        <Link href="/devis" className="mt-3 inline-block rounded-lg bg-white px-4 py-2 font-bold text-ralBlue">
          Demander un devis en ligne
        </Link>
      </div>
    </main>
  );
}
