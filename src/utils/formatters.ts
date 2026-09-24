// Currency and metric formatting utilities for CyRIS (INR Lakhs & Crores)

export function formatINR(val: number): string {
  if (Math.abs(val) >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  }
  if (Math.abs(val) >= 100000) {
    const l = val / 100000;
    return `₹${l.toFixed(2)} L`;
  }
  if (Math.abs(val) >= 1000) {
    return `₹${(val / 1000).toFixed(1)}k`;
  }
  return `₹${Math.round(val)}`;
}

export function formatINRFull(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
}

export function formatROSI(val: number): string {
  return `${Math.round(val)}%`;
}

export function formatNumber(val: number, decimals: number = 2): string {
  return val.toFixed(decimals);
}
