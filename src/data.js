// --- ASSETS GRAFICI PRINCIPALI ---
// Mappa 16-bit dettagliata
export const worldMapImage = "https://image.pollinations.ai/prompt/pixel%20art%20rpg%20world%20map%20isometric%20fantasy%20continent%20forest%20desert%20castle?width=1920&height=1080&nologo=true"; 

// --- DATABASE OGGETTI ---
export const itemsDb = {
  // Consumabili
  'pot_heal': { name: 'Pozione Rossa', type: 'consumable', effect: 'hp', value: 30, price: 15, icon: '🍷' },
  'scroll_fire': { name: 'Pergamena Fuoco', type: 'weapon_consumable', dmg: 50, price: 40, icon: '🔥' },
  
  // Armi
  'sword_iron': { name: 'Lama Arrugginita', type: 'weapon', price: 20, icon: '🗡️' },
  'sword_steel': { name: 'Spada Imperiale', type: 'weapon', price: 100, icon: '⚔️' },
  'staff_novice': { name: 'Bastone del Tessitore', type: 'weapon', price: 150, icon: '🪄' },
  
  // Loot
  'rat_tail': { name: 'Coda di Ratto', type: 'junk', price: 2, icon: '🐁' },
  'wolf_pelt': { name: 'Pelliccia Spettrale', type: 'junk', price: 25, icon: '🐺' },
  'ancient_shard': { name: 'Frammento d\'Eco', type: 'key', price: 0, icon: '💎' }
};

// --- MISSIONI ---
export const questsDb = {
  'q_tutorial': { title: 'Il Risveglio', desc: 'Raggiungi Orynth.', xp: 50 },
  'q_rats': { title: 'Disinfestazione', desc: 'Pulisci la cantina della taverna.', xp: 100 },
  'q_forest': { title: 'Lupo Spettrale', desc: 'Indaga nella Foresta dei Sussurri.', xp: 400 }
};

// --- LUOGHI MAPPA (Con nuovi sfondi) ---
export const mapLocations = [
  {
    id: 'ruins', name: 'Rovine Cristallo', region: 'FREELANDS', x: 45, y: 70, status: 'UNLOCKED', iconColor: '#a855f7',
    // Sfondo: Cristalli blu nella notte
    bgImage: "https://image.pollinations.ai/prompt/pixel%20art%20crystal%20ruins%20night%20glowing%20blue%20pillars%20desert?width=1280&height=720&nologo=true",
    description: "Antiche pietre che pulsano di magia.",
    actions: [{ id: 'a1', label: 'Esplora', storyNodeId: 'ruins_hub' }]
  },
  {
    id: 'orynth', name: 'Orynth', region: 'FREELANDS', x: 55, y: 50, status: 'UNLOCKED', iconColor: '#eab308',
    // Sfondo: Città medievale isometrica
    bgImage: "https://image.pollinations.ai/prompt/pixel%20art%20medieval%20city%20market%20square%20daylight%20bustling?width=1280&height=720&nologo=true",
    description: "La capitale del commercio.",
    actions: [{ id: 'a2', label: 'Entra in Città', storyNodeId: 'orynth_hub' }]
  },
  {
    id: 'forest', name: 'Foresta Sussurri', region: 'DOMINION', x: 75, y: 40, status: 'UNLOCKED', iconColor: '#166534',
    // Sfondo: Foresta scura e magica
    bgImage: "https://image.pollinations.ai/prompt/pixel%20art%20dark%20enchanted%20forest%20purple%20magic%20fog%20trees?width=1280&height=720&nologo=true",
    description: "Alberi che parlano. Pericolo alto.",
    actions: [{ id: 'a3', label: 'Entra nel Bosco', storyNodeId: 'forest_hub' }]
  },
  {
    id: 'bastion', name: 'Bastione', region: 'EMPIRE', x: 20, y: 35, status: 'LOCKED', iconColor: '#64748b',
    bgImage: "https://image.pollinations.ai/prompt/pixel%20art%20steampunk%20fortress%20factory%20smoke%20dark%20iron?width=1280&height=720&nologo=true",
    description: "Fortezza Imperiale.",
    actions: [{ id: 'a4', label: 'Cancelli', storyNodeId: 'bastion_gate' }]
  }
];

