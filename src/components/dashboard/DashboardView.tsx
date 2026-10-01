import React from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  Users,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Swords,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  Dumbbell,
  Stethoscope,
  Activity,
  Shield,
  Zap,
  Building,
  Award,
  MessageSquare
} from 'lucide-react';
import { PlayerStatus, UserRole } from '../../types/ams';
import { DataActionBar } from '../layout/DataActionBar';
import { CoachDashboardOverview, MedicalDashboardOverview } from './RoleDashboardOverviews';
import { PhysicalStaffDashboard } from './PhysicalStaffDashboard';
import { TeamManagerDashboard } from './TeamManagerDashboard';
import { DirectionDashboard } from './DirectionDashboard';
import { ArbitrageDashboard } from './ArbitrageDashboard';
import { ROLE_PROFILES_CONFIG } from '../../data/rolesData';
import { ROLE_OBJECTIVES_DATA } from '../../data/objectivesData';
import { isDashboardOnlyRole, isStrategyObjectiveClickable } from '../../data/objectiveAccess';
import { OFFICIAL_REFEREES_LIST } from '../../data/refereesData';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import { CommentTriggerButton } from '../comments/CommentTriggerButton';
import { PlayerHeadshot } from '../common/PlayerHeadshot';

const getDedicatedDashboard = (role: UserRole): React.ReactElement | null => {
  switch (role) {
    case 'arbitrage':
      return <ArbitrageDashboard />;
    case 'entraineur':
      return <CoachDashboardOverview />;
    case 'medical':
      return <MedicalDashboardOverview />;
    default:
      return null;
  }
};

