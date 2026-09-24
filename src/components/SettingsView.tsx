import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { Settings2, Database, Shield, Cpu, Sliders, CheckCircle } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col space-y-4">
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              PLATFORM SETTINGS &amp; ADAPTER CONFIGURATION
            </h3>
            <p className="text-xs text-slate-400">
              CyRIS Engine Connectors, Telemetry Sources &amp; Algorithmic Hyperparameters
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold">
          MODE: SYNTHETIC BANKING DEMO
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {/* Connector 1 */}
        <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase">KAFKA TELEMETRY PIPELINE</span>
            <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              CONNECTED
            </span>
          </div>
          <p className="text-slate-400 text-xs">
            Topic: <span className="text-slate-200">cyris.telemetry.events.banking.prod</span>
          </p>
          <div className="text-slate-500 text-[11px]">
            Synthetic streaming simulation active for SIH jury demonstration.
          </div>
        </div>

        {/* Connector 2 */}
        <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase">GRAPH DATABASE (NEO4J ADAPTER)</span>
            <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              IN-MEMORY TWIN
            </span>
          </div>
          <p className="text-slate-400 text-xs">
            Nodes: 8 &middot; Edges: 14 &middot; Traversal Engine: <span className="text-emerald-300">Causal Attack Paths</span>
          </p>
          <div className="text-slate-500 text-[11px]">
            Neo4j abstraction provider loaded with banking microservices.
          </div>
        </div>

        {/* Connector 3 */}
        <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase">OPTIMIZATION SOLVER</span>
            <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              OR-TOOLS COMPATIBLE
            </span>
          </div>
          <p className="text-slate-400 text-xs">
            Algorithm: Greedy Knapsack with Marginal ROSI &middot; Budget cap: Dynamic
          </p>
          <div className="text-slate-500 text-[11px]">
            Interface abstraction allows plug-and-play binding with Google OR-Tools CBC/SCIP.
          </div>
        </div>

        {/* Connector 4 */}
        <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase">CRYPTOGRAPHIC PROOF ENGINE</span>
            <span className="text-amber-400 text-[10px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              PROOF ABSTRACTION
            </span>
          </div>
          <p className="text-slate-400 text-xs">
            Hash Standard: SHA-256 &middot; Verifier: Hyperledger / zk-SNARK Bridge
          </p>
          <div className="text-slate-500 text-[11px]">
            Honestly labeled as simulation mode during local demonstration.
          </div>
        </div>
      </div>
    </div>
  );
};
