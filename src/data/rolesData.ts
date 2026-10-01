import { RoleProfileConfig, UserRole } from '../types/ams';

export const ROLE_PROFILES_CONFIG: Record<UserRole, RoleProfileConfig> = {
  entraineur: {
    role: 'entraineur',
    title: 'Entraîneur / Sélectionneur',
    department: 'Staff Technique & Tactique',
    userName: 'Zinédine Zidane',
    avatarBadge: 'ZZ',
    description: 'Composition, joueurs, performance collective, animation tactique, gestion des matchs et préparation des séances.',
    tabsOrder: [
      { id: 'dashboard', label: 'Tableau de bord Staff', description: 'Vue globale, forme du groupe & préparation' },
      { id: 'matchs_entrainements', label: 'Matchs & Séances', badge: 'J-2', description: 'Plans de jeu, séances FFF & feuilles de match' },
      { id: 'player_search', label: 'Effectif & Joueurs', description: 'Composition, fiches 360 & statut des 24' },
      { id: 'detail_rassemblement', label: 'Rassemblement', description: 'Programme, calendrier et créneaux staff' },
      { id: 'assistant', label: 'Assistant AMS IA', description: 'Recommandations tactiques & préparation' }
    ],
    primaryKpis: ['disponibilite', 'forme_moyenne', 'prochain_match', 'seances_terminees'],
    priorityAlertTypes: ['reprise', 'charge', 'recup', 'medical'],
    canEditMedical: false,
    canEditTactics: true,
    canManageLogistics: false,
    canViewExecutiveKpi: false
  },
  performance: {
    role: 'performance',
    title: 'Responsable Performance & Data',
    department: 'Pôle Athlétique & Data Science',
    userName: 'Alexandre Germain',
    avatarBadge: 'AG',
    description: 'Charge aiguë/chronique (ACWR), monitoring GPS Catapult, puissance aérobie, récupération HRV et comparaisons de charge.',
    tabsOrder: [
      { id: 'dashboard', label: 'Monitoring Charge & GPS', badge: 'Live GPS', description: 'Charge d’entraînement, ACWR & alertes pics' },
      { id: 'matchs_entrainements', label: 'Séances & GPS Match', description: 'Métriques Catapult, sprints > 25km/h, HSR' },
      { id: 'player_search', label: 'Profils Physiques', description: 'Capacités VMA, puissance métabolique & tests' },
      { id: 'detail_rassemblement', label: 'Périodisation Stage', description: 'Microcycles, décharge pré-compétition' },
      { id: 'assistant', label: 'Assistant AMS IA', description: 'Modélisation charge & prédiction fatigue' }
    ],
    primaryKpis: ['charge_moyenne', 'acwr_ratio', 'sprints_haute_intensite', 'recup_moyenne'],
    priorityAlertTypes: ['charge', 'recup', 'reprise', 'medical'],
    canEditMedical: false,
    canEditTactics: false,
    canManageLogistics: false,
    canViewExecutiveKpi: true
  },
  medical: {
    role: 'medical',
    title: 'Médecin Fédéral / Pôle Santé',
    department: 'Département Médical & Soins FFF',
    userName: 'Dr. Franck Le Gall',
    avatarBadge: 'LG',
    description: 'Santé des joueurs, bilans cliniques, accès aux examens confidentiels autorisés, protocoles Return To Play et alertes blessures.',
    tabsOrder: [
      { id: 'player_search', label: 'Santé & Médical (Priorité)', badge: 'Confidentialité Santé', description: 'Dossiers cliniques, bilans imagerie & soins' },
      { id: 'dashboard', label: 'Disponibilité & RTP', description: 'Aptitudes de jeu, reprise graduée & alertes' },
      { id: 'matchs_entrainements', label: 'Impact Séances / Matchs', description: 'Charge articulaire & temps de jeu toléré' },
      { id: 'detail_rassemblement', label: 'Visites Pré-Rassemblement', description: 'Check-ups d’arrivée & autorisations de sortie' },
      { id: 'assistant', label: 'Assistant AMS IA', description: 'Synthèse d’antécédents & protocoles fédéraux' }
    ],
    primaryKpis: ['taux_disponibilite', 'joueurs_soins', 'en_retour_progressif', 'alertes_actives'],
    priorityAlertTypes: ['medical', 'reprise', 'recup', 'charge'],
    canEditMedical: true,
    canEditTactics: false,
    canManageLogistics: false,
    canViewExecutiveKpi: false
  },
  team_manager: {
    role: 'team_manager',
    title: 'Team Manager & Opérations',
    department: 'Direction des Sélections Nationales',
    userName: 'Guillaume Bureau',
    avatarBadge: 'GB',
    description: 'Rassemblements officiels, convocations clubs, formalités administratives, passeports, logistique Clairefontaine et déplacements.',
    tabsOrder: [
      { id: 'detail_rassemblement', label: 'Rassemblement & Logistique', badge: 'J-2', description: 'Feuille de route, convocations et hébergement' },
      { id: 'dashboard', label: 'Pilotage Opérationnel', description: 'Disponibilité administrative & arrivées' },
      { id: 'player_search', label: 'Liste Convoqués & Clubs', description: 'Contacts référents, accords clubs & transports' },
      { id: 'matchs_entrainements', label: 'Programme & Terrains', description: 'Horaires, réservations créneaux & médias' },
      { id: 'assistant', label: 'Assistant AMS IA', description: 'Synthèse des arrivées et formalités UEFA' }
    ],
    primaryKpis: ['convoques_confirmes', 'passeports_uefa', 'accords_clubs', 'jours_avant_stage'],
    priorityAlertTypes: ['reprise', 'medical', 'charge', 'recup'],
    canEditMedical: false,
    canEditTactics: false,
    canManageLogistics: true,
    canViewExecutiveKpi: false
  },
  direction: {
    role: 'direction',
    title: 'Direction Technique Nationale (DTN)',
    department: 'Gouvernance & Haute Performance FFF',
    userName: 'Hubert Fournier',
    avatarBadge: 'HF',
    description: 'Vision synthétique, pyramide des sélections, tendances longitudinales, KPIs transversaux et pilotage fédéral.',
    tabsOrder: [
      { id: 'dashboard', label: 'Pilotage & Synthèse DTN', badge: 'Vision Fédérale', description: 'Tableau de bord stratégique & KPIs transversaux' },
      { id: 'player_search', label: 'Vivier Fédéral & Sélections', description: 'Suivi des talents A, Espoirs et U' },
      { id: 'detail_rassemblement', label: 'Gouvernance Rassemblement', description: 'Calendrier des sélections & bilans' },
      { id: 'matchs_entrainements', label: 'Bilan Compétition', description: 'Résultats, statistiques et temps de jeu' },
      { id: 'assistant', label: 'Assistant AMS IA', description: 'Rapports de synthèse exécutifs' }
    ],
    primaryKpis: ['vivier_actif', 'dispo_federale', 'temps_jeu_moyen', 'progression_talents'],
    priorityAlertTypes: ['medical', 'charge', 'reprise', 'recup'],
    canEditMedical: false,
    canEditTactics: false,
    canManageLogistics: false,
    canViewExecutiveKpi: true
  },
  // Fallbacks for secondary roles
  joueur: {
    role: 'joueur',
    title: 'Espace Joueur',
    department: 'Sélection Nationale',
    userName: 'Kylian Mbappé',
    avatarBadge: 'KM',
    description: 'Espace personnel du joueur.',
    tabsOrder: [
      { id: 'dashboard', label: 'Mon Espace', description: 'Mes stats et mon bien-être' },
      { id: 'joueur_360', label: 'Mon Profil 360', description: 'Mes données athlétiques' },
      { id: 'matchs_entrainements', label: 'Programme Matchs', description: 'Calendrier des séances' }
    ],
    primaryKpis: ['disponibilite', 'forme_moyenne'],
    priorityAlertTypes: ['recup', 'charge', 'medical', 'reprise'],
    canEditMedical: false,
    canEditTactics: false,
    canManageLogistics: false,
    canViewExecutiveKpi: false
  },
  arbitrage: {
    role: 'arbitrage',
    title: 'Chef des Arbitres / DTA',
    department: 'Direction Technique de l’Arbitrage (DTA FFF)',
    userName: 'Antony Gautier',
    avatarBadge: 'DTA',
    description: 'Désignations officielles, condition athlétique du corps arbitral, tests intermittents FIFA/UEFA, décisions VAR, notes des observateurs et suivi médical.',
    tabsOrder: [
      { id: 'dashboard', label: 'Cockpit Arbitrage FFF', badge: 'DTA', description: 'Vue d’ensemble des arbitres & désignations' },
      { id: 'player_search', label: 'Corps Arbitral FFF', description: 'Effectif des arbitres centraux, assistants et VAR' },
      { id: 'matchs_entrainements', label: 'Matchs & Désignations', description: 'Affectations sur les rencontres internationales et nationales' },
      { id: 'suivi_medical', label: 'Pôle Médical Arbitres', description: 'Bilans cliniques, ECG d’effort et protocoles de reprise' },
      { id: 'assistant', label: 'Assistant AMS IA', description: 'Aide à la désignation & analyse des performances' }
    ],
    primaryKpis: ['disponibilite_arbitres', 'reussite_tests_fifa', 'validation_var_pct', 'note_moyenne_obs'],
    priorityAlertTypes: ['medical', 'charge', 'reprise', 'recup'],
    canEditMedical: false,
    canEditTactics: false,
    canManageLogistics: true,
    canViewExecutiveKpi: true
  }
};
