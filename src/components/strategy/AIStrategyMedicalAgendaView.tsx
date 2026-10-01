import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  MEDICAL_AGENDA_PLANNING_DATA,
  WeeklyMedicalForecast
} from '../../data/strategyMedicalAgendaData';
import {
  Sparkles,
  Calendar,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Heart,
  ShieldCheck,
  Stethoscope,
  Users,
  Sliders,
  HelpCircle,
  X
} from 'lucide-react';

export const AIStrategyMedicalAgendaView: React.FC = () => {
  const { navigateTo } = useAMS();
  const agenda = MEDICAL_AGENDA_PLANNING_DATA;

  // Selected week for deep dive
  const [selectedWeekNumber, setSelectedWeekNumber] = useState<number>(1);

  const activeWeek = agenda.weeklyForecasts.find((w) => w.weekNumber === selectedWeekNumber) || agenda.weeklyForecasts[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12 select-none">
      {/* ========================================================================= */}
      {/* 1. CONCEPT & HEADER PREMIUM                                               */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white p-5 sm:p-6 rounded-3xl border border-blue-500/30 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest font-black text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-500/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>OBJECTIFS STAFF MÉDICAL • PLANIFICATION & PRÉDICTION SUR 2 MOIS</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-slate-300 font-mono font-medium">
              Octobre — Novembre 2026
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Préparer mon agenda sur les deux prochains mois</span>
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/85 font-medium max-w-2xl mt-1 leading-relaxed">
              Modélisation algorithmique des pics de blessure sur 8 semaines, planification des soins masso-kinésithérapiques et dimensionnement de la réserve pour les urgences.
            </p>
          </div>

          {/* Sources analyzed row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-slate-300">
            <span className="font-bold text-blue-300">Variables prédictives :</span>
            {[
              'Calendrier UEFA / LDC / Championnats',
              'Charge ACWR cumulée',
              'Fenêtres de fatigue excentrique',
              'Créneaux spécialistes (Cardio, Podologue, Ortho)',
              'Disponibilité pôle kiné'
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
            title="Revenir au tableau de bord médical"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Dashboard Médical</span>
          </button>

          <div className="px-3.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>8 Semaines Modélisées</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE DES RESSOURCES & RÉPARTITION DU TEMPS MÉDICAL (HEBDO)         */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Allocation Hebdomadaire du Temps Médical & Réserve Urgences
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            Total : 56h / semaine encadrées
          </span>
        </div>

        {/* 4 Time Allocation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block font-mono">
              Soins Planifiés (Kiné)
            </span>
            <div className="text-2xl font-black text-blue-900 font-mono">
              {agenda.timeAllocationWeekly.scheduledCareHours}h / sem.
            </div>
            <p className="text-[10.5px] text-blue-700 font-medium">Thérapie manuelle, balnéo, Compex</p>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block font-mono">
              Dépistage & Prévention
            </span>
            <div className="text-2xl font-black text-emerald-900 font-mono">
              {agenda.timeAllocationWeekly.preventiveScreeningHours}h / sem.
            </div>
            <p className="text-[10.5px] text-emerald-700 font-medium">Échos, isocinétisme, bilans sanguins</p>
          </div>

          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block font-mono">
              Réserve Urgences & Traumas
            </span>
            <div className="text-2xl font-black text-amber-900 font-mono">
              {agenda.timeAllocationWeekly.emergencyTraumaBufferHours}h / sem.
            </div>
            <p className="text-[10.5px] text-amber-700 font-medium">Créneaux bloqués pour imprévus de match</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block font-mono">
              Coordination Staffs Club
            </span>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {agenda.timeAllocationWeekly.staffCoordinationHours}h / sem.
            </div>
            <p className="text-[10.5px] text-slate-500 font-medium">Échanges avec les médecins européens</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TIMELINE PRÉDICTIVE DES 8 SEMAINES (PICS DE BLESSURE & SOINS)          */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Prédiction Hebdomadaire des Risques & Besoins de Soins (S1 à S8)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Cliquez sur une semaine pour inspecter le contexte de charge, les structures vulnérables et les actions requises.
            </p>
          </div>
        </div>

        {/* 8 Weeks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {agenda.weeklyForecasts.map((w) => {
            const isSelected = selectedWeekNumber === w.weekNumber;
            const isCritical = w.riskZone === 'Critique';
            const isHigh = w.riskZone === 'Élevé';
            const isMedium = w.riskZone === 'Modéré';

            return (
              <div
                key={w.weekNumber}
                onClick={() => setSelectedWeekNumber(w.weekNumber)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      Semaine {w.weekNumber}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.2 rounded-full ${
                        isCritical
                          ? 'bg-rose-100 text-rose-900 font-black'
                          : isHigh
                          ? 'bg-amber-100 text-amber-900 font-bold'
                          : isMedium
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      Risque {w.riskZone} ({w.predictedInjuryRiskPercent}%)
                    </span>
                  </div>

                  <h4 className="text-xs font-black text-slate-900 mt-1.5 truncate">
                    {w.theme}
                  </h4>
                  <p className="text-[10.5px] text-slate-500 font-mono mt-0.5">
                    {w.dateRange}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] font-mono space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Soins requis :</span>
                    <strong className="text-blue-700">{w.requiredCareHours}h</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Réserve urgence :</span>
                    <strong className="text-amber-700">{w.emergencyReserveHours}h</strong>
                  </div>
                </div>

                <div
                  className={`py-1 text-center rounded-lg text-[10px] font-bold ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {isSelected ? 'Semaine Sélectionnée' : 'Inspecter'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DÉTAIL DE LA SEMAINE SÉLECTIONNÉE                                      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Détail des Actions (7/12) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Semaine {activeWeek.weekNumber} • {activeWeek.dateRange}
              </span>
              <h3 className="text-base font-black text-slate-900 mt-1">
                {activeWeek.theme}
              </h3>
            </div>
            <div className="text-xs font-mono font-bold text-slate-700">
              Contexte : <strong className="text-blue-900">{activeWeek.matchLoadContext}</strong>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-mono uppercase font-black text-slate-900 block">
              Actions Médicales & Dépistages Clés :
            </span>
            <ul className="space-y-1.5">
              {activeWeek.keyMedicalActions.map((act, i) => (
                <li key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Structures Vulnérables & RDV Spécialistes (5/12) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Structures à Risque cette Semaine
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {activeWeek.vulnerableStructures.map((struct, i) => (
              <span key={i} className="px-3 py-1 bg-amber-50 text-amber-900 rounded-xl border border-amber-200 text-xs font-bold font-mono">
                ⚠️ {struct}
              </span>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-mono uppercase font-black text-slate-900 block">
              Consultations Spécialistes Programmées sur la Période :
            </span>
            <div className="space-y-1.5">
              {agenda.specialistAppointments.map((slot, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">{slot.specialistTitle}</strong>
                    <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
                      {slot.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{slot.doctorName} • {slot.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
