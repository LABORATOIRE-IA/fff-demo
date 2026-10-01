import React, { useState, useRef, useEffect } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  ArrowLeft,
  Database,
  Check,
  UserCheck,
  Shield,
  PanelLeftClose,
  PanelLeft,
  Compass,
  X
} from 'lucide-react';
import { FFF_TEAMS } from '../../data/teamsData';
import { ROLE_PROFILES_CONFIG } from '../../data/rolesData';
import { UserRole } from '../../types/ams';
import { AMS360Logo } from '../common/AMS360Logo';
import { ROLE_OBJECTIVES_DATA, RoleObjective } from '../../data/objectivesData';
import { isDashboardOnlyRole, isExampleRole } from '../../data/objectiveAccess';

export const Navbar: React.FC = () => {
  const {
    activeView,
    goBack,
    navigateTo,
    players,
    activeAlerts,
    userRole,
    setUserRole,
    roleConfig,
    selectedTeam,
    setSelectedTeamId,
    openDataSourcesModal,
    lastSyncTimestamp,
    isSidebarOpen,
    toggleSidebar,
    comments,
    openCommentsDrawer,
    notifications,
    unreadNotificationsCount,
    handleNotificationClick,
    setSelectedObjective
  } = useAMS();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPlayers = searchValue.trim()
    ? players.filter(
        (p) =>
          p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.club.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.position.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const filteredObjectives = searchValue.trim() && !isDashboardOnlyRole(userRole)
    ? (ROLE_OBJECTIVES_DATA[userRole] || ROLE_OBJECTIVES_DATA.entraineur).filter(
        (obj) =>
          obj.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          obj.subtitle.toLowerCase().includes(searchValue.toLowerCase()) ||
          obj.category.toLowerCase().includes(searchValue.toLowerCase()) ||
          obj.predictiveHighlight.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const handleRoleChange = (role: UserRole) => {
    if (isExampleRole(role)) return;
    const isDashboardRole = isDashboardOnlyRole(role);
    setUserRole(role);
    setSelectedObjective(isDashboardRole ? null : ROLE_OBJECTIVES_DATA[role]?.[0] || null);
    navigateTo(isDashboardRole ? 'dashboard' : 'accueil_objectifs');
    setProfileDropdownOpen(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-2 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs gap-1 sm:gap-3">
      {/* Left Navigation & Brand & Team Selector */}
      <div className="flex items-center gap-1 sm:gap-3 min-w-0 flex-1">
        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors border border-slate-200/90 shadow-2xs shrink-0 cursor-pointer font-bold text-xs"
          title={isSidebarOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-4 h-4 text-slate-600" />
          ) : (
            <PanelLeft className="w-4 h-4 text-blue-600" />
          )}
          <span className="hidden sm:inline">Menu</span>
        </button>

        {!isDashboardOnlyRole(userRole) && (
          <>
        {/* Home Goals Shortcut Button */}
        <button
          onClick={() => navigateTo('accueil_objectifs')}
          className={`hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border shadow-2xs shrink-0 cursor-pointer ${
            activeView === 'accueil_objectifs'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100 border-slate-200/90'
          }`}
          title="Retourner à l'accueil et aux objectifs prioritaires"
        >
          <span>Objectifs</span>
        </button>

        {/* Stratégie Shortcut Button */}
        <button
          onClick={() => navigateTo('ai_strategy')}
          className={`hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border shadow-2xs shrink-0 cursor-pointer ${
            activeView === 'ai_strategy' || activeView === 'objective_focused' || activeView.startsWith('ai_strategy_')
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100 border-slate-200/90'
          }`}
          title="Consulter Stratégie et les prévisions de l'objectif"
        >
          <span>Stratégie</span>
        </button>
          </>
        )}

        {/* Back navigation button if not on top level */}
        {activeView !== 'accueil_objectifs' && (
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/90 shadow-2xs shrink-0 cursor-pointer"
            title="Revenir à l'écran précédent"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Retour</span>
          </button>
        )}

        {/* Team Selector Dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setTeamDropdownOpen(!teamDropdownOpen)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-bold text-slate-800 transition-colors shadow-2xs cursor-pointer"
            title={selectedTeam?.name || 'France A'}
          >
            <span className="text-sm">{selectedTeam?.badge || '🇫🇷'}</span>
            <span className="hidden xl:inline font-extrabold text-blue-900 truncate max-w-[160px]">
              {selectedTeam?.name || 'France A'}
            </span>
            <ChevronDown className="hidden xl:block w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {teamDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Sélections Nationales FFF
              </div>
              <div className="space-y-1 mt-1">
                {FFF_TEAMS.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => {
                      setSelectedTeamId(team.id);
                      setTeamDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      selectedTeam?.id === team.id
                        ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                        : 'hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span>{team.badge}</span>
                      <div className="truncate">
                        <span className="block truncate font-bold">{team.name}</span>
                        <span className="text-[10px] text-slate-400 block font-normal">
                          {team.coach}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                      {team.squadCount}j
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setTeamDropdownOpen(false);
                    navigateTo('team_choice');
                  }}
                  className="w-full py-1.5 text-center text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                >
                  Vue panoramique des sélections →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Search - Universal Platform Search */}
        <div ref={searchContainerRef} className="relative hidden xl:block min-w-0 xl:w-48 2xl:w-72 shrink">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher objectif, joueur, tactique..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            />
            {searchValue.trim().length > 0 && (
              <button
                onClick={() => {
                  setSearchValue('');
                  setSearchOpen(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown with Objectives & Players */}
          {searchOpen && searchValue.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 max-h-80 overflow-y-auto space-y-2">
              {/* Objectives Results */}
              {filteredObjectives.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono font-bold text-blue-700 uppercase px-2 py-1 flex items-center justify-between border-b border-blue-50">
                    <span className="flex items-center gap-1">
                      <Compass className="w-3 h-3" />
                      <span>Objectifs Stratégiques</span>
                    </span>
                    <span>{filteredObjectives.length}</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {filteredObjectives.map((obj) => {
                      const isClickable = userRole !== 'entraineur' || obj.id === 'coach_obj_1';
                      return (
                        <button
                          key={obj.id}
                          disabled={!isClickable}
                          onClick={() => {
                            if (!isClickable) return;
                            setSelectedObjective(obj);
                            navigateTo('ai_strategy');
                            setSearchOpen(false);
                            setSearchValue('');
                          }}
                          className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                            isClickable
                              ? 'hover:bg-blue-50 cursor-pointer group'
                              : 'opacity-60 cursor-not-allowed bg-slate-50'
                          }`}
                        >
                          <span className="text-base shrink-0 mt-0.5">{obj.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <p className={`text-xs font-bold line-clamp-1 ${
                                isClickable ? 'text-slate-900 group-hover:text-blue-900' : 'text-slate-500'
                              }`}>
                                {obj.title}
                              </p>
                              {!isClickable && (
                                <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-600 shrink-0">
                                  Exemple
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 line-clamp-1 font-medium mt-0.5">
                              {obj.predictiveHighlight}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Players Results */}
              {filteredPlayers.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase px-2 py-1 flex items-center justify-between border-b border-slate-100">
                    <span>Joueurs correspondants</span>
                    <span>{filteredPlayers.length}</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {filteredPlayers.map((player) => (
                      <button
                        key={player.id}
                        onClick={() => {
                          navigateTo('joueur_360', { playerId: player.id });
                          setSearchOpen(false);
                          setSearchValue('');
                        }}
                        className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-xs text-blue-700 font-mono">
                            {player.number}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{player.name}</p>
                            <p className="text-[10px] text-slate-500 font-medium">
                              {player.position} • {player.club}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                            ★ {player.scoreGlobal}/100
                          </span>
                          {player.alert && (
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredObjectives.length === 0 && filteredPlayers.length === 0 && (
                <div className="p-4 text-xs text-slate-500 text-center">
                  Aucun résultat pour "{searchValue}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Top Actions - Protected against overlapping */}
      <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
        {/* Data Sources Hub Shortcut */}
        <button
          onClick={openDataSourcesModal}
          className="relative p-2 rounded-xl text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors border border-slate-200/80 shadow-2xs cursor-pointer group shrink-0"
          title={`Gestionnaire des flux de données (${lastSyncTimestamp})`}
        >
          <Database className="w-4 h-4 text-slate-500 group-hover:text-blue-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        {/* Collaborative Comments & Notes (PowerPoint Style) */}
        <button
          onClick={() => openCommentsDrawer()}
          className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-200/90 shadow-2xs cursor-pointer shrink-0"
          title={`Commentaires & Notes collaboratives (${comments.length})`}
        >
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <span className="hidden lg:inline text-xs font-bold">Notes</span>
          {comments.length > 0 && (
            <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-mono font-bold leading-tight shadow-2xs">
              {comments.length}
            </span>
          )}
        </button>

        {/* Alerts & Notifications Popover */}
        <div className="relative shrink-0">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/60 shadow-2xs cursor-pointer shrink-0"
            title={`${unreadNotificationsCount} notifications non lues`}
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 text-slate-900 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-black uppercase tracking-tight">Notifications Staff</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {unreadNotificationsCount} nouvelle(s)
                </span>
              </div>

              <div className="space-y-1.5 my-2 max-h-80 overflow-y-auto pr-1">
                {notifications.map((notif) => (
                  <button
                    key={notif.id}
                    onClick={() => {
                      setNotificationsOpen(false);
                      handleNotificationClick(notif);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      !notif.read
                        ? 'bg-blue-50/60 border-blue-200 hover:bg-blue-100/70'
                        : 'bg-white border-slate-100 hover:bg-slate-50 opacity-80'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        notif.type === 'mention' || notif.type === 'new_note'
                          ? 'bg-blue-600 text-white'
                          : notif.type === 'data_insertion'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {notif.type === 'mention' || notif.type === 'new_note' ? (
                        <MessageSquare className="w-3.5 h-3.5" />
                      ) : notif.type === 'data_insertion' ? (
                        <Database className="w-3.5 h-3.5" />
                      ) : (
                        <Shield className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {notif.title}
                        </span>
                        {!notif.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-snug">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[9px] text-slate-400 font-mono">
                        <span>{notif.timestamp}</span>
                        <span className="text-blue-600 font-bold hover:underline">
                          Voir la note →
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    setNotificationsOpen(false);
                    navigateTo('dashboard');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  Voir toutes les alertes du tableau de bord
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Chip & Dropdown - Switch profile seamlessly with Role prioritized */}
        <div className="relative shrink-0">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 sm:pr-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/90 transition-colors text-left group shrink-0 cursor-pointer shadow-2xs"
            title="Changer de profil métier"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-700 text-white font-black text-xs flex items-center justify-center font-mono shrink-0 shadow-2xs overflow-hidden">
              {roleConfig.avatarBadge}
            </div>
            <div className="min-w-0 hidden md:block max-w-[150px] lg:max-w-[190px]">
              <span className="text-xs font-black text-blue-950 truncate block group-hover:text-blue-700 leading-tight tracking-tight">
                {roleConfig.title}
              </span>
              <span className="text-[10.5px] text-slate-500 font-medium truncate block leading-tight mt-0.5">
                {roleConfig.userName}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-84 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100 text-slate-900">
              <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-slate-100 pb-2.5 bg-slate-50/70 rounded-xl mb-2">
                <div className="min-w-0">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block font-mono">
                    Rôle Métier Actif
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs font-black text-blue-950 truncate">
                      {roleConfig.title}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium truncate">
                      ({roleConfig.userName})
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono shrink-0">
                  EN COURS
                </span>
              </div>

              <div className="px-2.5 pt-1 pb-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono">
                Changer de Rôle Métier FFF
              </div>

              <div className="space-y-1 mt-0.5 max-h-[380px] overflow-y-auto pr-0.5">
                {(
                  [
                    'entraineur',
                    'medical',
                    'arbitrage',
                    'performance',
                    'team_manager',
                    'direction'
                  ] as UserRole[]
                ).map((roleKey) => {
                  const cfg = ROLE_PROFILES_CONFIG[roleKey];
                  const isCurrent = userRole === roleKey;
                  const isExample = isExampleRole(roleKey);

                  return (
                    <button
                      key={roleKey}
                      type="button"
                      disabled={isExample}
                      onClick={() => handleRoleChange(roleKey)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs ${
                        isExample
                          ? 'bg-slate-50 text-slate-400 border border-transparent opacity-55 cursor-not-allowed'
                          : isCurrent
                          ? 'bg-blue-50 text-blue-950 font-bold border border-blue-200 shadow-2xs'
                          : 'hover:bg-slate-50 text-slate-700 border border-transparent transition-colors cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 overflow-hidden shadow-2xs ${
                            isCurrent
                              ? 'bg-blue-700 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {cfg.avatarBadge}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-1.5">
                            <span className="block truncate font-black text-xs text-slate-900">
                              {cfg.title}
                            </span>
                            {isCurrent && (
                              <span className="text-[8px] font-mono font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                                Actif
                              </span>
                            )}
                          </div>
                          <span className="text-[10.5px] text-slate-500 block truncate font-medium mt-0.5">
                            {cfg.userName} • <span className="text-slate-400">{cfg.department}</span>
                          </span>
                        </div>
                      </div>

                      {isExample ? (
                        <span className="text-[10px] font-bold text-slate-500 shrink-0 ml-2">Exemple</span>
                      ) : isCurrent ? (
                        <Check className="w-4 h-4 text-blue-700 shrink-0 ml-2" />
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 hover:text-blue-600 shrink-0 ml-2 font-mono">
                          Basculer →
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigateTo('profil_choice');
                  }}
                  className="w-full py-1.5 text-center text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                >
                  Voir tous les profils détaillés →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

