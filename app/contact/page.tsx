'use client';

import { FormEvent, useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(fd)) });
    setSent(true);
  }

  return (
    <main className="container-page">
      <h1 className="text-3xl font-bold text-ralBlue">Contact</h1>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 rounded-xl border bg-white p-6 md:max-w-2xl">
        <input name="hp" className="hidden" tabIndex={-1} autoComplete="off" />
        <input required name="name" className="border p-2" placeholder="Nom" />
        <input required name="email" className="border p-2" placeholder="Email" type="email" />
        <input required name="phone" className="border p-2" placeholder="Téléphone" />
        <textarea required name="message" className="border p-2" placeholder="Message" />
        <label><input required type="checkbox" /> J’accepte les <a href="/cgv" className="underline text-ralBlue">CGV</a></label>
        <label><input required type="checkbox" /> J’ai lu la <a href="/confidentialite" className="underline text-ralBlue">politique de confidentialité</a></label>
        <label><input type="checkbox" /> J’accepte d’être contacté par SMS</label>
        <button className="rounded bg-ralBlue px-4 py-2 font-bold text-white">Envoyer</button>
      </form>
      {sent && <p className="mt-3 text-green-700">Message envoyé.</p>}
    </main>
  );
}
