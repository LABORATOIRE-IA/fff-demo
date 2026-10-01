import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  UserRole,
  AppView,
  Player,
  PlayerStatus,
  PlayerAlert,
  Match,
  TrainingSession,
  Rassemblement,
  RoleProfileConfig,
  CollaborativeComment,
  CommentReply,
  AppNotification
} from '../types/ams';
import { INITIAL_COLLABORATIVE_COMMENTS } from '../data/commentsData';
import { INITIAL_NOTIFICATIONS } from '../data/notificationsData';
import {
  FULL_PLAYERS_LIST,
  INITIAL_MATCHES,
  INITIAL_TRAININGS,
  INITIAL_RASSEMBLEMENT
} from '../data/mockAmsData';
import {
  COMPREHENSIVE_MATCHES,
  COMPREHENSIVE_TRAININGS
} from '../data/comprehensiveAmsSchedule';
import { FFF_TEAMS, FFFTeam } from '../data/teamsData';
import { ROLE_PROFILES_CONFIG } from '../data/rolesData';
import { OFFICIAL_REFEREES_LIST } from '../data/refereesData';
import { DataScope } from '../types/dataExchange';
import { RoleObjective, ROLE_OBJECTIVES_DATA } from '../data/objectivesData';
import { isExampleRole } from '../data/objectiveAccess';

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedCards?: {
    type: 'player' | 'match' | 'training' | 'rassemblement' | 'alert_summary';
    title: string;
    subtitle?: string;
    tag?: string;
    tagColor?: string;
    targetId?: string;
    targetView: AppView;
    targetTab?: string;
  }[];
}

interface AMSContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  roleConfig: RoleProfileConfig;
  selectedTeamId: string;
  setSelectedTeamId: (teamId: string) => void;
  selectedTeam: FFFTeam;
  availableTeams: FFFTeam[];
  activeView: AppView;
  selectedPlayerId: string;
  selectedMatchId: string;
  selectedTrainingId: string;
  playerTab: string;
  setPlayerTab: (tab: string) => void;
  matchTab: string;
  setMatchTab: (tab: string) => void;
  trainingTab: string;
  setTrainingTab: (tab: string) => void;
  players: Player[];
  matches: Match[];
  trainings: TrainingSession[];
  rassemblement: Rassemblement;
  
  // Navigation
  navigateTo: (
    view: AppView,
    options?: {
      playerId?: string;
      matchId?: string;
      trainingId?: string;
      playerTab?: string;
      matchTab?: string;
      trainingTab?: string;
    }
  ) => void;
  goBack: () => void;
  historyLength: number;
  
  // Sidebar collapse & toggle
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;

  // Drawer / Modals
  drawerPlayerId: string | null;
  openPlayerDrawer: (playerId: string) => void;
  closePlayerDrawer: () => void;
  isMedicalModalOpen: boolean;
  medicalModalPlayerId: string | null;
  openMedicalModal: (playerId: string) => void;
  closeMedicalModal: () => void;
  isDetectionModalOpen: boolean;
  openDetectionModal: () => void;
  closeDetectionModal: () => void;

  // Collaborative Comments & Notes (PowerPoint style)
  comments: CollaborativeComment[];
  isCommentsDrawerOpen: boolean;
  commentsDrawerTarget: { targetId: string; targetType?: any; targetTitle: string } | null;
  openCommentsDrawer: (target?: { targetId: string; targetType?: any; targetTitle?: string }) => void;
  closeCommentsDrawer: () => void;
  addComment: (data: {
    targetType: 'player' | 'match' | 'training' | 'dimension' | 'general';
    targetId: string;
    targetTitle: string;
    subSection?: string;
    authorName: string;
    authorRole: string;
    content: string;
  }) => void;
  addCommentReply: (commentId: string, reply: { authorName: string; authorRole: string; content: string }) => void;
  toggleResolveComment: (commentId: string) => void;
  deleteComment: (commentId: string) => void;

  // Unified Notifications System
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  handleNotificationClick: (notif: AppNotification) => void;

  // Data Exchange (Import / Export / Sources Hub)
  isImportModalOpen: boolean;
  importModalContext: DataScope;
  openImportModal: (context?: DataScope) => void;
  closeImportModal: () => void;
  isExportModalOpen: boolean;
  exportModalContext: DataScope;
  openExportModal: (context?: DataScope) => void;
  closeExportModal: () => void;
  isDataSourcesModalOpen: boolean;
  openDataSourcesModal: () => void;
  closeDataSourcesModal: () => void;
  lastSyncTimestamp: string;
  isSyncingAll: boolean;
  triggerDataSync: (sourceName?: string) => Promise<void>;
  syncToastMessage: string | null;
  
  // Real-time mutations (Single Source of Truth)
  updatePlayerStatus: (playerId: string, status: PlayerStatus, alert?: PlayerAlert) => void;
  syncClubData: (playerId: string) => void;
  
  // Helpers & computed data
  selectedPlayer: Player;
  selectedMatch: Match;
  selectedTraining: TrainingSession;
  squadSummary: {
    total: number;
    disponibles: number;
    aSurveiller: number;
    indisponibles: number;
    retourProgressif: number;
  };
  activeAlerts: { player: Player; alert: PlayerAlert }[];
  
  // Goals & Objectives
  selectedObjective: RoleObjective | null;
  setSelectedObjective: (obj: RoleObjective | null) => void;
  allObjectivesMap: Record<UserRole, RoleObjective[]>;
  addCustomObjective: (obj: RoleObjective) => void;

  // Assistant
  assistantMessages: AssistantMessage[];
  sendAssistantQuery: (text: string) => void;
  clearAssistantHistory: () => void;

  // Theme (Nuit / Jour)
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const AMSContext = createContext<AMSContextType | undefined>(undefined);

