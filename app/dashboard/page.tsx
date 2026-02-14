import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="container-page space-y-4">
      <h1 className="text-3xl font-bold text-ralBlue">Dashboard</h1>
      <p className="text-slate-700">Route protégée (MVP): redirection selon rôle utilisateur Supabase.</p>
      <div className="grid gap-3 md:grid-cols-2">
        <Link href="/client" className="rounded-xl border bg-white p-5 shadow-sm">Accéder à l’espace client</Link>
        <Link href="/admin" className="rounded-xl border bg-white p-5 shadow-sm">Accéder à l’espace admin</Link>
      </div>
    </main>
  );
}
