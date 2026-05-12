import React from 'react';
import { Globe2, MapPin, Activity } from 'lucide-react';

export function Intel() {
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <span className="font-mono text-xs text-cyber-lime tracking-widest block mb-1 uppercase">Surveillance Level: OMEGA</span>
          <h1 className="text-4xl font-bold tracking-tighter text-white">GLOBAL INTEL MAP</h1>
        </div>
        <div className="flex gap-2">
           <span className="px-2 py-1 bg-cyber-lime/10 border border-cyber-lime/30 text-[10px] font-mono text-cyber-lime uppercase">LIVE_CONNECTION</span>
        </div>
      </div>
      
      <div className="flex-1 glass-panel rounded-2xl overflow-hidden relative group">
        <div className="absolute inset-0 grayscale contrast-125 brightness-[0.2] bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 radar-grid opacity-20" />
        
        {/* Mock Map Hotspots */}
        <div className="absolute top-1/4 left-1/3 group/pin">
          <div className="w-4 h-4 bg-cyber-lime rounded-full animate-ping absolute" />
          <div className="w-4 h-4 bg-cyber-lime rounded-full relative shadow-[0_0_15px_rgba(173,255,47,0.5)] cursor-pointer" />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-cyber-slate border border-white/10 p-2 rounded text-[10px] whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
            <span className="text-cyber-lime font-bold font-mono">EVENT_ID: 8821</span>
          </div>
        </div>

        <div className="absolute top-1/2 right-1/4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse relative shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
        </div>

        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          <div className="glass-panel p-4 flex items-center gap-4">
             <div className="text-right">
                <p className="text-[10px] font-mono text-white/40">LATENCY</p>
                <p className="text-xs font-mono text-cyber-lime">12ms</p>
             </div>
             <Activity className="w-4 h-4 text-cyber-lime" />
          </div>
        </div>
      </div>
    </div>
  );
}