export const AMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme Nuit / Jour state with localStorage persistence
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ams360_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ams360_theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    }
  }, [theme]);

  // Start on Connexion view as requested ("Connexion → Profil → Équipe/Joueur → Dashboard")
  const [activeView, setActiveView] = useState<AppView>('auth_portal');
  const [userRole, setUserRoleState] = useState<UserRole>('entraineur');
  const setUserRole = (role: UserRole) => {
    if (!isExampleRole(role)) setUserRoleState(role);
  };
  const [selectedTeamId, setSelectedTeamId] = useState<string>('france_a');

  const availableTeams = useMemo(() => FFF_TEAMS, []);

  const selectedTeam = useMemo(() => {
    return FFF_TEAMS.find((t) => t.id === selectedTeamId) || FFF_TEAMS[0];
  }, [selectedTeamId]);

  const roleConfig = useMemo(() => {
    return ROLE_PROFILES_CONFIG[userRole] || ROLE_PROFILES_CONFIG.entraineur;
  }, [userRole]);
  
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('mbappe');
  const [selectedMatchId, setSelectedMatchId] = useState<string>('match-1');
  const [selectedTrainingId, setSelectedTrainingId] = useState<string>('train-1');
  
  const [playerTab, setPlayerTab] = useState<string>('predictif');
  const [matchTab, setMatchTab] = useState<string>('vue_ensemble');
  const [trainingTab, setTrainingTab] = useState<string>('resume');

  const [allObjectivesMap, setAllObjectivesMap] = useState<Record<UserRole, RoleObjective[]>>(() => {
    return { ...ROLE_OBJECTIVES_DATA };
  });

  const [selectedObjective, setSelectedObjective] = useState<RoleObjective | null>(() => {
    return ROLE_OBJECTIVES_DATA[userRole]?.[0] || ROLE_OBJECTIVES_DATA.entraineur[0];
  });

  const addCustomObjective = (newObj: RoleObjective) => {
    setAllObjectivesMap((prev) => {
      const currentList = prev[newObj.role] || [];
      return {
        ...prev,
        [newObj.role]: [newObj, ...currentList]
      };
    });
    setSelectedObjective(newObj);
  };
  
  const [players, setPlayers] = useState<Player[]>(() => [
    ...FULL_PLAYERS_LIST,
    ...OFFICIAL_REFEREES_LIST
  ]);
  const [matches, setMatches] = useState<Match[]>(COMPREHENSIVE_MATCHES);
  const [trainings, setTrainings] = useState<TrainingSession[]>(COMPREHENSIVE_TRAININGS);
  const [rassemblement, setRassemblement] = useState<Rassemblement>(INITIAL_RASSEMBLEMENT);
  
  const [history, setHistory] = useState<{ view: AppView; options?: Record<string, any> }[]>([]);
  
  const [drawerPlayerId, setDrawerPlayerId] = useState<string | null>(null);
  const [isMedicalModalOpen, setIsMedicalModalOpen] = useState<boolean>(false);
  const [medicalModalPlayerId, setMedicalModalPlayerId] = useState<string | null>(null);

  // Hidden by default as requested, toggleable on user click
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Detection Modal
  const [isDetectionModalOpen, setIsDetectionModalOpen] = useState<boolean>(false);
  const openDetectionModal = () => setIsDetectionModalOpen(true);
  const closeDetectionModal = () => setIsDetectionModalOpen(false);

  // Collaborative Comments & Notes
  const [comments, setComments] = useState<CollaborativeComment[]>(INITIAL_COLLABORATIVE_COMMENTS);
  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState<boolean>(false);
  const [commentsDrawerTarget, setCommentsDrawerTarget] = useState<{
    targetId: string;
    targetType?: any;
    targetTitle: string;
  } | null>(null);

  const openCommentsDrawer = (target?: { targetId: string; targetType?: any; targetTitle?: string }) => {
    if (target) {
      setCommentsDrawerTarget({
        targetId: target.targetId,
        targetType: target.targetType,
        targetTitle: target.targetTitle || 'Élément FFF'
      });
    }
    setIsCommentsDrawerOpen(true);
  };

  const closeCommentsDrawer = () => {
    setIsCommentsDrawerOpen(false);
  };

  const addComment = (data: {
    targetType: 'player' | 'match' | 'training' | 'dimension' | 'general';
    targetId: string;
    targetTitle: string;
    subSection?: string;
    authorName: string;
    authorRole: string;
    content: string;
  }) => {
    const newComm: CollaborativeComment = {
      id: `comm-${Date.now()}`,
      targetType: data.targetType,
      targetId: data.targetId,
      targetTitle: data.targetTitle,
      subSection: data.subSection,
      authorName: data.authorName,
      authorRole: data.authorRole,
      content: data.content,
      createdAt: 'À l’instant',
      resolved: false,
      replies: []
    };
    setComments((prev) => [newComm, ...prev]);
  };

  const addCommentReply = (
    commentId: string,
    reply: { authorName: string; authorRole: string; content: string }
  ) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [
              ...c.replies,
              {
                id: `rep-${Date.now()}`,
                authorName: reply.authorName,
                authorRole: reply.authorRole,
                content: reply.content,
                createdAt: 'À l’instant'
              }
            ]
          };
        }
        return c;
      })
    );
  };

  const toggleResolveComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, resolved: !c.resolved } : c))
    );
  };

  const deleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  // Unified Notifications System
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);
    if (notif.targetView) {
      navigateTo(notif.targetView, notif.targetParams);
    }
    if (notif.commentId) {
      openCommentsDrawer({
        targetId: notif.targetParams?.playerId || notif.targetParams?.matchId || 'dupont',
        targetType: notif.targetParams?.playerId ? 'player' : 'match',
        targetTitle: notif.title
      });
    }
  };

  // Data Exchange (Import / Export / Sources)
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importModalContext, setImportModalContext] = useState<DataScope>('all');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [exportModalContext, setExportModalContext] = useState<DataScope>('all');
  const [isDataSourcesModalOpen, setIsDataSourcesModalOpen] = useState<boolean>(false);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<string>('Il y a 4 min (Catapult Vector)');
  const [isSyncingAll, setIsSyncingAll] = useState<boolean>(false);
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);

  const openImportModal = (context: DataScope = 'all') => {
    setImportModalContext(context);
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
  };

  const openExportModal = (context: DataScope = 'all') => {
    setExportModalContext(context);
    setIsExportModalOpen(true);
  };

  const closeExportModal = () => {
    setIsExportModalOpen(false);
  };

  const openDataSourcesModal = () => {
    setIsDataSourcesModalOpen(true);
  };

  const closeDataSourcesModal = () => {
    setIsDataSourcesModalOpen(false);
  };

  const triggerDataSync = async (sourceName?: string): Promise<void> => {
    setIsSyncingAll(true);
    const label = sourceName || 'Tous les flux (7 connecteurs)';
    setSyncToastMessage(`Synchronisation en cours avec ${label}...`);

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsSyncingAll(false);
        setLastSyncTimestamp(`À l'instant (${sourceName || 'Écosystème FFF'})`);
        setSyncToastMessage(`✓ Données consolidées avec succès (${label})`);
        setTimeout(() => {
          setSyncToastMessage(null);
        }, 3500);
        resolve();
      }, 1000);
    });
  };

  // Assistant messages initialized with mockup greeting & context
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Bonjour Antoine. Je suis votre assistant AMS 360 connecté en temps réel aux données de la sélection France A.\n\n3 joueurs nécessitent une attention particulière avant le rassemblement :',
      timestamp: 'Aujourd’hui • 08:30',
      suggestedCards: [
        {
          type: 'player',
          title: 'Lucas Chevalier',
          subtitle: 'Récupération faible : 58/100 (-17 pts)',
          tag: 'À surveiller',
          tagColor: 'amber',
          targetId: 'chevalier',
          targetView: 'joueur_360',
          targetTab: 'vue_ensemble'
        },
        {
          type: 'player',
          title: 'Aurélien Tchouaméni',
          subtitle: 'Charge élevée : +24% vs référence',
          tag: 'Charge élevée',
          tagColor: 'amber',
          targetId: 'tchouameni',
          targetView: 'joueur_360',
          targetTab: 'charge'
        },
        {
          type: 'player',
          title: 'Ousmane Dembélé',
          subtitle: 'Retour progressif : 74% disponibilité (max 60 min)',
          tag: 'Retour progressif',
          tagColor: 'blue',
          targetId: 'dembele',
          targetView: 'joueur_360',
          targetTab: 'sante'
        }
      ]
    }
  ]);

  const navigateTo = (
    view: AppView,
    options?: {
      playerId?: string;
      matchId?: string;
      trainingId?: string;
      playerTab?: string;
      matchTab?: string;
      trainingTab?: string;
    }
  ) => {
    setHistory((prev) => [...prev, { view: activeView, options: { selectedPlayerId, selectedMatchId, selectedTrainingId, playerTab, matchTab, trainingTab } }]);
    
    if (options?.playerId) setSelectedPlayerId(options.playerId);
    if (options?.matchId) setSelectedMatchId(options.matchId);
    if (options?.trainingId) setSelectedTrainingId(options.trainingId);
    if (options?.playerTab) {
      setPlayerTab(options.playerTab);
    } else if (view === 'joueur_360') {
      setPlayerTab('predictif');
    }
    if (options?.matchTab) setMatchTab(options.matchTab);
    if (options?.trainingTab) setTrainingTab(options.trainingTab);
    
    // Auto-collapse sidebar when opening player sheet for maximum space, keep reopenable
    if (view === 'joueur_360') {
      setIsSidebarOpen(false);
    }

    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (history.length > 0) {
      const last = history[history.length - 1];
      setHistory((prev) => prev.slice(0, prev.length - 1));
      if (last.options) {
        if (last.options.selectedPlayerId) setSelectedPlayerId(last.options.selectedPlayerId);
        if (last.options.selectedMatchId) setSelectedMatchId(last.options.selectedMatchId);
        if (last.options.selectedTrainingId) setSelectedTrainingId(last.options.selectedTrainingId);
        if (last.options.playerTab) setPlayerTab(last.options.playerTab);
        if (last.options.matchTab) setMatchTab(last.options.matchTab);
        if (last.options.trainingTab) setTrainingTab(last.options.trainingTab);
      }
      setActiveView(last.view);
    } else {
      // default fallback
      setActiveView('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPlayerDrawer = (playerId: string) => {
    setDrawerPlayerId(playerId);
  };

  const closePlayerDrawer = () => {
    setDrawerPlayerId(null);
  };

  const openMedicalModal = (playerId: string) => {
    setMedicalModalPlayerId(playerId);
    setIsMedicalModalOpen(true);
  };

  const closeMedicalModal = () => {
    setIsMedicalModalOpen(false);
    setMedicalModalPlayerId(null);
  };

  // Real-time mutations ensuring absolute synchronicity
  const updatePlayerStatus = (playerId: string, status: PlayerStatus, alert?: PlayerAlert) => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id === playerId) {
          const newPlayer = { ...p, status };
          if (alert) {
            newPlayer.alert = alert;
          } else if (status === 'disponible') {
            newPlayer.alert = undefined;
          }
          // Also add an audit event to the player's timeline
          const newEvent = {
            id: `time-stat-${Date.now()}`,
            date: 'À l’instant',
            category: 'medicaux' as const,
            title: `Statut mis à jour : ${status.toUpperCase()}`,
            description: alert ? `${alert.label} (${alert.value}) - ${alert.actionNeeded || ''}` : 'Disponibilité complète confirmée par le staff.',
            source: 'Staff Médical / Performance AMS 360'
          };
          newPlayer.timeline = [newEvent, ...newPlayer.timeline];
          return newPlayer;
        }
        return p;
      })
    );
  };

  const syncClubData = (playerId: string) => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id === playerId) {
          const updatedSources = p.sources.map((s) =>
            s.iconType === 'club' ? { ...s, lastSync: 'À l’instant', status: 'synced' as const } : s
          );
          const newExchange = {
            id: `ex-${Date.now()}`,
            type: 'recu' as const,
            title: `Synchronisation API ${p.club}`,
            club: p.club,
            date: 'À l’instant',
            details: 'Mise à jour des métriques GPS et rapport de séance validé par le préparateur physique de club.'
          };
          const newTimeline = {
            id: `sync-${Date.now()}`,
            date: 'À l’instant',
            category: 'club' as const,
            title: `Données club synchronisées (${p.club})`,
            description: 'Intégration automatique dans le jumeau numérique AMS 360.',
            source: `API Club ${p.club}`
          };
          return {
            ...p,
            sources: updatedSources,
            clubExchanges: [newExchange, ...p.clubExchanges],
            timeline: [newTimeline, ...p.timeline]
          };
        }
        return p;
      })
    );
  };

  // Computed data
  const selectedPlayer = useMemo(() => {
    return players.find((p) => p.id === selectedPlayerId) || players[0];
  }, [players, selectedPlayerId]);

  const selectedMatch = useMemo(() => {
    return matches.find((m) => m.id === selectedMatchId) || matches[0];
  }, [matches, selectedMatchId]);

  const selectedTraining = useMemo(() => {
    return trainings.find((t) => t.id === selectedTrainingId) || trainings[0];
  }, [trainings, selectedTrainingId]);

  const squadSummary = useMemo(() => {
    const total = players.length;
    let disponibles = 0;
    let aSurveiller = 0;
    let indisponibles = 0;
    let retourProgressif = 0;

    players.forEach((p) => {
      if (p.status === 'disponible') disponibles++;
      else if (p.status === 'a_surveiller') aSurveiller++;
      else if (p.status === 'indisponible') indisponibles++;
      else if (p.status === 'retour_progressif') retourProgressif++;
    });

    return { total, disponibles, aSurveiller, indisponibles, retourProgressif };
  }, [players]);

  const activeAlerts = useMemo(() => {
    const result: { player: Player; alert: PlayerAlert }[] = [];
    players.forEach((p) => {
      if (p.alert) {
        result.push({ player: p, alert: p.alert });
      }
    });
    return result;
  }, [players]);

  // Assistant query handler
  const sendAssistantQuery = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const userMsg: AssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: 'À l’instant'
    };

    // Analyze query context using live state
    const lower = trimmed.toLowerCase();
    let replyText = '';
    const suggestedCards: AssistantMessage['suggestedCards'] = [];

    if (lower.includes('risque') || lower.includes('alerte') || lower.includes('incertitude') || lower.includes('bless')) {
      replyText = `Actuellement, ${activeAlerts.length} joueurs de la sélection font l'objet d'une alerte active dans le système AMS 360 :`;
      activeAlerts.forEach(({ player, alert }) => {
        suggestedCards.push({
          type: 'player',
          title: player.name,
          subtitle: `${alert.label} : ${alert.value} (${alert.actionNeeded || ''})`,
          tag: player.status === 'indisponible' ? 'Indisponible' : player.status === 'retour_progressif' ? 'Reprise' : 'À surveiller',
          tagColor: player.status === 'indisponible' ? 'rose' : player.status === 'retour_progressif' ? 'blue' : 'amber',
          targetId: player.id,
          targetView: 'joueur_360',
          targetTab: alert.type === 'recup' ? 'vue_ensemble' : alert.type === 'charge' ? 'charge' : 'sante'
        });
      });
    } else if (lower.includes('chevalier')) {
      replyText = `Lucas Chevalier (Gardien, N°23 - Paris Saint-Germain) : Score global 86/100 (+6). Alerte en cours : Récupération à 58/100 (-17 pts). Son sommeil et son HRV indiquent une fatigue nerveuse modérée. Statut : À surveiller.`;
      suggestedCards.push({
        type: 'player',
        title: 'Lucas Chevalier - Fiche Joueur 360',
        subtitle: 'Consulter le jumeau numérique, la heat map et les échanges PSG',
        tag: 'Gardien #23',
        tagColor: 'blue',
        targetId: 'chevalier',
        targetView: 'joueur_360',
        targetTab: 'vue_ensemble'
      });
    } else if (lower.includes('mbappé') || lower.includes('mbappe')) {
      const mbappe = players.find((p) => p.id === 'mbappe');
      replyText = `Kylian Mbappé (Capitaine, N°10 - Real Madrid) : Score global 95/100, 100% de disponibilité, vitesse max 36.8 km/h. Auteur d'un doublé lors du dernier match (France 3-1 Pays-Bas). Tous les indicateurs sont au vert.`;
      suggestedCards.push({
        type: 'player',
        title: 'Kylian Mbappé - Fiche Joueur 360',
        subtitle: 'Consulter ses métriques physiques, xG et temps de jeu',
        tag: 'Attaquant #10',
        tagColor: 'emerald',
        targetId: 'mbappe',
        targetView: 'joueur_360',
        targetTab: 'physique'
      });
    } else if (lower.includes('match') || lower.includes('pays-bas') || lower.includes('score')) {
      replyText = `Dernier match officiel : France 3 - 1 Pays-Bas (UEFA Nations League). Possession 62%, xG 2.4, buts de Mbappé (18', 64') et Barcola (34'). Chevalier a réalisé 4 arrêts décisifs dans les buts.`;
      suggestedCards.push({
        type: 'match',
        title: 'Feuille de match : France 3-1 Pays-Bas',
        subtitle: 'Composition interactive, statistiques détaillées et timeline',
        tag: 'Victoire',
        tagColor: 'emerald',
        targetId: 'match-1',
        targetView: 'detail_match'
      });
    } else if (lower.includes('entraînement') || lower.includes('entrainement') || lower.includes('seance')) {
      replyText = `Dernière séance : Entraînement collectif à Clairefontaine (10 octobre 2025). Charge moyenne 487 UA (+12% vs objectif), ressenti joueurs : 92/100 ("Bonne"). 12 participants monitorés en direct avec Catapult.`;
      suggestedCards.push({
        type: 'training',
        title: 'Détail séance Clairefontaine (10 oct.)',
        subtitle: 'Découpage exercices, charge UA et RPE individuel',
        tag: 'Séance collective',
        tagColor: 'blue',
        targetId: 'train-1',
        targetView: 'detail_training'
      });
    } else if (lower.includes('rassemblement') || lower.includes('convoc') || lower.includes('mars')) {
      replyText = `Le prochain rassemblement de la sélection France A débute dans J-2 (12 — 24 mars 2026). Étape actuelle : Pré-rassemblement (J-7 → J-1). 24 joueurs convoqués, 3 situations médicales/physiques sous surveillance.`;
      suggestedCards.push({
        type: 'rassemblement',
        title: 'Rassemblement Mars 2026',
        subtitle: 'Pré-rassemblement → Rassemblement → Post → Suivi longitudinal',
        tag: 'J-2',
        tagColor: 'rose',
        targetId: 'rass-mars-2026',
        targetView: 'detail_rassemblement'
      });
    } else {
      replyText = `Voici les données clés de la sélection nationale France A : 24 joueurs dans l'effectif (${squadSummary.disponibles} disponibles, ${squadSummary.aSurveiller} à surveiller, ${squadSummary.retourProgressif} en reprise, ${squadSummary.indisponibles} indisponibles).`;
      suggestedCards.push(
        {
          type: 'alert_summary',
          title: 'Tableau de bord de la sélection',
          subtitle: 'Vue macro, alertes et indicateurs de performance',
          tag: 'Dashboard',
          tagColor: 'blue',
          targetView: 'dashboard'
        },
        {
          type: 'rassemblement',
          title: 'Programme du rassemblement',
          subtitle: 'Cycle pré-convocation et calendrier des matchs',
          tag: 'J-2',
          tagColor: 'amber',
          targetView: 'detail_rassemblement'
        }
      );
    }

    const assistantMsg: AssistantMessage = {
      id: `ast-${Date.now()}`,
      sender: 'assistant',
      text: replyText,
      timestamp: 'À l’instant',
      suggestedCards
    };

    setAssistantMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  const clearAssistantHistory = () => {
    setAssistantMessages([]);
  };

  return (
    <AMSContext.Provider
      value={{
        userRole,
        setUserRole,
        roleConfig,
        selectedTeamId,
        setSelectedTeamId,
        selectedTeam,
        availableTeams,
        activeView,
        selectedPlayerId,
        selectedMatchId,
        selectedTrainingId,
        playerTab,
        setPlayerTab,
        matchTab,
        setMatchTab,
        trainingTab,
        setTrainingTab,
        players,
        matches,
        trainings,
        rassemblement,
        navigateTo,
        goBack,
        historyLength: history.length,
        drawerPlayerId,
        openPlayerDrawer,
        closePlayerDrawer,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        isMedicalModalOpen,
        medicalModalPlayerId,
        openMedicalModal,
        closeMedicalModal,
        isDetectionModalOpen,
        openDetectionModal,
        closeDetectionModal,
        comments,
        isCommentsDrawerOpen,
        commentsDrawerTarget,
        openCommentsDrawer,
        closeCommentsDrawer,
        addComment,
        addCommentReply,
        toggleResolveComment,
        deleteComment,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        handleNotificationClick,
        isImportModalOpen,
        importModalContext,
        openImportModal,
        closeImportModal,
        isExportModalOpen,
        exportModalContext,
        openExportModal,
        closeExportModal,
        isDataSourcesModalOpen,
        openDataSourcesModal,
        closeDataSourcesModal,
        lastSyncTimestamp,
        isSyncingAll,
        triggerDataSync,
        syncToastMessage,
        updatePlayerStatus,
        syncClubData,
        selectedPlayer,
        selectedMatch,
        selectedTraining,
        squadSummary,
        activeAlerts,
        selectedObjective,
        setSelectedObjective,
        allObjectivesMap,
        addCustomObjective,
        assistantMessages,
        sendAssistantQuery,
        clearAssistantHistory
      }}
    >
      {children}
    </AMSContext.Provider>
  );
};

export const useAMS = () => {
  const context = useContext(AMSContext);
  if (!context) {
    throw new Error('useAMS must be used within an AMSProvider');
  }
  return context;
};
