import React, { useState } from 'react';
import {
  X,
  Database,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  Radio,
  Server,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAMS } from '../../context/AMSContext';
import { FFF_DATA_CONNECTORS } from '../../data/connectorsData';

export const DataSourcesHubModal: React.FC = () => {
  const {
    isDataSourcesModalOpen,
    closeDataSourcesModal,
    triggerDataSync,
    lastSyncTimestamp,
    isSyncingAll,
    openImportModal,
    openExportModal,
    selectedTeam
  } = useAMS();

  const [filterCat, setFilterCat] = useState<string>('all');

  if (!isDataSourcesModalOpen) return null;

  const filteredConnectors = FFF_DATA_CONNECTORS.filter((c) => {
    if (filterCat === 'all') return true;
    return c.category === filterCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150 select-none">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-950 text-white flex items-center justify-center shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Hub des Connecteurs & Flux de Données
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  7 FLUX ACTIFS
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {selectedTeam?.name || 'France A'} • Écosystème unifié : GPS, Vidéo, Tracking, Clubs, Médical & Biomécanique
              </p>
            </div>
          </div>

          <button
            onClick={closeDataSourcesModal}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Action & Status Bar */}
        <div className="px-6 py-3 bg-blue-50/70 border-b border-blue-200/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-blue-950">Statut du Hub : 100% Opérationnel</span>
            <span className="text-blue-400">•</span>
            <span className="text-blue-800">Dernière synchro : {lastSyncTimestamp}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                closeDataSourcesModal();
                openImportModal('all');
              }}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-blue-700 font-bold rounded-xl border border-blue-200 shadow-2xs transition-colors cursor-pointer"
            >
              Importer un flux
            </button>
            <button
              onClick={() => triggerDataSync()}
              disabled={isSyncingAll}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
              <span>{isSyncingAll ? 'Synchronisation...' : 'Synchroniser tout'}</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs bg-white">
          {[
            { id: 'all', label: 'Tous les flux (7)' },
            { id: 'gps', label: 'GPS & Charge (Catapult)' },
            { id: 'tracking', label: 'Tracking & Match (StatsBomb/Opta)' },
            { id: 'video', label: 'Vidéo (Hudl)' },
            { id: 'clubs', label: 'Clubs Employeurs' },
            { id: 'biomeca', label: 'Biomécanique (Kistler)' },
            { id: 'medical', label: 'Médical FFF' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCat(cat.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                filterCat === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Connectors List */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1 bg-slate-50/50">
          {filteredConnectors.map((c) => (
            <div
              key={c.id}
              className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {c.logoText.slice(0, 4)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">{c.name}</span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Connecté</span>
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {c.provider} • Fréquence : {c.frequency}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <div className="hidden sm:block text-[11px]">
                    <span className="text-slate-400 block">Dernière synchro</span>
                    <span className="font-bold text-slate-700 font-mono">{c.lastSync}</span>
                  </div>
                  <button
                    onClick={() => triggerDataSync(c.name)}
                    className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                    title={`Forcer la synchronisation ${c.name}`}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Types gérés :</span>
                  {c.supportedTypes.map((st) => (
                    <span
                      key={st}
                      className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {st}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                  <span>Latence : <strong>{c.latencyMs}ms</strong></span>
                  <span>•</span>
                  <span>{c.recordsCount.toLocaleString('fr-FR')} enregistrements</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Protocoles FFF sécurisés (OAuth2 & Clés API dédiées)
          </span>

          <button
            onClick={closeDataSourcesModal}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
