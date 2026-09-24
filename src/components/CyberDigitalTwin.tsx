import React, { useState } from 'react';
import { useCyris } from '../context/CyrisContext';
import { AssetNode, AttackPath } from '../types';
import { formatINR } from '../utils/formatters';
import { 
  Shield, 
  Database, 
  Globe, 
  Server, 
  Key, 
  Laptop, 
  Cloud, 
  AlertTriangle, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';

export const CyberDigitalTwin: React.FC = () => {
  const { 
    assets, 
    attackPaths, 
    selectedAsset, 
    setSelectedAsset, 
    selectedAttackPath, 
    setSelectedAttackPath 
  } = useCyris();

  const [activePathFilter, setActivePathFilter] = useState<string>('AP-07');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Map asset IDs to nodes
  const assetMap = new Map<string, AssetNode>();
  assets.forEach(a => assetMap.set(a.id, a));

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  // Node icon helper
  const getNodeIcon = (type: string, isCrown?: boolean) => {
    if (isCrown) return Database;
    switch (type) {
      case 'Internet Gateway': return Globe;
      case 'API Gateway': return Layers;
      case 'Auth Service': return Key;
      case 'IAM': return Lock;
      case 'App Service': return Server;
      case 'Cloud VM': return Cloud;
      case 'Database': return Database;
      case 'Endpoint': return Laptop;
      default: return Server;
    }
  };

  // Edge definition between nodes
  const edges = [
    { from: 'INTERNET-EXT', to: 'API-GATEWAY-01', label: 'T1190 Exploit', pathId: 'AP-07', tactic: 'Exploit' },
    { from: 'API-GATEWAY-01', to: 'AUTH-SERVICE-01', label: 'T1078 Token Hijack', pathId: 'AP-07', tactic: 'Credential Abuse' },
    { from: 'AUTH-SERVICE-01', to: 'IAM-PRIV-01', label: 'T1068 Privilege Esc', pathId: 'AP-07', tactic: 'Privilege Escalation' },
    { from: 'IAM-PRIV-01', to: 'PAYMENT-SERVICE-01', label: 'T1021 Lateral Pivot', pathId: 'AP-07', tactic: 'Lateral Movement' },
    { from: 'PAYMENT-SERVICE-01', to: 'CORE-DB-01', label: 'T1552 DB Exfil', pathId: 'AP-07', tactic: 'Control Bypass' },
    
    // Path 03 edges
    { from: 'INTERNET-EXT', to: 'CLOUD-VM-104', label: 'T1190 Ingress', pathId: 'AP-03', tactic: 'Exploit' },
    { from: 'CLOUD-VM-104', to: 'IAM-PRIV-01', label: 'T1611 Namespace Escape', pathId: 'AP-03', tactic: 'Privilege Escalation' },
    { from: 'IAM-PRIV-01', to: 'CORE-DB-01', label: 'T1078 DB Root Bypass', pathId: 'AP-03', tactic: 'Control Bypass' },

    // Path 12 edges
    { from: 'INTERNET-EXT', to: 'EDR-ENDPOINT-021', label: 'T1566 Phishing', pathId: 'AP-12', tactic: 'Exploit' },
    { from: 'EDR-ENDPOINT-021', to: 'AUTH-SERVICE-01', label: 'T1003 Kerberoast', pathId: 'AP-12', tactic: 'Credential Abuse' },
  ];

  const currentPathObj = attackPaths.find(p => p.id === activePathFilter) || attackPaths[0];

  return (
    <div className="w-full cyber-panel rounded-xl flex flex-col relative overflow-hidden h-[540px]">
      {/* Top Header inside Twin */}
      <div className="p-3.5 border-b border-emerald-500/20 bg-black/40 flex flex-wrap items-center justify-between gap-2.5 z-10">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              ENTERPRISE CYBER DIGITAL TWIN &middot; TOPOLOGY GRAPH
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            {assets.length} ASSETS &middot; {attackPaths.length} ACTIVE PATHS
          </span>
        </div>

        {/* Path Filter Selector Buttons */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline mr-1">PATH:</span>
          {attackPaths.map((path) => {
            const isSelected = activePathFilter === path.id;
            const isDisrupted = path.status === 'DISRUPTED';
            return (
              <button
                key={path.id}
                onClick={() => {
                  setActivePathFilter(path.id);
                  setSelectedAttackPath(path);
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? isDisrupted 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-cyber' 
                      : 'bg-red-500/20 text-red-300 border border-red-500/60 shadow-cyber-danger'
                    : 'bg-slate-900/60 border border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{path.id}</span>
                {isDisrupted ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center space-x-1 pl-2 border-l border-emerald-500/20">
          <button
            onClick={() => setZoomLevel(z => Math.min(1.6, z + 0.15))}
            title="Zoom In"
            className="p-1 rounded bg-slate-900/70 hover:bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(z => Math.max(0.6, z - 0.15))}
            title="Zoom Out"
            className="p-1 rounded bg-slate-900/70 hover:bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetView}
            title="Reset Pan/Zoom"
            className="p-1 rounded bg-slate-900/70 hover:bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div 
        className="flex-1 relative cyber-grid-bg overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 840 400"
          preserveAspectRatio="xMidYMid meet"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
        >
          <defs>
            {/* Emerald glow filter */}
            <filter id="emerald-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Danger red glow filter */}
            <filter id="danger-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Gradient for critical attack flow */}
            <linearGradient id="attack-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
            </linearGradient>

            {/* Gradient for healthy mitigated flow */}
            <linearGradient id="mitigated-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00ff9d" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Render Attack Path Edges */}
          {edges.map((edge, idx) => {
            const fromNode = assetMap.get(edge.from);
            const toNode = assetMap.get(edge.to);
            if (!fromNode || !toNode) return null;

            const isPartOfActivePath = edge.pathId === activePathFilter;
            const isPathDisrupted = currentPathObj?.status === 'DISRUPTED';
            const strokeColor = isPartOfActivePath 
              ? (isPathDisrupted ? '#10b981' : '#ef4444') 
              : 'rgba(16, 185, 129, 0.2)';
            const strokeWidth = isPartOfActivePath ? 2.5 : 1.2;

            // Curved bezier path
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const cx1 = fromNode.x + dx * 0.45;
            const cy1 = fromNode.y;
            const cx2 = fromNode.x + dx * 0.55;
            const cy2 = toNode.y;
            const pathD = `M ${fromNode.x} ${fromNode.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${toNode.x} ${toNode.y}`;

            return (
              <g key={`edge-${idx}`} className="cursor-pointer">
                {/* Background edge glow */}
                {isPartOfActivePath && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth + 4}
                    strokeOpacity={0.25}
                  />
                )}

                {/* Main edge line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={isPartOfActivePath ? "6, 6" : "none"}
                  className={isPartOfActivePath ? "animate-dash-flow" : ""}
                />

                {/* Animated traveling photon packet on active path */}
                {isPartOfActivePath && !isPathDisrupted && (
                  <circle r="3.5" fill="#ef4444" filter="url(#danger-glow)">
                    <animateMotion
                      path={pathD}
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Tactic label along edge */}
                {isPartOfActivePath && (
                  <g transform={`translate(${(fromNode.x + toNode.x) / 2}, ${(fromNode.y + toNode.y) / 2 - 8})`}>
                    <rect
                      x="-42"
                      y="-9"
                      width="84"
                      height="16"
                      rx="3"
                      fill="#050706"
                      stroke={strokeColor}
                      strokeWidth="0.8"
                      opacity="0.9"
                    />
                    <text
                      textAnchor="middle"
                      dy="3"
                      fill={strokeColor}
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                    >
                      {edge.tactic}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Render Digital Twin Nodes */}
          {assets.map((asset) => {
            const isSelected = selectedAsset?.id === asset.id;
            const isCrown = !!asset.isCrownJewel;
            const isCompromised = asset.status === 'compromised';
            const isAtRisk = asset.status === 'at-risk';
            const isProtected = asset.status === 'protected';

            const borderColor = isCompromised
              ? '#ef4444'
              : isAtRisk
              ? '#f59e0b'
              : isProtected
              ? '#00ff9d'
              : '#10b981';

            const IconComponent = getNodeIcon(asset.type, isCrown);

            return (
              <g
                key={asset.id}
                transform={`translate(${asset.x}, ${asset.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAsset(asset);
                }}
                className="cursor-pointer group"
              >
                {/* Crown Jewel Outer Rings */}
                {isCrown && (
                  <>
                    <circle
                      r="36"
                      fill="none"
                      stroke="rgba(0, 255, 157, 0.25)"
                      strokeWidth="1.5"
                      strokeDasharray="4, 4"
                      className="animate-spin"
                      style={{ animationDuration: '24s' }}
                    />
                    <circle
                      r="42"
                      fill="none"
                      stroke={borderColor}
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </>
                )}

                {/* Selection Highlight Ring */}
                {isSelected && (
                  <circle
                    r="34"
                    fill="none"
                    stroke="#00ff9d"
                    strokeWidth="2.5"
                    filter="url(#emerald-glow)"
                    className="animate-pulse"
                  />
                )}

                {/* Node Base Circle */}
                <circle
                  r={isCrown ? "28" : "22"}
                  fill="#080e0b"
                  stroke={borderColor}
                  strokeWidth={isCrown ? "2.5" : "1.8"}
                  filter={isCompromised ? "url(#danger-glow)" : "url(#emerald-glow)"}
                  className="transition-all group-hover:scale-110"
                />

                {/* Vulnerability Alert Pip */}
                {asset.vulnerabilities.length > 0 && (
                  <circle
                    cx="14"
                    cy="-14"
                    r="6"
                    fill="#ef4444"
                    stroke="#050706"
                    strokeWidth="1.5"
                    className="animate-ping"
                  />
                )}

                {/* Embedded SVG Icon Center */}
                <foreignObject
                  x={isCrown ? -14 : -11}
                  y={isCrown ? -14 : -11}
                  width={isCrown ? 28 : 22}
                  height={isCrown ? 28 : 22}
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <IconComponent
                      className={`w-4 h-4 ${
                        isCompromised 
                          ? 'text-red-400' 
                          : isAtRisk 
                          ? 'text-amber-400' 
                          : 'text-emerald-400'
                      }`}
                    />
                  </div>
                </foreignObject>

                {/* Node Name Label */}
                <text
                  textAnchor="middle"
                  y={isCrown ? 42 : 36}
                  fill="#f1f5f9"
                  fontSize="9.5"
                  fontFamily="Inter, sans-serif"
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {asset.name}
                </text>

                {/* Subtext: Criticality or Exposure */}
                <text
                  textAnchor="middle"
                  y={isCrown ? 53 : 47}
                  fill={isCompromised ? '#f87171' : '#94a3b8'}
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  className="pointer-events-none"
                >
                  {isCompromised 
                    ? `Exp: ${formatINR(asset.financialExposure)}` 
                    : asset.criticality}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Quick Legend in bottom left */}
        <div className="absolute bottom-2.5 left-2.5 px-3 py-2 rounded-lg bg-black/85 backdrop-blur-md border border-emerald-500/20 text-[10px] font-mono text-slate-300 flex items-center space-x-3 pointer-events-auto">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Compromised</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>At-Risk</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Protected / Disrupted</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-500/40" />
            <span>Crown Jewel</span>
          </div>
        </div>

        {/* Selected Attack Path Quick Summary pill on top right */}
        {currentPathObj && (
          <div 
            onClick={() => setSelectedAttackPath(currentPathObj)}
            className="absolute top-2.5 right-2.5 px-3.5 py-2 rounded-lg bg-black/90 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-400 text-xs font-mono cursor-pointer transition-all shadow-cyber pointer-events-auto max-w-xs"
          >
            <div className="flex items-center justify-between space-x-2">
              <span className="font-bold text-white uppercase truncate">
                {currentPathObj.id}: {currentPathObj.entryPoint} &rarr; {currentPathObj.target}
              </span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                currentPathObj.status === 'DISRUPTED'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-red-500/20 text-red-300 border border-red-500/40'
              }`}>
                {currentPathObj.status}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Blast Radius: <strong className="text-white">{formatINR(currentPathObj.financialBlastRadius)}</strong></span>
              <span>Likelihood: <strong className="text-emerald-400">{currentPathObj.likelihood}%</strong></span>
            </div>
            <div className="mt-0.5 text-[9px] text-emerald-400/80 underline text-right">
              Click for detailed exploit chain &rarr;
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
