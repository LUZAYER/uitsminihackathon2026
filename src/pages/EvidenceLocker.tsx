import React, { useEffect, useState } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FolderOpen, FileText, Shield, AlertTriangle, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function EvidenceLocker() {
  const [user] = useAuthState(auth);
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'investigations'),
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCases(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] glass-panel text-center p-8">
        <AlertTriangle className="w-12 h-12 text-cyber-alert mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">ACCESS_DENIAL_DETECTED</h2>
        <p className="text-sm text-white/40 max-w-xs">Authentication required to access classified evidence locker. Please sign in via the terminal.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 text-cyber-lime mb-2">
            <FolderOpen className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Encrypted Archive / Locker 07</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-white">EVIDENCE LOCKER</h1>
        </div>
        <div className="flex items-center gap-3 glass-panel px-4 py-2 bg-white/5 rounded-lg border border-white/5">
          <Search className="w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="FILTER BY CASE_ID..." 
            className="bg-transparent border-none focus:ring-0 text-xs font-mono w-48 placeholder:text-white/20"
          />
        </div>
      </section>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-panel h-48 animate-pulse" />
          ))}
        </div>
      ) : cases.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/5 rounded-2xl opacity-40">
           <FileText className="w-12 h-12 mb-4" />
           <p className="font-mono text-xs uppercase tracking-widest">No evidence records found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.id} className="glass-panel p-6 hover:border-cyber-lime/40 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded bg-white/5 border border-white/10", 
                  c.trustScore < 50 ? "text-red-400" : "text-cyber-lime"
                )}>
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Authenticity</p>
                  <p className={cn("text-xl font-bold font-mono", 
                     c.trustScore < 50 ? "text-red-400" : "text-white"
                  )}>{c.trustScore}%</p>
                </div>
              </div>
              <h3 className="font-bold text-white group-hover:text-cyber-lime transition-colors truncate mb-1 uppercase tracking-tight">{c.fileName}</h3>
              <p className="text-[10px] font-mono text-white/40 mb-4">{c.id.slice(0, 12).toUpperCase()}</p>
              
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                 <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold border",
                    c.verdict === 'Authentic' ? "text-cyber-lime border-cyber-lime/20" : "text-red-400 border-red-400/20"
                 )}>
                   {c.verdict}
                 </span>
                 <span className="text-[10px] font-mono text-white/40">
                    {c.createdAt?.toDate().toLocaleDateString()}
                 </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
