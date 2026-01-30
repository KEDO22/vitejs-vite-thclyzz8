export const worldMapImage = "https://art.pixilart.com/sr2583569800701.png"; 

// --- DATABASE OGGETTI (Armi, Consumabili, Loot) ---
export const itemsDb = {
  // Consumabili
  'pot_heal': { name: 'Pozione Rossa', type: 'consumable', effect: 'hp', value: 30, price: 15, icon: '🍷' },
  'pot_mana': { name: 'Elisir Blu', type: 'consumable', effect: 'intel', value: 2, price: 50, icon: '💧' },
  
  // Equipaggiamento (Le armi sbloccano scelte di combattimento)
  'sword_iron': { name: 'Lama Arrugginita', type: 'weapon', price: 20, icon: '🗡️' },
  'sword_steel': { name: 'Spada Imperiale', type: 'weapon', price: 100, icon: '⚔️' }, // Più forte
  'staff_novice': { name: 'Bastone Nodoso', type: 'weapon', price: 80, icon: '🪄' }, // Per maghi
  
  // Loot (Oggetti da vendere o per quest)
  'rat_tail': { name: 'Coda di Ratto', type: 'junk', price: 2, icon: '🐁' },
  'bandit_mask': { name: 'Maschera Nera', type: 'junk', price: 10, icon: '🎭' },
  'ancient_shard': { name: 'Frammento d\'Eco', type: 'key', price: 0, icon: '💎' }
};

// --- DATABASE MISSIONI ---
export const questsDb = {
  'q_tutorial': { title: 'Il Risveglio', desc: 'Raggiungi Orynth.', xp: 50 },
  'q_rats': { title: 'Disinfestazione', desc: 'Uccidi i ratti nella cantina della taverna.', xp: 100 },
  'q_thugs': { title: 'Ombre nei Vicoli', desc: 'Un mercante è minacciato nei Bassifondi. Intervieni.', xp: 200 },
  'q_temple': { title: 'La Voce del Silenzio', desc: 'Porta il Frammento d\'Eco al Sacerdote.', xp: 300 }
};

// --- LUOGHI MAPPA ---
export const mapLocations = [
  {
    id: 'ruins', name: 'Rovine Cristallo', region: 'FREELANDS', x: 45, y: 70, status: 'UNLOCKED', iconColor: '#a855f7',
    bgImage: "https://art.pixilart.com/sr2c67676743936.png", description: "Cristalli pulsanti.",
    actions: [{ id: 'a1', label: 'Rientra', storyNodeId: 'ruins_hub' }]
  },
  {
    id: 'orynth', name: 'Orynth', region: 'FREELANDS', x: 55, y: 50, status: 'UNLOCKED', iconColor: '#eab308',
    bgImage: "https://art.pixilart.com/sr2208039233076.png", description: "Capitale del commercio.",
    actions: [{ id: 'a2', label: 'Entra in Città', storyNodeId: 'orynth_hub' }]
  },
  {
    id: 'bastion', name: 'Bastione', region: 'EMPIRE', x: 20, y: 35, status: 'LOCKED', iconColor: '#64748b',
    bgImage: "https://art.pixilart.com/sr2107409259656.png", description: "Fortezza Imperiale.",
    actions: [{ id: 'a4', label: 'Cancelli', storyNodeId: 'bastion_gate' }]
  }
];

