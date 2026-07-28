import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getFirebaseApp } from './firebase';

/**
 * Firestore / Auth / Storage handles.
 *
 * Kept out of lib/firebase.ts so these SDKs only reach bundles that
 * genuinely need them — the admin panel, and the menu repo which is
 * dynamically imported after paint.
 */

export function db(): Firestore {
  return getFirestore(getFirebaseApp());
}

export function auth(): Auth {
  return getAuth(getFirebaseApp());
}

export function storage(): FirebaseStorage {
  return getStorage(getFirebaseApp());
}
