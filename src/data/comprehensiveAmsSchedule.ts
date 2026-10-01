import { Match, TrainingSession } from '../types/ams';

export const COMPREHENSIVE_MATCHES: Match[] = [
  {
    id: 'match-1',
    homeTeam: 'France',
    awayTeam: 'Pays-Bas',
    homeFlag: 'FR',
    awayFlag: 'NL',
    homeScore: 3,
    awayScore: 1,
    competition: 'UEFA Nations League',
    phase: 'Phase de Groupes • J4',
    date: '12 octobre 2025',
    stadium: 'Stade de France, Saint-Denis',
    result: 'V',
    statusLabel: 'Terminé (Score Final)',
    statsFrance: {
      possession: 62,
      tirs: 18,
      tirsCadres: 8,
      xG: 2.4,
      passes: 612,
      precisionPasses: 89,
      duelsRemportes: 54,
      recuperations: 48,
      distanceKm: 118.4,
      sprints: 124
    },
    statsOpponent: {
      possession: 38,
      tirs: 9,
      tirsCadres: 3,
      xG: 0.8,
      passes: 387,
      precisionPasses: 82,
      duelsRemportes: 46,
      recuperations: 36,
      distanceKm: 111.2,
      sprints: 95
    },
    starters: [
      { playerId: 'chevalier', role: 'titulaire', positionName: 'Gardien', pitchX: 50, pitchY: 88, minutes: 90, rating: 7.8, distanceKm: 4.8, maxSpeedKmH: 28.4, sprints: 6, passes: 34, passesAccuracy: 87, progressivePasses: 9, duelsWon: 1, duelsTotal: 1, recoveries: 11, chancesCreated: 0, saves: 4 },
      { playerId: 'kounde', role: 'titulaire', positionName: 'Latéral Droit', pitchX: 84, pitchY: 68, minutes: 90, rating: 7.6, distanceKm: 10.9, maxSpeedKmH: 33.8, sprints: 18, passes: 68, passesAccuracy: 91, progressivePasses: 7, duelsWon: 7, duelsTotal: 9, recoveries: 5, chancesCreated: 1 },
      { playerId: 'saliba', role: 'titulaire', positionName: 'Défenseur Central Droit', pitchX: 62, pitchY: 74, minutes: 90, rating: 7.9, distanceKm: 10.4, maxSpeedKmH: 34.2, sprints: 11, passes: 84, passesAccuracy: 94, progressivePasses: 11, duelsWon: 8, duelsTotal: 9, recoveries: 7, chancesCreated: 0 },
      { playerId: 'konate', role: 'titulaire', positionName: 'Défenseur Central Gauche', pitchX: 38, pitchY: 74, minutes: 90, rating: 7.7, distanceKm: 10.2, maxSpeedKmH: 34.5, sprints: 9, passes: 79, passesAccuracy: 92, progressivePasses: 8, duelsWon: 6, duelsTotal: 8, recoveries: 6, chancesCreated: 0 },
      { playerId: 'hernandez_t', role: 'titulaire', positionName: 'Latéral Gauche', pitchX: 16, pitchY: 68, minutes: 78, rating: 7.5, distanceKm: 9.8, maxSpeedKmH: 35.1, sprints: 22, passes: 52, passesAccuracy: 85, progressivePasses: 8, duelsWon: 5, duelsTotal: 7, recoveries: 4, chancesCreated: 2, substitutionMinute: 78 },
      { playerId: 'tchouameni', role: 'titulaire', positionName: 'Milieu Défensif', pitchX: 50, pitchY: 52, minutes: 90, rating: 7.7, distanceKm: 12.4, maxSpeedKmH: 32.8, sprints: 14, passes: 88, passesAccuracy: 93, progressivePasses: 14, duelsWon: 7, duelsTotal: 10, recoveries: 9, chancesCreated: 1 },
      { playerId: 'rabiot', role: 'titulaire', positionName: 'Milieu Relayeur', pitchX: 32, pitchY: 44, minutes: 82, rating: 7.4, distanceKm: 11.2, maxSpeedKmH: 31.6, sprints: 12, passes: 64, passesAccuracy: 88, progressivePasses: 6, duelsWon: 6, duelsTotal: 9, recoveries: 6, chancesCreated: 1, substitutionMinute: 82 },
      { playerId: 'griezmann', role: 'titulaire', positionName: 'Milieu Offensif', pitchX: 68, pitchY: 44, minutes: 75, rating: 8.0, distanceKm: 10.1, maxSpeedKmH: 31.2, sprints: 10, passes: 58, passesAccuracy: 89, progressivePasses: 12, duelsWon: 4, duelsTotal: 6, recoveries: 4, chancesCreated: 4, assists: 1, substitutionMinute: 75 },
      { playerId: 'dembele', role: 'titulaire', positionName: 'Ailier Droit', pitchX: 84, pitchY: 26, minutes: 62, rating: 7.5, distanceKm: 7.5, maxSpeedKmH: 35.4, sprints: 21, passes: 36, passesAccuracy: 83, progressivePasses: 5, duelsWon: 5, duelsTotal: 8, recoveries: 2, chancesCreated: 3, assists: 1, substitutionMinute: 62 },
      { playerId: 'mbappe', role: 'titulaire', positionName: 'Avant-Centre', pitchX: 50, pitchY: 18, minutes: 90, rating: 8.9, distanceKm: 10.8, maxSpeedKmH: 36.6, sprints: 26, passes: 42, passesAccuracy: 86, progressivePasses: 6, duelsWon: 7, duelsTotal: 11, recoveries: 3, chancesCreated: 3, goals: 2 },
      { playerId: 'barcola', role: 'titulaire', positionName: 'Ailier Gauche', pitchX: 16, pitchY: 26, minutes: 70, rating: 7.8, distanceKm: 8.9, maxSpeedKmH: 35.2, sprints: 24, passes: 32, passesAccuracy: 81, progressivePasses: 7, duelsWon: 4, duelsTotal: 7, recoveries: 2, chancesCreated: 2, goals: 1, substitutionMinute: 70 }
    ],
    substitutes: [
      { playerId: 'nkunku', role: 'remplacant', positionName: 'Attaquant', pitchX: 0, pitchY: 0, minutes: 28, rating: 7.0, distanceKm: 3.5, maxSpeedKmH: 32.5, sprints: 8, passes: 14, passesAccuracy: 85, progressivePasses: 2, duelsWon: 2, duelsTotal: 3, recoveries: 1, chancesCreated: 1, substitutionMinute: 62 },
      { playerId: 'zaire_emery', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 20, rating: 7.1, distanceKm: 2.8, maxSpeedKmH: 32.8, sprints: 6, passes: 18, passesAccuracy: 94, progressivePasses: 3, duelsWon: 3, duelsTotal: 4, recoveries: 2, chancesCreated: 1, substitutionMinute: 70 },
      { playerId: 'clauss', role: 'remplacant', positionName: 'Défenseur', pitchX: 0, pitchY: 0, minutes: 12, rating: 6.6, distanceKm: 1.6, maxSpeedKmH: 31.8, sprints: 4, passes: 8, passesAccuracy: 87, progressivePasses: 1, duelsWon: 1, duelsTotal: 2, recoveries: 1, chancesCreated: 0, substitutionMinute: 78 },
      { playerId: 'fofana_y', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 15, rating: 6.8, distanceKm: 2.1, maxSpeedKmH: 31.2, sprints: 4, passes: 12, passesAccuracy: 91, progressivePasses: 2, duelsWon: 2, duelsTotal: 3, recoveries: 2, chancesCreated: 0, substitutionMinute: 75 },
      { playerId: 'thuram_k', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 8, rating: 6.5, distanceKm: 1.4, maxSpeedKmH: 30.5, sprints: 3, passes: 9, passesAccuracy: 88, progressivePasses: 1, duelsWon: 1, duelsTotal: 1, recoveries: 1, chancesCreated: 0, substitutionMinute: 82 },
      { playerId: 'upamecano', role: 'remplacant', positionName: 'Défenseur', pitchX: 0, pitchY: 0, minutes: 0, rating: 0, distanceKm: 0, sprints: 0, passes: 0, passesAccuracy: 0, duelsWon: 0 },
      { playerId: 'samba', role: 'remplacant', positionName: 'Gardien', pitchX: 0, pitchY: 0, minutes: 0, rating: 0, distanceKm: 0, sprints: 0, passes: 0, passesAccuracy: 0, duelsWon: 0 }
    ],
    events: [
      { minute: 18, type: 'goal', playerId: 'mbappe', text: 'But de Kylian Mbappé (Passe décisive O. Dembélé)', team: 'home' },
      { minute: 34, type: 'goal', playerId: 'barcola', text: 'But de Bradley Barcola (Passe décisive A. Griezmann)', team: 'home' },
      { minute: 58, type: 'yellow', playerId: 'tchouameni', text: 'Carton jaune pour Aurélien Tchouaméni (Faute tactique)', team: 'home' },
      { minute: 62, type: 'sub', playerId: 'dembele', text: 'Remplacement : Sortie de O. Dembélé, entrée de C. Nkunku', team: 'home' },
      { minute: 64, type: 'goal', playerId: 'mbappe', text: 'Deuxième but de Kylian Mbappé sur contre-attaque fulgurante', team: 'home' },
      { minute: 70, type: 'sub', playerId: 'barcola', text: 'Remplacement : Sortie de B. Barcola, entrée de W. Zaïre-Emery', team: 'home' },
      { minute: 73, type: 'goal', playerId: '', text: 'But de Cody Gakpo (Pays-Bas)', team: 'away' },
      { minute: 75, type: 'sub', playerId: 'griezmann', text: 'Remplacement : Sortie de A. Griezmann, entrée de Y. Fofana', team: 'home' },
      { minute: 78, type: 'sub', playerId: 'hernandez_t', text: 'Remplacement : Sortie de T. Hernandez, entrée de J. Clauss', team: 'home' },
      { minute: 82, type: 'sub', playerId: 'rabiot', text: 'Remplacement : Sortie de A. Rabiot, entrée de K. Thuram', team: 'home' }
    ]
  },
  {
    id: 'match-2',
    homeTeam: 'France',
    awayTeam: 'Espagne',
    homeFlag: 'FR',
    awayFlag: 'ES',
    homeScore: 1,
    awayScore: 1,
    competition: 'UEFA Nations League',
    phase: 'Phase de Groupes • J3',
    date: '08 septembre 2025',
    stadium: 'Parc Olympique Lyonnais, Décines',
    result: 'N',
    statusLabel: 'Terminé (Score Final)',
    statsFrance: { possession: 48, tirs: 12, tirsCadres: 5, xG: 1.3, passes: 480, precisionPasses: 85, duelsRemportes: 51, recuperations: 44, distanceKm: 119.1, sprints: 118 },
    statsOpponent: { possession: 52, tirs: 14, tirsCadres: 4, xG: 1.2, passes: 530, precisionPasses: 88, duelsRemportes: 49, recuperations: 42, distanceKm: 118.0, sprints: 104 },
    starters: [
      { playerId: 'maignan', role: 'titulaire', positionName: 'Gardien', pitchX: 50, pitchY: 88, minutes: 90, rating: 7.6, distanceKm: 4.5, sprints: 4, passes: 32, passesAccuracy: 84, duelsWon: 1, saves: 4 },
      { playerId: 'kounde', role: 'titulaire', positionName: 'Latéral Droit', pitchX: 84, pitchY: 68, minutes: 90, rating: 7.4, distanceKm: 11.1, sprints: 19, passes: 58, passesAccuracy: 88, duelsWon: 6 },
      { playerId: 'saliba', role: 'titulaire', positionName: 'Défenseur Central Droit', pitchX: 62, pitchY: 74, minutes: 90, rating: 7.8, distanceKm: 10.6, sprints: 10, passes: 76, passesAccuracy: 93, duelsWon: 7 },
      { playerId: 'upamecano', role: 'titulaire', positionName: 'Défenseur Central Gauche', pitchX: 38, pitchY: 74, minutes: 90, rating: 7.3, distanceKm: 10.3, sprints: 11, passes: 71, passesAccuracy: 89, duelsWon: 6 },
      { playerId: 'hernandez_t', role: 'titulaire', positionName: 'Latéral Gauche', pitchX: 16, pitchY: 68, minutes: 90, rating: 7.5, distanceKm: 10.8, sprints: 21, passes: 54, passesAccuracy: 84, duelsWon: 5 },
      { playerId: 'tchouameni', role: 'titulaire', positionName: 'Milieu Défensif', pitchX: 50, pitchY: 52, minutes: 90, rating: 7.5, distanceKm: 12.1, sprints: 13, passes: 81, passesAccuracy: 91, duelsWon: 7 },
      { playerId: 'camavinga', role: 'titulaire', positionName: 'Milieu Relayeur', pitchX: 32, pitchY: 44, minutes: 72, rating: 7.4, distanceKm: 9.6, sprints: 12, passes: 55, passesAccuracy: 89, duelsWon: 6 },
      { playerId: 'griezmann', role: 'titulaire', positionName: 'Milieu Offensif', pitchX: 68, pitchY: 44, minutes: 80, rating: 7.3, distanceKm: 10.0, sprints: 9, passes: 48, passesAccuracy: 86, duelsWon: 4 },
      { playerId: 'dembele', role: 'titulaire', positionName: 'Ailier Droit', pitchX: 84, pitchY: 26, minutes: 65, rating: 7.2, distanceKm: 7.8, sprints: 19, passes: 34, passesAccuracy: 81, duelsWon: 4 },
      { playerId: 'mbappe', role: 'titulaire', positionName: 'Avant-Centre', pitchX: 50, pitchY: 18, minutes: 90, rating: 7.9, distanceKm: 10.5, sprints: 22, passes: 38, passesAccuracy: 84, duelsWon: 6, goals: 1 },
      { playerId: 'barcola', role: 'titulaire', positionName: 'Ailier Gauche', pitchX: 16, pitchY: 26, minutes: 78, rating: 7.4, distanceKm: 9.2, sprints: 20, passes: 31, passesAccuracy: 80, duelsWon: 5 }
    ],
    substitutes: [
      { playerId: 'rabiot', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 18, rating: 6.7, distanceKm: 2.3, sprints: 3, passes: 14, passesAccuracy: 88, duelsWon: 2 },
      { playerId: 'nkunku', role: 'remplacant', positionName: 'Attaquant', pitchX: 0, pitchY: 0, minutes: 25, rating: 6.8, distanceKm: 3.1, sprints: 6, passes: 11, passesAccuracy: 82, duelsWon: 1 },
      { playerId: 'zaire_emery', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 10, rating: 6.6, distanceKm: 1.5, sprints: 2, passes: 8, passesAccuracy: 90, duelsWon: 1 }
    ],
    events: [
      { minute: 26, type: 'goal', playerId: '', text: 'But de Lamine Yamal (Espagne)', team: 'away' },
      { minute: 54, type: 'goal', playerId: 'mbappe', text: 'Égalisation de Kylian Mbappé sur penalty', team: 'home' },
      { minute: 65, type: 'sub', playerId: 'dembele', text: 'Sortie de Dembélé, entrée de Nkunku', team: 'home' }
    ]
  },
  {
    id: 'match-3',
    homeTeam: 'France',
    awayTeam: 'Belgique',
    homeFlag: 'FR',
    awayFlag: 'BE',
    homeScore: 2,
    awayScore: 0,
    competition: 'UEFA Nations League',
    phase: 'Phase de Groupes • J2',
    date: '09 juin 2025',
    stadium: 'Stade Pierre-Mauroy, Lille',
    result: 'V',
    statusLabel: 'Terminé (Score Final)',
    statsFrance: { possession: 56, tirs: 16, tirsCadres: 7, xG: 2.1, passes: 540, precisionPasses: 87, duelsRemportes: 55, recuperations: 46, distanceKm: 117.5, sprints: 120 },
    statsOpponent: { possession: 44, tirs: 8, tirsCadres: 2, xG: 0.6, passes: 410, precisionPasses: 81, duelsRemportes: 45, recuperations: 38, distanceKm: 113.8, sprints: 92 },
    starters: [
      { playerId: 'maignan', role: 'titulaire', positionName: 'Gardien', pitchX: 50, pitchY: 88, minutes: 90, rating: 7.9, distanceKm: 4.7, maxSpeedKmH: 27.8, sprints: 5, passes: 36, passesAccuracy: 88, progressivePasses: 8, duelsWon: 1, duelsTotal: 1, recoveries: 10, chancesCreated: 0, saves: 4 },
      { playerId: 'kounde', role: 'titulaire', positionName: 'Latéral Droit', pitchX: 84, pitchY: 68, minutes: 90, rating: 7.6, distanceKm: 10.8, maxSpeedKmH: 33.4, sprints: 17, passes: 65, passesAccuracy: 90, progressivePasses: 6, duelsWon: 6, duelsTotal: 8, recoveries: 4, chancesCreated: 1 },
      { playerId: 'saliba', role: 'titulaire', positionName: 'Défenseur Central Droit', pitchX: 62, pitchY: 74, minutes: 90, rating: 7.8, distanceKm: 10.3, maxSpeedKmH: 34.0, sprints: 10, passes: 81, passesAccuracy: 95, progressivePasses: 10, duelsWon: 7, duelsTotal: 8, recoveries: 6, chancesCreated: 0 },
      { playerId: 'upamecano', role: 'titulaire', positionName: 'Défenseur Central Gauche', pitchX: 38, pitchY: 74, minutes: 90, rating: 7.7, distanceKm: 10.1, maxSpeedKmH: 34.2, sprints: 10, passes: 76, passesAccuracy: 92, progressivePasses: 7, duelsWon: 6, duelsTotal: 8, recoveries: 5, chancesCreated: 0 },
      { playerId: 'hernandez_t', role: 'titulaire', positionName: 'Latéral Gauche', pitchX: 16, pitchY: 68, minutes: 80, rating: 7.5, distanceKm: 10.0, maxSpeedKmH: 34.9, sprints: 21, passes: 50, passesAccuracy: 84, progressivePasses: 7, duelsWon: 5, duelsTotal: 7, recoveries: 3, chancesCreated: 2, substitutionMinute: 80 },
      { playerId: 'tchouameni', role: 'titulaire', positionName: 'Milieu Défensif', pitchX: 50, pitchY: 52, minutes: 90, rating: 7.8, distanceKm: 12.2, maxSpeedKmH: 32.5, sprints: 13, passes: 85, passesAccuracy: 92, progressivePasses: 12, duelsWon: 8, duelsTotal: 10, recoveries: 8, chancesCreated: 1 },
      { playerId: 'fofana_y', role: 'titulaire', positionName: 'Milieu Relayeur', pitchX: 32, pitchY: 44, minutes: 75, rating: 7.3, distanceKm: 9.9, maxSpeedKmH: 31.8, sprints: 11, passes: 58, passesAccuracy: 89, progressivePasses: 5, duelsWon: 5, duelsTotal: 8, recoveries: 5, chancesCreated: 1, substitutionMinute: 75 },
      { playerId: 'griezmann', role: 'titulaire', positionName: 'Milieu Offensif', pitchX: 68, pitchY: 44, minutes: 90, rating: 8.1, distanceKm: 11.0, maxSpeedKmH: 31.0, sprints: 11, passes: 62, passesAccuracy: 90, progressivePasses: 11, duelsWon: 4, duelsTotal: 5, recoveries: 4, chancesCreated: 3, assists: 1 },
      { playerId: 'dembele', role: 'titulaire', positionName: 'Ailier Droit', pitchX: 84, pitchY: 26, minutes: 70, rating: 8.2, distanceKm: 8.2, maxSpeedKmH: 35.6, sprints: 22, passes: 38, passesAccuracy: 84, progressivePasses: 6, duelsWon: 6, duelsTotal: 9, recoveries: 3, chancesCreated: 3, goals: 1, substitutionMinute: 70 },
      { playerId: 'mbappe', role: 'titulaire', positionName: 'Avant-Centre', pitchX: 50, pitchY: 18, minutes: 90, rating: 8.5, distanceKm: 10.6, maxSpeedKmH: 36.4, sprints: 25, passes: 40, passesAccuracy: 85, progressivePasses: 5, duelsWon: 6, duelsTotal: 10, recoveries: 2, chancesCreated: 2, goals: 1 },
      { playerId: 'barcola', role: 'titulaire', positionName: 'Ailier Gauche', pitchX: 16, pitchY: 26, minutes: 65, rating: 7.4, distanceKm: 7.9, maxSpeedKmH: 34.8, sprints: 18, passes: 29, passesAccuracy: 82, progressivePasses: 5, duelsWon: 4, duelsTotal: 6, recoveries: 2, chancesCreated: 1, substitutionMinute: 65 }
    ],
    substitutes: [
      { playerId: 'kolo_muani', role: 'remplacant', positionName: 'Attaquant', pitchX: 0, pitchY: 0, minutes: 25, rating: 6.9, distanceKm: 3.2, maxSpeedKmH: 33.2, sprints: 7, passes: 12, passesAccuracy: 83, progressivePasses: 2, duelsWon: 2, duelsTotal: 4, recoveries: 1, chancesCreated: 1, substitutionMinute: 65 },
      { playerId: 'coman', role: 'remplacant', positionName: 'Attaquant', pitchX: 0, pitchY: 0, minutes: 20, rating: 7.0, distanceKm: 2.6, maxSpeedKmH: 33.5, sprints: 6, passes: 15, passesAccuracy: 87, progressivePasses: 3, duelsWon: 3, duelsTotal: 4, recoveries: 1, chancesCreated: 1, substitutionMinute: 70 },
      { playerId: 'rabiot', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 15, rating: 6.8, distanceKm: 2.1, maxSpeedKmH: 31.0, sprints: 3, passes: 14, passesAccuracy: 92, progressivePasses: 2, duelsWon: 2, duelsTotal: 3, recoveries: 1, chancesCreated: 0, substitutionMinute: 75 },
      { playerId: 'clauss', role: 'remplacant', positionName: 'Défenseur', pitchX: 0, pitchY: 0, minutes: 10, rating: 6.6, distanceKm: 1.4, maxSpeedKmH: 31.5, sprints: 3, passes: 8, passesAccuracy: 88, progressivePasses: 1, duelsWon: 1, duelsTotal: 1, recoveries: 1, chancesCreated: 0, substitutionMinute: 80 },
      { playerId: 'samba', role: 'remplacant', positionName: 'Gardien', pitchX: 0, pitchY: 0, minutes: 0, rating: 0, distanceKm: 0, maxSpeedKmH: 0, sprints: 0, passes: 0, passesAccuracy: 0, duelsWon: 0 }
    ],
    events: [
      { minute: 31, type: 'goal', playerId: 'mbappe', text: 'But de Kylian Mbappé (Passe décisive A. Griezmann)', team: 'home' },
      { minute: 67, type: 'goal', playerId: 'dembele', text: 'But de Ousmane Dembélé (Frappe enroulée lucarne)', team: 'home' }
    ]
  },
  {
    id: 'match-4',
    homeTeam: 'France',
    awayTeam: 'Allemagne',
    homeFlag: 'FR',
    awayFlag: 'DE',
    homeScore: 1,
    awayScore: 2,
    competition: 'Match Amical International',
    phase: 'Préparation',
    date: '23 mars 2025',
    stadium: 'Groupama Stadium, Lyon',
    result: 'D',
    statusLabel: 'Terminé (Score Final)',
    statsFrance: { possession: 49, tirs: 11, tirsCadres: 4, xG: 1.1, passes: 495, precisionPasses: 84, duelsRemportes: 48, recuperations: 40, distanceKm: 116.2, sprints: 110 },
    statsOpponent: { possession: 51, tirs: 13, tirsCadres: 6, xG: 1.7, passes: 515, precisionPasses: 86, duelsRemportes: 52, recuperations: 43, distanceKm: 118.4, sprints: 115 },
    starters: [
      { playerId: 'samba', role: 'titulaire', positionName: 'Gardien', pitchX: 50, pitchY: 88, minutes: 90, rating: 6.8, distanceKm: 4.4, maxSpeedKmH: 26.5, sprints: 4, passes: 30, passesAccuracy: 82, progressivePasses: 5, duelsWon: 1, duelsTotal: 1, recoveries: 8, chancesCreated: 0, saves: 4 },
      { playerId: 'clauss', role: 'titulaire', positionName: 'Latéral Droit', pitchX: 84, pitchY: 68, minutes: 74, rating: 6.9, distanceKm: 9.4, maxSpeedKmH: 33.1, sprints: 16, passes: 48, passesAccuracy: 86, progressivePasses: 5, duelsWon: 4, duelsTotal: 7, recoveries: 3, chancesCreated: 1, substitutionMinute: 74 },
      { playerId: 'pavard', role: 'titulaire', positionName: 'Défenseur Central Droit', pitchX: 62, pitchY: 74, minutes: 90, rating: 7.1, distanceKm: 10.0, maxSpeedKmH: 32.8, sprints: 8, passes: 68, passesAccuracy: 91, progressivePasses: 6, duelsWon: 5, duelsTotal: 7, recoveries: 5, chancesCreated: 0 },
      { playerId: 'upamecano', role: 'titulaire', positionName: 'Défenseur Central Gauche', pitchX: 38, pitchY: 74, minutes: 90, rating: 7.0, distanceKm: 9.8, maxSpeedKmH: 33.9, sprints: 9, passes: 64, passesAccuracy: 89, progressivePasses: 5, duelsWon: 5, duelsTotal: 8, recoveries: 4, chancesCreated: 0 },
      { playerId: 'hernandez_t', role: 'titulaire', positionName: 'Latéral Gauche', pitchX: 16, pitchY: 68, minutes: 90, rating: 7.3, distanceKm: 10.5, maxSpeedKmH: 35.0, sprints: 20, passes: 52, passesAccuracy: 85, progressivePasses: 7, duelsWon: 6, duelsTotal: 8, recoveries: 4, chancesCreated: 1 },
      { playerId: 'tchouameni', role: 'titulaire', positionName: 'Milieu Défensif', pitchX: 50, pitchY: 52, minutes: 74, rating: 7.2, distanceKm: 9.8, maxSpeedKmH: 32.0, sprints: 10, passes: 68, passesAccuracy: 91, progressivePasses: 8, duelsWon: 6, duelsTotal: 9, recoveries: 6, chancesCreated: 0, substitutionMinute: 74 },
      { playerId: 'rabiot', role: 'titulaire', positionName: 'Milieu Relayeur', pitchX: 32, pitchY: 44, minutes: 90, rating: 7.2, distanceKm: 11.4, maxSpeedKmH: 31.4, sprints: 12, passes: 60, passesAccuracy: 88, progressivePasses: 6, duelsWon: 5, duelsTotal: 8, recoveries: 5, chancesCreated: 1 },
      { playerId: 'zaire_emery', role: 'titulaire', positionName: 'Milieu Offensif', pitchX: 68, pitchY: 44, minutes: 61, rating: 6.9, distanceKm: 8.1, maxSpeedKmH: 32.1, sprints: 10, passes: 44, passesAccuracy: 90, progressivePasses: 5, duelsWon: 4, duelsTotal: 6, recoveries: 3, chancesCreated: 1, substitutionMinute: 61 },
      { playerId: 'dembele', role: 'titulaire', positionName: 'Ailier Droit', pitchX: 84, pitchY: 26, minutes: 83, rating: 7.1, distanceKm: 8.8, maxSpeedKmH: 34.9, sprints: 19, passes: 34, passesAccuracy: 81, progressivePasses: 4, duelsWon: 4, duelsTotal: 7, recoveries: 2, chancesCreated: 2, substitutionMinute: 83 },
      { playerId: 'mbappe', role: 'titulaire', positionName: 'Avant-Centre', pitchX: 50, pitchY: 18, minutes: 90, rating: 7.5, distanceKm: 10.2, maxSpeedKmH: 36.1, sprints: 22, passes: 36, passesAccuracy: 83, progressivePasses: 4, duelsWon: 5, duelsTotal: 9, recoveries: 2, chancesCreated: 2, goals: 1 },
      { playerId: 'thuram_m', role: 'titulaire', positionName: 'Ailier Gauche', pitchX: 16, pitchY: 26, minutes: 61, rating: 6.7, distanceKm: 7.4, maxSpeedKmH: 33.5, sprints: 14, passes: 24, passesAccuracy: 79, progressivePasses: 3, duelsWon: 3, duelsTotal: 6, recoveries: 2, chancesCreated: 0, substitutionMinute: 61 }
    ],
    substitutes: [
      { playerId: 'kolo_muani', role: 'remplacant', positionName: 'Attaquant', pitchX: 0, pitchY: 0, minutes: 29, rating: 6.8, distanceKm: 3.6, maxSpeedKmH: 33.0, sprints: 7, passes: 11, passesAccuracy: 82, progressivePasses: 2, duelsWon: 2, duelsTotal: 3, recoveries: 1, chancesCreated: 1, substitutionMinute: 61 },
      { playerId: 'camavinga', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 29, rating: 7.1, distanceKm: 3.8, maxSpeedKmH: 32.4, sprints: 6, passes: 24, passesAccuracy: 92, progressivePasses: 4, duelsWon: 4, duelsTotal: 5, recoveries: 3, chancesCreated: 1, substitutionMinute: 61 },
      { playerId: 'fofana_y', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 16, rating: 6.6, distanceKm: 2.0, maxSpeedKmH: 30.8, sprints: 3, passes: 12, passesAccuracy: 88, progressivePasses: 2, duelsWon: 1, duelsTotal: 2, recoveries: 1, chancesCreated: 0, substitutionMinute: 74 },
      { playerId: 'kounde', role: 'remplacant', positionName: 'Défenseur', pitchX: 0, pitchY: 0, minutes: 16, rating: 6.8, distanceKm: 2.1, maxSpeedKmH: 32.0, sprints: 4, passes: 15, passesAccuracy: 90, progressivePasses: 2, duelsWon: 2, duelsTotal: 2, recoveries: 1, chancesCreated: 0, substitutionMinute: 74 }
    ],
    events: [
      { minute: 1, type: 'goal', playerId: '', text: 'But précoce de Florian Wirtz (Allemagne)', team: 'away' },
      { minute: 49, type: 'goal', playerId: '', text: 'But de Kai Havertz (Allemagne)', team: 'away' },
      { minute: 72, type: 'goal', playerId: 'mbappe', text: 'Réduction du score de Kylian Mbappé', team: 'home' }
    ]
  },
  {
    id: 'match-5',
    homeTeam: 'France',
    awayTeam: 'Italie',
    homeFlag: 'FR',
    awayFlag: 'IT',
    homeScore: 4,
    awayScore: 0,
    competition: 'UEFA Nations League',
    phase: 'Phase de Groupes • J1',
    date: '17 novembre 2024',
    stadium: 'San Siro, Milan',
    result: 'V',
    statusLabel: 'Terminé (Score Final)',
    statsFrance: { possession: 60, tirs: 19, tirsCadres: 10, xG: 3.2, passes: 620, precisionPasses: 90, duelsRemportes: 58, recuperations: 52, distanceKm: 120.0, sprints: 132 },
    statsOpponent: { possession: 40, tirs: 6, tirsCadres: 1, xG: 0.4, passes: 360, precisionPasses: 79, duelsRemportes: 42, recuperations: 34, distanceKm: 112.5, sprints: 88 },
    starters: [
      { playerId: 'maignan', role: 'titulaire', positionName: 'Gardien', pitchX: 50, pitchY: 88, minutes: 90, rating: 8.0, distanceKm: 4.6, maxSpeedKmH: 27.5, sprints: 4, passes: 34, passesAccuracy: 91, progressivePasses: 8, duelsWon: 1, duelsTotal: 1, recoveries: 9, chancesCreated: 0, saves: 3 },
      { playerId: 'kounde', role: 'titulaire', positionName: 'Latéral Droit', pitchX: 84, pitchY: 68, minutes: 82, rating: 7.9, distanceKm: 10.4, maxSpeedKmH: 33.6, sprints: 18, passes: 70, passesAccuracy: 92, progressivePasses: 7, duelsWon: 7, duelsTotal: 9, recoveries: 5, chancesCreated: 1, substitutionMinute: 82 },
      { playerId: 'saliba', role: 'titulaire', positionName: 'Défenseur Central Droit', pitchX: 62, pitchY: 74, minutes: 90, rating: 8.2, distanceKm: 10.5, maxSpeedKmH: 34.4, sprints: 11, passes: 86, passesAccuracy: 96, progressivePasses: 9, duelsWon: 8, duelsTotal: 9, recoveries: 8, chancesCreated: 0 },
      { playerId: 'konate', role: 'titulaire', positionName: 'Défenseur Central Gauche', pitchX: 38, pitchY: 74, minutes: 90, rating: 8.0, distanceKm: 10.2, maxSpeedKmH: 34.6, sprints: 10, passes: 80, passesAccuracy: 93, progressivePasses: 8, duelsWon: 7, duelsTotal: 8, recoveries: 7, chancesCreated: 0 },
      { playerId: 'hernandez_t', role: 'titulaire', positionName: 'Latéral Gauche', pitchX: 16, pitchY: 68, minutes: 90, rating: 8.1, distanceKm: 11.0, maxSpeedKmH: 35.3, sprints: 24, passes: 56, passesAccuracy: 88, progressivePasses: 9, duelsWon: 6, duelsTotal: 8, recoveries: 5, chancesCreated: 2, assists: 1 },
      { playerId: 'tchouameni', role: 'titulaire', positionName: 'Milieu Défensif', pitchX: 50, pitchY: 52, minutes: 90, rating: 8.4, distanceKm: 12.5, maxSpeedKmH: 32.9, sprints: 15, passes: 92, passesAccuracy: 94, progressivePasses: 15, duelsWon: 9, duelsTotal: 11, recoveries: 10, chancesCreated: 2, goals: 1 },
      { playerId: 'rabiot', role: 'titulaire', positionName: 'Milieu Relayeur', pitchX: 32, pitchY: 44, minutes: 90, rating: 8.6, distanceKm: 11.9, maxSpeedKmH: 32.0, sprints: 14, passes: 72, passesAccuracy: 91, progressivePasses: 8, duelsWon: 8, duelsTotal: 10, recoveries: 6, chancesCreated: 2, goals: 2 },
      { playerId: 'griezmann', role: 'titulaire', positionName: 'Milieu Offensif', pitchX: 68, pitchY: 44, minutes: 78, rating: 8.3, distanceKm: 10.4, maxSpeedKmH: 31.4, sprints: 11, passes: 65, passesAccuracy: 90, progressivePasses: 13, duelsWon: 5, duelsTotal: 6, recoveries: 4, chancesCreated: 4, assists: 2, substitutionMinute: 78 },
      { playerId: 'dembele', role: 'titulaire', positionName: 'Ailier Droit', pitchX: 84, pitchY: 26, minutes: 68, rating: 7.9, distanceKm: 8.0, maxSpeedKmH: 35.8, sprints: 23, passes: 38, passesAccuracy: 85, progressivePasses: 6, duelsWon: 5, duelsTotal: 8, recoveries: 2, chancesCreated: 3, substitutionMinute: 68 },
      { playerId: 'mbappe', role: 'titulaire', positionName: 'Avant-Centre', pitchX: 50, pitchY: 18, minutes: 90, rating: 8.7, distanceKm: 10.9, maxSpeedKmH: 36.7, sprints: 27, passes: 44, passesAccuracy: 87, progressivePasses: 6, duelsWon: 7, duelsTotal: 11, recoveries: 3, chancesCreated: 3, goals: 1 },
      { playerId: 'barcola', role: 'titulaire', positionName: 'Ailier Gauche', pitchX: 16, pitchY: 26, minutes: 72, rating: 7.8, distanceKm: 8.7, maxSpeedKmH: 35.1, sprints: 21, passes: 35, passesAccuracy: 84, progressivePasses: 6, duelsWon: 5, duelsTotal: 7, recoveries: 2, chancesCreated: 2, substitutionMinute: 72 }
    ],
    substitutes: [
      { playerId: 'nkunku', role: 'remplacant', positionName: 'Attaquant', pitchX: 0, pitchY: 0, minutes: 22, rating: 7.1, distanceKm: 2.9, maxSpeedKmH: 32.8, sprints: 6, passes: 14, passesAccuracy: 88, progressivePasses: 2, duelsWon: 2, duelsTotal: 3, recoveries: 1, chancesCreated: 1, substitutionMinute: 68 },
      { playerId: 'kolo_muani', role: 'remplacant', positionName: 'Attaquant', pitchX: 0, pitchY: 0, minutes: 18, rating: 6.9, distanceKm: 2.4, maxSpeedKmH: 32.5, sprints: 5, passes: 10, passesAccuracy: 85, progressivePasses: 2, duelsWon: 2, duelsTotal: 3, recoveries: 1, chancesCreated: 1, substitutionMinute: 72 },
      { playerId: 'zaire_emery', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 12, rating: 6.8, distanceKm: 1.7, maxSpeedKmH: 32.0, sprints: 4, passes: 12, passesAccuracy: 92, progressivePasses: 2, duelsWon: 2, duelsTotal: 2, recoveries: 1, chancesCreated: 0, substitutionMinute: 78 },
      { playerId: 'clauss', role: 'remplacant', positionName: 'Défenseur', pitchX: 0, pitchY: 0, minutes: 8, rating: 6.5, distanceKm: 1.2, maxSpeedKmH: 31.2, sprints: 2, passes: 6, passesAccuracy: 88, progressivePasses: 1, duelsWon: 1, duelsTotal: 1, recoveries: 0, chancesCreated: 0, substitutionMinute: 82 }
    ],
    events: [
      { minute: 12, type: 'goal', playerId: 'rabiot', text: 'But de Adrien Rabiot de la tête sur corner', team: 'home' },
      { minute: 33, type: 'goal', playerId: 'tchouameni', text: 'Frappe lourde de 25m de Aurélien Tchouaméni sous la barre', team: 'home' },
      { minute: 65, type: 'goal', playerId: 'rabiot', text: 'Doublé de Adrien Rabiot', team: 'home' },
      { minute: 84, type: 'goal', playerId: 'mbappe', text: 'Quatrième but de Kylian Mbappé en contre-attaque', team: 'home' }
    ]
  }
];

