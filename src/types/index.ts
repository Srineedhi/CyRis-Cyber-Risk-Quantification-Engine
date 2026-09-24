// Core CyRIS Types and Data Models

export type NavigationPage = 
  | 'overview'
  | 'live-risk'
  | 'attack-graph'
  | 'asset-inventory'
  | 'vulnerabilities'
  | 'controls'
  | 'ai-debate'
  | 'what-if'
  | 'optimizer'
  | 'remediation'
  | 'compliance'
  | 'audit'
  | 'telemetry'
  | 'settings';

export interface SLEBreakdown {
  downtimeLoss: number; // in INR
  breachRecoveryLoss: number;
  regulatoryFines: number;
  operationalDisruption: number;
  reputationalDamage: number;
}

export interface FinancialRiskMetrics {
  eal: number; // Expected Annual Loss in INR (e.g. 42300000 = ₹4.23 Cr)
  baselineEal: number;
  deltaEal: number;
  cyberVaR95: number; // Cyber Value at Risk 95th percentile in INR (e.g. 180000000 = ₹18.0 Cr)
  aro: number; // Annualized Rate of Occurrence (e.g. 0.18)
  sle: number; // Single Loss Expectancy in INR
  sleBreakdown: SLEBreakdown;
  activeCriticalPaths: number;
  securityInvestment: number; // in INR (e.g. 8200000 = ₹82 L)
  riskReduction: number; // in INR (e.g. 36200000 = ₹3.62 Cr)
  simulatedScenario: string;
}

export type AssetCriticality = 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Critical Crown Jewel';
export type AssetType = 'API Gateway' | 'Auth Service' | 'Database' | 'IAM' | 'App Service' | 'Cloud VM' | 'Endpoint' | 'Internet Gateway';

export interface AssetNode {
  id: string;
  name: string;
  type: AssetType;
  criticality: AssetCriticality;
  ip: string;
  environment: string;
  vulnerabilities: {
    cve: string;
    cvss: number;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    description: string;
    financialExposure: number;
  }[];
  connectedIdentities: string[];
  controlsActive: string[];
  attackPathCount: number;
  financialExposure: number;
  potentialRemediation: string;
  status: 'compromised' | 'at-risk' | 'healthy' | 'protected';
  x: number;
  y: number;
  isCrownJewel?: boolean;
}

export interface AttackEdge {
  from: string;
  to: string;
  technique: string;
  tactic: 'Exploit' | 'Credential Abuse' | 'Privilege Escalation' | 'Lateral Movement' | 'Control Bypass';
  blockedBy?: string;
  isMitigated?: boolean;
}

export interface AttackPath {
  id: string;
  title: string;
  chain: string[];
  edges: AttackEdge[];
  financialBlastRadius: number; // in INR
  likelihood: number; // percentage
  entryPoint: string;
  target: string;
  criticality: AssetCriticality;
  controlsBlocking: number;
  totalControlsNeeded: number;
  status: 'ACTIVE' | 'DISRUPTED' | 'MONITORED';
  disruptingControl?: string;
}

export interface CriticalAlert {
  id: string;
  code: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  timestamp: string;
  asset: string;
  financialImpact: number; // in INR
  status: 'ACTIVE' | 'INVESTIGATING' | 'MITIGATED';
}

export interface ThreatContributor {
  category: string;
  contributionPct: number;
  financialExposure: number; // in INR
  trend: 'up' | 'down' | 'stable';
}

export interface SystemHealthItem {
  name: string;
  status: 'Operational' | 'Degraded' | 'Offline';
  latency: string;
  lastHeartbeat: string;
}

export interface SecurityControl {
  id: string;
  name: string;
  category: string;
  effectiveness: number; // percentage
  status: 'ENABLED' | 'DEGRADED' | 'DISABLED';
  cost: number; // in INR
  projectedRiskReduction: number; // in INR
  rosi: number; // percentage
  targetAttackPaths: string[];
  dependencies: string[];
}

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  type: 'BASELINE' | 'VULNERABILITY' | 'ATTACK_PATH' | 'FINANCIAL_EXPOSURE' | 'COUNTERFACTUAL' | 'PROJECTED_EAL' | 'REMEDIATION';
  summary: string;
  details: string;
  ealValue?: string;
  severity?: 'critical' | 'warning' | 'info' | 'success';
}

export interface CandidateControl {
  id: string;
  name: string;
  cost: number;
  riskReduction: number;
  residualEal: number;
  rosi: number;
  dependencies: string;
  selected: boolean;
}

export interface RedBlueJudgeDebate {
  round: number;
  timestamp: string;
  redAgent: {
    role: 'RED AGENT' | 'EXPLOIT ANALYST';
    argument: string;
    attackVector: string;
    exploitConfidence: number;
  };
  blueAgent: {
    role: 'BLUE AGENT' | 'DEFENSE ANALYST';
    argument: string;
    defensiveCounter: string;
    controlConfidence: number;
  };
  judge: {
    role: 'JUDGE' | 'RISK QUANTIFICATION';
    verdict: string;
    likelihoodChange: { from: number; to: number };
    controlStrength: number;
    residualEal: number;
    actionableGuidance: string;
  };
}

export interface RemediationStep {
  step: number;
  title: string;
  status: 'completed' | 'in_progress' | 'waiting_approval' | 'pending';
  timestamp?: string;
  details: string;
  codeSnippet?: string;
}

export interface ComplianceItem {
  id: string;
  framework: 'NIST CSF 2.0' | 'ISO/IEC 27001' | 'RBI' | 'SEBI CSCRF' | 'DPDP';
  category: string;
  finding: string;
  control: string;
  evidence: string;
  mappingCode: string;
  timestamp: string;
  status: 'Mapped Control' | 'Evidence Available' | 'Coverage' | 'Gap';
}

export interface AuditRecord {
  id: string;
  telemetryId: string;
  calculationId: string;
  timestamp: string;
  riskModelVersion: string;
  inputHash: string;
  calculationHash: string;
  proofStatus: 'VALID' | 'SIMULATION / DEMO' | 'PENDING';
  algorithm: string;
  notes: string;
}
