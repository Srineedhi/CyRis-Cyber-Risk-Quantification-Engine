import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { Bug, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export const VulnerabilitiesView: React.FC = () => {
  const { assets, toggleControl, activeControlIds } = useCyris();

  // Aggregate all vulnerabilities
  const allVulns = assets.flatMap(a => 
    a.vulnerabilities.map(v => ({
      ...v,
      assetId: a.id,
      assetName: a.name,
      criticality: a.criticality
    }))
  );

  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <Bug className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              VULNERABILITY QUANTIFICATION &amp; EXPOSURE REGISTER
            </h3>
            <p className="text-xs text-slate-400">
              Active CVEs Linked to Attack Path Reachability and Single Loss Expectancy (SLE)
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
          {allVulns.length} CRITICAL / HIGH FINDINGS
        </span>
      </div>

      {/* Vulnerabilities Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-emerald-500/20 text-slate-400 text-[10px] uppercase">
              <th className="py-2.5 px-3">CVE ID</th>
              <th className="py-2.5 px-3">CVSS SCORE</th>
              <th className="py-2.5 px-3">AFFECTED ASSET</th>
              <th className="py-2.5 px-3">VULNERABILITY DESCRIPTION</th>
              <th className="py-2.5 px-3">FINANCIAL EXPOSURE</th>
              <th className="py-2.5 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/10">
            {allVulns.map((v) => (
              <tr key={v.cve} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-3">
                  <span className="text-red-400 font-bold">{v.cve}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950/60 border border-red-500/40 text-red-300">
                    CVSS {v.cvss} {v.severity}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="text-white font-semibold">{v.assetName}</div>
                  <div className="text-slate-500 text-[10px]">{v.assetId}</div>
                </td>
                <td className="py-3 px-3 text-slate-300 text-xs max-w-sm">
                  {v.description}
                </td>
                <td className="py-3 px-3 text-red-400 font-bold text-sm">
                  {formatINR(v.financialExposure)}
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => toggleControl('ctrl-patching')}
                    className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold transition-all"
                  >
                    {activeControlIds.includes('ctrl-patching') ? '✓ PATCH SIMULATED' : 'SIMULATE PATCH'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
