import { UPCOMING_MATCH } from './upcomingMatch';

export interface RefereeMissedIncident {
  minute: string;
  title: string;
  zone: string;
  cameraView: string;
  impact: 'Majeur' | 'Modéré' | 'Mineur';
  recommendation: string;
}

export interface RefereeLastMatchReview {
  matchTitle: string;
  date: string;
  decisionAccuracy: number;
  foulsWhistled: number;
  missedFouls: number;
  varInterventions: number;
  averageDistanceToAction: string;
  periods: Array<{ label: string; whistled: number; missed: number }>;
  incidents: RefereeMissedIncident[];
  recommendations: string[];
}

export interface PlayerRivalryAntecedent {
  id: string;
  playerA: { name: string; club: string; role: string };
  playerB: { name: string; club: string; role: string };
  riskLevel: 'Critique' | 'Élevé' | 'Modéré';
  pastIncidents: string;
  refereeGuideline: string;
}

export interface PlayerBehaviorProfile {
  id: string;
  name: string;
  club: string;
  number: number;
  trait: 'Recherche du contact' | 'Contestataire régulier' | 'Faute tactique d’antijeu' | 'Duelliste rugueux';
  statsWarning: string;
  tacticalAdvice: string;
  videoAnalysisPoint: string;
}

export interface TrackingVigilancePoint {
  category: 'Vitesse de Transition' | 'Positionnement Diagonale' | 'Angle Mort VAR' | 'Coups de Pied Arrêtés';
  title: string;
  metric: string;
  description: string;
  actionRequired: string;
}

export interface RefereeMatchPrepData {
  matchInfo: {
    matchTitle: string;
    competition: string;
    date: string;
    stadium: string;
    stakes: string;
    expectedIntensity: string;
    lineupSourceUrl: string;
  };
  refereeCrew: {
    central: string;
    centralGrade: string;
    assistant1: string;
    assistant2: string;
    fourthOfficial: string;
    var1: string;
    var2: string;
  };
  matchSheets: {
    teamHome: { name: string; formation: string; starters: Array<{ number: number; name: string; position: string }> };
    teamAway: { name: string; formation: string; starters: Array<{ number: number; name: string; position: string }> };
  };
  teamTacticalAttention: {
    teamHome: {
      name: string;
      tacticalStyle: string;
      foulProvocationZone: string;
      benchBehavior: string;
      warningPoints: string[];
    };
    teamAway: {
      name: string;
      tacticalStyle: string;
      foulProvocationZone: string;
      benchBehavior: string;
      warningPoints: string[];
    };
  };
  playerRivalries: PlayerRivalryAntecedent[];
  behavioralProfiles: PlayerBehaviorProfile[];
  trackingVigilance: TrackingVigilancePoint[];
  foulZones: Array<{ team: 'home' | 'away'; label: string; x: number; y: number; fouls: number }>;
  lastMatchReview: RefereeLastMatchReview;
  refereeScenarios: {
    id: string;
    name: string;
    badge: string;
    strategy: string;
    cardPolicy: string;
    advantagePolicy: string;
    projectedFouls: string;
  }[];
}

