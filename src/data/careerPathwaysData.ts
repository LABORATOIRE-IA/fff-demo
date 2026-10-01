export interface CareerMilestone {
  id: string;
  year: string;
  date: string;
  age: number;
  category: 'detection_fff' | 'espoirs_jeunes' | 'selection_a' | 'rassemblement' | 'club_transfert' | 'titre_trophee';
  title: string;
  subtitle: string;
  description: string;
  source: string;
  location?: string;
  stats?: {
    matchCount?: number;
    goals?: number;
    assists?: number;
    minutes?: number;
    competition?: string;
    opponent?: string;
    score?: string;
  };
  coachNote?: string;
  badgeLabel?: string;
  relatedType?: 'match' | 'training' | 'rassemblement' | 'medical';
  relatedId?: string;
}

export interface PlayerCareerProfile {
  playerId: string;
  playerName: string;
  firstDetectionYear: string;
  firstSeniorCallupDate: string;
  seniorDebutDate: string;
  seniorDebutOpponent: string;
  youthCapsTotal: number;
  seniorCapsTotal: number;
  seniorGoalsTotal: number;
  seniorAssistsTotal: number;
  rassemblementsCount: number;
  trophies: string[];
  formationClub: string;
  poleEspoir?: string;
  milestones: CareerMilestone[];
}

