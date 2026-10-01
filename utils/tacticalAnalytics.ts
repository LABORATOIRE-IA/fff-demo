import { Player } from '../types/ams';
import { TacticalScenarioConfig, TacticalSlot } from '../data/strategyData';

export interface CalculatedXIMetrics {
  forme: number;
  recuperation: number;
  intensite: number;
  charge: number;
  disponibilite: number;
  equilibre: number;
}

export interface PlayerEvaluationDetail {
  player: Player;
  slot: TacticalSlot;
  formeScore: number;
  recupScore: number;
  chargeStatus: string;
  dispoPercentage: number;
  recentPerfTrend: string;
  physicalProfile: string;
  justification: string;
}

export const calculateXIMetrics = (
  scenario: TacticalScenarioConfig,
  currentSlotMap: Record<string, string>, // slotId -> playerId
  allPlayers: Player[]
): CalculatedXIMetrics => {
  const currentPlayers = scenario.slots
    .map((slot) => {
      const pId = currentSlotMap[slot.id] || slot.defaultPlayerId;
      return allPlayers.find((p) => p.id === pId);
    })
    .filter(Boolean) as Player[];

  if (currentPlayers.length === 0) {
    return scenario.baselineMetrics;
  }

  // 1. Forme moyenne
  const avgForme = Math.round(
    currentPlayers.reduce((acc, p) => acc + (p.dimensions?.performance?.score || p.scoreGlobal || 85), 0) /
      currentPlayers.length
  );

  // 2. Récupération moyenne
  const avgRecup = Math.round(
    currentPlayers.reduce((acc, p) => acc + (p.dimensions?.recuperation?.score || 85), 0) /
      currentPlayers.length
  );

  // 3. Disponibilité moyenne
  const avgDispo = Math.round(
    currentPlayers.reduce((acc, p) => {
      if (p.status === 'disponible') return acc + 100;
      if (p.status === 'a_surveiller') return acc + 80;
      if (p.status === 'retour_progressif') return acc + 65;
      return acc + 40;
    }, 0) / currentPlayers.length
  );

  // 4. Intensité (basée sur physique + vitesse)
  const avgIntensite = Math.round(
    currentPlayers.reduce((acc, p) => {
      const speedScore = p.dimensions?.physique?.score || 82;
      const perfScore = p.dimensions?.performance?.score || 85;
      return acc + (speedScore * 0.6 + perfScore * 0.4);
    }, 0) / currentPlayers.length
  );

  // 5. Charge (basée sur entraînement et statut)
  const avgCharge = Math.round(
    currentPlayers.reduce((acc, p) => acc + (p.dimensions?.entrainement?.score || 85), 0) /
      currentPlayers.length
  );

  // 6. Équilibre collectif (ajustement selon scénario et complémentarité)
  let baseEquilibre = scenario.baselineMetrics.equilibre;
  // Si tous les joueurs sont disponibles à 100%, l'équilibre monte
  if (avgDispo >= 95) baseEquilibre += 2;
  if (avgRecup < 80) baseEquilibre -= 3;

  return {
    forme: Math.min(99, Math.max(65, Math.round(avgForme))),
    recuperation: Math.min(99, Math.max(65, Math.round(avgRecup))),
    intensite: Math.min(99, Math.max(65, Math.round(avgIntensite))),
    charge: Math.min(99, Math.max(65, Math.round(avgCharge))),
    disponibilite: Math.min(100, Math.max(60, Math.round(avgDispo))),
    equilibre: Math.min(98, Math.max(70, Math.round(baseEquilibre)))
  };
};

