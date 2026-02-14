import packsConfig from '@/config/packs.json';

export type WizardInput = {
  transaction: 'vente' | 'location' | 'travaux' | 'copropriete';
  property_type: 'maison' | 'appartement';
  is_copro: boolean;
  address_label: string;
  postcode: string;
  city: string;
  surface?: number;
  year_built: number;
  has_gas: boolean;
  has_electricity: boolean;
  heating: string;
  termites_known: 'oui' | 'non' | 'inconnu';
};

type Rule = {
  if: {
    year_built?: { lt?: number; lte?: number; gt?: number; gte?: number };
    has_gas?: boolean;
    has_electricity?: boolean;
    transaction?: string[];
  };
  suggest_add: string[];
  reason?: string;
};

function matchRule(input: WizardInput, rule: Rule): boolean {
  const cond = rule.if;
  if (cond.year_built) {
    const y = input.year_built;
    if (typeof cond.year_built.lt === 'number' && !(y < cond.year_built.lt)) return false;
    if (typeof cond.year_built.lte === 'number' && !(y <= cond.year_built.lte)) return false;
    if (typeof cond.year_built.gt === 'number' && !(y > cond.year_built.gt)) return false;
    if (typeof cond.year_built.gte === 'number' && !(y >= cond.year_built.gte)) return false;
  }
  if (typeof cond.has_gas === 'boolean' && cond.has_gas !== input.has_gas) return false;
  if (typeof cond.has_electricity === 'boolean' && cond.has_electricity !== input.has_electricity) return false;
  if (cond.transaction && !cond.transaction.includes(input.transaction)) return false;
  return true;
}

export function computeRecommendations(input: WizardInput) {
  const diagnostics = new Set<string>(['erp']);
  const reasons: string[] = ['ERP inclus par défaut'];

  for (const rule of packsConfig.rules as Rule[]) {
    if (matchRule(input, rule)) {
      rule.suggest_add.forEach((d) => diagnostics.add(d));
      if (rule.reason) reasons.push(rule.reason);
    }
  }

  if (input.termites_known === 'oui') {
    diagnostics.add('termites');
    reasons.push('Zone termites confirmée');
  }

  if (input.termites_known === 'inconnu') {
    reasons.push(packsConfig.defaults.unknown_choice_message);
  }

  const packs = (packsConfig.packs as any[])
    .filter((pack) => {
      const when = pack.when ?? {};
      if (when.transaction && !when.transaction.includes(input.transaction)) return false;
      if (typeof when.has_gas === 'boolean' && when.has_gas !== input.has_gas) return false;
      if (typeof when.has_electricity === 'boolean' && when.has_electricity !== input.has_electricity) return false;
      if (typeof when.is_copro === 'boolean' && when.is_copro !== input.is_copro) return false;
      return true;
    })
    .slice(0, 4);

  if (!packs.length) {
    const fallback = (packsConfig.packs as any[]).find((p) => p.id === packsConfig.defaults.fallback_pack);
    if (fallback) packs.push(fallback);
  }

  return {
    diagnostics: Array.from(diagnostics),
    packs,
    reasons,
    pricing: 'sur devis'
  };
}
