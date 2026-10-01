import React from 'react';
import { Player } from '../../types/ams';
import { TacticalScenarioConfig, TacticalSlot } from '../../data/strategyData';
import { UserCheck, ShieldCheck, AlertTriangle, ArrowLeftRight, Check, Zap } from 'lucide-react';

interface TacticalPitchViewProps {
  scenario: TacticalScenarioConfig;
  slotMap: Record<string, string>; // slotId -> playerId
  allPlayers: Player[];
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string) => void;
  onOpenSubstitution?: (slotId: string) => void;
  isCustomized: boolean;
  confidenceScore?: number;
  confidenceDelta?: number;
  swapSourceSlotId?: string | null;
  onSwapSlots?: (slotIdA: string, slotIdB: string) => void;
  onCancelSwap?: () => void;
}

export const TacticalPitchView: React.FC<TacticalPitchViewProps> = ({
  scenario,
  slotMap,
  allPlayers,
  selectedSlotId,
  onSelectSlot,
  onOpenSubstitution,
  isCustomized,
  confidenceScore = 97.4,
  confidenceDelta = 0,
  swapSourceSlotId = null,
  onSwapSlots,
  onCancelSwap
}) => {
  return (
    <div className="w-full overflow-x-auto" role="region" aria-label="Terrain tactique" tabIndex={0}>
    <div className="relative w-full min-w-[560px] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] bg-gradient-to-b from-[#0e4429] via-[#0b3b23] to-[#072c1a] rounded-lg border border-emerald-800/60 overflow-hidden p-3 select-none flex flex-col justify-between">

      {/* Official Pitch Markings */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none stroke-white/40 fill-none"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
      >
        {/* Outer Boundary Line */}
        <rect x="30" y="25" width="740" height="550" rx="8" strokeWidth="2.5" />

        {/* Halfway Line */}
        <line x1="30" y1="300" x2="770" y2="300" strokeWidth="2" />

        {/* Center Circle & Dot */}
        <circle cx="400" cy="300" r="75" strokeWidth="2" />
        <circle cx="400" cy="300" r="3" className="fill-white/60" />

        {/* Top Penalty Area (Opponent Box) */}
        <rect x="250" y="25" width="300" height="110" strokeWidth="2" />
        <rect x="320" y="25" width="160" height="45" strokeWidth="1.5" />
        <circle cx="400" cy="95" r="2.5" className="fill-white/60" />
        <path d="M 345,135 A 65,65 0 0,0 455,135" strokeWidth="1.5" />

        {/* Bottom Penalty Area (France Defense Box) */}
        <rect x="250" y="465" width="300" height="110" strokeWidth="2" />
        <rect x="320" y="530" width="160" height="45" strokeWidth="1.5" />
        <circle cx="400" cy="505" r="2.5" className="fill-white/60" />
        <path d="M 345,465 A 65,65 0 0,1 455,465" strokeWidth="1.5" />

        {/* Corner Arcs */}
        <path d="M 30,45 A 20,20 0 0,0 50,25" strokeWidth="1.5" />
        <path d="M 750,25 A 20,20 0 0,0 770,45" strokeWidth="1.5" />
        <path d="M 30,555 A 20,20 0 0,1 50,575" strokeWidth="1.5" />
        <path d="M 750,575 A 20,20 0 0,1 770,555" strokeWidth="1.5" />
      </svg>

      {/* Top Banner on Pitch with Prominent Confidence Score */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-blue-950 px-1">
        <div className="flex items-center gap-2">
          {/* Prominent Score de Confiance on the composition */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-blue-200 text-blue-950">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span className="text-[10px] font-mono uppercase text-slate-600 font-bold">
              Score Confiance :
            </span>
            <span className="font-mono font-bold text-sm text-blue-900">
              {confidenceScore.toFixed(1)}%
            </span>
            {confidenceDelta !== 0 && (
              <span className="text-[10px] font-mono font-semibold text-blue-700">
                {confidenceDelta > 0 ? `+${confidenceDelta}%` : `${confidenceDelta}%`}
              </span>
            )}
          </div>

          {isCustomized && (
            <span className="hidden sm:inline-flex text-[10px] font-semibold text-white">
              Composition modifiée
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono bg-white px-2.5 py-1 rounded-lg border border-blue-200 text-slate-600">
          <span>Formation :</span>
          <span className="font-bold text-blue-900">{scenario.formation}</span>
        </div>
      </div>

      {/* Mode Permutation Banner if active */}
      {swapSourceSlotId && (
        <div className="relative z-30 mx-auto -mt-1 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg flex items-center gap-2">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Sélectionnez un autre joueur pour permuter les postes</span>
          {onCancelSwap && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancelSwap();
              }}
              className="text-[10px] underline ml-1 cursor-pointer font-bold"
            >
              Annuler
            </button>
          )}
        </div>
      )}

      {/* Interactive 11 Players Layer */}
      <div className="absolute inset-0 z-20">
        {scenario.slots.map((slot) => {
          const playerId = slotMap[slot.id] || slot.defaultPlayerId;
          const player = allPlayers.find((p) => p.id === playerId);
          if (!player) return null;

          const isSelected = selectedSlotId === slot.id;
          const isSwapSource = swapSourceSlotId === slot.id;
          const isSwapTargetCandidate = Boolean(swapSourceSlotId && swapSourceSlotId !== slot.id);
          const isAvailable = player.status === 'disponible';
          const isWarning = player.status === 'a_surveiller' || player.status === 'retour_progressif';
          const formeScore = player.dimensions?.performance?.score || player.scoreGlobal || 88;

          const handleClick = () => {
            if (swapSourceSlotId && onSwapSlots) {
              if (swapSourceSlotId === slot.id) {
                onCancelSwap?.();
              } else {
                onSwapSlots(swapSourceSlotId, slot.id);
              }
            } else {
              onSelectSlot(slot.id);
            }
          };

          return (
            <div
              key={slot.id}
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className="absolute z-20 flex flex-col items-center group cursor-pointer"
              onClick={handleClick}
            >
              {/* Tactical Token Node */}
              <div
                className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs transition-colors border-2 ${
                  isSwapSource
                    ? 'ring-2 ring-blue-600 bg-blue-50 text-blue-900 border-blue-600'
                    : isSwapTargetCandidate
                    ? 'ring-2 ring-blue-400 ring-dashed bg-white text-blue-900 border-blue-400'
                    : isSelected
                    ? 'ring-2 ring-blue-600 bg-blue-600 text-white border-white'
                    : 'bg-white text-blue-900 border-blue-300 hover:border-blue-600'
                }`}
                title={
                  swapSourceSlotId
                    ? `Cliquez pour permuter avec ${player.name}`
                    : `Cliquez pour inspecter et remplacer ${player.name} (${slot.roleName})`
                }
              >
                {/* Jersey Number */}
                <span className="font-mono text-sm drop-shadow-sm font-extrabold">
                  {player.number}
                </span>

                {/* Status dot badge */}
                <div
                  className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center ${
                    isAvailable ? 'bg-blue-600' : isWarning ? 'bg-blue-300' : 'bg-rose-500'
                  }`}
                  title={
                    isAvailable
                      ? 'Disponibilité 100% (Apte)'
                      : isWarning
                      ? 'Sous surveillance de charge'
                      : 'Indisponible'
                  }
                />

                {/* Individual Confidence / Form indicator pill */}
                <div className="absolute -bottom-1.5 px-1 py-0.2 rounded-full bg-white text-[8.5px] font-mono font-bold text-blue-900 border border-blue-200">
                  {formeScore}%
                </div>
              </div>

              {/* Player Name & Role Label Box */}
              <div
                className={`mt-1.5 px-2 py-0.5 rounded-md text-center whitespace-nowrap flex flex-col items-center leading-none border ${
                  isSwapSource
                    ? 'bg-blue-50 text-blue-900 font-bold border-blue-600'
                    : isSwapTargetCandidate
                    ? 'bg-blue-50 text-blue-900 font-bold border-blue-400'
                    : isSelected
                    ? 'bg-blue-50 text-blue-900 font-bold border-blue-600'
                    : 'bg-white text-slate-800 font-semibold border-slate-200 group-hover:border-blue-400'
                }`}
              >
                <span className="text-[10px] sm:text-[10.5px] tracking-tight truncate max-w-[90px]">
                  {isSwapTargetCandidate ? `⇄ ${player.lastName || player.name.split(' ').pop()}` : (player.lastName || player.name.split(' ').pop())}
                </span>
                <span className="text-[8px] font-mono text-slate-500 uppercase font-semibold">
                  {slot.roleCode}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Direction Banner */}
      <div className="relative z-10 flex items-center justify-between text-white/80 text-[10px] px-2 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>Ligne de but France • Défense</span>
        </div>
        <span className="text-white/70">
          {swapSourceSlotId ? "Cliquez sur un coéquipier pour échanger les postes" : "Cliquez sur un joueur pour le remplacer ou changer sa position"}
        </span>
      </div>
    </div>
    </div>
  );
};
