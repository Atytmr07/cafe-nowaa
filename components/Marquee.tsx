/**
 * Scrolling gold band between sections — the kitchen's repertoire drifting
 * past like signage. Pure CSS animation (see .animate-marquee in globals.css),
 * disabled automatically under prefers-reduced-motion.
 */
const ITEMS = ['Kahve', 'Pizza', 'Burger', 'Kahvaltı', 'Makarna', 'Soslu Tavuk'];

// Two identical halves make the -50% translate loop seamless
const HALF = [...ITEMS, ...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <section
      aria-label="Mutfağımızdan"
      className="relative overflow-hidden border-y border-gold/15 bg-noir py-4"
    >
      <div className="animate-marquee flex w-max items-center" aria-hidden="true">
        {[...HALF, ...HALF].map((label, i) => (
          <span
            key={i}
            className="flex items-center gap-6 pr-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/70"
          >
            {label}
            <span className="h-1.5 w-1.5 rotate-45 border border-gold/50" />
          </span>
        ))}
      </div>
      <span className="sr-only">
        Kahve, pizza, burger, kahvaltı, makarna ve soslu tavuk
      </span>
    </section>
  );
}
