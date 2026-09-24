import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR, formatINRFull } from '../utils/formatters';
import { PieChart, DollarSign, CheckCircle, Sliders, ShieldCheck } from 'lucide-react';

export const BudgetOptimizer: React.FC = () => {
  const { 
    availableBudget, 
    setAvailableBudget, 
    candidateControls, 
    toggleCandidateControl, 
    recommendedPortfolio 
  } = useCyris();

  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              SECURITY INVESTMENT OPTIMIZER &amp; PORTFOLIO ENGINE
            </h3>
            <p className="text-xs text-slate-400">
              Deterministic Knapsack Solver &middot; Maximizes Risk Reduction within CISO Budget Cap
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
          SOLVER: DETERMINISTIC GREEDY (OR-TOOLS ADAPTER READY)
        </span>
      </div>

      {/* Budget Slider Input */}
      <div className="mt-4 p-4 rounded-xl bg-black/40 border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300 font-semibold flex items-center space-x-1.5">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>ALLOCATED FISCAL BUDGET CAP:</span>
            </span>
            <span className="text-lg font-mono font-bold text-emerald-400">
              {formatINR(availableBudget)} ({formatINRFull(availableBudget)})
            </span>
          </div>

          <input
            type="range"
            min="1000000"
            max="10000000"
            step="500000"
            value={availableBudget}
            onChange={(e) => setAvailableBudget(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Min: ₹10 L</span>
            <span>Default: ₹50 L</span>
            <span>Max: ₹1.0 Cr</span>
          </div>
        </div>
      </div>

      {/* Recommended Portfolio Summary Callout */}
      <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div>
          <span className="text-[10px] text-slate-400 uppercase">SELECTED CONTROLS</span>
          <div className="text-base font-bold text-white mt-1">
            {recommendedPortfolio.controls.length} of {candidateControls.length} Controls
          </div>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 uppercase">TOTAL PORTFOLIO COST</span>
          <div className="text-base font-bold text-emerald-300 mt-1">
            {formatINR(recommendedPortfolio.totalCost)}
          </div>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 uppercase">RESIDUAL EAL</span>
          <div className="text-base font-bold text-emerald-400 mt-1">
            {formatINR(recommendedPortfolio.residualEal)}
          </div>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 uppercase">UNEXPENDED BUDGET</span>
          <div className="text-base font-bold text-slate-300 mt-1">
            {formatINR(recommendedPortfolio.remainingBudget)}
          </div>
        </div>
      </div>

      {/* Candidate Controls Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-emerald-500/20 text-slate-400 text-[10px] uppercase">
              <th className="py-2.5 px-3">RECOMMENDED</th>
              <th className="py-2.5 px-3">CONTROL</th>
              <th className="py-2.5 px-3">COST</th>
              <th className="py-2.5 px-3">RISK REDUCTION</th>
              <th className="py-2.5 px-3">RESIDUAL EAL</th>
              <th className="py-2.5 px-3">ROSI</th>
              <th className="py-2.5 px-3">DEPENDENCIES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/10">
            {candidateControls.map((ctrl) => {
              const isRecommended = recommendedPortfolio.controls.some(c => c.id === ctrl.id);
              return (
                <tr 
                  key={ctrl.id} 
                  className={`hover:bg-slate-900/40 transition-colors ${
                    isRecommended ? 'bg-emerald-950/20 font-semibold' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      isRecommended 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {isRecommended ? '✓ IN PORTFOLIO' : 'EXCLUDED'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-white">{ctrl.name}</td>
                  <td className="py-3 px-3 text-slate-300">{formatINR(ctrl.cost)}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">-{formatINR(ctrl.riskReduction)}</td>
                  <td className="py-3 px-3 text-slate-300">{formatINR(ctrl.residualEal)}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">{ctrl.rosi}%</td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{ctrl.dependencies}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
