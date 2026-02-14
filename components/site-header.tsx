import Link from 'next/link';
import { Logo } from '@/components/brand/logo';

const nav = [
  ['Accueil', '/'],
  ['Prestations', '/prestations'],
  ['Devis', '/devis'],
  ['Actualités', '/actualites'],
  ['Valeurs', '/valeurs'],
  ['Contact', '/contact'],
  ['Espace client', '/client'],
  ['Admin', '/admin']
];

export function SiteHeader() {
  return (
    <header className="border-b border-ralBlue/20 bg-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
        <div className="flex items-center gap-3">
          <Logo className="h-11 w-11" />
          <div>
            <p className="text-2xl font-bold text-ralBlue">SR Diagnostics Immobiliers</p>
            <p className="text-sm text-slate-600">Bâtir votre confiance dans les règles de l’art</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm font-medium">
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
