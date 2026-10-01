import React, { useState, useMemo } from 'react';
import { useAMS } from '../../context/AMSContext';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import {
  TACTICAL_SCENARIOS,
  TacticalOptionId,
  TacticalScenarioConfig,
  TacticalSlot
} from '../../data/strategyData';
import {
  calculateXIMetrics,
  evaluatePlayerInLineup,
  generateSubstitutionConsequence,
  CalculatedXIMetrics
} from '../../utils/tacticalAnalytics';
import { TacticalPitchView } from './TacticalPitchView';
import { SubstitutionModal } from './SubstitutionModal';
import { ExplicabilityModal } from './ExplicabilityModal';
import {
  Sparkles,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeftRight,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Heart,
  TrendingUp,
  Layers,
  ChevronRight,
  Check,
  Info
} from 'lucide-react';

export const AIStrategyView: React.FC = () => {
  const { players, navigateTo } = useAMS();

  // Active scenario state
  const [activeScenarioId, setActiveScenarioId] = useState<TacticalOptionId>('option1');

  // Custom substitutions per scenario: scenarioId -> { slotId -> playerId }
  const [customSlotMaps, setCustomSlotMaps] = useState<Record<TacticalOptionId, Record<string, string>>>({
    option1: {},
    option2: {},
    option3: {}
  });

  // Selected player slot on pitch for detailed evaluation
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>('s-st');

  // Modal states
  const [substitutionModalOpen, setSubstitutionModalOpen] = useState(false);
  const [slotToSubstitute, setSlotToSubstitute] = useState<TacticalSlot | null>(null);
  const [explicabilityModalOpen, setExplicabilityModalOpen] = useState(false);

  // Substitution history tracking for Before -> After banner
  const [lastSubstitutionInfo, setLastSubstitutionInfo] = useState<{
    inPlayerId: string;
    outPlayerId: string;
    beforeMetrics: CalculatedXIMetrics;
    afterMetrics: CalculatedXIMetrics;
  } | null>(null);

  // Active scenario config
  const currentScenario = useMemo(() => {
    return TACTICAL_SCENARIOS.find((s) => s.id === activeScenarioId) || TACTICAL_SCENARIOS[0];
  }, [activeScenarioId]);

  // Current slot map for active scenario
  const currentSlotMap = customSlotMaps[activeScenarioId] || {};

  const isCustomized = Object.keys(currentSlotMap).length > 0;

  // Calculate live metrics for active scenario
  const currentXIMetrics = useMemo(() => {
    return calculateXIMetrics(currentScenario, currentSlotMap, players);
  }, [currentScenario, currentSlotMap, players]);

  // Selected Slot & Player
  const activeSlot = useMemo(() => {
    if (!selectedSlotId) return currentScenario.slots[0];
    return currentScenario.slots.find((s) => s.id === selectedSlotId) || currentScenario.slots[0];
  }, [selectedSlotId, currentScenario]);

  const activeStarterPlayerId = currentSlotMap[activeSlot.id] || activeSlot.defaultPlayerId;
  const activeStarterPlayer = useMemo(() => {
    return players.find((p) => p.id === activeStarterPlayerId) || players[0];
  }, [activeStarterPlayerId, players]);

  const playerEvaluation = useMemo(() => {
    if (!activeStarterPlayer || !activeSlot) return null;
    return evaluatePlayerInLineup(activeStarterPlayer, activeSlot, activeScenarioId);
  }, [activeStarterPlayer, activeSlot, activeScenarioId]);

  // General squad synthesis metrics
  const totalAnalyzed = players.length || 24;
  const totalAvailable = players.filter((p) => p.status === 'disponible').length;
  const totalWarning = players.filter(
    (p) => p.status === 'a_surveiller' || p.status === 'retour_progressif'
  ).length;

  const avgSquadForm = Math.round(
    players.reduce((acc, p) => acc + (p.dimensions?.performance?.score || p.scoreGlobal || 86), 0) /
      (players.length || 1)
  );

  const avgSquadRecup = Math.round(
    players.reduce((acc, p) => acc + (p.dimensions?.recuperation?.score || 82), 0) /
      (players.length || 1)
  );

  // Active Starters IDs list for substitution checking
  const activeStartersIds = useMemo(() => {
    return currentScenario.slots.map((s) => currentSlotMap[s.id] || s.defaultPlayerId);
  }, [currentScenario, currentSlotMap]);

  // Handle substitution
  const handleConfirmSubstitution = (slotId: string, newPlayerId: string) => {
    const slot = currentScenario.slots.find((s) => s.id === slotId);
    if (!slot) return;

    const oldPlayerId = currentSlotMap[slotId] || slot.defaultPlayerId;
    const before = calculateXIMetrics(currentScenario, currentSlotMap, players);

    const updatedSlotMap = {
      ...currentSlotMap,
      [slotId]: newPlayerId
    };

    setCustomSlotMaps((prev) => ({
      ...prev,
      [activeScenarioId]: updatedSlotMap
    }));

    const after = calculateXIMetrics(currentScenario, updatedSlotMap, players);

    setLastSubstitutionInfo({
      inPlayerId: newPlayerId,
      outPlayerId: oldPlayerId,
      beforeMetrics: before,
      afterMetrics: after
    });

    setSubstitutionModalOpen(false);
  };

  // Reset scenario to default baseline
  const handleResetScenario = () => {
    setCustomSlotMaps((prev) => ({
      ...prev,
      [activeScenarioId]: {}
    }));
    setLastSubstitutionInfo(null);
  };

  // Open substitution modal for a specific slot
  const handleOpenSubstitutionForSlot = (slotId: string) => {
    const slot = currentScenario.slots.find((s) => s.id === slotId);
    if (slot) {
      setSelectedSlotId(slotId);
      setSlotToSubstitute(slot);
      setSubstitutionModalOpen(true);
    }
  };

  // Substitution Consequence sentence
  const substitutionConsequenceText = useMemo(() => {
    if (!lastSubstitutionInfo) return null;
    const inP = players.find((p) => p.id === lastSubstitutionInfo.inPlayerId);
    const outP = players.find((p) => p.id === lastSubstitutionInfo.outPlayerId);
    if (!inP || !outP) return null;
    return generateSubstitutionConsequence(
      lastSubstitutionInfo.beforeMetrics,
      lastSubstitutionInfo.afterMetrics,
      inP,
      outP
    );
  }, [lastSubstitutionInfo, players]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12 select-none">
      {/* ========================================================================= */}
      {/* 1. CONCEPT & HEADER PREMIUM                                               */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white p-5 sm:p-6 rounded-3xl border border-blue-800/40 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-400 bg-blue-900/80 px-2.5 py-0.5 rounded-full border border-blue-700/60 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>AI STRATEGY • HUB DÉCISIONNEL</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-blue-200 font-mono font-medium">
              Données AMS synchronisées
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Préparer {UPCOMING_MATCH.homeTeam} — {UPCOMING_MATCH.awayTeam}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/85 font-medium max-w-2xl mt-1 leading-relaxed">
              AMS 360 a analysé les dernières données disponibles de votre effectif pour préparer votre prochain match.
            </p>
          </div>

          {/* Sources analyzed row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-blue-300/80">
            <span className="font-bold text-blue-200">Sources analysées :</span>
            {[
              'Forme',
              'Disponibilité',
              'Charge',
              'Récupération',
              'Performances récentes',
              'Matchs',
              'Entraînements',
              'GPS',
              'Données tactiques'
            ].map((src, i, arr) => (
              <span key={src} className="flex items-center gap-1">
                <span className="text-white/90">{src}</span>
                {i < arr.length - 1 && <span className="text-blue-500">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Revenir au tableau de bord entraîneur"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Tableau de bord</span>
          </button>

          {isCustomized && (
            <button
              onClick={handleResetScenario}
              className="px-3.5 py-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/60 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Rétablir la composition initiale"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser la proposition</span>
            </button>
          )}

          <button
            onClick={() => setExplicabilityModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Consulter l'explicabilité et les données ayant contribué aux propositions"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-950" />
            <span>Pourquoi ?</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE AVANT MATCH (6 KPIs + 3 Insights décisionnels)                 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Synthèse Décisionnelle de l'Effectif
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            {UPCOMING_MATCH.countdown} avant {UPCOMING_MATCH.title} • {UPCOMING_MATCH.dateTime}
          </span>
        </div>

        {/* Top 6 KPI summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Effectif Total
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {totalAnalyzed} joueurs
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Analysés par l'AMS</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
              Disponibilité
            </span>
            <div className="text-xl font-black text-emerald-800 font-mono mt-0.5">
              {totalAvailable} disponibles
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">100% aptes titulaires</span>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block">
              Surveillance
            </span>
            <div className="text-xl font-black text-amber-800 font-mono mt-0.5">
              {totalWarning} profils
            </div>
            <span className="text-[10px] text-amber-600 font-medium">Gestion temps de jeu</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Forme Collective
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {avgSquadForm}/100
            </div>
            <span className="text-[10px] text-emerald-600 font-bold font-mono">↑ +3.2 pts</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Récupération
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {avgSquadRecup}/100
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Indice HRV optimal</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Charge Récente
            </span>
            <div className="text-xl font-black text-blue-800 font-mono mt-0.5">
              +8 %
            </div>
            <span className="text-[10px] text-slate-500 font-medium">vs cycle habituel</span>
          </div>
        </div>

        {/* 3 Short Data Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/90 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
              ✓
            </div>
            <div>
              <h4 className="text-xs font-black text-blue-950">Disponibilité du Milieu</h4>
              <p className="text-xs text-blue-900/85 mt-0.5 font-medium leading-snug">
                Le milieu présente actuellement le meilleur niveau de disponibilité de l’effectif (98% de disponibilité moyenne).
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
              ⚠
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-950">Surveillance de Charge</h4>
              <p className="text-xs text-amber-900/85 mt-0.5 font-medium leading-snug">
                2 joueurs (Tchouaméni, Dembélé) présentent une charge supérieure à leur référence habituelle.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
              ↑
            </div>
            <div>
              <h4 className="text-xs font-black text-emerald-950">Dynamique Offensive</h4>
              <p className="text-xs text-emerald-900/85 mt-0.5 font-medium leading-snug">
                Plusieurs profils offensifs (Mbappé, Barcola, Olise) sont actuellement au-dessus de leur moyenne de performance récente (+7.4%).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LES 3 COMPOSITIONS STRATÉGIQUES                                        */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>3 Scénarios d'Aide à la Décision</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {UPCOMING_MATCH.title}
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              3 approches avec des compromis tactiques et physiologiques distincts. Aucune option n'est imposée.
            </p>
          </div>
        </div>

        {/* 3 Scenario Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {TACTICAL_SCENARIOS.map((scenario) => {
            const isSelected = activeScenarioId === scenario.id;
            const scenarioSlotMap = customSlotMaps[scenario.id] || {};
            const scenarioMetrics = calculateXIMetrics(scenario, scenarioSlotMap, players);

            return (
              <div
                key={scenario.id}
                onClick={() => {
                  setActiveScenarioId(scenario.id);
                  setSelectedSlotId(scenario.slots[0]?.id || null);
                  setLastSubstitutionInfo(null);
                }}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs hover:shadow-xs'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {scenario.badge}
                  </span>
                  <span className="text-xs font-black text-slate-900 font-mono">
                    {scenario.formation}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    {scenario.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium line-clamp-2 leading-relaxed">
                    {scenario.subtitle}
                  </p>
                </div>

                {/* Immediate Breakdown Bar */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 font-mono text-[11px]">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Forme</span>
                    <strong className="text-slate-900 text-xs">{scenarioMetrics.forme}/100</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Recup</span>
                    <strong className="text-blue-700 text-xs">{scenarioMetrics.recuperation}/100</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Dispo</span>
                    <strong className="text-emerald-700 text-xs">{scenarioMetrics.disponibilite}%</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Intensité</span>
                    <strong className="text-slate-900 text-xs">{scenarioMetrics.intensite}/100</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Charge</span>
                    <strong className="text-slate-900 text-xs">{scenarioMetrics.charge}/100</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Équilibre</span>
                    <strong className="text-indigo-700 text-xs">{scenarioMetrics.equilibre}/100</strong>
                  </div>
                </div>

                {/* Selection state button */}
                <div className="pt-1">
                  <div
                    className={`w-full py-1.5 rounded-xl text-center text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Scénario Sélectionné</span>
                      </>
                    ) : (
                      <span>Sélectionner cette stratégie</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. BANNER IMPACT AVANT → APRÈS (QUAND UNE SUBSTITUTION EST FAITE)         */}
      {/* ========================================================================= */}
      {lastSubstitutionInfo && substitutionConsequenceText && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-blue-50 to-indigo-50 border-2 border-amber-400/80 shadow-md space-y-3 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-2.5">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-amber-700" />
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                Impact du changement (Avant → Après)
              </h3>
            </div>
            <button
              onClick={handleResetScenario}
              className="text-[11px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Rétablir le scénario initial</span>
            </button>
          </div>

          {/* Metric Comparison Deltas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 text-[11px]">Forme :</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-slate-400 line-through text-[11px]">
                  {lastSubstitutionInfo.beforeMetrics.forme}
                </span>
                <span>→</span>
                <span className="text-slate-900 text-sm">
                  {lastSubstitutionInfo.afterMetrics.forme}
                </span>
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 text-[11px]">Récupération :</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-slate-400 line-through text-[11px]">
                  {lastSubstitutionInfo.beforeMetrics.recuperation}
                </span>
                <span>→</span>
                <span className="text-blue-800 text-sm">
                  {lastSubstitutionInfo.afterMetrics.recuperation}
                </span>
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 text-[11px]">Intensité :</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-slate-400 line-through text-[11px]">
                  {lastSubstitutionInfo.beforeMetrics.intensite}
                </span>
                <span>→</span>
                <span className="text-amber-700 text-sm">
                  {lastSubstitutionInfo.afterMetrics.intensite}
                </span>
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 text-[11px]">Charge :</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-slate-400 line-through text-[11px]">
                  {lastSubstitutionInfo.beforeMetrics.charge}
                </span>
                <span>→</span>
                <span className="text-slate-900 text-sm">
                  {lastSubstitutionInfo.afterMetrics.charge}
                </span>
              </div>
            </div>
          </div>

          {/* Analytical Consequence Note */}
          <p className="text-xs text-slate-800 font-medium leading-relaxed bg-white/80 p-3 rounded-xl border border-amber-200/70">
            {substitutionConsequenceText}
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4 & 5. TERRAIN INTERACTIF & PANNEAU "POURQUOI CETTE OPTION ?"             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* COLONNE GAUCHE (7/12) : GRAND TERRAIN INTERACTIF */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Disposition Tactique • {currentScenario.formation} ({currentScenario.title})
              </h3>
            </div>
            <button
              onClick={() => handleOpenSubstitutionForSlot(activeSlot.id)}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-blue-200 shadow-2xs"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
              <span>Modifier la composition</span>
            </button>
          </div>

          {/* Grand terrain */}
          <TacticalPitchView
            scenario={currentScenario}
            slotMap={currentSlotMap}
            allPlayers={players}
            selectedSlotId={selectedSlotId}
            onSelectSlot={(sId) => setSelectedSlotId(sId)}
            onOpenSubstitution={(sId) => handleOpenSubstitutionForSlot(sId)}
            isCustomized={isCustomized}
          />
        </div>

        {/* COLONNE DROITE (5/12) : ÉVALUATION DU JOUEUR SÉLECTIONNÉ & ARGUMENTS SCÉNARIO */}
        <div className="lg:col-span-5 space-y-4">
          {/* CARTE D'ÉVALUATION DU JOUEUR CLIQUE */}
          {playerEvaluation && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3.5">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-mono font-black text-sm shrink-0 shadow-xs">
                    {playerEvaluation.player.number}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.2 rounded border border-blue-200">
                      Poste : {playerEvaluation.slot.roleName} ({playerEvaluation.slot.roleCode})
                    </span>
                    <h4 className="text-base font-black text-slate-900 tracking-tight mt-0.5">
                      {playerEvaluation.player.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {playerEvaluation.player.position} • {playerEvaluation.player.club}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenSubstitutionForSlot(playerEvaluation.slot.id)}
                  className="p-2 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 transition-colors shrink-0 cursor-pointer"
                  title="Remplacer ce joueur"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>

              {/* Player 6 Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Forme</span>
                  <strong className="text-slate-900 text-sm">{playerEvaluation.formeScore}/100</strong>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Recup</span>
                  <strong className="text-blue-700 text-sm">{playerEvaluation.recupScore}/100</strong>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Disponibilité</span>
                  <strong className="text-emerald-700 text-sm">{playerEvaluation.dispoPercentage}%</strong>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Charge</span>
                  <strong className="text-slate-800 text-[11px] truncate block">{playerEvaluation.chargeStatus}</strong>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Perf Récente</span>
                  <strong className="text-emerald-600 text-sm">{playerEvaluation.recentPerfTrend}</strong>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Profil Physique</span>
                  <strong className="text-slate-800 text-[10px] truncate block">{playerEvaluation.physicalProfile}</strong>
                </div>
              </div>

              {/* Justification Text */}
              <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-1">
                <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-blue-800 block">
                  Justification de la sélection :
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {playerEvaluation.justification}
                </p>
              </div>

              {/* Navigation to Player 360 */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    navigateTo('joueur_360', { playerId: playerEvaluation.player.id });
                  }}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Voir Joueur 360</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleOpenSubstitutionForSlot(playerEvaluation.slot.id)}
                  className="py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
                  <span>Remplacer</span>
                </button>
              </div>
            </div>
          )}

          {/* PANNEAU "POURQUOI CETTE OPTION ?" */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  Pourquoi cette option ?
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {currentScenario.formation}
              </span>
            </div>

            <div className="space-y-2.5">
              {currentScenario.keyArguments.map((arg, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200/90 transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-black text-blue-800 bg-white px-2 py-0.2 rounded border border-slate-200">
                      {arg.category}
                    </span>
                    <strong className="text-xs font-mono font-black text-slate-900">
                      {arg.metric}
                    </strong>
                  </div>
                  <p className="text-xs text-slate-700 leading-snug font-medium pt-0.5">
                    {arg.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. COMPARER LES 3 OPTIONS (VISUAL BENCHMARKING)                           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Comparaison des 3 Scénarios Décisionnels</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Visualisez immédiatement les compromis physiologiques et tactiques entre les options.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="font-bold text-slate-700">Option 1 (4-3-3)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="font-bold text-slate-700">Option 2 (4-2-3-1)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span className="font-bold text-slate-700">Option 3 (3-4-2-1)</span>
            </div>
          </div>
        </div>

        {/* 6 Dimension Comparative Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {[
            {
              dim: 'Forme collective',
              op1: 88,
              op2: 91,
              op3: 84,
              desc: 'Option 2 maximale avec Mbappé, Olise & Griezmann'
            },
            {
              dim: 'Récupération',
              op1: 90,
              op2: 83,
              op3: 92,
              desc: 'Option 3 favorise la fraîcheur axiale'
            },
            {
              dim: 'Intensité & Vitesse',
              op1: 84,
              op2: 94,
              op3: 78,
              desc: 'Option 2 culmine sur les sprints > 25 km/h'
            },
            {
              dim: 'Charge & Stabilité',
              op1: 87,
              op2: 82,
              op3: 91,
              desc: 'Option 3 protège les profils en surcharge'
            },
            {
              dim: 'Disponibilité',
              op1: 96,
              op2: 94,
              op3: 98,
              desc: 'Niveau optimal sur les 3 configurations'
            },
            {
              dim: 'Équilibre collectif',
              op1: 92,
              op2: 86,
              op3: 90,
              desc: 'Option 1 offre la meilleure compacité médiane'
            }
          ].map((item) => (
            <div
              key={item.dim}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{item.dim}</span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">/100</span>
              </div>

              {/* Bars for 3 options */}
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="w-12 text-slate-500 shrink-0">Opt. 1</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${item.op1}%` }}
                    />
                  </div>
                  <span className="w-6 text-right font-bold text-slate-800">{item.op1}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-12 text-slate-500 shrink-0">Opt. 2</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${item.op2}%` }}
                    />
                  </div>
                  <span className="w-6 text-right font-bold text-slate-800">{item.op2}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-12 text-slate-500 shrink-0">Opt. 3</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${item.op3}%` }}
                    />
                  </div>
                  <span className="w-6 text-right font-bold text-slate-800">{item.op3}</span>
                </div>
              </div>

              <p className="text-[10.5px] text-slate-500 font-medium pt-1 border-t border-slate-200/60 leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8. MODALES & TIROIRS D'AIDE À LA DÉCISION                                  */}
      {/* ========================================================================= */}
      {/* Substitution Modal */}
      <SubstitutionModal
        isOpen={substitutionModalOpen}
        onClose={() => setSubstitutionModalOpen(false)}
        targetSlot={slotToSubstitute}
        currentStarter={activeStarterPlayer}
        allPlayers={players}
        activeStartersIds={activeStartersIds}
        onConfirmSubstitution={handleConfirmSubstitution}
      />

      {/* Explicability Modal */}
      <ExplicabilityModal
        isOpen={explicabilityModalOpen}
        onClose={() => setExplicabilityModalOpen(false)}
        scenario={currentScenario}
      />
    </div>
  );
};
