import React, { useState, useMemo } from 'react';
import { useAMS } from '../../context/AMSContext';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import {
  TRAINING_WEEK_SCENARIOS,
  WeekScenarioId,
  WeekScenarioConfig,
  DaySessionPlan
} from '../../data/strategyWeekData';
import {
  Sparkles,
  Calendar,
  Activity,
  Zap,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ChevronRight,
  Clock,
  Layers,
  Heart,
  Sliders,
  Check,
  HelpCircle,
  X,
  Dumbbell
} from 'lucide-react';

export const AIStrategyWeekView: React.FC = () => {
  const { navigateTo } = useAMS();

  // Active scenario state
  const [activeScenarioId, setActiveScenarioId] = useState<WeekScenarioId>('scenario_progressive');

  // Selected day for deep inspection
  const [selectedDayId, setSelectedDayId] = useState<string>('day-thu');

  // Custom adjustments map: dayId -> { durationOffset: number, intensityOverride?: string }
  const [customAdjustments, setCustomAdjustments] = useState<Record<string, { durationOffset: number; intensityOverride?: string }>>({});

  // Explicability Modal
  const [explicabilityOpen, setExplicabilityOpen] = useState(false);

  // Active scenario config
  const currentScenario = useMemo(() => {
    return TRAINING_WEEK_SCENARIOS.find((s) => s.id === activeScenarioId) || TRAINING_WEEK_SCENARIOS[0];
  }, [activeScenarioId]);

  // Selected Day Session
  const selectedDay = useMemo(() => {
    return currentScenario.days.find((d) => d.id === selectedDayId) || currentScenario.days[3];
  }, [currentScenario, selectedDayId]);

  const isCustomized = Object.keys(customAdjustments).length > 0;

  // Compute live adjusted metrics
  const computedMetrics = useMemo(() => {
    let totalKm = currentScenario.totalVolumeKm;
    let totalLoad = currentScenario.totalLoadUA;

    Object.entries(customAdjustments).forEach(([dayId, adj]) => {
      const originalDay = currentScenario.days.find((d) => d.id === dayId);
      if (originalDay && adj.durationOffset !== 0) {
        const ratio = (originalDay.durationMinutes + adj.durationOffset) / originalDay.durationMinutes;
        totalLoad += Math.round(originalDay.estimatedLoadUA * (ratio - 1));
        totalKm += +(originalDay.targetDistanceKm * (ratio - 1)).toFixed(1);
      }
    });

    const acwr = +(totalLoad / 3250).toFixed(2);
    const readiness = Math.min(99, Math.max(75, Math.round(100 - (acwr > 1.2 ? (acwr - 1.2) * 40 : 0) - (totalLoad > 3700 ? 5 : 0))));

    return {
      totalVolumeKm: +totalKm.toFixed(1),
      totalLoadUA: totalLoad,
      acwrExpected: acwr,
      readinessMatchScore: readiness,
      injuryRisk: acwr > 1.25 ? 'Modéré' : acwr > 1.15 ? 'Faible' : 'Très Faible'
    };
  }, [currentScenario, customAdjustments]);

  // Handle duration adjustment for selected day
  const handleAdjustDuration = (delta: number) => {
    const currentAdj = customAdjustments[selectedDay.id] || { durationOffset: 0 };
    const newOffset = Math.max(-30, Math.min(45, currentAdj.durationOffset + delta));

    setCustomAdjustments((prev) => ({
      ...prev,
      [selectedDay.id]: {
        ...currentAdj,
        durationOffset: newOffset
      }
    }));
  };

  const handleResetAdjustments = () => {
    setCustomAdjustments({});
  };

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
              <span>AI STRATEGY • PLANIFICATION DU MICROCYCLE</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-blue-200 font-mono font-medium">
              Objectif Match {UPCOMING_MATCH.weekday} ({UPCOMING_MATCH.countdown})
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Préparer ma semaine d'entraînement avant le {UPCOMING_MATCH.weekday.toLowerCase()}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/85 font-medium max-w-2xl mt-1 leading-relaxed">
              AMS 360 calibre la charge collective et individuelle (J-6 à J-0), positionne le pic de charge métabolique et organise l'affûtage optimal avant le match face à la {UPCOMING_MATCH.awayTeam}.
            </p>
          </div>

          {/* Sources analyzed row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-blue-300/80">
            <span className="font-bold text-blue-200">Variables calibrées :</span>
            {[
              'Ratio ACWR 7/28j',
              'Charge GPS Catapult',
              'Vitesse Max (Vmax)',
              'Fraîcheur neuromusculaire',
              'Données cliniques LLI / Ischios',
              'Cinétique de récupération 72h'
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
            title="Revenir au tableau de bord sélectionneur"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Tableau de bord</span>
          </button>

          {isCustomized && (
            <button
              onClick={handleResetAdjustments}
              className="px-3.5 py-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/60 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser la semaine</span>
            </button>
          )}

          <button
            onClick={() => setExplicabilityOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-950" />
            <span>Pourquoi ce microcycle ?</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE DU MICROCYCLE (6 METRICS + 3 INSIGHTS PHYSIOLOGIQUES)         */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Synthèse Prédictive de la Semaine d'Entraînement
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            Microcycle 7 Jours (Mardi 29/09 → Lundi 05/10)
          </span>
        </div>

        {/* 6 Microcycle Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Séances Prévues
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              5 séances + Match
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Pic programmé à J-3</span>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
              Charge Totale
            </span>
            <div className="text-xl font-black text-blue-900 font-mono mt-0.5">
              {computedMetrics.totalLoadUA} UA
            </div>
            <span className="text-[10px] text-blue-600 font-medium">Volume calibré</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
              Ratio ACWR Attendu
            </span>
            <div className="text-xl font-black text-emerald-800 font-mono mt-0.5">
              {computedMetrics.acwrExpected}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Zone optimale (Sweet spot)</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Distance Cumulée
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {computedMetrics.totalVolumeKm} km
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Moyenne par joueur</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
              Fraîcheur au Coup d'Envoi
            </span>
            <div className="text-xl font-black text-emerald-800 font-mono mt-0.5">
              {computedMetrics.readinessMatchScore}/100
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Readiness index maximale</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Risque de Blessure
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {computedMetrics.injuryRisk}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold font-mono">0 risque majeur</span>
          </div>
        </div>

        {/* 3 Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/90 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
              ⚡
            </div>
            <div>
              <h4 className="text-xs font-black text-blue-950">Pic de Charge à Jeudi (J-3)</h4>
              <p className="text-xs text-blue-900/85 mt-0.5 font-medium leading-snug">
                La séance la plus intense (890 UA, jeux réduits 4v4) est calée à 72h du match pour garantir la surcompensation glycogénique.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
              ✓
            </div>
            <div>
              <h4 className="text-xs font-black text-emerald-950">Affûtage Dégressif (J-2 & J-1)</h4>
              <p className="text-xs text-emerald-900/85 mt-0.5 font-medium leading-snug">
                Chute de volume de 38% le vendredi et 55% le samedi : préservation de la vivacité et zéro fatigue résiduelle.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
              🏥
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-950">Aménagements Spécifiques Intégrés</h4>
              <p className="text-xs text-amber-900/85 mt-0.5 font-medium leading-snug">
                Programmes individuels synchronisés pour Kylian Mbappé (reprise genou) et Aurélien Tchouaméni (régulation des minutes).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LES 3 SCÉNARIOS DE MICROCYCLE                                          */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>3 Modèles de Semaine d'Entraînement</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Avant {UPCOMING_MATCH.title}
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Sélectionnez une philosophie de microcycle pour voir son déroulé jour par jour et son impact sur la fraîcheur du groupe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {TRAINING_WEEK_SCENARIOS.map((scen) => {
            const isSelected = activeScenarioId === scen.id;

            return (
              <div
                key={scen.id}
                onClick={() => {
                  setActiveScenarioId(scen.id);
                  setCustomAdjustments({});
                }}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {scen.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {scen.totalLoadUA} UA
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    {scen.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium line-clamp-2 leading-relaxed">
                    {scen.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 font-mono text-[11px]">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Volume</span>
                    <strong className="text-slate-900 text-xs">{scen.totalVolumeKm} km</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">ACWR</span>
                    <strong className="text-emerald-700 text-xs">{scen.acwrExpected}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Readiness</span>
                    <strong className="text-blue-700 text-xs">{scen.readinessMatchScore}/100</strong>
                  </div>
                </div>

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
                        <span>Microcycle Actif</span>
                      </>
                    ) : (
                      <span>Sélectionner ce modèle</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. TIMELINE DE LA SEMAINE JOUR PAR JOUR (MARDI -> LUNDI)                  */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Planning Détaillé du Microcycle (Mardi → Lundi)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Cliquez sur un jour pour inspecter les exercices, les focus tactiques et ajuster la charge.
            </p>
          </div>
        </div>

        {/* 7 Days Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {currentScenario.days.map((day) => {
            const isSelected = selectedDayId === day.id;
            const adj = customAdjustments[day.id];
            const effectiveDuration = day.durationMinutes + (adj?.durationOffset || 0);

            const isMatch = day.intensity === 'Match';
            const isHigh = day.intensity === 'Élevée';
            const isMedium = day.intensity === 'Moyenne';

            return (
              <div
                key={day.id}
                onClick={() => setSelectedDayId(day.id)}
                className={`p-3.5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                    : isMatch
                    ? 'bg-slate-950 text-white border-slate-900 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                }`}
              >
                {/* Header Day */}
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isMatch
                          ? 'bg-rose-500 text-white'
                          : isHigh
                          ? 'bg-amber-100 text-amber-900'
                          : isMedium
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {day.matchOffset}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        isMatch ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      {day.dayName}
                    </span>
                  </div>

                  <h4
                    className={`text-xs font-black tracking-tight mt-1 truncate ${
                      isMatch ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {day.dayDate}
                  </h4>
                  <p
                    className={`text-[10.5px] line-clamp-2 mt-0.5 leading-snug font-medium ${
                      isMatch ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {day.title}
                  </p>
                </div>

                {/* Day Metrics Mini */}
                <div
                  className={`pt-2 border-t font-mono text-[10px] space-y-1 ${
                    isMatch ? 'border-slate-800' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={isMatch ? 'text-slate-400' : 'text-slate-400'}>Durée :</span>
                    <strong className={isMatch ? 'text-white' : 'text-slate-900'}>
                      {effectiveDuration} min
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isMatch ? 'text-slate-400' : 'text-slate-400'}>Charge :</span>
                    <strong className={isMatch ? 'text-amber-400' : 'text-blue-700'}>
                      {day.estimatedLoadUA} UA
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isMatch ? 'text-slate-400' : 'text-slate-400'}>Distance :</span>
                    <strong className={isMatch ? 'text-emerald-400' : 'text-slate-700'}>
                      {day.targetDistanceKm} km
                    </strong>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`py-1 text-center rounded-lg text-[10px] font-bold ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : isMatch
                      ? 'bg-white/10 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isSelected ? 'Inspecter' : 'Sélectionner'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. INSPECTION DU JOUR SÉLECTIONNÉ & AJUSTEMENT INTERACTIF                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* COLONNE GAUCHE (7/12) : DÉTAIL DES EXERCICES & FOCUS DU JOUR */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedDay.matchOffset} • {selectedDay.dayName} {selectedDay.dayDate}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                    selectedDay.intensity === 'Élevée'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : selectedDay.intensity === 'Match'
                      ? 'bg-rose-100 text-rose-900 border border-rose-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}
                >
                  Intensité : {selectedDay.intensity}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight mt-1">
                {selectedDay.title}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {selectedDay.mainFocus}
              </p>
            </div>
          </div>

          {/* Exercices & Planning de séance */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-blue-600" />
              <span>Contenu & Ateliers de la Séance :</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedDay.exercises.map((exo, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2 text-xs font-medium text-slate-800"
                >
                  <span className="w-5 h-5 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <span>{exo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aménagements pour les joueurs sensibles */}
          {selectedDay.managedPlayers.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2">
              <span className="text-[10px] font-mono uppercase font-black tracking-wider text-amber-900 block flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Adaptations individuelles pour cette séance :</span>
              </span>
              <div className="space-y-1.5">
                {selectedDay.managedPlayers.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-amber-200 flex items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <strong className="text-slate-900 font-bold">{p.name}</strong>
                      <span className="text-slate-400 text-[10px] ml-1">({p.role})</span>
                    </div>
                    <span className="text-[11px] font-medium text-amber-900">{p.adaptation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Protocole de récupération post-séance */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Protocole de récupération :</span>
            <span className="font-bold text-blue-900">{selectedDay.recoveryProtocol}</span>
          </div>
        </div>

        {/* COLONNE DROITE (5/12) : AJUSTEUR DE CHARGE INTERACTIF & RECALCUL */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Ajuster la Charge de cette Séance
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Simulation Temps Réel</span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Modifiez la durée de la séance du <strong>{selectedDay.dayName}</strong> pour observer l'impact direct sur la charge globale de la semaine et la fraîcheur au coup d'envoi.
            </p>

            {/* Duration Adjuster */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs text-slate-500 font-bold">Durée Programmée :</span>
                <span className="text-base font-black text-slate-900">
                  {selectedDay.durationMinutes + (customAdjustments[selectedDay.id]?.durationOffset || 0)} minutes
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAdjustDuration(-15)}
                  className="flex-1 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
                >
                  -15 min (Alléger)
                </button>
                <button
                  onClick={() => handleAdjustDuration(+15)}
                  className="flex-1 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
                >
                  +15 min (Intensifier)
                </button>
              </div>

              {customAdjustments[selectedDay.id]?.durationOffset !== undefined &&
                customAdjustments[selectedDay.id]?.durationOffset !== 0 && (
                  <div className="pt-2 border-t border-slate-200/60 text-[11px] font-mono text-blue-800 flex items-center justify-between">
                    <span>Ajustement sélectionneur :</span>
                    <strong className="font-bold">
                      {customAdjustments[selectedDay.id].durationOffset > 0 ? '+' : ''}
                      {customAdjustments[selectedDay.id].durationOffset} min
                    </strong>
                  </div>
                )}
            </div>

            {/* Impact recap */}
            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-blue-900 tracking-wider block">
                Impact sur le match du {UPCOMING_MATCH.weekday} :
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-white p-2 rounded-xl border border-blue-200">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">ACWR Semaine</span>
                  <strong className="text-emerald-700 font-black text-sm">{computedMetrics.acwrExpected}</strong>
                </div>
                <div className="bg-white p-2 rounded-xl border border-blue-200">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Fraîcheur Match</span>
                  <strong className="text-blue-900 font-black text-sm">{computedMetrics.readinessMatchScore}/100</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. MODALE D'EXPLICABILITÉ                                                  */}
      {/* ========================================================================= */}
      {explicabilityOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-150 flex flex-col">
            <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white p-5 border-b border-blue-800/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-xs shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
                    Modèle Scientifique AMS 360
                  </span>
                  <h3 className="text-base font-black text-white mt-0.5">
                    Pourquoi ce microcycle d'entraînement ?
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setExplicabilityOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 overflow-y-auto max-h-[60vh]">
              {currentScenario.explicability.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5"
                >
                  <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <div className="text-[10px] font-mono text-slate-400 pt-0.5">
                    Source : {item.source}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setExplicabilityOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
