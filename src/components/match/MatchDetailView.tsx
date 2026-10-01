import React, { useState, useMemo } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  TrendingUp,
  Activity,
  Users,
  ChevronRight,
  Shield,
  Zap,
  Gauge,
  Award,
  ArrowRight,
  User,
  X,
  Target,
  Crosshair
} from 'lucide-react';
import { MatchPlayerStat, Match } from '../../types/ams';
import { MatchPlayerDrawer } from './MatchPlayerDrawer';
import { DataActionBar } from '../layout/DataActionBar';

export const MatchDetailView: React.FC = () => {
  const {
    selectedMatch,
    goBack,
    navigateTo,
    players,
    matches
  } = useAMS();

  // Bulletproof fallback to ensure no crash if selectedMatch is undefined
  const match: Match = selectedMatch || matches[0];

  // Active player selected for inspector (pitch highlight + lateral panel / drawer)
  const [selectedPlayerStat, setSelectedPlayerStat] = useState<MatchPlayerStat | null>(null);
  // Drawer open state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  // Lineup deployed state (default to true so the 11 starters are automatically deployed on load)
  const [isLineupDeployed, setIsLineupDeployed] = useState<boolean>(true);
  // Selected formation
  const [selectedFormation, setSelectedFormation] = useState<string>('4-3-3');
  // Active tab for secondary analysis below
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'timeline' | 'heatmaps' | 'xg' | 'physique'>('timeline');

  const getPlayerDetails = (playerId: string) => {
    return players.find((p) => p.id === playerId);
  };

  // Helper to retrieve match events for a given player
  const getPlayerMatchEvents = (playerId: string) => {
    if (!match?.events) return { goals: 0, yellow: false, assists: 0, count: 0 };
    const playerEvents = match.events.filter((e) => e.playerId === playerId);
    const goals = playerEvents.filter((e) => e.type === 'goal').length;
    const yellow = playerEvents.some((e) => e.type === 'yellow');
    return { goals, yellow, count: playerEvents.length };
  };

  const handleSelectPlayer = (stat: MatchPlayerStat, openFullDrawer = false) => {
    setSelectedPlayerStat(stat);
    if (openFullDrawer) {
      setIsDrawerOpen(true);
    }
  };

  // Currently inspected player profile
  const [is3DMode, setIs3DMode] = useState(false);
  const [showPassLinks, setShowPassLinks] = useState(true);

  const inspectedPlayer = useMemo(() => {
    if (!selectedPlayerStat) return null;
    return getPlayerDetails(selectedPlayerStat.playerId);
  }, [selectedPlayerStat, players]);

  if (!match) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
        <p className="text-sm font-semibold text-slate-700">Aucun match sélectionné.</p>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Retour au calendrier
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-slate-900 pb-12">
      {/* ========================================================================= */}
      {/* 1. HEADER MATCH : FRANCE 3 - 1 PAYS-BAS, METADATA, SCORE VISUEL & CONTEXTE */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        {/* Navigation & Match context switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="font-bold text-slate-900">Analyse de match FFF</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-700 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{match.date}</span>
            </span>
            <span>•</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
              {match.competition} {match.phase ? `— ${match.phase}` : ''}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{match.stadium}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <DataActionBar
              scope="match"
              customImportLabel="Importer"
              customExportLabel="Exporter Rapport"
            />

            <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-xl border border-emerald-300 shrink-0">
              {match.statusLabel || 'Terminé'}
            </span>

            {/* Quick Match Switcher */}
            <select
              value={match.id}
              onChange={(e) => navigateTo('detail_match', { matchId: e.target.value })}
              className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shrink-0"
            >
              {matches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.homeTeam} {m.homeScore}-{m.awayScore} {m.awayTeam}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grand Score Visuel avec drapeaux & typographie FFF */}
        <div className="flex items-center justify-center gap-4 sm:gap-10 py-2">
          {/* Home Team : France */}
          <div className="flex items-center gap-3 text-right justify-end flex-1">
            <span className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {match.homeTeam}
            </span>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center font-black text-sm shadow-sm border border-blue-600/40 shrink-0">
              {match.homeFlag || '🇫🇷'}
            </div>
          </div>

          {/* Scores Pill */}
          <div className="px-6 sm:px-8 py-3 rounded-2xl bg-slate-950 text-white font-mono font-black text-3xl sm:text-4xl tracking-widest shadow-md border border-slate-800 flex items-center gap-3">
            <span>{match.homeScore}</span>
            <span className="text-slate-500 text-2xl font-light">—</span>
            <span>{match.awayScore}</span>
          </div>

          {/* Away Team : Adversaire */}
          <div className="flex items-center gap-3 text-left justify-start flex-1">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white flex items-center justify-center font-black text-sm shadow-sm border border-orange-400/40 shrink-0">
              {match.awayFlag || '🇳🇱'}
            </div>
            <span className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {match.awayTeam}
            </span>
          </div>
        </div>

        {/* Principaux événements résumé en bande continue */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs py-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Faits marquants :
          </span>
          <div className="flex items-center gap-2">
            {match.events.map((evt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (evt.playerId) {
                    const starter = match.starters.find((s) => s.playerId === evt.playerId);
                    const sub = match.substitutes.find((s) => s.playerId === evt.playerId);
                    if (starter) handleSelectPlayer(starter, true);
                    else if (sub) handleSelectPlayer(sub, true);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-transform hover:scale-105 ${
                  evt.type === 'goal'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : evt.type === 'yellow'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span className="font-mono font-bold text-[11px]">{evt.minute}'</span>
                <span>{evt.type === 'goal' ? '⚽' : evt.type === 'yellow' ? '🟨' : '🔄'}</span>
                <span>{evt.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ÉLÉMENT PRINCIPAL : TERRAIN TACTIQUE (GAUCHE) & STATS COMPARATIVES (DROITE) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* TERRAIN GRAND FORMAT + LES 11 TITULAIRES + REMPLAÇANTS */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isLineupDeployed ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  {isLineupDeployed ? `Composition • ${selectedFormation} FFF` : 'Terrain Tactique Officiel'}
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {isLineupDeployed
                  ? '11 titulaires déployés sur le terrain. Cliquez sur un joueur pour inspecter.'
                  : 'Terrain libre et vierge. Cliquez pour charger et déployer la composition.'}
              </p>
            </div>

            {/* Tactical Controls & View Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Deploy / Clear Lineup Action Button */}
              <button
                onClick={() => setIsLineupDeployed(!isLineupDeployed)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  isLineupDeployed
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
                }`}
              >
                {isLineupDeployed ? (
                  <>
                    <X className="w-3.5 h-3.5 text-slate-500" />
                    <span>Masquer les joueurs</span>
                  </>
                ) : (
                  <>
                    <Users className="w-3.5 h-3.5 text-white" />
                    <span>+ Déployer le 11</span>
                  </>
                )}
              </button>

              {/* Formation Selector if deployed */}
              {isLineupDeployed && (
                <select
                  value={selectedFormation}
                  onChange={(e) => setSelectedFormation(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="4-3-3">4-3-3</option>
                  <option value="4-2-3-1">4-2-3-1</option>
                  <option value="3-5-2">3-5-2</option>
                  <option value="4-4-2">4-4-2</option>
                </select>
              )}

              {/* Clean Professional View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0">
                <button
                  onClick={() => setIs3DMode(false)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    !is3DMode
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2D
                </button>
                <button
                  onClick={() => setIs3DMode(true)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    is3DMode
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  3D
                </button>
              </div>
            </div>
          </div>

          {/* TERRAIN DE FOOTBALL ÉLÉGANT & PROFESSIONNEL */}
          <div
            className="relative w-full max-w-[500px] mx-auto aspect-[3/4.3] rounded-3xl border border-slate-800/20 p-2.5 overflow-hidden shadow-xl select-none bg-slate-950"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Inner Pitch Canvas with Optional 3D Tilt */}
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner bg-gradient-to-b from-[#184e2c] via-[#123d22] to-[#0d2d18]"
              style={{
                transform: is3DMode ? 'rotateX(20deg) scale(0.97) translateY(-6px)' : 'none',
                transformOrigin: 'center bottom',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Subtle Alternating Lawn Stripes Pattern */}
              <div className="absolute inset-0 flex flex-col pointer-events-none opacity-40">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 ${i % 2 === 0 ? 'bg-white/[0.04]' : 'bg-transparent'}`}
                  />
                ))}
              </div>

              {/* Subtle Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35" />

              {/* Crisp White Pitch Markings (SVG) */}
              <div className="absolute inset-2.5 pointer-events-none">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 340 500"
                  preserveAspectRatio="none"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45))' }}
                >
                  {/* Outer Boundary */}
                  <rect
                    x="14"
                    y="14"
                    width="312"
                    height="472"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeOpacity="0.88"
                    rx="4"
                  />

                  {/* Halfway Line */}
                  <line
                    x1="14"
                    y1="250"
                    x2="326"
                    y2="250"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeOpacity="0.88"
                  />

                  {/* Center Circle & Spot */}
                  <circle
                    cx="170"
                    cy="250"
                    r="46"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeOpacity="0.88"
                  />
                  <circle cx="170" cy="250" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />

                  {/* Top Penalty Box (Opponent Goal) */}
                  <rect
                    x="70"
                    y="14"
                    width="200"
                    height="74"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeOpacity="0.88"
                  />
                  <rect
                    x="116"
                    y="14"
                    width="108"
                    height="28"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeOpacity="0.88"
                  />
                  <circle cx="170" cy="60" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
                  <path
                    d="M 130 88 A 40 40 0 0 0 210 88"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeOpacity="0.88"
                  />

                  {/* Bottom Penalty Box (France Goal) */}
                  <rect
                    x="70"
                    y="412"
                    width="200"
                    height="74"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeOpacity="0.88"
                  />
                  <rect
                    x="116"
                    y="458"
                    width="108"
                    height="28"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeOpacity="0.88"
                  />
                  <circle cx="170" cy="440" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
                  <path
                    d="M 130 412 A 40 40 0 0 1 210 412"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeOpacity="0.88"
                  />

                  {/* Corner Arcs */}
                  <path d="M 14 26 A 12 12 0 0 0 26 14" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
                  <path d="M 314 14 A 12 12 0 0 0 326 26" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
                  <path d="M 14 474 A 12 12 0 0 1 26 486" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
                  <path d="M 314 486 A 12 12 0 0 1 326 474" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
                </svg>
              </div>

              {/* Discreet Attack Direction Indicator */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/60 backdrop-blur-xs text-[10px] font-semibold text-slate-300 border border-white/10 shadow-xs pointer-events-none z-10">
                <span>Sens d'attaque ↑</span>
              </div>

              {/* ETAT A : TERRAIN VIERGE / BLANK PITCH OVERLAY */}
              {!isLineupDeployed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 shadow-2xl max-w-[280px] space-y-3 animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-300 mx-auto">
                      <Users className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">
                        Terrain Libre
                      </h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-1 leading-snug">
                        Aucun joueur sur la pelouse. Ajoutez la composition quand nécessaire.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsLineupDeployed(true)}
                      className="w-full py-2 px-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/40 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>+ Déployer le 11 FFF</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ETAT B : 11 TITULAIRES POSITIONNÉS QUAND DEMANDÉ */}
              {isLineupDeployed && (
                <div className="absolute inset-3 animate-in fade-in duration-300">
                  {match.starters.map((starter) => {
                    const player = getPlayerDetails(starter.playerId);
                    const isGK = starter.positionName === 'Gardien';
                    const evts = getPlayerMatchEvents(starter.playerId);
                    const isSelected = selectedPlayerStat?.playerId === starter.playerId;

                    return (
                      <button
                        key={starter.playerId}
                        onClick={() => handleSelectPlayer(starter, false)}
                        onDoubleClick={() => handleSelectPlayer(starter, true)}
                        style={{
                          left: `${starter.pitchX}%`,
                          top: `${starter.pitchY}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        className={`absolute flex flex-col items-center group cursor-pointer transition-all duration-200 z-10 ${
                          isSelected ? 'scale-115 z-30' : 'hover:scale-105'
                        }`}
                        title={`${player?.name || starter.playerId} (${starter.positionName}) — Note : ${starter.rating}/10`}
                      >
                        {/* Jersey Circle Pin */}
                        <div className="relative">
                          <div
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-md border-2 transition-all ${
                              isSelected
                                ? 'border-white ring-2 ring-blue-500 shadow-blue-500/40'
                                : 'border-white/90 group-hover:border-blue-300'
                            } ${
                              isGK
                                ? 'bg-amber-500 text-slate-950 font-mono'
                                : 'bg-[#0B2347] text-white font-mono'
                            }`}
                          >
                            {player?.number || '#'}
                          </div>

                          {/* Discreet Event Dot on Goal or Yellow Card */}
                          {evts.goals > 0 && (
                            <span className="absolute -top-1 -right-1 text-[10px] leading-none drop-shadow-xs">
                              ⚽
                            </span>
                          )}
                          {evts.yellow && (
                            <span className="absolute -bottom-0.5 -right-1 text-[9px] leading-none drop-shadow-xs">
                              🟨
                            </span>
                          )}
                        </div>

                        {/* Clean Single Label: Player Name · Rating */}
                        <div
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md mt-1 shadow-sm whitespace-nowrap transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-950/85 text-slate-100 group-hover:bg-slate-900 border border-white/10'
                          }`}
                        >
                          <span className="text-[10px] font-bold">
                            {player?.lastName || starter.playerId}
                          </span>
                          <span className="text-[9px] font-mono font-semibold text-emerald-400">
                            {starter.rating}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* REMPLAÇANTS SOUS LE TERRAIN */}
          {/* ========================================================================= */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Banc des remplaçants :</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Distinction titulaires, entrés et non utilisés
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {match.substitutes.map((sub) => {
                const player = getPlayerDetails(sub.playerId);
                const isSelected = selectedPlayerStat?.playerId === sub.playerId;
                const didPlay = sub.minutes > 0;

                return (
                  <button
                    key={sub.playerId}
                    onClick={() => handleSelectPlayer(sub, false)}
                    onDoubleClick={() => handleSelectPlayer(sub, true)}
                    className={`p-2.5 rounded-xl border transition-all text-left flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-300 shadow-2xs'
                        : didPlay
                        ? 'bg-emerald-50/40 hover:bg-blue-50 border-slate-200/90 hover:border-blue-300'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200/70 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-black shrink-0 ${
                          didPlay ? 'bg-blue-700 text-white' : 'bg-slate-300 text-slate-700'
                        }`}
                      >
                        {player?.number || '#'}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-blue-600">
                          {player?.name || sub.playerId}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {sub.positionName}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-1">
                      {didPlay ? (
                        <>
                          <span className="text-xs font-mono font-bold text-blue-700 block">
                            🔄 {sub.minutes}'
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 font-bold block">
                            ★ {sub.rating}
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded">
                          Non entré
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* À DROITE : STATISTIQUES DU MATCH + PANNEAU PERFORMANCE DU JOUEUR SÉLECTIONNÉ */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-5">
          {/* PANNEAU PERFORMANCE DU JOUEUR SÉLECTIONNÉ (Directement visible sans cacher le terrain) */}
          {selectedPlayerStat && inspectedPlayer ? (
            <div className="bg-blue-50/70 p-5 rounded-3xl border-2 border-blue-300 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-sm shadow-xs font-mono">
                    {inspectedPlayer.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-black text-slate-900">{inspectedPlayer.name}</h3>
                      <span className="text-[10px] font-bold text-blue-700 bg-white px-1.5 py-0.2 rounded border border-blue-200">
                        {selectedPlayerStat.positionName}
                      </span>
                    </div>
                    <span className="text-[11px] text-blue-900 font-medium">
                      Temps joué : {selectedPlayerStat.minutes}' • Note : ★ {selectedPlayerStat.rating}/10
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlayerStat(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-blue-100"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Métriques clés avec comparaison moyenne personnelle */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Distance */}
                <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Distance totale
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="font-mono font-black text-slate-900 text-base">
                      {selectedPlayerStat.distanceKm} km
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">
                      +4% vs moy.
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Moyenne : {(selectedPlayerStat.distanceKm * 0.96).toFixed(1)} km
                  </span>
                </div>

                {/* Vitesse Max */}
                <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Vitesse max
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="font-mono font-black text-slate-900 text-base">
                      {selectedPlayerStat.maxSpeedKmH || 33.4} km/h
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">
                      Top 15% poste
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Pic athlétique FFF
                  </span>
                </div>

                {/* Sprints */}
                <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Sprints {'>'} 25 km/h
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="font-mono font-black text-slate-900 text-base">
                      {selectedPlayerStat.sprints} sprints
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1 py-0.5 rounded">
                      Intensif
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Distance HI : 2.4 km
                  </span>
                </div>

                {/* Passes & Précision */}
                <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Passes réussies
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="font-mono font-black text-slate-900 text-base">
                      {selectedPlayerStat.passesAccuracy}%
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">
                      {selectedPlayerStat.passes} tentées
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {selectedPlayerStat.progressivePasses || 8} progressives
                  </span>
                </div>
              </div>

              {/* Duels, Récupérations & Actions décisives */}
              <div className="p-3 bg-white rounded-xl border border-blue-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Duels gagnés :</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedPlayerStat.duelsWon} / {selectedPlayerStat.duelsTotal || selectedPlayerStat.duelsWon + 2}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Ballons récupérés :</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedPlayerStat.recoveries || 6}
                  </span>
                </div>
                {selectedPlayerStat.goals && selectedPlayerStat.goals > 0 && (
                  <div className="flex items-center justify-between font-bold text-emerald-700">
                    <span>Buts marqués :</span>
                    <span>⚽ {selectedPlayerStat.goals}</span>
                  </div>
                )}
                {selectedPlayerStat.assists && selectedPlayerStat.assists > 0 && (
                  <div className="flex items-center justify-between font-bold text-blue-700">
                    <span>Passes décisives :</span>
                    <span>🎯 {selectedPlayerStat.assists}</span>
                  </div>
                )}
                {selectedPlayerStat.saves && selectedPlayerStat.saves > 0 && (
                  <div className="flex items-center justify-between font-bold text-blue-700">
                    <span>Arrêts décisifs :</span>
                    <span>🧤 {selectedPlayerStat.saves}</span>
                  </div>
                )}
              </div>

              {/* CTAs : Ouvrir panneau complet ou Accéder à Joueur 360 */}
              <div className="flex items-center justify-between pt-1 gap-2">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="px-3 py-2 bg-white hover:bg-slate-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-colors"
                >
                  Panneau détaillé ↗
                </button>
                <button
                  onClick={() => navigateTo('joueur_360', { playerId: inspectedPlayer.id })}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Voir Joueur 360</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              💡 Cliquez sur n'importe quel joueur sur le terrain pour afficher ses statistiques individuelles en direct.
            </div>
          )}

          {/* STATISTIQUES OFFICIELLES DU MATCH FRANCE VS ADVERSAIRE */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Statistiques du Match
              </h2>
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="text-blue-700 font-bold">France</span>
                <span className="text-slate-400">vs</span>
                <span className="text-orange-600 font-bold">{match.awayTeam}</span>
              </div>
            </div>

            {/* Barres comparatives avec valeurs exactes */}
            <div className="space-y-3 font-sans">
              {[
                {
                  label: 'Possession',
                  valFr: `${match.statsFrance.possession}%`,
                  valOpp: `${match.statsOpponent.possession}%`,
                  pctFr: match.statsFrance.possession
                },
                {
                  label: 'Tirs au but',
                  valFr: match.statsFrance.tirs,
                  valOpp: match.statsOpponent.tirs,
                  pctFr: Math.round(
                    (match.statsFrance.tirs /
                      (match.statsFrance.tirs + match.statsOpponent.tirs)) *
                      100
                  )
                },
                {
                  label: 'Tirs cadrés',
                  valFr: match.statsFrance.tirsCadres,
                  valOpp: match.statsOpponent.tirsCadres,
                  pctFr: Math.round(
                    (match.statsFrance.tirsCadres /
                      (match.statsFrance.tirsCadres + match.statsOpponent.tirsCadres)) *
                      100
                  )
                },
                {
                  label: 'xG (Expected Goals)',
                  valFr: match.statsFrance.xG,
                  valOpp: match.statsOpponent.xG,
                  pctFr: Math.round(
                    (match.statsFrance.xG /
                      (match.statsFrance.xG + match.statsOpponent.xG)) *
                      100
                  )
                },
                {
                  label: 'Passes réussies',
                  valFr: match.statsFrance.passes,
                  valOpp: match.statsOpponent.passes,
                  pctFr: Math.round(
                    (match.statsFrance.passes /
                      (match.statsFrance.passes + match.statsOpponent.passes)) *
                      100
                  )
                },
                {
                  label: 'Précision des passes',
                  valFr: `${match.statsFrance.precisionPasses}%`,
                  valOpp: `${match.statsOpponent.precisionPasses}%`,
                  pctFr: match.statsFrance.precisionPasses
                },
                {
                  label: 'Duels gagnés',
                  valFr: `${match.statsFrance.duelsRemportes}%`,
                  valOpp: `${match.statsOpponent.duelsRemportes}%`,
                  pctFr: match.statsFrance.duelsRemportes
                },
                {
                  label: 'Ballons récupérés',
                  valFr: match.statsFrance.recuperations,
                  valOpp: match.statsOpponent.recuperations,
                  pctFr: Math.round(
                    (match.statsFrance.recuperations /
                      (match.statsFrance.recuperations + match.statsOpponent.recuperations)) *
                      100
                  )
                },
                {
                  label: 'Distance totale',
                  valFr: `${match.statsFrance.distanceKm} km`,
                  valOpp: `${match.statsOpponent.distanceKm} km`,
                  pctFr: 52
                },
                {
                  label: 'Sprints haute intensité',
                  valFr: match.statsFrance.sprints,
                  valOpp: match.statsOpponent.sprints,
                  pctFr: Math.round(
                    (match.statsFrance.sprints /
                      (match.statsFrance.sprints + match.statsOpponent.sprints)) *
                      100
                  )
                },
                {
                  label: 'Intensité / Puissance collective',
                  valFr: '92 / 100',
                  valOpp: '84 / 100',
                  pctFr: 55
                }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-900">{stat.valFr}</span>
                    <span className="text-slate-600 font-medium">{stat.label}</span>
                    <span className="font-mono text-slate-500">{stat.valOpp}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 flex overflow-hidden">
                    <div
                      className="bg-blue-600 h-1.5 transition-all duration-300"
                      style={{ width: `${stat.pctFr}%` }}
                    />
                    <div
                      className="bg-orange-500 h-1.5 transition-all duration-300"
                      style={{ width: `${100 - stat.pctFr}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ANALYSES PLUS PROFONDES : TIMELINE, XG, ZONES D'ACTIVITÉ, INTENSITÉ */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Analyses Approfondies du Match
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Timeline, évolution xG dans le temps, heat maps collectives et métriques physiques Wyscout/Catapult.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'timeline', label: 'Timeline & Événements' },
              { id: 'xg', label: 'Évolution xG' },
              { id: 'heatmaps', label: "Zones d'activité & Heat Map" },
              { id: 'physique', label: 'Intensité & Sprints' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAnalysisTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeAnalysisTab === tab.id
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1 : Chronologie du Match & Timeline interactive */}
        {activeAnalysisTab === 'timeline' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* 90-Minute Interactive Track */}
            <div className="relative pt-6 pb-2">
              <div className="w-full h-3 bg-slate-100 rounded-full relative overflow-hidden flex">
                <div className="w-1/2 h-full border-r border-slate-300 relative bg-slate-200/70" />
                <div className="w-1/2 h-full bg-slate-200/70" />
              </div>

              {/* Time markers */}
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>0'</span>
                <span>15'</span>
                <span>30'</span>
                <span className="font-bold text-slate-700">MT (45')</span>
                <span>60'</span>
                <span>75'</span>
                <span>90'+4</span>
              </div>

              {/* Interactive Event Pins on track */}
              <div className="absolute top-0 inset-x-0">
                {match.events.map((evt, idx) => {
                  const posPercent = (evt.minute / 94) * 100;
                  const isGoal = evt.type === 'goal';
                  const isHome = evt.team === 'home';

                  return (
                    <div
                      key={idx}
                      style={{ left: `${posPercent}%` }}
                      onClick={() => {
                        if (evt.playerId) {
                          const starter = match.starters.find((s) => s.playerId === evt.playerId);
                          const sub = match.substitutes.find((s) => s.playerId === evt.playerId);
                          if (starter) handleSelectPlayer(starter, false);
                          else if (sub) handleSelectPlayer(sub, false);
                        }
                      }}
                      className="absolute -translate-x-1/2 flex flex-col items-center group cursor-pointer"
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-sm font-bold transition-transform group-hover:scale-125 ${
                          isGoal
                            ? isHome
                              ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                              : 'bg-orange-500 text-white ring-2 ring-orange-300'
                            : evt.type === 'yellow'
                            ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-200'
                            : 'bg-slate-700 text-white'
                        }`}
                      >
                        {isGoal ? '⚽' : evt.type === 'yellow' ? '🟨' : '🔄'}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-7 bg-slate-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-20 pointer-events-none shadow-md">
                        {evt.minute}' : {evt.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Événements détaillés avec lien vers joueurs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {match.events.map((evt, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (evt.playerId) {
                      const starter = match.starters.find((s) => s.playerId === evt.playerId);
                      const sub = match.substitutes.find((s) => s.playerId === evt.playerId);
                      if (starter) handleSelectPlayer(starter, false);
                      else if (sub) handleSelectPlayer(sub, false);
                    }
                  }}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs hover:bg-blue-50/50 hover:border-blue-200 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-white border border-slate-200">
                      {evt.minute}'
                    </span>
                    <span className="font-medium text-slate-800">{evt.text}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      evt.team === 'home'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {evt.team === 'home' ? 'France' : 'Pays-Bas'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2 : Évolution xG dans le temps */}
        {activeAnalysisTab === 'xg' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">
                Courbe cumulative des Expected Goals (xG) sur 90 minutes :
              </span>
              <div className="flex items-center gap-4 font-mono font-bold">
                <span className="text-blue-700">France : 2.4 xG (3 buts réels)</span>
                <span className="text-orange-600">Pays-Bas : 0.8 xG (1 but réel)</span>
              </div>
            </div>

            <div className="relative h-44 w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
              {/* xG Grid lines */}
              <div className="absolute inset-x-4 inset-y-4 flex flex-col justify-between pointer-events-none opacity-30">
                <div className="border-b border-slate-300 w-full" />
                <div className="border-b border-slate-300 w-full" />
                <div className="border-b border-slate-300 w-full" />
              </div>

              {/* Graphic line representation */}
              <div className="relative h-32 w-full flex items-end">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* France xG curve */}
                  <polyline
                    fill="none"
                    stroke="#1D4ED8"
                    strokeWidth="3"
                    points="0,95 18,72 34,48 50,45 64,22 80,18 90,12 100,10"
                  />
                  {/* Opponent xG curve */}
                  <polyline
                    fill="none"
                    stroke="#EA580C"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    points="0,98 25,95 45,90 60,86 73,65 90,62 100,60"
                  />
                  {/* Goal markers */}
                  <circle cx="18" cy="72" r="3.5" fill="#1D4ED8" />
                  <circle cx="34" cy="48" r="3.5" fill="#1D4ED8" />
                  <circle cx="64" cy="22" r="3.5" fill="#1D4ED8" />
                  <circle cx="73" cy="65" r="3.5" fill="#EA580C" />
                </svg>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-200">
                <span>0'</span>
                <span>18' ⚽ Mbappé (0.68)</span>
                <span>34' ⚽ Barcola (0.42)</span>
                <span>MT</span>
                <span>64' ⚽ Mbappé (0.74)</span>
                <span>73' ⚽ Gakpo (0.35)</span>
                <span>90'</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Surperformance positive pour la France (+0.60 but vs xG), traduisant une excellente efficacité clinique des attaquants devant la cage.
            </p>
          </div>
        )}

        {/* Tab 3 : Zones d'activité et Heat Maps */}
        {activeAnalysisTab === 'heatmaps' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-150">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">
                Heat Map Territoriale (Couloirs & Surface)
              </h3>
              <div className="relative aspect-[16/10] bg-[#0c4a2d] rounded-2xl p-4 overflow-hidden border border-emerald-900 flex items-center justify-center">
                <svg className="w-full h-full opacity-40" viewBox="0 0 400 250">
                  <rect x="5" y="5" width="390" height="240" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="200" y1="5" x2="200" y2="245" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="200" cy="125" r="30" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                  <rect x="5" y="65" width="55" height="120" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                  <rect x="340" y="65" width="55" height="120" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>

                {/* Hotspots */}
                <div className="absolute top-[20%] left-[25%] w-24 h-24 bg-rose-500/50 rounded-full blur-xl" />
                <div className="absolute top-[40%] left-[45%] w-32 h-28 bg-amber-500/55 rounded-full blur-xl" />
                <div className="absolute top-[35%] left-[70%] w-24 h-24 bg-rose-600/60 rounded-full blur-xl" />
                <div className="absolute top-[70%] left-[40%] w-28 h-20 bg-amber-400/40 rounded-full blur-xl" />

                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-emerald-200 bg-slate-950/80 px-2 py-0.5 rounded">
                  Forte densité : Couloir gauche (Barcola / Hernandez)
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">
                Répartition des tirs & Zones de finition
              </h3>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Dans la surface des 16m :</span>
                  <span className="font-mono font-bold text-blue-700">13 tirs (72%) • 3 buts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Hors surface :</span>
                  <span className="font-mono font-bold text-slate-700">5 tirs (28%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Attaques par couloir gauche :</span>
                  <span className="font-mono font-bold text-slate-900">42% (Point d'appui préférentiel)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Attaques dans l'axe :</span>
                  <span className="font-mono font-bold text-slate-900">33% (Combinaisons Mbappé-Griezmann)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Attaques par couloir droit :</span>
                  <span className="font-mono font-bold text-slate-900">25% (Dembélé / Koundé)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4 : Intensité et Sprints */}
        {activeAnalysisTab === 'physique' && (
          <div className="space-y-4 animate-in fade-in duration-150 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-slate-500 font-bold block">Sprints {'>'} 25.2 km/h</span>
                <span className="text-2xl font-black font-mono text-blue-700 block">124 sprints</span>
                <span className="text-[10px] text-slate-400 block">
                  Top : Mbappé (26), Barcola (24), Hernandez (22), Dembélé (21)
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-slate-500 font-bold block">Distance haute intensité (19.8-25.2)</span>
                <span className="text-2xl font-black font-mono text-emerald-700 block">22.4 km cumulés</span>
                <span className="text-[10px] text-slate-400 block">
                  Top : Tchouaméni (3.8 km), Rabiot (3.4 km), Koundé (2.9 km)
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-slate-500 font-bold block">Puissance métabolique moyenne</span>
                <span className="text-2xl font-black font-mono text-indigo-700 block">10.8 W/kg</span>
                <span className="text-[10px] text-emerald-600 font-semibold block">
                  +6% vs match référence Espagne
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. LATERAL DRAWER MODAL POUR PERFORMANCE DÉTAILLÉE DU JOUEUR */}
      {/* ========================================================================= */}
      {isDrawerOpen && selectedPlayerStat && (
        <MatchPlayerDrawer
          playerStat={selectedPlayerStat}
          onClose={() => setIsDrawerOpen(false)}
          matchScore={`${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam}`}
        />
      )}
    </div>
  );
};
