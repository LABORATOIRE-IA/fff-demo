import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import { RoleObjective } from '../../data/objectivesData';
import {
  X,
  Sparkles,
  Shield,
  Compass,
  Check,
  Plus,
  Target,
  Sliders,
  UserCheck
} from 'lucide-react';

interface CreateObjectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onObjectiveCreated?: (newObjective: RoleObjective) => void;
}

const EMOJI_OPTIONS = ['🎯', '⚡', '📋', '🩺', '🛡️', '🚀', '🧠', '🩹', '🏆', '⚽', '📊'];

export const CreateObjectiveModal: React.FC<CreateObjectiveModalProps> = ({
  isOpen,
  onClose,
  onObjectiveCreated
}) => {
  const { userRole, roleConfig, players, addCustomObjective, navigateTo } = useAMS();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState(
    userRole === 'entraineur'
      ? 'Feuille de Match'
      : userRole === 'medical'
      ? 'Diagnostic Médical'
      : userRole === 'arbitrage'
      ? 'Préparation Match Arbitre'
      : 'Performance'
  );
  const [icon, setIcon] = useState('🎯');
  const [confidenceScore, setConfidenceScore] = useState<number>(97.5);
  const [targetPlayerId, setTargetPlayerId] = useState<string>('mbappe');
  const [predictiveHighlight, setPredictiveHighlight] = useState('');
  const [recommendationAction, setRecommendationAction] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newObjId = `custom_obj_${Date.now()}`;
    const selectedPlayer = players.find((p) => p.id === targetPlayerId);

    const newObjective: RoleObjective = {
      id: newObjId,
      role: userRole,
      title: title.trim(),
      subtitle: subtitle.trim() || `Objectif stratégique formulé pour ${roleConfig.title}`,
      category: category.trim() || 'Personnalisé',
      badge: `${category.trim() || 'Stratégie'} • Priorité Haute`,
      icon: icon || '🎯',
      priorityOrder: 0,
      confidenceScore: confidenceScore,
      predictiveHighlight:
        predictiveHighlight.trim() ||
        `Modélisation prédictive AMS 360 calibrée à ${confidenceScore}% de confiance pour cet objectif.`,
      shortSummary: `Analyse décisionnelle sur-mesure pour ${roleConfig.userName} (${roleConfig.title}).`,
      detailedAnalysis: `Cet objectif personnalisé est synchronisé avec les flux de télémétrie GPS Catapult et les bilans médicaux FFF. La modélisation recommande une intervention ciblée.`,
      forecasts: [
        {
          label: "Score de Confiance",
          value: `${confidenceScore}%`,
          trend: "Optimal",
          isPositive: true,
          explanation: "Calculé sur les signaux physiologiques et tactiques"
        },
        {
          label: "Impact Performance",
          value: "+8.4%",
          trend: "Positif",
          isPositive: true,
          explanation: "Gain d'efficacité collective attendu"
        },
        {
          label: "Disponibilité Effectif",
          value: "100%",
          trend: "Complet",
          isPositive: true,
          explanation: "Groupe opérationnel pour ce plan"
        }
      ],
      recommendations: [
        {
          actor: roleConfig.userName,
          action:
            recommendationAction.trim() ||
            `Appliquer la consigne prioritaire et ajuster la charge à l'entraînement J-1.`,
          urgency: 'haute',
          impact: "Sécurisation de l'objectif à 100%"
        },
        {
          actor: "Staff Performance FFF",
          action: "Vérifier la réponse neuromusculaire et l'hydratation post-séance.",
          urgency: 'normale',
          impact: "Maintien de la compacité"
        }
      ],
      keyMetrics: [
        { name: "Objectif Actif", value: "Prioritaire", subtext: "Formulé par l'utilisateur" },
        { name: "Score Confiance", value: `${confidenceScore}%`, subtext: "Modèle FFF" },
        {
          name: "Joueur Associé",
          value: targetPlayerId === 'none' ? 'Collectif' : selectedPlayer?.name || 'Groupe',
          subtext: targetPlayerId === 'none' ? 'Ensemble du groupe' : selectedPlayer?.club || 'France A'
        }
      ],
      targetPlayerId: targetPlayerId === 'none' ? undefined : targetPlayerId,
      actionButtonLabel: "Ouvrir l'Analyse Stratégique",
      sourcesQualified: [
        "Capteurs GPS Catapult Vector 10Hz",
        "Dossiers Médicaux FFF Dr. Le Gall",
        "Moteur Décisionnel AMS 360"
      ],
      dimensionArticulation: {
        individualSummary: `Suivi individualisé des charges athlétiques et des signaux de fraîcheur pour cet objectif.`,
        collectiveSummary: `Harmonisation des lignes tactiques et préservation de la compacité du bloc médian à 34 mètres.`,
        articulationExplanation: `L'atteinte de cet objectif individuel renforce directement la solidité collective du groupe.`,
        playerWorkItems: [
          {
            playerId: targetPlayerId === 'none' ? 'mbappe' : targetPlayerId,
            playerName: selectedPlayer?.name || 'Kylian Mbappé',
            position: selectedPlayer?.position || 'Attaquant',
            focusArea: "Application des consignes ciblées",
            workItems: [
              "Adaptation de l'intensité sur les phases de transition",
              "Validation du protocole de récupération individualisé"
            ],
            individualImpact: "Optimisation de la fraîcheur physique",
            collectiveImpact: "Garantit la cohésion du plan de jeu"
          }
        ]
      }
    };

    addCustomObjective(newObjective);
    if (onObjectiveCreated) {
      onObjectiveCreated(newObjective);
    }
    onClose();
    navigateTo('ai_strategy');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/60 via-white to-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Créer un Objectif Stratégique
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Pour le rôle : <strong>{roleConfig.title}</strong> ({roleConfig.userName})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span>Titre de l'objectif</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Optimiser la compacité face au pressing haut espagnol"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-slate-900 font-semibold"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">
              Périmètre opérationnel & Sous-titre
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ex: Analyse des courses défensives et gestion des retours de contre-attaque"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-slate-900 font-medium"
            />
          </div>

          {/* Category & Emoji & Target Player */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-semibold cursor-pointer"
              >
                <option value="Feuille de Match">Feuille de Match</option>
                <option value="Planification Semaine">Planification Semaine</option>
                <option value="Simulation Tactique">Simulation Tactique</option>
                <option value="Plan Sur Mesure Joueur">Plan Sur Mesure Joueur</option>
                <option value="Diagnostic Médical">Diagnostic Médical</option>
                <option value="Agenda Médical">Agenda Médical</option>
                <option value="Préparation Arbitre">Préparation Arbitre</option>
                <option value="Debriefing Match">Debriefing Match</option>
                <option value="Performance & Charge">Performance & Charge</option>
              </select>
            </div>

            {/* Target Player */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Joueur Ciblé</label>
              <select
                value={targetPlayerId}
                onChange={(e) => setTargetPlayerId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-semibold cursor-pointer"
              >
                <option value="none">Collectif / Groupe</option>
                {players.slice(0, 15).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.position})
                  </option>
                ))}
              </select>
            </div>

            {/* Icon selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Icône</label>
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {EMOJI_OPTIONS.slice(0, 6).map((emo) => (
                  <button
                    key={emo}
                    type="button"
                    onClick={() => setIcon(emo)}
                    className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center border cursor-pointer transition-colors shrink-0 ${
                      icon === emo
                        ? 'bg-blue-100 border-blue-600 ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {emo}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Predictive Highlight snippet */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Prévision ou Signal Clé Attendu</span>
            </label>
            <textarea
              rows={2}
              value={predictiveHighlight}
              onChange={(e) => setPredictiveHighlight(e.target.value)}
              placeholder="Ex: Chute de 18% des sprints à haute intensité en cas de pressing continu sous 28°C."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-slate-900 font-medium resize-none"
            />
          </div>

          {/* Recommendation */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Consigne Opérationnelle Recommandée</span>
            </label>
            <input
              type="text"
              value={recommendationAction}
              onChange={(e) => setRecommendationAction(e.target.value)}
              placeholder="Ex: Planifier deux rotations tactiques ciblées à la 60e et 75e minute."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-slate-900 font-medium"
            />
          </div>

          {/* Confidence slider */}
          <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-950 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Score de Confiance Estimé :</span>
              </span>
              <span className="font-mono font-black text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                {confidenceScore}%
              </span>
            </div>
            <input
              type="range"
              min={80}
              max={99.5}
              step={0.5}
              value={confidenceScore}
              onChange={(e) => setConfidenceScore(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-blue-200 rounded-lg"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Créer et ouvrir dans Stratégie</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
