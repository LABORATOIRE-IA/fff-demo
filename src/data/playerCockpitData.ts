import { Player } from '../types/ams';

export type RoleCategory = 'gardien' | 'defenseur' | 'lateral' | 'milieu' | 'ailier' | 'attaquant' | 'arbitre_central' | 'arbitre_assistant' | 'arbitre_var';

export interface RadarAxis {
  axis: string;
  playerValue: number;
  benchmarkValue: number;
  previousValue?: number;
}

export interface StatComparison {
  name: string;
  current: string | number;
  personalAverage: string | number;
  benchmark: string | number;
  diff: string;
  isPositive: boolean;
  unit?: string;
}

export interface HeatmapZoneCoord {
  x: number; // percentage 0-100 from left
  y: number; // percentage 0-100 from top
  radius: number; // radius in px
  intensity: number; // 0 to 1
  label?: string;
}

export interface SectionMetricItem {
  name: string; // Nom de la métrique
  value: string | number; // Valeur
  unit: string; // Unité
  benchmark: string | number; // Moyenne / référence
  indicator: 'plus' | 'moins' | 'egal'; // Indicateur par rapport à la moyenne
  diff: string; // Écart affiché (+2.6 km/h, -0.12 s, etc.)
  isPositive: boolean; // Si cet écart est favorable ou défavorable
}

export interface SectionDetailInfo {
  id: 'physique' | 'charge' | 'sante' | 'recuperation' | 'performance' | 'tactique' | 'forme' | 'technique' | 'mental';
  title: string;
  subtitle: string;
  score: number;
  benchmarkScore: number;
  badgeLabel: string;
  summary: string;
  staffRecommendation: string;
  metrics: SectionMetricItem[];
}

export interface CockpitPositionProfile {
  roleCategory: RoleCategory;
  roleLabel: string;
  tacticalRoleDescription: string;
  scoreGlobalComment: string;
  formeDuMoment: {
    score: number;
    trend: string;
    label: string;
    details: string;
  };
  radarAxes: RadarAxis[];
  statComparisons: StatComparison[];
  heatmapZones: HeatmapZoneCoord[];
  heatmapDescription: string;
  atouts: {
    title: string;
    description: string;
    tag: string;
  }[];
  axesProgression: {
    title: string;
    description: string;
    severity: 'warning' | 'alert' | 'info';
    action: string;
  }[];
  acwr: {
    ratio: number;
    status: 'optimal' | 'vigilance' | 'danger';
    acuteLoad: number;
    chronicLoad: number;
    comment: string;
  };
  gpsSummary: {
    distanceKm: number;
    sprintsCount: number;
    vitesseMax: number;
    accelMax: number;
    metabolicPower: string;
  };
  recoverySummary: {
    hrv: number;
    sommeil: string;
    sommeilQualite: string;
    courbatures: string;
    readinessScore: number;
  };
}

