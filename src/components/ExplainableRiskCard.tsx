import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { HelpCircle, ArrowUpRight, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const ExplainableRiskCard: React.FC = () => {
  const { metrics, toggleControl, activeControlIds } = useCyris();
  const isMfaActive = activeControlIds.includes('ctrl-mfa');

  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              EXPLAINABLE RISK INTELLIGENCE &middot; WHY DID RISK CHANGE?
            </h3>
            <p className="text-xs text-slate-400">
              Causal Decomposition of Ingested Telemetry, Threat Exploits and Financial Loss Deltas
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-bold uppercase">
          TRIGGER: PERIMETER VULNERABILITY INGEST
        </span>
      </div>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs font-mono">
        {/* Cause & Delta */}
        <div className="p-3.5 rounded-lg bg-black/40 border border-emerald-500/20 space-y-2">
          <span className="text-[10px] text-slate-400 uppercase block">PRIMARY ROOT CAUSE</span>
          <div className="text-sm font-bold text-white">
            Critical API Vulnerability (CVE-2024-4281)
          </div>
          <div className="inline-flex items-center space-x-1 text-red-400 font-bold bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>RISK INCREASE: +{formatINR(metrics.deltaEal)}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Pre-auth RCE on Kong/Envoy API Gateway enabled downstream token forgery in identity mesh.
          </p>
        </div>

        {/* Attack Path Chain */}
        <div className="p-3.5 rounded-lg bg-black/40 border border-emerald-500/20 space-y-2">
          <span className="text-[10px] text-slate-400 uppercase block">EXPLOITED ATTACK PATH</span>
          <div className="text-xs font-semibold text-emerald-300 space-y-1">
            <div>Public Internet</div>
            <div className="text-slate-500">&darr; Public API Gateway (10.0.1.15)</div>
            <div className="text-slate-500">&darr; Authentication Service (OAuth2)</div>
            <div className="text-slate-500">&darr; Privileged IAM Service Principal</div>
            <div className="text-red-400 font-bold">&darr; Core Transaction Database (Crown Jewel)</div>
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Direct Financial Contribution: <strong className="text-red-400">₹2.70 Cr</strong>
          </div>
        </div>

        {/* Recommended Action & ROSI */}
        <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-emerald-400 uppercase font-bold block">
              RECOMMENDED COUNTERACTION
            </span>
            <div className="text-sm font-bold text-white mt-1">
              Phishing-Resistant MFA (FIDO2)
            </div>

            <div className="mt-2 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Cost:</span>
                <span className="text-white font-semibold">₹18 L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Projected Reduction:</span>
                <span className="text-emerald-400 font-bold">₹3.46 Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Calculated ROSI:</span>
                <span className="text-emerald-400 font-bold">1,822%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => toggleControl('ctrl-mfa')}
            className={`mt-3 w-full py-2 rounded text-xs font-mono font-bold transition-all shadow-cyber ${
              isMfaActive
                ? 'bg-emerald-500 text-black'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
            }`}
          >
            {isMfaActive ? '✓ MITIGATION SIMULATED' : 'SIMULATE THIS REMEDIATION'}
          </button>
        </div>
      </div>
    </div>
  );
};
