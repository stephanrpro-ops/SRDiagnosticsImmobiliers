'use client';

import { FormEvent, useMemo, useState } from 'react';
import { PricingGrid } from '@/src/components/PricingGrid';
import { BilledDiagnostic, formatPriceEUR, getPackPrice, isOver200m2 } from '@/src/lib/pricing';

type QuoteForm = {
  transaction: 'vente' | 'location';
  propertyType: 'maison' | 'appartement' | 'immeuble' | 'local pro';
  address: string;
  year: number;
  surface: number;
  hasElectricity: boolean;
  hasGas: boolean;
  hasValidDpe: boolean;
  termitesConfirmed: boolean;
  mesurage: boolean;
  prelevement: boolean;
  smsOptIn: boolean;
};

const init: QuoteForm = {
  transaction: 'vente',
  propertyType: 'maison',
  address: '',
  year: 2000,
  surface: 100,
  hasElectricity: true,
  hasGas: false,
  hasValidDpe: false,
  termitesConfirmed: false,
  mesurage: false,
  prelevement: false,
  smsOptIn: false
};

function getResults(form: QuoteForm) {
  const recommended = new Set<BilledDiagnostic>(['erp', 'dpe']);
  const billed = new Set<BilledDiagnostic>(['erp']);

  if (form.year < 1997) {
    recommended.add('amiante');
    billed.add('amiante');
  }
  if (form.year < 1949) {
    recommended.add('plomb');
    billed.add('plomb');
  }
  if (!form.hasValidDpe) billed.add('dpe');
  if (form.hasElectricity) {
    recommended.add('electricite');
    billed.add('electricite');
  }
  if (form.hasGas) {
    recommended.add('gaz');
    billed.add('gaz');
  }
  if (form.termitesConfirmed) {
    recommended.add('termites');
    billed.add('termites');
  }

  const packCount = billed.size;
  const over200 = isOver200m2(form.surface);
  const packPrice = getPackPrice(packCount);
  const surDevis = over200 || packCount === 0 || packCount > 6 || packPrice === null;

  return { recommended: [...recommended], billed: [...billed], packCount, packPrice, surDevis };
}

