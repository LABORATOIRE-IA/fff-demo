import React from 'react';
import { Player } from '../../types/ams';
import { CockpitPositionProfile } from '../../data/playerCockpitData';
import { useAMS } from '../../context/AMSContext';
import {
  Activity,
  Heart,
  Zap,
  TrendingUp,
  Moon,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface CockpitCenterStageProps {
  player: Player;
  cockpitData: CockpitPositionProfile;
  onOpenSectionDetail?: (section: 'physique' | 'charge' | 'sante' | 'recuperation' | 'performance') => void;
}

export const CockpitCenterStage: React.FC<CockpitCenterStageProps> = ({
  player,
  cockpitData,
  onOpenSectionDetail
}) => {
  const { setPlayerTab, openMedicalModal } = useAMS();

  const isGK = player.position === 'Gardien';
  const dim = player.dimensions;

  const handleSectionClick = (sec: 'physique' | 'charge' | 'sante' | 'recuperation' | 'performance') => {
    if (onOpenSectionDetail) {
      onOpenSectionDetail(sec);
    } else {
      if (sec === 'physique') setPlayerTab('physique');
      else if (sec === 'charge') setPlayerTab('charge');
      else if (sec === 'sante') openMedicalModal(player.id);
      else if (sec === 'recuperation') setPlayerTab('physique');
      else if (sec === 'performance') setPlayerTab('matchs');
    }
  };

  return (
    <div className="relative w-full bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 overflow-hidden">
      {/* Sci-Fi Hologram Ambience & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/[0.03] rounded-full blur-2xl" />

        {/* Technical Calibration Grid */}
        <svg className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="techGridStage" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="1 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGridStage)" />
          <circle cx="50%" cy="50%" r="220" fill="none" stroke="#0284c7" strokeWidth="0.75" strokeOpacity="0.15" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="130" fill="none" stroke="#0284c7" strokeWidth="0.75" strokeOpacity="0.12" />
        </svg>

        {/* Technical Calibration Watermarks */}
        <div className="absolute top-3 left-4 text-[9px] font-mono text-slate-400 flex items-center gap-2">
          <span>JUMEAU NUMÉRIQUE 3D • FFF</span>
          <span>LAT: 48.618° N • CLAIREFONTAINE</span>
        </div>
        <div className="absolute top-3 right-4 text-[9px] font-mono text-cyan-700 flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>HOLOGRAM SYNC</span>
        </div>
      </div>

      {/* Main Responsive Grid: 4 Cards Left | 3D Hologram Athlete Center | 4 Cards Right */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
        
        {/* ================= LEFT 4 SECTION CARDS (col-span-4) ================= */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3 order-2 lg:order-1">
          
          {/* Card 1: Charge d'entraînement & GPS */}
          <div
            onClick={() => handleSectionClick('charge')}
            className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-teal-500 bg-white/95 hover:bg-teal-50/15 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors block truncate">
                    Charge & GPS
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    Cliquer pour détails
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="text-sm font-black text-teal-700 font-mono">
                  {dim.entrainement.score}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">/100</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Distance totale</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {dim.entrainement.distance} km
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +4.8 km
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Ratio ACWR</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {cockpitData.acwr.ratio.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    Optimal
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Forme du moment */}
          <div
            onClick={() => handleSectionClick('recuperation')}
            className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 bg-white/95 hover:bg-blue-50/15 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors block truncate">
                    Forme du moment
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {cockpitData.formeDuMoment.label}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="text-sm font-black text-blue-700 font-mono">
                  {cockpitData.formeDuMoment.score}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">/100</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Readiness Oura</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {dim.recuperation.readiness}/100
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +12 pts
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">VRC / HRV</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {dim.recuperation.hrv} ms
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +6 ms
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Récupération & Sommeil */}
          <div
            onClick={() => handleSectionClick('recuperation')}
            className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-emerald-500 bg-white/95 hover:bg-emerald-50/15 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Moon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors block truncate">
                    Récupération
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    Cliquer pour détails
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="text-sm font-black text-emerald-700 font-mono">
                  {dim.recuperation.score}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">/100</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Sommeil effectif</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {dim.recuperation.sommeil}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +30 min
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Indice récup.</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {dim.recuperation.score}/100
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +14 pts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Disponibilité & Statut */}
          <div
            onClick={() => handleSectionClick('sante')}
            className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-emerald-500 bg-white/95 hover:bg-emerald-50/15 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Disponibilité
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    player.status === 'disponible'
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : player.status === 'a_surveiller'
                      ? 'text-amber-700 bg-amber-50 border-amber-200'
                      : 'text-blue-700 bg-blue-50 border-blue-200'
                  }`}
                >
                  {player.status === 'disponible' ? 'Apte 100%' : 'À surveiller'}
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Taux disponibilité</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {dim.sante.disponibilite}%
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +15%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Jours sans gêne</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {dim.sante.joursSansGene} jours
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +21 j
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CENTER: 3D REALISTIC ATHLETE TWIN (AUCUN BOUTON SUR L'IMAGE) ================= */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-1 sm:py-2 order-1 lg:order-2">
          <div className="relative w-full max-w-[340px] aspect-[9/14] rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-xl bg-slate-950 flex items-center justify-center group select-none">
            {/* The Pure Realistic Athlete Photo */}
            <img
              src="/assets/digital_twin_player.jpg"
              alt={`Jumeau numérique de ${player.name}`}
              className="w-full h-full object-cover object-top select-none transition-transform duration-700 group-hover:scale-102 pointer-events-none"
            />

            {/* Subtle Futuristic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30 pointer-events-none" />

            {/* Holographic Glowing Border Aura */}
            <div className="absolute inset-0 ring-1 ring-inset ring-cyan-400/25 pointer-events-none rounded-3xl" />

            {/* Glowing Pedestal Reflection at feet */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-10 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />

            {/* Top Telemetry Header (Discret & Passif) */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono pointer-events-none">
              <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-500/30 text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>TÉLÉMÉTRIE FFF</span>
              </div>

              <div className="bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 text-slate-300">
                <span>N°{player.number} • {player.position.toUpperCase()}</span>
              </div>
            </div>

            {/* Bottom Status Hologram Pill (Discret & Passif) */}
            <div className="absolute bottom-3 bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan-500/40 text-xs font-bold text-white shadow-xl flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="tracking-wide">{player.name}</span>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-cyan-300">{player.number}</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT 4 SECTION CARDS (col-span-4) ================= */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3 order-3">
          
          {/* Card 5: Santé & Intégrité Musculaire */}
          <div
            onClick={() => handleSectionClick('sante')}
            className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-rose-500 bg-white/95 hover:bg-rose-50/15 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-rose-700 transition-colors block truncate">
                    Santé & Intégrité
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    Cliquer pour détails
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="text-sm font-black text-rose-700 font-mono">
                  {dim.sante.score}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">/100</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Risque lésionnel</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    0.8%
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    -2.2%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Force Ischios (Nordbord)</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    418 N
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +58 N
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: Physique & Vitesse */}
          <div
            onClick={() => handleSectionClick('physique')}
            className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 bg-white/95 hover:bg-blue-50/15 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors block truncate">
                    Physique & Vitesse
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    Cliquer pour détails
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="text-sm font-black text-blue-700 font-mono">
                  {dim.physique.score}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">/100</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Vitesse max</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {dim.physique.vitesseMax} km/h
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +{(dim.physique.vitesseMax - 33.2).toFixed(1)} km/h
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Puissance max</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {dim.physique.puissanceMax} m/s²
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +0.6 m/s²
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 7: Performance Match */}
          <div
            onClick={() => handleSectionClick('performance')}
            className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-indigo-500 bg-white/95 hover:bg-indigo-50/15 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors block truncate">
                    Performance Match
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    Cliquer pour détails
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="text-sm font-black text-indigo-700 font-mono">
                  {dim.performance.score}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">/100</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Note saison</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {dim.performance.noteMoyenne}/10
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +{(dim.performance.noteMoyenne - 6.8).toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">
                  {isGK ? 'Arrêts / match' : 'Buts en compétition'}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {isGK ? dim.performance.arretsParMatch : (dim.performance.butsSaison ?? 14)}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    {isGK ? '+1.4' : `+${(dim.performance.butsSaison ?? 14) - 14}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 8: Score Global FFF */}
          <div
            onClick={() => handleSectionClick('performance')}
            className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 bg-white/95 hover:bg-blue-50/15 backdrop-blur-xs transition-all cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors block truncate">
                    Score Global FFF
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {player.scoreGlobal >= 90 ? 'Indice Élite FFF' : 'Niveau Fédéral'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="text-sm font-black text-blue-700 font-mono">
                  {player.scoreGlobal}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">/100</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Indice de performance</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {player.scoreGlobal}/100
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +{player.scoreEvolution} pts
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium truncate pr-2">Écart médiane poste</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-slate-900 font-mono text-xs whitespace-nowrap">
                    {cockpitData.roleLabel}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    +6 pts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