export function getPlayerCockpitProfile(player: Player): CockpitPositionProfile {
  const pName = player.name.toLowerCase();
  const position = player.position;

  // Detect specific role category
  let roleCategory: RoleCategory = 'milieu';
  if (player.isReferee || player.id.startsWith('ref-') || position.includes('Arbitre')) {
    if (position.includes('Assistant') || pName.includes('mugnier') || pName.includes('danos') || pName.includes('rahmouni') || pName.includes('nicolosi')) {
      roleCategory = 'arbitre_assistant';
    } else if (position.includes('VAR') || pName.includes('brisard')) {
      roleCategory = 'arbitre_var';
    } else {
      roleCategory = 'arbitre_central';
    }
  } else if (position === 'Gardien') {
    roleCategory = 'gardien';
  } else if (pName.includes('kounde') || pName.includes('hernandez') || pName.includes('clauss')) {
    roleCategory = 'lateral';
  } else if (position === 'Défenseur') {
    roleCategory = 'defenseur';
  } else if (pName.includes('dembele') || pName.includes('barcola') || pName.includes('coman')) {
    roleCategory = 'ailier';
  } else if (position === 'Attaquant') {
    roleCategory = 'attaquant';
  } else {
    roleCategory = 'milieu';
  }

  // Position-adapted configurations
  switch (roleCategory) {
    case 'arbitre_central':
      return {
        roleCategory: 'arbitre_central',
        roleLabel: 'Arbitre Central FFF & FIFA Elite',
        tacticalRoleDescription: 'Direction du jeu • Déplacement diagonal dynamique, autorité naturelle, gestion des temps forts et arbitrage vidéo VAR',
        scoreGlobalComment: 'Excellente lucidité dans la prise de décision, maîtrise des contestations et gestion du rythme de match.',
        formeDuMoment: {
          score: 92,
          trend: '+3 pts',
          label: 'Condition Élite FIFA',
          details: 'Test physique FIFA SDS validé avec mention, temps de réaction optimal lors des situations conflictuelles.'
        },
        radarAxes: [
          { axis: 'Précision Décisionnelle', playerValue: 94, benchmarkValue: 82 },
          { axis: 'Volume de Déplacement', playerValue: 93, benchmarkValue: 80 },
          { axis: 'Management & Autorité', playerValue: 91, benchmarkValue: 79 },
          { axis: 'Vitesse de Démarcation', playerValue: 89, benchmarkValue: 78 },
          { axis: 'Protocole & Vision VAR', playerValue: 96, benchmarkValue: 84 },
          { axis: 'Sérénité sous Pression', playerValue: 92, benchmarkValue: 81 }
        ],
        statComparisons: [
          { name: 'Note Observateurs UEFA', current: '8.75 / 10', personalAverage: '8.60', benchmark: '8.20', diff: '+0.55', isPositive: true },
          { name: 'Validation Décisions VAR', current: '98.2%', personalAverage: '96.5%', benchmark: '92.0%', diff: '+6.2%', isPositive: true },
          { name: 'Distance moyenne / match', current: '11.8 km', personalAverage: '11.4 km', benchmark: '10.5 km', diff: '+1.3 km', isPositive: true },
          { name: 'Courses > 20 km/h', current: '1 940 m', personalAverage: '1 820 m', benchmark: '1 450 m', diff: '+490 m', isPositive: true },
          { name: 'Temps moyen Check VAR', current: '32 s', personalAverage: '38 s', benchmark: '52 s', diff: '-20 s', isPositive: true }
        ],
        heatmapZones: [
          { x: 28, y: 72, radius: 44, intensity: 0.88, label: 'Zone médiane défensive gauche' },
          { x: 42, y: 55, radius: 46, intensity: 0.94, label: 'Cercle central & rond central' },
          { x: 62, y: 35, radius: 44, intensity: 0.92, label: 'Axe diagonal offensif droit' },
          { x: 50, y: 22, radius: 36, intensity: 0.85, label: 'Entrée surface de réparation' },
          { x: 38, y: 38, radius: 30, intensity: 0.70, label: 'Demi-espace de transition' },
          { x: 68, y: 65, radius: 30, intensity: 0.65, label: 'Repli en contre-attaque' }
        ],
        heatmapDescription: 'Diagonale tactique classique fluide d’une surface à l’autre garantissant un angle de vue dégagé sans masquer les lignes de passes.',
        atouts: [
          { title: 'Excellente proximité avec le ballon', description: 'Distance moyenne mesurée à 13.8 mètres de chaque faute sifflée.', tag: 'Placement' },
          { title: 'Calme et autorité pédagogique', description: 'Communication fluide avec les capitaines, désamorçage immédiat des tensions.', tag: 'Management' },
          { title: 'Vitesse en transition rapide', description: 'Accélération à 28.5 km/h pour suivre les contre-attaques de 80 mètres.', tag: 'Endurance' }
        ],
        axesProgression: [
          { title: 'Surveillance soléaire post-match', description: 'Travail préventif sur les mollets et protocole de cryothérapie systématique.', severity: 'warning', action: 'Massages et récupération active' },
          { title: 'Optimisation de la gestuelle VAR', description: 'Rappeler explicitement le signal d’écran avant de consulter le moniteur de bord de terrain.', severity: 'info', action: 'Atelier pédagogique DTA' }
        ],
        acwr: {
          ratio: 1.09,
          status: 'optimal',
          acuteLoad: 2850,
          chronicLoad: 2610,
          comment: 'Charge bien équilibrée entre les matchs de coupe d’Europe et les séances de maintien aérobie à Clairefontaine.'
        },
        gpsSummary: {
          distanceKm: 11.8,
          sprintsCount: 22,
          vitesseMax: 31.4,
          accelMax: 3.8,
          metabolicPower: '32.5 W/kg'
        },
        recoverySummary: {
          hrv: player.dimensions?.recuperation?.hrv || 76,
          sommeil: player.dimensions?.recuperation?.sommeil || '8h15',
          sommeilQualite: '92% efficace',
          courbatures: '0/10 (Parfaitement récupéré)',
          readinessScore: 88
        }
      };

    case 'arbitre_assistant':
      return {
        roleCategory: 'arbitre_assistant',
        roleLabel: 'Arbitre Assistant FFF & FIFA (Touche)',
        tacticalRoleDescription: 'Surveillance de la ligne de touche • Alignement millimétré sur l’avant-dernier défenseur, détection des hors-jeu et appui aux décisions',
        scoreGlobalComment: 'Précision d’alignement remarquable (98.4%), rapidité de prise de décision et communication oreillette limpide.',
        formeDuMoment: {
          score: 94,
          trend: '+4 pts',
          label: 'Condition ARIET Optimale',
          details: 'Test spécifique intermittent pour arbitre assistant (ARIET) validé avec brio au palier 17.5.'
        },
        radarAxes: [
          { axis: 'Précision Hors-Jeu', playerValue: 98, benchmarkValue: 88 },
          { axis: 'Alignement Défensif', playerValue: 96, benchmarkValue: 85 },
          { axis: 'Courses Latérales / Chassées', playerValue: 95, benchmarkValue: 82 },
          { axis: 'Test ARIET Spécifique', playerValue: 94, benchmarkValue: 80 },
          { axis: 'Temps de Réaction Drapeau', playerValue: 92, benchmarkValue: 82 },
          { axis: 'Communication Oreillette', playerValue: 95, benchmarkValue: 84 }
        ],
        statComparisons: [
          { name: 'Précision Hors-Jeu', current: '98.8%', personalAverage: '97.5%', benchmark: '93.2%', diff: '+5.6%', isPositive: true },
          { name: 'Courses latérales', current: '22.4%', personalAverage: '20.0%', benchmark: '16.5%', diff: '+5.9%', isPositive: true },
          { name: 'Test ARIET Vitesse', current: '17.8 km/h', personalAverage: '17.2 km/h', benchmark: '16.0 km/h', diff: '+1.8 km/h', isPositive: true },
          { name: 'Distance / match', current: '7.8 km', personalAverage: '7.4 km', benchmark: '6.9 km', diff: '+0.9 km', isPositive: true },
          { name: 'Délai levé drapeau', current: '0.38 s', personalAverage: '0.45 s', benchmark: '0.62 s', diff: '-0.24 s', isPositive: true }
        ],
        heatmapZones: [
          { x: 92, y: 75, radius: 28, intensity: 0.94, label: 'Ligne de touche défensive droite' },
          { x: 92, y: 50, radius: 32, intensity: 0.96, label: 'Ligne médiane de touche' },
          { x: 92, y: 28, radius: 30, intensity: 0.92, label: 'Ligne de touche offensive (hors-jeu)' },
          { x: 86, y: 16, radius: 24, intensity: 0.75, label: 'Ligne de but (corner / sortie)' }
        ],
        heatmapDescription: 'Activité linéaire rigoureusement concentrée le long de la ligne de touche droite, avec déplacements en pas chassés et sprints courts.',
        atouts: [
          { title: 'Alignement parfait sur la ligne de hors-jeu', description: 'Positionnement constant à la hauteur du dernier défenseur dans 99% des actions analysées.', tag: 'Alignement' },
          { title: 'Excellente vitesse en pas chassés', description: 'Capacité à maintenir le regard tourné vers le jeu tout en se déplaçant à plus de 16 km/h.', tag: 'Latéralité' },
          { title: 'Application du protocole de retard de drapeau', description: 'Excellente synchronisation pour laisser terminer les actions d’attaque avant de signaler.', tag: 'Protocole' }
        ],
        axesProgression: [
          { title: 'Renforcement adducteurs & fessiers', description: 'Prévention des douleurs pubiennes liées à l’accumulation des courses en pas chassés.', severity: 'info', action: 'Renforcement Pilates & kiné' }
        ],
        acwr: {
          ratio: 1.05,
          status: 'optimal',
          acuteLoad: 2150,
          chronicLoad: 2040,
          comment: 'Charge athlétique parfaitement calibrée pour les exigences du poste d’assistant.'
        },
        gpsSummary: {
          distanceKm: 7.8,
          sprintsCount: 16,
          vitesseMax: 29.2,
          accelMax: 3.9,
          metabolicPower: '28.0 W/kg'
        },
        recoverySummary: {
          hrv: player.dimensions?.recuperation?.hrv || 82,
          sommeil: player.dimensions?.recuperation?.sommeil || '8h30',
          sommeilQualite: '95% efficace',
          courbatures: '0/10 (Excellente récupération)',
          readinessScore: 92
        }
      };

    case 'arbitre_var':
      return {
        roleCategory: 'arbitre_var',
        roleLabel: 'Arbitre Vidéo Spécialiste VAR',
        tacticalRoleDescription: 'Centre Opérationnel Vidéo (VOR) • Analyse multi-angles, tracé des lignes de hors-jeu semi-automatisées et conseil de l’arbitre central',
        scoreGlobalComment: 'Rapidité d’analyse des incidents, rigueur dans le choix des angles pertinents et clarté de la communication radio.',
        formeDuMoment: {
          score: 95,
          trend: '+2 pts',
          label: 'Concentration Maximale',
          details: 'Temps d’intervention moyen de 28 secondes sur les incidents de surface de réparation.'
        },
        radarAxes: [
          { axis: 'Rapidité Analyse Vidéo', playerValue: 97, benchmarkValue: 85 },
          { axis: 'Précision Ligne Hors-Jeu', playerValue: 99, benchmarkValue: 90 },
          { axis: 'Communication Radio', playerValue: 96, benchmarkValue: 86 },
          { axis: 'Gestion du Stress & VOR', playerValue: 94, benchmarkValue: 82 },
          { axis: 'Connaissance Lois du Jeu', playerValue: 98, benchmarkValue: 92 },
          { axis: 'Sélection des Angles Pertinents', playerValue: 95, benchmarkValue: 84 }
        ],
        statComparisons: [
          { name: 'Validation décisions par l’arbitre', current: '100%', personalAverage: '98.5%', benchmark: '95.0%', diff: '+5.0%', isPositive: true },
          { name: 'Temps moyen de review', current: '28 s', personalAverage: '34 s', benchmark: '48 s', diff: '-20 s', isPositive: true },
          { name: 'Incidents révisés sans erreur', current: '42 / 42', personalAverage: '99%', benchmark: '96%', diff: '+3%', isPositive: true }
        ],
        heatmapZones: [
          { x: 50, y: 50, radius: 40, intensity: 0.90, label: 'Régie Vidéo VOR Clairefontaine' }
        ],
        heatmapDescription: 'Poste en régie vidéo opérationnelle (VOR). Focalisation visuelle continue sur les flux caméras ultra-haute vitesse et 3D.',
        atouts: [
          { title: 'Maîtrise technologique du simulateur 3D', description: 'Capacité à caler le point d’impact du ballon en moins de 12 secondes.', tag: 'Technologie' },
          { title: 'Protocole de communication structuré', description: 'Phrasé concis et sans ambiguïté facilitant la décision rapide sur le terrain.', tag: 'Radio' }
        ],
        axesProgression: [
          { title: 'Prévention de la fatigue visuelle', description: 'Exercices orthoptiques et pauses visuelles entre deux rencontres consécutives.', severity: 'info', action: 'Bilan ophtalmologique DTA' }
        ],
        acwr: {
          ratio: 1.02,
          status: 'optimal',
          acuteLoad: 1400,
          chronicLoad: 1380,
          comment: 'Charge cognitive élevée mais parfaitement gérée.'
        },
        gpsSummary: {
          distanceKm: 2.2,
          sprintsCount: 0,
          vitesseMax: 12.0,
          accelMax: 1.5,
          metabolicPower: '12.0 W/kg'
        },
        recoverySummary: {
          hrv: player.dimensions?.recuperation?.hrv || 78,
          sommeil: player.dimensions?.recuperation?.sommeil || '8h00',
          sommeilQualite: '90% efficace',
          courbatures: '0/10',
          readinessScore: 90
        }
      };

    case 'gardien':
      return {
        roleCategory: 'gardien',
        roleLabel: 'Gardien de but moderne',
        tacticalRoleDescription: 'Dernier rempart & premier relanceur • Gestion de la profondeur et jeu au pied haut',
        scoreGlobalComment: 'Excellente efficacité sur la ligne et sérénité dans les relances courtes/longues.',
        formeDuMoment: {
          score: 88,
          trend: '+4 pts',
          label: 'Très haute forme',
          details: 'Temps de réaction optimal et excellente vigilance visuelle lors des séances spécifiques.'
        },
        radarAxes: [
          { axis: 'Arrêts réflexes', playerValue: 91, benchmarkValue: 78 },
          { axis: 'Jeu au pied', playerValue: 88, benchmarkValue: 74 },
          { axis: 'Sorties aériennes', playerValue: 82, benchmarkValue: 76 },
          { axis: 'Duels 1v1', playerValue: 89, benchmarkValue: 75 },
          { axis: 'Anticipation', playerValue: 86, benchmarkValue: 79 },
          { axis: 'Explosivité', playerValue: 87, benchmarkValue: 80 }
        ],
        statComparisons: [
          { name: 'Tirs arrêtés %', current: '82.4%', personalAverage: '79.1%', benchmark: '72.0%', diff: '+10.4%', isPositive: true },
          { name: 'Buts évités (xGOT)', current: '+3.4', personalAverage: '+2.1', benchmark: '+0.5', diff: '+2.9', isPositive: true },
          { name: 'Relances réussies', current: '87.5%', personalAverage: '85.0%', benchmark: '76.2%', diff: '+11.3%', isPositive: true },
          { name: 'Sorties aériennes réus.', current: '93.0%', personalAverage: '90.5%', benchmark: '84.0%', diff: '+9.0%', isPositive: true },
          { name: 'Distance par match', current: '5.2 km', personalAverage: '4.9 km', benchmark: '4.6 km', diff: '+0.6 km', isPositive: true }
        ],
        heatmapZones: [
          { x: 50, y: 88, radius: 46, intensity: 0.95, label: 'Ligne de but & 6m' },
          { x: 42, y: 82, radius: 34, intensity: 0.85, label: 'Poteau gauche' },
          { x: 58, y: 82, radius: 34, intensity: 0.85, label: 'Poteau droit' },
          { x: 50, y: 72, radius: 42, intensity: 0.72, label: 'Point de penalty' },
          { x: 50, y: 60, radius: 30, intensity: 0.45, label: 'Sorties hors surface' },
          { x: 35, y: 80, radius: 24, intensity: 0.55, label: 'Angle fermé gauche' },
          { x: 65, y: 80, radius: 24, intensity: 0.55, label: 'Angle fermé droit' }
        ],
        heatmapDescription: 'Activité ultra-concentrée dans la zone des 16,50 mètres avec déploiement haut en phase de possession.',
        atouts: [
          { title: 'Vitesse de réaction sur sa ligne', description: 'Temps de déclenchement d’arrêt mesuré à 0.19s, supérieur au 95e percentile UEFA.', tag: 'Reflexes' },
          { title: 'Relance pied droit longue tendue', description: 'Capacité à trouver directement les ailiers dans l’espace avec 87% de précision.', tag: 'Jeu au pied' },
          { title: 'Lecture des trajectoires aériennes', description: 'Prise de balle haute assurée sur corner sans déviation concédée.', tag: 'Aérien' }
        ],
        axesProgression: [
          { title: 'Surveillance ischio droit post-dégagement', description: 'Surveillance de la charge excentrique sur les frappes lourdes (antécédent en rémission).', severity: 'warning', action: 'Échauffement balistique personnalisé' },
          { title: 'Communication sur les corners rentrants', description: 'Améliorer la coordination avec le premier poteau sur phases arrêtées adverses.', severity: 'info', action: 'Bilan vidéo tactique' }
        ],
        acwr: {
          ratio: 1.08,
          status: 'optimal',
          acuteLoad: 2340,
          chronicLoad: 2160,
          comment: 'Ratio optimal (1.08). Charge bien calibrée entre les séances spécifiques gardiens et les oppositions.'
        },
        gpsSummary: {
          distanceKm: player.dimensions.entrainement.distance,
          sprintsCount: 14,
          vitesseMax: player.dimensions.physique.vitesseMax,
          accelMax: player.dimensions.physique.puissanceMax,
          metabolicPower: '24.2 W/kg'
        },
        recoverySummary: {
          hrv: player.dimensions.recuperation.hrv,
          sommeil: player.dimensions.recuperation.sommeil,
          sommeilQualite: '86% efficace',
          courbatures: '0/10 (Aucune douleur musculaire)',
          readinessScore: player.dimensions.recuperation.readiness
        }
      };

    case 'defenseur':
      return {
        roleCategory: 'defenseur',
        roleLabel: 'Défenseur central moderne',
        tacticalRoleDescription: 'Axe défensif • Maître du duel, couverture de la profondeur et première relance vers l’avant',
        scoreGlobalComment: 'Sécurité défensive maximale, zéro faute concédée dans les 20 derniers mètres.',
        formeDuMoment: {
          score: 93,
          trend: '+5 pts',
          label: 'Excellente forme',
          details: 'Puissance athlétique optimale, excellente détente et fraîcheur neuromusculaire.'
        },
        radarAxes: [
          { axis: 'Duels au sol', playerValue: 94, benchmarkValue: 76 },
          { axis: 'Duels aériens', playerValue: 92, benchmarkValue: 77 },
          { axis: 'Anticipation', playerValue: 93, benchmarkValue: 79 },
          { axis: 'Relance progressive', playerValue: 90, benchmarkValue: 73 },
          { axis: 'Vitesse de course', playerValue: 91, benchmarkValue: 75 },
          { axis: 'Placement tactique', playerValue: 95, benchmarkValue: 81 }
        ],
        statComparisons: [
          { name: 'Duels défensifs gagnés', current: '78.5%', personalAverage: '76.0%', benchmark: '64.2%', diff: '+14.3%', isPositive: true },
          { name: 'Ballons récupérés / 90', current: '8.4', personalAverage: '8.0', benchmark: '5.9', diff: '+2.5', isPositive: true },
          { name: 'Passes réussies %', current: '94.2%', personalAverage: '92.8%', benchmark: '86.4%', diff: '+7.8%', isPositive: true },
          { name: 'Fautes concédées / 90', current: '0.4', personalAverage: '0.6', benchmark: '1.2', diff: '-0.8', isPositive: true },
          { name: 'Distance à haute intensité', current: '820 m', personalAverage: '790 m', benchmark: '680 m', diff: '+140 m', isPositive: true }
        ],
        heatmapZones: [
          { x: 42, y: 72, radius: 48, intensity: 0.92, label: 'Charnière centrale gauche' },
          { x: 50, y: 68, radius: 42, intensity: 0.88, label: 'Axe central bas' },
          { x: 30, y: 65, radius: 36, intensity: 0.72, label: 'Couverture latérale' },
          { x: 45, y: 55, radius: 35, intensity: 0.65, label: 'Sortie sur porteur' },
          { x: 50, y: 45, radius: 25, intensity: 0.45, label: 'Ligne médiane relance' }
        ],
        heatmapDescription: 'Rayonnement impérial dans le tiers défensif avec des interventions nettes sur la largeur.',
        atouts: [
          { title: 'Sérénité absolue en 1 contre 1', description: 'Capacité à cadrer l’attaquant sans se jeter, 84% d’interceptions propres.', tag: '1v1 Défensif' },
          { title: 'Relance chirurgicale sous pressing', description: 'Casse les lignes de pressing adverse avec des passes tendues à terre (94% de réussite).', tag: 'Relance' },
          { title: 'Vitesse de pointe en couverture', description: 'Pic à 34.5 km/h permettant d’éteindre les passes en profondeur adverses.', tag: 'Vitesse' }
        ],
        axesProgression: [
          { title: 'Danger offensif sur corners', description: 'Transformer sa domination athlétique en buts marqués sur phases arrêtées.', severity: 'info', action: 'Répétition des blocs offensifs' },
          { title: 'Charge matches tous les 3 jours', description: 'Maintenir les protocoles de cryothérapie et pressothérapie post-match.', severity: 'warning', action: 'Monitoring quotidien Oura Ring' }
        ],
        acwr: {
          ratio: 1.12,
          status: 'optimal',
          acuteLoad: 2580,
          chronicLoad: 2310,
          comment: 'Charge équilibrée (1.12), risque de blessure minimal. Disponibilité complète confirmée.'
        },
        gpsSummary: {
          distanceKm: player.dimensions.entrainement.distance,
          sprintsCount: 22,
          vitesseMax: player.dimensions.physique.vitesseMax,
          accelMax: player.dimensions.physique.puissanceMax,
          metabolicPower: '28.4 W/kg'
        },
        recoverySummary: {
          hrv: player.dimensions.recuperation.hrv,
          sommeil: player.dimensions.recuperation.sommeil,
          sommeilQualite: '92% efficace',
          courbatures: '1/10 (Triceps sural)',
          readinessScore: player.dimensions.recuperation.readiness
        }
      };

    case 'lateral':
      return {
        roleCategory: 'lateral',
        roleLabel: 'Latéral moderne polyvalent',
        tacticalRoleDescription: 'Couloir & dédoublement • Fermeture du couloir défensif et apport offensif continu',
        scoreGlobalComment: 'Volume de course remarquable sur toute la longueur du flanc droit/gauche.',
        formeDuMoment: {
          score: 90,
          trend: '+3 pts',
          label: 'Forme optimale',
          details: 'Endurance de vitesse au zénith, récupération cardiaque rapide entre les efforts.'
        },
        radarAxes: [
          { axis: 'Volume / Endurance', playerValue: 93, benchmarkValue: 79 },
          { axis: 'Duels défensifs', playerValue: 88, benchmarkValue: 74 },
          { axis: 'Centres / Dernier tiers', playerValue: 84, benchmarkValue: 72 },
          { axis: 'Vitesse de pointe', playerValue: 90, benchmarkValue: 78 },
          { axis: 'Repli en transition', playerValue: 92, benchmarkValue: 76 },
          { axis: 'Association combinée', playerValue: 87, benchmarkValue: 75 }
        ],
        statComparisons: [
          { name: 'Distance totale / 90', current: '11.4 km', personalAverage: '11.1 km', benchmark: '10.3 km', diff: '+1.1 km', isPositive: true },
          { name: 'Sprints (>25 km/h)', current: '28', personalAverage: '25', benchmark: '19', diff: '+9', isPositive: true },
          { name: 'Tacles glissés réussis', current: '82%', personalAverage: '79%', benchmark: '68%', diff: '+14%', isPositive: true },
          { name: 'Centres précis %', current: '36.5%', personalAverage: '33.0%', benchmark: '26.8%', diff: '+9.7%', isPositive: true },
          { name: 'Passes progressives', current: '6.8', personalAverage: '6.2', benchmark: '4.5', diff: '+2.3', isPositive: true }
        ],
        heatmapZones: [
          { x: 82, y: 70, radius: 44, intensity: 0.92, label: 'Zone défensive couloir' },
          { x: 85, y: 50, radius: 48, intensity: 0.95, label: 'Ligne de touche médiane' },
          { x: 80, y: 30, radius: 40, intensity: 0.78, label: 'Dédoublement offensif' },
          { x: 75, y: 20, radius: 30, intensity: 0.62, label: 'Zone de centre' },
          { x: 65, y: 65, radius: 32, intensity: 0.58, label: 'Resserrage axe défensif' }
        ],
        heatmapDescription: 'Activité dense sur toute la longueur du couloir avec un soutien permanent à l’ailier.',
        atouts: [
          { title: 'Résistance aux sprints répétés', description: 'Capacité à enchaîner 25+ sprints à plus de 25 km/h sans baisse de puissance.', tag: 'Endurance' },
          { title: 'Duel aérien au second poteau', description: 'Remarquable détente sèche pour bloquer les centres adverses au deuxième poteau.', tag: 'Défense' },
          { title: 'Qualité des passes courtes d’appui', description: 'Fluidifie les sorties de balle combinées le long de la ligne de touche.', tag: 'Association' }
        ],
        axesProgression: [
          { title: 'Précision du centre en pleine course', description: 'Améliorer le dosage sur les ballons tendus en retrait.', severity: 'info', action: 'Atelier centres Clairefontaine' },
          { title: 'Gestion de la fatigue en fin de match', description: 'Prévenir les micro-déchirures aux ischio-jambiers lors des accélérations à la 80e+.', severity: 'warning', action: 'Bilan kiné pré-séance' }
        ],
        acwr: {
          ratio: 1.15,
          status: 'optimal',
          acuteLoad: 2840,
          chronicLoad: 2470,
          comment: 'Volume de course très élevé mais assimilé. Ratio stable à 1.15.'
        },
        gpsSummary: {
          distanceKm: player.dimensions.entrainement.distance,
          sprintsCount: 28,
          vitesseMax: player.dimensions.physique.vitesseMax,
          accelMax: player.dimensions.physique.puissanceMax,
          metabolicPower: '32.1 W/kg'
        },
        recoverySummary: {
          hrv: player.dimensions.recuperation.hrv,
          sommeil: player.dimensions.recuperation.sommeil,
          sommeilQualite: '89% efficace',
          courbatures: '2/10 (Mollets)',
          readinessScore: player.dimensions.recuperation.readiness
        }
      };

    case 'milieu':
      return {
        roleCategory: 'milieu',
        roleLabel: 'Milieu de terrain axial / Box-to-box',
        tacticalRoleDescription: 'Cœur du jeu • Récupération, régulation du tempo, orientation et projection offensive',
        scoreGlobalComment: player.alert?.type === 'charge'
          ? 'Performance collective excellente, mais vigilance impérative sur la surcharge aiguë (+24%).'
          : 'Plaque tournante du milieu de terrain avec un impact colossal dans les transitions.',
        formeDuMoment: {
          score: player.alert?.type === 'charge' ? 84 : 89,
          trend: player.alert?.type === 'charge' ? '-2 pts (fatigue)' : '+3 pts',
          label: player.alert?.type === 'charge' ? 'Vigilance fatigue' : 'Très haute forme',
          details: player.alert?.type === 'charge'
            ? 'Tension musculaire aux adducteurs et volume de match intense en club. Décharge nécessaire 48h.'
            : 'Énergie constante, forte disponibilité entre les lignes et qualité technique nette.'
        },
        radarAxes: [
          { axis: 'Récupération de balle', playerValue: 92, benchmarkValue: 77 },
          { axis: 'Précision des passes', playerValue: 91, benchmarkValue: 81 },
          { axis: 'Volume de course', playerValue: 93, benchmarkValue: 80 },
          { axis: 'Impact physique / Duels', playerValue: 90, benchmarkValue: 76 },
          { axis: 'Orientation / Vision', playerValue: 88, benchmarkValue: 79 },
          { axis: 'Frappes & projection', playerValue: 83, benchmarkValue: 72 }
        ],
        statComparisons: [
          { name: 'Passes réussies %', current: '92.4%', personalAverage: '91.2%', benchmark: '85.1%', diff: '+7.3%', isPositive: true },
          { name: 'Duels au sol gagnés', current: '68.2%', personalAverage: '65.0%', benchmark: '54.0%', diff: '+14.2%', isPositive: true },
          { name: 'Interceptions / 90', current: '2.8', personalAverage: '2.4', benchmark: '1.6', diff: '+1.2', isPositive: true },
          { name: 'Distance parcourue', current: '12.4 km', personalAverage: '12.1 km', benchmark: '11.0 km', diff: '+1.4 km', isPositive: true },
          {
            name: 'Dist. haute intensité',
            current: '1 150 m',
            personalAverage: '1 280 m',
            benchmark: '980 m',
            diff: player.alert?.type === 'charge' ? '-130 m' : '+170 m',
            isPositive: player.alert?.type !== 'charge'
          }
        ],
        heatmapZones: [
          { x: 50, y: 52, radius: 52, intensity: 0.95, label: 'Rond central & premier relanceur' },
          { x: 42, y: 45, radius: 40, intensity: 0.82, label: 'Demi-espace gauche' },
          { x: 58, y: 45, radius: 40, intensity: 0.82, label: 'Demi-espace droit' },
          { x: 50, y: 65, radius: 36, intensity: 0.75, label: 'Interposition devant les centraux' },
          { x: 50, y: 35, radius: 30, intensity: 0.58, label: 'Zone des 20-25 mètres adverses' }
        ],
        heatmapDescription: 'Emprise totale sur le centre du terrain, quadrillage systématique des zones d’attaque adverse.',
        atouts: [
          { title: 'Domination dans l’impact axial', description: 'Gagne 7 duels sur 10 au sol et dans les airs au milieu de terrain.', tag: 'Impact physique' },
          { title: 'Sécurité maximale sous la pression', description: '92% de passes complétées même pris par deux adversaires au cœur du jeu.', tag: 'Technique' },
          { title: 'Capacité de frappe à mi-distance', description: 'Menace permanente à l’entrée de la surface avec des tirs cadrés au-delà de 105 km/h.', tag: 'Projection' }
        ],
        axesProgression: [
          {
            title: player.alert?.type === 'charge' ? 'Alerte Surcharge aiguë (+24%)' : 'Gestion des temps faibles',
            description: player.alert?.type === 'charge'
              ? 'Charge cumulée supérieure aux repères historiques. Risque de pubalgie en cas de non-décharge.'
              : 'Gérer les transitions avec plus de temporisation pour économiser la dépense énergétique.',
            severity: player.alert?.type === 'charge' ? 'alert' : 'warning',
            action: player.alert?.type === 'charge' ? 'Protocole décharge 48h + massages myotendineux' : 'Analyse vidéo'
          },
          {
            title: 'Qualité du sommeil & variabilité cardiaque',
            description: `Sommeil mesuré à ${player.dimensions.recuperation.sommeil}, HRV à ${player.dimensions.recuperation.hrv} ms.`,
            severity: 'warning',
            action: 'Séance de relaxation et masque de sommeil connecté'
          }
        ],
        acwr: {
          ratio: player.alert?.type === 'charge' ? 1.42 : 1.14,
          status: player.alert?.type === 'charge' ? 'vigilance' : 'optimal',
          acuteLoad: 2890,
          chronicLoad: 2035,
          comment: player.alert?.type === 'charge'
            ? 'Ratio ACWR à 1.42 (Zone orange de vigilance). Réduire impérativement les courses à haute intensité sur 48h.'
            : 'Ratio ACWR optimal (1.14). Adaptation métabolique excellente.'
        },
        gpsSummary: {
          distanceKm: player.dimensions.entrainement.distance,
          sprintsCount: 19,
          vitesseMax: player.dimensions.physique.vitesseMax,
          accelMax: player.dimensions.physique.puissanceMax,
          metabolicPower: '34.8 W/kg'
        },
        recoverySummary: {
          hrv: player.dimensions.recuperation.hrv,
          sommeil: player.dimensions.recuperation.sommeil,
          sommeilQualite: player.dimensions.recuperation.score < 75 ? 'Moyenne (68%)' : 'Excellente (90%)',
          courbatures: player.alert?.type === 'charge' ? '4/10 (Adducteurs bilatéraux)' : '1/10',
          readinessScore: player.dimensions.recuperation.readiness
        }
      };

    case 'ailier':
      return {
        roleCategory: 'ailier',
        roleLabel: 'Ailier percutant / Déséquilibreur',
        tacticalRoleDescription: 'Flanc offensif • Dribbles, provocations 1v1, accélérations brutales et passes décisives',
        scoreGlobalComment: player.status === 'retour_progressif'
          ? 'Talent d’élimination intact, mais temps de jeu plafonné à 60 minutes pour sécuriser le biceps fémoral.'
          : 'Déséquilibreur majeur capable de créer des occasions nettes sur chaque ballon touché.',
        formeDuMoment: {
          score: 84,
          trend: '+4 pts',
          label: 'Montée en régime',
          details: 'Sensations d’appui excellentes, explosivité retrouvée avec limitation préventive des minutes.'
        },
        radarAxes: [
          { axis: 'Dribbles réussis', playerValue: 97, benchmarkValue: 74 },
          { axis: 'Vitesse d’accélération', playerValue: 95, benchmarkValue: 80 },
          { axis: 'Création d’occasions', playerValue: 91, benchmarkValue: 73 },
          { axis: 'Qualité des centres', playerValue: 86, benchmarkValue: 71 },
          { axis: 'Finition face au but', playerValue: 80, benchmarkValue: 75 },
          { axis: 'Repli défensif', playerValue: 68, benchmarkValue: 65 }
        ],
        statComparisons: [
          { name: 'Dribbles tentés / 90', current: '8.4', personalAverage: '8.0', benchmark: '4.2', diff: '+4.2', isPositive: true },
          { name: 'Dribbles réussis %', current: '68.5%', personalAverage: '65.2%', benchmark: '49.0%', diff: '+19.5%', isPositive: true },
          { name: 'Passes décisives', current: '7', personalAverage: '6', benchmark: '3', diff: '+4', isPositive: true },
          { name: 'Sprints à >30 km/h', current: '18', personalAverage: '20', benchmark: '11', diff: '+7', isPositive: true },
          { name: 'Temps de jeu actuel', current: '60 min max', personalAverage: '78 min', benchmark: '75 min', diff: 'Protocole', isPositive: false }
        ],
        heatmapZones: [
          { x: 82, y: 28, radius: 46, intensity: 0.96, label: 'Couloir offensif droit' },
          { x: 74, y: 35, radius: 38, intensity: 0.85, label: 'Repiquage intérieur' },
          { x: 86, y: 18, radius: 34, intensity: 0.78, label: 'Ligne de fond pour centre' },
          { x: 68, y: 24, radius: 28, intensity: 0.65, label: 'Entrée de surface côté droit' },
          { x: 78, y: 55, radius: 26, intensity: 0.45, label: 'Appui de contre-attaque' }
        ],
        heatmapDescription: 'Focalisation extrême dans les 30 derniers mètres côté droit avec des pénétrations dans la surface.',
        atouts: [
          { title: 'Ambidextrie absolue', description: 'Capacité égale de débordement extérieur pied droit ou repiquage intérieur pied gauche.', tag: 'Dribble' },
          { title: 'Accélération foudroyante sur les 5 premiers mètres', description: '0 à 25 km/h en moins de 1.58s créant un décalage instantané.', tag: 'Explosivité' },
          { title: 'Qualité de la dernière passe', description: 'Vision aiguisée pour trouver l’attaquant lancé au second poteau ou en retrait.', tag: 'Passes D' }
        ],
        axesProgression: [
          {
            title: 'Protocole de reprise R3 (60 min max)',
            description: 'Post-élongation biceps fémoral droit (stade 1b). Pas de temps de jeu complet consécutif.',
            severity: 'alert',
            action: 'Remplacement programmé à la 60e minute'
          },
          {
            title: 'Échauffement excentrique strict',
            description: 'Protocole NordBord obligatoire avant toute séance à haute vitesse.',
            severity: 'warning',
            action: 'Validation kiné FFF'
          }
        ],
        acwr: {
          ratio: 1.04,
          status: 'optimal',
          acuteLoad: 1890,
          chronicLoad: 1820,
          comment: 'Charge contrôlée en phase de réathlétisation. Pas de pic dangereux de volume.'
        },
        gpsSummary: {
          distanceKm: player.dimensions.entrainement.distance,
          sprintsCount: 24,
          vitesseMax: player.dimensions.physique.vitesseMax,
          accelMax: player.dimensions.physique.puissanceMax,
          metabolicPower: '36.4 W/kg'
        },
        recoverySummary: {
          hrv: player.dimensions.recuperation.hrv,
          sommeil: player.dimensions.recuperation.sommeil,
          sommeilQualite: '88% efficace',
          courbatures: '2/10 (Ischios sous surveillance)',
          readinessScore: player.dimensions.recuperation.readiness
        }
      };

    case 'attaquant':
    default:
      return {
        roleCategory: 'attaquant',
        roleLabel: 'Attaquant de classe mondiale / Finisseur',
        tacticalRoleDescription: 'Pointe & profondeur • Appels tranchants, vitesse terminale, efficacité chirurgicale face au but',
        scoreGlobalComment: 'Indice athlétique et technique au sommet international. Danger létal sur chaque transition rapide.',
        formeDuMoment: {
          score: 96,
          trend: '+3 pts',
          label: 'Forme maximale',
          details: 'Plein potentiel neuromusculaire. Zéro restriction physique, confiance et lucidité maximales.'
        },
        radarAxes: [
          { axis: 'Finition & xG', playerValue: 98, benchmarkValue: 76 },
          { axis: 'Vitesse de pointe', playerValue: 99, benchmarkValue: 80 },
          { axis: 'Appels en profondeur', playerValue: 97, benchmarkValue: 78 },
          { axis: 'Dribbles & 1v1', playerValue: 94, benchmarkValue: 75 },
          { axis: 'Accélération 0-10m', playerValue: 96, benchmarkValue: 79 },
          { axis: 'Création d’occasions', playerValue: 90, benchmarkValue: 72 }
        ],
        statComparisons: [
          { name: 'Buts par 90 min', current: '1.14', personalAverage: '0.98', benchmark: '0.48', diff: '+0.66', isPositive: true },
          { name: 'xG convertis %', current: '+28%', personalAverage: '+22%', benchmark: '+4%', diff: '+24%', isPositive: true },
          { name: 'Tirs cadrés %', current: '64.2%', personalAverage: '59.0%', benchmark: '44.1%', diff: '+20.1%', isPositive: true },
          { name: 'Vitesse max enregistrée', current: `${player.dimensions.physique.vitesseMax} km/h`, personalAverage: '36.2 km/h', benchmark: '33.5 km/h', diff: '+3.3 km/h', isPositive: true },
          { name: 'Courses > 25 km/h', current: '34 / match', personalAverage: '31', benchmark: '18', diff: '+16', isPositive: true }
        ],
        heatmapZones: [
          { x: 34, y: 26, radius: 46, intensity: 0.96, label: 'Demi-espace gauche offensif' },
          { x: 50, y: 16, radius: 42, intensity: 0.94, label: 'Surface de réparation & penalty' },
          { x: 42, y: 22, radius: 38, intensity: 0.88, label: 'Axe des 16 mètres' },
          { x: 26, y: 35, radius: 34, intensity: 0.80, label: 'Débordement couloir gauche' },
          { x: 58, y: 22, radius: 26, intensity: 0.65, label: 'Déviation deuxième poteau' },
          { x: 48, y: 40, radius: 24, intensity: 0.50, label: 'Décrochage premier rideau' }
        ],
        heatmapDescription: 'Attaque chirurgicale du demi-espace gauche avec projection violente vers le point de penalty.',
        atouts: [
          { title: 'Vitesse terminale exceptionnelle', description: 'Pic à 36.8 km/h en compétition UEFA, vitesse impossible à rattraper une fois lancé.', tag: 'Vitesse pure' },
          { title: 'Lucidité chirurgicale dans la surface', description: 'Conversion de 64% de ses tirs cadrés en but avec un xG surperformé de +28%.', tag: 'Finition' },
          { title: 'Timing des appels dans le dos de la défense', description: 'Départ millimétré à la limite du hors-jeu annihilant les blocs médians adverses.', tag: 'Appels' }
        ],
        axesProgression: [
          { title: 'Repli en bloc bas sur phases subies', description: 'Maintenir la discipline collective de fermeture d’angle sans ballon.', severity: 'info', action: 'Rappels tactiques causerie' },
          { title: 'Protection de la cheville droite', description: 'Ciblage récurrent des défenseurs adverses par des tacles appuyés.', severity: 'warning', action: 'Strap préventif staff médical' }
        ],
        acwr: {
          ratio: 1.10,
          status: 'optimal',
          acuteLoad: 3120,
          chronicLoad: 2840,
          comment: 'Charge chronique très solide. Assimilation parfaite des cadences européennes.'
        },
        gpsSummary: {
          distanceKm: player.dimensions.entrainement.distance,
          sprintsCount: 34,
          vitesseMax: player.dimensions.physique.vitesseMax,
          accelMax: player.dimensions.physique.puissanceMax,
          metabolicPower: '38.5 W/kg'
        },
        recoverySummary: {
          hrv: player.dimensions.recuperation.hrv,
          sommeil: player.dimensions.recuperation.sommeil,
          sommeilQualite: '95% efficace',
          courbatures: '0/10 (Parfaite intégrité)',
          readinessScore: player.dimensions.recuperation.readiness
        }
      };
  }
}

