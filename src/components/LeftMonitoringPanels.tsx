import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { AlertCircle, ShieldAlert, BarChart3, TrendingUp, Layers } from 'lucide-react';

export const LeftMonitoringPanels: React.FC = () => {
  const { alerts, threatContributors, metrics, setSelectedAsset, assets } = useCyris();

  return (
    <div className="flex flex-col space-y-4">
      {/* 01. CRITICAL ALERTS PANEL */}
      <div className="cyber-panel rounded-xl p-4 flex flex-col">
        <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2.5">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              CRITICAL ALERTS
            </h3>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
            {alerts.length} ACTIVE
          </span>
        </div>

        <div className="mt-3 space-y-2.5">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                const targetAsset = assets.find(a => a.id === alert.asset);
                if (targetAsset) setSelectedAsset(targetAsset);
              }}
              className="p-2.5 rounded-lg bg-black/40 border border-red-500/25 hover:border-red-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-red-400 flex items-center space-x-1.5">
                  <span className="w-4 h-4 rounded bg-red-950 flex items-center justify-center text-[10px] border border-red-500/40">
                    {alert.code}
                  </span>
                  <span className="text-white group-hover:text-red-300 transition-colors truncate max-w-[170px]">
                    {alert.title}
                  </span>
                </span>
                <span className="text-[9px] text-slate-500">{alert.timestamp}</span>
              </div>

              <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">
                  Target: <span className="text-emerald-400 font-semibold">{alert.asset}</span>
                </span>
                <span className="text-red-400 font-bold">
                  {formatINR(alert.financialImpact)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 02. THREAT CONTRIBUTORS */}
      <div className="cyber-panel rounded-xl p-4 flex flex-col">
        <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2.5">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              THREAT CONTRIBUTORS
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            SHARE OF RISK
          </span>
        </div>

        <div className="mt-3 space-y-3">
          {threatContributors.map((item) => (
            <div key={item.category} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-medium">{item.category}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-[11px]">{formatINR(item.financialExposure)}</span>
                  <span className="font-bold text-emerald-400 text-xs w-8 text-right">{item.contributionPct}%</span>
                </div>
              </div>

              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.contributionPct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 03. INCIDENT IMPACT (Financial Exposure Distribution) */}
      <div className="cyber-panel rounded-xl p-4 flex flex-col">
        <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2.5">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              INCIDENT IMPACT GRAPH
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">
            TOTAL SLE: {formatINR(metrics.sle)}
          </span>
        </div>

        {/* Compact Bar Chart Visualization */}
        <div className="mt-3 space-y-2 text-xs font-mono">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Downtime Losses</span>
              <span className="text-emerald-400">{formatINR(metrics.sleBreakdown.downtimeLoss)}</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-400 h-full rounded-full" 
                style={{ width: `${Math.round((metrics.sleBreakdown.downtimeLoss / metrics.sle) * 100)}%` }} 
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Breach Recovery</span>
              <span className="text-emerald-400">{formatINR(metrics.sleBreakdown.breachRecoveryLoss)}</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-400/80 h-full rounded-full" 
                style={{ width: `${Math.round((metrics.sleBreakdown.breachRecoveryLoss / metrics.sle) * 100)}%` }} 
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Regulatory Fines</span>
              <span className="text-amber-400">{formatINR(metrics.sleBreakdown.regulatoryFines)}</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full" 
                style={{ width: `${Math.round((metrics.sleBreakdown.regulatoryFines / metrics.sle) * 100)}%` }} 
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Operational Disruption</span>
              <span className="text-slate-300">{formatINR(metrics.sleBreakdown.operationalDisruption)}</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-slate-500 h-full rounded-full" 
                style={{ width: `${Math.round((metrics.sleBreakdown.operationalDisruption / metrics.sle) * 100)}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