export const CAREER_PATHWAYS_DATA: Record<string, PlayerCareerProfile> = {
  dembele: {
    playerId: 'dembele',
    playerName: 'Ousmane Dembélé',
    firstDetectionYear: '2011',
    firstSeniorCallupDate: 'Août 2016',
    seniorDebutDate: '1er Septembre 2016',
    seniorDebutOpponent: 'Italie (Bari, 3-1)',
    youthCapsTotal: 20,
    seniorCapsTotal: 53,
    seniorGoalsTotal: 6,
    seniorAssistsTotal: 14,
    rassemblementsCount: 38,
    trophies: ['Coupe du Monde 2018 🏆', 'Ligue des Nations 2021 🏆', 'Finaliste Coupe du Monde 2022 🥈'],
    formationClub: 'Stade Rennais FC',
    poleEspoir: 'Pôle Espoirs Bretagne (Ploufragan)',
    milestones: [
      {
        id: 'dem-01',
        year: '2011',
        date: 'Octobre 2011',
        age: 14,
        category: 'detection_fff',
        title: 'Détection DTN Bretagne & Entrée Pôle Espoirs',
        subtitle: 'Identification territoriale DTN FFF',
        description: 'Repéré lors de la coupe nationale U14 pour ses qualités d’accélération et son ambidextrie exceptionnelle. Intégration au Pôle Espoirs FFF de Ploufragan.',
        source: 'DTN / FFF Détection',
        location: 'Ploufragan / Rennes',
        coachNote: 'Vitesse de percussion hors norme, capacité rare à éliminer des deux pieds sans ralentir.'
      },
      {
        id: 'dem-02',
        year: '2013',
        date: 'Mars 2013',
        age: 16,
        category: 'espoirs_jeunes',
        title: 'Première sélection en Équipe de France U17',
        subtitle: 'France U17 vs Allemagne U17 (2-1)',
        description: 'Première cape officielle sous le maillot tricolore en sélection de jeunes. Auteur d’une passe décisive.',
        source: 'FFF Sélections Jeunes',
        stats: { matchCount: 8, goals: 4, competition: 'Qualif Euro U17' },
        coachNote: 'Excellente intégration tactique dans le couloir droit.'
      },
      {
        id: 'dem-03',
        year: '2015',
        date: 'Novembre 2015',
        age: 18,
        category: 'club_transfert',
        title: 'Débuts professionnels et éclosion fulgurante',
        subtitle: 'Stade Rennais FC • Ligue 1',
        description: 'Premier match pro en Ligue 1 contre Angers. Triplé mémorable contre le FC Nantes et élu meilleur espoir de Ligue 1.',
        source: 'LFP / Stade Rennais',
        stats: { matchCount: 26, goals: 12, assists: 5 }
      },
      {
        id: 'dem-04',
        year: '2016',
        date: 'Juillet 2016',
        age: 19,
        category: 'club_transfert',
        title: 'Transfert au Borussia Dortmund',
        subtitle: 'Bundesliga & UEFA Champions League',
        description: 'Transfert majeur vers le Borussia Dortmund. Vainqueur de la Coupe d’Allemagne (DFB Pokal).',
        source: 'Transfert International',
        stats: { matchCount: 49, goals: 10, assists: 21 }
      },
      {
        id: 'dem-05',
        year: '2016',
        date: '1er Septembre 2016',
        age: 19,
        category: 'selection_a',
        title: 'Première sélection en Équipe de France A',
        subtitle: 'Italie 1 - 3 France • Match amical à Bari',
        description: 'Zinédine Zidane le fait entrer à la 63e minute à la place d’Antoine Griezmann. Première apparition chez les Bleus.',
        source: 'FFF / Équipe de France A',
        location: 'Stadio San Nicola, Bari',
        stats: { minutes: 27, competition: 'Match International', opponent: 'Italie', score: '1-3' },
        coachNote: 'Entrée pleine de vivacité, a dynamisé le flanc droit sur les transitions rapides.'
      },
      {
        id: 'dem-06',
        year: '2017',
        date: '13 Juin 2017',
        age: 20,
        category: 'selection_a',
        title: 'Premier but avec les Bleus contre l’Angleterre',
        subtitle: 'France 3 - 2 Angleterre • Stade de France',
        description: 'Frappe croisée décisive du pied droit à la 78e minute sur une passe de Kylian Mbappé pour offrir la victoire.',
        source: 'FFF / Match Officiel',
        location: 'Stade de France, Saint-Denis',
        stats: { goals: 1, minutes: 90, opponent: 'Angleterre', score: '3-2' }
      },
      {
        id: 'dem-07',
        year: '2017',
        date: 'Août 2017',
        age: 20,
        category: 'club_transfert',
        title: 'Signature au FC Barcelone',
        subtitle: 'La Liga & Camp Nou',
        description: 'Transfert record au FC Barcelone. 3 titres de champion d’Espagne (2018, 2019, 2023) et 2 Coupes du Roi.',
        source: 'La Liga'
      },
      {
        id: 'dem-08',
        year: '2018',
        date: 'Juin — Juillet 2018',
        age: 21,
        category: 'titre_trophee',
        title: 'Champion du Monde 2018 en Russie 🏆',
        subtitle: 'Coupe du Monde de la FIFA 2018',
        description: 'Titulaire lors du match d’ouverture contre l’Australie et participant actif à la conquête de la 2e étoile.',
        source: 'FIFA / FFF',
        location: 'Russie',
        stats: { matchCount: 4, minutes: 165, competition: 'Coupe du Monde 2018' }
      },
      {
        id: 'dem-09',
        year: '2022',
        date: 'Novembre — Décembre 2022',
        age: 25,
        category: 'titre_trophee',
        title: 'Finaliste de la Coupe du Monde 2022 au Qatar 🥈',
        subtitle: 'Titulaire indiscutable sur le flanc droit',
        description: 'Titulaire sur 6 des 7 rencontres du tournoi mondial, artisan clé du parcours jusqu’en finale face à l’Argentine.',
        source: 'FIFA / FFF',
        location: 'Qatar',
        stats: { matchCount: 7, assists: 2, minutes: 438 }
      },
      {
        id: 'dem-10',
        year: '2023',
        date: 'Août 2023',
        age: 26,
        category: 'club_transfert',
        title: 'Signature au Paris Saint-Germain',
        subtitle: 'Retour en France • Parc des Princes',
        description: 'Rejoint le PSG, champion de France 2024 et meilleur passeur décisif du championnat.',
        source: 'LFP / PSG'
      },
      {
        id: 'dem-11',
        year: '2024',
        date: 'Juin — Juillet 2024',
        age: 27,
        category: 'rassemblement',
        title: 'Euro 2024 en Allemagne • Demi-finaliste',
        subtitle: 'Campagne européenne avec les Bleus',
        description: 'Élu Homme du Match contre le Portugal en quart de finale grâce à une entrée décisive.',
        source: 'UEFA / FFF',
        location: 'Hambourg / Munich',
        stats: { matchCount: 5, minutes: 310, competition: 'UEFA Euro 2024' }
      },
      {
        id: 'dem-12',
        year: '2026',
        date: 'Mars 2026',
        age: 28,
        category: 'rassemblement',
        title: 'Rassemblement International Mars 2026',
        subtitle: 'Clairefontaine • Préparation Coupe du Monde 2026',
        description: 'Convoqué au rassemblement officiel FFF. Suivi spécifique de charge ischio-jambiers géré par le Dr. Le Gall.',
        source: 'AMS 360 Clairefontaine',
        location: 'Centre National du Football',
        relatedType: 'rassemblement',
        coachNote: 'Disponibilité 74%, gestion du temps de jeu sur 60 minutes contre l’Allemagne.'
      }
    ]
  },
  mbappe: {
    playerId: 'mbappe',
    playerName: 'Kylian Mbappé',
    firstDetectionYear: '2009',
    firstSeniorCallupDate: 'Mars 2017',
    seniorDebutDate: '25 Mars 2017',
    seniorDebutOpponent: 'Luxembourg (3-1)',
    youthCapsTotal: 13,
    seniorCapsTotal: 86,
    seniorGoalsTotal: 48,
    seniorAssistsTotal: 34,
    rassemblementsCount: 52,
    trophies: ['Coupe du Monde 2018 🏆', 'Ligue des Nations 2021 🏆', 'Soulier d’Or Mondial 2022 ⚽', 'Finaliste Mondial 2022 🥈'],
    formationClub: 'AS Monaco / INF Clairefontaine',
    poleEspoir: 'INF Clairefontaine (Promotion 1998)',
    milestones: [
      {
        id: 'mbp-01',
        year: '2011',
        date: 'Septembre 2011',
        age: 12,
        category: 'detection_fff',
        title: 'Entrée à l’INF Clairefontaine',
        subtitle: 'Institut National du Football • FFF',
        description: 'Admis dans la prestigieuse académie fédérale de Clairefontaine après les tests de détection DTN.',
        source: 'DTN / INF Clairefontaine',
        coachNote: 'Vitesse de prise de décision et d’exécution au-dessus des standards d’âge.'
      },
      {
        id: 'mbp-02',
        year: '2016',
        date: 'Juillet 2016',
        age: 17,
        category: 'espoirs_jeunes',
        title: 'Champion d’Europe U19 avec la France 🏆',
        subtitle: 'Euro U19 en Allemagne',
        description: 'Artisan majeur du titre européen avec 5 buts marqués, dont un doublé décisif en demi-finale.',
        source: 'UEFA / FFF',
        stats: { matchCount: 5, goals: 5, competition: 'Euro U19' }
      },
      {
        id: 'mbp-03',
        year: '2017',
        date: '25 Mars 2017',
        age: 18,
        category: 'selection_a',
        title: 'Première cape en Équipe de France A à 18 ans',
        subtitle: 'Luxembourg 1 - 3 France • Éliminatoires Mondial',
        description: 'Plus jeune joueur sélectionné en Bleu depuis 1955. Zinédine Zidane le lance à la 78e minute.',
        source: 'FFF / Équipe de France A',
        stats: { minutes: 12, opponent: 'Luxembourg', score: '1-3' }
      },
      {
        id: 'mbp-04',
        year: '2018',
        date: 'Juin — Juillet 2018',
        age: 19,
        category: 'titre_trophee',
        title: 'Champion du Monde 2018 & Meilleur Jeune FIFA 🏆',
        subtitle: 'Coupe du Monde de la FIFA • Russie',
        description: 'Doublé légendaire contre l’Argentine en 8e (4-3) et but en finale contre la Croatie (4-2). Deuxième plus jeune buteur en finale après Pelé.',
        source: 'FIFA / FFF',
        stats: { matchCount: 7, goals: 4, assists: 1, minutes: 534 }
      },
      {
        id: 'mbp-05',
        year: '2021',
        date: 'Octobre 2021',
        age: 22,
        category: 'titre_trophee',
        title: 'Vainqueur de l’UEFA Nations League 🏆',
        subtitle: 'Espagne 1 - 2 France • San Siro Milan',
        description: 'Buteur décisif en finale face à l’Espagne à la 80e minute pour offrir le titre aux Bleus.',
        source: 'UEFA / FFF',
        stats: { goals: 2, assists: 2, competition: 'Final Four Nations League' }
      },
      {
        id: 'mbp-06',
        year: '2022',
        date: 'Décembre 2022',
        age: 23,
        category: 'selection_a',
        title: 'Triplé historique en Finale de Coupe du Monde ⚽⚽⚽',
        subtitle: 'Argentine 3 - 3 France (4-2 tab) • Soulier d’Or FIFA (8 buts)',
        description: 'Auteur d’un triplé historique en finale au stade de Lusail. Soulier d’Or de la compétition avec 8 réalisations.',
        source: 'FIFA',
        stats: { goals: 8, assists: 2, matchCount: 7, minutes: 597 }
      },
      {
        id: 'mbp-07',
        year: '2023',
        date: 'Mars 2023',
        age: 24,
        category: 'selection_a',
        title: 'Nomination comme Capitaine de l’Équipe de France 🎖️',
        subtitle: 'Attribution du brassard par Zinédine Zidane',
        description: 'Capitaine officiel des Bleus sous la direction de Zidane.',
        source: 'FFF'
      },
      {
        id: 'mbp-08',
        year: '2024',
        date: 'Juillet 2024',
        age: 25,
        category: 'club_transfert',
        title: 'Signature au Real Madrid CF',
        subtitle: 'Présentation devant 80 000 spectateurs au Santiago Bernabéu',
        description: 'Transfert au Real Madrid et vainqueur de la Supercoupe de l’UEFA dès son premier match.',
        source: 'La Liga / Real Madrid'
      },
      {
        id: 'mbp-09',
        year: '2026',
        date: 'Mars 2026',
        age: 27,
        category: 'rassemblement',
        title: 'Rassemblement Mars 2026 • Capitaine des Bleus',
        subtitle: 'Centre National du Football Clairefontaine',
        description: 'Leader offensif des Bleus, à 48 buts, à 3 longueurs du record historique d’Olivier Giroud.',
        source: 'AMS 360',
        relatedType: 'rassemblement'
      }
    ]
  },
  chevalier: {
    playerId: 'chevalier',
    playerName: 'Lucas Chevalier',
    firstDetectionYear: '2014',
    firstSeniorCallupDate: 'Novembre 2024',
    seniorDebutDate: '17 Novembre 2024',
    seniorDebutOpponent: 'Italie (San Siro, 3-1)',
    youthCapsTotal: 18,
    seniorCapsTotal: 6,
    seniorGoalsTotal: 0,
    seniorAssistsTotal: 1,
    rassemblementsCount: 8,
    trophies: ['Vainqueur Tournoi Maurice Revello Espoirs 2022 🏆', 'Meilleur Gardien Ligue 1 Trophées UNFP'],
    formationClub: 'LOSC Lille',
    poleEspoir: 'Pôle Espoirs Liévin',
    milestones: [
      {
        id: 'chv-01',
        year: '2014',
        date: 'Septembre 2014',
        age: 13,
        category: 'detection_fff',
        title: 'Détection Pôle Espoirs de Liévin (Hauts-de-France)',
        subtitle: 'Pôle Espoirs FFF Liévin',
        description: 'Intègre le pôle fédéral régional. Noté pour son envergure, ses réflexes sur la ligne et sa maturité émotionnelle.',
        source: 'DTN / FFF'
      },
      {
        id: 'chv-02',
        year: '2017',
        date: 'Octobre 2017',
        age: 16,
        category: 'espoirs_jeunes',
        title: 'Premières sélections France U16 & U18',
        subtitle: 'Tournois internationaux de développement UEFA',
        description: 'Gardien titulaire des sélections U16, U17 et U18.',
        source: 'FFF Sélections Jeunes',
        stats: { matchCount: 12, competition: 'UEFA Youth' }
      },
      {
        id: 'chv-03',
        year: '2021',
        date: 'Août 2021',
        age: 19,
        category: 'club_transfert',
        title: 'Saison de révélation en prêt au Valenciennes FC',
        subtitle: 'Ligue 2 BKT',
        description: '30 matchs disputés comme titulaire indiscutable, élu révélation gardien de l’année.',
        source: 'LFP'
      },
      {
        id: 'chv-04',
        year: '2022',
        date: 'Septembre 2022',
        age: 20,
        category: 'espoirs_jeunes',
        title: 'Gardien titulaire de l’Équipe de France Espoirs (U21)',
        subtitle: 'Qualifs Euro Espoirs & JO Paris 2024',
        description: 'S’impose comme le numéro 1 des Espoirs sous la direction de Sylvain Ripoll puis Thierry Henry.',
        source: 'FFF Espoirs',
        stats: { matchCount: 9, competition: 'Euro Espoirs' }
      },
      {
        id: 'chv-05',
        year: '2024',
        date: 'Novembre 2024',
        age: 23,
        category: 'selection_a',
        title: 'Première convocation & cape en Équipe de France A',
        subtitle: 'Italie 1 - 3 France • San Siro Milan',
        description: 'Convoqué par Zinédine Zidane et titularisé à San Siro. Auteur de 4 arrêts déterminants.',
        source: 'FFF / Équipe de France A',
        stats: { minutes: 90, opponent: 'Italie', score: '1-3' }
      },
      {
        id: 'chv-06',
        year: '2025',
        date: 'Juillet 2025',
        age: 23,
        category: 'club_transfert',
        title: 'Transfert au Paris Saint-Germain',
        subtitle: 'Ligue 1 & UEFA Champions League',
        description: 'Recruté par le Paris Saint-Germain, titulaire dans les cages du club de la capitale.',
        source: 'LFP / PSG'
      },
      {
        id: 'chv-07',
        year: '2026',
        date: 'Mars 2026',
        age: 24,
        category: 'rassemblement',
        title: 'Rassemblement Mars 2026 à Clairefontaine',
        subtitle: 'Concurrence au poste avec Mike Maignan',
        description: 'Présent au stage des Bleus. Travail individualisé avec l’entraîneur des gardiens Roberto Vazquez.',
        source: 'AMS 360',
        relatedType: 'rassemblement'
      }
    ]
  }
};

