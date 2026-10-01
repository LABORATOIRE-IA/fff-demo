export interface FFFTeam {
  id: string;
  name: string;
  category: 'A' | 'Espoirs' | 'Féminine' | 'Jeunes' | 'Futsal' | 'Arbitres';
  coach: string;
  status: string;
  squadCount: number;
  upcomingMatch: string;
  nextMatchDate: string;
  badge: string;
  description: string;
}

export const FFF_TEAMS: FFFTeam[] = [
  {
    id: 'france_a',
    name: 'France A — Masculine',
    category: 'A',
    coach: 'Zinédine Zidane',
    status: 'Rassemblement imminent (J-2)',
    squadCount: 24,
    upcomingMatch: 'France vs Danemark',
    nextMatchDate: '12 mars 2026',
    badge: '🇫🇷',
    description: 'Sélection nationale principale • UEFA Nations League & FIFA World Cup'
  },
  {
    id: 'corps_arbitral',
    name: 'Corps Arbitral FFF & FIFA',
    category: 'Arbitres',
    coach: 'Antony Gautier (DTA)',
    status: '10 Arbitres FFF Elite & FIFA',
    squadCount: 10,
    upcomingMatch: 'Désignations Ligue 1 & UEFA',
    nextMatchDate: 'Week-end J-1',
    badge: '⚖️',
    description: 'Direction Technique de l’Arbitrage • Suivi athlétique, tests FIFA SDS et VAR'
  },
  {
    id: 'france_a_fem',
    name: 'France A — Féminine',
    category: 'Féminine',
    coach: 'Laurent Bonadei',
    status: 'En préparation Euro 2025/2026',
    squadCount: 23,
    upcomingMatch: 'France vs Angleterre',
    nextMatchDate: '05 avril 2026',
    badge: '🇫🇷',
    description: 'Sélection nationale féminine A • Élite internationale'
  },
  {
    id: 'france_espoirs',
    name: 'France Espoirs (U21)',
    category: 'Espoirs',
    coach: 'Gérald Baticle',
    status: 'Qualifications Euro U21',
    squadCount: 22,
    upcomingMatch: 'Slovénie vs France U21',
    nextMatchDate: '21 mars 2026',
    badge: '🇫🇷',
    description: 'Antichambre de la sélection A • Suivi potentiel olympique'
  },
  {
    id: 'france_u19',
    name: 'France U19',
    category: 'Jeunes',
    coach: 'Bernard Diomède',
    status: 'Tour Élite UEFA',
    squadCount: 20,
    upcomingMatch: 'France U19 vs Norvège U19',
    nextMatchDate: '26 mars 2026',
    badge: '🇫🇷',
    description: 'Filière d’excellence nationale • Détection & transition pro'
  },
  {
    id: 'france_u17',
    name: 'France U17',
    category: 'Jeunes',
    coach: 'Lionel Rouxel',
    status: 'Championnat d’Europe U17',
    squadCount: 20,
    upcomingMatch: 'France U17 vs Portugal U17',
    nextMatchDate: '02 mai 2026',
    badge: '🇫🇷',
    description: 'Pépinière fédérale • Suivi longitudinal précoce'
  },
  {
    id: 'france_futsal',
    name: 'France Futsal A',
    category: 'Futsal',
    coach: 'Raphaël Reynaud',
    status: 'Top 10 Mondial FIFA',
    squadCount: 16,
    upcomingMatch: 'France vs Brésil Futsal',
    nextMatchDate: '18 avril 2026',
    badge: '🇫🇷',
    description: 'Équipe de France Futsal • Haute intensité & technicité'
  }
];
