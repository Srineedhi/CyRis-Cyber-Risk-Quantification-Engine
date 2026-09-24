import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { NavigationPage } from '../types';
import { 
  LayoutDashboard, 
  TrendingUp, 
  GitFork, 
  Server, 
  Bug, 
  ShieldCheck, 
  Scale, 
  SlidersHorizontal, 
  PieChart, 
  Wrench, 
  FileCheck2, 
  FileKey, 
  Terminal, 
  Settings2,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  id: NavigationPage;
  index: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', index: '01', label: 'OVERVIEW', icon: LayoutDashboard },
  { id: 'live-risk', index: '02', label: 'LIVE RISK', icon: TrendingUp },
  { id: 'attack-graph', index: '03', label: 'ATTACK GRAPH', icon: GitFork, badge: 'HERO' },
  { id: 'asset-inventory', index: '04', label: 'ASSET INVENTORY', icon: Server },
  { id: 'vulnerabilities', index: '05', label: 'VULNERABILITIES', icon: Bug, badge: '4 CVE' },
  { id: 'controls', index: '06', label: 'CONTROLS', icon: ShieldCheck },
  { id: 'ai-debate', index: '07', label: 'AI DEBATE', icon: Scale, badge: '3-AGENT' },
  { id: 'what-if', index: '08', label: 'WHAT-IF SIMULATOR', icon: SlidersHorizontal, badge: 'HOT' },
  { id: 'optimizer', index: '09', label: 'INVESTMENT OPTIMIZER', icon: PieChart },
  { id: 'remediation', index: '10', label: 'REMEDIATION', icon: Wrench, badge: 'PR #419' },
  { id: 'compliance', index: '11', label: 'COMPLIANCE', icon: FileCheck2 },
  { id: 'audit', index: '12', label: 'AUDIT & PROOF', icon: FileKey, badge: 'VERIFIABLE' },
  { id: 'telemetry', index: '13', label: 'SYSTEM TELEMETRY', icon: Terminal },
  { id: 'settings', index: '14', label: 'SETTINGS', icon: Settings2 },
];

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage } = useCyris();

  return (
    <aside className="w-64 flex-shrink-0 bg-[#060a08]/90 border-r border-emerald-500/15 flex flex-col h-[calc(100vh-57px)] sticky top-[57px] select-none">
      {/* Platform Info Banner */}
      <div className="p-3 border-b border-emerald-500/10 bg-emerald-950/20">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
            ENTERPRISE CONSOLE
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
            PROD-BANK-01
          </span>
        </div>
        <div className="mt-1 text-[11px] text-slate-400 truncate">
          Continuous Risk Quantification
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs font-mono transition-all group ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-cyber font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <span className={`text-[10px] ${isActive ? 'text-emerald-400 font-bold' : 'text-slate-600 group-hover:text-slate-400'}`}>
                  {item.index}
                </span>
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400/70'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center space-x-1.5 flex-shrink-0">
                {item.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                    isActive 
                      ? 'bg-emerald-500/30 text-emerald-200' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer System Telemetry Status */}
      <div className="p-3 border-t border-emerald-500/15 bg-black/40">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>MONTE CARLO ITERATIONS</span>
          <span className="text-emerald-400 font-semibold">100,000 / RUN</span>
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1.5 overflow-hidden">
          <div className="bg-emerald-500 h-full w-[94%] animate-pulse" />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] font-mono text-slate-500">
          <span>SLE CONFIDENCE 99.4%</span>
          <span>LATENCY 42ms</span>
        </div>
      </div>
    </aside>
  );
};
