import React, { useState, useMemo } from 'react';
import { useAMS } from '../../context/AMSContext';
import { Match, TrainingSession } from '../../types/ams';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Flame,
  Swords,
  Dumbbell,
  Users,
  ChevronRight,
  TrendingUp,
  Activity,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

type ActivityKind = 'all' | 'matches' | 'trainings';
type TimeWindow = '7d' | '30d' | 'season' | 'all';

interface TimelineActivityItem {
  id: string;
  kind: 'match' | 'training';
  title: string;
  subtitle: string;
  date: string;
  dateTimestamp: number;
  timeRange: string;
  location: string;
  typeBadge: string;
  intensityScore?: number;
  chargeUA?: number;
  participantsCount?: number;
  scoreOrDuration: string;
  statusBadge: string;
  statusColor: string;
  itemMatch?: Match;
  itemTraining?: TrainingSession;
}

export const MatchesTrainingsHubView: React.FC = () => {
  const { matches, trainings, navigateTo } = useAMS();

  const [activeKind, setActiveKind] = useState<ActivityKind>('all');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('season');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');

  // Unified list of sports activities (Trainings outnumber matches ~5 to 1)
  const allActivities: TimelineActivityItem[] = useMemo(() => {
    const list: TimelineActivityItem[] = [];

    // Map Matches
    matches.forEach((m) => {
      list.push({
        id: m.id,
        kind: 'match',
        title: `${m.homeTeam} ${m.homeScore} — ${m.awayScore} ${m.awayTeam}`,
        subtitle: `${m.competition} • ${m.phase}`,
        date: m.date,
        dateTimestamp: new Date(m.date).getTime() || 1760200000000,
        timeRange: '20:45 – 22:40',
        location: m.stadium,
        typeBadge: 'Match Officiel',
        intensityScore: 92,
        chargeUA: 620,
        participantsCount: (m.starters?.length || 11) + (m.substitutes?.filter((s) => s.minutes > 0).length || 5),
        scoreOrDuration: `${m.homeScore} - ${m.awayScore}`,
        statusBadge: m.result === 'V' ? 'Victoire' : m.result === 'N' ? 'Nul' : 'Défaite',
        statusColor: m.result === 'V' ? 'emerald' : m.result === 'N' ? 'amber' : 'rose',
        itemMatch: m
      });
    });

    // Map Trainings
    trainings.forEach((t) => {
      list.push({
        id: t.id,
        kind: 'training',
        title: t.title,
        subtitle: `${t.type} • ${t.participants?.length || 22} joueurs suivis`,
        date: t.date,
        dateTimestamp: new Date(t.date).getTime() || 1760000000000,
        timeRange: `${t.startTime || '10:30'} – ${t.endTime || '12:00'}`,
        location: t.location,
        typeBadge: t.type,
        intensityScore: t.intensityScore || t.intensite || 74,
        chargeUA: t.loadUA,
        participantsCount: t.presentCount || t.participants?.filter((p) => p.status !== 'Absent').length || 22,
        scoreOrDuration: `${t.durationMinutes} min`,
        statusBadge: t.collectiveLoadLabel ? `Charge ${t.collectiveLoadLabel.toLowerCase()}` : 'Charge modérée',
        statusColor: 'blue',
        itemTraining: t
      });
    });

    // Sort by chronological order descending
    return list.sort((a, b) => b.id.localeCompare(a.id));
  }, [matches, trainings]);

  // Available training types for filter dropdown
  const trainingTypes = useMemo(() => {
    const types = new Set<string>();
    trainings.forEach((t) => types.add(t.type));
    return Array.from(types);
  }, [trainings]);

  // Filtered Activities
  const filteredActivities = useMemo(() => {
    return allActivities.filter((item) => {
      // Kind filter
      if (activeKind === 'matches' && item.kind !== 'match') return false;
      if (activeKind === 'trainings' && item.kind !== 'training') return false;

      // Type filter
      if (selectedTypeFilter !== 'all') {
        if (item.typeBadge !== selectedTypeFilter) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.date.toLowerCase().includes(q) ||
          item.typeBadge.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [allActivities, activeKind, selectedTypeFilter, searchQuery]);

  // KPI calculations
  const statsSummary = useMemo(() => {
    const matchCount = allActivities.filter((a) => a.kind === 'match').length;
    const trainingCount = allActivities.filter((a) => a.kind === 'training').length;
    const totalUA = allActivities.reduce((acc, curr) => acc + (curr.chargeUA || 0), 0);
    const avgIntensity = Math.round(
      allActivities.reduce((acc, curr) => acc + (curr.intensityScore || 70), 0) / (allActivities.length || 1)
    );

    return { matchCount, trainingCount, totalUA, avgIntensity };
  }, [allActivities]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
                Calendrier Athlétique & Tactique
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">France A — Saison 2025/2026</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Matchs & Entraînements
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Historique complet et microcycles hebdomadaires : 4 à 6 séances d'entraînement par match officiel.
            </p>
          </div>

          {/* Quick KPIs Summary */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200/90 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Matchs</span>
              <span className="text-lg font-black font-mono text-slate-900 leading-none">
                {statsSummary.matchCount}
              </span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-center">
              <span className="text-[10px] font-bold text-blue-600 uppercase block">Séances</span>
              <span className="text-lg font-black font-mono text-blue-900 leading-none">
                {statsSummary.trainingCount}
              </span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200/90 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Ratio</span>
              <span className="text-lg font-black font-mono text-slate-900 leading-none">
                1:{Math.round(statsSummary.trainingCount / (statsSummary.matchCount || 1))}
              </span>
            </div>
          </div>
        </div>

        {/* Filters Bar: Kind Tabs (Tous | Matchs | Entraînements) + Time Range + Search */}
        <div className="pt-4 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Main 3 Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl w-fit">
            {[
              { id: 'all', label: 'Tous', count: allActivities.length },
              { id: 'matches', label: 'Matchs', count: statsSummary.matchCount },
              { id: 'trainings', label: 'Entraînements', count: statsSummary.trainingCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveKind(tab.id as ActivityKind)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                  activeKind === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                    activeKind === tab.id ? 'bg-slate-100 text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Time range + Type filter + Search bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Time Period Filter */}
            <div className="flex items-center bg-slate-100/80 p-1 rounded-xl text-xs">
              {[
                { id: '7d', label: '7 jours' },
                { id: '30d', label: '30 jours' },
                { id: 'season', label: 'Saison' },
                { id: 'all', label: 'Tout' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setTimeWindow(p.id as TimeWindow)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    timeWindow === p.id
                      ? 'bg-white text-blue-700 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Type selector (for trainings) */}
            {activeKind !== 'matches' && (
              <div className="relative">
                <select
                  value={selectedTypeFilter}
                  onChange={(e) => setSelectedTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">Tous les types de séance</option>
                  {trainingTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filtrer par lieu, séance, adversaire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typical Microcycle Structure Guide (Weekly Cycle Blueprint) */}
      <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span className="font-bold text-slate-900">Architecture du microcycle FFF :</span>
          <span className="text-slate-600">
            Lundi (Récupération) → Mardi (Collectif) → Mercredi (Intensif) → Jeudi (Tactique) → Vendredi (Activation) → Samedi (Match) → Dimanche (Repos)
          </span>
        </div>
        <span className="text-blue-700 font-bold shrink-0">
          Cohérence AMS 360 garantie
        </span>
      </div>

      {/* Main Activities Chronology List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Chronologie sportive ({filteredActivities.length} activités)
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Cliquez sur un élément pour ouvrir son analyse complète
          </span>
        </div>

        <div className="space-y-3">
          {filteredActivities.map((act) => {
            const isMatch = act.kind === 'match';

            return (
              <div
                key={act.id}
                onClick={() => {
                  if (isMatch) {
                    navigateTo('detail_match', { matchId: act.id });
                  } else {
                    navigateTo('detail_training', { trainingId: act.id });
                  }
                }}
                className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer group hover:shadow-md hover:border-blue-300 relative overflow-hidden ${
                  isMatch
                    ? 'border-slate-300/90 hover:bg-blue-50/20'
                    : 'border-slate-200/80 hover:bg-slate-50/60'
                }`}
              >
                {/* Visual subtle left accent for Match vs Training */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    isMatch ? 'bg-blue-600' : 'bg-emerald-500'
                  }`}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Icon, Date, Title, Subtitle */}
                  <div className="flex items-start gap-4">
                    {/* Icon Badge */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-2xs ${
                        isMatch
                          ? 'bg-blue-700 text-white shadow-blue-500/20'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isMatch ? (
                        <Swords className="w-5 h-5 text-white" />
                      ) : (
                        <Dumbbell className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>

                    <div>
                      {/* Meta Pills */}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            isMatch
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {act.typeBadge}
                        </span>

                        <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{act.date}</span>
                        </span>

                        <span className="text-slate-300">•</span>

                        <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{act.timeRange}</span>
                        </span>

                        <span className="text-slate-300">•</span>

                        <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{act.location}</span>
                        </span>
                      </div>

                      {/* Main Title */}
                      <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                        <span>{act.title}</span>
                        {isMatch && (
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-900 text-white">
                            {act.scoreOrDuration}
                          </span>
                        )}
                      </h3>

                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {act.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Metrics & Action Button */}
                  <div className="flex items-center gap-5 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="flex items-center gap-4 text-right">
                      {/* Participants */}
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Effectif
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-800">
                          {act.participantsCount} joueurs
                        </span>
                      </div>

                      {/* Intensité */}
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Intensité
                        </span>
                        <span className="text-xs font-mono font-bold text-blue-700">
                          {act.intensityScore}/100
                        </span>
                      </div>

                      {/* Charge collective */}
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Charge
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-900">
                          {act.chargeUA} UA
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
                          act.statusColor === 'emerald'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : act.statusColor === 'amber'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : act.statusColor === 'rose'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}
                      >
                        {act.statusBadge}
                      </span>

                      <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
