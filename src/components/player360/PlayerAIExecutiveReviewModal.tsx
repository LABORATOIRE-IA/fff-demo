import React, { useState, useRef, useEffect } from 'react';
import { Player } from '../../types/ams';
import { getPlayerCockpitProfile } from '../../data/playerCockpitData';
import { COMPREHENSIVE_MEDICAL_RECORDS } from '../../data/medicalRecordsData';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import {
  Sparkles,
  Bot,
  Send,
  X,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Heart,
  Zap,
  Shield,
  Stethoscope,
  TrendingUp,
  Clock,
  Dumbbell,
  Swords,
  Flame,
  FileText,
  Info,
  ChevronRight,
  Database
} from 'lucide-react';

interface PlayerAIExecutiveReviewModalProps {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
}

export const PlayerAIExecutiveReviewModal: React.FC<PlayerAIExecutiveReviewModalProps> = ({
  player,
  isOpen,
  onClose
}) => {
  const cockpit = getPlayerCockpitProfile(player);
  const medicalRecords = COMPREHENSIVE_MEDICAL_RECORDS.filter(r => r.playerId === player.id);

  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate rich, highly detailed human-written clinical and physical narratives
  const getNarrativeMedicalSummary = () => {
    const isMba = player.name.includes('Mbappé');
    const isDem = player.name.includes('Dembélé');
    const isKou = player.name.includes('Koundé');
    const isGriz = player.name.includes('Griezmann');
    const isTchou = player.name.includes('Tchouaméni');
    const isSaliba = player.name.includes('Saliba');
    const isHernandez = player.name.includes('Hernandez');
    const isMaignan = player.name.includes('Maignan');

    if (isMba) {
      return {
        clinicalStatus: "Douleurs musculaires à la cuisse gauche et tension au niveau du quadriceps totalement rétablies après le protocole de régénération du Real Madrid et les soins du Dr. Le Gall.",
        currentForm: "Actuellement en pleine forme physique et mentale. Tests d'explosivité validés à 100%, explosivité maximale sur les 15 premiers mètres et pic à 35.8 km/h.",
        sleepAndRecup: "Sommeil réparateur mesuré à 8h45 par nuit. Variabilité cardiaque (HRV) stabilisée à 82 ms, indice de fraîcheur neuromusculaire optimal.",
        injuryRiskDetail: "Risque lésionnel nul à très faible (Score vert). Tests isocinétiques des ischio-jambiers et des adducteurs totalement indolores à la contraction excentrique maximale.",
        matchAdvice: `Aptitude totale pour débuter titulaire et disputer jusqu'à 85-90 minutes à très haute intensité face à la ${UPCOMING_MATCH.awayTeam}.`,
        staffZidaneNote: "Joueur à 100% de ses capacités athlétiques. Recommandation : l'aligner dès le coup d'envoi et exploiter sa vitesse sur les transitions rapides.",
        staffMedicalNote: "Poursuivre les étirements activo-dynamiques en fin de séance et cryothérapie corps entier à J-1.",
        staffPhysicalNote: "Décharge programmée sur la séance J-1 pour préserver toute l'explosivité neuromusculaire."
      };
    } else if (isDem) {
      return {
        clinicalStatus: "Légère raideur résiduelle sur les ischio-jambiers gauches en voie de résorption complète. Échographie de contrôle rassurante (cicatrisation myotendineuse confirmée).",
        currentForm: "Forme athlétique en nette progression (Score 78/100). Capacité de sprint intacte (35.2 km/h) mais gestion du volume de courses recommandée.",
        sleepAndRecup: "Sommeil régulier (7h50). HRV à 68 ms indiquant une légère fatigue centrale consécutive aux derniers matchs en club.",
        injuryRiskDetail: "Risque lésionnel sous vigilance modérée (Orange). Éviter les surcharges en fin de séance.",
        matchAdvice: "Entrée en jeu préconisée en seconde mi-temps (30 à 35 minutes de jeu) pour impacter le match sans prendre de risque de rechute.",
        staffZidaneNote: `Conserver comme joker de luxe en 2e période afin de déstabiliser la défense belge fatiguée.`,
        staffMedicalNote: "Massage décontracturant des ischios matin et soir + application de thermothérapie avant l'échauffement.",
        staffPhysicalNote: "Échauffement individualisé de 15 minutes supplémentaire avec focus sur la chaîne postérieure."
      };
    } else if (isKou) {
      return {
        clinicalStatus: "Aucune douleur ni gêne articulaire signalée. Stabilité pelvienne et souplesse des adducteurs exemplaires.",
        currentForm: "En excellente forme athlétique, endurance et puissance musculaire au sommet de son cycle.",
        sleepAndRecup: "Sommeil profond (8h15). Indice de récupération autonome à 79 ms.",
        injuryRiskDetail: "Risque de blessure minime (Score santé 96/100). Intégrité musculaire parfaite.",
        matchAdvice: "Feu vert total pour 90 minutes. Capable de répéter les efforts défensifs et offensifs sur son couloir.",
        staffZidaneNote: "Titulaire indiscutable sur le flanc droit ou dans l'axe. Impact maximal dans les duels aériens et au sol.",
        staffMedicalNote: "Check-up post-séance classique sans soin particulier requis.",
        staffPhysicalNote: "Maintien de la charge d'entretien en salle de musculation."
      };
    } else if (isTchou) {
      return {
        clinicalStatus: "Gêne au métatarse droit et douleurs à la cheville complètement effacées. Consolidation osseuse et ligamentaire parfaite.",
        currentForm: "Pleine possession de ses moyens physiques, impact à la récupération et volume de jeu à son zénith.",
        sleepAndRecup: "Qualité de sommeil remarquable (8h30). HRV optimal à 84 ms.",
        injuryRiskDetail: "Risque lésionnel quasi nul. Mobilité articulaire de la cheville testée à 100%.",
        matchAdvice: "Titularisation recommandée au milieu de terrain, tolérance complète pour 90 minutes d'intensité internationale.",
        staffZidaneNote: "Pilier de la sentinelle devant la défense. Régulateur essentiel pour contrer la possession belge.",
        staffMedicalNote: "Strapping préventif de cheville validé par précaution.",
        staffPhysicalNote: "Travail proprioceptif d'activation avant chaque séance."
      };
    } else if (isGriz) {
      return {
        clinicalStatus: "Bilan ostéo-articulaire impeccable. Aucune séquelle de fatigue musculaire malgré l'enchaînement des matchs.",
        currentForm: "Excellente forme globale, intelligence de déplacement et endurance aérobie de tout premier plan.",
        sleepAndRecup: "Indicateurs de sommeil et de repos stables, niveau d'énergie matinal maximal.",
        injuryRiskDetail: "Historique médical ultra-résilient, risque de blessure classé en zone verte absolue.",
        matchAdvice: "Prêt pour 90 minutes. Capacité démontrée à couvrir plus de 11.5 km par rencontre.",
        staffZidaneNote: "Meneur de jeu libre entre les lignes. Indispensable pour la fluidité des transitions offensives.",
        staffMedicalNote: "Bain glacé et pressothérapie post-entraînement.",
        staffPhysicalNote: "Gestion intelligente de la décharge tactique."
      };
    } else if (isSaliba) {
      return {
        clinicalStatus: "Douleurs aux lombaires et raideurs musculaires totalement disparues. Bilan du dos validé sans réserve.",
        currentForm: "Au sommet de sa puissance athlétique, vitesse et solidité dans les duels au corps à corps.",
        sleepAndRecup: "Sommeil de 8h20, HRV à 81 ms, fraîcheur physique remarquable.",
        injuryRiskDetail: "Risque de blessure minime (Score santé 95/100).",
        matchAdvice: `Plein feu vert pour disputer l'intégralité de la rencontre face à la ${UPCOMING_MATCH.awayTeam}.`,
        staffZidaneNote: "Garant de l'alignement défensif et de la relance courte sous pression.",
        staffMedicalNote: "Gainage et étirements pelviens d'entretien.",
        staffPhysicalNote: "Séance de réactivité et vivacité sur appuis courts."
      };
    } else if (isMaignan) {
      return {
        clinicalStatus: "Douleurs antérieures au mollet gauche et aux doigts entièrement guéries. Réflexes et mobilité au sol à 100%.",
        currentForm: "Forme explosive remarquable, puissance de saut et réactivité neuromusculaire optimales.",
        sleepAndRecup: "Sommeil profond de 8h40, score de récupération cardiovasculaire exceptionnel.",
        injuryRiskDetail: "Intégrité musculaire et ligamentaire parfaite (Score santé 94/100).",
        matchAdvice: "Titulaire incontournable dans les cages pour 90 minutes.",
        staffZidaneNote: "Leader vocal du vestiaire et premier relanceur de l'équipe.",
        staffMedicalNote: "Soins préventifs des doigts et des poignets avant chaque entraînement.",
        staffPhysicalNote: "Travail spécifique d'explosivité sur petits pas et plongeons."
      };
    } else {
      // Default fallback for any other player
      const isGood = player.dimensions.sante.score > 85;
      return {
        clinicalStatus: isGood
          ? `Douleurs musculaires récentes totalement résorbées. Bilan clinique d'arrivée validé sans restriction par le Dr. Franck Le Gall.`
          : `Légère tension musculaire surveillée au pôle médical. Protocole d'adaptation de charge en cours avec bonne évolution.`,
        currentForm: isGood
          ? `Actuellement en pleine forme physique et prêt à 100% pour les exigences du match international.`
          : `Forme physique satisfaisante (Score ${player.dimensions.performance.score}/100) avec montée en puissance progressive.`,
        sleepAndRecup: `Qualité du sommeil mesurée à ${cockpit.recoverySummary.sommeil} (${cockpit.recoverySummary.sommeilQualite}), équilibre nerveux stable (HRV ${cockpit.recoverySummary.hrv} ms).`,
        injuryRiskDetail: isGood
          ? `Risque de blessure faible (Zone verte). Tests de force et de souplesse conformes aux exigences FFF.`
          : `Risque modéré sous contrôle. Surveillance accrue de la chaîne musculaire principale.`,
        matchAdvice: isGood
          ? `Feu vert complet pour débuter la rencontre face à la ${UPCOMING_MATCH.awayTeam}.`
          : `Temps de jeu adapté conseillé (45 à 60 minutes) selon l'évolution du score.`,
        staffZidaneNote: `Joueur disponible selon vos besoins tactiques sur le plan de match.`,
        staffMedicalNote: `Soins réguliers d'entretien et décontraction post-effort.`,
        staffPhysicalNote: `Calibrage de charge ACWR à ${cockpit.acwr.ratio} pour éviter toute fatigue résiduelle.`
      };
    }
  };

  const narrative = getNarrativeMedicalSummary();

  // Suggested prompts for this specific player
  const suggestedQueries = [
    `Quel est le temps de jeu maximal recommandé pour ${player.name} face à la ${UPCOMING_MATCH.awayTeam} ?`,
    `Quel est l'état de ses douleurs musculaires et le diagnostic du Dr. Le Gall ?`,
    `Donne-moi son bilan GPS Catapult récent (vitesse max et ratio ACWR)`,
    `Quelles sont les consignes de récupération et sommeil pour ${player.name} ?`
  ];

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  if (!isOpen) return null;

  // Generate dynamic, context-aware answers based on the player's full database
  const handleSendQuery = (queryText?: string) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let aiResponse = '';
      let sources: string[] = ['Dossier Médical FFF', 'Capteurs Catapult Vector 10Hz', 'Base Tactique FFF'];

      const qLower = query.toLowerCase();

      if (qLower.includes('temps de jeu') || qLower.includes('minute') || qLower.includes(UPCOMING_MATCH.awayTeam.toLowerCase()) || qLower.includes('titulaire')) {
        aiResponse = `Recommandation de match pour ${player.name} face à la ${UPCOMING_MATCH.awayTeam} : \n\n• ${narrative.matchAdvice} \n• ${narrative.currentForm} \n\nConsigne Tactique Zidane : ${narrative.staffZidaneNote}`;
      } else if (qLower.includes('blessure') || qLower.includes('ischio') || qLower.includes('adducteur') || qLower.includes('santé') || qLower.includes('médical') || qLower.includes('douleur') || qLower.includes('cuisse')) {
        const hasHistory = medicalRecords.length > 0;
        aiResponse = `Bilan Médical & Risques Lésionnels (${player.name}) : \n\n• ${narrative.clinicalStatus} \n• ${narrative.injuryRiskDetail} \n\n${
          hasHistory
            ? `Dernier examen enregistré : ${medicalRecords[0].title} (${medicalRecords[0].date}) - Motif : ${medicalRecords[0].motif}.`
            : 'Aucun antécédent lésionnel majeur récent répertorié au dossier fédéral.'
        } \n\nConsigne Médicale Dr. Le Gall : ${narrative.staffMedicalNote}`;
      } else if (qLower.includes('gps') || qLower.includes('vitesse') || qLower.includes('acwr') || qLower.includes('charge') || qLower.includes('physique')) {
        aiResponse = `Monitoring GPS Catapult Vector 10Hz & Condition Physique (${player.name}) : \n\n• ${narrative.currentForm} \n• Ratio ACWR : ${cockpit.acwr.ratio} (Zone optimale de charge) \n• Vitesse Max : ${cockpit.gpsSummary?.vitesseMax || player.dimensions.physique.vitesseMax} km/h \n• Sprints haute intensité (>25 km/h) : ${cockpit.gpsSummary?.sprintsCount || 18} \n\nConsigne Athlétique : ${narrative.staffPhysicalNote}`;
      } else if (qLower.includes('récupération') || qLower.includes('sommeil') || qLower.includes('fatigue') || qLower.includes('hrv')) {
        aiResponse = `Bilan de Récupération & Sommeil (${player.name}) : \n\n• ${narrative.sleepAndRecup} \n• Protocole préconisé à Clairefontaine : Pressothérapie post-séance + immersion en eau froide (10 min à 10°C) + régulation de la température de chambre à 19°C.`;
      } else {
        aiResponse = `Revue Globale IA 360° pour ${player.name} (${player.position}, ${player.club}) : \n\n• État clinique : ${narrative.clinicalStatus} \n• État de forme : ${narrative.currentForm} \n• Recommandation : ${narrative.matchAdvice}`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl h-[92vh] max-h-[920px] rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden text-slate-900 select-none">
        {/* ========================================================================= */}
        {/* 1. HEADER DU RAPPORT EXÉCUTIF IA 360°                                     */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-blue-900/50 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-300 shadow-md shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/50">
                  RAPPORT EXÉCUTIF IA BLEUS 360°
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-slate-300 font-mono">
                  Fiabilité Prédictive 98.4%
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white truncate flex items-center gap-2 mt-0.5">
                <span>Revue Globale & Diagnostic Multi-Sources • {player.name}</span>
                <span className="text-xs font-mono font-bold text-blue-200 bg-blue-900/60 px-2 py-0.2 rounded-md">
                  #{player.number} {player.position}
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
            title="Fermer le rapport"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. CONTENU DU RAPPORT (SCROLLABLE)                                        */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
          {/* Executive Summary Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-slate-900/10 border border-blue-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900">
                <Shield className="w-4 h-4 text-blue-700 shrink-0" />
                <span>SYNTHÈSE DIRECTORIALE & RECOMMANDATION DE MATCH</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                {narrative.matchAdvice}
              </p>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {narrative.currentForm}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <div className="text-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs min-w-[95px]">
                <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Score Global</span>
                <span className="text-xl font-black text-blue-700 font-mono">{player.dimensions.performance.score}/100</span>
              </div>
              <div className="text-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs min-w-[95px]">
                <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Disponibilité</span>
                <span className="text-xs font-black text-emerald-700 block mt-1 uppercase font-mono">{player.status}</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pilier 1 : Médical & Risques Lésionnels */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-rose-600" />
                  <h3 className="text-xs font-black uppercase tracking-wide text-slate-900">
                    1. Diagnostic Médical & Risques Lésionnels
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                  Santé {player.dimensions.sante.score}/100
                </span>
              </div>

              {/* Rich Written Clinical Diagnosis */}
              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-rose-900 uppercase block">
                  Observation Clinique Fédérale :
                </span>
                <p className="text-xs font-medium leading-relaxed text-slate-900">
                  {narrative.clinicalStatus}
                </p>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  {narrative.injuryRiskDetail}
                </p>
              </div>

              <div className="space-y-1.5 text-xs pt-1">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Bilan d'arrivée Clairefontaine</span>
                  <span className="font-bold text-slate-900">Validé par Dr. Le Gall</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Dossiers médicaux récents</span>
                  <span className="font-mono font-bold text-slate-700">{medicalRecords.length} archivé(s)</span>
                </div>
              </div>
            </div>

            {/* Pilier 2 : Monitoring Athlétique & GPS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-black uppercase tracking-wide text-slate-900">
                    2. Monitoring Athlétique & Récupération
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Physique {player.dimensions.physique.score}/100
                </span>
              </div>

              {/* Rich Written Athletic & Recovery observation */}
              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-amber-900 uppercase block">
                  Bilan de Récupération & Sommeil :
                </span>
                <p className="text-xs font-medium leading-relaxed text-slate-900">
                  {narrative.sleepAndRecup}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[9px] text-slate-400 block font-mono">Ratio ACWR</span>
                  <span className="font-black text-emerald-700 font-mono text-xs">{cockpit.acwr.ratio}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[9px] text-slate-400 block font-mono">Vitesse Max</span>
                  <span className="font-black text-blue-700 font-mono text-xs">{cockpit.gpsSummary?.vitesseMax || player.dimensions.physique.vitesseMax} km/h</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[9px] text-slate-400 block font-mono">Sprints &gt;25km/h</span>
                  <span className="font-black text-slate-900 font-mono text-xs">{cockpit.gpsSummary?.sprintsCount || 18}</span>
                </div>
              </div>
            </div>

            {/* Pilier 3 : Rendement Tactique */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-black uppercase tracking-wide text-slate-900">
                    3. Profil Tactique & Impact Collectif
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  Performance {player.dimensions.performance.score}/100
                </span>
              </div>

              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {cockpit.tacticalRoleDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cockpit.atouts.map((atout, idx) => (
                  <span key={idx} className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    ✓ {atout.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Pilier 4 : Recommandations Staff Individualisées */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-black uppercase tracking-wide text-slate-900">
                    4. Consignes Rédigées pour le Staff FFF
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400">Match J-2</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 text-blue-950 space-y-0.5">
                  <strong className="block font-bold text-[11px] text-blue-900">Pour Zinédine Zidane (Sélectionneur) :</strong>
                  <p className="text-[11px] font-medium leading-relaxed">{narrative.staffZidaneNote}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-emerald-950 space-y-0.5">
                  <strong className="block font-bold text-[11px] text-emerald-900">Pour la Préparation Physique :</strong>
                  <p className="text-[11px] font-medium leading-relaxed">{narrative.staffPhysicalNote}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50/80 border border-purple-100 text-purple-950 space-y-0.5">
                  <strong className="block font-bold text-[11px] text-purple-900">Pour le Dr. Franck Le Gall (Médical) :</strong>
                  <p className="text-[11px] font-medium leading-relaxed">{narrative.staffMedicalNote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Thread (Interactive Q&A answers) */}
          {messages.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>Réponses Spécifiques & Questionnement Base de Données</span>
              </div>

              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3.5 rounded-2xl border ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white border-blue-600 ml-8 sm:ml-16 shadow-xs'
                        : 'bg-white text-slate-900 border-slate-200 mr-8 sm:mr-16 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold opacity-80">
                        {msg.sender === 'user' ? 'Question du Staff' : 'Intelligence Artificielle BLEUS 360'}
                      </span>
                      <span className="text-[9px] font-mono opacity-60">{msg.timestamp}</span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </p>

                    {msg.sources && (
                      <div className="mt-2 pt-1.5 border-t border-slate-100 flex flex-wrap items-center gap-1 text-[9px] font-mono text-slate-400">
                        <span className="font-bold text-blue-600">Sources vérifiées :</span>
                        {msg.sources.join(' • ')}
                      </div>
                    )}
                  </div>
                ))}

                {isThinking && (
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 mr-16 flex items-center gap-2 text-xs text-slate-500 font-medium shadow-xs">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                    <span>Analyse de l'ensemble de la base de données de {player.name} en cours...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. LIGNE INTERACTIVE DE QUESTIONNEMENT EN LANGAGE NATUREL (BAS DE PAGE)   */}
        {/* ========================================================================= */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200/90 space-y-2.5 shrink-0">
          {/* Quick chip suggestions */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Questions rapides :</span>
            </span>
            {suggestedQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuery(q)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] font-medium border border-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={`Poser une question en langage naturel sur toute la base de données de ${player.name}...`}
                className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none rounded-2xl py-2.5 pl-4 pr-10 text-xs sm:text-sm font-medium text-slate-900 transition-colors placeholder:text-slate-400"
              />
              <Bot className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Interroger</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
