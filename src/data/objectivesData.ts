import { UserRole, AppView } from '../types/ams';
import { UPCOMING_MATCH } from './upcomingMatch';

export interface SimulationPreset {
  id: string;
  name: string;
  label: string;
  description: string;
  probSuccess: number; // e.g. 68.4
  riskScore: number; // e.g. 3.2
  freshnessScore: number; // e.g. 92
  impactScore: number; // e.g. 94
  isRecommended: boolean;
  variableLabel: string;
  variableValue: string;
}

export interface PlayerWorkItem {
  playerId: string;
  playerName: string;
  position: string;
  avatarUrl?: string;
  focusArea: string;
  workItems: string[];
  individualImpact: string;
  collectiveImpact: string;
}

export interface DimensionArticulation {
  individualSummary: string;
  collectiveSummary: string;
  articulationExplanation: string;
  playerWorkItems: PlayerWorkItem[];
}

export interface RoleObjective {
  id: string;
  role: UserRole;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  icon: string;
  priorityOrder: number;
  predictiveHighlight: string;
  confidenceScore: number;
  shortSummary: string;
  detailedAnalysis?: string;
  forecasts: {
    label: string;
    value: string;
    trend: string;
    isPositive: boolean;
    explanation?: string;
  }[];
  recommendations: {
    actor: string;
    action: string;
    urgency: 'critique' | 'haute' | 'normale';
    impact?: string;
  }[];
  keyMetrics: {
    name: string;
    value: string;
    subtext: string;
    trend?: string;
  }[];
  targetPlayerId?: string;
  actionButtonLabel: string;
  simulationPresets?: SimulationPreset[];
  sourcesQualified?: string[];
  specializedToolRoute?: AppView;
  specializedToolLabel?: string;
  dimensionArticulation?: DimensionArticulation;
}

