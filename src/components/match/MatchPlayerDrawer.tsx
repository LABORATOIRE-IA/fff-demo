import React from 'react';
import { useAMS } from '../../context/AMSContext';
import { MatchPlayerStat } from '../../types/ams';
import {
  X,
  ArrowRight,
  TrendingUp,
  Activity,
  Zap,
  Shield,
  Gauge,
  Trophy,
  Target
} from 'lucide-react';

interface MatchPlayerDrawerProps {
  playerStat: MatchPlayerStat | null;
  onClose: () => void;
  matchScore: string;
}

export const MatchPlayerDrawer: React.FC<MatchPlayerDrawerProps> = ({
  playerStat,
  onClose,
  matchScore
}) => {
  const { players, navigateTo } = useAMS();

  if (!playerStat) return null;

  const player = players.find((p) => p.id === playerStat.playerId);
  if (!player) return null;

  const isGK = player.position === 'Gardien';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shadow-xs ${
                isGK ? 'bg-amber-400 text-slate-950' : 'bg-blue-700 text-white'
              }`}
            >
              {player.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900">{player.name}</h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5 py-0.5 bg-slate-200/60 rounded">
                  {playerStat.positionName}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Performance Match • {matchScore} • {playerStat.minutes}' jouées
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Note du match & Impact global */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] text-blue-200 uppercase tracking-wider font-bold block">
                Évaluation Staff & Algorithme FFF
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black font-mono leading-none">
                  {playerStat.rating}
                </span>
                <span className="text-xs text-blue-300 font-mono">/ 10</span>
                <span className="text-[11px] text-emerald-400 font-semibold ml-2">
                  +0.4 vs moyenne de saison
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {playerStat.rating >= 8.0
                  ? 'Prestation de très haut niveau, impact déterminant.'
                  : 'Prestation solide, respect des consignes tactiques du sélectionneur.'}
              </p>
            </div>

            <div className="text-center px-4 py-2 rounded-xl bg-white/10 border border-white/10 shrink-0">
              <span className="text-[10px] text-blue-200 uppercase block">Temps de jeu</span>
              <span className="text-xl font-bold font-mono">{playerStat.minutes}'</span>
            </div>
          </div>

          {/* Comparaisons avec référence personnelle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-blue-600" />
                <span>Performance vs Référence personnelle</span>
              </h4>
              <span className="text-[10px] font-mono text-slate-400">Base AMS 360</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Distance */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 block">Distance totale</span>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-lg font-black font-mono text-slate-900">
                    {playerStat.distanceKm} km
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    +4 % vs moy.
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Moyenne perso : {(playerStat.distanceKm * 0.96).toFixed(1)} km
                </span>
              </div>

              {/* Vitesse Max */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 block">Vitesse max</span>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-lg font-black font-mono text-slate-900">
                    {playerStat.maxSpeedKmH || (isGK ? 28.4 : 33.6)} km/h
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    +1.2 km/h
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Moyenne perso : {(isGK ? 27.2 : 32.4)} km/h
                </span>
              </div>

              {/* Sprints */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 block">Sprints haute intensité</span>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-lg font-black font-mono text-slate-900">
                    {playerStat.sprints}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    +8 % vs moy.
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Moyenne perso : {Math.max(1, Math.round(playerStat.sprints * 0.92))}
                </span>
              </div>

              {/* Passes réussies */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 block">Passes réussies</span>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-lg font-black font-mono text-slate-900">
                    {playerStat.passesAccuracy}%
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    +3 pts
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  {playerStat.passes} passes tentées au total
                </span>
              </div>
            </div>
          </div>

          {/* DÉTAIL TECHNIQUE / ANALYTIQUE */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-600" />
              <span>Actions de jeu & Duels</span>
            </h4>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Passes progressives (vers l'avant)</span>
                <span className="font-mono font-bold text-slate-900">
                  {playerStat.progressivePasses || (isGK ? 8 : 12)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Duels gagnés</span>
                <span className="font-mono font-bold text-slate-900">
                  {playerStat.duelsWon} / {playerStat.duelsTotal || (playerStat.duelsWon + 2)}
                  <span className="text-[10px] text-emerald-600 ml-1">
                    ({Math.round((playerStat.duelsWon / (playerStat.duelsTotal || (playerStat.duelsWon + 2))) * 100)}%)
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Ballons récupérés</span>
                <span className="font-mono font-bold text-slate-900">
                  {playerStat.recoveries || (isGK ? 11 : 6)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Occasions créées / Passes clés</span>
                <span className="font-mono font-bold text-slate-900">
                  {playerStat.chancesCreated || (playerStat.assists ? playerStat.assists + 1 : 1)}
                </span>
              </div>
              {isGK && (
                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-600">Arrêts décisifs</span>
                  <span className="font-mono font-bold text-blue-700">
                    {playerStat.saves || 4} arrêts
                  </span>
                </div>
              )}
              {playerStat.goals && playerStat.goals > 0 && (
                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-600">Buts marqués</span>
                  <span className="font-mono font-bold text-emerald-700">
                    ⚽ {playerStat.goals}
                  </span>
                </div>
              )}
              {playerStat.assists && playerStat.assists > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Passes décisives</span>
                  <span className="font-mono font-bold text-blue-700">
                    🎯 {playerStat.assists}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Link to Joueur 360 */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Fiche athlétique & médicale
          </div>
          <button
            onClick={() => {
              onClose();
              navigateTo('joueur_360', { playerId: player.id });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <span>Voir Joueur 360</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
