import { PrestationPage } from '@/components/prestation-page';

export default function Page() {
  return (
    <PrestationPage
      title="Électricité"
      description="État de l’installation intérieure d’électricité."
      mandatoryFor="Indiqué en vente/location lorsque l’installation a plus de 15 ans (à confirmer)."
      includes={['Contrôle des points de sécurité', 'Vérification visuelle sans démontage lourd', 'Rapport d’anomalies constatées']}
      process={['Collecte d’informations', 'Visite technique', 'Rapport et explications']}
    />
  );
}
