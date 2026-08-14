'use client';

import { useEffect, useState } from 'react';

/** Trading hours, local time. Keep in step with config/business.ts. */
const OPENS_HOUR = 9;
/** Past midnight, so this is smaller than OPENS_HOUR — handled below */
const CLOSES_HOUR = 2;

type Status = { open: boolean; label: string } | null;

function currentStatus(): Status {
  // Istanbul time regardless of the visitor's device clock
  const parts = new Intl.DateTimeFormat('tr-TR', {
    timeZone: 'Europe/Istanbul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  const minutes = hour * 60 + minute;

  // The window crosses midnight (09:00 → 02:00 next day), so "open" is
  // everything from opening time through end of day, plus everything from
  // midnight up to closing time.
  const open = minutes >= OPENS_HOUR * 60 || minutes < CLOSES_HOUR * 60;

  return {
    open,
    label: open ? 'Şu an açık' : `${String(OPENS_HOUR).padStart(2, '0')}:00’de açılıyor`,
  };
}

/**
 * Live open/closed badge. Renders nothing on the server so the markup
 * can't be cached showing the wrong state.
 */
export default function OpenStatus({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    setStatus(currentStatus());
    const timer = setInterval(() => setStatus(currentStatus()), 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!status) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] ${className}`}
    >
      <span
        aria-hidden="true"
        className={`relative flex h-1.5 w-1.5 ${
          status.open ? 'text-emerald-400' : 'text-steel'
        }`}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-70" />
        {status.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
        )}
      </span>
      <span className={status.open ? 'text-pearl' : 'text-steel'}>
        {status.label}
      </span>
    </span>
  );
}
