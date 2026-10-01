export type UserRole = 
  | 'entraineur' 
  | 'performance' 
  | 'medical' 
  | 'team_manager' 
  | 'direction'
  | 'joueur' 
  | 'arbitrage';

export interface RoleNavTab {
  id: AppView;
  label: string;
  badge?: string;
  description: string;
}

export interface RoleProfileConfig {
  role: UserRole;
  title: string;
  department: string;
  userName: string;
  avatarBadge: string;
  description: string;
  tabsOrder: RoleNavTab[];
  primaryKpis: string[];
  priorityAlertTypes: ('recup' | 'charge' | 'medical' | 'reprise')[];
  canEditMedical: boolean;
  canEditTactics: boolean;
  canManageLogistics: boolean;
  canViewExecutiveKpi: boolean;
}

export type AppView = 
  | 'auth_portal'
  | 'connexion' 
  | 'profil_choice' 
  | 'accueil_objectifs'
  | 'objective_focused'
  | 'consultation_choice'
  | 'team_choice'
  | 'player_search' 
  | 'dashboard' 
  | 'joueur_360' 
  | 'suivi_medical'
  | 'matchs_entrainements'
  | 'detail_match' 
  | 'detail_training' 
  | 'detail_rassemblement' 
  | 'ai_strategy'
  | 'ai_strategy_week'
  | 'ai_strategy_player_plan'
  | 'ai_strategy_referee_prep'
  | 'ai_strategy_referee_debrief'
  | 'ai_strategy_medical_match'
  | 'ai_strategy_medical_agenda'
  | 'ai_strategy_medical_mbappe'
  | 'ai_strategy_team_manager_todo'
  | 'ai_strategy_team_manager_overview'
  | 'assistant';

export type MedicalSpecialty = 
  | 'medecin' 
  | 'kine' 
  | 'nutritionniste' 
  | 'osteopathe' 
  | 'podologue' 
  | 'reathletisation';

export type MedicalUrgency = 'normal' | 'a_surveiller' | 'prioritaire' | 'inapte';

export interface MedicalRecord {
  id: string;
  playerId: string;
  playerName: string;
  playerNumber: number;
  playerPosition: string;
  playerClub: string;
  date: string;
  time: string;
  practitionerName: string;
  practitionerRole: string;
  specialty: MedicalSpecialty;
  location: string;
  title: string;
  motif: string;
  category: 'checkup' | 'imagerie' | 'biologie' | 'musculaire' | 'soins' | 'nutrition';
  urgency: MedicalUrgency;
  aptitudeStatus: 'Apte 100%' | 'Apte aménagé' | 'Soins quotidiens' | 'Inapte temporaire' | 'Reprise athlétique';
  
  examDetails: {
    typeExamen: string;
    modalite: string;
    resultatsChiffres?: { label: string; value: string; unit?: string; norm?: string; isAlert?: boolean }[];
    constatationsCliniques: string[];
    imagesDisponibles?: boolean;
    imagerieType?: string;
  };
  
  soinsTraitements: {
    actes: string[];
    prescriptions?: string[];
    nutritionConseils?: string[];
    materielUtilise?: string[];
  };
  
  conclusions: {
    synthese: string;
    consignesEntraineur: string;
    limitationCharge?: string;
    dateProchainControle: string;
    validationMedecinChef: boolean;
  };
}

export type PlayerStatus = 'disponible' | 'a_surveiller' | 'indisponible' | 'retour_progressif';

export interface PlayerAlert {
  id: string;
  type: 'recup' | 'charge' | 'medical' | 'reprise';
  label: string;
  value: string;
  trend?: string;
  severity: 'warning' | 'danger' | 'info';
  actionNeeded?: string;
}

export interface PlayerDimensions {
  entrainement: {
    score: number;
    dureeTotale: string;
    seances: number;
    distance: number; // km
  };
  sante: {
    score: number;
    disponibilite: number; // %
    joursSansGene: number;
    statut: string;
    sensibleMedical?: string;
    pathologyHistory?: string[];
  };
  performance: {
    score: number;
    arretsParMatch?: number;
    relancesReussies?: number; // %
    noteMoyenne: number;
    butsSaison?: number;
    passesD?: number;
    xG?: number;
  };
  physique: {
    score: number;
    vitesseMax: number; // km/h
    puissanceMax: number; // m/s²
    temps10m: number; // s
  };
  recuperation: {
    score: number;
    sommeil: string;
    hrv: number; // ms
    readiness: number;
  };
  nutrition: {
    score: number;
    hydratation: number; // %
    equilibre: string;
    poids: number; // kg
  };
}

export interface DimensionHistory {
  week: string;
  charge: number;
  physique: number;
  sante: number;
  recuperation: number;
  performance: number;
  nutrition: number;
}

