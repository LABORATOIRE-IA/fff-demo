import React from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  UserCheck,
  Zap,
  Heart,
  Briefcase,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Check,
  Award,
  ShieldCheck
} from 'lucide-react';
import { UserRole } from '../../types/ams';
import { ROLE_PROFILES_CONFIG } from '../../data/rolesData';
import { isDashboardOnlyRole, isExampleRole } from '../../data/objectiveAccess';

interface RoleOption {
  id: UserRole;
  title: string;
  department: string;
  userName: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const ROLES: RoleOption[] = [
  {
    id: 'entraineur',
    title: 'Entraîneur / Sélectionneur',
    department: 'Staff Technique & Tactique',
    userName: 'Zinédine Zidane',
    tag: 'Tactique & Feuilles de match',
    icon: UserCheck,
    accentColor: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  {
    id: 'performance',
    title: 'Performance & Data',
    department: 'Pôle Athlétique & Data',
    userName: 'Alexandre Germain',
    tag: 'Charge Catapult & ACWR',
    icon: Zap,
    accentColor: 'text-sky-600 bg-sky-50 border-sky-200'
  },
  {
    id: 'medical',
    title: 'Médecin Fédéral / Santé',
    department: 'Département Médical FFF',
    userName: 'Dr. Franck Le Gall',
    tag: 'Secret Médical & RTP',
    icon: Heart,
    accentColor: 'text-rose-600 bg-rose-50 border-rose-200'
  },
  {
    id: 'team_manager',
    title: 'Team Manager & Logistique',
    department: 'Direction des Sélections',
    userName: 'Guillaume Bureau',
    tag: 'Convocations & Séjour',
    icon: Briefcase,
    accentColor: 'text-amber-600 bg-amber-50 border-amber-200'
  },
  {
    id: 'direction',
    title: 'Direction Technique (DTN)',
    department: 'Haute Performance Fédérale',
    userName: 'Hubert Fournier',
    tag: 'Gouvernance & Pyramide',
    icon: TrendingUp,
    accentColor: 'text-indigo-600 bg-indigo-50 border-indigo-200'
  },
  {
    id: 'arbitrage',
    title: 'Direction de l\'Arbitrage',
    department: 'DTA • FFF / FIFA',
    userName: 'Antony Gautier',
    tag: 'Corps Arbitral & VAR',
    icon: Award,
    accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-200'
  }
];

export const ProfilChoiceView: React.FC = () => {
  const { userRole, setUserRole, setSelectedObjective, navigateTo, selectedTeam } = useAMS();

  const handleSelectRole = (role: UserRole) => {
    if (isExampleRole(role)) return;
    setUserRole(role);
  };

  const handleApplyAndGoDashboard = (role?: UserRole) => {
    const selectedRole = role || userRole;
    if (isExampleRole(selectedRole)) return;
    if (role) {
      setUserRole(role);
    }
    if (isDashboardOnlyRole(selectedRole)) {
      setSelectedObjective(null);
      navigateTo('dashboard');
      return;
    }
    navigateTo('accueil_objectifs');
  };

  const currentRoleConfig = ROLE_PROFILES_CONFIG[userRole] || ROLE_PROFILES_CONFIG.entraineur;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={() => navigateTo('dashboard')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tableau de bord</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Collectif actif :</span>
          <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
            {selectedTeam?.name || 'France A'}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto w-full my-auto py-6 space-y-6">
        {/* Header Title */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Habilitations & Rôles
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Changer de profil métier
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
            Sélectionnez votre fonction pour adapter vos vues, indicateurs et flux d'alertes.
          </p>
        </div>

        {/* Roles Grid (Clean 2x3 Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[...ROLES].sort((first, second) => Number(isExampleRole(first.id)) - Number(isExampleRole(second.id))).map((role) => {
            const Icon = role.icon;
            const isSelected = userRole === role.id;
            const isExample = isExampleRole(role.id);

            return (
              <div
                key={role.id}
                onClick={isExample ? undefined : () => handleSelectRole(role.id)}
                aria-disabled={isExample}
                className={`group p-4 rounded-2xl border relative flex flex-col justify-between gap-3 ${
                  isExample
                    ? 'bg-slate-50 border-slate-200 opacity-55 cursor-not-allowed'
                    : isSelected
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs cursor-pointer transition-all'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${role.accentColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="shrink-0">
                    {isExample ? (
                      <span className="text-[10px] font-bold text-slate-500">Exemple</span>
                    ) : isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xs">
                        <Check className="w-3 h-3" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300 bg-white" />
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-mono">
                    {role.userName}
                  </span>
                  <h3 className={`text-xs font-bold text-slate-900 ${isExample ? '' : 'group-hover:text-blue-700 transition-colors'}`}>
                    {role.title}
                  </h3>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-medium truncate">
                    {role.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sleek Bottom Validation Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-600 font-medium">
              Profil actif : <strong className="text-blue-700 font-bold">{currentRoleConfig.userName}</strong> ({currentRoleConfig.title})
            </span>
          </div>

          <button
            onClick={() => handleApplyAndGoDashboard()}
            disabled={isExampleRole(userRole)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span>{isDashboardOnlyRole(userRole) ? 'Valider et ouvrir le Dashboard Général' : 'Valider et ouvrir le Dashboard'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 text-[11px] text-slate-400">
        Fédération Française de Football • AMS 360
      </div>
    </div>
  );
};
