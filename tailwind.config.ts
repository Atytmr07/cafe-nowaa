import type { Config } from 'tailwindcss';

/**
 * "Modern Istanbul Bistro Noir" design tokens.
 * Mirrors the CSS custom properties declared in app/globals.css.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: '#141210',
        'noir-surface': '#1E1B17',
        marble: '#F3EDE1',
        'marble-surface': '#FFFFFF',
        gold: '#C6A15B',
        'gold-bright': '#E8C878',
        cream: '#F3EDE1',
        ink: '#221F1B',
        stone: '#A89C8A',
        'stone-soft': '#7A7268',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Deep and warm on dark sections
        warm: '0 20px 60px rgba(0, 0, 0, 0.5)',
        // Soft and minimal on light sections
        soft: '0 8px 24px rgba(34, 31, 27, 0.06)',
        // Gold glow for CTAs / active elements
        glow: '0 0 32px rgba(198, 161, 91, 0.35)',
        'glow-strong': '0 0 48px rgba(232, 200, 120, 0.5)',
      },
      backgroundImage: {
        // Abstracted vertical wood-slat pattern from the real façade
        slats:
          'repeating-linear-gradient(90deg, transparent 0px, transparent 22px, rgba(243, 237, 225, 0.025) 22px, rgba(243, 237, 225, 0.025) 24px)',
      },
    },
  },
  plugins: [],
};

export default config;
