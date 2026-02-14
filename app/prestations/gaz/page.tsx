import { PrestationPage } from '@/components/prestation-page';

export default function Page() {
  return (
    <PrestationPage
      title="Gaz"
      description="État de l’installation intérieure de gaz."
      mandatoryFor="Indiqué en vente/location lorsque l’installation a plus de 15 ans (à confirmer)."
      includes={['Vérification organes de sécurité', 'Contrôle visuel des installations', 'Rapport des anomalies']}
      process={['Pré-qualification dossier', 'Inspection technique', 'Remise du diagnostic']}
    />
  );
}
