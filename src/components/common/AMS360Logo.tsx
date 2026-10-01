import React from 'react';

interface AMS360LogoProps {
  variant?: 'full' | 'compact' | 'icon-only' | 'sidebar' | 'hero';
  theme?: 'light' | 'dark';
  className?: string;
}

export const AMS360Logo: React.FC<AMS360LogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = ''
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official 3D Gallic Rooster Emblem Badge */}
      <div className="relative shrink-0 flex flex-col items-center">
        {/* Emblem Container with High-Definition 3D Badge */}
        <div className="relative w-11 h-11 rounded-2xl p-0.5 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 border border-blue-400/40 shadow-md shadow-blue-950/40 flex items-center justify-center overflow-hidden group">
          <img
            src="/assets/ams360_emblem.jpg"
            alt="AMS 360 - Équipe de France"
            className="w-full h-full object-cover rounded-xl scale-105 group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Graceful SVG fallback if asset path differs
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />

          {/* Subtle glowing ambient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-white/10 pointer-events-none" />
        </div>
      </div>

      {/* Typography Section: AMS 360 & Plateforme Performance */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col justify-center min-w-0">
          {/* Main Title: AMS 360 with Tricolore Accent on 'A' */}
          <div className="flex items-center gap-1.5 leading-none">
            <div className="flex items-baseline font-black tracking-tight text-xl">
              {/* Custom 'A' with Tricolore Flag bar */}
              <span className={`relative inline-flex flex-col items-center justify-center mr-0.5 font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>A</span>
                <span className="absolute bottom-1 left-0 right-0 h-[2.5px] flex rounded-full overflow-hidden shadow-2xs">
                  <span className="w-1/3 bg-[#002654]" />
                  <span className="w-1/3 bg-white" />
                  <span className="w-1/3 bg-[#ED2939]" />
                </span>
              </span>
              <span className={`font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>MS</span>
              <span className="ml-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-black tracking-tight">
                360
              </span>
            </div>

            {variant === 'sidebar' && (
              <span className={`text-[8px] font-mono font-black px-1.5 py-0.5 rounded-md tracking-wider shadow-2xs ${
                isDark ? 'bg-amber-400 text-slate-950 font-extrabold' : 'bg-blue-900 text-white'
              }`}>
                FFF
              </span>
            )}
          </div>

          {/* Subtitles: "PLATEFORME PERFORMANCE" and "ÉQUIPE DE FRANCE" */}
          <div className="mt-0.5 space-y-0.5">
            <div className={`text-[8.5px] font-black tracking-[0.14em] uppercase whitespace-nowrap leading-none ${
              isDark ? 'text-blue-200/90' : 'text-slate-700'
            }`}>
              PLATEFORME PERFORMANCE
            </div>
            <div className={`flex items-center gap-1.5 text-[8px] font-bold tracking-wider whitespace-nowrap leading-none ${
              isDark ? 'text-blue-300' : 'text-blue-900'
            }`}>
              <span className={`w-3 h-[1px] ${isDark ? 'bg-blue-700/60' : 'bg-slate-300'}`} />
              <span>ÉQUIPE DE FRANCE</span>
              <span className={`w-3 h-[1px] ${isDark ? 'bg-blue-700/60' : 'bg-slate-300'}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
