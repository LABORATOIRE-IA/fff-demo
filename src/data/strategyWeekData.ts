import { UPCOMING_MATCH } from './upcomingMatch';

export type WeekScenarioId = 'scenario_progressive' | 'scenario_intensity' | 'scenario_recovery';

export interface DaySessionPlan {
  id: string;
  dayName: string;
  dayDate: string;
  matchOffset: string; // 'J-6', 'J-5', 'J-4', 'J-3', 'J-2', 'J-1', 'J-0 (MATCH)'
  title: string;
  durationMinutes: number;
  intensity: 'Repos' | 'Faible' | 'Moyenne' | 'Élevée' | 'Match';
  targetDistanceKm: number;
  highSpeedRunningM: number; // >19.8 km/h
  sprintsCount: number; // >25 km/h
  estimatedLoadUA: number;
  mainFocus: string;
  exercises: string[];
  managedPlayers: {
    name: string;
    role: string;
    adaptation: string;
  }[];
  recoveryProtocol: string;
}

export interface WeekScenarioConfig {
  id: WeekScenarioId;
  title: string;
  subtitle: string;
  badge: string;
  totalVolumeKm: number;
  totalLoadUA: number;
  acwrExpected: number;
  readinessMatchScore: number;
  injuryRiskScore: 'Très Faible' | 'Faible' | 'Modéré';
  days: DaySessionPlan[];
  arguments: {
    category: 'PIC DE CHARGE' | 'AFFÛTAGE' | 'TACTIQUE' | 'PRÉVENTION';
    title: string;
    metric: string;
    description: string;
  }[];
  explicability: {
    title: string;
    description: string;
    source: string;
  }[];
}

