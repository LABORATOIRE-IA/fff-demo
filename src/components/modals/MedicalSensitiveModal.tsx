import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  X,
  ShieldAlert,
  Lock,
  Unlock,
  CheckCircle2,
  FileText,
  Send,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  BellRing,
  AlertCircle,
  FileLock2
} from 'lucide-react';

type StepMode = 'initial' | 'request_sent' | 'enter_code';

const VALID_CODES = ['7508', 'FFF-MED-2026', 'MED-360', '0000', '1234'];

export const MedicalSensitiveModal: React.FC = () => {
  const {
    isMedicalModalOpen,
    medicalModalPlayerId,
    closeMedicalModal,
    players,
    userRole,
    setUserRole
  } = useAMS();

  const [step, setStep] = useState<StepMode>('initial');
  const [pinCode, setPinCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unlockedForSession, setUnlockedForSession] = useState(false);

  if (!isMedicalModalOpen || !medicalModalPlayerId) return null;

  const player = players.find((p) => p.id === medicalModalPlayerId);
  if (!player) return null;

  const isMedicalRole = userRole === 'medical' || unlockedForSession;

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const clean = pinCode.trim().toUpperCase();
    if (VALID_CODES.includes(clean)) {
      setUnlockedForSession(true);
      setStep('initial');
    } else {
      setErrorMessage('Code invalide. Veuillez contacter le staff médical ou saisir 7508.');
    }
  };

  const handleClose = () => {
    setStep('initial');
    setPinCode('');
    setErrorMessage(null);
    closeMedicalModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-in fade-in duration-150">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className={`p-6 flex items-center justify-between border-b ${isMedicalRole ? 'bg-gradient-to-r from-slate-900 to-blue-950 text-white border-slate-800' : 'bg-gradient-to-r from-slate-950 to-slate-900 text-white border-slate-800'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shrink-0 ${isMedicalRole ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30' : 'bg-rose-500/20 text-rose-400 border border-rose-400/30'}`}>
              {isMedicalRole ? <Unlock className="w-5 h-5" /> : <FileLock2 className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isMedicalRole ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                  {isMedicalRole ? 'Accès Déverrouillé' : 'Secret Médical Protégé'}
                </span>
              </div>
              <h3 className="text-base font-black text-white tracking-tight mt-0.5">
                Dossier Médical • {player.name}
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-slate-900">
          {!isMedicalRole ? (
            /* Restricted View for non-medical profiles */
            <div className="space-y-4">
              {step === 'initial' && (
                <>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
                      Synthèse Staff autorisée :
                    </span>
                    <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200">
                      <span className="text-slate-500">Statut de disponibilité</span>
                      <span className="font-bold text-slate-900">{player.dimensions.sante.statut}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1">
                      <span className="text-slate-500">Restriction de minutes</span>
                      <span className="font-bold text-blue-700">
                        {player.status === 'retour_progressif' ? '60 min max' : 'Sans restriction'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-600">
                    Pour consulter l'intégralité du dossier clinique, des imageries et des bilans :
                  </p>

                  {/* The Two Choices */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setStep('request_sent')}
                      className="p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer group shadow-2xs"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <Send className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-700">
                          Demander l'accès
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Notification au Dr. Le Gall
                        </p>
                      </div>
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                        <span>Transmettre</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>

                    <button
                      onClick={() => setStep('enter_code')}
                      className="p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/50 transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer group shadow-2xs"
                    >
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-indigo-700">
                          J'ai un code d'accès
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Code PIN médical temporaire
                        </p>
                      </div>
                      <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                        <span>Saisir le code</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  </div>
                </>
              )}

              {step === 'request_sent' && (
                <div className="space-y-4 text-center py-2 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed">
                    « Nous avons fait la demande d'accès, nous vous enverrons une notification lorsque ce sera disponible. »
                  </p>
                  <div className="flex justify-center gap-2 pt-2">
                    <button
                      onClick={() => setStep('enter_code')}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      J'ai reçu un code
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              )}

              {step === 'enter_code' && (
                <form onSubmit={handleVerifyCode} className="space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('initial')}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Retour</span>
                    </button>
                    <span className="text-[10px] font-mono text-slate-400">Code démo : 7508</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Code d'autorisation staff :</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        placeholder="Ex: 7508"
                        className="w-full pl-4 pr-20 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Valider
                      </button>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
                      {errorMessage}
                    </div>
                  )}
                </form>
              )}
            </div>
          ) : (
            /* Full Medical Record unlocked */
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">Habilitation Médecin Équipe de France validée</span>
                </div>
                <span className="font-mono text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                  Secret Médical
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  Dossier clinique récent & IRM :
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-sans bg-white p-3 rounded-lg border border-slate-200">
                  {player.dimensions.sante.sensibleMedical ||
                    'Aucune lésion structurelle signalée lors du dernier bilan échographique. Absence de plainte symptomatique à l’effort.'}
                </p>
              </div>

              {player.dimensions.sante.pathologyHistory && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-800 block">
                    Historique longitudinal des traumatismes & gênes :
                  </span>
                  <div className="space-y-1">
                    {player.dimensions.sante.pathologyHistory.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-between"
                      >
                        <span>{item}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Consigné Dr. Le Gall</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
