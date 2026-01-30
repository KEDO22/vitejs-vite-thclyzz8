export const worldMapImage = "https://art.pixilart.com/sr2583569800701.png"; 

// --- DATABASE OGGETTI ---
export const itemsDb = {
  // Consumabili
  'pot_heal': { name: 'Pozione Rossa', type: 'consumable', effect: 'hp', value: 30, price: 15, icon: '🍷' },
  'scroll_fire': { name: 'Pergamena di Fuoco', type: 'weapon_consumable', dmg: 50, price: 40, icon: '📜' }, // Nuovo!
  
  // Armi
  'sword_iron': { name: 'Lama Arrugginita', type: 'weapon', price: 20, icon: '🗡️' },
  'sword_steel': { name: 'Spada Imperiale', type: 'weapon', price: 100, icon: '⚔️' },
  'magic_wand': { name: 'Bacchetta di Tasso', type: 'weapon', price: 150, icon: '🪄' },
  
  // Loot
  'rat_tail': { name: 'Coda di Ratto', type: 'junk', price: 2, icon: '🐁' },
  'bandit_mask': { name: 'Maschera Nera', type: 'junk', price: 10, icon: '🎭' },
  'wolf_pelt': { name: 'Pelliccia Spettrale', type: 'junk', price: 25, icon: '🐺' },
  'ancient_shard': { name: 'Frammento d\'Eco', type: 'key', price: 0, icon: '💎' },
  'forest_key': { name: 'Sigillo Elfico', type: 'key', price: 0, icon: '🍃' }
};

