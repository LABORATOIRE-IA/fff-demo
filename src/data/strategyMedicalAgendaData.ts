import { UPCOMING_MATCH } from './upcomingMatch';

export interface WeeklyMedicalForecast {
  weekNumber: number;
  dateRange: string;
  theme: string;
  matchLoadContext: string; // e.g. "Rassemblement FFF + Choc Espagne", "Retour Club + Ligue des Champions"
  predictedInjuryRiskPercent: number; // 0 to 100
  riskZone: 'Faible' | 'Modéré' | 'Élevé' | 'Critique';
  requiredCareHours: number;
  emergencyReserveHours: number;
  keyMedicalActions: string[];
  vulnerableStructures: string[];
}

export interface MedicalSpecialistSlot {
  date: string;
  specialistTitle: string;
  doctorName: string;
  purpose: string;
  targetPlayersCount: number;
  urgency: 'Planifié' | 'Prioritaire' | 'Systématique';
}

export interface MedicalAgendaPlanningData {
  timeframe: string;
  doctorInCharge: string;
  weeklyForecasts: WeeklyMedicalForecast[];
  globalResourcesSummary: {
    totalKineCareHours: number;
    totalUltrasoundsPlanned: number;
    totalMriPlanned: number;
    totalBloodTestsPlanned: number;
    emergencyReserveBufferPercent: number;
  };
  specialistAppointments: MedicalSpecialistSlot[];
  timeAllocationWeekly: {
    scheduledCareHours: number;
    preventiveScreeningHours: number;
    emergencyTraumaBufferHours: number;
    staffCoordinationHours: number;
  };
}