// Helper to generate a realistic coherent squad of 24 participants
function createSessionParticipants(overrideMap: Record<string, Partial<any>> = {}) {
  const basePlayers = [
    { id: 'chevalier', role: 'GK', dist: 4.2, sp: 6, spd: 28.1, rpe: 6, st: 'Complet' },
    { id: 'samba', role: 'GK', dist: 4.0, sp: 5, spd: 27.4, rpe: 6, st: 'Complet' },
    { id: 'mbappe', role: 'FWD', dist: 9.8, sp: 28, spd: 35.2, rpe: 8, st: 'Complet' },
    { id: 'barcola', role: 'FWD', dist: 9.4, sp: 26, spd: 34.4, rpe: 8, st: 'Complet' },
    { id: 'dembele', role: 'FWD', dist: 6.8, sp: 18, spd: 32.5, rpe: 6, st: 'Adapté', notice: 'Temps plafonné à 60 min (reprise)' },
    { id: 'griezmann', role: 'FWD', dist: 9.2, sp: 16, spd: 31.0, rpe: 7, st: 'Complet' },
    { id: 'nkunku', role: 'FWD', dist: 8.8, sp: 20, spd: 33.0, rpe: 7, st: 'Complet' },
    { id: 'kolo_muani', role: 'FWD', dist: 9.0, sp: 22, spd: 33.8, rpe: 8, st: 'Complet' },
    { id: 'coman', role: 'FWD', dist: 7.2, sp: 15, spd: 31.5, rpe: 6, st: 'Adapté', notice: 'Ménagement tendon rotulien' },
    { id: 'tchouameni', role: 'MID', dist: 10.6, sp: 18, spd: 32.1, rpe: 9, st: 'Complet' },
    { id: 'rabiot', role: 'MID', dist: 10.2, sp: 15, spd: 31.0, rpe: 7, st: 'Complet' },
    { id: 'zaire_emery', role: 'MID', dist: 9.8, sp: 16, spd: 32.4, rpe: 7, st: 'Complet' },
    { id: 'fofana_y', role: 'MID', dist: 9.6, sp: 15, spd: 31.2, rpe: 7, st: 'Complet' },
    { id: 'thuram_k', role: 'MID', dist: 9.5, sp: 14, spd: 31.8, rpe: 7, st: 'Complet' },
    { id: 'saliba', role: 'DEF', dist: 8.9, sp: 12, spd: 32.8, rpe: 7, st: 'Complet' },
    { id: 'konate', role: 'DEF', dist: 8.7, sp: 11, spd: 32.5, rpe: 7, st: 'Complet' },
    { id: 'kounde', role: 'DEF', dist: 9.6, sp: 19, spd: 32.4, rpe: 7, st: 'Complet' },
    { id: 'hernandez_t', role: 'DEF', dist: 9.7, sp: 22, spd: 34.0, rpe: 8, st: 'Complet' },
    { id: 'upamecano', role: 'DEF', dist: 8.8, sp: 12, spd: 33.0, rpe: 7, st: 'Complet' },
    { id: 'pavard', role: 'DEF', dist: 8.6, sp: 14, spd: 31.5, rpe: 6, st: 'Complet' },
    { id: 'clauss', role: 'DEF', dist: 9.0, sp: 18, spd: 32.2, rpe: 7, st: 'Complet' },
    { id: 'olise', role: 'FWD', dist: 8.5, sp: 16, spd: 32.6, rpe: 7, st: 'Complet' },
    { id: 'maignan', role: 'GK', dist: 0, sp: 0, spd: 0, rpe: 0, st: 'Absent', notice: 'Soins Milan (lésion mollet droit)' },
    { id: 'camavinga', role: 'MID', dist: 3.5, sp: 4, spd: 25.0, rpe: 4, st: 'Travail individuel', notice: 'Phase de reprise sans contact' }
  ];

  return basePlayers.map((bp) => {
    const over = overrideMap[bp.id] || {};
    const isAbs = (over.status || bp.st) === 'Absent' || (over.status || bp.st) === 'Repos programmé';

    const dist = isAbs ? 0 : (over.distanceKm ?? bp.dist);
    const spd = isAbs ? 0 : (over.maxSpeed ?? bp.spd);
    const rpe = isAbs ? 0 : (over.rpe ?? bp.rpe);
    const sprints = isAbs ? 0 : (over.sprintsCount ?? bp.sp);
    const min = isAbs ? 0 : (over.participationMinutes ?? (bp.st === 'Adapté' ? 60 : 92));

    return {
      playerId: bp.id,
      rpe,
      distanceKm: dist,
      highIntensityDistanceM: Math.round(dist * 180),
      sprintsCount: sprints,
      maxSpeed: spd,
      accelerations: isAbs ? 0 : Math.round(dist * 2.8),
      decelerations: isAbs ? 0 : Math.round(dist * 3.1),
      highIntensityTimeMin: isAbs ? 0 : Math.round(rpe * 2.2),
      ballTouches: isAbs ? 0 : Math.round(dist * 8.5),
      passesAttempted: isAbs ? 0 : Math.round(dist * 5.8),
      passesCompleted: isAbs ? 0 : Math.round(dist * 5.2),
      passesAccuracy: isAbs ? 0 : 90,
      duelsCount: isAbs ? 0 : Math.round(dist * 0.8),
      duelsWon: isAbs ? 0 : Math.round(dist * 0.5),
      shotsCount: bp.role === 'FWD' ? 4 : 1,
      shotsOnTarget: bp.role === 'FWD' ? 3 : 1,
      recoveries: bp.role === 'DEF' || bp.role === 'MID' ? 6 : 2,
      ballLosses: bp.role === 'FWD' ? 4 : 2,
      hrAvg: isAbs ? 0 : 155,
      participationMinutes: min,
      status: over.status || bp.st,
      alertNotice: over.alertNotice || bp.notice,
      feedback: rpe >= 8 ? 'Très bonne' : rpe >= 6 ? 'Bonne' : 'Moyenne',
      postWellness: {
        fatigue: rpe >= 8 ? 4 : 2,
        soreness: rpe >= 8 ? 3 : 2,
        stress: 1,
        sleepQuality: 4,
        generalFeeling: rpe >= 8 ? 'Séance exigeante mais bien digérée' : 'Bonne fraîcheur générale',
        comment: over.alertNotice || (rpe >= 8 ? 'Bonnes sensations dynamiques sur les changements de direction.' : undefined)
      },
      incident: over.incident
    };
  });
}

