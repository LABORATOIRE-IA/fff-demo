import React from 'react';
import { useAMS } from '../../context/AMSContext';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import {
  Users,
  Swords,
  Shield,
  Activity,
  Calendar,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare
} from 'lucide-react';

export const CoachDashboard: React.FC = () => {
  const {
    players,
    squadSummary,
    matches,
    navigateTo,
    openCommentsDrawer,
    notifications,
    handleNotificationClick
  } = useAMS();

  const nextMatch = matches && matches.length > 0 ? matches[0] : null;

  // Coach notes / mentions
  const coachNotes = notifications.filter(
    (n) => n.authorRole?.includes('Médecin') || n.authorRole?.includes('Performance') || n.type === 'mention'
  );

  // Strategic priorities for the next match
  const strategicPoints = [
    {
      title: 'Gestion des temps de jeu (Régulation 60-75 min)',
      description: 'Prescription médicale pour Mathis Dupont et Adrien Rabiot. Anticiper le coaching dès la 60e minute pour garder la fraîcheur sur J2.',
      tag: 'Médical & Coaching',
      tagColor: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      title: 'Animation du pressing haut (4-3-3 asymétrique)',
      description: 'Déclencher la pression dès la première relance axiale adverse. Mbappé et Barcola doivent fermer les couloirs intérieurs.',
      tag: 'Tactique',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: 'Balles arrêtées défensives & offensives',
      description: 'Marquage mixte en zone sur corners. Exploiter le premier poteau de Tchouaméni et la puissance aérienne de Saliba.',
      tag: 'Balles Arrêtées',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* 1. ESPACE MAJEUR AI STRATEGY : 3 MODULES D'AIDE À LA DÉCISION             */}
      {/* ========================================================================= */}
      <div className="space-y-3.5">
        {/* Module 1 : Préparer le prochain match */}
        <div
          onClick={() => navigateTo('ai_strategy')}
          className="relative bg-gradient-to-r from-[#061838] via-[#0b2b64] to-[#041228] text-white p-5 sm:p-6 rounded-3xl border border-blue-600/40 shadow-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-blue-400/60"
        >
          {/* Subtle decorative background glow */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-3 max-w-3xl">
              {/* Top tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-300 bg-blue-950/90 px-3 py-1 rounded-full border border-amber-400/40 flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>AI STRATEGY • ANALYSE DÉCISIONNELLE AVANT-MATCH</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-200 bg-blue-900/60 px-2.5 py-1 rounded-full border border-blue-700/50">
                  {UPCOMING_MATCH.competition} • {UPCOMING_MATCH.countdown}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                  <span>Préparer {UPCOMING_MATCH.homeTeam} — {UPCOMING_MATCH.awayTeam}</span>
                  <span className="hidden sm:inline-block text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Prêt
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/90 font-medium mt-1 leading-relaxed">
                  AMS 360 a croisé les données de forme, disponibilité, charge et GPS de vos 24 joueurs pour générer 3 scénarios tactiques d'aide à la décision.
                </p>
              </div>

              {/* 3 Quick Data Pillars */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 text-[11px] font-mono text-blue-200">
                <div className="flex items-center gap-1.5 bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>24 joueurs analysés</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/50">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>3 compositions simulées (4-3-3 • 4-2-3-1 • 3-4-2-1)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/50">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Terrain interactif & remplacements</span>
                </div>
              </div>
            </div>

            {/* Large CTA Button */}
            <div className="shrink-0 flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('ai_strategy');
                }}
                className="w-full sm:w-auto px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 group-hover:scale-105 cursor-pointer"
              >
                <span>Accéder à la Stratégie de Match</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Modules 2 & 3 : 2 Grands Bandeaux Juxtaposés (Semaine d'entraînement + Plan Mbappé) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {/* Module 2 : Préparer ma semaine d'entraînement */}
          <div
            onClick={() => navigateTo('ai_strategy_week')}
            className="relative bg-gradient-to-br from-[#0a234e] via-[#091b3d] to-[#041026] text-white p-5 rounded-3xl border border-blue-700/50 shadow-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-400/60 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-blue-200 bg-blue-950/90 px-2.5 py-0.5 rounded-full border border-blue-600/40 flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>AI STRATEGY • MICROCYCLE & CHARGE</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Dimanche J-0
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Préparer ma semaine d'entraînement</span>
                </h3>
                <p className="text-xs text-blue-100/80 font-medium mt-1 leading-relaxed">
                  Calibration collective J-6 à J-0, pic de charge programmé à Jeudi (890 UA), affûtage dégressif et prévention des alertes GPS.
                </p>
              </div>

              {/* Mini KPIs */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-blue-800/50 font-mono text-[10.5px]">
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Volume</span>
                  <strong className="text-white text-xs">5 séances + Match</strong>
                </div>
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Charge</span>
                  <strong className="text-amber-300 text-xs">3 420 UA</strong>
                </div>
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Fraîcheur</span>
                  <strong className="text-emerald-300 text-xs">94/100</strong>
                </div>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-blue-200 font-mono">
                3 modèles de semaine • Timeline J-6 à J-0
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('ai_strategy_week');
                }}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs group-hover:scale-105 cursor-pointer"
              >
                <span>Planifier la Semaine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Module 3 : Plan sur-mesure Kylian Mbappé */}
          <div
            onClick={() => navigateTo('ai_strategy_player_plan')}
            className="relative bg-gradient-to-br from-[#121c3b] via-[#0d162f] to-[#060b1c] text-white p-5 rounded-3xl border border-indigo-700/50 shadow-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-indigo-400/60 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-300 bg-indigo-950/90 px-2.5 py-0.5 rounded-full border border-amber-400/40 flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>AI STRATEGY • RETURN TO PLAY SUR-MESURE</span>
                </span>
                <span className="text-[10px] font-mono text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                  Genou Droit (LLI)
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Plan sur-mesure • Kylian Mbappé (#10)</span>
                </h3>
                <p className="text-xs text-blue-100/80 font-medium mt-1 leading-relaxed">
                  Protocole 4 phases validé avec le Dr. Le Gall, courses Alter-G, testing isocinétique Cybex (92%) et simulateur de forme.
                </p>
              </div>

              {/* Mini KPIs */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-indigo-800/50 font-mono text-[10.5px]">
                <div className="bg-indigo-950/50 p-2 rounded-xl border border-indigo-800/40">
                  <span className="text-[9px] text-indigo-300 block uppercase">Statut</span>
                  <strong className="text-amber-300 text-xs">Phase 2 Active</strong>
                </div>
                <div className="bg-indigo-950/50 p-2 rounded-xl border border-indigo-800/40">
                  <span className="text-[9px] text-indigo-300 block uppercase">Douleur</span>
                  <strong className="text-emerald-300 text-xs">1 / 10</strong>
                </div>
                <div className="bg-indigo-950/50 p-2 rounded-xl border border-indigo-800/40">
                  <span className="text-[9px] text-indigo-300 block uppercase">Objectif</span>
                  <strong className="text-white text-xs">60-75 min</strong>
                </div>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-indigo-200 font-mono">
                Planning bi-quotidien • Adaptation en temps réel
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('ai_strategy_player_plan');
                }}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs group-hover:scale-105 cursor-pointer"
              >
                <span>Gérer le Protocole RTP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: État de Forme & Disponibilité + Prochain Match */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* VUE GLOBALE SUR L'ÉTAT DE FORME DU GROUPE (7/12) */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                État de Forme & Disponibilité du Groupe
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              83.3% Compétition
            </span>
          </div>

          {/* Form Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                Forme Globale Équipe
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 font-mono">84.2</span>
                <span className="text-[10px] font-bold text-emerald-700 font-mono">+3.4 pts</span>
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium">Assimilation des charges excellente</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                Disponibilité Match
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-600 font-mono">20 / 24</span>
                <span className="text-[10px] font-bold text-emerald-700">83.3%</span>
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium">20 aptes, 3 aménagés, 1 ménagé</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                Intégrité Physique
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-blue-700 font-mono">88.4%</span>
                <span className="text-[10px] font-bold text-blue-700">Faible risque</span>
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium">ACWR moyen à 1.05</p>
            </div>
          </div>

          {/* Form Breakdown by Sector */}
          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
              Disponibilité par Secteur de Jeu
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-slate-500 text-[10px]">Gardiens (3)</span>
                <span className="font-black text-emerald-600 font-mono text-sm">100%</span>
                <span className="block text-[9px] text-slate-400">Tous aptes</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-slate-500 text-[10px]">Défenseurs (8)</span>
                <span className="font-black text-emerald-600 font-mono text-sm">92%</span>
                <span className="block text-[9px] text-slate-400">7 prêts, 1 vig.</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-slate-500 text-[10px]">Milieux (7)</span>
                <span className="font-black text-blue-600 font-mono text-sm">80%</span>
                <span className="block text-[9px] text-slate-400">Rabiot aménagé</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-slate-500 text-[10px]">Attaquants (6)</span>
                <span className="font-black text-emerald-600 font-mono text-sm">85%</span>
                <span className="block text-[9px] text-slate-400">Dupont 60-75m</span>
              </div>
            </div>
          </div>
        </div>

        {/* PROCHAIN MATCH À VENIR (5/12) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Prochain Choc International
              </h3>
            </div>
            <span className="text-[10px] font-mono font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
              {UPCOMING_MATCH.shortDate} • {UPCOMING_MATCH.kickoff}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/70 border border-blue-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                UEFA Nations League • Phase de Groupes
              </span>
              <span className="text-[9px] font-bold text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{UPCOMING_MATCH.venue}</span>
              </span>
            </div>

            <div className="flex items-center justify-around py-1">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-700 text-white flex items-center justify-center font-black text-lg shadow-xs">
                  🇫🇷
                </div>
                <span className="text-xs font-black text-slate-900 block mt-1">FRANCE</span>
                <span className="text-[10px] text-slate-400 font-mono">Rang FIFA : 2</span>
              </div>

              <div className="text-center px-2">
                <span className="text-xs font-mono font-bold text-slate-400 block uppercase">VERSUS</span>
                <span className="text-lg font-black text-slate-900 font-mono">{UPCOMING_MATCH.kickoff}</span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full block mt-0.5">
                  Direct TF1
                </span>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-700 text-white flex items-center justify-center font-black text-lg shadow-xs">
                  🇧🇪
                </div>
                <span className="text-xs font-black text-slate-900 block mt-1">{UPCOMING_MATCH.awayTeam.toUpperCase()}</span>
                <span className="text-[10px] text-slate-400 font-mono">Sélection nationale</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 text-center italic border-t border-blue-200/60 pt-2 font-serif">
              « Choc décisif pour la 1ère place du groupe. Maîtriser le tempo et couper les transitions intérieures. »
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('ai_strategy')}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Préparer avec AI Strategy</span>
            </button>
            <button
              onClick={() => navigateTo('matchs_entrainements')}
              className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title="Consulter la feuille de match standard"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Points Stratégiques + Dernières Notes Staff */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* POINTS STRATÉGIQUES DU SÉLECTIONNEUR (7/12) */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Points Stratégiques & Consignes Clés
              </h3>
            </div>
            <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Match J-2
            </span>
          </div>

          <div className="space-y-2.5">
            {strategicPoints.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-colors space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900">{item.title}</h4>
                  <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DERNIÈRES NOTES STAFF POUR LE SÉLECTIONNEUR (5/12) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Dernières Notes & Rapports Staff
              </h3>
            </div>
            <button
              onClick={() => openCommentsDrawer()}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Voir tout →
            </button>
          </div>

          <div className="space-y-2 flex-1">
            {coachNotes.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className="p-2.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 transition-all cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-700">
                  <span>{notif.authorName} ({notif.authorRole})</span>
                  <span className="text-[9px] font-mono text-slate-400">{notif.timestamp}</span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 truncate">{notif.title}</h5>
                <p className="text-[10.5px] text-slate-600 line-clamp-2">{notif.message}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => openCommentsDrawer()}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Ouvrir les échanges staff en direct</span>
          </button>
        </div>
      </div>
    </div>
  );
};
