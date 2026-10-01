import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  DownloadCloud,
  Database,
  RefreshCw,
  MoreVertical,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { useAMS } from '../../context/AMSContext';
import { DataScope } from '../../types/dataExchange';

interface DataActionBarProps {
  scope: DataScope;
  showSyncBadge?: boolean;
  variant?: 'compact' | 'full' | 'dropdown';
  customImportLabel?: string;
  customExportLabel?: string;
  className?: string;
}

export const DataActionBar: React.FC<DataActionBarProps> = ({
  scope,
  showSyncBadge = false,
  variant = 'compact',
  customImportLabel = 'Importer',
  customExportLabel = 'Exporter',
  className = ''
}) => {
  const {
    openImportModal,
    openExportModal,
    openDataSourcesModal,
    lastSyncTimestamp,
    isSyncingAll
  } = useAMS();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'dropdown') {
    return (
      <div className={`relative inline-block text-left shrink-0 ${className}`} ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 transition-all cursor-pointer shadow-2xs text-xs font-bold"
          title="Données & Exports"
        >
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">Données</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-1.5 z-40 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Flux & Passerelles FFF
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                openImportModal(scope);
              }}
              className="w-full px-3.5 py-2 text-left hover:bg-blue-50 flex items-center gap-2.5 font-semibold text-slate-800 hover:text-blue-700 transition-colors cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="truncate">{customImportLabel}</span>
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                openExportModal(scope);
              }}
              className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 flex items-center gap-2.5 font-semibold text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <DownloadCloud className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{customExportLabel}</span>
            </button>
            <div className="my-1 border-t border-slate-100" />
            <button
              onClick={() => {
                setMenuOpen(false);
                openDataSourcesModal();
              }}
              className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Database className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Connecteurs & Sources</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 shrink-0 select-none ${className}`}>
      {/* Optional Live Sync Indicator */}
      {showSyncBadge && (
        <button
          onClick={openDataSourcesModal}
          className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold text-slate-500 hover:text-blue-700 hover:bg-blue-50/60 border border-slate-200/80 transition-colors cursor-pointer shrink-0"
          title="Ouvrir le panneau des flux"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="truncate max-w-[140px]">{lastSyncTimestamp}</span>
        </button>
      )}

      {/* Discrete Import Button */}
      <button
        onClick={() => openImportModal(scope)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 bg-white hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer shadow-2xs shrink-0 whitespace-nowrap"
        title={`Importer (${customImportLabel})`}
      >
        <UploadCloud className="w-3.5 h-3.5 text-blue-600 shrink-0" />
        <span className="hidden sm:inline">{customImportLabel}</span>
        <span className="sm:hidden">Import</span>
      </button>

      {/* Discrete Export Button */}
      <button
        onClick={() => openExportModal(scope)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs shrink-0 whitespace-nowrap"
        title={`Exporter (${customExportLabel})`}
      >
        <DownloadCloud className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="hidden sm:inline">{customExportLabel}</span>
        <span className="sm:hidden">Export</span>
      </button>

      {/* Data Connectors trigger button if full variant */}
      {variant === 'full' && (
        <button
          onClick={openDataSourcesModal}
          className="p-1.5 rounded-xl text-slate-500 hover:text-blue-700 hover:bg-blue-50 bg-white border border-slate-200 transition-colors cursor-pointer shadow-2xs shrink-0"
          title="Gérer les 7 connecteurs de données"
        >
          <Database className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
