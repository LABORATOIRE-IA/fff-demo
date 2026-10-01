import React from 'react';
import { Player } from '../../types/ams';
import { getPlayerSectionDetails, SectionDetailInfo, SectionMetricItem } from '../../data/playerCockpitData';
import {
  X,
  Zap,
  TrendingUp,
  Heart,
  Moon,
  Activity,
  ArrowRight,
  TrendingDown,
  Minus,
  Shield
} from 'lucide-react';
import { useAMS } from '../../context/AMSContext';

export type CockpitDetailSection =
  | 'physique'
  | 'charge'
  | 'sante'
  | 'recuperation'
  | 'performance'
  | 'tactique'
  | 'forme'
  | 'technique'
  | 'mental';

interface CockpitSectionDetailModalProps {
  player: Player;
  activeSection: CockpitDetailSection | null;
  onClose: () => void;
  onSelectSection: (section: CockpitDetailSection) => void;
}

export const CockpitSectionDetailModal: React.FC<CockpitSectionDetailModalProps> = ({
  player,
  activeSection,
  onClose,
  onSelectSection
}) => {
  const { setPlayerTab } = useAMS();

  if (!activeSection) return null;

  const detailInfo: SectionDetailInfo = getPlayerSectionDetails(player, activeSection);

  const sectionsList: Array<{
    id: CockpitDetailSection;
    label: string;
    icon: any;
    score: number;
  }> = [
    { id: 'charge', label: 'Charge & GPS', icon: Zap, score: player.dimensions.entrainement.score },
    { id: 'forme', label: 'Forme du moment', icon: Activity, score: Math.round(player.dimensions.performance.score * 0.5 + player.dimensions.recuperation.score * 0.5 + 4) },
    { id: 'recuperation', label: 'Récupération', icon: Moon, score: player.dimensions.recuperation.score },
    { id: 'sante', label: 'Santé & Intégrité', icon: Heart, score: player.dimensions.sante.score },
    { id: 'physique', label: 'Vitesse & Physique', icon: TrendingUp, score: player.dimensions.physique.score },
    { id: 'tactique', label: 'Efficacité Tactique', icon: Shield, score: 81 },
    { id: 'technique', label: 'Maîtrise Technique', icon: Activity, score: 87 },
    { id: 'mental', label: 'Résilience Mentale', icon: Heart, score: 85 }
  ];

  const handleOpenFullTab = () => {
    onClose();
    if (activeSection === 'physique') setPlayerTab('physique');
    else if (activeSection === 'charge') setPlayerTab('charge');
    else if (activeSection === 'sante') setPlayerTab('sante');
    else if (activeSection === 'recuperation') setPlayerTab('recuperation');
    else if (activeSection === 'performance') setPlayerTab('matchs');
    else if (activeSection === 'tactique') setPlayerTab('heatmap');
    else setPlayerTab('vue_ensemble');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Épuré Institutionnel FFF */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-lg text-blue-300 font-mono">
              {player.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-blue-300 font-bold uppercase tracking-wider">
                  {player.name}
                </span>
                <span className="text-[10px] text-slate-300">•</span>
                <span className="text-[11px] text-slate-300">{player.club}</span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight mt-0.5">
                {detailInfo.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-blue-300 uppercase font-bold block">Score section</span>
              <span className="text-2xl font-black font-mono leading-none text-white">
                {detailInfo.score}
                <span className="text-xs text-blue-300 font-normal">/100</span>
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-2.5 bg-slate-100/90 border-b border-slate-200 overflow-x-auto shrink-0">
          {sectionsList.map((sec) => {
            const isSelected = activeSection === sec.id;
            const Icon = sec.icon;

            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{sec.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-400'
                  }`}
                >
                  {sec.score}
                </span>
              </button>
            );
          })}
        </div>

        {/* Contenu Épuré & Lisible : EXACTEMENT Nom, Unité, Valeur, Indicateur (+ ou - par rapport à la moyenne) */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Tableau / Cartes Minimalistes des Métriques */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
            <div className="grid grid-cols-12 bg-slate-50/90 px-4 py-2.5 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              <div className="col-span-5 sm:col-span-6">Nom</div>
              <div className="col-span-3 sm:col-span-3 text-right">Valeur & Unité</div>
              <div className="col-span-4 sm:col-span-3 text-right">Vs Moyenne poste</div>
            </div>

            <div className="divide-y divide-slate-100">
              {detailInfo.metrics.map((metric: SectionMetricItem, idx: number) => {
                const isAbove = metric.indicator === 'plus';
                const isBelow = metric.indicator === 'moins';
                const isEqual = metric.indicator === 'egal';

                return (
                  <div
                    key={idx}
                    className="grid grid-cols-12 items-center px-4 py-3 hover:bg-slate-50/60 transition-colors"
                  >
                    {/* 1. NOM DE LA MÉTRIQUE */}
                    <div className="col-span-5 sm:col-span-6 pr-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 block truncate">
                        {metric.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Moyenne : {metric.benchmark} {metric.unit}
                      </span>
                    </div>

                    {/* 2. VALEUR ET UNITÉ */}
                    <div className="col-span-3 sm:col-span-3 text-right">
                      <span className="text-sm sm:text-base font-black text-slate-900 font-mono">
                        {metric.value}
                      </span>{' '}
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        {metric.unit}
                      </span>
                    </div>

                    {/* 3. INDICATEUR PAR RAPPORT À LA MOYENNE (PLUS OU MOINS) */}
                    <div className="col-span-4 sm:col-span-3 flex items-center justify-end gap-1.5 pl-2">
                      {isAbove && (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono font-bold ${
                            metric.isPositive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{metric.diff}</span>
                        </span>
                      )}

                      {isBelow && (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono font-bold ${
                            metric.isPositive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          <TrendingDown className="w-3.5 h-3.5" />
                          <span>{metric.diff}</span>
                        </span>
                      )}

                      {isEqual && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <Minus className="w-3.5 h-3.5" />
                          <span>Moyenne</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Synthèse Staff Simple */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Synthèse DTN :</span>
            <span className="text-right truncate ml-2 font-medium">{detailInfo.staffRecommendation}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Fermer
          </button>

          <button
            onClick={handleOpenFullTab}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <span>Ouvrir l'onglet dédié {detailInfo.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
