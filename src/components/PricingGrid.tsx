'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPriceEUR, PACKS_TTC, UNIT_PRICES_TTC } from '@/src/lib/pricing';

export function PricingGrid({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  return (
    <section className="space-y-5 rounded-xl border border-ralBlue/20 bg-white p-5">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-ralBlue">GRILLE TARIFAIRE</h2>
        <p className="text-lg font-semibold">Tarifs TTC</p>
        <p className="mt-2 text-slate-700">
          Tarifs dégressifs en fonction du nombre de diagnostics programmés lors d&apos;une même intervention.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Badge>Tarifs mis en page sur le site</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PACKS_TTC.map((pack) => (
          <Card key={pack.count}>
            <CardHeader>
              <CardTitle>{pack.label.replace('diag', 'diagnostic').replace('diags', 'diagnostics')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-ralBlue">{formatPriceEUR(pack.priceTtc)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!compact && (
        <>
          <h3 className="text-xl font-bold text-ralBlue">Tarifs unitaires</h3>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-ralBlue text-white">
                <tr>
                  <th className="px-4 py-2">Prestation</th>
                  <th className="px-4 py-2">Tarif</th>
                </tr>
              </thead>
              <tbody>
                {UNIT_PRICES_TTC.map((item) => (
                  <tr key={item.key} className="border-t border-slate-200">
                    <td className="px-4 py-2">{item.label}</td>
                    <td className="px-4 py-2 font-semibold text-ralBlue">{formatPriceEUR(item.priceTtc)}</td>
                  </tr>
                ))}
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-2">À partir de 200 m²</td>
                  <td className="px-4 py-2 font-semibold text-ralBlue">Sur devis</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Des prélèvements peuvent être effectués dans le cadre des diagnostics amiante et plomb : 60 € TTC.</li>
            <li>Les biens dont la surface dépasse 200 m² font l&apos;objet d&apos;un devis personnalisé.</li>
          </ul>
        </>
      )}

      <Button onClick={() => router.push('/devis')}>Devis en ligne</Button>
    </section>
  );
}
