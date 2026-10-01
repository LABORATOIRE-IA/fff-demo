import { UPCOMING_MATCH } from './upcomingMatch';

export type RTPPhaseId = 'phase_1' | 'phase_2' | 'phase_3' | 'phase_4';

export interface RTPPhaseConfig {
  id: RTPPhaseId;
  phaseNumber: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  dateRange: string;
  clinicalObjective: string;
  clearanceCriteria: string[];
  fieldDrills: string[];
  gymDrills: string[];
  gpsTargetMetrics: {
    maxSpeedKmH: string;
    targetDistanceKm: string;
    maxHeartRate: string;
    impactTolerance: string;
  };
}

export interface MbappeDailyPlan {
  dayName: string;
  dayDate: string;
  matchOffset: string;
  phaseNumber: number;
  morningSession: {
    title: string;
    duration: string;
    location: string;
    details: string[];
    loadUA: number;
  };
  afternoonSession: {
    title: string;
    duration: string;
    location: string;
    details: string[];
    loadUA: number;
  };
  medicalMilestone: string;
  medicalOfficer: string;
}

export interface MbappeRecoveryPlanData {
  player: {
    id: string;
    name: string;
    number: number;
    position: string;
    club: string;
    injuryType: string;
    injuryDate: string;
    targetMatch: string;
  };
  clinicalSummary: {
    diagnosis: string;
    mriResult: string;
    currentPainRest: number; // /10
    currentPainEffort: number; // /10
    jointMobility: string;
    isokineticSymmetry: number; // %
    targetClearanceDate: string;
    estimatedMatchMinutes: string;
  };
  currentPhase: RTPPhaseId;
  phases: RTPPhaseConfig[];
  dailySchedule: MbappeDailyPlan[];
  keyMedicalDirectives: {
    title: string;
    description: string;
    source: string;
    status: 'ok' | 'watch' | 'action';
  }[];
}

