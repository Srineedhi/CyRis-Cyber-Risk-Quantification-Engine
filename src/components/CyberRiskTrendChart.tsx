import React from 'react';
import { useCyris } from '../context/CyrisContext';
import { formatINR } from '../utils/formatters';
import { TrendingUp, Calendar, Zap, ShieldCheck } from 'lucide-react';

export const CyberRiskTrendChart: React.FC = () => {
  const { timeRange, setTimeRange, metrics, activeControlIds } = useCyris();
  const isMitigated = activeControlIds.length > 0;

  // Time series points for the SVG trend
  // When mitigated: the curve dips sharply at the end
  const points = [
    { label: '09:00', eal: 1200000, desc: 'Enterprise Baseline' },
    { label: '09:30', eal: 1400000, desc: 'Normal Activity' },
    { label: '10:04', eal: 18000000, desc: 'CVE-2024-4281 Ingested' },
    { label: '10:05', eal: 38000000, desc: 'Attack Path AP-07 Formed' },
    { label: '10:06', eal: 42300000, desc: 'Spike Peak: EAL ₹4.23 Cr' },
    { 
      label: '10:07', 
      eal: isMitigated ? 7400000 : 42300000, 
      desc: isMitigated ? 'Mitigated with FIDO2 MFA' : 'Unmitigated Threat Active' 
    }
  ];

  // SVG coordinate calculations (width 700, height 220)
  const maxEal = 48000000;
  const svgWidth = 720;
  const svgHeight = 200;
  const paddingX = 50;
  const paddingY = 30;

  const getX = (index: number) => {
    return paddingX + (index / (points.length - 1)) * (svgWidth - paddingX * 2);
  };

  const getY = (val: number) => {
    const norm = (val / maxEal);
    return svgHeight - paddingY - norm * (svgHeight - paddingY * 2);
  };

  // Build SVG path
  const pathD = points.reduce((acc, pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.eal);
    if (idx === 0) return `M ${x} ${y}`;
    const prevX = getX(idx - 1);
    const prevY = getY(points[idx - 1].eal);
    const cX1 = prevX + (x - prevX) / 2;
    const cY1 = prevY;
    const cX2 = prevX + (x - prevX) / 2;
    const cY2 = y;
    return `${acc} C ${cX1} ${cY1}, ${cX2} ${cY2}, ${x} ${y}`;
  }, '');

  // Fill area under curve
  const areaD = `${pathD} L ${getX(points.length - 1)} ${svgHeight - paddingY} L ${getX(0)} ${svgHeight - paddingY} Z`;

  return (
    <div className="w-full cyber-panel rounded-xl p-4 flex flex-col">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/15 pb-2.5 gap-2">
        <div className="flex items-center space-x-2.5">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
            CYBER RISK TREND & TEMPORAL QUANTIFICATION
          </h3>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            EAL &middot; Monte Carlo Trajectory
          </span>
        </div>

        {/* Time Filter Pills */}
        <div className="flex items-center space-x-1">
          {(['1H', '24H', '7D', '30D'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                timeRange === range
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-cyber'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Time-Series Chart */}
      <div className="mt-4 relative w-full h-[210px] overflow-hidden select-none">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="trend-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isMitigated ? '#10b981' : '#ef4444'} stopOpacity="0.35" />
              <stop offset="100%" stopColor={isMitigated ? '#10b981' : '#ef4444'} stopOpacity="0.0" />
            </linearGradient>
            <filter id="chart-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={getY(40000000)}
            x2={svgWidth - paddingX}
            y2={getY(40000000)}
            stroke="rgba(239, 68, 68, 0.15)"
            strokeDasharray="4, 4"
          />
          <text
            x={paddingX - 10}
            y={getY(40000000) + 3}
            fill="#ef4444"
            fontSize="8"
            fontFamily="JetBrains Mono"
            textAnchor="end"
          >
            ₹4.0 Cr
          </text>

          <line
            x1={paddingX}
            y1={getY(20000000)}
            x2={svgWidth - paddingX}
            y2={getY(20000000)}
            stroke="rgba(16, 185, 129, 0.1)"
            strokeDasharray="4, 4"
          />
          <text
            x={paddingX - 10}
            y={getY(20000000) + 3}
            fill="#94a3b8"
            fontSize="8"
            fontFamily="JetBrains Mono"
            textAnchor="end"
          >
            ₹2.0 Cr
          </text>

          <line
            x1={paddingX}
            y1={getY(5000000)}
            x2={svgWidth - paddingX}
            y2={getY(5000000)}
            stroke="rgba(16, 185, 129, 0.2)"
            strokeDasharray="4, 4"
          />
          <text
            x={paddingX - 10}
            y={getY(5000000) + 3}
            fill="#10b981"
            fontSize="8"
            fontFamily="JetBrains Mono"
            textAnchor="end"
          >
            Baseline
          </text>

          {/* Fill under trend line */}
          <path d={areaD} fill="url(#trend-fill)" />

          {/* Trend Line */}
          <path
            d={pathD}
            fill="none"
            stroke={isMitigated ? '#10b981' : '#ef4444'}
            strokeWidth="2.5"
            filter="url(#chart-glow)"
          />

          {/* Data Points */}
          {points.map((pt, idx) => {
            const x = getX(idx);
            const y = getY(pt.eal);
            const isSpikePoint = idx === 4;
            const isMitigatedPoint = idx === 5 && isMitigated;

            return (
              <g key={idx} className="group cursor-pointer">
                <circle
                  cx={x}
                  cy={y}
                  r={isSpikePoint || isMitigatedPoint ? "5.5" : "3.5"}
                  fill={isMitigatedPoint ? "#00ff9d" : isSpikePoint ? "#ef4444" : "#10b981"}
                  stroke="#050706"
                  strokeWidth="2"
                  className="transition-transform group-hover:scale-150"
                />

                {/* X axis labels */}
                <text
                  x={x}
                  y={svgHeight - 10}
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>

                {/* Point hover tooltip label */}
                <text
                  x={x}
                  y={y - 12}
                  fill={isMitigatedPoint ? "#00ff9d" : isSpikePoint ? "#f87171" : "#cbd5e1"}
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {formatINR(pt.eal)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Trajectory Annotations Footer */}
      <div className="mt-2.5 pt-2 border-t border-emerald-500/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span>Intrusion Spike: <strong className="text-white">10:06 IST (₹4.23 Cr)</strong></span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>
            {isMitigated 
              ? 'Post-Remediation Projected EAL: ₹74 L (-82%)' 
              : 'Counterfactual Simulation Ready'}
          </span>
        </div>
      </div>
    </div>
  );
};
