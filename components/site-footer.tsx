import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ralBlue/20 bg-white">
      <div className="container-page text-sm text-slate-700">
        <p className="font-semibold">SR Diagnostics Immobiliers — Raspado Stephan</p>
        <p>328 boulevard Fosse 2, 62320 Rouvroy, France</p>
        <p>07 67 07 67 61 · stephanr.pro@gmail.com · Lun–Dim 8h–20h</p>
        <div className="mt-2 flex flex-wrap gap-4">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Politique de confidentialité</Link>
          <Link href="/cgv">CGV</Link>
          <a href="#" aria-label="Réseau social" className="text-slate-500">Réseaux (placeholder)</a>
        </div>
      </div>
    </footer>
  );
}
