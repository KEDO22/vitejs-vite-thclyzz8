// Immagine Mappa Pixelata (Sfondo generale)
export const worldMapImage = "https://art.pixilart.com/sr2583569800701.png"; 

// --- LUOGHI ---
export const mapLocations = [
  {
    id: 'ruins',
    name: 'Rovine',
    region: 'FREELANDS',
    x: 45, y: 70,
    status: 'UNLOCKED',
    iconColor: '#a855f7', // Viola pixel
    // Sfondo che appare QUANDO ENTRI nel luogo (Immersività)
    bgImage: "https://art.pixilart.com/sr2c67676743936.png", 
    description: "Antiche pietre pixellose.",
    actions: [{ id: 'a1', label: 'Esplora', storyNodeId: 'explore_ruins' }]
  },
  {
    id: 'orynth',
    name: 'Città Mercato',
    region: 'FREELANDS',
    x: 55, y: 50,
    status: 'UNLOCKED',
    iconColor: '#eab308', // Oro pixel
    bgImage: "https://art.pixilart.com/sr2208039233076.png",
    description: "Caos e commercio.",
    actions: [
      { id: 'a2', label: 'Mercante', storyNodeId: 'market_intro' },
      { id: 'a3', label: 'Taverna', storyNodeId: 'tavern_intro' }
    ]
  },
  {
    id: 'bastion',
    name: 'Bastione',
    region: 'EMPIRE',
    x: 20, y: 35,
    status: 'LOCKED',
    iconColor: '#64748b', // Grigio
    bgImage: "https://art.pixilart.com/sr2107409259656.png",
    description: "Fortezza di ferro.",
    actions: [{ id: 'a4', label: 'Entra', storyNodeId: 'bastion_gate' }]
  }
];

// --- STORIA E NPC (Pixel Portraits) ---
export const storyNodes = {
  'start': {
    title: 'INIZIO',
    // Ritratto Pixel Art del personaggio
    characterImage: "https://art.pixilart.com/sr2513470691510.png", 
    characterName: "Voce",
    text: 'Sveglia, Eroe. I pixel di questo mondo si stanno sgretolando.',
    choices: [{ text: 'Apri Mappa', nextNodeId: 'MAP' }]
  },
  'explore_ruins': {
    title: 'IL GOLEM',
    characterImage: "https://art.pixilart.com/sr2876644266150.png", 
    characterName: "Guardiano",
    text: 'BIP. BOOP. Rilevata forma di vita non autorizzata.',
    choices: [
      { text: 'Attacca', nextNodeId: 'MAP', consequences: [{type: 'hp', value: -10}] },
      { text: 'Analizza', nextNodeId: 'MAP', consequences: [{type: 'intel', value: 5}] }
    ]
  },
  'market_intro': {
    title: 'MERCANTE',
    characterImage: "https://art.pixilart.com/sr2c95400609506.png",
    characterName: "Venditore",
    text: 'Ehi tu! Vuoi comprare qualche pixel raro?',
    choices: [
      { text: 'Compra Pozione (-5 Oro)', nextNodeId: 'MAP', consequences: [{type: 'gold', value: -5}, {type: 'hp', value: 20}] },
      { text: 'Vattene', nextNodeId: 'MAP' }
    ]
  },
  'tavern_intro': {
    title: 'TAVERNA',
    characterImage: "https://art.pixilart.com/sr2056247946890.png",
    characterName: "Oste",
    text: 'Qui serviamo solo birra a 8-bit.',
    choices: [{ text: 'Bevi', nextNodeId: 'MAP', consequences: [{type: 'hp', value: 5}] }]
  }
};
