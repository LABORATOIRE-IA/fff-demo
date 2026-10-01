import { Player, Match, TrainingSession, Rassemblement } from '../types/ams';

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 'dupont',
    name: 'Mathis Dupont',
    firstName: 'Mathis',
    lastName: 'Dupont',
    number: 7,
    position: 'Milieu',
    club: 'FC Avenir',
    age: 24,
    height: '1,82 m',
    weight: '75 kg',
    preferredFoot: 'Droitier',
    caps: 12,
    goals: 4,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'disponible',
    alert: {
      id: 'alt-dupont',
      type: 'charge',
      label: 'Charge modérée • Surveillance ischios',
      value: '487 UA',
      trend: '+3 pts',
      severity: 'info',
      actionNeeded: 'Séance allégée post-match, surveillance ischios. Examen clinique validé à 100% par le Dr. Le Gall.'
    },
    dimensions: {
      entrainement: {
        score: 84,
        dureeTotale: '32h15',
        seances: 22,
        distance: 218.4,
      },
      sante: {
        score: 91,
        disponibilite: 96,
        joursSansGene: 42,
        statut: 'Disponible 100% (Apte)',
        sensibleMedical: 'Bilan échographique de contrôle négatif (14/03/2026). Aucune séquelle de la lésion myotendineuse. Validation Dr. Franck Le Gall.',
        pathologyHistory: [
          'Jan 2026: Gêne légère ischio droit résolue (J+12)',
          'Oct 2025: Entorse cheville droite stade 1, rééducation complète',
          'Avr 2025: Bilan isocinétique conforme aux normes de référence'
        ]
      },
      performance: {
        score: 86,
        arretsParMatch: 0,
        relancesReussies: 87,
        noteMoyenne: 7.6,
        butsSaison: 4,
        passesD: 5,
        xG: 3.8
      },
      physique: {
        score: 82,
        vitesseMax: 33.8,
        puissanceMax: 7.8,
        temps10m: 1.62
      },
      recuperation: {
        score: 85,
        sommeil: '7h45',
        hrv: 82,
        readiness: 88
      },
      nutrition: {
        score: 90,
        hydratation: 94,
        equilibre: 'Optimal',
        poids: 75
      }
    },
    scoreGlobal: 82,
    scoreEvolution: 3,
    history: [
      { week: 'S-4', charge: 79, physique: 80, sante: 89, recuperation: 83, performance: 81, nutrition: 88 },
      { week: 'S-3', charge: 81, physique: 81, sante: 90, recuperation: 84, performance: 83, nutrition: 89 },
      { week: 'S-2', charge: 83, physique: 82, sante: 90, recuperation: 84, performance: 85, nutrition: 89 },
      { week: 'S-1', charge: 83, physique: 82, sante: 91, recuperation: 85, performance: 85, nutrition: 90 },
      { week: 'Actuel', charge: 84, physique: 82, sante: 91, recuperation: 85, performance: 86, nutrition: 90 }
    ],
    timeline: [
      {
        id: 'dupont-t1',
        year: '2020',
        date: 'Septembre 2020',
        category: 'carriere',
        title: 'Intégration Centre de Formation',
        description: 'Repéré pour sa vision de jeu, qualité de passe et volume athlétique en National 1.',
        source: 'Cellule Détection FFF'
      },
      {
        id: 'dupont-t2',
        year: '2024',
        date: 'Mai 2024',
        category: 'selections',
        title: 'Première Convocation en Sélection Espoirs',
        description: 'Titularisation au poste de milieu offensif, 1 passe décisive et 87% de passes réussies.',
        source: 'Staff FFF'
      },
      {
        id: 'dupont-t3',
        year: '2026',
        date: '12 mars 2026',
        category: 'rassemblements',
        title: 'Bilan médical complet validé à Clairefontaine',
        description: 'Autorisation compétition confirmée par le Dr. Franck Le Gall. Ratio ACWR 1.05.',
        source: 'Staff Médical FFF'
      }
    ],
    sources: [
      {
        id: 'src-dupont-1',
        name: 'Club (FC Avenir)',
        iconType: 'club',
        provider: 'API Club Connect / FC Avenir',
        lastSync: 'Hier • 19:30',
        status: 'synced',
        tag: 'Dernière synchro'
      },
      {
        id: 'src-dupont-2',
        name: 'GPS / Capteurs',
        iconType: 'gps',
        provider: 'Catapult Vector 7.1',
        lastSync: 'Il y a 1h',
        status: 'synced',
        tag: 'Données brutes'
      },
      {
        id: 'src-dupont-3',
        name: 'Médical FFF',
        iconType: 'medical',
        provider: 'Portail Médical FFF / Dr. Le Gall',
        lastSync: 'En temps réel',
        status: 'synced',
        tag: 'Habilité Secret Médical'
      }
    ],
    clubExchanges: [
      {
        id: 'ex-dupont-1',
        type: 'recu',
        title: 'Données reçues du club (FC Avenir)',
        club: 'FC Avenir',
        date: 'Hier • 19:30',
        details: 'Charge hebdomadaire (2 180 UA), rapport RPE et sommeil.'
      }
    ],
    heatmap: {
      goalkeeperZone: [],
      outfieldZone: [
        { x: 55, y: 45, r: 35, intensity: 0.95 },
        { x: 65, y: 40, r: 28, intensity: 0.85 },
        { x: 48, y: 55, r: 25, intensity: 0.75 }
      ]
    },
    recentMatchesIds: ['match-1', 'match-2'],
    recentTrainingsIds: ['train-1', 'train-2']
  },
  {
    id: 'chevalier',
    name: 'Lucas Chevalier',
    firstName: 'Lucas',
    lastName: 'Chevalier',
    number: 23,
    position: 'Gardien',
    club: 'Paris Saint-Germain',
    age: 24,
    height: '1,82 m',
    weight: '76 kg',
    preferredFoot: 'Droitier',
    caps: 22,
    goals: 0,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'a_surveiller',
    alert: {
      id: 'alt-chevalier',
      type: 'recup',
      label: 'Récupération faible',
      value: '58/100',
      trend: '-17 pts',
      severity: 'warning',
      actionNeeded: 'Adapter la charge sur les séances explosives et bilan du sommeil avec le pôle performance.'
    },
    dimensions: {
      entrainement: {
        score: 87,
        dureeTotale: '38h00',
        seances: 24,
        distance: 248.6,
      },
      sante: {
        score: 92,
        disponibilite: 98,
        joursSansGene: 28,
        statut: 'Disponible (surveillance fatigue nerveuse)',
        sensibleMedical: 'Légère inflammation ischios droits en rémission (J+28). Pas de lésion structurelle à l’IRM de contrôle (04/03/2026). Prise d’anti-inflammatoires terminée. Validation staff Dr. Le Gall.',
        pathologyHistory: [
          'Fév 2026: Alerte contractile ischio-jambier droit (Grade 1)',
          'Nov 2025: Bilan postural validé sans anomalie rachidienne',
          'Mai 2025: Entorse bénigne cheville gauche, reprise complète à J+10'
        ]
      },
      performance: {
        score: 85,
        arretsParMatch: 4.2,
        relancesReussies: 87,
        noteMoyenne: 7.4,
        butsSaison: 0,
        passesD: 1,
        xG: 0.1
      },
      physique: {
        score: 83,
        vitesseMax: 29.4,
        puissanceMax: 6.1,
        temps10m: 1.72
      },
      recuperation: {
        score: 88,
        sommeil: '7h52',
        hrv: 78,
        readiness: 90
      },
      nutrition: {
        score: 89,
        hydratation: 92,
        equilibre: 'Bon',
        poids: 76
      }
    },
    scoreGlobal: 86,
    scoreEvolution: 6,
    history: [
      { week: 'S-4', charge: 80, physique: 81, sante: 90, recuperation: 84, performance: 82, nutrition: 86 },
      { week: 'S-3', charge: 82, physique: 82, sante: 89, recuperation: 85, performance: 83, nutrition: 87 },
      { week: 'S-2', charge: 85, physique: 84, sante: 91, recuperation: 86, performance: 84, nutrition: 88 },
      { week: 'S-1', charge: 84, physique: 82, sante: 91, recuperation: 83, performance: 84, nutrition: 88 },
      { week: 'Actuel', charge: 87, physique: 83, sante: 92, recuperation: 88, performance: 85, nutrition: 89 }
    ],
    timeline: [
      {
        id: 'time-1',
        year: '2015',
        date: 'Septembre 2015',
        category: 'carriere',
        title: 'Détection nationale U15',
        description: 'Première identification par les observateurs de la Direction Technique Nationale (DTN).',
        source: 'DTN / Détection'
      },
      {
        id: 'time-2',
        year: '2017',
        date: 'Août 2017',
        category: 'carriere',
        title: 'Entrée Pôle Espoir',
        description: 'Intégration du cursus fédéral d’excellence sportive et suivi longitudinal précoce.',
        source: 'Pôle Espoirs FFF'
      },
      {
        id: 'time-3',
        year: '2021',
        date: 'Octobre 2021',
        category: 'selections',
        title: 'Première sélection Équipe de France Espoirs',
        description: 'Première titularisation internationale sous le maillot tricolore.',
        source: 'Staff Espoirs'
      },
      {
        id: 'time-4',
        year: '2022-2025',
        date: '2022 — 2025',
        category: 'rassemblements',
        title: 'Rassemblements Équipe de France A',
        description: 'Intégration régulière du groupe France A (22 sélections cumulées).',
        source: 'Sélection A'
      },
      {
        id: 'time-5',
        year: 'Aujourd’hui',
        date: 'Mars 2026',
        category: 'rassemblements',
        title: 'Convoqué — Rassemblement Mars 2026',
        description: 'Pré-rassemblement en cours, protocole de récupération individualisé.',
        source: 'Staff Performance A',
        relatedType: 'rassemblement',
        relatedId: 'rass-mars-2026'
      },
      {
        id: 'time-6',
        date: '10 oct. 2025',
        category: 'rassemblements',
        title: 'Séance collective Clairefontaine',
        description: 'Séance tactique et relances pieds. Charge globale mesurée à 420 UA.',
        source: 'GPS Catapult FFF',
        relatedType: 'training',
        relatedId: 'train-1'
      },
      {
        id: 'time-7',
        date: '12 oct. 2025',
        category: 'selections',
        title: 'Match France 3-1 Pays-Bas',
        description: 'Titulaire 90 min dans les buts, 4 arrêts décisifs, 87% de relances réussies. Note 7.8.',
        source: 'Données Match FFF / UEFA',
        relatedType: 'match',
        relatedId: 'match-1'
      }
    ],
    sources: [
      {
        id: 'src-1',
        name: 'Club (Paris Saint-Germain)',
        iconType: 'club',
        provider: 'API Club Connect / PSG Performance',
        lastSync: 'Hier • 18:24',
        status: 'synced',
        tag: 'Dernière synchro'
      },
      {
        id: 'src-2',
        name: 'GPS / Capteurs',
        iconType: 'gps',
        provider: 'Catapult Vector 7.1',
        lastSync: 'Il y a 2h',
        status: 'synced',
        tag: 'Données brutes'
      },
      {
        id: 'src-3',
        name: 'Vidéo & Stats',
        iconType: 'video',
        provider: 'Wyscout / Hudl Sportscode',
        lastSync: 'Aujourd’hui 13:10',
        status: 'synced',
        tag: 'Analytique FFF'
      },
      {
        id: 'src-4',
        name: 'Médical FFF',
        iconType: 'medical',
        provider: 'Portail Médical FFF / Oura Ring',
        lastSync: 'En temps réel',
        status: 'synced',
        tag: 'Habilité Secret Médical'
      },
      {
        id: 'src-5',
        name: 'Compétitions Officielles',
        iconType: 'fff',
        provider: 'UEFA & FIFA Live Feeds',
        lastSync: 'Hier • 23:45',
        status: 'synced',
        tag: 'Données certifiées'
      },
      {
        id: 'src-6',
        name: 'Outils FFF & DTN',
        iconType: 'tools',
        provider: 'AMS FFF 360 Core',
        lastSync: 'En temps réel',
        status: 'synced',
        tag: 'Référence Fédérale'
      }
    ],
    clubExchanges: [
      {
        id: 'ex-1',
        type: 'recu',
        title: 'Données reçues du club (PSG)',
        club: 'Paris Saint-Germain',
        date: 'Hier • 18:24',
        details: 'Charge cumulée des 7 derniers jours (2 340 UA), rapport RPE et données de sommeil Oura du joueur.'
      },
      {
        id: 'ex-2',
        type: 'partage',
        title: 'Données partagées avec le club',
        club: 'Paris Saint-Germain',
        date: '24 sept. 2025',
        details: 'Bilan post-rassemblement complet transmis au staff médical et de performance du PSG.'
      }
    ],
    heatmap: {
      goalkeeperZone: [
        { x: 50, y: 88, r: 28, intensity: 0.95 },
        { x: 45, y: 82, r: 22, intensity: 0.8 },
        { x: 55, y: 82, r: 22, intensity: 0.78 },
        { x: 50, y: 75, r: 35, intensity: 0.6 },
        { x: 35, y: 85, r: 18, intensity: 0.5 },
        { x: 65, y: 85, r: 18, intensity: 0.48 }
      ],
      outfieldZone: []
    },
    recentMatchesIds: ['match-1', 'match-2', 'match-3'],
    recentTrainingsIds: ['train-1', 'train-2']
  },
  {
    id: 'tchouameni',
    name: 'Aurélien Tchouaméni',
    firstName: 'Aurélien',
    lastName: 'Tchouaméni',
    number: 8,
    position: 'Milieu',
    club: 'Real Madrid',
    age: 24,
    height: '1,87 m',
    weight: '82 kg',
    preferredFoot: 'Droitier',
    caps: 38,
    goals: 3,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'a_surveiller',
    alert: {
      id: 'alt-tchouameni',
      type: 'charge',
      label: 'Charge élevée',
      value: '+24%',
      trend: 'vs référence',
      severity: 'warning',
      actionNeeded: 'Réduire le volume à haute intensité sur les 48 premières heures de rassemblement.'
    },
    dimensions: {
      entrainement: { score: 91, dureeTotale: '44h15', seances: 28, distance: 312.4 },
      sante: { score: 86, disponibilite: 90, joursSansGene: 14, statut: 'Disponible sous réserve de gestion de charge' },
      performance: { score: 89, noteMoyenne: 7.6, butsSaison: 2, passesD: 4, xG: 1.8 },
      physique: { score: 88, vitesseMax: 33.1, puissanceMax: 6.8, temps10m: 1.64 },
      recuperation: { score: 72, sommeil: '6h45', hrv: 62, readiness: 71 },
      nutrition: { score: 90, hydratation: 94, equilibre: 'Optimal', poids: 82 }
    },
    scoreGlobal: 85,
    scoreEvolution: 2,
    history: [
      { week: 'S-4', charge: 78, physique: 85, sante: 89, recuperation: 84, performance: 86, nutrition: 88 },
      { week: 'S-3', charge: 84, physique: 86, sante: 88, recuperation: 80, performance: 87, nutrition: 89 },
      { week: 'S-2', charge: 92, physique: 87, sante: 87, recuperation: 74, performance: 88, nutrition: 90 },
      { week: 'S-1', charge: 96, physique: 88, sante: 86, recuperation: 70, performance: 89, nutrition: 90 },
      { week: 'Actuel', charge: 91, physique: 88, sante: 86, recuperation: 72, performance: 89, nutrition: 90 }
    ],
    timeline: [
      { id: 'tt-1', date: 'Hier 18:24', category: 'club', title: 'Données GPS Real Madrid reçues', description: '90 min jouées en Liga, pic de charge cumulé 2 890 UA.', source: 'API Real Madrid' },
      { id: 'tt-2', date: '12 oct. 2025', category: 'selections', title: 'Titulaire vs Pays-Bas (3-1)', description: '90 min, 12,4 km parcourus, 88 passes, 7 duels gagnés.', source: 'Feuille de match FFF', relatedType: 'match', relatedId: 'match-1' }
    ],
    sources: [
      { id: 'st-1', name: 'Real Madrid medical & fitness', iconType: 'club', provider: 'Real Madrid Hub', lastSync: 'Hier • 18:24', status: 'synced', tag: 'Club' },
      { id: 'st-2', name: 'GPS Catapult FFF', iconType: 'gps', provider: 'Catapult Vector', lastSync: 'Il y a 3h', status: 'synced', tag: 'Capteur' }
    ],
    clubExchanges: [
      { id: 'ext-1', type: 'recu', title: 'Rapport physique Real Madrid', club: 'Real Madrid', date: 'Hier • 18:24', details: 'Notification de fatigue surcharges musculaires adducteurs.' }
    ],
    heatmap: {
      goalkeeperZone: [],
      outfieldZone: [
        { x: 50, y: 55, r: 35, intensity: 0.9 },
        { x: 42, y: 48, r: 25, intensity: 0.8 },
        { x: 58, y: 48, r: 25, intensity: 0.75 },
        { x: 50, y: 38, r: 20, intensity: 0.6 }
      ]
    },
    recentMatchesIds: ['match-1', 'match-2'],
    recentTrainingsIds: ['train-1']
  },
  {
    id: 'dembele',
    name: 'Ousmane Dembélé',
    firstName: 'Ousmane',
    lastName: 'Dembélé',
    number: 11,
    position: 'Attaquant',
    club: 'Paris Saint-Germain',
    age: 28,
    height: '1,78 m',
    weight: '67 kg',
    preferredFoot: 'Ambidextre',
    caps: 51,
    goals: 6,
    avatarUrl: '/assets/player_avatar_dembele.jpg',
    status: 'retour_progressif',
    alert: {
      id: 'alt-dembele',
      type: 'reprise',
      label: 'Retour progressif',
      value: '74%',
      trend: 'Disponibilité',
      severity: 'info',
      actionNeeded: 'Temps de jeu maximal recommandé : 60 minutes. Pas de double séance intensive consécutive.'
    },
    dimensions: {
      entrainement: { score: 79, dureeTotale: '26h30', seances: 18, distance: 184.2 },
      sante: { score: 74, disponibilite: 74, joursSansGene: 10, statut: 'Protocole de reprise progressive', sensibleMedical: 'Réathlétisation suite à une élongation biceps fémoral droit (stade 1b). Feu vert pour 60 min avec protocole échauffement strict.' },
      performance: { score: 86, noteMoyenne: 7.5, butsSaison: 5, passesD: 7, xG: 4.1 },
      physique: { score: 91, vitesseMax: 35.6, puissanceMax: 7.2, temps10m: 1.58 },
      recuperation: { score: 83, sommeil: '8h10', hrv: 74, readiness: 84 },
      nutrition: { score: 88, hydratation: 90, equilibre: 'Bon', poids: 67 }
    },
    scoreGlobal: 81,
    scoreEvolution: 4,
    history: [
      { week: 'S-4', charge: 55, physique: 78, sante: 60, recuperation: 86, performance: 75, nutrition: 85 },
      { week: 'S-3', charge: 65, physique: 82, sante: 65, recuperation: 84, performance: 79, nutrition: 86 },
      { week: 'S-2', charge: 72, physique: 87, sante: 70, recuperation: 83, performance: 82, nutrition: 87 },
      { week: 'S-1', charge: 76, physique: 90, sante: 72, recuperation: 82, performance: 85, nutrition: 88 },
      { week: 'Actuel', charge: 79, physique: 91, sante: 74, recuperation: 83, performance: 86, nutrition: 88 }
    ],
    timeline: [
      { id: 'td-1', date: '08 mars 2026', category: 'medicaux', title: 'Validation protocole reprise R3', description: 'Autorisation compétition avec limitation de minutes à 60 min max.', source: 'Staff Médical FFF / PSG' }
    ],
    sources: [
      { id: 'sd-1', name: 'PSG Médical & Perf', iconType: 'club', provider: 'PSG Performance', lastSync: 'Hier • 19:10', status: 'synced', tag: 'Club' }
    ],
    clubExchanges: [
      { id: 'ed-1', type: 'recu', title: 'Plan de réathlétisation PSG', club: 'Paris Saint-Germain', date: 'Hier • 19:10', details: 'Rapport détaillé des 3 dernières semaines de travail individuel.' }
    ],
    heatmap: {
      goalkeeperZone: [],
      outfieldZone: [
        { x: 80, y: 28, r: 35, intensity: 0.95 },
        { x: 70, y: 35, r: 25, intensity: 0.8 },
        { x: 85, y: 40, r: 20, intensity: 0.7 }
      ]
    },
    recentMatchesIds: ['match-1'],
    recentTrainingsIds: ['train-1']
  },
  {
    id: 'mbappe',
    name: 'Kylian Mbappé',
    firstName: 'Kylian',
    lastName: 'Mbappé',
    number: 10,
    position: 'Attaquant',
    club: 'Real Madrid',
    age: 26,
    height: '1,78 m',
    weight: '75 kg',
    preferredFoot: 'Droitier',
    caps: 86,
    goals: 52,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'disponible',
    dimensions: {
      entrainement: { score: 94, dureeTotale: '46h00', seances: 30, distance: 340.2 },
      sante: { score: 96, disponibilite: 100, joursSansGene: 45, statut: 'Disponible à 100%' },
      performance: { score: 97, noteMoyenne: 8.4, butsSaison: 18, passesD: 9, xG: 14.2 },
      physique: { score: 98, vitesseMax: 36.8, puissanceMax: 7.9, temps10m: 1.52 },
      recuperation: { score: 90, sommeil: '8h25', hrv: 85, readiness: 94 },
      nutrition: { score: 95, hydratation: 98, equilibre: 'Optimal', poids: 75 }
    },
    scoreGlobal: 95,
    scoreEvolution: 3,
    history: [
      { week: 'S-4', charge: 90, physique: 96, sante: 95, recuperation: 88, performance: 94, nutrition: 94 },
      { week: 'S-3', charge: 92, physique: 97, sante: 96, recuperation: 89, performance: 95, nutrition: 95 },
      { week: 'S-2', charge: 93, physique: 98, sante: 96, recuperation: 91, performance: 96, nutrition: 95 },
      { week: 'S-1', charge: 94, physique: 98, sante: 96, recuperation: 90, performance: 97, nutrition: 95 },
      { week: 'Actuel', charge: 94, physique: 98, sante: 96, recuperation: 90, performance: 97, nutrition: 95 }
    ],
    timeline: [
      { id: 'tm-1', date: '12 oct. 2025', category: 'selections', title: 'Doublé vs Pays-Bas (3-1)', description: 'Capitaine, 2 buts marqués (18e, 64e), 1 passe décisive. Homme du match.', source: 'Feuille UEFA' }
    ],
    sources: [
      { id: 'sm-1', name: 'Real Madrid Tech', iconType: 'club', provider: 'Real Madrid GPS', lastSync: 'Hier • 21:00', status: 'synced', tag: 'Club' }
    ],
    clubExchanges: [],
    heatmap: {
      goalkeeperZone: [],
      outfieldZone: [
        { x: 30, y: 25, r: 35, intensity: 0.95 },
        { x: 45, y: 22, r: 30, intensity: 0.85 },
        { x: 50, y: 15, r: 25, intensity: 0.9 }
      ]
    },
    recentMatchesIds: ['match-1', 'match-2', 'match-3'],
    recentTrainingsIds: ['train-1', 'train-2']
  },
  {
    id: 'zaire_emery',
    name: 'Warren Zaïre-Emery',
    firstName: 'Warren',
    lastName: 'Zaïre-Emery',
    number: 6,
    position: 'Milieu',
    club: 'Paris Saint-Germain',
    age: 19,
    height: '1,78 m',
    weight: '72 kg',
    preferredFoot: 'Droitier',
    caps: 11,
    goals: 2,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'disponible',
    dimensions: {
      entrainement: { score: 90, dureeTotale: '40h10', seances: 26, distance: 289.4 },
      sante: { score: 94, disponibilite: 98, joursSansGene: 35, statut: 'Disponible' },
      performance: { score: 87, noteMoyenne: 7.5, butsSaison: 3, passesD: 5, xG: 2.2 },
      physique: { score: 90, vitesseMax: 33.4, puissanceMax: 6.9, temps10m: 1.62 },
      recuperation: { score: 89, sommeil: '8h40', hrv: 82, readiness: 91 },
      nutrition: { score: 92, hydratation: 95, equilibre: 'Optimal', poids: 72 }
    },
    scoreGlobal: 89,
    scoreEvolution: 5,
    history: [
      { week: 'S-4', charge: 84, physique: 88, sante: 92, recuperation: 86, performance: 85, nutrition: 90 },
      { week: 'S-3', charge: 86, physique: 89, sante: 93, recuperation: 87, performance: 86, nutrition: 91 },
      { week: 'S-2', charge: 88, physique: 90, sante: 94, recuperation: 88, performance: 87, nutrition: 91 },
      { week: 'S-1', charge: 89, physique: 90, sante: 94, recuperation: 88, performance: 87, nutrition: 92 },
      { week: 'Actuel', charge: 90, physique: 90, sante: 94, recuperation: 89, performance: 87, nutrition: 92 }
    ],
    timeline: [],
    sources: [],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [], outfieldZone: [{ x: 50, y: 50, r: 30, intensity: 0.85 }] },
    recentMatchesIds: ['match-1'],
    recentTrainingsIds: ['train-1']
  },
  {
    id: 'saliba',
    name: 'William Saliba',
    firstName: 'William',
    lastName: 'Saliba',
    number: 17,
    position: 'Défenseur',
    club: 'Arsenal',
    age: 24,
    height: '1,92 m',
    weight: '85 kg',
    preferredFoot: 'Droitier',
    caps: 26,
    goals: 0,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'disponible',
    dimensions: {
      entrainement: { score: 92, dureeTotale: '42h30', seances: 27, distance: 295.0 },
      sante: { score: 97, disponibilite: 100, joursSansGene: 60, statut: 'Disponible à 100%' },
      performance: { score: 93, noteMoyenne: 7.9, butsSaison: 1, passesD: 1, xG: 0.5 },
      physique: { score: 91, vitesseMax: 34.5, puissanceMax: 6.9, temps10m: 1.63 },
      recuperation: { score: 91, sommeil: '8h15', hrv: 81, readiness: 92 },
      nutrition: { score: 93, hydratation: 94, equilibre: 'Optimal', poids: 85 }
    },
    scoreGlobal: 93,
    scoreEvolution: 4,
    history: [
      { week: 'S-4', charge: 88, physique: 89, sante: 96, recuperation: 89, performance: 90, nutrition: 91 },
      { week: 'S-3', charge: 90, physique: 90, sante: 96, recuperation: 90, performance: 91, nutrition: 92 },
      { week: 'S-2', charge: 91, physique: 91, sante: 97, recuperation: 90, performance: 92, nutrition: 92 },
      { week: 'S-1', charge: 92, physique: 91, sante: 97, recuperation: 91, performance: 93, nutrition: 93 },
      { week: 'Actuel', charge: 92, physique: 91, sante: 97, recuperation: 91, performance: 93, nutrition: 93 }
    ],
    timeline: [],
    sources: [],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [], outfieldZone: [{ x: 45, y: 72, r: 35, intensity: 0.9 }] },
    recentMatchesIds: ['match-1', 'match-2'],
    recentTrainingsIds: ['train-1']
  },
  {
    id: 'kounde',
    name: 'Jules Koundé',
    firstName: 'Jules',
    lastName: 'Koundé',
    number: 5,
    position: 'Défenseur',
    club: 'FC Barcelone',
    age: 26,
    height: '1,80 m',
    weight: '75 kg',
    preferredFoot: 'Droitier',
    caps: 36,
    goals: 0,
    avatarUrl: '/assets/player_avatar_kounde.jpg',
    status: 'disponible',
    dimensions: {
      entrainement: { score: 89, dureeTotale: '39h00', seances: 25, distance: 275.0 },
      sante: { score: 95, disponibilite: 98, joursSansGene: 40, statut: 'Disponible' },
      performance: { score: 90, noteMoyenne: 7.7, butsSaison: 1, passesD: 3, xG: 0.6 },
      physique: { score: 88, vitesseMax: 33.8, puissanceMax: 6.7, temps10m: 1.64 },
      recuperation: { score: 87, sommeil: '7h50', hrv: 76, readiness: 88 },
      nutrition: { score: 90, hydratation: 93, equilibre: 'Optimal', poids: 75 }
    },
    scoreGlobal: 90,
    scoreEvolution: 2,
    history: [],
    timeline: [],
    sources: [],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [], outfieldZone: [{ x: 78, y: 65, r: 30, intensity: 0.85 }] },
    recentMatchesIds: ['match-1'],
    recentTrainingsIds: ['train-1']
  },
  {
    id: 'konate',
    name: 'Ibrahima Konaté',
    firstName: 'Ibrahima',
    lastName: 'Konaté',
    number: 4,
    position: 'Défenseur',
    club: 'Liverpool',
    age: 26,
    height: '1,94 m',
    weight: '95 kg',
    preferredFoot: 'Droitier',
    caps: 21,
    goals: 1,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'disponible',
    dimensions: {
      entrainement: { score: 88, dureeTotale: '38h30', seances: 24, distance: 260.0 },
      sante: { score: 93, disponibilite: 95, joursSansGene: 25, statut: 'Disponible' },
      performance: { score: 88, noteMoyenne: 7.6, butsSaison: 1, passesD: 0, xG: 0.4 },
      physique: { score: 90, vitesseMax: 34.8, puissanceMax: 7.0, temps10m: 1.62 },
      recuperation: { score: 85, sommeil: '8h00', hrv: 77, readiness: 87 },
      nutrition: { score: 91, hydratation: 94, equilibre: 'Optimal', poids: 95 }
    },
    scoreGlobal: 88,
    scoreEvolution: 3,
    history: [],
    timeline: [],
    sources: [],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [], outfieldZone: [{ x: 55, y: 72, r: 32, intensity: 0.88 }] },
    recentMatchesIds: ['match-1'],
    recentTrainingsIds: ['train-1']
  },
  {
    id: 'hernandez_t',
    name: 'Théo Hernandez',
    firstName: 'Théo',
    lastName: 'Hernandez',
    number: 22,
    position: 'Défenseur',
    club: 'AC Milan',
    age: 27,
    height: '1,84 m',
    weight: '81 kg',
    preferredFoot: 'Gaucher',
    caps: 35,
    goals: 2,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'disponible',
    dimensions: {
      entrainement: { score: 90, dureeTotale: '41h00', seances: 26, distance: 290.0 },
      sante: { score: 94, disponibilite: 96, joursSansGene: 30, statut: 'Disponible' },
      performance: { score: 89, noteMoyenne: 7.6, butsSaison: 2, passesD: 4, xG: 1.4 },
      physique: { score: 93, vitesseMax: 35.2, puissanceMax: 7.1, temps10m: 1.60 },
      recuperation: { score: 86, sommeil: '7h45', hrv: 75, readiness: 86 },
      nutrition: { score: 89, hydratation: 91, equilibre: 'Optimal', poids: 81 }
    },
    scoreGlobal: 89,
    scoreEvolution: 1,
    history: [],
    timeline: [],
    sources: [],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [], outfieldZone: [{ x: 22, y: 60, r: 35, intensity: 0.9 }] },
    recentMatchesIds: ['match-1'],
    recentTrainingsIds: ['train-1']
  },
  {
    id: 'rabiot',
    name: 'Adrien Rabiot',
    firstName: 'Adrien',
    lastName: 'Rabiot',
    number: 14,
    position: 'Milieu',
    club: 'Olympique de Marseille',
    age: 30,
    height: '1,88 m',
    weight: '80 kg',
    preferredFoot: 'Gaucher',
    caps: 48,
    goals: 4,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'disponible',
    dimensions: {
      entrainement: { score: 87, dureeTotale: '37h40', seances: 24, distance: 268.0 },
      sante: { score: 92, disponibilite: 94, joursSansGene: 28, statut: 'Disponible' },
      performance: { score: 86, noteMoyenne: 7.4, butsSaison: 2, passesD: 3, xG: 1.2 },
      physique: { score: 84, vitesseMax: 32.2, puissanceMax: 6.4, temps10m: 1.68 },
      recuperation: { score: 85, sommeil: '8h00', hrv: 74, readiness: 85 },
      nutrition: { score: 89, hydratation: 92, equilibre: 'Optimal', poids: 80 }
    },
    scoreGlobal: 86,
    scoreEvolution: 2,
    history: [],
    timeline: [],
    sources: [],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [], outfieldZone: [{ x: 38, y: 52, r: 30, intensity: 0.82 }] },
    recentMatchesIds: ['match-1'],
    recentTrainingsIds: ['train-1']
  },
  {
    id: 'griezmann',
    name: 'Antoine Griezmann',
    firstName: 'Antoine',
    lastName: 'Griezmann',
    number: 7,
    position: 'Attaquant',
    club: 'Atlético de Madrid',
    age: 34,
    height: '1,76 m',
    weight: '73 kg',
    preferredFoot: 'Gaucher',
    caps: 137,
    goals: 44,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'disponible',
    dimensions: {
      entrainement: { score: 88, dureeTotale: '40h00', seances: 26, distance: 285.0 },
      sante: { score: 93, disponibilite: 96, joursSansGene: 32, statut: 'Disponible' },
      performance: { score: 91, noteMoyenne: 8.0, butsSaison: 7, passesD: 11, xG: 5.6 },
      physique: { score: 82, vitesseMax: 31.8, puissanceMax: 6.3, temps10m: 1.70 },
      recuperation: { score: 89, sommeil: '8h15', hrv: 80, readiness: 90 },
      nutrition: { score: 94, hydratation: 96, equilibre: 'Optimal', poids: 73 }
    },
    scoreGlobal: 89,
    scoreEvolution: 3,
    history: [],
    timeline: [],
    sources: [],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [], outfieldZone: [{ x: 50, y: 35, r: 35, intensity: 0.9 }] },
    recentMatchesIds: ['match-1'],
    recentTrainingsIds: ['train-1']
  },
  {
    id: 'barcola',
    name: 'Bradley Barcola',
    firstName: 'Bradley',
    lastName: 'Barcola',
    number: 20,
    position: 'Attaquant',
    club: 'Paris Saint-Germain',
    age: 23,
    height: '1,86 m',
    weight: '74 kg',
    preferredFoot: 'Droitier',
    caps: 12,
    goals: 3,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'disponible',
    dimensions: {
      entrainement: { score: 91, dureeTotale: '43h00', seances: 28, distance: 305.0 },
      sante: { score: 95, disponibilite: 98, joursSansGene: 40, statut: 'Disponible' },
      performance: { score: 89, noteMoyenne: 7.8, butsSaison: 9, passesD: 6, xG: 6.8 },
      physique: { score: 94, vitesseMax: 35.8, puissanceMax: 7.4, temps10m: 1.57 },
      recuperation: { score: 88, sommeil: '8h20', hrv: 80, readiness: 89 },
      nutrition: { score: 91, hydratation: 94, equilibre: 'Optimal', poids: 74 }
    },
    scoreGlobal: 90,
    scoreEvolution: 5,
    history: [],
    timeline: [],
    sources: [],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [], outfieldZone: [{ x: 22, y: 30, r: 35, intensity: 0.92 }] },
    recentMatchesIds: ['match-1'],
    recentTrainingsIds: ['train-1']
  },
  {
    id: 'maignan',
    name: 'Mike Maignan',
    firstName: 'Mike',
    lastName: 'Maignan',
    number: 16,
    position: 'Gardien',
    club: 'AC Milan',
    age: 30,
    height: '1,91 m',
    weight: '89 kg',
    preferredFoot: 'Droitier',
    caps: 28,
    goals: 0,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'indisponible',
    alert: {
      id: 'alt-maignan',
      type: 'medical',
      label: 'Blessure musculaire mollet',
      value: 'Indisponible',
      trend: 'J+12 soins',
      severity: 'danger',
      actionNeeded: 'Protocole de soins à Milan. Évaluation retour prévue fin mars.'
    },
    dimensions: {
      entrainement: { score: 40, dureeTotale: '12h00', seances: 8, distance: 45.0 },
      sante: { score: 35, disponibilite: 0, joursSansGene: 0, statut: 'Indisponible (lésion soléaire droite)', sensibleMedical: 'Déchirure soléaire stade 2 mollet droit le 12/03. Phase de cicatrisation en cours, marche sans boiterie. Kiné quotidienne.' },
      performance: { score: 88, noteMoyenne: 7.7 },
      physique: { score: 65, vitesseMax: 24.0, puissanceMax: 4.8, temps10m: 1.95 },
      recuperation: { score: 82, sommeil: '8h15', hrv: 75, readiness: 80 },
      nutrition: { score: 88, hydratation: 90, equilibre: 'Bon', poids: 89 }
    },
    scoreGlobal: 68,
    scoreEvolution: -14,
    history: [],
    timeline: [],
    sources: [],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [{ x: 50, y: 88, r: 25, intensity: 0.7 }], outfieldZone: [] },
    recentMatchesIds: ['match-2'],
    recentTrainingsIds: []
  },
  {
    id: 'camavinga',
    name: 'Eduardo Camavinga',
    firstName: 'Eduardo',
    lastName: 'Camavinga',
    number: 12,
    position: 'Milieu',
    club: 'Real Madrid',
    age: 23,
    height: '1,82 m',
    weight: '77 kg',
    preferredFoot: 'Gaucher',
    caps: 24,
    goals: 1,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: 'indisponible',
    alert: {
      id: 'alt-camavinga',
      type: 'medical',
      label: 'Entorse genou gauche',
      value: 'Indisponible',
      trend: 'J+18',
      severity: 'danger',
      actionNeeded: 'Suivi par le Dr. Le Gall et le staff du Real Madrid.'
    },
    dimensions: {
      entrainement: { score: 50, dureeTotale: '15h00', seances: 10, distance: 75.0 },
      sante: { score: 42, disponibilite: 0, joursSansGene: 0, statut: 'Indisponible (entorse LLI)', sensibleMedical: 'Entorse bénigne du ligament latéral interne genou gauche. Rééducation en phase 2 (vélo, renforcement chaîne post).' },
      performance: { score: 87, noteMoyenne: 7.5 },
      physique: { score: 70, vitesseMax: 27.5, puissanceMax: 5.5, temps10m: 1.80 },
      recuperation: { score: 84, sommeil: '8h30', hrv: 78, readiness: 82 },
      nutrition: { score: 92, hydratation: 94, equilibre: 'Optimal', poids: 77 }
    },
    scoreGlobal: 72,
    scoreEvolution: -10,
    history: [],
    timeline: [],
    sources: [],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [], outfieldZone: [{ x: 45, y: 50, r: 25, intensity: 0.6 }] },
    recentMatchesIds: [],
    recentTrainingsIds: []
  }
];

