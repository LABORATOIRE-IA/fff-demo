import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import {
  MEDICAL_MATCH_PREP_DATA,
  PlayerHealthStatus
} from '../../data/strategyMedicalMatchData';
import {
  Sparkles,
  Stethoscope,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Heart,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  Sliders,
  UserCheck,
  Zap,
  HelpCircle,
  X
} from 'lucide-react';

export const AIStrategyMedicalMatchView: React.FC = () => {
  const { navigateTo, openMedicalModal } = useAMS();
  const data = MEDICAL_MATCH_PREP_DATA;

  // Selected player for detail modal/focus
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('mbappe');

  const activePlayer = data.playersUnderSurveillance.find((p) => p.id === selectedPlayerId) || data.playersUnderSurveillance[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12 select-none">
      {/* ========================================================================= */}
      {/* 1. CONCEPT & HEADER PREMIUM                                               */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-emerald-950 text-white p-5 sm:p-6 rounded-3xl border border-emerald-500/30 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest font-black text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>OBJECTIFS STAFF MÉDICAL • DÉCISION CLINIQUE AVANT-MATCH</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-slate-300 font-mono font-medium">
              Match {UPCOMING_MATCH.weekday} ({UPCOMING_MATCH.countdown}) • {UPCOMING_MATCH.shortDate}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Préparer la prochaine rencontre • {data.matchInfo.matchTitle}</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/85 font-medium max-w-2xl mt-1 leading-relaxed">
              Diagnostic complet de l'état de santé des 24 Bleus, matrice de prédiction des risques lésionnels et recommandations médicales officielles pour le sélectionneur Zinédine Zidane.
            </p>
          </div>

          {/* Sources analyzed row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-slate-300">
            <span className="font-bold text-emerald-300">Données cliniques & capteurs synchronisés :</span>
            {[
              'Échographies & IRM Clairefontaine',
              'Isocinétisme Cybex',
              'Ratio ACWR 28j',
              'Questionnaires de douleur EVA',
              'Données médicales Clubs'
            ].map((src, i, arr) => (
              <span key={src} className="flex items-center gap-1">
                <span className="text-white/90">{src}</span>
                {i < arr.length - 1 && <span className="text-emerald-500">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Revenir au tableau de bord médical"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Dashboard Médical</span>
          </button>

          <button
            onClick={() => openMedicalModal(selectedPlayerId)}
            className="px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Stethoscope className="w-3.5 h-3.5 text-slate-950" />
            <span>Dossier Médical FFF</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE GLOBALE DE L'EFFECTIF (6 METRICS CLÉS)                        */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Diagnostic Médical Global de l'Effectif (24 Joueurs)
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-300">
            Indice de Disponibilité : {data.globalSquadDiagnostic.squadReadinessIndex}%
          </span>
        </div>

        {/* 6 Key Medical KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
              Aptes à 100%
            </span>
            <div className="text-xl font-black text-emerald-900 font-mono mt-0.5">
              {data.globalSquadDiagnostic.fullyFitCount} / 24
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Feu vert médical complet</span>
          </div>

          <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
              À Surveiller
            </span>
            <div className="text-xl font-black text-amber-900 font-mono mt-0.5">
              {data.globalSquadDiagnostic.monitoredCount} joueurs
            </div>
            <span className="text-[10px] text-amber-700 font-medium">Mbappé, Rabiot, Dembélé</span>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
              Temps Régulé
            </span>
            <div className="text-xl font-black text-blue-900 font-mono mt-0.5">
              {data.globalSquadDiagnostic.restrictedMinutesCount} cadres
            </div>
            <span className="text-[10px] text-blue-600 font-medium">Max 60-75 minutes</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Inaptes / Forfaits
            </span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {data.globalSquadDiagnostic.unfitCount}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold font-mono">0 forfait majeur</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
              Risque Global
            </span>
            <div className="text-xl font-black text-emerald-800 font-mono mt-0.5">
              {data.globalSquadDiagnostic.overallInjuryRiskLevel}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">ACWR sous contrôle</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Supervision
            </span>
            <div className="text-sm font-black text-slate-900 font-mono mt-1 truncate">
              Dr. F. Le Gall
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Staff FFF 24/24h</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MATRICE DE SURVEILLANCE PAR JOUEUR & INSPECTEUR CLINIQUE               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Liste des Joueurs en Surveillance (7/12) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Joueurs sous Surveillance Médicale Renforcée
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Cliquez pour inspecter</span>
          </div>

          <div className="space-y-2.5">
            {data.playersUnderSurveillance.map((p) => {
              const isSelected = selectedPlayerId === p.id;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlayerId(p.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-400/30 shadow-sm'
                      : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-black text-slate-900">{p.name}</strong>
                      <span className="text-[10px] text-slate-500 font-mono">({p.position})</span>
                    </div>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        p.status === 'temps_regule'
                          ? 'bg-blue-100 text-blue-900 font-black'
                          : p.status === 'apte_surveillance'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {p.status === 'temps_regule'
                        ? 'Temps Régulé (Max 70m)'
                        : p.status === 'apte_surveillance'
                        ? 'Apte avec surveillance'
                        : '100% Apte'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-snug font-medium">
                    <strong>Structure :</strong> {p.targetedStructure}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-1 font-mono">
                    {p.clinicalDiagnosis}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Détail Médical du Joueur Sélectionné (5/12) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Fiche Clinique : {activePlayer.name}
            </span>
            <span className="text-xs font-mono font-black text-slate-900">
              Risque : {activePlayer.injuryRiskScore} / 10
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Diagnostic Clinique :</span>
              <p className="text-slate-800 font-medium leading-relaxed">{activePlayer.clinicalDiagnosis}</p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block font-mono">Prescription pour Zinédine Zidane :</span>
              <p className="text-emerald-950 font-bold leading-relaxed">{activePlayer.coachInstruction}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Protections Obligatoires :</span>
              <ul className="space-y-1">
                {activePlayer.mandatoryProtections.map((prot, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{prot}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. RECOMMANDATIONS OFFICIELLES POUR ZINÉDINE ZIDANE                       */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Recommandations Médicales Officielles transmises à Zinédine Zidane
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-300">
            Protocole Staff FFF Validé
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {data.tacticalRecommendationsForZidane.map((rec, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    rec.urgency === 'Prioritaire'
                      ? 'bg-rose-100 text-rose-800 font-black'
                      : rec.urgency === 'Vigilance'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {rec.category} • {rec.urgency}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Staff Technique</span>
              </div>
              <h4 className="text-xs font-black text-slate-900">{rec.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {rec.description}
              </p>
              <div className="text-[10px] font-mono text-slate-400 pt-0.5">
                Joueurs concernés : {rec.concernedPlayers.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. PROTOCOLES MÉDICAUX DU JOUR J (J-0)                                    */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Déroulé des Protocoles de Soins du Jour de Match (J-0)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {data.matchDayProtocols.map((proto, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {proto.timing}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{proto.location}</span>
              </div>
              <h4 className="text-xs font-black text-slate-900">{proto.protocolTitle}</h4>
              <ul className="space-y-1 text-xs">
                {proto.actions.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-slate-700 font-medium">
                    <span className="text-emerald-600">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
