import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import {
  MEDICAL_MATCH_PREP_DATA
} from '../../data/strategyMedicalMatchData';
import {
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2
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
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-rose-700">
            Suivi médical • Avant-match · {UPCOMING_MATCH.weekday} {UPCOMING_MATCH.shortDate} ({UPCOMING_MATCH.countdown})
          </p>
          <h1 className="mt-1 text-xl font-black text-slate-950">Préparer {data.matchInfo.matchTitle}</h1>
          <p className="mt-1 text-sm text-slate-600">
            État de santé des 24 joueurs, risques individuels et recommandations pour le sélectionneur
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Revenir au tableau de bord médical"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Dashboard Médical</span>
          </button>

          <button
            onClick={() => openMedicalModal(selectedPlayerId)}
            className="px-3.5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Dossier médical</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE GLOBALE DE L'EFFECTIF                                         */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-rose-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Bilan de l'effectif (24 joueurs)
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-300">
            Disponibilité {data.globalSquadDiagnostic.squadReadinessIndex}% • Supervision Dr. F. Le Gall
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Aptes à 100%</span>
            <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
              {data.globalSquadDiagnostic.fullyFitCount} / {data.globalSquadDiagnostic.totalPlayers}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Feu vert complet</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">À surveiller</span>
            <div className="text-xl font-black text-amber-700 font-mono mt-0.5">
              {data.globalSquadDiagnostic.monitoredCount}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Mbappé, Rabiot, Dembélé</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Temps régulé</span>
            <div className="text-xl font-black text-blue-900 font-mono mt-0.5">
              {data.globalSquadDiagnostic.restrictedMinutesCount}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Max 60-75 minutes</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Inaptes</span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {data.globalSquadDiagnostic.unfitCount}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Aucun forfait</span>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">Risque global</span>
            <div className="text-xl font-black text-emerald-900 font-mono mt-0.5">
              {data.globalSquadDiagnostic.overallInjuryRiskLevel}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">ACWR sous contrôle</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. JOUEURS SOUS SURVEILLANCE & FICHE CLINIQUE                             */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">Joueurs sous surveillance</h2>
          <p className="text-xs text-slate-500 font-medium">
            Sélectionnez un joueur pour afficher sa fiche clinique et la consigne transmise au staff.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {data.playersUnderSurveillance.map((p) => {
            const isSelected = selectedPlayerId === p.id;
            const statusLabel =
              p.status === 'temps_regule'
                ? `Temps régulé · ${p.maxMinutesRecommended}′`
                : p.status === 'apte_surveillance'
                ? 'Apte sous surveillance'
                : '100% apte';
            const statusClass =
              p.status === 'temps_regule'
                ? 'bg-blue-100 text-blue-900'
                : p.status === 'apte_surveillance'
                ? 'bg-amber-100 text-amber-900'
                : 'bg-emerald-100 text-emerald-800';

            return (
              <button
                type="button"
                key={p.id}
                onClick={() => setSelectedPlayerId(p.id)}
                aria-pressed={isSelected}
                className={`w-full p-4 rounded-2xl border text-left transition-colors cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-400/30 shadow-md'
                    : 'bg-white border-slate-200 shadow-2xs hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${statusClass}`}>
                      {statusLabel}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{p.position}</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 tracking-tight mt-2">{p.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium leading-snug line-clamp-2">
                    {p.targetedStructure}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                    <span>Risque blessure</span>
                    <span className="font-mono text-slate-900">{p.injuryRiskScore} / 10</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        p.injuryRiskScore >= 3 ? 'bg-amber-500' : p.injuryRiskScore >= 2 ? 'bg-blue-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${p.injuryRiskScore * 10}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase text-rose-700">Fiche clinique · {activePlayer.position}</span>
            <h3 className="mt-1 text-base font-black text-slate-900">{activePlayer.name}</h3>
            <p className="mt-1 text-xs text-slate-500">{activePlayer.targetedStructure}</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-800">
            Max {activePlayer.maxMinutesRecommended} min recommandées
          </span>
        </div>

        <p className="text-sm leading-relaxed text-slate-700">{activePlayer.clinicalDiagnosis}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-2">
            <h4 className="text-xs font-bold text-emerald-900">Consigne pour le sélectionneur</h4>
            <div className="rounded-lg border border-emerald-100 bg-white p-3 text-xs text-slate-800 font-medium leading-relaxed">
              {activePlayer.coachInstruction}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">Protections obligatoires</h4>
            {activePlayer.mandatoryProtections.map((prot) => (
              <div key={prot} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{prot}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. RECOMMANDATIONS OFFICIELLES POUR ZINÉDINE ZIDANE                       */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Recommandations transmises au sélectionneur
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-300">
            Protocole staff validé
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
            <Clock className="w-4 h-4 text-rose-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Protocoles de soins du jour de match (J-0)
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