// --- MISSIONI ---
export const questsDb = {
  'q_tutorial': { title: 'Il Risveglio', desc: 'Raggiungi Orynth.', xp: 50 },
  'q_rats': { title: 'Disinfestazione', desc: 'Uccidi i ratti nella cantina.', xp: 100 },
  'q_thugs': { title: 'Ombre nei Vicoli', desc: 'Sconfiggi i banditi nei bassifondi.', xp: 200 },
  'q_forest': { title: 'Il Lupo Spettrale', desc: 'Indaga sulle sparizioni nella Foresta dei Sussurri.', xp: 400 } // Nuova quest difficile
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
    id: 'forest', name: 'Foresta Sussurri', region: 'DOMINION', x: 75, y: 40, status: 'UNLOCKED', iconColor: '#166534',
    bgImage: "https://art.pixilart.com/sr2c235884024b8.png", description: "Alberi che parlano. Pericolo LVL 3.", // Nuova zona
    actions: [{ id: 'a3', label: 'Entra nel Bosco', storyNodeId: 'forest_hub' }]
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
    text: 'Sei un Tessitore. Il destino è nelle tue mani. Ti svegli nelle rovine.',
    choices: [{ text: 'Inizia il Viaggio', nextNodeId: 'ruins_hub', consequences: [{type: 'quest_start', value: 'q_tutorial'}] }]
  },
  'ruins_hub': {
    title: 'ROVINE', characterImage: "https://art.pixilart.com/sr2876644266150.png", characterName: "Luogo",
    text: 'Cristalli e silenzio. C\'è un oggetto a terra.',
    choices: [
      { text: 'Raccogli Frammento', nextNodeId: 'ruins_end', consequences: [{type: 'add_item', value: 'ancient_shard'}] },
      { text: 'Vai alla Mappa', nextNodeId: 'MAP' }
    ]
  },
  'ruins_end': {
    title: 'ROVINE', characterImage: "https://art.pixilart.com/sr2876644266150.png", characterName: "Luogo",
    text: 'Hai il frammento. Ora vai a Orynth.',
    choices: [{ text: 'Vai alla Mappa', nextNodeId: 'MAP' }]
  },

  // --- HUB ORYNTH ---
  'orynth_hub': {
    title: 'PIAZZA CENTRALE', characterImage: "https://art.pixilart.com/sr2208039233076.png", characterName: "Città",
    text: 'Orynth. Il cuore pulsante delle Terre Libere.',
    choices: [
      { text: 'Taverna (Riposo/Quest)', nextNodeId: 'tavern_hub' },
      { text: 'Mercato (Armi)', nextNodeId: 'market_hub' },
      { text: 'Bassifondi (Combattimento)', nextNodeId: 'slums_intro' },
      { text: 'Gilda dei Maghi (Quest Foresta)', nextNodeId: 'guild_intro', reqLevel: 2 }, // Richiede LVL 2
      { text: 'Torna alla Mappa', nextNodeId: 'MAP', consequences: [{type: 'quest_end', value: 'q_tutorial'}] }
    ]
  },

  // --- MERCATO ---
  'market_hub': {
    title: 'MERCATO', characterImage: "https://art.pixilart.com/sr2c95400609506.png", characterName: "Fabbro",
    text: 'Acciaio e magia. Cosa ti serve? (Oro: $GOLD$)',
    choices: [
      { text: 'Lama Arrugginita (20g)', nextNodeId: 'market_hub', consequences: [{type: 'gold', value: -20}, {type: 'add_item', value: 'sword_iron'}] },
      { text: 'Spada Imperiale (100g)', nextNodeId: 'market_hub', consequences: [{type: 'gold', value: -100}, {type: 'add_item', value: 'sword_steel'}] },
      { text: 'Pergamena Fuoco (40g)', nextNodeId: 'market_hub', consequences: [{type: 'gold', value: -40}, {type: 'add_item', value: 'scroll_fire'}] },
      { text: 'Vendi Loot (Coda Ratto)', nextNodeId: 'market_hub', reqItem: 'rat_tail', consequences: [{type: 'gold', value: 5}, {type: 'remove_item', value: 'rat_tail'}] },
      { text: 'Vendi Loot (Pelliccia)', nextNodeId: 'market_hub', reqItem: 'wolf_pelt', consequences: [{type: 'gold', value: 30}, {type: 'remove_item', value: 'wolf_pelt'}] },
      { text: 'Indietro', nextNodeId: 'orynth_hub' }
    ]
  },

  // --- GILDA & QUEST FORESTA ---
  'guild_intro': {
    title: 'GILDA MAGHI', characterImage: "https://art.pixilart.com/sr2513470691510.png", characterName: "Arcimago",
    text: 'Tessitore... Sentiamo un disturbo nella Foresta dei Sussurri. Un Lupo Spettrale divora i viaggiatori.',
    choices: [
      { text: 'Me ne occupo io (Quest)', nextNodeId: 'orynth_hub', consequences: [{type: 'quest_start', value: 'q_forest'}] },
      { text: 'Non ora', nextNodeId: 'orynth_hub' }
    ]
  },

  // --- FORESTA DEI SUSSURRI (NUOVA ZONA) ---
  'forest_hub': {
    title: 'FORESTA OSCURA', characterImage: "https://art.pixilart.com/sr2c235884024b8.png", characterName: "Foresta",
    text: 'Gli alberi sussurrano nomi di morti. È un labirinto.',
    choices: [
      { text: 'Cerca il Lupo (Boss)', nextNodeId: 'wolf_encounter', reqQuestMissing: 'q_forest_done' }, // Visibile solo se non l'hai ucciso
      { text: 'Esplora radura (Cerca Erbe)', nextNodeId: 'forest_explore' },
      { text: 'Torna alla Mappa', nextNodeId: 'MAP' }
    ]
  },
  'forest_explore': {
    title: 'RADURA', characterImage: "https://art.pixilart.com/sr2c235884024b8.png", characterName: "Foresta",
    text: 'Trovi un altare abbandonato.',
    choices: [
      { text: 'Prega (Cura)', nextNodeId: 'forest_hub', consequences: [{type: 'hp', value: 20}] },
      { text: 'Ruba offerta (+10 Oro)', nextNodeId: 'forest_hub', consequences: [{type: 'gold', value: 10}, {type: 'hp', value: -5}] } // Ruba ma vieni ferito da una trappola
    ]
  },
  'wolf_encounter': {
    title: 'LUPO SPETTRALE', characterImage: "https://art.pixilart.com/sr2589045053297.png", characterName: "Boss",
    text: 'Un lupo fatto di fumo e ossa ti sbarra la strada! (HP Nemico: ALTO)',
    choices: [
      { text: 'Usa Spada Imperiale (Danno Fisico)', nextNodeId: 'wolf_attack_phys', reqItem: 'sword_steel', consequences: [{type: 'hp', value: -15}] },
      { text: 'Usa Pergamena Fuoco (Danno Magico)', nextNodeId: 'wolf_win', reqItem: 'scroll_fire', consequences: [{type: 'remove_item', value: 'scroll_fire'}] }, // Insta-win consumando oggetto
      { text: 'Attacca disperatamente', nextNodeId: 'wolf_die', consequences: [{type: 'hp', value: -50}] } // Probabile morte
    ]
  },
  'wolf_attack_phys': {
    title: 'COMBATTIMENTO', characterImage: "https://art.pixilart.com/sr2589045053297.png", characterName: "Boss",
    text: 'Lo ferisci, ma ti morde il braccio! Resiste ancora.',
    choices: [
      { text: 'Colpo Finale', nextNodeId: 'wolf_win', consequences: [{type: 'hp', value: -10}] }
    ]
  },
  'wolf_win': {
    title: 'VITTORIA', characterImage: "https://art.pixilart.com/sr2c235884024b8.png", characterName: "Sistema",
    text: 'Il Lupo si dissolve in nebbia. Lascia cadere una pelliccia pregiata.',
    choices: [{ text: 'Prendi Loot', nextNodeId: 'forest_hub', consequences: [{type: 'add_item', value: 'wolf_pelt'}, {type: 'xp', value: 300}, {type: 'quest_end', value: 'q_forest'}] }]
  },
  'wolf_die': {
    title: 'SCONFITTA', characterImage: "https://art.pixilart.com/sr2589045053297.png", characterName: "Morte",
    text: 'Sei stato sbranato. Ti risvegli a Orynth, curato dai monaci ma senza oro.',
    choices: [{ text: 'Risvegliati', nextNodeId: 'orynth_hub', consequences: [{type: 'hp', value: 20}, {type: 'gold', value: -100}] }] // Penalità morte
  },

  // --- TAVERNA & QUEST RATTI ---
  'tavern_hub': {
    title: 'TAVERNA', characterImage: "https://art.pixilart.com/sr2056247946890.png", characterName: "Oste",
    text: 'Birra e letti.',
    choices: [
      { text: 'Dormi (10 Oro)', nextNodeId: 'tavern_hub', consequences: [{type: 'gold', value: -10}, {type: 'hp', value: 100}] },
      { text: 'Quest Ratti', nextNodeId: 'quest_rats_assign', reqQuestMissing: 'q_rats' },
      { text: 'Indietro', nextNodeId: 'orynth_hub' }
    ]
  },
  'quest_rats_assign': {
    title: 'DISINFESTAZIONE', characterImage: "https://art.pixilart.com/sr2056247946890.png", characterName: "Oste",
    text: 'Ratti in cantina. Pensaci tu.',
    choices: [{ text: 'Accetto', nextNodeId: 'cantina_fight', consequences: [{type: 'quest_start', value: 'q_rats'}] }]
  },
  'cantina_fight': {
    title: 'CANTINA', characterImage: "https://art.pixilart.com/sr2589045053297.png", characterName: "Ratto",
    text: 'SQUEAK!',
    choices: [
      { text: 'Attacca (-5 HP)', nextNodeId: 'cantina_loot', consequences: [{type: 'hp', value: -5}] }
    ]
  },
  'cantina_loot': {
    title: 'VITTORIA', characterImage: "https://art.pixilart.com/sr2056247946890.png", characterName: "Sistema",
    text: 'Morto.',
    choices: [{ text: 'Prendi Loot', nextNodeId: 'tavern_hub', consequences: [{type: 'add_item', value: 'rat_tail'}, {type: 'xp', value: 50}, {type: 'quest_end', value: 'q_rats'}] }]
  },

  // --- BASSIFONDI ---
  'slums_intro': {
    title: 'BASSIFONDI', characterImage: "https://art.pixilart.com/sr2c95400609506.png", characterName: "Luogo",
    text: 'Banditi ovunque.',
    choices: [
      { text: 'Combatti Banditi', nextNodeId: 'thugs_fight', consequences: [{type: 'quest_start', value: 'q_thugs'}] },
      { text: 'Via', nextNodeId: 'orynth_hub' }
    ]
  },
  'thugs_fight': {
    title: 'COMBATTIMENTO', characterImage: "https://art.pixilart.com/sr2c95400609506.png", characterName: "Bandito",
    text: 'Dacci i soldi!',
    choices: [
      { text: 'Combatti (-15 HP)', nextNodeId: 'thugs_loot', consequences: [{type: 'hp', value: -15}] },
      { text: 'Usa Spada Imperiale (-2 HP)', nextNodeId: 'thugs_loot', reqItem: 'sword_steel', consequences: [{type: 'hp', value: -2}] }
    ]
  },
  'thugs_loot': {
    title: 'VITTORIA', characterImage: "https://art.pixilart.com/sr2208039233076.png", characterName: "Sistema",
    text: 'Hanno lasciato una maschera.',
    choices: [{ text: 'Prendi', nextNodeId: 'orynth_hub', consequences: [{type: 'add_item', value: 'bandit_mask'}, {type: 'quest_end', value: 'q_thugs'}, {type: 'xp', value: 100}] }]
  }
};
