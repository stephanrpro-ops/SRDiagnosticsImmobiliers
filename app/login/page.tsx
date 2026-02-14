import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="container-page max-w-xl space-y-4">
      <h1 className="text-3xl font-bold text-ralBlue">Connexion</h1>
      <p className="text-slate-700">MVP : branchez Supabase Auth (email magic link ou mot de passe) via variables d’environnement.</p>
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <label className="block">Email
          <input className="mt-1 w-full rounded border p-2" type="email" placeholder="vous@exemple.fr" />
        </label>
        <button className="mt-3 rounded bg-ralBlue px-4 py-2 font-bold text-white" type="button">Envoyer le lien de connexion</button>
      </div>
      <p className="text-sm">Après connexion, redirection vers <Link className="text-ralBlue underline" href="/dashboard">/dashboard</Link>.</p>
    </main>
  );
}
