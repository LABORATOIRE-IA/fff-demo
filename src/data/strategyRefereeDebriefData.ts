export interface KeyDecisionReview {
  id: string;
  minute: string;
  situationTitle: string;
  category: 'Penalty' | 'Carton Rouge (DOGSO)' | 'Hors-jeu VAR' | 'Faute Tactique' | 'Avantage';
  decisionOnField: string;
  varOutcome: 'Confirmée sans révision' | 'Révision sur écran validée' | 'Non concerné';
  decisionQuality: 'Excellente' | 'Bonne' | 'À améliorer';
  analysisNote: string;
  clipThumbnail: string;
  refereePositionDistance: string; // e.g. "11.2 mètres"
  pedagogyFeedback: string;
}

export interface RefereeDebriefData {
  matchInfo: {
    matchTitle: string;
    competition: string;
    date: string;
    stadium: string;
    scoreFinal: string;
    centralReferee: string;
    dtaEvaluator: string;
    overallGrade: number; // e.g. 8.8/10
  };
  physicalPerformance: {
    totalDistanceKm: number;
    highSpeedRunningMeters: number; // >20 km/h
    sprintsCount: number; // >25 km/h
    avgDistanceToBallMeters: number;
    heartRateAvgBpm: number;
    heartRateMaxBpm: number;
    lateMatchLucidityScore: number; // /100
  };
  decisionQualitySummary: {
    totalDecisionsCount: number;
    correctDecisionsPercent: number; // e.g. 96.4%
    foulsWhistledCount: number;
    yellowCardsCount: number;
    redCardsCount: number;
    varInterventionsCount: number;
    advantagesGivenCount: number;
  };
  keyDecisions: KeyDecisionReview[];
  strengths: {
    title: string;
    description: string;
    stat: string;
  }[];
  improvementAreas: {
    title: string;
    description: string;
    actionPlan: string;
  }[];
  officialDtaSynthesis: string;
}

