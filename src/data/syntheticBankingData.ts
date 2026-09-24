import { 
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
  FinancialRiskMetrics
} from '../types';

export const INITIAL_FINANCIAL_METRICS: FinancialRiskMetrics = {
  eal: 42300000, // ₹4.23 Cr
  baselineEal: 4200000, // ₹42 L
  deltaEal: 38100000, // +₹3.81 Cr
  cyberVaR95: 180000000, // ₹18.0 Cr
  aro: 0.18, // Annualized Rate of Occurrence
  sle: 235000000, // Single Loss Expectancy (₹23.5 Cr) => 0.18 * 23.5 Cr = ~4.23 Cr
  sleBreakdown: {
    downtimeLoss: 14500000, // ₹1.45 Cr
    breachRecoveryLoss: 12000000, // ₹1.20 Cr
    regulatoryFines: 8500000, // ₹85 L
    operationalDisruption: 4800000, // ₹48 L
    reputationalDamage: 2500000, // ₹25 L
  },
  activeCriticalPaths: 7,
  securityInvestment: 8200000, // ₹82 L
  riskReduction: 36200000, // ₹3.62 Cr
  simulatedScenario: 'Live Banking Perimeter Intrusion Simulation'
};

export const INITIAL_ASSETS: AssetNode[] = [
  {
    id: 'INTERNET-EXT',
    name: 'Public Internet',
    type: 'Internet Gateway',
    criticality: 'Tier 3',
    ip: '0.0.0.0/0',
    environment: 'External Untrusted',
    vulnerabilities: [],
    connectedIdentities: ['External Attackers', 'Botnets', 'Nation-State Threat Actors'],
    controlsActive: ['DDoS Shield', 'Cloudflare WAF'],
    attackPathCount: 7,
    financialExposure: 0,
    potentialRemediation: 'Rate limiting and geo-blocking policies',
    status: 'compromised',
    x: 80,
    y: 200
  },
  {
    id: 'API-GATEWAY-01',
    name: 'Public API Gateway',
    type: 'API Gateway',
    criticality: 'Tier 1',
    ip: '10.0.1.15',
    environment: 'DMZ / Banking Edge',
    vulnerabilities: [
      {
        cve: 'CVE-2024-4281',
        cvss: 9.8,
        severity: 'CRITICAL',
        description: 'Pre-auth Remote Code Execution in API Routing Engine',
        financialExposure: 27000000
      }
    ],
    connectedIdentities: ['svc-gateway-proxy', 'customer-mobile-app', 'partner-fintech'],
    controlsActive: ['WAF Rule 409', 'TLS 1.3 Termination'],
    attackPathCount: 5,
    financialExposure: 27000000,
    potentialRemediation: 'Patch gateway firmware to v4.9.2 and deploy WAF zero-day virtual patch',
    status: 'compromised',
    x: 230,
    y: 200
  },
  {
    id: 'AUTH-SERVICE-01',
    name: 'Authentication Service',
    type: 'Auth Service',
    criticality: 'Tier 1',
    ip: '10.0.2.10',
    environment: 'Identity Core / VPC-A',
    vulnerabilities: [
      {
        cve: 'CVE-2024-3199',
        cvss: 8.8,
        severity: 'CRITICAL',
        description: 'JWT signature verification bypass & session hijacking',
        financialExposure: 18500000
      }
    ],
    connectedIdentities: ['svc-auth-broker', 'svc-token-mint', 'iam-admin-backup'],
    controlsActive: ['SMS OTP (Degraded)', 'OAuth 2.0 PKCE'],
    attackPathCount: 4,
    financialExposure: 18500000,
    potentialRemediation: 'Enforce FIDO2 Phishing-Resistant MFA and rotate JWT asymmetric signing keys',
    status: 'at-risk',
    x: 390,
    y: 130
  },
  {
    id: 'IAM-PRIV-01',
    name: 'Identity & Access Manager',
    type: 'IAM',
    criticality: 'Tier 1',
    ip: '10.0.2.50',
    environment: 'Secured Tier-0 Domain',
    vulnerabilities: [
      {
        cve: 'CVE-2023-4863',
        cvss: 8.1,
        severity: 'HIGH',
        description: 'Over-privileged service account with domain-wide replication rights',
        financialExposure: 22000000
      }
    ],
    connectedIdentities: ['domain-admin-ciso', 'svc-backup-priv', 'svc-core-sync'],
    controlsActive: ['Role-Based Access Control', 'Daily Password Rotation'],
    attackPathCount: 4,
    financialExposure: 22000000,
    potentialRemediation: 'Implement Just-in-Time PAM with automated token revoking and session recording',
    status: 'at-risk',
    x: 550,
    y: 130
  },
  {
    id: 'PAYMENT-SERVICE-01',
    name: 'Application Services (UPI/IMPS)',
    type: 'App Service',
    criticality: 'Tier 1',
    ip: '10.0.3.40',
    environment: 'Production App Mesh',
    vulnerabilities: [
      {
        cve: 'CVE-2024-1102',
        cvss: 7.5,
        severity: 'HIGH',
        description: 'Insecure direct object reference in transaction payload processor',
        financialExposure: 16000000
      }
    ],
    connectedIdentities: ['svc-payment-worker', 'svc-npc-gateway'],
    controlsActive: ['App Armor', 'Runtime EDR Agent'],
    attackPathCount: 3,
    financialExposure: 16000000,
    potentialRemediation: 'Deploy zero-trust microsegmentation and cryptographically sign transaction RPCs',
    status: 'at-risk',
    x: 550,
    y: 270
  },
  {
    id: 'CLOUD-VM-104',
    name: 'Cloud Infrastructure Node',
    type: 'Cloud VM',
    criticality: 'Tier 2',
    ip: '10.0.2.22',
    environment: 'Hybrid Cloud Kubernetes',
    vulnerabilities: [
      {
        cve: 'CVE-2023-50164',
        cvss: 7.2,
        severity: 'HIGH',
        description: 'Unrestricted container namespace breakout',
        financialExposure: 8500000
      }
    ],
    connectedIdentities: ['k8s-daemonset-user'],
    controlsActive: ['VPC Peering', 'Security Groups'],
    attackPathCount: 2,
    financialExposure: 8500000,
    potentialRemediation: 'Harden seccomp profiles and isolate pod network interfaces',
    status: 'healthy',
    x: 390,
    y: 280
  },
  {
    id: 'CORE-DB-01',
    name: 'Core Transaction Database',
    type: 'Database',
    criticality: 'Critical Crown Jewel',
    ip: '10.0.4.5',
    environment: 'Airgapped Banking Vault',
    vulnerabilities: [
      {
        cve: 'CVE-2023-3824',
        cvss: 8.9,
        severity: 'CRITICAL',
        description: 'Privileged SQL injection allowing exfiltration of customer balances & KYC',
        financialExposure: 38000000
      }
    ],
    connectedIdentities: ['db-oracle-sysdba', 'svc-payment-writer'],
    controlsActive: ['TDE Database Encryption', 'Database Audit Vault', 'Airgap Proxy'],
    attackPathCount: 3,
    financialExposure: 38000000,
    potentialRemediation: 'Enforce strict schema parameters, mTLS client certificates and immutable query firewall',
    status: 'compromised',
    x: 720,
    y: 200,
    isCrownJewel: true
  },
  {
    id: 'EDR-ENDPOINT-021',
    name: 'Financial Ops Workstation',
    type: 'Endpoint',
    criticality: 'Tier 3',
    ip: '10.0.5.88',
    environment: 'Treasury Subnet',
    vulnerabilities: [],
    connectedIdentities: ['treasury-officer-01'],
    controlsActive: ['CrowdStrike Falcon', 'BitLocker'],
    attackPathCount: 1,
    financialExposure: 2500000,
    potentialRemediation: 'Block external USB and enforce strict web proxy filtering',
    status: 'healthy',
    x: 230,
    y: 330
  }
];

