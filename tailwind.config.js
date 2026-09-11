/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ios: {
          bg: '#000000',
          card: 'rgba(255, 255, 255, 0.08)',
          cardDark: 'rgba(18, 18, 22, 0.65)',
          border: 'rgba(255, 255, 255, 0.12)',
          accent: '#0A84FF', // iOS Blue
          emerald: '#30D158', // iOS Green
          purple: '#BF5AF2', // iOS Purple
          orange: '#FF9F0A', // iOS Orange
          pink: '#FF375F', // iOS Pink
          cyan: '#64D2FF', // iOS Cyan
          gold: '#FFD60A', // iOS Yellow
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Inter"', 'sans-serif'],
        mono: ['"SF Mono"', '"Fira Code"', 'monospace'],
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '60px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'island-expand': 'islandExpand 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'ios-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'ios-glow': '0 0 25px rgba(10, 132, 255, 0.35)',
        'ios-dark-glow': '0 0 40px rgba(0, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
}
