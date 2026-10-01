import React, { useState } from 'react';
import { Player } from '../../types/ams';
import {
  X,
  Award,
  Calendar,
  CheckCircle2,
  TrendingUp,
  MapPin,
  UserCheck,
  Zap,
  Activity,
  Download,
  Shield,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { getPlayerDetectionHistory } from '../../data/detectionData';

interface PlayerDetectionHistoryModalProps {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
}

export const PlayerDetectionHistoryModal: React.FC<PlayerDetectionHistoryModalProps> = ({
  player,
  isOpen,
  onClose
}) => {
  const history = getPlayerDetectionHistory(player.id);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(history.length - 1);

  if (!isOpen) return null;

  const currentMilestone = history[selectedMilestoneIndex];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white flex items-start justify-between relative overflow-hidden shrink-0">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 font-mono text-[10px] font-bold border border-blue-400/40 uppercase tracking-widest">
                Parcours FFF Haute Performance
              </span>
              <span className="text-amber-300 font-bold text-xs tracking-widest">★★</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2.5">
              <span>Historique & Détection FFF :</span>
              <span className="text-blue-300">{player.name}</span>
              <span className="text-amber-400 font-mono">#{player.number}</span>
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/80 font-medium mt-1">
              Trajectoire complète depuis les tests de détection U13, Pôle Espoirs Clairefontaine jusqu’à l’Équipe de France A
            </p>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer border border-white/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter Historique</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/15 rounded-xl transition-colors cursor-pointer"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top KPI Progression Ribbon */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              Évolution VMA
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                15.8 → 19.8
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-600">+25.3%</span>
            </div>
            <span className="text-[10px] text-slate-500">De 13 ans à Aujourd'hui</span>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              Sprint 30m
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                4.22s → 3.72s
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-600">-0.50s</span>
            </div>
            <span className="text-[10px] text-slate-500">Top 3% national</span>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              Vitesse Max GPS
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                27.4 → 34.8
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-600">+7.4 km/h</span>
            </div>
            <span className="text-[10px] text-slate-500">Capteurs Catapult 10 Hz</span>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              Récup. Cardiaque (HRR)
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                34 → 58
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-600">bpm/min</span>
            </div>
            <span className="text-[10px] text-slate-500">Capacité aérobie élite</span>
          </div>
        </div>

        {/* Modal Body: Timeline on left, Details on right */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Timeline Navigation Column (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
              <span>Étapes du Cursus FFF</span>
              <span className="text-blue-600 font-bold">{history.length} Jalons Clés</span>
            </div>

            <div className="space-y-2">
              {history.map((m, idx) => {
                const isSelected = idx === selectedMilestoneIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedMilestoneIndex(idx)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-500 shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono font-bold text-blue-700 bg-white px-1.5 py-0.2 rounded border border-blue-200">
                          {m.year}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">({m.age})</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700">
                          {m.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-black text-slate-900 truncate">
                        {m.stageTitle}
                      </h4>
                      <div className="text-[10px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{m.location}</span>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milestone Details Card (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              {/* Milestone Header */}
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono text-xs font-black">
                      {currentMilestone.year}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {currentMilestone.age}
                    </span>
                    <span className="text-xs font-bold text-blue-700">
                      • {currentMilestone.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {currentMilestone.stageTitle}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{currentMilestone.structure} — {currentMilestone.location}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                    Statut / Verdict
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 inline-block mt-0.5">
                    {currentMilestone.verdict}
                  </span>
                </div>
              </div>

              {/* Scout Report Quote Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>Rapport d'Évaluation Technique FFF</span>
                </span>
                <p className="text-xs text-slate-800 leading-relaxed italic font-serif">
                  « {currentMilestone.scoutReport} »
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">
                    Évaluateur référent : <strong className="text-slate-900">{currentMilestone.keyEvaluator}</strong>
                  </span>
                  <span className="text-blue-700 font-bold font-mono">
                    {currentMilestone.evaluatorRole}
                  </span>
                </div>
              </div>

              {/* Physical Benchmarks at this specific stage */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Données Physiologiques Mesurées lors de cette Étape
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 text-center">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">
                      VMA
                    </span>
                    <span className="text-sm font-black text-blue-700 font-mono">
                      {currentMilestone.physicalBenchmarks.vma || '—'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 text-center">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">
                      Sprint 30m
                    </span>
                    <span className="text-sm font-black text-blue-700 font-mono">
                      {currentMilestone.physicalBenchmarks.vitesse30m || '—'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 text-center">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">
                      Vitesse Max
                    </span>
                    <span className="text-sm font-black text-blue-700 font-mono">
                      {currentMilestone.physicalBenchmarks.vitesseMax || '—'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">
                      Détente Verticale
                    </span>
                    <span className="text-sm font-black text-slate-800 font-mono">
                      {currentMilestone.physicalBenchmarks.detenteVerticaleCm} cm
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">
                      Masse Grasse
                    </span>
                    <span className="text-sm font-black text-emerald-700 font-mono">
                      {currentMilestone.physicalBenchmarks.masseGrassePercent}%
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">
                      Indice HRR (60s)
                    </span>
                    <span className="text-sm font-black text-slate-800 font-mono">
                      {currentMilestone.physicalBenchmarks.indiceHRR || '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Bilan sportif étape :</span>
                </span>
                <span className="font-mono text-emerald-800">{currentMilestone.keyStats}</span>
              </div>
            </div>

            {/* Bottom Certification Badge */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Archive certifiée Direction Technique Nationale (DTN FFF)</span>
              </span>
              <span className="font-mono text-slate-500">Réf : DETECT-FR-2013-087</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            Jumeau Numérique AMS 360 • Données historiques consolidées
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Fermer le parcours
          </button>
        </div>
      </div>
    </div>
  );
};