export const INITIAL_ATTACK_PATHS: AttackPath[] = [
  {
    id: 'AP-07',
    title: 'ATTACK PATH #07 — Critical Perimeter to Core Database Exfiltration',
    chain: ['INTERNET-EXT', 'API-GATEWAY-01', 'AUTH-SERVICE-01', 'IAM-PRIV-01', 'PAYMENT-SERVICE-01', 'CORE-DB-01'],
    edges: [
      { from: 'INTERNET-EXT', to: 'API-GATEWAY-01', technique: 'T1190 Exploit Public-Facing Application', tactic: 'Exploit' },
      { from: 'API-GATEWAY-01', to: 'AUTH-SERVICE-01', technique: 'T1078 Valid Accounts & Session Hijack', tactic: 'Credential Abuse' },
      { from: 'AUTH-SERVICE-01', to: 'IAM-PRIV-01', technique: 'T1068 Privilege Escalation via Domain Sync', tactic: 'Privilege Escalation' },
      { from: 'IAM-PRIV-01', to: 'PAYMENT-SERVICE-01', technique: 'T1021 Remote Service Lateral Pivot', tactic: 'Lateral Movement' },
      { from: 'PAYMENT-SERVICE-01', to: 'CORE-DB-01', technique: 'T1552 Database Access Bypass & Data Dump', tactic: 'Control Bypass' }
    ],
    financialBlastRadius: 28000000, // ₹2.8 Cr
    likelihood: 18, // 18%
    entryPoint: 'Public API Gateway',
    target: 'Core Transaction Database',
    criticality: 'Tier 1',
    controlsBlocking: 2,
    totalControlsNeeded: 5,
    status: 'ACTIVE',
    disruptingControl: 'Phishing-Resistant MFA (FIDO2)'
  },
  {
    id: 'AP-03',
    title: 'ATTACK PATH #03 — Cloud VM Namespace Escape to IAM Admin',
    chain: ['INTERNET-EXT', 'CLOUD-VM-104', 'IAM-PRIV-01', 'CORE-DB-01'],
    edges: [
      { from: 'INTERNET-EXT', to: 'CLOUD-VM-104', technique: 'T1190 Ingress Controller Misconfig', tactic: 'Exploit' },
      { from: 'CLOUD-VM-104', to: 'IAM-PRIV-01', technique: 'T1611 Container Escape to Metadata Service', tactic: 'Privilege Escalation' },
      { from: 'IAM-PRIV-01', to: 'CORE-DB-01', technique: 'T1078 Stolen DB Root Credential', tactic: 'Control Bypass' }
    ],
    financialBlastRadius: 19500000, // ₹1.95 Cr
    likelihood: 12,
    entryPoint: 'Cloud Infrastructure Node',
    target: 'Core Transaction Database',
    criticality: 'Tier 1',
    controlsBlocking: 1,
    totalControlsNeeded: 3,
    status: 'ACTIVE',
    disruptingControl: 'Microsegmentation & Zero Trust'
  },
  {
    id: 'AP-12',
    title: 'ATTACK PATH #12 — Treasury Endpoint Lateral Movement',
    chain: ['INTERNET-EXT', 'EDR-ENDPOINT-021', 'AUTH-SERVICE-01', 'PAYMENT-SERVICE-01'],
    edges: [
      { from: 'INTERNET-EXT', to: 'EDR-ENDPOINT-021', technique: 'T1566 Spearphishing Attachment', tactic: 'Exploit' },
      { from: 'EDR-ENDPOINT-021', to: 'AUTH-SERVICE-01', technique: 'T1003 Kerberoasting on Subnet', tactic: 'Credential Abuse' },
      { from: 'AUTH-SERVICE-01', to: 'PAYMENT-SERVICE-01', technique: 'T1550 Use Alternate Auth Token', tactic: 'Lateral Movement' }
    ],
    financialBlastRadius: 14000000, // ₹1.4 Cr
    likelihood: 9,
    entryPoint: 'Financial Ops Workstation',
    target: 'Application Services (UPI/IMPS)',
    criticality: 'Tier 2',
    controlsBlocking: 2,
    totalControlsNeeded: 3,
    status: 'ACTIVE',
    disruptingControl: 'EDR Expansion & Threat Hunting'
  }
];

