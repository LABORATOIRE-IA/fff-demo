import { UPCOMING_MATCH } from './upcomingMatch';

export type TacticalOptionId = 'option1' | 'option2' | 'option3';

export interface TacticalSlot {
  id: string;
  roleCode: string; // e.g. 'GK', 'DC', 'DD', 'DG', 'MDC', 'MC', 'MO', 'AD', 'AG', 'BU', 'Piston D', 'Piston G'
  roleName: string;
  x: number; // Percentage on pitch (0 - 100)
  y: number; // Percentage on pitch (0 - 100)
  defaultPlayerId: string;
}

export interface TacticalArgument {
  category: 'INTENSITÉ' | 'RÉCUPÉRATION' | 'FORME' | 'DISPONIBILITÉ' | 'ÉQUILIBRE DE CHARGE';
  title: string;
  metric: string;
  explanation: string;
}

export interface TacticalScenarioConfig {
  id: TacticalOptionId;
  title: string;
  subtitle: string;
  formation: string;
  philosophy: string;
  badge: string;
  slots: TacticalSlot[];
  baselineMetrics: {
    forme: number;
    recuperation: number;
    intensite: number;
    charge: number;
    disponibilite: number;
    equilibre: number;
  };
  keyArguments: TacticalArgument[];
  explicabilityData: {
    title: string;
    description: string;
    dataPoint: string;
  }[];
}

