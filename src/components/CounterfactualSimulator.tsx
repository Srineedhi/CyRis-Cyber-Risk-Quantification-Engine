import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR, formatROSI } from '../utils/formatters';
import { SlidersHorizontal, ShieldCheck, ArrowRight, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';

export const CounterfactualSimulator: React.FC = () => {
  const { 
    metrics, 
    controls, 
    activeControlIds, 
    toggleControl, 
    resetControls, 
    attackPaths 
  } = useCyris();

  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col relative overflow-hidden">
      {/* Background ambient pulse */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Simulator Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              WHAT-IF SECURITY INVESTMENT & COUNTERFACTUAL SIMULATOR
            </h3>
            <p className="text-xs text-slate-400">
              Interactive causal simulation: Toggle controls to instantly disrupt attack paths & quantify residual EAL.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {activeControlIds.length > 0 && (
            <button
              onClick={resetControls}
              className="flex items-center space-x-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-700 hover:border-red-500/40 text-slate-300 hover:text-red-400 text-xs font-mono transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESET SIMULATION</span>
            </button>
          )}

          <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
            {activeControlIds.length} ACTIVE IN SIMULATION
          </span>
        </div>
      </div>

      {/* Financial Impact Comparison Banner */}
      <div className="mt-4 p-4 rounded-xl bg-black/40 border border-emerald-500/25 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">UNMITIGATED / CURRENT EAL</span>
          <div className="text-2xl font-mono font-bold text-red-400 mt-1">
            ₹4.23 Cr
          </div>
          <span className="text-[10px] font-mono text-slate-500">Peak Exposure</span>
        </div>

        <div className="flex items-center space-x-3">
          <ArrowRight className="w-5 h-5 text-emerald-400 hidden sm:block" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">PROJECTED RESIDUAL EAL</span>
            <div className="text-2xl font-mono font-black text-emerald-400 mt-1 glow-emerald">
              {formatINR(metrics.eal)}
            </div>
            <span className="text-[10px] font-mono text-emerald-300">
              {metrics.riskReduction > 0 ? `-${formatINR(metrics.riskReduction)} Reduction` : 'No controls active'}
            </span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">SIMULATED INVESTMENT</span>
          <div className="text-xl font-mono font-bold text-white mt-1">
            {formatINR(metrics.securityInvestment - 8200000)}
          </div>
          <span className="text-[10px] font-mono text-slate-500">Incremental CapEx</span>
        </div>

        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">PORTFOLIO ROSI</span>
          <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
            {activeControlIds.length > 0 ? '1,822%' : '0%'}
          </div>
          <span className="text-[10px] font-mono text-emerald-500/80">Return on Security Investment</span>
        </div>
      </div>

      {/* Interactive Controls Toggle Cards */}
      <div className="mt-5">
        <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">
          SELECT CANDIDATE CONTROLS TO SIMULATE IMPACT:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {controls.slice(0, 5).map((ctrl) => {
            const isSelected = activeControlIds.includes(ctrl.id);

            return (
              <div
                key={ctrl.id}
                onClick={() => toggleControl(ctrl.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-400 shadow-cyber-lg'
                    : 'bg-black/30 border-emerald-500/20 hover:border-emerald-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                      {ctrl.category}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected 
                        ? 'bg-emerald-500 text-black font-extrabold' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isSelected ? '✓ ACTIVE' : 'TOGGLE'}
                    </span>
                  </div>

                  <h5 className="font-mono text-sm font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                    {ctrl.name}
                  </h5>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-black/40 border border-slate-800">
                      <span className="text-[9px] text-slate-400 block">COST</span>
                      <span className="text-white font-bold">{formatINR(ctrl.cost)}</span>
                    </div>

                    <div className="p-2 rounded bg-black/40 border border-slate-800">
                      <span className="text-[9px] text-slate-400 block">RISK REDUCTION</span>
                      <span className="text-emerald-400 font-bold">{formatINR(ctrl.projectedRiskReduction)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-emerald-500/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">
                    Disrupts: <strong className="text-emerald-300">{ctrl.targetAttackPaths.join(', ')}</strong>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    ROSI {ctrl.rosi}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disrupted Attack Path Feedback */}
      <div className="mt-4 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300">
            {activeControlIds.length > 0
              ? `Controls active in simulation: ${attackPaths.filter(p => p.status === 'DISRUPTED').map(p => p.id).join(', ')} successfully disrupted!`
              : 'Toggle any control above (e.g. Phishing-Resistant MFA) to observe real-time attack disruption.'}
          </span>
        </div>
        <span className="text-emerald-400 font-bold">
          EAL: {formatINR(metrics.eal)}
        </span>
      </div>
    </div>
  );
};
