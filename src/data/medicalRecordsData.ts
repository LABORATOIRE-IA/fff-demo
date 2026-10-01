import { MedicalRecord } from '../types/ams';

export const COMPREHENSIVE_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'med-ref-bastien',
    playerId: 'ref-bastien',
    playerName: 'Benoît Bastien',
    playerNumber: 4,
    playerPosition: 'Arbitre Central',
    playerClub: 'Ligue du Grand Est • FFF',
    date: '2026-09-26',
    time: '11:15',
    practitionerName: 'Dr. Franck Le Gall',
    practitionerRole: 'Médecin Fédéral Chef',
    specialty: 'medecin',
    location: 'Centre Médical Clairefontaine • Pôle Arbitrage FFF',
    title: 'Bilan échographique & protocole mollet droit (Soléaire)',
    motif: 'Contracture musculaire ressentie en fin de 2e mi-temps lors du match UEFA',
    category: 'imagerie',
    urgency: 'a_surveiller',
    aptitudeStatus: 'Apte aménagé',
    examDetails: {
      typeExamen: 'Échographie musculaire haute résolution des loges postérieures de jambe',
      modalite: 'Examen comparatif avec Doppler énergie',
      resultatsChiffres: [
        { label: 'Diamètre zone d’hyper-échogénicité', value: '8.4 mm', norm: '0 mm', isAlert: true },
        { label: 'Continuité aponévrotique', value: 'Intacte (100%)', norm: '100%', isAlert: false },
        { label: 'Épanchement péritendineux', value: 'Absence', norm: 'Absence', isAlert: false }
      ],
      constatationsCliniques: [
        'Absence de désinsertion ou d’hématome collecté.',
        'Hypertonie réflexe du soléaire droit sans encoche à la palpation.',
        'Marche normale indolore, test unipodal sur pointe de pied modérément sensible à 20 répétitions.'
      ],
      imagesDisponibles: true,
      imagerieType: 'Échographie 18 MHz'
    },
    soinsTraitements: {
      actes: [
        'Séances de physiothérapie et massages décontracturants profonds avec Cyril Praud',
        'Travail proprioceptif et renforcement excentrique doux sur plateau incliné',
        'Séance d’aquajogging et vélo d’appartement à fréquence cardiaque contrôlée'
      ],
      prescriptions: [
        'Chaussettes de contention de récupération classe 2',
        'Magnésium marin 300 mg / jour pendant 10 jours'
      ],
      materielUtilise: ['Échographe GE Logiq', 'Cryo-compression Game Ready']
    },
    conclusions: {
      synthese: 'Contracture musculaire bénigne sans déchirure fibreuse. Récupération favorable sous 5 jours.',
      consignesEntraineur: 'Dispense de test physique SDS pour ce rassemblement. Autorisation de réathlétisation sur tapis de course à partir du 01/10.',
      limitationCharge: 'Pas de sprint au-delà de 22 km/h pendant 48 heures.',
      dateProchainControle: '2026-09-30 à 10:00 (Check-up final Dr. Le Gall)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-ref-frappart',
    playerId: 'ref-frappart',
    playerName: 'Stéphanie Frappart',
    playerNumber: 2,
    playerPosition: 'Arbitre Central',
    playerClub: 'Ligue de Paris Île-de-France • FFF',
    date: '2026-09-18',
    time: '14:00',
    practitionerName: 'Dr. Franck Le Gall',
    practitionerRole: 'Médecin Fédéral Chef',
    specialty: 'medecin',
    location: 'Centre Médical Clairefontaine • Plateau Cardiologique',
    title: 'Bilan cardiologique annuel FIFA & Épreuve d’effort maximale',
    motif: 'Visite médicale réglementaire obligatoire FIFA Elite 2026/2027',
    category: 'checkup',
    urgency: 'normal',
    aptitudeStatus: 'Apte 100%',
    examDetails: {
      typeExamen: 'Électrocardiogramme de repos 12 dérivations & Épreuve d’effort triangulaire sur cyclo-ergomètre',
      modalite: 'Protocole continu avec mesure des échanges gazeux (VO2 Max)',
      resultatsChiffres: [
        { label: 'VO2 Max estimée', value: '56.4 ml/kg/min', norm: '> 50 ml/kg/min', isAlert: false },
        { label: 'FC Maximale atteinte', value: '184 bpm', norm: '180-190 bpm', isAlert: false },
        { label: 'Pression artérielle maximale', value: '175/85 mmHg', norm: '< 210/100 mmHg', isAlert: false },
        { label: 'Récupération FC à 1 min', value: '-38 bpm', norm: '> 25 bpm', isAlert: false }
      ],
      constatationsCliniques: [
        'ECG de repos conforme aux critères de Seattle pour athlètes d’endurance.',
        'Absence d’anomalie de la repolarisation à l’effort maximal.',
        'Excellente tolérance cardiovasculaire et cinétique de récupération rapide.'
      ],
      imagesDisponibles: true,
      imagerieType: 'Tracés ECG 12 pistes & Courbes VO2'
    },
    soinsTraitements: {
      actes: [
        'Validation du certificat d’aptitude médicale internationale FIFA Elite',
        'Transmission du rapport médical confidentiel à la Commission Médicale de l’UEFA'
      ],
      prescriptions: [
        'Maintien de l’hydratation électrolytique personnalisée'
      ],
      materielUtilise: ['Ergomètre Schiller CS-200 Excellence']
    },
    conclusions: {
      synthese: 'Condition cardiologique exemplaire. Aptitude complète délivrée pour toutes compétitions nationales et internationales.',
      consignesEntraineur: 'Aucune restriction athlétique. Apte pour toutes les désignations Ligue 1, UEFA Champions League et Coupes du Monde.',
      dateProchainControle: '2027-09-15 (Renouvellement annuel)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-01',
    playerId: 'dembele',
    playerName: 'Ousmane Dembélé',
    playerNumber: 11,
    playerPosition: 'Attaquant',
    playerClub: 'Paris Saint-Germain',
    date: '2026-09-25',
    time: '18:30',
    practitionerName: 'Dr. Franck Le Gall',
    practitionerRole: 'Médecin Fédéral Chef',
    specialty: 'medecin',
    location: 'Centre Médical Clairefontaine • Salle d’Imagerie',
    title: 'Échographie de contrôle ischio-jambiers gauche',
    motif: 'Gêne modérée ressentie lors de la séance accélérations J-3',
    category: 'imagerie',
    urgency: 'a_surveiller',
    aptitudeStatus: 'Apte aménagé',
    examDetails: {
      typeExamen: 'Échographie musculo-tendineuse haute fréquence (18 MHz)',
      modalite: 'Examen comparatif en dynamique et Doppler couleur',
      resultatsChiffres: [
        { label: 'Épaisseur myotendineuse', value: '7.8 mm', norm: '7.5 - 8.2 mm', isAlert: false },
        { label: 'Zone d’infiltration œdémateuse', value: '12 mm²', norm: '0 mm²', isAlert: true },
        { label: 'Doppler hypervascularisation', value: 'Faible grade 1', norm: 'Grade 0', isAlert: false }
      ],
      constatationsCliniques: [
        'Absence de rupture de fibres ou de désinsertion myoaponévrotique sur le biceps fémoral.',
        'Discret remaniement cicatriciel d’allure ancienne sans hématome résiduel.',
        'Palpation douloureuse localisée au tiers moyen du chef long, sans encoche ni défect.',
        'Test d’étirement passif indolore à 80°, tension ressentie en fin de flexion de hanche.'
      ],
      imagesDisponibles: true,
      imagerieType: 'Échographie Doppler HD'
    },
    soinsTraitements: {
      actes: [
        'Application de glace compressive Game Ready (programme 2 - 20 min)',
        'Mise en décharge partielle et prescription de soins kinésithérapiques ciblés',
        'Consignes de sommeil et surélévation nocturne'
      ],
      prescriptions: [
        'Paracétamol 1g si algie post-effort (éviter les AINS à ce stade)',
        'Arnica montana 9CH en soutien local'
      ],
      materielUtilise: ['Échographe GE Logiq S8', 'Game Ready Cryo-compression']
    },
    conclusions: {
      synthese: 'Pas de récidive lésionnelle aiguë. Simple alerte de surutilisation myo-tendineuse liée au cumul des matchs.',
      consignesEntraineur: 'Feu vert pour participation à la séance collective avec restriction sur les frappes lourdes et les sprints maximaux (> 30 km/h). Temps de jeu recommandé au prochain match : 60 minutes maximum.',
      limitationCharge: 'Plafonner à 85% de la Vmax sur les ateliers de transition rapide.',
      dateProchainControle: '2026-09-27 à 09:00 (Check-up pré-séance)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-02',
    playerId: 'dembele',
    playerName: 'Ousmane Dembélé',
    playerNumber: 11,
    playerPosition: 'Attaquant',
    playerClub: 'Paris Saint-Germain',
    date: '2026-09-26',
    time: '10:15',
    practitionerName: 'Jean-Yves Vandewalle',
    practitionerRole: 'Kinésithérapeute Coordinateur FFF',
    specialty: 'kine',
    location: 'Clairefontaine • Salle de Balnéothérapie & Kiné',
    title: 'Mobilisation neuro-dynamique & drainage ischio-jambiers',
    motif: 'Suivi post-échographie et préparation tissulaire avant séance',
    category: 'soins',
    urgency: 'a_surveiller',
    aptitudeStatus: 'Apte aménagé',
    examDetails: {
      typeExamen: 'Bilan articulaire et palpation musculaire',
      modalite: 'Tests neuro-méningés et tonus myotendineux',
      resultatsChiffres: [
        { label: 'Gain de flexibilité SLR', value: '+8°', norm: '85° total', isAlert: false },
        { label: 'Échelle de douleur EVA', value: '2/10', norm: '0/10', isAlert: false }
      ],
      constatationsCliniques: [
        'Diminution notable de la contracture de défense par rapport à la veille.',
        'Slump test négatif bilatéral.',
        'Bonne tolérance à la mobilisation manuelle transversale profonde.'
      ]
    },
    soinsTraitements: {
      actes: [
        'Thérapie par ondes radiofréquence Tecar Winback (mode résistif athermique 15 min)',
        'Mobilisation douce de la chaîne postérieure et étirements activo-dynamiques guidés',
        'Bain froid à 10°C (3 x 2 min en contraste avec bain chaud 38°C)'
      ],
      materielUtilise: ['Winback Tecar 3SE', 'Bassin de cryothérapie']
    },
    conclusions: {
      synthese: 'Tissu musculaire souple et réactif. Le joueur se sent confiant pour le galop d’entraînement.',
      consignesEntraineur: 'Échauffement individualisé obligatoire de 15 minutes avec le kiné avant de rejoindre le groupe.',
      dateProchainControle: '2026-09-26 à 18:30 (Soins post-entraînement)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-03',
    playerId: 'chevalier',
    playerName: 'Lucas Chevalier',
    playerNumber: 23,
    playerPosition: 'Gardien',
    playerClub: 'Lille OSC',
    date: '2026-09-25',
    time: '14:00',
    practitionerName: 'Dr. Franck Le Gall',
    practitionerRole: 'Médecin Fédéral Chef',
    specialty: 'medecin',
    location: 'Clairefontaine • Cabinet Médical',
    title: 'Examen de surveillance de la fatigue neuromusculaire',
    motif: 'Baisse de récupération signalée sur les capteurs Oura / WHOOP (-17 pts)',
    category: 'checkup',
    urgency: 'a_surveiller',
    aptitudeStatus: 'Apte aménagé',
    examDetails: {
      typeExamen: 'Check-up clinique postural et test de réactivité neuromusculaire',
      modalite: 'Palpation tendineuse rotulienne et bilan de sommeil',
      resultatsChiffres: [
        { label: 'Score Récupération AMS', value: '58/100', norm: '> 75/100', isAlert: true },
        { label: 'Variabilité Cardiaque HRV', value: '48 ms', norm: '65 - 80 ms', isAlert: true },
        { label: 'Sommeil profond nocturne', value: '1h05', norm: '> 1h45', isAlert: true }
      ],
      constatationsCliniques: [
        'Absence de lésion ostéo-articulaire ou tendineuse patente.',
        'Sensibilité minime du pôle inférieur de la rotule droite en cisaillement.',
        'Accumulation de fatigue nerveuse liée à l’enchaînement Ligue 1 / Coupe d’Europe et au premier rassemblement A.'
      ]
    },
    soinsTraitements: {
      actes: [
        'Protocole de sieste flash guidée (30 min en chambre noire thermo-régulée)',
        'Massage relaxant du rachis cervical et dorsale haute par le kiné',
        'Séance de pressothérapie sur membres inférieurs'
      ],
      prescriptions: [
        'Mélatonine 1.9mg sublinguale 30 min avant le coucher',
        'Infusion de passiflore et magnésium marin'
      ]
    },
    conclusions: {
      synthese: 'Surmenage neuromusculaire sans atteinte mécanique. Surveillance étroite requise.',
      consignesEntraineur: 'Adapter la séance spécifique gardiens : limiter le nombre de plongeons répétés sur surface dure et les frappes puissantes à bout portant.',
      limitationCharge: 'Diminuer de 30% le volume des impulsions verticales.',
      dateProchainControle: '2026-09-27 à 08:30 (Relevé HRV matinal)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-04',
    playerId: 'tchouameni',
    playerName: 'Aurélien Tchouaméni',
    playerNumber: 8,
    playerPosition: 'Milieu',
    playerClub: 'Real Madrid',
    date: '2026-09-25',
    time: '19:15',
    practitionerName: 'Dr. Laurent Schmitt',
    practitionerRole: 'Physiologiste & Nutritionniste FFF',
    specialty: 'nutritionniste',
    location: 'Clairefontaine • Laboratoire de Physiologie',
    title: 'Bilan biologique d’hydratation & marqueurs enzymatiques de charge',
    motif: 'Pic de charge aiguë détecté après 90 min en Liga à haute intensité',
    category: 'biologie',
    urgency: 'a_surveiller',
    aptitudeStatus: 'Apte 100%',
    examDetails: {
      typeExamen: 'Bilan sanguin capillaire instantané & réfractométrie urinaire',
      modalite: 'Analyse biochimique sur automate I-Stat et refractomètre digital',
      resultatsChiffres: [
        { label: 'Créatine Kinase (CK)', value: '385 U/L', norm: '< 300 U/L', isAlert: true },
        { label: 'Densité urinaire (USG)', value: '1.024', norm: '< 1.020', isAlert: true },
        { label: 'Hématocrite', value: '44.8%', norm: '40 - 48%', isAlert: false },
        { label: 'Lactatémie de repos', value: '1.1 mmol/L', norm: '< 1.5 mmol/L', isAlert: false }
      ],
      constatationsCliniques: [
        'Légère déshydratation intra-cellulaire post-voyage Madrid-Paris.',
        'Élévation modérée des CK compatible avec les 12.4 km parcourus le week-end dernier.',
        'Aucune myoglobinurie ni altération de la fonction rénale.'
      ]
    },
    soinsTraitements: {
      actes: [
        'Apport hydrique personnalisé : 1.5 L de solution hypotonique riche en sodium (500 mg/L) et potassium',
        'Consommation d’un shake recovery : 30g whey isolat native + 60g maltodextrine + 5g glutamine'
      ],
      nutritionConseils: [
        'Collation tart cherry riche en anthocyanines pour accélérer la clairance des CK',
        'Repas du soir hyper-alcalinisant (légumes verts vapeur, quinoa, saumon sauvage)'
      ]
    },
    conclusions: {
      synthese: 'Réponse physiologique classique à une haute charge. Normalisation rapide attendue sous 24h avec le protocole nutritionnel.',
      consignesEntraineur: 'Joueur apte à s’entraîner normalement. Prévoir des pauses boisson obligatoires toutes les 15 minutes.',
      dateProchainControle: '2026-09-26 à 14:00 (Nouveau test USG)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-05',
    playerId: 'mbappe',
    playerName: 'Kylian Mbappé',
    playerNumber: 10,
    playerPosition: 'Attaquant',
    playerClub: 'Real Madrid',
    date: '2026-09-25',
    time: '16:30',
    practitionerName: 'Dr. Franck Le Gall',
    practitionerRole: 'Médecin Fédéral Chef',
    specialty: 'medecin',
    location: 'Clairefontaine • Cabinet Médical',
    title: 'Visite systématique d’arrivée & bilan rachis-bassin',
    motif: 'Contrôle médical réglementaire d’ouverture de rassemblement',
    category: 'checkup',
    urgency: 'normal',
    aptitudeStatus: 'Apte 100%',
    examDetails: {
      typeExamen: 'Examen ostéo-articulaire complet, auscultation cardio-respiratoire et bilan postural',
      modalite: 'Tests de mobilité passive et active',
      resultatsChiffres: [
        { label: 'Tension artérielle', value: '118/72 mmHg', norm: '120/80 mmHg', isAlert: false },
        { label: 'Fréquence cardiaque repos', value: '44 bpm', norm: '40 - 55 bpm', isAlert: false },
        { label: 'Indice de symétrie de hanche', value: '98%', norm: '> 90%', isAlert: false }
      ],
      constatationsCliniques: [
        'Auscultation cardio-pulmonaire strictement normale. Pas de souffle ni d’anomalie rythmique.',
        'Rachis lombaire souple, distance doigts-sol 0 cm sans douleur.',
        'Genoux secs sans épanchement, tiroirs et ménisques négatifs.',
        'Cheville droite opérée dans le passé stable, mobilités complètes.'
      ]
    },
    soinsTraitements: {
      actes: [
        'Validation de l’aptitude médicale sans aucune restriction',
        'Séance de cryothérapie corps entier préventive en fin de journée (-110°C, 3 min)'
      ]
    },
    conclusions: {
      synthese: 'Condition physique optimale. Indicateurs biométriques au vert.',
      consignesEntraineur: 'Pleine disponibilité pour l’ensemble des séances tactiques et des matchs.',
      dateProchainControle: '2026-09-29 (Visite de veille de match)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-06',
    playerId: 'griezmann',
    playerName: 'Antoine Griezmann',
    playerNumber: 7,
    playerPosition: 'Milieu',
    playerClub: 'Atlético de Madrid',
    date: '2026-09-25',
    time: '21:00',
    practitionerName: 'David Bihoreau',
    practitionerRole: 'Ostéopathe D.O. FFF',
    specialty: 'osteopathe',
    location: 'Clairefontaine • Espace Ostéopathie & Récupération',
    title: 'Bilan ostéopathique & rééquilibrage pelvien',
    motif: 'Sensation de raideur fessière droite consécutive au dernier match de Liga',
    category: 'musculaire',
    urgency: 'normal',
    aptitudeStatus: 'Apte 100%',
    examDetails: {
      typeExamen: 'Bilan postural global et palpation des chaînes myofasciales',
      modalite: 'Tests de mobilité sacro-iliaque et charnière dorso-lombaire',
      resultatsChiffres: [
        { label: 'Bascule de bassin', value: 'Corrigée (0 mm)', norm: '< 4 mm', isAlert: false },
        { label: 'Mobilité hanche rotation interne', value: '38° bilatéral', norm: '> 35°', isAlert: false }
      ],
      constatationsCliniques: [
        'Dysfonctionnement sacro-iliaque droit en torsion antérieure réversible.',
        'Légère tension réflexe du muscle piriforme droit sans compression sciatique.',
        'Charnière T12-L1 légèrement fixée en rotation droite.'
      ]
    },
    soinsTraitements: {
      actes: [
        'Techniques fonctionnelles myofasciales douces sur les psoas et piriformes',
        'Mobilisation articulaire douce sacro-iliaque et décompression lombaire',
        'Normalisation du diaphragme et rééquilibrage crânio-sacré'
      ]
    },
    conclusions: {
      synthese: 'Bassin parfaitement réaligné. Gain immédiat d’amplitude et disparition de la raideur.',
      consignesEntraineur: 'Aucune restriction athlétique. Joueur apte à 100%.',
      dateProchainControle: '2026-09-28 (Contrôle systématique à J-1)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-07',
    playerId: 'kolo_muani',
    playerName: 'Randal Kolo Muani',
    playerNumber: 12,
    playerPosition: 'Attaquant',
    playerClub: 'Paris Saint-Germain',
    date: '2026-09-26',
    time: '09:00',
    practitionerName: 'Stéphane Récamier',
    practitionerRole: 'Podologue du Sport DE FFF',
    specialty: 'podologue',
    location: 'Clairefontaine • Salle de Podologie & Biomécanique',
    title: 'Analyse podométrique des appuis & thermoformage semelles',
    motif: 'Ajustement des semelles orthopédiques de match suite à changement de crampons',
    category: 'checkup',
    urgency: 'normal',
    aptitudeStatus: 'Apte 100%',
    examDetails: {
      typeExamen: 'Baropodométrie statique et dynamique sur plateforme de force Footscan',
      modalite: 'Captation à 500 Hz pieds nus et chaussé',
      resultatsChiffres: [
        { label: 'Répartition des pressions', value: '49% G / 51% D', norm: '50% / 50%', isAlert: false },
        { label: 'Pression pic 1er métatarsien', value: '280 kPa', norm: '< 320 kPa', isAlert: false },
        { label: 'Angle de Fick (marche)', value: '11°', norm: '10 - 14°', isAlert: false }
      ],
      constatationsCliniques: [
        'Pieds grecs avec arche longitudinale médiale tonique et stable.',
        'Légère hyper-pronation dynamique au moment de la propulsion sur pied droit.',
        'Absence d’ampoule, de cor ou de frottement pathologique cutané.'
      ]
    },
    soinsTraitements: {
      actes: [
        'Thermoformage direct d’une paire d’orthèses plantaires carbone en résine EVA haute densité',
        'Intégration d’un coin pronateur postérieur de 2mm pour stabiliser l’arrière-pied',
        'Vérification du chaussage dans les modèles de crampons SG et FG'
      ],
      materielUtilise: ['Plateforme Footscan 2D', 'Four de thermoformage Sidas']
    },
    conclusions: {
      synthese: 'Excellente adaptation podologique. Répartition des charges optimisée pour les sprints.',
      consignesEntraineur: 'Aucune restriction. Les nouvelles semelles sont validées pour l’entraînement du jour.',
      dateProchainControle: '2026-09-28 (Débriefing confort post-séance)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-08',
    playerId: 'camavinga',
    playerName: 'Eduardo Camavinga',
    playerNumber: 6,
    playerPosition: 'Milieu',
    playerClub: 'Real Madrid',
    date: '2026-09-26',
    time: '11:00',
    practitionerName: 'Grégory Dupont',
    practitionerRole: 'Responsable Réathlétisation & Prévention FFF',
    specialty: 'reathletisation',
    location: 'Clairefontaine • Terrain Annexe & Salle de Force',
    title: 'Test isocinétique Cybex & évaluation de symétrie quad/ischios',
    motif: 'Suivi du genou gauche suite à entorse du LLI consolidée il y a 2 mois',
    category: 'musculaire',
    urgency: 'normal',
    aptitudeStatus: 'Apte 100%',
    examDetails: {
      typeExamen: 'Évaluation isocinétique informatisée dynamométrique à vitesse angulaire 60°/s et 240°/s',
      modalite: 'Mesure du pic de couple concentrique et excentrique',
      resultatsChiffres: [
        { label: 'Déficit quadriceps G vs D', value: '2.8%', norm: '< 10%', isAlert: false },
        { label: 'Déficit ischio-jambiers G vs D', value: '4.1%', norm: '< 10%', isAlert: false },
        { label: 'Ratio mixte H/Q (excentrique/concentrique)', value: '0.98', norm: '> 0.85', isAlert: false },
        { label: 'Test de saut Hop-test LSI', value: '97%', norm: '> 90%', isAlert: false }
      ],
      constatationsCliniques: [
        'Excellente récupération fonctionnelle. Aucune appréhension sur les changements de direction.',
        'Genou gauche sec, indolore, tests de stabilité ligamentaire en varus/valgus parfaits.',
        'Symétrie de force validée selon les standards FIFA Medical.'
      ]
    },
    soinsTraitements: {
      actes: [
        'Circuit de renforcement excentrique nordique sur banc Glute-Ham Developer',
        'Séquence de pliométrie basse avec freinage à 90° sur gazon',
        'Gainage dynamique et gainage rotatif avec medecine ball'
      ],
      materielUtilise: ['Dynamomètre isocinétique Humac NORM', 'Plateforme de saut Optojump']
    },
    conclusions: {
      synthese: 'Feu vert médical et athlétique complet. Tous les critères Return to Play sont validés au-delà des normes.',
      consignesEntraineur: 'Aucune limitation. Joueur disponible pour 90 minutes à haute intensité.',
      dateProchainControle: '2026-10-02 (Contrôle mensuel de routine)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-09',
    playerId: 'upamecano',
    playerName: 'Dayot Upamecano',
    playerNumber: 4,
    playerPosition: 'Défenseur',
    playerClub: 'Bayern Munich',
    date: '2026-09-25',
    time: '20:30',
    practitionerName: 'Christophe Geoffroy',
    practitionerRole: 'Kinésithérapeute FFF',
    specialty: 'kine',
    location: 'Clairefontaine • Salle de Kiné 2',
    title: 'Dry Needling & libération myofasciale adducteurs',
    motif: 'Tension résiduelle du long adducteur droit après match intense',
    category: 'soins',
    urgency: 'normal',
    aptitudeStatus: 'Soins quotidiens',
    examDetails: {
      typeExamen: 'Évaluation palpatoire des triggers points musculaires',
      modalite: 'Palpation transversale et test d’écrasement de ballon à 0°, 45° et 90°',
      resultatsChiffres: [
        { label: 'Squeeze test à 45°', value: '180 mmHg (Indolore)', norm: '> 160 mmHg', isAlert: false },
        { label: 'EVA à la palpation insertion pubienne', value: '1/10', norm: '0/10', isAlert: false }
      ],
      constatationsCliniques: [
        'Cordon myalgique punctiforme dans le corps charnu du long adducteur droit.',
        'Symphyse pubienne indolore à la palpation et en compression.',
        'Souplesse de hanche conservée, abduction symétrique à 42°.'
      ]
    },
    soinsTraitements: {
      actes: [
        'Dry needling écho-guidé sur le trigger point du long adducteur avec réponse contractile locale',
        'Massage transversal défibrosant et crochetage aponévrotique doux',
        'Application de cataplasme d’argile verte chaude post-soin'
      ],
      materielUtilise: ['Aiguilles stériles Seirin', 'Crochets myo-aponévrotiques']
    },
    conclusions: {
      synthese: 'Relâchement immédiat de la contracture. Tissu souple et mobile.',
      consignesEntraineur: 'Joueur totalement opérationnel. Maintenir le protocole de prévention adducteurs avant chaque séance.',
      dateProchainControle: '2026-09-27 à 19:00 (Séance d’entretien)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-10',
    playerId: 'maignan',
    playerName: 'Mike Maignan',
    playerNumber: 16,
    playerPosition: 'Gardien',
    playerClub: 'AC Milan',
    date: '2026-09-26',
    time: '08:45',
    practitionerName: 'Dr. Franck Le Gall',
    practitionerRole: 'Médecin Fédéral Chef',
    specialty: 'medecin',
    location: 'Clairefontaine • Cabinet Médical',
    title: 'Contrôle échographique préventif mollet & tendon d’Achille',
    motif: 'Surveillance historique du complexe suro-achilléen gauche',
    category: 'imagerie',
    urgency: 'normal',
    aptitudeStatus: 'Apte 100%',
    examDetails: {
      typeExamen: 'Échographie doppler couleur 15 MHz et élastographie ShearWave',
      modalite: 'Coupes axiales et longitudinales comparatives',
      resultatsChiffres: [
        { label: 'Épaisseur tendon Achille', value: '5.2 mm', norm: '4.8 - 5.5 mm', isAlert: false },
        { label: 'Module d’élasticité ShearWave', value: '92 kPa', norm: '80 - 110 kPa', isAlert: false },
        { label: 'Vascularisation intratendineuse', value: 'Nulle (Grade 0)', norm: 'Grade 0', isAlert: false }
      ],
      constatationsCliniques: [
        'Structure fibrillaire du tendon d’Achille gauche parfaitement homogène et continue.',
        'Jonction myo-tendineuse du soléaire saine, absence de fibrose ou de micro-déchirure.',
        'Bourses pré et rétro-achilléennes libres d’épanchement.'
      ]
    },
    soinsTraitements: {
      actes: [
        'Poursuite du protocole d’échauffement excentrique Stanish doux',
        'Étirements passifs soléaire et gastrocnémiens sur plan incliné'
      ]
    },
    conclusions: {
      synthese: 'Excellente intégrité tendineuse et musculaire. Aucun signal de fragilité.',
      consignesEntraineur: 'Disponibilité à 100% pour la préparation spécifique et le match.',
      dateProchainControle: '2026-10-01 (Routine rassemblement)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-11',
    playerId: 'saliba',
    playerName: 'William Saliba',
    playerNumber: 17,
    playerPosition: 'Défenseur',
    playerClub: 'Arsenal FC',
    date: '2026-09-25',
    time: '17:45',
    practitionerName: 'Dr. Laurent Schmitt',
    practitionerRole: 'Physiologiste & Nutritionniste FFF',
    specialty: 'nutritionniste',
    location: 'Clairefontaine • Espace Nutrition & Performance',
    title: 'Mesure de masse grasse par absorptiométrie DXA & plan micronutrition',
    motif: 'Calibrage énergétique pré-compétition et optimisation du sommeil',
    category: 'nutrition',
    urgency: 'normal',
    aptitudeStatus: 'Apte 100%',
    examDetails: {
      typeExamen: 'Scan corporel total bi-énergétique DXA',
      modalite: 'Scan corps entier de haute précision',
      resultatsChiffres: [
        { label: 'Masse grasse relative', value: '9.4%', norm: '8.5 - 10.5%', isAlert: false },
        { label: 'Masse maigre segmentaire', value: '78.2 kg', norm: '> 75 kg', isAlert: false },
        { label: 'Densité minérale osseuse Z-score', value: '+1.6', norm: '> 0.0', isAlert: false }
      ],
      constatationsCliniques: [
        'Profil morphologique exceptionnel, ratio masse musculaire/squelette optimal.',
        'Stabilité pondérale remarquable par rapport au rassemblement de juin dernier (+0.2 kg de muscle pur).'
      ]
    },
    soinsTraitements: {
      actes: [
        'Prescription d’un protocole vitamino-minéral personnalisé (Vitamine D3 2000 UI + Zinc + Oméga 3)',
        'Calibrage du plan d’hydratation jour de match (750 ml boisson isotonique 6% glucides)'
      ]
    },
    conclusions: {
      synthese: 'Statut nutritionnel et composition corporelle d’élite.',
      consignesEntraineur: 'Capacité de répétition des efforts de haute intensité maximale.',
      dateProchainControle: '2026-10-15 (Suivi de mi-saison)',
      validationMedecinChef: true
    }
  },
  {
    id: 'med-12',
    playerId: 'barcola',
    playerName: 'Bradley Barcola',
    playerNumber: 20,
    playerPosition: 'Attaquant',
    playerClub: 'Paris Saint-Germain',
    date: '2026-09-26',
    time: '12:30',
    practitionerName: 'Dr. Franck Le Gall',
    practitionerRole: 'Médecin Fédéral Chef',
    specialty: 'medecin',
    location: 'Clairefontaine • Cabinet Médical',
    title: 'Examen de prévention des syndromes de surmenage périosté',
    motif: 'Sensibilité au tiers distal des deux tibias après séances sur pelouse hybride',
    category: 'checkup',
    urgency: 'a_surveiller',
    aptitudeStatus: 'Apte 100%',
    examDetails: {
      typeExamen: 'Palpation diaphysaire tibiale et bilan podologique d’impact',
      modalite: 'Test au diapason 128 Hz et percussion douce',
      resultatsChiffres: [
        { label: 'Test au diapason osseux', value: 'Négatif bilatéral', norm: 'Négatif', isAlert: false },
        { label: 'Douleur pression crête tibiale', value: '1/10', norm: '0/10', isAlert: false }
      ],
      constatationsCliniques: [
        'Absence de fracture de fatigue ou de fissure corticale.',
        'Discrète réaction périostée mécanique réactionnelle sans œdème palpable.',
        'Excellente trophicité des muscles jambiers postérieurs.'
      ]
    },
    soinsTraitements: {
      actes: [
        'Glaçage cryothérapie localisé 15 minutes post-séance',
        'Étirements du triceps sural et auto-massages au rouleau en mousse'
      ],
      prescriptions: [
        'Chaussettes de compression veineuse de récupération BV Sport post-effort'
      ]
    },
    conclusions: {
      synthese: 'Simple périostite débutante très bien contrôlée. Pas d’interruption requise.',
      consignesEntraineur: 'Joueur apte. Éviter les courses sur surface synthétique dure si possible.',
      dateProchainControle: '2026-09-28 (Contrôle palpatoire)',
      validationMedecinChef: true
    }
  }
];