export const ROLE_OBJECTIVES_DATA: Record<UserRole, RoleObjective[]> = {
  entraineur: [
    {
      id: 'coach_obj_1',
      role: 'entraineur',
      title: `Préparer ma feuille de match pour ${UPCOMING_MATCH.title}`,
      subtitle: "Arbitrage des 11 titulaires selon la fraîcheur neuromusculaire, la complémentarité tactique et le score de confiance",
      category: "Feuille de Match",
      badge: `${UPCOMING_MATCH.shortDate} • Score de Confiance`,
      icon: "📋",
      priorityOrder: 1,
      predictiveHighlight: "Probabilité de victoire estimée à 68.4% (Score de confiance collectif: 97.4%) avec le 11 titulaire recommandé articulé autour de Mbappé en pointe libre.",
      confidenceScore: 97.4,
      shortSummary: "Modélisation de la feuille de match optimale tenant compte des signaux physiologiques des 24 Bleus et des forces adverses.",
      detailedAnalysis: "L'analyse comparative des 124 confrontations internationales récentes combinée aux signaux GPS Catapult à H-48 démontre que le 4-3-3 asymétrique maximise l'équilibre entre possession et transitions rapides. La feuille de match proposée sécurise un score de confiance collectif de 97.4% avec 11 titulaires à 100% de disponibilité.",
      forecasts: [
        { label: "Score Confiance Collectif", value: "97.4%", trend: "Très Élevé", isPositive: true, explanation: "Fiabilité maximale du modèle tactique FFF" },
        { label: "Niveau de forme du collectif", value: "92.6 / 100", trend: "+3.8 pts", isPositive: true, explanation: "Pic d'explosivité programmé pour lundi à 20h45" },
        { label: "Probabilité de Victoire", value: "68.4%", trend: "Favori", isPositive: true, explanation: "Espérance de buts projetée à +0.52 xG" }
      ],
      recommendations: [
        { actor: "Zinédine Zidane", action: "Valider la feuille de match avec Kylian Mbappé en pointe mobile et Barcola sur l'aile gauche.", urgency: "haute", impact: "Score de confiance collectif garanti à 97.4%" },
        { actor: "Staff Technique", action: "Prévoir l'entrée d'Ousmane Dembélé à l'heure de jeu pour accélérer face à la fatigue adverse.", urgency: "haute", impact: "Maintien de 100% d'intensité sur les couloirs" },
        { actor: "Préparateur Physique", action: "Activation neuromusculaire spécifique à J-1 axée sur la vivacité des appuis (3 répétitions max).", urgency: "normale", impact: "Prévention des tensions myotendineuses" }
      ],
      keyMetrics: [
        { name: "Disponibilité Titulaires", value: "11 / 11", subtext: "Feu vert médical total" },
        { name: "Score de Confiance", value: "97.4%", subtext: "Calibration sur 124 matchs" },
        { name: "Rendement Offensif Attendu", value: "+0.52 xG", subtext: "Efficacité collective maximale" }
      ],
      targetPlayerId: "mbappe",
      actionButtonLabel: "Consulter la Feuille de Match Détaillée",
      specializedToolRoute: 'ai_strategy',
      specializedToolLabel: "Terrain & Scénarios Tactiques",
      sourcesQualified: ["Catapult Vector 10Hz", "Dossiers Médicaux FFF Dr. Le Gall", "StatsPerform Opta Live", "Oura Sleep Data"],
      simulationPresets: [
        {
          id: 'sim_1',
          name: "Option 1 (Recommandée)",
          label: "11 Titulaire Recommandé (4-3-3 Asymétrique)",
          description: "Équilibre parfait entre puissance d'impact initiale et compacité défensive.",
          probSuccess: 68.4,
          riskScore: 3.2,
          freshnessScore: 92,
          impactScore: 94,
          isRecommended: true,
          variableLabel: "Temps Mbappé",
          variableValue: "75 min"
        },
        {
          id: 'sim_2',
          name: "Option 2",
          label: "Option Offensive (4-2-3-1)",
          description: "Accroît la présence dans les 30m adverses mais sollicite davantage le repli des ailiers.",
          probSuccess: 64.1,
          riskScore: 6.8,
          freshnessScore: 84,
          impactScore: 91,
          isRecommended: false,
          variableLabel: "Temps Mbappé",
          variableValue: "90 min"
        },
        {
          id: 'sim_3',
          name: "Option 3",
          label: "Option Sécurité (3-4-2-1)",
          description: "Verrouillage axial maximal, transition par les pistons, score de confiance à 95.1%.",
          probSuccess: 60.5,
          riskScore: 1.9,
          freshnessScore: 95,
          impactScore: 83,
          isRecommended: false,
          variableLabel: "Temps Mbappé",
          variableValue: "60 min"
        }
      ],
      dimensionArticulation: {
        individualSummary: "Chaque titulaire présente un score individuel de forme supérieur à 88/100 et un ACWR contrôlé.",
        collectiveSummary: "Le bloc médian affiche une compacité de 34 mètres garantissant la coordination pressing.",
        articulationExplanation: "L'état de fraîcheur individuel de Mbappé et Barcola conditionne directement la vitesse de projection collective (+2.4 m/s de vitesse de transition collective).",
        playerWorkItems: [
          {
            playerId: "mbappe",
            playerName: "Kylian Mbappé",
            position: "Attaquant",
            focusArea: "Appels dans l'espace & Finition",
            workItems: ["Démarquage court-long dans le dos de la charnière", "Limitation des replis défensifs prolongés (>40m)"],
            individualImpact: "Préservation de son explosivité neuromusculaire",
            collectiveImpact: "Fixation des défenseurs centraux adverses"
          },
          {
            playerId: "barcola",
            playerName: "Bradley Barcola",
            position: "Ailier Gauche",
            focusArea: "Percussion & Repli couloir",
            workItems: ["Fermeture du couloir gauche sur les montées adverses", "Enchaînement sprint-dribble arrêté"],
            individualImpact: "Tolérance aux efforts répétés à haute intensité",
            collectiveImpact: "Maintien de la compacité latérale à 34 mètres"
          }
        ]
      }
    },
    {
      id: 'coach_obj_2',
      role: 'entraineur',
      title: `Préparer ma semaine d’entraînement avant le match de ${UPCOMING_MATCH.weekday.toLowerCase()}`,
      subtitle: "Calibrage des séances collectives à Clairefontaine, périodisation athlétique et décharge progressive J-2/J-1",
      category: "Planification Semaine",
      badge: "Semaine de Stage • Microcycle",
      icon: "📅",
      priorityOrder: 2,
      predictiveHighlight: "Séance J-1 écourtée à 55 min avec décharge de 25% recommandée pour garantir 100% de fraîcheur neuromusculaire le jour J.",
      confidenceScore: 98.6,
      shortSummary: `Optimisation de la périodisation athlétique et tactique pour atteindre le pic de forme le soir du match du ${UPCOMING_MATCH.weekday.toLowerCase()}.`,
      detailedAnalysis: "La modélisation du microcycle hebdomadaire prévoit une charge cumulée de 1 850 UA. La séance de J-2 valide la cohésion tactique et les coups de pied arrêtés. La séance J-1 à 55 minutes, allégée en volume de course mais vivace sur les premiers mètres, permet d'éviter l'épuisement glycogénique.",
      forecasts: [
        { label: "Charge Cible J-1", value: "320 UA (-25%)", trend: "Décharge", isPositive: true, explanation: "Allègement programmé pré-match" },
        { label: "Volume Sprints J-1", value: "6 sprints max", trend: "Contrôlé", isPositive: true, explanation: "Préservation des fibres musculaires rapides" },
        { label: "Pic de Forme Jour J", value: "96.2 / 100", trend: "Zénith", isPositive: true, explanation: "Convergence physiologique optimale lundi à 20h45" }
      ],
      recommendations: [
        { actor: "Staff Athlétique", action: "Limiter les oppositions de J-1 à 2 x 8 minutes sur terrain réduit avec règles de touches libres.", urgency: "haute", impact: "Zéro impact articulaire lourd" },
        { actor: "Zinédine Zidane", action: "Consacrer les 20 dernières minutes de J-1 aux coups de pied arrêtés offensifs sans contact.", urgency: "normale", impact: "Automatismes tactiques affûtés" },
        { actor: "Département Médical", action: "Bains froids 10°C 12 minutes dès la fin de l'échauffement dynamique J-1.", urgency: "normale", impact: "Élimination rapide des toxines" }
      ],
      keyMetrics: [
        { name: "Durée Séance J-1", value: "55 min", subtext: "Focus vitesse & CPA" },
        { name: "ACWR Cible", value: "1.05", subtext: "Ratio optimal sans pic de fatigue" },
        { name: "Bilan Énergie Groupe", value: "100%", subtext: "Prêt pour le choc de lundi" }
      ],
      actionButtonLabel: "Voir le Programme de Semaine Détaillé",
      specializedToolRoute: 'ai_strategy_week',
      specializedToolLabel: "Microcycle & Périodisation Hebdomadaire",
      sourcesQualified: ["Calendrier FFF Clairefontaine", "Capteurs GPS Vector Catapult", "Plateformes de Force CMJ Kistler"],
      dimensionArticulation: {
        individualSummary: "Chaque joueur dispose d'un profil de charge individuelle ajusté selon son temps de jeu en club le week-end précédent (ACWR individualisé de 0.95 à 1.15).",
        collectiveSummary: "La charge collective cumulée est plafonnée à 1 850 UA avec une séance J-1 en décharge de 25% garantissant l'harmonie du bloc lundi soir.",
        articulationExplanation: "L'allègement de la charge individuelle des cadres (Mbappé, Griezmann) préserve l'explosivité collective sur les phases de contre-attaque.",
        playerWorkItems: [
          {
            playerId: "mbappe",
            playerName: "Kylian Mbappé",
            position: "Attaquant",
            focusArea: "Gestion des décélérations & Appuis courts",
            workItems: ["Limiter les sprints maximaux à 6 répétitions sur la semaine", "Éviter les freinages brutaux sur terrain lourd"],
            individualImpact: "Prévention tendineuse rotulienne",
            collectiveImpact: "Garantit 100% de puissance de sprint pour lundi soir"
          },
          {
            playerId: "rabiot",
            playerName: "Adrien Rabiot",
            position: "Milieu Relayeur",
            focusArea: "Course aérobie & Compensation axiale",
            workItems: ["Maintien du volume de course à intensité modérée (Zone 3)", "Coordination des transitions avec Camavinga"],
            individualImpact: "Stabilisation du VO2max sans fatigue résiduelle",
            collectiveImpact: "Assure le quadrillage du rond central sur 90 minutes"
          }
        ]
      },
      simulationPresets: [
        {
          id: 'sim_1',
          name: "Microcycle Dégressif (Recommandé)",
          label: "Décharge J-1 à 55 min (-25%)",
          description: "Garantit le pic d'explosivité le soir du match sans fatigue résiduelle.",
          probSuccess: 97.2,
          riskScore: 2.1,
          freshnessScore: 96,
          impactScore: 95,
          isRecommended: true,
          variableLabel: "Durée J-1",
          variableValue: "55 min"
        },
        {
          id: 'sim_2',
          name: "Microcycle Intensif",
          label: "Séance J-1 maintenue à 80 min",
          description: "Répétition prolongée des schémas tactiques mais risque d'alourdissement des appuis.",
          probSuccess: 79.5,
          riskScore: 9.8,
          freshnessScore: 81,
          impactScore: 84,
          isRecommended: false,
          variableLabel: "Durée J-1",
          variableValue: "80 min"
        },
        {
          id: 'sim_3',
          name: "Décharge Maximale",
          label: "Séance J-1 allégée à 40 min",
          description: "Préservation totale, mais possible manque d'activation motrice avant le choc.",
          probSuccess: 88.0,
          riskScore: 1.5,
          freshnessScore: 99,
          impactScore: 86,
          isRecommended: false,
          variableLabel: "Durée J-1",
          variableValue: "40 min"
        }
      ]
    },
    {
      id: 'coach_obj_3',
      role: 'entraineur',
      title: "Tester différents scénarios de plans de jeu en fonction de mon effectif",
      subtitle: "Dimension Individuelle & Collective : Articuler performance individuelle et collective, mesurer l'impact d'une substitution sur la prédiction et le score de confiance collectif, identifier les éléments à travailler chez les joueurs",
      category: "Simulation Tactique",
      badge: "Scénarios & Remplacements",
      icon: "⚡",
      priorityOrder: 3,
      predictiveHighlight: "L'option 'Titulaire 65-75 min + Sub percutant' maximise le rendement (+0.45 xG) tout en maintenant un score de confiance collectif de 97.4%. Remplacer un joueur recalcule instantanément la prédiction collective et génère les éléments d'entraînement individualisés.",
      confidenceScore: 96.8,
      shortSummary: "Simulateur tactique interactif permettant d'ajuster la composition et de visualiser en temps réel l'impact collectif et les éléments de travail individuels.",
      detailedAnalysis: "Chaque composition articulée sur le terrain fait évoluer le score de confiance collectif et les espérances de buts. L'intégration d'un joueur en cours de match modifie les lignes de pressing et impose des consignes spécifiques de compensation aux joueurs adjacents.",
      forecasts: [
        { label: "Impact Scénario Recommandé", value: "94 / 100", trend: "+6 pts perf", isPositive: true, explanation: "Rendement offensif et stabilité défensive" },
        { label: "Score Confiance Collectif", value: "96.8%", trend: "Très Élevé", isPositive: true, explanation: "Repose sur la synergie des 11 profils" },
        { label: "Gain Espérance Buts (xG)", value: "+0.45 xG", trend: "Optimal", isPositive: true, explanation: "Surplus de dangerosité dans le dernier tiers" }
      ],
      recommendations: [
        { actor: "Zinédine Zidane", action: "Tester le double remplacement (Dembélé pour Barcola, Camavinga pour Rabiot) à la 65e pour redynamiser le pressing.", urgency: "haute", impact: "Rehaussement du pressing à 88 m/min en fin de match" },
        { actor: "Staff Technique", action: "Identifier les éléments spécifiques à travailler chez les entrants pour préserver la compacité du bloc.", urgency: "haute", impact: "Zéro rupture d'alignement défensif" }
      ],
      keyMetrics: [
        { name: "Scénario Recommandé", value: "Option 1 (4-3-3 Asymétrique)", subtext: "Équilibre perf / protection" },
        { name: "Score de Confiance", value: "96.8%", subtext: "Modèle validé FFF" },
        { name: "Éléments à Travailler", value: "3 axes ciblés", subtext: "Transitions, repli, pressing" }
      ],
      targetPlayerId: "mbappe",
      actionButtonLabel: "Tester les Remplacements dans le Simulateur",
      specializedToolRoute: 'ai_strategy',
      specializedToolLabel: "Simulateur Tactique & Remplacements",
      sourcesQualified: ["Moteur Tactique Opta Monte Carlo", "Data Tracking GPS Catapult", "Modèle Neuromusculaire FFF"],
      simulationPresets: [
        {
          id: 'sim_1',
          name: "Scénario 1 (Recommandé)",
          label: "4-3-3 Asymétrique avec Remplacement à la 65e",
          description: "Remplacement planifié pour maintenir 100% d'intensité sur les contres sans déséquilibrer l'axe.",
          probSuccess: 68.4,
          riskScore: 2.8,
          freshnessScore: 91,
          impactScore: 94,
          isRecommended: true,
          variableLabel: "Changement",
          variableValue: "65e min"
        },
        {
          id: 'sim_2',
          name: "Scénario 2",
          label: "4-2-3-1 Offensif Pressing Haut",
          description: "Volume de pressing accru de 15%, score de confiance à 93.8%, fatigue accélérée des latéraux.",
          probSuccess: 62.5,
          riskScore: 7.2,
          freshnessScore: 79,
          impactScore: 89,
          isRecommended: false,
          variableLabel: "Changement",
          variableValue: "75e min"
        },
        {
          id: 'sim_3',
          name: "Scénario 3",
          label: "3-4-2-1 Sécurité Axe & Contres",
          description: "Renforcement de la ligne défensive, espérance de buts réduite de 0.20 xG mais risque sous 2%.",
          probSuccess: 59.2,
          riskScore: 1.6,
          freshnessScore: 95,
          impactScore: 82,
          isRecommended: false,
          variableLabel: "Changement",
          variableValue: "Mi-temps"
        }
      ],
      dimensionArticulation: {
        individualSummary: "L'impact d'une substitution individuelle modifie immédiatement l'indice d'intensité collective.",
        collectiveSummary: "Le score de confiance collectif est recalculé en fonction de la complémentarité des profils sur le terrain.",
        articulationExplanation: "Un remplacement n'est pas seulement athlétique : il requiert d'adapter les repères de pressing du partenaire le plus proche pour compenser le différentiel de vitesse.",
        playerWorkItems: [
          {
            playerId: "dembele",
            playerName: "Ousmane Dembélé",
            position: "Ailier Droit",
            focusArea: "Accélération & Repli latéral",
            workItems: ["Travail des transitions défensives à haute vitesse", "Fermeture du demi-espace intérieur sur perte de balle"],
            individualImpact: "Plafonnement des accélérations pour préserver les ischios",
            collectiveImpact: "Sécurise le couloir droit et rehausse le score de confiance à 97.4%"
          },
          {
            playerId: "camavinga",
            playerName: "Eduardo Camavinga",
            position: "Milieu Relayeur",
            focusArea: "Orientation & Récupération haute",
            workItems: ["Cadrage du porteur sans commettre de faute", "Sortie de balle rapide en une touche vers l'avant"],
            individualImpact: "Optimisation de l'explosivité sur les 5 premiers mètres",
            collectiveImpact: "Permet au bloc de remonter de 8 mètres immédiatement"
          }
        ]
      }
    },
    {
      id: 'coach_obj_4',
      role: 'entraineur',
      title: "Construire un plan sur mesure pour le joueur Kylian Mbappé, blessé au genou",
      subtitle: "Programme personnalisé de retour progressif (RTP), suivi de l'évolution du genou et adaptation continue de la charge selon ses sensations",
      category: "Plan Sur Mesure Joueur",
      badge: "Plan Sur Mesure • Kylian Mbappé",
      icon: "🩺",
      priorityOrder: 4,
      predictiveHighlight: "Genou droit cicatrisé à 100%. Tolérance de charge validée en Phase 2 (RTP 85/100). Adaptation du plan d'entraînement permettant une titularisation sécurisée de 75 minutes pour le match de lundi.",
      confidenceScore: 98.5,
      shortSummary: "Protocole individualisé combinant suivi médical, données biomécaniques et adaptation quotidienne de la charge selon son état de forme.",
      detailedAnalysis: "Les bilans d'imagerie IRM et échographiques attestent d'une intégrité complète du tendon rotulien sans épanchement. Le test isocinétique révèle un ratio quadriceps/ischios de 0.62 conforme aux exigences internationales. Le plan d'entraînement adapté limite les décélérations brutales à l'entraînement tout en autorisant les sprints en ligne droite.",
      forecasts: [
        { label: "État Cicatrisation Genou", value: "100% (Guéri)", trend: "Optimal", isPositive: true, explanation: "Absence totale d'œdème ou de liquide articulaire" },
        { label: "Tolérance Temps de Jeu", value: "75 min max", trend: "Recommandé", isPositive: true, explanation: "Plafond préventif pour le match de lundi" },
        { label: "Risque de Récidive", value: "1.4%", trend: "Très Faible", isPositive: true, explanation: "Zone verte sécurisée par le Dr. Le Gall" }
      ],
      recommendations: [
        { actor: "Dr. Franck Le Gall", action: "Maintenir la thermothérapie pré-séance 15 min et l'application de glace compressée post-effort.", urgency: "normale", impact: "Zéro inflammation résiduelle" },
        { actor: "Zinédine Zidane", action: "Intégrer Mbappé normalement aux séances tactiques mais le dispenser des oppositions à contacts appuyés.", urgency: "haute", impact: "Préservation des appuis pour lundi" },
        { actor: "Préparateur Physique", action: "Séance de renforcement excentrique des ischio-jambiers et du vaste interne à J-2.", urgency: "normale", impact: "Stabilisation dynamique du genou" }
      ],
      keyMetrics: [
        { name: "Indice RTP Genou", value: "85 / 100", subtext: "Phase 2 validée avec succès" },
        { name: "Niveau de Douleur Ressenti", value: "0 / 10", subtext: "Totalement indolore aux appuis" },
        { name: "Vitesse Max Validée", value: "35.8 km/h", trend: "Zénith", subtext: "Pleine capacité de pointe" }
      ],
      targetPlayerId: "mbappe",
      actionButtonLabel: "Ouvrir le Protocole Sur Mesure Mbappé",
      specializedToolRoute: 'ai_strategy_player_plan',
      specializedToolLabel: "Protocole Individualisé Genou Mbappé",
      sourcesQualified: ["IRM Clinique du Sport", "Bilan Isocinétique Biodex", "GPS Vector 10Hz", "Notes Dr. Franck Le Gall"],
      simulationPresets: [
        {
          id: 'sim_1',
          name: "Plan Adapté (Recommandé)",
          label: "Titularisation 75 min + Décharge J-1",
          description: "Permet d'exploiter son leadership tout en prévenant tout surmenage articulaire.",
          probSuccess: 98.5,
          riskScore: 1.4,
          freshnessScore: 94,
          impactScore: 96,
          isRecommended: true,
          variableLabel: "Temps de jeu",
          variableValue: "75 min"
        },
        {
          id: 'sim_2',
          name: "Plan Prudence",
          label: "Entrée en jeu 30 minutes (Sub)",
          description: "Zéro prise de risque sur le genou, mais prive l'attaque de son meilleur atout d'entrée.",
          probSuccess: 99.2,
          riskScore: 0.6,
          freshnessScore: 98,
          impactScore: 82,
          isRecommended: false,
          variableLabel: "Temps de jeu",
          variableValue: "30 min"
        },
        {
          id: 'sim_3',
          name: "Plan Intégral",
          label: "Temps plein 90 minutes",
          description: "Présence totale, mais élévation du risque de fatigue articulaire en fin de rencontre.",
          probSuccess: 91.0,
          riskScore: 6.2,
          freshnessScore: 79,
          impactScore: 92,
          isRecommended: false,
          variableLabel: "Temps de jeu",
          variableValue: "90 min"
        }
      ],
      dimensionArticulation: {
        individualSummary: "L'état clinique du genou de Kylian (RTP 85/100, 0 douleur) autorise 75 minutes de jeu à intensité maximale sans risque de récidive.",
        collectiveSummary: "La présence de Mbappé sur le terrain rehausse la menace offensive collective de +0.52 xG et fixe les deux centraux espagnols.",
        articulationExplanation: "Adapter le temps de Mbappé à 75 minutes impose à ses partenaires offensifs (Barcola, Dembélé) d'assurer le relais d'intensité et le pressing en fin de match.",
        playerWorkItems: [
          {
            playerId: "mbappe",
            playerName: "Kylian Mbappé",
            position: "Attaquant",
            focusArea: "Appuis & Protection Articulaire",
            workItems: ["Échauffement neuromusculaire individualisé (élastiques & proprioception)", "Course progressive sans choc rotulien"],
            individualImpact: "Sécurisation totale du genou droit en compétition",
            collectiveImpact: "Conserve la vitesse de rupture pour l'ensemble de l'équipe"
          },
          {
            playerId: "barcola",
            playerName: "Bradley Barcola",
            position: "Ailier Gauche",
            focusArea: "Combinaisons & Compensation axiale",
            workItems: ["Prise d'espace dans le dos du latéral espagnol", "Repiquage intérieur pour libérer le couloir à Mbappé"],
            individualImpact: "Multiplication des courses à haute intensité",
            collectiveImpact: "Création d'espaces libérant Mbappé du double marquage"
          }
        ]
      }
    }
  ],
  arbitrage: [
    {
      id: 'dta_obj_1',
      role: 'arbitrage',
      title: "Préparer mon prochain match",
      subtitle: "Analyse tactique pré-match, détection des tensions et antécédents entre joueurs, caractéristiques comportementales et points de vigilance tracking",
      category: "Préparation Match Arbitre",
      badge: "DTA • Préparation Choc",
      icon: "🛡️",
      priorityOrder: 1,
      predictiveHighlight: "3 zones chaudes de duels identifiées sur les couloirs. Identification de 4 joueurs à antécédents disciplinaires nécessitant une gestion préventive dès les 15 premières minutes.",
      confidenceScore: 99.0,
      shortSummary: "Rapport d'aide à la décision pour le corps arbitral FFF/FIFA : cartographie des duels à risque, analyse du pressing et préparation VAR.",
      detailedAnalysis: "L'historique des confrontations récentes entre les joueurs des deux équipes met en exergue des frictions récurrentes lors des transitions rapides. Le positionnement de l'arbitre doit privilégier les diagonales d'accélération dans les 30 derniers mètres pour garder un angle de vue optimal sur les contestations de surface.",
      forecasts: [
        { label: "Points de Vigilance Chauds", value: "3 zones", trend: "Identifiées", isPositive: true, explanation: "Couloirs et zone axiale 20-30m" },
        { label: "Joueurs à Antécédents", value: "4 profils", trend: "Sous surveillance", isPositive: true, explanation: "Gestion verbale préventive préconisée" },
        { label: "Disponibilité Physique Arbitre", value: "100%", trend: "Test FIFA Validé", isPositive: true, explanation: "Palier 20.8 SDS atteint sans restriction" }
      ],
      recommendations: [
        { actor: "Antony Gautier", action: "Cadrer verbalement les deux capitaines lors du protocole d'avant-match sur les contestations de décisions.", urgency: "haute", impact: "Réduction prévisible des attroupements de 40%" },
        { actor: "Arbitre Central", action: "Adapter la diagonale de course pour anticiper les transitions courtes à plus de 25 km/h.", urgency: "haute", impact: "Proximité décisionnelle sous 12 mètres" },
        { actor: "Équipe VAR", action: "Vérification systématique des contacts de semelle dans les phases de pressing de contre.", urgency: "normale", impact: "Fiabilité des interventions de surface" }
      ],
      keyMetrics: [
        { name: "Chocs et Duels Modélisés", value: "100%", subtext: "Analyses tactiques prêtes" },
        { name: "Taux Confirmation VAR", value: "98.4%", subtext: "Standard élite mondial" },
        { name: "Test Physique SDS", value: "Palier 20.8", subtext: "Aptitude athlétique confirmée" }
      ],
      actionButtonLabel: "Ouvrir la Préparation Complète Arbitre",
      specializedToolRoute: 'ai_strategy_referee_prep',
      specializedToolLabel: "Module Préparation Tactique Arbitres",
      sourcesQualified: ["Statistiques DTA FFF / LFP", "Rapports Vidéo UEFA FAME", "Tracking GPS Arbitre Catapult"],
      simulationPresets: [
        {
          id: 'sim_1',
          name: "Option 1 (Recommandée)",
          label: "Arbitrage Pédagogique Préventif",
          description: "Cadrage verbal précoce des capitaines et proximité de course < 12m pour désamorcer les contestations.",
          probSuccess: 98.4,
          riskScore: 1.2,
          freshnessScore: 95,
          impactScore: 97,
          isRecommended: true,
          variableLabel: "Distance aux duels",
          variableValue: "11.5 m"
        },
        {
          id: 'sim_2',
          name: "Option 2",
          label: "Tolérance Zéro Immédiate",
          description: "Cartons d'avertissement dès la première faute d'antijeu, risque d'alourdissement du climat.",
          probSuccess: 91.0,
          riskScore: 6.5,
          freshnessScore: 89,
          impactScore: 88,
          isRecommended: false,
          variableLabel: "Distance aux duels",
          variableValue: "14.0 m"
        },
        {
          id: 'sim_3',
          name: "Option 3",
          label: "Fluidité & Avantage Maximaux",
          description: "Laisse jouer sur les contacts légers, favorise le temps de jeu effectif (> 60 min).",
          probSuccess: 94.2,
          riskScore: 3.8,
          freshnessScore: 92,
          impactScore: 93,
          isRecommended: false,
          variableLabel: "Distance aux duels",
          variableValue: "12.5 m"
        }
      ],
      dimensionArticulation: {
        individualSummary: "Profilage individuel des 22 acteurs : identification des joueurs ayant des antécédents disciplinaires directs et des caractéristiques comportementales sous pression.",
        collectiveSummary: "Indice de tension collective modélisé à 3.8/10 en début de rencontre, pouvant atteindre 7.4/10 en cas de contestation non maîtrisée.",
        articulationExplanation: "Cadrer individuellement les 4 joueurs identifiés dès les 15 premières minutes stabilise la sérénité collective et préserve la fluidité de la rencontre.",
        playerWorkItems: [
          {
            playerId: "ref_lead",
            playerName: "Antony Gautier & Corps Arbitral",
            position: "Arbitre Central",
            focusArea: "Gestion Préventive & Diagonales de Vitesse",
            workItems: ["Entretien avec les capitaines à H-45 min sur les contestations de surface", "Accélération préventive sur les transitions espagnoles à >25 km/h"],
            individualImpact: "Positionnement optimal sous 12 mètres pour chaque décision litigieuse",
            collectiveImpact: "Réduction de 40% des attroupements et respect absolu de l'autorité"
          },
          {
            playerId: "ref_var",
            playerName: "Équipe Vidéo VAR Hawk-Eye",
            position: "Assistance Vidéo",
            focusArea: "Vérification Ciblée Semelles & Couloirs",
            workItems: ["Contrôle systématique des contacts de semelle sur contre-attaques", "Validation des hors-jeux millimétrés en moins de 40 secondes"],
            individualImpact: "Décisions 100% corroborées par l'image",
            collectiveImpact: "Garantit la justice sportive sans casser le rythme du match"
          }
        ]
      }
    },
    {
      id: 'dta_obj_2',
      role: 'arbitrage',
      title: "Analyser mon dernier match",
      subtitle: "Debriefing post-match, audit de la qualité décisionnelle, interventions VAR et axes de progression athlétique",
      category: "Debriefing Post-Match",
      badge: "DTA • Debriefing & Performance",
      icon: "📹",
      priorityOrder: 2,
      predictiveHighlight: "Note globale observateur de 8.8/10. 98.4% de décisions justes confirmées. Axe de progression identifié : anticipation des courses de repli sur contre-attaques à haute intensité.",
      confidenceScore: 98.8,
      shortSummary: "Bilan analytique complet de la prestation arbitrale : décisions majeures, gestion du temps additionnel et évaluation physique.",
      detailedAnalysis: "Sur les 89 minutes effectives analysées, 41 fautes sifflées ont été corroborées par le tracking vidéo. Deux interventions du camion VAR ont été gérées en moins de 45 secondes, respectant le protocole d'interférence minimale de l'IFAB.",
      forecasts: [
        { label: "Note Observateur FFF", value: "8.8 / 10", trend: "+0.4 pt", isPositive: true, explanation: "Prestation de niveau Ligue des Champions" },
        { label: "Décisions VAR Confirmées", value: "98.4%", trend: "Excellence", isPositive: true, explanation: "Zéro erreur manifeste commise" },
        { label: "Distance Parcourue", value: "11.4 km", trend: "Optimal", isPositive: true, explanation: "Volume athlétique supérieur à la moyenne" }
      ],
      recommendations: [
        { actor: "Antony Gautier", action: "Consolider la gestion du carton jaune précoce sur les fautes tactiques d'antijeu.", urgency: "normale", impact: "Clarté du seuil de tolérance" },
        { actor: "Préparateur Physique DTA", action: "Séance spécifique de fractionné court 15-15 pour travailler les accélérations de démarrage.", urgency: "normale", impact: "Gain de réactivité sur contre-attaques" }
      ],
      keyMetrics: [
        { name: "Décisions Majeures Justes", value: "100%", subtext: "Penalties et cartons rouges validés" },
        { name: "Délai Moyen Check VAR", value: "42 sec", subtext: "Fluidité du jeu préservée" },
        { name: "Fautes Sifflées Corroborées", value: "41 / 42", subtext: "Cohérence du barème" }
      ],
      actionButtonLabel: "Consulter le Debriefing Vidéo & Stats",
      specializedToolRoute: 'ai_strategy_referee_debrief',
      specializedToolLabel: "Debriefing Décisionnel DTA",
      sourcesQualified: ["Rapports Officiels Observateurs FFF", "Fiches Chrono VAR Hawk-Eye", "Télémétrie GPS Arbitre"],
      dimensionArticulation: {
        individualSummary: "Audit individuel des 42 interventions de coup de sifflet : 41 confirmées conformes à la grille UEFA FAME.",
        collectiveSummary: "Temps effectif de jeu atteint à 58 min 12 s, garantissant l'équité sportive collective.",
        articulationExplanation: "La justesse technique individuelle sur les fautes d'antijeu a maintenu le calme collectif sur les deux bancs de touche.",
        playerWorkItems: [
          {
            playerId: "ref_ath",
            playerName: "Préparation Physique Arbitrale",
            position: "Aptitude Physique",
            focusArea: "Fractionné Court & Vitesse de Réaction",
            workItems: ["Bloc 15s-15s à VMA 18 km/h pour maintenir l'explosivité en fin de rencontre", "Exercices de pivot proprioceptif pour accélérer le demi-tour"],
            individualImpact: "Gain de 0.3s sur les changements de direction",
            collectiveImpact: "Vision dégagée sur les départs de contres sans masquer le ballon"
          }
        ]
      }
    }
  ],
  medical: [
    {
      id: 'med_obj_1',
      role: 'medical',
      title: "Préparer la prochaine rencontre",
      subtitle: `Diagnostic médical complet des 24 Bleus, cartographie prédictive des risques de blessure et recommandations cliniques pour ${UPCOMING_MATCH.weekday.toLowerCase()}`,
      category: "Diagnostic Médical Match",
      badge: `Diagnostic Santé • ${UPCOMING_MATCH.weekday}`,
      icon: "🩺",
      priorityOrder: 1,
      predictiveHighlight: "Taux de disponibilité globale à 94.2%. 22 joueurs avec feu vert médical total sans restriction, 2 en protocole d'adaptation. Risque moyen de lésion groupe maintenu sous 3.2%.",
      confidenceScore: 99.2,
      shortSummary: "Synthèse clinique du Dr. Franck Le Gall : levée des autorisations de match, check-up échographique et validation des aptitudes physiques.",
      detailedAnalysis: "Les bilans cliniques et les contrôles échographiques réalisés au Centre Médical de Clairefontaine confirment l'absence de lésion aiguë évolutive. Le diagnostic global permet de délivrer l'aptitude de match pour l'ensemble des cadres, avec une recommandation de plafonnement à 35 minutes pour Dembélé.",
      forecasts: [
        { label: "Disponibilité Médicale", value: "94.2%", trend: "Élevé", isPositive: true, explanation: "22/24 joueurs aptes sans restriction" },
        { label: "Risque Lésionnel Groupe", value: "3.2%", trend: "-1.8%", isPositive: true, explanation: "Zone verte sécurisée FFF" },
        { label: "Dossiers Médicaux Traités", value: "24 / 24", trend: "Complet", isPositive: true, explanation: "Validés par le Dr. Franck Le Gall" }
      ],
      recommendations: [
        { actor: "Dr. Franck Le Gall", action: "Délivrer l'autorisation médicale officielle de match pour Kylian Mbappé (quadriceps et genou cicatrisés).", urgency: "haute", impact: "Feu vert médical officiel pour lundi" },
        { actor: "Staff Kiné", action: "Drainage lymphatique et soins décontracturants ciblés sur les adducteurs d'Ousmane Dembélé.", urgency: "haute", impact: "Prévention du risque myotendineux" },
        { actor: "Zinédine Zidane", action: "Plafonner le temps de jeu d'Ousmane Dembélé à 35 minutes maximum le jour du match.", urgency: "haute", impact: "Réduction du risque de rechute de 62%" }
      ],
      keyMetrics: [
        { name: "Joueurs 100% Aptes", value: "22 / 24", subtext: "2 en gestion adaptée" },
        { name: "Alertes Médicales Critiques", value: "0", subtext: "Aucun forfait majeur" },
        { name: "Indice ACWR Moyen", value: "1.06", subtext: "Zone idéale sans surmenage" }
      ],
      targetPlayerId: "mbappe",
      actionButtonLabel: "Ouvrir le Diagnostic Médical Complet",
      specializedToolRoute: 'ai_strategy_medical_match',
      specializedToolLabel: "Autorisations Médicales & Match",
      sourcesQualified: ["Dossier Médical Fédéral", "Examens IRM Clinique du Sport", "Analyses Biologiques Labo FFF", "Données GPS Vector"],
      dimensionArticulation: {
        individualSummary: "Statuts cliniques individuels validés : Kylian Mbappé à 100% (RTP phase 2, 75 min max préconisées), Ousmane Dembélé sous protocole de décharge (35 min max pour préserver les ischios), 22 autres joueurs aptes sans restriction.",
        collectiveSummary: "Taux de disponibilité médicale de l'effectif à 94.2% (22/24 sans réserve) et risque lésionnel collectif moyen estimé à seulement 3.2%.",
        articulationExplanation: "Le respect des restrictions individuelles de temps de jeu prévient l'effondrement athlétique du groupe en deuxième période et réduit le risque de blessures secondaires de 62%.",
        playerWorkItems: [
          {
            playerId: "mbappe",
            playerName: "Kylian Mbappé",
            position: "Attaquant",
            focusArea: "Thermorégulation & Proprioception Genou",
            workItems: ["Application thermothérapie 15 min avant la mise en route", "Strapping dynamique rotulien et cryothérapie compressive H+1"],
            individualImpact: "Zéro douleur et tolérance aux sprints maximaux",
            collectiveImpact: "Garantit le point d'ancrage offensif titulaire"
          },
          {
            playerId: "dembele",
            playerName: "Ousmane Dembélé",
            position: "Ailier Droit",
            focusArea: "Protection Myotendineuse Ischios",
            workItems: ["Balnéothérapie post-entraînement 12 min à 34°C", "Drainage manuel des ischios et limitation du temps de jeu à 35 min"],
            individualImpact: "Élimination des contractures résiduelles",
            collectiveImpact: "Fournit un impact explosif en sortie de banc sans risque de rechute"
          }
        ]
      },
      simulationPresets: [
        {
          id: 'sim_1',
          name: "Protocole Standard FFF (Recommandé)",
          label: "Feu vert 22 + Plafonnement Dembélé (35 min)",
          description: "Équilibre parfait entre compétitivité sportive et sécurité médicale absolue.",
          probSuccess: 99.2,
          riskScore: 0.8,
          freshnessScore: 94,
          impactScore: 96,
          isRecommended: true,
          variableLabel: "Restriction",
          variableValue: "35 min max"
        },
        {
          id: 'sim_2',
          name: "Protocole Tolérance Totale",
          label: "Feu vert sans restriction pour les 24",
          description: "Prend le risque d'un dépassement de seuil neuromusculaire pour Dembélé.",
          probSuccess: 86.4,
          riskScore: 8.5,
          freshnessScore: 88,
          impactScore: 91,
          isRecommended: false,
          variableLabel: "Restriction",
          variableValue: "Aucune"
        },
        {
          id: 'sim_3',
          name: "Protocole Hypermédicalisé",
          label: "Mise au repos préventive de 3 cadres",
          description: "Zéro risque physique mais impact négatif sur le rendement collectif.",
          probSuccess: 91.2,
          riskScore: 0.2,
          freshnessScore: 98,
          impactScore: 78,
          isRecommended: false,
          variableLabel: "Restriction",
          variableValue: "Repos 3 cadres"
        }
      ]
    },
    {
      id: 'med_obj_2',
      role: 'medical',
      title: "Préparer mon agenda sur les deux prochains mois",
      subtitle: "Planification prédictive de la charge médicale sur 60 jours, anticipation des soins kiné, bilans réguliers et réserve d'urgences",
      category: "Agenda Médical Prédictif",
      badge: "Agenda Médical • 60 Jours",
      icon: "📅",
      priorityOrder: 2,
      predictiveHighlight: "Pic de charge prévisible en Semaine 4 (24 séances/jour anticipées). Modélisation recommandant d'allouer une réserve de 25% du temps médical aux urgences et bilans post-match.",
      confidenceScore: 97.8,
      shortSummary: "Outil de gestion du temps et des ressources du département médical de Clairefontaine pour le cycle de préparation Coupe du Monde.",
      detailedAnalysis: "Le croisement du calendrier des matchs en club et des rassemblements des Bleus permet d'anticiper les semaines à forte affluence au centre médical. La mise en place de créneaux de cryothérapie et de balnéothérapie automatisés permet de libérer du temps médecin pour les consultations individualisées.",
      forecasts: [
        { label: "Volume Soins Anticipé", value: "148 séances", trend: "+14%", isPositive: true, explanation: "Réparties sur les 2 prochains mois" },
        { label: "Réserve Temps Urgences", value: "25%", trend: "Sécurisé", isPositive: true, explanation: "Temps sanctuarisé pour bilans imprévus" },
        { label: "Pic de Charge Prévu", value: "Semaine 4", trend: "24 soins/j", isPositive: true, explanation: "Période de densification du calendrier" }
      ],
      recommendations: [
        { actor: "Dr. Franck Le Gall", action: "Sanctuariser les matinées post-match de 9h à 12h pour les bilans échographiques et examens d'urgence.", urgency: "haute", impact: "Diagnostic immédiat à H+12" },
        { actor: "Pôle Kinésithérapie", action: "Calibrer les plannings de massage décontracturant sur 3 rotations quotidiennes.", urgency: "normale", impact: "Fluidité des soins sans attente" }
      ],
      keyMetrics: [
        { name: "Créneaux Soins Planifiés", value: "148", subtext: "Sur 60 jours" },
        { name: "Réserve d'Urgence", value: "25% temps", subtext: "Conformité protocole FFF" },
        { name: "Séances Cryo Prévues", value: "48 sessions", subtext: "Chambre -110°C" }
      ],
      actionButtonLabel: "Consulter l'Agenda Médical Prédictif",
      specializedToolRoute: 'ai_strategy_medical_agenda',
      specializedToolLabel: "Planning Médical & Anticipation des Soins",
      sourcesQualified: ["Calendrier Compétitions UEFA/FIFA", "Registre Médical FFF", "Base Historique Soins Clairefontaine"],
      simulationPresets: [
        {
          id: 'sim_1',
          name: "Option 1 (Recommandée)",
          label: "Sanctuarisation 25% Réserve Urgences",
          description: "Alloue 148 séances planifiées et conserve un quart du temps médecin pour les diagnostics immédiats post-choc.",
          probSuccess: 97.8,
          riskScore: 1.5,
          freshnessScore: 96,
          impactScore: 94,
          isRecommended: true,
          variableLabel: "Réserve urgence",
          variableValue: "25% temps"
        },
        {
          id: 'sim_2',
          name: "Option 2",
          label: "Flux Tendu 100% Planifié",
          description: "Remplit l'intégralité des créneaux en soins de confort, risque d'engorgement lors des blessures aiguës.",
          probSuccess: 84.5,
          riskScore: 8.9,
          freshnessScore: 87,
          impactScore: 89,
          isRecommended: false,
          variableLabel: "Réserve urgence",
          variableValue: "5% temps"
        },
        {
          id: 'sim_3',
          name: "Option 3",
          label: "Haute Disponibilité (35% Urgences)",
          description: "Privilégie la réactivité maximale pour les 24 Bleus, reporte les bilans de routine non prioritaires.",
          probSuccess: 93.0,
          riskScore: 0.9,
          freshnessScore: 98,
          impactScore: 85,
          isRecommended: false,
          variableLabel: "Réserve urgence",
          variableValue: "35% temps"
        }
      ],
      dimensionArticulation: {
        individualSummary: "Projection individualisée des besoins de soins pour chacun des 24 joueurs en fonction de son historique lésionnel et de ses temps de jeu cumulés en club.",
        collectiveSummary: "Pic de charge collectif prévu en Semaine 4 au Centre Médical de Clairefontaine avec 24 séances/jour prévues.",
        articulationExplanation: "L'anticipation de la charge individuelle des cadres permet de sanctuariser le temps d'intervention d'urgence du Dr. Le Gall sans retarder les soins de récupération.",
        playerWorkItems: [
          {
            playerId: "med_lead",
            playerName: "Dr. Franck Le Gall",
            position: "Médecin Chef FFF",
            focusArea: "Sanctuarisation Urgences & Imagerie",
            workItems: ["Plages 9h-12h sanctuarisées pour bilans échographiques H+12 post-match", "Audit hebdomadaire de la tolérance articulaire du groupe"],
            individualImpact: "Prise en charge diagnostique ultra-rapide sous 4 heures",
            collectiveImpact: "Élimination des forfaits imprévus de dernière minute"
          },
          {
            playerId: "med_kine",
            playerName: "Pôle Kinésithérapie & Récupération",
            position: "Staff Soins FFF",
            focusArea: "Rotation des Massages & Cryothérapie",
            workItems: ["Mise en place de 3 rotations de soins décontracturants", "Protocole automatisé de cabine cryothérapie à -110°C"],
            individualImpact: "Drainage accéléré des toxines et courbatures",
            collectiveImpact: "Maintien de la fraîcheur physique de l'ensemble du groupe"
          }
        ]
      }
    },
    {
      id: 'med_obj_3',
      role: 'medical',
      title: "Construire un plan sur mesure pour la blessure au genou de Kylian Mbappé",
      subtitle: "Protocole clinique individualisé Dr. Franck Le Gall : thérapie manuelle, cryothérapie, surveillance de la cicatrisation et adaptation continue",
      category: "Soins Sur Mesure Genou",
      badge: "Soins Sur Mesure • Kylian Mbappé",
      icon: "🩹",
      priorityOrder: 3,
      predictiveHighlight: "Cicatrisation complète du tendon rotulien confirmée à l'échographie haute résolution. Indice de douleur à 0/10. Adaptation du programme de soins validée pour maintenir 100% de fraîcheur pour lundi.",
      confidenceScore: 99.0,
      shortSummary: "Suivi médical longitudinal du genou de Kylian Mbappé avec coordination quotidienne entre le staff médical FFF et le Real Madrid.",
      detailedAnalysis: "L'échographie de contrôle réalisée mardi matin démontre une réorganisation fibrillaire parfaite sans néovascularisation pathologique. Le protocole de drainage et de renforcement excentrique a permis de récupérer 100% de l'amplitude articulaire sans compensation musculaire.",
      forecasts: [
        { label: "Cicatrisation Myotendineuse", value: "100%", trend: "Guéri", isPositive: true, explanation: "Imagerie validée sans épanchement" },
        { label: "Score Mobilité Articulaire", value: "98 / 100", trend: "Optimal", isPositive: true, explanation: "Flexion et extension complètes indolores" },
        { label: "Ratio Isocinétique", value: "0.62", trend: "Conforme", isPositive: true, explanation: "Équilibre ischio/quadriceps parfait" }
      ],
      recommendations: [
        { actor: "Dr. Franck Le Gall", action: "Autoriser l'entraînement collectif complet avec application d'un strapping proprioceptif léger.", urgency: "normale", impact: "Sécurisation psychologique et articulaire" },
        { actor: "Pôle Kinésithérapie", action: "Poursuivre la thérapie manuelle quotidienne 45 min axée sur la décompression fémoro-tibiale.", urgency: "haute", impact: "Maintien de la souplesse capsulaire" }
      ],
      keyMetrics: [
        { name: "Phase RTP Actuelle", value: "Phase 2 / 3", subtext: "Feu vert compétition validé" },
        { name: "Douleur au Palper", value: "0 / 10", subtext: "Indolore au test de Zohlen" },
        { name: "Validation Médicale", value: "100%", subtext: "Signée Dr. Le Gall" }
      ],
      targetPlayerId: "mbappe",
      actionButtonLabel: "Voir la Fiche Médicale Détaillée Mbappé",
      specializedToolRoute: 'ai_strategy_medical_mbappe',
      specializedToolLabel: "Protocole Clinique Genou Mbappé",
      sourcesQualified: ["Échographie HD Centre Médical FFF", "Dynamomètre Biodex Isocinétique", "Données Télémétriques Real Madrid"],
      simulationPresets: [
        {
          id: 'sim_1',
          name: "Protocole Clinique 75 min (Recommandé)",
          label: "Décompression Fémoro-Tibiale + Strapping Proprioceptif",
          description: "Maintient l'intégrité tendineuse et limite le stress de friction rotulien à l'effort.",
          probSuccess: 99.0,
          riskScore: 0.9,
          freshnessScore: 96,
          impactScore: 97,
          isRecommended: true,
          variableLabel: "Temps prescrit",
          variableValue: "75 min"
        },
        {
          id: 'sim_2',
          name: "Protocole Conservateur 45 min",
          label: "Restriction stricte à une mi-temps",
          description: "Protection articulaire maximale, mais impact physique insuffisant pour le choc international.",
          probSuccess: 99.6,
          riskScore: 0.3,
          freshnessScore: 99,
          impactScore: 81,
          isRecommended: false,
          variableLabel: "Temps prescrit",
          variableValue: "45 min"
        },
        {
          id: 'sim_3',
          name: "Protocole Intensif 90 min",
          label: "Libération totale sans restriction",
          description: "Laisse le joueur disputer la totalité du match, légère augmentation du risque de réaction inflammatoire J+1.",
          probSuccess: 92.4,
          riskScore: 5.8,
          freshnessScore: 82,
          impactScore: 93,
          isRecommended: false,
          variableLabel: "Temps prescrit",
          variableValue: "90 min"
        }
      ],
      dimensionArticulation: {
        individualSummary: "Tolérance biomécanique validée : tendon rotulien cicatrisé à 100%, rapport isocinétique Biodex normalisé à 0.62, zéro œdème intra-articulaire.",
        collectiveSummary: "La disponibilité médicale de Mbappé offre à l'attaque des Bleus sa vitesse de pointe maximale (35.8 km/h).",
        articulationExplanation: "Sécuriser le genou de Mbappé par un programme de soins sur-mesure stabilise la confiance médicale du staff et permet à l'équipe de dérouler ses circuits préférentiels.",
        playerWorkItems: [
          {
            playerId: "mbappe",
            playerName: "Kylian Mbappé",
            position: "Attaquant",
            focusArea: "Décompression & Renforcement Excentrique",
            workItems: ["Thérapie manuelle quotidienne 45 min axée sur la décompression fémoro-tibiale", "Renforcement excentrique doux sur presse isocinétique Biodex"],
            individualImpact: "Élasticité tendineuse maximale et absence totale de douleur",
            collectiveImpact: "Conserve la capacité d'accélération axiale décisive pour l'équipe"
          }
        ]
      }
    }
  ],
  performance: [
    {
      id: 'perf_obj_1',
      role: 'performance',
      title: "Monitoring GPS Catapult Vector 10Hz & ratios ACWR",
      subtitle: "Surveillance des charges d'entraînement aiguës vs chroniques pour éviter les pics dangereux",
      category: "GPS & Charge",
      badge: "Catapult 10Hz",
      icon: "⚡",
      priorityOrder: 1,
      predictiveHighlight: "Ratio ACWR moyen du groupe à 1.05. Aucun joueur en zone de surmenage (>1.35).",
      confidenceScore: 98.9,
      shortSummary: "Analyse en temps réel de la distance totale, distance à haute intensité (>21 km/h) et charge métabolique.",
      detailedAnalysis: "Les 24 gilets GPS Vector 10Hz ont transmis l'intégralité de la télémétrie de la séance de mercredi. Le volume moyen de 6.8 km respecte la fenêtre de charge optimale avec un ratio aigu:chronique moyen de 1.05.",
      forecasts: [
        { label: "Ratio ACWR Médian", value: "1.05", trend: "Zone Idéale", isPositive: true },
        { label: "Distance Moyenne / Séance", value: "6.8 km", trend: "Calibré", isPositive: true },
        { label: "Pics Accélérations", value: "> 3.5 m/s²", trend: "24 validés", isPositive: true }
      ],
      recommendations: [
        { actor: "Alexandre Germain", action: "Alerter le staff technique en direct dès qu'un joueur franchit 95% de sa charge cible.", urgency: "haute", impact: "Zéro pic de fatigue imprévu" }
      ],
      keyMetrics: [
        { name: "Capteurs Actifs", value: "24 / 24", subtext: "Vector 10Hz calibrés" },
        { name: "Charge Moyenne Hebdo", value: "2 450 UA", subtext: "Conforme au microcycle" },
        { name: "Alertes Surcharge", value: "0", subtext: "Toutes métriques au vert" }
      ],
      targetPlayerId: "mbappe",
      actionButtonLabel: "Ouvrir le Hub GPS & Charge",
      sourcesQualified: ["Catapult Vector 10Hz", "Système LPS Terrains Clairefontaine", "Base de Données Athlétique FFF"]
    },
    {
      id: 'perf_obj_2',
      role: 'performance',
      title: "Profilage des vitesses de pointe (>32 km/h) & sprints répétés",
      subtitle: "Évaluation de la puissance anaérobie alactique et des capacités de transition",
      category: "Vitesse & Puissance",
      badge: "Sprint Analytics",
      icon: "🚀",
      priorityOrder: 2,
      predictiveHighlight: "Pic de vitesse max enregistré à 35.8 km/h pour Kylian Mbappé. Capacité de répétition au top.",
      confidenceScore: 98.2,
      shortSummary: "Mesure de la puissance d'accélération sur les 10 et 40 mètres avec cellules photoélectriques.",
      detailedAnalysis: "7 Bleus franchissent régulièrement le seuil de 34 km/h en match. Kylian Mbappé maintient son profil mondial d'accélération à 4.8 m/s² avec une capacité de décélération parfaitement stable.",
      forecasts: [
        { label: "Pic Vitesse Groupe", value: "35.8 km/h", trend: "Mbappé", isPositive: true },
        { label: "Sprints >25km/h / match", value: "18.4", trend: "+2.1 vs Moy", isPositive: true },
        { label: "Puissance Max Appuis", value: "4.8 m/s²", trend: "Excellent", isPositive: true }
      ],
      recommendations: [
        { actor: "Pôle Performance", action: "Préserver les sprints max à l'entraînement J-1 (maximum 3 accélérations).", urgency: "haute", impact: "Fraîcheur des fibres rapides" }
      ],
      keyMetrics: [
        { name: "Joueurs > 34 km/h", value: "7 Bleus", subtext: "Mbappé, Dembélé, Koundé..." },
        { name: "Test 10m Médian", value: "1.64 s", subtext: "Standard élite mondial" },
        { name: "Indice Décélération", value: "Optimal", subtext: "Freinage maîtrisé" }
      ],
      targetPlayerId: "mbappe",
      actionButtonLabel: "Consulter les Profils Athlétiques",
      sourcesQualified: ["Cellules Chrono Microgate", "GPS Vector Catapult", "Caméras Haute Fréquence"]
    },
    {
      id: 'perf_obj_3',
      role: 'performance',
      title: "Détection précoce de la fatigue centrale & état nerveux",
      subtitle: "Monitoring du système nerveux autonome et ajustement des temps de récupération",
      category: "Fatigue & Récupération",
      badge: "SNA & Neuromusculaire",
      icon: "🧠",
      priorityOrder: 3,
      predictiveHighlight: "Indice de fatigue centrale mesuré à 22/100 (Très faible), confirmant la pleine disponibilité pour le match.",
      confidenceScore: 97.1,
      shortSummary: "Croisement des tests CMJ (Counter Movement Jump) et de la variabilité cardiaque matinale.",
      detailedAnalysis: "La perte de hauteur au saut vertical CMJ est nulle par rapport aux standards de repos. Le tonus vagal matinal reflète un équilibre parfait du système nerveux autonome.",
      forecasts: [
        { label: "Hauteur Saut CMJ", value: "44.2 cm", trend: "+1.5 cm", isPositive: true },
        { label: "Fraîcheur Nerveuse", value: "92 / 100", trend: "Zénith", isPositive: true },
        { label: "RPE Ressenti Séance", value: "5.8 / 10", trend: "Modéré", isPositive: true }
      ],
      recommendations: [
        { actor: "Staff Athlétique", action: "Valider l'aptitude neuromusculaire pour la séance spécifique CPA.", urgency: "normale", impact: "Feu vert explosivité" }
      ],
      keyMetrics: [
        { name: "Tests CMJ Effectués", value: "24/24", subtext: "Plateformes de force" },
        { name: "Perte de Puissance", value: "0.0%", subtext: "Aucune fatigue résiduelle" },
        { name: "Feu Vert Athlétique", value: "100%", subtext: "Groupe prêt pour le choc" }
      ],
      actionButtonLabel: "Voir le Tableau de Bord Performance",
      sourcesQualified: ["Plateformes de Force Kistler", "Questionnaire RPE Foster", "Polar H10 HRV"]
    }
  ],
  team_manager: [
    {
      id: 'tm_obj_1',
      role: 'team_manager',
      title: "Organisation du rassemblement & logistique Clairefontaine",
      subtitle: "Planning des arrivées des 24 Bleus, gestion des hébergements et intendance",
      category: "Logistique & Stage",
      badge: "Château Clairefontaine",
      icon: "🏰",
      priorityOrder: 1,
      predictiveHighlight: "100% des arrivées au Château validées à l'heure. Formalités et créneaux staff synchronisés.",
      confidenceScore: 99.5,
      shortSummary: "Feuille de route globale du rassemblement, gestion des transferts et coordination avec les clubs.",
      detailedAnalysis: "Les 24 joueurs sont arrivés à Clairefontaine sans retard. L'intendance, les menus nutritionnels certifiés FFF et les créneaux kiné sont rigoureusement alignés sur le planning de Zidane.",
      forecasts: [
        { label: "Arrivées Confirmées", value: "24 / 24", trend: "100%", isPositive: true },
        { label: "Chambres & Hébergement", value: "Prêtes", trend: "Validé", isPositive: true },
        { label: "Repas & Nutritionniste", value: "Validé FFF", trend: "Conforme", isPositive: true }
      ],
      recommendations: [
        { actor: "Guillaume Bureau", action: "Coordonner la navette d'arrivée avec le staff médical pour les premiers tests.", urgency: "normale", impact: "Fluidité du protocole d'accueil" }
      ],
      keyMetrics: [
        { name: "Effectif Présent", value: "24 / 24", subtext: "Tous au rassemblement" },
        { name: "Déplacement Belgique", value: "Vol J-1 affrété", subtext: "Départ 15h30" },
        { name: "Conformité FFF", value: "100%", subtext: "Zéro accroc logistique" }
      ],
      actionButtonLabel: "Consulter la Feuille de Route",
      specializedToolRoute: 'ai_strategy_team_manager_todo',
      specializedToolLabel: "Checklist Logistique & Arrivées",
      sourcesQualified: ["Planning Logistique FFF", "Accords de Libération FIFA", "Feuille de Route Intendance"]
    },
    {
      id: 'tm_obj_2',
      role: 'team_manager',
      title: "Accréditations UEFA, passeports & convocations officielles",
      subtitle: "Conformité administrative pour la rencontre internationale",
      category: "Administratif & UEFA",
      badge: "UEFA Match Protocol",
      icon: "📋",
      priorityOrder: 2,
      predictiveHighlight: "Validation UEFA reçue. 24 passeports sportifs et certificats d'aptitude médicale enregistrés.",
      confidenceScore: 100,
      shortSummary: "Suivi des autorisations de sortie de territoire et des protocoles réglementaires officiels.",
      detailedAnalysis: "Toutes les formalités administratives et réglementaires auprès de l'UEFA sont validées. La liste officielle des 23 joueurs sur la feuille de match est prête pour transmission à H-24.",
      forecasts: [
        { label: "Accréditations Validées", value: "24 / 24", trend: "Complet", isPositive: true },
        { label: "Feuille de Match UEFA", value: "Pré-remplie", trend: "Prête", isPositive: true }
      ],
      recommendations: [
        { actor: "Direction Sélections", action: "Transmettre la liste définitive des 23 inscrits à l'UEFA à H-24.", urgency: "haute", impact: "Conformité réglementaire UEFA" }
      ],
      keyMetrics: [
        { name: "Dossiers UEFA", value: "100%", subtext: "Aucune suspension" },
        { name: "Accords Clubs", value: "24 reçus", subtext: "Real, PSG, Arsenal..." },
        { name: "Formalités Médias", value: "Validées", subtext: "Conférence Zidane 17h" }
      ],
      actionButtonLabel: "Voir les Formalités Administratives",
      specializedToolRoute: 'ai_strategy_team_manager_overview',
      specializedToolLabel: "Dossiers UEFA & Passeports",
      sourcesQualified: ["Portail FFF Administratif", "Plateforme Officielle UEFA FAME", "Accords Clubs FIFA Annex 1"]
    }
  ],
  direction: [
    {
      id: 'dtn_obj_1',
      role: 'direction',
      title: "Supervision transversale des sélections & passerelles talents",
      subtitle: "Vision globale A, Espoirs et U20 pour garantir la continuité du vivier tricolore",
      category: "Gouvernance DTN",
      badge: "Pyramide Fédérale",
      icon: "🏆",
      priorityOrder: 1,
      predictiveHighlight: "Indice de renouvellement générationnel à 94.8%. 6 jeunes Espoirs prêts pour le grand saut en A.",
      confidenceScore: 98.0,
      shortSummary: "Pilotage stratégique de la haute performance, temps de jeu des espoirs et détection nationale.",
      detailedAnalysis: "La pyramide des sélections nationales présente un réservoir de 148 joueurs suivis avec une méthodologie athlétique et tactique unifiée. Les passerelles entre les Espoirs de Baticle et les A de Zidane sont pleinement actives.",
      forecasts: [
        { label: "Vivier Suivi", value: "148 joueurs", trend: "+12", isPositive: true },
        { label: "Potentiel Avenir", value: "96.4 / 100", trend: "Exceptionnel", isPositive: true },
        { label: "Cohérence Méthodologique", value: "100%", trend: "Alignée", isPositive: true }
      ],
      recommendations: [
        { actor: "Hubert Fournier", action: "Valider le suivi longitudinal des pépites U19 pour le rassemblement de novembre.", urgency: "normale", impact: "Sécurisation des talents binationaux" }
      ],
      keyMetrics: [
        { name: "Sélections Actives", value: "12 équipes", subtext: "Masculines & Féminines" },
        { name: "Temps Jeu U21 en Club", value: "68%", subtext: "Temps de jeu garanti" },
        { name: "Standard DTN 2026", value: "Atteint", subtext: "Objectifs Coupe du Monde" }
      ],
      actionButtonLabel: "Ouvrir le Pilotage Stratégique DTN",
      sourcesQualified: ["Base Vivier DTN FFF", "Rapports Recrutement Fédéral", "Indicateurs Temps de Jeu CIES"]
    }
  ],
  joueur: [
    {
      id: 'joueur_obj_1',
      role: 'joueur',
      title: "Mon Bilan de Forme, Données GPS & Préparation de Match",
      subtitle: "Accès individualisé à mes scores athlétiques, charge Catapult et conseils de récupération",
      category: "Espace Joueur",
      badge: "Bleus 360°",
      icon: "⚽",
      priorityOrder: 1,
      predictiveHighlight: "Score de forme à 92/100. Pleine aptitude pour 90 min à haute intensité.",
      confidenceScore: 98.5,
      shortSummary: "Suivi personnalisé de votre état de fraîcheur, qualité de sommeil et programmes de soins.",
      detailedAnalysis: "Votre récupération neuromusculaire est au zénith. Vos tests de saut CMJ et vos données de sommeil Oura (8h45) attestent d'une disponibilité physique maximale pour défier la charnière espagnole.",
      forecasts: [
        { label: "Score Forme Match", value: "92 / 100", trend: "Zénith", isPositive: true },
        { label: "Pic de Vitesse Récents", value: "35.8 km/h", trend: "Top Vitesse", isPositive: true },
        { label: "Sommeil Veille de Match", value: "8h45", trend: "Optimal", isPositive: true }
      ],
      recommendations: [
        { actor: "Préparateur Physique", action: "Décharge programmée sur la séance J-1 pour conserver 100% d'explosivité.", urgency: "normale", impact: "Fraîcheur des appuis le jour J" }
      ],
      keyMetrics: [
        { name: "Mon Statut", value: "100% DISPONIBLE", subtext: "Feu vert médical" },
        { name: "Mon ACWR", value: "1.08", subtext: "Zone idéale" },
        { name: "Prochain Match", value: `${UPCOMING_MATCH.awayTeam} (${UPCOMING_MATCH.countdown})`, subtext: `Coup d'envoi ${UPCOMING_MATCH.kickoff}` }
      ],
      targetPlayerId: "mbappe",
      actionButtonLabel: "Consulter Ma Modélisation Prédictive",
      specializedToolRoute: 'ai_strategy_player_plan',
      specializedToolLabel: "Mon Plan Athlétique Détaillé",
      sourcesQualified: ["Données GPS Personnelles Vector", "Bilan Santé Dr. Le Gall", "Capteur Sommeil Oura Ring"]
    }
  ]
};
