import React from 'react';
import { Player } from '../../types/ams';
import { CockpitPositionProfile } from '../../data/playerCockpitData';
import { CockpitRadarChart } from './CockpitRadarChart';
import { CockpitPitchHeatmap } from './CockpitPitchHeatmap';

interface CockpitTacticalRowProps {
  player: Player;
  cockpitData: CockpitPositionProfile;
}

export const CockpitTacticalRow: React.FC<CockpitTacticalRowProps> = ({ player, cockpitData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
      {/* 1. Profil de Performance (Radar Chart) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
                6 axes clés
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Profil de performance
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Radar multidimensionnel calibré poste France A
              </p>
            </div>
          </div>

          <div className="py-2 flex items-center justify-center">
            <CockpitRadarChart axes={cockpitData.radarAxes} playerName={player.name} />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            <span className="font-semibold text-slate-700">{player.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
            <span>Médiane poste FFF</span>
          </div>
        </div>
      </div>

      {/* 2. Heat Map / Zones d'influence (Terrain de football vu du dessus) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase font-mono">
                Temps réel
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Zones d'influence (Heat map)
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Cartographie spatiale GPS en match & entraînement
              </p>
            </div>
          </div>

          <div className="py-1">
            <CockpitPitchHeatmap player={player} />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <span>Capteurs Catapult 10 Hz</span>
          <span className="font-semibold text-slate-700">Rôle : {cockpitData.roleLabel}</span>
        </div>
      </div>

      {/* 3. Statistiques récentes & Benchmarks */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 uppercase font-mono">
                Benchmarks
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Statistiques récentes & Benchmarks
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Comparatif joueur vs médiane du poste
              </p>
            </div>
          </div>

          {/* Clean table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2 pr-2">Indicateur</th>
                  <th className="py-2 px-1 text-center">Actuel</th>
                  <th className="py-2 px-1 text-center">Moy.</th>
                  <th className="py-2 px-1 text-center">Réf.</th>
                  <th className="py-2 pl-1 text-right">Écart</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {cockpitData.statComparisons.map((stat, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2 pr-2 font-medium text-slate-800 text-[11px]">
                      {stat.name}
                    </td>
                    <td className="py-2 px-1 text-center font-bold text-slate-900 font-mono text-[11px]">
                      {stat.current}
                    </td>
                    <td className="py-2 px-1 text-center text-slate-500 font-mono text-[11px]">
                      {stat.personalAverage}
                    </td>
                    <td className="py-2 px-1 text-center text-slate-400 font-mono text-[11px]">
                      {stat.benchmark}
                    </td>
                    <td className="py-2 pl-1 text-right font-mono text-[11px] font-bold">
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded text-[10px] border ${
                          stat.isPositive
                            ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                            : 'text-amber-700 bg-amber-50 border-amber-200'
                        }`}
                      >
                        {stat.diff}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <span>Source : Données officielles UEFA & FFF</span>
          <span className="font-semibold text-slate-600">Match J-1</span>
        </div>
      </div>
    </div>
  );
};

// Also export as CockpitRightColumn for backwards compatibility
export const CockpitRightColumn = CockpitTacticalRow;
export default CockpitTacticalRow;
