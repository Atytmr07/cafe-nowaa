'use client';

import { useEffect, useState, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase-services';
import NVLogo from '@/components/NVLogo';
import { Button, Field, Input } from './ui';

/** Maps Firebase auth codes to something a café owner can act on. */
function messageFor(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'E-posta adresi geçersiz.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'E-posta veya şifre hatalı.';
    case 'auth/too-many-requests':
      return 'Çok fazla deneme yapıldı. Bir süre sonra tekrar deneyin.';
    case 'auth/network-request-failed':
      return 'Bağlantı kurulamadı. İnternetinizi kontrol edin.';
    case 'auth/operation-not-allowed':
      return 'E-posta ile giriş Firebase Console’da etkinleştirilmemiş.';
    default:
      return 'Giriş yapılamadı. Lütfen tekrar deneyin.';
  }
}

export default function AuthGate({
  children,
}: {
  children: (user: User, signOutFn: () => void) => ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth(), (next) => {
      setUser(next);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-obsidian">
        <NVLogo className="h-12 w-12 animate-pulse text-pearl" />
      </div>
    );
  }

  if (user) return <>{children(user, () => signOut(auth()))}</>;

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-obsidian px-5">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError(null);
          try {
            await signInWithEmailAndPassword(auth(), email.trim(), password);
          } catch (err) {
            setError(messageFor((err as { code?: string }).code ?? ''));
          } finally {
            setBusy(false);
          }
        }}
        className="w-full max-w-sm rounded-2xl border border-pearl/10 bg-onyx/60 p-8"
      >
        <div className="flex flex-col items-center">
          <NVLogo className="h-14 w-14 text-pearl" />
          <h1 className="mt-5 font-display text-2xl text-pearl">Yönetim Paneli</h1>
          <p className="mt-2 text-center text-xs font-light text-silver">
            Menüyü düzenlemek için giriş yapın.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Field label="E-posta">
            <Input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cafenowaa.com"
            />
          </Field>
          <Field label="Şifre">
            <Input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={busy}
          className="mt-6 w-full"
        >
          {busy ? 'Giriş yapılıyor…' : 'Giriş Yap'}
        </Button>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-steel">
          Hesap oluşturmak için Firebase Console → Authentication → Users
          bölümünü kullanın.
        </p>
      </form>
    </div>
  );
}
