import React, { useState } from 'react';
import { Player } from '../../types/ams';
import { useAMS } from '../../context/AMSContext';
import {
  Download,
  Activity,
  Zap,
  Heart,
  Moon,
  TrendingUp,
  Shield,
  Stethoscope,
  Crosshair,
  Flame,
  UserCheck,
  ChevronDown,
  Lock,
  ArrowRight,
  Info,
  Award,
  MapPin,
  Calendar,
  Sparkles,
  Sliders,
  Swords,
  Dumbbell
} from 'lucide-react';
import { getPlayerCockpitProfile } from '../../data/playerCockpitData';
import { getPlayerDetectionHistory } from '../../data/detectionData';
import { CockpitRadarChart } from './CockpitRadarChart';
import { CockpitSectionDetailModal, CockpitDetailSection } from './CockpitSectionDetailModal';
import { PlayerAnatomy360View } from './PlayerAnatomy360View';
import { MedicalAuthClearanceModal } from '../medical/MedicalAuthClearanceModal';
import { COMPREHENSIVE_MEDICAL_RECORDS } from '../../data/medicalRecordsData';
import { MedicalRecord } from '../../types/ams';
import { CommentTriggerButton } from '../comments/CommentTriggerButton';
import { HeatmapPitch } from './HeatmapPitch';
import { PlayerMedicalHistorySection } from './PlayerMedicalHistorySection';
import { PlayerCareerTimeline } from './PlayerCareerTimeline';
import { PlayerAIExecutiveReviewModal } from './PlayerAIExecutiveReviewModal';
import { PlayerPredictiveEngineView } from './PlayerPredictiveEngineView';
import { PlayerHeadshot } from '../common/PlayerHeadshot';

interface DigitalTwinCockpitViewProps {
  player: Player;
}

