import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Called by the admin panel right after any Firestore write.
 *
 * lib/menu-server.ts caches the public menu for REVALIDATE_SECONDS (15
 * minutes) so ordinary traffic doesn't re-read Firestore on every visit.
 * Without this endpoint, that cache is the whole story: an admin edit
 * lands in Firestore immediately (the admin's own view subscribes
 * directly and shows it at once) but the public site keeps serving the
 * stale cached copy for up to 15 minutes — indistinguishable, from the
 * café owner's side, from the save having silently failed.
 *
 * `revalidateTag('menu')` clears every cached fetch tagged 'menu'
 * (both categories and products, on both / and /menu), so the very next
 * request rebuilds from Firestore regardless of how much of the window
 * is left. No secret/auth check here: this only forces a public page to
 * re-read public data sooner, which is not a sensitive operation, and
 * requiring one would mean plumbing a token through every admin write
 * path for no real protection.
 */
export async function POST() {
  revalidateTag('menu');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
