import React from 'react';
import { TacticalScenarioConfig } from '../../data/strategyData';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import { X, HelpCircle, ShieldCheck, Activity, Zap, TrendingUp, Heart, Crosshair, Sparkles } from 'lucide-react';

interface ExplicabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: TacticalScenarioConfig;
}

export const ExplicabilityModal: React.FC<ExplicabilityModalProps> = ({
  isOpen,
  onClose,
  scenario
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-150 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white p-5 border-b border-blue-800/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-xs shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
                  Explicabilité & Modèle Décisionnel AMS 360
                </span>
              </div>
              <h3 className="text-base font-black text-white mt-0.5">
                Pourquoi l'option « {scenario.title} » ?
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Philosophy Intro */}
        <div className="p-5 bg-blue-50/60 border-b border-blue-100 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-blue-800 block">
            Principe d'Analyse AMS
          </span>
          <p className="text-xs text-blue-950 leading-relaxed font-semibold">
            Cette proposition est principalement soutenue par l’évaluation croisée des 8 dimensions athlétiques et médicales de l'effectif face aux caractéristiques de la {UPCOMING_MATCH.awayTeam}.
          </p>
        </div>

        {/* 8 Data Anchors List */}
        <div className="p-5 space-y-3 overflow-y-auto max-h-[60vh]">
          {scenario.explicabilityData.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  <span>{item.title}</span>
                </h4>
                <span className="text-[9px] font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Dimension AMS
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {item.description}
              </p>
              <div className="pt-1 text-[11px] font-mono font-bold text-blue-800 bg-white p-2 rounded-lg border border-slate-200">
                {item.dataPoint}
              </div>
            </div>
          ))}

          {/* Pillars List */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 tracking-wider block">
              Sources de données croisées :
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Disponibilité médicale',
                'Forme récente',
                'Charge 7/28 jours (ACWR)',
                'Récupération HRV',
                'Performance match',
                'Performance entraînement',
                'GPS Catapult / Sprints',
                'Historique longitudinal'
              ].map((pill, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/80"
                >
                  ✓ {pill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[10px] text-slate-400 font-mono">
            « L’AMS analyse. Le staff décide. »
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
