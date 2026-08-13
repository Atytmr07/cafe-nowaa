import type { Config } from 'tailwindcss';

/**
 * "Nowaa Monochrome Luxe" — pearl/platinum on a near-black ground, with
 * gold reserved as the single warm accent: the hero mark, prices, ratings
 * and "Şefin Önerisi" marks. Everything else stays monochrome so gold
 * reads as a deliberate signal, not decoration.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // A notch off true black so texture and depth still read on OLED
        // screens instead of crushing to a flat void.
        obsidian: '#131316',
        onyx: '#1B1B1F',
        graphite: '#242429',
        pearl: '#F6F5F2',
        ivory: '#FFFFFF',
        platinum: '#D8D9DC',
        silver: '#A9ABB0',
        steel: '#6C6E74',
        ink: '#101012',
        gold: '#C6A15B',
        'gold-bright': '#E8C878',
        'gold-deep': '#8C6E38',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Didot', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        depth: '0 24px 70px rgba(0, 0, 0, 0.6)',
        soft: '0 10px 30px rgba(16, 16, 18, 0.07)',
        halo: '0 0 40px rgba(216, 217, 220, 0.18)',
        'halo-strong': '0 0 60px rgba(246, 245, 242, 0.28)',
        'glow-gold': '0 0 40px rgba(198, 161, 91, 0.35)',
        'glow-gold-strong': '0 0 80px rgba(232, 200, 120, 0.55)',
      },
      backgroundImage: {
        // Abstracted vertical wood-slat rhythm from the real façade
        slats:
          'repeating-linear-gradient(90deg, transparent 0px, transparent 26px, rgba(246, 245, 242, 0.026) 26px, rgba(246, 245, 242, 0.026) 27px)',
      },
      letterSpacing: {
        luxe: '0.32em',
      },
    },
  },
  plugins: [],
};

export default config;