export const TRAINING_WEEK_SCENARIOS: WeekScenarioConfig[] = [
  {
    id: 'scenario_progressive',
    title: 'Progressif & Affûtage Maximal (Recommandé)',
    subtitle: 'Pic de charge programmé à J-3 (Vendredi) suivi d’une décroissance de volume pour une explosivité maximale lundi',
    badge: 'Scénario 1 • Recommandé FFF',
    totalVolumeKm: 28.4,
    totalLoadUA: 3420,
    acwrExpected: 1.05,
    readinessMatchScore: 94,
    injuryRiskScore: 'Faible',
    days: [
      {
        id: 'day-mon',
        dayName: 'Mardi',
        dayDate: '29 Septembre',
        matchOffset: 'J-6',
        title: 'Récupération active & Soins post-weekend',
        durationMinutes: 45,
        intensity: 'Faible',
        targetDistanceKm: 3.2,
        highSpeedRunningM: 120,
        sprintsCount: 2,
        estimatedLoadUA: 280,
        mainFocus: 'Décrassage aérobie léger, mobilité articulaire, bilans médicaux d’arrivée.',
        exercises: [
          'Footing régénératif 15 min en zone 2',
          'Étirements myo-fasciaux guidés',
          'Circuits de mobilité hanche / cheville',
          'Balnéothérapie & cryothérapie 10°C'
        ],
        managedPlayers: [
          { name: 'Kylian Mbappé', role: 'Attaquant', adaptation: 'Protocole genou en salle de kiné (sans course)' },
          { name: 'Aurélien Tchouaméni', role: 'Milieu', adaptation: 'Séance vélo 20 min décharge articulaire' }
        ],
        recoveryProtocol: 'Bain froid 8 min + massage drainage lymphatique'
      },
      {
        id: 'day-tue',
        dayName: 'Mercredi',
        dayDate: '30 Septembre',
        matchOffset: 'J-5',
        title: 'Force fonctionnelle & Circuits de passes rythmés',
        durationMinutes: 75,
        intensity: 'Moyenne',
        targetDistanceKm: 5.4,
        highSpeedRunningM: 380,
        sprintsCount: 8,
        estimatedLoadUA: 560,
        mainFocus: 'Renforcement neuromusculaire haut/bas du corps et circuits de circulation collective.',
        exercises: [
          'Activation proprioceptive sur bosu et élastiques',
          'Squat guidé et travail d’isométrie excentrique',
          'Jeux de conservation 8v8 avec zones d’appui',
          'Mise en place des premiers principes de sortie de balle'
        ],
        managedPlayers: [
          { name: 'Ousmane Dembélé', role: 'Attaquant', adaptation: 'Limitation des changements de direction brusques' },
          { name: 'Kylian Mbappé', role: 'Attaquant', adaptation: 'Reprise course linéaire sur Alter-G (70% PDC)' }
        ],
        recoveryProtocol: 'Bottes de pressothérapie + hydratation isotonique'
      },
      {
        id: 'day-wed',
        dayName: 'Jeudi',
        dayDate: '01 Octobre',
        matchOffset: 'J-4',
        title: 'Tactique globale & Blocs médians / hauts',
        durationMinutes: 80,
        intensity: 'Moyenne',
        targetDistanceKm: 6.2,
        highSpeedRunningM: 520,
        sprintsCount: 12,
        estimatedLoadUA: 680,
        mainFocus: 'Animation offensive axe/ailes face à une défense à 4 et pressing coordonné.',
        exercises: [
          'Toros dynamiques 5v2 en 1 touche',
          'Opposition 11v11 sur 3/4 de terrain (3x8 min)',
          'Travail de compensation des latéraux à la perte',
          'Transitions rapides 3v2 avec repli défensif'
        ],
        managedPlayers: [
          { name: 'Kylian Mbappé', role: 'Attaquant', adaptation: 'Fractionné aérobie terrain + frappes légères' }
        ],
        recoveryProtocol: 'Bain chaud/froid alterné 12 min'
      },
      {
        id: 'day-thu',
        dayName: 'Vendredi',
        dayDate: '02 Octobre',
        matchOffset: 'J-3',
        title: 'PIC DE CHARGE • Jeux réduits haute intensité',
        durationMinutes: 85,
        intensity: 'Élevée',
        targetDistanceKm: 7.1,
        highSpeedRunningM: 840,
        sprintsCount: 22,
        estimatedLoadUA: 890,
        mainFocus: 'Intensité métabolique maximale, duels engagés, répétition de sprints à haute vélocité (>25 km/h).',
        exercises: [
          'Jeu réduit 4v4 + 2 jokers (intensité cardiaque >88% FCmax)',
          'Séquences de 4 min à haute densité avec appuis courts',
          'Travail spécifique attaquants / défenseurs (centres et duels aériens)',
          'Finitions sous pression défensive'
        ],
        managedPlayers: [
          { name: 'Zinédine Zidane', role: 'Coach', adaptation: 'Rotation des milieux toutes les 15 minutes' },
          { name: 'Kylian Mbappé', role: 'Attaquant', adaptation: 'Échauffement complet avec le groupe + travail spécifique finitions' }
        ],
        recoveryProtocol: 'Cryothérapie corps entier -110°C (3 min) + bilan kiné approfondi'
      },
      {
        id: 'day-fri',
        dayName: 'Samedi',
        dayDate: '03 Octobre',
        matchOffset: 'J-2',
        title: 'AFFÛTAGE (Décharge de volume) • Vivacité & Vitesse',
        durationMinutes: 55,
        intensity: 'Moyenne',
        targetDistanceKm: 4.1,
        highSpeedRunningM: 310,
        sprintsCount: 10,
        estimatedLoadUA: 420,
        mainFocus: 'Descente du volume (-35%), préservation nerveuse, vivacité sur 5-10m et coordination.',
        exercises: [
          'Activation vitesse avec cellules photoélectriques (départs variés)',
          'Toros à thème vivacité et prises d’information rapides',
          'Mise en place tactique sur demi-terrain (gestion des transitions espagnoles)',
          'Séance de frappes au but pour les attaquants'
        ],
        managedPlayers: [
          { name: 'Aurélien Tchouaméni', role: 'Milieu', adaptation: 'Écourter la séance de 15 min pour fraîcheur maximale' },
          { name: 'Kylian Mbappé', role: 'Attaquant', adaptation: 'Participation intégrale à la séance tactique' }
        ],
        recoveryProtocol: 'Massage myo-relaxant des membres inférieurs'
      },
      {
        id: 'day-sat',
        dayName: 'Dimanche',
        dayDate: '04 Octobre',
        matchOffset: 'J-1',
        title: 'Veille de Match • Coups de pied arrêtés & Éveil neuromusculaire',
        durationMinutes: 40,
        intensity: 'Faible',
        targetDistanceKm: 2.4,
        highSpeedRunningM: 110,
        sprintsCount: 4,
        estimatedLoadUA: 230,
        mainFocus: 'Affûtage final, réglages des CPA offensifs et défensifs, confiance collective.',
        exercises: [
          'Éveil dynamique & coordination sans ballon',
          'Corners offensifs : 4 combinaisons travaillées',
          'Coups francs directs et indirects',
          'Tirs au but & travail psychologique de concentration'
        ],
        managedPlayers: [],
        recoveryProtocol: 'Hydratation hypertonique + sommeil guidé (9h recommandées)'
      },
      {
        id: 'day-sun',
        dayName: 'Lundi',
        dayDate: '05 Octobre',
        matchOffset: 'J-0 (MATCH)',
        title: `COMPÉTITION : ${UPCOMING_MATCH.homeTeam.toUpperCase()} vs ${UPCOMING_MATCH.awayTeam.toUpperCase()} (${UPCOMING_MATCH.kickoff})`,
        durationMinutes: 90,
        intensity: 'Match',
        targetDistanceKm: 10.8,
        highSpeedRunningM: 920,
        sprintsCount: 26,
        estimatedLoadUA: 980,
        mainFocus: 'Victoire, engagement total, gestion des 5 changements tactiques selon le plan AMS.',
        exercises: [
          'Échauffement protocolaire 25 min',
          'Match 90+ min',
          'Cryobains vestiaires immédiats'
        ],
        managedPlayers: [
          { name: 'Staff Médical', role: 'Santé', adaptation: 'Surveillance spécifique Mbappé & Dembélé' }
        ],
        recoveryProtocol: 'Protocole complet de récupération post-match FFF'
      }
    ],
    arguments: [
      {
        category: 'PIC DE CHARGE',
        title: 'Positionnement optimal à J-3',
        metric: 'Jeudi (890 UA)',
        description: 'Laisser 72h complètes entre la séance la plus exigeante et le coup d’envoi restaure 100% des réserves en glycogène musculaire.'
      },
      {
        category: 'AFFÛTAGE',
        title: 'Réduction exponentielle du volume',
        metric: '-38 % à J-2 / -55 % à J-1',
        description: 'La baisse drastique de distance parcourue à J-2/J-1 élimine la fatigue résiduelle tout en conservant l’acuité neuromusculaire.'
      },
      {
        category: 'TACTIQUE',
        title: 'Focus transition & pressing',
        metric: '3 séances spécifiques',
        description: 'Mardi, Mercredi et Vendredi intègrent les schémas de bloc médian adaptés au style de possession belge.'
      },
      {
        category: 'PRÉVENTION',
        title: 'Gestion des profils sensibles',
        metric: '0 risque lésionnel majeur',
        description: 'Programme individualisé pour Mbappé (genou) et Tchouaméni (charge) évitant tout dépassement de seuil critique.'
      }
    ],
    explicability: [
      {
        title: 'Modélisation du Ratio Aigu/Chronique (ACWR)',
        description: 'Le cumul de 3 420 UA sur la semaine garantit un ACWR collectif de 1.05, dans la sweet spot de performance (0.8 - 1.3).',
        source: 'Algorithme de charge Banister / Gabbett intégré AMS 360'
      },
      {
        title: 'Cinétique de Récupération des Ischios & Quadriceps',
        description: 'Les tests GPS Catapult 10Hz confirment qu’un pic à J-3 permet un retour à 100% de la vitesse maximale (Vmax) à J-0.',
        source: 'Capteurs Vector FFF & Données Club'
      },
      {
        title: 'Données HRV & Sommeil Prédites',
        description: 'Le protocole d’affûtage du vendredi et samedi projette un HRV moyen de 88 ms et une disponibilité de 98% au coup d’envoi.',
        source: 'Pôle Médical & Performance FFF'
      }
    ]
  },
  {
    id: 'scenario_intensity',
    title: 'Intensité & Pressing Élevé',
    subtitle: 'Maintien d’un niveau d’engagement et de vitesse élevé jusqu’à J-2 pour habituer le groupe à un rythme suffocant',
    badge: 'Scénario 2 • Intensité Max',
    totalVolumeKm: 31.8,
    totalLoadUA: 3890,
    acwrExpected: 1.18,
    readinessMatchScore: 89,
    injuryRiskScore: 'Modéré',
    days: [
      {
        id: 'day-mon-2',
        dayName: 'Mardi',
        dayDate: '29 Septembre',
        matchOffset: 'J-6',
        title: 'Décrassage actif & Toros vifs',
        durationMinutes: 50,
        intensity: 'Faible',
        targetDistanceKm: 3.8,
        highSpeedRunningM: 180,
        sprintsCount: 4,
        estimatedLoadUA: 320,
        mainFocus: 'Récupération dynamique et mise en route articulaire.',
        exercises: ['Footing en continu', 'Toros 6v2 rythmés', 'Étirements balistiques'],
        managedPlayers: [],
        recoveryProtocol: 'Balnéo & cryothérapie'
      },
      {
        id: 'day-tue-2',
        dayName: 'Mercredi',
        dayDate: '30 Septembre',
        matchOffset: 'J-5',
        title: 'Puissance aérobie & Pressing à la perte',
        durationMinutes: 80,
        intensity: 'Élevée',
        targetDistanceKm: 6.4,
        highSpeedRunningM: 610,
        sprintsCount: 14,
        estimatedLoadUA: 740,
        mainFocus: 'Répétition de courses à haute intensité et déclenchement de pressing.',
        exercises: ['Intermittent 15s/15s avec ballon', 'Jeux réduits 6v6 pressing étouffant', 'Transitions courtes'],
        managedPlayers: [{ name: 'Kylian Mbappé', role: 'Attaquant', adaptation: 'Séance adaptée sans contact' }],
        recoveryProtocol: 'Bottes de compression'
      },
      {
        id: 'day-wed-2',
        dayName: 'Jeudi',
        dayDate: '01 Octobre',
        matchOffset: 'J-4',
        title: 'Grand jeu & Animations de transition',
        durationMinutes: 85,
        intensity: 'Élevée',
        targetDistanceKm: 7.2,
        highSpeedRunningM: 780,
        sprintsCount: 18,
        estimatedLoadUA: 860,
        mainFocus: 'Opposition 11v11 grand espace et intensité de match.',
        exercises: ['11v11 4x10 min avec consigne de pressing immédiat', 'Sorties de zone sous pression'],
        managedPlayers: [],
        recoveryProtocol: 'Bain froid 10 min'
      },
      {
        id: 'day-thu-2',
        dayName: 'Vendredi',
        dayDate: '02 Octobre',
        matchOffset: 'J-3',
        title: 'PIC DE CHARGE • Duels & Sprints répétés',
        durationMinutes: 90,
        intensity: 'Élevée',
        targetDistanceKm: 7.8,
        highSpeedRunningM: 950,
        sprintsCount: 26,
        estimatedLoadUA: 980,
        mainFocus: 'Volume et intensité cumulés maximaux.',
        exercises: ['Parcours de vitesse avec duel et frappe', 'Jeux de possession 5v5 intenses'],
        managedPlayers: [{ name: 'Ousmane Dembélé', role: 'Attaquant', adaptation: 'Gestion de charge 60 min' }],
        recoveryProtocol: 'Cryothérapie corps entier'
      },
      {
        id: 'day-fri-2',
        dayName: 'Samedi',
        dayDate: '03 Octobre',
        matchOffset: 'J-2',
        title: 'Affûtage modéré & Vivacité',
        durationMinutes: 60,
        intensity: 'Moyenne',
        targetDistanceKm: 4.5,
        highSpeedRunningM: 390,
        sprintsCount: 12,
        estimatedLoadUA: 510,
        mainFocus: 'Maintien de la vivacité et circuits tactiques.',
        exercises: ['Sprints courts 5m', 'Mise en place tactique'],
        managedPlayers: [],
        recoveryProtocol: 'Massage récupération'
      },
      {
        id: 'day-sat-2',
        dayName: 'Dimanche',
        dayDate: '04 Octobre',
        matchOffset: 'J-1',
        title: 'Veille de Match • Coups de pied arrêtés',
        durationMinutes: 40,
        intensity: 'Faible',
        targetDistanceKm: 2.1,
        highSpeedRunningM: 90,
        sprintsCount: 3,
        estimatedLoadUA: 210,
        mainFocus: 'CPA et activation.',
        exercises: ['Corners & Coups francs', 'Tirs au but'],
        managedPlayers: [],
        recoveryProtocol: 'Hydratation + Repos'
      },
      {
        id: 'day-sun-2',
        dayName: 'Lundi',
        dayDate: '05 Octobre',
        matchOffset: 'J-0 (MATCH)',
        title: `MATCH : ${UPCOMING_MATCH.homeTeam.toUpperCase()} vs ${UPCOMING_MATCH.awayTeam.toUpperCase()}`,
        durationMinutes: 90,
        intensity: 'Match',
        targetDistanceKm: 10.8,
        highSpeedRunningM: 920,
        sprintsCount: 26,
        estimatedLoadUA: 980,
        mainFocus: 'Compétition.',
        exercises: ['Match officiel'],
        managedPlayers: [],
        recoveryProtocol: 'Cryo post-match'
      }
    ],
    arguments: [
      {
        category: 'PIC DE CHARGE',
        title: 'Charge globale élevée',
        metric: '3 890 UA',
        description: 'Excellente préparation pour une bataille physique et un pressing tout terrain face aux Espagnols.'
      },
      {
        category: 'TACTIQUE',
        title: 'Conditionnement au duel',
        metric: '+24 % de sprints',
        description: 'Maintien des réflexes de sprint et de contre-pressing répété tout au long du microcycle.'
      }
    ],
    explicability: [
      {
        title: 'Impact sur la fraîcheur',
        description: 'Un scénario plus exigeant qui augmente le potentiel de puissance mais exige une gestion fine des remplacements.',
        source: 'Suivi de fatigue neuromusculaire AMS 360'
      }
    ]
  },
  {
    id: 'scenario_recovery',
    title: 'Régulation & Récupération Prioritaire',
    subtitle: 'Allègement du volume d’entraînement pour régénérer un effectif ayant enchaîné de lourdes minutes en club',
    badge: 'Scénario 3 • Fraîcheur Pure',
    totalVolumeKm: 23.9,
    totalLoadUA: 2890,
    acwrExpected: 0.94,
    readinessMatchScore: 97,
    injuryRiskScore: 'Très Faible',
    days: [
      {
        id: 'day-mon-3',
        dayName: 'Mardi',
        dayDate: '29 Septembre',
        matchOffset: 'J-6',
        title: 'Repos total ou décrassage facultatif',
        durationMinutes: 30,
        intensity: 'Repos',
        targetDistanceKm: 1.8,
        highSpeedRunningM: 40,
        sprintsCount: 0,
        estimatedLoadUA: 140,
        mainFocus: 'Régénération passive, sommeil et soins individualisés.',
        exercises: ['Balnéothérapie', 'Soins kiné'],
        managedPlayers: [],
        recoveryProtocol: 'Sommeil réparateur 10h'
      },
      {
        id: 'day-tue-3',
        dayName: 'Mercredi',
        dayDate: '30 Septembre',
        matchOffset: 'J-5',
        title: 'Mobilité & Circulation de balle souple',
        durationMinutes: 60,
        intensity: 'Faible',
        targetDistanceKm: 4.2,
        highSpeedRunningM: 220,
        sprintsCount: 5,
        estimatedLoadUA: 410,
        mainFocus: 'Réactivation sans fatigue musculaire.',
        exercises: ['Toros souples', 'Circuits techniques sans opposition'],
        managedPlayers: [],
        recoveryProtocol: 'Bottes de pressothérapie'
      },
      {
        id: 'day-wed-3',
        dayName: 'Jeudi',
        dayDate: '01 Octobre',
        matchOffset: 'J-4',
        title: 'Mise en place tactique en marchant & Vidéo',
        durationMinutes: 65,
        intensity: 'Moyenne',
        targetDistanceKm: 4.8,
        highSpeedRunningM: 320,
        sprintsCount: 8,
        estimatedLoadUA: 520,
        mainFocus: 'Compréhension théorique et réglages positionnels sans dépense excessive.',
        exercises: ['Séance vidéo collective 30 min', 'Mise en place 11v0 sur terrain'],
        managedPlayers: [],
        recoveryProtocol: 'Massage drainage'
      },
      {
        id: 'day-thu-3',
        dayName: 'Vendredi',
        dayDate: '02 Octobre',
        matchOffset: 'J-3',
        title: 'PIC DE CHARGE MODÉRÉ • Jeux réduits courts',
        durationMinutes: 70,
        intensity: 'Moyenne',
        targetDistanceKm: 5.6,
        highSpeedRunningM: 580,
        sprintsCount: 15,
        estimatedLoadUA: 690,
        mainFocus: 'Pic d’intensité dosé pour activer le cardio sans créer de courbatures.',
        exercises: ['Jeux réduits 5v5 séquences courtes de 2 min', 'Finitions devant le but'],
        managedPlayers: [],
        recoveryProtocol: 'Cryothérapie'
      },
      {
        id: 'day-fri-3',
        dayName: 'Samedi',
        dayDate: '03 Octobre',
        matchOffset: 'J-2',
        title: 'Vivacité & Confiance',
        durationMinutes: 45,
        intensity: 'Faible',
        targetDistanceKm: 3.2,
        highSpeedRunningM: 190,
        sprintsCount: 6,
        estimatedLoadUA: 340,
        mainFocus: 'Vitesse de réaction et bonne humeur.',
        exercises: ['Jeux ludiques de réactivité', 'Tennis ballon'],
        managedPlayers: [],
        recoveryProtocol: 'Balnéo'
      },
      {
        id: 'day-sat-3',
        dayName: 'Dimanche',
        dayDate: '04 Octobre',
        matchOffset: 'J-1',
        title: 'Veille de Match • CPA',
        durationMinutes: 35,
        intensity: 'Faible',
        targetDistanceKm: 1.9,
        highSpeedRunningM: 60,
        sprintsCount: 2,
        estimatedLoadUA: 180,
        mainFocus: 'CPA et activation finale.',
        exercises: ['Corners & Coups francs'],
        managedPlayers: [],
        recoveryProtocol: 'Repos complet'
      },
      {
        id: 'day-sun-3',
        dayName: 'Lundi',
        dayDate: '05 Octobre',
        matchOffset: 'J-0 (MATCH)',
        title: `MATCH : ${UPCOMING_MATCH.homeTeam.toUpperCase()} vs ${UPCOMING_MATCH.awayTeam.toUpperCase()}`,
        durationMinutes: 90,
        intensity: 'Match',
        targetDistanceKm: 10.8,
        highSpeedRunningM: 920,
        sprintsCount: 26,
        estimatedLoadUA: 980,
        mainFocus: 'Fraîcheur maximale au coup d’envoi.',
        exercises: ['Match officiel'],
        managedPlayers: [],
        recoveryProtocol: 'Cryo post-match'
      }
    ],
    arguments: [
      {
        category: 'AFFÛTAGE',
        title: 'Fraîcheur optimale du XI',
        metric: '97/100 Readiness',
        description: 'Garantit que 100% des cadres débuteront le match avec un indice de fraîcheur et un HRV au sommet.'
      }
    ],
    explicability: [
      {
        title: 'Prévention des rechutes',
        description: 'Idéal lorsque le temps de jeu cumulé des titulaires en Ligue des Champions dépasse les 450 minutes sur les 15 derniers jours.',
        source: 'Données Clubs FFF'
      }
    ]
  }
];
