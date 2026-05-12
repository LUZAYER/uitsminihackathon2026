import React from 'react';
import { Search, Bell, Settings, Radio } from 'lucide-react';
import { auth, signInWithGoogle } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export function TopNav() {
  const [user] = useAuthState(auth);

  return (
    <header className="fixed top-0 right-0 left-0 h-16 ml-20 md:ml-64 bg-cyber-navy/80 backdrop-blur-lg border-b border-cyber-border z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="font-bold text-lg tracking-tighter text-white/90 hidden sm:block">DEEPFAKE SHIELD AI</h2>
        <div className="h-6 w-px bg-cyber-border mx-2 hidden sm:block" />
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-cyber-border group focus-within:border-cyber-lime transition-colors">
          <Search className="w-4 h-4 text-white/40 group-focus-within:text-cyber-lime" />
          <input 
            type="text" 
            placeholder="SEARCH FORENSIC DATA..." 
            className="bg-transparent border-none focus:ring-0 text-xs font-mono w-48 lg:w-96 placeholder:text-white/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="text-white/40 hover:text-cyber-lime transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-white/40 hover:text-cyber-lime transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="text-white/40 hover:text-cyber-lime transition-colors">
            <Radio className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          {user ? (
            <>
              <div className="text-right hidden lg:block">
                <p className="text-xs font-mono font-bold text-cyber-lime uppercase">
                  {user.displayName?.split(' ')[0] || 'Analyst'}_{user.uid.slice(0,2).toUpperCase()}
                </p>
                <p className="text-[10px] font-mono text-white/40 uppercase">Alpha Clearance</p>
              </div>
              <img 
                src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full border border-cyber-lime/40 p-0.5"
              />
            </>
          ) : (
            <button 
              onClick={signInWithGoogle}
              className="text-xs font-mono font-bold text-cyber-lime border border-cyber-lime/30 px-3 py-1.5 rounded hover:bg-cyber-lime/10 transition-all"
            >
              ACCESS_SYSTEM
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
