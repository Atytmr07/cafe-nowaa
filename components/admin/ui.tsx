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
