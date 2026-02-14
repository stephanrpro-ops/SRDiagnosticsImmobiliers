import { PrestationPage } from '@/components/prestation-page';

export default function Page() {
  return (
    <PrestationPage
      title="DPE"
      description="Le Diagnostic de Performance Énergétique évalue la consommation du logement et ses émissions."
      mandatoryFor="Vente ou location d’un bien résidentiel, sauf exceptions prévues par la réglementation."
      includes={['Analyse énergétique du bien', 'Classement énergie/climat', 'Recommandations d’amélioration (indicatives)']}
      process={['Prise de rendez-vous', 'Visite et relevés', 'Calcul et édition du rapport']}
    />
  );
}
