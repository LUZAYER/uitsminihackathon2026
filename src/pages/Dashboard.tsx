import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  BarChart3, 
  Activity, 
  Globe2, 
  AlertTriangle,
  History,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { db, auth } from '../lib/firebase';
import { collection, query, limit, orderBy, onSnapshot, getCountFromServer } from 'firebase/firestore';

export function Dashboard() {
  const [activeCases, setActiveCases] = useState<any[]>([]);
  const [totalCases, setTotalCases] = useState(124); // Start with mock but update
  const [trustScoreAvg, setTrustScoreAvg] = useState(64.2);

  useEffect(() => {
    // Fetch latest cases from Firestore
    const q = query(collection(db, 'investigations'), orderBy('createdAt', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id.slice(0, 8).toUpperCase(), 
        title: doc.data().fileName,
        status: doc.data().verdict?.toUpperCase() || 'PENDING',
        match: doc.data().trustScore || 0,
        color: (doc.data().trustScore || 0) < 50 ? 'bg-red-500' : 'bg-cyber-lime'
      }));
      if (data.length > 0) setActiveCases(data);
    });

    // Get total count
    const getCounts = async () => {
      try {
        const coll = collection(db, 'investigations');
        const snapshot = await getCountFromServer(coll);
        if (snapshot.data().count > 0) {
          setTotalCases(124 + snapshot.data().count);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getCounts();

    return () => unsubscribe();
  }, []);

  const stats = [
    { label: 'Global Trust Index', value: `${trustScoreAvg}%`, trend: '+2.1%', color: 'text-cyber-lime' },
    { label: 'Active Threat Vectors', value: '12', trend: 'High', color: 'text-cyber-alert' },
    { label: 'Detection Efficiency', value: '98.8%', trend: '+0.5%', color: 'text-cyber-lime' },
    { label: 'Total Investigations', value: totalCases.toLocaleString(), trend: '+120k', color: 'text-cyber-lime' },
  ];
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-8">
        <div>
          <span className="font-mono text-xs text-cyber-lime tracking-widest block mb-1 uppercase">Operating Environment: ACTIVE</span>
          <h1 className="text-4xl font-bold tracking-tighter text-white">CENTRAL COMMAND</h1>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-2 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyber-lime animate-pulse" />
            <span className="font-mono text-xs text-white/60">NODE: ASIA-SOUTH-1</span>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center gap-3">
            <span className="font-mono text-xs text-white/60">LATENCY: 12ms</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gemini Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 glass-panel p-8 flex flex-col justify-between min-h-[300px]"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <ShieldAlert className="w-5 h-5 text-cyber-lime" />
              <h3 className="text-xs font-mono font-bold text-white/40 tracking-wider">GEMINI ANALYST SUMMARY</h3>
            </div>
            <p className="text-2xl font-medium leading-relaxed text-white/90 max-w-3xl">
              Global digital trust has stabilized at <span className="text-cyber-lime font-bold">64.2%</span> following a coordinated surge in synthetic audio campaigns targeting European financial hubs. Current threat vectors indicate a 12% rise in high-fidelity video manipulation.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/5">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className={cn("text-2xl font-bold font-mono", stat.color)}>{stat.value}</p>
                <p className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Global Map Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 glass-panel overflow-hidden flex flex-col relative min-h-[300px]"
        >
          <div className="absolute top-0 inset-x-0 p-4 z-10 flex justify-between items-center bg-gradient-to-b from-cyber-navy/80 to-transparent">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-cyber-lime" />
              <h3 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">THREAT FEED</h3>
            </div>
            <span className="px-2 py-0.5 rounded border border-cyber-lime/40 text-cyber-lime text-[9px] font-bold">LIVE_INTEL</span>
          </div>
          <div className="flex-1 bg-cyber-navy/40 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20 radar-grid" />
            <div className="relative w-full h-full bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000')] bg-cover bg-center brightness-[0.3]" />
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-cyber-lime rounded-full animate-ping" />
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Recent Cases */}
        <section className="lg:col-span-4 glass-panel flex flex-col h-full">
          <div className="p-4 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-white/40" />
              <h3 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest">RECENT_INVESTIGATIONS</h3>
            </div>
            <button className="text-[10px] text-cyber-lime hover:underline font-bold">VIEW ALL</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
            {activeCases.map((c, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-mono text-white/40">{c.id}</span>
                  <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold border", 
                    c.status === 'SYNTHETIC' ? "text-red-400 border-red-400/20" : "text-cyber-lime border-cyber-lime/20"
                  )}>
                    {c.status}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-white group-hover:text-cyber-lime transition-colors">{c.title}</h4>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className={cn("h-full", c.color)} style={{ width: `${c.match}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-white/40">{c.match}% Match</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real-time Performance Metrics */}
        <section className="lg:col-span-8 glass-panel p-6 flex flex-col md:flex-row items-center gap-8">
           <div className="flex items-center gap-3 pr-8 md:border-r border-white/5">
            <Activity className="w-5 h-5 text-cyber-lime" />
            <h3 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest whitespace-nowrap">SYSTEM_HEALTH</h3>
          </div>
          <div className="flex-1 flex flex-wrap gap-8 items-center justify-around w-full">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">Neural_Load</span>
              <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-cyber-lime w-2/3" />
              </div>
              <span className="text-xs font-mono text-cyber-lime">68%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">Storage_I/O</span>
              <span className="text-xs font-mono text-cyber-lime">4.2 GB/s</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">Uptime</span>
              <span className="text-xs font-mono text-cyber-lime">342:11:05</span>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-cyber-lime/10 border border-cyber-lime/20 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-lime animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-cyber-lime uppercase tracking-widest">Nominal</span>
          </div>
        </section>
      </div>
    </div>
  );
}
