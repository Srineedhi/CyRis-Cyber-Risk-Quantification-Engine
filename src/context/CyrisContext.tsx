import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { 
  FinancialRiskMetrics, 
  AssetNode, 
  AttackPath, 
  CriticalAlert, 
  ThreatContributor, 
  SystemHealthItem, 
  SecurityControl, 
  TelemetryEvent, 
  RedBlueJudgeDebate, 
  RemediationStep, 
  ComplianceItem, 
  AuditRecord, 
  NavigationPage,
  CandidateControl
} from '../types';
import { 
  INITIAL_FINANCIAL_METRICS, 
  INITIAL_ASSETS, 
  INITIAL_ATTACK_PATHS, 
  INITIAL_ALERTS, 
  THREAT_CONTRIBUTORS, 
  SYSTEM_HEALTH_ITEMS, 
  SECURITY_CONTROLS, 
  INITIAL_TELEMETRY_STREAM, 
  INITIAL_AI_DEBATE, 
  INITIAL_REMEDIATION_STEPS, 
  COMPLIANCE_FINDINGS, 
  INITIAL_AUDIT_RECORDS 
} from '../data/syntheticBankingData';

interface CyrisContextType {
  activePage: NavigationPage;
  setActivePage: (page: NavigationPage) => void;
  metrics: FinancialRiskMetrics;
  assets: AssetNode[];
  attackPaths: AttackPath[];
  alerts: CriticalAlert[];
  threatContributors: ThreatContributor[];
  systemHealth: SystemHealthItem[];
  controls: SecurityControl[];
  telemetryStream: TelemetryEvent[];
  aiDebate: RedBlueJudgeDebate;
  remediationSteps: RemediationStep[];
  complianceItems: ComplianceItem[];
  auditRecords: AuditRecord[];
  
  // Selection state
  selectedAsset: AssetNode | null;
  setSelectedAsset: (asset: AssetNode | null) => void;
  selectedAttackPath: AttackPath | null;
  setSelectedAttackPath: (path: AttackPath | null) => void;

  // Counterfactual & What-If
  activeControlIds: string[];
  toggleControl: (controlId: string) => void;
  resetControls: () => void;

  // Budget Optimizer
  availableBudget: number;
  setAvailableBudget: (val: number) => void;
  candidateControls: CandidateControl[];
  toggleCandidateControl: (id: string) => void;
  recommendedPortfolio: {
    controls: CandidateControl[];
    totalCost: number;
    totalReduction: number;
    residualEal: number;
    remainingBudget: number;
  };

  // Time Range
  timeRange: '1H' | '24H' | '7D' | '30D';
  setTimeRange: (tr: '1H' | '24H' | '7D' | '30D') => void;

  // Demo Mode (12-step guided walk-through)
  demoActive: boolean;
  demoStep: number;
  setDemoStep: (step: number) => void;
  startDemo: () => void;
  stopDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;

  // Actions
  replayScenario: () => void;
  approveRemediationPR: () => void;
}

const CyrisContext = createContext<CyrisContextType | undefined>(undefined);

