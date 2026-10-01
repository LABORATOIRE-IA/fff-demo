import React, { useState, useMemo } from 'react';
import { useAMS } from '../../context/AMSContext';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import {
  MBAPPE_KNEE_PLAN_DATA,
  RTPPhaseId,
  RTPPhaseConfig,
  MbappeDailyPlan
} from '../../data/strategyMbappeData';
import {
  Sparkles,
  Stethoscope,
  Activity,
  Heart,
  Zap,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  Sliders,
  ChevronRight,
  FileText,
  UserCheck,
  Check,
  Lock,
  LockOpen
} from 'lucide-react';

export const AIStrategyMbappeView: React.FC = () => {
  const { navigateTo, openMedicalModal } = useAMS();

  // Selected RTP phase for inspection
  const [selectedPhaseId, setSelectedPhaseId] = useState<RTPPhaseId>('phase_2');

  // Selected Day in Mbappe's daily timeline
  const [selectedDayOffset, setSelectedDayOffset] = useState<string>('J-5');

  // Interactive Health Simulator states
  const [simulatedPain, setSimulatedPain] = useState<number>(1);
  const [simulatedMobility, setSimulatedMobility] = useState<number>(98);
  const [simulatedIsokinetic, setSimulatedIsokinetic] = useState<number>(92);

  const planData = MBAPPE_KNEE_PLAN_DATA;

  // Active Phase Config
  const activePhase = useMemo(() => {
    return planData.phases.find((p) => p.id === selectedPhaseId) || planData.phases[1];
  }, [selectedPhaseId, planData]);

  // Selected Day Plan
  const activeDayPlan = useMemo(() => {
    return planData.dailySchedule.find((d) => d.matchOffset === selectedDayOffset) || planData.dailySchedule[1];
  }, [selectedDayOffset, planData]);

  // Dynamic status evaluation based on simulated sliders
  const dynamicStatus = useMemo(() => {
    if (simulatedPain >= 4 || simulatedIsokinetic < 80) {
      return {
        level: 'danger',
        label: 'Alerte Clinique • Décharge Immédiate Requise',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        recommendation: 'Douleur ou asymétrie trop élevée. Interdiction de passer aux courses avec pivot. Repos articulaire et contrôle échographique.',
        matchReadiness: 'Incertain (< 30 min)'
      };
    }
    if (simulatedPain >= 2 || simulatedIsokinetic < 88) {
      return {
        level: 'warning',
        label: 'Phase 2 Maintenue • Vigilance sur les Sprints',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        recommendation: 'Poursuite du travail aérobie linéaire. Reporter les changements de direction brusques à J-2.',
        matchReadiness: 'Entrée en cours de jeu (30-45 min)'
      };
    }
    return {
      level: 'optimal',
      label: 'Protocole Favorable • Feu Vert pour la Phase 3',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      recommendation: 'Excellente tolérance mécanique. Validation des accélérations > 32 km/h et réintégration tactique complète vendredi.',
      matchReadiness: 'Titulaire calibré (60-75 min)'
    };
  }, [simulatedPain, simulatedMobility, simulatedIsokinetic]);

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
              <span>AI STRATEGY • PLAN SUR-MESURE & RÉATHLÉTISATION</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-blue-200 font-mono font-medium">
              Protocole Return to Play (RTP)
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Plan sur-mesure • Kylian Mbappé (#10)</span>
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/85 font-medium max-w-2xl mt-1 leading-relaxed">
              Programme de réathlétisation progressif du ligament collatéral médial (genou droit) pour une disponibilité optimale face à la {UPCOMING_MATCH.awayTeam}.
            </p>
          </div>

          {/* Sources analyzed row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-blue-300/80">
            <span className="font-bold text-blue-200">Données synchronisées :</span>
            {[
              'Bilan IRM Clairefontaine',
              'Testing LLI Dr. Le Gall',
              'Capteurs GPS Catapult',
              'Isocinétisme Cybex',
              'Tapis Alter-G',
              'Dialogue Staff Real Madrid'
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

          <button
            onClick={() => {
              navigateTo('joueur_360', { playerId: 'mbappe' });
            }}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Voir Joueur 360</span>
          </button>

          <button
            onClick={() => openMedicalModal('mbappe')}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Stethoscope className="w-3.5 h-3.5 text-slate-950" />
            <span>Bilan Médical FFF</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE CLINIQUE & OBJECTIFS MATCH                                     */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-rose-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Bilan Clinique & Diagnostic Fédéral
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Phase 2 Active • Évolution Favorable
          </span>
        </div>

        {/* Clinical diagnosis details */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900">Diagnostic Médical :</span>
            <span className="text-[10px] font-mono text-slate-400">Date lésion : {planData.player.injuryDate}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {planData.clinicalSummary.diagnosis}
          </p>
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-blue-900 font-medium">
            🔍 <strong>Contrôle Imagerie :</strong> {planData.clinicalSummary.mriResult}
          </div>
        </div>

        {/* 4 Clinical Indicators Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Douleur à l'effort
            </span>
            <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
              {planData.clinicalSummary.currentPainEffort}/10
            </div>
            <span className="text-[10px] text-slate-500 font-medium">EVA très basse (0 au repos)</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Mobilité Articulaire
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              100%
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Extension 0° / Flexion 140°</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Symétrie Isocinétique
            </span>
            <div className="text-xl font-black text-blue-900 font-mono mt-0.5">
              {planData.clinicalSummary.isokineticSymmetry}%
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Seuil requis &gt; 90% (Validé)</span>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
              Temps de Jeu Projeté
            </span>
            <div className="text-xl font-black text-blue-900 font-mono mt-0.5">
              60 - 75 min
            </div>
            <span className="text-[10px] text-blue-600 font-medium">Plan de gestion titulaire</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LES 4 PHASES DU PROTOCOLE RETURN TO PLAY                               */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Les 4 Phases du Protocole Return to Play</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Genou Droit
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Parcours gradué validé scientifiquement pour garantir une reprise sans risque de récidive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {planData.phases.map((phase) => {
            const isSelected = selectedPhaseId === phase.id;
            const isDone = phase.status === 'completed';
            const isCurrent = phase.status === 'in_progress';

            return (
              <div
                key={phase.id}
                onClick={() => setSelectedPhaseId(phase.id)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                    : isCurrent
                    ? 'bg-white border-amber-300 shadow-xs'
                    : isDone
                    ? 'bg-slate-50/70 border-slate-200 opacity-80'
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

                <div className="pt-2 border-t border-slate-100 text-[10px] font-mono space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Vitesse cible :</span>
                    <strong className="text-slate-900">{phase.gpsTargetMetrics.maxSpeedKmH}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Distance :</span>
                    <strong className="text-blue-700">{phase.gpsTargetMetrics.targetDistanceKm}</strong>
                  </div>
                </div>

                <div
                  className={`py-1 text-center rounded-lg text-[10px] font-bold ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isSelected ? 'Inspecter les critères' : 'Voir les détails'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DÉTAIL DE LA PHASE SÉLECTIONNÉE (CRITÈRES & EXERCICES)                 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Phase {activePhase.phaseNumber} • Détail des Critères de Passage
            </span>
            <h3 className="text-base font-black text-slate-900 mt-1">
              {activePhase.title}
            </h3>
          </div>
          <div className="text-xs font-mono bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700">
            Objectif : <strong>{activePhase.clinicalObjective}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Critères de validation */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
            <span className="text-[10px] font-mono uppercase font-black tracking-wider text-emerald-900 block flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Critères de validation exigés :</span>
            </span>
            <div className="space-y-1.5">
              {activePhase.clearanceCriteria.map((crit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{crit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ateliers terrain */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <span className="text-[10px] font-mono uppercase font-black tracking-wider text-slate-900 block flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Ateliers & Courses sur Terrain :</span>
            </span>
            <div className="space-y-1.5">
              {activePhase.fieldDrills.map((drill, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800">
                  {drill}
                </div>
              ))}
            </div>
          </div>

          {/* Renforcement & Gym */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <span className="text-[10px] font-mono uppercase font-black tracking-wider text-slate-900 block flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Gymnase & Renforcement Musculaire :</span>
            </span>
            <div className="space-y-1.5">
              {activePhase.gymDrills.map((drill, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800">
                  {drill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. TIMELINE QUOTIDIENNE (MATIN / APRÈS-MIDI) & SIMULATEUR DYNAMIQUE        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* COLONNE GAUCHE (7/12) : DÉROULÉ JOURNALIER MBAPPÉ */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Planning Quotidien Individualisé (Matin & Après-Midi)
              </h3>
            </div>
          </div>

          {/* Day switcher pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {planData.dailySchedule.map((day) => (
              <button
                key={day.matchOffset}
                onClick={() => setSelectedDayOffset(day.matchOffset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 font-mono ${
                  selectedDayOffset === day.matchOffset
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {day.matchOffset} • {day.dayName}
              </button>
            ))}
          </div>

          {/* Morning & Afternoon session cards */}
          <div className="space-y-3">
            {/* Morning */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-extrabold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  Matin • {activeDayPlan.morningSession.duration} ({activeDayPlan.morningSession.location})
                </span>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {activeDayPlan.morningSession.loadUA} UA
                </span>
              </div>
              <h4 className="text-xs font-black text-slate-900">
                {activeDayPlan.morningSession.title}
              </h4>
              <ul className="space-y-1 pt-1">
                {activeDayPlan.morningSession.details.map((d, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 font-medium">
                    <span className="text-blue-600">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Afternoon */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-extrabold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                  Après-Midi • {activeDayPlan.afternoonSession.duration} ({activeDayPlan.afternoonSession.location})
                </span>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {activeDayPlan.afternoonSession.loadUA} UA
                </span>
              </div>
              <h4 className="text-xs font-black text-slate-900">
                {activeDayPlan.afternoonSession.title}
              </h4>
              <ul className="space-y-1 pt-1">
                {activeDayPlan.afternoonSession.details.map((d, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 font-medium">
                    <span className="text-indigo-600">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medical Milestone */}
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">Jalon Médical :</span>
                <strong className="text-emerald-950 font-bold">{activeDayPlan.medicalMilestone}</strong>
              </div>
              <span className="text-[10px] font-mono text-slate-500 shrink-0">
                Supervisé par {activeDayPlan.medicalOfficer}
              </span>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE (5/12) : SIMULATEUR D'ADAPTATION SELON L'ÉTAT DE FORME */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Simulateur d'Adaptation Clinique
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Feedback Dynamique</span>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Ajustez les sensations et données de test de Kylian Mbappé pour voir l'adaptation immédiate du protocole d'entraînement.
          </p>

          <div className="space-y-3.5">
            {/* Slider 1: Douleur ressentie à l'effort */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 font-bold">Douleur ressentie à l'effort (EVA) :</span>
                <span className="text-sm font-black text-slate-900">{simulatedPain} / 10</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={simulatedPain}
                onChange={(e) => setSimulatedPain(+e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 (Aucune gêne)</span>
                <span>3 (Seuil alerte)</span>
                <span>6 (Douleur aiguë)</span>
              </div>
            </div>

            {/* Slider 2: Symétrie Isocinétique Cybex */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 font-bold">Symétrie Force Quadriceps :</span>
                <span className="text-sm font-black text-blue-700">{simulatedIsokinetic} %</span>
              </div>
              <input
                type="range"
                min="75"
                max="100"
                step="1"
                value={simulatedIsokinetic}
                onChange={(e) => setSimulatedIsokinetic(+e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>75% (Déficit)</span>
                <span>90% (Seuil match)</span>
                <span>100% (Parfait)</span>
              </div>
            </div>

            {/* Dynamic Status Recommendation Box */}
            <div className={`p-4 rounded-2xl border space-y-2 ${dynamicStatus.badgeColor}`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-black tracking-wider">
                  Recommandation Staff FFF :
                </span>
                <span className="text-[10px] font-mono font-bold">
                  {dynamicStatus.matchReadiness}
                </span>
              </div>
              <h4 className="text-xs font-black">{dynamicStatus.label}</h4>
              <p className="text-xs leading-relaxed font-medium">
                {dynamicStatus.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