// Complete 24 players roster for the Donut & Squad (18 Disponibles, 3 À surveiller, 2 Indisponibles, 1 Retour progressif)
const ADDITIONAL_PLAYERS_METADATA = [
  { id: 'upamecano', name: 'Dayot Upamecano', first: 'Dayot', last: 'Upamecano', num: 2, pos: 'Défenseur', club: 'Bayern Munich', age: 26, status: 'disponible' as const },
  { id: 'fofana_y', name: 'Youssouf Fofana', first: 'Youssouf', last: 'Fofana', num: 19, pos: 'Milieu', club: 'AC Milan', age: 26, status: 'disponible' as const },
  { id: 'thuram_k', name: 'Khéphren Thuram', first: 'Khéphren', last: 'Thuram', num: 13, pos: 'Milieu', club: 'Juventus', age: 24, status: 'disponible' as const },
  { id: 'nkunku', name: 'Christopher Nkunku', first: 'Christopher', last: 'Nkunku', num: 18, pos: 'Attaquant', club: 'Chelsea', age: 27, status: 'disponible' as const },
  { id: 'kolo_muani', name: 'Randal Kolo Muani', first: 'Randal', last: 'Kolo Muani', num: 15, pos: 'Attaquant', club: 'Paris Saint-Germain', age: 26, status: 'disponible' as const },
  { id: 'samba', name: 'Brice Samba', first: 'Brice', last: 'Samba', num: 1, pos: 'Gardien', club: 'RC Lens', age: 31, status: 'disponible' as const },
  { id: 'clauss', name: 'Jonathan Clauss', first: 'Jonathan', last: 'Clauss', num: 21, pos: 'Défenseur', club: 'OGC Nice', age: 32, status: 'disponible' as const },
  { id: 'pavard', name: 'Benjamin Pavard', first: 'Benjamin', last: 'Pavard', num: 3, pos: 'Défenseur', club: 'Inter Milan', age: 29, status: 'disponible' as const },
  { id: 'olise', name: 'Michael Olise', first: 'Michael', last: 'Olise', num: 9, pos: 'Attaquant', club: 'Bayern Munich', age: 23, status: 'disponible' as const },
  { id: 'coman', name: 'Kingsley Coman', first: 'Kingsley', last: 'Coman', num: 24, pos: 'Attaquant', club: 'Bayern Munich', age: 29, status: 'a_surveiller' as const, alert: { id: 'alt-coman', type: 'recup' as const, label: 'Gêne tendon rotulien', value: '72/100', severity: 'warning' as const, actionNeeded: 'Éviter les frappes lourdes en fin de séance.' } },
];

