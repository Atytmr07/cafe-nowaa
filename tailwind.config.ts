import type { Config } from 'tailwindcss';

/**
 * "Nowaa Espresso & Gold".
 *
 * The earlier neutral-grey ground read as generic dark-mode UI — technically
 * correct, emotionally flat. Every dark surface here now carries a warm
 * espresso undertone (red/yellow bias in the shadows) the way a real room lit
 * by warm bulbs does, and the light surfaces are cream rather than blue-white.
 * Gold is a genuinely saturated brass, not the washed sand it was.
 */
const config: Config = {
  // `data/` and `config/` must be scanned too: data/gallery.ts carries the
  // per-image `aspect-[3/4]` classes, and with the directory unscanned that
  // class was never generated — five gallery tiles collapsed to zero height
  // and vanished. Only `aspect-[4/3]` survived, because Lightbox.tsx happens
  // to use it as well.
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm espresso darks — a notch off black so texture reads, and
        // biased red/yellow so the room feels lit rather than switched off.
        obsidian: '#17120E',
        onyx: '#211A14',
        graphite: '#2E251B',
        // Cream, not blue-white — paper stock, not a screenshot of a screen
        pearl: '#F8F4EC',
        ivory: '#FFFCF6',
        platinum: '#E0D6C6',
        silver: '#B3A796',
        steel: '#7C6F5F',
        ink: '#14100B',
        // Real brass. The previous #C6A15B desaturated to near-beige against
        // cream and simply disappeared.
        gold: '#D9A441',
        'gold-bright': '#F5CE6D',
        'gold-deep': '#9C6F22',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        depth: '0 24px 70px rgba(0, 0, 0, 0.6)',
        soft: '0 10px 30px rgba(20, 16, 11, 0.08)',
        halo: '0 0 40px rgba(224, 214, 198, 0.18)',
        'halo-strong': '0 0 60px rgba(248, 244, 236, 0.28)',
        'glow-gold': '0 0 44px rgba(217, 164, 65, 0.45)',
        'glow-gold-strong': '0 0 84px rgba(245, 206, 109, 0.65)',
      },
      backgroundImage: {
        // Abstracted vertical wood-slat rhythm from the real façade
        slats:
          'repeating-linear-gradient(90deg, transparent 0px, transparent 26px, rgba(248, 244, 236, 0.03) 26px, rgba(248, 244, 236, 0.03) 27px)',
      },
      letterSpacing: {
        luxe: '0.32em',
      },
    },
  },
  plugins: [],
};

export default config;