export const INITIAL_ALERTS: CriticalAlert[] = [
  {
    id: 'ALT-01',
    code: '01',
    title: 'Critical CVE-2024-4281 detected on Public Gateway',
    severity: 'CRITICAL',
    timestamp: '10:04:08 IST',
    asset: 'API-GATEWAY-01',
    financialImpact: 27000000,
    status: 'ACTIVE'
  },
  {
    id: 'ALT-02',
    code: '02',
    title: 'Privileged identity exposed in memory dump',
    severity: 'CRITICAL',
    timestamp: '10:04:45 IST',
    asset: 'IAM-PRIV-01',
    financialImpact: 22000000,
    status: 'ACTIVE'
  },
  {
    id: 'ALT-03',
    code: '03',
    title: 'MFA control degraded to SMS OTP fallback',
    severity: 'HIGH',
    timestamp: '10:05:10 IST',
    asset: 'AUTH-SERVICE-01',
    financialImpact: 18500000,
    status: 'ACTIVE'
  },
  {
    id: 'ALT-04',
    code: '04',
    title: 'New lateral attack path discovered reaching Crown Jewel',
    severity: 'CRITICAL',
    timestamp: '10:05:21 IST',
    asset: 'CORE-DB-01',
    financialImpact: 28000000,
    status: 'ACTIVE'
  }
];

