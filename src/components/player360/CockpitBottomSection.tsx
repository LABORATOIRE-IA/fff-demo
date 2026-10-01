import React, { useState } from 'react';
import { Player } from '../../types/ams';
import { CockpitPositionProfile } from '../../data/playerCockpitData';
import { useAMS } from '../../context/AMSContext';
import {
  TrendingUp,
  Activity,
  Shield,
  Zap,
  Moon,
  Heart,
  Apple,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  Database,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface CockpitBottomSectionProps {
  player: Player;
  cockpitData: CockpitPositionProfile;
  onOpenSectionDetail?: (section: 'physique' | 'charge' | 'sante' | 'recuperation' | 'performance') => void;
}

export const CockpitBottomSection: React.FC<CockpitBottomSectionProps> = ({
  player,
  cockpitData,
  onOpenSectionDetail
}) => {
  const { navigateTo, openMedicalModal, setPlayerTab } = useAMS();
  const [selectedDimension, setSelectedDimension] = useState<'all' | 'performance' | 'charge' | 'recuperation'>('all');

  const acwr = cockpitData.acwr;
  const history = player.history;
  const isGK = player.position === 'Gardien';
  const dim = player.dimensions;

  const handleSectionClick = (sec: 'physique' | 'charge' | 'sante' | 'recuperation' | 'performance') => {
    if (onOpenSectionDetail) {
      onOpenSectionDetail(sec);
    } else {
      if (sec === 'physique') setPlayerTab('physique');
      else if (sec === 'charge') setPlayerTab('charge');
      else if (sec === 'sante') openMedicalModal(player.id);
      else if (sec === 'recuperation') setPlayerTab('physique');
      else if (sec === 'performance') setPlayerTab('matchs');
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* ================= ROW 1: Évolution des performances | Charge aiguë/chronique | Récupération ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 1. Évolution des performances (Chart Multi-semaines) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Évolution des performances
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Suivi longitudinal sur les 5 dernières semaines
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px]">
              <button
                onClick={() => setSelectedDimension('all')}
                className={`px-2 py-1 font-bold rounded-md transition-colors ${
                  selectedDimension === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Global
              </button>
              <button
                onClick={() => setSelectedDimension('performance')}
                className={`px-2 py-1 font-bold rounded-md transition-colors ${
                  selectedDimension === 'performance'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Perf
              </button>
              <button
                onClick={() => setSelectedDimension('charge')}
                className={`px-2 py-1 font-bold rounded-md transition-colors ${
                  selectedDimension === 'charge'
                    ? 'bg-white text-teal-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Charge
              </button>
              <button
                onClick={() => setSelectedDimension('recuperation')}
                className={`px-2 py-1 font-bold rounded-md transition-colors ${
                  selectedDimension === 'recuperation'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Récup
              </button>
            </div>
          </div>

          {/* Dynamic SVG Multi-curve Chart */}
          <div className="relative w-full h-44 my-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 380 140" preserveAspectRatio="none">
              {/* Horizontal Reference Grid Lines */}
              {[40, 70, 100].map((val) => {
                const y = 130 - (val / 100) * 110;
                return (
                  <g key={`grid-h-${val}`}>
                    <line x1="20" y1={y} x2="370" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                    <text x="14" y={y + 3} textAnchor="end" className="text-[8px] font-mono fill-slate-300">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Threshold Band (DTN Optimal Zone: 75 to 95) */}
              <rect x="20" y="25" width="350" height="35" fill="#f8fafc" fillOpacity="0.7" />

              {/* Curve 1: Performance (Blue) */}
              {(selectedDimension === 'all' || selectedDimension === 'performance') && (
                <>
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={history
                      .map((h, i) => {
                        const x = 30 + i * 80;
                        const y = 130 - (h.performance / 100) * 110;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                  {history.map((h, i) => {
                    const x = 30 + i * 80;
                    const y = 130 - (h.performance / 100) * 110;
                    return (
                      <circle key={`p-${i}`} cx={x} cy={y} r="3.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                    );
                  })}
                </>
              )}

              {/* Curve 2: Charge (Teal) */}
              {(selectedDimension === 'all' || selectedDimension === 'charge') && (
                <>
                  <polyline
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="2"
                    strokeDasharray={selectedDimension === 'all' ? '3 3' : undefined}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={history
                      .map((h, i) => {
                        const x = 30 + i * 80;
                        const y = 130 - (h.charge / 100) * 110;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                  {history.map((h, i) => {
                    const x = 30 + i * 80;
                    const y = 130 - (h.charge / 100) * 110;
                    return (
                      <circle key={`c-${i}`} cx={x} cy={y} r="3" fill="#0d9488" stroke="#ffffff" strokeWidth="1.5" />
                    );
                  })}
                </>
              )}

              {/* Curve 3: Récupération (Emerald) */}
              {(selectedDimension === 'all' || selectedDimension === 'recuperation') && (
                <>
                  <polyline
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={history
                      .map((h, i) => {
                        const x = 30 + i * 80;
                        const y = 130 - (h.recuperation / 100) * 110;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                  {history.map((h, i) => {
                    const x = 30 + i * 80;
                    const y = 130 - (h.recuperation / 100) * 110;
                    return (
                      <circle key={`r-${i}`} cx={x} cy={y} r="3" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                    );
                  })}
                </>
              )}

              {/* Bottom Week Labels */}
              {history.map((h, i) => {
                const x = 30 + i * 80;
                return (
                  <text
                    key={`label-${i}`}
                    x={x}
                    y="138"
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-slate-400 font-bold"
                  >
                    {h.week}
                  </text>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-blue-600 rounded"></span>
                <span className="text-slate-600 font-medium">Performance</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-teal-600 rounded"></span>
                <span className="text-slate-600 font-medium">Charge</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-emerald-600 rounded"></span>
                <span className="text-slate-600 font-medium">Récupération</span>
              </span>
            </div>
            <span className="text-emerald-600 font-bold">Tendance : Ascendante</span>
          </div>
        </div>

        {/* 2. Charge aiguë / chronique (ACWR) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Charge Aiguë / Chronique (ACWR)
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  acwr.status === 'optimal'
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-amber-700 bg-amber-50 border-amber-200'
                }`}
              >
                {acwr.status === 'optimal' ? 'Ratio Optimal' : 'Zone Vigilance'}
              </span>
            </div>

            <div className="flex items-baseline gap-3 my-2">
              <span className="text-3xl font-black text-slate-900 font-mono">
                {acwr.ratio.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Zone idéale de sécurité : <span className="font-mono font-bold text-slate-800">0.8 — 1.3</span>
              </span>
            </div>

            {/* ACWR Visual Range Bar */}
            <div className="space-y-1.5 my-3">
              <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="w-[20%] bg-blue-200" title="Sous-entraînement (<0.8)"></div>
                <div className="w-[50%] bg-emerald-400" title="Zone optimale (0.8 - 1.3)"></div>
                <div className="w-[15%] bg-amber-400" title="Vigilance (1.3 - 1.5)"></div>
                <div className="w-[15%] bg-rose-400" title="Danger blessure (>1.5)"></div>
              </div>
              {/* Needle Indicator */}
              <div className="relative w-full h-2">
                <div
                  style={{
                    left: `${Math.min(95, Math.max(5, ((acwr.ratio - 0.5) / 1.2) * 100))}%`
                  }}
                  className="absolute -top-3 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-slate-900"
                ></div>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {acwr.comment}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-center">
            <div className="p-2 rounded-lg bg-slate-50">
              <span className="text-[10px] text-slate-400 block">Charge aiguë (7j)</span>
              <span className="text-xs font-bold text-slate-800 font-mono">
                {acwr.acuteLoad} UA
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50">
              <span className="text-[10px] text-slate-400 block">Charge chronique (28j)</span>
              <span className="text-xs font-bold text-slate-800 font-mono">
                {acwr.chronicLoad} UA
              </span>
            </div>
          </div>
        </div>

        {/* 3. Récupération & Marqueurs Physiologiques */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Récupération
              </h3>
              <span className="text-xs font-black text-emerald-700 font-mono">
                {player.dimensions.recuperation.score}/100
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Sommeil nocturne</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {cockpitData.recoverySummary.sommeil}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {cockpitData.recoverySummary.sommeilQualite}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Variabilité VRC (HRV)</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {cockpitData.recoverySummary.hrv} ms
                  </span>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Système parasympathique OK
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">État musculaire ressenti</span>
                  <span className="text-xs font-bold text-slate-900">
                    {cockpitData.recoverySummary.courbatures}
                  </span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Disponibilité séance :</span>
            <span className="font-bold text-emerald-600">Plein rendement</span>
          </div>
        </div>
      </div>

      {/* ================= ROW 2: Atouts principaux | Axes de progression ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Atouts Principaux (Points Forts) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Atouts principaux (Points forts)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Validés DTN
            </span>
          </div>

          <div className="space-y-3">
            {cockpitData.atouts.map((atout, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100 hover:bg-emerald-50/70 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-slate-900">{atout.title}</h4>
                  <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.2 rounded">
                    {atout.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {atout.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Axes de Progression (Points de Vigilance) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Axes de progression (Vigilance)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Protocole Staff
            </span>
          </div>

          <div className="space-y-3">
            {cockpitData.axesProgression.map((axe, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-colors ${
                  axe.severity === 'alert'
                    ? 'bg-rose-50/40 border-rose-200/80'
                    : 'bg-amber-50/40 border-amber-200/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-slate-900">{axe.title}</h4>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      axe.severity === 'alert'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {axe.severity === 'alert' ? 'Alerte' : 'Vigilance'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2 font-medium">
                  {axe.description}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 bg-white/80 px-2 py-1 rounded border border-slate-200">
                  <span className="text-blue-600">Action :</span>
                  <span>{axe.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ROW 3: Historique longitudinal | Sources de données ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Historique Longitudinal */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Historique longitudinal & Étapes clés
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Parcours fédéral, sélections et événements récents
              </p>
            </div>
            <button
              onClick={() => setPlayerTab('parcours')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Voir tout l'historique</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Timeline Events List */}
          <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {player.timeline.slice(0, 4).map((evt) => (
              <div
                key={evt.id}
                className="relative pl-8 group cursor-pointer"
                onClick={() => {
                  if (evt.relatedType === 'match' && evt.relatedId) {
                    navigateTo('detail_match', { matchId: evt.relatedId });
                  } else if (evt.relatedType === 'training' && evt.relatedId) {
                    navigateTo('detail_training', { trainingId: evt.relatedId });
                  } else if (evt.relatedType === 'rassemblement') {
                    navigateTo('detail_rassemblement');
                  }
                }}
              >
                {/* Node dot */}
                <span className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-blue-600 shadow-xs group-hover:scale-125 transition-transform"></span>

                <div className="p-3 rounded-xl bg-slate-50/80 hover:bg-white border border-slate-200/80 group-hover:border-blue-300 transition-all group-hover:shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-blue-600">
                      {evt.date}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                      {evt.source}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {evt.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {evt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sources de Données & Flux Connectés */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Sources de données & Flux
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Origine et dernière synchronisation
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% connectées
              </span>
            </div>

            <div className="space-y-2">
              {player.sources.map((src) => (
                <div
                  key={src.id}
                  className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {src.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono truncate">
                        {src.provider}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-slate-600 font-bold block">
                      {src.lastSync}
                    </span>
                    <span className="text-[9px] text-emerald-600 font-medium">
                      Certifié FFF
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Échanges FFF ↔ {player.club} actifs</span>
            <button
              onClick={() => setPlayerTab('parcours')}
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              Gérer les flux
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