// Fallback generator for other players to ensure EVERY player in the 24 squad has rich historical timeline
export function getPlayerCareerProfile(playerId: string, playerName: string, club: string, position: string, caps: number, goals: number): PlayerCareerProfile {
  if (CAREER_PATHWAYS_DATA[playerId]) {
    return CAREER_PATHWAYS_DATA[playerId];
  }

  return {
    playerId,
    playerName,
    firstDetectionYear: '2015',
    firstSeniorCallupDate: 'Septembre 2021',
    seniorDebutDate: '12 Novembre 2021',
    seniorDebutOpponent: 'Finlande (2-0)',
    youthCapsTotal: 15,
    seniorCapsTotal: caps || 18,
    seniorGoalsTotal: goals || 2,
    seniorAssistsTotal: 4,
    rassemblementsCount: Math.max(6, Math.floor((caps || 18) * 0.9)),
    trophies: ['Vainqueur UEFA Nations League 🏆', 'Championnat National Club 🏆'],
    formationClub: club || 'Centre de Formation FFF',
    poleEspoir: 'Pôle Espoirs FFF Clairefontaine',
    milestones: [
      {
        id: `${playerId}-m1`,
        year: '2015',
        date: 'Octobre 2015',
        age: 15,
        category: 'detection_fff',
        title: 'Détection DTN & Tests d’entrée Pôle Espoirs',
        subtitle: 'Centre Régional Technique FFF',
        description: `Repéré par les observateurs de la Direction Technique Nationale pour son profil athlétique et son intelligence de jeu au poste de ${position.toLowerCase()}.`,
        source: 'DTN / Détection FFF',
        coachNote: 'Gabarit conforme aux standards du haut niveau, grosse marge de progression technique.'
      },
      {
        id: `${playerId}-m2`,
        year: '2018',
        date: 'Mars 2018',
        age: 18,
        category: 'espoirs_jeunes',
        title: 'Sélections en Équipe de France U19 & Espoirs',
        subtitle: 'Qualifications Championnat d’Europe UEFA',
        description: 'Titularisations régulières en sélections de jeunes tricolores.',
        source: 'FFF Sélections Jeunes',
        stats: { matchCount: 14, goals: Math.floor(goals * 0.6) }
      },
      {
        id: `${playerId}-m3`,
        year: '2020',
        date: 'Août 2020',
        age: 20,
        category: 'club_transfert',
        title: `Consolidation au plus haut niveau • ${club}`,
        subtitle: 'Championnat d’Élite & Coupes d’Europe',
        description: `Titulaire incontournable en club (${club}) avec des performances régulières observées par le staff de Zinédine Zidane.`,
        source: 'Club / LFP'
      },
      {
        id: `${playerId}-m4`,
        year: '2022',
        date: 'Septembre 2022',
        age: 22,
        category: 'selection_a',
        title: 'Première sélection officielle en Équipe de France A',
        subtitle: 'Match international UEFA Nations League',
        description: 'Première apparition sous le maillot tricolore suite à la convocation de Zinédine Zidane.',
        source: 'FFF / Équipe de France A',
        stats: { minutes: 75, competition: 'Nations League' }
      },
      {
        id: `${playerId}-m5`,
        year: '2024',
        date: 'Juin 2024',
        age: 24,
        category: 'rassemblement',
        title: 'Campagne UEFA Euro 2024 en Allemagne',
        subtitle: 'Tournoi majeur international',
        description: 'Membre de la liste des 24 sélectionnés pour la phase finale de l’Euro.',
        source: 'UEFA / FFF',
        stats: { matchCount: 4, minutes: 280 }
      },
      {
        id: `${playerId}-m6`,
        year: '2026',
        date: 'Mars 2026',
        age: 26,
        category: 'rassemblement',
        title: 'Rassemblement Mars 2026 à Clairefontaine',
        subtitle: 'Campagne de qualifications & préparation Coupe du Monde',
        description: 'Présent au rassemblement officiel de l’Équipe de France A à Clairefontaine.',
        source: 'AMS 360 Clairefontaine',
        relatedType: 'rassemblement'
      }
    ]
  };
}