export const THREAT_CONTRIBUTORS: ThreatContributor[] = [
  { category: 'Public API Gateway', contributionPct: 38, financialExposure: 16000000, trend: 'up' },
  { category: 'Identity & Access (IAM)', contributionPct: 26, financialExposure: 11000000, trend: 'up' },
  { category: 'Network Segmentation', contributionPct: 18, financialExposure: 7600000, trend: 'stable' },
  { category: 'Endpoint Coverage', contributionPct: 11, financialExposure: 4700000, trend: 'down' },
  { category: 'Cloud Misconfiguration', contributionPct: 7, financialExposure: 3000000, trend: 'stable' },
];

export const SYSTEM_HEALTH_ITEMS: SystemHealthItem[] = [
  { name: 'Telemetry Pipeline', status: 'Operational', latency: '42ms', lastHeartbeat: '1s ago' },
  { name: 'Graph Engine (Digital Twin)', status: 'Operational', latency: '68ms', lastHeartbeat: '1s ago' },
  { name: 'Risk Engine (Monte Carlo)', status: 'Operational', latency: '124ms', lastHeartbeat: '2s ago' },
  { name: 'Optimization Engine', status: 'Operational', latency: '85ms', lastHeartbeat: '3s ago' },
  { name: 'Audit & Proof Engine', status: 'Operational', latency: '31ms', lastHeartbeat: '1s ago' },
];