export const REFEREE_MATCH_DEBRIEF_DATA: RefereeDebriefData = {
  matchInfo: {
    matchTitle: 'Olympique Lyonnais vs AS Monaco',
    competition: 'Ligue 1 McDonald’s • J6',
    date: 'Dimanche 22 Septembre 2026',
    stadium: 'Groupama Stadium, Décines',
    scoreFinal: '2 — 1',
    centralReferee: 'François Letexier',
    dtaEvaluator: 'Antony Gautier (Directeur Technique de l’Arbitrage)',
    overallGrade: 8.8
  },
  physicalPerformance: {
    totalDistanceKm: 11.85,
    highSpeedRunningMeters: 1420,
    sprintsCount: 18,
    avgDistanceToBallMeters: 13.8,
    heartRateAvgBpm: 158,
    heartRateMaxBpm: 184,
    lateMatchLucidityScore: 94
  },
  decisionQualitySummary: {
    totalDecisionsCount: 44,
    correctDecisionsPercent: 96.4,
    foulsWhistledCount: 26,
    yellowCardsCount: 4,
    redCardsCount: 1,
    varInterventionsCount: 1,
    advantagesGivenCount: 6
  },
  keyDecisions: [
    {
      id: 'dec-1',
      minute: '23e minute',
      situationTitle: 'Tacle glissé en retard dans la surface de réparation',
      category: 'Penalty',
      decisionOnField: 'Penalty accordé immédiatement + Carton jaune pour le défenseur.',
      varOutcome: 'Confirmée sans révision',
      decisionQuality: 'Excellente',
      analysisNote: 'Positionnement parfait à 11m de l’action avec angle de vue ouvert. Aucun doute sur le contact direct au tibia.',
      clipThumbnail: '🎥 Angle Caméra Tribune Ouest',
      refereePositionDistance: '11.2 mètres',
      pedagogyFeedback: 'Attitude ferme, annonce calme et gestuelle nette qui a immédiatement éteint toute contestation adverse.'
    },
    {
      id: 'dec-2',
      minute: '41e minute',
      situationTitle: 'Répétition de fautes d’antijeu au milieu de terrain',
      category: 'Faute Tactique',
      decisionOnField: 'Carton jaune sorti après 3e avertissement verbal.',
      varOutcome: 'Non concerné',
      decisionQuality: 'Excellente',
      analysisNote: 'Gestion progressive exemplaire (warning verbal à la 14e, recadrage du capitaine à la 28e, carton à la 41e).',
      clipThumbnail: '🎥 Plan Large Tactique',
      refereePositionDistance: '14.5 mètres',
      pedagogyFeedback: 'L’arbitre a protégé l’intégrité du jeu sans sur-réagir trop tôt.'
    },
    {
      id: 'dec-3',
      minute: '67e minute',
      situationTitle: 'Annihilation d’une occasion nette de but (DOGSO)',
      category: 'Carton Rouge (DOGSO)',
      decisionOnField: 'Faute sifflée à l’entrée des 18m + Carton Rouge direct.',
      varOutcome: 'Révision sur écran validée',
      decisionQuality: 'Excellente',
      analysisNote: 'Vérification VAR ultra-rapide (45 secondes) confirmant l’absence de couverture par le second défenseur central.',
      clipThumbnail: '🎥 Caméra Ligne de But & Loupe 4K',
      refereePositionDistance: '12.8 mètres',
      pedagogyFeedback: 'Maîtrise remarquable du regroupement de joueurs post-expulsion. Aucun débordement.'
    },
    {
      id: 'dec-4',
      minute: '84e minute',
      situationTitle: 'Contact litigieux à la limite de la ligne de touche et contre rapide',
      category: 'Avantage',
      decisionOnField: 'Avantage laissé, menant à une occasion de frappe cadrée.',
      varOutcome: 'Non concerné',
      decisionQuality: 'Bonne',
      analysisNote: 'Bonne lecture du jeu. Toutefois, l’arbitre aurait pu temporiser d’une demi-seconde de plus avant de baisser les bras pour officialiser l’avantage.',
      clipThumbnail: '🎥 Caméra Banc de Touche',
      refereePositionDistance: '18.4 mètres',
      pedagogyFeedback: 'Axe d’amélioration : accentuer le signal sonore ou verbal « Jouez ! » pour rassurer les attaquants.'
    }
  ],
  strengths: [
    {
      title: 'Proximité constante avec le cœur de l’action',
      description: 'Distance moyenne au ballon mesurée à 13.8 mètres (standard UEFA < 15m), garantissant une crédibilité immédiate.',
      stat: '13.8 m moy.'
    },
    {
      title: 'Gestion sereine et autorité naturelle',
      description: 'Très bonne posture corporelle, dialogue respectueux avec les capitaines, aucun attroupement non maîtrisé.',
      stat: '0 incident'
    },
    {
      title: 'Cohérence disciplinaire de la 1ère à la 90e minute',
      description: 'Barème d’avertissement identique tout au long de la rencontre, salué par les deux staffs en fin de match.',
      stat: '96.4% justesse'
    }
  ],
  improvementAreas: [
    {
      title: 'Accélération sur les longues transversales de contre',
      description: 'Sur 2 transitions de 60 mètres à la 78e et 82e minute, l’arbitre s’est retrouvé à 22 mètres du ballon.',
      actionPlan: 'Déclencher la course à haute vélocité dès que le porteur de balle lève la tête pour la passe longue.'
    },
    {
      title: 'Clarification des signaux d’avantage différé',
      description: 'Accentuer la gestuelle des deux bras en avant et la voix pour éviter que l’attaquant ne s’arrête de jouer.',
      actionPlan: 'Exercice vidéo spécifique au centre de Clairefontaine sur la synchronisation gestuelle / sifflet.'
    }
  ],
  officialDtaSynthesis: 'Prestation de très haut niveau international. François Letexier a dirigé une rencontre engagée avec un calme olympien et une précision chirurgicale sur les faits de jeu majeurs (Penalty et DOGSO indiscutables). La condition physique est irréprochable.'
};
