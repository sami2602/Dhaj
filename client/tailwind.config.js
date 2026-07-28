/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050506',
          900: '#09090B',
          850: '#0E0E12',
          800: '#15151B',
          700: '#1C1C24',
          600: '#262632'
        },
        gold: {
          50: '#FFFDF5',
          100: '#FDF6DC',
          200: '#F9E9B0',
          300: '#F5D77D',
          400: '#EFC04D',
          500: '#D4AF37', // Official Antique Gold
          600: '#AA8825',
          700: '#806218',
          800: '#5C4410',
          900: '#3D2C0A'
        },
        champagne: '#F3E5AB',
        ivory: '#F9F9FB',
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5D77D 0%, #D4AF37 50%, #996515 100%)',
        'gold-gradient-soft': 'linear-gradient(135deg, #FFFDD0 0%, #D4AF37 100%)',
        'obsidian-radial': 'radial-gradient(circle at center, #15151B 0%, #050506 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 45px 0px rgba(212, 175, 55, 0.45)',
        'obsidian-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