export const SECURITY_CONTROLS: SecurityControl[] = [
  {
    id: 'ctrl-mfa',
    name: 'Phishing-Resistant MFA (FIDO2)',
    category: 'Identity Security',
    effectiveness: 94,
    status: 'DISABLED',
    cost: 1800000, // ₹18 L
    projectedRiskReduction: 34600000, // ₹3.46 Cr
    rosi: 1822,
    targetAttackPaths: ['AP-07', 'AP-12'],
    dependencies: ['Identity Provider Upgrade']
  },
  {
    id: 'ctrl-segmentation',
    name: 'Microsegmentation & Zero Trust',
    category: 'Network Architecture',
    effectiveness: 88,
    status: 'DISABLED',
    cost: 2200000, // ₹22 L
    projectedRiskReduction: 21000000, // ₹2.10 Cr
    rosi: 854,
    targetAttackPaths: ['AP-07', 'AP-03'],
    dependencies: ['Envoy Service Mesh']
  },
  {
    id: 'ctrl-patching',
    name: 'Critical CVE-2024-4281 Remediation',
    category: 'Vulnerability Management',
    effectiveness: 98,
    status: 'DISABLED',
    cost: 800000, // ₹8 L
    projectedRiskReduction: 19500000, // ₹1.95 Cr
    rosi: 2337,
    targetAttackPaths: ['AP-07'],
    dependencies: ['API Gateway Maintenance Window']
  },
  {
    id: 'ctrl-edr',
    name: 'EDR Expansion & Threat Hunting',
    category: 'Endpoint Security',
    effectiveness: 82,
    status: 'DISABLED',
    cost: 1200000, // ₹12 L
    projectedRiskReduction: 11000000, // ₹1.10 Cr
    rosi: 816,
    targetAttackPaths: ['AP-12'],
    dependencies: ['Agent Kernel Deployment']
  },
  {
    id: 'ctrl-pam',
    name: 'Privileged Access JIT Vaulting',
    category: 'Access Governance',
    effectiveness: 91,
    status: 'DISABLED',
    cost: 2500000, // ₹25 L
    projectedRiskReduction: 24000000, // ₹2.40 Cr
    rosi: 860,
    targetAttackPaths: ['AP-07', 'AP-03'],
    dependencies: ['Active Directory Federation']
  },
  {
    id: 'ctrl-backup',
    name: 'Immutable Air-Gapped DB Backups',
    category: 'Resilience & Recovery',
    effectiveness: 95,
    status: 'ENABLED',
    cost: 1500000, // ₹15 L
    projectedRiskReduction: 14000000, // ₹1.40 Cr
    rosi: 833,
    targetAttackPaths: ['AP-07'],
    dependencies: ['WORM Storage Vault']
  }
];

export const INITIAL_TELEMETRY_STREAM: TelemetryEvent[] = [
  {
    id: 'TEL-001',
    timestamp: '10:01:12 IST',
    type: 'BASELINE',
    summary: 'SYSTEM BASELINE VERIFIED',
    details: 'Synthetic banking topology initialized with 8 assets and standard baseline controls.',
    ealValue: '₹12 L',
    severity: 'info'
  },
  {
    id: 'TEL-002',
    timestamp: '10:04:08 IST',
    type: 'VULNERABILITY',
    summary: 'VULNERABILITY INGESTED',
    details: 'Critical CVE-2024-4281 (CVSS 9.8) detected on Public API Gateway perimeter.',
    ealValue: '₹1.80 Cr',
    severity: 'critical'
  },
  {
    id: 'TEL-003',
    timestamp: '10:05:21 IST',
    type: 'ATTACK_PATH',
    summary: 'ATTACK PATH UPDATED',
    details: 'Digital twin graph engine linked API Gateway exploit to Core Database via compromised IAM.',
    ealValue: '₹3.40 Cr',
    severity: 'critical'
  },
  {
    id: 'TEL-004',
    timestamp: '10:05:24 IST',
    type: 'FINANCIAL_EXPOSURE',
    summary: 'FINANCIAL EXPOSURE QUANTIFIED',
    details: 'Monte Carlo risk engine evaluated Single Loss Expectancy at ₹23.5 Cr. Annualized Rate of Occurrence 0.18.',
    ealValue: '₹4.23 Cr',
    severity: 'critical'
  },
  {
    id: 'TEL-005',
    timestamp: '10:06:02 IST',
    type: 'COUNTERFACTUAL',
    summary: 'COUNTERFACTUAL SIMULATION INITIATED',
    details: 'Evaluating disruption of Attack Path #07 via Phishing-Resistant MFA and microsegmentation.',
    ealValue: 'Simulating...',
    severity: 'warning'
  },
  {
    id: 'TEL-006',
    timestamp: '10:06:05 IST',
    type: 'PROJECTED_EAL',
    summary: 'PROJECTED EAL CALCULATED',
    details: 'Phishing-Resistant MFA breaks auth bypass edge. Projected residual EAL drops significantly.',
    ealValue: '₹74 L',
    severity: 'success'
  }
];