export const FULL_PLAYERS_LIST: Player[] = [
  ...INITIAL_PLAYERS,
  ...ADDITIONAL_PLAYERS_METADATA.map((m) => ({
    id: m.id,
    name: m.name,
    firstName: m.first,
    lastName: m.last,
    number: m.num,
    position: m.pos as Player['position'],
    club: m.club,
    age: m.age,
    height: '1,84 m',
    weight: '78 kg',
    preferredFoot: 'Droitier' as const,
    caps: 15,
    goals: 2,
    avatarUrl: '/assets/player_avatar_mbappe.jpg',
    status: m.status,
    alert: m.alert,
    dimensions: {
      entrainement: { score: 86, dureeTotale: '36h00', seances: 23, distance: 250.0 },
      sante: { score: 92, disponibilite: 95, joursSansGene: 20, statut: m.status === 'disponible' ? 'Disponible' : 'À surveiller' },
      performance: { score: 85, noteMoyenne: 7.4, butsSaison: 3, passesD: 2, xG: 2.1 },
      physique: { score: 86, vitesseMax: 33.5, puissanceMax: 6.6, temps10m: 1.65 },
      recuperation: { score: 84, sommeil: '7h55', hrv: 75, readiness: 86 },
      nutrition: { score: 89, hydratation: 92, equilibre: 'Bon', poids: 78 }
    },
    scoreGlobal: 87,
    scoreEvolution: 2,
    history: [],
    timeline: [],
    sources: [
      { id: `src-${m.id}`, name: `${m.club} Data`, iconType: 'club' as const, provider: 'Club API', lastSync: 'Hier • 18:24', status: 'synced' as const, tag: 'Club' }
    ],
    clubExchanges: [],
    heatmap: { goalkeeperZone: [], outfieldZone: [{ x: 50, y: 50, r: 30, intensity: 0.8 }] },
    recentMatchesIds: ['match-1'],
    recentTrainingsIds: ['train-1']
  }))
];

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'match-1',
    homeTeam: 'France',
    awayTeam: 'Pays-Bas',
    homeScore: 3,
    awayScore: 1,
    competition: 'UEFA Nations League',
    phase: 'Groupes',
    date: '12 octobre 2025',
    stadium: 'Stade de France, Saint-Denis',
    result: 'V',
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
      { playerId: 'chevalier', role: 'titulaire', positionName: 'Gardien', pitchX: 50, pitchY: 90, minutes: 90, rating: 7.8, distanceKm: 4.8, sprints: 6, passes: 34, passesAccuracy: 87, duelsWon: 1, saves: 4 },
      { playerId: 'kounde', role: 'titulaire', positionName: 'Latéral Droit', pitchX: 82, pitchY: 70, minutes: 90, rating: 7.6, distanceKm: 10.9, sprints: 18, passes: 68, passesAccuracy: 91, duelsWon: 7 },
      { playerId: 'saliba', role: 'titulaire', positionName: 'Défenseur Central Droit', pitchX: 62, pitchY: 74, minutes: 90, rating: 7.9, distanceKm: 10.4, sprints: 11, passes: 84, passesAccuracy: 94, duelsWon: 8 },
      { playerId: 'konate', role: 'titulaire', positionName: 'Défenseur Central Gauche', pitchX: 38, pitchY: 74, minutes: 90, rating: 7.7, distanceKm: 10.2, sprints: 9, passes: 79, passesAccuracy: 92, duelsWon: 6 },
      { playerId: 'hernandez_t', role: 'titulaire', positionName: 'Latéral Gauche', pitchX: 18, pitchY: 70, minutes: 78, rating: 7.5, distanceKm: 9.8, sprints: 22, passes: 52, passesAccuracy: 85, duelsWon: 5 },
      { playerId: 'tchouameni', role: 'titulaire', positionName: 'Milieu Défensif', pitchX: 50, pitchY: 54, minutes: 90, rating: 7.7, distanceKm: 12.4, sprints: 14, passes: 88, passesAccuracy: 93, duelsWon: 7 },
      { playerId: 'rabiot', role: 'titulaire', positionName: 'Milieu Relayeur', pitchX: 34, pitchY: 46, minutes: 82, rating: 7.4, distanceKm: 11.2, sprints: 12, passes: 64, passesAccuracy: 88, duelsWon: 6 },
      { playerId: 'griezmann', role: 'titulaire', positionName: 'Milieu Offensif', pitchX: 66, pitchY: 46, minutes: 75, rating: 8.0, distanceKm: 10.1, sprints: 10, passes: 58, passesAccuracy: 89, duelsWon: 4, assists: 1 },
      { playerId: 'dembele', role: 'titulaire', positionName: 'Ailier Droit', pitchX: 82, pitchY: 28, minutes: 62, rating: 7.5, distanceKm: 7.5, sprints: 21, passes: 36, passesAccuracy: 83, duelsWon: 5, assists: 1 },
      { playerId: 'mbappe', role: 'titulaire', positionName: 'Avant-Centre', pitchX: 50, pitchY: 20, minutes: 90, rating: 8.9, distanceKm: 10.8, sprints: 26, passes: 42, passesAccuracy: 86, duelsWon: 7, goals: 2 },
      { playerId: 'barcola', role: 'titulaire', positionName: 'Ailier Gauche', pitchX: 18, pitchY: 28, minutes: 70, rating: 7.8, distanceKm: 8.9, sprints: 24, passes: 32, passesAccuracy: 81, duelsWon: 4, goals: 1 }
    ],
    substitutes: [
      { playerId: 'thuram_k', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 8, rating: 6.5, distanceKm: 1.4, sprints: 3, passes: 9, passesAccuracy: 88, duelsWon: 1 },
      { playerId: 'nkunku', role: 'remplacant', positionName: 'Attaquant', pitchX: 0, pitchY: 0, minutes: 28, rating: 7.0, distanceKm: 3.5, sprints: 8, passes: 14, passesAccuracy: 85, duelsWon: 2 },
      { playerId: 'zaire_emery', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 15, rating: 6.8, distanceKm: 2.1, sprints: 4, passes: 12, passesAccuracy: 91, duelsWon: 2 },
      { playerId: 'fofana_y', role: 'remplacant', positionName: 'Milieu', pitchX: 0, pitchY: 0, minutes: 12, rating: 6.7, distanceKm: 1.8, sprints: 3, passes: 10, passesAccuracy: 90, duelsWon: 2 },
      { playerId: 'clauss', role: 'remplacant', positionName: 'Défenseur', pitchX: 0, pitchY: 0, minutes: 12, rating: 6.6, distanceKm: 1.6, sprints: 4, passes: 8, passesAccuracy: 87, duelsWon: 1 },
      { playerId: 'upamecano', role: 'remplacant', positionName: 'Défenseur', pitchX: 0, pitchY: 0, minutes: 0, rating: 0, distanceKm: 0, sprints: 0, passes: 0, passesAccuracy: 0, duelsWon: 0 },
      { playerId: 'samba', role: 'remplacant', positionName: 'Gardien', pitchX: 0, pitchY: 0, minutes: 0, rating: 0, distanceKm: 0, sprints: 0, passes: 0, passesAccuracy: 0, duelsWon: 0 }
    ],
    events: [
      { minute: 18, type: 'goal', playerId: 'mbappe', text: 'But de Kylian Mbappé (Passe décisive O. Dembélé)', team: 'home' },
      { minute: 34, type: 'goal', playerId: 'barcola', text: 'But de Bradley Barcola (Passe décisive A. Griezmann)', team: 'home' },
      { minute: 58, type: 'yellow', playerId: 'tchouameni', text: 'Carton jaune pour Aurélien Tchouaméni (Faute tactique)', team: 'home' },
      { minute: 62, type: 'sub', playerId: 'dembele', text: 'Remplacement : Sortie de Dembélé, entrée de Nkunku', team: 'home' },
      { minute: 64, type: 'goal', playerId: 'mbappe', text: 'Deuxième but de Kylian Mbappé sur contre-attaque', team: 'home' },
      { minute: 73, type: 'goal', playerId: '', text: 'But de Cody Gakpo (Pays-Bas)', team: 'away' },
      { minute: 78, type: 'sub', playerId: 'hernandez_t', text: 'Remplacement : Sortie de Théo Hernandez, entrée de Clauss', team: 'home' }
    ]
  },
  {
    id: 'match-2',
    homeTeam: 'France',
    awayTeam: 'Espagne',
    homeScore: 1,
    awayScore: 1,
    competition: 'UEFA Nations League',
    phase: 'Groupes',
    date: '08 septembre 2025',
    stadium: 'Parc Olympique Lyonnais',
    result: 'N',
    statsFrance: { possession: 48, tirs: 12, tirsCadres: 5, xG: 1.3, passes: 480, precisionPasses: 85, duelsRemportes: 51, recuperations: 44, distanceKm: 119.1, sprints: 118 },
    statsOpponent: { possession: 52, tirs: 14, tirsCadres: 4, xG: 1.2, passes: 530, precisionPasses: 88, duelsRemportes: 49, recuperations: 42, distanceKm: 118.0, sprints: 104 },
    starters: [],
    substitutes: [],
    events: []
  },
  {
    id: 'match-3',
    homeTeam: 'France',
    awayTeam: 'Belgique',
    homeScore: 2,
    awayScore: 0,
    competition: 'UEFA Nations League',
    phase: 'Groupes',
    date: '09 juin 2025',
    stadium: 'Stade Pierre-Mauroy, Lille',
    result: 'V',
    statsFrance: { possession: 56, tirs: 16, tirsCadres: 7, xG: 2.1, passes: 540, precisionPasses: 87, duelsRemportes: 55, recuperations: 46, distanceKm: 117.5, sprints: 120 },
    statsOpponent: { possession: 44, tirs: 8, tirsCadres: 2, xG: 0.6, passes: 410, precisionPasses: 81, duelsRemportes: 45, recuperations: 38, distanceKm: 113.8, sprints: 92 },
    starters: [],
    substitutes: [],
    events: []
  },
  {
    id: 'match-4',
    homeTeam: 'France',
    awayTeam: 'Allemagne',
    homeScore: 1,
    awayScore: 2,
    competition: 'Match Amical International',
    phase: 'Préparation',
    date: '23 mars 2025',
    stadium: 'Groupama Stadium, Lyon',
    result: 'D',
    statsFrance: { possession: 49, tirs: 11, tirsCadres: 4, xG: 1.1, passes: 495, precisionPasses: 84, duelsRemportes: 48, recuperations: 40, distanceKm: 116.2, sprints: 110 },
    statsOpponent: { possession: 51, tirs: 13, tirsCadres: 6, xG: 1.7, passes: 515, precisionPasses: 86, duelsRemportes: 52, recuperations: 43, distanceKm: 118.4, sprints: 115 },
    starters: [],
    substitutes: [],
    events: []
  },
  {
    id: 'match-5',
    homeTeam: 'France',
    awayTeam: 'Italie',
    homeScore: 4,
    awayScore: 0,
    competition: 'UEFA Nations League',
    phase: 'Groupes',
    date: '17 novembre 2024',
    stadium: 'San Siro, Milan',
    result: 'V',
    statsFrance: { possession: 60, tirs: 19, tirsCadres: 10, xG: 3.2, passes: 620, precisionPasses: 90, duelsRemportes: 58, recuperations: 52, distanceKm: 120.0, sprints: 132 },
    statsOpponent: { possession: 40, tirs: 6, tirsCadres: 1, xG: 0.4, passes: 360, precisionPasses: 79, duelsRemportes: 42, recuperations: 34, distanceKm: 112.5, sprints: 88 },
    starters: [],
    substitutes: [],
    events: []
  }
];