export interface TimelineEvent {
  id: string;
  year?: string;
  date: string;
  category: 'carriere' | 'selections' | 'rassemblements' | 'medicaux' | 'club';
  title: string;
  description: string;
  source: string;
  relatedType?: 'match' | 'training' | 'rassemblement' | 'medical';
  relatedId?: string;
  badge?: string;
}

export interface DataSource {
  id: string;
  name: string;
  iconType: 'club' | 'gps' | 'video' | 'medical' | 'fff' | 'tools';
  provider: string;
  lastSync: string;
  status: 'synced' | 'syncing' | 'error';
  tag: string;
}

export interface ClubExchange {
  id: string;
  type: 'recu' | 'partage';
  title: string;
  club: string;
  date: string;
  details: string;
}

export type RefereeRole = 'central' | 'assistant' | 'var' | 'quatrieme';
export type RefereeGrade = 'FIFA Elite' | 'Fédéral 1' | 'Fédéral 2' | 'Assistant FIFA' | 'Assistant Fédéral 1' | 'VAR International';

export interface RefereeStats {
  roleCategory: RefereeRole;
  gradeLabel: RefereeGrade;
  matchsSaison: number;
  noteObservateurs: number; // sur 10 ex 8.42
  fautesMoyenneParMatch: number;
  cartonsJaunesParMatch: number;
  cartonsRougesParMatch: number;
  decisionsVarConfirmeesPct: number; // ex 96%
  tempsMoyenVarSec: number; // ex 48s
  distanceMoyenneKm: number; // ex 11.2 km pour un central, 6.8 km pour un assistant
  testFifaStatus: 'valide' | 'a_renouveler' | 'inapte';
  testFifaVma: string; // ex '18.2 km/h'
  testFifaSprint: string; // ex '6 x 40m en 5.52s'
  testArietScore?: string; // pour assistants ex 'Niveau 16.8'
  coursesLateralesPct?: number; // pour assistants ex '42%'
  alignementHorsJeuPct?: number; // pour assistants ex '98.4%'
  liguePreferee: string;
}

export interface Player {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  number: number;
  position: 'Gardien' | 'Défenseur' | 'Milieu' | 'Attaquant' | 'Arbitre Central' | 'Arbitre Assistant' | 'Arbitre Vidéo (VAR)' | '4e Arbitre';
  club: string;
  clubLogo?: string;
  age: number;
  height: string;
  weight: string;
  preferredFoot: 'Droitier' | 'Gaucher' | 'Ambidextre';
  caps: number;
  goals: number;
  avatarUrl: string;
  status: PlayerStatus;
  alert?: PlayerAlert;
  dimensions: PlayerDimensions;
  scoreGlobal: number;
  scoreEvolution: number;
  history: DimensionHistory[];
  timeline: TimelineEvent[];
  sources: DataSource[];
  clubExchanges: ClubExchange[];
  heatmap: {
    goalkeeperZone: { x: number; y: number; r: number; intensity: number }[];
    outfieldZone: { x: number; y: number; r: number; intensity: number }[];
  };
  recentMatchesIds: string[];
  recentTrainingsIds: string[];
  isReferee?: boolean;
  refereeStats?: RefereeStats;
}

export interface MatchPlayerStat {
  playerId: string;
  role: 'titulaire' | 'remplacant';
  positionName: string;
  pitchX: number; // 0 to 100
  pitchY: number; // 0 to 100
  minutes: number;
  rating: number;
  distanceKm: number;
  sprints: number;
  maxSpeedKmH?: number;
  passes: number;
  passesAccuracy: number;
  progressivePasses?: number;
  duelsWon: number;
  duelsTotal?: number;
  recoveries?: number;
  chancesCreated?: number;
  saves?: number;
  goals?: number;
  assists?: number;
  substitutionMinute?: number;
}

export interface MatchStats {
  possession: number;
  tirs: number;
  tirsCadres: number;
  xG: number;
  passes: number;
  precisionPasses: number;
  duelsRemportes: number;
  recuperations: number;
  distanceKm: number;
  sprints: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag?: string;
  awayFlag?: string;
  homeScore: number;
  awayScore: number;
  competition: string;
  phase: string;
  date: string;
  stadium: string;
  result: 'V' | 'N' | 'D';
  statusLabel?: string;
  statsFrance: MatchStats;
  statsOpponent: MatchStats;
  starters: MatchPlayerStat[];
  substitutes: MatchPlayerStat[];
  events: {
    minute: number;
    type: 'goal' | 'sub' | 'yellow' | 'red';
    playerId: string;
    text: string;
    team: 'home' | 'away';
  }[];
}

export interface TrainingExercise {
  name: string;
  timeStart?: string;
  timeEnd?: string;
  duration: number; // minutes
  intensity: 'Faible' | 'Moyenne' | 'Élevée';
  phaseType?: string;
  loadUA?: number;
}