export const MBAPPE_KNEE_PLAN_DATA: MbappeRecoveryPlanData = {
  player: {
    id: 'mbappe',
    name: 'Kylian Mbappé',
    number: 10,
    position: 'Attaquant / Capitaine',
    club: 'Real Madrid',
    injuryType: 'Entorse bénigne Ligament Latéral Interne (LLI) genou Droit',
    injuryDate: '24 Septembre 2026 (En club)',
    targetMatch: `${UPCOMING_MATCH.title} (${UPCOMING_MATCH.date})`
  },
  clinicalSummary: {
    diagnosis: 'Entorse stade 1 du LLI genou droit avec minime œdème péri-ligamentaire, sans lésion méniscale ni atteinte du pivot central (LCA intact).',
    mriResult: 'IRM de contrôle Clairefontaine (28/09) : Continuité fibrillaire parfaite. Résorption de l’œdème à 85%. Aucune instabilité en valgus forcé.',
    currentPainRest: 0,
    currentPainEffort: 1,
    jointMobility: '100% (Extension complète 0° / Flexion 140°)',
    isokineticSymmetry: 92,
    targetClearanceDate: 'Samedi 03 Octobre (J-2)',
    estimatedMatchMinutes: '60 à 75 minutes préconisées'
  },
  currentPhase: 'phase_2',
  phases: [
    {
      id: 'phase_1',
      phaseNumber: 1,
      title: 'Étape 1 : Réduction de l’inflammation & mobilité',
      subtitle: 'Contrôle de l’inflammation, drainage et reprise des amplitudes sans impact',
      status: 'completed',
      dateRange: '25 - 28 Septembre',
      clinicalObjective: 'Élimination de l’épanchement synovial et verrouillage du quadriceps.',
      clearanceCriteria: [
        'Absence de douleur au repos (EVA 0/10)',
        'Extension active complète à 0°',
        'Verrouillage quadricipital symétrique',
        'Feu vert échographique Dr. Le Gall'
      ],
      fieldDrills: ['Marche active sur pelouse souple 15 min'],
      gymDrills: [
        'Vélo ergomètre décharge 20 min',
        'Électrostimulation Compex sur vaste médial',
        'Cryocompression Game Ready 3x/jour',
        'Travail proprioceptif bipodal'
      ],
      gpsTargetMetrics: {
        maxSpeedKmH: '< 12 km/h',
        targetDistanceKm: '1.5 km',
        maxHeartRate: '< 65% FCmax',
        impactTolerance: 'Décharge partielle'
      }
    },
    {
      id: 'phase_2',
      phaseNumber: 2,
      title: 'Étape 2 : Renforcement musculaire ciblé',
      subtitle: 'Renforcement progressif du quadriceps et des stabilisateurs, avec contrôle de la réponse du genou',
      status: 'in_progress',
      dateRange: '29 Septembre - 01 Octobre (Actuel)',
      clinicalObjective: 'Restaurer la force et la symétrie du membre inférieur avant la reprise de course.',
      clearanceCriteria: [
        'Renforcement unipodal réalisé sans douleur ni compensation',
        'Symétrie isocinétique > 90%',
        'Test Y-Balance satisfaisant (>95% membre controlatéral)',
        'Aucun gonflement réactionnel post-effort (périmètre sous-rotulien stable)'
      ],
      fieldDrills: [
        'Courses linéaires en fractionné léger (15-18 km/h)',
        'Slaloms très larges avec grands rayons de courbure',
        'Conduites de balle douces pied droit/gauche',
        'Gammes athlétiques montées de genoux & talons-fesses'
      ],
      gymDrills: [
        'Presse inclinée unipodale excentrique lente',
        'Nordic Hamstring & Leg Extension guidé',
        'Proprioception unipodale sur plateau instable et perturbations légères',
        'Travail cardio haut du corps (Ski-Erg / Rameur)'
      ],
      gpsTargetMetrics: {
        maxSpeedKmH: '22 - 25 km/h',
        targetDistanceKm: '4.5 - 5.5 km',
        maxHeartRate: '< 82% FCmax',
        impactTolerance: 'Linéaire complet'
      }
    },
    {
      id: 'phase_3',
      phaseNumber: 3,
      title: 'Étape 3 : Réathlétisation & reprise de course',
      subtitle: 'Reprise progressive de la course linéaire, puis augmentation contrôlée de la vitesse et de la charge',
      status: 'upcoming',
      dateRange: '02 - 03 Octobre (Prévu)',
      clinicalObjective: 'Vérifier la tolérance du genou à la course et aux changements progressifs de charge.',
      clearanceCriteria: [
        'Course linéaire progressive réalisée sans douleur',
        'Accélérations et décélérations contrôlées sans appréhension',
        'Aucun gonflement réactionnel dans les 24 heures suivant la séance',
        'Validation conjointe du médecin et du kinésithérapeute'
      ],
      fieldDrills: [
        'Course continue sur terrain plat à intensité modérée',
        'Accélérations progressives avec récupération complète entre les répétitions',
        'Exercices d’équilibre et de contrôle unipodal en mouvement',
        'Augmentation graduelle de la durée selon la tolérance clinique'
      ],
      gymDrills: [
        'Pliométrie basse et moyenne intensité (sauts de haies basses)',
        'Fentes dynamiques avec charge et résistance élastique',
        'Gainage dynamique et gainage frontal instable'
      ],
      gpsTargetMetrics: {
        maxSpeedKmH: '30 - 34 km/h',
        targetDistanceKm: '6.0 - 7.0 km',
        maxHeartRate: '< 92% FCmax',
        impactTolerance: 'Multi-directionnel'
      }
    },
    {
      id: 'phase_4',
      phaseNumber: 4,
      title: 'Étape 4 : Feu vert pour les entraînements collectifs',
      subtitle: 'Reprise graduée après validation clinique explicite de l’équipe médicale',
      status: 'upcoming',
      dateRange: '04 - 05 Octobre (Match)',
      clinicalObjective: 'Confirmer la stabilité clinique et définir les conditions d’une reprise sans risque excessif.',
      clearanceCriteria: [
        'Mobilité complète et tests cliniques sans anomalie',
        'Aucune douleur ni réaction inflammatoire après les séances précédentes',
        'Feu vert explicite du médecin et du kinésithérapeute référents'
      ],
      fieldDrills: [
        'Reprise des entraînements collectifs selon la charge définie par le staff médical',
        'Progression du volume et de l’intensité selon les réponses cliniques',
        'Réévaluation médicale avant chaque nouvelle augmentation de charge'
      ],
      gymDrills: ['Activation neuromusculaire d’avant-match 15 min'],
      gpsTargetMetrics: {
        maxSpeedKmH: '> 35 km/h (Vmax naturelle)',
        targetDistanceKm: '8.5 - 10.5 km',
        maxHeartRate: '100% intensité match',
        impactTolerance: 'Compétition totale'
      }
    }
  ],
  dailySchedule: [
    {
      dayName: 'Lundi',
      dayDate: '29 Septembre',
      matchOffset: 'J-6',
      phaseNumber: 2,
      morningSession: {
        title: 'Bilan clinique d’arrivée & Travail aérobie en décharge',
        duration: '60 min',
        location: 'Salle médicale & Fitness Clairefontaine',
        details: [
          'Mesure de l’œdème et testing du genou par Dr. Le Gall (résultat rassurant)',
          'Vélo Wattbike 25 min à 180W',
          'Renforcement isométrique quadriceps et fessiers',
          'Cryothérapie corps entier -110°C'
        ],
        loadUA: 210
      },
      afternoonSession: {
        title: 'Proprioception & Reprise de course sur tapis Alter-G',
        duration: '50 min',
        location: 'Pôle Réathlétisation',
        details: [
          'Course continue 20 min sur tapis anti-gravité à 75% du poids de corps',
          'Travail d’équilibre sur dôme Bosu avec renvoi de ballon',
          'Balnéothérapie eau chaude/froide'
        ],
        loadUA: 190
      },
      medicalMilestone: 'Échographie de contrôle : 0 épanchement synovial',
      medicalOfficer: 'Dr. Franck Le Gall'
    },
    {
      dayName: 'Mardi',
      dayDate: '30 Septembre',
      matchOffset: 'J-5',
      phaseNumber: 2,
      morningSession: {
        title: 'Renforcement neuromusculaire & Isocinétisme',
        duration: '70 min',
        location: 'Centre de Performance FFF',
        details: [
          'Test isocinétique Cybex (Ratio Q/I mesuré à 92%)',
          'Presse horizontale unipodale 4x8 répétitions',
          'Gainage pelvien et stabilisation du bassin'
        ],
        loadUA: 290
      },
      afternoonSession: {
        title: 'Premières foulées sur terrain & Conduite de balle',
        duration: '60 min',
        location: 'Terrain Michel Platini (Clairefontaine)',
        details: [
          'Footing aérobie terrain 25 min (vitesse régulée 14-17 km/h)',
          'Circuits techniques de passes douces avec le préparateur physique',
          'Accélérations progressives sur 40m en ligne droite'
        ],
        loadUA: 340
      },
      medicalMilestone: 'Validation de l’appui unipodal complet sans douleur',
      medicalOfficer: 'Alexandre Germain (Préparateur Physique)'
    },
    {
      dayName: 'Mercredi',
      dayDate: '01 Octobre',
      matchOffset: 'J-4',
      phaseNumber: 2,
      morningSession: {
        title: 'Cardio intermittent & Puissance musculaire',
        duration: '65 min',
        location: 'Salle & Piste athlétique',
        details: [
          'Fractionné terrain 8x (30s à 20 km/h / 30s trot)',
          'Travail de poussée sur luge de force (charge adaptée)',
          'Étirements balistiques et mobilité articulaire'
        ],
        loadUA: 380
      },
      afternoonSession: {
        title: 'Finitions spécifiques & Gammes d’attaquant',
        duration: '55 min',
        location: 'Terrain',
        details: [
          'Enchaînements contrôle-frappe au sol sans contrainte angulaire',
          'Appels de balle dans l’intervalle avec départ lancé',
          'Séance de soins kiné et massage myotensif'
        ],
        loadUA: 310
      },
      medicalMilestone: 'Test de tolérance aux impacts validé (GPS Vmax : 26.4 km/h)',
      medicalOfficer: 'Staff Médical & Kiné'
    },
    {
      dayName: 'Jeudi',
      dayDate: '02 Octobre',
      matchOffset: 'J-3',
      phaseNumber: 3,
      morningSession: {
        title: 'BASBASCULE PHASE 3 • Changements de direction & Vitesse',
        duration: '75 min',
        location: 'Terrain Principal',
        details: [
          'Échauffement avec le groupe collectif (25 min)',
          'Slaloms serrés et feintes de corps avec opposition semi-passive',
          'Sprints maximaux sur 15-20m avec chronométrage laser',
          'Tirs au but et volées'
        ],
        loadUA: 490
      },
      afternoonSession: {
        title: 'Régénération active & Balnéothérapie',
        duration: '45 min',
        location: 'Espace Récupération',
        details: [
          'Bain froid 10°C (8 min) + sauna infrarouge',
          'Massage décontracturant quadriceps/adducteurs',
          'Séance vidéo tactique personnalisée'
        ],
        loadUA: 120
      },
      medicalMilestone: 'Point clinique d’étape avec Zinédine Zidane & Dr. Le Gall',
      medicalOfficer: 'Dr. Franck Le Gall & Zinédine Zidane'
    },
    {
      dayName: 'Vendredi',
      dayDate: '03 Octobre',
      matchOffset: 'J-2',
      phaseNumber: 3,
      morningSession: {
        title: 'RÉINTÉGRATION COLLECTIVE • Mise en place tactique',
        duration: '60 min',
        location: 'Terrain Principal',
        details: [
          'Participation à 100% de la séance tactique de l’Équipe de France',
          'Mise en place des combinaisons offensives avec Griezmann, Barcola et Dembélé',
          'Simulation de phases de transition rapide'
        ],
        loadUA: 410
      },
      afternoonSession: {
        title: 'Soins préventifs & Strap proprioceptif',
        duration: '40 min',
        location: 'Espace Kiné',
        details: [
          'Pose et test du strapping K-Tape de maintien ligamentaire',
          'Cryothérapie compressive post-séance'
        ],
        loadUA: 80
      },
      medicalMilestone: 'Feu vert médical officiel pour la feuille de match',
      medicalOfficer: 'Dr. Franck Le Gall'
    },
    {
      dayName: 'Samedi',
      dayDate: '04 Octobre',
      matchOffset: 'J-1',
      phaseNumber: 4,
      morningSession: {
        title: 'Veille de match collective & Coups de pied arrêtés',
        duration: '45 min',
        location: 'Stade de France',
        details: [
          'Éveil neuromusculaire collectif',
          'CPA offensifs et tirs au but',
          'Sensations d’appui sur la pelouse du match'
        ],
        loadUA: 220
      },
      afternoonSession: {
        title: 'Préparation mentale & Hydratation',
        duration: '30 min',
        location: 'Hôtel des Bleus',
        details: [
          'Revue des protocoles d’échauffement',
          'Protocole de sommeil et charge hydrique'
        ],
        loadUA: 50
      },
      medicalMilestone: 'Aptitude 100% confirmée pour débuter la rencontre',
      medicalOfficer: 'Pôle Médical FFF'
    }
  ],
  keyMedicalDirectives: [
    {
      title: 'Stabilité Ligamentaire Testée & Validée',
      description: 'Le testing clinique en valgus à 30° de flexion ne montre aucun bâillement articulaire. Le ligament a cicatrisé sans laxité résiduelle.',
      source: 'Rapport clinique Dr. Franck Le Gall',
      status: 'ok'
    },
    {
      title: 'Régulation du Temps de Jeu (Match J-0)',
      description: 'Recommandation staff : titularisation autorisée avec sortie programmée entre la 60e et la 75e minute pour éviter la fatigue excentrique terminale.',
      source: 'Staff Technique & Performance FFF',
      status: 'watch'
    },
    {
      title: 'Suivi GPS en Direct pendant le Match',
      description: 'Monitoring temps réel des métriques d’accélération et décélération par Catapult Vector pour alerter le banc si un seuil de charge critique est franchi.',
      source: 'Alexandre Germain (Pôle GPS)',
      status: 'action'
    }
  ]
};
