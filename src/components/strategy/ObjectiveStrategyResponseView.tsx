import React, { useState, useMemo } from 'react';
import { useAMS } from '../../context/AMSContext';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import { RoleObjective, ROLE_OBJECTIVES_DATA, SimulationPreset } from '../../data/objectivesData';
import { InteractiveCompositionWorkbench } from './InteractiveCompositionWorkbench';
import { isStrategyObjectiveClickable } from '../../data/objectiveAccess';
import { AIStrategyMedicalMbappeView } from './AIStrategyMedicalMbappeView';
import { AIStrategyRefereeStrategyView } from './AIStrategyRefereeStrategyView';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  TrendingUp,
  Activity,
  Shield,
  Sliders,
  ChevronRight,
  Database,
  ArrowRight,
  RotateCcw,
  Zap,
  Clock,
  Swords,
  Layers,
  Heart,
  Calendar,
  Check
} from 'lucide-react';

export const ObjectiveStrategyResponseView: React.FC = () => {
  const {
    selectedObjective,
    setSelectedObjective,
    userRole,
    roleConfig,
    navigateTo,
    players,
    allObjectivesMap
  } = useAMS();

  // Get all objectives for current persona (including custom created ones)
  const personaObjectives = useMemo(() => {
    return allObjectivesMap?.[userRole] || ROLE_OBJECTIVES_DATA[userRole] || ROLE_OBJECTIVES_DATA.entraineur;
  }, [userRole, allObjectivesMap]);

  // Current objective fallback
  const currentObjective: RoleObjective = useMemo(() => {
    if (userRole === 'entraineur') return personaObjectives.find((o) => o.id === 'coach_obj_1') || personaObjectives[0];
    if (selectedObjective && selectedObjective.role === userRole && isStrategyObjectiveClickable(userRole, selectedObjective.id)) {
      return selectedObjective;
    }
    return personaObjectives.find((objective) => isStrategyObjectiveClickable(userRole, objective.id)) || personaObjectives[0];
  }, [selectedObjective, userRole, personaObjectives]);

  // Active Simulation Preset selection
  const [selectedPresetId, setSelectedPresetId] = useState<string>(() => {
    return currentObjective.simulationPresets?.[0]?.id || 'sim_1';
  });

  // Slider for custom minute or intensity adjustment
  const [customVariableValue, setCustomVariableValue] = useState<number>(75);

  // Confirmed action feedback
  const [appliedActions, setAppliedActions] = useState<Record<number, boolean>>({});

  const targetPlayer = useMemo(() => {
    return players.find((p) => p.id === (currentObjective.targetPlayerId || 'mbappe')) || players[0];
  }, [players, currentObjective]);

  // Reset or select preset
  const activePreset: SimulationPreset | null = useMemo(() => {
    if (!currentObjective.simulationPresets) return null;
    return (
      currentObjective.simulationPresets.find((p) => p.id === selectedPresetId) ||
      currentObjective.simulationPresets[0]
    );
  }, [currentObjective, selectedPresetId]);

  // Dynamic simulation metrics recalculation based on slider
  const dynamicSimulation = useMemo(() => {
    if (!activePreset) {
      return {
        probSuccess: currentObjective.confidenceScore > 90 ? 68.4 : 62.0,
        riskScore: 3.2,
        freshnessScore: 92,
        impactScore: 94
      };
    }

    // Dynamic deviation based on custom slider (e.g. 75 min baseline)
    const delta = (customVariableValue - 75) / 15;
    const probSuccess = Math.max(45, Math.min(99, +(activePreset.probSuccess - delta * 2.2).toFixed(1)));
    const riskScore = Math.max(1, Math.min(25, +(activePreset.riskScore + delta * 3.1).toFixed(1)));
    const freshnessScore = Math.max(50, Math.min(99, Math.round(activePreset.freshnessScore - delta * 9)));
    const impactScore = Math.max(50, Math.min(99, Math.round(activePreset.impactScore + (delta > 0 ? delta * 2 : delta * 6))));

    return { probSuccess, riskScore, freshnessScore, impactScore };
  }, [activePreset, customVariableValue, currentObjective]);

  // Handle recommendation action
  const handleApplyAction = (index: number) => {
    setAppliedActions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isTacticalObjective =
    currentObjective.category.includes('Tactique') ||
    currentObjective.category.includes('Simulation') ||
    currentObjective.id === 'coach_obj_1' ||
    currentObjective.id === 'coach_obj_3';

  if (userRole === 'medical' && currentObjective.id === 'med_obj_3') {
    return <AIStrategyMedicalMbappeView />;
  }
  if (userRole === 'arbitrage' && currentObjective.id === 'dta_obj_1') {
    return <AIStrategyRefereeStrategyView />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200 select-none pb-16 max-w-6xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. ENTÊTE DÉCISIONNEL STRATÉGIE */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        {/* Navigation context bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 uppercase tracking-wide">
              Stratégie
            </span>

            <span className="text-slate-300 font-mono">/</span>

            <span className="text-slate-600 font-medium truncate max-w-[280px]">
              {currentObjective.title}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Persona actif : <strong>{roleConfig.title}</strong> ({roleConfig.userName})</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. VERDICT PRÉDICTIF & RÉPONSE DÉCISIONNELLE (GRANDE MISE EN AVANT)         */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">

        {/* Header Tag & Confidence */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div>
              <span className="text-[11px] font-bold uppercase text-blue-700 inline-flex items-center gap-1">
                <span>Analyse stratégique</span>
              </span>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                {currentObjective.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Indice de confiance</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-blue-900">
                {currentObjective.confidenceScore}%
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Featured Big Predictive Verdict */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1.5">
            <span>Projection du modèle</span>
          </div>

          <p className="text-base sm:text-lg font-semibold text-blue-950 leading-snug">
            {currentObjective.predictiveHighlight}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            {currentObjective.detailedAnalysis || currentObjective.shortSummary}
          </p>
        </div>

        {/* 3 Prominent Forecast Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          {currentObjective.forecasts.map((fc, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2 text-[11px] text-slate-600">
                <span>{fc.label}</span>
                <span className="font-semibold text-blue-700">
                  {fc.trend}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-blue-950">
                {fc.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. RECOMMANDATIONS OPÉRATIONNELLES DU STAFF (MISES EN AVANT)                */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black uppercase tracking-tight text-slate-900">
                Recommandations Opérationnelles pour le Staff
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Actions directes formulées par l'AMS pour répondre concrètement à l'objectif
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full self-start sm:self-auto">
            Actionnable Immédiatement
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {currentObjective.recommendations.map((rec, idx) => {
            const isApplied = appliedActions[idx];
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  isApplied
                    ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50/90 border-slate-200/90 hover:border-blue-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-blue-950 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>{rec.actor}</span>
                    </span>

                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        rec.urgency === 'critique'
                          ? 'bg-rose-100 text-rose-800'
                          : rec.urgency === 'haute'
                          ? 'bg-blue-50 text-blue-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      Priorité {rec.urgency}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {rec.action}
                  </p>

                  {rec.impact && (
                    <div className="text-[10.5px] font-mono font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      <span>Impact : {rec.impact}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    Consigne #{idx + 1}
                  </span>

                  <button
                    onClick={() => handleApplyAction(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                      isApplied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3 h-3 text-white" />
                        <span>Consigne Validée</span>
                      </>
                    ) : (
                      <>
                        <span>Valider la consigne</span>
                        <ChevronRight className="w-3 h-3 text-blue-600" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4.BIS DIMENSION INDIVIDUELLE ET COLLECTIVE (AU CŒUR DE LA DÉCISION)       */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-blue-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100/80 border border-blue-300 flex items-center justify-center text-blue-800">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black uppercase tracking-tight text-slate-900">
                Articuler performance individuelle et performance collective
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Mesurer l'impact d'un changement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Calibration :</span>
            <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Biomécanique + Tactique
            </span>
          </div>
        </div>

        {/* 1. ARTICULATION EXPLANATION BANNER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Performance Individuelle</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {currentObjective.dimensionArticulation?.individualSummary ||
                "Suivi des états de fraîcheur neuromusculaire, charge ACWR et tolérance aux accélérations de chaque joueur."}
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Performance Collective</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {currentObjective.dimensionArticulation?.collectiveSummary ||
                "Compacité du bloc médian (34m), synchronisation du pressing et vitesse de projection en transition."}
            </p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Zap className="w-3.5 h-3.5 text-blue-700" />
              <span>Règle d'Articulation</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {currentObjective.dimensionArticulation?.articulationExplanation ||
                "Modifier un profil individuel altère immédiatement l'équilibre d'intensité collective et exige des ajustements chez les partenaires adjacents."}
            </p>
          </div>
        </div>

        {/* 2. COMPOSITION TACTIQUE, PERMUTATION DE POSTES, REMPLAÇANTS & BANC */}
        <InteractiveCompositionWorkbench
          players={players}
          initialScenarioId="option1"
        />

        {/* 3. ÉLÉMENTS À TRAVAILLER CHEZ LES JOUEURS (PLAYER WORK ITEMS & DRILLS) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-500">
                Éléments à Travailler chez les Joueurs pour Répondre à cet Objectif
              </span>
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                {(currentObjective.dimensionArticulation?.playerWorkItems || []).length} profil(s) ciblés
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Cochez pour consigner la séance au préparateur
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {(
              currentObjective.dimensionArticulation?.playerWorkItems || [
                {
                  playerId: "mbappe",
                  playerName: "Kylian Mbappé",
                  position: "Attaquant",
                  focusArea: "Appels & Protection Genou",
                  workItems: [
                    "Démarquage court-long dans le dos de la charnière",
                    "Limitation des freinages violents sur terrain lourd"
                  ],
                  individualImpact: "Préserve l'explosivité neuromusculaire",
                  collectiveImpact: "Fixe les centraux adverses"
                },
                {
                  playerId: "dembele",
                  playerName: "Ousmane Dembélé",
                  position: "Ailier Droit",
                  focusArea: "Repli & Compensation Couloir",
                  workItems: [
                    "Fermeture du couloir intérieur sur perte de balle",
                    "Course de replacement à 22 km/h sur les contres"
                  ],
                  individualImpact: "Plafonnement des accélérations pour les ischios",
                  collectiveImpact: "Conserve la compacité latérale à 34 mètres"
                }
              ]
            ).map((item, pIdx) => (
              <div
                key={pIdx}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {item.playerName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.playerName}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.position} • Focus : <strong>{item.focusArea}</strong>
                      </span>
                    </div>
                  </div>

                  <span className="text-[9.5px] font-mono font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                    Plan Travail Cible
                  </span>
                </div>

                {/* Specific Drills / Work Items */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Consignes & Ateliers Spécifiques :
                  </span>
                  <div className="space-y-1">
                    {item.workItems.map((work, wIdx) => {
                      const key = `${item.playerId}_${wIdx}`;
                      const isDone = !!appliedActions[900 + pIdx * 10 + wIdx];
                      return (
                        <div
                          key={wIdx}
                          onClick={() => handleApplyAction(900 + pIdx * 10 + wIdx)}
                          className={`p-2 rounded-xl border text-xs flex items-start gap-2 cursor-pointer transition-colors ${
                            isDone
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : 'bg-white border-slate-200/90 text-slate-700 hover:bg-blue-50/50'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                            isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isDone && <Check className="w-3 h-3" />}
                          </div>
                          <span className={`text-[11.5px] leading-snug ${isDone ? 'line-through opacity-80' : 'font-medium'}`}>
                            {work}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Impacts Articulés */}
                <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10.5px] font-mono">
                  <div className="text-slate-600">
                    <span className="font-bold text-blue-800">Individuel :</span> {item.individualImpact}
                  </div>
                  <div className="text-slate-600">
                    <span className="font-bold text-emerald-800">Collectif :</span> {item.collectiveImpact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SIMULATEUR D'AJUSTEMENT & SCÉNARIOS WHAT-IF EN DIRECT                   */}
      {/* ========================================================================= */}
      {userRole !== 'entraineur' && <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black uppercase tracking-tight text-slate-900">
                Simulateur d'Ajustement & Scénarios Prédictifs en Direct
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Testez les alternatives et visualisez l'impact immédiat sur la probabilité de succès et les risques
              </p>
            </div>
          </div>

          {currentObjective.specializedToolRoute && (
            <button
              onClick={() => {
                if (currentObjective.specializedToolRoute) {
                  navigateTo(currentObjective.specializedToolRoute);
                }
              }}
              className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-auto shadow-2xs"
            >
              <span>{currentObjective.specializedToolLabel || "Ouvrir l'outil complet"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 3 Preset Scenarios if available */}
        {currentObjective.simulationPresets && currentObjective.simulationPresets.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              1. Choisir une option de scénario :
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentObjective.simulationPresets.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      setSelectedPresetId(preset.id);
                      if (preset.variableValue.includes('min')) {
                        const mins = parseInt(preset.variableValue.replace(/\D/g, ''), 10);
                        if (!isNaN(mins)) setCustomVariableValue(mins);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                        : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {preset.name}
                      </span>
                      {preset.isRecommended && (
                        <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                          ★ RECOMMANDÉ
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-900 leading-snug">
                        {preset.label}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                        {preset.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-slate-500">{preset.variableLabel} :</span>
                      <span className="text-blue-900">{preset.variableValue}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Live Interactive Sensitivity Slider */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border border-blue-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase text-blue-950 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                <span>2. Ajuster le paramètre clé en continu :</span>
              </span>
              <p className="text-[11px] text-slate-600 font-medium">
                Déplacez le curseur pour simuler les variations d'impact et de fatigue en temps réel
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Valeur simulée :</span>
              <span className="text-base font-black font-mono text-blue-700 bg-white px-3 py-1 rounded-xl border border-blue-200 shadow-2xs">
                {customVariableValue} min
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <input
              type="range"
              min={20}
              max={95}
              step={5}
              value={customVariableValue}
              onChange={(e) => setCustomVariableValue(parseInt(e.target.value, 10))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-blue-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>20 min (Impact Sub léger)</span>
              <span>45 min (Mi-temps)</span>
              <span className="font-bold text-blue-700">75 min (Optimal FFF)</span>
              <span>90 min (Intégrale)</span>
            </div>
          </div>

          {/* Dynamic Calculated Outcomes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Probabilité Succès
              </span>
              <div className="text-xl font-black text-slate-900 font-mono">
                {dynamicSimulation.probSuccess}%
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold font-mono">
                {dynamicSimulation.probSuccess > 65 ? '↑ Zone Gagnante' : '↓ Rendement Dégradé'}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Risque Lésionnel
              </span>
              <div className="text-xl font-black font-mono text-slate-900">
                {dynamicSimulation.riskScore}%
              </div>
              <span className={`text-[10px] font-semibold font-mono ${dynamicSimulation.riskScore < 5 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {dynamicSimulation.riskScore < 5 ? 'Zone Sécurisée' : 'Vigilance Fatigue'}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Fraîcheur J+1
              </span>
              <div className="text-xl font-black text-blue-700 font-mono">
                {dynamicSimulation.freshnessScore}/100
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Récupération tour suivant</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Rendement Impact
              </span>
              <div className="text-xl font-black text-indigo-700 font-mono">
                {dynamicSimulation.impactScore}/100
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Intensité offensive</span>
            </div>
          </div>
        </div>
      </section>}

      {/* Target Player Focus Card if applicable */}
      {currentObjective.targetPlayerId && (
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-tight text-slate-900">
                  Focus Joueur Clé Cerné par cet Objectif
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {targetPlayer.name} ({targetPlayer.position} • {targetPlayer.club})
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('joueur_360', { playerId: targetPlayer.id, playerTab: 'vue_ensemble' })}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ouvrir le jumeau numérique 360</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-700 text-white font-bold flex items-center justify-center font-mono overflow-hidden shrink-0 shadow-2xs">
                {targetPlayer.avatarUrl ? (
                  <img src={targetPlayer.avatarUrl} alt={targetPlayer.name} className="w-full h-full object-cover" />
                ) : (
                  targetPlayer.number
                )}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-black text-slate-900 block truncate">{targetPlayer.name}</span>
                <span className="text-[10px] text-slate-500 block">{targetPlayer.position} • #{targetPlayer.number}</span>
                <span className="text-[9.5px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded mt-0.5 inline-block">
                  {targetPlayer.status === 'disponible' ? '100% DISPONIBLE' : targetPlayer.status}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Score Forme Global</span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                {targetPlayer.scoreGlobal || 92}/100
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold font-mono">↑ Zénith athlétique</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Pic Vitesse Récent</span>
              <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                35.8 km/h
              </div>
              <span className="text-[10px] text-slate-500 font-medium">GPS Catapult Vector</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Recommandation Jeu</span>
              <div className="text-xl font-black text-blue-700 font-mono mt-0.5">
                75 min max
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Prévention surcharge J+1</span>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 7. TRAÇABILITÉ & SOURCES DE DONNÉES AMS QUALIFIÉES                         */}
      {/* ========================================================================= */}
      <section className="p-4 sm:p-5 rounded-3xl bg-slate-100/80 border border-slate-200 text-xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <Database className="w-4 h-4 text-blue-600" />
            <span>Traçabilité & Flux de Données Sources Qualifiées FFF</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Audit trail synchronisé à H-48 avant {UPCOMING_MATCH.title}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {(
            currentObjective.sourcesQualified || [
              "Capteurs GPS Catapult Vector 10Hz",
              "Dossiers Médicaux FFF Dr. Le Gall",
              "Flux Tactique Opta StatsPerform",
              "Plateformes de Force Kistler CMJ",
              "Données Sommeil & HRV Oura Ring"
            ]
          ).map((src) => (
            <span
              key={src}
              className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-[11px] font-mono font-medium text-slate-700 flex items-center gap-1 shadow-2xs"
            >
              <Check className="w-3 h-3 text-emerald-600" />
              <span>{src}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};
