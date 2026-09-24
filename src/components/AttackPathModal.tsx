import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { X, GitFork, ShieldAlert, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AttackPathModal: React.FC = () => {
  const { selectedAttackPath, setSelectedAttackPath, toggleControl, activeControlIds } = useCyris();

  if (!selectedAttackPath) return null;

  const isDisrupted = selectedAttackPath.status === 'DISRUPTED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#070c09] border border-emerald-500/40 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 border-b border-emerald-500/20 bg-black/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className={`p-1.5 rounded ${isDisrupted ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400' : 'bg-red-950/60 border border-red-500/40 text-red-400'}`}>
              <GitFork className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-bold text-white uppercase">{selectedAttackPath.id}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  isDisrupted 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}>
                  STATUS: {selectedAttackPath.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{selectedAttackPath.title}</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedAttackPath(null)}
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-slate-400 uppercase">BLAST RADIUS</span>
              <div className="text-lg font-mono font-bold text-red-400 mt-0.5">
                {formatINR(selectedAttackPath.financialBlastRadius)}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-slate-400 uppercase">LIKELIHOOD</span>
              <div className="text-lg font-mono font-bold text-emerald-300 mt-0.5">
                {selectedAttackPath.likelihood}%
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-slate-400 uppercase">CRITICALITY</span>
              <div className="text-sm font-mono font-bold text-white mt-1">
                {selectedAttackPath.criticality}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-slate-400 uppercase">CONTROLS BLOCKING</span>
              <div className="text-lg font-mono font-bold text-emerald-400 mt-0.5">
                {selectedAttackPath.controlsBlocking} / {selectedAttackPath.totalControlsNeeded}
              </div>
            </div>
          </div>

          {/* Target & Entry Point info */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-slate-400">ENTRY POINT:</span>{' '}
              <strong className="text-emerald-400">{selectedAttackPath.entryPoint}</strong>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <div>
              <span className="text-slate-400">TARGET:</span>{' '}
              <strong className="text-red-400">{selectedAttackPath.target}</strong>
            </div>
          </div>

          {/* Sequential Attack Chain Steps */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              SEQUENTIAL EXPLOIT CHAIN & MITRE TACTICS
            </h4>
            <div className="space-y-2">
              {selectedAttackPath.edges.map((edge, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-black/30 border border-emerald-500/15 flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <div className="text-white font-semibold">
                        {edge.from} &rarr; {edge.to}
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{edge.technique}</div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px] uppercase font-bold">
                    {edge.tactic}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Disruption Recommendation */}
          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/40">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  COUNTERFACTUAL CONTROL DISRUPTION
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Deploying <strong className="text-white">{selectedAttackPath.disruptingControl}</strong> breaks this exploit sequence at Step 2.
                </p>
              </div>

              <button
                onClick={() => {
                  toggleControl('ctrl-mfa');
                }}
                className={`px-3.5 py-1.5 rounded text-xs font-mono font-bold transition-all shadow-cyber ${
                  activeControlIds.includes('ctrl-mfa')
                    ? 'bg-emerald-500 text-black'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
                }`}
              >
                {activeControlIds.includes('ctrl-mfa') ? '✓ CONTROL DEPLOYED' : 'TOGGLE MFA TO DISRUPT'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
