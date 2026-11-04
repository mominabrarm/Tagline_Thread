/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Palette - Volcanic Ash
        'brand-bg':        '#212529',
        'brand-ash':       '#E9ECEF',
        'brand-orange':    '#FB5607',
        'brand-purple':    '#8338EC',
        // Surface tiers
        'surface-base':    '#16181B',
        'surface-card':    '#2A2E33',
        'surface-high':    '#363A3E',
        'muted':           '#9BA3AF',
      },
      fontFamily: {
        'syne':         ['Syne', 'sans-serif'],
        'geist':        ['Geist', 'sans-serif'],
        'grotesk':      ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'ping-slow':  'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'orange-purple': 'linear-gradient(135deg, #FB5607, #8338EC)',
        'hero-radial':   'radial-gradient(ellipse at 30% 50%, rgba(251,86,7,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(131,56,236,0.18) 0%, transparent 60%)',
      },
      boxShadow: {
        'orange-glow':   '0 0 30px -5px rgba(251,86,7,0.45)',
        'orange-glow-lg':'0 0 50px -3px rgba(251,86,7,0.6)',
        'purple-glow':   '0 0 25px -5px rgba(131,56,236,0.4)',
        'card-hover':    '0 0 30px -5px rgba(251,86,7,0.35), 0 0 15px -3px rgba(131,56,236,0.25)',
      },
    },
  },
  plugins: [],
}

