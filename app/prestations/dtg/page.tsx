import { PrestationPage } from '@/components/prestation-page';

export default function Page() {
  return (
    <PrestationPage
      title="DTG (Diagnostic Technique Global)"
      description="Évaluation globale de l’état technique d’une copropriété."
      mandatoryFor="Peut être requis ou recommandé selon la situation de la copropriété."
      includes={['État apparent du bâti et équipements', 'Identification des points de vigilance', 'Support d’aide à la décision']}
      process={['Réunion de lancement', 'Visite et analyse', 'Rapport et présentation']}
    />
  );
}
