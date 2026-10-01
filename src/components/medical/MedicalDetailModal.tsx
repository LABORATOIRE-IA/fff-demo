import React from 'react';
import {
  X,
  User,
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  Activity,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Pill,
  Apple,
  Eye
} from 'lucide-react';
import { MedicalRecord, MedicalSpecialty, MedicalUrgency } from '../../types/ams';
import { useAMS } from '../../context/AMSContext';

interface MedicalDetailModalProps {
  record: MedicalRecord | null;
  onClose: () => void;
}

export const MedicalDetailModal: React.FC<MedicalDetailModalProps> = ({ record, onClose }) => {
  const { navigateTo } = useAMS();

  if (!record) return null;

  const getSpecialtyBadge = (spec: MedicalSpecialty) => {
    switch (spec) {
      case 'medecin':
        return { label: 'Médecine Fédérale', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'kine':
        return { label: 'Kinésithérapie & Soins', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'nutritionniste':
        return { label: 'Physiologie & Nutrition', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'osteopathe':
        return { label: 'Ostéopathie', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'podologue':
        return { label: 'Podologie du Sport', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'reathletisation':
        return { label: 'Réathlétisation & RTP', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
  };

  const getUrgencyBadge = (urg: MedicalUrgency) => {
    switch (urg) {
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Normal / Conforme</span>
          </span>
        );
      case 'a_surveiller':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>À surveiller</span>
          </span>
        );
      case 'prioritaire':
      case 'inapte':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Alerte médicale</span>
          </span>
        );
    }
  };

  const badgeInfo = getSpecialtyBadge(record.specialty);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header FFF */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${badgeInfo.color}`}>
                {badgeInfo.label}
              </span>
              {getUrgencyBadge(record.urgency)}
              <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {record.date} • {record.time}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {record.title}
            </h2>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
              <span>{record.practitionerName} ({record.practitionerRole})</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{record.location}</span>
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer shrink-0"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 text-xs">
          {/* Joueur concerné Card */}
          <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white font-mono font-black text-sm flex items-center justify-center shadow-xs">
                {record.playerNumber}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">{record.playerName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-blue-800 border border-blue-200">
                    {record.playerPosition}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {record.playerClub} • Statut actuel : <strong className="text-blue-900">{record.aptitudeStatus}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                navigateTo('joueur_360', { playerId: record.playerId, playerTab: 'sante' });
              }}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Voir Jumeau Numérique</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Motif de la consultation */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Motif de consultation & Contexte clinique</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-medium">
              {record.motif}
            </div>
          </div>

          {/* Examens réalisés & Mesures chiffrées */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>Examens réalisés & Mesures cliniques</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {record.examDetails.typeExamen}
              </span>
            </div>

            {/* Chiffres & Indicateurs */}
            {record.examDetails.resultatsChiffres && record.examDetails.resultatsChiffres.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {record.examDetails.resultatsChiffres.map((res, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border ${
                      res.isAlert
                        ? 'bg-amber-50/70 border-amber-200'
                        : 'bg-white border-slate-200/90'
                    }`}
                  >
                    <div className="text-[10px] text-slate-500 font-semibold truncate">{res.label}</div>
                    <div className={`text-base font-black font-mono mt-0.5 ${res.isAlert ? 'text-amber-800' : 'text-slate-900'}`}>
                      {res.value}
                    </div>
                    {res.norm && (
                      <div className="text-[9px] text-slate-400 mt-0.5 font-medium">
                        Norme : {res.norm}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Constatations cliniques détaillées */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Observations & Constatations :
              </span>
              <ul className="space-y-1.5">
                {record.examDetails.constatationsCliniques.map((obs, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actes dispensés & Soins */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
              <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
              <span>Actes, Soins & Traitements appliqués</span>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-slate-200 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Protocole thérapeutique dispensé :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {record.soinsTraitements.actes.map((acte, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-[11px] font-semibold border border-slate-200/80"
                    >
                      ✓ {acte}
                    </span>
                  ))}
                </div>
              </div>

              {record.soinsTraitements.prescriptions && record.soinsTraitements.prescriptions.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    <Pill className="w-3 h-3 text-rose-500" />
                    <span>Prescriptions médicales autorisées (Conformes AMA / Antidopage) :</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-slate-700 font-medium space-y-0.5">
                    {record.soinsTraitements.prescriptions.map((pr, i) => (
                      <li key={i}>{pr}</li>
                    ))}
                  </ul>
                </div>
              )}

              {record.soinsTraitements.nutritionConseils && record.soinsTraitements.nutritionConseils.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    <Apple className="w-3 h-3 text-emerald-600" />
                    <span>Recommandations Nutritionnelles & Hydratation :</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-slate-700 font-medium space-y-0.5">
                    {record.soinsTraitements.nutritionConseils.map((nut, i) => (
                      <li key={i}>{nut}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Conclusions & Consignes Entraîneur / Staff */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-950 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200">
                  Conclusions Médicales & Consignes pour le Staff
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
                {record.aptitudeStatus}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-blue-100 font-medium leading-relaxed">
                {record.conclusions.synthese}
              </p>

              <div className="p-3 bg-white/10 rounded-xl border border-white/15 space-y-1">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                  Consignes pour l'entraîneur (Zinédine Zidane / Staff) :
                </span>
                <p className="text-xs font-semibold text-white leading-relaxed">
                  {record.conclusions.consignesEntraineur}
                </p>
                {record.conclusions.limitationCharge && (
                  <p className="text-[11px] text-blue-200/90 font-medium pt-1 border-t border-white/10">
                    ⚠️ {record.conclusions.limitationCharge}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/15 text-[10px] text-blue-200/80">
              <span>Prochain contrôle : <strong>{record.conclusions.dateProchainControle}</strong></span>
              <span>Validé par : <strong>Dr. Franck Le Gall (Médecin FFF)</strong></span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium">
            Confidentiel • Pôle Médical FFF Clairefontaine • RGPD Santé
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Fermer la fiche
          </button>
        </div>
      </div>
    </div>
  );
};