export const COMPREHENSIVE_TRAININGS: TrainingSession[] = [
  // 1. Mercredi Intensif (Séance référence de la semaine)
  {
    id: 'train-1',
    title: 'Séance collective haute intensité',
    date: '10 octobre 2025',
    startTime: '10:30',
    endTime: '12:02',
    location: 'Clairefontaine • Terrain Michel Platini',
    type: 'Intensif',
    durationMinutes: 92,
    presentCount: 22,
    totalSquadCount: 25,
    intensityScore: 74,
    collectiveLoadLabel: 'Modérée',
    loadUA: 487,
    loadDiffPercent: 12,
    charge: 100,
    intensite: 110,
    volume: 105,
    distanceKm: 9.8,
    sprints: 72,
    exercises: [
      { name: 'Échauffement articulaire & proprioception', timeStart: '10:30', timeEnd: '10:45', duration: 15, intensity: 'Faible', phaseType: 'Échauffement', loadUA: 45 },
      { name: 'Conservations & relances sous pressing', timeStart: '10:45', timeEnd: '11:05', duration: 20, intensity: 'Moyenne', phaseType: 'Technique', loadUA: 110 },
      { name: 'Jeu réduit haute intensité (5v5 + appuis)', timeStart: '11:05', timeEnd: '11:30', duration: 25, intensity: 'Élevée', phaseType: 'Jeu réduit', loadUA: 185 },
      { name: 'Blocs tactiques médians & transitions rapides', timeStart: '11:30', timeEnd: '11:50', duration: 20, intensity: 'Élevée', phaseType: 'Haute intensité', loadUA: 120 },
      { name: 'Retour au calme & décharge neuromusculaire', timeStart: '11:50', timeEnd: '12:02', duration: 12, intensity: 'Faible', phaseType: 'Retour au calme', loadUA: 27 }
    ],
    perceivedEffort: {
      averageScore: 92,
      verbal: 'Bonne',
      breakdown: { tresBonne: 14, bonne: 7, moyenne: 1, difficile: 0 }
    },
    participants: createSessionParticipants({
      dembele: { status: 'Adapté', participationMinutes: 60, distanceKm: 6.8, maxSpeed: 29.5, rpe: 5, alertNotice: 'Plafond 60 min respecté' },
      maignan: { status: 'Absent', alertNotice: 'Soins mollet droit en club (Milan)' },
      camavinga: { status: 'Travail individuel', participationMinutes: 45, distanceKm: 3.5, maxSpeed: 24.2, rpe: 4, alertNotice: 'Réathlétisation sans contact' }
    })
  },

  // 2. Vendredi Activation (Pré-match)
  {
    id: 'train-2',
    title: 'Activation veille de match',
    date: '11 octobre 2025',
    startTime: '16:00',
    endTime: '17:00',
    location: 'Stade de France • Pelouse d’honneur',
    type: 'Activation',
    durationMinutes: 60,
    presentCount: 23,
    totalSquadCount: 25,
    intensityScore: 62,
    collectiveLoadLabel: 'Légère',
    loadUA: 280,
    loadDiffPercent: -15,
    charge: 75,
    intensite: 80,
    volume: 70,
    distanceKm: 5.2,
    sprints: 32,
    exercises: [
      { name: 'Toros dynamiques & vivacité courte', timeStart: '16:00', timeEnd: '16:15', duration: 15, intensity: 'Faible', phaseType: 'Échauffement', loadUA: 55 },
      { name: 'Coups de pied arrêtés offensifs/défensifs', timeStart: '16:15', timeEnd: '16:45', duration: 30, intensity: 'Moyenne', phaseType: 'Tactique', loadUA: 140 },
      { name: 'Finitions et tirs au but', timeStart: '16:45', timeEnd: '17:00', duration: 15, intensity: 'Moyenne', phaseType: 'Finitions', loadUA: 85 }
    ],
    perceivedEffort: {
      averageScore: 96,
      verbal: 'Très bonne',
      breakdown: { tresBonne: 20, bonne: 3, moyenne: 0, difficile: 0 }
    },
    participants: createSessionParticipants({
      maignan: { status: 'Absent', alertNotice: 'Absent (blessure soléaire)' }
    })
  },

  // 3. Jeudi Tactique (Mise en place tactique Pays-Bas)
  {
    id: 'train-3',
    title: 'Mise en place tactique & blocs',
    date: '09 octobre 2025',
    startTime: '10:30',
    endTime: '11:55',
    location: 'Clairefontaine • Terrain Pierre Pibarot',
    type: 'Tactique',
    durationMinutes: 85,
    presentCount: 22,
    totalSquadCount: 25,
    intensityScore: 68,
    collectiveLoadLabel: 'Modérée',
    loadUA: 410,
    loadDiffPercent: 2,
    charge: 88,
    intensite: 92,
    volume: 90,
    distanceKm: 7.9,
    sprints: 48,
    exercises: [
      { name: 'Activation athlétique avec bandes élastiques', timeStart: '10:30', timeEnd: '10:45', duration: 15, intensity: 'Faible', phaseType: 'Échauffement', loadUA: 50 },
      { name: 'Bloc 4-3-3 et circuits de relance', timeStart: '10:45', timeEnd: '11:15', duration: 30, intensity: 'Moyenne', phaseType: 'Tactique', loadUA: 160 },
      { name: 'Opposition 11v11 terrain réduit', timeStart: '11:15', timeEnd: '11:45', duration: 30, intensity: 'Élevée', phaseType: 'Jeu', loadUA: 170 },
      { name: 'Étirements et hydratation', timeStart: '11:45', timeEnd: '11:55', duration: 10, intensity: 'Faible', phaseType: 'Récupération', loadUA: 30 }
    ],
    perceivedEffort: {
      averageScore: 90,
      verbal: 'Bonne',
      breakdown: { tresBonne: 15, bonne: 6, moyenne: 1, difficile: 0 }
    },
    participants: createSessionParticipants()
  },

  // 4. Mardi Collectif (Mise en route dynamique)
  {
    id: 'train-4',
    title: 'Séance collective & jeux de transition',
    date: '08 octobre 2025',
    startTime: '16:00',
    endTime: '17:25',
    location: 'Clairefontaine • Terrain Michel Platini',
    type: 'Collectif',
    durationMinutes: 85,
    presentCount: 22,
    totalSquadCount: 25,
    intensityScore: 72,
    collectiveLoadLabel: 'Modérée',
    loadUA: 430,
    loadDiffPercent: 5,
    charge: 92,
    intensite: 95,
    volume: 92,
    distanceKm: 8.4,
    sprints: 54,
    exercises: [
      { name: 'Échauffement dynamique avec ballon', timeStart: '16:00', timeEnd: '16:20', duration: 20, intensity: 'Faible', phaseType: 'Échauffement', loadUA: 60 },
      { name: 'Transitions offensives rapides 4v3', timeStart: '16:20', timeEnd: '16:55', duration: 35, intensity: 'Élevée', phaseType: 'Transition', loadUA: 210 },
      { name: 'Jeu à thème 8v8', timeStart: '16:55', timeEnd: '17:15', duration: 20, intensity: 'Moyenne', phaseType: 'Jeu', loadUA: 130 },
      { name: 'Retour au calme', timeStart: '17:15', timeEnd: '17:25', duration: 10, intensity: 'Faible', phaseType: 'Récupération', loadUA: 30 }
    ],
    perceivedEffort: {
      averageScore: 89,
      verbal: 'Bonne',
      breakdown: { tresBonne: 12, bonne: 9, moyenne: 1, difficile: 0 }
    },
    participants: createSessionParticipants()
  },

  // 5. Lundi Récupération (Post week-end championnat)
  {
    id: 'train-5',
    title: 'Récupération active & décharge',
    date: '06 octobre 2025',
    startTime: '17:00',
    endTime: '18:05',
    location: 'Clairefontaine • Centre Médical & Balnéo',
    type: 'Récupération',
    durationMinutes: 65,
    presentCount: 23,
    totalSquadCount: 25,
    intensityScore: 42,
    collectiveLoadLabel: 'Légère',
    loadUA: 210,
    loadDiffPercent: -28,
    charge: 50,
    intensite: 45,
    volume: 60,
    distanceKm: 3.8,
    sprints: 8,
    exercises: [
      { name: 'Footing léger aérobie sur herbe', timeStart: '17:00', timeEnd: '17:20', duration: 20, intensity: 'Faible', phaseType: 'Aérobie', loadUA: 50 },
      { name: 'Mobilité activo-dynamique et décompression', timeStart: '17:20', timeEnd: '17:40', duration: 20, intensity: 'Faible', phaseType: 'Mobilité', loadUA: 60 },
      { name: 'Bains froids, cryothérapie et massages', timeStart: '17:40', timeEnd: '18:05', duration: 25, intensity: 'Faible', phaseType: 'Soins', loadUA: 100 }
    ],
    perceivedEffort: {
      averageScore: 98,
      verbal: 'Très bonne',
      breakdown: { tresBonne: 22, bonne: 1, moyenne: 0, difficile: 0 }
    },
    participants: createSessionParticipants()
  },

  // 6. Dimanche Post-match / Récupération
  {
    id: 'train-6',
    title: 'Décrassage post-match & soins',
    date: '13 octobre 2025',
    startTime: '11:00',
    endTime: '12:00',
    location: 'Clairefontaine • Balnéothérapie',
    type: 'Post-match',
    durationMinutes: 60,
    presentCount: 23,
    totalSquadCount: 25,
    intensityScore: 38,
    collectiveLoadLabel: 'Légère',
    loadUA: 195,
    loadDiffPercent: -35,
    charge: 45,
    intensite: 40,
    volume: 55,
    distanceKm: 3.2,
    sprints: 4,
    exercises: [
      { name: 'Décrassage vélo stationnaire pour les titulaires', timeStart: '11:00', timeEnd: '11:30', duration: 30, intensity: 'Faible', phaseType: 'Cardio', loadUA: 65 },
      { name: 'Jeu avec ballon pour les remplaçants (compensation)', timeStart: '11:00', timeEnd: '11:45', duration: 45, intensity: 'Moyenne', phaseType: 'Compensation', loadUA: 180 },
      { name: 'Hydrothérapie contrastée et massage', timeStart: '11:30', timeEnd: '12:00', duration: 30, intensity: 'Faible', phaseType: 'Balnéo', loadUA: 80 }
    ],
    perceivedEffort: {
      averageScore: 97,
      verbal: 'Très bonne',
      breakdown: { tresBonne: 21, bonne: 2, moyenne: 0, difficile: 0 }
    },
    participants: createSessionParticipants()
  },

  // 7. Musculation & Force athlétique
  {
    id: 'train-7',
    title: 'Renforcement musculaire & puissance',
    date: '04 octobre 2025',
    startTime: '10:00',
    endTime: '11:15',
    location: 'Clairefontaine • Salle de musculation FFF',
    type: 'Musculation',
    durationMinutes: 75,
    presentCount: 21,
    totalSquadCount: 25,
    intensityScore: 78,
    collectiveLoadLabel: 'Modérée',
    loadUA: 420,
    loadDiffPercent: 8,
    charge: 95,
    intensite: 105,
    volume: 88,
    distanceKm: 2.1,
    sprints: 12,
    exercises: [
      { name: 'Échauffement gainage et chaîne postérieure', timeStart: '10:00', timeEnd: '10:15', duration: 15, intensity: 'Faible', phaseType: 'Gainage', loadUA: 50 },
      { name: 'Squats guidés & fentes dynamiques chargées', timeStart: '10:15', timeEnd: '10:45', duration: 30, intensity: 'Élevée', phaseType: 'Force', loadUA: 220 },
      { name: 'Pliométrie et bonds horizontaux', timeStart: '10:45', timeEnd: '11:05', duration: 20, intensity: 'Élevée', phaseType: 'Puissance', loadUA: 120 },
      { name: 'Décharge lombaire', timeStart: '11:05', timeEnd: '11:15', duration: 10, intensity: 'Faible', phaseType: 'Étirements', loadUA: 30 }
    ],
    perceivedEffort: {
      averageScore: 88,
      verbal: 'Bonne',
      breakdown: { tresBonne: 11, bonne: 9, moyenne: 1, difficile: 0 }
    },
    participants: createSessionParticipants()
  },

  // 8. Spécifique poste (Gardiens & Lignes)
  {
    id: 'train-8',
    title: 'Spécifique postes — Lignes et gardiens',
    date: '03 octobre 2025',
    startTime: '15:30',
    endTime: '16:50',
    location: 'Clairefontaine • Terrain synthétique couvert',
    type: 'Spécifique poste',
    durationMinutes: 80,
    presentCount: 22,
    totalSquadCount: 25,
    intensityScore: 76,
    collectiveLoadLabel: 'Modérée',
    loadUA: 440,
    loadDiffPercent: 6,
    charge: 94,
    intensite: 102,
    volume: 90,
    distanceKm: 7.2,
    sprints: 52,
    exercises: [
      { name: 'Gardiens : prises de balle aériennes et relances pieds', timeStart: '15:30', timeEnd: '16:00', duration: 30, intensity: 'Élevée', phaseType: 'Poste', loadUA: 150 },
      { name: 'Défenseurs : duels aériens et alignement', timeStart: '15:30', timeEnd: '16:00', duration: 30, intensity: 'Moyenne', phaseType: 'Poste', loadUA: 140 },
      { name: 'Attaquants : attaques rapides et finition en un temps', timeStart: '16:00', timeEnd: '16:35', duration: 35, intensity: 'Élevée', phaseType: 'Finition', loadUA: 190 },
      { name: 'Bilan étirements', timeStart: '16:35', timeEnd: '16:50', duration: 15, intensity: 'Faible', phaseType: 'Calme', loadUA: 40 }
    ],
    perceivedEffort: {
      averageScore: 91,
      verbal: 'Bonne',
      breakdown: { tresBonne: 13, bonne: 8, moyenne: 1, difficile: 0 }
    },
    participants: createSessionParticipants()
  },

  // 9. Technique pure (Pied faible & passes courtes)
  {
    id: 'train-9',
    title: 'Ateliers techniques & précision sous contrainte',
    date: '01 octobre 2025',
    startTime: '10:30',
    endTime: '11:45',
    location: 'Clairefontaine • Fosse technique',
    type: 'Technique',
    durationMinutes: 75,
    presentCount: 22,
    totalSquadCount: 25,
    intensityScore: 65,
    collectiveLoadLabel: 'Modérée',
    loadUA: 370,
    loadDiffPercent: -4,
    charge: 82,
    intensite: 85,
    volume: 80,
    distanceKm: 6.4,
    sprints: 36,
    exercises: [
      { name: 'Circuits de passes courtes en une touche', timeStart: '10:30', timeEnd: '10:55', duration: 25, intensity: 'Moyenne', phaseType: 'Passes', loadUA: 120 },
      { name: 'Rondo 7v2 orienté prise d’information', timeStart: '10:55', timeEnd: '11:25', duration: 30, intensity: 'Moyenne', phaseType: 'Rondo', loadUA: 160 },
      { name: 'Tennis-ballon de récupération', timeStart: '11:25', timeEnd: '11:45', duration: 20, intensity: 'Faible', phaseType: 'Ludique', loadUA: 90 }
    ],
    perceivedEffort: {
      averageScore: 95,
      verbal: 'Très bonne',
      breakdown: { tresBonne: 18, bonne: 4, moyenne: 0, difficile: 0 }
    },
    participants: createSessionParticipants()
  }
];
