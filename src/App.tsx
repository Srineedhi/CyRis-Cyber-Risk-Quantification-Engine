import React from 'react';
import { CyrisProvider, useCyris } from './context/CyrisContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PrimaryFinancialRisk } from './components/PrimaryFinancialRisk';
import { CyberDigitalTwin } from './components/CyberDigitalTwin';
import { LeftMonitoringPanels } from './components/LeftMonitoringPanels';
import { RightMonitoringPanels } from './components/RightMonitoringPanels';
import { LiveTelemetryStream } from './components/LiveTelemetryStream';
import { CyberRiskTrendChart } from './components/CyberRiskTrendChart';
import { CounterfactualSimulator } from './components/CounterfactualSimulator';
import { BudgetOptimizer } from './components/BudgetOptimizer';
import { AiSecurityDebate } from './components/AiSecurityDebate';
import { ExplainableRiskCard } from './components/ExplainableRiskCard';
import { AiRemediationCenter } from './components/AiRemediationCenter';
import { ComplianceView } from './components/ComplianceView';
import { CryptographicAuditView } from './components/CryptographicAuditView';
import { AssetInventoryView } from './components/AssetInventoryView';
import { VulnerabilitiesView } from './components/VulnerabilitiesView';
import { ControlsView } from './components/ControlsView';
import { SettingsView } from './components/SettingsView';
import { AssetDetailDrawer } from './components/AssetDetailDrawer';
import { AttackPathModal } from './components/AttackPathModal';
import { DemoController } from './components/DemoController';

const MainContent: React.FC = () => {
  const { activePage } = useCyris();

  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
      {/* 01. OVERVIEW PAGE (HERO COMMAND CENTER) */}
      {activePage === 'overview' && (
        <>
          {/* Primary Financial Risk Metric Hero Section */}
          <PrimaryFinancialRisk />

          {/* Central Command Center Grid (Left Panels, Central Twin, Right Panels) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            {/* Left Monitoring Panels: Alerts, Threat Contributors, Incident Impact */}
            <div className="xl:col-span-3 space-y-4">
              <LeftMonitoringPanels />
            </div>

            {/* Center Column: Cyber Digital Twin + Telemetry + Trend */}
            <div className="xl:col-span-6 space-y-5">
              <CyberDigitalTwin />
              <LiveTelemetryStream />
              <CyberRiskTrendChart />
            </div>

            {/* Right Monitoring Panels: System Health, Active Controls, Top Risk Assets */}
            <div className="xl:col-span-3 space-y-4">
              <RightMonitoringPanels />
            </div>
          </div>

          {/* Lower Core Enterprise Modules Section */}
          <div className="space-y-6 pt-2">
            {/* Explainable Risk ("Why did risk change?") */}
            <ExplainableRiskCard />

            {/* Counterfactual What-If Simulator */}
            <CounterfactualSimulator />

            {/* AI Security Debate (Red, Blue, Judge) */}
            <AiSecurityDebate />

            {/* Security Investment Optimizer */}
            <BudgetOptimizer />

            {/* Safe AI Remediation Center */}
            <AiRemediationCenter />

            {/* Compliance & Regulatory View */}
            <ComplianceView />

            {/* Cryptographic Audit Verification */}
            <CryptographicAuditView />
          </div>
        </>
      )}

      {/* 02. LIVE RISK */}
      {activePage === 'live-risk' && (
        <div className="space-y-6">
          <PrimaryFinancialRisk />
          <CyberRiskTrendChart />
          <LiveTelemetryStream />
          <ExplainableRiskCard />
        </div>
      )}

      {/* 03. ATTACK GRAPH */}
      {activePage === 'attack-graph' && (
        <div className="space-y-6">
          <PrimaryFinancialRisk />
          <CyberDigitalTwin />
          <ExplainableRiskCard />
        </div>
      )}

      {/* 04. ASSET INVENTORY */}
      {activePage === 'asset-inventory' && (
        <div className="space-y-6">
          <AssetInventoryView />
        </div>
      )}

      {/* 05. VULNERABILITIES */}
      {activePage === 'vulnerabilities' && (
        <div className="space-y-6">
          <VulnerabilitiesView />
        </div>
      )}

      {/* 06. CONTROLS */}
      {activePage === 'controls' && (
        <div className="space-y-6">
          <ControlsView />
        </div>
      )}

      {/* 07. AI DEBATE */}
      {activePage === 'ai-debate' && (
        <div className="space-y-6">
          <AiSecurityDebate />
          <ExplainableRiskCard />
        </div>
      )}

      {/* 08. WHAT-IF SIMULATOR */}
      {activePage === 'what-if' && (
        <div className="space-y-6">
          <CounterfactualSimulator />
          <CyberDigitalTwin />
        </div>
      )}

      {/* 09. INVESTMENT OPTIMIZER */}
      {activePage === 'optimizer' && (
        <div className="space-y-6">
          <BudgetOptimizer />
          <CounterfactualSimulator />
        </div>
      )}

      {/* 10. REMEDIATION */}
      {activePage === 'remediation' && (
        <div className="space-y-6">
          <AiRemediationCenter />
        </div>
      )}

      {/* 11. COMPLIANCE */}
      {activePage === 'compliance' && (
        <div className="space-y-6">
          <ComplianceView />
        </div>
      )}

      {/* 12. AUDIT */}
      {activePage === 'audit' && (
        <div className="space-y-6">
          <CryptographicAuditView />
        </div>
      )}

      {/* 13. SYSTEM TELEMETRY */}
      {activePage === 'telemetry' && (
        <div className="space-y-6">
          <LiveTelemetryStream />
          <CyberRiskTrendChart />
        </div>
      )}

      {/* 14. SETTINGS */}
      {activePage === 'settings' && (
        <div className="space-y-6">
          <SettingsView />
        </div>
      )}

      {/* Global Overlays & Modals */}
      <AssetDetailDrawer />
      <AttackPathModal />
      <DemoController />
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <CyrisProvider>
      <div className="min-h-screen bg-[#050706] text-slate-200 flex flex-col font-sans">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </CyrisProvider>
  );
};

export default App;
