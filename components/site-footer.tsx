import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ralBlue/20 bg-white">
      <div className="container-page text-sm text-slate-700">
        <p className="font-semibold">SR Diagnostics Immobiliers — 07 67 07 67 61 — stephanr.pro@gmail.com</p>
        <p>Lundi–Dimanche 8h–20h · Arras, Lens, Hénin, Beaumont, Douai, Béthune (50 km)</p>
        <div className="mt-2 flex gap-4">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Confidentialité</Link>
          <Link href="/cgv">CGV</Link>
        </div>
      </div>
    </footer>
  );
}
