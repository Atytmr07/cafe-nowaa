import SectionWave from './decor/SectionWave';

/**
 * Scrolling band of the kitchen's repertoire, set in the display face —
 * signage drifting past the window.
 *
 * Two rows running against each other rather than one: a single row reads as
 * a decorative strip, while opposing rows read as motion and give the eye a
 * reason to stay. Pure CSS loops, paused for reduced motion.
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

/** Second row leads with different words so the two never rhyme visually */
const ITEMS_ALT = [
  'Taş Fırın',
  'Serpme Kahvaltı',
  'Filtre Kahve',
  'Tost',
  'Salata & Wrap',
  'Tatlı Vitrini',
  'Wrap',
];

const RUN = [...ITEMS, ...ITEMS, ...ITEMS];
const RUN_ALT = [...ITEMS_ALT, ...ITEMS_ALT, ...ITEMS_ALT];

function Row({
  items,
  reverse = false,
  muted = false,
}: {
  items: string[];
  reverse?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex w-max items-center ${
        reverse ? 'animate-marquee-reverse' : 'animate-marquee'
      }`}
      aria-hidden="true"
    >
      {[...items, ...items].map((label, i) => (
        <span key={i} className="flex items-center gap-8 pr-8">
          <span
            className={`font-display italic ${
              muted
                ? 'text-lg text-pearl/35 sm:text-xl'
                : 'text-xl text-pearl/75 sm:text-2xl'
            }`}
          >
            {label}
          </span>
          <span
            className={`h-1 w-1 rotate-45 ${muted ? 'bg-gold/40' : 'bg-gold'}`}
          />
        </span>
      ))}
    </div>
  );
}

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

      <div className="space-y-2">
        <Row items={RUN} />
        <Row items={RUN_ALT} reverse muted />
      </div>

      {/*
        The seam into About. A SectionWave belongs to the section it dips
        OUT OF, not the one it dips into — About already paints bg-pearl
        across its own full height, so a wave living inside About would
        just be pearl-on-pearl and vanish. Living here at Marquee's own
        bottom edge, painted in About's colour, it erodes onyx upward into
        a curve with nothing behind it to fight for the same pixels.
      */}
      <SectionWave
        fill="var(--pearl)"
        className="absolute inset-x-0 bottom-0 h-8 w-full sm:h-10"
      />

      <span className="sr-only">
        Kahve, kahvaltı, pizza, burger, makarna, ana yemekler ve tatlı
      </span>
    </section>
  );
}
