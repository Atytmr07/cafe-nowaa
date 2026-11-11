import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Called by the admin panel right after any gallery write, so a new post
 * shows on the homepage at once instead of after the cache window. Same
 * trade-off as /api/revalidate-menu: it only makes a public page re-read
 * public data sooner, so it carries no auth.
 */
export async function POST() {
  revalidateTag('gallery');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
