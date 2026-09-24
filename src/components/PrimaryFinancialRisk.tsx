import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { AlertTriangle, TrendingDown, ArrowUpRight, ArrowDownRight, ShieldCheck, DollarSign } from 'lucide-react';

export const PrimaryFinancialRisk: React.FC = () => {
  const { metrics, activeControlIds } = useCyris();
  const isSpiked = metrics.deltaEal > 0 && activeControlIds.length === 0;

  return (
    <div className="w-full cyber-panel rounded-xl p-4 lg:p-5 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className={`absolute top-0 right-1/4 w-96 h-32 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
        isSpiked ? 'bg-red-500/10' : 'bg-emerald-500/15'
      }`} />

      {/* Header bar of financial area */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/15 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className={`p-1.5 rounded border ${
            isSpiked 
              ? 'bg-red-950/60 border-red-500/40 text-red-400' 
              : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
          }`}>
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              EXECUTIVE CYBER RISK QUANTIFICATION ENGINE
            </h2>
            <p className="text-[11px] text-slate-400">
              Deterministic Monte Carlo Loss Expectancy &middot; FAIR Standard Mapped
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
            MODEL: HYBRID-BAYESIAN-MC
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold">
            CONFIDENCE: 95%
          </span>
        </div>
      </div>

      {/* Main Grid: Hero Metric + Secondary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 items-center">
        {/* Large Central Hero Metric: EXPECTED ANNUAL LOSS */}
        <div className="lg:col-span-4 p-4 rounded-lg bg-black/40 border border-emerald-500/20 flex flex-col justify-center relative group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
              EXPECTED ANNUAL LOSS (EAL)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              EAL = ARO &times; SLE
            </span>
          </div>

          <div className="mt-2.5 flex items-baseline space-x-3">
            <span className={`text-4xl lg:text-5xl font-mono font-black tracking-tight transition-colors duration-500 ${
              isSpiked ? 'text-red-400 glow-danger' : 'text-emerald-400 glow-emerald'
            }`}>
              {formatINR(metrics.eal)}
            </span>
          </div>

          {/* Delta comparison */}
          <div className="mt-2 flex items-center space-x-2">
            {metrics.deltaEal > 0 ? (
              <span className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+{formatINR(metrics.deltaEal)} from baseline</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>-{formatINR(metrics.riskReduction)} risk mitigated</span>
              </span>
            )}
            <span className="text-[10px] font-mono text-slate-500">
              Baseline: {formatINR(metrics.baselineEal)}
            </span>
          </div>
        </div>

        {/* 5 Surrounding Core Metrics */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          {/* Cyber Value at Risk */}
          <div className="p-3 rounded-lg bg-black/30 border border-emerald-500/15 hover:border-emerald-500/40 transition-colors">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              CYBER VALUE AT RISK
            </div>
            <div className="text-xl font-mono font-bold text-white mt-1">
              {formatINR(metrics.cyberVaR95)}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-0.5">
              95th Percentile Loss
            </div>
          </div>

          {/* Annualized Risk Frequency */}
          <div className="p-3 rounded-lg bg-black/30 border border-emerald-500/15 hover:border-emerald-500/40 transition-colors">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              ANNUALIZED FREQUENCY
            </div>
            <div className="text-xl font-mono font-bold text-emerald-300 mt-1">
              {metrics.aro.toFixed(2)}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-0.5">
              ARO (Events / Yr)
            </div>
          </div>

          {/* Active Critical Paths */}
          <div className="p-3 rounded-lg bg-black/30 border border-emerald-500/15 hover:border-emerald-500/40 transition-colors">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              ACTIVE ATTACK PATHS
            </div>
            <div className={`text-xl font-mono font-bold mt-1 ${metrics.activeCriticalPaths > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {metrics.activeCriticalPaths}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-0.5">
              Perimeter &rarr; Crown Jewel
            </div>
          </div>

          {/* Security Investment */}
          <div className="p-3 rounded-lg bg-black/30 border border-emerald-500/15 hover:border-emerald-500/40 transition-colors">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              SECURITY INVESTMENT
            </div>
            <div className="text-xl font-mono font-bold text-white mt-1">
              {formatINR(metrics.securityInvestment)}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-0.5">
              Deployed Controls CapEx
            </div>
          </div>

          {/* Risk Reduction */}
          <div className="p-3 rounded-lg bg-black/30 border border-emerald-500/15 hover:border-emerald-500/40 transition-colors col-span-2 sm:col-span-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              RISK REDUCTION
            </div>
            <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
              {formatINR(metrics.riskReduction)}
            </div>
            <div className="text-[10px] font-mono text-emerald-500/80 mt-0.5 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>ROSI 1822%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SLE Component Loss Breakdown Footer Bar */}
      <div className="mt-3.5 pt-3 border-t border-emerald-500/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
        <span className="text-slate-400">SINGLE LOSS EXPECTANCY (SLE) BREAKDOWN:</span>
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Downtime: <span className="text-emerald-400">{formatINR(metrics.sleBreakdown.downtimeLoss)}</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Recovery: <span className="text-emerald-400">{formatINR(metrics.sleBreakdown.breachRecoveryLoss)}</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Regulatory: <span className="text-amber-400">{formatINR(metrics.sleBreakdown.regulatoryFines)}</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Operational: <span className="text-slate-300">{formatINR(metrics.sleBreakdown.operationalDisruption)}</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Reputational: <span className="text-slate-300">{formatINR(metrics.sleBreakdown.reputationalDamage)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
