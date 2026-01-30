import { useState } from 'react';
import { mapLocations, storyNodes, worldMapImage } from './data';

export default function App() {
  const [screen, setScreen] = useState('STORY');
  const [nodeId, setNodeId] = useState('start');
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [resources, setResources] = useState({ gold: 10, intel: 0, hp: 100 });

  const node = storyNodes[nodeId];

  const handleChoice = (choice) => {
    if (choice.consequences) {
      const newRes = { ...resources };
      choice.consequences.forEach(c => {
        if (c.type === 'gold') newRes.gold += c.value;
        if (c.type === 'intel') newRes.intel += c.value;
        if (c.type === 'hp') newRes.hp += c.value;
      });
      setResources(newRes);
    }
    
    if (choice.nextNodeId === 'MAP') setScreen('MAP');
    else setNodeId(choice.nextNodeId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center"
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542259682-6e21625894b9?q=80&w=2000&auto=format&fit=crop')" }}>
      
      {/* Overlay scuro per leggere meglio */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>

      {/* HUD SUPERIORE STILE FANTASY */}
      <div className="relative w-full max-w-5xl flex justify-between items-center bg-[#1a1510] border-y-2 border-[#b45309] p-4 mb-6 shadow-2xl z-10">
        <h1 className="text-2xl md:text-4xl text-[#fbbf24] font-bold tracking-[0.2em] uppercase drop-shadow-md">
          Aethelgard
        </h1>
        <div className="flex gap-6 text-[#e2e8f0] font-serif text-lg">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-2xl">♥</span> {resources.hp}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-2xl">♦</span> {resources.gold}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400 text-2xl">♠</span> {resources.intel}
          </div>
        </div>
      </div>

      {screen === 'STORY' && node ? (
        // --- INTERFACCIA DIALOGO (NUOVA) ---
        <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row gap-6 items-end">
          
          {/* 1. RITRATTO DEL PERSONAGGIO (Sinistra) */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
             <div className="relative w-64 h-80 fantasy-border bg-black overflow-hidden shadow-[0_0_30px_rgba(0,0,0,1)]">
               <img 
                 src={node.characterImage} 
                 alt={node.characterName} 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
               />
               <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-10 text-center">
                 <h2 className="text-[#fbbf24] font-bold text-xl uppercase tracking-widest font-serif">{node.characterName}</h2>
               </div>
             </div>
          </div>

          {/* 2. FINESTRA DIALOGO (Destra) */}
          <div className="w-full md:w-2/3 parchment-dark fantasy-border p-8 min-h-[300px] flex flex-col justify-between shadow-2xl relative">
            {/* Titolo Capitolo */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#451a03] border border-[#d97706] px-6 py-1 text-[#fbbf24] text-sm uppercase tracking-widest shadow-lg">
              {node.title}
            </div>

            {/* Testo */}
            <p className="text-xl md:text-2xl leading-relaxed text-[#e7e5e4] italic mb-8 drop-shadow-sm">
              "{node.text}"
            </p>

            {/* Scelte */}
            <div className="space-y-3">
              {node.choices.map((c, i) => (
                <button 
                  key={i}
                  onClick={() => handleChoice(c)}
                  className="btn-fantasy w-full py-4 text-lg rounded-sm uppercase tracking-wider relative group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                     <span className="text-[#d97706] opacity-0 group-hover:opacity-100 transition-opacity">⚔</span> 
                     {c.text} 
                     <span className="text-[#d97706] opacity-0 group-hover:opacity-100 transition-opacity">⚔</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      ) : (
        // --- INTERFACCIA MAPPA ---
        <div className="relative z-10 w-full max-w-5xl h-[600px] fantasy-border bg-[#0c0a09] overflow-hidden shadow-2xl group">
           
           {/* Immagine Mappa */}
           <img src={worldMapImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700" alt="Mappa" />
           
           {/* Griglia Decorativa */}
           <div className="absolute inset-0 opacity-20" style={{backgroundImage: "linear-gradient(#d97706 1px, transparent 1px), linear-gradient(90deg, #d97706 1px, transparent 1px)", backgroundSize: "50px 50px"}}></div>

           {/* Punti Mappa */}
           {mapLocations.map(loc => (
             <button
               key={loc.id}
               onClick={() => loc.status === 'UNLOCKED' && setSelectedLoc(loc)}
               disabled={loc.status === 'LOCKED'}
               className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group/pin
                 ${loc.status === 'LOCKED' ? 'opacity-40 grayscale' : 'hover:scale-125 cursor-pointer hover:z-50'}
               `}
               style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
             >
                <div className={`w-6 h-6 rotate-45 border-2 border-[#fbbf24] shadow-[0_0_15px_#fbbf24]
                  ${loc.region === 'EMPIRE' ? 'bg-gray-800' : 'bg-[#78350f]'}
                `}></div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[#fbbf24] text-xs font-bold uppercase tracking-widest bg-black/80 px-2 py-1 border border-[#78350f] opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                  {loc.name}
                </div>
             </button>
           ))}

           {/* POPUP LUOGO (Stile Pergamena) */}
           {selectedLoc && (
             <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
               <div className="parchment-dark fantasy-border p-1 max-w-lg w-full">
                 <div className="relative h-48 border-b-2 border-[#b45309]">
                    <img src={selectedLoc.image} className="w-full h-full object-cover opacity-80" alt={selectedLoc.name} />
                    <button onClick={() => setSelectedLoc(null)} className="absolute top-2 right-2 bg-[#451a03] text-[#fbbf24] w-8 h-8 border border-[#d97706] hover:bg-red-900">✕</button>
                 </div>
                 <div className="p-6 text-center">
                   <h2 className="text-3xl text-[#fbbf24] font-bold mb-2 font-serif uppercase">{selectedLoc.name}</h2>
                   <p className="text-[#a8a29e] italic mb-6 font-serif text-lg">{selectedLoc.description}</p>
                   <div className="space-y-3">
                     {selectedLoc.actions.map(action => (
                       <button
                         key={action.id}
                         onClick={() => { setNodeId(action.storyNodeId); setScreen('STORY'); setSelectedLoc(null); }}
                         className="btn-fantasy w-full py-3 text-lg uppercase"
                       >
                         Entra: {action.label}
                       </button>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
}
