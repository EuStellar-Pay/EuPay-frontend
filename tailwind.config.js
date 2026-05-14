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
        surface: {
          0: '#05070f',
          1: '#080c18',
          2: '#0d1220',
          3: '#111827',
          card: 'rgba(255,255,255,0.04)',
          hover: 'rgba(255,255,255,0.07)',
        },
        brand: {
          DEFAULT: '#6366f1',
          hover:   '#818cf8',
          dark:    '#4f46e5',
          glow:    'rgba(99,102,241,0.25)',
        },
        violet: {
          DEFAULT: '#8b5cf6',
          glow:    'rgba(139,92,246,0.2)',
        },
        stream: {
          green:  '#10b981',
          teal:   '#14b8a6',
          yellow: '#f59e0b',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          hover:   'rgba(255,255,255,0.15)',
          brand:   'rgba(99,102,241,0.4)',
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cdefs%3E%3Cpattern id='g' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E\")",
        'radial-brand':  'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)',
        'radial-violet': 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(139,92,246,0.12) 0%, transparent 60%)',
        'gradient-brand':'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-text': 'linear-gradient(135deg, #fff 30%, #a5b4fc 70%, #c4b5fd 100%)',
        'gradient-stream':'linear-gradient(90deg, #6366f1, #8b5cf6, #14b8a6)',
        'glass':         'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'brand-sm':  '0 0 20px rgba(99,102,241,0.2)',
        'brand-md':  '0 0 40px rgba(99,102,241,0.25), 0 0 80px rgba(99,102,241,0.1)',
        'brand-lg':  '0 0 60px rgba(99,102,241,0.3), 0 0 120px rgba(99,102,241,0.15)',
        'glass':     '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glass-hover':'0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
        'card':      '0 2px 12px rgba(0,0,0,0.3)',
        'glow-green':'0 0 20px rgba(16,185,129,0.3)',
      },
      keyframes: {
        'marquee': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'stream-flow': {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        'pulse-dot': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.5', transform: 'scale(0.85)' },
        },
        'glow-pulse': {
          '0%,100%': { boxShadow: '0 0 20px rgba(99,102,241,0.2)' },
          '50%':     { boxShadow: '0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.2)' },
        },
        'slide-right': {
          '0%':   { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)',      opacity: '1' },
        },
        'slide-left': {
          '0%':   { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)',     opacity: '1' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'number-tick': {
          '0%':   { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'marquee':      'marquee 28s linear infinite',
        'stream-flow':  'stream-flow 3s linear infinite',
        'float':        'float 4s ease-in-out infinite',
        'pulse-dot':    'pulse-dot 1.5s ease-in-out infinite',
        'glow-pulse':   'glow-pulse 3s ease-in-out infinite',
        'slide-right':  'slide-right 0.6s ease-out forwards',
        'slide-left':   'slide-left 0.6s ease-out forwards',
        'fade-up':      'fade-up 0.6s ease-out forwards',
        'scale-in':     'scale-in 0.4s ease-out forwards',
        'number-tick':  'number-tick 0.15s ease-out',
      },
    },
  },
  plugins: [],
}
