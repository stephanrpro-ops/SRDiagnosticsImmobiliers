export default function AdminPage() {
  return (
    <main className="container-page space-y-4">
      <h1 className="text-3xl font-bold text-ralBlue">Admin</h1>
      <p>Écran MVP pour gestion clients, missions, documents PDF, factures et tokens (Supabase requis).</p>
      <ul className="list-disc rounded-xl border bg-white p-6 pl-10">
        <li>CRUD clients/propriétés/missions</li>
        <li>Upload PDF privé et rattachement mission</li>
        <li>Factures: payée / en_attente / impayée + lien de paiement</li>
        <li>Génération/révocation token client (1 token actif)</li>
        <li>Veille réglementaire: brouillons RSS + publication</li>
      </ul>
    </main>
  );
}
