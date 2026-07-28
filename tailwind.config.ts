import type { Config } from 'tailwindcss';

/**
 * "Nowaa Monochrome Luxe" — palette derived directly from the real
 * backlit NV roundel: pure white mark on deep black, with platinum and
 * silver as the only accents. No gold, no colour casts.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0C',
        onyx: '#131315',
        graphite: '#1D1D20',
        pearl: '#F6F5F2',
        ivory: '#FFFFFF',
        platinum: '#D8D9DC',
        silver: '#A9ABB0',
        steel: '#6C6E74',
        ink: '#101012',
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
      },
      backgroundImage: {
        // Abstracted vertical wood-slat rhythm from the real façade
        slats:
          'repeating-linear-gradient(90deg, transparent 0px, transparent 26px, rgba(246, 245, 242, 0.022) 26px, rgba(246, 245, 242, 0.022) 27px)',
      },
      letterSpacing: {
        luxe: '0.32em',
      },
    },
  },
  plugins: [],
};

export default config;
