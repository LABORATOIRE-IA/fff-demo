import React, { useState } from 'react';
import { Player } from '../../types/ams';
import { useAMS } from '../../context/AMSContext';
import { getPlayerCockpitProfile } from '../../data/playerCockpitData';
import { PlayerHeadshot } from '../common/PlayerHeadshot';
import {
  TrendingUp,
  Sliders,
  Users,
  Shield,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Plus,
  ArrowRight,
  BarChart3,
  Scale,
  Gauge,
  HelpCircle,
  RefreshCw,
  Clock,
  Thermometer,
  Plane,
  Moon,
  Swords,
  Dumbbell,
  Compass,
  FileCheck
} from 'lucide-react';

interface PlayerPredictiveEngineViewProps {
  player: Player;
}

interface CustomFactor {
  id: string;
  label: string;
  category: 'météo' | 'logistique' | 'physique' | 'tactique' | 'santé';
  active: boolean;
  performanceImpact: number; // e.g. -4 or +3
  fatigueImpact: number; // e.g. +6 or -2
  injuryRiskImpact: number; // e.g. +3.5%
  description: string;
}

const FACTOR_ICONS = {
  météo: Thermometer,
  logistique: Plane,
  physique: Activity,
  tactique: Swords,
  santé: Shield
};

export const PlayerPredictiveEngineView: React.FC<PlayerPredictiveEngineViewProps> = ({ player }) => {
  const { players } = useAMS();
  const cockpit = getPlayerCockpitProfile(player);

  // Other players for comparison
  const otherPlayers = players.filter((p) => p.id !== player.id);
  const [comparedPlayerId, setComparedPlayerId] = useState<string>(
    otherPlayers[0]?.id || ''
  );
  const comparedPlayer = players.find((p) => p.id === comparedPlayerId) || otherPlayers[0];

  // Benchmark reference selection
  const [selectedBenchmark, setSelectedBenchmark] = useState<'groupe' | 'coupe_monde' | 'champions_league' | 'euro'>('groupe');

  // Simulation Sliders / Parameters
  const [minutesPlayed, setMinutesPlayed] = useState<number>(75);
  const [pressingIntensity, setPressingIntensity] = useState<number>(4); // 1 to 5
  const [sleepHours, setSleepHours] = useState<number>(8.5); // 5 to 10
  const [trainingLoadJMinus1, setTrainingLoadJMinus1] = useState<number>(0); // -30% to +30%

  // Pre-configured custom factors
  const [factors, setFactors] = useState<CustomFactor[]>([
    {
      id: 'meteo_chaleur',
      label: 'Chaleur & Température Élevée (>31°C)',
      category: 'météo',
      active: false,
      performanceImpact: -3,
      fatigueImpact: +8,
      injuryRiskImpact: +2.4,
      description: 'Augmentation de la déshydratation et de la contrainte cardiovasculaire.'
    },
    {
      id: 'vol_long_courrier',
      label: 'Déplacement & Vol Long-Courrier (>5h)',
      category: 'logistique',
      active: false,
      performanceImpact: -4,
      fatigueImpact: +10,
      injuryRiskImpact: +3.1,
      description: 'Perturbation des rythmes circadiens et raideur rachidienne.'
    },
    {
      id: 'pelouse_hybride',
      label: 'Pelouse Hybride Haute Adhérence',
      category: 'physique',
      active: true,
      performanceImpact: +4,
      fatigueImpact: +3,
      injuryRiskImpact: +1.2,
      description: 'Accélération des transitions et transmission de force accrue sur les appuis.'
    },
    {
      id: 'pressing_adverse',
      label: 'Pressing adverse',
      category: 'tactique',
      active: true,
      performanceImpact: +2,
      fatigueImpact: +7,
      injuryRiskImpact: +1.8,
      description: 'Multiplication des duels sous haute intensité et des accélérations explosives.'
    },
    {
      id: 'cryotherapie',
      label: 'Protocole Cryo Corps Entier à J-1',
      category: 'santé',
      active: true,
      performanceImpact: +3,
      fatigueImpact: -6,
      injuryRiskImpact: -2.5,
      description: 'Régénération neuromusculaire et élimination rapide des lactates.'
    }
  ]);

  // Modal to add a new custom factor
  const [isAddingFactor, setIsAddingFactor] = useState(false);
  const [newFactorName, setNewFactorName] = useState('');
  const [newFactorCategory, setNewFactorCategory] = useState<'météo' | 'logistique' | 'physique' | 'tactique' | 'santé'>('tactique');
  const [newFactorPerfImpact, setNewFactorPerfImpact] = useState<number>(-2);
  const [newFactorRiskImpact, setNewFactorRiskImpact] = useState<number>(1.5);

  const toggleFactor = (id: string) => {
    setFactors((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    );
  };

  const handleAddNewFactor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFactorName.trim()) return;

    const newF: CustomFactor = {
      id: `custom_${Date.now()}`,
      label: newFactorName.trim(),
      category: newFactorCategory,
      active: true,
      performanceImpact: newFactorPerfImpact,
      fatigueImpact: Math.abs(newFactorPerfImpact) * 2,
      injuryRiskImpact: newFactorRiskImpact,
      description: 'Facteur personnalisé injecté dans le modèle prédictif FFF.'
    };

    setFactors((prev) => [...prev, newF]);
    setNewFactorName('');
    setIsAddingFactor(false);
  };

  // Base player scores
  const basePerf = player.dimensions.performance.score;
  const baseHealth = player.dimensions.sante.score;
  const basePhysical = player.dimensions.physique.score;

  // Active factors delta calculation
  const activeFactors = factors.filter((f) => f.active);
  const factorPerfDelta = activeFactors.reduce((acc, f) => acc + f.performanceImpact, 0);
  const factorFatigueDelta = activeFactors.reduce((acc, f) => acc + f.fatigueImpact, 0);
  const factorRiskDelta = activeFactors.reduce((acc, f) => acc + f.injuryRiskImpact, 0);

  // Sliders Delta calculation
  // Minutes: 75 is baseline
  const minutesPerfDelta = (minutesPlayed - 75) * 0.15;
  const minutesFatigueDelta = (minutesPlayed - 75) * 0.4;
  const minutesRiskDelta = (minutesPlayed - 75) * 0.08;

  // Pressing: 3 is baseline
  const pressingPerfDelta = (pressingIntensity - 3) * 1.5;
  const pressingFatigueDelta = (pressingIntensity - 3) * 3.5;
  const pressingRiskDelta = (pressingIntensity - 3) * 0.9;

  // Sleep: 8h is baseline
  const sleepPerfDelta = (sleepHours - 8) * 2.2;
  const sleepFatigueDelta = (8 - sleepHours) * 3.5;
  const sleepRiskDelta = (8 - sleepHours) * 1.2;

  // Training J-1: 0 is baseline
  const trainingPerfDelta = (trainingLoadJMinus1 / 10) * 0.8;
  const trainingFatigueDelta = (trainingLoadJMinus1 / 10) * 2.0;
  const trainingRiskDelta = (trainingLoadJMinus1 / 10) * 0.6;

  // Total dynamic calculated metrics
  const dynamicPerformanceScore = Math.min(
    100,
    Math.max(40, Math.round(basePerf + factorPerfDelta + minutesPerfDelta + pressingPerfDelta + sleepPerfDelta + trainingPerfDelta))
  );

  const dynamicFatigueIndex = Math.min(
    100,
    Math.max(10, Math.round(25 + factorFatigueDelta + minutesFatigueDelta + pressingFatigueDelta + sleepFatigueDelta + trainingFatigueDelta))
  );

  const baseRisk = 100 - baseHealth; // e.g. 100 - 92 = 8%
  const dynamicInjuryRiskPct = Math.max(
    1.2,
    Math.min(38.5, parseFloat((baseRisk * 0.4 + factorRiskDelta + minutesRiskDelta + pressingRiskDelta + sleepRiskDelta + trainingRiskDelta).toFixed(1)))
  );

  // Confidence score calculation (93% to 99%)
  const confidenceScore = parseFloat(
    (98.4 - activeFactors.length * 0.2 - Math.abs(minutesPlayed - 75) * 0.03).toFixed(1)
  );

  // Preset Scenario selector
  const applyPresetScenario = (type: 'titulaire_90' | 'titulaire_65' | 'impact_sub_30' | 'decharge') => {
    if (type === 'titulaire_90') {
      setMinutesPlayed(90);
      setPressingIntensity(5);
      setTrainingLoadJMinus1(-10);
    } else if (type === 'titulaire_65') {
      setMinutesPlayed(65);
      setPressingIntensity(4);
      setTrainingLoadJMinus1(-15);
    } else if (type === 'impact_sub_30') {
      setMinutesPlayed(30);
      setPressingIntensity(5);
      setTrainingLoadJMinus1(0);
    } else if (type === 'decharge') {
      setMinutesPlayed(0);
      setPressingIntensity(1);
      setTrainingLoadJMinus1(-30);
    }
  };

  // Benchmark stats
  const benchmarkValues = {
    groupe: { label: 'Moyenne Groupe France A (24 joueurs)', perf: 87, physique: 88, sante: 91, vitesse: 33.8, sprints: 16, risk: 4.8 },
    coupe_monde: { label: 'Standard Vainqueur Coupe du Monde', perf: 92, physique: 93, sante: 95, vitesse: 34.6, sprints: 21, risk: 2.9 },
    champions_league: { label: 'Top 4 UEFA Champions League', perf: 90, physique: 91, sante: 92, vitesse: 34.2, sprints: 19, risk: 3.6 },
    euro: { label: 'Standard Demi-Finaliste UEFA Euro', perf: 89, physique: 90, sante: 93, vitesse: 34.0, sprints: 18, risk: 4.0 }
  }[selectedBenchmark];

  return (
    <div className="ams-predictive-engine space-y-4">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER MOTEUR PRÉDICTIF CENTRAL DU DÉMONSTRATEUR                   */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="space-y-1 max-w-3xl">
          <p className="text-xs font-bold uppercase text-blue-900">Analyse prédictive · {player.name}</p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Simulation de performance</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Estimations fondées sur la charge ACWR ({cockpit.acwr.ratio}), les données GPS, le sommeil et l'historique médical.
          </p>
        </div>
        <div className="flex items-baseline gap-2 shrink-0 text-blue-900">
          <span className="text-xs font-medium">Indice de simulation</span>
          <strong className="text-xl font-bold tabular-nums">{confidenceScore}%</strong>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SCORING DYNAMIQUE EN TEMPS RÉEL (METRIQUES IMPACTÉES PAR LES PARAMÈTRES) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Performance Dự đoán */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-tight text-slate-900">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span>Performance Match Prédite</span>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                dynamicPerformanceScore >= basePerf
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {dynamicPerformanceScore >= basePerf ? `+${dynamicPerformanceScore - basePerf}` : `${dynamicPerformanceScore - basePerf}`} pts
            </span>
          </div>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-black text-blue-900 font-mono">{dynamicPerformanceScore}</span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
            <span className="text-xs text-slate-500 font-medium ml-auto">
              (Base : {basePerf})
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                dynamicPerformanceScore > 85 ? 'bg-emerald-500' : dynamicPerformanceScore > 70 ? 'bg-blue-600' : 'bg-amber-500'
              }`}
              style={{ width: `${dynamicPerformanceScore}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 font-medium leading-tight pt-1">
            Impact estimé sur l'efficacité des sprints, la justesse technique et les duels gagnés.
          </p>
        </div>

        {/* Risque Lésionnel Prédit */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-tight text-slate-900">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span>Risque Lésionnel Calculé</span>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                dynamicInjuryRiskPct < 5
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : dynamicInjuryRiskPct < 12
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {dynamicInjuryRiskPct < 5 ? 'Risque faible' : dynamicInjuryRiskPct < 12 ? 'Risque modéré' : 'Risque élevé'}
            </span>
          </div>

          <div className="flex items-baseline gap-2 pt-1">
            <span
              className={`text-3xl font-black font-mono ${
                dynamicInjuryRiskPct < 5 ? 'text-emerald-600' : dynamicInjuryRiskPct < 12 ? 'text-amber-600' : 'text-rose-600'
              }`}
            >
              {dynamicInjuryRiskPct}%
            </span>
            <span className="text-xs text-slate-400 font-mono">probabilité</span>
            <span className="text-xs text-slate-500 font-medium ml-auto">
              (Tolérance &lt; 8%)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                dynamicInjuryRiskPct < 5 ? 'bg-emerald-500' : dynamicInjuryRiskPct < 12 ? 'bg-amber-500' : 'bg-rose-600'
              }`}
              style={{ width: `${Math.min(100, dynamicInjuryRiskPct * 3.5)}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 font-medium leading-tight pt-1">
            Modélisation croisée des ischio-jambiers, quadriceps et charge articulaire.
          </p>
        </div>

        {/* Fatigue Index à J+1 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-tight text-slate-900">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <span>Indice de Fatigue Résiduelle J+1</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Temps Récup : {Math.round(dynamicFatigueIndex * 0.48)}h
            </span>
          </div>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl font-black text-indigo-900 font-mono">{dynamicFatigueIndex}</span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
            <span className="text-xs text-slate-500 font-medium ml-auto">
              (Seuil critique : 70)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                dynamicFatigueIndex < 40 ? 'bg-emerald-500' : dynamicFatigueIndex < 65 ? 'bg-indigo-500' : 'bg-rose-500'
              }`}
              style={{ width: `${dynamicFatigueIndex}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 font-medium leading-tight pt-1">
            Délai d'élimination des toxines musculaires et de récupération du système nerveux central.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SIMULATEUR DE SCÉNARIOS ET CONTRÔLES INTERACTIFS (SLIDERS DYNAMIQUES)   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (7 cols): Interactive Sliders & Presets */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Paramètres de simulation
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
              Mise à jour immédiate
            </span>
          </div>

          {/* Quick Scenario Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-[10.5px] font-mono uppercase font-bold text-slate-400 block">
              Scénarios
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                onClick={() => applyPresetScenario('titulaire_90')}
                className={`p-2 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                  minutesPlayed === 90 && pressingIntensity === 5
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div>Titulaire 90 min</div>
              </button>

              <button
                onClick={() => applyPresetScenario('titulaire_65')}
                className={`p-2 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                  minutesPlayed === 65
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div>Titulaire 65 min</div>
              </button>

              <button
                onClick={() => applyPresetScenario('impact_sub_30')}
                className={`p-2 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                  minutesPlayed === 30
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div>Impact Sub (30')</div>
              </button>

              <button
                onClick={() => applyPresetScenario('decharge')}
                className={`p-2 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                  minutesPlayed === 0
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div>Décharge Complète</div>
              </button>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-3.5 pt-2">
            {/* Slider 1: Temps de jeu prévu */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Temps de jeu prévu sur la rencontre</span>
                </span>
                <span className="font-black text-blue-900 font-mono bg-blue-100/70 px-2 py-0.5 rounded-md">
                  {minutesPlayed} minutes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={minutesPlayed}
                onChange={(e) => setMinutesPlayed(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>0 min (Repos)</span>
                <span>45 min (1 mi-temps)</span>
                <span>65 min (Gestion)</span>
                <span>90 min (Intégralité)</span>
              </div>
            </div>

            {/* Slider 2: Intensité du pressing */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-amber-600" />
                  <span>Intensité du pressing & courses défensives</span>
                </span>
                <span className="font-black text-amber-900 font-mono bg-amber-100/70 px-2 py-0.5 rounded-md">
                  Niveau {pressingIntensity} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={pressingIntensity}
                onChange={(e) => setPressingIntensity(parseInt(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>1 (Bloc bas économe)</span>
                <span>3 (Médian standard)</span>
                <span>5 (Contre-pressing ultra)</span>
              </div>
            </div>

            {/* Slider 3: Sommeil & Récupération veille de match */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Durée de sommeil veille de match</span>
                </span>
                <span className="font-black text-indigo-900 font-mono bg-indigo-100/70 px-2 py-0.5 rounded-md">
                  {sleepHours} heures
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="10"
                step="0.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>5h (Dette de sommeil)</span>
                <span>8h (Standard optimal)</span>
                <span>10h (Régénération max)</span>
              </div>
            </div>

            {/* Slider 4: Charge d'entraînement à J-1 */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Modulation de charge de la séance J-1</span>
                </span>
                <span
                  className={`font-black font-mono px-2 py-0.5 rounded-md ${
                    trainingLoadJMinus1 < 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : trainingLoadJMinus1 === 0
                      ? 'bg-slate-100 text-slate-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {trainingLoadJMinus1 > 0 ? `+${trainingLoadJMinus1}%` : `${trainingLoadJMinus1}%`}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="5"
                value={trainingLoadJMinus1}
                onChange={(e) => setTrainingLoadJMinus1(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>-30% (Décharge totale)</span>
                <span>0% (Séance normale)</span>
                <span>+30% (Séance dense)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Facteurs Exogènes & Capacité d'Enrichissement */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Facteurs contextuels ({activeFactors.length} actifs)
                </h3>
              </div>
              <button
                onClick={() => setIsAddingFactor(true)}
                className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-bold border border-purple-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter un facteur</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Conditions prises en compte dans l'estimation.
            </p>
          </div>

          {/* Factor Chips List */}
          <div className="space-y-2 overflow-y-auto max-h-[310px] pr-1">
            {factors.map((f) => {
              const FactorIcon = FACTOR_ICONS[f.category];
              return <label
                key={f.id}
                className={`p-2.5 rounded-lg border transition-colors cursor-pointer flex items-start justify-between gap-2 ${
                  f.active
                    ? 'bg-blue-50/50 border-blue-200'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-2 min-w-0">
                  <FactorIcon className="w-4 h-4 shrink-0 mt-0.5 text-blue-700" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {f.label}
                    </span>
                    <p className="text-[10px] text-slate-500 leading-snug line-clamp-1 mt-0.5">
                      {f.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className="text-[10px] font-mono font-bold text-slate-600"
                  >
                    {f.performanceImpact >= 0 ? `+${f.performanceImpact}` : f.performanceImpact}
                  </span>
                  <input
                    type="checkbox"
                    checked={f.active}
                    onChange={() => toggleFactor(f.id)}
                    className="rounded accent-blue-600 cursor-pointer"
                  />
                </div>
              </label>;
            })}
          </div>

          {/* Modal / Form to add custom factor */}
          {isAddingFactor && (
            <form onSubmit={handleAddNewFactor} className="p-3 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-purple-950">
                <span>Nouveau facteur</span>
                <button
                  type="button"
                  onClick={() => setIsAddingFactor(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  Annuler
                </button>
              </div>

              <input
                type="text"
                value={newFactorName}
                onChange={(e) => setNewFactorName(e.target.value)}
                placeholder="Ex: Vent violent > 60km/h, Décalage horaire -6h..."
                className="w-full bg-white border border-purple-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-purple-600 font-medium"
              />

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[9px] font-mono text-slate-500 block">Impact Perf</label>
                  <select
                    value={newFactorPerfImpact}
                    onChange={(e) => setNewFactorPerfImpact(parseInt(e.target.value))}
                    className="w-full bg-white border border-purple-200 rounded-lg p-1 text-xs"
                  >
                    <option value="-5">-5 pts (Très pénalisant)</option>
                    <option value="-3">-3 pts (Pénalisant)</option>
                    <option value="-1">-1 pt (Léger frein)</option>
                    <option value="2">+2 pts (Favorable)</option>
                    <option value="4">+4 pts (Très favorable)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-mono text-slate-500 block">Impact Risque</label>
                  <select
                    value={newFactorRiskImpact}
                    onChange={(e) => setNewFactorRiskImpact(parseFloat(e.target.value))}
                    className="w-full bg-white border border-purple-200 rounded-lg p-1 text-xs"
                  >
                    <option value="-2.0">-2.0% (Protecteur)</option>
                    <option value="0.0">0.0% (Neutre)</option>
                    <option value="1.5">+1.5% (Vigilance)</option>
                    <option value="4.0">+4.0% (Haut Risque)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Ajouter au modèle
              </button>
            </form>
          )}

          {/* Quick takeaway box */}
          <div className="pt-3 border-t border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Résultat estimé</span>
            </span>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              Avec {minutesPlayed} min de jeu et une intensité niveau {pressingIntensity}, la performance de {player.name} est estimée à <strong>{dynamicPerformanceScore}/100</strong> et son risque de blessure à <strong>{dynamicInjuryRiskPct}%</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. COMPARATEUR MULTIDIMENSIONNEL : JOUEURS, GROUPE & RÉFÉRENTIELS          */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-600" />
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">
                Comparaison des résultats
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Confrontez {player.name} avec un coéquipier, la moyenne du groupe ou les référentiels internationaux.
              </p>
            </div>
          </div>

          {/* Benchmark Selector Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 overflow-x-auto">
            {[
              { id: 'groupe', label: 'Groupe France A' },
              { id: 'coupe_monde', label: 'Coupe du Monde' },
              { id: 'champions_league', label: 'Ligue des Champions' },
              { id: 'euro', label: 'UEFA Euro' }
            ].map((bm) => (
              <button
                key={bm.id}
                onClick={() => setSelectedBenchmark(bm.id as any)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedBenchmark === bm.id
                    ? 'bg-white text-blue-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {bm.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Way Comparative Grid: [Player Analyzed] VS [Compared Player] VS [Benchmark Benchmark] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: Player Analyzed (Current) */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border-2 border-blue-600 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-blue-600 text-white">
                Joueur Modélisé
              </span>
              <span className="text-xs font-mono font-bold text-blue-800">#{player.number} {player.position}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white font-black text-sm flex items-center justify-center font-mono overflow-hidden shrink-0">
                <PlayerHeadshot name={player.name} fallbackUrl={player.avatarUrl} className="w-full h-full rounded-lg" />
              </div>
              <div className="truncate">
                <span className="font-black text-sm text-slate-900 block truncate">{player.name}</span>
                <span className="text-xs text-slate-500 block truncate">{player.club}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs pt-1 border-t border-blue-200/60">
              <div className="flex justify-between py-1 border-b border-blue-100">
                <span className="text-slate-600">Performance Match Prédite</span>
                <span className="font-black text-blue-950 font-mono">{dynamicPerformanceScore}/100</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-100">
                <span className="text-slate-600">Vitesse Max Catapult</span>
                <span className="font-black text-blue-950 font-mono">{cockpit.gpsSummary?.vitesseMax || player.dimensions.physique.vitesseMax} km/h</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-100">
                <span className="text-slate-600">Ratio ACWR Charge</span>
                <span className="font-black text-emerald-700 font-mono">{cockpit.acwr.ratio}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Risque Lésionnel</span>
                <span className="font-black text-emerald-700 font-mono">{dynamicInjuryRiskPct}%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Compared Teammate (Interactive Selector) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                Coéquipier Sélectionné
              </span>
              <select
                value={comparedPlayerId}
                onChange={(e) => setComparedPlayerId(e.target.value)}
                className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-2 py-0.5 focus:outline-none cursor-pointer"
              >
                {otherPlayers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.position})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-white font-black text-sm flex items-center justify-center font-mono overflow-hidden shrink-0">
                <PlayerHeadshot name={comparedPlayer?.name || 'Joueur'} fallbackUrl={comparedPlayer?.avatarUrl} className="w-full h-full rounded-lg" />
              </div>
              <div className="truncate">
                <span className="font-black text-sm text-slate-900 block truncate">{comparedPlayer?.name}</span>
                <span className="text-xs text-slate-500 block truncate">{comparedPlayer?.club}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Performance Match Prédite</span>
                <span className="font-bold text-slate-900 font-mono">{comparedPlayer?.dimensions?.performance?.score || 88}/100</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Vitesse Max Catapult</span>
                <span className="font-bold text-slate-900 font-mono">{comparedPlayer?.dimensions?.physique?.vitesseMax || 34.0} km/h</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Ratio ACWR Charge</span>
                <span className="font-bold text-emerald-700 font-mono">1.04</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Risque Lésionnel</span>
                <span className="font-bold text-emerald-700 font-mono">4.5%</span>
              </div>
            </div>
          </div>

          {/* Card 3: Selected Benchmark Standard */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                Référentiel Fédéral
              </span>
              <span className="text-xs font-mono font-bold text-amber-900">Standard Élite</span>
            </div>

            <div>
              <span className="font-black text-sm text-slate-900 block truncate">{benchmarkValues.label}</span>
              <span className="text-xs text-slate-500 block">Norme Internationale FIFA / UEFA</span>
            </div>

            <div className="space-y-1.5 text-xs pt-1 border-t border-amber-200/60">
              <div className="flex justify-between py-1 border-b border-amber-100">
                <span className="text-slate-600">Performance Standard</span>
                <span className="font-bold text-amber-950 font-mono">{benchmarkValues.perf}/100</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-100">
                <span className="text-slate-600">Vitesse Moyenne Élite</span>
                <span className="font-bold text-amber-950 font-mono">{benchmarkValues.vitesse} km/h</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-100">
                <span className="text-slate-600">Sprints &gt;25km/h</span>
                <span className="font-bold text-amber-950 font-mono">{benchmarkValues.sprints} / match</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Seuil Tolérance Risque</span>
                <span className="font-bold text-emerald-700 font-mono">&lt; {benchmarkValues.risk}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
