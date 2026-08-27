'use client';

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

/** Shared admin controls — plain, dense, and legible on obsidian. */

const FIELD =
  'w-full rounded-lg border border-pearl/15 bg-onyx px-3 py-2.5 text-sm text-pearl placeholder:text-steel focus:border-gold/60 focus:outline-none';

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-silver">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-steel">{hint}</span>}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${FIELD} ${props.className ?? ''}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props} className={`${FIELD} ${props.className ?? ''}`} />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${FIELD} ${props.className ?? ''}`} />;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
};

export function Button({ variant = 'ghost', ...props }: ButtonProps) {
  const styles = {
    primary: 'bg-gold text-ink hover:bg-gold-bright',
    ghost: 'border border-pearl/20 text-pearl hover:border-gold/60',
    danger: 'border border-red-500/40 text-red-300 hover:border-red-500/80',
  }[variant];

  return (
    <button
      {...props}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${styles} ${
        props.className ?? ''
      }`}
    />
  );
}

export function IconButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-pearl/15 text-silver transition-colors hover:border-gold/50 hover:text-pearl disabled:cursor-not-allowed disabled:opacity-30 ${
        props.className ?? ''
      }`}
    />
  );
}

/**
 * On/off slider for a boolean field written straight to Firestore on
 * toggle — same "no form, no save button" pattern as PriceEditor. Used to
 * take a dish off the public menu without deleting it (86'd for the day,
 * out of season, etc.) rather than losing its photo/description/allergens.
 */
export function Switch({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative h-6 w-11 flex-none rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        checked ? 'bg-gold' : 'bg-graphite'
      }`}
    >
      {/*
        `left-0.5` is load-bearing, not decoration. Without an explicit
        `left`, an absolutely positioned child resolves to its static
        position — and buttons carry `text-align: center` from the UA
        stylesheet, which Tailwind's preflight doesn't reset. The thumb
        therefore started life centred rather than at the left edge, and
        the `translate-x` for the "on" state pushed it clean out of the
        track. Anchored left, the travel is plain arithmetic: 44px track −
        20px thumb − 2px inset on each side = 20px, i.e. translate-x-5.
      */}
      <span
        aria-hidden="true"
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-pearl shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-pearl/10 bg-onyx/60 p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl text-pearl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
