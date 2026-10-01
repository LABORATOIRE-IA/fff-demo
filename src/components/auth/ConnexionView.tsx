import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  UserCheck,
  Zap,
  Heart,
  Briefcase,
  TrendingUp,
  Award,
  ArrowRight,
  Shield,
  CheckCircle2,
  Lock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ROLE_PROFILES_CONFIG } from '../../data/rolesData';
import { FFF_TEAMS } from '../../data/teamsData';
import { UserRole } from '../../types/ams';
import { ROLE_OBJECTIVES_DATA } from '../../data/objectivesData';
import { isDashboardOnlyRole, isExampleRole } from '../../data/objectiveAccess';

interface PriorityPersonaCard {
  id: UserRole;
  title: string;
  userName: string;
  department: string;
  avatarBadge: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  email: string;
  colorScheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    activeRing: string;
    iconBg: string;
    iconColor: string;
  };
}

const PRIORITY_PERSONAS: PriorityPersonaCard[] = [
  {
    id: 'entraineur',
    title: 'Entraîneur - Sélectionneur',
    userName: 'Zinédine Zidane',
    department: 'Staff Technique & Tactique',
    avatarBadge: 'ZZ',
    tag: 'Feuilles de match & Tactique',
    icon: UserCheck,
    email: 'zinedine.zidane@fff.fr',
    colorScheme: {
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-700',
      border: 'border-blue-200',
      activeRing: 'ring-blue-600 border-blue-600 bg-blue-50/50',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white'
    }
  },
  {
    id: 'medical',
    title: 'Médecin Fédéral / Santé',
    userName: 'Dr. Franck Le Gall',
    department: 'Département Médical & Soins',
    avatarBadge: 'LG',
    tag: 'Secret Médical & RTP',
    icon: Heart,
    email: 'franck.legall@fff.fr',
    colorScheme: {
      badgeBg: 'bg-rose-50',
      badgeText: 'text-rose-700',
      border: 'border-rose-200',
      activeRing: 'ring-rose-600 border-rose-600 bg-rose-50/50',
      iconBg: 'bg-rose-600',
      iconColor: 'text-white'
    }
  },
  {
    id: 'performance',
    title: 'Responsable Performance & Data',
    userName: 'Alexandre Germain',
    department: 'Pôle Athlétique & Data Science',
    avatarBadge: 'AG',
    tag: 'Charge Catapult & ACWR',
    icon: Zap,
    email: 'alexandre.germain@fff.fr',
    colorScheme: {
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-700',
      border: 'border-amber-200',
      activeRing: 'ring-amber-600 border-amber-600 bg-amber-50/50',
      iconBg: 'bg-amber-600',
      iconColor: 'text-white'
    }
  },
  {
    id: 'team_manager',
    title: 'Team Manager & Opérations',
    userName: 'Guillaume Bureau',
    department: 'Direction des Sélections',
    avatarBadge: 'GB',
    tag: 'Rassemblement & Logistique',
    icon: Briefcase,
    email: 'guillaume.bureau@fff.fr',
    colorScheme: {
      badgeBg: 'bg-indigo-50',
      badgeText: 'text-indigo-700',
      border: 'border-indigo-200',
      activeRing: 'ring-indigo-600 border-indigo-600 bg-indigo-50/50',
      iconBg: 'bg-indigo-600',
      iconColor: 'text-white'
    }
  },
  {
    id: 'direction',
    title: 'Direction Technique (DTN)',
    userName: 'Hubert Fournier',
    department: 'Gouvernance Haute Performance',
    avatarBadge: 'HF',
    tag: 'Pyramide & Talents FFF',
    icon: TrendingUp,
    email: 'hubert.fournier@fff.fr',
    colorScheme: {
      badgeBg: 'bg-purple-50',
      badgeText: 'text-purple-700',
      border: 'border-purple-200',
      activeRing: 'ring-purple-600 border-purple-600 bg-purple-50/50',
      iconBg: 'bg-purple-600',
      iconColor: 'text-white'
    }
  },
  {
    id: 'arbitrage',
    title: 'Direction de l\'Arbitrage (DTA)',
    userName: 'Antony Gautier',
    department: 'Corps Arbitral & VAR FFF',
    avatarBadge: 'AG',
    tag: 'Désignations & Tests FIFA',
    icon: Award,
    email: 'antony.gautier@fff.fr',
    colorScheme: {
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-700',
      border: 'border-emerald-200',
      activeRing: 'ring-emerald-600 border-emerald-600 bg-emerald-50/50',
      iconBg: 'bg-emerald-600',
      iconColor: 'text-white'
    }
  }
];

