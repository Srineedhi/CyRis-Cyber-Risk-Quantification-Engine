import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  Key, 
  Server, 
  AlertTriangle, 
  Zap, 
  FileText,
  Lock
} from 'lucide-react';

export const AssetDetailDrawer: React.FC = () => {
  const { selectedAsset, setSelectedAsset, toggleControl, activeControlIds } = useCyris();

  if (!selectedAsset) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#070c09]/95 backdrop-blur-xl border-l border-emerald-500/30 shadow-2xl p-5 overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="flex items-start justify-between border-b border-emerald-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold uppercase">
              {selectedAsset.type}
            </span>
            <span className={`text-xs font-mono px-2 py-0.5 rounded font-bold uppercase ${
              selectedAsset.criticality === 'Critical Crown Jewel'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-300'
            }`}>
              {selectedAsset.criticality}
            </span>
          </div>
          <h2 className="text-lg font-mono font-bold text-white mt-1.5 flex items-center space-x-2">
            <span>{selectedAsset.name}</span>
          </h2>
          <div className="text-xs font-mono text-slate-400 mt-0.5">
            ID: <span className="text-emerald-400">{selectedAsset.id}</span> &middot; IP: {selectedAsset.ip}
          </div>
        </div>

        <button
          onClick={() => setSelectedAsset(null)}
          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-5 space-y-5">
        {/* Financial Exposure Box */}
        <div className="p-3.5 rounded-lg bg-black/40 border border-emerald-500/25">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            DIRECT FINANCIAL EXPOSURE
          </div>
          <div className="text-2xl font-mono font-black text-red-400 mt-1">
            {formatINR(selectedAsset.financialExposure)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Environment: <strong className="text-slate-200">{selectedAsset.environment}</strong>
          </div>
        </div>

        {/* Current Vulnerabilities */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 mb-2">
            <span className="flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>DETECTED VULNERABILITIES ({selectedAsset.vulnerabilities.length})</span>
            </span>
          </div>

          {selectedAsset.vulnerabilities.length === 0 ? (
            <div className="p-3 rounded bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-400 font-mono">
              ✓ No critical vulnerabilities directly flagged on this host.
            </div>
          ) : (
            <div className="space-y-2">
              {selectedAsset.vulnerabilities.map((v) => (
                <div key={v.cve} className="p-3 rounded-lg bg-red-950/20 border border-red-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-red-400">{v.cve}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                      CVSS {v.cvss} {v.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{v.description}</p>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    Loss blast radius: <span className="text-red-400 font-bold">{formatINR(v.financialExposure)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Connected Identities / IAM */}
        <div>
          <div className="text-xs font-mono font-bold text-slate-300 mb-2 flex items-center space-x-1.5">
            <Key className="w-4 h-4 text-emerald-400" />
            <span>CONNECTED IDENTITIES & PRINCIPALS</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedAsset.connectedIdentities.map((id) => (
              <span key={id} className="text-xs font-mono px-2 py-1 rounded bg-slate-900/80 border border-slate-700 text-slate-300">
                {id}
              </span>
            ))}
          </div>
        </div>

        {/* Active Controls */}
        <div>
          <div className="text-xs font-mono font-bold text-slate-300 mb-2 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ACTIVE SECURITY CONTROLS</span>
          </div>
          <div className="space-y-1.5">
            {selectedAsset.controlsActive.map((ctrl) => (
              <div key={ctrl} className="p-2 rounded bg-emerald-950/30 border border-emerald-500/20 text-xs font-mono text-emerald-300 flex items-center justify-between">
                <span>{ctrl}</span>
                <span className="text-[10px] text-emerald-400">● ENFORCED</span>
              </div>
            ))}
          </div>
        </div>

        {/* Potential Remediation */}
        <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
          <div className="text-xs font-mono font-bold text-emerald-400 flex items-center space-x-1.5 mb-1.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>RECOMMENDED REMEDIATION</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedAsset.potentialRemediation}
          </p>

          <button
            onClick={() => toggleControl('ctrl-mfa')}
            className="mt-3 w-full py-2 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold transition-all shadow-cyber"
          >
            {activeControlIds.includes('ctrl-mfa') ? '✓ MFA CONTROL APPLIED' : 'SIMULATE COUNTERFACTUAL CONTROL'}
          </button>
        </div>
      </div>
    </div>
  );
};