export const evaluatePlayerInLineup = (
  player: Player,
  slot: TacticalSlot,
  scenarioId: string
): PlayerEvaluationDetail => {
  const formeScore = player.dimensions?.performance?.score || player.scoreGlobal || 88;
  const recupScore = player.dimensions?.recuperation?.score || 86;
  const dispoPercentage =
    player.status === 'disponible'
      ? 100
      : player.status === 'a_surveiller'
      ? 82
      : player.status === 'retour_progressif'
      ? 65
      : 40;

  const isHighCharge = player.alert?.type === 'charge' || player.dimensions?.entrainement?.score > 88;
  const chargeStatus = isHighCharge ? 'Élevée (Gestion)' : 'Optimale (ACWR 1.05)';

  const recentPerfTrend =
    formeScore >= 88 ? '+7 %' : formeScore >= 84 ? '+4 %' : '+1 %';

  const physicalProfile =
    (player.dimensions?.physique?.vitesseMax || 33.5) >= 34.5
      ? 'Favorable (Vmax > 34.5 km/h)'
      : 'Favorable (Endurance & Puissance)';

  let justification = `Profil retenu au poste de ${slot.roleName} pour son niveau de disponibilité, sa stabilité récente et son équilibre charge/récupération.`;

  if (player.id === 'tchouameni') {
    justification = 'Profil retenu pour son niveau de disponibilité, sa stabilité récente et son équilibre charge/récupération face au milieu espagnol.';
  } else if (player.id === 'mbappe') {
    justification = 'Point d’ancrage offensif prioritaire. Volume de sprints haute vélocité et efficacité clinique maximale devant le but.';
  } else if (player.id === 'dembele') {
    justification = 'Capacité d’élimination en 1v1 sur le couloir droit. Temps de jeu préconisé à 65 minutes pour préserver l’intégrité musculaire.';
  } else if (player.id === 'kounde') {
    justification = 'Solidité défensive et volume de courses longitudinales. Excellente complémentarité avec l’axe central Saliba-Upamecano.';
  } else if (player.id === 'barcola') {
    justification = 'Dynamique physique ascendante (+12% de sprints). Vitesse de transition décisive face à la ligne haute adverse.';
  } else if (player.id === 'griezmann') {
    justification = 'Créativité entre les lignes et orientation du jeu sous pression adverse. Indice de récupération optimal (92/100).';
  } else if (player.id === 'saliba') {
    justification = 'Gouvernance de la ligne défensive, 88% de duels aériens gagnés et zéro faute concédée sur les 3 derniers matchs.';
  } else if (player.id === 'maignan') {
    justification = 'Sécurité absolue sur sa ligne et qualité de relance courte/longue face au pressing haut espagnol.';
  } else if (player.id === 'rabiot') {
    justification = 'Volume de courses sans ballon et impact dans les transitions défensives. Équilibre axial parfait.';
  }

  return {
    player,
    slot,
    formeScore,
    recupScore,
    chargeStatus,
    dispoPercentage,
    recentPerfTrend,
    physicalProfile,
    justification
  };
};

export interface PotentialReplacementCandidate {
  player: Player;
  tacticalFitScore: number;
  suitabilityReason: string;
  impactOnLineup: string;
  confDelta: number;
  isNaturalPosition: boolean;
}

export interface CompositionConfidenceResult {
  confidenceScore: number;
  confidenceLabel: string;
  deltaVsBaseline: number;
  winProbability: number;
  compactness: string;
  transitionSpeed: string;
  consequenceSummary: string;
}

/**
 * Calculates the collective confidence score and dynamic metrics for any composition setup
 */
