import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import { REFEREE_MATCH_PREP_DATA } from '../../data/strategyRefereePrepData';
import { PLAYER_HEADSHOTS } from '../../data/playerHeadshotsData';
import { ArrowLeft, Video, ShieldAlert } from 'lucide-react';

const PlayerThumb: React.FC<{ name: string; size?: 'sm' | 'md' }> = ({ name, size = 'sm' }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const photo = PLAYER_HEADSHOTS[name];
  const dimension = size === 'md' ? 'h-8 w-8 text-[10px]' : 'h-6 w-6 text-[9px]';
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  return photo && !imageFailed ? (
    <img src={photo} alt={name} onError={() => setImageFailed(true)} className={`${dimension} shrink-0 rounded-full object-cover object-top ring-1 ring-slate-200`} />
  ) : (
    <span aria-hidden="true" className={`${dimension} flex shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-600`}>
      {initials}
    </span>
  );
};

const IMPACT_STYLES = {
  Majeur: 'bg-rose-100 text-rose-800',
  'Modéré': 'bg-amber-100 text-amber-800',
  Mineur: 'bg-slate-100 text-slate-700'
} as const;

export const AIStrategyRefereeStrategyView: React.FC = () => {
  const { navigateTo } = useAMS();
  const data = REFEREE_MATCH_PREP_DATA;
  const teams = [data.matchSheets.teamHome, data.matchSheets.teamAway];
  const teamProfiles = [data.teamTacticalAttention.teamHome, data.teamTacticalAttention.teamAway];
  const review = data.lastMatchReview;
  const maxPeriodValue = Math.max(...review.periods.map((period) => period.whistled + period.missed));

  return (
    <div className="mx-auto max-w-6xl space-y-5 pb-12">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-800">Préparation arbitrale</p>
          <h1 className="mt-1 text-xl font-black text-slate-950">{data.matchInfo.matchTitle}</h1>
          <p className="mt-1 text-sm text-slate-600">{data.matchInfo.competition} · {data.matchInfo.date} · {data.matchInfo.stadium}</p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('dashboard')}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard Arbitrage
        </button>
      </header>

      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-slate-900">Feuilles de match</h2>
            <p className="mt-1 text-xs text-slate-500">Onze de départ du France–Belgique du 9 septembre 2024, à titre de référence historique. Les titulaires du match à venir ne sont pas encore annoncés.</p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-bold text-blue-700">
            <a href={data.matchInfo.lineupSourceUrl} target="_blank" rel="noreferrer" className="hover:text-blue-900">Compositions : Sky Sports</a>
            <a href="https://www.fff.fr/selection/2-equipe-de-france/derniere-selection.html" target="_blank" rel="noreferrer" className="hover:text-blue-900">Portraits : FFF</a>
            <a href="https://www.rbfa.be/fr/equipes-nationales/diables-rouges/selection-des-diables-rouges" target="_blank" rel="noreferrer" className="hover:text-blue-900">RBFA</a>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {teams.map((team, teamIndex) => (
            <article key={team.name} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900">{team.name}</h3>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${teamIndex === 0 ? 'bg-blue-50 text-blue-800' : 'bg-rose-50 text-rose-800'}`}>
                  {team.formation}
                </span>
              </div>
              <ol className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {team.starters.map((player) => (
                  <li key={`${team.name}-${player.name}`} className="flex min-w-0 items-center justify-between gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className={`w-5 shrink-0 text-right font-mono text-xs font-black ${teamIndex === 0 ? 'text-blue-700' : 'text-rose-700'}`}>{player.number}</span>
                      <PlayerThumb name={player.name} />
                      <span className="truncate text-xs font-semibold text-slate-800">{player.name}</span>
                    </span>
                    <span className="shrink-0 text-[10px] text-slate-500">{player.position}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <div>
            <h2 className="text-base font-black text-slate-900">Analyse comportementale et décisionnelle</h2>
            <p className="mt-1 text-xs text-slate-500">Repères de vigilance pour l’équipe arbitrale • profils comportementaux fictifs de démonstration.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-700">Zones de tension et antécédents</h3>
            {data.playerRivalries.map((rivalry) => (
              <div key={rivalry.id} className="rounded-xl border border-rose-100 bg-rose-50/50 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="flex items-center gap-1.5">
                      <PlayerThumb name={rivalry.playerA.name} size="md" />
                      <span><strong className="block text-slate-900">{rivalry.playerA.name}</strong><span className="text-[10px] text-slate-500">{rivalry.playerA.club}</span></span>
                    </span>
                    <span className="text-slate-400">vs</span>
                    <span className="flex items-center gap-1.5">
                      <PlayerThumb name={rivalry.playerB.name} size="md" />
                      <span><strong className="block text-slate-900">{rivalry.playerB.name}</strong><span className="text-[10px] text-slate-500">{rivalry.playerB.club}</span></span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-800">Vigilance {rivalry.riskLevel}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-700">{rivalry.pastIncidents}</p>
                <p className="mt-2 border-t border-rose-100 pt-2 text-[11px] font-medium leading-relaxed text-slate-700"><strong>Consigne :</strong> {rivalry.refereeGuideline}</p>
              </div>
            ))}
            <div className="rounded-xl bg-slate-50 p-3">
              <h4 className="text-[10px] font-bold uppercase text-slate-600">Signaux individuels</h4>
              <ul className="mt-2 space-y-2">
                {data.behavioralProfiles.map((profile) => (
                  <li key={profile.id} className="flex items-start gap-2 text-xs text-slate-700">
                    <PlayerThumb name={profile.name} size="md" />
                    <span>
                      <strong>{profile.name}</strong> <span className="text-slate-500">({profile.club})</span> · {profile.trait} : {profile.statsWarning}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-slate-700">Style de jeu et zones de faute</h3>
            {teamProfiles.map((team) => (
              <div key={team.name} className="rounded-xl border border-slate-200 p-3">
                <h4 className="text-xs font-bold text-slate-900">{team.name}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-700">{team.tacticalStyle}</p>
                <p className="mt-2 text-[11px] text-slate-600"><strong>Zone de vigilance :</strong> {team.foulProvocationZone}</p>
              </div>
            ))}

            <div className="rounded-xl border border-slate-200 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900">Zones de fautes les plus fréquentes</h4>
                <div className="flex gap-3 text-[10px] text-slate-600">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-600" />{teams[0].name}</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" />{teams[1].name}</span>
                </div>
              </div>
              <svg viewBox="0 0 105 68" className="mt-2 w-full rounded-lg" role="img" aria-label="Plan du terrain avec les zones où chaque équipe commet le plus de fautes">
                <rect width="105" height="68" fill="#15803d" />
                <g fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="0.4">
                  <rect x="1" y="1" width="103" height="66" />
                  <line x1="52.5" y1="1" x2="52.5" y2="67" />
                  <circle cx="52.5" cy="34" r="9.15" />
                  <rect x="1" y="13.85" width="16.5" height="40.3" />
                  <rect x="87.5" y="13.85" width="16.5" height="40.3" />
                  <rect x="1" y="24.85" width="5.5" height="18.3" />
                  <rect x="98.5" y="24.85" width="5.5" height="18.3" />
                </g>
                {data.foulZones.map((zone) => (
                  <g key={`${zone.team}-${zone.label}`}>
                    <circle
                      cx={zone.x}
                      cy={zone.y}
                      r={2.5 + zone.fouls * 0.55}
                      fill={zone.team === 'home' ? '#2563eb' : '#f43f5e'}
                      fillOpacity="0.85"
                      stroke="#ffffff"
                      strokeWidth="0.3"
                    />
                    <text x={zone.x} y={zone.y + 1.2} textAnchor="middle" fontSize="3.4" fontWeight="700" fill="#ffffff">{zone.fouls}</text>
                  </g>
                ))}
              </svg>
              <p className="mt-1 text-[10px] text-slate-500">Fautes cumulées par zone sur les 5 derniers matchs (données fictives) • la France attaque vers la droite.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-start gap-3">
            <Video className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <h2 className="text-base font-black text-slate-900">Analyse de mon dernier match</h2>
              <p className="mt-1 text-xs text-slate-500">{review.matchTitle} · {review.date}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: 'Précision décisionnelle', value: `${review.decisionAccuracy}%` },
            { label: 'Fautes sifflées', value: review.foulsWhistled },
            { label: 'Fautes vues par la vidéo seulement', value: review.missedFouls },
            { label: 'Distance moyenne à l’action', value: review.averageDistanceToAction }
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-slate-50 p-3">
              <p className="text-[10px] font-semibold text-slate-500">{kpi.label}</p>
              <p className="mt-1 text-lg font-black text-slate-900">{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          <article className="space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase text-slate-700">Fautes par période</h3>
              <div className="flex gap-3 text-[10px] text-slate-600">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-blue-600" />Sifflées</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-rose-500" />Non vues</span>
              </div>
            </div>
            <div className="flex h-40 items-end gap-2 border-b border-slate-200 pb-1" role="img" aria-label="Répartition des fautes sifflées et non vues par période de 15 minutes">
              {review.periods.map((period) => (
                <div key={period.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span className="text-[9px] font-bold text-slate-500">{period.whistled + period.missed}</span>
                  <div className="flex w-full max-w-8 flex-col justify-end overflow-hidden rounded-t" style={{ height: `${((period.whistled + period.missed) / maxPeriodValue) * 85}%` }}>
                    <div className="bg-rose-500" style={{ flexGrow: period.missed }} />
                    <div className="bg-blue-600" style={{ flexGrow: period.whistled }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {review.periods.map((period) => (
                <span key={period.label} className="flex-1 text-center text-[9px] text-slate-500">{period.label}&apos;</span>
              ))}
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3">
              <h4 className="text-[10px] font-bold uppercase text-blue-900">Recommandations prioritaires</h4>
              <ul className="mt-2 space-y-1.5">
                {review.recommendations.map((recommendation) => (
                  <li key={recommendation} className="text-[11px] leading-relaxed text-slate-700">• {recommendation}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="space-y-2 lg:col-span-3">
            <h3 className="text-xs font-bold uppercase text-slate-700">Fautes non vues, repérées par la caméra</h3>
            {review.incidents.map((incident) => (
              <div key={`${incident.minute}-${incident.title}`} className="rounded-xl border border-slate-200 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900"><span className="mr-1.5 font-mono text-blue-700">{incident.minute}</span>{incident.title}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${IMPACT_STYLES[incident.impact]}`}>Impact {incident.impact.toLowerCase()}</span>
                </div>
                <p className="mt-1 text-[10px] text-slate-500">{incident.zone}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-700"><strong>Vu par la caméra :</strong> {incident.cameraView}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-emerald-800"><strong>Recommandation :</strong> {incident.recommendation}</p>
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
};