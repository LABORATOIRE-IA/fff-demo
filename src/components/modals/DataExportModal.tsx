import React, { useState } from 'react';
import {
  X,
  DownloadCloud,
  FileSpreadsheet,
  FileText,
  Code,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Printer
} from 'lucide-react';
import { useAMS } from '../../context/AMSContext';
import { ExportFormat } from '../../types/dataExchange';
import { generateAndDownloadExport } from '../../utils/dataExportHelper';

export const DataExportModal: React.FC = () => {
  const {
    isExportModalOpen,
    exportModalContext,
    closeExportModal,
    players,
    selectedPlayer,
    selectedMatch,
    selectedTraining,
    rassemblement,
    selectedTeam,
    userRole
  } = useAMS();

  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('csv');
  const [includeGps, setIncludeGps] = useState<boolean>(true);
  const [includeRpe, setIncludeRpe] = useState<boolean>(true);
  const [includeTactical, setIncludeTactical] = useState<boolean>(true);
  const [includeMedical, setIncludeMedical] = useState<boolean>(userRole === 'medical');
  const [anonymizeSensitive, setAnonymizeSensitive] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isExportModalOpen) return null;

  const isMedicalAllowed = userRole === 'medical' || userRole === 'entraineur' || userRole === 'direction';

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      generateAndDownloadExport(exportModalContext, selectedFormat, {
        players,
        selectedPlayer,
        selectedMatch,
        selectedTraining,
        rassemblement,
        teamName: selectedTeam?.name || 'France A',
        includeMedical: isMedicalAllowed && includeMedical,
        anonymizeSensitive
      });
      setIsExporting(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        closeExportModal();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150 select-none">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-xs">
              <DownloadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Exportation Sécurisée de Données
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  {exportModalContext.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {selectedTeam?.name || 'France A'} • Certification FFF & Extraction Multiformat
              </p>
            </div>
          </div>

          <button
            onClick={closeExportModal}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Format Selection */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              1. Sélectionnez le format de sortie
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'csv' as ExportFormat,
                  label: 'Excel / CSV',
                  desc: 'Tableur brut horodaté',
                  icon: FileSpreadsheet,
                  color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
                },
                {
                  id: 'pdf' as ExportFormat,
                  label: 'Rapport FFF (PDF)',
                  desc: 'Synthèse officielle imprimable',
                  icon: FileText,
                  color: 'text-blue-700 bg-blue-50 border-blue-200'
                },
                {
                  id: 'json' as ExportFormat,
                  label: 'JSON API',
                  desc: 'Flux standardisé inter-clubs',
                  icon: Code,
                  color: 'text-indigo-700 bg-indigo-50 border-indigo-200'
                }
              ].map((fmt) => {
                const Icon = fmt.icon;
                const isSelected = selectedFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${fmt.color.split(' ')[0]}`} />
                    <span className="text-xs font-bold text-slate-900 block">{fmt.label}</span>
                    <span className="text-[10px] text-slate-400 block">{fmt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scope Filters */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              2. Périmètre des données incluses
            </span>

            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-slate-800">
                  Données GPS & Athlétiques (Catapult 10Hz, ACWR, Vitesse max)
                </span>
                <input
                  type="checkbox"
                  checked={includeGps}
                  onChange={(e) => setIncludeGps(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-slate-800">
                  RPE post-séance & Fatigue subjective (Wellness)
                </span>
                <input
                  type="checkbox"
                  checked={includeRpe}
                  onChange={(e) => setIncludeRpe(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-slate-800">
                  Statistiques de Match & Événements tactiques (StatsBomb xG)
                </span>
                <input
                  type="checkbox"
                  checked={includeTactical}
                  onChange={(e) => setIncludeTactical(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>

              {/* Medical data RBAC control */}
              <div className="pt-2 border-t border-slate-200">
                <label
                  className={`flex items-center justify-between ${
                    isMedicalAllowed ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-800">
                      Bilans Médicaux & Suivi de reprise (RTP)
                    </span>
                    {!isMedicalAllowed && (
                      <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Réservé Pôle Médical</span>
                      </span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    disabled={!isMedicalAllowed}
                    checked={isMedicalAllowed && includeMedical}
                    onChange={(e) => setIncludeMedical(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Anonymization option for external exchange */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1">
            <label className="flex items-center gap-2 font-bold text-amber-900 cursor-pointer">
              <input
                type="checkbox"
                checked={anonymizeSensitive}
                onChange={(e) => setAnonymizeSensitive(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
              />
              <span>Anonymiser les identifiants médicaux pour partage externe (RGPD)</span>
            </label>
            <p className="text-[10px] text-amber-700 pl-6">
              Remplace les noms des praticiens et détails cliniques par des codes d’identification fédéraux sécurisés.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Export certifié FFF • Horodaté
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={closeExportModal}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              {isExporting ? (
                <span>Génération du fichier...</span>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Téléchargé !</span>
                </>
              ) : (
                <>
                  <DownloadCloud className="w-4 h-4" />
                  <span>Télécharger l'Export</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
