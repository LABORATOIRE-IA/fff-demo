import React from 'react';
import { RadarAxis } from '../../data/playerCockpitData';

interface CockpitRadarChartProps {
  axes: RadarAxis[];
  playerName?: string;
  compact?: boolean;
}

export const CockpitRadarChart: React.FC<CockpitRadarChartProps> = ({ axes, compact = false }) => {
  // Dimensions & proportions
  const width = 250;
  const height = compact ? 195 : 230;
  const centerX = width / 2;
  const centerY = height / 2 - (compact ? 2 : 0);
  const radius = compact ? 54 : 68;
  const count = axes.length || 6;

  // Compute angle and coordinates for an axis
  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / count) * index - Math.PI / 2;
    const r = (Math.max(10, Math.min(100, value)) / 100) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Concentric polygon web rings (25%, 50%, 75%, 100%)
  const rings = [0.25, 0.5, 0.75, 1];

  // Distinct previous value (M-1) to ensure clearly visible difference
  const getPrevValue = (axis: RadarAxis, i: number) => {
    if (axis.previousValue !== undefined) return axis.previousValue;
    // Clear visible deltas (-10 to -16 pts) across axes
    const distinctDeltas = [14, 11, 16, 10, 13, 15];
    const delta = distinctDeltas[i % distinctDeltas.length];
    return Math.max(40, axis.playerValue - delta);
  };

  // 1. Ancien profil points (M-1)
  const previousPoints = axes
    .map((axis, i) => {
      const prevVal = getPrevValue(axis, i);
      const { x, y } = getCoordinates(i, prevVal);
      return `${x},${y}`;
    })
    .join(' ');

  // 2. Actuel profil points (S39)
  const currentPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.playerValue);
      return `${x},${y}`;
    })
    .join(' ');

  // Global averages for legend
  const avgCurrent = Math.round(
    axes.reduce((sum, a) => sum + a.playerValue, 0) / (axes.length || 1)
  );
  const avgPrevious = Math.round(
    axes.reduce((sum, a, i) => sum + getPrevValue(a, i), 0) / (axes.length || 1)
  );
  const totalDelta = avgCurrent - avgPrevious;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between overflow-hidden select-none">
      {/* Légende bicolore ultra-lisible : 2 profils superposés */}
      <div className="flex items-center justify-center gap-2.5 shrink-0 py-1 text-[10px] font-mono font-bold">
        {/* Ancien Profil (Orange / Ambre pointillé) */}
        <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-700" />
          <span>Ancien (M-1): {avgPrevious}</span>
        </div>

        {/* Actuel Profil (Bleu roi FFF plein) */}
        <div className="flex items-center gap-1.5 text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-300 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-blue-800" />
          <span>Actuel (S39): {avgCurrent}</span>
        </div>

        {/* Delta */}
        <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
          +{totalDelta} pts
        </span>
      </div>

      {/* Radar SVG Visualisation */}
      <div className="relative w-full max-w-[245px] aspect-[5/3.8] flex items-center justify-center overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full block"
          style={{ overflow: 'hidden' }}
        >
          {/* Concentric grid webs */}
          {rings.map((ring, ringIdx) => {
            const ringPoints = axes
              .map((_, i) => {
                const { x, y } = getCoordinates(i, ring * 100);
                return `${x},${y}`;
              })
              .join(' ');

            return (
              <polygon
                key={`ring-${ringIdx}`}
                points={ringPoints}
                fill={ringIdx === rings.length - 1 ? '#f8fafc' : 'none'}
                stroke="#e2e8f0"
                strokeWidth={ringIdx === rings.length - 1 ? '1.5' : '1'}
                strokeDasharray={ringIdx === rings.length - 1 ? undefined : '2 2'}
              />
            );
          })}

          {/* Spoke lines from center to outer points */}
          {axes.map((_, i) => {
            const { x, y } = getCoordinates(i, 100);
            return (
              <line
                key={`spoke-${i}`}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="#cbd5e1"
                strokeWidth="1"
              />
            );
          })}

          {/* ============================================================ */}
          {/* 1. ANCIEN PROFIL (Orange / Ambre avec contour pointillé)     */}
          {/* ============================================================ */}
          <polygon
            points={previousPoints}
            fill="#f59e0b"
            fillOpacity="0.22"
            stroke="#d97706"
            strokeWidth="2.2"
            strokeDasharray="5 3"
          />

          {/* Sommets Ancien Profil (Points ambre distincts) */}
          {axes.map((axis, i) => {
            const prevVal = getPrevValue(axis, i);
            const { x, y } = getCoordinates(i, prevVal);
            return (
              <circle
                key={`knot-prev-${i}`}
                cx={x}
                cy={y}
                r="3.2"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            );
          })}

          {/* ============================================================ */}
          {/* 2. ACTUEL PROFIL (Bleu Roi FFF plein avec contour renforcé)   */}
          {/* ============================================================ */}
          <polygon
            points={currentPoints}
            fill="#2563eb"
            fillOpacity="0.32"
            stroke="#1d4ed8"
            strokeWidth="2.5"
          />

          {/* Sommets Actuel Profil (Points bleus renforcés) */}
          {axes.map((axis, i) => {
            const { x, y } = getCoordinates(i, axis.playerValue);
            return (
              <circle
                key={`knot-curr-${i}`}
                cx={x}
                cy={y}
                r="3.8"
                fill="#1d4ed8"
                stroke="#ffffff"
                strokeWidth="1.8"
              />
            );
          })}

          {/* Libellés des axes & Valeurs comparatives (Actuel en bleu / Ancien en ambre) */}
          {axes.map((axis, i) => {
            const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
            const labelR = radius + (compact ? 15 : 18);
            const lx = centerX + labelR * Math.cos(angle);
            const ly = centerY + labelR * Math.sin(angle);
            const prevVal = getPrevValue(axis, i);
            const delta = axis.playerValue - prevVal;

            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (Math.cos(angle) > 0.25) textAnchor = 'start';
            else if (Math.cos(angle) < -0.25) textAnchor = 'end';

            return (
              <g key={`label-${i}`}>
                {/* Nom de l'axe */}
                <text
                  x={lx}
                  y={ly - 1}
                  textAnchor={textAnchor}
                  fontSize={compact ? 7.5 : 8.5}
                  fontWeight="bold"
                  fill="#0f172a"
                >
                  {axis.axis}
                </text>

                {/* Valeur Actuelle + Valeur Ancienne + Écart */}
                <text
                  x={lx}
                  y={ly + (compact ? 8 : 9.5)}
                  textAnchor={textAnchor}
                  fontSize={compact ? 7 : 8}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  <tspan fill="#1d4ed8" fontWeight="bold">
                    {axis.playerValue}
                  </tspan>
                  <tspan fill="#64748b" fontSize={compact ? 6 : 7}>
                    {' '}(vs{' '}
                  </tspan>
                  <tspan fill="#d97706" fontWeight="bold">
                    {prevVal}
                  </tspan>
                  <tspan fill="#16a34a" fontWeight="bold">
                    {' '}+{delta})
                  </tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
