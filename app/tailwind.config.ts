import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme surfaces (warm cream)
        surface: {
          900: '#111110',
          800: '#1A1918',
          700: '#232220',
          600: '#2E2D2A',
          500: '#3D3C38',
          400: '#D8D7D3',
          300: '#E5E4E0',
          200: '#F2F1EE',
          100: '#FAFAF8',
          50: '#FFFFFF',
        },
        // Text hierarchy
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--text-muted)',
        },
        // Dimension accent colors (adapt to theme via CSS vars)
        dimension: {
          str: 'var(--dim-str)',
          dat: 'var(--dim-dat)',
          tal: 'var(--dim-tal)',
          gov: 'var(--dim-gov)',
          cul: 'var(--dim-cul)',
          pro: 'var(--dim-pro)',
        },
        // Severity
        severity: {
          critical: '#BE123C',
          high: '#B45309',
          medium: '#4338CA',
        },
        // Accent
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Source Sans 3', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        sm: '0px',
        DEFAULT: '0px',
        md: '0px',
        lg: '0px',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
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
      },
    },
  },
  plugins: [],
} satisfies Config;
