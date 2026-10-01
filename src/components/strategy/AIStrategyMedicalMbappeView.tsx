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
  FileCheck
} from 'lucide-react';

export const AIStrategyMedicalMbappeView: React.FC = () => {
  const { navigateTo, openMedicalModal } = useAMS();
  const planData = MBAPPE_KNEE_PLAN_DATA;

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
