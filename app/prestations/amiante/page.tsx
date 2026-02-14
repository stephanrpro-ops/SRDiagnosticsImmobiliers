import { PrestationPage } from '@/components/prestation-page';

export default function Page() {
  return (
    <PrestationPage
      title="Amiante"
      description="Repérage des matériaux susceptibles de contenir de l’amiante dans les bâtiments anciens."
      mandatoryFor="Souvent requis pour les biens dont le permis est antérieur à 1997."
      includes={['Repérage visuel des matériaux listés', 'Évaluation de l’état de conservation', 'Préconisations de gestion du risque']}
      process={['Préparation des informations du bien', 'Inspection sur place', 'Remise du rapport']}
    />
  );
}
