import React from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  Zap,
  Activity,
  TrendingUp,
  Dumbbell,
  Clock,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Shield,
  CheckCircle2,
  Moon,
  MessageSquare
} from 'lucide-react';

export const PhysicalStaffDashboard: React.FC = () => {
  const {
    players,
    trainings,
    navigateTo,
    openCommentsDrawer,
    notifications,
    handleNotificationClick
  } = useAMS();

  // Next planned training session
  const nextTraining = trainings && trainings.length > 0 ? trainings[0] : null;

  // Training metrics from Catapult 10 Hz sensors
  const physicalMetrics = [
    {
      label: 'Distance Moyenne',
      value: '7.2 km',
      subtext: 'Séance Vitesse J-2',
      trend: '+0.4 km',
      isGood: true
    },
    {
      label: 'Distance Haute Intensité (HSR)',
      value: '685 m',
      subtext: '> 19.8 km/h',
      trend: '+12%',
      isGood: true
    },
    {
      label: 'Vitesse Max Enregistrée',
      value: '34.8 km/h',
      subtext: 'Mathis Dupont #7',
      trend: 'Pic de stage',
      isGood: true
    },
    {
      label: 'Ratio ACWR Équipe',
      value: '1.05',
      subtext: 'Zone optimale 0.8 - 1.3',
      trend: 'Équilibré',
      isGood: true
    }
  ];

  // Training ateliers schedule
  const ateliers = [
    {
      num: 1,
      name: 'Activation neuro-musculaire & renforcement excentrique',
      duration: '15 min',
      intensity: 'Modérée (RPE 5)',
      focus: 'Ischios, adducteurs et chevilles'
    },
    {
      num: 2,
      name: 'Conservation en supériorité 4v4 + 2 appuis neutres',
      duration: '20 min',
      intensity: 'Élevée (RPE 8)',
      focus: 'Transition rapide, densité et rythme'
    },
    {
      num: 3,
      name: 'Sprints courts 15 m avec changement de direction',
      duration: '15 min',
      intensity: 'Maximale (RPE 9)',
      focus: 'Cellules photoélectriques & pic d’explosivité'
    },
    {
      num: 4,
      name: 'Mise en place tactique dynamique & coups de pied arrêtés',
      duration: '20 min',
      intensity: 'Moyenne (RPE 6)',
      focus: 'Coordination collective'
    },
    {
      num: 5,
      name: 'Retour au calme & régénération active',
      duration: '5 min',
      intensity: 'Basse (RPE 2)',
      focus: 'Décrassage et hydratation'
    }
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Grid: Données de la séance récente + Plan du prochain entraînement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* DONNÉES ENTRAÎNEMENT RÉCENT & GPS CATAPULT (5/12) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Bilan GPS Séance J-2 (Catapult 10 Hz)
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Validé 100%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {physicalMetrics.map((met, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1"
              >
                <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase truncate">
                  {met.label}
                </span>
                <span className="text-xl font-black text-slate-900 font-mono block">
                  {met.value}
                </span>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-medium">{met.subtext}</span>
                  <span className="text-emerald-700 font-bold font-mono">{met.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sommeil & Récupération Card */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 block">
                  Récupération Moyenne Groupe
                </span>
                <span className="text-xs font-black text-slate-900">7h 45 de sommeil • HRV +4%</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-indigo-200">
              Optimale
            </span>
          </div>
        </div>

        {/* PLAN DU PROCHAIN ENTRAÎNEMENT (7/12) */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  Plan de la Prochaine Séance • Demain 10:30
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Terrain Pierre-Pibarot • Vitesse de réaction courte & intensité intermittente
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              75 min • RPE 7/10
            </span>
          </div>

          {/* Ateliers List */}
          <div className="space-y-1.5 flex-1">
            {ateliers.map((at) => (
              <div
                key={at.num}
                className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-amber-300 transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-black text-[11px] flex items-center justify-center shrink-0">
                    {at.num}
                  </span>
                  <div className="min-w-0">
                    <h5 className="font-bold text-slate-900 truncate">{at.name}</h5>
                    <span className="text-[10px] text-slate-500">{at.focus}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{at.duration}</span>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {at.intensity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Individual adjustments strip */}
          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs text-amber-900 font-medium">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Joueurs en aménagement :</strong> Mathis Dupont (-20% volume sprints), Adrien Rabiot (échauffement adapté).
              </span>
            </div>
            <button
              onClick={() => navigateTo('joueur_360', { playerId: 'dupont' })}
              className="text-[10px] font-bold text-blue-700 hover:underline shrink-0"
            >
              Voir Dupont 360° →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