export const MEDICAL_AGENDA_PLANNING_DATA: MedicalAgendaPlanningData = {
  timeframe: 'Octobre — Novembre 2026 (Microcycles S1 à S8)',
  doctorInCharge: 'Dr. Franck Le Gall (Médecin Équipe de France A)',
  weeklyForecasts: [
    {
      weekNumber: 1,
      dateRange: '29 Sept — 05 Oct 2026',
      theme: `Rassemblement FFF • Match ${UPCOMING_MATCH.title}`,
      matchLoadContext: `Semaine internationale à très haute intensité (J-0 ${UPCOMING_MATCH.weekday})`,
      predictedInjuryRiskPercent: 22,
      riskZone: 'Modéré',
      requiredCareHours: 32,
      emergencyReserveHours: 12,
      keyMedicalActions: [
        'Suivi protocole genou Kylian Mbappé (LLI Phase 2 & 3)',
        'Échographies de contrôle soléaire pour Adrien Rabiot',
        'Soins post-match immédiats vestiaire'
      ],
      vulnerableStructures: ['Genou droit (LLI)', 'Soléaires', 'Ischios']
    },
    {
      weekNumber: 2,
      dateRange: '06 Oct — 12 Oct 2026',
      theme: '2e Match FFF & Retour en Club',
      matchLoadContext: 'Enchaînement match international + transition vers championnats européens',
      predictedInjuryRiskPercent: 34,
      riskZone: 'Élevé',
      requiredCareHours: 28,
      emergencyReserveHours: 14,
      keyMedicalActions: [
        'Bilan de sortie de rassemblement pour les 24 clubs',
        'Transmission des bilans GPS Catapult et dossiers médicaux',
        'Contrôle des marqueurs de fatigue (CPK / Urée)'
      ],
      vulnerableStructures: ['Adducteurs', 'Ischios', 'Fatigue neuromusculaire']
    },
    {
      weekNumber: 3,
      dateRange: '13 Oct — 19 Oct 2026',
      theme: 'Phase Championnats & Ligue des Champions J3',
      matchLoadContext: 'Matchs tous les 3 jours pour 18 joueurs du groupe',
      predictedInjuryRiskPercent: 41,
      riskZone: 'Élevé',
      requiredCareHours: 20,
      emergencyReserveHours: 16,
      keyMedicalActions: [
        'Veille médicale décentralisée avec les médecins de club (Real Madrid, PSG, Arsenal)',
        'Monitoring à distance des minutes jouées et alertes GPS',
        'Coordination des protocoles de cryothérapie'
      ],
      vulnerableStructures: ['Ischio-jambiers', 'Tendons d’Achille']
    },
    {
      weekNumber: 4,
      dateRange: '20 Oct — 26 Oct 2026',
      theme: 'Pic de Charge Automnale Club',
      matchLoadContext: 'LDC + Chocs de championnats nationaux',
      predictedInjuryRiskPercent: 48,
      riskZone: 'Critique',
      requiredCareHours: 22,
      emergencyReserveHours: 18,
      keyMedicalActions: [
        'Échanges médicaux approfondis avec le staff médical du Real Madrid (Mbappé, Camavinga)',
        'Analyse des rapports d’imagerie transmis par les clubs partenaires',
        'Mise à jour des profils AMS 360'
      ],
      vulnerableStructures: ['Genoux', 'Quadriceps', 'Pubalgie']
    },
    {
      weekNumber: 5,
      dateRange: '27 Oct — 02 Nov 2026',
      theme: 'Régénération & Prévention Intermédiaire',
      matchLoadContext: 'Semaine à 1 match pour la majorité de l’effectif',
      predictedInjuryRiskPercent: 18,
      riskZone: 'Faible',
      requiredCareHours: 16,
      emergencyReserveHours: 8,
      keyMedicalActions: [
        'Bilan cardiologique et tests de conformité UEFA',
        'Visites de contrôle au centre médical de Clairefontaine',
        'Soins préventifs et rééquilibrages podologiques'
      ],
      vulnerableStructures: ['Voûte plantaire', 'Bassin / Lombaires']
    },
    {
      weekNumber: 6,
      dateRange: '03 Nov — 09 Nov 2026',
      theme: 'Pré-Rassemblement de Novembre (J-7)',
      matchLoadContext: 'Dernière ligne droite avant la liste officielle de Zidane',
      predictedInjuryRiskPercent: 32,
      riskZone: 'Modéré',
      requiredCareHours: 26,
      emergencyReserveHours: 14,
      keyMedicalActions: [
        'Émission du rapport médical pré-sélection pour Zinédine Zidane',
        'Identification des joueurs aptes / inaptes pour le rassemblement',
        'Planification des créneaux d’imagerie d’arrivée'
      ],
      vulnerableStructures: ['Chevilles', 'Ischios', 'Biceps fémoral']
    },
    {
      weekNumber: 7,
      dateRange: '10 Nov — 16 Nov 2026',
      theme: 'Rassemblement France A • Chocs Novembre',
      matchLoadContext: '2 matchs internationaux décisifs',
      predictedInjuryRiskPercent: 38,
      riskZone: 'Élevé',
      requiredCareHours: 36,
      emergencyReserveHours: 16,
      keyMedicalActions: [
        'Prise en charge quotidienne 24/24h au Château de Clairefontaine',
        'Balnéothérapie & cryothérapie corps entier -110°C biquotidienne',
        'Gestion des traumatismes de match en direct'
      ],
      vulnerableStructures: ['Membres inférieurs', 'Chocs / Traumatismes articulaires']
    },
    {
      weekNumber: 8,
      dateRange: '17 Nov — 23 Nov 2026',
      theme: 'Clôture Rassemblement & Bilan Trimestriel',
      matchLoadContext: 'Retour vers la trêve hivernale en club',
      predictedInjuryRiskPercent: 20,
      riskZone: 'Faible',
      requiredCareHours: 18,
      emergencyReserveHours: 10,
      keyMedicalActions: [
        'Bilan de santé trimestriel complet FFF',
        'Synthèse épidémiologique et taux de disponibilité sur l’automne (cible > 92%)',
        'Planification des protocoles de reprise 2027'
      ],
      vulnerableStructures: ['Récupération globale', 'Sommeil & Système immunitaire']
    }
  ],
  globalResourcesSummary: {
    totalKineCareHours: 198,
    totalUltrasoundsPlanned: 28,
    totalMriPlanned: 6,
    totalBloodTestsPlanned: 48,
    emergencyReserveBufferPercent: 30
  },
  specialistAppointments: [
    {
      date: '08 Octobre 2026',
      specialistTitle: 'Consultation Cardiologie du Sport',
      doctorName: 'Dr. Laurent Chevalier',
      purpose: 'Électrocardiogramme de repos & d’effort annuel (Directive UEFA)',
      targetPlayersCount: 6,
      urgency: 'Systématique'
    },
    {
      date: '15 Octobre 2026',
      specialistTitle: 'Expertise Podologie & Biomécanique',
      doctorName: 'Dr. Arnaud Foisy',
      purpose: 'Renouvellement des semelles orthopédiques carbone et analyse d’appuis',
      targetPlayersCount: 8,
      urgency: 'Planifié'
    },
    {
      date: '05 Novembre 2026',
      specialistTitle: 'Chirurgie Orthopédique & Arthroscopie',
      doctorName: 'Pr. Bertrand Sonnery-Cottet',
      purpose: 'Bilan d’évaluation ligamentaire de contrôle pour les joueurs en post-opératoire',
      targetPlayersCount: 2,
      urgency: 'Prioritaire'
    }
  ],
  timeAllocationWeekly: {
    scheduledCareHours: 24,
    preventiveScreeningHours: 12,
    emergencyTraumaBufferHours: 14,
    staffCoordinationHours: 6
  }
};
