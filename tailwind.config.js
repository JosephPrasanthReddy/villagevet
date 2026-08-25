/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brown -- core brand color (trust, rural identity, care)
        brand: {
          DEFAULT: '#8B451F',
          dark: '#6E3719',
          deep: '#3B2418',
          light: '#F3E5D6'
        },
        // Golden -- secondary/accent color (vitality, prosperity, warmth)
        gold: {
          DEFAULT: '#C88924',
          dark: '#A5701D',
          // pale gold-cream tint, used as subtle background fill behind icons/badges
          light: '#F6E9CC',
          // the brief's exact "Light Gold" accent -- for highlights, underlines,
          // gradient stops, and other accent use (not pale background fills)
          accent: '#DFAF3A'
        },
        // Dark brown -- headings and primary text
        ink: {
          DEFAULT: '#3B2418',
          light: '#F2EEE8'
        },
        // Warm brown informational accents
        info: {
          DEFAULT: '#6E3719',
          light: '#F3E5D6'
        },
        cream: '#FFF9EF',
        sand: '#F8F1E5',
        soil: '#6F6259'
      },
      fontFamily: {
        heading: ['"Fraunces"', '"Plus Jakarta Sans"', 'serif'],
        body: ['Inter', 'sans-serif']
      },
      maxWidth: {
        content: '1280px'
      },
      boxShadow: {
        card: '0 1px 2px rgba(43,31,23,0.05), 0 8px 24px rgba(43,31,23,0.07)',
        cardHover: '0 4px 8px rgba(43,31,23,0.07), 0 16px 32px rgba(43,31,23,0.12)',
        soft: '0 24px 60px -20px rgba(74,42,24,0.28)',
        lift: '0 30px 70px -25px rgba(43,31,23,0.38)'
      },
      borderRadius: {
        xl2: '1.25rem',
        organic: '2rem 2rem 2rem 0.5rem',
        'organic-r': '2rem 2rem 0.5rem 2rem',
        blob: '63% 37% 54% 46% / 43% 44% 56% 57%'
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(rgba(43,31,23,0.09) 1px, transparent 1px)'
      },
      backgroundSize: {
        dots: '18px 18px'
      }
    }
  },
  plugins: []
}
