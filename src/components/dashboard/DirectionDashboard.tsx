import React from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  Shield,
  Award,
  Users,
  TrendingUp,
  ArrowRight,
  Activity,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { FFF_TEAMS } from '../../data/teamsData';

export const DirectionDashboard: React.FC = () => {
  const { navigateTo, setSelectedTeamId } = useAMS();

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Grid: Synthèse des Sélections FFF */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {FFF_TEAMS.map((team) => (
          <div
            key={team.id}
            onClick={() => {
              setSelectedTeamId(team.id);
              navigateTo('player_search');
            }}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer space-y-2.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{team.badge}</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {team.squadCount} joueurs
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-2">{team.name}</h4>
              <p className="text-xs text-slate-500 font-medium">{team.coach}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-bold">
              <span>Voir l'effectif</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
