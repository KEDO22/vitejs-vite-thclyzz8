export const mapLocations = [
    // --- LE TERRE LIBERE (Centro - Neutrali) ---
    {
      id: 'ruins',
      name: 'Rovine di Cristallo',
      region: 'FREELANDS',
      x: 45, y: 75,
      status: 'UNLOCKED',
      description: "Il luogo del tuo risveglio. Antichi macchinari vibrano ancora.",
      actions: [{ id: 'a1', label: 'Cerca risorse', storyNodeId: 'explore_ruins' }]
    },
    {
      id: 'orynth',
      name: 'Orynth: Città Mercato',
      region: 'FREELANDS',
      x: 50, y: 55,
      status: 'UNLOCKED',
      description: "Il crocevia del mondo. Qui si vende di tutto, anche i segreti.",
      actions: [
        { id: 'a2', label: 'Vai al Mercato', storyNodeId: 'market_intro' },
        { id: 'a3', label: 'Taverna', storyNodeId: 'tavern_intro' }
      ]
    },
  
    // --- IMPERIUM FERRUM (Ovest - Ordine/Tecnologia) ---
    {
      id: 'bastion',
      name: 'Bastione d\'Acciaio',
      region: 'EMPIRE',
      x: 15, y: 40,
      status: 'LOCKED', // Bloccato all'inizio
      description: "La capitale dell'Impero. Una fortezza di metallo nero e vapore.",
      actions: [{ id: 'a4', label: 'Avvicinati alle mura', storyNodeId: 'bastion_gate' }]
    },
    {
      id: 'iron_mines',
      name: 'Miniere del Profondo',
      region: 'EMPIRE',
      x: 25, y: 65,
      status: 'LOCKED',
      description: "Qui si estrae il metallo anti-magia.",
      actions: []
    },
  
    // --- DOMINIO ASTRALE (Est - Magia/Caos) ---
    {
      id: 'spire',
      name: 'La Spire',
      region: 'DOMINION',
      x: 85, y: 30,
      status: 'LOCKED',
      description: "Una torre che sfida le leggi della fisica, fluttuando nel vuoto.",
      actions: [{ id: 'a5', label: 'Osserva la magia', storyNodeId: 'spire_look' }]
    },
    {
      id: 'whispering_woods',
      name: 'Foresta dei Sussurri',
      region: 'DOMINION',
      x: 75, y: 60,
      status: 'LOCKED',
      description: "Alberi bioluminescenti che si nutrono di ricordi.",
      actions: []
    }
  ];
  
  // --- STORIA MINIMA PER TESTARE ---
  export const storyNodes = {
    'start': {
      title: 'Il Risveglio',
      text: 'Ti svegli nelle Rovine di Cristallo. Il sigillo sulla tua mano pulsa. Il mondo ti attende.',
      choices: [{ text: 'Apri la Mappa', nextNodeId: 'MAP' }]
    },
    'explore_ruins': {
      title: 'Rovine di Cristallo',
      text: 'Tra le macerie trovi antichi glifi. Sembrano indicare che Orynth è a nord.',
      choices: [{ text: 'Torna alla Mappa', nextNodeId: 'MAP' }]
    },
    'market_intro': {
      title: 'Il Mercato di Orynth',
      text: 'Il caos, i profumi, le urla dei mercanti. Qui puoi trovare equipaggiamento.',
      choices: [{ text: 'Torna alla Mappa', nextNodeId: 'MAP' }]
    },
    'tavern_intro': {
      title: 'Taverna "Il Drago Cieco"',
      text: 'Un luogo dove raccogliere informazioni su Impero e Dominio.',
      choices: [{ text: 'Torna alla Mappa', nextNodeId: 'MAP' }]
    }
  };
  