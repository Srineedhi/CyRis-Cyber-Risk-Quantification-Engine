import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { ShieldCheck, ToggleLeft, ToggleRight, DollarSign, Zap } from 'lucide-react';

export const ControlsView: React.FC = () => {
  const { controls, activeControlIds, toggleControl } = useCyris();

  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              SECURITY CONTROLS &amp; DEFENSIVE CAPABILITIES REGISTER
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated Controls, Implementation Costs, Attack Path Interception &amp; ROSI
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold">
          {controls.length} REGISTERED ENTERPRISE CONTROLS
        </span>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {controls.map((ctrl) => {
          const isEnabled = activeControlIds.includes(ctrl.id) || ctrl.status === 'ENABLED';

          return (
            <div
              key={ctrl.id}
              className={`p-4 rounded-xl border font-mono text-xs flex flex-col justify-between transition-all ${
                isEnabled
                  ? 'bg-emerald-950/30 border-emerald-500/40 shadow-cyber'
                  : 'bg-black/40 border-emerald-500/15'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {ctrl.category}
                  </span>

                  <button
                    onClick={() => toggleControl(ctrl.id)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                      isEnabled
                        ? 'bg-emerald-500 text-black'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {isEnabled ? '● ACTIVE' : '○ SIMULATE'}
                  </button>
                </div>

                <h4 className="text-white font-bold text-sm mt-2">{ctrl.name}</h4>

                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">CapEx / Cost:</span>
                    <span className="text-white font-bold">{formatINR(ctrl.cost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk Reduction:</span>
                    <span className="text-emerald-400 font-bold">{formatINR(ctrl.projectedRiskReduction)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Effectiveness:</span>
                    <span className="text-emerald-300 font-bold">{ctrl.effectiveness}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ROSI:</span>
                    <span className="text-emerald-400 font-bold">{ctrl.rosi}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-emerald-500/15 flex items-center justify-between text-[11px] text-slate-400">
                <span>Interceps: {ctrl.targetAttackPaths.join(', ')}</span>
                <span className="text-slate-500 text-[10px]">ID: {ctrl.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
