import Link from 'next/link';
import { Logo } from '@/components/brand/logo';

const nav = [
  ['Accueil', '/'],
  ['Vente', '/vente'],
  ['Location', '/location'],
  ['Diagnostics', '/diagnostics'],
  ['Copropriété (PPT/DTG)', '/copropriete'],
  ['Audit', '/audit'],
  ['Tarifs/Devis', '/devis'],
  ['À propos', '/a-propos'],
  ['Contact', '/contact']
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ralBlue/20 bg-white/95 backdrop-blur">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <p className="text-lg font-bold text-ralBlue sm:text-xl">SR Diagnostics Immobiliers</p>
        </div>

        <nav className="flex flex-wrap gap-2 text-sm font-medium">
          {nav.map(([label, href]) => (
            <Link className="rounded bg-ralBlue px-3 py-2 text-white" href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="tel:+33767076761" className="rounded-lg border border-ralBlue px-3 py-2 text-sm font-bold text-ralBlue">
            📞 07 67 07 67 61
          </a>
          <Link href="/devis" className="rounded-lg bg-ralBlue px-3 py-2 text-sm font-bold text-white">
            Demander un devis
          </Link>
        </div>
      </div>
    </header>
  );
}