export const INITIAL_TRAININGS: TrainingSession[] = [
  {
    id: 'train-1',
    title: 'Entraînement — Séance collective',
    date: '10 octobre 2025',
    location: 'Clairefontaine • Terrain Michel Platini',
    type: 'Séance tactique & charge métabolique',
    durationMinutes: 90,
    loadUA: 487,
    loadDiffPercent: 12,
    charge: 100,
    intensite: 110,
    volume: 105,
    distanceKm: 9.8,
    sprints: 72,
    exercises: [
      { name: 'Échauffement & activation proprioceptive', duration: 20, intensity: 'Faible' },
      { name: 'Conservation & possession sous pressing', duration: 25, intensity: 'Moyenne' },
      { name: 'Jeu réduit haute intensité (5v5 + appuis)', duration: 30, intensity: 'Élevée' },
      { name: 'Mise en place tactique blocs médians', duration: 25, intensity: 'Moyenne' },
      { name: 'Retour au calme & étirements guidés', duration: 10, intensity: 'Faible' }
    ],
    perceivedEffort: {
      averageScore: 92,
      verbal: 'Bonne',
      breakdown: {
        tresBonne: 14,
        bonne: 8,
        moyenne: 2,
        difficile: 0
      }
    },
    participants: [
      { playerId: 'chevalier', rpe: 6, distanceKm: 4.2, maxSpeed: 28.1, hrAvg: 138, status: 'Complet', feedback: 'Bonne' },
      { playerId: 'mbappe', rpe: 8, distanceKm: 10.4, maxSpeed: 34.8, hrAvg: 164, status: 'Complet', feedback: 'Très bonne' },
      { playerId: 'tchouameni', rpe: 9, distanceKm: 11.2, maxSpeed: 31.2, hrAvg: 168, status: 'Complet', feedback: 'Bonne' },
      { playerId: 'dembele', rpe: 5, distanceKm: 6.8, maxSpeed: 29.5, hrAvg: 142, status: 'Adapté', feedback: 'Bonne' },
      { playerId: 'saliba', rpe: 7, distanceKm: 9.5, maxSpeed: 32.1, hrAvg: 155, status: 'Complet', feedback: 'Très bonne' },
      { playerId: 'kounde', rpe: 7, distanceKm: 9.9, maxSpeed: 31.8, hrAvg: 158, status: 'Complet', feedback: 'Très bonne' },
      { playerId: 'konate', rpe: 7, distanceKm: 9.2, maxSpeed: 32.0, hrAvg: 154, status: 'Complet', feedback: 'Très bonne' },
      { playerId: 'hernandez_t', rpe: 8, distanceKm: 10.1, maxSpeed: 33.6, hrAvg: 162, status: 'Complet', feedback: 'Bonne' },
      { playerId: 'rabiot', rpe: 7, distanceKm: 10.3, maxSpeed: 30.5, hrAvg: 157, status: 'Complet', feedback: 'Bonne' },
      { playerId: 'griezmann', rpe: 7, distanceKm: 9.8, maxSpeed: 30.2, hrAvg: 156, status: 'Complet', feedback: 'Très bonne' },
      { playerId: 'barcola', rpe: 8, distanceKm: 10.2, maxSpeed: 34.1, hrAvg: 165, status: 'Complet', feedback: 'Très bonne' },
      { playerId: 'zaire_emery', rpe: 7, distanceKm: 10.0, maxSpeed: 31.9, hrAvg: 159, status: 'Complet', feedback: 'Très bonne' }
    ]
  },
  {
    id: 'train-2',
    title: 'Activation veille de match',
    date: '11 octobre 2025',
    location: 'Stade de France • Pelouse d’honneur',
    type: 'Vitesse de réaction et coups de pied arrêtés',
    durationMinutes: 60,
    loadUA: 280,
    loadDiffPercent: -15,
    charge: 75,
    intensite: 80,
    volume: 70,
    distanceKm: 5.2,
    sprints: 32,
    exercises: [
      { name: 'Toros dynamiques & vivacité', duration: 15, intensity: 'Faible' },
      { name: 'Coups de pied arrêtés offensifs/défensifs', duration: 30, intensity: 'Moyenne' },
      { name: 'Finitions et tirs au but', duration: 15, intensity: 'Moyenne' }
    ],
    perceivedEffort: {
      averageScore: 96,
      verbal: 'Très bonne',
      breakdown: { tresBonne: 20, bonne: 4, moyenne: 0, difficile: 0 }
    },
    participants: []
  }
];

