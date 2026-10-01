import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Activity,
  Users,
  ChevronRight,
  Smile,
  Zap,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  ChevronDown,
  Info
} from 'lucide-react';
import { TrainingPlayerDrawer } from './TrainingPlayerDrawer';
import { DataActionBar } from '../layout/DataActionBar';

export const TrainingDetailView: React.FC = () => {
  const {
    selectedTraining,
    goBack,
    navigateTo,
    players,
    trainings
  } = useAMS();

  const training = selectedTraining;

  // Selected player for lateral performance drawer
  const [selectedDrawerPlayerId, setSelectedDrawerPlayerId] = useState<string | null>(null);

  // Tab state within Training Detail:
  // 'resume' | 'participants' | 'timeline' | 'comparaison'
  const [activeTab, setActiveTab] = useState<'resume' | 'participants' | 'timeline' | 'comparaison'>('resume');

  // Comparison metric filter
  const [comparisonMetric, setComparisonMetric] = useState<'distance' | 'charge' | 'rpe' | 'sprints' | 'vitesseMax' | 'highIntensity'>('distance');

  const getPlayerDetails = (playerId: string) => {
    return players.find((p) => p.id === playerId);
  };

  // Collective metrics calculation
  const totalTeamDistance = training.participants.reduce((acc, p) => acc + (p.distanceKm || 0), 0).toFixed(1);
  const activeParticipants = training.participants.filter((p) => p.status !== 'Absent' && p.status !== 'Repos programmé');
  const avgDistancePerPlayer = (Number(totalTeamDistance) / (activeParticipants.length || 1)).toFixed(1);
  const totalHighIntensityDistance = training.participants.reduce((acc, p) => acc + (p.highIntensityDistanceM || Math.round(p.distanceKm * 180)), 0);
  const totalTeamSprints = training.participants.reduce((acc, p) => acc + (p.sprintsCount || Math.round(p.distanceKm * 4.5)), 0);
  const peakSpeed = Math.max(...training.participants.map((p) => p.maxSpeed || 0));
  const avgRPE = (training.participants.reduce((acc, p) => acc + (p.rpe || 0), 0) / (activeParticipants.length || 1)).toFixed(1);
  const avgLoadUA = training.loadUA;
  const totalBallTouches = training.participants.reduce((acc, p) => acc + (p.ballTouches || Math.round(p.distanceKm * 8.5)), 0);

  // Sorting for comparison table
  const sortedParticipantsForComparison = [...training.participants].sort((a, b) => {
    if (comparisonMetric === 'distance') return b.distanceKm - a.distanceKm;
    if (comparisonMetric === 'charge') return (b.loadUA || b.rpe * 50) - (a.loadUA || a.rpe * 50);
    if (comparisonMetric === 'rpe') return b.rpe - a.rpe;
    if (comparisonMetric === 'sprints') return (b.sprintsCount || 0) - (a.sprintsCount || 0);
    if (comparisonMetric === 'vitesseMax') return b.maxSpeed - a.maxSpeed;
    if (comparisonMetric === 'highIntensity') return (b.highIntensityDistanceM || 0) - (a.highIntensityDistanceM || 0);
    return 0;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. TRAINING HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="font-bold text-slate-900">Détail de la séance</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{training.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{training.startTime || '10:30'} – {training.endTime || '12:02'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{training.location}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              {training.type}
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {training.durationMinutes} min
            </span>
          </div>
        </div>

        {/* Title & Key Collective Banner info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {training.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <strong className="text-slate-900">{training.presentCount || 22} / {training.totalSquadCount || 25} joueurs</strong>
              </span>
              <span>•</span>
              <span>Intensité collective : <strong className="text-blue-700">{training.intensityScore || 74} / 100</strong></span>
              <span>•</span>
              <span>Charge collective : <strong className="text-slate-900">{training.collectiveLoadLabel || 'Modérée'}</strong></span>
            </div>
          </div>

          {/* Training Switcher / Quick Jump & Data Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <DataActionBar
              scope="training"
              customImportLabel="Importer"
              customExportLabel="Exporter"
            />
            <select
              value={training.id}
              onChange={(e) => navigateTo('detail_training', { trainingId: e.target.value })}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shrink-0"
            >
              {trainings.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.date} • {t.type} ({t.durationMinutes}m)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1 pt-3 border-t border-slate-100 overflow-x-auto">
          {[
            { id: 'resume', label: 'Résumé collectif' },
            { id: 'participants', label: `Participants (${training.participants.length})` },
            { id: 'timeline', label: 'Déroulé & Timeline de la séance' },
            { id: 'comparaison', label: 'Comparaison des joueurs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. RÉSUMÉ COLLECTIF (Tab 1) */}
      {activeTab === 'resume' && (
        <div className="space-y-6">
          {/* Main Key Figures Grid */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Indicateurs de charge & télémétrie GPS de l'équipe
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Données consolidées en temps réel par les capteurs Catapult Vector et retour de questionnaires FFF.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Synchronisé Catapult
              </span>
            </div>

            {/* 10 Collective Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {/* Durée */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Durée effective
                </span>
                <span className="text-2xl font-black font-mono text-slate-900 leading-tight">
                  {training.durationMinutes} min
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  100% du plan
                </span>
              </div>

              {/* Participants */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Participants
                </span>
                <span className="text-2xl font-black font-mono text-slate-900 leading-tight">
                  {training.presentCount || 22} <span className="text-xs font-normal text-slate-500">/ 25</span>
                </span>
                <span className="text-[10px] text-amber-600 font-semibold block mt-1">
                  3 joueurs adaptés/absents
                </span>
              </div>

              {/* Distance Totale Équipe */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Distance totale équipe
                </span>
                <span className="text-2xl font-black font-mono text-blue-700 leading-tight">
                  {totalTeamDistance} km
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                  +3% vs séance habituelle
                </span>
              </div>

              {/* Distance Moyenne / Joueur */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Moyenne / joueur
                </span>
                <span className="text-2xl font-black font-mono text-slate-900 leading-tight">
                  {avgDistancePerPlayer} km
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Réf. poste : 8.8 km
                </span>
              </div>

              {/* Distance Haute Intensité */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Distance Haute Int.
                </span>
                <span className="text-2xl font-black font-mono text-slate-900 leading-tight">
                  {(totalHighIntensityDistance / 1000).toFixed(1)} km
                </span>
                <span className="text-[10px] text-blue-600 font-semibold block mt-1">
                  {'>'} 19.8 km/h
                </span>
              </div>

              {/* Sprints */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Sprints cumulés
                </span>
                <span className="text-2xl font-black font-mono text-slate-900 leading-tight">
                  {totalTeamSprints}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {'>'} 25.2 km/h
                </span>
              </div>

              {/* Vitesse Maximale */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Vitesse maximale
                </span>
                <span className="text-2xl font-black font-mono text-rose-600 leading-tight">
                  {peakSpeed.toFixed(1)} km/h
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  K. Mbappé (35.2 km/h)
                </span>
              </div>

              {/* Charge Moyenne UA */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Charge moyenne UA
                </span>
                <span className="text-2xl font-black font-mono text-blue-700 leading-tight">
                  {avgLoadUA} UA
                </span>
                <span className="text-[10px] text-amber-600 font-semibold block mt-1">
                  +{training.loadDiffPercent}% vs objectif
                </span>
              </div>

              {/* RPE Moyen */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  RPE moyen équipe
                </span>
                <span className="text-2xl font-black font-mono text-slate-900 leading-tight">
                  {avgRPE} <span className="text-xs font-normal text-slate-400">/ 10</span>
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                  Perception : {training.perceivedEffort.verbal}
                </span>
              </div>

              {/* Touches de Balle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Touches de balle
                </span>
                <span className="text-2xl font-black font-mono text-slate-900 leading-tight">
                  {totalBallTouches}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Volume technique élevé
                </span>
              </div>
            </div>

            {/* Comparaisons collectives : vs séance habituelle, vs 30 jours, vs séances similaires */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
              <span className="text-xs font-bold text-blue-950 uppercase tracking-wider block">
                Benchmarking collectif FFF
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-blue-200/60">
                  <span className="text-[11px] text-slate-500 block font-medium">vs Séance habituelle (Mercredi J-3)</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-mono font-bold text-slate-900">+4% de charge</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                      Conforme
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Volume de jeu réduit légèrement supérieur (+5 min), mais décélérations bien contrôlées.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-blue-200/60">
                  <span className="text-[11px] text-slate-500 block font-medium">vs Moyenne 30 jours</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-mono font-bold text-slate-900">+8% de sprints haute intensité</span>
                    <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded font-semibold border border-blue-200">
                      Dynamique
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Les attaquants et latéraux ont produit 18% de sprints en plus grâce aux ateliers de transition.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-blue-200/60">
                  <span className="text-[11px] text-slate-500 block font-medium">vs Séances similaires</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-mono font-bold text-slate-900">RPE 6.9 vs 7.1 attendu</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                      Assimilation optimale
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Indice de fatigue ressenti inférieur à la médiane malgré l'intensité des blocs médians.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Participants Preview Bar */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {training.participants.length} joueurs monitorés sur cette séance
                </h3>
                <p className="text-xs text-slate-500">
                  Cliquez sur l'onglet "Participants" pour consulter chaque profil ou ouvrir le drawer latéral.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('participants')}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              <span>Voir les participants</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. PARTICIPANTS (Tab 2) */}
      {activeTab === 'participants' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Effectif présent & adaptation individuelle
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Cliquez sur n'importe quel joueur pour ouvrir son drawer latéral sans quitter la séance.
              </p>
            </div>

            {/* Status Legend */}
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                ● Complet
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                ● Adapté / Reprise
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                ● Travail individuel
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 font-medium">
                ● Absent / Soins
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Joueur</th>
                  <th className="p-3">Poste</th>
                  <th className="p-3">Statut séance</th>
                  <th className="p-3 text-right">Temps</th>
                  <th className="p-3 text-right">Charge</th>
                  <th className="p-3 text-right">RPE</th>
                  <th className="p-3 text-right">Distance</th>
                  <th className="p-3 text-right">Vitesse Max</th>
                  <th className="p-3">Alerte / Note staff</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {training.participants.map((pt) => {
                  const player = getPlayerDetails(pt.playerId);
                  const isAbsent = pt.status === 'Absent' || pt.status === 'Repos programmé';

                  return (
                    <tr
                      key={pt.playerId}
                      onClick={() => setSelectedDrawerPlayerId(pt.playerId)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                      title="Ouvrir la performance individuelle"
                    >
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-2 group-hover:text-blue-600">
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-[10px] flex items-center justify-center font-bold">
                          {player?.number || '#'}
                        </span>
                        <div className="truncate">
                          <span className="block truncate">{player?.name || pt.playerId}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{player?.club}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-500">{player?.position}</td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            pt.status === 'Complet'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : pt.status === 'Adapté' || pt.status === 'Retour progressif'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : pt.status === 'Travail individuel'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {pt.status}
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono">
                        {isAbsent ? '—' : `${pt.participationMinutes} min`}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-blue-700">
                        {isAbsent ? '—' : `${pt.loadUA || Math.round(training.loadUA * (pt.rpe / 7.5))} UA`}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-slate-800">
                        {isAbsent ? '—' : `${pt.rpe}/10`}
                      </td>
                      <td className="p-3 text-right font-mono font-semibold">
                        {isAbsent ? '0.0 km' : `${pt.distanceKm} km`}
                      </td>
                      <td className="p-3 text-right font-mono text-slate-600">
                        {isAbsent ? '—' : `${pt.maxSpeed} km/h`}
                      </td>
                      <td className="p-3">
                        {pt.alertNotice ? (
                          <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                            <span className="truncate max-w-[200px]">{pt.alertNotice}</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">Aucune restriction</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDrawerPlayerId(pt.playerId);
                          }}
                          className="px-2.5 py-1 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white rounded-lg text-[11px] font-bold text-slate-700 transition-colors"
                        >
                          Détail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TIMELINE DE SÉANCE (Tab 3) */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Déroulé chronologique & charge par phase
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Horaires réels, objectifs techniques et montée en charge métabolique enregistrée au fil des minutes.
            </p>
          </div>

          {/* Timeline phases */}
          <div className="space-y-4 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 pl-8">
            {training.exercises.map((phase, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group-hover:border-blue-300 group-hover:bg-blue-50/20 transition-all">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {phase.timeStart || '10:30'} – {phase.timeEnd || '10:45'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        ({phase.duration} min)
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-500 px-2 py-0.5 bg-slate-200/60 rounded">
                        {phase.phaseType || 'Phase'}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900">
                      {phase.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Charge estimée
                      </span>
                      <span className="text-xs font-mono font-bold text-blue-700">
                        {phase.loadUA || Math.round(training.loadUA * (phase.duration / training.durationMinutes))} UA
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        phase.intensity === 'Élevée'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : phase.intensity === 'Moyenne'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      Intensité {phase.intensity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visualisations Utiles (Charge dans le temps, intensité, zones de vitesse) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            {/* Distribution de charge dans le temps */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Distribution temporelle de l'intensité
              </span>
              <div className="space-y-2 text-xs font-sans">
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>0 – 20 min : Échauffement & activation</span>
                    <span className="font-mono font-bold">15%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>20 – 50 min : Technique & conservation sous pression</span>
                    <span className="font-mono font-bold">25%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>50 – 80 min : Jeu réduit haute intensité & blocs</span>
                    <span className="font-mono font-bold">50%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-rose-500 h-2 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>80 – 92 min : Retour au calme & étirements</span>
                    <span className="font-mono font-bold">10%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Zones de vitesse Catapult */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Distance collective par zone de vitesse
              </span>
              <div className="space-y-2 text-xs font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Zone 1 : Marche / Trot (0 — 14.4 km/h)</span>
                  <span className="font-mono font-bold text-slate-900">54% (98.2 km)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Zone 2 : Course aérobie (14.4 — 19.8 km/h)</span>
                  <span className="font-mono font-bold text-slate-900">32% (58.1 km)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Zone 3 : Haute intensité (19.8 — 25.2 km/h)</span>
                  <span className="font-mono font-bold text-blue-700">10% (18.2 km)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Zone 4 : Sprint maximal ({'>'} 25.2 km/h)</span>
                  <span className="font-mono font-bold text-rose-600">4% (7.3 km)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. COMPARAISON DES JOUEURS (Tab 4) */}
      {activeTab === 'comparaison' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Comparaison télémétrique inter-joueurs
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Classement et distribution des charges athlétiques sur la séance.
              </p>
            </div>

            {/* Metric Switcher Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs">
              {[
                { id: 'distance', label: 'Distance' },
                { id: 'charge', label: 'Charge (UA)' },
                { id: 'rpe', label: 'RPE' },
                { id: 'sprints', label: 'Sprints' },
                { id: 'vitesseMax', label: 'Vitesse Max' },
                { id: 'highIntensity', label: 'Haute Intensité' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setComparisonMetric(m.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    comparisonMetric === m.id
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ranking Table / Bar comparison */}
          <div className="space-y-2 pt-2">
            {sortedParticipantsForComparison.map((pt, idx) => {
              const player = getPlayerDetails(pt.playerId);
              const isAbsent = pt.status === 'Absent' || pt.status === 'Repos programmé';

              let metricValue = `${pt.distanceKm} km`;
              let barPercent = (pt.distanceKm / 12) * 100;

              if (comparisonMetric === 'charge') {
                const val = pt.loadUA || Math.round(training.loadUA * (pt.rpe / 7.5));
                metricValue = isAbsent ? '0 UA' : `${val} UA`;
                barPercent = (val / 600) * 100;
              } else if (comparisonMetric === 'rpe') {
                metricValue = isAbsent ? '—' : `${pt.rpe} / 10`;
                barPercent = (pt.rpe / 10) * 100;
              } else if (comparisonMetric === 'sprints') {
                metricValue = `${pt.sprintsCount || 0} sprints`;
                barPercent = ((pt.sprintsCount || 0) / 32) * 100;
              } else if (comparisonMetric === 'vitesseMax') {
                metricValue = isAbsent ? '—' : `${pt.maxSpeed} km/h`;
                barPercent = (pt.maxSpeed / 37) * 100;
              } else if (comparisonMetric === 'highIntensity') {
                metricValue = isAbsent ? '0 m' : `${pt.highIntensityDistanceM || Math.round(pt.distanceKm * 180)} m`;
                barPercent = ((pt.highIntensityDistanceM || Math.round(pt.distanceKm * 180)) / 2200) * 100;
              }

              return (
                <div
                  key={pt.playerId}
                  onClick={() => setSelectedDrawerPlayerId(pt.playerId)}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200/80 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  {/* Left rank and player */}
                  <div className="flex items-center gap-3 w-56 shrink-0">
                    <span className="w-5 font-mono text-xs font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                      {player?.number || '#'}
                    </div>
                    <div className="truncate">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block truncate">
                        {player?.name || pt.playerId}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{player?.position}</span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="flex-1 hidden sm:block">
                    <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx < 3 ? 'bg-blue-600' : 'bg-slate-400'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(4, barPercent))}%` }}
                      />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="text-right shrink-0 w-28">
                    <span className="text-xs font-mono font-bold text-slate-900 block">
                      {metricValue}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {pt.status}
                    </span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LATERAL DRAWER FOR TRAINING PLAYER PERFORMANCE (Section 5) */}
      <TrainingPlayerDrawer
        playerId={selectedDrawerPlayerId}
        training={training}
        onClose={() => setSelectedDrawerPlayerId(null)}
      />
    </div>
  );
};
