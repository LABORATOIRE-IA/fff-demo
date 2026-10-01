import React, { useState } from 'react';
import { Player } from '../../types/ams';
import { useAMS } from '../../context/AMSContext';
import {
  Calendar,
  Share2,
  RefreshCw,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building,
  Radio,
  Video,
  Heart,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

interface TimelineAndSourcesProps {
  player: Player;
}

export const TimelineAndSources: React.FC<TimelineAndSourcesProps> = ({ player }) => {
  const { navigateTo, syncClubData, rassemblement } = useAMS();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const filteredTimeline = player.timeline.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleSyncClick = () => {
    setIsSyncing(true);
    setTimeout(() => {
      syncClubData(player.id);
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 600);
  };

  const getSourceIcon = (iconType: string) => {
    switch (iconType) {
      case 'club':
        return <Building className="w-4 h-4 text-blue-600" />;
      case 'gps':
        return <Radio className="w-4 h-4 text-emerald-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-indigo-600" />;
      case 'medical':
        return <Heart className="w-4 h-4 text-rose-600" />;
      case 'fff':
        return <Award className="w-4 h-4 text-amber-600" />;
      default:
        return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Parcours et Historique (Matching Mockup Screen 10 Top) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Parcours et historique
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Suivi longitudinal fédéral : de la détection aux rassemblements internationaux.
            </p>
          </div>

          {/* Timeline Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: 'Tout' },
              { id: 'carriere', label: 'Carrière' },
              { id: 'selections', label: 'Sélections' },
              { id: 'rassemblements', label: 'Rassemblements' },
              { id: 'medicaux', label: 'Événements médicaux' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Timeline Milestone Nodes (Screen 10 Diagram) */}
        <div className="py-4 overflow-x-auto">
          <div className="min-w-[620px] relative">
            {/* Connecting line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-blue-200 -translate-y-1/2 z-0" />

            <div className="flex items-center justify-between relative z-10">
              {[
                { year: '2015', label: 'Détection', tag: 'DTN U15' },
                { year: '2017', label: 'Pôle Espoir', tag: 'Formation' },
                { year: '2021', label: 'Première sélection', tag: 'Espoirs' },
                { year: '2022 — 2025', label: 'Rassemblements', tag: 'France A' },
                { year: 'Aujourd’hui', label: 'Mars 2026', tag: 'En cours', active: true }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center max-w-[110px]">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-transform ${
                      step.active
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                        : 'bg-white border-2 border-blue-500 text-blue-700'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-2">{step.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{step.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Timeline Events List */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          {filteredTimeline.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.relatedType === 'match' && item.relatedId) {
                  navigateTo('detail_match', { matchId: item.relatedId });
                } else if (item.relatedType === 'training' && item.relatedId) {
                  navigateTo('detail_training', { trainingId: item.relatedId });
                } else if (item.relatedType === 'rassemblement') {
                  navigateTo('detail_rassemblement');
                }
              }}
              className={`p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex items-start justify-between ${
                item.relatedType ? 'cursor-pointer group' : ''
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-mono text-slate-500 font-medium">
                    {item.date}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400">
                  <span>Source : {item.source}</span>
                  {item.relatedType && (
                    <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                      <span>Consulter la feuille</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Cycle d'un rassemblement (Matching Mockup Screen 10 Middle) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Cycle d'un rassemblement
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Chaque étape alimente automatiquement la timeline et les métriques du joueur.
            </p>
          </div>
          <button
            onClick={() => navigateTo('detail_rassemblement')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Détail rassemblement</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Stages Progress Chevrons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {rassemblement.stages.map((st) => (
            <div
              key={st.key}
              onClick={() => navigateTo('detail_rassemblement')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                st.status === 'active'
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                  {st.timing}
                </span>
                {st.status === 'active' && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-900">{st.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {st.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Sources du profil & Échanges avec le club (Matching Mockup Screen 10 Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sources du profil */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Sources du profil
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Origine et dernière synchronisation des données intégrées au jumeau numérique.
              </p>
            </div>
            <button
              onClick={handleSyncClick}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronisation...' : 'Synchroniser'}</span>
            </button>
          </div>

          {syncSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Données synchronisées avec succès ! Jumeau numérique et timeline actualisés.</span>
            </div>
          )}

          {/* Sources List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {player.sources.map((src) => (
              <div
                key={src.id}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                      {getSourceIcon(src.iconType)}
                    </div>
                    <span className="text-xs font-bold text-slate-900">{src.name}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Connecté
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                  <span>{src.provider}</span>
                  <span className="font-mono text-slate-700 font-medium">{src.lastSync}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Connecter une nouvelle source fédérale</span>
          </button>
        </div>

        {/* Échanges avec le club (FFF ↔ CLUB) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Échanges avec le club
              </h3>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 font-mono">
                FFF ↔ {player.club}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-4">
              Partage bidirectionnel des charges d'entraînement et bilans médicaux.
            </p>

            <div className="space-y-3">
              {/* Données reçues du club */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900">
                    Données reçues du club
                  </span>
                  <span className="text-[10px] font-mono text-blue-700 font-semibold">
                    Hier • 18:24
                  </span>
                </div>
                <p className="text-xs text-blue-900/80 leading-relaxed font-medium">
                  Charge des 7 derniers jours : 2 340 UA, rapport RPE séances et questionnaire de sommeil.
                </p>
              </div>

              {/* Données partagées avec le club */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Données partagées avec le club
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    24 sept. 2025
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Bilan post-rassemblement complet transmis au staff de performance de {player.club}.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Passerelle API Club Connect</span>
            <span className="font-semibold text-emerald-600">Flux chiffré TLS 1.3</span>
          </div>
        </div>
      </div>
    </div>
  );
};
