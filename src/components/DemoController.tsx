import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { Play, SkipForward, SkipBack, X, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface DemoStepInfo {
  step: number;
  title: string;
  desc: string;
  eal: string;
  actionHint: string;
}

const DEMO_STEPS: DemoStepInfo[] = [
  { step: 1, title: 'NORMAL ENTERPRISE STATE', desc: 'Enterprise baseline operational. Standard perimeters healthy.', eal: '₹12 L', actionHint: 'Baseline established with minimal risk' },
  { step: 2, title: 'CRITICAL VULNERABILITY INGESTED', desc: 'Perimeter scanner reports CVE-2024-4281 (CVSS 9.8) on Public API Gateway.', eal: '₹1.80 Cr', actionHint: 'Pre-auth RCE vulnerability ingested' },
  { step: 3, title: 'ATTACK PATH DISCOVERED', desc: 'Digital Twin Graph Engine links API Gateway exploit to Core Banking DB via IAM.', eal: '₹3.40 Cr', actionHint: 'Attack Path #07 visualized in real-time' },
  { step: 4, title: 'FINANCIAL RISK SPIKES', desc: 'Monte Carlo engine recalculates EAL to ₹4.23 Cr (+₹3.81 Cr spike). VaR reaches ₹18.0 Cr.', eal: '₹4.23 Cr', actionHint: 'Executive alert triggered with FAIR breakdown' },
  { step: 5, title: 'RED / BLUE / JUDGE AI DEBATE', desc: 'Red Agent evaluates exploitability. Blue Agent assesses EDR. Judge quantifies 18% path likelihood.', eal: '₹4.23 Cr', actionHint: 'Multi-agent adversarial consensus formed' },
  { step: 6, title: 'CISO OPENS WHAT-IF SIMULATOR', desc: 'Chief Risk Officer accesses counterfactual simulator to test control deployments.', eal: '₹4.23 Cr', actionHint: 'Candidate controls evaluated against attack paths' },
  { step: 7, title: 'MFA & SEGMENTATION SIMULATION', desc: 'CISO toggles Phishing-Resistant MFA (FIDO2) and microsegmentation in simulator.', eal: 'Simulating...', actionHint: 'Attack Path #07 edge broken at Authentication' },
  { step: 8, title: 'PROJECTED EAL DECREASES', desc: 'Counterfactual state confirmed: Expected Annual Loss drops from ₹4.23 Cr to ₹74 L (-82%).', eal: '₹74 L', actionHint: 'Risk reduction of ₹3.46 Cr achieved with 1,822% ROSI' },
  { step: 9, title: 'BUDGET OPTIMIZER CALCULATES PORTFOLIO', desc: 'Solver selects optimal controls within ₹50 L budget (MFA + Patching + EDR = ₹38 L).', eal: '₹58 L', actionHint: 'Recommended investment portfolio optimized' },
  { step: 10, title: 'AI REMEDIATION SYNTHESIZES PR #419', desc: 'Agent generates Terraform IaC patch & Kubernetes NetworkPolicy.', eal: '₹74 L', actionHint: 'Gated at Human Approval: CISO sign-off required' },
  { step: 11, title: 'SANDBOX VALIDATION PASSES', desc: '450 synthetic banking transactions executed in sandbox. 100% exploit interception rate.', eal: '₹74 L', actionHint: 'Zero false rejections in payment telemetry' },
  { step: 12, title: 'CRYPTOGRAPHIC AUDIT PROOF GENERATED', desc: 'Audit trail hashed and logged for regulatory inspection (RBI / SEBI / DPDP).', eal: '₹74 L', actionHint: 'Verifiable tamper-evident risk ledger updated' }
];

export const DemoController: React.FC = () => {
  const { 
    demoActive, 
    stopDemo, 
    demoStep, 
    nextDemoStep, 
    prevDemoStep, 
    setDemoStep 
  } = useCyris();

  if (!demoActive) return null;

  const current = DEMO_STEPS[demoStep - 1] || DEMO_STEPS[0];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="p-4 rounded-xl bg-[#070c09]/95 backdrop-blur-xl border border-emerald-500/50 shadow-2xl font-mono text-xs flex flex-col space-y-3">
        {/* Top bar of demo controller */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>GUIDED DEMO MODE</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-semibold">
              STEP {demoStep} OF 12
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-slate-400">Current EAL:</span>
            <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
              {current.eal}
            </span>

            <button
              onClick={stopDemo}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Close Demo Mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-white text-sm uppercase">
              {current.title}
            </h4>
            <p className="text-slate-300 text-xs mt-0.5 max-w-xl leading-relaxed">
              {current.desc}
            </p>
            <div className="text-[10px] text-emerald-400/90 mt-1 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{current.actionHint}</span>
            </div>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={prevDemoStep}
              disabled={demoStep === 1}
              className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={nextDemoStep}
              className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all flex items-center space-x-1.5 shadow-cyber"
            >
              <span>{demoStep === 12 ? 'FINISH DEMO' : 'NEXT STEP'}</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress pills (1 to 12) */}
        <div className="grid grid-cols-12 gap-1 pt-1">
          {DEMO_STEPS.map((s) => (
            <div
              key={s.step}
              onClick={() => setDemoStep(s.step)}
              title={`Step ${s.step}: ${s.title}`}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                s.step === demoStep
                  ? 'bg-emerald-400 ring-2 ring-emerald-500/40'
                  : s.step < demoStep
                  ? 'bg-emerald-600'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
