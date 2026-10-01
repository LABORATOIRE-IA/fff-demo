import React from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartPulse,
  MapPin,
  Shield,
  Stethoscope,
  Users
} from 'lucide-react';
import { useAMS } from '../../context/AMSContext';
import { Player, PlayerAlert, AppView } from '../../types/ams';
import { ROLE_OBJECTIVES_DATA } from '../../data/objectivesData';
import { TACTICAL_SCENARIOS } from '../../data/strategyData';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import { CommentTriggerButton } from '../comments/CommentTriggerButton';
import { DataActionBar } from '../layout/DataActionBar';

interface TrendPoint {
  week: string;
  value: number;
}

const averageTrend = (people: Player[], metric: 'sante' | 'performance' | 'charge'): TrendPoint[] => {
  const weeks = [...new Set(people.flatMap((person) => person.history.map((point) => point.week)))];

  return weeks.map((week) => {
    const values = people
      .map((person) => person.history.find((point) => point.week === week)?.[metric])
      .filter((value): value is number => typeof value === 'number');

    return {
      week,
      value: values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0
    };
  });
};

const AverageTrend = ({ points, color, label }: { points: TrendPoint[]; color: string; label: string }) => {
  const values = points.map((point) => point.value);
  const min = values.length ? Math.max(0, Math.floor(Math.min(...values) - 4)) : 0;
  const max = values.length ? Math.min(100, Math.ceil(Math.max(...values) + 4)) : 100;
  const chartPoints = points.map((point, index) => ({
    ...point,
    x: 16 + index * (288 / Math.max(points.length - 1, 1)),
    y: 88 - ((point.value - min) / Math.max(max - min, 1)) * 64
  }));

  return (
    <div>
      <svg className="h-24 w-full" viewBox="0 0 320 100" role="img" aria-label={`${label} : ${points.map((point) => `${point.week} ${point.value.toFixed(1)}`).join(', ')}`}>
        {[24, 56, 88].map((y) => <line key={y} x1="16" x2="304" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 4" />)}
        {chartPoints.length > 1 && <polyline points={chartPoints.map((point) => `${point.x},${point.y}`).join(' ')} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
        {chartPoints.map((point) => <circle key={point.week} cx={point.x} cy={point.y} r="3.5" fill="#fff" stroke={color} strokeWidth="2" />)}
      </svg>
      <div className="flex justify-between px-1 text-[10px] font-medium text-slate-500">
        {points.map((point) => <span key={point.week}>{point.week}</span>)}
      </div>
    </div>
  );
};

const DashboardHeader = ({ title, subtitle, targetId }: { title: string; subtitle: string; targetId: string }) => {
  const { roleConfig } = useAMS();

  return (
    <header className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">FFF / AMS 360</p>
        <h1 className="mt-1 text-lg font-black text-slate-950">{title}</h1>
        <p className="mt-1 text-xs text-slate-500">{roleConfig.userName} · {subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <CommentTriggerButton targetId={targetId} targetType="general" targetTitle={title} variant="button" label="Notes" />
        <DataActionBar scope="dashboard" customImportLabel="Importer" customExportLabel="Exporter bilan" />
      </div>
    </header>
  );
};

const MatchBanner = ({ route, action, medical = false }: { route: AppView; action: string; medical?: boolean }) => {
  const { navigateTo } = useAMS();
  const competitionText = `${UPCOMING_MATCH.competition} · ${UPCOMING_MATCH.countdown}`;

  return (
    <section aria-label="Prochain match" className={`relative overflow-hidden rounded-xl border p-4 sm:p-5 ${medical ? 'border-blue-900 bg-[#071b3d]' : 'border-blue-900 bg-[#071b3d]'} text-white`}>
      <div className="absolute right-0 top-0 h-1 w-24 bg-[#e31b3d]" />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-200">Prochain match · {competitionText}</span>
        <span className="rounded border border-white/20 px-2 py-1 text-[10px] font-bold text-white">{UPCOMING_MATCH.shortDate}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-black sm:text-2xl">{UPCOMING_MATCH.homeTeam} <span className="text-blue-300">—</span> {UPCOMING_MATCH.awayTeam}</h2>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-blue-100/80">
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{UPCOMING_MATCH.dateTime}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{UPCOMING_MATCH.venue}</span>
          </p>
        </div>
        <button onClick={() => navigateTo(route)} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#e31b3d] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-red-700">
          {action} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
};

const Stat = ({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: React.ComponentType<{ className?: string }> }) => (
  <div className="flex items-start gap-3 border-b border-slate-100 px-3 py-3 last:border-0 sm:border-b-0 sm:border-r sm:last:border-0">
    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
    <div className="min-w-0">
      <span className="block text-[10px] font-semibold text-slate-500">{label}</span>
      <strong className="mt-0.5 block text-base font-bold tabular-nums text-slate-950">{value}</strong>
      <span className="block truncate text-[10px] text-slate-500">{note}</span>
    </div>
  </div>
);

const FFFPanel = ({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) => (
  <section className={`rounded-xl border border-slate-200 bg-white p-4 ${className}`}>
    <h2 className="mb-3 border-b border-slate-100 pb-2.5 text-sm font-bold text-blue-950">{title}</h2>
    {children}
  </section>
);

export const CoachDashboardOverview: React.FC = () => {
  const { players, navigateTo, setSelectedObjective } = useAMS();
  const squad = players.filter((player) => !player.isReferee);
  const available = squad.filter((player) => player.status === 'disponible').length;
  const averageForm = squad.length
    ? squad.reduce((total, player) => total + player.dimensions.performance.score, 0) / squad.length
    : 0;
  const formHistory = averageTrend(squad, 'performance');
  const topForm = squad.slice().sort((first, second) => second.dimensions.performance.score - first.dimensions.performance.score).slice(0, 3);
  const objective = ROLE_OBJECTIVES_DATA.entraineur[0];
  const scenario = TACTICAL_SCENARIOS.find((item) => item.id === 'option1') || TACTICAL_SCENARIOS[0];
  const lineup = scenario.slots.map((slot) => ({ ...slot, player: squad.find((player) => player.id === slot.defaultPlayerId) }));

  return (
    <div className="space-y-4 pb-8 animate-in fade-in duration-200">
      <DashboardHeader title="Dashboard entraîneur" subtitle="Équipe de France · préparation et performance" targetId="dashboard-entraineur" />
      <MatchBanner route="ai_strategy" action="Préparer le match" />

      <section aria-label="Indicateurs de l’équipe" className="grid grid-cols-2 rounded-xl border border-slate-200 bg-white sm:grid-cols-4">
        <Stat label="Effectif disponible" value={`${available} / ${squad.length}`} note="Joueurs aptes" icon={CheckCircle2} />
        <Stat label="Forme moyenne" value={`${averageForm.toFixed(1)} / 100`} note="Score de performance" icon={Activity} />
        <Stat label="Composition probable" value={scenario.formation} note="Scénario recommandé" icon={Users} />
        <Stat label="Joueurs suivis" value={String(squad.length)} note="Effectif sélectionnable" icon={Shield} />
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FFFPanel title="Forme des joueurs">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-500">Moyenne collective · dernières semaines</span>
            <strong className="text-sm font-bold text-blue-900">{averageForm.toFixed(1)} / 100</strong>
          </div>
          <AverageTrend points={formHistory} color="#123b7a" label="Forme moyenne de l’équipe" />
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
            {topForm.map((player) => (
              <div key={player.id} className="min-w-0">
                <span className="block truncate text-[10px] font-semibold text-slate-700">{player.name}</span>
                <strong className="text-xs tabular-nums text-blue-800">{player.dimensions.performance.score}/100</strong>
              </div>
            ))}
          </div>
        </FFFPanel>

        <FFFPanel title="Adversaire & stratégie recommandée">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="border-l-2 border-[#e31b3d] pl-3">
              <span className="text-[10px] font-semibold uppercase text-slate-500">À analyser</span>
              <h3 className="mt-1 text-base font-black text-slate-900">{UPCOMING_MATCH.awayTeam}</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{objective.shortSummary}</p>
            </div>
            <div className="border-l-2 border-blue-800 pl-3">
              <span className="text-[10px] font-semibold uppercase text-slate-500">Scénario privilégié · {scenario.formation}</span>
              <h3 className="mt-1 text-sm font-bold text-slate-900">{scenario.title}</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{scenario.philosophy}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
            <button
              onClick={() => { setSelectedObjective(objective); navigateTo('ai_strategy'); }}
              className="inline-flex items-center gap-1.5 rounded-md bg-blue-900 px-3 py-2 text-[11px] font-bold text-white hover:bg-blue-800"
            >
              Stratégie complète <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => navigateTo('ai_strategy')} className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-50">
              Simulation tactique <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </FFFPanel>
      </div>

      <FFFPanel title={`Composition probable · ${scenario.formation}`}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {lineup.map((slot) => (
            <div key={slot.id} className="flex min-w-0 items-center gap-2 rounded-md bg-slate-50 px-2.5 py-2">
              <span className="w-8 shrink-0 text-[9px] font-bold text-blue-700">{slot.roleCode}</span>
              <span className="truncate text-[10px] font-medium text-slate-700">{slot.player?.name || slot.roleName}</span>
            </div>
          ))}
        </div>
      </FFFPanel>
    </div>
  );
};

export const MedicalDashboardOverview: React.FC = () => {
  const { players, activeAlerts, openMedicalModal, navigateTo } = useAMS();
  const squad = players.filter((player) => !player.isReferee);
  const available = squad.filter((player) => player.status === 'disponible').length;
  const carePlayers = squad.filter((player) => player.status !== 'disponible');
  const medicalAlerts = activeAlerts.filter(({ alert }) => alert.type === 'medical' || alert.severity === 'danger');
  const averageHealth = squad.length
    ? squad.reduce((total, player) => total + player.dimensions.sante.score, 0) / squad.length
    : 0;
  const averageWorkload = squad.length
    ? squad.reduce((total, player) => total + player.dimensions.entrainement.score, 0) / squad.length
    : 0;
  const healthHistory = averageTrend(squad, 'sante');
  const workloadHistory = averageTrend(squad, 'charge');
  const statusGroups = [
    { label: 'Disponibles', count: available, color: 'bg-blue-700' },
    { label: 'À surveiller', count: squad.filter((player) => player.status === 'a_surveiller').length, color: 'bg-amber-500' },
    { label: 'Retour progressif', count: squad.filter((player) => player.status === 'retour_progressif').length, color: 'bg-sky-500' },
    { label: 'Indisponibles', count: squad.filter((player) => player.status === 'indisponible').length, color: 'bg-[#e31b3d]' }
  ];
  const latestAlerts = medicalAlerts.slice(0, 4);

  return (
    <div className="space-y-4 pb-8 animate-in fade-in duration-200">
      <DashboardHeader title="Dashboard staff médical" subtitle="Équipe de France · santé et disponibilité" targetId="dashboard-medical" />
      <MatchBanner route="ai_strategy_medical_match" action="Préparer le match" medical />

      <section aria-label="Synthèse médicale" className="grid grid-cols-2 rounded-xl border border-slate-200 bg-white sm:grid-cols-4">
        <Stat label="Disponibles" value={`${available} / ${squad.length}`} note="Aptitude actuelle" icon={CheckCircle2} />
        <Stat label="Santé moyenne" value={`${averageHealth.toFixed(1)} / 100`} note="Indice collectif" icon={HeartPulse} />
        <Stat label="En suivi" value={String(carePlayers.length)} note="Soins ou surveillance" icon={Stethoscope} />
        <Stat label="Alertes médicales" value={String(medicalAlerts.length)} note="À examiner" icon={AlertTriangle} />
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FFFPanel title="Disponibilité de l’effectif">
          <div className="mb-3 flex items-center justify-between text-[11px] text-slate-600">
            <span>Statut médical · {squad.length} joueurs</span>
            <strong className="text-blue-900">{squad.length ? Math.round(available / squad.length * 100) : 0}% disponibles</strong>
          </div>
          <div className="flex h-3 overflow-hidden rounded-sm bg-slate-100" role="img" aria-label={`Disponibilité : ${statusGroups.map((group) => `${group.count} ${group.label}`).join(', ')}`}>
            {statusGroups.map((group) => <span key={group.label} className={group.color} style={{ width: `${squad.length ? group.count / squad.length * 100 : 0}%` }} />)}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            {statusGroups.map((group) => (
              <div key={group.label} className="flex items-center justify-between gap-2 text-[10px] text-slate-600">
                <span className="inline-flex items-center gap-1.5"><span className={`h-2 w-2 ${group.color}`} />{group.label}</span>
                <strong className="tabular-nums text-slate-800">{group.count}</strong>
              </div>
            ))}
          </div>
        </FFFPanel>

        <FFFPanel title="Tendance santé & charge">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 flex items-baseline justify-between gap-1"><span className="text-[10px] font-semibold text-slate-600">Santé moyenne</span><strong className="text-xs text-emerald-700">{averageHealth.toFixed(1)}</strong></div>
              <AverageTrend points={healthHistory} color="#0f766e" label="Santé moyenne" />
            </div>
            <div>
              <div className="mb-1 flex items-baseline justify-between gap-1"><span className="text-[10px] font-semibold text-slate-600">Charge moyenne</span><strong className="text-xs text-blue-800">{averageWorkload.toFixed(1)}</strong></div>
              <AverageTrend points={workloadHistory} color="#123b7a" label="Charge moyenne" />
            </div>
          </div>
        </FFFPanel>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FFFPanel title="Blessures et suivis en cours">
          <div className="divide-y divide-slate-100">
            {carePlayers.slice(0, 5).map((player) => (
              <button key={player.id} onClick={() => openMedicalModal(player.id)} className="flex w-full items-center justify-between gap-3 py-2.5 text-left hover:bg-slate-50">
                <span className="min-w-0">
                  <strong className="block truncate text-xs font-semibold text-slate-800">{player.name}</strong>
                  <span className="mt-0.5 block truncate text-[10px] text-slate-500">{player.alert?.label || player.dimensions.sante.statut}</span>
                </span>
                <span className={`shrink-0 text-[10px] font-bold ${player.status === 'indisponible' ? 'text-[#e31b3d]' : player.status === 'retour_progressif' ? 'text-sky-700' : 'text-amber-700'}`}>
                  {player.status === 'indisponible' ? 'Indisponible' : player.status === 'retour_progressif' ? 'Reprise' : 'Surveillance'}
                </span>
              </button>
            ))}
            {carePlayers.length === 0 && <p className="py-3 text-xs text-slate-500">Aucun joueur en suivi médical.</p>}
          </div>
          <button onClick={() => navigateTo('suivi_medical')} className="mt-2 inline-flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[11px] font-bold text-blue-800 hover:text-blue-950">
            Ouvrir le suivi médical <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </FFFPanel>

        <FFFPanel title="Alertes médicales">
          <div className="divide-y divide-slate-100">
            {latestAlerts.map(({ player, alert }: { player: Player; alert: PlayerAlert }) => (
              <button key={alert.id} onClick={() => openMedicalModal(player.id)} className="flex w-full items-start justify-between gap-3 py-2.5 text-left hover:bg-slate-50">
                <span className="min-w-0">
                  <strong className="block truncate text-xs font-semibold text-slate-800">{player.name} · {alert.label}</strong>
                  <span className="mt-0.5 block line-clamp-2 text-[10px] leading-relaxed text-slate-500">{alert.actionNeeded || 'Évaluation médicale à consulter.'}</span>
                </span>
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#e31b3d]" />
              </button>
            ))}
            {latestAlerts.length === 0 && <p className="py-3 text-xs text-slate-500">Aucune alerte médicale prioritaire.</p>}
          </div>
        </FFFPanel>
      </div>
    </div>
  );
};