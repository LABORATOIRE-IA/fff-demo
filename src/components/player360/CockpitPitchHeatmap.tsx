import React, { useState } from 'react';
import { Player } from '../../types/ams';
import { getPlayerCockpitProfile, HeatmapZoneCoord } from '../../data/playerCockpitData';
import { Compass } from 'lucide-react';

interface CockpitPitchHeatmapProps {
  player: Player;
  compact?: boolean;
}

export const CockpitPitchHeatmap: React.FC<CockpitPitchHeatmapProps> = ({ player, compact = true }) => {
  const [activeZone, setActiveZone] = useState<HeatmapZoneCoord | null>(null);
  const cockpitData = getPlayerCockpitProfile(player);
  const zones = cockpitData.heatmapZones;

  return (
    <div className="space-y-2 select-none">
      {/* Top-down clean professional football pitch container */}
      <div className="relative w-full rounded-2xl border border-slate-800/20 p-2 overflow-hidden shadow-md bg-slate-950">
        {/* Discreet Header & Direction */}
        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-300 mb-1.5 px-1 z-20 relative">
          <span>Sens d'attaque ↑</span>
          <span className="text-[9px] font-mono text-slate-300 bg-slate-900/90 px-1.5 py-0.2 rounded border border-slate-700/60">
            {cockpitData.roleLabel}
          </span>
        </div>

        {/* Pitch SVG Diagram Container */}
        <div className="relative w-full aspect-[220/290] max-h-[280px] mx-auto rounded-xl overflow-hidden shadow-inner bg-gradient-to-b from-[#184e2c] via-[#123d22] to-[#0d2d18]">
          {/* Subtle Alternating Lawn Stripes */}
          <div className="absolute inset-0 flex flex-col pointer-events-none opacity-40">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${i % 2 === 0 ? 'bg-white/[0.04]' : 'bg-transparent'}`}
              />
            ))}
          </div>

          {/* Subtle Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35" />

          {/* 3. Crisp Pitch Markings & Heatmap SVG */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 220 300"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Dynamic Heatmap radial gradient */}
              {zones.map((z, idx) => (
                <radialGradient
                  key={`heat-grad-${idx}`}
                  id={`heat-grad-${idx}`}
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.85 * z.intensity} />
                  <stop offset="35%" stopColor="#f97316" stopOpacity={0.7 * z.intensity} />
                  <stop offset="65%" stopColor="#eab308" stopOpacity={0.45 * z.intensity} />
                  <stop offset="85%" stopColor="#22c55e" stopOpacity={0.2 * z.intensity} />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity={0} />
                </radialGradient>
              ))}
            </defs>

            {/* Crisp Field Markings */}
            <g style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45))' }}>
              {/* Outer Boundary */}
              <rect x="6" y="6" width="208" height="288" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.88" rx="3" />

              {/* Halfway line */}
              <line x1="6" y1="150" x2="214" y2="150" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.88" />

              {/* Center Circle & Spot */}
              <circle cx="110" cy="150" r="30" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.88" />
              <circle cx="110" cy="150" r="2" fill="#FFFFFF" fillOpacity="0.9" />

              {/* TOP (Opponent Goal & Penalty Box) */}
              <rect x="50" y="6" width="120" height="48" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.88" />
              <rect x="76" y="6" width="68" height="18" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.88" />
              <circle cx="110" cy="36" r="2" fill="#FFFFFF" fillOpacity="0.9" />
              <path d="M 92 54 A 20 20 0 0 0 128 54" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.88" />

              {/* BOTTOM (Own Goal & Penalty Box) */}
              <rect x="50" y="246" width="120" height="48" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.88" />
              <rect x="76" y="276" width="68" height="18" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.88" />
              <circle cx="110" cy="264" r="2" fill="#FFFFFF" fillOpacity="0.9" />
              <path d="M 92 246 A 20 20 0 0 1 128 246" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.88" />

              {/* Corner arcs */}
              <path d="M 6 16 A 10 10 0 0 0 16 6" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.88" />
              <path d="M 204 6 A 10 10 0 0 0 214 16" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.88" />
              <path d="M 6 284 A 10 10 0 0 1 16 294" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.88" />
              <path d="M 204 294 A 10 10 0 0 1 214 284" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.88" />
            </g>

            {/* Heatmap hotspots */}
            {zones.map((z, idx) => {
              const cx = (z.x / 100) * 220;
              const cy = (z.y / 100) * 300;
              const isHovered = activeZone === z;

              return (
                <g
                  key={`zone-${idx}`}
                  className="cursor-pointer group"
                  onMouseEnter={() => setActiveZone(z)}
                  onMouseLeave={() => setActiveZone(null)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={z.radius * (isHovered ? 1.2 : 1) * 1.2}
                    fill={`url(#heat-grad-${idx})`}
                    className="transition-all duration-300"
                    style={{ mixBlendMode: 'screen' }}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 3.5 : 2}
                    fill="#ffffff"
                    fillOpacity={isHovered ? 1 : 0.6}
                  />
                </g>
              );
            })}
          </svg>

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[8.5px] text-slate-300 font-mono z-20 bg-slate-950/70 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/10">
            <span className="flex items-center gap-1">
              <Compass className="w-2.5 h-2.5 text-cyan-400" />
              <span>GPS Catapult 10 Hz</span>
            </span>
            <span className="text-emerald-400 font-medium">{zones.length} zones actives</span>
          </div>
        </div>
      </div>
    </div>
  );
};