export interface TrainingHealthIncident {
  minute: number;
  bodyArea: string;
  severity: 'Légère' | 'Modérée' | 'Sévère';
  impact: string;
  staffDecision: string;
}

export interface TrainingParticipant {
  playerId: string;
  rpe: number; // 1 to 10
  distanceKm: number;
  highIntensityDistanceM?: number;
  sprintsCount?: number;
  maxSpeed: number; // km/h
  accelerations?: number;
  decelerations?: number;
  highIntensityTimeMin?: number;
  ballTouches?: number;
  passesAttempted?: number;
  passesCompleted?: number;
  passesAccuracy?: number;
  duelsCount?: number;
  duelsWon?: number;
  shotsCount?: number;
  shotsOnTarget?: number;
  recoveries?: number;
  ballLosses?: number;
  hrAvg: number; // bpm
  loadUA?: number;
  participationMinutes?: number;
  status: 'Complet' | 'Adapté' | 'Travail individuel' | 'Retour progressif' | 'Absent' | 'Soins' | 'Repos programmé' | 'Gêne';
  alertNotice?: string;
  feedback?: 'Très bonne' | 'Bonne' | 'Moyenne' | 'Difficile' | string;
  postWellness?: {
    fatigue: number; // 1 to 5
    soreness: number; // 1 to 5
    stress: number; // 1 to 5
    sleepQuality: number; // 1 to 5
    generalFeeling: string;
    comment?: string;
  };
  incident?: TrainingHealthIncident;
}

export interface TrainingSession {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location: string;
  type: 'Collectif' | 'Physique' | 'Tactique' | 'Technique' | 'Récupération' | 'Activation' | 'Individuel' | 'Musculation' | 'Terrain' | 'Pré-match' | 'Post-match' | 'Spécifique poste' | string;
  durationMinutes: number;
  presentCount?: number;
  totalSquadCount?: number;
  intensityScore?: number; // e.g. 74/100
  collectiveLoadLabel?: 'Légère' | 'Modérée' | 'Élevée' | 'Très élevée';
  loadUA: number;
  loadDiffPercent: number; // +12
  charge: number;
  intensite: number;
  volume: number;
  distanceKm: number;
  sprints: number;
  exercises: TrainingExercise[];
  perceivedEffort: {
    averageScore: number;
    verbal: string;
    breakdown: {
      tresBonne: number;
      bonne: number;
      moyenne: number;
      difficile: number;
    };
  };
  participants: TrainingParticipant[];
}

export interface RassemblementStage {
  key: 'pre' | 'rassemblement' | 'post' | 'suivi';
  title: string;
  timing: string;
  dates: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
  checklist: { id: string; label: string; done: boolean; category: string }[];
  syncedData: string[];
}

export interface Rassemblement {
  id: string;
  name: string;
  selection: string;
  dates: string;
  daysToStart: number;
  squadCount: number;
  uncertainCount: number;
  stages: RassemblementStage[];
  convoquesIds: string[];
}

// ============================================================================
// COLLABORATIVE COMMENTS & NOTES (Style PowerPoint / Google Slides)
// ============================================================================
export interface CommentReply {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

// ============================================================================
// SYSTEME DE NOTIFICATIONS UNIFIE
// ============================================================================
export type NotificationType = 'mention' | 'new_note' | 'data_insertion' | 'medical_alert' | 'performance_alert';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetView: AppView;
  targetParams?: Record<string, any>;
  commentId?: string;
  authorName?: string;
  authorRole?: string;
}

export interface CollaborativeComment {
  id: string;
  targetType: 'player' | 'match' | 'training' | 'dimension' | 'general';
  targetId: string; // e.g. 'dupont', 'match-1', 'dimension-charge'
  targetTitle: string; // e.g. "Mathis Dupont", "France vs Espagne"
  subSection?: string; // e.g. "Charge & GPS", "Bilan Médical", "Zone droite"
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
  resolved: boolean;
  replies: CommentReply[];
}

// ============================================================================
// HISTORIQUE DE DÉTECTION & PARCOURS FFF
// ============================================================================
export interface DetectionMilestone {
  year: string;
  age: string;
  stageTitle: string;
  structure: string;
  category: string; // 'Détection FFF', 'Pôle Espoirs', 'Centre de Formation', 'Sélections Nationales'
  location: string;
  verdict: string;
  scoutReport: string;
  keyEvaluator: string;
  evaluatorRole: string;
  physicalBenchmarks: {
    vma?: string;
    vitesse30m?: string;
    vitesseMax?: string;
    detenteVerticaleCm?: number;
    masseGrassePercent?: number;
    indiceHRR?: string;
  };
  keyStats: string;
}