export const INITIAL_RASSEMBLEMENT: Rassemblement = {
  id: 'rass-mars-2026',
  name: 'Rassemblement Mars 2026 — UEFA Nations League & Qualifications',
  selection: 'France A — Hommes',
  dates: '12 — 24 mars 2026',
  daysToStart: 2,
  squadCount: 24,
  uncertainCount: 3,
  convoquesIds: FULL_PLAYERS_LIST.map((p) => p.id),
  stages: [
    {
      key: 'pre',
      title: 'Pré-rassemblement',
      timing: 'J-7 → J-1',
      dates: '05 — 11 mars 2026',
      description: 'Collecte des données clubs, tri médical préalable, questionnaires de charge et pré-alertes.',
      status: 'active',
      checklist: [
        { id: 'c1', label: 'Réception automatique des données GPS clubs (Catapult/StatsSports)', done: true, category: 'Performance' },
        { id: 'c2', label: 'Bilan médical pré-convocation & échanges avec les médecins de club', done: true, category: 'Médical' },
        { id: 'c3', label: 'Identification des 3 joueurs à statut d’alerte (Chevalier, Tchouaméni, Dembélé)', done: true, category: 'Staff A' },
        { id: 'c4', label: 'Validation finale des 24 passeports athlétiques et logistique arrivée', done: false, category: 'Team Manager' }
      ],
      syncedData: [
        'Dernière charge 7 jours clubs',
        'Scores de sommeil et HRV Oura/Whoop',
        'Avis cliniques clubs et restrictions de minutes'
      ]
    },
    {
      key: 'rassemblement',
      title: 'Rassemblement',
      timing: 'J1 → J+12',
      dates: '12 — 24 mars 2026',
      description: 'Arrivée à Clairefontaine, séances collectives, suivi RPE quotidien, 2 matchs internationaux officiels.',
      status: 'upcoming',
      checklist: [
        { id: 'r1', label: 'Check-in médical d’accueil et pesée / hydratation', done: false, category: 'Médical' },
        { id: 'r2', label: 'Séance 1 individualisée pour les joueurs en alerte charge', done: false, category: 'Performance' },
        { id: 'r3', label: 'Match 1 : France vs Danemark (Stade de France)', done: false, category: 'Compétition' },
        { id: 'r4', label: 'Match 2 : Autriche vs France (Vienne)', done: false, category: 'Compétition' }
      ],
      syncedData: [
        'Capteurs GPS FFF temps réel',
        'RPE et questionnaires de bien-être post-séance',
        'Rapports vidéo wyscout et découpages tactiques'
      ]
    },
    {
      key: 'post',
      title: 'Post-rassemblement',
      timing: 'J+1 → J+7',
      dates: '25 — 31 mars 2026',
      description: 'Débriefings athlétiques, bilans individuels, transmission sécurisée des fiches aux clubs d’origine.',
      status: 'upcoming',
      checklist: [
        { id: 'p1', label: 'Génération du rapport bilan athlétique AMS 360', done: false, category: 'Performance' },
        { id: 'p2', label: 'Envoi sécurisé aux staffs médicaux de PSG, Real Madrid, Arsenal, etc.', done: false, category: 'Médical / Club' },
        { id: 'p3', label: 'Mise à jour des profils longitudinaux DTN', done: false, category: 'Fédération' }
      ],
      syncedData: [
        'Export FFF standardisé pour le club',
        'Recommandations de récupération J+48h'
      ]
    },
    {
      key: 'suivi',
      title: 'Suivi longitudinal',
      timing: 'J+7 → prochain rassemblement',
      dates: 'Avril — Juin 2026',
      description: 'Monitoring continu en club, suivi des blessures, alertes en temps réel sur la forme des internationaux.',
      status: 'upcoming',
      checklist: [
        { id: 's1', label: 'Suivi des temps de jeu en Ligue des Champions et championnats', done: false, category: 'Observateurs' },
        { id: 's2', label: 'Surveillance des retours de blessure (Maignan, Camavinga)', done: false, category: 'Médical' }
      ],
      syncedData: [
        'Flux continu API clubs',
        'Alertes automatiques seuil de fatigue'
      ]
    }
  ]
};
