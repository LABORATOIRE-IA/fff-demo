import React from 'react';
import { useAMS } from '../../context/AMSContext';
import { X, ArrowRight, Activity, Heart, Shield, Zap, Sparkles, AlertTriangle } from 'lucide-react';
import { PlayerStatus } from '../../types/ams';
import { PlayerHeadshot } from '../common/PlayerHeadshot';

export const PlayerPreviewDrawer: React.FC = () => {
  const {
    drawerPlayerId,
    closePlayerDrawer,
    players,
    navigateTo,
    updatePlayerStatus,
    openMedicalModal
  } = useAMS();

  if (!drawerPlayerId) return null;

  const player = players.find((p) => p.id === drawerPlayerId);
  if (!player) return null;

  const getStatusBadge = (status: PlayerStatus) => {
    switch (status) {
      case 'disponible':
        return <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Disponible</span>;
      case 'a_surveiller':
        return <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">À surveiller</span>;
      case 'indisponible':
        return <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Indisponible</span>;
      case 'retour_progressif':
        return <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Retour progressif</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
        onClick={closePlayerDrawer}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Aperçu individuel AMS
            </span>
          </div>
          <button
            onClick={closePlayerDrawer}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Identity */}
          <div
            onClick={() => {
              closePlayerDrawer();
              navigateTo('joueur_360', { playerId: player.id });
            }}
            className="flex items-start gap-4 p-2 -m-2 rounded-2xl hover:bg-blue-50/60 transition-colors cursor-pointer group"
            title="Accéder au profil 360 complet"
          >
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-white group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <PlayerHeadshot name={player.name} fallbackUrl={player.avatarUrl} className="w-full h-full rounded-xl" />
              <div className="absolute bottom-0 right-0 bg-blue-900/90 backdrop-blur-xs text-white text-[9px] font-mono font-black px-1.5 py-0.5 rounded-tl-md">
                #{player.number}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {player.name}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {player.position} • {player.club}
              </p>
              <div className="mt-2 flex items-center gap-2">
                {getStatusBadge(player.status)}
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  Score {player.scoreGlobal}/100
                </span>
              </div>
            </div>
          </div>

          {/* Alert Callout if exists */}
          {player.alert && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <div className="flex items-center gap-2 font-semibold text-xs text-amber-800 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Situation sous surveillance : {player.alert.label}</span>
              </div>
              <p className="text-xs text-amber-800/90 leading-relaxed font-medium">
                Valeur actuelle : <span className="font-bold">{player.alert.value}</span>. {player.alert.actionNeeded}
              </p>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-medium text-slate-500 block">Disponibilité</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {player.dimensions.sante.disponibilite}%
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {player.dimensions.sante.joursSansGene}j sans gêne
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-medium text-slate-500 block">Charge 7 jours</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {player.dimensions.entrainement.score}/100
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {player.dimensions.entrainement.distance} km parcourus
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-medium text-slate-500 block">Vitesse max</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {player.dimensions.physique.vitesseMax} km/h
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Puissance {player.dimensions.physique.puissanceMax} m/s²
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-medium text-slate-500 block">Récupération</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {player.dimensions.recuperation.score}/100
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Sommeil {player.dimensions.recuperation.sommeil}
              </span>
            </div>
          </div>

          {/* Quick status change to test live synchronicity across the app */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <span className="text-xs font-bold text-slate-800 block">
              Tester la réactivité multi-pages (Statut direct) :
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updatePlayerStatus(player.id, 'disponible')}
                className={`text-xs py-1.5 px-2 rounded-lg font-semibold border transition-all ${
                  player.status === 'disponible'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                ✓ Disponible
              </button>
              <button
                onClick={() =>
                  updatePlayerStatus(player.id, 'a_surveiller', {
                    id: `alt-${player.id}`,
                    type: 'recup',
                    label: 'Fatigue accumulée',
                    value: '64/100',
                    severity: 'warning',
                    actionNeeded: 'Allégement séance collective.'
                  })
                }
                className={`text-xs py-1.5 px-2 rounded-lg font-semibold border transition-all ${
                  player.status === 'a_surveiller'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                }`}
              >
                ⚠ À surveiller
              </button>
              <button
                onClick={() => updatePlayerStatus(player.id, 'retour_progressif')}
                className={`text-xs py-1.5 px-2 rounded-lg font-semibold border transition-all ${
                  player.status === 'retour_progressif'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                }`}
              >
                ⟳ Reprise
              </button>
              <button
                onClick={() =>
                  updatePlayerStatus(player.id, 'indisponible', {
                    id: `alt-inj-${player.id}`,
                    type: 'medical',
                    label: 'Forfait médical',
                    value: '0% dispo',
                    severity: 'danger',
                    actionNeeded: 'Prise en charge staff médical.'
                  })
                }
                className={`text-xs py-1.5 px-2 rounded-lg font-semibold border transition-all ${
                  player.status === 'indisponible'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                }`}
              >
                ✕ Indisponible
              </button>
            </div>
            <p className="text-[10px] text-slate-400 italic">
              Modifier ce statut se reflète immédiatement sur le Dashboard, le Donut d'effectif, la fiche 360 et la liste de match !
            </p>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
          <button
            onClick={() => {
              closePlayerDrawer();
              navigateTo('joueur_360', { playerId: player.id });
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
          >
            <span>Accéder à la fiche Joueur 360 complète</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => openMedicalModal(player.id)}
            className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Consulter l'historique médical
          </button>
        </div>
      </div>
    </div>
  );
};
