import { debugData } from '../../../utils/debugData';
import { MenuSettings } from '../../../typings';

export const debugMenu = () => {
  debugData([
    {
      action: 'setMenu',
      data: {
        title: "Benny's",
        bannerIcon: 'https://media.discordapp.net/attachments/638717586200330240/1411049368446046218/image.png?ex=68b33da1&is=68b1ec21&hm=520f17df55471dcd1d37e2e10ebe0f9fd2cd695b68c7b2fbbf7b018a5212852f&=&format=webp&quality=lossless',
        items: [
          {
            label: 'Inspection Véhicule',
            icon: 'magnifying-glass',
            description: 'Diagnostic complet de votre véhicule'
          },
          {
            label: 'Attache véhicule',
            icon: 'wrench',
            description: 'Réparer les dommages critiques immédiatement',
            checked: true,
          },
          {
            label: 'Catégorie de Véhicule',
            values: [
              'Berline',
              'SUV Urbain',
              { label: 'Véhicule de Sport', description: 'Performances élevées' },
              { label: 'Utilitaire', description: 'Transport de marchandises' }
            ],
            icon: 'car',
            description: 'Sélectionnez le type de véhicule pour un service adapté',
          },
          {
            label: 'Niveau de Carburant',
            progress: 45,
            icon: 'gas-pump',
            description: 'Carburant restant: 45L sur 100L',
            colorScheme: 'orange',
          },
          {
            label: 'État de la Carrosserie',
            progress: 75,
            icon: 'car-side',
            description: 'Intégrité structurelle: Bon état général',
            colorScheme: 'green',
            iconColor: '#2d5a27',
          },
          {
            label: 'Contrôle Technique',
            progress: 90,
            icon: 'clipboard-check',
            description: 'Conformité réglementaire: Valide',
            colorScheme: 'blue',
          },
          {
            label: 'Custom',
            icon: 'palette',
            description: 'Modifications esthétiques et performances'
          },
          {
            label: 'Assurance Véhicule',
            icon: 'shield-halved',
            description: 'Vérifier et renouveler votre couverture'
          },
          {
            label: 'Classe de Permis Requis',
            values: ['Permis B (Standard)', 'Permis C (Poids Lourds)', 'Permis D (Transport)'],
            defaultIndex: 0,
            icon: 'id-card',
            description: 'Vérification des autorisations de conduite'
          },
          {
            label: 'Historique d\'Entretien',
            icon: 'clock-rotate-left',
            description: 'Consulter les interventions précédentes'
          },
          {
            label: 'Devis Réparations',
            icon: 'calculator',
            description: 'Estimation des coûts de remise en état'
          },
          {
            label: 'Type d\'Intervention',
            values: [
              'Entretien Préventif',
              'Réparation d\'Urgence',
              'Modification Performance',
              'Restauration Complète'
            ],
            icon: 'tools',
            description: 'Choisissez le service approprié à vos besoins'
          },
          {
            label: 'Garantie Constructeur',
            progress: 60,
            icon: 'certificate',
            description: 'Couverture garantie restante: 24 mois',
            colorScheme: 'purple',
          }
        ],
      },
    },
  ]);
};