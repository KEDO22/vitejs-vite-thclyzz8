import { useState, useEffect } from 'react';
import { mapLocations, storyNodes, worldMapImage, itemsDb, questsDb } from './data';

export default function App() {
  const [screen, setScreen] = useState('STORY'); 
  const [nodeId, setNodeId] = useState('start');
  const [currentLocation, setCurrentLocation] = useState(null); 
  const [selectedMapLoc, setSelectedMapLoc] = useState(null);

  // Stats Giocatore
  const [stats, setStats] = useState({ hp: 50, maxHp: 50, gold: 20, intel: 0, xp: 0, lvl: 1 });
  const [inventory, setInventory] = useState([]);
  const [quests, setQuests] = useState({}); 
  const [showMenu, setShowMenu] = useState(false);
  const [levelUpMsg, setLevelUpMsg] = useState(null); 

  const node = storyNodes[nodeId];

  // Level Up
  useEffect(() => {
    const xpNeeded = stats.lvl * 150;
    if (stats.xp >= xpNeeded) {
      setStats(prev => ({
        ...prev,
        lvl: prev.lvl + 1,
        maxHp: prev.maxHp + 20,
        hp: prev.maxHp + 20, 
        xp: prev.xp - xpNeeded 
      }));
      setLevelUpMsg(`LEVEL UP! SEI ORA LIVELLO ${stats.lvl + 1}`);
      setTimeout(() => setLevelUpMsg(null), 3000);
    }
  }, [stats.xp]);

  const handleChoice = (choice) => {
    let canProceed = true;
    if (choice.consequences) {
      choice.consequences.forEach(c => {
        if (c.type === 'gold' && c.value < 0 && stats.gold + c.value < 0) canProceed = false;
        if (c.type === 'hp' && c.value < 0 && stats.hp + c.value <= 0) {
            // Qui potresti gestire il Game Over
        }
      });
    }

    if (!canProceed) {
      alert("Risorse insufficienti!");
      return;
    }

    if (choice.consequences) {
      const newStats = { ...stats };
      let newInv = [...inventory];
      const newQuests = { ...quests };

      choice.consequences.forEach(c => {
        if (c.type === 'hp') newStats.hp = Math.min(newStats.maxHp, newStats.hp + c.value);
        if (c.type === 'gold') newStats.gold += c.value;
        if (c.type === 'intel') newStats.intel += c.value;
        if (c.type === 'xp') newStats.xp += c.value;
        
        if (c.type === 'add_item') newInv.push(c.value);
        if (c.type === 'remove_item') {
            const index = newInv.indexOf(c.value);
            if (index > -1) newInv.splice(index, 1);
        }

        if (c.type === 'quest_start') newQuests[c.value] = 'active';
        if (c.type === 'quest_end') newQuests[c.value] = 'completed';
      });

      setStats(newStats);
      setInventory(newInv);
      setQuests(newQuests);
    }

    if (choice.nextNodeId === 'MAP') {
      setScreen('MAP');
    } else {
      setNodeId(choice.nextNodeId);
    }
  };

  const isChoiceVisible = (choice) => {
    if (choice.reqItem && !inventory.includes(choice.reqItem)) return false; 
    if (choice.reqQuestMissing && quests[choice.reqQuestMissing]) return false; 
    if (choice.reqLevel && stats.lvl < choice.reqLevel) return false; 
    return true;
  };

  // --- LOGICA SFONDO DINAMICO ---
  // Priorità: 1. Mappa Globale -> 2. Sfondo specifico del Nodo (es. Interno Taverna) -> 3. Sfondo della Location (es. Città)
  const currentBackground = screen === 'MAP' 
    ? worldMapImage 
    : (node?.bgImage || currentLocation?.bgImage || "https://art.pixilart.com/sr2c67676743936.png");

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden font-pixel text-white">
      
      {/* SFONDO */}
      <div className="absolute inset-0 z-0 transition-all duration-1000"
        style={{ backgroundImage: `url('${currentBackground}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.5)' }}>
      </div>
      <div className="scanlines"></div>

      {/* LEVEL UP NOTIFICATION */}
      {levelUpMsg && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-yellow-500 text-black border-4 border-white p-6 text-2xl animate-bounce shadow-[0_0_50px_gold]">
            {levelUpMsg}
        </div>
      )}

      {/* HUD SUPERIORE */}
      <div className="relative z-20 w-full max-w-4xl bg-[#111] border-b-4 border-white p-2 flex justify-between items-center pixel-border mb-2 text-xs">
        <div className="flex gap-4 items-center">
           <div className="bg-blue-900 px-2 py-1 border border-blue-500">LVL {stats.lvl}</div>
           <div className="w-20 h-2 bg-gray-700 border border-gray-500 relative">
               <div className="h-full bg-blue-400" style={{ width: `${Math.min(100, (stats.xp / (stats.lvl * 150)) * 100)}%` }}></div>
           </div>
           <span className="text-red-500">HP {stats.hp}/{stats.maxHp}</span>
           <span className="text-yellow-500">ORO {stats.gold}</span>
        </div>
        <button onClick={() => setShowMenu(!showMenu)} className="pixel-btn px-2 py-1 text-[10px] bg-purple-700">
          {showMenu ? 'X CHIUDI' : 'ZAINO'}
        </button>
      </div>

      {/* MENU ZAINO */}
      {showMenu && (
        <div className="absolute z-50 inset-0 bg-black/90 flex items-center justify-center p-4">
           <div className="w-full max-w-3xl bg-[#0c0a09] pixel-border p-6 relative h-[500px] flex flex-col">
              <button onClick={() => setShowMenu(false)} className="absolute top-2 right-2 pixel-btn bg-red-600 px-3 py-1 text-white border-2 border-white hover:bg-red-500">CHIUDI [X]</button>
              <h2 className="text-center text-yellow-400 text-xl mb-6 border-b-2 border-gray-600 pb-2">GESTIONE EROE</h2>
              <div className="grid grid-cols-2 gap-6 h-full">
                 <div className="border-2 border-gray-700 p-4 bg-gray-900 overflow-y-auto">
                   <h3 className="text-blue-400 mb-4 text-sm">INVENTARIO</h3>
                   {inventory.length === 0 ? <p className="text-gray-500 text-xs">Vuoto.</p> : inventory.map((itemKey, i) => (
                     <div key={i} className="flex justify-between items-center bg-black p-2 mb-2 border border-gray-700">
                       <span className="text-xs">{itemsDb[itemKey].icon} {itemsDb[itemKey].name}</span>
                       {itemsDb[itemKey].type === 'consumable' && (
                         <button onClick={() => {
                             if(itemsDb[itemKey].effect === 'hp') {
                               setStats({...stats, hp: Math.min(stats.maxHp, stats.hp + itemsDb[itemKey].value)});
                               let newInv = [...inventory]; newInv.splice(i, 1); setInventory(newInv);
                             }
                           }} className="text-green-400 hover:underline text-[10px] border border-green-900 px-1">USA</button>
                       )}
                     </div>
                   ))}
                 </div>
                 <div className="border-2 border-gray-700 p-4 bg-gray-900 overflow-y-auto">
                   <h3 className="text-green-400 mb-4 text-sm">QUEST</h3>
                   {Object.keys(quests).map(qKey => (
                     <div key={qKey} className="mb-4 bg-black p-2 border border-gray-800">
                       <div className={`text-xs font-bold ${quests[qKey] === 'completed' ? 'text-gray-500 line-through' : 'text-yellow-200'}`}>{questsDb[qKey].title}</div>
                       <div className="text-[10px] text-gray-400 mt-1 italic">{questsDb[qKey].desc}</div>
                     </div>
                   ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* AREA DI GIOCO */}
      <div className="relative z-10 w-full max-w-4xl h-[550px] flex">
        {screen === 'STORY' && node ? (
          <div className="w-full h-full flex flex-col justify-end pb-4">
            <div className="flex flex-col md:flex-row items-end gap-4 px-4">
              {/* Ritratto NPC */}
              <div className="w-32 md:w-48 pixel-border bg-black/50 relative">
                 <img src={node.characterImage} className="w-full grayscale-0" alt="NPC" />
                 <div className="absolute bottom-0 w-full bg-blue-900 text-white text-center text-xs py-1 border-t-2 border-white">{node.characterName}</div>
              </div>
              {/* Box Dialogo */}
              <div className="flex-1 pixel-border p-4 bg-[#0f172a]/95 text-white shadow-lg relative">
                <p className="mb-6 text-xs md:text-sm leading-relaxed tracking-wide text-gray-200">{node.text.replace('$GOLD$', stats.gold)}</p>
                <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto">
                  {node.choices.filter(isChoiceVisible).map((c, i) => (
                    <button key={i} onClick={() => handleChoice(c)} className="pixel-btn p-3 text-left text-xs flex justify-between items-center group">
                      <span className="group-hover:text-yellow-300">► {c.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // MAPPA 16-BIT
          <div className="w-full h-full relative pixel-border bg-black/40 backdrop-blur-sm">
             <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 border border-white text-xs z-20">MAPPA DEL MONDO</div>
             {mapLocations.map(loc => (
               <button key={loc.id} onClick={() => { if(loc.status === 'UNLOCKED') setSelectedMapLoc(loc); }}
                 className={`absolute w-10 h-10 hover:scale-125 transition-transform duration-200 ${loc.status === 'LOCKED' ? 'grayscale opacity-50' : 'cursor-pointer'}`}
                 style={{ left: `${loc.x}%`, top: `${loc.y}%` }}>
                  {/* Pin mappa migliorato */}
                  <div className={`w-full h-full border-2 border-white shadow-[0_0_15px_${loc.iconColor}] rounded-full animate-pulse`} style={{ backgroundColor: loc.iconColor }}></div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] bg-black px-1 whitespace-nowrap hidden hover:block z-30 border border-white">{loc.name}</div>
               </button>
             ))}
             {selectedMapLoc && (
               <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                 <div className="pixel-border p-4 bg-[#1e1b4b] max-w-xs text-center border-4 border-yellow-600">
                   <h2 className="text-lg text-yellow-400 mb-2 uppercase tracking-widest">{selectedMapLoc.name}</h2>
                   <img src={selectedMapLoc.bgImage} className="w-full h-32 object-cover border-2 border-white mb-2" />
                   <p className="text-[10px] mb-4 text-gray-300 italic">{selectedMapLoc.description}</p>
                   <div className="flex flex-col gap-2">
                     {selectedMapLoc.actions.map(act => (
                       <button key={act.id} className="pixel-btn p-2 text-xs bg-green-700 hover:bg-green-600"
                         onClick={() => { setCurrentLocation(selectedMapLoc); setNodeId(act.storyNodeId); setScreen('STORY'); setSelectedMapLoc(null); }}>
                         VIAGGIA: {act.label}
                       </button>
                     ))}
                     <button onClick={() => setSelectedMapLoc(null)} className="text-red-300 mt-2 text-[10px] hover:underline">CHIUDI MAPPA</button>
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
