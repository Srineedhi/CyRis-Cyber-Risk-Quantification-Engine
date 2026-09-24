import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { Scale, Flame, Shield, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AiSecurityDebate: React.FC = () => {
  const { aiDebate, activeControlIds } = useCyris();
  const isMfaActive = activeControlIds.includes('ctrl-mfa');

  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              AI SECURITY DEBATE &middot; MULTI-AGENT ADVERSARIAL CONSENSUS
            </h3>
            <p className="text-xs text-slate-400">
              LangGraph-Style Debate Grounded in Application State & Causal Attack Probability
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold">
          ROUND {aiDebate.round} &middot; CONSENSUS REACHED
        </span>
      </div>

      {/* 3 Agents Grid: RED, BLUE, JUDGE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* 01. RED AGENT */}
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-red-400" />
                <span className="font-mono text-xs font-bold text-red-400 uppercase">
                  RED AGENT
                </span>
              </div>
              <span className="text-[10px] font-mono text-red-300 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-500/30">
                EXPLOIT ANALYST
              </span>
            </div>

            <p className="text-xs text-slate-200 mt-3 leading-relaxed">
              "{aiDebate.redAgent.argument}"
            </p>

            <div className="mt-3 p-2.5 rounded bg-black/40 border border-red-500/20 text-[11px] font-mono">
              <span className="text-slate-400 block text-[9px] uppercase">TARGETED EXPLOIT VECTOR:</span>
              <span className="text-red-300 font-semibold">{aiDebate.redAgent.attackVector}</span>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-red-500/20 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Exploit Confidence:</span>
            <span className="text-red-400 font-bold">{aiDebate.redAgent.exploitConfidence}%</span>
          </div>
        </div>

        {/* 02. BLUE AGENT */}
        <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-xs font-bold text-blue-400 uppercase">
                  BLUE AGENT
                </span>
              </div>
              <span className="text-[10px] font-mono text-blue-300 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-500/30">
                DEFENSE ANALYST
              </span>
            </div>

            <p className="text-xs text-slate-200 mt-3 leading-relaxed">
              "{aiDebate.blueAgent.argument}"
            </p>

            <div className="mt-3 p-2.5 rounded bg-black/40 border border-blue-500/20 text-[11px] font-mono">
              <span className="text-slate-400 block text-[9px] uppercase">DEFENSIVE COUNTERMEASURE:</span>
              <span className="text-blue-300 font-semibold">{aiDebate.blueAgent.defensiveCounter}</span>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-blue-500/20 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Control Confidence:</span>
            <span className="text-blue-400 font-bold">{aiDebate.blueAgent.controlConfidence}%</span>
          </div>
        </div>

        {/* 03. JUDGE */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col justify-between shadow-cyber">
          <div>
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                  JUDGE
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                RISK QUANTIFICATION
              </span>
            </div>

            <p className="text-xs text-slate-200 mt-3 leading-relaxed font-medium">
              "{aiDebate.judge.verdict}"
            </p>

            <div className="mt-3 p-2.5 rounded bg-black/40 border border-emerald-500/20 text-[11px] font-mono">
              <span className="text-slate-400 block text-[9px] uppercase">ACTIONABLE DIRECTIVE:</span>
              <span className="text-emerald-300 font-semibold">{aiDebate.judge.actionableGuidance}</span>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Judge Verdict Strength:</span>
            <span className="text-emerald-400 font-bold">{aiDebate.judge.controlStrength}%</span>
          </div>
        </div>
      </div>

      {/* Grounded Quantification Result Bar */}
      <div className="mt-4 p-3.5 rounded-xl bg-black/50 border border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="text-slate-400">PATH LIKELIHOOD EVOLUTION:</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-red-400 font-bold">{aiDebate.judge.likelihoodChange.from}%</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-emerald-400 font-bold">{aiDebate.judge.likelihoodChange.to}%</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-slate-400">DEFENSIVE COVERAGE:</span>
          <span className="text-emerald-300 font-bold">{aiDebate.judge.controlStrength}%</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-slate-400">QUANTIFIED RESIDUAL EAL:</span>
          <span className="text-emerald-400 font-bold text-sm bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            {formatINR(aiDebate.judge.residualEal)}
          </span>
        </div>
      </div>
    </div>
  );
};
