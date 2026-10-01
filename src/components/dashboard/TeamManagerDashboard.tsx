import React from 'react';
import { useAMS } from '../../context/AMSContext';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import {
  Calendar,
  MapPin,
  Clock,
  Shield,
  Users,
  CheckCircle2,
  ArrowRight,
  Plane,
  Building,
  FileText,
  Sparkles,
  Ticket,
  FileCheck
} from 'lucide-react';

export const TeamManagerDashboard: React.FC = () => {
  const { rassemblement, squadSummary, navigateTo } = useAMS();

  const logisticsItems = [
    {
      time: '12:00 - 14:00',
      title: 'Arrivée des 24 joueurs au Château de Clairefontaine',
      status: 'Conforme',
      details: 'Navettes gares Montparnasse/Massy et aéroports Roissy/Orly validées'
    },
    {
      time: '15:30',
      title: 'Distribution des paquetages officiels Nike & flocages UEFA',
      status: 'Prêt',
      details: 'Vestiaire préparé, 3 jeux de maillots par joueur (Bleu, Blanc, Gardiens)'
    },
    {
      time: '17:30',
      title: 'Réunion d’accueil & protocole médias FFF',
      status: 'Programmé',
      details: 'Point presse, créneaux interviews TF1 et diffuseurs internationaux'
    },
    {
      time: 'J-1 18:00',
      title: 'Transfert en bus officiel vers le Stade de France & hôtel officiel',
      status: 'Réservé',
      details: 'Escorte motorisée et reconnaissance des accès vestiaires'
    }
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* 1. HUBS OPÉRATIONNELS TEAM MANAGER */}
      {/* ========================================================================= */}
      <div className="space-y-3.5">
        {/* Module 1 : Grand bandeau To-Do List Automatisée */}
        <div
          onClick={() => navigateTo('ai_strategy_team_manager_todo')}
          className="relative bg-gradient-to-r from-[#061833] via-[#09254d] to-[#041024] text-white p-5 sm:p-6 rounded-3xl border border-amber-500/40 shadow-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-amber-400/70"
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
                  <span>OPÉRATIONS TEAM MANAGER • TO-DO LIST AUTOMATISÉE IA</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-200 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-700/50">
                  Prochain Événement • {UPCOMING_MATCH.title} ({UPCOMING_MATCH.countdown})
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                  <span>To-Do List Automatisée • Match & Rassemblement</span>
                  <span className="hidden sm:inline-block text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    Générée par IA
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/90 font-medium mt-1 leading-relaxed">
                  Checklist intelligente générée automatiquement selon l'événement : transports gares/aéroports, hébergement au Château, paquetages Nike, feuille de match officielle UEFA et protocole médias.
                </p>
              </div>

              {/* 3 Quick Data Pillars */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 text-[11px] font-mono text-slate-200">
                <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>8 tâches critiques ordonnancées (J-7 à J+1)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Déclencheurs automatiques connectés à la liste de Zidane</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Validation interactive et assignation par responsable</span>
                </div>
              </div>
            </div>

            {/* Large CTA Button */}
            <div className="shrink-0 flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('ai_strategy_team_manager_todo');
                }}
                className="w-full sm:w-auto px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 group-hover:scale-105 cursor-pointer"
              >
                <span>Gérer la To-Do List</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Module 2 : Grand bandeau Regard Global Équipe & Staff */}
        <div
          onClick={() => navigateTo('ai_strategy_team_manager_overview')}
          className="relative bg-gradient-to-r from-[#071329] via-[#0d2248] to-[#040c1b] text-white p-5 rounded-3xl border border-blue-600/50 shadow-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-400/70"
        >
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-blue-200 bg-blue-950/90 px-2.5 py-0.5 rounded-full border border-blue-600/40 flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>PILOTAGE OPÉRATIONNEL • DÉLÉGATION FFF</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                  Délégation Complète : 42 Personnes
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Regard Global & Pilotage Opérationnel de l'Équipe FFF</span>
                </h3>
                <p className="text-xs text-blue-100/80 font-medium mt-0.5 leading-relaxed">
                  Supervision 360° : conformité des 24 joueurs et 18 membres du staff (médical, technique, matériel, sécurité), contrôle des passeports/visas (100%), accréditations UEFA et billetterie présidentielle.
                </p>
              </div>

              {/* Mini KPIs */}
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10.5px]">
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Effectif Pris en Charge</span>
                  <strong className="text-white text-xs">24 Joueurs + 18 Staff</strong>
                </div>
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Passeports / Visas</span>
                  <strong className="text-emerald-300 text-xs">100% Conformes</strong>
                </div>
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Places Familles / VIP</span>
                  <strong className="text-amber-300 text-xs">84 Billets Réservés</strong>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('ai_strategy_team_manager_overview');
                }}
                className="w-full sm:w-auto px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs group-hover:scale-105 cursor-pointer"
              >
                <span>Regard Global Équipe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Logistique du rassemblement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Planning Logistique & Accueil au Château
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Rassemblement J-{rassemblement?.daysToStart || 2}
            </span>
          </div>

          <div className="space-y-2">
            {logisticsItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-blue-700">{item.time}</span>
                  <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Documents Officiels
            </h3>
            <span className="text-[10px] font-mono font-bold text-slate-400">UEFA</span>
          </div>

          <div className="space-y-2 flex-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Feuille de match officielle</span>
                <span className="text-[10px] text-slate-400">Liste des 23 transmise UEFA</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Accréditations staff & presse</span>
                <span className="text-[10px] text-slate-400">38 badges validés</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Plan de vol & transferts</span>
                <span className="text-[10px] text-slate-400">Charter Air France affrété</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          <button
            onClick={() => navigateTo('matchs_entrainements')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Voir le calendrier général
          </button>
        </div>
      </div>
    </div>
  );
};