export const INITIAL_AI_DEBATE: RedBlueJudgeDebate = {
  round: 3,
  timestamp: '10:05:40 IST',
  redAgent: {
    role: 'RED AGENT',
    argument: 'Public API Gateway exposes CVE-2024-4281 allowing pre-auth RCE. Because JWT signature validation has no strict hardware binding, lateral movement to IAM domain controllers is 82% reproducible in 4 hops.',
    attackVector: 'CVE-2024-4281 -> Auth Token Impersonation -> Domain Admin Sync',
    exploitConfidence: 89
  },
  blueAgent: {
    role: 'BLUE AGENT',
    argument: 'EDR is active on downstream hosts and telemetry rate limits flag anomalous RPC calls. Network egress rules partially restrict raw socket connections to the database.',
    defensiveCounter: 'Host-based egress filters & behavioral anomaly heuristic on svc-payment-worker',
    controlConfidence: 63
  },
  judge: {
    role: 'JUDGE',
    verdict: 'Residual attack path remains viable. While EDR increases time-to-exploit, lack of hardware-bound MFA allows valid session token reuse. Risk quantified with remaining path probability of 11% upon MFA deployment.',
    likelihoodChange: { from: 18, to: 11 },
    controlStrength: 63,
    residualEal: 7400000, // ₹74 L
    actionableGuidance: 'Deploy Phishing-Resistant MFA to choke credential reuse and apply microsegmentation rule #104.'
  }
};

export const INITIAL_REMEDIATION_STEPS: RemediationStep[] = [
  {
    step: 1,
    title: 'THREAT DETECTED',
    status: 'completed',
    timestamp: '10:04:08 IST',
    details: 'CVE-2024-4281 and Attack Path #07 flagged by Telemetry Pipeline with ₹4.23 Cr financial risk.'
  },
  {
    step: 2,
    title: 'AI PROPOSES FIX',
    status: 'completed',
    timestamp: '10:05:45 IST',
    details: 'Synthesized patch combining Envoy virtual WAF filter + WebAuthn FIDO2 mandatory policy.'
  },
  {
    step: 3,
    title: 'GENERATE PATCH / IaC',
    status: 'completed',
    timestamp: '10:06:10 IST',
    details: 'Generated Terraform module `terraform-aws-waf-cyris-patch.tf` and Kubernetes NetworkPolicy.',
    codeSnippet: `apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: isolate-core-db\nspec:\n  podSelector:\n    matchLabels:\n      app: core-db\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          role: payment-worker-authorized\n    ports:\n    - protocol: TCP\n      port: 1521`
  },
  {
    step: 4,
    title: 'SANDBOX TEST',
    status: 'completed',
    timestamp: '10:06:40 IST',
    details: 'Synthetic sandbox executed 450 simulated banking transactions. 0 false rejections; 100% exploit payload interception.'
  },
  {
    step: 5,
    title: 'SECURITY VALIDATION',
    status: 'completed',
    timestamp: '10:07:05 IST',
    details: 'Automated Red Team regression suite passed. Attack Path #07 confirmed blocked.'
  },
  {
    step: 6,
    title: 'RISK REASSESSMENT',
    status: 'completed',
    timestamp: '10:07:20 IST',
    details: 'Expected Annual Loss recomputed: ₹4.23 Cr -> ₹74 L (-₹3.46 Cr, 82% risk reduction).'
  },
  {
    step: 7,
    title: 'CREATE PULL REQUEST',
    status: 'completed',
    timestamp: '10:07:35 IST',
    details: 'Created PR #419 on \`banking-core-infrastructure\` with cryptographic audit trace attached.'
  },
  {
    step: 8,
    title: 'HUMAN APPROVAL',
    status: 'waiting_approval',
    details: 'WAITING FOR CISO / SECURITY LEAD SIGN-OFF. Production deployment will NOT execute without explicit authorization.'
  },
  {
    step: 9,
    title: 'PRODUCTION DEPLOYMENT',
    status: 'pending',
    details: 'Canary rollout to AWS/GCP clusters with instant automated rollback telemetry trigger.'
  }
];

