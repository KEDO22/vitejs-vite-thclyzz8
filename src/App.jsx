import { useState } from 'react';
import { mapLocations, storyNodes } from './data';

export default function App() {
  const [screen, setScreen] = useState('STORY');
  const [nodeId, setNodeId] = useState('start');

  const node = storyNodes[nodeId];

  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Aethelgard RPG</h1>

      {screen === 'STORY' && node ? (
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-600 max-w-lg w-full shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">{node.title}</h2>
          <p className="mb-8 text-gray-300 text-lg">{node.text}</p>
          <div className="flex flex-col gap-3">
            {node.choices.map((c, i) => (
              <button 
                key={i}
                onClick={() => {
                  if (c.nextNodeId === 'MAP') setScreen('MAP');
                  else setNodeId(c.nextNodeId);
                }}
                className="w-full text-left p-4 bg-slate-700 hover:bg-slate-600 rounded border border-slate-500 hover:border-yellow-400 transition-all"
              >
                ➤ {c.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative w-[350px] h-[350px] bg-slate-900 border-2 border-slate-500 rounded-xl shadow-inner overflow-hidden">
           <div className="absolute top-2 left-2 text-xs text-gray-500 bg-black/50 px-2 rounded">Mappa</div>
           {mapLocations.map(loc => (
             <button
               key={loc.id}
               onClick={() => {
                 setNodeId(loc.actions[0].storyNodeId);
                 setScreen('STORY');
               }}
               className="absolute w-8 h-8 bg-yellow-500 rounded-full hover:scale-125 border-2 border-white shadow-[0_0_10px_orange] transition-transform cursor-pointer"
               style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
             >
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] w-max bg-black px-1 rounded">{loc.name}</span>
             </button>
           ))}
        </div>
      )}
    </div>
  );
}
