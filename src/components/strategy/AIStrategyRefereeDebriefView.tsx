import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  REFEREE_MATCH_DEBRIEF_DATA,
  KeyDecisionReview
} from '../../data/strategyRefereeDebriefData';
import {
  Sparkles,
  Award,
  Shield,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Video,
  Clock,
  MapPin,
  Calendar,
  Layers,
  FileCheck,
  ChevronRight,
  Sliders,
  HelpCircle,
  X,
  Play
} from 'lucide-react';

export const AIStrategyRefereeDebriefView: React.FC = () => {
  const { navigateTo } = useAMS();
  const debrief = REFEREE_MATCH_DEBRIEF_DATA;

  // Selected decision for video deep dive
  const [selectedDecisionId, setSelectedDecisionId] = useState<string>('dec-1');

  // Active decision object
  const activeDecision = debrief.keyDecisions.find((d) => d.id === selectedDecisionId) || debrief.keyDecisions[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12 select-none">
      {/* ========================================================================= */}
      {/* 1. CONCEPT & HEADER PREMIUM                                               */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white p-5 sm:p-6 rounded-3xl border border-amber-500/30 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>OBJECTIFS ARBITRE • DÉBRIEFING DE MATCH & PERFORMANCE</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-slate-300 font-mono font-medium">
              Rapport Officiel DTA & Évaluation Vidéo
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Analyser mon dernier match • {debrief.matchInfo.matchTitle}</span>
              <span className="text-sm font-mono font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Score : {debrief.matchInfo.scoreFinal}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/85 font-medium max-w-2xl mt-1 leading-relaxed">
              Bilan athlétique complet par capteurs GPS, taux de justesse des décisions (96.4%), revue vidéo des faits de jeu litigieux et plan d'amélioration personnalisé.
            </p>
          </div>

          {/* Sources analyzed row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-slate-300">
            <span className="font-bold text-amber-300">Indicateurs de performance :</span>
            {[
              'GPS Vector 10 Hz',
              'Distance moyenne au ballon (13.8m)',
              'Revue 4K des décisions VAR',
              'Évaluation DTA (8.8/10)',
              'Cohérence disciplinaire 90 min'
            ].map((src, i, arr) => (
              <span key={src} className="flex items-center gap-1">
                <span className="text-white/90">{src}</span>
                {i < arr.length - 1 && <span className="text-amber-500">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Revenir au tableau de bord arbitrage"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Dashboard Arbitrage</span>
          </button>

          <div className="px-4 py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-black shadow-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-slate-950" />
            <span>Note DTA : {debrief.matchInfo.overallGrade} / 10</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE ATHLÉTIQUE & QUALITÉ DES DÉCISIONS (6 METRICS CLÉS)           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Bilan Athlétique GPS & Précision Décisionnelle
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {debrief.decisionQualitySummary.correctDecisionsPercent}% de Décisions Justes
          </span>
        </div>

        {/* 6 Grid Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Distance Parcourue
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {debrief.physicalPerformance.totalDistanceKm} km
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">+8% vs moy. Ligue 1</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Sprints &gt; 20 km/h
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {debrief.physicalPerformance.highSpeedRunningMeters} m
            </div>
            <span className="text-[10px] text-slate-500 font-medium">{debrief.physicalPerformance.sprintsCount} sprints max</span>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
              Distance Moy. au Ballon
            </span>
            <div className="text-xl font-black text-blue-900 font-mono mt-0.5">
              {debrief.physicalPerformance.avgDistanceToBallMeters} m
            </div>
            <span className="text-[10px] text-blue-600 font-medium">Standard UEFA (&lt;15m)</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
              Précision Décisions
            </span>
            <div className="text-xl font-black text-emerald-800 font-mono mt-0.5">
              {debrief.decisionQualitySummary.correctDecisionsPercent}%
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">42 / 44 validées</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Fautes Sifflées
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {debrief.decisionQualitySummary.foulsWhistledCount}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">{debrief.decisionQualitySummary.yellowCardsCount} jaunes • {debrief.decisionQualitySummary.redCardsCount} rouge</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
              Lucidité Fin de Match
            </span>
            <div className="text-xl font-black text-emerald-800 font-mono mt-0.5">
              {debrief.physicalPerformance.lateMatchLucidityScore}/100
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">0 faute de fatigue à 75-90'</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. REVUE VIDÉO INTERACTIVE DES FAITS DE JEU CLÉS (4 SITUATIONS)           */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Revue Vidéo & Décryptage des 4 Situations Clés</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
              Audit Arbitral DTA
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Cliquez sur un fait de jeu pour voir l'angle de caméra, la distance de l'arbitre et le débriefing pédagogique.
          </p>
        </div>

        {/* 4 Situations Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {debrief.keyDecisions.map((dec) => {
            const isSelected = selectedDecisionId === dec.id;

            return (
              <div
                key={dec.id}
                onClick={() => setSelectedDecisionId(dec.id)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-400/30 shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-slate-100 text-slate-700">
                      {dec.minute}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.2 rounded ${
                        dec.category === 'Penalty' || dec.category === 'Carton Rouge (DOGSO)'
                          ? 'bg-rose-100 text-rose-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {dec.category}
                    </span>
                  </div>

                  <h4 className="text-xs font-black text-slate-900 mt-2 line-clamp-2">
                    {dec.situationTitle}
                  </h4>
                  <p className="text-[10.5px] text-slate-600 mt-1 font-medium line-clamp-2">
                    {dec.decisionOnField}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] font-mono space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Distance arbitre :</span>
                    <strong className="text-slate-900">{dec.refereePositionDistance}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>VAR :</span>
                    <strong className="text-emerald-700">{dec.varOutcome}</strong>
                  </div>
                </div>

                <div
                  className={`py-1 text-center rounded-lg text-[10px] font-bold ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {isSelected ? 'Inspecter la situation' : 'Sélectionner'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DÉTAIL DU FAIT DE JEU SÉLECTIONNÉ (CLIP VIDÉO & ANALYSE DTA)           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {activeDecision.minute} • Fait de jeu majeur : {activeDecision.category}
            </span>
            <h3 className="text-base font-black text-slate-900 mt-1">
              {activeDecision.situationTitle}
            </h3>
          </div>
          <span className="text-xs font-mono bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200 font-bold">
            Qualité décision : {activeDecision.decisionQuality}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Lecteur Vidéo Mockup (7/12) */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-950 p-4 text-white space-y-3">
            <div className="relative aspect-video rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-6 h-6 ml-0.5" />
              </div>
              <span className="absolute bottom-3 left-3 text-xs font-mono font-bold bg-black/60 px-2 py-0.5 rounded">
                {activeDecision.clipThumbnail}
              </span>
              <span className="absolute bottom-3 right-3 text-xs font-mono bg-emerald-500/80 px-2 py-0.5 rounded">
                Distance : {activeDecision.refereePositionDistance}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Décision sur le terrain : <strong>{activeDecision.decisionOnField}</strong></span>
              <span>Statut VAR : <strong className="text-emerald-400">{activeDecision.varOutcome}</strong></span>
            </div>
          </div>

          {/* Analyse & Pédagogie DTA (5/12) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[10px] font-mono uppercase font-black tracking-wider text-slate-900 block">
                Analyse Technique & Positionnement :
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {activeDecision.analysisNote}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <span className="text-[10px] font-mono uppercase font-black tracking-wider text-amber-900 block">
                Retour Pédagogique & Communication :
              </span>
              <p className="text-xs text-amber-950 leading-relaxed font-medium">
                {activeDecision.pedagogyFeedback}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. POINTS FORTS & AXES D'AMÉLIORATION (PLAN D'ACTION DTA)                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Points Forts */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Points Forts Validés lors de la Rencontre
            </h3>
          </div>

          <div className="space-y-2.5">
            {debrief.strengths.map((str, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900">{str.title}</h4>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                    {str.stat}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {str.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Axes d'Amélioration */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Sliders className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Axes d'Amélioration & Plan de Travail
            </h3>
          </div>

          <div className="space-y-2.5">
            {debrief.improvementAreas.map((imp, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="text-xs font-black text-slate-900">{imp.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {imp.description}
                </p>
                <div className="p-2 bg-amber-50/70 rounded-xl border border-amber-200 text-[10.5px] text-amber-950 font-semibold">
                  🛠️ <strong>Exercice préconisé :</strong> {imp.actionPlan}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. SYNTHÈSE OFFICIELLE DE LA DIRECTION TECHNIQUE DE L'ARBITRAGE (DTA)     */}
      {/* ========================================================================= */}
      <div className="p-5 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              Verdict de l'Observateur DTA • {debrief.matchInfo.dtaEvaluator}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">Rapport Validé FFF</span>
        </div>
        <p className="text-xs text-slate-300 font-medium leading-relaxed italic font-serif">
          « {debrief.officialDtaSynthesis} »
        </p>
      </div>
    </div>
  );
};
