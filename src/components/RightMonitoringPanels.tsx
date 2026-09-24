import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { Activity, ShieldCheck, Server, AlertTriangle } from 'lucide-react';

export const RightMonitoringPanels: React.FC = () => {
  const { systemHealth, controls, assets, setSelectedAsset, activeControlIds } = useCyris();

  // Sort top risk assets by financial exposure
  const topRiskAssets = [...assets]
    .filter(a => a.id !== 'INTERNET-EXT')
    .sort((a, b) => b.financialExposure - a.financialExposure)
    .slice(0, 4);

  return (
    <div className="flex flex-col space-y-4">
      {/* 01. SYSTEM HEALTH PANEL */}
      <div className="cyber-panel rounded-xl p-4 flex flex-col">
        <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2.5">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              SYSTEM HEALTH
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            ALL ENGINES ONLINE
          </span>
        </div>

        <div className="mt-3 space-y-2 font-mono text-xs">
          {systemHealth.map((sys) => (
            <div key={sys.name} className="flex items-center justify-between p-2 rounded bg-black/40 border border-emerald-500/10">
              <span className="text-slate-300 truncate max-w-[150px]">{sys.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-slate-500">{sys.latency}</span>
                <span className="flex items-center space-x-1 text-emerald-400 text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>{sys.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 02. ACTIVE CONTROLS & EFFECTIVENESS */}
      <div className="cyber-panel rounded-xl p-4 flex flex-col">
        <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2.5">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              ACTIVE CONTROLS
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            EFFECTIVENESS
          </span>
        </div>

        <div className="mt-3 space-y-2.5">
          {controls.map((ctrl) => {
            const isSimulatedActive = activeControlIds.includes(ctrl.id) || ctrl.status === 'ENABLED';
            return (
              <div key={ctrl.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={`truncate max-w-[170px] ${isSimulatedActive ? 'text-emerald-300 font-semibold' : 'text-slate-400'}`}>
                    {ctrl.name}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-bold text-emerald-400">
                      {isSimulatedActive ? `${ctrl.effectiveness}%` : 'DISABLED'}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isSimulatedActive ? 'bg-emerald-400' : 'bg-slate-700'
                    }`}
                    style={{ width: `${isSimulatedActive ? ctrl.effectiveness : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 03. TOP RISK ASSETS */}
      <div className="cyber-panel rounded-xl p-4 flex flex-col">
        <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2.5">
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              TOP RISK ASSETS
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            RANKED BY EAL
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {topRiskAssets.map((asset, index) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="p-2.5 rounded-lg bg-black/40 border border-emerald-500/15 hover:border-emerald-500/40 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-1.5 truncate max-w-[160px]">
                  <span className="text-slate-500 font-bold">0{index + 1}</span>
                  <span className="text-white group-hover:text-emerald-300 font-semibold truncate">
                    {asset.id}
                  </span>
                </div>
                <span className="text-red-400 font-bold font-mono">
                  {formatINR(asset.financialExposure)}
                </span>
              </div>

              <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{asset.criticality}</span>
                <span className="text-slate-500 truncate max-w-[130px]">
                  {asset.vulnerabilities[0]?.cve || 'Crown Jewel DB'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
