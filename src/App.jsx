import { useState } from 'react';
import { mapLocations, storyNodes, worldMapImage } from './data';

export default function App() {
  const [screen, setScreen] = useState('STORY'); // 'STORY' o 'MAP'
  const [nodeId, setNodeId] = useState('start');
  
  // Tracciamo dove si trova fisicamente il giocatore per mostrare lo sfondo giusto
  const [currentLocation, setCurrentLocation] = useState(null); 
  const [selectedMapLoc, setSelectedMapLoc] = useState(null); // Per il popup della mappa

  // Statistiche RPG
  const [stats, setStats] = useState({ hp: 100, gold: 50, intel: 0, lvl: 1 });

  const node = storyNodes[nodeId];

  // Gestione Scelte
  const handleChoice = (choice) => {
    // Conseguenze
    if (choice.consequences) {
      const newStats = { ...stats };
      choice.consequences.forEach(c => {
        if (c.type === 'hp') newStats.hp += c.value;
        if (c.type === 'gold') newStats.gold += c.value;
        if (c.type === 'intel') newStats.intel += c.value;
      });
      setStats(newStats);
    }

    // Navigazione
    if (choice.nextNodeId === 'MAP') {
      setScreen('MAP');
    } else {
      setNodeId(choice.nextNodeId);
    }
  };

  // Determina lo sfondo attuale: o la mappa mondo, o il luogo specifico
  const currentBackground = screen === 'MAP' 
    ? worldMapImage 
    : (currentLocation?.bgImage || "https://art.pixilart.com/sr2c67676743936.png"); // Fallback background

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* 1. SFONDO IMMERSIVO (Cambia sempre) */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={{ 
          backgroundImage: `url('${currentBackground}')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          filter: 'brightness(0.5) contrast(1.2)' // Scuro per far leggere il testo
        }}
      ></div>

      {/* Effetto Scanlines (TV Vecchia) */}
      <div className="scanlines"></div>

      {/* 2. HUD (Barra di stato sopra) */}
      <div className="relative z-20 w-full max-w-4xl bg-black/80 border-b-4 border-white p-4 flex justify-between items-center pixel-border mb-4">
        <div className="text-yellow-400 text-lg">LVL {stats.lvl}</div>
        <div className="flex gap-6">
           <span className="text-red-500">HP {stats.hp}</span>
           <span className="text-yellow-500">GOLD {stats.gold}</span>
           <span className="text-blue-400">INT {stats.intel}</span>
        </div>
      </div>

      {/* 3. AREA DI GIOCO */}
      <div className="relative z-10 w-full max-w-4xl h-[600px] flex">
        
        {screen === 'STORY' && node ? (
          // --- SCENA DIALOGO (Immersiva) ---
          <div className="w-full h-full flex flex-col justify-end pb-10">
            
            {/* Scena Visiva: Personaggio + Dialogo */}
            <div className="flex items-end gap-4 px-8">
              
              {/* Ritratto Personaggio (Pixel Art) */}
              <div className="w-1/3">
                 <img 
                   src={node.characterImage} 
                   className="w-full pixel-border bg-black/50" 
                   alt="Character"
                 />
                 <div className="bg-blue-600 text-white text-center border-2 border-white mt-2 p-1">
                    {node.characterName}
                 </div>
              </div>

              {/* Box Testo */}
              <div className="w-2/3 pixel-border p-6 bg-blue-900/90 text-white">
                <p className="mb-6 text-sm md:text-base typing-effect">{node.text}</p>
                
                {/* Opzioni */}
                <div className="grid grid-cols-1 gap-2">
                  {node.choices.map((c, i) => (
                    <button 
                      key={i}
                      onClick={() => handleChoice(c)}
                      className="pixel-btn p-3 text-left hover:text-yellow-300"
                    >
                      ► {c.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // --- MAPPA MONDO (Pixel Art) ---
          <div className="w-full h-full relative pixel-border bg-black/20 backdrop-blur-sm">
             <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 border border-white">
               MAPPA DEL MONDO
             </div>

             {/* Punti Mappa */}
             {mapLocations.map(loc => (
               <button
                 key={loc.id}
                 onClick={() => {
                    if(loc.status === 'UNLOCKED') setSelectedMapLoc(loc);
                 }}
                 className={`absolute w-8 h-8 hover:scale-125 transition-transform
                   ${loc.status === 'LOCKED' ? 'grayscale opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                 `}
                 style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
               >
                  {/* Icona Pixel (Un semplice quadrato colorato per ora) */}
                  <div 
                    className="w-full h-full border-2 border-white shadow-[0_0_10px_black]"
                    style={{ backgroundColor: loc.iconColor }}
                  ></div>
                  {/* Etichetta */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 border border-white whitespace-nowrap hidden hover:block">
                    {loc.name}
                  </div>
               </button>
             ))}

             {/* Popup Entrata Luogo */}
             {selectedMapLoc && (
               <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                 <div className="pixel-border p-6 bg-blue-900 max-w-sm text-center">
                   <h2 className="text-xl text-yellow-400 mb-4">{selectedMapLoc.name}</h2>
                   <img src={selectedMapLoc.bgImage} className="w-full h-32 object-cover border-2 border-white mb-4" />
                   <p className="text-xs mb-6">{selectedMapLoc.description}</p>
                   
                   <div className="flex flex-col gap-2">
                     {selectedMapLoc.actions.map(act => (
                       <button
                         key={act.id}
                         className="pixel-btn p-2"
                         onClick={() => {
                           setCurrentLocation(selectedMapLoc); // Importante: Imposta lo sfondo!
                           setNodeId(act.storyNodeId);
                           setScreen('STORY');
                           setSelectedMapLoc(null);
                         }}
                       >
                         ENTRA: {act.label}
                       </button>
                     ))}
                     <button onClick={() => setSelectedMapLoc(null)} className="text-red-400 mt-2 text-xs hover:underline">CHIUDI</button>
                   </div>
                 </div>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
