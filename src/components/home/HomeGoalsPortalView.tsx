import React, { useState, useMemo } from 'react';
import { useAMS } from '../../context/AMSContext';
import { isStrategyObjectiveClickable } from '../../data/objectiveAccess';
import {
  CheckCircle2,
  ChevronRight,
  Compass,
  Plus
} from 'lucide-react';
import { ROLE_OBJECTIVES_DATA, RoleObjective } from '../../data/objectivesData';
import { CreateObjectiveModal } from './CreateObjectiveModal';

interface HomeGoalsPortalViewProps {
  onSelectObjective: (objective: RoleObjective) => void;
}

export const HomeGoalsPortalView: React.FC<HomeGoalsPortalViewProps> = ({ onSelectObjective }) => {
  const {
    userRole,
    roleConfig,
    navigateTo,
    allObjectivesMap
  } = useAMS();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Get current role objectives (including custom ones)
  const filteredObjectives = useMemo(() => {
    return allObjectivesMap?.[userRole] || ROLE_OBJECTIVES_DATA[userRole] || ROLE_OBJECTIVES_DATA.entraineur;
  }, [userRole, allObjectivesMap]);

  return (
    <div className="min-h-[85vh] flex flex-col justify-between max-w-5xl mx-auto py-4 sm:py-8 px-2 sm:px-4 animate-in fade-in duration-200 select-none">
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* 1. EN-TÊTE ÉPURÉ & ACCROCHE PERSONNALISÉE                                  */}
        {/* ========================================================================= */}
        <div className="text-center space-y-3 max-w-2xl mx-auto pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Persona Reconnu : <strong>{roleConfig.title}</strong> ({roleConfig.userName})</span>
            <button
              onClick={() => navigateTo('profil_choice')}
              className="text-blue-600 hover:text-blue-800 underline text-[11px] ml-1 font-semibold cursor-pointer"
            >
              Changer
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Bonjour {roleConfig.userName.split(' ')[0]},<br />
            <span className="text-blue-600">comment puis-je vous aider aujourd'hui ?</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            Sélectionnez un objectif stratégique pour accéder aux prévisions et recommandations décisionnelles.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3. CARTES D'OBJECTIFS STRATÉGIQUES (AVEC BOUTON CRÉER UN OBJECTIF)        */}
        {/* ========================================================================= */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-mono font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  Vos Objectifs Prioritaires Définis ({filteredObjectives.length})
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Ouvrir directement dans Stratégie
              </span>

              {/* BOUTON CRÉER UN OBJECTIF DEMANDÉ PAR L'UTILISATEUR */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer"
                title="Créer un nouvel objectif stratégique sur mesure"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Créer un objectif</span>
              </button>
            </div>
          </div>

          {/* Objectives Grid */}
          {filteredObjectives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredObjectives.map((obj, idx) => {
                const isClickable = isStrategyObjectiveClickable(userRole, obj.id);

                return (
                  <div
                    key={obj.id}
                    onClick={() => {
                      if (isClickable) {
                        onSelectObjective(obj);
                      }
                    }}
                    className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between gap-3 relative overflow-hidden ${
                      isClickable
                        ? 'group bg-white border-slate-200/90 hover:border-blue-500 shadow-xs hover:shadow-lg cursor-pointer'
                        : 'bg-slate-50/70 border-slate-200/80 cursor-default opacity-85'
                    }`}
                  >
                    {/* Title and Icon without tags */}
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0 mt-0.5">{obj.icon}</span>
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm sm:text-base font-black leading-snug ${
                            isClickable ? 'text-slate-900 group-hover:text-blue-600 transition-colors' : 'text-slate-700'
                          }`}>
                            {obj.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          {obj.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Footer action trigger */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-slate-400">Objectif #{idx + 1}</span>
                      {isClickable ? (
                        <div className="flex items-center gap-1 font-bold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform">
                          <span>Accéder à Stratégie</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <span className="text-[10.5px] font-mono font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                          Exemple indicatif • Non accessible
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Compass className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700">
                Aucun objectif défini pour ce profil
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Créer un objectif</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. FOOTER DISCRET D'ACCÈS AU DASHBOARD COMPLET & EXPLORATION              */}
      {/* ========================================================================= */}
      <div className="pt-8 text-center border-t border-slate-200/80 mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Plateforme Haute Performance FFF • Système Synchronisé</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('dashboard')}
            className="text-slate-600 hover:text-blue-700 font-bold underline cursor-pointer"
          >
            Accéder au Dashboard complet
          </button>
          <span>•</span>
          <button
            onClick={() => navigateTo('player_search')}
            className="text-slate-600 hover:text-blue-700 font-bold underline cursor-pointer"
          >
            Effectif des 24 Bleus
          </button>
        </div>
      </div>

      {/* Modal de création d'objectif */}
      <CreateObjectiveModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onObjectiveCreated={(newObj) => {
          onSelectObjective(newObj);
        }}
      />
    </div>
  );
};
