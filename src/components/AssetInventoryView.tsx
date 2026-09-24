import React, { useState } from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { Server, Search, Filter, ShieldAlert, ShieldCheck } from 'lucide-react';

export const AssetInventoryView: React.FC = () => {
  const { assets, setSelectedAsset } = useCyris();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredAssets = assets.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.ip.includes(searchTerm);
    const matchesType = filterType === 'ALL' || a.type === filterType;
    return matchesSearch && matchesType;
  });

  const types = ['ALL', 'API Gateway', 'Auth Service', 'Database', 'IAM', 'App Service', 'Cloud VM', 'Endpoint'];

  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              ENTERPRISE ASSET INVENTORY &middot; DIGITAL TWIN DIRECTORY
            </h3>
            <p className="text-xs text-slate-400">
              Active Banking Perimeter Assets, Topology Roles &amp; Financial Risk Attribution
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold">
          {assets.length} TOTAL INVENTORY ASSETS
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by asset ID, hostname, IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-black/60 border border-emerald-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded text-[10px] transition-all font-semibold ${
                filterType === t
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-emerald-500/20 text-slate-400 text-[10px] uppercase">
              <th className="py-2.5 px-3">ASSET ID / NAME</th>
              <th className="py-2.5 px-3">TYPE</th>
              <th className="py-2.5 px-3">CRITICALITY</th>
              <th className="py-2.5 px-3">IP / ENVIRONMENT</th>
              <th className="py-2.5 px-3">FINANCIAL EXPOSURE</th>
              <th className="py-2.5 px-3">STATUS</th>
              <th className="py-2.5 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/10">
            {filteredAssets.map((asset) => (
              <tr 
                key={asset.id} 
                onClick={() => setSelectedAsset(asset)}
                className="hover:bg-slate-900/40 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-3">
                  <div className="text-white font-bold group-hover:text-emerald-300">{asset.name}</div>
                  <div className="text-slate-500 text-[10px]">{asset.id}</div>
                </td>
                <td className="py-3 px-3 text-slate-300">{asset.type}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    asset.isCrownJewel 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {asset.criticality}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="text-slate-300">{asset.ip}</div>
                  <div className="text-slate-500 text-[10px]">{asset.environment}</div>
                </td>
                <td className="py-3 px-3 text-red-400 font-bold">
                  {formatINR(asset.financialExposure)}
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    asset.status === 'compromised'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : asset.status === 'at-risk'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {asset.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button className="text-xs text-emerald-400 hover:text-emerald-300 underline font-mono">
                    Inspect &rarr;
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
