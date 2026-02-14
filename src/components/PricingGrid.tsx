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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-extrabold text-ralBlue">Packs TTC</h2>
        <Badge>Grille codée (sans image)</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PACKS_TTC.map((pack) => (
          <Card key={pack.count}>
            <CardHeader>
              <CardTitle>{pack.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-ralBlue">{formatPriceEUR(pack.priceTtc)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!compact && (
        <>
          <h3 className="text-xl font-bold text-ralBlue">Tarifs unitaires TTC</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {UNIT_PRICES_TTC.map((item) => (
              <Card key={item.key} className="border-slate-200">
                <CardContent className="flex items-center justify-between pt-4">
                  <p className="font-medium">{item.label}</p>
                  <div className="text-right">
                    <p className="font-bold text-ralBlue">{formatPriceEUR(item.priceTtc)}</p>
                    {item.isHorsPack ? <Badge className="mt-1">Hors-pack</Badge> : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
        <li>DPE seul = Pack 1 (150 €)</li>
        <li>Surface >200m² : sur devis</li>
        <li>Mesurage & prélèvement : options hors-pack</li>
      </ul>

      <Button onClick={() => router.push('/devis')}>Devis en ligne</Button>
    </section>
  );
}
