import React, { useState } from 'react';
import { Player } from '../../types/ams';
import { TacticalSlot } from '../../data/strategyData';
import { X, ArrowLeftRight, Check, ShieldCheck, AlertTriangle, Zap, Activity } from 'lucide-react';

interface SubstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSlot: TacticalSlot | null;
  currentStarter: Player | null;
  allPlayers: Player[];
  activeStartersIds: string[];
  onConfirmSubstitution: (slotId: string, newPlayerId: string) => void;
}

export const SubstitutionModal: React.FC<SubstitutionModalProps> = ({
  isOpen,
  onClose,
  targetSlot,
  currentStarter,
  allPlayers,
  activeStartersIds,
  onConfirmSubstitution
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen || !targetSlot || !currentStarter) return null;

  // Filter candidates from the 24 squad players
  const availableCandidates = allPlayers.filter((p) => {
    // If already in starter lineup (excluding current slot), option to swap
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.position.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'gardien') return p.position.toLowerCase().includes('gardien');
    if (selectedFilter === 'defenseur') return p.position.toLowerCase().includes('défens');
    if (selectedFilter === 'milieu') return p.position.toLowerCase().includes('milieu');
    if (selectedFilter === 'attaquant') return p.position.toLowerCase().includes('attaqu');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white p-5 border-b border-blue-800/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-xs shrink-0">
              <ArrowLeftRight className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
                  Remplacement Tactique • {targetSlot.roleName} ({targetSlot.roleCode})
                </span>
              </div>
              <h3 className="text-base font-black text-white mt-0.5">
                Remplacer {currentStarter.name} (#{currentStarter.number})
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

        {/* Current Starter Recap Bar */}
        <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Titulaire actuel :</span>
            <span className="font-bold text-slate-900">
              #{currentStarter.number} {currentStarter.name} ({currentStarter.club})
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-slate-600">
              Forme: <strong>{currentStarter.dimensions?.performance?.score || 88}</strong>
            </span>
            <span className="text-slate-600">
              Dispo: <strong>{currentStarter.status === 'disponible' ? '100%' : '80%'}</strong>
            </span>
            <span className="text-slate-600">
              Recup: <strong>{currentStarter.dimensions?.recuperation?.score || 85}</strong>
            </span>
          </div>
        </div>

        {/* Search & Position Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between shrink-0 bg-white">
          {/* Position Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Tous (24)' },
              { id: 'gardien', label: 'Gardiens' },
              { id: 'defenseur', label: 'Défenseurs' },
              { id: 'milieu', label: 'Milieux' },
              { id: 'attaquant', label: 'Attaquants' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer par nom, club..."
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-medium"
          />
        </div>

        {/* Player Roster Grid */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {availableCandidates.map((player) => {
            const isCurrent = player.id === currentStarter.id;
            const isAlreadyStarter = activeStartersIds.includes(player.id) && !isCurrent;
            const isAvailable = player.status === 'disponible';
            const isWarning = player.status === 'a_surveiller' || player.status === 'retour_progressif';
            const formeScore = player.dimensions?.performance?.score || player.scoreGlobal || 88;
            const recupScore = player.dimensions?.recuperation?.score || 85;

            return (
              <div
                key={player.id}
                onClick={() => {
                  if (!isCurrent) {
                    onConfirmSubstitution(targetSlot.id, player.id);
                  }
                }}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-xs'
                }`}
              >
                {/* Left info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs">
                    {player.number}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-slate-900 text-xs truncate">{player.name}</h4>
                      {isCurrent && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-mono">
                          ACTUEL
                        </span>
                      )}
                      {isAlreadyStarter && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                          DÉJÀ TITULAIRE
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {player.position} • {player.club}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right font-mono">
                    <div className="text-xs font-black text-slate-900">{formeScore}/100</div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold">Forme</span>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-xs font-black text-blue-700">{recupScore}/100</div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold">Recup</span>
                  </div>

                  <div className="shrink-0 flex items-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border font-mono ${
                        isAvailable
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : isWarning
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {isAvailable ? '100% Apte' : isWarning ? 'Surveillance' : 'Inapte'}
                    </span>
                  </div>

                  <button
                    disabled={isCurrent}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                      isCurrent
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    <span>Choisir</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-medium">
            Le remplacement recalculera automatiquement les 6 piliers du XI.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};
