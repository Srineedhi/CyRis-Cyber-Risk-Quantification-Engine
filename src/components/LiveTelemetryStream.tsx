import React, { useState } from 'react';
import { useCyris } from '../context/CyrisContext';
import { Terminal, Play, Pause, RotateCcw, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export const LiveTelemetryStream: React.FC = () => {
  const { telemetryStream, replayScenario } = useCyris();
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const getSeverityBadge = (type: string) => {
    switch (type) {
      case 'VULNERABILITY':
      case 'ATTACK_PATH':
      case 'FINANCIAL_EXPOSURE':
        return 'text-red-400 bg-red-950/60 border-red-500/40';
      case 'PROJECTED_EAL':
      case 'REMEDIATION':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'COUNTERFACTUAL':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      default:
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
    }
  };

  return (
    <div className="w-full cyber-panel rounded-xl p-4 flex flex-col">
      {/* Stream Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
            LIVE TELEMETRY STREAM & EVENT INGESTION
          </h3>
          <span className="flex items-center space-x-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>KAFKA EVENT INGEST ACTIVE</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-slate-300 text-xs font-mono transition-colors"
          >
            {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
            <span className="text-[10px]">{isPaused ? 'RESUME' : 'PAUSE'}</span>
          </button>

          <button
            onClick={replayScenario}
            title="Reset and replay attack trajectory"
            className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 text-xs font-mono transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="text-[10px]">REPLAY SCENARIO</span>
          </button>
        </div>
      </div>

      {/* Stream Terminal Window */}
      <div className="mt-3 space-y-2 max-h-60 overflow-y-auto font-mono text-xs pr-1">
        {telemetryStream.map((event) => {
          const badgeClass = getSeverityBadge(event.type);
          return (
            <div
              key={event.id}
              className="p-2.5 rounded bg-black/50 border border-emerald-500/15 hover:border-emerald-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
            >
              <div className="flex items-start sm:items-center space-x-2.5">
                <span className="text-[10px] text-slate-500 flex-shrink-0 pt-0.5 sm:pt-0">
                  {event.timestamp}
                </span>

                <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${badgeClass}`}>
                  {event.type}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <span className="text-white font-semibold text-xs">{event.summary}</span>
                  <span className="text-slate-400 text-[11px] truncate max-w-md">
                    {event.details}
                  </span>
                </div>
              </div>

              {event.ealValue && (
                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] text-slate-400 mr-1.5">EAL:</span>
                  <span className="text-emerald-400 font-bold text-xs bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                    {event.ealValue}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
