import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { FileKey, ShieldCheck, Hash, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export const CryptographicAuditView: React.FC = () => {
  const { auditRecords } = useCyris();

  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <FileKey className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              VERIFIABLE CRYPTOGRAPHIC RISK AUDIT &amp; PROOF TRAIL
            </h3>
            <p className="text-xs text-slate-400">
              Tamper-Evident Ledger for Risk Calculation Runs, Telemetry Fingerprints &amp; Auditor Verification
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
            STATUS: SIMULATION / DEMO (PROOF ABSTRACTION LAYER)
          </span>
        </div>
      </div>

      {/* Honest Cryptographic Disclaimer */}
      <div className="p-3.5 rounded-lg bg-black/40 border border-emerald-500/20 text-xs font-mono text-slate-300 flex items-start space-x-3">
        <AlertCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Cryptographic Integrity Architecture:</strong> In production deployment, every Monte Carlo iteration and FAIR calculation is cryptographically hashed with SHA-256 and committed to a permissioned Hyperledger / zk-SNARK proof pipeline. In this local demonstration, hashes and ledger proofs are modeled via deterministic cryptographic abstractions.
        </p>
      </div>

      {/* Audit Log Cards */}
      <div className="space-y-3 font-mono text-xs">
        {auditRecords.map((record) => (
          <div
            key={record.id}
            className="p-4 rounded-xl bg-black/50 border border-emerald-500/20 hover:border-emerald-500/40 transition-all space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/10 pb-2">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-white text-sm">{record.id}</span>
                <span className="text-slate-400 text-[11px]">{record.timestamp}</span>
                <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {record.riskModelVersion}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  PROOF STATUS: {record.proofStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded bg-black/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">TELEMETRY ID &amp; INPUT HASH:</span>
                <div className="text-emerald-300 font-semibold mt-0.5 truncate">{record.telemetryId}</div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">{record.inputHash}</div>
              </div>

              <div className="p-2.5 rounded bg-black/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">CALCULATION ID &amp; RESULT HASH:</span>
                <div className="text-emerald-300 font-semibold mt-0.5 truncate">{record.calculationId}</div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">{record.calculationHash}</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
              <span>Engine Algorithm: <strong className="text-slate-200">{record.algorithm}</strong></span>
              <span className="text-slate-500 text-[10px]">{record.notes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