// --- STORIA E DIALOGHI (Con nuovi ritratti) ---
// Ritratti Personaggi:
const imgWeaver = "https://image.pollinations.ai/prompt/pixel%20art%20rpg%20portrait%20wizard%20blue%20hood%20young%20glowing%20staff?width=512&height=512&nologo=true";
const imgInnkeeper = "https://image.pollinations.ai/prompt/pixel%20art%20rpg%20portrait%20innkeeper%20bearded%20man%20apron%20friendly?width=512&height=512&nologo=true";
const imgBlacksmith = "https://image.pollinations.ai/prompt/pixel%20art%20rpg%20portrait%20dwarf%20blacksmith%20red%20beard%20goggles?width=512&height=512&nologo=true";
const imgWolf = "https://image.pollinations.ai/prompt/pixel%20art%20rpg%20enemy%20ghost%20wolf%20glowing%20eyes%20scary?width=512&height=512&nologo=true";
const imgTavernBG = "https://image.pollinations.ai/prompt/pixel%20art%20tavern%20interior%20cozy%20fireplace%20wood%20tables?width=1280&height=720&nologo=true";

export const storyNodes = {
  // PROLOGO
  'start': {
    title: 'IL RISVEGLIO', 
    characterImage: imgWeaver, characterName: "Tessitore",
    text: 'La tua testa pulsa. Ti trovi nelle Rovine di Cristallo, ma senti che il tuo potere sta tornando. Devi trovare risposte.',
    choices: [{ text: 'Alzati', nextNodeId: 'ruins_hub', consequences: [{type: 'quest_start', value: 'q_tutorial'}] }]
  },
  
  // ROVINE
  'ruins_hub': {
    title: 'ROVINE', characterImage: "https://art.pixilart.com/sr2876644266150.png", characterName: "Luogo",
    text: 'Il vento fischia tra i cristalli. Vedi qualcosa luccicare.',
    choices: [
      { text: 'Raccogli Frammento', nextNodeId: 'ruins_end', consequences: [{type: 'add_item', value: 'ancient_shard'}] },
      { text: 'Vai alla Mappa', nextNodeId: 'MAP' }
    ]
  },
  'ruins_end': {
    title: 'ROVINE', characterImage: imgWeaver, characterName: "Tessitore",
    text: 'Hai il frammento. Senti un\'eco lontana provenire dalla città di Orynth.',
    choices: [{ text: 'Vai alla Mappa', nextNodeId: 'MAP' }]
  },

  // ORYNTH HUB
  'orynth_hub': {
    title: 'ORYNTH', characterImage: "https://art.pixilart.com/sr2208039233076.png", characterName: "Città",
    text: 'Sei nella piazza del mercato. L\'odore di spezie e metallo riempie l\'aria.',
    choices: [
      { text: 'Entra nella Taverna', nextNodeId: 'tavern_hub' },
      { text: 'Vai dal Fabbro', nextNodeId: 'market_hub' },
      { text: 'Torna alla Mappa', nextNodeId: 'MAP', consequences: [{type: 'quest_end', value: 'q_tutorial'}] }
    ]
  },

  // TAVERNA (Con sfondo specifico!)
  'tavern_hub': {
    title: 'DRAGO CIECO', 
    characterImage: imgInnkeeper, characterName: "Oste",
    bgImage: imgTavernBG, // NUOVO: Sfondo interno taverna
    text: 'Benvenuto al Drago Cieco! Un posto caldo per notti fredde.',
    choices: [
      { text: 'Dormi (10 Oro)', nextNodeId: 'tavern_hub', consequences: [{type: 'gold', value: -10}, {type: 'hp', value: 100}] },
      { text: 'Problemi coi ratti?', nextNodeId: 'quest_rats_assign', reqQuestMissing: 'q_rats' },
      { text: 'Esci in Piazza', nextNodeId: 'orynth_hub' }
    ]
  },
  'quest_rats_assign': {
    title: 'RICHIESTA', characterImage: imgInnkeeper, characterName: "Oste",
    bgImage: imgTavernBG,
    text: 'Maledetti ratti! Hanno invaso la cantina. Se li fai fuori, ti pago bene.',
    choices: [{ text: 'Accetto', nextNodeId: 'cantina_fight', consequences: [{type: 'quest_start', value: 'q_rats'}] }]
  },

  // CANTINA
  'cantina_fight': {
    title: 'CANTINA BUIA', characterImage: "https://art.pixilart.com/sr2589045053297.png", characterName: "Ratto Gigante",
    text: 'SQUEAK! Un ratto ti salta addosso!',
    choices: [
      { text: 'Attacca (-5 HP)', nextNodeId: 'cantina_loot', consequences: [{type: 'hp', value: -5}] },
      { text: 'Usa Spada Imperiale (Critico)', nextNodeId: 'cantina_loot', reqItem: 'sword_steel', consequences: [{type: 'hp', value: 0}] }
    ]
  },
  'cantina_loot': {
    title: 'VITTORIA', characterImage: imgWeaver, characterName: "Tessitore",
    text: 'Il ratto è sconfitto.',
    choices: [{ text: 'Prendi Coda e Torna su', nextNodeId: 'tavern_hub', consequences: [{type: 'add_item', value: 'rat_tail'}, {type: 'xp', value: 50}, {type: 'quest_end', value: 'q_rats'}] }]
  },

  // MERCATO
  'market_hub': {
    title: 'FUCINA', characterImage: imgBlacksmith, characterName: "Fabbro",
    text: 'L\'acciaio imperiale non si piega mai! Cosa ti serve? (Oro: $GOLD$)',
    choices: [
      { text: 'Lama Arrugginita (20g)', nextNodeId: 'market_hub', consequences: [{type: 'gold', value: -20}, {type: 'add_item', value: 'sword_iron'}] },
      { text: 'Spada Imperiale (100g)', nextNodeId: 'market_hub', consequences: [{type: 'gold', value: -100}, {type: 'add_item', value: 'sword_steel'}] },
      { text: 'Vendi Coda Ratto (+5g)', nextNodeId: 'market_hub', reqItem: 'rat_tail', consequences: [{type: 'gold', value: 5}, {type: 'remove_item', value: 'rat_tail'}] },
      { text: 'Indietro', nextNodeId: 'orynth_hub' }
    ]
  },

  // FORESTA (Boss)
  'forest_hub': {
    title: 'FORESTA OSCURA', characterImage: "https://art.pixilart.com/sr2c235884024b8.png", characterName: "Foresta",
    text: 'La nebbia è fitta. Senti un ululato agghiacciante.',
    choices: [
      { text: 'Caccia il Lupo (Boss)', nextNodeId: 'wolf_encounter', reqQuestMissing: 'q_forest_done' },
      { text: 'Torna alla Mappa', nextNodeId: 'MAP' }
    ]
  },
  'wolf_encounter': {
    title: 'LUPO SPETTRALE', characterImage: imgWolf, characterName: "Boss",
    text: 'Un lupo fatto di fumo e ossa emerge dagli alberi! I suoi occhi brillano di pura malvagità.',
    choices: [
      { text: 'Attacca (-20 HP)', nextNodeId: 'wolf_win', consequences: [{type: 'hp', value: -20}] },
      { text: 'Usa Pergamena Fuoco (Vittoria)', nextNodeId: 'wolf_win', reqItem: 'scroll_fire', consequences: [{type: 'remove_item', value: 'scroll_fire'}] }
    ]
  },
  'wolf_win': {
    title: 'VITTORIA', characterImage: imgWeaver, characterName: "Tessitore",
    text: 'Il lupo si dissolve. La foresta sembra respirare di nuovo.',
    choices: [{ text: 'Raccogli Pelliccia', nextNodeId: 'forest_hub', consequences: [{type: 'add_item', value: 'wolf_pelt'}, {type: 'xp', value: 400}, {type: 'quest_end', value: 'q_forest'}] }]
  }
};
