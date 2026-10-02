import React, { useState, useMemo } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  MBAPPE_KNEE_PLAN_DATA,
  RTPPhaseId
} from '../../data/strategyMbappeData';
import {
  Sparkles,
  Stethoscope,
  Activity,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  UserCheck,
  Zap,
  FileCheck,
  Brain,
  TrendingDown,
  Info
} from 'lucide-react';

const riskTone = (risk: number) =>
  risk < 25
    ? { label: 'Faible', text: 'text-emerald-700', bg: 'bg-emerald-500', soft: 'bg-emerald-50 border-emerald-200' }
    : risk < 35
    ? { label: 'Modéré', text: 'text-amber-700', bg: 'bg-amber-500', soft: 'bg-amber-50 border-amber-200' }
    : { label: 'Élevé', text: 'text-rose-700', bg: 'bg-rose-500', soft: 'bg-rose-50 border-rose-200' };

export const AIStrategyMedicalMbappeView: React.FC = () => {
  const { navigateTo, openMedicalModal } = useAMS();
  const planData = MBAPPE_KNEE_PLAN_DATA;
  const ai = planData.aiRiskPrediction;
  const [selectedMinutes, setSelectedMinutes] = useState<number>(ai.recommendedMinutes);
  const [hoveredFactor, setHoveredFactor] = useState<number | null>(null);
  const scenarioRisk = ai.minutesScenarios.find((s) => s.minutes === selectedMinutes)?.risk ?? 0;
  const scenarioTone = riskTone(scenarioRisk);
  const maxFactorImpact = Math.max(...ai.factors.map((f) => Math.abs(f.impact)));
  const maxTrendRisk = Math.max(...ai.trend.map((t) => t.risk));

  // Selected RTP phase
  const [selectedPhaseId, setSelectedPhaseId] = useState<RTPPhaseId>(planData.currentPhase);
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>(() => {
    const initialCriteria: Record<string, boolean> = {};
    planData.phases.filter((phase) => phase.status === 'completed').forEach((phase) => {
      phase.clearanceCriteria.forEach((_, index) => {
        initialCriteria[`${phase.id}-${index}`] = true;
      });
    });
    return initialCriteria;
  });
  const [validatedPhaseIds, setValidatedPhaseIds] = useState<string[]>([]);
  const currentProgressPhase = planData.phases.find((phase) =>
    phase.status !== 'completed' && !validatedPhaseIds.includes(phase.id)
  );

  const activePhase = useMemo(() => {
    return planData.phases.find((p) => p.id === selectedPhaseId) || planData.phases[1];
  }, [selectedPhaseId, planData]);

  const currentCriteriaKeys = activePhase.clearanceCriteria.map((_, index) => `${activePhase.id}-${index}`);
  const completedCriteriaCount = currentCriteriaKeys.filter((key) => checkedCriteria[key]).length;
  const activePhaseIndex = planData.phases.findIndex((phase) => phase.id === activePhase.id);
  const previousPhasesValidated = planData.phases.slice(0, activePhaseIndex).every((phase) =>
    phase.status === 'completed' || validatedPhaseIds.includes(phase.id)
  );
  const isActivePhaseValidated = activePhase.status === 'completed' || validatedPhaseIds.includes(activePhase.id);
  const phaseReadyToValidate = currentCriteriaKeys.length > 0 &&
    completedCriteriaCount === currentCriteriaKeys.length &&
    previousPhasesValidated &&
    !isActivePhaseValidated;

  const validateActivePhase = () => {
    if (!phaseReadyToValidate) return;
    setValidatedPhaseIds((current) => current.includes(activePhase.id) ? current : [...current, activePhase.id]);
    const nextPhase = planData.phases[activePhaseIndex + 1];
    if (nextPhase) setSelectedPhaseId(nextPhase.id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12 select-none">
      {/* ========================================================================= */}
      {/* 1. CONCEPT & HEADER PREMIUM                                               */}
      {/* ========================================================================= */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-rose-700">Suivi médical • Genou droit</p>
          <h1 className="mt-1 text-xl font-black text-slate-950">Rééducation de {planData.player.name}</h1>
          <p className="mt-1 text-sm text-slate-600">{planData.player.injuryType} · Parcours individualisé en quatre étapes</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Revenir au tableau de bord médical"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Dashboard Médical</span>
          </button>

          <button
            onClick={() => openMedicalModal('mbappe')}
            className="px-3.5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Dossier médical</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE CLINIQUE & ÉVOLUTION DE L'IMAGERIE                            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-rose-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Bilan Clinique & Diagnostic Officiel (Genou Droit - LLI)
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-300">
            Phase 2 en cours • Résorption Œdème 85%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <strong className="text-xs font-black text-slate-900">Diagnostic Fédéral :</strong>
            <span className="text-[10px] font-mono text-slate-400">Date lésion : {planData.player.injuryDate}</span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {planData.clinicalSummary.diagnosis}
          </p>
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-blue-900 font-medium">
            🔍 <strong>Contrôle IRM Clairefontaine :</strong> {planData.clinicalSummary.mriResult}
          </div>
        </div>

        {/* 4 Clinical Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Douleur à l'effort
            </span>
            <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
              {planData.clinicalSummary.currentPainEffort} / 10
            </div>
            <span className="text-[10px] text-slate-500 font-medium">EVA très faible</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Mobilité Articulaire
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {planData.clinicalSummary.jointMobility}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Amplitude articulaire</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Symétrie Cybex
            </span>
            <div className="text-xl font-black text-blue-900 font-mono mt-0.5">
              {planData.clinicalSummary.isokineticSymmetry}%
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Mesure isocinétique</span>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
              Réévaluation ciblée
            </span>
            <div className="text-lg font-black text-emerald-900 font-mono mt-0.5">
              {planData.clinicalSummary.targetClearanceDate}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Date indicative</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2b. PRÉDICTION IA • RISQUE DE BLESSURE AU PROCHAIN MATCH                  */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-violet-600" />
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Prédiction IA • Risque de blessure au prochain match
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">{ai.nextMatch}</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-violet-800 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-200 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Fiabilité du modèle : {ai.confidence}%
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Score + simulateur de minutes */}
          <div className="lg:col-span-4 space-y-3">
            <div className={`rounded-2xl border p-4 ${scenarioTone.soft}`}>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Risque estimé · {selectedMinutes} min jouées
              </span>
              <div className="flex items-end gap-2 mt-1">
                <span className={`text-4xl font-black font-mono ${scenarioTone.text}`}>{scenarioRisk}%</span>
                <span className={`mb-1.5 text-xs font-bold ${scenarioTone.text}`}>{scenarioTone.label}</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/80 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-300 ${scenarioTone.bg}`} style={{ width: `${scenarioRisk}%` }} />
              </div>
              <div className="mt-1 flex justify-between text-[9px] font-mono text-slate-400">
                <span>0%</span>
                <span>Seuil d’alerte 35%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-900">Simuler le temps de jeu</h4>
              <div className="grid grid-cols-4 gap-1.5">
                {ai.minutesScenarios.map((s) => (
                  <button
                    type="button"
                    key={s.minutes}
                    onClick={() => setSelectedMinutes(s.minutes)}
                    aria-pressed={selectedMinutes === s.minutes}
                    className={`rounded-lg border px-2 py-1.5 text-[11px] font-bold transition-colors cursor-pointer ${
                      selectedMinutes === s.minutes
                        ? 'bg-rose-600 border-rose-600 text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {s.minutes}′
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {selectedMinutes === ai.recommendedMinutes
                  ? `Recommandation IA : sortie vers la ${ai.recommendedMinutes}e minute, compromis entre impact sportif et sécurité du genou.`
                  : scenarioRisk > 35
                  ? 'Au-delà de 75 min, la fatigue excentrique fait dépasser le seuil d’alerte.'
                  : 'Risque réduit, mais temps de jeu limité pour le schéma offensif.'}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">Évolution du risque</h4>
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  {ai.trend[0].risk - ai.trend[ai.trend.length - 1].risk} pts
                </span>
              </div>
              <div className="mt-3 flex items-end gap-1.5 h-20">
                {ai.trend.map((t) => (
                  <div key={t.date} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[9px] font-mono text-slate-500">{t.risk}</span>
                    <div className={`w-full rounded-t ${riskTone(t.risk).bg}`} style={{ height: `${(t.risk / maxTrendRisk) * 100}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-1 flex gap-1.5">
                {ai.trend.map((t) => (
                  <span key={t.date} className="flex-1 text-center text-[9px] font-mono text-slate-400">{t.date}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Explication des facteurs */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Comment l’IA arrive à {ai.minutesScenarios.find((s) => s.minutes === ai.recommendedMinutes)?.risk}% (scénario {ai.recommendedMinutes} min)</h4>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Partant du risque moyen d’un attaquant international, chaque donnée ajoute (rouge) ou retire (vert) des points. Survolez un facteur pour le détail.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3 rounded-lg bg-white border border-slate-200 px-3 py-2">
                <span className="w-40 shrink-0 text-xs font-bold text-slate-700">Risque de base</span>
                <span className="flex-1 text-[11px] text-slate-500">Population de référence</span>
                <span className="w-12 text-right text-xs font-black font-mono text-slate-900">{ai.baselineRisk}%</span>
              </div>

              {ai.factors.map((f, i) => {
                const width = (Math.abs(f.impact) / maxFactorImpact) * 50;
                const isUp = f.impact > 0;
                return (
                  <div
                    key={f.label}
                    onMouseEnter={() => setHoveredFactor(i)}
                    onMouseLeave={() => setHoveredFactor(null)}
                    className={`rounded-lg border px-3 py-2 transition-colors ${
                      hoveredFactor === i ? 'bg-white border-violet-300' : 'bg-white/70 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-40 shrink-0">
                        <span className="block text-xs font-bold text-slate-800">{f.label}</span>
                        <span className="block text-[10px] font-mono text-slate-500">{f.value}</span>
                      </div>
                      <div className="relative flex-1 h-3">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300" />
                        <div
                          className={`absolute top-0 h-3 rounded ${isUp ? 'bg-rose-400' : 'bg-emerald-400'}`}
                          style={isUp ? { left: '50%', width: `${width}%` } : { right: '50%', width: `${width}%` }}
                        />
                      </div>
                      <span className={`w-12 text-right text-xs font-black font-mono ${isUp ? 'text-rose-700' : 'text-emerald-700'}`}>
                        {isUp ? '+' : '−'}{Math.abs(f.impact)}
                      </span>
                    </div>
                    {hoveredFactor === i && (
                      <p className="mt-1.5 text-[11px] text-slate-600 leading-snug">
                        {f.explanation} <span className="text-slate-400">· Source : {f.source}</span>
                      </p>
                    )}
                  </div>
                );
              })}

              <div className="flex items-center gap-3 rounded-lg bg-violet-50 border border-violet-200 px-3 py-2">
                <span className="w-40 shrink-0 text-xs font-black text-violet-900">Risque prédit</span>
                <span className="flex-1 text-[11px] text-violet-700">Base + somme des facteurs</span>
                <span className="w-12 text-right text-sm font-black font-mono text-violet-900">
                  {ai.baselineRisk + ai.factors.reduce((sum, f) => sum + f.impact, 0)}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
              {ai.analysisSteps.map((step, i) => (
                <div key={step.title} className="rounded-lg border border-slate-200 bg-white p-2.5">
                  <span className="text-[10px] font-black text-violet-700">{i + 1}. {step.title}</span>
                  <p className="mt-0.5 text-[10px] text-slate-600 leading-snug">{step.detail}</p>
                </div>
              ))}
            </div>

            <p className="flex items-start gap-1.5 text-[10px] text-slate-500">
              <Info className="w-3 h-3 mt-0.5 shrink-0" />
              <span>{ai.modelDescription} Aide à la décision : la décision finale reste celle du médecin.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LES 4 PHASES DU PROTOCOLE DE SOINS & RÉATHLÉTISATION                   */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Feuille de route de rééducation</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Chaque étape est validée avant d’ouvrir la suivante, avec l’équipe médicale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {planData.phases.map((phase) => {
            const isSelected = selectedPhaseId === phase.id;
            const isDone = phase.status === 'completed' || validatedPhaseIds.includes(phase.id);
            const isCurrent = currentProgressPhase?.id === phase.id;

            return (
              <button
                type="button"
                key={phase.id}
                onClick={() => setSelectedPhaseId(phase.id)}
                aria-pressed={isSelected}
                className={`w-full p-4 rounded-2xl border text-left transition-colors cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-400/30 shadow-md'
                    : isCurrent
                    ? 'bg-white border-amber-300 shadow-xs'
                    : isDone
                    ? 'bg-slate-50 border-slate-200 opacity-80'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCurrent
                          ? 'bg-amber-100 text-amber-900 font-black'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isDone ? '✓ Validée' : isCurrent ? '⚡ En cours' : 'À venir'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      {phase.dateRange}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 tracking-tight mt-2">
                    {phase.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium leading-snug line-clamp-2">
                    {phase.subtitle}
                  </p>
                </div>

                <div
                  className={`py-1 text-center rounded-lg text-[10px] font-bold ${
                    isSelected ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isSelected ? 'Inspecter les soins' : 'Sélectionner'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. FEUILLE DE ROUTE INDIVIDUALISÉE & JALONS CLINIQUES                     */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase text-rose-700">
              Étape {activePhase.phaseNumber} sur {planData.phases.length} · {activePhase.dateRange}
            </span>
            <h3 className="mt-1 text-base font-black text-slate-900">{activePhase.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{activePhase.subtitle}</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-800">
            {completedCriteriaCount}/{currentCriteriaKeys.length} critères cochés
          </span>
        </div>

        <p className="text-sm leading-relaxed text-slate-700">{activePhase.clinicalObjective}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">Soins et exercices prévus</h4>
            {activePhase.gymDrills.map((drill) => (
              <div key={drill} className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-800">{drill}</div>
            ))}
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-3">
            <div>
              <h4 className="text-xs font-bold text-emerald-900">Jalons médicaux</h4>
              <p className="mt-1 text-[10px] text-emerald-800">Cochez chaque critère pour valider cette étape.</p>
            </div>
            <div className="space-y-2">
              {activePhase.clearanceCriteria.map((criterion, idx) => {
                const key = `${activePhase.id}-${idx}`;
                return (
                  <label key={key} className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-white p-3 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(checkedCriteria[key])}
                      disabled={!previousPhasesValidated || isActivePhaseValidated}
                      onChange={(event) => setCheckedCriteria((current) => ({ ...current, [key]: event.target.checked }))}
                      className="mt-0.5 accent-emerald-700"
                    />
                    <span>{criterion}</span>
                  </label>
                );
              })}
            </div>
            {!previousPhasesValidated && <p className="text-[10px] font-semibold text-amber-800">Validez les étapes précédentes avant de cocher ces critères.</p>}
            <button
              type="button"
              disabled={!phaseReadyToValidate}
              onClick={validateActivePhase}
              className="w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isActivePhaseValidated ? 'Étape validée' : activePhaseIndex === planData.phases.length - 1 ? 'Valider le feu vert médical' : 'Valider le jalon et ouvrir la suite'}
            </button>
            {validatedPhaseIds.includes(activePhase.id) && <p className="text-[10px] font-bold text-emerald-800">Jalon enregistré pour le suivi fictif.</p>}
          </div>
        </div>
      </section>
    </div>
  );
};
