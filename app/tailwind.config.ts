import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base dark palette
        surface: {
          900: '#0B0D11',  // deepest background
          800: '#0F1117',  // main background
          700: '#151821',  // card background
          600: '#1A1D27',  // elevated surfaces
          500: '#21252F',  // hover states
          400: '#2A2F3A',  // borders, dividers
          300: '#353A47',  // subtle borders
        },
        // Text hierarchy
        content: {
          primary: '#F0F2F5',
          secondary: '#8B92A5',
          tertiary: '#5C6378',
          muted: '#3D4455',
        },
        // Dimension accent colors
        dimension: {
          str: '#6366F1', // indigo — Strategy
          dat: '#06B6D4', // cyan — Data
          tal: '#F59E0B', // amber — Talent
          gov: '#EF4444', // red — Governance
          cul: '#8B5CF6', // violet — Culture
          pro: '#10B981', // emerald — Processes
        },
        // Severity
        severity: {
          critical: '#EF4444',
          high: '#F59E0B',
          medium: '#6366F1',
        },
        // Accent
        accent: {
          DEFAULT: '#6366F1',
          hover: '#818CF8',
          muted: '#6366F120',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
        lg: '6px',
      },
      spacing: {
        18: '4.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'draw': 'draw 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