function isValidGoogleAppointmentUrl(url?: string) {
  return Boolean(url && /^https:\/\/calendar\.google\.com\/calendar\/appointments\/schedules\//.test(url));
}

export default function DevisPage() {
  const [form, setForm] = useState<QuoteForm>(init);
  const [done, setDone] = useState(false);
  const result = useMemo(() => getResults(form), [form]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hp: '',
        data: form,
        result,
        consent_json: {
          acceptedCgv: true,
          acceptedPrivacy: true,
          smsOptIn: form.smsOptIn,
          timestamp: new Date().toISOString()
        }
      })
    });
    setDone(true);
  }

  const googleLink = process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL;
  const hasPublicGoogleLink = isValidGoogleAppointmentUrl(googleLink);

  return (
    <main className="container-page space-y-6">
      <h1 className="text-3xl font-bold text-ralBlue">Devis en ligne</h1>

      <PricingGrid compact />

      <form onSubmit={submit} className="grid gap-4 rounded-xl border bg-white p-6 md:grid-cols-2">
        <label>
          Transaction
          <select className="mt-1 w-full border p-2" value={form.transaction} onChange={(e) => setForm({ ...form, transaction: e.target.value as QuoteForm['transaction'] })}>
            <option value="vente">Vente</option>
            <option value="location">Location</option>
          </select>
        </label>
        <label>
          Type de bien
          <select className="mt-1 w-full border p-2" value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value as QuoteForm['propertyType'] })}>
            <option>maison</option>
            <option>appartement</option>
            <option>immeuble</option>
            <option>local pro</option>
          </select>
        </label>
        <label className="md:col-span-2">
          Adresse
          <input required className="mt-1 w-full border p-2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Adresse (autocomplétion api-adresse.data.gouv.fr à brancher)" />
        </label>
        <label>
          Année de construction
          <input type="number" required className="mt-1 w-full border p-2" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
        </label>
        <label>
          Surface (m²)
          <input type="number" required className="mt-1 w-full border p-2" value={form.surface} onChange={(e) => setForm({ ...form, surface: Number(e.target.value) })} />
        </label>

        <label><input type="checkbox" checked={form.hasElectricity} onChange={(e) => setForm({ ...form, hasElectricity: e.target.checked })} /> Présence d’une installation électrique</label>
        <label><input type="checkbox" checked={form.hasGas} onChange={(e) => setForm({ ...form, hasGas: e.target.checked })} /> Présence d’une installation de gaz fixe</label>
        <label className="md:col-span-2"><input type="checkbox" checked={form.hasValidDpe} onChange={(e) => setForm({ ...form, hasValidDpe: e.target.checked })} /> J’ai déjà un DPE valide (validité à vérifier)</label>

        <div className="md:col-span-2 rounded border p-3 text-sm">
          <a href="https://termite.com.fr/rechercher/" target="_blank" className="font-semibold text-ralBlue underline" rel="noreferrer">
            Vérifier termites (indicatif)
          </a>
          <p>Vérification indicative. La référence officielle reste l’arrêté préfectoral / mairie.</p>
          <label><input type="checkbox" checked={form.termitesConfirmed} onChange={(e) => setForm({ ...form, termitesConfirmed: e.target.checked })} /> Ma commune est en zone termites (selon vérification)</label>
        </div>

        <label><input type="checkbox" checked={form.mesurage} onChange={(e) => setForm({ ...form, mesurage: e.target.checked })} /> Mesurage (hors-pack)</label>
        <label><input type="checkbox" checked={form.prelevement} onChange={(e) => setForm({ ...form, prelevement: e.target.checked })} /> Prélèvement (hors-pack)</label>

        <label className="md:col-span-2"><input type="checkbox" required /> J’accepte les <a className="text-ralBlue underline" href="/cgv">CGV</a></label>
        <label className="md:col-span-2"><input type="checkbox" required /> J’ai lu la <a className="text-ralBlue underline" href="/confidentialite">politique de confidentialité</a></label>
        <label className="md:col-span-2"><input type="checkbox" checked={form.smsOptIn} onChange={(e) => setForm({ ...form, smsOptIn: e.target.checked })} /> J’accepte d’être contacté par SMS</label>

        <button className="rounded bg-ralBlue px-4 py-2 font-bold text-white md:col-span-2">Envoyer la demande</button>
      </form>

      <section className="rounded-xl border bg-white p-6">
        <h2 className="text-2xl font-bold text-ralBlue">Résultat</h2>
        <p>Diagnostics recommandés : {result.recommended.join(', ') || '—'}</p>
        <p>Diagnostics facturés ({result.packCount}) : {result.billed.join(', ') || '—'}</p>
        <p>
          {result.surDevis
            ? 'SUR DEVIS (surface > 200 m², aucun diag facturé, ou plus de 6 diagnostics).'
            : `Pack ${result.packCount} — ${formatPriceEUR(result.packPrice as number)} TTC`}
        </p>
        <p>
          Options hors-pack : {[form.mesurage && 'Mesurage', form.prelevement && 'Prélèvement'].filter(Boolean).join(', ') || 'Aucune'}
        </p>

        {result.surDevis ? (
          <a href="/contact" className="mt-3 inline-block rounded bg-ralBlue px-4 py-2 font-bold text-white">
            Nous contacter pour un devis personnalisé
          </a>
        ) : null}

        {hasPublicGoogleLink ? (
          <a className="mt-3 ml-3 inline-block rounded border border-ralBlue px-4 py-2 font-bold text-ralBlue" href={googleLink} target="_blank" rel="noreferrer">
            Demander un créneau
          </a>
        ) : (
          <div className="mt-3 rounded border p-3 text-sm">
            <p className="font-semibold">Demander un créneau (fallback)</p>
            <p>Choisissez 2 créneaux préférés, nous revenons vers vous :</p>
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              <input type="date" className="border p-2" aria-label="Créneau 1 date" />
              <input type="text" className="border p-2" placeholder="Créneau 1 plage horaire" />
              <input type="date" className="border p-2" aria-label="Créneau 2 date" />
              <input type="text" className="border p-2" placeholder="Créneau 2 plage horaire" />
            </div>
            <textarea className="mt-2 w-full border p-2" placeholder="Commentaire" />
          </div>
        )}
      </section>

      {done && <p className="font-semibold text-green-700">Demande enregistrée.</p>}
    </main>
  );
}
