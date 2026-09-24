/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyris: {
          bg: '#050706',
          panel: 'rgba(9, 14, 11, 0.75)',
          'panel-solid': '#090f0c',
          card: 'rgba(13, 22, 17, 0.65)',
          border: 'rgba(16, 185, 129, 0.18)',
          'border-bright': 'rgba(16, 185, 129, 0.4)',
          glow: 'rgba(0, 255, 157, 0.15)',
          emerald: '#10b981',
          neon: '#00ff9d',
          mint: '#6ee7b7',
          muted: '#64748b',
          text: '#e2e8f0',
          subtext: '#94a3b8',
          danger: '#ef4444',
          'danger-border': 'rgba(239, 68, 68, 0.3)',
          warning: '#f59e0b',
          info: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'Consolas', 'monospace']
      },
      boxShadow: {
        'cyber': '0 0 20px -3px rgba(16, 185, 129, 0.18)',
        'cyber-lg': '0 0 30px -4px rgba(0, 255, 157, 0.25)',
        'cyber-danger': '0 0 25px -4px rgba(239, 68, 68, 0.3)',
        'glow-emerald': '0 0 10px rgba(0, 255, 157, 0.4)',
        'glow-danger': '0 0 10px rgba(239, 68, 68, 0.5)'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-ping': 'glowPing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glowPing: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '0' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
