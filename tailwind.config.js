/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Palette - Volcanic Ash (Darker near-black dominant & hyper-saturated accents)
        'brand-bg':        '#0a0c0d',
        'brand-ash':       '#E9ECEF',
        'brand-orange':    '#FF5400',
        'brand-purple':    '#8824FF',
        // Surface tiers
        'surface-base':    '#0C0E10',
        'surface-card':    '#181B1F',
        'surface-high':    '#23272D',
        'muted':           '#9BA3AF',
      },
      fontFamily: {
        'playfair':     ['"Playfair Display"', 'Georgia', 'serif'],
        'manrope':      ['Manrope', 'sans-serif'],
        'grotesk':      ['"Space Grotesk"', 'sans-serif'],
        'sans':         ['Manrope', 'sans-serif'],
        'geist':        ['Manrope', 'sans-serif'],
        'syne':         ['"Playfair Display"', 'Georgia', 'serif'],
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
        'orange-purple': 'linear-gradient(135deg, #FF5400, #8824FF)',
        'hero-radial':   'radial-gradient(ellipse at 30% 50%, rgba(255,84,0,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(136,36,255,0.20) 0%, transparent 60%)',
      },
      boxShadow: {
        'orange-glow':   '0 0 30px -5px rgba(255,84,0,0.5)',
        'orange-glow-lg':'0 0 50px -3px rgba(255,84,0,0.7)',
        'purple-glow':   '0 0 25px -5px rgba(136,36,255,0.45)',
        'card-hover':    '0 0 30px -5px rgba(255,84,0,0.4), 0 0 15px -3px rgba(136,36,255,0.3)',
      },
    },
  },
  plugins: [],
}

