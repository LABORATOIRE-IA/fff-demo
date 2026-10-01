import React from 'react';
import { Player } from '../../types/ams';
import { CockpitPositionProfile } from '../../data/playerCockpitData';
import {
  Shield,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

interface CockpitLeftColumnProps {
  player: Player;
  cockpitData: CockpitPositionProfile;
}

export const CockpitLeftColumn: React.FC<CockpitLeftColumnProps> = ({ player, cockpitData }) => {
  const isGK = player.position === 'Gardien';

  return (
    <div className="space-y-4">
      {/* 1. Carte Identité & Photo Joueur */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex items-center gap-4 mb-4">
          {/* Athlete Portrait Avatar */}
          <div className="relative shrink-0">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-2xl shadow-md border-2 border-white ${
                isGK
                  ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950'
                  : 'bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white'
              }`}
            >
              <span className="font-mono">{player.number}</span>
            </div>
            {/* National Team 2 Stars Badge */}
            <div className="absolute -top-1.5 -right-1.5 bg-slate-900 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-xs border border-amber-400/40">
              ★★
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider mb-0.5">
              <span>Équipe de France A</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-semibold">{player.club}</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight truncate">
              {player.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                {player.position}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                N°{player.number}
              </span>
            </div>
          </div>
        </div>

        {/* Tactical role subtitle */}
        <p className="text-xs text-slate-600 font-medium pb-3 border-b border-slate-100 leading-relaxed">
          {cockpitData.tacticalRoleDescription}
        </p>

        {/* 2. Données biométriques & sélections */}
        <div className="grid grid-cols-2 gap-2 pt-3">
          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Âge</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{player.age} ans</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Taille</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{player.height}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Poids</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{player.weight}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Pied fort</span>
            <span className="text-sm font-bold text-slate-900">{player.preferredFoot}</span>
          </div>
        </div>

        {/* Sélections & buts */}
        <div className="mt-2 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-blue-600 font-bold uppercase block">Sélections A</span>
            <span className="text-sm font-black text-slate-900 font-mono">
              {player.caps} sélections
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-blue-600 font-bold uppercase block">
              {isGK ? 'Clean sheets' : 'Buts marqués'}
            </span>
            <span className="text-sm font-black text-slate-900 font-mono">
              {isGK ? '12 CS' : `${player.goals} buts`}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Disponibilité actuelle */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Disponibilité actuelle
          </h3>
          {player.status === 'disponible' ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Apte 100%</span>
            </span>
          ) : player.status === 'a_surveiller' ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>À surveiller</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              <Clock className="w-3 h-3 text-blue-600" />
              <span>Retour progressif</span>
            </span>
          )}
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Statut sélection</span>
            <span className="font-bold text-slate-900">Convoqué • Titularisable</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Jours consécutifs sans gêne</span>
            <span className="font-bold text-emerald-700 font-mono">
              {player.dimensions.sante.joursSansGene} jours
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Avis staff médical</span>
            <span className="font-bold text-slate-800">Feu vert médical accordé</span>
          </div>
        </div>

        {player.alert && (
          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-snug">
            <span className="font-bold block mb-0.5">Consigne staff :</span>
            {player.alert.actionNeeded}
          </div>
        )}
      </div>

      {/* 4. Progression récente */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Progression récente
          </h3>
          <span className="text-xs font-bold text-emerald-600 font-mono">
            ↗ +{player.scoreEvolution} pts (4 sem.)
          </span>
        </div>

        {/* 5-week history mini sparkline bars */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-end justify-between h-16 gap-2 px-1">
            {player.history.map((h, idx) => {
              const isCurrent = idx === player.history.length - 1;
              const heightPct = Math.max(30, (h.performance / 100) * 100);

              return (
                <div key={h.week} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[9px] font-mono text-slate-400 group-hover:text-slate-800 transition-colors">
                    {h.performance}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-md h-12 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-md transition-all ${
                        isCurrent
                          ? 'bg-blue-600 shadow-xs'
                          : 'bg-slate-300 group-hover:bg-slate-400'
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`text-[9px] font-mono ${
                      isCurrent ? 'font-bold text-blue-700' : 'text-slate-400'
                    }`}
                  >
                    {h.week}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
            <span>Évolution constante</span>
            <span className="font-semibold text-slate-700">Rang : Top 5% du groupe</span>
          </div>
        </div>
      </div>
    </div>
  );
};
