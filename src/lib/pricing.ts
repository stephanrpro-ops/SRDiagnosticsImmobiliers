export type BilledDiagnostic =
  | 'dpe'
  | 'amiante'
  | 'plomb'
  | 'electricite'
  | 'gaz'
  | 'termites'
  | 'erp';

export type PackPrice = {
  count: 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
  priceTtc: number;
};

export type UnitPrice = {
  key: 'amiante' | 'plomb' | 'gaz' | 'electricite' | 'mesurage' | 'termites' | 'prelevement' | 'erp';
  label: string;
  priceTtc: number;
  isHorsPack?: boolean;
};

export const PACKS_TTC: PackPrice[] = [
  { count: 1, label: 'Pack 1 diag', priceTtc: 150 },
  { count: 2, label: 'Pack 2 diags', priceTtc: 230 },
  { count: 3, label: 'Pack 3 diags', priceTtc: 300 },
  { count: 4, label: 'Pack 4 diags', priceTtc: 360 },
  { count: 5, label: 'Pack 5 diags', priceTtc: 420 },
  { count: 6, label: 'Pack 6 diags', priceTtc: 470 }
];

export const UNIT_PRICES_TTC: UnitPrice[] = [
  { key: 'amiante', label: 'Repérage amiante', priceTtc: 100 },
  { key: 'plomb', label: 'CREP (plomb)', priceTtc: 100 },
  { key: 'gaz', label: 'Gaz', priceTtc: 90 },
  { key: 'electricite', label: 'Électricité', priceTtc: 90 },
  {
    key: 'mesurage',
    label: 'Mesurage surface habitable',
    priceTtc: 80,
    isHorsPack: true
  },
  { key: 'termites', label: 'État parasitaire (termites)', priceTtc: 80 },
  { key: 'prelevement', label: 'Forfait prélèvement', priceTtc: 60, isHorsPack: true },
  { key: 'erp', label: 'ERP', priceTtc: 25 }
];

export function getPackPrice(count: number): number | null {
  return PACKS_TTC.find((p) => p.count === count)?.priceTtc ?? null;
}

export function isOver200m2(surface: number): boolean {
  return surface > 200;
}

export function formatPriceEUR(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
}
