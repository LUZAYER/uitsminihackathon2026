import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Fingerprint, 
  Verified, 
  FolderOpen, 
  Globe, 
  Terminal,
  Shield,
  Zap
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Fingerprint, label: 'Forensics', path: '/forensics' },
  { icon: Verified, label: 'Trust Graph', path: '/trust' },
  { icon: FolderOpen, label: 'Evidence Locker', path: '/locker' },
  { icon: Globe, label: 'Global Intel', path: '/intel' },
  { icon: Terminal, label: 'System Terminal', path: '/terminal' },
];

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-cyber-slate border-r border-cyber-border flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-cyber-lime rounded flex items-center justify-center">
          <Shield className="text-cyber-navy w-6 h-6" fill="currentColor" />
        </div>
        <div className="hidden md:block">
          <h1 className="font-bold text-lg text-cyber-lime leading-tight">Shield AI</h1>
          <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Forensic Unit 07</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group",
              isActive 
                ? "bg-cyber-lime text-cyber-navy font-semibold" 
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="hidden md:block text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button 
          onClick={() => navigate('/forensics')}
          className="w-full bg-cyber-lime text-cyber-navy font-mono font-bold py-4 rounded text-xs tracking-tighter hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span className="hidden md:block uppercase">Initiate Scan</span>
        </button>
      </div>
    </aside>
  );
}
