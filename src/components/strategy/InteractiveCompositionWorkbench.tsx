import React, { useState, useMemo } from 'react';
import { Player } from '../../types/ams';
import {
  TACTICAL_SCENARIOS,
  TacticalOptionId,
  TacticalScenarioConfig,
  TacticalSlot
} from '../../data/strategyData';
import {
  calculateCompositionConfidenceScore,
  getPotentialReplacementsForSlot,
  evaluatePlayerInLineup,
  PotentialReplacementCandidate
} from '../../utils/tacticalAnalytics';
import { TacticalPitchView } from './TacticalPitchView';
import {
  Swords,
  ShieldCheck,
  ArrowLeftRight,
  RotateCcw,
  Sparkles,
  Users,
  Check,
  AlertTriangle,
  Zap,
  Activity,
  UserCheck,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface InteractiveCompositionWorkbenchProps {
  players: Player[];
  initialScenarioId?: TacticalOptionId;
  onCompositionChange?: (slotMap: Record<string, string>, confidenceScore: number) => void;
}

export const InteractiveCompositionWorkbench: React.FC<InteractiveCompositionWorkbenchProps> = ({
  players,
  initialScenarioId = 'option1',
  onCompositionChange
}) => {
  // Scenario state
  const [activeScenarioId, setActiveScenarioId] = useState<TacticalOptionId>(initialScenarioId);

  // Custom substitutions per scenario: slotId -> playerId
  const [slotMap, setSlotMap] = useState<Record<string, string>>({});

  // Selected player slot on pitch for detailed replacement list
  const [selectedSlotId, setSelectedSlotId] = useState<string>('s-st');

  // Swap mode state: when user wants to swap positions between two starters
  const [swapSourceSlotId, setSwapSourceSlotId] = useState<string | null>(null);

  // Bench filter
  const [benchRoleFilter, setBenchRoleFilter] = useState<'all' | 'gardien' | 'defenseur' | 'milieu' | 'attaquant'>('all');

  // Toast feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Active scenario config
  const scenario: TacticalScenarioConfig = useMemo(() => {
    return TACTICAL_SCENARIOS.find((s) => s.id === activeScenarioId) || TACTICAL_SCENARIOS[0];
  }, [activeScenarioId]);

  // List of active starter IDs on pitch
  const activeStartersIds = useMemo(() => {
    return scenario.slots.map((s) => slotMap[s.id] || s.defaultPlayerId);
  }, [scenario, slotMap]);

  // Active Starters full player objects
  const activeStarters = useMemo(() => {
    return scenario.slots.map((s) => {
      const pId = slotMap[s.id] || s.defaultPlayerId;
      return {
        slot: s,
        player: players.find((p) => p.id === pId) || players[0]
      };
    });
  }, [scenario, slotMap, players]);

  // Currently selected starter & slot
  const selectedStarterEntry = useMemo(() => {
    const entry = activeStarters.find((item) => item.slot.id === selectedSlotId);
    return entry || activeStarters[0];
  }, [activeStarters, selectedSlotId]);

  const selectedSlot = selectedStarterEntry.slot;
  const selectedStarterPlayer = selectedStarterEntry.player;

  // Potential replacements for the selected player/slot
  const potentialReplacements = useMemo(() => {
    return getPotentialReplacementsForSlot(
      selectedSlot,
      selectedStarterPlayer,
      players,
      activeStartersIds
    );
  }, [selectedSlot, selectedStarterPlayer, players, activeStartersIds]);

  // List of bench players (not in starting 11)
  const benchPlayers = useMemo(() => {
    return players.filter((p) => !activeStartersIds.includes(p.id));
  }, [players, activeStartersIds]);

  // Filtered bench players
  const filteredBenchPlayers = useMemo(() => {
    if (benchRoleFilter === 'all') return benchPlayers;
    if (benchRoleFilter === 'gardien') return benchPlayers.filter((p) => p.position.toLowerCase().includes('gardien'));
    if (benchRoleFilter === 'defenseur') return benchPlayers.filter((p) => p.position.toLowerCase().includes('défens'));
    if (benchRoleFilter === 'milieu') return benchPlayers.filter((p) => p.position.toLowerCase().includes('milieu'));
    if (benchRoleFilter === 'attaquant') return benchPlayers.filter((p) => p.position.toLowerCase().includes('attaqu'));
    return benchPlayers;
  }, [benchPlayers, benchRoleFilter]);

  // Dynamic Composition Confidence Score & Metrics
  const confidenceData = useMemo(() => {
    return calculateCompositionConfidenceScore(scenario, slotMap, players);
  }, [scenario, slotMap, players]);

  const isCustomized = Object.keys(slotMap).length > 0;

  // Handle direct player replacement into a slot
  const handleReplacePlayerInSlot = (slotId: string, newPlayerId: string, candidateReason?: string) => {
    const currentStarterId = slotMap[slotId] || scenario.slots.find((s) => s.id === slotId)?.defaultPlayerId;
    const oldPlayer = players.find((p) => p.id === currentStarterId);
    const newPlayer = players.find((p) => p.id === newPlayerId);

    const updatedSlotMap = {
      ...slotMap,
      [slotId]: newPlayerId
    };

    setSlotMap(updatedSlotMap);
    setSwapSourceSlotId(null);

    const newConf = calculateCompositionConfidenceScore(scenario, updatedSlotMap, players);
    onCompositionChange?.(updatedSlotMap, newConf.confidenceScore);

    if (oldPlayer && newPlayer) {
      showToast(`Changement validé : ${newPlayer.name} remplace ${oldPlayer.name}. Score de confiance : ${newConf.confidenceScore}% (${newConf.deltaVsBaseline >= 0 ? '+' : ''}${newConf.deltaVsBaseline}%)`);
    }
  };

  // Handle position swap between two starters on the pitch
  const handleSwapSlots = (slotIdA: string, slotIdB: string) => {
    const playerAId = slotMap[slotIdA] || scenario.slots.find((s) => s.id === slotIdA)?.defaultPlayerId;
    const playerBId = slotMap[slotIdB] || scenario.slots.find((s) => s.id === slotIdB)?.defaultPlayerId;

    if (!playerAId || !playerBId) return;

    const updatedSlotMap = {
      ...slotMap,
      [slotIdA]: playerBId,
      [slotIdB]: playerAId
    };

    setSlotMap(updatedSlotMap);
    setSwapSourceSlotId(null);

    const playerA = players.find((p) => p.id === playerAId);
    const playerB = players.find((p) => p.id === playerBId);
    const newConf = calculateCompositionConfidenceScore(scenario, updatedSlotMap, players);
    onCompositionChange?.(updatedSlotMap, newConf.confidenceScore);

    showToast(`Positions permutées entre ${playerA?.name} et ${playerB?.name}. Score de confiance actualisé : ${newConf.confidenceScore}%`);
  };

  // Reset lineup to default
  const handleResetComposition = () => {
    setSlotMap({});
    setSwapSourceSlotId(null);
    showToast("Composition réinitialisée au 11 titulaire de référence FFF.");
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3.5 bg-blue-50 text-blue-950 rounded-lg border border-blue-200 flex items-center justify-between gap-3" role="status">
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <Check className="w-4 h-4 text-blue-700 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[11px] text-blue-700 hover:text-blue-900 cursor-pointer"
          >
            Fermer
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. PANNEAU DE BORD DU SCORE DE CONFIANCE DE LA COMPOSITION                */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {/* Top bar with formation switcher and reset */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500">Composition & Tactique</span>
                {isCustomized && (
                  <span className="text-[10px] font-semibold text-blue-700">
                    Modifications actives
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                Composition de l'Équipe & Ajustements en Direct
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Formations switcher */}
            <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-mono">
              {TACTICAL_SCENARIOS.map((sc) => {
                const isActive = activeScenarioId === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setActiveScenarioId(sc.id);
                      setSlotMap({});
                      setSwapSourceSlotId(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:text-blue-900'
                    }`}
                  >
                    {sc.formation}
                  </button>
                );
              })}
            </div>

            {isCustomized && (
              <button
                onClick={handleResetComposition}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-blue-200"
                title="Rétablir la composition de référence"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        {/* SCORE DE CONFIANCE & INDICATEURS TACTIQUES MAJEURS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Main Confidence Score Card */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-600 uppercase font-bold">
                Score Confiance Collectif
              </span>
              <ShieldCheck className="w-4 h-4 text-blue-700" />
            </div>
            <div className="my-1">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-950">
                {confidenceData.confidenceScore.toFixed(1)}%
              </div>
              <span className={`text-[10px] font-mono font-bold ${
                confidenceData.deltaVsBaseline >= 0 ? 'text-blue-700' : 'text-slate-700'
              }`}>
                {confidenceData.deltaVsBaseline >= 0
                  ? `+${confidenceData.deltaVsBaseline}% (${confidenceData.confidenceLabel})`
                  : `${confidenceData.deltaVsBaseline}% (${confidenceData.confidenceLabel})`}
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500 font-mono">
              11 titulaires opérationnels
            </span>
          </div>

          {/* Probabilité de Victoire */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-600 uppercase font-bold">
                Probabilité de Victoire
              </span>
              <TrendingUp className="w-4 h-4 text-blue-700" />
            </div>
            <div className="my-1">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-950">
                {confidenceData.winProbability.toFixed(1)}%
              </div>
              <span className="text-[10px] font-mono text-blue-700 font-semibold">
                xG attendu : 2.1 vs 1.1
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500 font-mono">
              Face au bloc belge
            </span>
          </div>

          {/* Compacité du Bloc */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-600 uppercase font-bold">
                Compacité du Bloc
              </span>
              <Activity className="w-4 h-4 text-blue-700" />
            </div>
            <div className="my-1">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-950">
                {confidenceData.compactness}
              </div>
              <span className="text-[10px] font-mono text-slate-600 font-medium">
                Distance inter-lignes
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500 font-mono">
              Quadrillage défensif
            </span>
          </div>

          {/* Vitesse de Projection */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-600 uppercase font-bold">
                Vitesse de Projection
              </span>
              <Zap className="w-4 h-4 text-blue-700" />
            </div>
            <div className="my-1">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-950">
                {confidenceData.transitionSpeed}
              </div>
              <span className="text-[10px] font-mono text-blue-700 font-medium">
                Attaques rapides
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500 font-mono">
              Exploitation des espaces
            </span>
          </div>
        </div>

        {/* Live Consequence Banner */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-2.5 text-xs">
          <Activity className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <strong className="text-blue-900 font-bold block uppercase text-[10px] font-mono">
              Conséquence de la Composition sur le Jeu :
            </strong>
            <span className="text-slate-700 font-medium">
              {confidenceData.consequenceSummary}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LE TERRAIN INTERACTIF + LE PANNEAU DES REMPLAÇANTS POTENTIELS          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* COLONNE GAUCHE (7/12) : TERRAIN TACTIQUE INTERACTIF */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                Terrain Tactique • {scenario.formation}
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Cliquez sur un joueur pour le remplacer ou changer de poste
            </span>
          </div>

          <TacticalPitchView
            scenario={scenario}
            slotMap={slotMap}
            allPlayers={players}
            selectedSlotId={selectedSlotId}
            onSelectSlot={(sId) => {
              setSelectedSlotId(sId);
            }}
            isCustomized={isCustomized}
            confidenceScore={confidenceData.confidenceScore}
            confidenceDelta={confidenceData.deltaVsBaseline}
            swapSourceSlotId={swapSourceSlotId}
            onSwapSlots={handleSwapSlots}
            onCancelSwap={() => setSwapSourceSlotId(null)}
          />
        </div>

        {/* COLONNE DROITE (5/12) : REMPLAÇANTS POTENTIELS DU JOUEUR CLIQUE */}
        <div className="lg:col-span-5 space-y-4">
          {/* FICHE DU JOUEUR SÉLECTIONNÉ & ACTION DE PERMUTATION */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-mono font-black text-base shrink-0 shadow-xs">
                  {selectedStarterPlayer.number}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.2 rounded border border-blue-200">
                      {selectedSlot.roleName} ({selectedSlot.roleCode})
                    </span>
                    <span className={`text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      selectedStarterPlayer.status === 'disponible'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {selectedStarterPlayer.status === 'disponible' ? '100% Apte' : 'Surveillance'}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 tracking-tight mt-0.5">
                    {selectedStarterPlayer.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {selectedStarterPlayer.position} • {selectedStarterPlayer.club}
                  </p>
                </div>
              </div>

              {/* Bouton pour changer de poste (Permuter avec un autre titulaire) */}
              <button
                onClick={() => {
                  if (swapSourceSlotId === selectedSlot.id) {
                    setSwapSourceSlotId(null);
                  } else {
                    setSwapSourceSlotId(selectedSlot.id);
                    showToast(`Mode permutation activé pour ${selectedStarterPlayer.name}. Cliquez sur un autre joueur sur le terrain pour échanger leurs postes.`);
                  }
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto ${
                  swapSourceSlotId === selectedSlot.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200'
                }`}
                title="Permuter la position de ce joueur avec un coéquipier titulaire"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>{swapSourceSlotId === selectedSlot.id ? 'Sélectionnez la cible...' : 'Changer de poste'}</span>
              </button>
            </div>

            {/* Quick stats grid for selected player */}
            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Score Forme</span>
                <strong className="text-slate-900 text-sm">
                  {selectedStarterPlayer.dimensions?.performance?.score || selectedStarterPlayer.scoreGlobal || 88}%
                </strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Récupération</span>
                <strong className="text-blue-700 text-sm">
                  {selectedStarterPlayer.dimensions?.recuperation?.score || 85}%
                </strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Disponibilité</span>
                <strong className="text-emerald-700 text-sm">
                  {selectedStarterPlayer.status === 'disponible' ? '100%' : '80%'}
                </strong>
              </div>
            </div>

            {/* LISTE DES JOUEURS QUI POURRAIENT POTENTIELLEMENT LE REMPLACER */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-black uppercase text-slate-900 tracking-tight">
                    Joueurs pouvant potentiellement le remplacer
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  {potentialReplacements.length} profil(s)
                </span>
              </div>

              <div className="space-y-2 max-h-[310px] overflow-y-auto pr-1">
                {potentialReplacements.map((candidate) => {
                  const p = candidate.player;
                  const isCurrent = p.id === selectedStarterPlayer.id;
                  if (isCurrent) return null;

                  return (
                    <div
                      key={p.id}
                      className="p-3 rounded-2xl bg-slate-50/80 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                          {p.number}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h5 className="text-xs font-bold text-slate-900 truncate">
                              {p.name}
                            </h5>
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 shrink-0">
                              {candidate.tacticalFitScore}% Fit
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-500 truncate font-medium">
                            {candidate.suitabilityReason}
                          </p>
                          <span className="text-[9.5px] font-mono text-emerald-700 font-semibold block truncate">
                            {candidate.impactOnLineup}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleReplacePlayerInSlot(selectedSlot.id, p.id, candidate.suitabilityReason)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer shadow-xs flex items-center gap-1 group-hover:scale-105"
                      >
                        <span>Remplacer</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ENCART EXPLICITE : BANC DES REMPLAÇANTS                                */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-slate-900">
                  Banc des Remplaçants
                </h3>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded-lg border border-blue-200">
                  {benchPlayers.length} remplaçants disponibles
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Joueurs prêts à entrer en jeu • Cliquez pour faire entrer à la place du joueur sélectionné ({selectedStarterPlayer.name})
              </p>
            </div>
          </div>

          {/* Role Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: `Tous (${benchPlayers.length})` },
              { id: 'gardien', label: 'Gardiens' },
              { id: 'defenseur', label: 'Défenseurs' },
              { id: 'milieu', label: 'Milieux' },
              { id: 'attaquant', label: 'Attaquants' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setBenchRoleFilter(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  benchRoleFilter === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bench Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredBenchPlayers.map((player) => {
            const isAvail = player.status === 'disponible';
            const forme = player.dimensions?.performance?.score || player.scoreGlobal || 88;

            return (
              <div
                key={player.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col justify-between gap-2.5 group"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                    {player.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-700">
                      {player.name}
                    </h5>
                    <p className="text-[10.5px] text-slate-500 truncate">
                      {player.position} • {player.club}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 font-mono text-[9.5px]">
                      <span className={`px-1.5 py-0.2 rounded font-bold ${
                        isAvail ? 'bg-blue-50 text-blue-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isAvail ? 'Apte 100%' : 'Surveillance'}
                      </span>
                      <span className="text-slate-400">Forme: {forme}%</span>
                    </div>
                  </div>
                </div>

                {/* Substitution Trigger Button */}
                <button
                  onClick={() => handleReplacePlayerInSlot(selectedSlot.id, player.id)}
                  className="w-full py-1.5 px-2 bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  title={`Titulariser ${player.name} à la place de ${selectedStarterPlayer.name}`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                  <span className="truncate">Remplacer {selectedStarterPlayer.lastName || selectedStarterPlayer.name.split(' ').pop()}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
