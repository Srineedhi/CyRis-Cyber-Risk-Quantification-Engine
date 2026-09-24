import React, { useState, useEffect } from 'react';
import { useCyris } from '../context/CyrisContext';
import { Shield, Play, RotateCcw, Activity, User, Bell, Settings, Radio } from 'lucide-react';

export const Header: React.FC = () => {
  const { demoActive, startDemo, stopDemo, replayScenario, activePage, setActivePage } = useCyris();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050706]/95 backdrop-blur-md border-b border-emerald-500/20 px-4 py-2.5 flex items-center justify-between">
      {/* Brand & Wordmark */}
      <div className="flex items-center space-x-3.5">
        <div 
          onClick={() => setActivePage('overview')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center shadow-cyber group-hover:border-emerald-400 transition-all">
            <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 rounded-lg bg-emerald-500/10 animate-pulse-glow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xl font-black tracking-wider text-white">
                CY<span className="text-emerald-400">RIS</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold">
                v2.4 QUANT
              </span>
            </div>
            <div className="text-[10px] tracking-widest text-slate-400 uppercase font-mono flex items-center space-x-1">
              <span>CYBER RISK INFORMATION SYSTEM</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-500/80">SIH26105</span>
            </div>
          </div>
        </div>

        {/* Status Pill */}
        <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-emerald-500/20">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
              LIVE
            </span>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-300">
            <Radio className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-400">ENV:</span>
            <span className="font-semibold text-emerald-300">SYNTHETIC BANKING ENVIRONMENT</span>
          </div>
        </div>
      </div>

      {/* Center / Action Controls */}
      <div className="flex items-center space-x-2.5">
        <button
          onClick={demoActive ? stopDemo : startDemo}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded text-xs font-mono font-bold transition-all shadow-cyber ${
            demoActive 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30' 
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30 hover:border-emerald-400'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${demoActive ? 'animate-spin' : ''}`} />
          <span>{demoActive ? 'EXIT GUIDED DEMO' : 'START CYRIS DEMO'}</span>
        </button>

        <button
          onClick={replayScenario}
          title="Replay Intrusion & Spike Scenario"
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-slate-900/80 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 text-xs font-mono transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">REPLAY SCENARIO</span>
        </button>
      </div>

      {/* Right Side: Telemetry Time, System Status & User */}
      <div className="flex items-center space-x-3.5">
        <div className="hidden lg:flex flex-col items-end">
          <div className="text-[10px] font-mono text-slate-400">LAST TELEMETRY INGEST</div>
          <div className="font-mono text-xs font-semibold text-emerald-400">{timeStr}</div>
        </div>

        <div className="hidden xl:flex items-center space-x-2 px-2.5 py-1 rounded bg-emerald-950/30 border border-emerald-500/20">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-mono text-emerald-300">5 ENGINES OPERATIONAL</span>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-2 pl-3 border-l border-emerald-500/20">
          <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <User className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-white leading-tight">Dr. A. Verma</span>
            <span className="text-[10px] font-mono text-emerald-400/90 leading-tight">CHIEF RISK OFFICER / CISO</span>
          </div>

          <button 
            onClick={() => setActivePage('settings')}
            className={`p-1.5 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors ${
              activePage === 'settings' ? 'text-emerald-400 bg-slate-800' : ''
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