export const calculateCompositionConfidenceScore = (
  scenario: TacticalScenarioConfig,
  slotMap: Record<string, string>,
  allPlayers: Player[]
): CompositionConfidenceResult => {
  const currentStarters = scenario.slots.map((s) => {
    const pId = slotMap[s.id] || s.defaultPlayerId;
    return {
      slot: s,
      player: allPlayers.find((p) => p.id === pId) || allPlayers[0]
    };
  });

  // Base confidence reference
  let baseScore = 97.4;
  let probWin = 68.4;
  let compactnessNum = 34.0;
  let transitionNum = 2.4;

  let totalForme = 0;
  let totalRecup = 0;
  let totalDispo = 0;
  let offPositionCount = 0;
  let keySubstitutionsNotes: string[] = [];

  currentStarters.forEach(({ slot, player }) => {
    const forme = player.dimensions?.performance?.score || player.scoreGlobal || 88;
    const recup = player.dimensions?.recuperation?.score || 85;
    totalForme += forme;
    totalRecup += recup;

    if (player.status === 'disponible') {
      totalDispo += 100;
    } else if (player.status === 'a_surveiller') {
      totalDispo += 82;
      baseScore -= 0.6;
    } else {
      totalDispo += 60;
      baseScore -= 1.8;
    }

    // Role natural fit verification
    const pos = player.position.toLowerCase();
    const role = slot.roleCode.toUpperCase();
    const isGK = role.includes('GB') || role.includes('GK');
    const isDef = role.includes('DC') || role.includes('DD') || role.includes('DG');
    const isMid = role.includes('MDC') || role.includes('MC') || role.includes('MOC') || role.includes('MOD') || role.includes('MOG');
    const isAtt = role.includes('BU') || role.includes('AD') || role.includes('AG') || role.includes('ST');

    let fit = true;
    if (isGK && !pos.includes('gardien')) fit = false;
    else if (isDef && !pos.includes('défens')) fit = false;
    else if (isMid && !pos.includes('milieu') && !pos.includes('attaqu')) fit = false;
    else if (isAtt && !pos.includes('attaqu') && !pos.includes('milieu')) fit = false;

    if (!fit) {
      offPositionCount++;
      baseScore -= 2.2;
    }

    // Player-specific scenario impacts
    if (slot.roleCode === 'BU' && player.id === 'thuram') {
      keySubstitutionsNotes.push("Thuram en pointe : puissance et point d'ancrage haut, -0.25 xG en finition directe.");
      baseScore -= 2.6;
      probWin -= 5.9;
      compactnessNum -= 0.8;
      transitionNum -= 1.2;
    } else if (slot.roleCode === 'AG' && player.id === 'dembele') {
      keySubstitutionsNotes.push("Dembélé à gauche : percussion en un-contre-un, mais repli défensif à compenser par le milieu.");
      baseScore -= 1.2;
      probWin -= 1.3;
      compactnessNum += 2.4;
      transitionNum += 0.7;
    } else if ((slot.roleCode === 'MC G' || slot.roleCode.includes('MDC')) && player.id === 'camavinga') {
      keySubstitutionsNotes.push("Camavinga au milieu : dynamisme à la récupération haute et relance plus tranchante.");
      baseScore += 0.4;
      probWin += 0.7;
      compactnessNum -= 1.5;
      transitionNum += 0.4;
    } else if (slot.roleCode === 'BU' && player.id === 'kolo_muani') {
      keySubstitutionsNotes.push("Kolo Muani en attaque : appels en profondeur fréquents et pressing actif sur la relance adverse.");
      baseScore -= 1.9;
      probWin -= 2.5;
    } else if (slot.roleCode === 'AD' && player.id === 'olise') {
      keySubstitutionsNotes.push("Olise ailier droit : créativité dans le demi-espace et qualité de centre brossé.");
      baseScore -= 0.3;
      probWin += 0.2;
    }
  });

  const avgForme = totalForme / 11;
  const avgRecup = totalRecup / 11;

  if (avgForme >= 90) baseScore += 0.5;
  if (avgRecup < 82) baseScore -= 1.0;

  const finalScore = Math.max(70, Math.min(99.4, +baseScore.toFixed(1)));
  const finalProb = Math.max(45, Math.min(85, +probWin.toFixed(1)));
  const delta = +(finalScore - 97.4).toFixed(1);

  let confidenceLabel = "Très Élevé • Optimal";
  if (finalScore >= 96) confidenceLabel = "Très Élevé • Maîtrise";
  else if (finalScore >= 92) confidenceLabel = "Élevé • Surveillance";
  else confidenceLabel = "Modéré • Risque Détecté";

  let consequenceSummary = "Alignement optimal : 11 titulaires à 100% de fraîcheur, quadrillage complet du terrain.";
  if (keySubstitutionsNotes.length > 0) {
    consequenceSummary = keySubstitutionsNotes.join(" ");
  } else if (offPositionCount > 0) {
    consequenceSummary = `${offPositionCount} joueur(s) repositionné(s) hors poste habituel : ajustement tactique requis.`;
  } else if (delta < 0) {
    consequenceSummary = `Légère variation du score de confiance (${delta}%). La compacité du bloc s'établit à ${compactnessNum.toFixed(1)}m.`;
  }

  return {
    confidenceScore: finalScore,
    confidenceLabel,
    deltaVsBaseline: delta,
    winProbability: finalProb,
    compactness: `${compactnessNum.toFixed(1)} m`,
    transitionSpeed: `${transitionNum >= 0 ? '+' : ''}${transitionNum.toFixed(1)} m/s`,
    consequenceSummary
  };
};

