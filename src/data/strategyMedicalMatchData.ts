import { UPCOMING_MATCH } from './upcomingMatch';

export interface PlayerHealthStatus {
  id: string;
  name: string;
  position: string;
  status: 'apte_100' | 'apte_surveillance' | 'temps_regule' | 'inapte';
  injuryRiskScore: number; // 0 to 10
  targetedStructure: string;
  clinicalDiagnosis: string;
  maxMinutesRecommended: number;
  mandatoryProtections: string[];
  coachInstruction: string;
}

export interface MedicalMatchPrepData {
  matchInfo: {
    matchTitle: string;
    competition: string;
    date: string;
    stadium: string;
    medicalOfficer: string;
  };
  globalSquadDiagnostic: {
    totalPlayers: number;
    fullyFitCount: number;
    monitoredCount: number;
    restrictedMinutesCount: number;
    unfitCount: number;
    squadReadinessIndex: number; // e.g. 94%
    overallInjuryRiskLevel: 'Très Faible' | 'Faible' | 'Modéré' | 'Élevé';
  };
  playersUnderSurveillance: PlayerHealthStatus[];
  tacticalRecommendationsForZidane: {
    title: string;
    category: 'TEMPS DE JEU' | 'ÉCHAUFFEMENT' | 'CHANGEMENTS' | 'POST-MATCH';
    description: string;
    concernedPlayers: string[];
    urgency: 'Prioritaire' | 'Vigilance' | 'Standard';
  }[];
  matchDayProtocols: {
    timing: string;
    protocolTitle: string;
    location: string;
    actions: string[];
  }[];
}

