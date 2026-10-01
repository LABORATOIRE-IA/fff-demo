import React from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  LayoutDashboard,
  Users,
  Swords,
  Bot,
  LogOut,
  Stethoscope,
  ChevronRight,
  Compass,
  X,
  Sparkles,
  Award
} from 'lucide-react';
import { isDashboardOnlyRole } from '../../data/objectiveAccess';

export const Sidebar: React.FC = () => {
  const {
    activeView,
    navigateTo,
    roleConfig,
    userRole,
    selectedTeam,
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar
  } = useAMS();

  // If sidebar is closed, render nothing as requested (hidden by default)
  if (!isSidebarOpen) {
    return null;
  }

  const isArbitrage = userRole === 'arbitrage';

  const allNavItems = [
    {
      id: 'accueil_objectifs' as const,
      label: 'Accueil & Objectifs',
      icon: Compass,
      active: activeView === 'accueil_objectifs',
      onClick: () => {
        navigateTo(isDashboardOnlyRole(userRole) ? 'dashboard' : 'accueil_objectifs');
        setIsSidebarOpen(false);
      }
    },
    {
      id: 'ai_strategy' as const,
      label: 'Stratégie',
      icon: Sparkles,
      active:
        activeView === 'ai_strategy' ||
        activeView === 'objective_focused' ||
        activeView === 'ai_strategy_week' ||
        activeView === 'ai_strategy_player_plan' ||
        activeView === 'ai_strategy_medical_match' ||
        activeView === 'ai_strategy_medical_agenda' ||
        activeView === 'ai_strategy_medical_mbappe' ||
        activeView === 'ai_strategy_referee_prep' ||
        activeView === 'ai_strategy_referee_debrief' ||
        activeView === 'ai_strategy_team_manager_todo' ||
        activeView === 'ai_strategy_team_manager_overview',
      onClick: () => {
        navigateTo('ai_strategy');
        setIsSidebarOpen(false);
      }
    },
    {
      id: 'dashboard' as const,
      label: isArbitrage ? 'Dashboard Arbitrage' : 'Dashboard Général',
      icon: LayoutDashboard,
      active: activeView === 'dashboard',
      onClick: () => {
        navigateTo('dashboard');
        setIsSidebarOpen(false);
      }
    },
    {
      id: 'player_search' as const,
      label: isArbitrage ? 'Corps Arbitral' : 'Effectif & Prédictif',
      icon: Users,
      active: activeView === 'player_search' || activeView === 'joueur_360',
      onClick: () => {
        navigateTo('player_search');
        setIsSidebarOpen(false);
      }
    },
    {
      id: 'suivi_medical' as const,
      label: 'Suivi Médical FFF',
      icon: Stethoscope,
      active: activeView === 'suivi_medical',
      onClick: () => {
        navigateTo('suivi_medical');
        setIsSidebarOpen(false);
      }
    },
    {
      id: 'matchs_entrainements' as const,
      label: isArbitrage ? 'Désignations & Tests' : 'Matchs & Séances',
      icon: Swords,
      active:
        activeView === 'matchs_entrainements' ||
        activeView === 'detail_match' ||
        activeView === 'detail_training',
      onClick: () => {
        navigateTo('matchs_entrainements');
        setIsSidebarOpen(false);
      }
    },
    {
      id: 'assistant' as const,
      label: 'Assistant IA Bleu',
      icon: Bot,
      active: activeView === 'assistant',
      onClick: () => {
        navigateTo('assistant');
        setIsSidebarOpen(false);
      }
    }
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className="fixed inset-0 bg-slate-950/30 backdrop-blur-[1px] z-40 transition-opacity animate-in fade-in"
      />

      {/* Slide-over Menu Drawer */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-white text-slate-900 border-r border-slate-200 flex flex-col justify-between z-50 shadow-xl animate-in slide-in-from-left duration-200 select-none">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Lockup Header with Close button */}
          <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between gap-2">
            <button
              onClick={() => {
                navigateTo(isDashboardOnlyRole(userRole) ? 'dashboard' : 'accueil_objectifs');
                setIsSidebarOpen(false);
              }}
              className="text-left group cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-3 min-w-0 flex-1"
              title="Retour à l'accueil FFF"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/fr/a/ab/Logo_F%C3%A9d%C3%A9ration_Fran%C3%A7aise_Football_2022.svg"
                alt="Fédération Française de Football"
                className="w-10 h-12 object-contain shrink-0"
              />
              <span className="min-w-0">
                <span className="block text-sm font-bold text-blue-950">FFF</span>
                <span className="block text-[11px] text-slate-500">AMS 360</span>
              </span>
            </button>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Fermer le menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Selected Team & User Role Pill */}
          <button
            onClick={() => {
              navigateTo('profil_choice');
              setIsSidebarOpen(false);
            }}
            className="mx-3 mt-3.5 p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-500 flex items-center justify-between text-left transition-all group cursor-pointer"
            title="Changer de profil ou d'équipe"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xs text-white shadow-2xs shrink-0 group-hover:scale-105 transition-transform font-mono">
                {roleConfig.avatarBadge}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-black text-slate-900 block truncate leading-tight group-hover:text-blue-600">
                  {roleConfig.userName}
                </span>
                <span className="text-[10px] font-mono text-slate-500 block truncate">
                  {roleConfig.title} ▾
                </span>
              </div>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
              LIVE
            </span>
          </button>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1.5 mt-2">
            <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">
              Navigation FFF
            </div>

            {allNavItems
              .filter((item) => !isDashboardOnlyRole(userRole) || (item.id !== 'accueil_objectifs' && item.id !== 'ai_strategy'))
              .map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left group cursor-pointer ${
                    item.active
                      ? 'bg-blue-600 text-white shadow-xs border border-blue-600'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-transparent'
                  }`}
                >
                  <span className="truncate flex-1">{item.label}</span>
                  {item.active && <ChevronRight className="w-3.5 h-3.5 text-white shrink-0" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer with logout */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={() => {
              navigateTo('connexion');
              setIsSidebarOpen(false);
            }}
            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200 cursor-pointer"
            title="Se déconnecter"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};
