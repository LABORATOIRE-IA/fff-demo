import React from 'react';
import { Player } from '../../types/ams';
import { CockpitPositionProfile } from '../../data/playerCockpitData';
import { useAMS } from '../../context/AMSContext';
import {
  ArrowLeft,
  Shield,
  Award,
  Sparkles,
  Building2,
  Calendar,
  Ruler,
  Weight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { DataActionBar } from '../layout/DataActionBar';

interface CockpitTopHeaderProps {
  player: Player;
  cockpitData: CockpitPositionProfile;
}

export const CockpitTopHeader: React.FC<CockpitTopHeaderProps> = ({ player, cockpitData }) => {
  const { goBack, players, navigateTo } = useAMS();

  const isGK = player.position === 'Gardien';

  return (
    <div className="space-y-4">
      {/* Top Main Identity & Big Metrics Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-5">
        {/* Row 1: Back Button + Player Name + Badges + Quick Player Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              className="p-2.5 rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 shrink-0"
              title="Revenir à l'écran précédent"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* FFF Avatar */}
            <div className="relative shrink-0">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl shadow-md border-2 border-white ${
                  isGK
                    ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950'
                    : 'bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white'
                }`}
              >
                {player.number}
              </div>
              <div className="absolute -top-1.5 -right-1.5 bg-slate-900 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded-full shadow-xs border border-amber-400/30">
                ★★
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider">
                  Équipe de France A
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  {player.position}
                </span>
                <span className="text-slate-300">•</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    player.status === 'disponible'
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : player.status === 'a_surveiller'
                      ? 'text-amber-700 bg-amber-50 border-amber-200'
                      : 'text-blue-700 bg-blue-50 border-blue-200'
                  }`}
                >
                  {player.status === 'disponible'
                    ? 'Apte 100%'
                    : player.status === 'a_surveiller'
                    ? 'À surveiller'
                    : 'Reprise 60 min'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {player.name}
              </h1>

              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {cockpitData.tacticalRoleDescription}
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 shrink-0">
            <DataActionBar
              scope="player_360"
              customImportLabel="Importer"
              customExportLabel="Exporter Passeport"
            />
          </div>
        </div>

        {/* Row 2: LES 4 GRANDS CHIFFRES DEMANDÉS (TAILLE, POIDS, ÂGE, CLUB EN GROS) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* 1. TAILLE EN GROS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-blue-400 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Taille
              </span>
              <Ruler className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-mono tracking-tight">
              {player.height}
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">
              Gabarit officiel FFF
            </div>
          </div>

          {/* 2. POIDS EN GROS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-blue-400 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Poids
              </span>
              <Weight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-mono tracking-tight">
              {player.weight}
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">
              Masse athlétique optimale
            </div>
          </div>

          {/* 3. ÂGE EN GROS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-blue-400 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Âge
              </span>
              <Calendar className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-mono tracking-tight">
              {player.age} <span className="text-base sm:text-xl font-bold text-slate-500 font-sans">ans</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">
              Pied fort : <span className="text-slate-700 font-bold">{player.preferredFoot}</span>
            </div>
          </div>

          {/* 4. CLUB EN GROS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/70 border border-blue-200/80 shadow-xs relative overflow-hidden group hover:border-blue-400 transition-colors">
            <div className="flex items-center justify-between text-blue-600 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                Club officiel
              </span>
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-blue-950 tracking-tight truncate">
              {player.club}
            </div>
            <div className="text-[10px] text-blue-600 font-bold mt-1 flex items-center gap-1">
              <span>{player.caps} sélections</span>
              <span>•</span>
              <span>{isGK ? '12 Clean Sheets' : `${player.goals} buts`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
