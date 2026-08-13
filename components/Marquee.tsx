/**
 * Scrolling band of the kitchen's repertoire, set in the display face —
 * signage drifting past the window. Pure CSS loop, paused for reduced motion.
 */
const ITEMS = [
  'Kahve',
  'Kahvaltı',
  'Pizza',
  'Burger',
  'Makarna',
  'Ana Yemekler',
  'Tatlı',
];

const RUN = [...ITEMS, ...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <section
      aria-label="Mutfağımızdan"
      className="relative overflow-hidden border-y border-pearl/10 bg-onyx py-5"
    >
      {/* Edges dissolve into the surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-onyx to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-onyx to-transparent"
      />

      <div className="animate-marquee flex w-max items-center" aria-hidden="true">
        {[...RUN, ...RUN].map((label, i) => (
          <span key={i} className="flex items-center gap-8 pr-8">
            <span className="font-display text-xl italic text-pearl/70 sm:text-2xl">
              {label}
            </span>
            <span className="h-1 w-1 rotate-45 bg-gold/70" />
          </span>
        ))}
      </div>

      <span className="sr-only">
        Kahve, kahvaltı, pizza, burger, makarna, ana yemekler ve tatlı
      </span>
    </section>
  );
}