export const CyrisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<NavigationPage>('overview');
  const [timeRange, setTimeRange] = useState<'1H' | '24H' | '7D' | '30D'>('24H');
  const [selectedAsset, setSelectedAsset] = useState<AssetNode | null>(null);
  const [selectedAttackPath, setSelectedAttackPath] = useState<AttackPath | null>(null);
  
  // Active Counterfactual Controls (toggled by user or demo)
  const [activeControlIds, setActiveControlIds] = useState<string[]>([]);

  // Budget Optimizer Slider
  const [availableBudget, setAvailableBudget] = useState<number>(5000000); // ₹50 L default

  // Telemetry stream state
  const [telemetryStream, setTelemetryStream] = useState<TelemetryEvent[]>(INITIAL_TELEMETRY_STREAM);

  // Remediation pipeline state
  const [remediationSteps, setRemediationSteps] = useState<RemediationStep[]>(INITIAL_REMEDIATION_STEPS);

  // Demo mode state (1 to 12)
  const [demoActive, setDemoActive] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);

  // Dynamic Metrics Recalculation (Single Source of Truth)
  const { metrics, attackPaths, assets, aiDebate, threatContributors } = useMemo(() => {
    // Determine baseline vs spike vs mitigations
    const baseEal = 4200000; // ₹42 L baseline
    const unmitigatedEal = 42300000; // ₹4.23 Cr
    let currentEal = unmitigatedEal;
    let totalReduction = 0;
    let totalInvested = 8200000;

    // Check which controls are active
    const isMfaActive = activeControlIds.includes('ctrl-mfa');
    const isSegActive = activeControlIds.includes('ctrl-segmentation');
    const isPatchActive = activeControlIds.includes('ctrl-patching');
    const isEdrActive = activeControlIds.includes('ctrl-edr');
    const isPamActive = activeControlIds.includes('ctrl-pam');

    if (isMfaActive) {
      totalReduction += 34600000;
      totalInvested += 1800000;
    }
    if (isSegActive) {
      totalReduction += 21000000;
      totalInvested += 2200000;
    }
    if (isPatchActive) {
      totalReduction += 19500000;
      totalInvested += 800000;
    }
    if (isEdrActive) {
      totalReduction += 11000000;
      totalInvested += 1200000;
    }
    if (isPamActive) {
      totalReduction += 24000000;
      totalInvested += 2500000;
    }

    // Apply diminishing returns formula for combined controls
    if (activeControlIds.length > 0) {
      const combinedReductionRatio = Math.min(0.96, (totalReduction / (unmitigatedEal * 1.5)));
      const actualReduction = Math.round((unmitigatedEal - baseEal) * combinedReductionRatio);
      currentEal = Math.max(5800000, unmitigatedEal - actualReduction);
    } else {
      currentEal = unmitigatedEal;
    }

    // Update attack paths status based on controls
    const updatedAttackPaths = INITIAL_ATTACK_PATHS.map(path => {
      let isDisrupted = false;
      let blockingCount = path.controlsBlocking;
      let disruptingCtrl = path.disruptingControl;

      if (path.id === 'AP-07' && (isMfaActive || isPatchActive || isPamActive)) {
        isDisrupted = true;
        blockingCount = 5;
        disruptingCtrl = isMfaActive ? 'Phishing-Resistant MFA (FIDO2)' : isPatchActive ? 'CVE-2024-4281 Patch' : 'PAM JIT Vaulting';
      } else if (path.id === 'AP-03' && (isSegActive || isPamActive)) {
        isDisrupted = true;
        blockingCount = 3;
        disruptingCtrl = isSegActive ? 'Microsegmentation' : 'PAM Vaulting';
      } else if (path.id === 'AP-12' && (isEdrActive || isMfaActive)) {
        isDisrupted = true;
        blockingCount = 3;
        disruptingCtrl = isEdrActive ? 'EDR Expansion' : 'Phishing-Resistant MFA';
      }

      return {
        ...path,
        status: (isDisrupted ? 'DISRUPTED' : 'ACTIVE') as 'ACTIVE' | 'DISRUPTED' | 'MONITORED',
        controlsBlocking: blockingCount,
        disruptingControl: disruptingCtrl,
        likelihood: isDisrupted ? Math.max(2, Math.round(path.likelihood * 0.2)) : path.likelihood
      };
    });

    // Update assets status based on disrupted paths
    const updatedAssets = INITIAL_ASSETS.map(asset => {
      let status = asset.status;
      if (asset.id === 'API-GATEWAY-01' && isPatchActive) {
        status = 'protected';
      } else if (asset.id === 'AUTH-SERVICE-01' && isMfaActive) {
        status = 'protected';
      } else if (asset.id === 'CORE-DB-01' && (isMfaActive || isSegActive)) {
        status = 'protected';
      }
      return {
        ...asset,
        status
      };
    });

    const activePathsCount = updatedAttackPaths.filter(p => p.status === 'ACTIVE').length;
    const computedAro = Number((0.18 * (currentEal / unmitigatedEal)).toFixed(2));
    const computedVaR = Math.round(180000000 * (currentEal / unmitigatedEal));

    const finalMetrics: FinancialRiskMetrics = {
      eal: currentEal,
      baselineEal: baseEal,
      deltaEal: currentEal - baseEal,
      cyberVaR95: computedVaR,
      aro: Math.max(0.02, computedAro),
      sle: Math.round(currentEal / Math.max(0.02, computedAro)),
      sleBreakdown: {
        downtimeLoss: Math.round(14500000 * (currentEal / unmitigatedEal)),
        breachRecoveryLoss: Math.round(12000000 * (currentEal / unmitigatedEal)),
        regulatoryFines: Math.round(8500000 * (currentEal / unmitigatedEal)),
        operationalDisruption: Math.round(4800000 * (currentEal / unmitigatedEal)),
        reputationalDamage: Math.round(2500000 * (currentEal / unmitigatedEal)),
      },
      activeCriticalPaths: activePathsCount,
      securityInvestment: totalInvested,
      riskReduction: unmitigatedEal - currentEal,
      simulatedScenario: isMfaActive ? 'Counterfactual Control Active (FIDO2 MFA)' : 'Live Perimeter Threat Scenario'
    };

    // Update AI Debate grounded in current state
    const updatedDebate: RedBlueJudgeDebate = {
      ...INITIAL_AI_DEBATE,
      judge: {
        ...INITIAL_AI_DEBATE.judge,
        likelihoodChange: {
          from: 18,
          to: isMfaActive ? 3 : 11
        },
        controlStrength: isMfaActive ? 94 : 63,
        residualEal: currentEal,
        verdict: isMfaActive 
          ? 'Counterfactual verification confirmed: Phishing-Resistant MFA breaks auth bypass edge. Exploitation probability dropped from 18% to 3%.' 
          : INITIAL_AI_DEBATE.judge.verdict
      }
    };

    // Threat contributors update
    const updatedContributors = THREAT_CONTRIBUTORS.map(tc => {
      let pct = tc.contributionPct;
      if (tc.category.includes('API') && isPatchActive) pct = 8;
      if (tc.category.includes('Identity') && isMfaActive) pct = 5;
      if (tc.category.includes('Network') && isSegActive) pct = 6;
      return {
        ...tc,
        contributionPct: pct,
        financialExposure: Math.round(currentEal * (pct / 100))
      };
    });

    return {
      metrics: finalMetrics,
      attackPaths: updatedAttackPaths,
      assets: updatedAssets,
      aiDebate: updatedDebate,
      threatContributors: updatedContributors
    };
  }, [activeControlIds]);

  // Candidate Controls for Optimizer
  const [candidateControlsState, setCandidateControlsState] = useState<CandidateControl[]>([
    { id: 'opt-mfa', name: 'Phishing-Resistant MFA (FIDO2)', cost: 1800000, riskReduction: 34600000, residualEal: 7400000, rosi: 1822, dependencies: 'IdP Upgrade', selected: true },
    { id: 'opt-patch', name: 'Critical CVE-2024-4281 Remediation', cost: 800000, riskReduction: 19500000, residualEal: 22800000, rosi: 2337, dependencies: 'Maintenance Window', selected: true },
    { id: 'opt-edr', name: 'EDR Expansion & Threat Hunting', cost: 1200000, riskReduction: 11000000, residualEal: 31300000, rosi: 816, dependencies: 'Kernel Module', selected: true },
    { id: 'opt-seg', name: 'Microsegmentation & Zero Trust', cost: 2200000, riskReduction: 21000000, residualEal: 21300000, rosi: 854, dependencies: 'Envoy Mesh', selected: false },
    { id: 'opt-pam', name: 'Privileged Access JIT Vaulting', cost: 2500000, riskReduction: 24000000, residualEal: 18300000, rosi: 860, dependencies: 'AD Federation', selected: false }
  ]);

  const toggleCandidateControl = useCallback((id: string) => {
    setCandidateControlsState(prev => prev.map(c => c.id === id ? { ...c, selected: !c.selected } : c));
  }, []);

  // Deterministic Optimization Engine (Greedy Knapsack by Marginal ROSI / Cost)
  const recommendedPortfolio = useMemo(() => {
    // Sort candidate controls by risk reduction per rupee spent
    const sorted = [...candidateControlsState].sort((a, b) => (b.riskReduction / b.cost) - (a.riskReduction / a.cost));
    
    let budgetLeft = availableBudget;
    const selected: CandidateControl[] = [];
    let totalCost = 0;
    let totalReduction = 0;

    for (const ctrl of sorted) {
      if (ctrl.cost <= budgetLeft) {
        selected.push(ctrl);
        budgetLeft -= ctrl.cost;
        totalCost += ctrl.cost;
        totalReduction += ctrl.riskReduction;
      }
    }

    // Residual EAL model
    const residual = Math.max(5800000, 42300000 - Math.min(36500000, totalReduction));

    return {
      controls: selected,
      totalCost,
      totalReduction,
      residualEal: residual,
      remainingBudget: budgetLeft
    };
  }, [availableBudget, candidateControlsState]);

  // Toggle Control helper
  const toggleControl = useCallback((controlId: string) => {
    setActiveControlIds(prev => {
      const exists = prev.includes(controlId);
      const next = exists ? prev.filter(id => id !== controlId) : [...prev, controlId];

      // Add live telemetry event
      const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST';
      const event: TelemetryEvent = {
        id: `TEL-SIM-${Date.now().toString().slice(-4)}`,
        timestamp,
        type: exists ? 'COUNTERFACTUAL' : 'PROJECTED_EAL',
        summary: exists ? `CONTROL DEACTIVATED: ${controlId}` : `COUNTERFACTUAL CONTROL SIMULATED`,
        details: exists 
          ? `Control ${controlId} removed from active simulation. Risk recalculated.`
          : `Simulated deployment of control ${controlId}. Re-quantifying EAL and attack path viability.`,
        ealValue: exists ? '₹4.23 Cr' : '₹74 L',
        severity: exists ? 'warning' : 'success'
      };

      setTelemetryStream(t => [event, ...t.slice(0, 15)]);
      return next;
    });
  }, []);

  const resetControls = useCallback(() => {
    setActiveControlIds([]);
  }, []);

  // Scenario Replay
  const replayScenario = useCallback(() => {
    setActiveControlIds([]);
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST';
    const resetEvent: TelemetryEvent = {
      id: `TEL-RPL-${Date.now().toString().slice(-4)}`,
      timestamp,
      type: 'BASELINE',
      summary: 'SCENARIO REPLAY INITIATED',
      details: 'Simulation reset to baseline. Telemetry stream regenerating perimeter attack events.',
      ealValue: '₹12 L -> ₹4.23 Cr',
      severity: 'info'
    };
    setTelemetryStream([resetEvent, ...INITIAL_TELEMETRY_STREAM]);
  }, []);

  // Safe AI Remediation Approval
  const approveRemediationPR = useCallback(() => {
    setRemediationSteps(prev => prev.map(step => {
      if (step.step === 8) {
        return { ...step, status: 'completed', details: 'AUTHORIZED BY CISO (HUMAN SIGN-OFF). PR #419 approved.' };
      }
      if (step.step === 9) {
        return { ...step, status: 'in_progress', details: 'Canary deployment active on cluster. Verifying production health.' };
      }
      return step;
    }));

    // Auto toggle MFA & Patching
    setActiveControlIds(prev => Array.from(new Set([...prev, 'ctrl-mfa', 'ctrl-patching'])));

    const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST';
    const approvedEvent: TelemetryEvent = {
      id: `TEL-PR-${Date.now().toString().slice(-4)}`,
      timestamp,
      type: 'REMEDIATION',
      summary: 'HUMAN APPROVAL GRANTED: PR #419',
      details: 'CISO signed cryptographic release. Patch applied to API Gateway and FIDO2 enforced.',
      ealValue: '₹74 L',
      severity: 'success'
    };
    setTelemetryStream(t => [approvedEvent, ...t]);
  }, []);

  // Demo Mode Stepper
  const startDemo = useCallback(() => {
    setDemoActive(true);
    setDemoStep(1);
    setActiveControlIds([]);
  }, []);

  const stopDemo = useCallback(() => {
    setDemoActive(false);
  }, []);

  const nextDemoStep = useCallback(() => {
    setDemoStep(s => {
      const next = Math.min(12, s + 1);
      // Automatically trigger UI state changes corresponding to each demo step!
      if (next === 1) {
        setActiveControlIds([]);
      } else if (next === 6 || next === 7 || next === 8) {
        setActiveControlIds(['ctrl-mfa']);
      } else if (next === 9) {
        setActiveControlIds(['ctrl-mfa', 'ctrl-patching', 'ctrl-edr']);
      } else if (next === 10) {
        setActivePage('remediation');
      } else if (next === 11) {
        setActivePage('compliance');
      } else if (next === 12) {
        setActivePage('audit');
      }
      return next;
    });
  }, []);

  const prevDemoStep = useCallback(() => {
    setDemoStep(s => Math.max(1, s - 1));
  }, []);

  return (
    <CyrisContext.Provider
      value={{
        activePage,
        setActivePage,
        metrics,
        assets,
        attackPaths,
        alerts: INITIAL_ALERTS,
        threatContributors,
        systemHealth: SYSTEM_HEALTH_ITEMS,
        controls: SECURITY_CONTROLS,
        telemetryStream,
        aiDebate,
        remediationSteps,
        complianceItems: COMPLIANCE_FINDINGS,
        auditRecords: INITIAL_AUDIT_RECORDS,
        selectedAsset,
        setSelectedAsset,
        selectedAttackPath,
        setSelectedAttackPath,
        activeControlIds,
        toggleControl,
        resetControls,
        availableBudget,
        setAvailableBudget,
        candidateControls: candidateControlsState,
        toggleCandidateControl,
        recommendedPortfolio,
        timeRange,
        setTimeRange,
        demoActive,
        demoStep,
        setDemoStep,
        startDemo,
        stopDemo,
        nextDemoStep,
        prevDemoStep,
        replayScenario,
        approveRemediationPR
      }}
    >
      {children}
    </CyrisContext.Provider>
  );
};

export const useCyris = () => {
  const context = useContext(CyrisContext);
  if (!context) {
    throw new Error('useCyris must be used within a CyrisProvider');
  }
  return context;
};
