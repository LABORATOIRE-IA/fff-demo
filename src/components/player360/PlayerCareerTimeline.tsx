import React, { useState } from 'react';
import { Player } from '../../types/ams';
import { useAMS } from '../../context/AMSContext';
import { getPlayerCareerProfile, CareerMilestone } from '../../data/careerPathwaysData';
import {
  Calendar,
  Award,
  Building,
  Flag,
  Sparkles,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  Swords,
  Users,
  Trophy,
  Compass,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface PlayerCareerTimelineProps {
  player: Player;
}

export const PlayerCareerTimeline: React.FC<PlayerCareerTimelineProps> = ({ player }) => {
  const { navigateTo } = useAMS();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const careerProfile = getPlayerCareerProfile(
    player.id,
    player.name,
    player.club,
    player.position,
    player.caps,
    player.goals
  );

  const filteredMilestones = careerProfile.milestones.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'selection_a') return m.category === 'selection_a' || m.category === 'titre_trophee';
    if (activeFilter === 'rassemblements') return m.category === 'rassemblement';
    if (activeFilter === 'espoirs_jeunes') return m.category === 'espoirs_jeunes';
    if (activeFilter === 'detection_fff') return m.category === 'detection_fff';
    if (activeFilter === 'club_transfert') return m.category === 'club_transfert';
    return true;
  });

  const getCategoryTheme = (category: CareerMilestone['category']) => {
    switch (category) {
      case 'selection_a':
        return {
          icon: Flag,
          bg: 'bg-blue-50 border-blue-200 text-blue-800',
          badgeBg: 'bg-blue-600 text-white',
          label: 'Équipe de France A'
        };
      case 'titre_trophee':
        return {
          icon: Trophy,
          bg: 'bg-amber-50 border-amber-300 text-amber-900',
          badgeBg: 'bg-amber-500 text-white',
          label: 'Trophée & Titre Majeur'
        };
      case 'rassemblement':
        return {
          icon: Users,
          bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
          badgeBg: 'bg-indigo-600 text-white',
          label: 'Rassemblement FFF'
        };
      case 'espoirs_jeunes':
        return {
          icon: Sparkles,
          bg: 'bg-sky-50 border-sky-200 text-sky-800',
          badgeBg: 'bg-sky-600 text-white',
          label: 'Espoirs & Sélections Jeunes'
        };
      case 'detection_fff':
        return {
          icon: Compass,
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          badgeBg: 'bg-emerald-600 text-white',
          label: 'Détection DTN & Pôle Espoirs'
        };
      case 'club_transfert':
        return {
          icon: Building,
          bg: 'bg-slate-50 border-slate-200 text-slate-800',
          badgeBg: 'bg-slate-700 text-white',
          label: 'Parcours en Club'
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-slate-900">
      {/* 1. Header Banner with Career Milestones Summary */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Parcours & Frise Fédérale
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-semibold">{player.club}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Frise Chronologique en Équipe de France</span>
              <span className="text-amber-400 text-base">★★</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Traçabilité complète : des premières détections de la DTN aux rassemblements internationaux actuels.
            </p>
          </div>

          {/* Formation & Pôle Espoir Badges */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-blue-50/70 border border-blue-200 text-left">
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-blue-700 block">
                Club Formateur
              </span>
              <span className="text-xs font-black text-slate-900 block mt-0.5">
                {careerProfile.formationClub}
              </span>
            </div>
            {careerProfile.poleEspoir && (
              <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-left">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-slate-500 block">
                  Pôle Espoirs FFF
                </span>
                <span className="text-xs font-black text-slate-900 block mt-0.5">
                  {careerProfile.poleEspoir}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 5 Big Career Metric Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-slate-100">
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
            <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
              Sélections France A
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-900 font-mono mt-0.5">
              {careerProfile.seniorCapsTotal}
            </div>
            <span className="text-[10px] text-blue-600 font-medium">Capes officielles</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Buts en Bleu
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-0.5">
              {careerProfile.seniorGoalsTotal}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              + {careerProfile.seniorAssistsTotal} passes D
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Sélections Jeunes & Espoirs
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-0.5">
              {careerProfile.youthCapsTotal}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">U16 à Espoirs U21</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Rassemblements FFF
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-0.5">
              {careerProfile.rassemblementsCount}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Stages & Tournois</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
              1ère Sélection A
            </span>
            <div className="text-xs font-black text-slate-900 font-mono mt-1 leading-tight">
              {careerProfile.seniorDebutDate}
            </div>
            <span className="text-[10px] text-amber-700 font-medium block mt-0.5 truncate">
              vs {careerProfile.seniorDebutOpponent}
            </span>
          </div>
        </div>

        {/* Major Trophies List if available */}
        {careerProfile.trophies.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Palmarès & Trophées :</span>
            </span>
            {careerProfile.trophies.map((trophy, idx) => (
              <span
                key={idx}
                className="text-xs font-extrabold px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs"
              >
                {trophy}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 2. Horizontal Milestones Roadmap (High-level career pathway) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
          Évolution du Joueur • Pôles & Sélections
        </h3>

        <div className="py-2 overflow-x-auto">
          <div className="min-w-[650px] relative">
            {/* Connecting line */}
            <div className="absolute top-4 left-8 right-8 h-1 bg-gradient-to-r from-emerald-300 via-blue-400 to-blue-600 -translate-y-1/2 z-0 rounded-full" />

            <div className="flex items-center justify-between relative z-10">
              {[
                { year: careerProfile.firstDetectionYear, label: 'Détection DTN', tag: 'Identification', done: true },
                { year: 'Formation', label: 'Pôle Espoirs', tag: careerProfile.formationClub, done: true },
                { year: 'Sélections', label: 'France Espoirs', tag: `${careerProfile.youthCapsTotal} capes`, done: true },
                { year: careerProfile.firstSeniorCallupDate, label: '1ère Convocation A', tag: 'Zinédine Zidane', done: true },
                { year: 'Mars 2026', label: 'Rassemblement Actuel', tag: 'En cours', active: true, done: true }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center max-w-[120px]">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs shadow-xs transition-all ${
                      step.active
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                        : 'bg-white border-2 border-blue-600 text-blue-700'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-xs font-black text-slate-900 mt-2 leading-tight">
                    {step.label}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {step.year}
                  </span>
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded mt-0.5">
                    {step.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Chronological Timeline Feed */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Détail Chronologique des Événements ({filteredMilestones.length})
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Consultez l'historique saison par saison avec les rapports de match et notes de la DTN.
            </p>
          </div>

          {/* Interactive Filters */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto shrink-0">
            {[
              { id: 'all', label: 'Tout' },
              { id: 'selection_a', label: '🇫🇷 France A' },
              { id: 'rassemblements', label: '⛺ Rassemblements' },
              { id: 'espoirs_jeunes', label: '⭐ Espoirs/Jeunes' },
              { id: 'detection_fff', label: '🔍 Détections' },
              { id: 'club_transfert', label: '🏟️ Clubs' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chronological Cards Feed */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {filteredMilestones.map((milestone) => {
            const theme = getCategoryTheme(milestone.category);
            const IconComponent = theme.icon;

            return (
              <div key={milestone.id} className="relative group">
                {/* Milestone Node on vertical line */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center shadow-xs ${theme.badgeBg}`}
                >
                  <IconComponent className="w-3.5 h-3.5 text-white" />
                </div>

                {/* Milestone Card */}
                <div className="p-5 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/90 transition-all space-y-3 hover:shadow-2xs">
                  {/* Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${theme.bg}`}>
                        {theme.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {milestone.date} (Âge : {milestone.age} ans)
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-400">
                      Source : {milestone.source}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h4 className="text-base font-black text-slate-900 tracking-tight">
                      {milestone.title}
                    </h4>
                    <p className="text-xs font-semibold text-blue-700 mt-0.5">
                      {milestone.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {milestone.description}
                  </p>

                  {/* Optional Match / Tournament Stats */}
                  {milestone.stats && (
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex flex-wrap items-center gap-4 text-xs">
                      {milestone.stats.matchCount && (
                        <div>
                          <span className="text-slate-400 text-[10px] block uppercase font-bold">Matchs</span>
                          <span className="font-bold text-slate-900">{milestone.stats.matchCount}</span>
                        </div>
                      )}
                      {milestone.stats.goals !== undefined && (
                        <div>
                          <span className="text-slate-400 text-[10px] block uppercase font-bold">Buts</span>
                          <span className="font-bold text-emerald-600">{milestone.stats.goals}</span>
                        </div>
                      )}
                      {milestone.stats.minutes && (
                        <div>
                          <span className="text-slate-400 text-[10px] block uppercase font-bold">Temps de jeu</span>
                          <span className="font-bold text-slate-900">{milestone.stats.minutes} min</span>
                        </div>
                      )}
                      {milestone.stats.opponent && (
                        <div>
                          <span className="text-slate-400 text-[10px] block uppercase font-bold">Adversaire</span>
                          <span className="font-bold text-slate-900">{milestone.stats.opponent} ({milestone.stats.score})</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Coach / DTN Note if available */}
                  {milestone.coachNote && (
                    <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/60 text-xs text-blue-950 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-blue-900 block text-[10px] uppercase tracking-wider">
                          Observation DTN / Staff
                        </span>
                        <p className="italic font-medium mt-0.5">« {milestone.coachNote} »</p>
                      </div>
                    </div>
                  )}

                  {/* Link CTA if related to app views */}
                  {milestone.relatedType === 'rassemblement' && (
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => navigateTo('detail_rassemblement')}
                        className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <span>Consulter le rassemblement en détail</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