/**
 * Returns potential replacements for a given tactical slot and starter
 */
export const getPotentialReplacementsForSlot = (
  slot: TacticalSlot,
  currentStarter: Player,
  allPlayers: Player[],
  activeStartersIds: string[]
): PotentialReplacementCandidate[] => {
  const role = slot.roleCode.toUpperCase();
  const isGK = role.includes('GB') || role.includes('GK');
  const isDef = role.includes('DC') || role.includes('DD') || role.includes('DG');
  const isMid = role.includes('MDC') || role.includes('MC') || role.includes('MO');
  const isAtt = role.includes('BU') || role.includes('AD') || role.includes('AG') || role.includes('ST');

  // Filter candidates from the squad (excluding current starter)
  const candidates = allPlayers.filter((p) => p.id !== currentStarter.id);

  const evaluated: PotentialReplacementCandidate[] = candidates.map((p) => {
    const pos = p.position.toLowerCase();
    const forme = p.dimensions?.performance?.score || p.scoreGlobal || 86;
    const isDispo = p.status === 'disponible';

    let fitScore = 80;
    let isNatural = false;
    let reason = "Alternative polyvalente";
    let impact = "Profil d'appoint";
    let confDelta = -1.5;

    if (isGK) {
      if (pos.includes('gardien')) {
        isNatural = true;
        fitScore = p.id === 'samba' ? 95 : 91;
        reason = p.id === 'samba' ? "Remplaçant direct n°2 • Maîtrise du jeu au pied" : "Gardien d'expérience";
        impact = "Sécurité conservée sur la ligne";
        confDelta = p.id === 'samba' ? -0.8 : -1.8;
      } else {
        fitScore = 20;
        reason = "Non gardien";
        impact = "Incompatible";
        confDelta = -15;
      }
    } else if (isDef) {
      if (pos.includes('défens')) {
        isNatural = true;
        if (role.includes('DC')) {
          fitScore = p.id === 'konate' || p.id === 'upamecano' ? 96 : p.id === 'pavard' ? 92 : 88;
          reason = p.id === 'konate' ? "Impact athlétique supérieur dans les duels aériens" : "Puissance et relance axiale";
          impact = "+12% duels gagnés • Sécurisation surface";
          confDelta = +0.2;
        } else if (role.includes('DD')) {
          fitScore = p.id === 'clauss' ? 94 : p.id === 'pavard' ? 93 : 87;
          reason = p.id === 'clauss' ? "Projection offensive et centres de précision" : "Rigueur défensive et fermeté";
          impact = "Apport offensif sur le flanc droit";
          confDelta = -0.4;
        } else {
          // DG
          fitScore = p.id === 'mendy_f' ? 93 : 86;
          reason = "Verrouillage défensif du couloir gauche";
          impact = "Moins de montées mais repli hermétique";
          confDelta = -0.5;
        }
      } else if (pos.includes('milieu') && (p.id === 'camavinga' || p.id === 'tchouameni')) {
        fitScore = 84;
        reason = "Polyvalence défensive axiale";
        impact = "Qualité de relance bonifiée";
        confDelta = -1.2;
      }
    } else if (isMid) {
      if (pos.includes('milieu')) {
        isNatural = true;
        if (role.includes('MDC')) {
          fitScore = p.id === 'camavinga' ? 97 : p.id === 'fofana_y' ? 93 : 89;
          reason = p.id === 'camavinga' ? "Agressivité à la récupération et orientation vers l'avant" : "Présence athlétique au milieu";
          impact = "+18% récupération haute • Bloc raccourci";
          confDelta = +0.4;
        } else {
          fitScore = p.id === 'camavinga' ? 96 : p.id === 'zaire_emery' ? 95 : 90;
          reason = "Volume de courses et perforation des lignes";
          impact = "Continuité de rythme garantie";
          confDelta = +0.1;
        }
      } else if (pos.includes('attaqu') && (p.id === 'griezmann' || p.id === 'nkunku')) {
        fitScore = 91;
        reason = "Meneur créatif en position de relayeur offensif";
        impact = "Créativité accrue • Moins d'impact au duel";
        confDelta = -0.3;
      }
    } else if (isAtt) {
      if (pos.includes('attaqu')) {
        isNatural = true;
        if (role.includes('BU')) {
          fitScore = p.id === 'thuram' ? 95 : p.id === 'kolo_muani' ? 94 : 90;
          reason = p.id === 'thuram' ? "Point d'ancrage physique et jeu dos au but" : "Attaque des espaces et contre-pressing";
          impact = "Fixation centrale des défenseurs adverses";
          confDelta = -2.6;
        } else if (role.includes('AD')) {
          fitScore = p.id === 'olise' ? 96 : p.id === 'coman' ? 94 : 91;
          reason = p.id === 'olise' ? "Pied gauche rentrant et centres chirurgicaux" : "Vitesse d'élimination pure en un-contre-un";
          impact = "Danger permanent sur le couloir droit";
          confDelta = -0.3;
        } else {
          // AG
          fitScore = p.id === 'barcola' ? 96 : p.id === 'dembele' ? 95 : p.id === 'coman' ? 92 : 89;
          reason = p.id === 'dembele' ? "Permutation d'aile avec dribble arrêt-départ" : "Explosivité sur les transitions";
          impact = "+3.1 m/s en contre-attaque";
          confDelta = -1.2;
        }
      }
    }

    if (!isDispo) {
      fitScore -= 8;
      confDelta -= 1.0;
    }

    if (forme >= 90) fitScore += 2;

    return {
      player: p,
      tacticalFitScore: Math.min(99, Math.max(40, fitScore)),
      suitabilityReason: reason,
      impactOnLineup: impact,
      confDelta,
      isNaturalPosition: isNatural
    };
  });

  // Sort by tactical fit score descending, prioritize natural position and players not currently starting
  return evaluated
    .sort((a, b) => {
      const aIsBench = !activeStartersIds.includes(a.player.id) ? 1 : 0;
      const bIsBench = !activeStartersIds.includes(b.player.id) ? 1 : 0;
      if (aIsBench !== bIsBench) return bIsBench - aIsBench;
      return b.tacticalFitScore - a.tacticalFitScore;
    })
    .slice(0, 6);
};

