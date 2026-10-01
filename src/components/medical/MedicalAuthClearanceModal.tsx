import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  ShieldAlert,
  ShieldCheck,
  X,
  Stethoscope,
  KeyRound,
  AlertCircle,
  ArrowRight,
  UserCheck,
  HeartPulse,
  Send,
  BellRing,
  CheckCircle2,
  ArrowLeft,
  FileLock2,
  Shield,
  HelpCircle
} from 'lucide-react';
import { MedicalRecord } from '../../types/ams';
import { useAMS } from '../../context/AMSContext';

interface MedicalAuthClearanceModalProps {
  record: MedicalRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onAuthorized: () => void;
}

type ModalStep = 'initial_choice' | 'request_sent' | 'enter_code';

const VALID_MEDICAL_CODES = ['7508', 'FFF-MED-2026', 'MED-360', '0000', '1234'];

export const MedicalAuthClearanceModal: React.FC<MedicalAuthClearanceModalProps> = ({
  record,
  isOpen,
  onClose,
  onAuthorized
}) => {
  const { userRole, setUserRole, roleConfig } = useAMS();
  const [step, setStep] = useState<ModalStep>('initial_choice');
  const [pinCode, setPinCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  // Reset state when opening/closing
  useEffect(() => {
    if (isOpen) {
      setStep('initial_choice');
      setPinCode('');
      setErrorMessage(null);
      setIsSuccess(false);
      setIsSubmittingRequest(false);
    }
  }, [isOpen, record]);

  if (!isOpen || !record) return null;

  const handleRequestAccess = () => {
    setIsSubmittingRequest(true);
    setTimeout(() => {
      setIsSubmittingRequest(false);
      setStep('request_sent');
    }, 400);
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPin = pinCode.trim().toUpperCase();

    if (VALID_MEDICAL_CODES.includes(cleanPin)) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPinCode('');
        onAuthorized();
      }, 500);
    } else {
      setErrorMessage('Code d’habilitation invalide. Veuillez vérifier auprès du Dr. Franck Le Gall ou saisir 7508.');
    }
  };

  const handleSwitchToMedicalRole = () => {
    setUserRole('medical');
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onAuthorized();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200 text-slate-900 flex flex-col">
        {/* Header Confidentiality Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-6 relative overflow-hidden">
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400 shadow-lg shrink-0">
                <FileLock2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/25 text-rose-200 border border-rose-400/30">
                    Accès Refusé • Secret Médical
                  </span>
                </div>
                <h3 className="text-lg font-black text-white tracking-tight mt-1">
                  Dossier Médical Protégé
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 relative z-10 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-blue-100/90 leading-relaxed font-medium">
            <span>Vous n'avez pas l'habilitation médicale requise pour consulter le dossier complet de </span>
            <strong className="text-white font-bold">{record.playerName}</strong>
            <span className="text-blue-200"> ({record.title})</span>.
          </div>
        </div>

        {/* Body Content by Step */}
        <div className="p-6 space-y-5">
          {/* ========================================================================= */}
          {/* STEP 1: INITIAL CHOICE (DEMANDER L'ACCÈS OU J'AI UN CODE D'ACCÈS)          */}
          {/* ========================================================================= */}
          {step === 'initial_choice' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p className="text-xs font-semibold text-slate-600">
                Conformément au secret médical, veuillez choisir une option pour accéder aux détails cliniques et imageries :
              </p>

              {/* The Two Main Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Choice 1: Demander l'accès */}
                <button
                  onClick={handleRequestAccess}
                  disabled={isSubmittingRequest}
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 transition-all text-left flex flex-col justify-between space-y-3 group cursor-pointer shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs">
                      <Send className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                      Option 1
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                      Demander l'accès
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                      Envoyer une demande de dérogation directement au Dr. Franck Le Gall.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-1 group-hover:translate-x-1 transition-transform">
                    <span>Transmettre demande</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Choice 2: J'ai un code d'accès */}
                <button
                  onClick={() => setStep('enter_code')}
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/50 transition-all text-left flex flex-col justify-between space-y-3 group cursor-pointer shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                      Option 2
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                      J'ai un code d'accès
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                      Saisir le code PIN temporaire remis par le médecin ou le staff médical FFF.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 pt-1 group-hover:translate-x-1 transition-transform">
                    <span>Saisir le code</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>

              {/* Quick switch to Dr. Le Gall role */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSwitchToMedicalRole}
                  className="text-xs font-bold text-slate-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer py-1"
                >
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Basculer sur le profil Dr. Le Gall</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2A: REQUEST SENT CONFIRMATION                                         */}
          {/* ========================================================================= */}
          {step === 'request_sent' && (
            <div className="space-y-5 animate-in zoom-in-95 duration-200 text-center py-2">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md ring-8 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="text-base font-black text-slate-900">
                  Demande transmise avec succès
                </h4>
                {/* Exact text requested by user */}
                <p className="text-sm font-semibold text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed shadow-2xs">
                  « Nous avons fait la demande d'accès, nous vous enverrons une notification lorsque ce sera disponible. »
                </p>
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 font-medium flex items-center justify-center gap-2">
                <BellRing className="w-4 h-4 text-blue-600 shrink-0 animate-bounce" />
                <span>Destinataire : <strong>Dr. Franck Le Gall (Médecin Fédéral)</strong></span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('enter_code')}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  J'ai finalement reçu un code
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Compris, fermer
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2B: ENTER PIN CODE FORM                                              */}
          {/* ========================================================================= */}
          {step === 'enter_code' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('initial_choice')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Retour aux options</span>
                </button>

                <span className="text-[10px] font-mono text-slate-400 font-bold">
                  Code démo : 7508
                </span>
              </div>

              <form onSubmit={handleVerifyPin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-indigo-600" />
                    <span>Saisissez votre code d'accès médical :</span>
                  </label>

                  <div className="relative">
                    <input
                      type="password"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder="Code PIN à 4 chiffres ou clé FFF (ex: 7508)"
                      className="w-full pl-4 pr-24 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-base font-mono tracking-widest font-black focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all text-slate-900"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      Valider
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {isSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Code valide ! Ouverture immédiate du dossier médical complet...</span>
                  </div>
                )}
              </form>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleRequestAccess}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Pas de code ? Demander l'accès
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
