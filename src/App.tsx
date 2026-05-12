import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Dashboard } from './pages/Dashboard';
import { Forensics } from './pages/Forensics';
import { Intel } from './pages/Intel';
import { EvidenceLocker } from './pages/EvidenceLocker';
import { Terminal } from './pages/Terminal';
import { TrustGraph } from './pages/TrustGraph';

// Placeholder for other pages
function SimplePlaceholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] glass-panel rounded-2xl border-dashed border-2 border-white/5 opacity-40">
      <h2 className="text-xl font-mono tracking-widest text-white/40 uppercase">{title}_MODULE_PENDING</h2>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cyber-navy text-white selection:bg-cyber-lime selection:text-cyber-navy">
        <Sidebar />
        <main className="ml-20 md:ml-64 flex flex-col min-h-screen">
          <TopNav />
          <div className="flex-1 mt-16 p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/forensics" element={<Forensics />} />
              <Route path="/intel" element={<Intel />} />
              <Route path="/locker" element={<EvidenceLocker />} />
              <Route path="/trust" element={<TrustGraph />} />
              <Route path="/terminal" element={<Terminal />} />
            </Routes>
          </div>
        </main>

        {/* Cinematic Glitch Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(var(--color-cyber-lime) 0.5px, transparent 0.5px)', 
            backgroundSize: '24px 24px' 
          }} 
        />
      </div>
    </Router>
  );
}