export const generateSubstitutionConsequence = (
  beforeMetrics: CalculatedXIMetrics,
  afterMetrics: CalculatedXIMetrics,
  inPlayer: Player,
  outPlayer: Player
): string => {
  const diffIntensite = afterMetrics.intensite - beforeMetrics.intensite;
  const diffRecup = afterMetrics.recuperation - beforeMetrics.recuperation;
  const diffForme = afterMetrics.forme - beforeMetrics.forme;
  const diffDispo = afterMetrics.disponibilite - beforeMetrics.disponibilite;

  if (diffIntensite > 0 && diffRecup < 0) {
    return `L'entrée de ${inPlayer.name} à la place de ${outPlayer.name} augmente le potentiel d’intensité du XI (+${diffIntensite} pts) mais réduit légèrement son niveau moyen de récupération (${diffRecup} pts).`;
  }
  if (diffRecup > 0 && diffIntensite < 0) {
    return `L'entrée de ${inPlayer.name} renforce la fraîcheur et la récupération globale du XI (+${diffRecup} pts) avec une orientation de jeu plus mesurée sur le tempo (-${Math.abs(diffIntensite)} pts d'intensité).`;
  }
  if (diffForme > 0) {
    return `Ce remplacement optimise l'indice de forme immédiate du XI (+${diffForme} pts) et assure une excellente régularité technique.`;
  }
  if (diffDispo < 0) {
    return `Attention : l'intégration de ${inPlayer.name} apporte un profil technique spécifique mais baisse l'indice de disponibilité (${diffDispo} pts) en raison d'une reprise graduée.`;
  }
  return `L'ajustement rééquilibre la structure du XI avec un impact neutre sur la charge collective.`;
};
