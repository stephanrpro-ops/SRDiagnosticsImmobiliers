import { PrestationPage } from '@/components/prestation-page';

export default function Page() {
  return (
    <PrestationPage
      title="PPT (Projet de Plan Pluriannuel de Travaux)"
      description="Orientation copropriété pour anticiper les travaux à moyen/long terme."
      mandatoryFor="Copropriétés concernées selon taille/ancienneté et obligations en vigueur."
      includes={['Analyse documentaire de la copropriété', 'Préconisations de planification', 'Aide à la priorisation']}
      process={['Cadrage avec le syndic', 'Collecte des données', 'Restitution des axes de travaux']}
    />
  );
}
