import Link from 'next/link';

const nav = [
  ['Accueil', '/'],
  ['Prestations', '/prestations'],
  ['Devis', '/devis'],
  ['Actualités', '/actualites'],
  ['Contact', '/contact'],
  ['Espace client', '/espace-client']
];

export function SiteHeader() {
  return (
    <header className="border-b border-ralBlue/20 bg-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
        <div>
          <p className="text-2xl font-bold text-ralBlue">SR Diagnostics Immobiliers</p>
          <p className="text-sm text-slate-600">Bâtir votre confiance dans les règles de l’art</p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm font-medium">
          {nav.map(([label, href]) => (
            <Link className="rounded bg-ralBlue px-3 py-2 text-white" href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