// --- STORIA E DIALOGHI ---
export const storyNodes = {
  // PROLOGO
  'start': {
    title: 'PROLOGO', characterImage: "https://art.pixilart.com/sr2513470691510.png", characterName: "Narratore",
    text: 'Il mondo è fratturato. Sei un Tessitore, capace di vedere i fili del destino. Inizi con nulla.',
    choices: [{ text: 'Alzati', nextNodeId: 'ruins_hub', consequences: [{type: 'quest_start', value: 'q_tutorial'}] }]
  },
  'ruins_hub': {
    title: 'ROVINE', characterImage: "https://art.pixilart.com/sr2876644266150.png", characterName: "Luogo",
    text: 'Le rovine brillano. Trovi un frammento strano a terra.',
    choices: [
      { text: 'Raccogli Frammento', nextNodeId: 'ruins_end', consequences: [{type: 'add_item', value: 'ancient_shard'}] },
      { text: 'Vai alla Mappa', nextNodeId: 'MAP' }
    ]
  },
  'ruins_end': {
    title: 'ROVINE', characterImage: "https://art.pixilart.com/sr2876644266150.png", characterName: "Luogo",
    text: 'Hai il frammento. Senti che è importante.',
    choices: [{ text: 'Vai alla Mappa', nextNodeId: 'MAP' }]
  },

  // --- HUB ORYNTH ---
  'orynth_hub': {
    title: 'PIAZZA CENTRALE', characterImage: "https://art.pixilart.com/sr2208039233076.png", characterName: "Città",
    text: 'Orynth è viva. Mercanti, ladri e sacerdoti si incrociano qui.',
    choices: [
      { text: 'Taverna (Quest/Riposo)', nextNodeId: 'tavern_hub' },
      { text: 'Mercato (Armi/Vendita)', nextNodeId: 'market_hub' },
      { text: 'Bassifondi (Pericolo!)', nextNodeId: 'slums_intro' },
      { text: 'Tempio del Silenzio', nextNodeId: 'temple_intro' },
      { text: 'Parla con i passanti', nextNodeId: 'orynth_talk' },
      { text: 'Torna alla Mappa', nextNodeId: 'MAP', consequences: [{type: 'quest_end', value: 'q_tutorial'}] }
    ]
  },

  // INTERAZIONI CASUALI (LORE)
  'orynth_talk': {
    title: 'CHIACCHIERE DI STRADA', characterImage: "https://art.pixilart.com/sr2c95400609506.png", characterName: "Passante",
    text: 'Fermate varie persone per ascoltare le voci.',
    choices: [
      { text: 'Parla con il Vecchio', nextNodeId: 'talk_oldman' },
      { text: 'Parla con la Guardia', nextNodeId: 'talk_guard' },
      { text: 'Torna in Piazza', nextNodeId: 'orynth_hub' }
    ]
  },
  'talk_oldman': {
    title: 'VECCHIO PROFETA', characterImage: "https://art.pixilart.com/sr2513470691510.png", characterName: "Mendicante",
    text: '"L\'Impero vuole spegnere la magia... ma senza magia, il mondo collasserà! Ho visto le crepe nel cielo!"',
    choices: [{ text: 'Interessante...', nextNodeId: 'orynth_talk', consequences: [{type: 'xp', value: 10}] }]
  },
  'talk_guard': {
    title: 'GUARDIA CITTADINA', characterImage: "https://art.pixilart.com/sr2107409259656.png", characterName: "Guardia",
    text: '"Tieni d\'occhio il portafoglio. I Bassifondi sono pieni di feccia ultimamente. Se cerchi guai, vai laggiù."',
    choices: [{ text: 'Grazie', nextNodeId: 'orynth_talk' }]
  },

  // --- MERCATO (SHOPPING) ---
  'market_hub': {
    title: 'MERCATO D\'ARMI', characterImage: "https://art.pixilart.com/sr2c95400609506.png", characterName: "Fabbro",
    text: 'Vuoi proteggerti? Ti serve acciaio vero. (Oro: $GOLD$)',
    choices: [
      { text: 'Compra Lama Arrugginita (20 Oro)', nextNodeId: 'market_hub', consequences: [{type: 'gold', value: -20}, {type: 'add_item', value: 'sword_iron'}] },
      { text: 'Compra Spada Imperiale (100 Oro)', nextNodeId: 'market_hub', consequences: [{type: 'gold', value: -100}, {type: 'add_item', value: 'sword_steel'}] },
      { text: 'Vendi Coda di Ratto (+2 Oro)', nextNodeId: 'market_hub', reqItem: 'rat_tail', consequences: [{type: 'gold', value: 2}, {type: 'remove_item', value: 'rat_tail'}] },
      { text: 'Vendi Maschera Bandito (+10 Oro)', nextNodeId: 'market_hub', reqItem: 'bandit_mask', consequences: [{type: 'gold', value: 10}, {type: 'remove_item', value: 'bandit_mask'}] },
      { text: 'Torna in Piazza', nextNodeId: 'orynth_hub' }
    ]
  },

  // --- TAVERNA & QUEST RATTI ---
  'tavern_hub': {
    title: 'TAVERNA', characterImage: "https://art.pixilart.com/sr2056247946890.png", characterName: "Oste",
    text: 'Birra, letti e problemi. Cosa cerchi?',
    choices: [
      { text: 'Dormi (10 Oro)', nextNodeId: 'tavern_hub', consequences: [{type: 'gold', value: -10}, {type: 'hp', value: 1000}] }, // Full heal
      { text: 'Problemi? (Quest LVL 1)', nextNodeId: 'quest_rats_assign', reqQuestMissing: 'q_rats' },
      { text: 'Torna in Piazza', nextNodeId: 'orynth_hub' }
    ]
  },
  'quest_rats_assign': {
    title: 'DISINFESTAZIONE', characterImage: "https://art.pixilart.com/sr2056247946890.png", characterName: "Oste",
    text: 'Ratti giganti in cantina. Uccidili e ti darò 15 monete.',
    choices: [{ text: 'Scendo giù', nextNodeId: 'cantina_fight', consequences: [{type: 'quest_start', value: 'q_rats'}] }]
  },
  'cantina_fight': {
    title: 'COMBATTIMENTO', characterImage: "https://art.pixilart.com/sr2589045053297.png", characterName: "Ratto Gigante",
    text: 'Il ratto ti attacca! (HP Nemico: Basso)',
    choices: [
      { text: 'Colpisci (Perdi 5 HP)', nextNodeId: 'cantina_loot', consequences: [{type: 'hp', value: -5}] },
      { text: 'Usa Lama Arrugginita (Danno Critico)', nextNodeId: 'cantina_loot', reqItem: 'sword_iron', consequences: [{type: 'hp', value: 0}] } // 0 Danni presi
    ]
  },
  'cantina_loot': {
    title: 'VITTORIA', characterImage: "https://art.pixilart.com/sr2056247946890.png", characterName: "Sistema",
    text: 'Il ratto è morto. Trovi qualcosa tra i resti.',
    choices: [{ text: 'Raccogli Loot', nextNodeId: 'tavern_end_rats', consequences: [{type: 'add_item', value: 'rat_tail'}, {type: 'xp', value: 50}] }]
  },
  'tavern_end_rats': {
    title: 'RICOMPENSA', characterImage: "https://art.pixilart.com/sr2056247946890.png", characterName: "Oste",
    text: 'Ottimo lavoro! Ecco il tuo oro.',
    choices: [{ text: 'Grazie', nextNodeId: 'tavern_hub', consequences: [{type: 'quest_end', value: 'q_rats'}, {type: 'gold', value: 15}] }]
  },

  // --- BASSIFONDI & QUEST BANDITI (LVL 2) ---
  'slums_intro': {
    title: 'BASSIFONDI', characterImage: "https://art.pixilart.com/sr2c95400609506.png", characterName: "Luogo",
    text: 'Vicolo buio e puzzolente. Vedi due figure minacciare un mercante.',
    choices: [
      { text: 'Intervieni (Quest LVL 2)', nextNodeId: 'thugs_fight', consequences: [{type: 'quest_start', value: 'q_thugs'}] },
      { text: 'Ignora e torna indietro', nextNodeId: 'orynth_hub' }
    ]
  },
  'thugs_fight': {
    title: 'BANDITI', characterImage: "https://art.pixilart.com/sr2c95400609506.png", characterName: "Capo Bandito",
    text: 'E tu chi sei? Vuoi un taglio sulla gola?',
    choices: [
      { text: 'Combatti a mani nude (Pericoloso)', nextNodeId: 'thugs_loot', consequences: [{type: 'hp', value: -20}] },
      { text: 'Usa Spada Imperiale (Vittoria Facile)', nextNodeId: 'thugs_loot', reqItem: 'sword_steel', consequences: [{type: 'hp', value: -2}] },
      { text: 'Intimidisci (Serve LVL 2)', nextNodeId: 'thugs_flee', reqLevel: 2 } 
    ]
  },
  'thugs_loot': {
    title: 'VITTORIA', characterImage: "https://art.pixilart.com/sr2208039233076.png", characterName: "Mercante",
    text: 'Grazie! Sono scappati ma hanno lasciato cadere questo.',
    choices: [{ text: 'Prendi bottino', nextNodeId: 'orynth_hub', consequences: [{type: 'add_item', value: 'bandit_mask'}, {type: 'quest_end', value: 'q_thugs'}, {type: 'xp', value: 150}, {type: 'gold', value: 30}] }]
  },
  'thugs_flee': {
    title: 'SUCCESSO', characterImage: "https://art.pixilart.com/sr2c95400609506.png", characterName: "Bandito",
    text: 'È troppo forte! Scappiamo! (Guadagni XP per il carisma)',
    choices: [{ text: 'Bene', nextNodeId: 'orynth_hub', consequences: [{type: 'quest_end', value: 'q_thugs'}, {type: 'xp', value: 200}] }]
  },

  // --- TEMPIO & QUEST ARTEFATTO ---
  'temple_intro': {
    title: 'TEMPIO DEL SILENZIO', characterImage: "https://art.pixilart.com/sr2513470691510.png", characterName: "Sacerdote",
    text: 'Questo è un luogo sacro. Cerchi risposte o perdono?',
    choices: [
      { text: 'Ho trovato questo frammento', nextNodeId: 'temple_reveal', reqItem: 'ancient_shard' },
      { text: 'Niente', nextNodeId: 'orynth_hub' }
    ]
  },
  'temple_reveal': {
    title: 'RIVELAZIONE', characterImage: "https://art.pixilart.com/sr2513470691510.png", characterName: "Sacerdote",
    text: 'Impossibile... Questo proviene dall\'Era dell\'Unità! Devi proteggerlo dall\'Impero. Tieni, prendi questo bastone per difenderti.',
    choices: [{ text: 'Accetta il destino', nextNodeId: 'orynth_hub', consequences: [{type: 'add_item', value: 'staff_novice'}, {type: 'xp', value: 300}, {type: 'remove_item', value: 'ancient_shard'}] }]
  }
};
