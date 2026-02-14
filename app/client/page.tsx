const missions = [
  { id: 'MIS-001', address: '328 boulevard Fosse 2, 62320 Rouvroy', date: '2026-03-12', status: 'rapport_envoye', docs: ['rapport-dpe.pdf'] }
];

export default function ClientPage() {
  return (
    <main className="container-page space-y-4">
      <h1 className="text-3xl font-bold text-ralBlue">Espace client</h1>
      <p className="text-slate-700">Vos missions, documents PDF et suivi de facturation.</p>
      {missions.map((mission) => (
        <article key={mission.id} className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Mission {mission.id}</h2>
          <p className="text-sm">{mission.address} · {mission.date} · statut: {mission.status}</p>
          <p className="mt-2 text-sm">Documents: {mission.docs.join(', ')}</p>
          <div className="mt-3 flex gap-2">
            <button className="rounded border px-3 py-2" type="button">Prévisualiser PDF</button>
            <button className="rounded bg-ralBlue px-3 py-2 font-semibold text-white" type="button">Télécharger</button>
          </div>
        </article>
      ))}
      <button className="rounded border px-4 py-2" type="button">Contacter SR Diagnostics</button>
    </main>
  );
}
