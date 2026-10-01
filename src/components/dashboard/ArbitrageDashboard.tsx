import React from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  Shield,
  Activity,
  Award,
  Calendar,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Users,
  Eye,
  FileCheck,
  Stethoscope,
  Lock,
  Sparkles,
  Video
} from 'lucide-react';
import { OFFICIAL_REFEREES_LIST } from '../../data/refereesData';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import { ROLE_OBJECTIVES_DATA } from '../../data/objectivesData';
import { DataActionBar } from '../layout/DataActionBar';
import { CommentTriggerButton } from '../comments/CommentTriggerButton';

export const ArbitrageDashboard: React.FC = () => {
  const { navigateTo, openCommentsDrawer, openMedicalModal, notifications, handleNotificationClick, roleConfig, setSelectedObjective } = useAMS();

  const referees = OFFICIAL_REFEREES_LIST;
  const objectives = ROLE_OBJECTIVES_DATA.arbitrage;
  const centralReferees = referees.filter((r) => r.position === 'Arbitre Central');
  const assistantReferees = referees.filter((r) => r.position === 'Arbitre Assistant');
  const varReferees = referees.filter((r) => r.position === 'Arbitre Vidéo (VAR)');

  const refereeDesignations = [
    {
      match: UPCOMING_MATCH.title,
      competition: UPCOMING_MATCH.competition,
      date: UPCOMING_MATCH.dateTime,
      stadium: UPCOMING_MATCH.fullVenue,
      central: 'François Letexier',
      assistant1: 'Cyril Mugnier',
      assistant2: 'Mehdi Rahmouni',
      fourth: 'Willy Delajod',
      var: 'Jérôme Brisard',
      status: 'Préparation en cours'
    }
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <header className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">FFF / AMS 360 · Direction de l’arbitrage</p>
          <h1 className="mt-1 text-lg font-black text-slate-950">Dashboard arbitrage</h1>
          <p className="mt-1 text-xs text-slate-500">Vue de pilotage · {roleConfig.userName}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CommentTriggerButton
            targetId="dashboard-arbitrage"
            targetType="general"
            targetTitle="Dashboard arbitrage FFF"
            variant="button"
            label="Notes"
          />
          <DataActionBar scope="dashboard" customImportLabel="Importer" customExportLabel="Exporter bilan" />
        </div>
      </header>

      <section aria-label="Prochain match arbitral" className="relative overflow-hidden rounded-3xl border border-blue-600/40 bg-gradient-to-r from-[#061838] via-[#0b2b64] to-[#041228] p-5 text-white shadow-xl sm:p-6">
        <div className="absolute right-0 top-0 h-1 w-28 bg-[#e31837]" />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-200">Prochain match · {UPCOMING_MATCH.competition} · {UPCOMING_MATCH.countdown}</span>
          <span className="rounded-md border border-white/20 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold text-white">{UPCOMING_MATCH.shortDate}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl font-black sm:text-3xl">{UPCOMING_MATCH.homeTeam} <span className="text-blue-300">—</span> {UPCOMING_MATCH.awayTeam}</h2>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-100/80">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{UPCOMING_MATCH.dateTime}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{UPCOMING_MATCH.venue}</span>
            </p>
          </div>
          <button
            onClick={() => navigateTo('ai_strategy_referee_prep')}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#e31837] px-4 py-2.5 text-xs font-black text-white transition hover:bg-red-700"
          >
            Préparer le match <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      <section aria-label="Objectifs en cours" className="rounded-xl border border-slate-200 bg-white px-4 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 py-3">
          <div>
            <h2 className="text-sm font-black text-slate-950">Objectifs en cours</h2>
          </div>
          <span className="text-[10px] font-semibold text-slate-500">{objectives.length} priorités DTA</span>
        </div>
        <div className="divide-y divide-slate-100">
          {objectives.map((objective, index) => (
            <article key={objective.id} className="flex items-center justify-between gap-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="w-7 shrink-0 text-[10px] font-mono font-bold text-slate-400">0{index + 1}</span>
                <div className="min-w-0">
                  <h3 className="truncate text-xs font-bold text-slate-900">{objective.title}</h3>
                  <p className="mt-0.5 truncate text-[10px] text-slate-500">{objective.category} · {objective.badge}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedObjective(objective);
                  navigateTo(objective.specializedToolRoute || 'ai_strategy_referee_prep');
                }}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Ouvrir <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. ESPACE MAJEUR OBJECTIFS ARBITRE : 2 HUBS STRATÉGIQUES D'AIDE À LA DÉCISION */}
      {/* ========================================================================= */}
      <details className="group rounded-xl border border-slate-200 bg-white">
        <summary className="cursor-pointer list-none px-4 py-3 text-xs font-bold text-slate-700 [&::-webkit-details-marker]:hidden">
          Préparation de match et débriefing
        </summary>
        <div className="space-y-3.5 border-t border-slate-100 p-3 sm:p-4">
        {/* Module 1 : Grand bandeau Préparer mon prochain match */}
        <div
          onClick={() => navigateTo('ai_strategy_referee_prep')}
          className="relative bg-gradient-to-r from-[#071329] via-[#0d2248] to-[#040c1b] text-white p-5 sm:p-6 rounded-3xl border border-amber-500/40 shadow-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-amber-400/70"
        >
          {/* Subtle decorative background glow */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-3 max-w-3xl">
              {/* Top tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-300 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-400/40 flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>OBJECTIFS ARBITRE • PRÉPARATION DE MATCH IA</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-300 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-700/50">
                  {UPCOMING_MATCH.competition} • {UPCOMING_MATCH.countdown}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                  <span>Préparer mon prochain match • {UPCOMING_MATCH.title}</span>
                  <span className="hidden sm:inline-block text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    {refereeDesignations[0].status}
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/90 font-medium mt-1 leading-relaxed">
                  Mise en avant prédictive des points d'attention sur les équipes, joueurs ayant des antécédents, profils comportementaux (simulations, contestations) et points de vigilance issus du tracking GPS & VAR.
                </p>
              </div>

              {/* 3 Quick Data Pillars */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 text-[11px] font-mono text-slate-200">
                <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>3 duels à antécédents sous haute tension</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>4 profils comportementaux vidéo (Simulations / Fautes tactiques)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>4 alertes de tracking & angles morts caméras VAR</span>
                </div>
              </div>
            </div>

            {/* Large CTA Button */}
            <div className="shrink-0 flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('ai_strategy_referee_prep');
                }}
                className="w-full sm:w-auto px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 group-hover:scale-105 cursor-pointer"
              >
                <span>Préparer le Match</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Module 2 : Grand bandeau Analyser mon dernier match */}
        <div
          aria-disabled="true"
          className="relative bg-gradient-to-r from-[#061833] via-[#092248] to-[#030e20] text-white p-5 rounded-3xl border border-blue-600/40 shadow-lg overflow-hidden group opacity-80"
        >
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-blue-200 bg-blue-950/90 px-2.5 py-0.5 rounded-full border border-blue-600/40 flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>OBJECTIFS ARBITRE • DÉBRIEFING DE MATCH & PERFORMANCE</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                  OL 2 — 1 Monaco • Rapport DTA Validé
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Analyser mon dernier match (Performance, Décisions & Amélioration)</span>
                </h3>
                <p className="text-xs text-blue-100/80 font-medium mt-0.5 leading-relaxed">
                  Bilan physique GPS (11.85 km, 13.8m moy. du ballon), Decision Quality Score (96.4% de justesse), revue vidéo des 4 situations clés (Penalty, DOGSO, VAR) et axes de progression DTA.
                </p>
              </div>

              {/* Mini KPIs */}
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10.5px]">
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Note DTA</span>
                  <strong className="text-amber-300 text-xs">8.8 / 10 (Élite)</strong>
                </div>
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Justesse Décisions</span>
                  <strong className="text-emerald-300 text-xs">96.4% (42/44)</strong>
                </div>
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Distance GPS</span>
                  <strong className="text-white text-xs">11.85 km (13.8m moy)</strong>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <button
                disabled
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-full sm:w-auto px-4 py-3 bg-slate-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-not-allowed"
              >
                <span>Analyser le Dernier Match</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
        </div>
      </details>

      {/* Grid: KPIs d'arbitrage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Disponibilité Athlétique
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-emerald-600">91.6%</span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              11 / 12 aptes
            </span>
          </div>
          <p className="text-[10.5px] text-slate-500 font-medium">1 en soins légers (Bastien)</p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Validation Décisions VAR
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-blue-700">96.8%</span>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              +1.2% UEFA
            </span>
          </div>
          <p className="text-[10.5px] text-slate-500 font-medium">Temps moyen de check : 39s</p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Note Observateurs FFF/UEFA
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-amber-600">8.62 / 10</span>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Élite UEFA
            </span>
          </div>
          <p className="text-[10.5px] text-slate-500 font-medium">108 évaluations validées</p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Tests Physiques FIFA SDS
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-emerald-600">100%</span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Conformes
            </span>
          </div>
          <p className="text-[10.5px] text-slate-500 font-medium">VMA & Ariet validés Clairefontaine</p>
        </div>
      </div>

      {/* Grid: Prochaines Désignations & Différenciation Centraux / Assistants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* DÉSIGNATIONS SUR LES PROCHAINS CHOCS (7/12) */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Désignations Officielles & Trios Arbitraux
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Saison 2026/2027
            </span>
          </div>

          <div className="space-y-3 flex-1">
            {refereeDesignations.map((desig, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-blue-300 transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-700 uppercase block">
                      {desig.competition} • {desig.date}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 mt-0.5">{desig.match}</h4>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {desig.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/60 text-xs">
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[9px] font-mono text-slate-400 block font-bold">CENTRAL</span>
                    <span className="font-bold text-slate-900 truncate block">{desig.central}</span>
                    <span className="text-[8px] text-amber-600 font-mono font-semibold">FIFA Elite</span>
                  </div>

                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[9px] font-mono text-slate-400 block font-bold">ASSISTANT 1</span>
                    <span className="font-bold text-slate-900 truncate block">{desig.assistant1}</span>
                    <span className="text-[8px] text-blue-600 font-mono font-semibold">Touche FIFA</span>
                  </div>

                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[9px] font-mono text-slate-400 block font-bold">ASSISTANT 2</span>
                    <span className="font-bold text-slate-900 truncate block">{desig.assistant2}</span>
                    <span className="text-[8px] text-blue-600 font-mono font-semibold">Touche FIFA</span>
                  </div>

                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[9px] font-mono text-slate-400 block font-bold">VAR</span>
                    <span className="font-bold text-slate-900 truncate block">{desig.var}</span>
                    <span className="text-[8px] text-indigo-600 font-mono font-semibold">Vidéo UEFA</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigateTo('matchs_entrainements')}
            className="w-full py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Consulter l'ensemble des désignations FFF / UEFA</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </button>
        </div>

        {/* SUIVI MÉDICAL & BILANS CLINIQUES ARBITRES (5/12) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Stethoscope className="w-4 h-4 text-rose-600 shrink-0" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide truncate">
                Pôle Médical Arbitres
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 shrink-0 whitespace-nowrap">
              Dr. Franck Le Gall
            </span>
          </div>

          <div className="space-y-2.5 flex-1">
            <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">Benoît Bastien (Arbitre Central)</span>
                <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  À surveiller
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Contracture aponévrotique soléaire D suite au match de Ligue 1. Échographie rassurante. Travail d'isométrie et vélo guidé. Reprise des courses progressives prévue le 01/10.
              </p>
              <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-500">
                <span>Contrôle : 30/09 à Clairefontaine</span>
                <button
                  onClick={() => openMedicalModal('ref-bastien')}
                  className="font-bold text-blue-700 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Dossier Secret</span>
                  <Lock className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">Stéphanie Frappart (Arbitre Centrale)</span>
                <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Apte 100%
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Bilan cardiologique annuel FIFA validé. ECG d'effort et échocardiographie sans particularité. VMA mesurée à 18.8 km/h.
              </p>
              <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-500">
                <span>Validité : Jusqu'au 09/2027</span>
                <span className="text-emerald-700 font-bold">Certificat FFF délivré</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('suivi_medical')}
            className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-rose-200"
          >
            <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
            <span>Accéder au suivi médical complet des arbitres</span>
          </button>
        </div>
      </div>

      {/* Grid: Spécificités Athlétiques & Fiches 360 Arbitres Centraux vs Assistants */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Corps Arbitral FFF • Profils & Jumeaux Numériques 360°
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Centraux (endurance aérobie, courses axiales), Assistants (courses latérales, alignement hors-jeu) et Spécialistes VAR.
            </p>
          </div>

          <button
            onClick={() => navigateTo('player_search')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Voir toute la liste détaillée</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {referees.map((ref) => {
            const isAssistant = ref.position === 'Arbitre Assistant';
            const isVar = ref.position === 'Arbitre Vidéo (VAR)';

            return (
              <div
                key={ref.id}
                onClick={() => navigateTo('joueur_360', { playerId: ref.id })}
                className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      #{ref.number} • {ref.refereeStats?.gradeLabel}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.2 rounded-full border ${
                        ref.status === 'disponible'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {ref.status === 'disponible' ? 'Disponible' : 'À surveiller'}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors mt-2">
                    {ref.name}
                  </h4>
                  <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                    {ref.position}
                  </div>
                  <div className="text-[10.5px] text-slate-500 font-medium">
                    {ref.club}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Note Observateurs</span>
                    <span className="font-mono font-bold text-slate-900">
                      ★ {ref.refereeStats?.noteObservateurs} / 10
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Validation VAR</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {ref.refereeStats?.decisionsVarConfirmeesPct}%
                    </span>
                  </div>

                  {isAssistant ? (
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Hors-jeu précision</span>
                      <span className="font-mono font-bold text-blue-700">
                        {ref.refereeStats?.alignementHorsJeuPct || 98}%
                      </span>
                    </div>
                  ) : isVar ? (
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Vitesse Check</span>
                      <span className="font-mono font-bold text-indigo-700">
                        {ref.refereeStats?.tempsMoyenVarSec}s
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Distance Match</span>
                      <span className="font-mono font-bold text-slate-900">
                        {ref.refereeStats?.distanceMoyenneKm} km
                      </span>
                    </div>
                  )}

                  <div className="pt-1.5 flex items-center justify-between text-[10px] text-blue-600 font-bold group-hover:underline">
                    <span>Consulter le Jumeau 360°</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
