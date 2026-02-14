'use client';

import { useState } from 'react';

export default function EspaceClientPage() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');

  async function validate() {
    const res = await fetch('/api/token/validate', { method: 'POST', body: JSON.stringify({ token }) });
    const data = await res.json();
    setStatus(data.message);
  }

  return (
    <main className="container-page">
      <h1 className="text-3xl font-bold text-ralBlue">Espace client (accès par token)</h1>
      <div className="mt-4 rounded-xl border bg-white p-6 md:max-w-xl">
        <input className="w-full border p-2" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />
        <button onClick={validate} className="mt-3 rounded bg-ralBlue px-4 py-2 font-bold text-white">Valider</button>
        {status && <p className="mt-2">{status}</p>}
        <p className="mt-4 text-sm">Token invalide/expiré ? Demandez un nouveau lien via le formulaire contact.</p>
      </div>
    </main>
  );
}
