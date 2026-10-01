import React, { useState } from 'react';
import { Player } from '../../types/ams';
import { CockpitDetailSection } from './CockpitSectionDetailModal';
import {
  Zap,
  Activity,
  Heart,
  Shield,
  TrendingUp,
  Brain,
  Crosshair,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import transparentAnatomyImage from '../../assets/images/player_anatomy_transparent.png';

interface PlayerAnatomy360ViewProps {
  player: Player;
  onSelectSection: (section: CockpitDetailSection) => void;
  isRef?: boolean;
  isAssistant?: boolean;
}

interface DimensionIndicator {
  id: CockpitDetailSection;
  side: 'left' | 'right';
  index: number;
  title: string;
  score: number;
  trend: string;
  isPositive: boolean;
  colorName: 'green' | 'blue' | 'amber' | 'purple' | 'sky' | 'rose' | 'emerald';
  hexColor: string;
  icon: React.ComponentType<{ className?: string }>;
  bodyPartLabel: string;
  cardY: number; // Exact vertical center Y of the card
  targetX: number; // Target coordinate on anatomy figure
  targetY: number;
  intermediateX: number;
}

export const PlayerAnatomy360View: React.FC<PlayerAnatomy360ViewProps> = ({
  player,
  onSelectSection,
  isRef = false,
  isAssistant = false
}) => {
  const [hoveredId, setHoveredId] = useState<CockpitDetailSection | null>(null);

  // Real player data
  const chargeScore = player.dimensions?.entrainement?.score || 94;
  const physiqueScore = player.dimensions?.physique?.score || 98;
  const techniqueScore = isRef && player.refereeStats?.decisionsVarConfirmeesPct
    ? Math.round(player.refereeStats.decisionsVarConfirmeesPct)
    : 87;
  const mentalScore = 85;

  const formeScore = isRef && player.refereeStats?.noteObservateurs
    ? Math.round(player.refereeStats.noteObservateurs * 10)
    : Math.min(100, Math.round((player.dimensions?.performance?.score || 92) * 0.5 + (player.dimensions?.recuperation?.score || 90) * 0.5 + 4));
  const recuperationScore = player.dimensions?.recuperation?.score || 90;
  const santeScore = player.dimensions?.sante?.score || 96;
  const tactiqueScore = isRef ? (isAssistant ? 98 : 94) : 81;

  // Coordinate system for SVG overlay: viewBox="0 0 1000 443"
  // Left cards: X from 0 to 250 (right edge = 250)
  // Center anatomy: X from 250 to 750 (Center = 500)
  // Right cards: X from 750 to 1000 (left edge = 750)
  // 4 cards spaced with flex justify-between in 443px height:
  // Card 0: Y = 29
  // Card 1: Y = 157
  // Card 2: Y = 286
  // Card 3: Y = 414

  const leftIndicators: DimensionIndicator[] = [
    {
      id: 'charge',
      side: 'left',
      index: 0,
      title: isRef ? 'Charge DTA' : 'Charge & GPS',
      score: chargeScore,
      trend: '+3',
      isPositive: true,
      colorName: 'emerald',
      hexColor: '#10b981',
      icon: Zap,
      bodyPartLabel: 'Cardio / Épaule',
      cardY: 29,
      targetX: 468,
      targetY: 94,
      intermediateX: 375
    },
    {
      id: 'physique',
      side: 'left',
      index: 1,
      title: isRef ? 'Vitesse & VMA' : 'Physique & Vitesse',
      score: physiqueScore,
      trend: '+3',
      isPositive: true,
      colorName: 'blue',
      hexColor: '#2563eb',
      icon: TrendingUp,
      bodyPartLabel: 'Quadriceps Droit',
      cardY: 157,
      targetX: 464,
      targetY: 234,
      intermediateX: 370
    },
    {
      id: 'technique',
      side: 'left',
      index: 2,
      title: isRef ? 'Validation VAR' : 'Technique',
      score: techniqueScore,
      trend: '+5',
      isPositive: true,
      colorName: 'amber',
      hexColor: '#f59e0b',
      icon: Crosshair,
      bodyPartLabel: 'Genou / Articulations',
      cardY: 286,
      targetX: 466,
      targetY: 304,
      intermediateX: 370
    },
    {
      id: 'mental',
      side: 'left',
      index: 3,
      title: isRef ? 'Mental Arbitre' : 'Mental & Focus',
      score: mentalScore,
      trend: '+1',
      isPositive: true,
      colorName: 'purple',
      hexColor: '#9333ea',
      icon: Brain,
      bodyPartLabel: 'Jambe / Stabilité',
      cardY: 414,
      targetX: 466,
      targetY: 372,
      intermediateX: 365
    }
  ];

  const rightIndicators: DimensionIndicator[] = [
    {
      id: 'forme',
      side: 'right',
      index: 0,
      title: isRef ? 'Observateurs' : 'Forme du Moment',
      score: formeScore,
      trend: '+4',
      isPositive: true,
      colorName: 'sky',
      hexColor: '#0284c7',
      icon: Activity,
      bodyPartLabel: 'Pectoral / Épaule G (Cible)',
      cardY: 29,
      targetX: 545,
      targetY: 94,
      intermediateX: 625
    },
    {
      id: 'recuperation',
      side: 'right',
      index: 1,
      title: isRef ? 'Récupération DTA' : 'Récupération',
      score: recuperationScore,
      trend: '-1',
      isPositive: false,
      colorName: 'rose',
      hexColor: '#f43f5e',
      icon: Heart,
      bodyPartLabel: 'Bras / Sommeil',
      cardY: 157,
      targetX: 558,
      targetY: 168,
      intermediateX: 630
    },
    {
      id: 'sante',
      side: 'right',
      index: 2,
      title: isRef ? 'Santé & Soins' : 'Santé & Intégrité',
      score: santeScore,
      trend: '+2',
      isPositive: true,
      colorName: 'green',
      hexColor: '#10b981',
      icon: ShieldCheck,
      bodyPartLabel: 'Quadriceps Gauche (Cible)',
      cardY: 286,
      targetX: 535,
      targetY: 252,
      intermediateX: 625
    },
    {
      id: 'tactique',
      side: 'right',
      index: 3,
      title: isRef ? 'Décisionnel' : 'Tactique',
      score: tactiqueScore,
      trend: isRef ? '+1' : '-2',
      isPositive: isRef,
      colorName: 'blue',
      hexColor: '#2563eb',
      icon: Shield,
      bodyPartLabel: 'Mollet / Appuis',
      cardY: 414,
      targetX: 532,
      targetY: 356,
      intermediateX: 625
    }
  ];

  const allIndicators = [...leftIndicators, ...rightIndicators];

  const isDembele =
    player.id === 'dembele' ||
    player.name?.toLowerCase().includes('dembele') ||
    player.name?.toLowerCase().includes('dembélé');

  const isKounde =
    player.id === 'kounde' ||
    player.name?.toLowerCase().includes('kounde') ||
    player.name?.toLowerCase().includes('koundé');

  // Dembélé specific target coordinates (Skeleton shifted to the right col-span-5)
  const dembeleTargetMap: Partial<Record<CockpitDetailSection, { targetX: number; targetY: number; startX: number; cardY: number }>> = {
    charge: { targetX: 745, targetY: 94, startX: 570, cardY: 29 },
    physique: { targetX: 742, targetY: 234, startX: 570, cardY: 157 },
    technique: { targetX: 745, targetY: 304, startX: 570, cardY: 286 },
    mental: { targetX: 746, targetY: 372, startX: 570, cardY: 414 },
    forme: { targetX: 825, targetY: 94, startX: 570, cardY: 29 },
    recuperation: { targetX: 838, targetY: 168, startX: 570, cardY: 157 },
    sante: { targetX: 820, targetY: 252, startX: 570, cardY: 286 },
    tactique: { targetX: 816, targetY: 356, startX: 570, cardY: 414 },
    performance: { targetX: 825, targetY: 94, startX: 570, cardY: 29 }
  };

  // Jules Koundé specific target coordinates (8 categories in a single vertical column col-span-5, skeleton col-span-7)
  const koundeTargetMap: Partial<Record<CockpitDetailSection, { targetX: number; targetY: number; startX: number; cardY: number }>> = {
    charge: { targetX: 685, targetY: 94, startX: 415, cardY: 24 },
    physique: { targetX: 680, targetY: 234, startX: 415, cardY: 78 },
    technique: { targetX: 682, targetY: 304, startX: 415, cardY: 132 },
    mental: { targetX: 684, targetY: 372, startX: 415, cardY: 186 },
    forme: { targetX: 755, targetY: 94, startX: 415, cardY: 240 },
    recuperation: { targetX: 768, targetY: 168, startX: 415, cardY: 294 },
    sante: { targetX: 750, targetY: 252, startX: 415, cardY: 348 },
    tactique: { targetX: 745, targetY: 356, startX: 415, cardY: 402 },
    performance: { targetX: 755, targetY: 94, startX: 415, cardY: 240 }
  };

  const getColorStyles = (colorName: string, isHovered: boolean) => {
    switch (colorName) {
      case 'emerald':
      case 'green':
        return {
          iconBox: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
          barFill: 'bg-emerald-500',
          ring: isHovered
            ? 'ring-2 ring-emerald-500/50 border-emerald-500 shadow-xs'
            : 'border-slate-200/90 shadow-2xs'
        };
      case 'blue':
        return {
          iconBox: 'bg-blue-50 text-blue-600 border-blue-200/80',
          barFill: 'bg-blue-600',
          ring: isHovered
            ? 'ring-2 ring-blue-500/50 border-blue-500 shadow-xs'
            : 'border-slate-200/90 shadow-2xs'
        };
      case 'amber':
        return {
          iconBox: 'bg-amber-50 text-amber-600 border-amber-200/80',
          barFill: 'bg-amber-500',
          ring: isHovered
            ? 'ring-2 ring-amber-500/50 border-amber-500 shadow-xs'
            : 'border-slate-200/90 shadow-2xs'
        };
      case 'purple':
        return {
          iconBox: 'bg-purple-50 text-purple-600 border-purple-200/80',
          barFill: 'bg-purple-600',
          ring: isHovered
            ? 'ring-2 ring-purple-500/50 border-purple-500 shadow-xs'
            : 'border-slate-200/90 shadow-2xs'
        };
      case 'sky':
        return {
          iconBox: 'bg-sky-50 text-sky-600 border-sky-200/80',
          barFill: 'bg-sky-500',
          ring: isHovered
            ? 'ring-2 ring-sky-500/50 border-sky-500 shadow-xs'
            : 'border-slate-200/90 shadow-2xs'
        };
      case 'rose':
        return {
          iconBox: 'bg-rose-50 text-rose-600 border-rose-200/80',
          barFill: 'bg-rose-500',
          ring: isHovered
            ? 'ring-2 ring-rose-500/50 border-rose-500 shadow-xs'
            : 'border-slate-200/90 shadow-2xs'
        };
      default:
        return {
          iconBox: 'bg-blue-50 text-blue-600 border-blue-200/80',
          barFill: 'bg-blue-600',
          ring: isHovered
            ? 'ring-2 ring-blue-500/50 border-blue-500 shadow-xs'
            : 'border-slate-200/90 shadow-2xs'
        };
    }
  };

  const renderCard = (ind: DimensionIndicator) => {
    const Icon = ind.icon;
    const isHovered = hoveredId === ind.id;
    const styles = getColorStyles(ind.colorName, isHovered);

    return (
      <div
        key={ind.id}
        onClick={() => onSelectSection(ind.id)}
        onMouseEnter={() => setHoveredId(ind.id)}
        onMouseLeave={() => setHoveredId(null)}
        className={`bg-white rounded-xl px-2.5 py-1.5 border transition-all duration-150 cursor-pointer hover:shadow-xs group relative flex items-center gap-2 h-[58px] ${styles.ring}`}
        title={`Cliquez pour ouvrir le détail ${ind.title}`}
      >
        {/* Compact Icon */}
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${styles.iconBox}`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 leading-tight">
            <h4 className="text-[10px] sm:text-[10.5px] font-bold text-slate-900 group-hover:text-blue-700 whitespace-nowrap tracking-tight">
              {ind.title}
            </h4>
            <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>

          <div className="flex items-baseline justify-between mt-0.5">
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-black text-slate-950 font-mono tracking-tight leading-none">
                {ind.score}
              </span>
              <span className="text-[8.5px] text-slate-400 font-mono font-medium">/100</span>
            </div>

            <div
              className={`flex items-center gap-0.5 text-[9px] font-mono font-bold ${
                ind.isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              <span>{ind.isPositive ? '↑' : '↓'}</span>
              <span>{ind.trend}</span>
            </div>
          </div>

          {/* Mini progress bar */}
          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mt-0.5 border border-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${styles.barFill}`}
              style={{ width: `${Math.max(10, Math.min(100, ind.score))}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSingleColumnCard = (ind: DimensionIndicator) => {
    const Icon = ind.icon;
    const isHovered = hoveredId === ind.id;
    const styles = getColorStyles(ind.colorName, isHovered);

    return (
      <div
        key={ind.id}
        onClick={() => onSelectSection(ind.id)}
        onMouseEnter={() => setHoveredId(ind.id)}
        onMouseLeave={() => setHoveredId(null)}
        className={`bg-white rounded-xl px-2.5 py-1 border transition-all duration-150 cursor-pointer hover:shadow-xs group relative flex items-center justify-between gap-2 h-[46px] ${styles.ring}`}
        title={`Cliquez pour ouvrir le détail ${ind.title}`}
      >
        {/* Compact Icon */}
        <div
          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${styles.iconBox}`}
        >
          <Icon className="w-3 h-3" />
        </div>

        {/* Title and category progress */}
        <div className="flex-1 min-w-0 overflow-hidden pr-1">
          <div className="flex items-center justify-between gap-1.5 leading-none mb-1">
            <h4 className="text-[10.5px] sm:text-[11px] font-bold text-slate-900 group-hover:text-blue-700 whitespace-nowrap tracking-tight">
              {ind.title}
            </h4>
            <span className="text-[9px] font-mono text-slate-400 whitespace-nowrap">
              {ind.bodyPartLabel}
            </span>
          </div>
          {/* Mini progress bar */}
          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${styles.barFill}`}
              style={{ width: `${Math.max(10, Math.min(100, ind.score))}%` }}
            />
          </div>
        </div>

        {/* Score & Trend */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-baseline gap-0.5">
            <span className="text-xs font-black text-slate-950 font-mono tracking-tight leading-none">
              {ind.score}
            </span>
            <span className="text-[8px] text-slate-400 font-mono">/100</span>
          </div>

          <div
            className={`flex items-center gap-0.5 text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
              ind.isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
            }`}
          >
            <span>{ind.isPositive ? '↑' : '↓'}</span>
            <span>{ind.trend}</span>
          </div>

          <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>
      </div>
    );
  };

  return (
    /* Encadré blanc de la section avec son ombre et bordure propre */
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3 relative select-none h-[493px] flex flex-col justify-between">
      {/* Titre unique demandé : MODÈLE BIOMÉCANIQUE */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 shrink-0 mb-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 shadow-xs" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
            Modèle Biomécanique
          </h3>
        </div>

        <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
          {isKounde ? '8 Catégories en Colonne' : isDembele ? '8 Dimensions Latérales' : '8 Dimensions'}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW : KOUNDÉ (1 COLONNE) VS DEMBÉLÉ (2 COLS) VS STANDARD (4/SQUELETTE/4) */}
      {/* ========================================================================= */}
      {isKounde ? (
        /* JULES KOUNDÉ : LES 8 CATÉGORIES EN 1 SEULE COLONNE VERTICALE (GAUCHE) & SQUELETTE MUSCULAIRE (DROITE) */
        <div className="hidden lg:grid grid-cols-12 gap-3 relative items-center flex-1 h-[443px]">
          {/* SVG Connector Lines Overlay for Koundé */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 443"
            preserveAspectRatio="none"
          >
            <defs>
              <marker id="arrow-emerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#10b981" />
              </marker>
              <marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#2563eb" />
              </marker>
              <marker id="arrow-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#f59e0b" />
              </marker>
              <marker id="arrow-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#9333ea" />
              </marker>
              <marker id="arrow-sky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#0284c7" />
              </marker>
              <marker id="arrow-rose" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#f43f5e" />
              </marker>
              <marker id="arrow-slate" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Koundé Connector Lines from Left Single Column to Right Muscular Skeleton */}
            {allIndicators.map((ind) => {
              const isHovered = hoveredId === ind.id;
              const coords = koundeTargetMap[ind.id];
              if (!coords) return null;

              const pathD = `M ${coords.startX} ${coords.cardY} C 490 ${coords.cardY}, 580 ${coords.targetY}, ${coords.targetX} ${coords.targetY}`;
              const markerId = isHovered ? `url(#arrow-${ind.colorName})` : 'url(#arrow-slate)';

              return (
                <g key={`kounde-line-${ind.id}`} className="transition-all duration-150">
                  {/* Glow halo on hover */}
                  {isHovered && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={ind.hexColor}
                      strokeWidth="4"
                      strokeOpacity="0.35"
                      strokeLinecap="round"
                    />
                  )}
                  {/* Main line with arrowhead */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHovered ? ind.hexColor : '#cbd5e1'}
                    strokeWidth={isHovered ? '2' : '1.2'}
                    strokeLinecap="round"
                    markerEnd={markerId}
                  />
                  {/* Origin dot on card edge */}
                  <circle
                    cx={coords.startX}
                    cy={coords.cardY}
                    r={isHovered ? 3.5 : 2.5}
                    fill={isHovered ? ind.hexColor : '#94a3b8'}
                  />
                  {/* Target beacon */}
                  <circle
                    cx={coords.targetX}
                    cy={coords.targetY}
                    r={isHovered ? 6 : 4}
                    fill={ind.hexColor}
                    fillOpacity={isHovered ? 0.45 : 0.15}
                    className={isHovered ? 'animate-ping' : ''}
                  />
                </g>
              );
            })}
          </svg>

          {/* 1. GAUCHE : LES 8 CATÉGORIES EN 1 SEULE COLONNE VERTICALE (col-span-5) */}
          <div className="col-span-5 flex flex-col justify-between h-full z-20 space-y-1">
            {allIndicators.map((ind) => renderSingleColumnCard(ind))}
          </div>

          {/* 2. DROITE : SQUELETTE MUSCULAIRE SANS CONTOUR (col-span-7) */}
          <div className="col-span-7 relative flex flex-col items-center justify-center h-full z-10 select-none pl-4">
            <div className="relative w-full h-[443px] max-h-[443px] flex items-center justify-center">
              {/* Image PNG transparente officielle du squelette musculaire */}
              <img
                src={transparentAnatomyImage}
                alt={`${player.name} - Modèle Biomécanique`}
                className="h-full w-auto max-w-full object-contain object-center z-10 pointer-events-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/player_anatomy_transparent.png';
                }}
              />

              {/* Clickable hotspots on muscular figure */}
              {allIndicators.map((ind) => {
                const coords = koundeTargetMap[ind.id];
                if (!coords) return null;

                return (
                  <button
                    key={`kounde-hotspot-${ind.id}`}
                    onClick={() => onSelectSection(ind.id)}
                    onMouseEnter={() => setHoveredId(ind.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      position: 'absolute',
                      left: `${((coords.targetX - 420) / 580) * 100}%`,
                      top: `${(coords.targetY / 443) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer z-30 group"
                    title={`${ind.title} (${ind.bodyPartLabel}) : Cliquer pour voir l'analyse`}
                  >
                    <span className="sr-only">{ind.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : isDembele ? (
        /* OUSMANE DEMBÉLÉ : 8 DIMENSIONS DU MÊME CÔTÉ (GAUCHE) & SQUELETTE MUSCULAIRE (DROITE) */
        <div className="hidden lg:grid grid-cols-12 gap-3 relative items-center flex-1 h-[443px]">
          {/* SVG Connector Lines Overlay for Dembélé */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 443"
            preserveAspectRatio="none"
          >
            <defs>
              <marker id="arrow-emerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#10b981" />
              </marker>
              <marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#2563eb" />
              </marker>
              <marker id="arrow-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#f59e0b" />
              </marker>
              <marker id="arrow-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#9333ea" />
              </marker>
              <marker id="arrow-sky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#0284c7" />
              </marker>
              <marker id="arrow-rose" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#f43f5e" />
              </marker>
              <marker id="arrow-slate" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Dembélé Connector Lines from Left 8 Dimensions to Right Muscular Skeleton */}
            {allIndicators.map((ind) => {
              const isHovered = hoveredId === ind.id;
              const coords = dembeleTargetMap[ind.id];
              if (!coords) return null;

              const pathD = `M ${coords.startX} ${coords.cardY} C 630 ${coords.cardY}, 680 ${coords.targetY}, ${coords.targetX} ${coords.targetY}`;
              const markerId = isHovered ? `url(#arrow-${ind.colorName})` : 'url(#arrow-slate)';

              return (
                <g key={`dembele-line-${ind.id}`} className="transition-all duration-150">
                  {/* Glow halo on hover */}
                  {isHovered && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={ind.hexColor}
                      strokeWidth="4"
                      strokeOpacity="0.35"
                      strokeLinecap="round"
                    />
                  )}
                  {/* Main line with arrowhead */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHovered ? ind.hexColor : '#cbd5e1'}
                    strokeWidth={isHovered ? '2' : '1.2'}
                    strokeLinecap="round"
                    markerEnd={markerId}
                  />
                  {/* Origin dot on card edge */}
                  <circle
                    cx={coords.startX}
                    cy={coords.cardY}
                    r={isHovered ? 3.5 : 2.5}
                    fill={isHovered ? ind.hexColor : '#94a3b8'}
                  />
                  {/* Target beacon */}
                  <circle
                    cx={coords.targetX}
                    cy={coords.targetY}
                    r={isHovered ? 6 : 4}
                    fill={ind.hexColor}
                    fillOpacity={isHovered ? 0.45 : 0.15}
                    className={isHovered ? 'animate-ping' : ''}
                  />
                </g>
              );
            })}
          </svg>

          {/* 1. GAUCHE : LES 8 DIMENSIONS DU MÊME CÔTÉ (col-span-7) */}
          <div className="col-span-7 grid grid-cols-2 gap-2.5 h-full z-20">
            {/* Colonne A (4 dimensions) */}
            <div className="flex flex-col justify-between h-full space-y-1">
              {leftIndicators.map((ind) => renderCard(ind))}
            </div>

            {/* Colonne B (4 dimensions) */}
            <div className="flex flex-col justify-between h-full space-y-1">
              {rightIndicators.map((ind) => renderCard(ind))}
            </div>
          </div>

          {/* 2. DROITE : SQUELETTE MUSCULAIRE SANS CONTOUR (col-span-5) */}
          <div className="col-span-5 relative flex flex-col items-center justify-center h-full z-10 select-none pl-2">
            <div className="relative w-full h-[443px] max-h-[443px] flex items-center justify-center">
              {/* Image PNG transparente officielle du squelette musculaire */}
              <img
                src={transparentAnatomyImage}
                alt={`${player.name} - Modèle Biomécanique`}
                className="h-full w-auto max-w-full object-contain object-center z-10 pointer-events-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/player_anatomy_transparent.png';
                }}
              />

              {/* Clickable hotspots on muscular figure */}
              {allIndicators.map((ind) => {
                const coords = dembeleTargetMap[ind.id];
                if (!coords) return null;

                return (
                  <button
                    key={`dembele-hotspot-${ind.id}`}
                    onClick={() => onSelectSection(ind.id)}
                    onMouseEnter={() => setHoveredId(ind.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      position: 'absolute',
                      left: `${((coords.targetX - 580) / 420) * 100}%`,
                      top: `${(coords.targetY / 443) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer z-30 group"
                    title={`${ind.title} (${ind.bodyPartLabel}) : Cliquer pour voir l'analyse`}
                  >
                    <span className="sr-only">{ind.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD VIEW (AUTRES JOUEURS) : 3 GAUCHE / 6 ANATOMIE SANS CONTOUR / 3 DROITE */
        <div className="hidden lg:grid grid-cols-12 gap-2 relative items-center flex-1 h-[443px]">
          {/* SVG Connector Lines & High-Tech Arrows Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 443"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Arrowhead markers matching indicator colors */}
              <marker id="arrow-emerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#10b981" />
              </marker>
              <marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#2563eb" />
              </marker>
              <marker id="arrow-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#f59e0b" />
              </marker>
              <marker id="arrow-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#9333ea" />
              </marker>
              <marker id="arrow-sky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#0284c7" />
              </marker>
              <marker id="arrow-rose" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#f43f5e" />
              </marker>
              <marker id="arrow-slate" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 1 L 5 3 L 0 5 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Left Connector Lines with Arrows */}
            {leftIndicators.map((ind) => {
              const isHovered = hoveredId === ind.id;
              const cardRightX = 250;
              const pathD = `M ${cardRightX} ${ind.cardY} L ${ind.intermediateX} ${ind.cardY} L ${ind.targetX} ${ind.targetY}`;
              const markerId = isHovered ? `url(#arrow-${ind.colorName})` : 'url(#arrow-slate)';

              return (
                <g key={`line-left-${ind.id}`} className="transition-all duration-150">
                  {/* Glow halo on hover */}
                  {isHovered && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={ind.hexColor}
                      strokeWidth="4"
                      strokeOpacity="0.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {/* Main line with arrowhead */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHovered ? ind.hexColor : '#cbd5e1'}
                    strokeWidth={isHovered ? '2' : '1.3'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd={markerId}
                  />
                  {/* Origin dot on card edge */}
                  <circle
                    cx={cardRightX}
                    cy={ind.cardY}
                    r={isHovered ? 3.5 : 2.5}
                    fill={isHovered ? ind.hexColor : '#94a3b8'}
                  />
                  {/* Target beacon */}
                  <circle
                    cx={ind.targetX}
                    cy={ind.targetY}
                    r={isHovered ? 6 : 4}
                    fill={ind.hexColor}
                    fillOpacity={isHovered ? 0.4 : 0.15}
                    className={isHovered ? 'animate-ping' : ''}
                  />
                </g>
              );
            })}

            {/* Right Connector Lines with Arrows */}
            {rightIndicators.map((ind) => {
              const isHovered = hoveredId === ind.id;
              const cardLeftX = 750;
              const pathD = `M ${cardLeftX} ${ind.cardY} L ${ind.intermediateX} ${ind.cardY} L ${ind.targetX} ${ind.targetY}`;
              const markerId = isHovered ? `url(#arrow-${ind.colorName})` : 'url(#arrow-slate)';

              return (
                <g key={`line-right-${ind.id}`} className="transition-all duration-150">
                  {/* Glow halo on hover */}
                  {isHovered && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={ind.hexColor}
                      strokeWidth="4"
                      strokeOpacity="0.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {/* Main line with arrowhead */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHovered ? ind.hexColor : '#cbd5e1'}
                    strokeWidth={isHovered ? '2' : '1.3'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd={markerId}
                  />
                  {/* Origin dot on card edge */}
                  <circle
                    cx={cardLeftX}
                    cy={ind.cardY}
                    r={isHovered ? 3.5 : 2.5}
                    fill={isHovered ? ind.hexColor : '#94a3b8'}
                  />
                  {/* Target beacon */}
                  <circle
                    cx={ind.targetX}
                    cy={ind.targetY}
                    r={isHovered ? 6 : 4}
                    fill={ind.hexColor}
                    fillOpacity={isHovered ? 0.4 : 0.15}
                    className={isHovered ? 'animate-ping' : ''}
                  />
                </g>
              );
            })}
          </svg>

          {/* 1. GAUCHE : 4 BOXES COMPACTES (col-span-3) */}
          <div className="col-span-3 flex flex-col justify-between h-full z-20 pr-0.5">
            {leftIndicators.map((ind) => renderCard(ind))}
          </div>

          {/* 2. CENTRE : ANATOMIE HUMAINE SANS AUCUN CONTOUR (col-span-6) */}
          <div className="col-span-6 relative flex flex-col items-center justify-center h-full z-10 select-none">
            <div className="relative w-full h-[443px] max-h-[443px] flex items-center justify-center">
              {/* Image PNG transparente : aucun contour ni bordure rectangulaire */}
              <img
                src={transparentAnatomyImage}
                alt={`${player.name} - Modèle Biomécanique`}
                className="h-full w-auto max-w-full object-contain object-center z-10 pointer-events-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/player_anatomy_transparent.png';
                }}
              />

              {/* Clickable hotspots aligned with the anatomical figure */}
              {allIndicators.map((ind) => (
                <button
                  key={`hotspot-btn-${ind.id}`}
                  onClick={() => onSelectSection(ind.id)}
                  onMouseEnter={() => setHoveredId(ind.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: 'absolute',
                    left: `${((ind.targetX - 250) / 500) * 100}%`,
                    top: `${(ind.targetY / 443) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer z-30 group"
                  title={`${ind.title} (${ind.bodyPartLabel}) : Cliquer pour voir l'analyse`}
                >
                  <span className="sr-only">{ind.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. DROITE : 4 BOXES COMPACTES (col-span-3) */}
          <div className="col-span-3 flex flex-col justify-between h-full z-20 pl-0.5">
            {rightIndicators.map((ind) => renderCard(ind))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MOBILE / TABLET RESPONSIVE VIEW                                           */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-3 pt-2">
        <div className="relative w-full max-w-[240px] mx-auto h-[290px] flex items-center justify-center">
          <img
            src={transparentAnatomyImage}
            alt={`${player.name} - Anatomie`}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/player_anatomy_transparent.png';
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {allIndicators.map((ind) => renderCard(ind))}
        </div>
      </div>
    </div>
  );
};
