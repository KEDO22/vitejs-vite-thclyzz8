// Sfondo Mappa
export const worldMapImage = "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1920&auto=format&fit=crop"; 

// --- DATABASE LUOGHI ---
export const mapLocations = [
  {
    id: 'ruins',
    name: 'Rovine di Cristallo',
    region: 'FREELANDS',
    x: 48, y: 65,
    status: 'UNLOCKED',
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    description: "Cristalli pulsanti emergono dalla terra. Un luogo antico e proibito.",
    actions: [{ id: 'a1', label: 'Investiga l\'Eco', storyNodeId: 'explore_ruins' }]
  },
  {
    id: 'orynth',
    name: 'Orynth',
    region: 'FREELANDS',
    x: 55, y: 55,
    status: 'UNLOCKED',
    image: "https://images.unsplash.com/photo-1543536448-d209d2d159d4?q=80&w=800&auto=format&fit=crop",
    description: "La città dorata dei mercanti. Qui ogni parola ha un prezzo.",
    actions: [
      { id: 'a2', label: 'Cerca il Mercante', storyNodeId: 'market_intro' },
      { id: 'a3', label: 'Entra nella Taverna', storyNodeId: 'tavern_intro' }
    ]
  },
  {
    id: 'bastion',
    name: 'Bastione d\'Acciaio',
    region: 'EMPIRE',
    x: 20, y: 40,
    status: 'LOCKED',
    image: "https://images.unsplash.com/photo-1626278664071-8c081308b739?q=80&w=800&auto=format&fit=crop",
    description: "Fortezza impenetrabile avvolta dal fumo delle fonderie.",
    actions: [{ id: 'a4', label: 'Cancelli', storyNodeId: 'bastion_gate' }]
  },
  {
    id: 'spire',
    name: 'La Spire',
    region: 'DOMINION',
    x: 80, y: 30,
    status: 'LOCKED',
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop",
    description: "Torre arcana sospesa nel vuoto.",
    actions: [{ id: 'a5', label: 'Osserva', storyNodeId: 'spire_look' }]
  }
];

// --- DATABASE STORIA E PERSONAGGI ---
export const storyNodes = {
  'start': {
    title: 'La Voce nel Buio',
    // Immagine del personaggio che parla (o scena)
    characterImage: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=600&auto=format&fit=crop", 
    characterName: "???",
    text: 'Apri gli occhi, Tessitore. Il mondo si è spezzato 800 anni fa, ma tu... tu senti ancora i fili che lo legano. Cosa farai con questo potere?',
    choices: [{ text: 'Chiudo gli occhi e ascolto', nextNodeId: 'MAP' }]
  },
  'explore_ruins': {
    title: 'Guardiano delle Rovine',
    characterImage: "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?q=80&w=600&auto=format&fit=crop", // Un golem o statua
    characterName: "Costrutto Antico",
    text: 'Rilevata firma energetica anomala. Sei un discendente dei Primordi? Rispondi o sarai terminato.',
    choices: [
      { text: 'Combatti (Forza)', nextNodeId: 'MAP', consequences: [{type: 'hp', value: -10}] },
      { text: 'Usa il Sigillo (Risonanza)', nextNodeId: 'MAP', consequences: [{type: 'intel', value: 10}] }
    ]
  },
  'market_intro': {
    title: 'Il Mercante Scaltro',
    characterImage: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=600&auto=format&fit=crop", // Uomo con turbante/barba
    characterName: "Kadir",
    text: 'Psst! Straniero! Quel marchio sulla tua mano... vale una fortuna per l\'Impero. O per me. Che ne dici se facciamo un piccolo affare privato?',
    choices: [
      { text: 'Vendi informazioni (+20 Oro)', nextNodeId: 'MAP', consequences: [{type: 'gold', value: 20}, {type: 'reputation_empire', value: 5}] },
      { text: 'Rifiuta e minaccialo', nextNodeId: 'MAP', consequences: [{type: 'reputation_empire', value: -5}] }
    ]
  },
  'tavern_intro': {
    title: 'La Spia',
    characterImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", // Donna misteriosa
    characterName: "Elara",
    text: 'Non guardarti intorno. C\'è un inquisitore al tavolo in fondo. Se sei chi penso tu sia, dobbiamo muoverci. Adesso.',
    choices: [{ text: 'Seguila nel retro', nextNodeId: 'MAP', consequences: [{type: 'intel', value: 5}] }]
  }
};