export const TACTICAL_SCENARIOS: TacticalScenarioConfig[] = [
  {
    id: 'option1',
    title: 'Équilibre & maîtrise',
    subtitle: 'Stabilité axiale et régulation du tempo face à la possession espagnole',
    formation: '4-3-3',
    philosophy: 'Contrôle du rythme et transition progressive',
    badge: 'Scénario 1 • 4-3-3',
    slots: [
      { id: 's-gk', roleCode: 'GB', roleName: 'Gardien', x: 50, y: 88, defaultPlayerId: 'maignan' },
      { id: 's-rb', roleCode: 'DD', roleName: 'Latéral Droit', x: 84, y: 70, defaultPlayerId: 'kounde' },
      { id: 's-rcb', roleCode: 'DC D', roleName: 'Défenseur Central D', x: 62, y: 73, defaultPlayerId: 'saliba' },
      { id: 's-lcb', roleCode: 'DC G', roleName: 'Défenseur Central G', x: 38, y: 73, defaultPlayerId: 'upamecano' },
      { id: 's-lb', roleCode: 'DG', roleName: 'Latéral Gauche', x: 16, y: 70, defaultPlayerId: 'hernandez_t' },
      { id: 's-cdm', roleCode: 'MDC', roleName: 'Milieu Défensif Sentinelle', x: 50, y: 52, defaultPlayerId: 'tchouameni' },
      { id: 's-rcm', roleCode: 'MC D', roleName: 'Milieu Relayeur Droit', x: 70, y: 40, defaultPlayerId: 'zaire_emery' },
      { id: 's-lcm', roleCode: 'MC G', roleName: 'Milieu Relayeur Gauche', x: 30, y: 40, defaultPlayerId: 'rabiot' },
      { id: 's-rw', roleCode: 'AD', roleName: 'Ailier Droit', x: 82, y: 22, defaultPlayerId: 'dembele' },
      { id: 's-st', roleCode: 'BU', roleName: 'Avant-Centre', x: 50, y: 14, defaultPlayerId: 'mbappe' },
      { id: 's-lw', roleCode: 'AG', roleName: 'Ailier Gauche', x: 18, y: 22, defaultPlayerId: 'barcola' }
    ],
    baselineMetrics: {
      forme: 88,
      recuperation: 90,
      intensite: 84,
      charge: 87,
      disponibilite: 96,
      equilibre: 92
    },
    keyArguments: [
      {
        category: 'RÉCUPÉRATION',
        title: 'Niveau moyen très élevé',
        metric: '90/100',
        explanation: '90/100 de récupération moyenne du XI titulaire pour soutenir 90 min à haute lucidité.'
      },
      {
        category: 'ÉQUILIBRE DE CHARGE',
        title: 'Zone de charge optimale',
        metric: '9/11 joueurs',
        explanation: '9 joueurs dans leur zone de charge idéale (ACWR moyen à 1.04) sans pic de fatigue aiguë.'
      },
      {
        category: 'FORME',
        title: 'Continuité des titulaires',
        metric: '88/100',
        explanation: '8 titulaires actuellement au-dessus de leur moyenne personnelle sur les 30 derniers jours.'
      },
      {
        category: 'DISPONIBILITÉ',
        title: 'Effectif opérationnel',
        metric: '11/11 joueurs',
        explanation: '100% du XI validé sans contre-indication par le staff médical.'
      }
    ],
    explicabilityData: [
      {
        title: 'Monitoring de Charge 7/28 jours',
        description: 'La répartition en 4-3-3 offre la dispersion de charge GPS la plus stable pour l’ensemble des lignes.',
        dataPoint: 'ACWR médian : 1.04 • Distance attendue : 118 km'
      },
      {
        title: 'Disponibilité & Intégrité Physique',
        description: 'Prise en compte des 42 jours sans lésion de la charnière centrale et de la fraîcheur des latéraux.',
        dataPoint: '100% aptes • Aucune limitation de temps de jeu'
      },
      {
        title: 'Profils Physiques vs Adversaire',
        description: `La ${UPCOMING_MATCH.awayTeam} monopolise 62% de possession : le trio Tchouaméni-Rabiot-Zaïre-Emery maximise la couverture de terrain.`,
        dataPoint: 'Surface couverte estimée : 412 m² par joueur'
      }
    ]
  },
  {
    id: 'option2',
    title: 'Pressing & intensité',
    subtitle: 'Bloc médian compact, projection verticale rapide et duel sur relance',
    formation: '4-2-3-1',
    philosophy: 'Impact à la perte et attaques éclairs dans le dos des latéraux',
    badge: 'Scénario 2 • 4-2-3-1',
    slots: [
      { id: 's-gk', roleCode: 'GB', roleName: 'Gardien', x: 50, y: 88, defaultPlayerId: 'maignan' },
      { id: 's-rb', roleCode: 'DD', roleName: 'Latéral Droit', x: 84, y: 70, defaultPlayerId: 'kounde' },
      { id: 's-rcb', roleCode: 'DC D', roleName: 'Défenseur Central D', x: 62, y: 73, defaultPlayerId: 'saliba' },
      { id: 's-lcb', roleCode: 'DC G', roleName: 'Défenseur Central G', x: 38, y: 73, defaultPlayerId: 'konate' },
      { id: 's-lb', roleCode: 'DG', roleName: 'Latéral Gauche', x: 16, y: 70, defaultPlayerId: 'hernandez_t' },
      { id: 's-cdm1', roleCode: 'MDC D', roleName: 'Pivot Défensif D', x: 65, y: 54, defaultPlayerId: 'tchouameni' },
      { id: 's-cdm2', roleCode: 'MDC G', roleName: 'Pivot Défensif G', x: 35, y: 54, defaultPlayerId: 'camavinga' },
      { id: 's-ram', roleCode: 'MOD', roleName: 'Milieu Offensif Droit', x: 80, y: 32, defaultPlayerId: 'olise' },
      { id: 's-cam', roleCode: 'MOC', roleName: 'Meneur de Jeu', x: 50, y: 34, defaultPlayerId: 'griezmann' },
      { id: 's-lam', roleCode: 'MOG', roleName: 'Milieu Offensif Gauche', x: 20, y: 32, defaultPlayerId: 'barcola' },
      { id: 's-st', roleCode: 'BU', roleName: 'Avant-Centre', x: 50, y: 14, defaultPlayerId: 'mbappe' }
    ],
    baselineMetrics: {
      forme: 91,
      recuperation: 83,
      intensite: 94,
      charge: 82,
      disponibilite: 94,
      equilibre: 86
    },
    keyArguments: [
      {
        category: 'INTENSITÉ',
        title: 'Pic de puissance et vitesse',
        metric: '+12 %',
        explanation: '+12 % de capacité haute intensité (sprints > 25 km/h) par rapport aux autres scénarios.'
      },
      {
        category: 'FORME',
        title: 'Forme maximale du secteur offensif',
        metric: '91/100',
        explanation: 'Indice de forme culminant grâce à la dynamique récente de Mbappé, Griezmann, Olise et Barcola.'
      },
      {
        category: 'DISPONIBILITÉ',
        title: 'Surveillance ciblée',
        metric: '10/11 à 100%',
        explanation: '1 joueur sous surveillance d’effort (Camavinga), gestion préconisée à la 65e minute.'
      },
      {
        category: 'ÉQUILIBRE DE CHARGE',
        title: 'Consommation énergétique accrue',
        metric: '82/100',
        explanation: 'Nécessite 2 à 3 rotations de postes clés en seconde période pour maintenir l’impact.'
      }
    ],
    explicabilityData: [
      {
        title: 'Indicateurs de Vitesse & Accélération',
        description: 'La combinaison Barcola / Olise / Mbappé cumule 49 sprints à haute vélocité en moyenne par 90 min.',
        dataPoint: 'Vmax moyenne offensive : 35.1 km/h'
      },
      {
        title: 'Duels & Récupération Haute',
        description: 'Le double pivot Camavinga - Tchouaméni présente 78% de duels défensifs gagnés dans le premier tiers.',
        dataPoint: 'Ballons récupérés : 14.2 / match'
      },
      {
        title: 'Gestion de la Fatigue Musculaire',
        description: 'Planification d’un coaching dès la 60e min pour préserver les réserves glycogéniques du quatuor d’attaque.',
        dataPoint: 'Charge cumulée estimée : 3 150 UA'
      }
    ]
  },
  {
    id: 'option3',
    title: 'Contrôle & sécurité',
    subtitle: 'Densité défensive à 3 axiaux, pistons d’animation et verrouillage des couloirs',
    formation: '3-4-2-1',
    philosophy: 'Solidité hermétique, supériorité numérique axiale et transitions ciblées',
    badge: 'Scénario 3 • 3-4-2-1',
    slots: [
      { id: 's-gk', roleCode: 'GB', roleName: 'Gardien', x: 50, y: 88, defaultPlayerId: 'maignan' },
      { id: 's-rcb', roleCode: 'DC D', roleName: 'Défenseur Central Droit', x: 74, y: 74, defaultPlayerId: 'pavard' },
      { id: 's-ccb', roleCode: 'DC C', roleName: 'Défenseur Central Axe', x: 50, y: 76, defaultPlayerId: 'saliba' },
      { id: 's-lcb', roleCode: 'DC G', roleName: 'Défenseur Central Gauche', x: 26, y: 74, defaultPlayerId: 'upamecano' },
      { id: 's-rwb', roleCode: 'Pist D', roleName: 'Piston Droit', x: 88, y: 48, defaultPlayerId: 'kounde' },
      { id: 's-rcm', roleCode: 'MC D', roleName: 'Milieu Central Droit', x: 62, y: 52, defaultPlayerId: 'tchouameni' },
      { id: 's-lcm', roleCode: 'MC G', roleName: 'Milieu Central Gauche', x: 38, y: 52, defaultPlayerId: 'rabiot' },
      { id: 's-lwb', roleCode: 'Pist G', roleName: 'Piston Gauche', x: 12, y: 48, defaultPlayerId: 'hernandez_t' },
      { id: 's-ram', roleCode: 'MO D', roleName: 'Soutien Offensif Droit', x: 68, y: 28, defaultPlayerId: 'griezmann' },
      { id: 's-lam', roleCode: 'MO G', roleName: 'Soutien Offensif Gauche', x: 32, y: 28, defaultPlayerId: 'dupont' },
      { id: 's-st', roleCode: 'BU', roleName: 'Avant-Centre', x: 50, y: 14, defaultPlayerId: 'mbappe' }
    ],
    baselineMetrics: {
      forme: 84,
      recuperation: 92,
      intensite: 78,
      charge: 91,
      disponibilite: 98,
      equilibre: 90
    },
    keyArguments: [
      {
        category: 'DISPONIBILITÉ',
        title: 'Indice de sécurité maximal',
        metric: '98 %',
        explanation: '98% d’aptitude collective et risque de blessure minimalisé par la répartition des courses défensives.'
      },
      {
        category: 'RÉCUPÉRATION',
        title: 'Excellente fraîcheur',
        metric: '92/100',
        explanation: 'La structure à 3 centraux permet d’économiser 18% de sprints défensifs en repli d’urgence.'
      },
      {
        category: 'ÉQUILIBRE DE CHARGE',
        title: 'Volume défensif verrouillé',
        metric: '91/100',
        explanation: `Sécurisation totale de l’axe face au jeu combiné belge dans les demi-espaces.`
      },
      {
        category: 'INTENSITÉ',
        title: 'Attaque chirurgicale',
        metric: '78/100',
        explanation: 'Intensité globale plus modérée mais capacité de projection maximale sur Mbappé et les deux 10.'
      }
    ],
    explicabilityData: [
      {
        title: 'Analyse des demi-espaces adverses',
        description: `La ${UPCOMING_MATCH.awayTeam} pénètre à 71% par les intervalles intérieurs : le bloc à 3 centraux supprime les couloirs de passe axiaux.`,
        dataPoint: 'Taux d’interception simulé : +22%'
      },
      {
        title: 'Disponibilité & Économie d’Énergie',
        description: 'Optimisation de la dépense cardiaque pour les cadres de l’équipe avant l’enchaînement de la phase finale.',
        dataPoint: 'HRV moyen du groupe : 88 ms'
      },
      {
        title: 'Données GPS des Pistons',
        description: 'Les couloirs sont confiés à Théo Hernandez et Jules Koundé, nos deux profils avec la plus haute VMA.',
        dataPoint: 'VMA Koundé : 20.2 km/h • VMA Hernandez : 21.0 km/h'
      }
    ]
  }
];