export const ConnexionView: React.FC = () => {
  const { navigateTo, setUserRole, setSelectedTeamId, selectedTeamId, setSelectedObjective } = useAMS();

  const [selectedPersonaRole, setSelectedPersonaRole] = useState<UserRole | null>(null);
  const [chosenTeamId, setChosenTeamId] = useState<string>(selectedTeamId || 'france_a');

  const handleSelectPersona = (persona: PriorityPersonaCard) => {
    if (isExampleRole(persona.id)) return;
    setSelectedPersonaRole(persona.id);
  };

  const handleEnterWorkspace = (roleToEnter?: UserRole) => {
    const finalRole = roleToEnter || selectedPersonaRole || 'entraineur';
    if (isExampleRole(finalRole)) return;
    setUserRole(finalRole);
    setSelectedTeamId(chosenTeamId);
    
    // Set default objective for that role
    const defaultObj = isDashboardOnlyRole(finalRole) ? null : ROLE_OBJECTIVES_DATA[finalRole]?.[0] || null;
    setSelectedObjective(defaultObj);

    navigateTo(isDashboardOnlyRole(finalRole) ? 'dashboard' : 'accueil_objectifs');
  };

  const activePersona = PRIORITY_PERSONAS.find((p) => p.id === selectedPersonaRole);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200/80 flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & LOGO OFFICIEL FFF                                         */}
      {/* ========================================================================= */}
      <div className="max-w-5xl mx-auto w-full text-center space-y-3 pt-2">
        <div className="flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/fr/a/ab/Logo_F%C3%A9d%C3%A9ration_Fran%C3%A7aise_Football_2022.svg"
            alt="Fédération Française de Football"
            className="h-20 sm:h-24 w-auto object-contain"
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Sélectionnez votre profil professionnel
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Plateforme fédérale unifiée • Choisissez votre profil pour accéder à votre espace de travail et à ses outils dédiés.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. GRILLE CLAIRE DE TOUS LES PERSONAE PRIORITAIRES                        */}
      {/* ========================================================================= */}
      <div className="max-w-5xl mx-auto w-full my-4 space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Personae Prioritaires Définis ({PRIORITY_PERSONAS.length})</span>
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Cliquez sur un profil pour vous identifier
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {[...PRIORITY_PERSONAS].sort((first, second) => Number(isExampleRole(first.id)) - Number(isExampleRole(second.id))).map((persona) => {
            const isSelected = selectedPersonaRole === persona.id;
            const isExample = isExampleRole(persona.id);

            return (
              <div
                key={persona.id}
                onClick={isExample ? undefined : () => handleSelectPersona(persona)}
                onDoubleClick={isExample ? undefined : () => handleEnterWorkspace(persona.id)}
                aria-disabled={isExample}
                className={`p-4 sm:p-5 rounded-3xl border flex flex-col justify-between gap-3 relative shadow-xs ${
                  isExample
                    ? 'bg-slate-50 border-slate-200 opacity-55 cursor-not-allowed'
                    : isSelected
                    ? `${persona.colorScheme.activeRing} ring-2 shadow-md scale-[1.01]`
                    : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all duration-200'
                }`}
              >
                {/* Header card with Avatar badge and Role tag */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xs font-mono shadow-sm ${persona.colorScheme.iconBg} ${persona.colorScheme.iconColor}`}>
                      {persona.avatarBadge}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">
                        {persona.title}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium block">
                        {persona.userName}
                      </span>
                    </div>
                  </div>

                  {isSelected && !isExample && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Footer action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">
                    {persona.email}
                  </span>
                  {isExample ? (
                    <span className="text-[10px] font-bold text-slate-500">Profil d'exemple</span>
                  ) : (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleEnterWorkspace(persona.id);
                      }}
                      className={`px-2.5 py-1 rounded-xl font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>Entrer</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BARRE INFÉRIEURE DE CONFIRMATION ET ACCÈS INSTANTANÉ                   */}
      {/* ========================================================================= */}
      <div className="max-w-5xl mx-auto w-full bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">
              {activePersona ? (
                <span>Profil sélectionné : <strong className="text-blue-700">{activePersona.userName}</strong> ({activePersona.title})</span>
              ) : (
                <span>Veuillez sélectionner un persona ci-dessus pour continuer</span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Accès immédiat à l'écran d'accueil minimal et à vos objectifs clés
            </p>
          </div>
        </div>

        <button
          onClick={() => handleEnterWorkspace()}
          disabled={!selectedPersonaRole}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Accéder à l'Accueil & Objectifs</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
