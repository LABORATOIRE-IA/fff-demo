import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  TEAM_MANAGER_TODO_DATA
} from '../../data/strategyTeamManagerData';
import {
  Sparkles,
  Building,
  Users,
  Shield,
  Plane,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Award,
  Ticket,
  MapPin,
  FileCheck,
  HelpCircle,
  X
} from 'lucide-react';

export const AIStrategyTeamManagerOverviewView: React.FC = () => {
  const { navigateTo, players } = useAMS();
  const overview = TEAM_MANAGER_TODO_DATA.operationalOverview;

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
              <span>OBJECTIFS TEAM MANAGER • REGARD GLOBAL ÉQUIPE & LOGISTIQUE</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-slate-300 font-mono font-medium">
              Délégation Tricolore FFF (42 Membres)
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Cockpit Opérationnel Global • {overview.eventTitle}</span>
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/85 font-medium max-w-2xl mt-1 leading-relaxed">
              Supervision intégrale de la délégation française : conformité administrative des 24 joueurs et 18 membres du staff, hébergement au Château, accréditations UEFA et billetterie présidentielle.
            </p>
          </div>

          {/* Sources analyzed row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-slate-300">
            <span className="font-bold text-amber-300">Pôles opérationnels sous contrôle :</span>
            {[
              '24 Joueurs Convoqués',
              '18 Membres Staff',
              'Passports & Fiches UEFA 100%',
              '42 Chambres Individuelles',
              '84 Places Familles & VIP'
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
            title="Revenir au tableau de bord team manager"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Dashboard Logistique</span>
          </button>

          <button
            onClick={() => navigateTo('ai_strategy_team_manager_todo')}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
            <span>To-Do List Automatisée</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE DE LA DÉLÉGATION (6 METRICS CLÉS)                             */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Synthèse Opérationnelle de la Délégation
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-300">
            {overview.squadSummary.delegationTotal} Personnes Prises en Charge
          </span>
        </div>

        {/* 6 Grid Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block font-mono">
              Effectif Joueurs
            </span>
            <div className="text-xl font-black text-blue-900 font-mono mt-0.5">
              {overview.squadSummary.playersCount}
            </div>
            <span className="text-[10px] text-blue-700 font-medium">Liste des 24 complète</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block font-mono">
              Membres Staff
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {overview.squadSummary.staffCount}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">4 pôles opérationnels</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block font-mono">
              Conformité Visas / Pass
            </span>
            <div className="text-xl font-black text-emerald-800 font-mono mt-0.5">
              {overview.squadSummary.passportsValidPercent}%
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">42 passeports valides</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block font-mono">
              Accréditations UEFA
            </span>
            <div className="text-xl font-black text-emerald-800 font-mono mt-0.5">
              {overview.squadSummary.accreditationsValidated} / 42
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Badges activés</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block font-mono">
              Chambrage Château
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              42 indiv.
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Aile Ouest privatisée</span>
          </div>

          <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block font-mono">
              Places Familles / VIP
            </span>
            <div className="text-xl font-black text-amber-900 font-mono mt-0.5">
              {overview.vipAndTicketing.totalAllocatedSeats}
            </div>
            <span className="text-[10px] text-amber-700 font-medium">100% attribuées</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DÉPARTEMENTS DU STAFF & NIVEAU DE PRÉPARATION                           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Les 4 Pôles du Staff FFF & État Opérationnel
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500">18 Spécialistes Mobilisés</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {overview.staffDepartments.map((dept, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-blue-700">{dept.membersCount} membres</span>
                <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.2 rounded">
                  {dept.readinessStatus}
                </span>
              </div>
              <h4 className="text-xs font-black text-slate-900">{dept.department}</h4>
              <p className="text-[11px] text-slate-600 font-medium">
                Responsable : <strong>{dept.leadName}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. POINTS DE CONTRÔLE CRITIQUES & GESTION BILLETTERIE VIP                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Points de Contrôle Critiques (7/12) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Points de Contrôle Temporels Critiques
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400">J-2 à J-0</span>
          </div>

          <div className="space-y-2.5">
            {overview.criticalCheckpoints.map((cp, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.2 rounded">
                      {cp.timing}
                    </span>
                    <strong className="text-xs font-black text-slate-900">{cp.checkpointTitle}</strong>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium pl-1">{cp.notes}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-slate-400">{cp.responsiblePerson}</span>
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      cp.status === 'Validé'
                        ? 'bg-emerald-100 text-emerald-800'
                        : cp.status === 'Urgent'
                        ? 'bg-rose-100 text-rose-800 font-black'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {cp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billetterie Familles & VIP (5/12) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Répartition Billetterie & Salons VIP
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900">
              {overview.vipAndTicketing.totalAllocatedSeats} Billets
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block font-bold">Places Familles & Proches Joueurs</strong>
                <span className="text-[10px] text-slate-500">Tribune Officielle Basse • E-billets sécurisés</span>
              </div>
              <span className="text-base font-black font-mono text-blue-700">
                {overview.vipAndTicketing.familySeatsAssigned}
              </span>
            </div>

            <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div>
                <strong className="text-amber-950 block font-bold">Salon Présidentiel FFF</strong>
                <span className="text-[10px] text-amber-800">Président FFF, Ministères & Invités d’Honneur</span>
              </div>
              <span className="text-base font-black font-mono text-amber-900">
                {overview.vipAndTicketing.vipPresidentialLounge}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block font-bold">Partenaires Majeurs (Nike, TF1)</strong>
                <span className="text-[10px] text-slate-500">Loges panoramiques privatives</span>
              </div>
              <span className="text-base font-black font-mono text-slate-900">
                {overview.vipAndTicketing.sponsorSeats}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