export const COMPLIANCE_FINDINGS: ComplianceItem[] = [
  {
    id: 'CMP-01',
    framework: 'RBI',
    category: 'Cyber Security Framework for Banks (Annex G)',
    finding: 'Multi-factor authentication required for all administrative access and privileged sessions',
    control: 'Phishing-Resistant MFA (FIDO2)',
    evidence: 'Active simulation confirms FIDO2 hardware token enforcement on IAM-PRIV-01',
    mappingCode: 'RBI-CS-G.4.2',
    timestamp: '2026-09-24 10:06 IST',
    status: 'Mapped Control'
  },
  {
    id: 'CMP-02',
    framework: 'SEBI CSCRF',
    category: 'Section 4.1: Attack Surface Management & Threat Identification',
    finding: 'Continuous discovery and automated quantification of public perimeter attack paths',
    control: 'Digital Twin Graph Telemetry',
    evidence: 'Attack Path #07 visualized with blast radius of ₹2.8 Cr and real-time alerts',
    mappingCode: 'SEBI-CSCRF-AS-01',
    timestamp: '2026-09-24 10:05 IST',
    status: 'Evidence Available'
  },
  {
    id: 'CMP-03',
    framework: 'NIST CSF 2.0',
    category: 'PROTECT (PR.AA-01)',
    finding: 'Identities and credentials for authorized users and services are managed and verified',
    control: 'Just-In-Time PAM & MFA',
    evidence: 'FIDO2 implementation blocks credential replay attack vectors',
    mappingCode: 'NIST-CSF-PR.AA-01',
    timestamp: '2026-09-24 10:06 IST',
    status: 'Coverage'
  },
  {
    id: 'CMP-04',
    framework: 'DPDP',
    category: 'Digital Personal Data Protection Act 2023 - Section 8(5)',
    finding: 'Reasonable security safeguards to prevent personal data breach from databases',
    control: 'Crown Jewel Database Isolation',
    evidence: 'Core Transaction DB holds 4.2M customer records; requires airgapped proxy',
    mappingCode: 'DPDP-ACT-SEC-8.5',
    timestamp: '2026-09-24 10:04 IST',
    status: 'Gap'
  },
  {
    id: 'CMP-05',
    framework: 'ISO/IEC 27001',
    category: 'Annex A.8.20 Network Security',
    finding: 'Networks are secured, managed and controlled to protect information in systems',
    control: 'Zero Trust Microsegmentation',
    evidence: 'Lateral movement path between App Service and DB isolated via Envoy network policy',
    mappingCode: 'ISO-27001-A.8.20',
    timestamp: '2026-09-24 10:07 IST',
    status: 'Mapped Control'
  }
];

export const INITIAL_AUDIT_RECORDS: AuditRecord[] = [
  {
    id: 'AUD-8921',
    telemetryId: 'TEL-EVENT-99824',
    calculationId: 'CALC-MC-449102',
    timestamp: '2026-09-24 10:06:05.112 IST',
    riskModelVersion: 'CyRIS-v2.4-HybridMonteCarlo',
    inputHash: '0x8f2d4e8b39c012fa7b89d443210eabbc',
    calculationHash: '0x17c9b0e12d4a5588390f11ae23d49c81',
    proofStatus: 'SIMULATION / DEMO',
    algorithm: 'Deterministic Monte Carlo Simulation (100,000 iterations)',
    notes: 'Cryptographic backend abstraction mode. In production, this anchors to zk-SNARK / Hyperledger verifiable log.'
  },
  {
    id: 'AUD-8920',
    telemetryId: 'TEL-EVENT-99820',
    calculationId: 'CALC-MC-449098',
    timestamp: '2026-09-24 10:05:24.891 IST',
    riskModelVersion: 'CyRIS-v2.4-HybridMonteCarlo',
    inputHash: '0x3a4b91ce092288df7610abbd98762310',
    calculationHash: '0x992318ab4c10ef92311782e44dcb3298',
    proofStatus: 'SIMULATION / DEMO',
    algorithm: 'Deterministic Monte Carlo Simulation (100,000 iterations)',
    notes: 'Risk spike assessment post CVE-2024-4281 ingestion.'
  }
];
