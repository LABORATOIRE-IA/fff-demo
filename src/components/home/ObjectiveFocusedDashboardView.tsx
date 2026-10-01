import React from 'react';
import { useAMS } from '../../context/AMSContext';
import { RoleObjective } from '../../data/objectivesData';
import { PlayerHeadshot } from '../common/PlayerHeadshot';
import {
  ArrowLeft,
  Sparkles,
  Shield,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  UserCheck,
  Zap,
  Activity,
  Calendar,
  Layers,
  ChevronRight,
  Sliders,
  FileText,
  Clock
} from 'lucide-react';

interface ObjectiveFocusedDashboardViewProps {
  objective: RoleObjective;
  onBackToGoals: () => void;
}

export const ObjectiveFocusedDashboardView: React.FC<ObjectiveFocusedDashboardViewProps> = ({
  objective,
  onBackToGoals
}) => {
  const { navigateTo, players, roleConfig } = useAMS();

  const targetPlayer = players.find((p) => p.id === (objective.targetPlayerId || 'mbappe')) || players[0];

  return (
    <div className="space-y-5 animate-in fade-in duration-200 select-none pb-12 max-w-6xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER DU DASHBOARD CIBLÉ SUR L'OBJECTIF                           */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onBackToGoals}
              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tous les objectifs</span>
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              {objective.category}
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              {objective.badge}
            </span>
          </div>

          <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <span>{objective.icon}</span>
            <span>{objective.title}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {objective.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
          <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-2.5 text-center min-w-[110px]">
            <span className="text-[9px] font-mono uppercase font-bold text-blue-800 block">
              Confiance IA
            </span>
            <span className="text-xl font-black text-blue-700 font-mono">
              {objective.confidenceScore}%
            </span>
          </div>

          <button
            onClick={() => {
              if (objective.targetPlayerId) {
                navigateTo('joueur_360', { playerId: objective.targetPlayerId, playerTab: 'predictif' });
              } else {
                navigateTo('dashboard');
              }
            }}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{objective.actionButtonLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE PRÉDICTIVE & PRÉVISIONS MAJEURES MISES EN AVANT               */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-slate-950 via-[#091C3E] to-slate-950 rounded-3xl p-5 sm:p-6 border border-blue-500/40 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>RÉPONSE DIRECTE DU MOTEUR PRÉDICTIF FFF</span>
        </div>

        <p className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed max-w-4xl">
          « {objective.predictiveHighlight} »
        </p>

        <p className="text-xs sm:text-sm text-blue-200/90 font-medium leading-relaxed">
          {objective.shortSummary}
        </p>

        {/* 3 Major Forecast Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {objective.forecasts.map((fc, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-blue-200">
                <span>{fc.label}</span>
                <span className="font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {fc.trend}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white">
                {fc.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. RECOMMANDATIONS OPÉRATIONNELLES DU STAFF & ACTIONS À CONDUIRE          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left (7 cols): Recommandations spécifiques */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-black uppercase tracking-tight text-slate-900">
                Recommandations Rédigées pour le Staff
              </h2>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
              Actionnable Immédiatement
            </span>
          </div>

          <div className="space-y-2.5">
            {objective.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Pour {rec.actor}</span>
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      rec.urgency === 'critique'
                        ? 'bg-rose-100 text-rose-800'
                        : rec.urgency === 'haute'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    Priorité {rec.urgency}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {rec.action}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              Voulez-vous simuler l'impact d'un changement de temps de jeu ?
            </span>
            <button
              onClick={() => navigateTo('joueur_360', { playerId: targetPlayer.id, playerTab: 'predictif' })}
              className="text-blue-700 hover:text-blue-900 font-bold underline shrink-0 cursor-pointer"
            >
              Lancer la simulation →
            </button>
          </div>
        </div>

        {/* Right (5 cols): Métriques Clés & Focus Joueur */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-black uppercase tracking-tight text-slate-900">
                  Indicateurs Clés Associés
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Live FFF
              </span>
            </div>

            <div className="space-y-2">
              {objective.keyMetrics.map((km, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{km.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{km.subtext}</span>
                  </div>
                  <span className="text-sm font-black text-blue-900 font-mono">
                    {km.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Target Player Card */}
            {objective.targetPlayerId && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800 block">
                  Joueur Clé Cerné par l'Objectif :
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-700 text-white font-bold flex items-center justify-center font-mono overflow-hidden">
                      <PlayerHeadshot name={targetPlayer.name} fallbackUrl={targetPlayer.avatarUrl} className="w-full h-full rounded-lg" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-900 block">{targetPlayer.name}</span>
                      <span className="text-[10px] text-slate-500">{targetPlayer.position} • {targetPlayer.club}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('joueur_360', { playerId: targetPlayer.id, playerTab: 'predictif' })}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-[11px] font-black shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>⚡ Prédictif</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={onBackToGoals}
              className="text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
            >
              ← Retour aux objectifs
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
            >
              Voir le dashboard complet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
