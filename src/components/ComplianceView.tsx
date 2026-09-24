import React, { useState } from 'react';
import { useCyris } from '../context/CyrisContext';
import { FileCheck2, Shield, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

export const ComplianceView: React.FC = () => {
  const { complianceItems } = useCyris();
  const [selectedFramework, setSelectedFramework] = useState<string>('ALL');

  const frameworks = ['ALL', 'RBI', 'SEBI CSCRF', 'NIST CSF 2.0', 'DPDP', 'ISO/IEC 27001'];

  const filteredItems = selectedFramework === 'ALL'
    ? complianceItems
    : complianceItems.filter(item => item.framework === selectedFramework);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Mapped Control':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'Evidence Available':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
      case 'Coverage':
        return 'text-blue-400 bg-blue-950/60 border-blue-500/40';
      case 'Gap':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              REGULATORY COMPLIANCE &amp; EVIDENCE MAPPING
            </h3>
            <p className="text-xs text-slate-400">
              Evidence-Backed Framework Alignments (RBI CS, SEBI CSCRF, NIST CSF 2.0, DPDP Act 2023, ISO 27001)
            </p>
          </div>
        </div>

        <div className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
          NOTE: Technical mapping indicates telemetry evidence, not legal certification.
        </div>
      </div>

      {/* Framework Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
        {frameworks.map((fw) => (
          <button
            key={fw}
            onClick={() => setSelectedFramework(fw)}
            className={`px-3 py-1.5 rounded transition-all font-semibold ${
              selectedFramework === fw
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-cyber'
                : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
            }`}
          >
            {fw}
          </button>
        ))}
      </div>

      {/* Compliance Findings Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-emerald-500/20 text-slate-400 text-[10px] uppercase">
              <th className="py-2.5 px-3">FRAMEWORK / MAPPING</th>
              <th className="py-2.5 px-3">CATEGORY &amp; REQUIREMENT</th>
              <th className="py-2.5 px-3">ENFORCED CONTROL</th>
              <th className="py-2.5 px-3">DIGITAL TWIN EVIDENCE</th>
              <th className="py-2.5 px-3">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/10">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-3">
                  <div className="text-white font-bold">{item.framework}</div>
                  <div className="text-slate-500 text-[10px]">{item.mappingCode}</div>
                </td>
                <td className="py-3 px-3">
                  <div className="text-slate-300 font-semibold">{item.category}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{item.finding}</div>
                </td>
                <td className="py-3 px-3 text-emerald-300 font-semibold">
                  {item.control}
                </td>
                <td className="py-3 px-3 text-slate-300 text-[11px] max-w-xs">
                  {item.evidence}
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
