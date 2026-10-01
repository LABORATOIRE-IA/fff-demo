import React, { useState } from 'react';
import { Player } from '../../types/ams';
import { getPlayerCockpitProfile } from '../../data/playerCockpitData';
import { ArrowUp, Flame, Compass } from 'lucide-react';

interface HeatmapPitchProps {
  player: Player;
}

export const HeatmapPitch: React.FC<HeatmapPitchProps> = ({ player }) => {
  const [timeRange, setTimeRange] = useState<'7j' | '30j' | 'saison'>('30j');
  const [context, setContext] = useState<'entrainements' | 'matchs' | 'tous'>('tous');
  const [activeZoneIndex, setActiveZoneIndex] = useState<number | null>(null);
  const [is3DMode, setIs3DMode] = useState<boolean>(false);

  const cockpitData = getPlayerCockpitProfile(player);
  const zones = cockpitData.heatmapZones;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-5 animate-in fade-in duration-200">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {cockpitData.roleLabel}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Capteurs Catapult Vector 10 Hz
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Analyse Spatiale & Densité de Jeu</span>
            <span className="text-sm font-mono text-blue-600 font-bold">({player.name})</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Cartographie thermique haute définition et zones préférentielles d'occupation du terrain.
          </p>
        </div>

        {/* Clean View Toggles & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 2D / 3D Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setIs3DMode(false)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                !is3DMode
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vue 2D
            </button>
            <button
              onClick={() => setIs3DMode(true)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                is3DMode
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vue 3D
            </button>
          </div>

          {/* Time range */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            {(['7j', '30j', 'saison'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  timeRange === t
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t === '7j' ? '7j' : t === '30j' ? '30j' : 'Saison'}
              </button>
            ))}
          </div>

          {/* Context */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            {(['entrainements', 'matchs', 'tous'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setContext(c)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  context === c
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c === 'entrainements' ? 'Entraîn.' : c === 'matchs' ? 'Matchs' : 'Tous'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Pitch Visualization Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Clean Professional Top-Down Pitch */}
        <div
          className="lg:col-span-8 relative w-full aspect-[3/4.3] max-w-[500px] mx-auto rounded-3xl border border-slate-800/20 p-2.5 overflow-hidden shadow-xl bg-slate-950 select-none"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Inner Pitch Canvas */}
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

            {/* Direction of Attack */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/60 backdrop-blur-xs text-[10px] font-semibold text-slate-300 border border-white/10 shadow-xs pointer-events-none z-20">
              <span>Sens d'attaque ↑</span>
            </div>

            {/* Pitch Lines (SVG) */}
            <div className="absolute inset-2.5 pointer-events-none z-10">
              <svg
                className="w-full h-full"
                viewBox="0 0 300 400"
                preserveAspectRatio="none"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45))' }}
              >
                <defs>
                  {/* Clean Heatmap radial gradients */}
                  {zones.map((z, idx) => (
                    <radialGradient
                      key={`pitch-lg-${idx}`}
                      id={`pitch-lg-${idx}`}
                      cx="50%"
                      cy="50%"
                      r="50%"
                      fx="50%"
                      fy="50%"
                    >
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.88 * z.intensity} />
                      <stop offset="35%" stopColor="#f97316" stopOpacity={0.72 * z.intensity} />
                      <stop offset="65%" stopColor="#eab308" stopOpacity={0.45 * z.intensity} />
                      <stop offset="85%" stopColor="#22c55e" stopOpacity={0.2 * z.intensity} />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity={0} />
                    </radialGradient>
                  ))}
                </defs>

                {/* Outer Boundary */}
                <rect x="5" y="5" width="290" height="390" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />

                {/* Halfway Line */}
                <line x1="5" y1="200" x2="295" y2="200" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />

                {/* Center Circle & Spot */}
                <circle cx="150" cy="200" r="40" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
                <circle cx="150" cy="200" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />

                {/* Top Penalty Area */}
                <rect x="65" y="5" width="170" height="65" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
                <rect x="105" y="5" width="90" height="24" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.88" />
                <circle cx="150" cy="48" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
                <path d="M 125 70 A 28 28 0 0 0 175 70" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.88" />

                {/* Bottom Penalty Area */}
                <rect x="65" y="330" width="170" height="65" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
                <rect x="105" y="371" width="90" height="24" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.88" />
                <circle cx="150" cy="352" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
                <path d="M 125 330 A 28 28 0 0 1 175 330" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.88" />

                {/* Corner Arcs */}
                <path d="M 5 20 A 15 15 0 0 0 20 5" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
                <path d="M 280 5 A 15 15 0 0 0 295 20" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
                <path d="M 5 380 A 15 15 0 0 1 20 395" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
                <path d="M 280 395 A 15 15 0 0 1 295 380" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.88" />
              </svg>
            </div>

            {/* Clean Heatmap Layer */}
            <div className="absolute inset-2.5 z-15">
              <svg className="w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="none">
                {zones.map((z, idx) => {
                  const cx = (z.x / 100) * 300;
                  const cy = (z.y / 100) * 400;
                  const isSelected = activeZoneIndex === idx;

                  return (
                    <g
                      key={`lg-zone-${idx}`}
                      className="cursor-pointer group"
                      onClick={() => setActiveZoneIndex(idx)}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={z.radius * (isSelected ? 1.25 : 1) * 1.3}
                        fill={`url(#pitch-lg-${idx})`}
                        className="transition-all duration-300"
                        style={{ mixBlendMode: 'screen' }}
                      />
                      {/* Subtle center point */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 4 : 2.5}
                        fill="#ffffff"
                        fillOpacity={isSelected ? 1 : 0.6}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] text-slate-300 font-mono z-20 bg-slate-950/70 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/10">
              <span className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-cyan-400" />
                <span>Format Standard FFF (105m × 68m)</span>
              </span>
              <span className="text-emerald-400 font-medium">Capteurs Catapult 10 Hz</span>
            </div>
          </div>
        </div>

        {/* Right Side: Zones Breakdown */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Zones d'occupation clés
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-bold">
                {zones.length} zones
              </span>
            </div>

            <div className="space-y-2">
              {zones.map((z, idx) => {
                const isSelected = activeZoneIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveZoneIndex(idx)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-400 shadow-2xs'
                        : 'bg-white hover:bg-slate-100/70 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{z.label || `Zone ${idx + 1}`}</span>
                      <span className="font-mono font-bold text-rose-600">
                        {(z.intensity * 100).toFixed(0)}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600"
                        style={{ width: `${z.intensity * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tactical Activity Summary */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 shadow-xs border border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Synthèse d'activité
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              {cockpitData.heatmapDescription || "Activité de déplacement mesurée en temps réel."}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono">
              <div>
                <span className="text-slate-400 block">Vitesse max :</span>
                <span className="text-xs font-bold text-amber-300">
                  {cockpitData.gpsSummary?.vitesseMax || player.dimensions.physique.vitesseMax} km/h
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">
                  {player.isReferee ? 'Sprints & Démarcations :' : 'Sprints >25km/h :'}
                </span>
                <span className="text-xs font-bold text-cyan-300">
                  {cockpitData.gpsSummary?.sprintsCount || 18} courses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
