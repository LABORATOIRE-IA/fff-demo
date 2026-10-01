import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  FileCheck,
  Shield,
  Activity
} from 'lucide-react';
import { RassemblementStage } from '../../types/ams';
import { DataActionBar } from '../layout/DataActionBar';

export const RassemblementDetailView: React.FC = () => {
  const {
    rassemblement,
    goBack,
    navigateTo,
    players,
    activeAlerts,
    openPlayerDrawer
  } = useAMS();

  const [activeStageKey, setActiveStageKey] = useState<'pre' | 'rassemblement' | 'post' | 'suivi'>('pre');

  const currentStage =
    rassemblement.stages.find((s) => s.key === activeStageKey) || rassemblement.stages[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <DataActionBar
              scope="rassemblement"
              customImportLabel="Importer"
              customExportLabel="Exporter Bilan"
            />
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200 shrink-0">
              Compte à rebours : J-{rassemblement.daysToStart}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {rassemblement.selection}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">{rassemblement.dates}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {rassemblement.name}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Cycle complet d'un rassemblement international à Clairefontaine.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[100px]">
              <span className="text-[10px] text-slate-400 uppercase font-medium block">
                Convoqués
              </span>
              <span className="text-lg font-black text-slate-900 font-mono">
                {rassemblement.squadCount}
              </span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center min-w-[100px]">
              <span className="text-[10px] text-amber-700 uppercase font-medium block">
                Incertitudes
              </span>
              <span className="text-lg font-black text-amber-800 font-mono">
                {activeAlerts.length}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Connected Stages Stepper (Matching Architecture Brief) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          {rassemblement.stages.map((st, idx) => {
            const isSelected = activeStageKey === st.key;

            return (
              <button
                key={st.key}
                onClick={() => setActiveStageKey(st.key)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-600/20 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                    Étape {idx + 1} • {st.timing}
                  </span>
                  {st.status === 'active' && (
                    <span className="text-[9px] font-bold text-white bg-blue-600 px-1.5 py-0.2 rounded-full animate-pulse">
                      Actuel
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900">{st.title}</h4>
                <span className="text-[10px] text-slate-400 block font-mono">{st.dates}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stage Checklist & Synced Data */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
              Détail opérationnel • {currentStage.timing}
            </span>
            <h2 className="text-base font-bold text-slate-900">{currentStage.title}</h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
              {currentStage.description}
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800 block">
              Checklist & Protocoles de validation :
            </span>
            {currentStage.checklist.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      item.done ? 'text-emerald-600' : 'text-slate-300'
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      item.done ? 'text-slate-900 line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {item.category}
                </span>
              </div>
            ))}
          </div>

          {/* Synced Data Categories */}
          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200/60 space-y-1.5">
            <span className="text-xs font-bold text-blue-900 block">
              Données qui alimentent automatiquement la timeline des joueurs :
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {currentStage.syncedData.map((dataTag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium text-blue-800 bg-white px-2.5 py-1 rounded-lg border border-blue-200/80 shadow-xs"
                >
                  ✓ {dataTag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Players with alerts to monitor during this stage */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Joueurs sous protocole spécifique
              </h2>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {activeAlerts.length} cas
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-3">
              Ces joueurs font l'objet d'un aménagement de séance à l'arrivée à Clairefontaine.
            </p>

            <div className="space-y-2.5">
              {activeAlerts.map(({ player, alert }) => (
                <div
                  key={player.id}
                  onClick={() => navigateTo('joueur_360', { playerId: player.id })}
                  className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-colors cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        player.position === 'Gardien'
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-blue-700 text-white'
                      }`}
                    >
                      {player.number}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {player.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {alert.label} • {alert.value}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigateTo('player_search')}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors text-center"
          >
            Consulter les 24 joueurs convoqués
          </button>
        </div>
      </div>
    </div>
  );
};
