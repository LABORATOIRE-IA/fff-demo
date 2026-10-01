import React from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  Calendar,
  Check,
  ArrowRight,
  ArrowLeft,
  Shield,
  ChevronRight
} from 'lucide-react';
import { FFFTeam } from '../../data/teamsData';

export const TeamChoiceView: React.FC = () => {
  const {
    availableTeams,
    selectedTeamId,
    setSelectedTeamId,
    navigateTo,
    roleConfig
  } = useAMS();

  const handleSelectTeam = (teamId: string) => {
    setSelectedTeamId(teamId);
    navigateTo('dashboard');
  };

  const handleConfirm = (teamId?: string) => {
    if (teamId) {
      setSelectedTeamId(teamId);
    }
    navigateTo('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-8 md:p-12">
      {/* Top Stepper - 4 Steps */}
      <div className="max-w-2xl mx-auto w-full pt-2">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          {/* Step 1 : Connexion (Done) */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 mt-1">Connexion</span>
          </div>

          {/* Step 2 : Profil (Done) */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 mt-1">Profil</span>
          </div>

          {/* Step 3 : Équipe (Active) */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white ring-4 ring-blue-100 flex items-center justify-center font-black text-xs shadow-xs">
              3
            </div>
            <span className="text-[11px] font-bold text-blue-900 mt-1">Sélection</span>
          </div>

          {/* Step 4 : Dashboard */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <span className="text-[11px] font-medium text-slate-400 mt-1">Dashboard</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full my-6 space-y-6">
        {/* Header Title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Étape 3 sur 4
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Sélectionnez l'équipe nationale
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto font-medium">
            Choisissez l’équipe que vous souhaitez consulter. L’ensemble des indicateurs s’ajusteront à votre sélection.
          </p>
        </div>

        {/* Teams Grid - Clean, balanced, juste milieu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTeams.map((team: FFFTeam) => {
            const isSelected = selectedTeamId === team.id;

            return (
              <div
                key={team.id}
                onClick={() => handleSelectTeam(team.id)}
                onDoubleClick={() => handleConfirm(team.id)}
                className={`group p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-md'
                    : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                {/* Active check pill */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-xs">
                    <Check className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-950 text-white flex items-center justify-center font-black text-lg shadow-sm border border-blue-500/20 shrink-0">
                      {team.badge}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {team.category}
                        </span>
                        {team.id === 'france_a' && (
                          <span className="text-[10px] text-amber-500 font-black">★★</span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors mt-0.5">
                        {team.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-[11px]">Sélectionneur :</span>
                      <strong className="text-slate-900 font-semibold">{team.coach}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-[11px]">Effectif :</span>
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
                        {team.squadCount} joueurs
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-100">
                      <span className="text-[11px]">Prochain :</span>
                      <span className="text-[11px] font-semibold text-slate-800 truncate ml-2">
                        {team.upcomingMatch}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{team.nextMatchDate}</span>
                  </span>
                  <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    <span>Sélectionner</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Sélection active :{' '}
                <span className="text-blue-700 font-extrabold">
                  {availableTeams.find((t) => t.id === selectedTeamId)?.name || 'France A'}
                </span>
              </p>
              <p className="text-[11px] text-slate-500">
                Prêt pour l'ouverture du tableau de bord.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('profil_choice')}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />
              Retour
            </button>
            <button
              onClick={() => handleConfirm()}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Accéder au Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer FFF */}
      <div className="text-center py-4 border-t border-slate-200/80 text-[11px] text-slate-400">
        Fédération Française de Football • AMS 360
      </div>
    </div>
  );
};
