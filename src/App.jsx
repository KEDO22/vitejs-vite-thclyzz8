import { useState, useEffect } from 'react';
import { mapLocations, storyNodes, worldMapImage, itemsDb, questsDb } from './data';

export default function App() {
  const [screen, setScreen] = useState('STORY'); 
  const [nodeId, setNodeId] = useState('start');
  const [currentLocation, setCurrentLocation] = useState(null); 
  const [selectedMapLoc, setSelectedMapLoc] = useState(null);

  // --- STATO DEL GIOCATORE ---
  const [stats, setStats] = useState({ hp: 50, maxHp: 50, gold: 10, intel: 0, xp: 0, lvl: 1 });
  const [inventory, setInventory] = useState([]);
  const [quests, setQuests] = useState({}); 
  const [showMenu, setShowMenu] = useState(false);
  const [levelUpMsg, setLevelUpMsg] = useState(null); // Messaggio quando sali di livello

  const node = storyNodes[nodeId];

  // Logica Level Up: Controlla ogni volta che le statistiche cambiano
  useEffect(() => {
    const xpNeeded = stats.lvl * 100;
    if (stats.xp >= xpNeeded) {
      setStats(prev => ({
        ...prev,
        lvl: prev.lvl + 1,
        maxHp: prev.maxHp + 20,
        hp: prev.maxHp + 20, // Cura completa al level up
        xp: prev.xp - xpNeeded // Rimuovi XP usati o tienili (qui resetto parzialmente)
      }));
      setLevelUpMsg(`LEVEL UP! SEI ORA LIVELLO ${stats.lvl + 1}`);
      setTimeout(() => setLevelUpMsg(null), 3000);
    }
  }, [stats.xp]);

  const handleChoice = (choice) => {
    // 1. Controlli Risorse
    let canProceed = true;
    if (choice.consequences) {
      choice.consequences.forEach(c => {
        if (c.type === 'gold' && c.value < 0 && stats.gold + c.value < 0) canProceed = false;
      });
    }

    if (!canProceed) {
      alert("Risorse insufficienti!");
      return;
    }

    // 2. Applica Conseguenze
    if (choice.consequences) {
      const newStats = { ...stats };
      let newInv = [...inventory];
      const newQuests = { ...quests };

      choice.consequences.forEach(c => {
        if (c.type === 'hp') newStats.hp = Math.min(newStats.maxHp, newStats.hp + c.value);
        if (c.type === 'gold') newStats.gold += c.value;
        if (c.type === 'intel') newStats.intel += c.value;
        if (c.type === 'xp') newStats.xp += c.value; // Aggiunge XP
        
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

    // 3. Navigazione
    if (choice.nextNodeId === 'MAP') {
      setScreen('MAP');
    } else {
      setNodeId(choice.nextNodeId);
    }
  };

  const isChoiceVisible = (choice) => {
    if (choice.reqItem && !inventory.includes(choice.reqItem)) return false; 
    if (choice.reqQuestMissing && quests[choice.reqQuestMissing]) return false; 
    if (choice.reqLevel && stats.lvl < choice.reqLevel) return false; // Controllo Livello
    return true;
  };

  const currentBackground = screen === 'MAP' 
    ? worldMapImage 
    : (currentLocation?.bgImage || "https://art.pixilart.com/sr2c67676743936.png");

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden font-pixel text-white">
      
      {/* SFONDO */}
      <div className="absolute inset-0 z-0 transition-all duration-1000"
        style={{ backgroundImage: `url('${currentBackground}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.4)' }}>
      </div>
      <div className="scanlines"></div>

      {/* MESSAGGIO LEVEL UP */}
      {levelUpMsg && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-yellow-500 text-black border-4 border-white p-6 text-2xl animate-bounce">
            {levelUpMsg}
        </div>
      )}

      {/* HUD SUPERIORE */}
      <div className="relative z-20 w-full max-w-4xl bg-[#111] border-b-4 border-white p-2 flex justify-between items-center pixel-border mb-2 text-xs">
        <div className="flex gap-4 items-center">
           <div className="bg-blue-900 px-2 py-1 border border-blue-500">LVL {stats.lvl}</div>
           <div className="w-20 h-2 bg-gray-700 border border-gray-500 relative">
               <div className="h-full bg-blue-400" style={{ width: `${(stats.xp / (stats.lvl * 100)) * 100}%` }}></div>
           </div>
           <span className="text-red-500">HP {stats.hp}/{stats.maxHp}</span>
           <span className="text-yellow-500">ORO {stats.gold}</span>
        </div>
        <button onClick={() => setShowMenu(!showMenu)} className="pixel-btn px-2 py-1 text-[10px]">
          {showMenu ? 'CHIUDI' : 'ZAINO'}
        </button>
      </div>

      {/* MENU INVENTARIO */}
      {showMenu && (
        <div className="absolute z-50 top-16 w-full max-w-4xl bg-black/95 pixel-border p-4 grid grid-cols-2 gap-4 h-[400px]">
           <div className="border border-gray-600 p-2">
             <h3 className="text-yellow-400 mb-2 border-b border-gray-600">OGGETTI</h3>
             {inventory.length === 0 ? <p className="text-gray-500">Vuoto...</p> : inventory.map((itemKey, i) => (
               <div key={i} className="flex justify-between items-center bg-gray-900 p-1 mb-1">
                 <span>{itemsDb[itemKey].icon} {itemsDb[itemKey].name}</span>
                 {itemsDb[itemKey].type === 'consumable' && (
                   <button onClick={() => {
                       if(itemsDb[itemKey].effect === 'hp') {
                         setStats({...stats, hp: Math.min(stats.maxHp, stats.hp + itemsDb[itemKey].value)});
                         let newInv = [...inventory]; newInv.splice(i, 1); setInventory(newInv);
                       }
                     }} className="text-green-400 hover:underline">[USA]</button>
                 )}
               </div>
             ))}
           </div>
           <div className="border border-gray-600 p-2">
             <h3 className="text-blue-400 mb-2 border-b border-gray-600">QUEST</h3>
             {Object.keys(quests).map(qKey => (
               <div key={qKey} className="mb-2">
                 <div className={`text-sm ${quests[qKey] === 'completed' ? 'text-green-500 line-through' : 'text-white'}`}>{questsDb[qKey].title}</div>
                 <div className="text-[10px] text-gray-400">{questsDb[qKey].desc}</div>
               </div>
             ))}
           </div>
        </div>
      )}

      {/* AREA DI GIOCO */}
      <div className="relative z-10 w-full max-w-4xl h-[550px] flex">
        {screen === 'STORY' && node ? (
          <div className="w-full h-full flex flex-col justify-end pb-4">
            <div className="flex flex-col md:flex-row items-end gap-4 px-4">
              <div className="w-32 md:w-48 pixel-border bg-black/50 relative">
                 <img src={node.characterImage} className="w-full" alt="NPC" />
                 <div className="absolute bottom-0 w-full bg-blue-700 text-white text-center text-xs py-1 border-t-2 border-white">{node.characterName}</div>
              </div>
              <div className="flex-1 pixel-border p-4 bg-blue-900/95 text-white shadow-lg">
                <p className="mb-4 text-xs md:text-sm leading-relaxed">{node.text.replace('$GOLD$', stats.gold)}</p>
                <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto">
                  {node.choices.filter(isChoiceVisible).map((c, i) => (
                    <button key={i} onClick={() => handleChoice(c)} className="pixel-btn p-2 text-left text-xs flex justify-between">
                      <span>► {c.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative pixel-border bg-black/30 backdrop-blur-sm">
             <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 border border-white text-xs">MAPPA</div>
             {mapLocations.map(loc => (
               <button key={loc.id} onClick={() => { if(loc.status === 'UNLOCKED') setSelectedMapLoc(loc); }}
                 className={`absolute w-8 h-8 hover:scale-125 transition-transform ${loc.status === 'LOCKED' ? 'grayscale opacity-50' : 'cursor-pointer'}`}
                 style={{ left: `${loc.x}%`, top: `${loc.y}%` }}>
                  <div className="w-full h-full border-2 border-white shadow-[0_0_5px_black]" style={{ backgroundColor: loc.iconColor }}></div>
               </button>
             ))}
             {selectedMapLoc && (
               <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                 <div className="pixel-border p-4 bg-blue-900 max-w-xs text-center">
                   <h2 className="text-lg text-yellow-400 mb-2">{selectedMapLoc.name}</h2>
                   <img src={selectedMapLoc.bgImage} className="w-full h-24 object-cover border-2 border-white mb-2" />
                   <p className="text-[10px] mb-4 text-gray-200">{selectedMapLoc.description}</p>
                   <div className="flex flex-col gap-2">
                     {selectedMapLoc.actions.map(act => (
                       <button key={act.id} className="pixel-btn p-2 text-xs"
                         onClick={() => { setCurrentLocation(selectedMapLoc); setNodeId(act.storyNodeId); setScreen('STORY'); setSelectedMapLoc(null); }}>
                         VIAGGIA: {act.label}
                       </button>
                     ))}
                     <button onClick={() => setSelectedMapLoc(null)} className="text-red-300 mt-2 text-[10px] hover:underline">CHIUDI</button>
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
