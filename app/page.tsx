import Link from 'next/link';
import { PricingGrid } from '@/src/components/PricingGrid';

export default function HomePage() {
  return (
    <main className="container-page space-y-8">
      <section className="rounded-xl bg-ralBlue p-8 text-white">
        <h1 className="text-4xl font-extrabold">Diagnostics immobiliers à Arras et alentours</h1>
        <p className="mt-3 max-w-2xl">
          Vente, location, copropriété : DPE, amiante, plomb, électricité, gaz, termites, ERP.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/devis" className="rounded bg-white px-4 py-2 font-bold text-ralBlue">
            Devis en ligne
          </Link>
          <Link href="/contact" className="rounded border border-white px-4 py-2 font-bold">
            Contact rapide
          </Link>
        </div>
      </section>

      <section>
        <PricingGrid compact />
        <Link href="/tarifs" className="mt-3 inline-block text-sm font-semibold text-ralBlue underline">
          Voir la grille tarifaire complète
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border bg-white p-5">
          <h2 className="text-2xl font-bold text-ralBlue">Valeurs</h2>
          <p>Confiance, transparence, honnêteté, efficacité et engagement environnemental.</p>
          <Link className="mt-3 inline-block font-semibold text-ralBlue" href="/valeurs">
            Lire nos valeurs
          </Link>
        </article>
        <article className="rounded-xl border bg-white p-5">
          <h2 className="text-2xl font-bold text-ralBlue">Horaires & zone</h2>
          <p>Lundi–Dimanche 8h–20h. Intervention sur Arras, Lens, Hénin, Beaumont, Douai, Béthune.</p>
          <p className="mt-2 font-semibold">07 67 07 67 61 · stephanr.pro@gmail.com</p>
        </article>
      </section>
    </main>
  );
}
