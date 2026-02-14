import { PrestationPage } from '@/components/prestation-page';

export default function Page() {
  return (
    <PrestationPage
      title="ERP"
      description="État des Risques et Pollutions (ERP) à partir des données réglementaires."
      mandatoryFor="Souvent requis en vente/location pour informer l’acquéreur ou locataire."
      includes={['Compilation des informations réglementaires', 'Mise en forme ERP', 'Vérification cohérence du dossier']}
      process={['Collecte des informations d’adresse', 'Édition de l’ERP', 'Transmission au client']}
    />
  );
}
