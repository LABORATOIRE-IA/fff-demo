import { AppNotification } from '../types/ams';

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'mention',
    title: 'Zinédine Zidane vous a mentionné',
    message: '« Penser à le ménager sur la 2e mi-temps face à l’Espagne... »',
    timestamp: 'Il y a 10 min',
    read: false,
    targetView: 'joueur_360',
    targetParams: { playerId: 'dupont' },
    commentId: 'comm-1',
    authorName: 'Zinédine Zidane',
    authorRole: 'Sélectionneur National'
  },
  {
    id: 'notif-2',
    type: 'new_note',
    title: 'Nouvelle note médicale sur Mathis Dupont',
    message: 'Dr. Franck Le Gall : Échographie de contrôle négative, feu vert complet 100%.',
    timestamp: 'Il y a 35 min',
    read: false,
    targetView: 'joueur_360',
    targetParams: { playerId: 'dupont' },
    commentId: 'comm-2',
    authorName: 'Dr. Franck Le Gall',
    authorRole: 'Médecin FFF'
  },
  {
    id: 'notif-3',
    type: 'data_insertion',
    title: 'Synchronisation Catapult Vector réussie',
    message: 'Flux GPS 10 Hz importé : 24 joueurs synchronisés (Séance Vitesse J-2).',
    timestamp: 'Il y a 1h',
    read: false,
    targetView: 'matchs_entrainements',
    targetParams: { tab: 'entrainements' }
  },
  {
    id: 'notif-4',
    type: 'mention',
    title: 'Nouvelle note tactique sur le Match',
    message: 'David Bettoni sur France vs Espagne : « Insister sur le repli immédiat du milieu droit... »',
    timestamp: 'Hier à 18:42',
    read: true,
    targetView: 'detail_match',
    targetParams: { matchId: 'match-1' },
    commentId: 'comm-4',
    authorName: 'David Bettoni',
    authorRole: 'Premier Entraîneur Adjoint'
  },
  {
    id: 'notif-5',
    type: 'medical_alert',
    title: 'Mise à jour statut médical',
    message: 'Adrien Rabiot : Bilan de fatigue post-match validé sans complication.',
    timestamp: 'Hier à 14:10',
    read: true,
    targetView: 'suivi_medical',
    targetParams: { playerId: 'rabiot' }
  }
];
