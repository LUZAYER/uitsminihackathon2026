import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Cpu, HardDrive, Wifi } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const INITIAL_LOGS = [
  "[BOOT] DEEPFAKE SHIELD AI v3.4.0 Initializing...",
  "[INIT] Neural Engines: ONLINE",
  "[INIT] Forensic DB: CONNECTED",
  "[INIT] Global Intel Feed: SYNCED",
  "[SEC] Encryption Handshake: SUCCESS",
  "[SYS] Operating Node: ASIA-SOUTH-1-MUMBAI",
];

export function Terminal() {
  const [logs, setLogs] = useState<string[]>(INITIAL_LOGS);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedLogs = [
        `[INTEL] Incoming packet from NODE_${Math.floor(Math.random() * 9999)}`,
        `[PROCESS] Analyzing frame buffer ${Math.floor(Math.random() * 1000)}...`,
        `[CACHE] Purging temporary forensic artifacts`,
        `[SYS] CPU Load: ${Math.floor(Math.random() * 40) + 20}%`,
      ];
      setLogs(prev => [...prev, simulatedLogs[Math.floor(Math.random() * simulatedLogs.length)]].slice(-50));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLogs(prev => [...prev, `> ${input}`, `[CMD] Command '${input}' not recognized or permission denied.`]);
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <span className="font-mono text-xs text-cyber-lime tracking-widest block mb-1 uppercase">Level 4 Access Required</span>
          <h1 className="text-4xl font-bold tracking-tighter text-white">SYSTEM TERMINAL</h1>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass-panel flex flex-col overflow-hidden font-mono text-xs">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-3 h-3 text-cyber-lime" />
              <span className="text-[10px] font-bold text-white/40">ANALYST_SHELL_V1</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-cyber-lime" />
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-1 bg-black/40">
            {logs.map((log, i) => (
              <div key={i} className={cn(
                "transition-opacity duration-300",
                log.startsWith('>') ? "text-cyber-lime font-bold" : "text-white/60"
              )}>
                <span className="opacity-40 mr-3">[{new Date().toLocaleTimeString()}]</span>
                {log}
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
          <form onSubmit={handleCommand} className="p-4 bg-white/5 border-t border-white/10 flex items-center gap-3">
             <span className="text-cyber-lime font-bold font-mono">analyst@shield_ai:~$</span>
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               className="flex-1 bg-transparent border-none focus:ring-0 text-white/80"
               autoFocus
             />
          </form>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-4">Hardware Stats</h3>
            <div className="space-y-4">
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-white/40">NEURAL_CORES</span>
                    <span className="text-cyber-lime">92%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-lime w-[92%]" />
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-white/40">IO_THROUGHPUT</span>
                    <span className="text-cyber-lime">12.4 GB/S</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-lime w-[45%]" />
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-white/40">TEMP_MTIC</span>
                    <span className="text-cyber-alert">42°C</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-alert w-[68%]" />
                  </div>
               </div>
            </div>
          </div>

          <div className="glass-panel p-6 flex flex-col items-center justify-center gap-4 aspect-square">
             <div className="w-24 h-24 rounded-full border-4 border-cyber-lime/10 border-t-cyber-lime animate-spin flex items-center justify-center">
                <ShieldIcon className="w-10 h-10 text-cyber-lime" />
             </div>
             <p className="text-[10px] font-mono text-white/40 text-center uppercase tracking-widest">Integrity Pulse</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}
