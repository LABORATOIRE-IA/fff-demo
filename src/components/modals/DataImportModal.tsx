import React, { useState } from 'react';
import {
  X,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  FileSpreadsheet,
  FileText,
  Database,
  RefreshCw,
  Sparkles,
  Layers,
  Radio,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useAMS } from '../../context/AMSContext';
import { FFF_DATA_CONNECTORS } from '../../data/connectorsData';
import { DataScope } from '../../types/dataExchange';

export const DataImportModal: React.FC = () => {
  const {
    isImportModalOpen,
    importModalContext,
    closeImportModal,
    players,
    triggerDataSync,
    selectedTeam
  } = useAMS();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSourceId, setSelectedSourceId] = useState<string>('catapult');
  const [selectedDataType, setSelectedDataType] = useState<string>('Données GPS & PlayerLoad');
  const [uploadedFileName, setUploadedFileName] = useState<string>('Export_Catapult_Session_FranceA_10Hz.csv');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isImportModalOpen) return null;

  const selectedConnector = FFF_DATA_CONNECTORS.find((c) => c.id === selectedSourceId) || FFF_DATA_CONNECTORS[0];

  const handleNext = () => {
    if (currentStep === 3) {
      // Simulate validation analysis
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(4);
      }, 700);
    } else if (currentStep === 4) {
      // Execute final import
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        triggerDataSync(selectedConnector.name);
      }, 1000);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setIsSuccess(false);
    setIsProcessing(false);
    closeImportModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150 select-none">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-xs">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Importation & Synchronisation de Données
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  {importModalContext.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {selectedTeam?.name || 'France A'} • Passerelle sécurisée d'intégration multimodale
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step Visual Stepper */}
        {!isSuccess && (
          <div className="px-6 py-3 bg-slate-100/70 border-b border-slate-200/60 flex items-center justify-between text-xs">
            {[
              { num: 1, label: 'Source' },
              { num: 2, label: 'Type' },
              { num: 3, label: 'Fichier / API' },
              { num: 4, label: 'Aperçu & Intégrité' }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                    currentStep === step.num
                      ? 'bg-blue-600 text-white shadow-xs'
                      : currentStep > step.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {currentStep > step.num ? <Check className="w-3.5 h-3.5" /> : step.num}
                </div>
                <span
                  className={`text-[11px] font-bold hidden sm:inline ${
                    currentStep === step.num ? 'text-blue-900' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
                {idx < 3 && <span className="text-slate-300 mx-1">›</span>}
              </div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {isSuccess ? (
            /* STEP SUCCESS */
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs border-2 border-emerald-300">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  Importation & Consolidation Réussies !
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Les métriques de <strong>{selectedConnector.name}</strong> ont été intégrées avec succès aux fiches des 24 athlètes de la sélection.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Source connectée :</span>
                  <span className="font-bold text-slate-900">{selectedConnector.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Athlètes synchronisés :</span>
                  <span className="font-bold text-emerald-700">24 / 24 reconnus (100%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Horodatage FFF :</span>
                  <span className="font-bold text-slate-700">Aujourd’hui à l’instant</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Intégrité des données :</span>
                  <span className="font-bold text-blue-700">Certifiée conforme</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Terminer et actualiser les vues
                </button>
              </div>
            </div>
          ) : currentStep === 1 ? (
            /* STEP 1: SELECT SOURCE */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  1. Choisissez le connecteur de données source
                </span>
                <span className="text-[11px] text-slate-400 font-medium">7 connecteurs certifiés</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FFF_DATA_CONNECTORS.map((connector) => {
                  const isSelected = selectedSourceId === connector.id;
                  return (
                    <button
                      key={connector.id}
                      onClick={() => setSelectedSourceId(connector.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900 text-white">
                          {connector.logoText}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>{connector.status === 'connected' ? 'En ligne' : 'Synchro'}</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{connector.name}</span>
                        <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{connector.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : currentStep === 2 ? (
            /* STEP 2: SELECT DATA TYPE */
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                2. Définissez la typologie de flux à intégrer
              </span>

              <div className="space-y-2">
                {(selectedConnector.supportedTypes || ['Données d’entraînement', 'Données de match', 'RPE / Wellness']).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedDataType(t)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedDataType === t
                        ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{t}</span>
                        <span className="text-[10px] text-slate-400">
                          Mapping automatique avec l’effectif {selectedTeam?.name || 'France A'}
                        </span>
                      </div>
                    </div>
                    {selectedDataType === t && <Check className="w-4 h-4 text-blue-700" />}
                  </button>
                ))}
              </div>
            </div>
          ) : currentStep === 3 ? (
            /* STEP 3: FILE DROP / DIRECT API PULL */
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                3. Transmission du fichier ou Déclenchement API direct
              </span>

              {/* Direct API Sync Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <RefreshCw className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-950 block">
                      Synchronisation API Directe ({selectedConnector.provider})
                    </span>
                    <span className="text-[10px] text-blue-800/80">
                      Récupération automatique du dernier flux validé à Clairefontaine.
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-600 text-white shrink-0">
                  Prêt (10 Hz)
                </span>
              </div>

              {/* Or File Upload Drag & Drop */}
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-6 text-center bg-slate-50/60 transition-colors space-y-2">
                <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto" />
                <div className="text-xs">
                  <span className="font-bold text-blue-700 hover:underline cursor-pointer">
                    Cliquez pour choisir un fichier
                  </span>{' '}
                  <span className="text-slate-500">ou glissez-déposez ici</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Formats supportés : .CSV, .XLSX, .JSON, XML Sportscode (Max 25 Mo)
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-xl text-[11px] font-mono text-slate-700">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>{uploadedFileName}</span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 4: PREVIEW & INTEGRITY */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  4. Contrôle d’intégrité & Aperçu des 24 athlètes
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>100% Intègre • 0 Conflit</span>
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{uploadedFileName}</span>
                  <span className="text-[10px] text-slate-500">
                    24 lignes analysées • Colonnes : Vitesse, Distance, Accélérations, RPE, PlayerLoad
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                  Catapult V7 Engine
                </span>
              </div>

              {/* Sample Table Preview */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase">
                    <tr>
                      <th className="py-2 px-3">Athlète</th>
                      <th className="py-2 px-3">Club</th>
                      <th className="py-2 px-3 text-right">Distance</th>
                      <th className="py-2 px-3 text-right">Vmax</th>
                      <th className="py-2 px-3 text-right">RPE</th>
                      <th className="py-2 px-3 text-center">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {players.slice(0, 5).map((p) => (
                      <tr key={p.id}>
                        <td className="py-2 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-blue-700 text-white text-[10px] font-mono flex items-center justify-center">
                            {p.number}
                          </span>
                          <span>{p.name}</span>
                        </td>
                        <td className="py-2 px-3 text-slate-500 text-[11px]">{p.club}</td>
                        <td className="py-2 px-3 text-right font-mono font-semibold">
                          {p.dimensions?.entrainement?.distance || 34.5} km
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-semibold">
                          {p.dimensions?.physique?.vitesseMax || 33.2} km/h
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-blue-700 font-bold">
                          {p.dimensions?.recuperation?.readiness || 88}%
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Validé
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        {!isSuccess && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                disabled={isProcessing}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200/80 transition-colors border border-slate-200 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Précédent</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={isProcessing}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Traitement en cours...</span>
                </>
              ) : currentStep === 4 ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirmer et Intégrer les Données</span>
                </>
              ) : (
                <>
                  <span>Continuer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