export const DashboardView: React.FC = () => {
  const {
    rassemblement,
    activeAlerts,
    matches,
    trainings,
    navigateTo,
    userRole,
    selectedTeam,
    players,
    openCommentsDrawer,
    allObjectivesMap,
    setSelectedObjective
  } = useAMS();

  const dedicatedDashboard = getDedicatedDashboard(userRole);
  if (dedicatedDashboard) return dedicatedDashboard;

  const nextMatch = matches && matches.length > 0 ? matches[0] : null;
  const nextTraining = trainings && trainings.length > 0 ? trainings[0] : null;

  const total = players.filter((person) => !person.isReferee).length;

  const getStatusBadge = (status: PlayerStatus) => {
    switch (status) {
      case 'disponible':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Disponible</span>
          </span>
        );
      case 'a_surveiller':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>À surveiller</span>
          </span>
        );
      case 'retour_progressif':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Retour progressif</span>
          </span>
        );
      case 'indisponible':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Indisponible</span>
          </span>
        );
    }
  };

  const profileConfig = ROLE_PROFILES_CONFIG[userRole] || ROLE_PROFILES_CONFIG.entraineur;

  // Role-specific descriptions and action labels
  const getRoleHeaderInfo = () => {
    switch (userRole) {
      case 'entraineur':
        return {
          teamLabel: `${selectedTeam?.name || 'France A — Masculine'} • ${selectedTeam?.category || 'A'}`,
          contextLabel: `Rassemblement ${UPCOMING_MATCH.countdown} • Choc ${UPCOMING_MATCH.homeTeam}–${UPCOMING_MATCH.awayTeam}`,
          description: `Composition tactique, forme des 24 Bleus et décisions de match sous la direction de ${profileConfig.userName}.`,
          entityBtnLabel: `Effectif Sélection (${total})`,
          entityIcon: Users,
          roleHighlight: 'Staff Technique'
        };
      case 'medical':
        return {
          teamLabel: `${selectedTeam?.name || 'France A — Masculine'} • Pôle Santé`,
          contextLabel: `Rassemblement J-${rassemblement?.daysToStart || 2} • Diagnostic Médical`,
          description: `Diagnostic santé des 24 Bleus (94.2% dispo), risques lésionnels et secret médical garanti (${profileConfig.userName}).`,
          entityBtnLabel: `Effectif Santé (${total})`,
          entityIcon: Stethoscope,
          roleHighlight: 'Département Médical'
        };
      case 'performance':
        return {
          teamLabel: `${selectedTeam?.name || 'France A — Masculine'} • Pôle Athlétique`,
          contextLabel: `Rassemblement J-${rassemblement?.daysToStart || 2} • Catapult 10 Hz`,
          description: `Monitoring des charges (ACWR 1.05), profilage des vitesses (>32 km/h) et gestion de fatigue (${profileConfig.userName}).`,
          entityBtnLabel: `Effectif Athlétique (${total})`,
          entityIcon: Zap,
          roleHighlight: 'Pôle Performance'
        };
      case 'team_manager':
        return {
          teamLabel: `${selectedTeam?.name || 'France A — Masculine'} • Logistique Bleus`,
          contextLabel: `Rassemblement J-${rassemblement?.daysToStart || 2} • Stage Château`,
          description: `Organisation du stage à Clairefontaine, déplacements, accréditations UEFA et intendance (${profileConfig.userName}).`,
          entityBtnLabel: `Effectif Convoqué (${total})`,
          entityIcon: Building,
          roleHighlight: 'Logistique & Opérations'
        };
      case 'direction':
        return {
          teamLabel: `Sélections Nationales FFF • Gouvernance`,
          contextLabel: `Supervision Fédérale • Saison 2026`,
          description: `Vision transversale des sélections, passerelles jeunes vers l'Équipe A et détection DTN (${profileConfig.userName}).`,
          entityBtnLabel: `Toutes les Sélections`,
          entityIcon: Award,
          roleHighlight: 'Direction Technique'
        };
      case 'arbitrage':
        return {
          teamLabel: `Corps Arbitral FFF & FIFA • Arbitres Elite`,
          contextLabel: `Désignations Ligue 1 & UEFA (J-1 / J-2)`,
          description: `Désignations officielles, préparation tactique, analyse VAR et suivi athlétique (${profileConfig.userName}).`,
          entityBtnLabel: `Corps Arbitral (${OFFICIAL_REFEREES_LIST.length})`,
          entityIcon: Shield,
          roleHighlight: 'Direction Arbitrage DTA'
        };
      default:
        return {
          teamLabel: `${selectedTeam?.name || 'France A'} • ${selectedTeam?.category}`,
          contextLabel: `Rassemblement J-${rassemblement?.daysToStart || 2}`,
          description: 'Interface intelligente synchronisée : chaque métier accède en priorité à ses données clés, planning et alertes.',
          entityBtnLabel: `Effectif (${total})`,
          entityIcon: Users,
          roleHighlight: profileConfig.department
        };
    }
  };

  const headerInfo = getRoleHeaderInfo();
  const EntityIcon = headerInfo.entityIcon;
  const roleObjectives = (allObjectivesMap?.[userRole] || ROLE_OBJECTIVES_DATA[userRole] || [])
    .filter((objective) => objective.role === userRole)
    .slice()
    .sort((first, second) => first.priorityOrder - second.priorityOrder);
  const monitoredPeople = players.filter((person) => userRole === 'arbitrage' ? person.isReferee : !person.isReferee);
  const availability = [
    { label: 'Disponibles', count: monitoredPeople.filter((person) => person.status === 'disponible').length, color: 'bg-blue-600' },
    { label: 'À surveiller', count: monitoredPeople.filter((person) => person.status === 'a_surveiller').length, color: 'bg-blue-300' },
    { label: 'Retour progressif', count: monitoredPeople.filter((person) => person.status === 'retour_progressif').length, color: 'bg-slate-400' },
    { label: 'Indisponibles', count: monitoredPeople.filter((person) => person.status === 'indisponible').length, color: 'bg-slate-200' }
  ];
  const availablePercent = monitoredPeople.length ? Math.round(availability[0].count / monitoredPeople.length * 100) : 0;
  const medicalHealthHistory = userRole === 'medical'
    ? Array.from(new Set(monitoredPeople.flatMap((person) => person.history.map((point) => point.week))))
        .map((week) => {
          const scores = monitoredPeople
            .map((person) => person.history.find((point) => point.week === week)?.sante)
            .filter((score): score is number => typeof score === 'number');

          return {
            week,
            score: scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0
          };
        })
    : [];
  const averageHealthScore = monitoredPeople.length
    ? monitoredPeople.reduce((totalScore, person) => totalScore + person.dimensions.sante.score, 0) / monitoredPeople.length
    : 0;
  const healthScores = medicalHealthHistory.map((point) => point.score);
  const minimumHealthScore = healthScores.length ? Math.max(0, Math.floor(Math.min(...healthScores) - 4)) : 0;
  const maximumHealthScore = healthScores.length ? Math.min(100, Math.ceil(Math.max(...healthScores) + 4)) : 100;
  const medicalChartPoints = medicalHealthHistory.map((point, index) => ({
    ...point,
    x: 16 + index * (288 / Math.max(medicalHealthHistory.length - 1, 1)),
    y: 88 - ((point.score - minimumHealthScore) / Math.max(maximumHealthScore - minimumHealthScore, 1)) * 64
  }));

  return (
    <div className="ams-dashboard space-y-4 font-sans text-slate-900 pb-12 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER ÉLÉGANT, COMPACT & CLAIR (DISTINCT DES BLOCS IA)            */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:px-6 sm:py-5 shadow-2xs flex flex-col xl:flex-row xl:items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/fr/a/ab/Logo_F%C3%A9d%C3%A9ration_Fran%C3%A7aise_Football_2022.svg"
            alt="Fédération Française de Football"
            className="w-11 h-14 object-contain shrink-0"
            onError={(event) => { event.currentTarget.src = '/assets/ams360_emblem.jpg'; }}
          />
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-500">
              <span className="font-black text-blue-900">FFF <span className="text-blue-500">/</span> AMS 360</span>
              <span>{headerInfo.teamLabel}</span>
              <span className="hidden sm:inline">{headerInfo.contextLabel}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-blue-950">Tableau de bord · {profileConfig.title}</h1>
            <p className="hidden sm:block text-xs text-slate-500">{profileConfig.userName} · {headerInfo.description}</p>
          </div>
        </div>

        {/* Right Side: Compact Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2 pt-3 xl:pt-0 border-t xl:border-t-0 border-slate-100">
          <CommentTriggerButton
            targetId="dashboard-general"
            targetType="general"
            targetTitle={`Tableau de bord FFF • ${profileConfig.title}`}
            variant="button"
            label="Notes"
          />

          <DataActionBar
            scope="dashboard"
            customImportLabel="Importer"
            customExportLabel="Exporter Bilan"
          />

          <button
            onClick={() => {
              if (userRole === 'direction') {
                navigateTo('team_choice');
              } else {
                navigateTo('player_search');
              }
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <EntityIcon className="w-3.5 h-3.5" />
            <span>{headerInfo.entityBtnLabel}</span>
          </button>
        </div>
      </div>

      <section aria-label="Prochain match" className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3 border-b border-slate-100">
          <span className="text-[11px] font-bold uppercase text-blue-900">Prochain match · {UPCOMING_MATCH.competition}</span>
          <span className="text-xs font-semibold text-slate-500">{UPCOMING_MATCH.dateTime} · {UPCOMING_MATCH.venue}</span>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-10 px-4 py-4 text-blue-950">
          <div className="flex flex-col sm:flex-row items-center justify-end gap-1 sm:gap-3 min-w-0"><span className="text-2xl sm:text-3xl" role="img" aria-label="Drapeau français">🇫🇷</span><span className="text-xs sm:text-lg font-black">France</span></div>
          <span className="text-xs font-bold text-slate-400 shrink-0">VS</span>
          <div className="flex flex-col sm:flex-row items-center justify-start gap-1 sm:gap-3 min-w-0"><span className="text-2xl sm:text-3xl" role="img" aria-label="Drapeau belge">🇧🇪</span><span className="text-xs sm:text-lg font-black">Belgique</span></div>
        </div>
      </section>

      {userRole === 'medical' && (
        <section aria-label="État de santé collectif" className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-blue-950">État de santé collectif</h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">{monitoredPeople.length} joueurs suivis</span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
            <div className="space-y-3">
              <div className="flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">Disponibilité de l’effectif</h3>
                  <p className="mt-1 text-[11px] text-slate-500">Répartition par statut médical</p>
                </div>
                <strong className="text-xl font-bold tabular-nums text-emerald-700">{availablePercent}%</strong>
              </div>
              <div
                className="flex h-3 w-full overflow-hidden rounded-sm bg-slate-100"
                role="img"
                aria-label={`Disponibilité médicale : ${availability.map((group) => `${group.count} ${group.label.toLowerCase()}`).join(', ')}`}
              >
                {availability.map((group) => (
                  <span key={group.label} className={group.color} style={{ width: `${monitoredPeople.length ? group.count / monitoredPeople.length * 100 : 0}%` }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-slate-600">
                {availability.map((group) => (
                  <span key={group.label} className="inline-flex items-center gap-1.5">
                    <span className={`h-2 w-2 ${group.color}`} />{group.label} {group.count}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">Évolution de la santé</h3>
                  <p className="mt-1 text-[11px] text-slate-500">Moyenne des scores santé</p>
                </div>
                <strong className="text-xl font-bold tabular-nums text-blue-900">{averageHealthScore.toFixed(1)}<span className="ml-1 text-[10px] font-medium text-slate-500">/100</span></strong>
              </div>
              <svg
                className="h-20 w-full"
                viewBox="0 0 320 100"
                role="img"
                aria-label={`Évolution santé : ${medicalHealthHistory.map((point) => `${point.week} ${point.score.toFixed(1)}`).join(', ')}`}
              >
                {[24, 52, 80].map((y) => <line key={y} x1="16" x2="304" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 4" />)}
                {medicalChartPoints.length > 1 && (
                  <polyline points={medicalChartPoints.map((point) => `${point.x},${point.y}`).join(' ')} fill="none" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                )}
                {medicalChartPoints.map((point) => <circle key={point.week} cx={point.x} cy={point.y} r="3.5" fill="#fff" stroke="#0f766e" strokeWidth="2" />)}
              </svg>
              <div className="flex justify-between px-1 text-[10px] font-medium text-slate-500">
                {medicalHealthHistory.map((point) => <span key={point.week}>{point.week}</span>)}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 space-y-4" aria-label="Indicateurs clés">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-bold text-blue-950">Indicateurs clés</h2>
          <span className="text-xs text-slate-500">{headerInfo.roleHighlight}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-slate-100 py-3">
          {[
            { label: userRole === 'arbitrage' ? 'Arbitres suivis' : 'Effectif suivi', value: monitoredPeople.length },
            { label: 'Objectifs du rôle', value: roleObjectives.length },
            { label: 'Prochain match', value: UPCOMING_MATCH.shortDate }
          ].map((metric) => (
            <div key={metric.label} className="space-y-0.5">
              <span className="block text-[11px] text-slate-500">{metric.label}</span>
              <strong className="block text-lg font-bold text-blue-950 tabular-nums">{metric.value}</strong>
            </div>
          ))}
        </div>
        {userRole !== 'medical' && <div className="space-y-2" role="img" aria-label={`Disponibilité ${userRole === 'arbitrage' ? 'des arbitres' : 'des joueurs'} : ${availability.map((group) => `${group.count} ${group.label.toLowerCase()}`).join(', ')}`}>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Disponibilité {userRole === 'arbitrage' ? 'des arbitres' : 'des joueurs'}</span>
            <strong className="text-blue-950">{availablePercent}% disponibles</strong>
          </div>
          <div className="flex w-full h-3 overflow-hidden rounded-sm bg-slate-100">
            {availability.map((group) => (
              <span key={group.label} className={group.color} style={{ width: `${monitoredPeople.length ? group.count / monitoredPeople.length * 100 : 0}%` }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600">
            {availability.map((group) => (
              <span key={group.label} className="inline-flex items-center gap-1.5"><span className={`w-2 h-2 ${group.color}`} />{group.label} {group.count}</span>
            ))}
          </div>
        </div>}
      </section>

      <section className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-blue-950">Objectifs du rôle</h2>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {profileConfig.title} • {roleObjectives.length} objectif{roleObjectives.length > 1 ? 's' : ''} prioritaire{roleObjectives.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
          {roleObjectives.map((objective, index) => {
            const canOpenStrategy =
              !isDashboardOnlyRole(userRole) && isStrategyObjectiveClickable(userRole, objective.id);

            return (
              <article key={objective.id} className="p-3 rounded-lg border border-slate-200 bg-white flex flex-col justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm shrink-0 grayscale" aria-hidden="true">{objective.icon}</span>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      Priorité {String(index + 1).padStart(2, '0')} • {objective.category}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 mt-1 leading-snug">{objective.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">{objective.subtitle}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-medium text-slate-500 truncate">{objective.badge}</span>
                  {canOpenStrategy ? (
                    <button
                      onClick={() => {
                        setSelectedObjective(objective);
                        navigateTo('ai_strategy');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 shrink-0 cursor-pointer"
                    >
                      Ouvrir
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {isDashboardOnlyRole(userRole) ? 'Suivi dashboard' : 'Exemple indicatif'}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <details className="bg-white border border-slate-200 rounded-lg group">
        <summary className="flex items-center justify-between gap-2 p-4 text-sm font-bold text-blue-950 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          Détails métier
          <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
        </summary>
        <div className="p-4 pt-0">
          {userRole === 'performance' && <PhysicalStaffDashboard />}
          {userRole === 'team_manager' && <TeamManagerDashboard />}
          {userRole === 'direction' && <DirectionDashboard />}
          {userRole === 'arbitrage' && <ArbitrageDashboard />}
        </div>
      </details>

      {/* ========================================================================= */}
      {/* 3. SECTION COMMUNE DU GROUPE : DISPONIBILITÉ & EFFECTIF TRICOLORE         */}
      {/* ========================================================================= */}
      {userRole !== 'arbitrage' && <details className="bg-white border border-slate-200 rounded-lg group">
        <summary className="flex items-center justify-between gap-2 p-4 text-sm font-bold text-blue-950 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          Aperçu de l'effectif
          <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
        </summary>
        <div className="p-4 pt-0 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-black text-slate-900">
                Effectif convoqué • {total} joueurs
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Statuts médicaux, temps de jeu en sélection et accès direct aux Jumeaux Numériques 360°.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {availablePercent}% Disponibles ({availability[0].count}/{total})
            </span>

            <button
              onClick={() => navigateTo('player_search')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Voir tout l'effectif</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Players Grid with Quick Jumeau 360 Access */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {monitoredPeople.slice(0, 8).map((player) => (
            <div
              key={player.id}
              onClick={() => navigateTo('joueur_360', { playerId: player.id })}
              className="p-3 rounded-2xl bg-slate-50/80 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center font-black text-xs font-mono shrink-0 shadow-2xs overflow-hidden">
                  <PlayerHeadshot name={player.name} fallbackUrl={player.avatarUrl} className="w-full h-full rounded-lg" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-xs font-black text-blue-700">#{player.number}</span>
                    {getStatusBadge(player.status)}
                  </div>
                  <h4 className="text-xs font-black text-slate-900 truncate group-hover:text-blue-700 transition-colors mt-0.5">
                    {player.name}
                  </h4>
                  <div className="text-[10px] text-slate-500 truncate">
                    {player.position} • {player.club}
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Score Forme : <strong className="text-slate-800">{player.dimensions.performance.score}</strong></span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo('joueur_360', { playerId: player.id, playerTab: 'predictif' });
                    }}
                    className="text-amber-700 hover:text-amber-900 font-bold bg-amber-50 hover:bg-amber-200/80 px-1.5 py-0.5 rounded border border-amber-300/70 flex items-center gap-0.5"
                    title="Simulation & Moteur Prédictif"
                  >
                    <span>⚡ Prédictif</span>
                  </button>
                  <span className="text-blue-600 font-bold group-hover:underline flex items-center gap-0.5">
                    <span>360°</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </details>}
    </div>
  );
};