export const MEDICAL_MATCH_PREP_DATA: MedicalMatchPrepData = {
  matchInfo: {
    matchTitle: `${UPCOMING_MATCH.title} (UEFA Nations League)`,
    competition: `${UPCOMING_MATCH.competition} • Choc International (${UPCOMING_MATCH.countdown})`,
    date: UPCOMING_MATCH.dateTime,
    stadium: UPCOMING_MATCH.fullVenue,
    medicalOfficer: 'Dr. Franck Le Gall (Responsable Médical FFF)'
  },
  globalSquadDiagnostic: {
    totalPlayers: 24,
    fullyFitCount: 20,
    monitoredCount: 3,
    restrictedMinutesCount: 2,
    unfitCount: 0,
    squadReadinessIndex: 94.2,
    overallInjuryRiskLevel: 'Faible'
  },
  playersUnderSurveillance: [
    {
      id: 'mbappe',
      name: 'Kylian Mbappé (#10)',
      position: 'Attaquant',
      status: 'temps_regule',
      injuryRiskScore: 2.8,
      targetedStructure: 'Ligament Latéral Interne (LLI) genou droit',
      clinicalDiagnosis: 'Entorse stade 1 en voie de consolidation complète. Échographie : résorption 85%, absence de laxité.',
      maxMinutesRecommended: 70,
      mandatoryProtections: ['Strapping de maintien proprioceptif K-Tape', 'Genouillère néoprène souple'],
      coachInstruction: 'Titularisation autorisée. Programmer la sortie entre la 60e et la 70e minute pour éviter l’épuisement excentrique.'
    },
    {
      id: 'rabiot',
      name: 'Adrien Rabiot (#14)',
      position: 'Milieu',
      status: 'apte_surveillance',
      injuryRiskScore: 3.2,
      targetedStructure: 'Soléaire et mollet gauche',
      clinicalDiagnosis: 'Légère contracture myo-fasciale résolue à 95%. Aucun œdème résiduel.',
      maxMinutesRecommended: 75,
      mandatoryProtections: ['Chaussettes de compression active', 'Massage décontracturant d’échauffement'],
      coachInstruction: 'Échauffement progressif allongé de 10 min. Surveillance des accélérations au milieu.'
    },
    {
      id: 'dembele',
      name: 'Ousmane Dembélé (#7)',
      position: 'Attaquant',
      status: 'apte_surveillance',
      injuryRiskScore: 2.5,
      targetedStructure: 'Ischio-jambiers droits (Biceps fémoral)',
      clinicalDiagnosis: 'Bilan isocinétique symétrique à 96%. Légère fatigue neuromusculaire post-LDC.',
      maxMinutesRecommended: 80,
      mandatoryProtections: ['Catapult Vector alerte sprint >33 km/h'],
      coachInstruction: 'Avertir le banc si plus de 18 sprints à haute intensité sont cumulés avant la 70e.'
    },
    {
      id: 'hernandez',
      name: 'Théo Hernandez (#22)',
      position: 'Défenseur',
      status: 'apte_100',
      injuryRiskScore: 1.4,
      targetedStructure: 'Adducteurs & symphyse pubienne',
      clinicalDiagnosis: 'Bilan musculo-squelettique optimal. Aucune douleur rapportée.',
      maxMinutesRecommended: 90,
      mandatoryProtections: ['Gainage pelvien pré-match'],
      coachInstruction: 'Disponible à 100% pour l’intégralité de la rencontre.'
    }
  ],
  tacticalRecommendationsForZidane: [
    {
      title: 'Gestion du temps de jeu de Kylian Mbappé (Capitaine)',
      category: 'TEMPS DE JEU',
      description: 'Le Dr. Le Gall préconise une titularisation avec une sortie impérative entre la 60e et la 70e minute (remplacement par Barcola). Cela élimine 98% du risque de récidive du LLI.',
      concernedPlayers: ['Kylian Mbappé', 'Bradley Barcola'],
      urgency: 'Prioritaire'
    },
    {
      title: 'Protocole d’échauffement individualisé pour Rabiot & Dembélé',
      category: 'ÉCHAUFFEMENT',
      description: 'Débuter l’activation dynamique 10 minutes avant le groupe collectif avec les kinésithérapeutes (élastiques, activation fessiers & soléaires).',
      concernedPlayers: ['Adrien Rabiot', 'Ousmane Dembélé'],
      urgency: 'Vigilance'
    },
    {
      title: 'Surveillance GPS Catapult en temps réel sur le banc',
      category: 'CHANGEMENTS',
      description: 'Alexandre Germain transmettra un signal sur la tablette du staff si la charge aiguë de Tchouaméni ou Dembélé dépasse les seuils critiques en 2e mi-temps.',
      concernedPlayers: ['Aurélien Tchouaméni', 'Ousmane Dembélé'],
      urgency: 'Standard'
    },
    {
      title: 'Cryothérapie compressive immédiate dans les vestiaires',
      category: 'POST-MATCH',
      description: 'Installation des bottes Game Ready et des bains froids à 10°C dès le coup de sifflet final pour accélérer la résorption lactique.',
      concernedPlayers: ['Tout l’effectif des 24'],
      urgency: 'Standard'
    }
  ],
  matchDayProtocols: [
    {
      timing: 'J-0 • 10h30',
      protocolTitle: 'Réveil musculaire, mobilité & Bilan clinique flash',
      location: 'Hôtel des Bleus • Salon Médical',
      actions: [
        'Vérification des amplitudes de flexion/extension (Mbappé, Rabiot)',
        'Pesée et contrôle de l’hydratation par réfractométrie',
        'Pose des strappings préventifs'
      ]
    },
    {
      timing: 'J-0 • 19h15 (H-90 min)',
      protocolTitle: 'Arrivée vestiaire & Massages préparatoires',
      location: 'Vestiaire France • Stade de France',
      actions: [
        'Massages myo-tonifiants avec baume chauffant',
        'Distribution des compléments d’électrolytes et caféine dosée',
        'Pose finale des capteurs GPS Catapult Vector'
      ]
    },
    {
      timing: 'J-0 • Mi-Temps (21h35)',
      protocolTitle: 'Check-up médical mi-temps',
      location: 'Vestiaire France',
      actions: [
        'Évaluation EVA de douleur au genou pour Mbappé',
        'Réhydratation hypertonique et gels énergétiques',
        'Remplacement des strappings si nécessaire'
      ]
    }
  ]
};
