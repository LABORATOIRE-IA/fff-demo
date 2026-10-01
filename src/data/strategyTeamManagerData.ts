import { UPCOMING_MATCH } from './upcomingMatch';

export interface AutomatedTodoItem {
  id: string;
  title: string;
  category: 'Transports' | 'Hébergement' | 'Équipements' | 'UEFA & Conformité' | 'Médias & Protocole';
  phase: 'J-7 à J-3' | 'J-2 à J-1' | 'Jour J (J-0)' | 'Post-Match (J+1)';
  assignedTo: string;
  deadline: string;
  priority: 'Haute' | 'Moyenne' | 'Critique';
  status: 'A_FAIRE' | 'EN_COURS' | 'VALIDE';
  details: string;
  automatedTrigger: string;
}

export interface TeamManagerOperationalOverview {
  eventTitle: string;
  competition: string;
  dates: string;
  location: string;
  travelMode: string;
  squadSummary: {
    playersCount: number;
    staffCount: number;
    delegationTotal: number;
    passportsValidPercent: number;
    accreditationsValidated: number;
    roomAllocationReady: boolean;
  };
  staffDepartments: {
    department: string;
    leadName: string;
    membersCount: number;
    readinessStatus: string;
  }[];
  criticalCheckpoints: {
    timing: string;
    checkpointTitle: string;
    responsiblePerson: string;
    status: 'Validé' | 'En attente' | 'Urgent';
    notes: string;
  }[];
  vipAndTicketing: {
    totalAllocatedSeats: number;
    familySeatsAssigned: number;
    vipPresidentialLounge: number;
    sponsorSeats: number;
  };
}

