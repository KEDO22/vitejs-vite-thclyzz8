export const mapLocations = [
  {
    id: 'ruins',
    name: 'Rovine Antiche',
    x: 50, y: 50,
    status: 'UNLOCKED',
    actions: [{ id: 'a1', label: 'Esplora', storyNodeId: 'explore_ruins' }]
  }
];

export const storyNodes = {
  'start': {
    title: 'Inizio',
    text: 'Benvenuto in Aethelgard. Sei pronto?',
    choices: [{ text: 'Sì', nextNodeId: 'MAP' }]
  },
  'explore_ruins': {
    title: 'Le Rovine',
    text: 'Trovi una vecchia spada.',
    choices: [{ text: 'Prendila', nextNodeId: 'MAP' }]
  }
};
