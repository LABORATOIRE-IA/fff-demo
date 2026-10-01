import React, { useState, useMemo } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  Stethoscope,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Activity,
  FileText,
  Apple,
  Eye,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';
import { COMPREHENSIVE_MEDICAL_RECORDS } from '../../data/medicalRecordsData';
import { MedicalRecord, MedicalSpecialty, MedicalUrgency } from '../../types/ams';
import { MedicalDetailModal } from './MedicalDetailModal';
import { MedicalAuthClearanceModal } from './MedicalAuthClearanceModal';
import { DataActionBar } from '../layout/DataActionBar';

export const SuiviMedicalView: React.FC = () => {
  const { navigateTo, selectedTeam, userRole } = useAMS();

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [targetGroup, setTargetGroup] = useState<'tous' | 'joueurs' | 'arbitres'>('tous');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Tous');
  const [selectedPlayer, setSelectedPlayer] = useState<string>('Tous');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('Tous');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'player_asc' | 'urgency'>('date_desc');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Modal State & Access Control
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isClearanceModalOpen, setIsClearanceModalOpen] = useState(false);
  const [unlockedRecordIds, setUnlockedRecordIds] = useState<string[]>([]);

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

  // Distinct players from records for filter
  const playerOptions = useMemo(() => {
    const map = new Map<string, string>();
    COMPREHENSIVE_MEDICAL_RECORDS.forEach((r) => map.set(r.playerId, r.playerName));
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  // Filtered & Sorted Records
  const filteredRecords = useMemo(() => {
    return COMPREHENSIVE_MEDICAL_RECORDS.filter((r) => {
      // Target group: tous / joueurs / arbitres
      const isRef = r.playerId.startsWith('ref-') || r.playerPosition.toLowerCase().includes('arbitre');
      if (targetGroup === 'joueurs' && isRef) return false;
      if (targetGroup === 'arbitres' && !isRef) return false;

      // Search text
      const matchesSearch =
        r.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.motif.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.practitionerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.playerClub.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.conclusions.synthese.toLowerCase().includes(searchQuery.toLowerCase());

      // Specialty filter
      const matchesSpecialty =
        selectedSpecialty === 'Tous' ||
        (selectedSpecialty === 'Médecin' && r.specialty === 'medecin') ||
        (selectedSpecialty === 'Kinésithérapeute' && r.specialty === 'kine') ||
        (selectedSpecialty === 'Nutritionniste' && r.specialty === 'nutritionniste') ||
        (selectedSpecialty === 'Ostéopathe' && r.specialty === 'osteopathe') ||
        (selectedSpecialty === 'Podologue' && r.specialty === 'podologue') ||
        (selectedSpecialty === 'Réathlétisation' && r.specialty === 'reathletisation');

      // Player filter
      const matchesPlayer = selectedPlayer === 'Tous' || r.playerId === selectedPlayer;

      // Urgency filter
      const matchesUrgency =
        selectedUrgency === 'Tous' ||
        (selectedUrgency === 'Alertes' && (r.urgency === 'a_surveiller' || r.urgency === 'prioritaire')) ||
        (selectedUrgency === 'Normal' && r.urgency === 'normal') ||
        (selectedUrgency === 'Apte 100%' && r.aptitudeStatus === 'Apte 100%') ||
        (selectedUrgency === 'Aménagé' && r.aptitudeStatus === 'Apte aménagé');

      return matchesSearch && matchesSpecialty && matchesPlayer && matchesUrgency;
    }).sort((a, b) => {
      if (sortBy === 'date_desc') {
        return `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`);
      }
      if (sortBy === 'date_asc') {
        return `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);
      }
      if (sortBy === 'player_asc') {
        return a.playerName.localeCompare(b.playerName);
      }
      if (sortBy === 'urgency') {
        const order: Record<MedicalUrgency, number> = { prioritaire: 1, inapte: 2, a_surveiller: 3, normal: 4 };
        return order[a.urgency] - order[b.urgency];
      }
      return 0;
    });
  }, [searchQuery, targetGroup, selectedSpecialty, selectedPlayer, selectedUrgency, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = COMPREHENSIVE_MEDICAL_RECORDS.length;
    const medecinCount = COMPREHENSIVE_MEDICAL_RECORDS.filter((r) => r.specialty === 'medecin').length;
    const kineCount = COMPREHENSIVE_MEDICAL_RECORDS.filter(
      (r) => r.specialty === 'kine' || r.specialty === 'osteopathe'
    ).length;
    const nutritionCount = COMPREHENSIVE_MEDICAL_RECORDS.filter((r) => r.specialty === 'nutritionniste').length;
    const alertCount = COMPREHENSIVE_MEDICAL_RECORDS.filter((r) => r.urgency === 'a_surveiller' || r.urgency === 'prioritaire').length;

    return { total, medecinCount, kineCount, nutritionCount, alertCount };
  }, []);

  const getSpecialtyBadge = (spec: MedicalSpecialty) => {
    switch (spec) {
      case 'medecin':
        return { label: 'Médecin Fédéral', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'kine':
        return { label: 'Kiné & Soins', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'nutritionniste':
        return { label: 'Nutrition & Physio', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'osteopathe':
        return { label: 'Ostéopathie', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'podologue':
        return { label: 'Podologie', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'reathletisation':
        return { label: 'Réathlétisation', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
  };

  const getUrgencyBadge = (urg: MedicalUrgency) => {
    switch (urg) {
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Normal</span>
          </span>
        );
      case 'a_surveiller':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>À surveiller</span>
          </span>
        );
      case 'prioritaire':
      case 'inapte':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Prioritaire</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-slate-900 pb-12">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER INSTITUTIONNEL MÉDICAL                                      */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 flex items-center gap-1">
              <Stethoscope className="w-3 h-3" />
              <span>Pôle Médical & Soins FFF</span>
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              {selectedTeam?.name || 'France A'} • Rassemblement Actif
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3 h-3" />
              <span>Secret Médical & RGPD</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Suivi Médical des Joueurs</span>
            <span className="text-amber-400 text-lg">★★</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl leading-relaxed">
            Centralisation des bilans cliniques, soins de kinésithérapie, bilans nutritionnels,
            examens d’imagerie et protocoles de reprise progressive pour l’ensemble des 24 sélectionnés.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <DataActionBar
            scope="medical"
            customImportLabel="Importer"
            customExportLabel="Exporter Bilan"
          />

          <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 text-left shrink-0">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-blue-700 block">
              Médecin Coordinateur
            </span>
            <span className="text-xs font-black text-slate-900 block mt-0.5">
              Dr. Franck Le Gall
            </span>
            <span className="text-[10px] text-slate-500">Validation fédérale continue</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. KPI SUMMARY CARDS                                                      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Suivis</span>
            <Activity className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{stats.total}</div>
          <span className="text-[10px] text-slate-500 font-medium">Fiches enregistrées</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Médecin</span>
            <Stethoscope className="w-3.5 h-3.5 text-blue-700" />
          </div>
          <div className="text-2xl font-black text-blue-700 font-mono">{stats.medecinCount}</div>
          <span className="text-[10px] text-slate-500 font-medium">Consultations & Écho</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Kiné & Ostéo</span>
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">{stats.kineCount}</div>
          <span className="text-[10px] text-slate-500 font-medium">Soins & Thérapie manuelle</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Nutrition</span>
            <Apple className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700 font-mono">{stats.nutritionCount}</div>
          <span className="text-[10px] text-slate-500 font-medium">DXA & Hydratation</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Surveillance</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono">{stats.alertCount}</div>
          <span className="text-[10px] text-slate-500 font-medium">Joueurs suivis de près</span>
        </div>
      </div>

      {/* Group Toggle: Tous / Joueurs / Arbitres */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl w-fit">
        <button
          onClick={() => setTargetGroup('tous')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            targetGroup === 'tous'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Tous les Dossiers ({COMPREHENSIVE_MEDICAL_RECORDS.length})
        </button>
        <button
          onClick={() => setTargetGroup('joueurs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            targetGroup === 'joueurs'
              ? 'bg-white text-blue-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Joueurs Équipe de France ({COMPREHENSIVE_MEDICAL_RECORDS.filter(r => !r.playerId.startsWith('ref-') && !r.playerPosition.includes('Arbitre')).length})
        </button>
        <button
          onClick={() => setTargetGroup('arbitres')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            targetGroup === 'arbitres'
              ? 'bg-white text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Corps Arbitral FFF ({COMPREHENSIVE_MEDICAL_RECORDS.filter(r => r.playerId.startsWith('ref-') || r.playerPosition.includes('Arbitre')).length})
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. FILTRES, RECHERCHE & CLASSEMENT DES FICHES                             */}
      {/* ========================================================================= */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-3.5">
        {/* Ligne 1 : Barre de recherche + Sélecteur de Tri + Mode de vue */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par joueur, motif, examen, médecin, kiné ou conclusion..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white text-slate-900 transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Trier par */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] uppercase font-mono text-slate-400">Trier :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-xs text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="date_desc">Date (Récente d'abord)</option>
                <option value="date_asc">Date (Ancienne d'abord)</option>
                <option value="player_asc">Joueur (A-Z)</option>
                <option value="urgency">Priorité & Alertes d'abord</option>
              </select>
            </div>

            {/* Toggle Table / Cartes */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shrink-0">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Vue Tableau"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'cards' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Vue Cartes"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Ligne 2 : Filtres rapides par Spécialité */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mr-1">
              Spécialité :
            </span>
            {[
              'Tous',
              'Médecin',
              'Kinésithérapeute',
              'Nutritionniste',
              'Ostéopathe',
              'Podologue',
              'Réathlétisation'
            ].map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSpecialty === spec
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Filtres Joueur & Statut */}
          <div className="flex items-center gap-2">
            {/* Select Joueur */}
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Tous">Tous les joueurs</option>
              {playerOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Select Gravité */}
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Tous">Tous les statuts</option>
              <option value="Alertes">À surveiller / Alertes</option>
              <option value="Normal">Normal</option>
              <option value="Apte 100%">Apte 100%</option>
              <option value="Aménagé">Apte aménagé</option>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. LISTE OU CARTES DES FICHES MÉDICALES                                   */}
      {/* ========================================================================= */}
      {viewMode === 'table' ? (
        /* VUE TABLEAU */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {filteredRecords.length} fiche(s) médicale(s) trouvée(s)
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Cliquez sur une fiche pour voir les examens et conclusions détaillés
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Date & Heure</th>
                  <th className="py-3 px-4">Joueur</th>
                  <th className="py-3 px-4">Spécialité & Praticien</th>
                  <th className="py-3 px-4">Acte / Examen Médical</th>
                  <th className="py-3 px-4">Statut d'aptitude</th>
                  <th className="py-3 px-4">Niveau</th>
                  <th className="py-3 px-4 text-right">Détails</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record) => {
                  const specBadge = getSpecialtyBadge(record.specialty);
                  const isUnlocked = isUserMedical || unlockedRecordIds.includes(record.id);

                  return (
                    <tr
                      key={record.id}
                      onClick={() => handleRecordClick(record)}
                      className="hover:bg-blue-50/60 cursor-pointer transition-colors group"
                    >
                      {/* Date & Heure */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{record.date}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{record.time}</div>
                      </td>

                      {/* Joueur */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                              record.playerPosition === 'Gardien'
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-blue-700 text-white'
                            }`}
                          >
                            {record.playerNumber}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors block">
                              {record.playerName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {record.playerPosition} • {record.playerClub}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Spécialité & Praticien */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border mb-1 ${specBadge.color}`}>
                          {specBadge.label}
                        </span>
                        <div className="text-[11px] font-semibold text-slate-700">
                          {record.practitionerName}
                        </div>
                      </td>

                      {/* Acte / Titre */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                          {record.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {record.motif}
                        </div>
                      </td>

                      {/* Statut d'aptitude */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80">
                          {record.aptitudeStatus}
                        </span>
                      </td>

                      {/* Gravité */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getUrgencyBadge(record.urgency)}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRecordClick(record);
                          }}
                          className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1 ${
                            isUnlocked
                              ? 'bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <span>{isUnlocked ? 'Consulter' : 'Code Requis'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VUE CARTES */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecords.map((record) => {
            const specBadge = getSpecialtyBadge(record.specialty);
            const isUnlocked = isUserMedical || unlockedRecordIds.includes(record.id);

            return (
              <div
                key={record.id}
                onClick={() => handleRecordClick(record)}
                className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top card header */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${specBadge.color}`}>
                      {specBadge.label}
                    </span>
                    {getUrgencyBadge(record.urgency)}
                  </div>

                  {/* Player header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        record.playerPosition === 'Gardien'
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-blue-700 text-white'
                      }`}
                    >
                      {record.playerNumber}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors text-sm">
                        {record.playerName}
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        {record.playerPosition} • {record.playerClub}
                      </p>
                    </div>
                  </div>

                  {/* Title & Motif */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs line-clamp-1">
                      {record.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-2 mt-1">
                      {record.motif}
                    </p>
                  </div>

                  {/* Conclusions excerpt */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-[11px] text-slate-700">
                    <strong className="text-slate-900 block text-[10px] uppercase tracking-wider mb-0.5">
                      Conclusion médicale :
                    </strong>
                    <p className="line-clamp-2">{record.conclusions.synthese}</p>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{record.practitionerName}</span>
                  <span className="font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    {isUnlocked ? 'Voir détails →' : 'Accès Restreint 🔒'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL DE DÉTAIL COMPLET DE LA FICHE MÉDICALE                           */}
      {/* ========================================================================= */}
      {isDetailModalOpen && (
        <MedicalDetailModal
          record={selectedRecord}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedRecord(null);
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL DE DEMANDE D'ACCÈS / CODE D'HABILITATION (SECRET MÉDICAL)        */}
      {/* ========================================================================= */}
      <MedicalAuthClearanceModal
        record={selectedRecord}
        isOpen={isClearanceModalOpen}
        onClose={() => {
          setIsClearanceModalOpen(false);
          setSelectedRecord(null);
        }}
        onAuthorized={handleAuthorized}
      />
    </div>
  );
};
