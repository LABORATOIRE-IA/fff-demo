import { CollaborativeComment } from '../types/ams';

export const INITIAL_COLLABORATIVE_COMMENTS: CollaborativeComment[] = [
  {
    id: 'comm-1',
    targetType: 'player',
    targetId: 'dupont',
    targetTitle: 'Mathis Dupont',
    subSection: 'Charge & Temps de Jeu',
    authorName: 'Zinédine Zidane',
    authorRole: 'Sélectionneur National',
    content: 'Penser à le ménager sur la 2e mi-temps du prochain match amical (sortir à la 65e min max). Sa fraîcheur sera notre arme clé pour le choc face à l’Espagne.',
    createdAt: 'Hier à 18:42',
    resolved: false,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Alexandre Germain',
        authorRole: 'Préparateur Physique',
        content: 'Bien noté coach. Son ACWR est à 1.05 aujourd’hui, le protocole de régulation de charge est calé avec le staff club.',
        createdAt: 'Hier à 19:15'
      }
    ]
  },
  {
    id: 'comm-2',
    targetType: 'player',
    targetId: 'dupont',
    targetTitle: 'Mathis Dupont',
    subSection: 'Bilan Médical & Ischios',
    authorName: 'Dr. Franck Le Gall',
    authorRole: 'Médecin FFF',
    content: 'Échographie de contrôle réalisée ce matin à Clairefontaine : aucune trace de cicatrice fibreuse sur les ischio-jambiers. Feu vert médical complet pour 100% d’intensité.',
    createdAt: 'Ce matin à 08:30',
    resolved: true,
    replies: [
      {
        id: 'rep-2',
        authorName: 'Zinédine Zidane',
        authorRole: 'Sélectionneur National',
        content: 'Parfait Franck, merci pour la confirmation rapide.',
        createdAt: 'Ce matin à 09:10'
      }
    ]
  },
  {
    id: 'comm-3',
    targetType: 'dimension',
    targetId: 'charge',
    targetTitle: 'Mathis Dupont - Charge & GPS',
    subSection: 'Sprints haute vélocité (>25 km/h)',
    authorName: 'Alexandre Germain',
    authorRole: 'Préparateur Physique',
    content: 'Très bonne explosivité constatée sur les tests GPS 10 Hz d’hier : 34.6 km/h en pointe sur le contre. Les temps d’accélération sur 10m sont meilleurs qu’au rassemblement d’octobre.',
    createdAt: 'Hier à 16:20',
    resolved: false,
    replies: []
  },
  {
    id: 'comm-4',
    targetType: 'match',
    targetId: 'match-1',
    targetTitle: 'France vs Espagne (Ligue des Nations)',
    subSection: 'Animation offensive axe droit',
    authorName: 'David Bettoni',
    authorRole: 'Premier Entraîneur Adjoint',
    content: 'Sur les transitions adverses, insister sur le repli immédiat du milieu droit. Mathis a un excellent volume défensif mais doit couper la passe intérieure plus vite.',
    createdAt: '26/09/2026 à 14:15',
    resolved: false,
    replies: []
  },
  {
    id: 'comm-5',
    targetType: 'training',
    targetId: 'train-1',
    targetTitle: 'Séance Tactique & Intensité J-2',
    subSection: 'Gestion de l’effort collectif',
    authorName: 'Tomy Connery',
    authorRole: 'Directeur de la Performance',
    content: 'Séance validée à 640 UA de moyenne collective. Données transmises aux staffs de club partenaires sans anomalie.',
    createdAt: '25/09/2026 à 20:00',
    resolved: true,
    replies: []
  }
];