export const DigitalTwinCockpitView: React.FC<DigitalTwinCockpitViewProps> = ({ player }) => {
  const {
    players,
    playerTab,
    setPlayerTab,
    navigateTo,
    openMedicalModal,
    openDetectionModal,
    userRole
  } = useAMS();

  const cockpitData = getPlayerCockpitProfile(player);
  const detectionHistory = getPlayerDetectionHistory(player.id);

  // Active section for detailed modal view
  const [activeDetailSection, setActiveDetailSection] = useState<CockpitDetailSection | null>(null);

  // AI Executive Review modal state
  const [isAIReviewModalOpen, setIsAIReviewModalOpen] = useState(false);

  // Active milestone in the embedded parcours timeline
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<number>(detectionHistory.length - 1);

  // Clearance modal for medical records
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState<MedicalRecord | null>(null);
  const [isClearanceModalOpen, setIsClearanceModalOpen] = useState(false);
  const [unlockedRecords, setUnlockedRecords] = useState<string[]>([]);

  // Player selector dropdown
  const [isPlayerSelectorOpen, setIsPlayerSelectorOpen] = useState(false);

  // 8 Specific score boxes adapted for Players and Referees
  const isRef = Boolean(player.isReferee);
  const isAssistant = player.position === 'Arbitre Assistant';

  const scoreBoxes: Array<{
    id: CockpitDetailSection;
    name: string;
    score: number;
    trend: string;
    isPositive: boolean;
    icon: any;
  }> = [
    {
      id: 'charge',
      name: isRef ? 'Test FIFA SDS & Volume' : 'Charge & GPS',
      score: player.dimensions.entrainement.score,
      trend: '+3',
      isPositive: true,
      icon: Zap
    },
    {
      id: 'forme',
      name: isRef ? 'Note Observateurs' : 'Forme du moment',
      score: isRef && player.refereeStats?.noteObservateurs ? Math.round(player.refereeStats.noteObservateurs * 10) : Math.min(100, Math.round(player.dimensions.performance.score * 0.5 + player.dimensions.recuperation.score * 0.5 + 4)),
      trend: '+4',
      isPositive: true,
      icon: Activity
    },
    {
      id: 'recuperation',
      name: isRef ? 'Récupération & Sommeil' : 'Récupération',
      score: player.dimensions.recuperation.score,
      trend: '-1',
      isPositive: false,
      icon: Moon
    },
    {
      id: 'sante',
      name: isRef ? 'Santé & Suivi Tendons/Mollets' : 'Santé & Intégrité',
      score: player.dimensions.sante.score,
      trend: '+2',
      isPositive: true,
      icon: Heart
    },
    {
      id: 'physique',
      name: isRef ? (isAssistant ? 'Test ARIET & Vitesse Latérale' : 'Vitesse & VMA Arbitre') : 'Vitesse & Physique',
      score: player.dimensions.physique.score,
      trend: '+3',
      isPositive: true,
      icon: TrendingUp
    },
    {
      id: 'tactique',
      name: isRef ? (isAssistant ? 'Précision Hors-Jeu (98%)' : 'Précision Décisionnelle') : 'Efficacité Tactique',
      score: isRef ? (isAssistant ? 98 : 94) : 81,
      trend: isRef ? '+1' : '-2',
      isPositive: isRef,
      icon: Shield
    },
    {
      id: 'technique',
      name: isRef ? 'Validation Décisions VAR' : 'Maîtrise Technique',
      score: isRef && player.refereeStats?.decisionsVarConfirmeesPct ? Math.round(player.refereeStats.decisionsVarConfirmeesPct) : 87,
      trend: '+5',
      isPositive: true,
      icon: Crosshair
    },
    {
      id: 'mental',
      name: isRef ? 'Autorité & Calme Arbitral' : 'Résilience Mentale',
      score: isRef ? 92 : 85,
      trend: '+1',
      isPositive: true,
      icon: Flame
    }
  ];

  // Medical records for this player
  const playerMedicalRecords = COMPREHENSIVE_MEDICAL_RECORDS.filter(
    (r) => r.playerId === player.id || r.playerName.toLowerCase().includes(player.lastName.toLowerCase())
  ).slice(0, 3);

  const handleOpenMedicalRecord = (record: MedicalRecord) => {
    if (userRole === 'medical' || unlockedRecords.includes(record.id)) {
      openMedicalModal(player.id);
    } else {
      setSelectedMedicalRecord(record);
      setIsClearanceModalOpen(true);
    }
  };

  const handleClearanceAuthorized = () => {
    if (selectedMedicalRecord) {
      setUnlockedRecords((prev) => [...prev, selectedMedicalRecord.id]);
    }
    setIsClearanceModalOpen(false);
    openMedicalModal(player.id);
  };

  const currentMilestone = detectionHistory[selectedMilestoneIdx] || detectionHistory[0];

  return (
    <div className="space-y-3 font-sans text-slate-900 pb-10 w-full max-w-full overflow-x-hidden animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR: TOUT CE QUI EST DEMANDÉ AVEC EXPORT & NOTES DEDANS     */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-xs flex flex-wrap items-center justify-between gap-3 w-full">
        {/* Title & Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/fr/a/ab/Logo_F%C3%A9d%C3%A9ration_Fran%C3%A7aise_Football_2022.svg"
            alt="FFF"
            className="w-9 h-12 object-contain shrink-0"
            onError={(event) => { event.currentTarget.src = '/assets/ams360_emblem.jpg'; }}
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-sm font-bold text-slate-900">
                Jumeau Numérique
              </span>
              <span className="text-sm font-bold text-blue-900">
                {isRef ? 'Arbitre 360°' : 'Joueur 360°'}
              </span>
              <span className="text-xs font-medium text-slate-600">
                {player.name} #{player.number}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-500 font-medium">
              <span>{isRef ? 'Direction Technique de l’Arbitrage (DTA)' : 'Portail Haute Performance FFF'}</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                {isRef ? 'Monitoring Catapult & Tests FIFA' : 'Temps Réel Catapult'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions: Date, Switcher, Notes (Global Player only), Exporter */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:justify-end">
          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-slate-500 font-medium mr-1">
            <span>Mise à jour : <strong className="text-slate-800">28/09/2026</strong></span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          </div>

          {/* Quick Player Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsPlayerSelectorOpen(!isPlayerSelectorOpen)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <span className="truncate max-w-[120px]">{player.name}</span>
              <span className="font-mono text-blue-600 text-[10px]">#{player.number}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isPlayerSelectorOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2.5 z-50 text-xs">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400 px-2 py-1 border-b border-slate-100">
                  <span>{isRef ? '10 Arbitres FFF' : 'Effectif & Arbitres'}</span>
                  <span className="text-blue-600">{players.length} profils 360°</span>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-1 mt-1.5 divide-y divide-slate-100">
                  {/* Section Arbitres */}
                  <div className="pt-1">
                    <div className="text-[10px] font-bold text-amber-600 px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
                      <span>⚖️ 10 Arbitres Officiels</span>
                    </div>
                    {players.filter((p) => p.isReferee).map((ref) => (
                      <button
                        key={ref.id}
                        onClick={() => {
                          navigateTo('joueur_360', { playerId: ref.id });
                          setIsPlayerSelectorOpen(false);
                        }}
                        className={`w-full px-2 py-1.5 rounded-lg text-left flex items-center justify-between transition-colors cursor-pointer ${
                          ref.id === player.id
                            ? 'bg-amber-50 text-amber-950 font-bold border border-amber-200'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-5 h-5 rounded-md bg-amber-400 text-slate-950 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                            {ref.number}
                          </span>
                          <span className="truncate font-semibold">{ref.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 truncate shrink-0">
                          {ref.position === 'Arbitre Central' ? 'Central' : ref.position === 'Arbitre Assistant' ? 'Assistant' : 'VAR'}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Section Joueurs */}
                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-blue-600 px-2 py-0.5 uppercase tracking-wider">
                      ⚽ Joueurs de Sélection
                    </div>
                    {players.filter((p) => !p.isReferee).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          navigateTo('joueur_360', { playerId: p.id });
                          setIsPlayerSelectorOpen(false);
                        }}
                        className={`w-full px-2 py-1.5 rounded-lg text-left flex items-center justify-between transition-colors cursor-pointer ${
                          p.id === player.id
                            ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <PlayerHeadshot name={p.name} fallbackUrl={p.avatarUrl} className="w-5 h-5 rounded-md border border-slate-200" />
                          <span className="truncate font-semibold">{p.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 truncate shrink-0">{p.position}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Comment Button (Uniquement sur le joueur global comme demandé) */}
          <CommentTriggerButton
            targetId={player.id}
            targetType="player"
            targetTitle={player.name}
            variant="button"
            label="Notes"
          />

          {/* Export Report Button */}
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
            title="Exporter la fiche joueur 360°"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exporter</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BANDEAU FIN IA : REVUE GLOBALE & MOTEUR PRÉDICTIF 360° (IA MULTI-DATA)    */}
      {/* ========================================================================= */}
      <div className="bg-white px-4 py-3 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="min-w-0">
            <span className="text-sm font-bold text-blue-950">Analyse prédictive</span>
            <p className="text-xs text-slate-500">Simulations de match et comparaison des performances</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            onClick={() => setPlayerTab('predictif')}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulation</span>
          </button>

          <button
            onClick={() => setIsAIReviewModalOpen(true)}
            className="px-3 py-1.5 bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Rapport Écrit IA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BANDE DE SÉLECTION D'ONGLETS AU DESSUS (JUSTE EN DESSOUS DU HEADER)   */}
      {/* ========================================================================= */}
      <div className="bg-white px-2 rounded-lg border border-slate-200 flex items-center justify-between gap-2 overflow-x-auto w-full">
        <div className="flex items-center gap-1.5 shrink-0">
          {[
            { id: 'predictif', label: 'Moteur prédictif', isPrimary: true },
            { id: 'vue_ensemble', label: "Jumeau numérique 360°" },
            { id: 'heatmap', label: 'Analyse spatiale (Heat map)' },
            { id: 'matchs', label: 'Matchs' },
            { id: 'entrainements', label: 'Entraînements' },
            { id: 'charge', label: 'Charge & GPS' },
            { id: 'physique', label: 'Physique' },
            { id: 'sante', label: 'Santé & Médical' },
            { id: 'parcours', label: 'Parcours FFF & Détection' }
          ].map((tab) => {
            const isActive = playerTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setPlayerTab(tab.id)}
                className={`px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-blue-600 text-blue-900'
                    : 'border-transparent text-slate-500 hover:text-blue-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Quick Archive Modal Trigger on the right */}
        <button
          onClick={openDetectionModal}
          className="flex items-center gap-1.5 px-3 py-1.5 text-blue-900 hover:bg-blue-50 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer"
        >
          <Award className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Archive Détection FFF</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. CONTENU DYNAMIQUE CONDITIONNEL (SE MODIFIE SANS CHANGER DE PAGE !)     */}
      {/* ========================================================================= */}

      {/* SOUS-VUE PRÉDICTIVE PRINCIPALE : CŒUR DU DÉMONSTRATEUR */}
      {playerTab === 'predictif' && <PlayerPredictiveEngineView player={player} />}

      {/* SOUS-VUE A : JUMEAU NUMERIQUE 360° */}
      {playerTab === 'vue_ensemble' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          {/* LIGNE 1 : LE COCKPIT PRINCIPAL (4 COLONNES PARFAITEMENT ALIGNÉES) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3.5 items-stretch">
            {/* COLONNE 1 : IDENTITÉ + POTENTIEL + COURBES */}
            <div className="xl:col-span-3 flex flex-col justify-between gap-2.5">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-xs flex flex-col justify-between gap-2.5">
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="relative w-14 h-14 rounded-xl p-0.5 bg-gradient-to-br from-blue-600 to-indigo-800 shadow-xs shrink-0 overflow-hidden">
                      <PlayerHeadshot name={player.name} fallbackUrl={player.avatarUrl} className="w-full h-full rounded-[10px]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-black tracking-tight text-slate-900 uppercase truncate">
                        {player.name}
                      </h3>
                      <div className="text-xl font-black text-blue-700 font-mono tracking-tight leading-none mt-0.5">
                        #{player.number}
                      </div>
                      <div className="text-[10px] font-bold text-sky-600 tracking-wider uppercase mt-0.5">
                        {player.position}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-0.5 text-[11px] pt-1.5 border-t border-slate-100">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Âge</span>
                      <span className="text-slate-800 font-bold">{player.age} ans</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Nationalité</span>
                      <span className="text-slate-800 font-bold flex items-center gap-1">
                        <span>🇫🇷</span>
                        <span>Français</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Taille / Poids</span>
                      <span className="text-slate-800 font-bold">{player.height} • {player.weight}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>{isRef ? 'Disponibilité' : 'Pied fort'}</span>
                      <span className="text-slate-800 font-bold">
                        {isRef ? (player.status === 'disponible' ? 'Apte aux désignations' : 'Soins légers') : player.preferredFoot}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 pt-0.5 border-t border-slate-100">
                      <span className="uppercase text-[9px] font-bold tracking-wider text-slate-400">
                        {isRef ? 'Ligue Régionale' : 'Club'}
                      </span>
                      <span className="text-blue-700 font-extrabold truncate max-w-[140px]">{player.club}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="uppercase text-[9px] font-bold tracking-wider text-slate-400">
                        {isRef ? 'Grade / Écusson' : 'Niveau'}
                      </span>
                      <span className="text-slate-800 font-bold">
                        {isRef ? (player.refereeStats?.gradeLabel || 'FIFA Elite 2026') : 'France A / International'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="uppercase text-[9px] font-bold tracking-wider text-slate-400">
                        {isRef ? 'Test Physique FIFA' : 'Contrat'}
                      </span>
                      <span className="text-slate-800 font-mono font-bold">
                        {isRef ? (player.refereeStats?.testFifaStatus === 'valide' ? 'SDS Validé' : 'En attente') : '06/2026'}
                      </span>
                    </div>
                  </div>

                  {/* Flux opérationnel : Dernières mises à jour provenant du club & télémétrie */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] font-mono uppercase font-bold text-slate-400">
                      <span>{isRef ? 'Dernière synchro DTA / FIFA' : 'Dernières synchros Club'}</span>
                      <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Direct
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50/90 border border-slate-200/80 text-[10px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">{isRef ? 'Bilan DTA :' : 'Données Club :'}</span>
                        <span className="font-bold text-blue-700 truncate max-w-[130px]">
                          {isRef ? 'Fiche désignation reçue' : 'Rapport GPS reçu il y a 3h'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Télémétrie FFF :</span>
                        <span className="font-bold text-slate-800 font-mono">
                          {isRef ? 'GPS Catapult 10Hz' : 'Vector S7 (#14) • Polar'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Suivi Biologique :</span>
                        <span className="font-bold text-emerald-700">Passeport conforme</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      Progression Potentielle
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-lg font-black text-slate-900">84%</span>
                      <span className="text-[10px] font-bold text-emerald-600">Potentiel élevé</span>
                    </div>
                  </div>

                  <div className="w-20 h-6">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                      <path
                        d="M 0,26 Q 25,24 50,14 T 100,4"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="100" cy="4" r="3" fill="#059669" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>

            {/* COLONNE CENTRALE : MODÈLE BIOMÉCANIQUE 360° ET 8 INDICATEURS COMPACTS CONNECTÉS */}
            <div className="xl:col-span-6 flex flex-col justify-between">
              <PlayerAnatomy360View
                player={player}
                onSelectSection={(sec) => setActiveDetailSection(sec)}
                isRef={isRef}
                isAssistant={isAssistant}
              />
            </div>

            {/* COLONNE 4 : ACTUALITÉS EN HAUT, RADAR PROFIL EN BAS */}
            <div className="xl:col-span-3 flex flex-col justify-between gap-2.5">
              {/* Actualités & Veille en haut */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-xs space-y-2 h-[225px] flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 shrink-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800 truncate">
                      {isRef ? 'Actualités & Veille DTA' : 'Actualités & Veille'}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    {isRef ? 'Désigné' : 'Apte 100%'}
                  </span>
                </div>

                <div className="space-y-1.5 flex-1 min-h-0 overflow-y-auto pr-0.5">
                  <div className="p-2 rounded-xl bg-rose-50/70 border border-rose-200/80 text-xs shadow-2xs">
                    <div className="flex items-center justify-between text-[10px] text-rose-900 font-bold mb-0.5">
                      <span className="flex items-center gap-1">
                        <Stethoscope className="w-3 h-3 text-rose-600" />
                        <span>Dr. Franck Le Gall</span>
                      </span>
                      <button
                        onClick={() => {
                          if (playerMedicalRecords[0]) {
                            handleOpenMedicalRecord(playerMedicalRecords[0]);
                          } else {
                            openMedicalModal(player.id);
                          }
                        }}
                        className="text-[9px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-0.5 cursor-pointer bg-white px-1.5 py-0.2 rounded border border-rose-200"
                      >
                        <span>Consulter</span>
                        <Lock className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-700 leading-tight">
                      {isRef
                        ? 'Bilan cardiologique annuel FIFA et échographie soléaire validés sans restriction.'
                        : 'Échographie négative. Reprise complète haute intensité autorisée.'}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs shadow-2xs">
                    <div className="flex items-center justify-between text-[10px] text-blue-900 font-bold mb-0.5">
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-blue-600" />
                        <span>{isRef ? 'Antony Gautier (DTA)' : 'Zinédine Zidane'}</span>
                      </span>
                      <span className="text-[9px] font-mono text-blue-700 bg-white px-1.5 py-0.2 rounded border border-blue-200">
                        {isRef ? 'Désignation' : 'Sélection'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-700 leading-tight">
                      {isRef
                        ? 'Désignation officielle confirmée pour la rencontre de haut niveau (UEFA / Ligue 1).'
                        : 'Temps de jeu régulé (60-75 min) pour préserver la fraîcheur en match 2.'}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs shadow-2xs">
                    <div className="flex items-center justify-between text-[10px] text-amber-900 font-bold mb-0.5">
                      <span className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-amber-600" />
                        <span>Alexandre Germain</span>
                      </span>
                      <span className="text-[9px] font-mono text-amber-700 bg-white px-1.5 py-0.2 rounded border border-amber-200">
                        {isRef ? 'Test FIFA SDS' : 'ACWR 1.05'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-700 leading-tight">
                      {isRef
                        ? 'Test intermittent FIFA SDS réussi. Distance moyenne de 11.8 km/match enregistrée.'
                        : 'Sprint max à 34.6 km/h. Profil d\'explosivité validé.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profil & Radar Évolutif */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 shadow-xs h-[258px] flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-100 shrink-0">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800 truncate">
                    Profil & Évolution
                  </span>
                  <span className="text-[9px] font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.2 rounded border border-blue-200 shrink-0">
                    6 Axes
                  </span>
                </div>

                <div className="flex-1 w-full overflow-hidden flex items-center justify-center py-0.5">
                  <CockpitRadarChart axes={cockpitData.radarAxes} playerName={player.name} compact={true} />
                </div>

                <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-500 pt-1 border-t border-slate-100 shrink-0">
                  <span className="text-amber-700 font-bold">Ancien (M-1): {Math.max(40, player.scoreGlobal - (player.scoreEvolution || 8))}/100</span>
                  <span className="text-blue-700 font-bold">Actuel (S39): {player.scoreGlobal}/100</span>
                  <span className="text-emerald-700 font-extrabold">Δ {player.scoreEvolution >= 0 ? `+${player.scoreEvolution}` : player.scoreEvolution} pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* LIGNE 2 : PARCOURS FFF DEPUIS SA DÉTECTION + FICHES MÉDICALES RÉCENTES */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-stretch">
            {/* A. PARCOURS AU SEIN DE LA FFF */}
            <div className="xl:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Parcours au sein de la FFF (depuis sa détection)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Trajectoire d'élite : Détection U13, INF Clairefontaine, Sélections jeunes, Espoirs et France A
                  </p>
                </div>

                <button
                  onClick={openDetectionModal}
                  className="text-[10px] font-mono text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 font-bold transition-colors cursor-pointer shrink-0"
                >
                  Historique complet →
                </button>
              </div>

              {/* Timeline Milestones Pills */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {detectionHistory.map((milestone, idx) => {
                  const isSelected = idx === selectedMilestoneIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedMilestoneIdx(idx)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-blue-50/60 border-slate-200/80 text-slate-700'
                      }`}
                    >
                      <span className={`block font-mono text-[10px] font-black ${isSelected ? 'text-white' : 'text-blue-700'}`}>
                        {milestone.year.split(' ')[0]}
                      </span>
                      <span className="block text-[9px] font-bold truncate">
                        {milestone.category}
                      </span>
                      <span className={`block text-[8px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {milestone.age}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Milestone Card */}
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200/60 pb-1.5">
                  <div>
                    <span className="text-[10px] font-mono text-blue-700 font-extrabold uppercase">
                      {currentMilestone.year} ({currentMilestone.age}) • {currentMilestone.structure}
                    </span>
                    <h5 className="text-xs font-black text-slate-900 mt-0.5">
                      {currentMilestone.stageTitle}
                    </h5>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                    {currentMilestone.verdict}
                  </span>
                </div>

                <p className="text-[11px] text-slate-700 leading-snug italic font-serif">
                  « {currentMilestone.scoutReport} »
                </p>

                <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-200/60 text-center">
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/80">
                    <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">VMA</span>
                    <span className="text-[11px] font-black text-blue-700 font-mono">
                      {currentMilestone.physicalBenchmarks.vma || '—'}
                    </span>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/80">
                    <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">30m</span>
                    <span className="text-[11px] font-black text-blue-700 font-mono">
                      {currentMilestone.physicalBenchmarks.vitesse30m || '—'}
                    </span>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/80">
                    <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">Vmax</span>
                    <span className="text-[11px] font-black text-blue-700 font-mono">
                      {currentMilestone.physicalBenchmarks.vitesseMax || '—'}
                    </span>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/80">
                    <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">HRR</span>
                    <span className="text-[11px] font-black text-emerald-700 font-mono">
                      {currentMilestone.physicalBenchmarks.indiceHRR || '—'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                  <span>Évaluateur : <strong>{currentMilestone.keyEvaluator}</strong> ({currentMilestone.evaluatorRole})</span>
                  <span className="font-mono text-emerald-700 font-bold">{currentMilestone.keyStats}</span>
                </div>
              </div>
            </div>

            {/* B. FICHES MÉDICALES RÉCENTES */}
            <div className="xl:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-rose-600" />
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Fiches Médicales & Bilans Récents
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Actes cliniques sous secret médical FFF
                  </p>
                </div>
                <button
                  onClick={() => setPlayerTab('sante')}
                  className="text-[10px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Voir tout →
                </button>
              </div>

              <div className="space-y-2 flex-1">
                {playerMedicalRecords.length > 0 ? (
                  playerMedicalRecords.map((rec) => (
                    <div
                      key={rec.id}
                      onClick={() => handleOpenMedicalRecord(rec)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-400 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-500 font-bold">{rec.date}</span>
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                            {rec.aptitudeStatus}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors truncate mt-0.5">
                          {rec.title}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {rec.practitionerName} ({rec.practitionerRole})
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1 shrink-0">
                        <span>Consulter</span>
                        <Lock className="w-3 h-3 text-slate-400" />
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400 font-medium">
                    Aucune alerte médicale active pour {player.name}.
                  </div>
                )}
              </div>

              <button
                onClick={() => setPlayerTab('sante')}
                className="w-full py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <span>Accéder au Dossier Médical Complet FFF</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOUS-VUE B : ANALYSE SPATIALE / HEAT MAP (DIRECTEMENT SOUS LES ONGLETS SANS CHANGER DE PAGE) */}
      {playerTab === 'heatmap' && <HeatmapPitch player={player} />}

      {/* SOUS-VUE C : MATCHS / DÉSIGNATIONS (DIRECTEMENT SOUS LES ONGLETS SANS CHANGER DE PAGE) */}
      {playerTab === 'matchs' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {isRef ? `Désignations & Matchs arbitrés par ${player.name}` : `Matchs disputés par ${player.name}`}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {isRef
                  ? 'Historique des rencontres dirigées, notes des observateurs UEFA / FFF et validation VAR.'
                  : 'Temps de jeu, statistiques individuelles et notes de match en sélection FFF.'}
              </p>
            </div>
            <button
              onClick={() => navigateTo('matchs_entrainements')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>{isRef ? 'Calendrier des désignations' : 'Voir tout le calendrier'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-blue-700 font-bold bg-white px-2 py-0.5 rounded border border-blue-200">
                  Ligue des Nations UEFA • 28/09/2026
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  France vs Espagne (Stade de France)
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-600 mt-1 font-medium">
                  <span>Rôle : <strong className="text-slate-900">{player.position}</strong></span>
                  <span>•</span>
                  <span>Distance : <strong className="text-slate-900">{isRef ? (player.position === 'Arbitre Assistant' ? '7.8 km' : '11.8 km') : '10.4 km'}</strong></span>
                  <span>•</span>
                  <span>Note Observateur : <strong className="text-blue-700 font-bold">{player.refereeStats?.noteObservateurs || '8.7'}/10</strong></span>
                </div>
              </div>
              <button
                onClick={() => navigateTo('detail_match', { matchId: 'match-1' })}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer shrink-0"
              >
                Fiche détaillée du match
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOUS-VUE D : ENTRAINEMENTS (DIRECTEMENT SOUS LES ONGLETS SANS CHANGER DE PAGE) */}
      {playerTab === 'entrainements' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {isRef ? `Séances de préparation & Tests de ${player.name}` : `Séances d'entraînement de ${player.name}`}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {isRef
                  ? 'Tests intermittents FIFA SDS / ARIET, vitesse de démarcation, séances vidéo VAR et récupération.'
                  : 'Volume, intensité, ateliers et charge ressentie (RPE).'}
              </p>
            </div>
            <button
              onClick={() => navigateTo('matchs_entrainements')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Centre de préparation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-slate-500 font-bold">Hier à 16:30 • Pôle Arbitrage Clairefontaine</span>
              <h3 className="text-base font-black text-slate-900 mt-1">
                {isRef ? (player.position === 'Arbitre Assistant' ? 'Atelier Spécifique Ligne de Touche & Test ARIET' : 'Test Intermittent FIFA SDS & Courses Diagonales') : 'Séance Vitesse, Percussions & Transitions J-2'}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {isRef
                  ? 'Charge Catapult : 520 UA • Vitesse max 29.8 km/h • RPE ressenti : 6.5/10'
                  : 'Charge individuelle : 640 UA • 14 sprints > 25 km/h • RPE : 7/10'}
              </p>
            </div>
            <button
              onClick={() => navigateTo('detail_training', { trainingId: 'train-1' })}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer shrink-0"
            >
              Rapport de séance
            </button>
          </div>
        </div>
      )}

      {/* SOUS-VUE E : CHARGE & GPS (DIRECTEMENT SOUS LES ONGLETS SANS CHANGER DE PAGE) */}
      {playerTab === 'charge' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              {isRef ? 'Monitoring de Charge Arbitrale & Données GPS Catapult' : 'Monitoring de Charge & Données GPS Catapult'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Mesures capteurs Catapult Vector 10 Hz et ratio Acute:Chronic Workload Ratio (ACWR).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block">Indice de charge 7 jours</span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {player.dimensions.entrainement.score}/100
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Durée totale : {player.dimensions.entrainement.dureeTotale} sur {player.dimensions.entrainement.seances} séances
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block">Ratio ACWR (Aigu/Chronique)</span>
              <span className="text-2xl font-black text-emerald-600 font-mono">1.09</span>
              <p className="text-[11px] text-emerald-700 mt-1">Zone optimale sans risque de surmenage</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block">Distance totale semaine</span>
              <span className="text-2xl font-black text-blue-600 font-mono">
                {player.dimensions.entrainement.distance} km
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                {isRef ? 'Dont 1 940 m à haute intensité (>20 km/h)' : 'Dont 1 240 m à très haute intensité (> 21 km/h)'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SOUS-VUE F : PHYSIQUE & BENCHMARKS (DIRECTEMENT SOUS LES ONGLETS SANS CHANGER DE PAGE) */}
      {playerTab === 'physique' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              {isRef ? 'Profil Athlétique & Tests Réglementaires FIFA' : 'Profil Physique & Vitesse Maximale'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {isRef
                ? 'Épreuves standardisées FIFA (SDS, Yo-Yo, ARIET pour assistants) et sprint 40 mètres.'
                : 'Tests physiques standardisés FFF et comparatif avec la médiane des internationaux A.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block">Vitesse maximale GPS</span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {player.dimensions.physique.vitesseMax} km/h
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Pic atteint lors des tests officiels FFF/UEFA</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block">{isRef ? (player.position === 'Arbitre Assistant' ? 'Test ARIET' : 'Test SDS FIFA') : 'Puissance maximale'}</span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {isRef ? (player.position === 'Arbitre Assistant' ? '17.8 km/h' : 'Palier 20.4') : `${player.dimensions.physique.puissanceMax} m/s²`}
              </span>
              <p className="text-[11px] text-emerald-700 mt-1 font-semibold">{isRef ? 'Seuil FIFA Elite validé' : 'Accélération sur les premiers appuis'}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block">{isRef ? 'Sprint 40 mètres' : 'Sprint 10 mètres'}</span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {isRef ? '5.38 s' : `${player.dimensions.physique.temps10m} s`}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Cellules photoélectriques Clairefontaine</p>
            </div>
          </div>
        </div>
      )}

      {/* SOUS-VUE G : SANTE & DOSSIER MEDICAL (DIRECTEMENT SOUS LES ONGLETS SANS CHANGER DE PAGE) */}
      {playerTab === 'sante' && <PlayerMedicalHistorySection player={player} />}

      {/* SOUS-VUE H : PARCOURS FFF & CARRIÈRE (DIRECTEMENT SOUS LES ONGLETS SANS CHANGER DE PAGE) */}
      {playerTab === 'parcours' && <PlayerCareerTimeline player={player} />}

      {/* ========================================================================= */}
      {/* 4. FOOTER SECURISE FFF                                                    */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-2xs font-medium">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Sources : Matchs • Entraînements • Tests physiologiques • Capteurs Catapult 10 Hz</span>
        </div>

        <div className="text-slate-500 font-mono text-[10px]">
          Jumeau numérique alimenté par l'AMS 360 FFF
        </div>

        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[10px]">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>Données sécurisées FFF</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MODAL INTERACTIF DÉTAILLÉ DE SECTION (AU CLIC SUR LES 8 BOXES)         */}
      {/* ========================================================================= */}
      {activeDetailSection && (
        <CockpitSectionDetailModal
          player={player}
          activeSection={activeDetailSection}
          onClose={() => setActiveDetailSection(null)}
          onSelectSection={(sec) => setActiveDetailSection(sec)}
        />
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL DE CONFIDENTIALITÉ MÉDICALE AVEC CODE PIN OU DEMANDE D'ACCÈS     */}
      {/* ========================================================================= */}
      <MedicalAuthClearanceModal
        record={selectedMedicalRecord}
        isOpen={isClearanceModalOpen}
        onClose={() => setIsClearanceModalOpen(false)}
        onAuthorized={handleClearanceAuthorized}
      />

      {/* ========================================================================= */}
      {/* 7. MODAL DE RAPPORT EXÉCUTIF IA 360° & QUESTIONNEMENT LANGAGE NATUREL      */}
      {/* ========================================================================= */}
      <PlayerAIExecutiveReviewModal
        player={player}
        isOpen={isAIReviewModalOpen}
        onClose={() => setIsAIReviewModalOpen(false)}
      />
    </div>
  );
};
