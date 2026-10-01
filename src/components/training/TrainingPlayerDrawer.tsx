import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import { Match, TrainingSession } from '../../types/ams';
import {
  X,
  ArrowRight,
  Activity,
  Heart,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  Gauge,
  Flame,
  BatteryCharging,
  Smile,
  Compass
} from 'lucide-react';

interface TrainingPlayerDrawerProps {
  playerId: string | null;
  training: TrainingSession;
  onClose: () => void;
}

export const TrainingPlayerDrawer: React.FC<TrainingPlayerDrawerProps> = ({
  playerId,
  training,
  onClose
}) => {
  const { players, navigateTo } = useAMS();

  if (!playerId) return null;

  const player = players.find((p) => p.id === playerId);
  const participant = training.participants.find((p) => p.playerId === playerId);

  if (!player || !participant) return null;

  const isAbsent = participant.status === 'Absent' || participant.status === 'Repos programmé';
  const hasIncident = !!participant.incident;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white font-black text-sm flex items-center justify-center shadow-xs">
              {player.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900">{player.name}</h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5 py-0.5 bg-slate-200/60 rounded">
                  {player.position}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Performance individuelle — {training.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Alert Banner if any */}
          {participant.alertNotice && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Alerte séance :</span>
                <span>{participant.alertNotice}</span>
              </div>
            </div>
          )}

          {isAbsent ? (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Statut : {participant.status}
              </span>
              <p className="text-xs text-slate-600">
                Ce joueur était exempté ou absent lors de cette séance. Aucune donnée télémétrique GPS n'a été enregistrée, conformément aux règles AMS 360.
              </p>
            </div>
          ) : (
            <>
              {/* SECTION 1: CHARGE & INTENSITÉ */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>Charge & Intensité</span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    Catapult Vector
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] text-slate-500 block">Temps de participation</span>
                    <span className="text-base font-black font-mono text-slate-900">
                      {participant.participationMinutes} min
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      sur {training.durationMinutes} min totales
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] text-slate-500 block">Charge individuelle</span>
                    <span className="text-base font-black font-mono text-blue-700">
                      {participant.loadUA || Math.round(training.loadUA * (participant.rpe / 7.5))} UA
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                      Charge effective calculée
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] text-slate-500 block">RPE Séance</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-black font-mono text-slate-900">
                        {participant.rpe}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">/ 10</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Échelle de Borg CR-10
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] text-slate-500 block">Temps haute intensité</span>
                    <span className="text-base font-black font-mono text-slate-900">
                      {participant.highIntensityTimeMin || (participant.rpe >= 8 ? 22 : 14)} min
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">
                      {'>'} 85% FC max
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: PHYSIQUE / GPS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-blue-600" />
                    <span>Physique / GPS</span>
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Capteurs temps réel
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase block">Distance</span>
                    <span className="text-sm font-black font-mono text-slate-900">
                      {participant.distanceKm} km
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase block">Dist. Haute Int.</span>
                    <span className="text-sm font-black font-mono text-slate-900">
                      {participant.highIntensityDistanceM || Math.round(participant.distanceKm * 180)} m
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase block">Sprints</span>
                    <span className="text-sm font-black font-mono text-blue-600">
                      {participant.sprintsCount || Math.round(participant.distanceKm * 4.5)}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase block">Vitesse Max</span>
                    <span className="text-sm font-black font-mono text-slate-900">
                      {participant.maxSpeed} km/h
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase block">Accélérations</span>
                    <span className="text-sm font-black font-mono text-slate-900">
                      {participant.accelerations || 24}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase block">Décélérations</span>
                    <span className="text-sm font-black font-mono text-slate-900">
                      {participant.decelerations || 28}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: BALLON / TECHNIQUE */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Ballon / Technique</span>
                </h4>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Touches de balle</span>
                    <span className="font-mono font-bold text-slate-900">
                      {participant.ballTouches || (player.position === 'Gardien' ? 42 : 78)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Passes réussies / tentées</span>
                    <span className="font-mono font-bold text-slate-900">
                      {participant.passesCompleted || (player.position === 'Gardien' ? 28 : 52)} / {participant.passesAttempted || (player.position === 'Gardien' ? 32 : 58)}
                      <span className="text-[11px] text-emerald-600 ml-1">
                        ({participant.passesAccuracy || 90}%)
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Duels disputés (gagnés)</span>
                    <span className="font-mono font-bold text-slate-900">
                      {participant.duelsWon || 4} / {participant.duelsCount || 6}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Tirs (cadrés)</span>
                    <span className="font-mono font-bold text-slate-900">
                      {participant.shotsCount || (player.position === 'Attaquant' ? 5 : 1)} ({participant.shotsOnTarget || (player.position === 'Attaquant' ? 3 : 1)})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Récupérations / Pertes</span>
                    <span className="font-mono font-bold text-slate-900">
                      {participant.recoveries || 5} recup. / {participant.ballLosses || 3} pertes
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 4: RESSENTI POST-SÉANCE */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ressenti post-séance</span>
                </h4>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase block">Fatigue</span>
                      <span className="font-mono font-bold text-slate-800">
                        {participant.postWellness?.fatigue || 2}/5
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase block">Courbatures</span>
                      <span className="font-mono font-bold text-slate-800">
                        {participant.postWellness?.soreness || 2}/5
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase block">Stress</span>
                      <span className="font-mono font-bold text-slate-800">
                        {participant.postWellness?.stress || 1}/5
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase block">Sommeil</span>
                      <span className="font-mono font-bold text-slate-800">
                        {participant.postWellness?.sleepQuality || 4}/5
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <span>Ressenti général :</span>
                    <span className="font-bold text-slate-900">
                      {participant.postWellness?.generalFeeling || participant.feedback || 'Très bonne assimilation'}
                    </span>
                  </div>

                  {participant.postWellness?.comment && (
                    <p className="text-[11px] text-slate-500 italic bg-white p-2.5 rounded-lg border border-slate-200">
                      « {participant.postWellness.comment} »
                    </p>
                  )}
                </div>
              </div>

              {/* SECTION 5: SANTÉ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  <span>Santé & Incidents</span>
                </h4>

                {hasIncident && participant.incident ? (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-rose-900 font-bold">
                      <span>Incident survenu à la {participant.incident.minute}e minute</span>
                      <span className="px-2 py-0.5 rounded bg-rose-200/70 text-rose-900 font-mono text-[10px]">
                        Gravité : {participant.incident.severity}
                      </span>
                    </div>
                    <div className="text-rose-800 space-y-1">
                      <p>• Zone corporelle : <strong>{participant.incident.bodyArea}</strong></p>
                      <p>• Impact séance : {participant.incident.impact}</p>
                      <p>• Décision staff médical : <strong>{participant.incident.staffDecision}</strong></p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold block">Aucun incident signalé</span>
                      <span className="text-[11px] text-emerald-800">
                        Séance complétée sans douleur ni alerte articulaire ou musculaire.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Link to Joueur 360 */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Profil synchronisé FFF
          </div>
          <button
            onClick={() => {
              onClose();
              navigateTo('joueur_360', { playerId: player.id });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <span>Voir Joueur 360</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
