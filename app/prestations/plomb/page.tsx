import { PrestationPage } from '@/components/prestation-page';

export default function Page() {
  return (
    <PrestationPage
      title="Plomb (CREP)"
      description="Contrôle du risque d’exposition au plomb dans les revêtements."
      mandatoryFor="Généralement concerné pour les biens construits avant 1949."
      includes={['Mesure via appareil adapté', 'Localisation des revêtements à risque', 'Synthèse et niveaux de risque']}
      process={['Brief propriétaire', 'Mesures sur zones pertinentes', 'Restitution du CREP']}
    />
  );
}
