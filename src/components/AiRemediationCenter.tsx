import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { 
  Wrench, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  FileCode, 
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const AiRemediationCenter: React.FC = () => {
  const { remediationSteps, approveRemediationPR, metrics } = useCyris();
  const humanApprovalStep = remediationSteps.find(s => s.step === 8);
  const isApproved = humanApprovalStep?.status === 'completed';

  return (
    <div className="w-full cyber-panel rounded-xl p-5 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-3 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white tracking-wider uppercase">
              SAFE AI REMEDIATION CENTER &middot; HUMAN-IN-THE-LOOP CONTROL
            </h3>
            <p className="text-xs text-slate-400">
              Autonomous Synthesis with Zero-Trust Human Gating &bull; AI Never Directly Deploys to Production
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center space-x-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
            <span>HUMAN APPROVAL REQUIRED</span>
          </span>
        </div>
      </div>

      {/* Human Approval Sign-Off Callout Banner */}
      <div className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isApproved 
          ? 'bg-emerald-950/30 border-emerald-500/40' 
          : 'bg-amber-950/30 border-amber-500/40'
      }`}>
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${isApproved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-white uppercase">
              {isApproved ? 'PR #419 AUTHORIZED BY CISO' : 'ACTION REQUIRED: CISO / SECURITY LEAD SIGN-OFF'}
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {isApproved 
                ? 'Canary rollout active. Rollback triggers armed with automated latency and transaction error monitoring.'
                : 'Generated remediation PR #419 contains Terraform WAF filters and FIDO2 policy update. Requires explicit CISO cryptographic authorization before cluster rollout.'}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0">
          {!isApproved ? (
            <button
              onClick={approveRemediationPR}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs shadow-cyber transition-all hover:scale-105"
            >
              APPROVE PR #419 &amp; DEPLOY
            </button>
          ) : (
            <span className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>DEPLOYMENT AUTHORIZED</span>
            </span>
          )}
        </div>
      </div>

      {/* 9-Step Sequential Remediation Pipeline */}
      <div className="mt-4">
        <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">
          SECURE 9-STAGE REMEDIATION LIFECYCLE:
        </h4>

        <div className="space-y-2.5">
          {remediationSteps.map((step) => {
            const isCompleted = step.status === 'completed';
            const isWaiting = step.status === 'waiting_approval';
            const isInProgress = step.status === 'in_progress';

            return (
              <div
                key={step.step}
                className={`p-3 rounded-lg border font-mono text-xs transition-all ${
                  isWaiting
                    ? 'bg-amber-950/20 border-amber-500/40 shadow-cyber'
                    : isCompleted
                    ? 'bg-black/40 border-emerald-500/20'
                    : 'bg-black/20 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                      isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : isWaiting
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isCompleted ? '✓' : step.step}
                    </span>

                    <span className="font-bold text-white uppercase text-xs">
                      {step.title}
                    </span>

                    {step.step === 8 && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                        MANDATORY GATE
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {step.timestamp && (
                      <span className="text-[10px] text-slate-500">{step.timestamp}</span>
                    )}
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      isCompleted 
                        ? 'text-emerald-400 bg-emerald-950/60' 
                        : isWaiting
                        ? 'text-amber-400 bg-amber-950/60 animate-pulse'
                        : 'text-slate-500'
                    }`}>
                      {step.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-slate-300 text-xs pl-8 leading-relaxed">
                  {step.details}
                </p>

                {step.codeSnippet && (
                  <div className="mt-2.5 ml-8 p-2.5 rounded bg-black/80 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                    <pre>{step.codeSnippet}</pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