export const TEAM_MANAGER_TODO_DATA: {
  eventInfo: {
    eventName: string;
    eventType: 'Match Domicile (Stade de France)' | 'Match Extérieur (Déplacement)' | 'Tournoi Majeur';
    date: string;
    stakes: string;
    teamManager: string;
  };
  todoList: AutomatedTodoItem[];
  operationalOverview: TeamManagerOperationalOverview;
} = {
  eventInfo: {
    eventName: `Rassemblement & Choc ${UPCOMING_MATCH.title}`,
    eventType: 'Match Domicile (Stade de France)',
    date: UPCOMING_MATCH.dateTime,
    stakes: 'UEFA Nations League • J4 (Enjeu : Qualification Final Four)',
    teamManager: 'Guillaume Bureau (Team Manager Équipe de France A)'
  },
  todoList: [
    {
      id: 'todo-1',
      title: 'Validation des plans de vol et navettes d’arrivée des 24 joueurs',
      category: 'Transports',
      phase: 'J-7 à J-3',
      assignedTo: 'Erwan Le Prévost (Logistique)',
      deadline: 'Lundi 28/09 • 12h00',
      priority: 'Critique',
      status: 'VALIDE',
      details: 'Navettes gares Roissy-CDG, Orly et Massy TGV synchronisées avec les heures d’atterrissage des joueurs arrivant de Madrid, Londres et Munich.',
      automatedTrigger: 'Généré automatiquement dès la publication de la liste des 24 par Zinédine Zidane'
    },
    {
      id: 'todo-2',
      title: 'Attribution des 42 chambres individuelles et privatisation de l’aile Ouest',
      category: 'Hébergement',
      phase: 'J-7 à J-3',
      assignedTo: 'Intendance Château',
      deadline: 'Mardi 29/09 • 10h00',
      priority: 'Haute',
      status: 'VALIDE',
      details: 'Chambres préparées avec matelas sur-mesure, literie anti-acariens, obscurité totale et climatisation réglée à 19°C selon les directives du sommeil FFF.',
      automatedTrigger: 'Génération du plan de chambrage selon les préférences des cadres et nouveaux sélectionnés'
    },
    {
      id: 'todo-3',
      title: 'Flocage officiel des 3 jeux de maillots Nike avec patchs UEFA Nations League',
      category: 'Équipements',
      phase: 'J-2 à J-1',
      assignedTo: 'Alexandre Germain & Équipe Matériel',
      deadline: 'Samedi 03/10 • 18h00',
      priority: 'Haute',
      status: 'EN_COURS',
      details: '72 maillots joueurs (Bleu x24, Blanc x24, Gardiens x24) + brassards capitaine Mbappe avec flocages thermo-collés conformes au règlement UEFA.',
      automatedTrigger: 'Validation des numéros officiels 1 à 24'
    },
    {
      id: 'todo-4',
      title: 'Transmission de la feuille de match officielle UEFA (23 joueurs + 1 réserviste)',
      category: 'UEFA & Conformité',
      phase: 'Jour J (J-0)',
      assignedTo: 'Guillaume Bureau',
      deadline: 'Lundi 05/10 • 19h30 (H-75 min)',
      priority: 'Critique',
      status: 'A_FAIRE',
      details: 'Validation finale de la composition avec Zinédine Zidane, signature numérique et envoi sur le portail UEFA Match Delegate.',
      automatedTrigger: 'Déclencheur automatique à H-90 min du coup d’envoi'
    },
    {
      id: 'todo-5',
      title: 'Escorte motorisée gendarmerie et itinéraire sécurisé vers le Stade de France',
      category: 'Transports',
      phase: 'Jour J (J-0)',
      assignedTo: 'Commandant Sécurité FFF',
      deadline: 'Lundi 05/10 • 18h45',
      priority: 'Critique',
      status: 'VALIDE',
      details: 'Départ du bus officiel à 18h45 de l’hôtel parisien. Couloir de circulation réservé pour une arrivée garantie à 19h15 au vestiaire.',
      automatedTrigger: 'Protocole préfectoral et sécurité déléguée FFF'
    },
    {
      id: 'todo-6',
      title: 'Coordination de la conférence de presse d’avant-match & zone mixte',
      category: 'Médias & Protocole',
      phase: 'J-2 à J-1',
      assignedTo: 'Responsable Presse FFF',
      deadline: 'Dimanche 04/10 • 17h15',
      priority: 'Moyenne',
      status: 'EN_COURS',
      details: 'Créneau Zinédine Zidane (17h15) + Kylian Mbappé (17h45) à l’auditorium du Stade de France. Gestion des 65 journalistes accrédités.',
      automatedTrigger: 'Planning diffuseurs TF1 / UEFA Media'
    },
    {
      id: 'todo-7',
      title: 'Distribution des 84 invitations famille & salon présidentiel VIP',
      category: 'Médias & Protocole',
      phase: 'J-2 à J-1',
      assignedTo: 'Protocole Présidence FFF',
      deadline: 'Dimanche 04/10 • 20h00',
      priority: 'Moyenne',
      status: 'EN_COURS',
      details: 'Envoi des e-billets nominatifs sécurisés aux proches des joueurs et badges d’accès au salon d’honneur.',
      automatedTrigger: 'Demandes des joueurs centralisées sur l’application AMS'
    },
    {
      id: 'todo-8',
      title: 'Règlement des indemnités de déplacement et restitution des équipements',
      category: 'UEFA & Conformité',
      phase: 'Post-Match (J+1)',
      assignedTo: 'Service Financier FFF',
      deadline: 'Mardi 06/10 • 14h00',
      priority: 'Moyenne',
      status: 'A_FAIRE',
      details: 'Clôture comptable du stage, gestion des primes et renvoi des paquetages de surplus au magasin central FFF.',
      automatedTrigger: 'Fin officielle du rassemblement tricolore'
    }
  ],
  operationalOverview: {
    eventTitle: `${UPCOMING_MATCH.title} • UEFA Nations League`,
    competition: 'Stade de France • 80 000 spectateurs (Guichets fermés)',
    dates: 'Du 28 Septembre au 06 Octobre 2026',
    location: 'Centre National du Football (Clairefontaine) & Stade de France (Saint-Denis)',
    travelMode: 'Bus Officiel Grand Confort FFF + Escorte Motorisée',
    squadSummary: {
      playersCount: 24,
      staffCount: 18,
      delegationTotal: 42,
      passportsValidPercent: 100,
      accreditationsValidated: 42,
      roomAllocationReady: true
    },
    staffDepartments: [
      {
        department: 'Staff Technique & Analyse',
        leadName: 'Zinédine Zidane & David Bettoni',
        membersCount: 5,
        readinessStatus: '100% Opérationnel'
      },
      {
        department: 'Pôle Médical & Rééducation',
        leadName: 'Dr. Franck Le Gall & 4 Kinés',
        membersCount: 6,
        readinessStatus: '100% Opérationnel'
      },
      {
        department: 'Préparation Physique & GPS',
        leadName: 'Alexandre Germain',
        membersCount: 3,
        readinessStatus: '100% Opérationnel'
      },
      {
        department: 'Logistique, Intendance & Médias',
        leadName: 'Guillaume Bureau & Équipe FFF',
        membersCount: 4,
        readinessStatus: '100% Opérationnel'
      }
    ],
    criticalCheckpoints: [
      {
        timing: 'J-2 • 16h00',
        checkpointTitle: 'Contrôle technique des équipements vestiaire',
        responsiblePerson: 'Intendant en Chef',
        status: 'Validé',
        notes: 'Système sono, tableaux tactiques magnétiques et fontaines à eau vérifiés.'
      },
      {
        timing: 'J-1 • 11h00',
        checkpointTitle: 'Point sécurité préfectorale & UEFA Match Director',
        responsiblePerson: 'Guillaume Bureau',
        status: 'Validé',
        notes: 'Feu vert délivré pour l’itinéraire et le dispositif d’escorte.'
      },
      {
        timing: 'J-0 • 19h15',
        checkpointTitle: 'Arrivée officielle de la délégation au Stade',
        responsiblePerson: 'Team Manager & Sécurité',
        status: 'En attente',
        notes: 'Timing sous contrôle strict (objectif vestiaire à H-90 min).'
      },
      {
        timing: 'J-0 • 19h30',
        checkpointTitle: 'Dépôt officiel feuille de match UEFA',
        responsiblePerson: 'Guillaume Bureau',
        status: 'Urgent',
        notes: 'Signature numérique après accord final Zidane.'
      }
    ],
    vipAndTicketing: {
      totalAllocatedSeats: 84,
      familySeatsAssigned: 48,
      vipPresidentialLounge: 20,
      sponsorSeats: 16
    }
  }
};