export const REFEREE_MATCH_PREP_DATA: RefereeMatchPrepData = {
  matchInfo: {
    matchTitle: UPCOMING_MATCH.title,
    competition: UPCOMING_MATCH.competition,
    date: UPCOMING_MATCH.dateTime,
    stadium: UPCOMING_MATCH.fullVenue,
    stakes: 'Match international à fort enjeu • UEFA Nations League',
    expectedIntensity: 'Très Élevée (Historique moyen : 28 fautes / 6.2 cartons par match)',
    lineupSourceUrl: 'https://www.skysports.com/football/france-vs-belgium/teams/503562'
  },
  refereeCrew: {
    central: 'François Letexier',
    centralGrade: 'Arbitre FFF & FIFA Elite • Référent UEFA',
    assistant1: 'Cyril Mugnier',
    assistant2: 'Mehdi Rahmouni',
    fourthOfficial: 'Willy Delajod',
    var1: 'Jérôme Brisard',
    var2: 'Benoît Bastien'
  },
  matchSheets: {
    teamHome: {
      name: UPCOMING_MATCH.homeTeam,
      formation: '4-3-3',
      starters: [
        { number: 16, name: 'Mike Maignan', position: 'Gardien' }, { number: 5, name: 'Jules Koundé', position: 'Défenseur' }, { number: 4, name: 'Dayot Upamecano', position: 'Défenseur' }, { number: 17, name: 'William Saliba', position: 'Défenseur' }, { number: 3, name: 'Lucas Digne', position: 'Défenseur' },
        { number: 13, name: "N'Golo Kanté", position: 'Milieu' }, { number: 8, name: 'Manu Koné', position: 'Milieu' }, { number: 6, name: 'Mattéo Guendouzi', position: 'Milieu' }, { number: 11, name: 'Ousmane Dembélé', position: 'Attaquant' }, { number: 12, name: 'Randal Kolo Muani', position: 'Attaquant' }, { number: 15, name: 'Marcus Thuram', position: 'Attaquant' }
      ]
    },
    teamAway: {
      name: UPCOMING_MATCH.awayTeam,
      formation: '4-2-3-1',
      starters: [
        { number: 1, name: 'Koen Casteels', position: 'Gardien' }, { number: 21, name: 'Timothy Castagne', position: 'Défenseur' }, { number: 4, name: 'Wout Faes', position: 'Défenseur' }, { number: 2, name: 'Zeno Debast', position: 'Défenseur' }, { number: 3, name: 'Arthur Theate', position: 'Défenseur' },
        { number: 24, name: 'Amadou Onana', position: 'Milieu' }, { number: 8, name: 'Youri Tielemans', position: 'Milieu' }, { number: 14, name: 'Dodi Lukébakio', position: 'Attaquant' }, { number: 7, name: 'Kevin De Bruyne', position: 'Milieu offensif' }, { number: 22, name: 'Jérémy Doku', position: 'Attaquant' }, { number: 20, name: 'Loïs Openda', position: 'Attaquant' }
      ]
    }
  },
  teamTacticalAttention: {
    teamHome: {
      name: UPCOMING_MATCH.homeTeam,
      tacticalStyle: 'Possession haute (64%), contre-pressing immédiat à la perte, attaques tranchantes sur les ailes.',
      foulProvocationZone: 'Surface de réparation adverse et demi-espaces (dribbles dans les 16m50).',
      benchBehavior: 'Calme relatif mais réactions vives sur les non-sanctions de fautes répétées sur les ailiers.',
      warningPoints: [
        'Multiplication des courses tranchantes à haute vitesse (>32 km/h) imposant une diagonale très réactive.',
        'Tendance à chercher le contact dans la zone de penalty sur les crochets intérieurs.',
        'Pressing coordonné sur l’arbitre par 3 joueurs lors des décisions litigieuses.'
      ]
    },
    teamAway: {
      name: UPCOMING_MATCH.awayTeam,
      tacticalStyle: 'Bloc médian compact, transitions fulgurantes verticales, engagement maximal dans les duels.',
      foulProvocationZone: 'Zone médiane et premier rideau pour casser les contres (fautes tactiques).',
      benchBehavior: 'Staff technique très démonstratif, surveillance étroite requise par le 4e arbitre.',
      warningPoints: [
        'Fautes tactiques précoces dès la récupération française pour empêcher les sorties de balle rapides.',
        'Impact physique soutenu sur les 15 premières minutes pour imposer un rapport de force psychologique.',
        'Contestation véhémente sur les touches et fautes au milieu de terrain.'
      ]
    }
  },
  playerRivalries: [
    {
      id: 'riv-1',
      playerA: { name: 'Ousmane Dembélé', club: 'France', role: 'Attaquant' },
      playerB: { name: 'Arthur Theate', club: 'Belgique', role: 'Défenseur' },
      riskLevel: 'Critique',
      pastIncidents: '2 altercations lors des deux dernières confrontations, 3 cartons jaunes distribués sur ce duel direct.',
      refereeGuideline: 'Intervenir verbalement dès le 1er duel appuyé. Prévenir calmement mais fermement les deux joueurs pour désamorcer l’escalade.'
    },
    {
      id: 'riv-2',
      playerA: { name: "N'Golo Kanté", club: 'France', role: 'Milieu' },
      playerB: { name: 'Kevin De Bruyne', club: 'Belgique', role: 'Milieu offensif' },
      riskLevel: 'Élevé',
      pastIncidents: 'Tacles glissés limite à retardement au match aller, échanges de provocations verbales hors du champ du ballon.',
      refereeGuideline: 'Surveiller les contacts sans ballon lors des corners et coups francs. S’appuyer sur l’assistant 1 et le 4e arbitre.'
    },
    {
      id: 'riv-3',
      playerA: { name: 'William Saliba', club: 'France', role: 'Défenseur' },
      playerB: { name: 'Loïs Openda', club: 'Belgique', role: 'Attaquant' },
      riskLevel: 'Modéré',
      pastIncidents: 'Tirages de maillot mutuels non sifflés ayant généré de la frustration.',
      refereeGuideline: 'Faire un rappel systématique dans la surface avant chaque corner avant de siffler la reprise du jeu.'
    }
  ],
  behavioralProfiles: [
    {
      id: 'beh-1',
      name: 'Jérémy Doku',
      club: 'Belgique',
      number: 22,
      trait: 'Recherche du contact',
      statsWarning: 'Provoque de nombreux contacts en un-contre-un dans les 30 derniers mètres.',
      tacticalAdvice: 'Attendre la confirmation du contact effectif avant de siffler dans la surface. Ne pas hésiter à sanctionner d’un avertissement en cas d’exagération flagrante.',
      videoAnalysisPoint: 'Tendance à laisser traîner la jambe arrière dès que le défenseur amorce un tacle glissé.'
    },
    {
      id: 'beh-2',
      name: 'Mattéo Guendouzi',
      club: 'France',
      number: 6,
      trait: 'Contestataire régulier',
      statsWarning: 'Interpelle l’arbitre en moyenne 8.4 fois par rencontre.',
      tacticalAdvice: 'Appliquer strictement la directive UEFA : seul le capitaine est autorisé à échanger avec l’arbitre avec respect et distance.',
      videoAnalysisPoint: 'Cherche à harceler l’arbitre pour influencer la distribution des cartons.'
    },
    {
      id: 'beh-3',
      name: 'Amadou Onana',
      club: 'Belgique',
      number: 24,
      trait: 'Faute tactique d’antijeu',
      statsWarning: '82% de ses fautes sont commises entre la 40e et la 65e minute en phase de transition.',
      tacticalAdvice: 'Sanctionner immédiatement d’un carton jaune dès que l’action prometteuse (SPA) est compromise, pour stopper la stratégie de fautes répétées.',
      videoAnalysisPoint: 'Tirage de maillot discret au démarrage du contre.'
    },
    {
      id: 'beh-4',
      name: 'Dayot Upamecano',
      club: 'France',
      number: 4,
      trait: 'Duelliste rugueux',
      statsWarning: '6 cartons jaunes récoltés sur des tacles par derrière.',
      tacticalAdvice: 'Surveiller les retours défensifs désespérés aux abords des 20 mètres.',
      videoAnalysisPoint: 'Engagement excessif avec le coude décollé lors des duels aériens.'
    }
  ],
  trackingVigilance: [
    {
      category: 'Vitesse de Transition',
      title: 'Contre-attaques supersoniques de la Belgique',
      metric: 'Pic à 34.2 km/h',
      description: 'La Belgique projette 4 joueurs en moins de 4.2 secondes vers l’avant lors des récupérations basses.',
      actionRequired: 'L’arbitre central doit anticiper le recul défensif et courir en diagonale rapide pour rester à moins de 15m de l’action.'
    },
    {
      category: 'Positionnement Diagonale',
      title: 'Attaques en triangle France côté gauche',
      metric: '72% des attaques',
      description: 'Densité maximale de joueurs sur le flanc gauche français provoquant des masquages visuels pour l’arbitre.',
      actionRequired: 'Se décaler vers l’axe central pour garder un champ de vision dégagé et dégager l’angle de passe pour l’assistant 1.'
    },
    {
      category: 'Angle Mort VAR',
      title: 'Tirages de maillot sur corners rentrants',
      metric: '2 situations litigieuses',
      description: 'Sur les corners rentrants tirés au 1er poteau, les caméras principales peuvent être masquées par la masse de joueurs.',
      actionRequired: 'Placement strict de l’arbitre central au point de penalty pour un contact visuel direct sur les accrochages de la surface.'
    },
    {
      category: 'Coups de Pied Arrêtés',
      title: 'Gestion des murs & Respect des 9m15',
      metric: 'Avancée moyenne de 1.2m',
      description: 'Les deux équipes ont tendance à grignoter de la distance sur les coups francs directs à l’entrée de la surface.',
      actionRequired: 'Utilisation rigoureuse du spray temporaire et avertissement clair au responsable du mur avant le coup de sifflet.'
    }
  ],
  // Coordinates on a 105 x 68 pitch; France attacks left to right.
  foulZones: [
    { team: 'home', label: 'Pressing haut couloir gauche', x: 72, y: 14, fouls: 9 },
    { team: 'home', label: 'Rond central', x: 42, y: 42, fouls: 6 },
    { team: 'home', label: 'Entrée de surface défensive', x: 22, y: 34, fouls: 4 },
    { team: 'away', label: 'Premier rideau médian', x: 60, y: 28, fouls: 11 },
    { team: 'away', label: 'Couloir droit défensif', x: 70, y: 56, fouls: 7 },
    { team: 'away', label: 'Abords de leur surface', x: 86, y: 38, fouls: 5 }
  ],
  lastMatchReview: {
    matchTitle: 'Dernier match dirigé • Ligue 1 (données fictives)',
    date: 'Samedi 26 septembre 2026',
    decisionAccuracy: 91,
    foulsWhistled: 24,
    missedFouls: 5,
    varInterventions: 2,
    averageDistanceToAction: '17 m',
    periods: [
      { label: '0-15', whistled: 5, missed: 0 },
      { label: '15-30', whistled: 4, missed: 1 },
      { label: '30-45', whistled: 3, missed: 1 },
      { label: '45-60', whistled: 4, missed: 0 },
      { label: '60-75', whistled: 3, missed: 2 },
      { label: '75-90', whistled: 5, missed: 1 }
    ],
    incidents: [
      {
        minute: '23e',
        title: 'Tirage de maillot sur corner',
        zone: 'Surface de réparation, premier poteau',
        cameraView: 'La caméra derrière le but montre un tirage prolongé du défenseur, masqué pour l’arbitre par trois joueurs.',
        impact: 'Majeur',
        recommendation: 'Se placer au point de penalty sur les corners rentrants pour garder un angle direct sur le premier poteau.'
      },
      {
        minute: '41e',
        title: 'Faute tactique sur transition',
        zone: 'Rond central',
        cameraView: 'La caméra principale confirme un accrochage qui stoppe une attaque prometteuse.',
        impact: 'Modéré',
        recommendation: 'Anticiper la perte de balle et réduire la distance à l’action en phase de transition.'
      },
      {
        minute: '66e',
        title: 'Coup de coude dans un duel aérien',
        zone: 'Milieu de terrain, couloir gauche',
        cameraView: 'Le plan rapproché montre un bras décollé au contact du visage de l’adversaire.',
        impact: 'Majeur',
        recommendation: 'Fixer le regard sur la zone d’impact des duels aériens plutôt que sur la trajectoire du ballon.'
      },
      {
        minute: '71e',
        title: 'Contact sans ballon après la passe',
        zone: 'Demi-espace droit',
        cameraView: 'La caméra tactique montre une poussée dans le dos après le départ du ballon.',
        impact: 'Mineur',
        recommendation: 'Garder un balayage visuel de 2 secondes sur le passeur après la transmission.'
      },
      {
        minute: '84e',
        title: 'Tacle par derrière non sanctionné',
        zone: '30 derniers mètres',
        cameraView: 'Le ralenti latéral montre un contact sur le tendon d’Achille, sans jeu du ballon.',
        impact: 'Majeur',
        recommendation: 'Maintenir l’intensité de course en fin de match pour rester sous 15 m des actions chaudes.'
      }
    ],
    recommendations: [
      'Revoir le positionnement sur coups de pied arrêtés : 2 des 5 fautes manquées sont liées aux corners.',
      'Prévoir une attention renforcée entre la 60e et la 75e minute, période la plus exposée aux oublis.',
      'Travailler la lecture des duels aériens en séance vidéo avec l’assistant 1.'
    ]
  },
  refereeScenarios: [
    {
      id: 'scen-prevention',
      name: 'Option A : Arbitrage Pédagogique & Continuité du Jeu (Recommandé)',
      badge: 'Modèle Recommandé DTA',
      strategy: 'Favoriser au maximum la règle de l’avantage, communication verbale continue, recadrage calme des capitaines dès les 10 premières minutes sans sortir de carton précoce injustifié.',
      cardPolicy: 'Carton jaune uniquement sur faute tactique évidente (SPA) ou excès d’engagement dangereux.',
      advantagePolicy: 'Attente de 2 à 3 secondes avant coup de sifflet pour laisser s’exprimer les attaques rapides.',
      projectedFouls: '22 - 25 fautes • 4 cartons jaunes'
    },
    {
      id: 'scen-strict',
      name: 'Option B : Tolérance Zéro & Sévérité Immédiate',
      badge: 'Option Cadre Rigide',
      strategy: 'Siffler chaque contact dès la 1ère minute pour poser un verrou absolu sur le match. Sortir le premier carton jaune avant la 15e minute si contestation ou contestation du banc.',
      cardPolicy: 'Sanction systématique à la première faute d’antijeu ou regroupement de plus de 2 joueurs autour de l’arbitre.',
      advantagePolicy: 'Avantages limités pour garder le contrôle physique total de la rencontre.',
      projectedFouls: '28 - 34 fautes • 7 cartons jaunes + 1 rouge potentiel'
    }
  ]
};
