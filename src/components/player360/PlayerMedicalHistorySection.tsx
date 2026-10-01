import React, { useState } from 'react';
import { Player, MedicalRecord, MedicalSpecialty, MedicalUrgency } from '../../types/ams';
import { useAMS } from '../../context/AMSContext';
import { COMPREHENSIVE_MEDICAL_RECORDS } from '../../data/medicalRecordsData';
import {
  Stethoscope,
  Heart,
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Clock,
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Plus,
  ArrowRight,
  Sparkles,
  ChevronRight,
  KeyRound,
  Pill,
  Syringe,
  Layers
} from 'lucide-react';
import { MedicalDetailModal } from '../medical/MedicalDetailModal';
import { MedicalAuthClearanceModal } from '../medical/MedicalAuthClearanceModal';

interface PlayerMedicalHistorySectionProps {
  player: Player;
}

export const PlayerMedicalHistorySection: React.FC<PlayerMedicalHistorySectionProps> = ({ player }) => {
  const { userRole, openMedicalModal } = useAMS();

  // Find all records for this player
  const playerRecords = COMPREHENSIVE_MEDICAL_RECORDS.filter(
    (r) => r.playerId.toLowerCase() === player.id.toLowerCase() || r.playerName.toLowerCase().includes(player.lastName.toLowerCase())
  );

  // If no specific records matched, provide the player's generic base medical records
  const displayRecords: MedicalRecord[] = playerRecords.length > 0 ? playerRecords : [
    {
      id: `med-${player.id}-01`,
      playerId: player.id,
      playerName: player.name,
      playerNumber: player.number,
      playerPosition: player.position,
      playerClub: player.club,
      date: '2026-09-24',
      time: '14:30',
      practitionerName: 'Dr. Franck Le Gall',
      practitionerRole: 'Médecin Fédéral Chef',
      specialty: 'medecin',
      location: 'Centre Médical Clairefontaine',
      title: 'Bilan médical d’arrivée & Test isocinétique',
      motif: 'Check-up d’entrée de rassemblement international',
      category: 'checkup',
      urgency: player.status === 'disponible' ? 'normal' : 'a_surveiller',
      aptitudeStatus: player.status === 'disponible' ? 'Apte 100%' : 'Apte aménagé',
      examDetails: {
        typeExamen: 'Évaluation clinique complète & dynamométrie isocinétique',
        modalite: 'Bilan musculaire comparatif quadriceps / ischio-jambiers',
        resultatsChiffres: [
          { label: 'Ratio Ischios/Quad', value: '0.64', norm: '0.60 - 0.70', isAlert: false },
          { label: 'Force max quadriceps', value: '280 Nm', norm: '> 260 Nm', isAlert: false },
          { label: 'Déficit bilatéral', value: '4.2%', norm: '< 10%', isAlert: false }
        ],
        constatationsCliniques: [
          'Examen ostéo-articulaire des membres inférieurs strictement normal.',
          'Stabilité des ligaments croisés antérieure et postérieure confirmée (Lachman négatif).',
          'Amplitude articulaire complète sans raideur.'
        ]
      },
      soinsTraitements: {
        actes: ['Cryothérapie corps entier 3 min à -110°C', 'Massage de récupération quadriceps'],
        prescriptions: ['Hydratation enrichie en électrolytes', 'Supplémentation magnésium marin']
      },
      conclusions: {
        synthese: 'Condition ostéo-musculaire optimale pour la haute intensité internationale.',
        consignesEntraineur: 'Aucune restriction athlétique. Apte pour 90 minutes de jeu.',
        dateProchainControle: '2026-09-27 à 08:30',
        validationMedecinChef: true
      }
    },
    {
      id: `med-${player.id}-02`,
      playerId: player.id,
      playerName: player.name,
      playerNumber: player.number,
      playerPosition: player.position,
      playerClub: player.club,
      date: '2026-09-20',
      time: '11:00',
      practitionerName: 'Jean-Yves Vandewalle',
      practitionerRole: 'Kinésithérapeute Coordinateur FFF',
      specialty: 'kine',
      location: 'Clairefontaine • Salle de Récupération',
      title: 'Séance de décharge post-match club & Pressothérapie',
      motif: 'Récupération musculaire suite à la journée de championnat',
      category: 'soins',
      urgency: 'normal',
      aptitudeStatus: 'Apte 100%',
      examDetails: {
        typeExamen: 'Bilan palpatoire myotendineux',
        modalite: 'Drainage lymphatique & compression pneumatique intermittente',
        constatationsCliniques: ['Tension modérée des triceps suraux sans point gâchette actif.']
      },
      soinsTraitements: {
        actes: ['Pressothérapie Normatec 30 min (Niveau 5)', 'Thérapie manuelle décontracturante mollets']
      },
      conclusions: {
        synthese: 'Tonus musculaire rééquilibré.',
        consignesEntraineur: 'Séance de décrassage individualisée effectuée.',
        dateProchainControle: '2026-09-25',
        validationMedecinChef: true
      }
    }
  ];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isClearanceModalOpen, setIsClearanceModalOpen] = useState(false);
  const [unlockedRecordIds, setUnlockedRecordIds] = useState<string[]>([]);

  const filteredRecords = displayRecords.filter((r) => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  const isUserMedical = userRole === 'medical';

  const handleRecordClick = (record: MedicalRecord) => {
    setSelectedRecord(record);

    if (isUserMedical || unlockedRecordIds.includes(record.id)) {
      setIsDetailModalOpen(true);
    } else {
      setIsClearanceModalOpen(true);
    }
  };

  const handleAuthorized = () => {
    if (selectedRecord) {
      setUnlockedRecordIds((prev) => [...prev, selectedRecord.id]);
      setIsClearanceModalOpen(false);
      setIsDetailModalOpen(true);
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'imagerie':
        return 'Imagerie & Écho';
      case 'musculaire':
        return 'Bilan Musculaire';
      case 'checkup':
        return 'Check-up Fédéral';
      case 'soins':
        return 'Soins & Kiné';
      case 'biologie':
        return 'Bilan Biologique';
      default:
        return 'Dossier Médical';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Medical Clearance Status */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                Suivi Clinique & Dossier Fédéral
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Historique Médical du Joueur</span>
              <span className="text-amber-400 text-base">★★</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Traçabilité complète des examens, imageries, consultations et protocoles Return to Play (RTP).
            </p>
          </div>

          {/* Access Control Status Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isUserMedical ? (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="block font-black leading-tight">Accès Médical Déverrouillé</span>
                  <span className="text-[10px] text-emerald-700 font-semibold font-mono">
                    Habilitation Dr. Franck Le Gall
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs">
                <Lock className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <span className="block font-black leading-tight">Secret Médical Actif</span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Code requis pour détails cliniques
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3 Grand Health Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Disponibilité Athlétique
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 font-mono">
                {player.dimensions.sante.disponibilite}%
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {player.status === 'disponible' ? '100% Apte' : 'Adapté'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              Avis médical staff FFF
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Stabilité Sans Gêne
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-600 font-mono">
                {player.dimensions.sante.joursSansGene} jours
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              Continuité d'entraînement validée
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Dernier Examen Importé
            </span>
            <div className="text-sm font-black text-slate-900 font-mono mt-1 truncate">
              {displayRecords[0]?.title || 'Bilan Fédéral'}
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              {displayRecords[0]?.date || '2026-09-25'} • Dr. Le Gall
            </p>
          </div>
        </div>
      </div>

      {/* List of Medical Records with Filter Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Fiches et Bilans Médicaux Importés ({displayRecords.length})
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Cliquez sur une fiche pour consulter le rapport complet ou saisir votre code staff.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto shrink-0">
            {[
              { id: 'all', label: 'Tous les bilans' },
              { id: 'imagerie', label: 'Imagerie' },
              { id: 'musculaire', label: 'Musculaire' },
              { id: 'checkup', label: 'Check-ups' },
              { id: 'soins', label: 'Soins & Kiné' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Records List Feed */}
        <div className="space-y-3 pt-2">
          {filteredRecords.map((record) => {
            const isUnlocked = isUserMedical || unlockedRecordIds.includes(record.id);

            return (
              <div
                key={record.id}
                onClick={() => handleRecordClick(record)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isUnlocked
                    ? 'bg-white hover:bg-rose-50/40 border-slate-200 hover:border-rose-300 shadow-2xs'
                    : 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/90'
                }`}
              >
                {/* Record Info Left */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                      isUnlocked
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : 'bg-slate-200 text-slate-600 border border-slate-300'
                    }`}
                  >
                    {isUnlocked ? (
                      <Heart className="w-5 h-5 text-rose-600" />
                    ) : (
                      <Lock className="w-5 h-5 text-slate-600" />
                    )}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                        {getCategoryLabel(record.category)}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">
                        {record.date} à {record.time}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          record.urgency === 'normal'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {record.aptitudeStatus}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 group-hover:text-rose-700 transition-colors truncate">
                      {record.title}
                    </h4>

                    <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                      <span>{record.practitionerName} ({record.practitionerRole})</span>
                      <span>•</span>
                      <span className="truncate">{record.location}</span>
                    </p>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-xs group-hover:bg-rose-700 transition-colors">
                      <span>Ouvrir Fiche</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
                      <Lock className="w-3.5 h-3.5 text-rose-600" />
                      <span>Détails (Code Staff)</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals for Details and PIN Clearance */}
      <MedicalDetailModal
        record={isDetailModalOpen ? selectedRecord : null}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <MedicalAuthClearanceModal
        record={selectedRecord}
        isOpen={isClearanceModalOpen}
        onClose={() => setIsClearanceModalOpen(false)}
        onAuthorized={handleAuthorized}
      />
    </div>
  );
};
