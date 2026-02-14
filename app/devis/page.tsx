'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { computeRecommendations, type WizardInput } from '@/lib/packs';

type Step = 'A' | 'B' | 'C' | 'D' | 'E';
type Suggestion = { label: string; postcode: string; city: string };

const initialData: WizardInput = {
  transaction: 'vente',
  property_type: 'maison',
  is_copro: false,
  address_label: '',
  postcode: '',
  city: '',
  surface: undefined,
  year_built: 2000,
  has_gas: false,
  has_electricity: true,
  heating: '',
  termites_known: 'inconnu'
};

export default function DevisPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>('A');
  const [data, setData] = useState<WizardInput>(initialData);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [slot, setSlot] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const result = useMemo(() => computeRecommendations(data), [data]);

  async function fetchAddress(value: string) {
    setData((prev) => ({ ...prev, address_label: value }));
    if (value.length < 4) return setSuggestions([]);

    const res = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&limit=5`
    );
    const json = await res.json();
    const next = (json.features ?? []).map((f: any) => ({
      label: f.properties.label,
      postcode: f.properties.postcode,
      city: f.properties.city
    }));
    setSuggestions(next);
  }

  async function submit() {
    if (!consent) {
      setStatus('Veuillez accepter le traitement RGPD avant envoi.');
      return;
    }
    if (!email) {
      setStatus('Veuillez renseigner un email.');
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    try {
      const payload = {
        data,
        result,
        consent_json: {
          accepted_rgpd: consent,
          slot,
          timestamp: new Date().toISOString()
        },
        contact: { name, email, phone }
      };

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/devis/merci');
        return;
      }

      const err = await res.json().catch(() => ({}));
      setStatus(err?.message || 'Erreur lors de l’envoi.');
    } catch {
      setStatus('Erreur réseau. Réessayez dans quelques secondes.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="container-page space-y-5">
      <h1 className="text-3xl font-bold text-ralBlue">Devis en ligne</h1>
      <p className="text-sm text-slate-600">
        Wizard en 5 étapes — moteur configurable via <code>/config/packs.json</code>.
      </p>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-500">Étape {step} / A→E</p>

        {step === 'A' && (
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <label>
              Type de demande
              <select
                className="mt-1 w-full rounded border p-2"
                value={data.transaction}
                onChange={(e) =>
                  setData({ ...data, transaction: e.target.value as WizardInput['transaction'] })
                }
              >
                <option value="vente">Vente</option>
                <option value="location">Location</option>
                <option value="travaux">Travaux</option>
                <option value="copropriete">Copropriété</option>
              </select>
            </label>

            <label>
              Type de bien
              <select
                className="mt-1 w-full rounded border p-2"
                value={data.property_type}
                onChange={(e) =>
                  setData({ ...data, property_type: e.target.value as WizardInput['property_type'] })
                }
              >
                <option value="maison">Maison</option>
                <option value="appartement">Appartement</option>
              </select>
            </label>

            <label className="md:col-span-2">
              <input
                type="checkbox"
                checked={data.is_copro}
                onChange={(e) => setData({ ...data, is_copro: e.target.checked })}
              />{' '}
              Bien en copropriété
            </label>
          </div>
        )}

        {step === 'B' && (
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <label className="md:col-span-2">
              Adresse
              <input
                className="mt-1 w-full rounded border p-2"
                value={data.address_label}
                onChange={(e) => fetchAddress(e.target.value)}
                placeholder="Saisissez une adresse"
              />
            </label>

            {suggestions.length > 0 && (
              <div className="md:col-span-2 rounded border p-2 text-sm">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="block w-full rounded px-2 py-1 text-left hover:bg-slate-100"
                    onClick={() => {
                      setData({ ...data, address_label: s.label, postcode: s.postcode, city: s.city });
                      setSuggestions([]);
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            <label>
              Surface (option)
              <input
                type="number"
                className="mt-1 w-full rounded border p-2"
                value={data.surface ?? ''}
                onChange={(e) =>
                  setData({ ...data, surface: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </label>

            <label>
              Année de construction
              <input
                type="number"
                className="mt-1 w-full rounded border p-2"
                value={data.year_built}
                onChange={(e) => setData({ ...data, year_built: Number(e.target.value) })}
              />
            </label>
          </div>
        )}

        {step === 'C' && (
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <label>
              <input
                type="checkbox"
                checked={data.has_gas}
                onChange={(e) => setData({ ...data, has_gas: e.target.checked })}
              />{' '}
              Installation gaz
            </label>

            <label>
              <input
                type="checkbox"
                checked={data.has_electricity}
                onChange={(e) => setData({ ...data, has_electricity: e.target.checked })}
              />{' '}
              Installation électrique
            </label>

            <label>
              Chauffage (placeholder)
              <input
                className="mt-1 w-full rounded border p-2"
                value={data.heating}
                onChange={(e) => setData({ ...data, heating: e.target.value })}
                placeholder="Ex: individuel gaz"
              />
            </label>

            <label>
              Zone termites
              <select
                className="mt-1 w-full rounded border p-2"
                value={data.termites_known}
                onChange={(e) =>
                  setData({ ...data, termites_known: e.target.value as WizardInput['termites_known'] })
                }
              >
                <option value="inconnu">Je ne sais pas</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </label>
          </div>
        )}

        {step === 'D' && (
          <div className="mt-3 space-y-3">
            <article className="rounded-xl bg-slate-50 p-4">
              <h2 className="font-semibold">Diagnostics recommandés</h2>
              <p className="mt-1">{result.diagnostics.join(', ')}</p>
              <p className="mt-2 text-sm text-slate-600">
                Prix: <strong>{result.pricing}</strong> (pas de grille fournie).
              </p>
            </article>

            <div className="grid gap-3 md:grid-cols-2">
              {result.packs.map((pack: any) => (
                <article key={pack.id} className="rounded-xl border p-4">
                  <h3 className="font-semibold text-ralBlue">{pack.name}</h3>
                  <p className="text-sm text-slate-600">{pack.description}</p>
                  <p className="mt-1 text-sm">Inclut: {pack.includes.join(', ')}</p>
                </article>
              ))}
            </div>

            <ul className="list-disc pl-6 text-sm text-slate-600">
              {result.reasons.map((reason: string) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        {step === 'E' && (
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <label>
              Nom
              <input className="mt-1 w-full rounded border p-2" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              Email
              <input
                type="email"
                className="mt-1 w-full rounded border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Téléphone
              <input className="mt-1 w-full rounded border p-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>

            <label>
              Préférence créneau
              <input
                className="mt-1 w-full rounded border p-2"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                placeholder="Ex: matin semaine"
              />
            </label>

            <label className="md:col-span-2">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />{' '}
              J’accepte le traitement de mes données (RGPD).
            </label>

            <button
              type="button"
              className="rounded bg-ralBlue px-4 py-2 font-bold text-white md:col-span-2 disabled:opacity-60"
              onClick={submit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi…' : 'Envoyer la demande'}
            </button>

            {status && <p className="md:col-span-2 text-sm">{status}</p>}
          </div>
        )}

        <div className="mt-6 flex gap-2">
          {step !== 'A' && (
            <button
              type="button"
              className="rounded border px-3 py-2"
              onClick={() => setStep(String.fromCharCode(step.charCodeAt(0) - 1) as Step)}
            >
              Précédent
            </button>
          )}
          {step !== 'E' && (
            <button
              type="button"
              className="rounded bg-ralBlue px-3 py-2 font-bold text-white"
              onClick={() => setStep(String.fromCharCode(step.charCodeAt(0) + 1) as Step)}
            >
              Suivant
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
