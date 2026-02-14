import { PrestationPage } from '@/components/prestation-page';

export default function Page() {
  return (
    <PrestationPage
      title="Termites"
      description="État parasitaire ciblant notamment le risque termites selon zone."
      mandatoryFor="Selon arrêtés locaux et contexte du bien."
      includes={['Inspection visuelle des éléments bois', 'Repérage d’indices d’infestation', 'Compte-rendu de constat']}
      process={['Qualification du besoin', 'Intervention sur site', 'Rapport sous 24h placeholder']}
    />
  );
}
