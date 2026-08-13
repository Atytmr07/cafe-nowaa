'use client';

/**
 * A short, synthesised "gold" chime for the hero's logo reveal — three
 * layered sine partials in a bright major triad, each with its own quick
 * attack and long exponential decay, so it reads as a soft bell shimmer
 * rather than a beep. Synthesised with WebAudio rather than shipping an
 * audio file: no asset to host, no size budget to spend, and the pitch/
 * decay are easy to tune here.
 *
 * Browsers refuse to play audio before the user has interacted with the
 * page — a fresh page load never counts, even if it followed a link
 * click. So `playChime()` is attempted immediately, and if the browser
 * blocks it, `armChimeOnFirstInteraction()` queues the exact same chime
 * to fire once on the visitor's first tap/click/keypress instead. Either
 * way the visitor hears it once per visit, not zero and not repeatedly.
 */

let ctx: AudioContext | null = null;
let played = false;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  return ctx;
}

function ring(context: AudioContext, freq: number, start: number, gain: number, decay: number) {
  const osc = context.createOscillator();
  const env = context.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(gain, start + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, start + decay);
  osc.connect(env).connect(context.destination);
  osc.start(start);
  osc.stop(start + decay + 0.1);
}

function ringChime(context: AudioContext) {
  const now = context.currentTime;
  // A bright major triad (root, third, fifth an octave up) — the classic
  // "shimmer" bell voicing — staggered by a beat each for a cascading feel.
  ring(context, 1046.5, now, 0.05, 2.2); // C6
  ring(context, 1318.5, now + 0.08, 0.045, 2.0); // E6
  ring(context, 1568.0, now + 0.16, 0.04, 1.8); // G6
  ring(context, 2093.0, now + 0.22, 0.02, 1.4); // C7 — a high sparkle on top
}

export function playChime(): void {
  if (played) return;
  const context = getContext();
  if (!context) return;

  const fire = () => {
    if (played) return;
    played = true;
    ringChime(context);
  };

  if (context.state === 'running') {
    fire();
    return;
  }

  // Suspended almost always means the autoplay gate is closed; resume()
  // will simply reject, which we swallow — armChimeOnFirstInteraction
  // covers this visit instead.
  context.resume().then(fire).catch(() => {});
}

export function armChimeOnFirstInteraction(): () => void {
  if (played || typeof window === 'undefined') return () => {};

  const handler = () => {
    playChime();
    cleanup();
  };
  const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart'];
  const cleanup = () => {
    events.forEach((event) => window.removeEventListener(event, handler));
  };

  events.forEach((event) =>
    window.addEventListener(event, handler, { once: true, passive: true })
  );
  return cleanup;
}
