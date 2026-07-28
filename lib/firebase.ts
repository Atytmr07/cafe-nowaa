import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAnalytics,
  isSupported,
  logEvent,
  type Analytics,
} from 'firebase/analytics';

/**
 * Firebase web configuration.
 *
 * These values are client-side identifiers, not secrets — Firebase web
 * config ships in the browser bundle by design, and access is controlled
 * by Security Rules and API-key restrictions in the console, not secrecy.
 * Env vars are still read first so staging/prod can point elsewhere.
 */
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    'AIzaSyAbv07N4oDIDcfmFdgBblJFZx4dmTLdkTo',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'cafe-nowaa.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'cafe-nowaa',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    'cafe-nowaa.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '900719271578',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    '1:900719271578:web:d35025d79a7377e41ac923',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? 'G-5XWDY6BK5X',
};

/** Idempotent app handle — safe across Fast Refresh and repeated imports. */
export function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

let analyticsPromise: Promise<Analytics | null> | null = null;

/**
 * Analytics resolves to null on the server, in unsupported browsers, and
 * wherever measurement is blocked — every caller must tolerate null.
 */
export function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => (supported ? getAnalytics(getFirebaseApp()) : null))
      .catch(() => null);
  }
  return analyticsPromise;
}

/** Fire-and-forget event logging; never throws into the render path. */
export async function trackEvent(
  name: string,
  params?: Record<string, unknown>
): Promise<void> {
  try {
    const analytics = await getAnalyticsInstance();
    if (analytics) logEvent(analytics, name, params);
  } catch {
    // Analytics must never break the experience
  }
}
