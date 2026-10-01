import React, { useState, useMemo } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  TEAM_MANAGER_TODO_DATA,
  AutomatedTodoItem
} from '../../data/strategyTeamManagerData';
import {
  Sparkles,
  Building,
  CheckCircle2,
  Clock,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Filter,
  Users,
  Shield,
  Plane,
  FileCheck,
  Plus,
  RefreshCw,
  HelpCircle,
  X
} from 'lucide-react';

export const AIStrategyTeamManagerTodoView: React.FC = () => {
  const { navigateTo } = useAMS();
  const initialData = TEAM_MANAGER_TODO_DATA;

  // Local state for todo items to allow interactive status toggling
  const [todoItems, setTodoItems] = useState<AutomatedTodoItem[]>(initialData.todoList);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activePhaseFilter, setActivePhaseFilter] = useState<string>('all');

  // Toggle status
  const handleToggleStatus = (id: string) => {
    setTodoItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus: AutomatedTodoItem['status'] =
            item.status === 'VALIDE'
              ? 'A_FAIRE'
              : item.status === 'A_FAIRE'
              ? 'EN_COURS'
              : 'VALIDE';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    return todoItems.filter((item) => {
      const matchCat = activeCategoryFilter === 'all' || item.category === activeCategoryFilter;
      const matchPhase = activePhaseFilter === 'all' || item.phase === activePhaseFilter;
      return matchCat && matchPhase;
    });
  }, [todoItems, activeCategoryFilter, activePhaseFilter]);

  const validatedCount = todoItems.filter((t) => t.status === 'VALIDE').length;
  const inProgressCount = todoItems.filter((t) => t.status === 'EN_COURS').length;
  const todoCount = todoItems.filter((t) => t.status === 'A_FAIRE').length;
  const completionPercent = Math.round((validatedCount / todoItems.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12 select-none">
      {/* ========================================================================= */}
      {/* 1. CONCEPT & HEADER PREMIUM                                               */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white p-5 sm:p-6 rounded-3xl border border-blue-500/30 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>OBJECTIFS TEAM MANAGER • TO-DO LIST AUTOMATISÉE IA</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-slate-300 font-mono font-medium">
              Logistique Événementielle FFF
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>To-Do List Automatisée • {initialData.eventInfo.eventName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/85 font-medium max-w-2xl mt-1 leading-relaxed">
              Génération automatique des tâches critiques selon le type d'événement (domicile / déplacement), répartition par pôle opérationnel et suivi en temps réel des validations d'intendance.
            </p>
          </div>

          {/* Sources analyzed row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-slate-300">
            <span className="font-bold text-amber-300">Déclencheurs & Systèmes connectés :</span>
            {[
              'Liste des 24 (Zidane)',
              'Protocole Match UEFA',
              'Transports Gares & Aéroports',
              'Privatisation Château Clairefontaine',
              'Dotation Nike & Flocages'
            ].map((src, i, arr) => (
              <span key={src} className="flex items-center gap-1">
                <span className="text-white/90">{src}</span>
                {i < arr.length - 1 && <span className="text-amber-500">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Revenir au tableau de bord team manager"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Dashboard Logistique</span>
          </button>

          <button
            onClick={() => navigateTo('ai_strategy_team_manager_overview')}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Building className="w-3.5 h-3.5" />
            <span>Regard Global Équipe</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SYNTHÈSE D'AVANCEMENT & KPIS LOGISTIQUES                               */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              État d'Avancement des Opérations Logistiques
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            {initialData.eventInfo.eventType} • {initialData.eventInfo.date}
          </span>
        </div>

        {/* 4 KPIs Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block font-mono">
              Taux de Complétion
            </span>
            <div className="text-2xl font-black text-blue-700 font-mono">
              {completionPercent}%
            </div>
            <p className="text-[10.5px] text-slate-500 font-medium">{validatedCount} / {todoItems.length} tâches validées</p>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block font-mono">
              Tâches Validées
            </span>
            <div className="text-2xl font-black text-emerald-900 font-mono">
              {validatedCount}
            </div>
            <p className="text-[10.5px] text-emerald-700 font-medium">Conformité totale vérifiée</p>
          </div>

          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block font-mono">
              En Cours
            </span>
            <div className="text-2xl font-black text-amber-900 font-mono">
              {inProgressCount}
            </div>
            <p className="text-[10.5px] text-amber-700 font-medium">Finalisation avant H-24</p>
          </div>

          <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider block font-mono">
              À Faire (Jour J)
            </span>
            <div className="text-2xl font-black text-rose-900 font-mono">
              {todoCount}
            </div>
            <p className="text-[10.5px] text-rose-700 font-medium">Feuille de match & clôture</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FILTRES & LISTE INTERACTIVE DES TÂCHES AUTOMATISÉES                    */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 mr-1">Pôle :</span>
            {['all', 'Transports', 'Hébergement', 'Équipements', 'UEFA & Conformité', 'Médias & Protocole'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer text-xs ${
                  activeCategoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Tous les Pôles' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 mr-1">Phase :</span>
            {['all', 'J-7 à J-3', 'J-2 à J-1', 'Jour J (J-0)', 'Post-Match (J+1)'].map((ph) => (
              <button
                key={ph}
                onClick={() => setActivePhaseFilter(ph)}
                className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold transition-all cursor-pointer ${
                  activePhaseFilter === ph
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ph === 'all' ? 'Toutes' : ph}
              </button>
            ))}
          </div>
        </div>

        {/* List of Tasks */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isDone = item.status === 'VALIDE';
            const isInProgress = item.status === 'EN_COURS';

            return (
              <div
                key={item.id}
                onClick={() => handleToggleStatus(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                  isDone
                    ? 'bg-emerald-50/40 border-emerald-200 hover:bg-emerald-50/70'
                    : isInProgress
                    ? 'bg-amber-50/40 border-amber-200 hover:bg-amber-50/70'
                    : 'bg-slate-50/70 border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(item.id);
                      }}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isInProgress
                          ? 'bg-amber-500 text-white'
                          : 'border-2 border-slate-300 text-transparent hover:border-blue-500'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <div>
                      <h4
                        className={`text-xs sm:text-sm font-black text-slate-900 ${
                          isDone ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 mt-0.5">
                        <span className="font-bold text-blue-700">{item.category}</span>
                        <span>•</span>
                        <span>Assigné à : <strong>{item.assignedTo}</strong></span>
                        <span>•</span>
                        <span>Deadline : <strong>{item.deadline}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        item.priority === 'Critique'
                          ? 'bg-rose-100 text-rose-900 font-black'
                          : item.priority === 'Haute'
                          ? 'bg-amber-100 text-amber-900 font-bold'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Priorité {item.priority}
                    </span>

                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg border ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isInProgress
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-slate-200 text-slate-700 border-slate-300'
                      }`}
                    >
                      {isDone ? '✓ Validée' : isInProgress ? '⚡ En cours' : 'À Faire'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed pl-8">
                  {item.details}
                </p>

                <div className="pl-8 pt-1 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{item.automatedTrigger}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