export function getPlayerSectionDetails(
  player: Player,
  sectionId: 'physique' | 'charge' | 'sante' | 'recuperation' | 'performance' | 'tactique' | 'forme' | 'technique' | 'mental'
): SectionDetailInfo {
  const isGK = player.position === 'Gardien';
  const isRef = Boolean(player.isReferee);
  const isAssistant = player.position === 'Arbitre Assistant';
  const dim = player.dimensions;

  // SPECIFIC HANDLING FOR REFEREES (DTA / CORPS ARBITRAL)
  if (isRef) {
    switch (sectionId) {
      case 'charge':
        return {
          id: 'charge',
          title: isAssistant ? 'Charge Spécifique Assistant & Courses Latérales' : 'Test FIFA SDS & Charge Arbitrale',
          subtitle: 'Volume GPS Catapult 10 Hz, tests intermittents FIFA et courses à haute vitesse',
          score: dim.entrainement.score,
          benchmarkScore: 78,
          badgeLabel: 'Charge Réglementaire Validée',
          summary: isAssistant
            ? 'Volume de 7.8 km par match avec 22.4% en courses latérales/pas chassés et respect des consignes de récupération.'
            : 'Distance moyenne de 11.8 km par match, dont 1.9 km à haute intensité (>20 km/h) et 22 sprints de placement.',
          staffRecommendation: 'Poursuivre le travail d’endurance de puissance et l’entretien de la VMA sur herbe.',
          metrics: isAssistant
            ? [
                { name: 'Distance totale / match', value: '7.8', unit: 'km', benchmark: '7.0', indicator: 'plus', diff: '+0.8 km', isPositive: true },
                { name: 'Courses latérales & pas chassés', value: '22.4%', unit: '%', benchmark: '17.0%', indicator: 'plus', diff: '+5.4%', isPositive: true },
                { name: 'Test ARIET Spécifique', value: '17.8', unit: 'km/h', benchmark: '16.0', indicator: 'plus', diff: '+1.8 km/h', isPositive: true },
                { name: 'Sprints courts (<15m)', value: 16, unit: 'sprints', benchmark: 12, indicator: 'plus', diff: '+4', isPositive: true },
                { name: 'PlayerLoad™ Arbitre', value: 410, unit: 'UA', benchmark: 380, indicator: 'plus', diff: '+30 UA', isPositive: true }
              ]
            : [
                { name: 'Distance totale / match', value: '11.8', unit: 'km', benchmark: '10.8', indicator: 'plus', diff: '+1.0 km', isPositive: true },
                { name: 'Courses haute intensité (>20km/h)', value: '1 940', unit: 'm', benchmark: '1 500', indicator: 'plus', diff: '+440 m', isPositive: true },
                { name: 'Test SDS FIFA (Single Double Sprint)', value: 'Palier 20.4', unit: 'palier', benchmark: 'Palier 18.2', indicator: 'plus', diff: '+2.2', isPositive: true },
                { name: 'Sprints en contre-attaque', value: 22, unit: 'sprints', benchmark: 15, indicator: 'plus', diff: '+7', isPositive: true },
                { name: 'Ratio ACWR Arbitre', value: 1.09, unit: 'ratio', benchmark: 1.10, indicator: 'egal', diff: 'Optimal', isPositive: true }
              ]
        };

      case 'forme':
        return {
          id: 'forme',
          title: 'Note des Observateurs & Dynamique',
          subtitle: 'Évaluations officielles FFF & UEFA, constance des décisions et management',
          score: player.refereeStats?.noteObservateurs ? Math.round(player.refereeStats.noteObservateurs * 10) : 87,
          benchmarkScore: 82,
          badgeLabel: 'Grade FIFA Élite',
          summary: `Note moyenne de ${player.refereeStats?.noteObservateurs || '8.7'}/10 attribuée par les observateurs de match sur les 12 dernières rencontres.`,
          staffRecommendation: 'Excellente dynamique. Maintenir la constance émotionnelle sur les rencontres à forte tension.',
          metrics: [
            { name: 'Note moyenne Observateurs UEFA', value: `${player.refereeStats?.noteObservateurs || '8.75'}/10`, unit: '/10', benchmark: '8.20', indicator: 'plus', diff: '+0.55', isPositive: true },
            { name: 'Maîtrise des contestations (0-10)', value: '9.2', unit: '/10', benchmark: '8.0', indicator: 'plus', diff: '+1.2', isPositive: true },
            { name: 'Cohérence disciplinaire (cartons)', value: '94%', unit: '%', benchmark: '88%', indicator: 'plus', diff: '+6%', isPositive: true },
            { name: 'Lucidité fin de match (75\'-90\')', value: '96%', unit: '%', benchmark: '86%', indicator: 'plus', diff: '+10%', isPositive: true }
          ]
        };

      case 'technique':
        return {
          id: 'technique',
          title: 'Protocole VAR & Décisionnel',
          subtitle: 'Temps de vérification vidéo, précision du sifflet et communication',
          score: Math.round(player.refereeStats?.decisionsVarConfirmeesPct || 96),
          benchmarkScore: 90,
          badgeLabel: 'Excellence VAR',
          summary: `${player.refereeStats?.decisionsVarConfirmeesPct || 98}% de décisions confirmées lors des vérifications VAR avec un temps moyen de 32s.`,
          staffRecommendation: 'Maintenir la clarté des explications verbales aux capitaines lors des consultations de l\'écran de bord de touche.',
          metrics: [
            { name: 'Taux de confirmation VAR', value: `${player.refereeStats?.decisionsVarConfirmeesPct || 98.2}%`, unit: '%', benchmark: '92.0%', indicator: 'plus', diff: '+6.2%', isPositive: true },
            { name: 'Temps moyen de check VAR', value: '32 s', unit: 's', benchmark: '50 s', indicator: 'moins', diff: '-18 s', isPositive: true },
            { name: 'Clarté gestuelle & autorité', value: '95/100', unit: '/100', benchmark: '84', indicator: 'plus', diff: '+11 pts', isPositive: true },
            { name: 'Communication oreillette team', value: '98%', unit: '%', benchmark: '90%', indicator: 'plus', diff: '+8%', isPositive: true }
          ]
        };

      case 'tactique':
        return {
          id: 'tactique',
          title: isAssistant ? 'Alignement Hors-Jeu & Ligne de Touche' : 'Placement Tactique & Angles de Vue',
          subtitle: 'Proximité de l\'action, anticipation des trajectoires et gestion des bancs',
          score: isAssistant ? 98 : 94,
          benchmarkScore: 85,
          badgeLabel: 'Positionnement Optimal',
          summary: isAssistant
            ? 'Taux d\'exactitude de 98.8% sur les détections de hors-jeu et synchronisation parfaite avec l\'arbitre central.'
            : 'Distance moyenne de 13.8 m sur les fautes et vision continue sans écran de joueur.',
          staffRecommendation: 'Anticipation fluide sur les changements d\'aile et relances rapides des gardiens.',
          metrics: isAssistant
            ? [
                { name: 'Précision d\'alignement hors-jeu', value: '98.8%', unit: '%', benchmark: '93.0%', indicator: 'plus', diff: '+5.8%', isPositive: true },
                { name: 'Retard de drapeau maîtrisé', value: '99%', unit: '%', benchmark: '92%', indicator: 'plus', diff: '+7%', isPositive: true },
                { name: 'Gestion de la ligne de touche', value: '96%', unit: '%', benchmark: '88%', indicator: 'plus', diff: '+8%', isPositive: true }
              ]
            : [
                { name: 'Proximité moyenne sur fautes', value: '13.8 m', unit: 'm', benchmark: '18.0 m', indicator: 'moins', diff: '-4.2 m', isPositive: true },
                { name: 'Angle de vue dégagé', value: '94%', unit: '%', benchmark: '85%', indicator: 'plus', diff: '+9%', isPositive: true },
                { name: 'Gestion de la règle de l\'avantage', value: '92%', unit: '%', benchmark: '84%', indicator: 'plus', diff: '+8%', isPositive: true }
              ]
        };

      case 'physique':
        return {
          id: 'physique',
          title: isAssistant ? 'Vitesse & Test ARIET Arbitre Assistant' : 'Vitesse & VMA Arbitre Central',
          subtitle: 'Épreuves réglementaires FIFA, vitesse de sprint et changements de direction',
          score: dim.physique.score,
          benchmarkScore: 80,
          badgeLabel: 'Test FIFA Validé',
          summary: `Test physique officiel validé. Vitesse de pointe de ${dim.physique.vitesseMax} km/h et endurance de haut niveau.`,
          staffRecommendation: 'Entretien du travail d’explosivité sur 10-30m et prévention des ischios.',
          metrics: [
            { name: 'Vitesse de pointe enregistrée', value: `${dim.physique.vitesseMax} km/h`, unit: 'km/h', benchmark: '29.5 km/h', indicator: 'plus', diff: `+${(dim.physique.vitesseMax - 29.5).toFixed(1)} km/h`, isPositive: true },
            { name: isAssistant ? 'Test ARIET Vitesse' : 'Test SDS FIFA', value: isAssistant ? '17.8 km/h' : 'Palier 20.4', unit: isAssistant ? 'km/h' : 'palier', benchmark: isAssistant ? '16.0 km/h' : 'Palier 18.0', indicator: 'plus', diff: '+1.8', isPositive: true },
            { name: 'Sprint 40 mètres', value: '5.38 s', unit: 's', benchmark: '5.80 s', indicator: 'moins', diff: '-0.42 s', isPositive: true },
            { name: 'Changement de direction 505', value: '2.28 s', unit: 's', benchmark: '2.45 s', indicator: 'moins', diff: '-0.17 s', isPositive: true }
          ]
        };

      case 'sante':
        return {
          id: 'sante',
          title: 'Santé & Suivi Tendons/Mollets',
          subtitle: 'Suivi par le Dr. Franck Le Gall, prévention soléaire et bilans cardiologiques',
          score: dim.sante.score,
          benchmarkScore: 85,
          badgeLabel: dim.sante.disponibilite === 100 ? 'Apte sans restriction' : 'Apte avec aménagement',
          summary: `Disponibilité athlétique de ${dim.sante.disponibilite}%. Bilan cardiologique annuel FIFA validé sans réserve.`,
          staffRecommendation: 'Protocole de récupération mollet et ischios post-match à Clairefontaine.',
          metrics: [
            { name: 'Disponibilité aux désignations', value: `${dim.sante.disponibilite}%`, unit: '%', benchmark: '90%', indicator: 'plus', diff: `${dim.sante.disponibilite - 90 >= 0 ? '+' : ''}${dim.sante.disponibilite - 90}%`, isPositive: dim.sante.disponibilite >= 90 },
            { name: 'Certificat médical FIFA', value: 'Validé 2026/27', unit: 'statut', benchmark: 'Conforme', indicator: 'plus', diff: '100%', isPositive: true },
            { name: 'Épreuve d\'effort ECG', value: 'Normale (VO2 56.4)', unit: 'ml/kg', benchmark: '> 50.0', indicator: 'plus', diff: '+6.4', isPositive: true },
            { name: 'Tension musculaire soléaire', value: '1.2/10 (Indolore)', unit: '/10', benchmark: '< 3.0', indicator: 'moins', diff: 'Favorable', isPositive: true }
          ]
        };

      case 'recuperation':
        return {
          id: 'recuperation',
          title: 'Récupération & Sommeil Arbitral',
          subtitle: 'Gestion des voyages européens UEFA, variabilité cardiaque (HRV) et sommeil',
          score: dim.recuperation.score,
          benchmarkScore: 78,
          badgeLabel: 'Fraîcheur Élevée',
          summary: `Readiness à ${dim.recuperation.readiness}/100 et VRC à ${dim.recuperation.hrv} ms.`,
          staffRecommendation: 'Prévoir les protocoles de sommeil lors des déplacements internationaux.',
          metrics: [
            { name: 'Score de Readiness', value: dim.recuperation.readiness, unit: '/100', benchmark: 75, indicator: 'plus', diff: `+${dim.recuperation.readiness - 75} pts`, isPositive: true },
            { name: 'Variabilité cardiaque (HRV)', value: `${dim.recuperation.hrv} ms`, unit: 'ms', benchmark: '65 ms', indicator: 'plus', diff: `+${dim.recuperation.hrv - 65} ms`, isPositive: true },
            { name: 'Durée du sommeil', value: dim.recuperation.sommeil, unit: 'h', benchmark: '8h00', indicator: 'plus', diff: '+30 min', isPositive: true }
          ]
        };

      case 'mental':
        return {
          id: 'mental',
          title: 'Autorité & Calme Arbitral',
          subtitle: 'Gestion de crise, lucidité sous pression médiatique et leadership',
          score: 92,
          benchmarkScore: 82,
          badgeLabel: 'Leadership Exemplaire',
          summary: 'Maîtrise émotionnelle constante et autorité naturelle reconnue par les joueurs et staffs.',
          staffRecommendation: 'Entretenir les séances de respiration guidée et d\'imagerie mentale avant les derbies.',
          metrics: [
            { name: 'Gestion de la pression (0-100)', value: '94/100', unit: '/100', benchmark: '82', indicator: 'plus', diff: '+12 pts', isPositive: true },
            { name: 'Résolution des conflits sur le terrain', value: '96%', unit: '%', benchmark: '85%', indicator: 'plus', diff: '+11%', isPositive: true },
            { name: 'Prise de décision sous fatigue', value: '93%', unit: '%', benchmark: '80%', indicator: 'plus', diff: '+13%', isPositive: true }
          ]
        };
    }
  }

  switch (sectionId) {
    case 'physique':
      return {
        id: 'physique',
        title: 'Physique & Vitesse',
        subtitle: 'Capacités athlétiques, vitesse max, puissance et tests GPS',
        score: dim.physique.score,
        benchmarkScore: 78,
        badgeLabel: dim.physique.score >= 90 ? 'Élite Internationale' : 'Niveau Fédéral Optimal',
        summary: `Profil athlétique supérieur : vitesse de pointe mesurée à ${dim.physique.vitesseMax} km/h et accélération de ${dim.physique.puissanceMax} m/s².`,
        staffRecommendation: 'Maintien de la puissance lactique et travail de décélération excentrique.',
        metrics: [
          {
            name: 'Vitesse maximale',
            value: dim.physique.vitesseMax,
            unit: 'km/h',
            benchmark: 33.2,
            indicator: dim.physique.vitesseMax >= 33.2 ? 'plus' : 'moins',
            diff: `${dim.physique.vitesseMax >= 33.2 ? '+' : ''}${(dim.physique.vitesseMax - 33.2).toFixed(1)} km/h`,
            isPositive: dim.physique.vitesseMax >= 33.2
          },
          {
            name: 'Puissance max / Accélération',
            value: dim.physique.puissanceMax,
            unit: 'm/s²',
            benchmark: 3.6,
            indicator: dim.physique.puissanceMax >= 3.6 ? 'plus' : 'moins',
            diff: `${dim.physique.puissanceMax >= 3.6 ? '+' : ''}${(dim.physique.puissanceMax - 3.6).toFixed(1)} m/s²`,
            isPositive: dim.physique.puissanceMax >= 3.6
          },
          {
            name: 'Temps sur 10 mètres',
            value: dim.physique.temps10m,
            unit: 's',
            benchmark: 1.74,
            indicator: dim.physique.temps10m <= 1.74 ? 'plus' : 'moins', // temps plus court = meilleur (+ performant)
            diff: `${dim.physique.temps10m <= 1.74 ? '-' : '+'}${Math.abs(dim.physique.temps10m - 1.74).toFixed(2)} s`,
            isPositive: dim.physique.temps10m <= 1.74
          },
          {
            name: 'VMA (Vitesse Max Aérobie)',
            value: isGK ? 16.5 : 19.4,
            unit: 'km/h',
            benchmark: isGK ? 15.5 : 18.2,
            indicator: 'plus',
            diff: isGK ? '+1.0 km/h' : '+1.2 km/h',
            isPositive: true
          },
          {
            name: 'Puissance métabolique pic',
            value: isGK ? 26.2 : 38.5,
            unit: 'W/kg',
            benchmark: isGK ? 22.0 : 32.0,
            indicator: 'plus',
            diff: isGK ? '+4.2 W/kg' : '+6.5 W/kg',
            isPositive: true
          },
          {
            name: 'Détente verticale sèche (CMJ)',
            value: isGK ? 72 : 64,
            unit: 'cm',
            benchmark: isGK ? 65 : 56,
            indicator: 'plus',
            diff: isGK ? '+7 cm' : '+8 cm',
            isPositive: true
          },
          {
            name: 'Décélération maximale',
            value: 5.8,
            unit: 'm/s²',
            benchmark: 4.6,
            indicator: 'plus',
            diff: '+1.2 m/s²',
            isPositive: true
          },
          {
            name: 'Symétrie appuis gauche / droite',
            value: 99.6,
            unit: '%',
            benchmark: 95.0,
            indicator: 'plus',
            diff: '+4.6%',
            isPositive: true
          }
        ]
      };

    case 'charge':
      return {
        id: 'charge',
        title: 'Charge d’entraînement',
        subtitle: 'Volume, intensité, ratio ACWR et monitoring des séances',
        score: dim.entrainement.score,
        benchmarkScore: 75,
        badgeLabel: player.alert?.type === 'charge' ? 'Vigilance Charge' : 'Charge Maîtrisée',
        summary: `Volume cumulé de ${dim.entrainement.dureeTotale} sur ${dim.entrainement.seances} séances, totalisant ${dim.entrainement.distance} km.`,
        staffRecommendation: player.alert?.type === 'charge'
          ? 'Alléger la charge de course à haute intensité sur 48h.'
          : 'Charge et volume optimaux, continuité confirmée.',
        metrics: [
          {
            name: 'Durée totale d’entraînement',
            value: 420,
            unit: 'min',
            benchmark: 360,
            indicator: 'plus',
            diff: '+60 min',
            isPositive: true
          },
          {
            name: 'Séances effectuées',
            value: dim.entrainement.seances,
            unit: 'séances',
            benchmark: 4,
            indicator: dim.entrainement.seances >= 4 ? 'plus' : 'moins',
            diff: `${dim.entrainement.seances >= 4 ? '+' : ''}${dim.entrainement.seances - 4}`,
            isPositive: dim.entrainement.seances >= 4
          },
          {
            name: 'Distance totale GPS',
            value: dim.entrainement.distance,
            unit: 'km',
            benchmark: isGK ? 18.0 : 42.0,
            indicator: dim.entrainement.distance >= (isGK ? 18.0 : 42.0) ? 'plus' : 'moins',
            diff: `${dim.entrainement.distance >= (isGK ? 18.0 : 42.0) ? '+' : ''}${(dim.entrainement.distance - (isGK ? 18.0 : 42.0)).toFixed(1)} km`,
            isPositive: true
          },
          {
            name: 'Ratio ACWR (Aiguë / Chronique)',
            value: player.alert?.type === 'charge' ? 1.42 : 1.14,
            unit: 'ratio',
            benchmark: 1.10,
            indicator: player.alert?.type === 'charge' ? 'plus' : 'plus',
            diff: player.alert?.type === 'charge' ? '+0.32 (Alerte)' : '+0.04',
            isPositive: player.alert?.type !== 'charge'
          },
          {
            name: 'Distance à haute intensité (>19.8 km/h)',
            value: isGK ? 480 : 3850,
            unit: 'm',
            benchmark: isGK ? 350 : 3100,
            indicator: 'plus',
            diff: isGK ? '+130 m' : '+750 m',
            isPositive: true
          },
          {
            name: 'Nombre de sprints (>25.2 km/h)',
            value: isGK ? 14 : 34,
            unit: 'sprints',
            benchmark: isGK ? 8 : 22,
            indicator: 'plus',
            diff: isGK ? '+6' : '+12',
            isPositive: true
          },
          {
            name: 'PlayerLoad™ Catapult',
            value: 542,
            unit: 'UA',
            benchmark: 480,
            indicator: 'plus',
            diff: '+62 UA',
            isPositive: true
          },
          {
            name: 'RPE moyen ressenti (Borg)',
            value: 6.8,
            unit: '/10',
            benchmark: 6.5,
            indicator: 'plus',
            diff: '+0.3',
            isPositive: true
          }
        ]
      };

    case 'sante':
      return {
        id: 'sante',
        title: 'Santé & Intégrité',
        subtitle: 'Bilan médical FFF, intégrité musculo-squelettique et historique lésionnel',
        score: dim.sante.score,
        benchmarkScore: 82,
        badgeLabel: dim.sante.disponibilite === 100 ? 'Apte 100%' : 'Surveillance Adaptée',
        summary: `Disponibilité à ${dim.sante.disponibilite}% avec ${dim.sante.joursSansGene} jours consécutifs sans gêne.`,
        staffRecommendation: 'Poursuite du travail préventif ischio-jambiers et protocoles de cryothérapie.',
        metrics: [
          {
            name: 'Disponibilité globale',
            value: dim.sante.disponibilite,
            unit: '%',
            benchmark: 85,
            indicator: dim.sante.disponibilite >= 85 ? 'plus' : 'moins',
            diff: `${dim.sante.disponibilite >= 85 ? '+' : ''}${dim.sante.disponibilite - 85}%`,
            isPositive: dim.sante.disponibilite >= 85
          },
          {
            name: 'Jours consécutifs sans gêne',
            value: dim.sante.joursSansGene,
            unit: 'jours',
            benchmark: 21,
            indicator: dim.sante.joursSansGene >= 21 ? 'plus' : 'moins',
            diff: `${dim.sante.joursSansGene >= 21 ? '+' : ''}${dim.sante.joursSansGene - 21} j`,
            isPositive: dim.sante.joursSansGene >= 21
          },
          {
            name: 'Indice de risque lésionnel',
            value: 0.8,
            unit: '%',
            benchmark: 3.0,
            indicator: 'moins', // Moins de risque = meilleur (+ favorable)
            diff: '-2.2%',
            isPositive: true
          },
          {
            name: 'Force excentrique Ischios (NordBord)',
            value: 418,
            unit: 'N',
            benchmark: 360,
            indicator: 'plus',
            diff: '+58 N',
            isPositive: true
          },
          {
            name: 'Force adduction (ForceFrame)',
            value: 482,
            unit: 'N',
            benchmark: 420,
            indicator: 'plus',
            diff: '+62 N',
            isPositive: true
          },
          {
            name: 'Asymétrie bilatérale de force',
            value: 2.4,
            unit: '%',
            benchmark: 8.0,
            indicator: 'moins', // Moins d'asymétrie = meilleur
            diff: '-5.6%',
            isPositive: true
          },
          {
            name: 'Séances de cryothérapie',
            value: 3,
            unit: 'séances/sem',
            benchmark: 2,
            indicator: 'plus',
            diff: '+1',
            isPositive: true
          },
          {
            name: 'Indice de souplesse articulaire',
            value: 94,
            unit: '/100',
            benchmark: 82,
            indicator: 'plus',
            diff: '+12 pts',
            isPositive: true
          }
        ]
      };

    case 'recuperation':
      return {
        id: 'recuperation',
        title: 'Récupération & Sommeil',
        subtitle: 'Variabilité cardiaque (HRV), sommeil et tonus parasympathique',
        score: dim.recuperation.score,
        benchmarkScore: 76,
        badgeLabel: dim.recuperation.score >= 85 ? 'Récupération Optimale' : 'Récupération Stable',
        summary: `Score de Readiness de ${dim.recuperation.readiness}/100, HRV à ${dim.recuperation.hrv} ms et sommeil de ${dim.recuperation.sommeil}.`,
        staffRecommendation: 'Régularité des horaires de coucher et hydratation nocturne monitorée.',
        metrics: [
          {
            name: 'Score de Readiness (Oura / Whoop)',
            value: dim.recuperation.readiness,
            unit: '/100',
            benchmark: 78,
            indicator: dim.recuperation.readiness >= 78 ? 'plus' : 'moins',
            diff: `${dim.recuperation.readiness >= 78 ? '+' : ''}${dim.recuperation.readiness - 78} pts`,
            isPositive: dim.recuperation.readiness >= 78
          },
          {
            name: 'Durée du sommeil nocturne',
            value: 8.5,
            unit: 'heures',
            benchmark: 8.0,
            indicator: 'plus',
            diff: '+0.5 h',
            isPositive: true
          },
          {
            name: 'Efficacité du sommeil',
            value: 91.5,
            unit: '%',
            benchmark: 84.0,
            indicator: 'plus',
            diff: '+7.5%',
            isPositive: true
          },
          {
            name: 'Variabilité cardiaque (VRC / HRV)',
            value: dim.recuperation.hrv,
            unit: 'ms',
            benchmark: 62,
            indicator: dim.recuperation.hrv >= 62 ? 'plus' : 'moins',
            diff: `${dim.recuperation.hrv >= 62 ? '+' : ''}${dim.recuperation.hrv - 62} ms`,
            isPositive: dim.recuperation.hrv >= 62
          },
          {
            name: 'Fréquence cardiaque au repos',
            value: 44,
            unit: 'bpm',
            benchmark: 52,
            indicator: 'moins', // Plus bas = meilleur (+ athlète)
            diff: '-8 bpm',
            isPositive: true
          },
          {
            name: 'Indice de courbatures musculaires',
            value: player.alert?.type === 'charge' ? 3 : 0,
            unit: '/10',
            benchmark: 2,
            indicator: player.alert?.type === 'charge' ? 'plus' : 'moins',
            diff: player.alert?.type === 'charge' ? '+1' : '-2',
            isPositive: player.alert?.type !== 'charge'
          },
          {
            name: 'Sommeil profond (Stade N3)',
            value: 2.3,
            unit: 'heures',
            benchmark: 1.5,
            indicator: 'plus',
            diff: '+0.8 h',
            isPositive: true
          },
          {
            name: 'Taux de lactate résiduel',
            value: 1.05,
            unit: 'mmol/L',
            benchmark: 1.40,
            indicator: 'moins', // Moins de lactate = meilleur
            diff: '-0.35 mmol/L',
            isPositive: true
          }
        ]
      };

    case 'performance':
    default:
      return {
        id: 'performance',
        title: 'Performance & Matchs',
        subtitle: 'Statistiques en compétition officielle, xG/xA et impact décisif',
        score: dim.performance.score,
        benchmarkScore: 80,
        badgeLabel: 'Impact Compétition Élite',
        summary: `Note moyenne Wyscout/FFF de ${dim.performance.noteMoyenne}/10 sur les derniers matchs disputés.`,
        staffRecommendation: 'Continuer le pressing haut et l’exploitation des transitions tranchantes.',
        metrics: [
          {
            name: 'Note moyenne sur la saison',
            value: dim.performance.noteMoyenne,
            unit: '/10',
            benchmark: 6.8,
            indicator: dim.performance.noteMoyenne >= 6.8 ? 'plus' : 'moins',
            diff: `${dim.performance.noteMoyenne >= 6.8 ? '+' : ''}${(dim.performance.noteMoyenne - 6.8).toFixed(1)}`,
            isPositive: dim.performance.noteMoyenne >= 6.8
          },
          {
            name: isGK ? 'Matchs sans encaisser (Clean sheets)' : 'Buts marqués en compétition',
            value: isGK ? 12 : (dim.performance.butsSaison ?? 14),
            unit: isGK ? 'CS' : 'buts',
            benchmark: isGK ? 7 : 14,
            indicator: (isGK ? 12 : (dim.performance.butsSaison ?? 14)) >= (isGK ? 7 : 14) ? 'plus' : 'moins',
            diff: `+${(isGK ? 12 : (dim.performance.butsSaison ?? 14)) - (isGK ? 7 : 14)}`,
            isPositive: true
          },
          {
            name: isGK ? 'Arrêts décisifs par match' : 'Passes décisives délivrées',
            value: isGK ? (dim.performance.arretsParMatch ?? 3.8) : (dim.performance.passesD ?? 6),
            unit: isGK ? 'arrêts/m' : 'passes D',
            benchmark: isGK ? 2.4 : 6,
            indicator: (isGK ? (dim.performance.arretsParMatch ?? 3.8) : (dim.performance.passesD ?? 6)) >= (isGK ? 2.4 : 6) ? 'plus' : 'moins',
            diff: `+${((isGK ? (dim.performance.arretsParMatch ?? 3.8) : (dim.performance.passesD ?? 6)) - (isGK ? 2.4 : 6)).toFixed(1)}`,
            isPositive: true
          },
          {
            name: 'Taux de passes réussies',
            value: isGK ? (dim.performance.relancesReussies ?? 82.5) : 89.4,
            unit: '%',
            benchmark: isGK ? 74.0 : 81.2,
            indicator: 'plus',
            diff: isGK ? `+${((dim.performance.relancesReussies ?? 82.5) - 74.0).toFixed(1)}%` : '+8.2%',
            isPositive: true
          },
          {
            name: 'Taux de duels gagnés',
            value: 72.4,
            unit: '%',
            benchmark: 58.0,
            indicator: 'plus',
            diff: '+14.4%',
            isPositive: true
          },
          {
            name: isGK ? 'Buts évités au-dessus des tirs cadrés (xGOT)' : 'Différentiel xG convertis',
            value: isGK ? 3.4 : 24,
            unit: isGK ? 'xGOT' : '%',
            benchmark: isGK ? 0.4 : 4,
            indicator: 'plus',
            diff: isGK ? '+3.0' : '+20%',
            isPositive: true
          },
          {
            name: 'Ballons récupérés par 90 minutes',
            value: isGK ? 3.8 : 7.2,
            unit: 'ballons/90m',
            benchmark: isGK ? 2.2 : 4.8,
            indicator: 'plus',
            diff: isGK ? '+1.6' : '+2.4',
            isPositive: true
          },
          {
            name: 'Grosses occasions créées',
            value: isGK ? 0 : 18,
            unit: 'occasions',
            benchmark: isGK ? 0 : 8,
            indicator: isGK ? 'egal' : 'plus',
            diff: isGK ? '0' : '+10',
            isPositive: true
          }
        ]
      };

    case 'forme':
      return {
        id: 'forme',
        title: 'Forme du Moment & Dynamique',
        subtitle: 'Indice composite de forme physique, fraîcheur neuromusculaire et ressenti RPE',
        score: Math.min(100, Math.round(dim.performance.score * 0.5 + dim.recuperation.score * 0.5 + 4)),
        benchmarkScore: 80,
        badgeLabel: 'Forme Excellente',
        summary: `Dynamique ascendante sur les 4 dernières semaines avec une fraîcheur évaluée à 85%.`,
        staffRecommendation: 'Maintenir les charges actuelles et préserver les 48h de récupération post-match.',
        metrics: [
          { name: 'Note de forme instantanée', value: '8.4/10', unit: '/10', benchmark: '7.5', indicator: 'plus', diff: '+0.9', isPositive: true },
          { name: 'Fraîcheur neuromusculaire', value: '85%', unit: '%', benchmark: '78%', indicator: 'plus', diff: '+7%', isPositive: true },
          { name: 'Score Readiness Catapult', value: '88/100', unit: '/100', benchmark: '80', indicator: 'plus', diff: '+8 pts', isPositive: true },
          { name: 'Perception de l\'effort (RPE)', value: '6.4/10', unit: '/10', benchmark: '7.0', indicator: 'moins', diff: '-0.6', isPositive: true }
        ]
      };

    case 'technique':
      return {
        id: 'technique',
        title: 'Maîtrise Technique & Gestuelle',
        subtitle: 'Précision des passes, conduite de balle sous pression et efficacité devant le but',
        score: Math.min(100, Math.round(dim.performance.score * 0.6 + 32)),
        benchmarkScore: 80,
        badgeLabel: 'Technique Élite',
        summary: `87% de passes réussies et 84/100 à l'index de justesse technique dans les 30 derniers mètres.`,
        staffRecommendation: 'Encourager la prise d\'initiative dans le dernier tiers et les tirs de loin.',
        metrics: [
          { name: 'Précision de passe', value: '87%', unit: '%', benchmark: '81%', indicator: 'plus', diff: '+6%', isPositive: true },
          { name: 'Passes progressives vers l\'avant', value: 14.2, unit: '/match', benchmark: 9.8, indicator: 'plus', diff: '+4.4', isPositive: true },
          { name: 'Dribbles réussis', value: '72%', unit: '%', benchmark: '60%', indicator: 'plus', diff: '+12%', isPositive: true },
          { name: 'Tirs cadrés', value: '64%', unit: '%', benchmark: '52%', indicator: 'plus', diff: '+12%', isPositive: true }
        ]
      };

    case 'tactique':
      return {
        id: 'tactique',
        title: 'Intelligence & Rôle Tactique',
        subtitle: 'Respect des consignes, déplacements sans ballon, compacité et transitions',
        score: 81,
        benchmarkScore: 78,
        badgeLabel: 'Alignement Tactique Élevé',
        summary: `Excellente compréhension des zones d'influence et pressing coordonné en phase défensive.`,
        staffRecommendation: 'Améliorer le repli sur les contre-attaques rapides adverses.',
        metrics: [
          { name: 'Respect du plan de jeu FFF', value: '92%', unit: '%', benchmark: '85%', indicator: 'plus', diff: '+7%', isPositive: true },
          { name: 'Pressing et fermetures d\'angles', value: 24, unit: '/match', benchmark: 18, indicator: 'plus', diff: '+6', isPositive: true },
          { name: 'Interceptions dans le demi-espace', value: 5.4, unit: '/match', benchmark: 3.8, indicator: 'plus', diff: '+1.6', isPositive: true },
          { name: 'Compacité du bloc équipe', value: '88%', unit: '%', benchmark: '82%', indicator: 'plus', diff: '+6%', isPositive: true }
        ]
      };

    case 'mental':
      return {
        id: 'mental',
        title: 'Résilience Mentale & Leadership',
        subtitle: 'Concentration sous pression, gestion émotionnelle et engagement dans les duels',
        score: 85,
        benchmarkScore: 80,
        badgeLabel: 'Mental Compétiteur',
        summary: `Haut niveau d'engagement dans les moments décisifs et constance émotionnelle.`,
        staffRecommendation: 'Poursuivre les séances de préparation mentale et d\'imagerie motrice.',
        metrics: [
          { name: 'Indice de concentration 90 min', value: '88/100', unit: '/100', benchmark: '80', indicator: 'plus', diff: '+8 pts', isPositive: true },
          { name: 'Efficacité dans le money time (75\'-90\')', value: '91%', unit: '%', benchmark: '75%', indicator: 'plus', diff: '+16%', isPositive: true },
          { name: 'Résilience après faute/perte', value: '86%', unit: '%', benchmark: '78%', indicator: 'plus', diff: '+8%', isPositive: true }
        ]
      };
  }
}

