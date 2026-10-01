import React, { useState, useEffect } from 'react';
import { useAMS } from '../../context/AMSContext';
import { Search, ArrowRight, ChevronRight, Users, Award, Shield, Stethoscope, CheckCircle2, Sparkles } from 'lucide-react';
import { Player, PlayerStatus } from '../../types/ams';
import { DataActionBar } from '../layout/DataActionBar';
import { PlayerHeadshot } from '../common/PlayerHeadshot';

export const PlayerSearchView: React.FC = () => {
  const { players, navigateTo, selectedTeam, userRole } = useAMS();
  const [activeTab, setActiveTab] = useState<'joueurs' | 'arbitres'>(
    userRole === 'arbitrage' ? 'arbitres' : 'joueurs'
  );

  useEffect(() => {
    if (userRole === 'arbitrage') {
      setActiveTab('arbitres');
    }
  }, [userRole]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('Tous');
  const [selectedStatus, setSelectedStatus] = useState<string>('Tous');
  const [selectedRefereeRole, setSelectedRefereeRole] = useState<string>('Tous');
  const [highlightedPlayerId, setHighlightedPlayerId] = useState<string>('chevalier');

  // Segregate players vs referees
  const squadPlayers = players.filter((p) => !p.isReferee);
  const referees = players.filter((p) => p.isReferee);

  const displayedList = activeTab === 'joueurs' ? squadPlayers : referees;

  const filteredItems = displayedList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.number.toString().includes(searchQuery);

    if (activeTab === 'joueurs') {
      const matchesPosition =
        selectedPosition === 'Tous' ||
        (selectedPosition === 'Gardiens' && p.position === 'Gardien') ||
        (selectedPosition === 'Défenseurs' && p.position === 'Défenseur') ||
        (selectedPosition === 'Milieux' && p.position === 'Milieu') ||
        (selectedPosition === 'Attaquants' && p.position === 'Attaquant');

      const matchesStatus =
        selectedStatus === 'Tous' ||
        (selectedStatus === 'Disponibles' && p.status === 'disponible') ||
        (selectedStatus === 'À surveiller' && p.status === 'a_surveiller') ||
        (selectedStatus === 'Indisponibles' && p.status === 'indisponible') ||
        (selectedStatus === 'Reprise' && p.status === 'retour_progressif');

      return matchesSearch && matchesPosition && matchesStatus;
    } else {
      // Referee filtering
      const matchesRefRole =
        selectedRefereeRole === 'Tous' ||
        (selectedRefereeRole === 'Centraux' && p.position === 'Arbitre Central') ||
        (selectedRefereeRole === 'Assistants' && p.position === 'Arbitre Assistant') ||
        (selectedRefereeRole === 'VAR' && p.position === 'Arbitre Vidéo (VAR)');

      const matchesStatus =
        selectedStatus === 'Tous' ||
        (selectedStatus === 'Disponibles' && p.status === 'disponible') ||
        (selectedStatus === 'À surveiller' && p.status === 'a_surveiller');

      return matchesSearch && matchesRefRole && matchesStatus;
    }
  });

  const getStatusBadge = (status: PlayerStatus) => {
    switch (status) {
      case 'disponible':
        return (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Disponible
          </span>
        );
      case 'a_surveiller':
        return (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            À surveiller
          </span>
        );
      case 'indisponible':
        return (
          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            Indisponible
          </span>
        );
      case 'retour_progressif':
        return (
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            Retour progressif
          </span>
        );
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200 text-slate-900 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 uppercase">
              {activeTab === 'joueurs' ? `${selectedTeam?.name} • Effectif Convoqué` : 'Direction Technique de l’Arbitrage (DTA)'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {activeTab === 'joueurs' ? 'Effectif & Joueurs' : 'Corps Arbitral FFF & FIFA Elite'}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {activeTab === 'joueurs'
              ? 'Accédez aux profils 360°, aux métriques athlétiques et à l’historique des 24 sélectionnés.'
              : 'Supervision des arbitres centraux, arbitres de touche / assistants et spécialistes VAR.'}
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <DataActionBar
            scope="players"
            customImportLabel="Importer"
            customExportLabel="Exporter"
          />
        </div>
      </div>

      {/* Primary Toggle: Joueurs (24) vs Corps Arbitral (12) */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('joueurs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'joueurs'
              ? 'bg-white text-blue-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Effectif Joueurs ({squadPlayers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('arbitres')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'arbitres'
              ? 'bg-white text-blue-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Corps Arbitral FFF ({referees.length})</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === 'joueurs'
                ? "Rechercher un joueur par nom, club, poste, numéro..."
                : "Rechercher un arbitre par nom, ligue, catégorie (FIFA, Assistant, VAR)..."
            }
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white text-slate-900 transition-all font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
          {activeTab === 'joueurs' ? (
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['Tous', 'Gardiens', 'Défenseurs', 'Milieux', 'Attaquants'].map((pos) => (
                <button
                  key={pos}
                  onClick={() => setSelectedPosition(pos)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedPosition === pos
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['Tous', 'Centraux', 'Assistants', 'VAR'].map((rf) => (
                <button
                  key={rf}
                  onClick={() => setSelectedRefereeRole(rf)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedRefereeRole === rf
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {rf}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['Tous', 'Disponibles', 'À surveiller', 'Reprise', 'Indisponibles'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table: Joueurs vs Arbitres */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {filteredItems.length} {activeTab === 'joueurs' ? 'joueur(s)' : 'arbitre(s)'} affiché(s)
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Cliquez pour ouvrir le profil 360°
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">{activeTab === 'joueurs' ? 'Joueur' : 'Arbitre & Rôle'}</th>
                <th className="py-3 px-4">{activeTab === 'joueurs' ? 'Club' : 'Ligue Régionale'}</th>
                <th className="py-3 px-4">{activeTab === 'joueurs' ? 'Poste' : 'Grade / Catégorie'}</th>
                <th className="py-3 px-4">Statut Médical</th>
                <th className="py-3 px-4 text-right">
                  {activeTab === 'joueurs' ? 'Score Global' : 'Note Observateurs'}
                </th>
                <th className="py-3 px-4 text-right">
                  {activeTab === 'joueurs' ? 'Temps d’entraînement' : 'Validation VAR / Test'}
                </th>
                <th className="py-3 px-4 text-right">Fiche 360°</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const isReferee = Boolean(item.isReferee);
                const isAssistant = item.position === 'Arbitre Assistant';

                return (
                  <tr
                    key={item.id}
                    onClick={() => navigateTo('joueur_360', { playerId: item.id, playerTab: 'vue_ensemble' })}
                    className="hover:bg-blue-50/70 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 overflow-hidden shadow-2xs ${
                            isReferee
                              ? isAssistant
                                ? 'bg-blue-600 text-white'
                                : 'bg-amber-400 text-slate-950'
                              : 'border border-slate-200/90 bg-slate-100'
                          }`}
                        >
                          {isReferee ? (
                            item.number
                          ) : (
                            <PlayerHeadshot name={item.name} fallbackUrl={item.avatarUrl} className="w-full h-full rounded-lg" />
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {item.age} ans • {isReferee ? item.position : item.club}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{item.club}</td>
                    <td className="py-3.5 px-4">
                      {isReferee ? (
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-xs text-blue-900">
                          {item.refereeStats?.gradeLabel || 'FIFA'}
                        </span>
                      ) : (
                        <span className="text-slate-600 font-medium">{item.position}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      {isReferee
                        ? `★ ${item.refereeStats?.noteObservateurs || '8.5'}/10`
                        : `★ ${item.scoreGlobal}/100`}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                      {isReferee
                        ? `${item.refereeStats?.decisionsVarConfirmeesPct || 96}% VAR`
                        : item.dimensions?.entrainement?.dureeTotale || '32h00'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateTo('joueur_360', { playerId: item.id, playerTab: 'predictif' });
                          }}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-500 text-amber-900 hover:text-slate-950 border border-amber-300/80 rounded-lg font-black text-xs transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                          title="Lancer la modélisation prédictive & simulation"
                        >
                          <Sparkles className="w-3 h-3 text-amber-600 group-hover:text-slate-950" />
                          <span>Prédictif</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateTo('joueur_360', { playerId: item.id, playerTab: 'vue_ensemble' });
                          }}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>{isReferee ? 'Arbitre 360' : 'Jumeau 360'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
