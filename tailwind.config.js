/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: { DEFAULT: '#6366f1', dark: '#4f46e5', light: '#e0e7ff' },
      },
      keyframes: {
        'count-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)',    opacity: '1'   },
          '100%': { transform: 'scale(1.6)', opacity: '0'   },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'count-up':   'count-up 0.5s ease-out forwards',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
        'slide-up':   'slide-up 0.6s ease-out forwards',
        'fade-in':    'fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
