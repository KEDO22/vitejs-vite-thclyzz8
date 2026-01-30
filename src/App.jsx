import { useState } from 'react';
import { mapLocations, storyNodes } from './data';

export default function App() {
  const [screen, setScreen] = useState('STORY');
  const [nodeId, setNodeId] = useState('start');
  const [selectedLoc, setSelectedLoc] = useState(null); // Per gestire il popup della mappa
  
  const node = storyNodes[nodeId];

  // Funzione per ottenere il colore in base alla regione
  const getRegionStyle = (region) => {
    switch(region) {
      case 'EMPIRE': return 'bg-gray-400 border-gray-600 shadow-[0_0_10px_gray]';
      case 'DOMINION': return 'bg-purple-500 border-purple-300 shadow-[0_0_10px_purple]';
      case 'FREELANDS': return 'bg-amber-500 border-amber-300 shadow-[0_0_10px_orange]';
      default: return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-4">
      
      {/* Titolo */}
      <h1 className="text-3xl font-bold mb-6 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-500">
        AETHELGARD
      </h1>
      
      {screen === 'STORY' && node ? (
        // --- SCHERMATA STORIA ---
        <div className="bg-slate-900/90 p-8 rounded-xl border border-slate-700 max-w-2xl w-full shadow-2xl relative overflow-hidden">
          {/* Decorazione in alto */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 via-amber-500 to-purple-500"></div>
          
          <h2 className="text-3xl font-bold mb-6 text-amber-100 font-serif">{node.title}</h2>
          <p className="mb-10 text-gray-300 text-lg leading-relaxed">{node.text}</p>
          
          <div className="grid gap-3">
            {node.choices.map((c, i) => (
              <button 
                key={i}
                onClick={() => {
                  if (c.nextNodeId === 'MAP') setScreen('MAP');
                  else setNodeId(c.nextNodeId);
                }}
                className="w-full text-left px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded border border-slate-600 hover:border-amber-500 transition-all flex justify-between group"
              >
                <span className="group-hover:text-amber-400 transition-colors font-medium">{c.text}</span>
                <span className="text-slate-500 group-hover:translate-x-1 transition-transform">➜</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // --- SCHERMATA MAPPA ---
        <div className="relative w-full max-w-4xl h-[600px] bg-slate-900 rounded-xl border-2 border-slate-700 shadow-2xl overflow-hidden group">
           
           {/* SFONDO MAPPA (Pattern e Sfumature) */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #334155 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/80"></div>
           
           {/* Titolo Mappa */}
           <div className="absolute top-4 left-4 bg-black/60 px-4 py-2 rounded backdrop-blur border border-slate-600 z-10">
             <span className="text-xs text-gray-400 uppercase tracking-widest block">Mappa del Mondo</span>
             <span className="font-bold text-white">Regioni Conosciute</span>
           </div>

           {/* PUNTI SULLA MAPPA */}
           {mapLocations.map(loc => (
             <button
               key={loc.id}
               onClick={() => loc.status === 'UNLOCKED' && setSelectedLoc(loc)}
               disabled={loc.status === 'LOCKED'}
               className={`absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20
                 ${getRegionStyle(loc.region)}
                 ${loc.status === 'LOCKED' ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:scale-150 cursor-pointer'}
               `}
               style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
             >
                {/* Etichetta hover */}
                <span className="absolute top-8 left-1/2 -translate-x-1/2 w-max bg-black/80 px-2 py-1 text-xs rounded text-white opacity-0 hover:opacity-100 pointer-events-none transition-opacity border border-slate-600 z-30">
                  {loc.name}
                </span>
             </button>
           ))}

           {/* POPUP DETTAGLI LUOGO (appare quando clicchi un punto) */}
           {selectedLoc && (
             <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
               <div className="bg-slate-800 p-6 rounded-lg border border-slate-500 max-w-sm w-full shadow-2xl relative">
                 <button onClick={() => setSelectedLoc(null)} className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl">×</button>
                 
                 <h2 className="text-2xl font-bold text-white mb-1">{selectedLoc.name}</h2>
                 <p className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest">{selectedLoc.region}</p>
                 <p className="text-gray-300 mb-6 italic text-sm">{selectedLoc.description}</p>
                 
                 <div className="space-y-2">
                   {selectedLoc.actions.map(action => (
                     <button
                       key={action.id}
                       onClick={() => {
                         setNodeId(action.storyNodeId);
                         setScreen('STORY');
                         setSelectedLoc(null);
                       }}
                       className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 hover:border-amber-400 transition-colors flex justify-between"
                     >
                       <span>{action.label}</span>
                       <span className="text-gray-400">➜</span>
                     </button>
                   ))}
                 </div>
               </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
}
