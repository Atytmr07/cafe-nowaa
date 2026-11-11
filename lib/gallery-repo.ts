'use client';

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { db, storage } from './firebase-services';
import {
  byGalleryOrder,
  shapeFor,
  type GalleryItem,
} from './gallery-types';

const GALLERY = 'gallery';

/** Must stay in step with storage.rules */
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024;
export const MAX_VIDEO_SECONDS = 20;

/** Longest edge a photo is stored at — the lightbox never shows more. */
const IMAGE_MAX_EDGE = 2000;

/**
 * Uploads are fingerprinted by timestamp and never overwritten, so the
 * browser may keep them for good — repeat visitors don't re-download a
 * video every time they scroll past it.
 */
const CACHE_CONTROL = 'public, max-age=31536000, immutable';

function notifyPublicGalleryChanged(): void {
  fetch('/api/revalidate-gallery', { method: 'POST' }).catch(() => {});
}

export function subscribeToGallery(
  onData: (items: GalleryItem[]) => void,
  onError?: (error: Error) => void
): () => void {
  return onSnapshot(
    collection(db(), GALLERY),
    (snap) =>
      onData(
        snap.docs
          .map((d) => ({ ...(d.data() as GalleryItem), id: d.id }))
          .sort(byGalleryOrder)
      ),
    (error) => onError?.(error)
  );
}

// ─── File preparation ──────────────────────────────────────────────────────

/** A user-facing failure — the message is shown as-is in the admin. */
export class GalleryUploadError extends Error {}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))),
      'image/jpeg',
      quality
    )
  );
}

/**
 * Phone photos arrive at 4000px and 5–12 MB. Shrinking them here keeps the
 * bucket small, keeps every file under the storage rule's cap, and — since
 * Storage bills for bytes served — keeps each visitor's download cheap.
 */
async function prepareImage(
  file: File
): Promise<{ blob: Blob; width: number; height: number }> {
  let bitmap: ImageBitmap;
  try {
    // Phone shots are stored sideways with an EXIF rotation flag; bake it in
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new GalleryUploadError(
      'Bu fotoğraf açılamadı. JPG veya PNG olarak tekrar deneyin.'
    );
  }

  const scale = Math.min(1, IMAGE_MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await canvasToJpeg(canvas, 0.85);
  if (blob.size > MAX_IMAGE_BYTES) {
    throw new GalleryUploadError('Fotoğraf küçültüldükten sonra bile çok büyük.');
  }
  return { blob, width, height };
}

/**
 * Loads the video in this browser to read its size and length and grab a
 * still for the poster. Doubles as a playability check: a file the admin's
 * own browser can't decode (typically iPhone HEVC on Windows/Android) would
 * show as a black box to most visitors too, so it is refused here.
 */
function probeVideo(
  file: File
): Promise<{ width: number; height: number; duration: number; poster: Blob }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    const fail = (message: string) => {
      URL.revokeObjectURL(url);
      reject(new GalleryUploadError(message));
    };
    const timer = window.setTimeout(
      () => fail('Video okunamadı. MP4 formatında tekrar deneyin.'),
      20000
    );

    video.onerror = () => {
      window.clearTimeout(timer);
      fail(
        'Bu video tarayıcıda oynatılamıyor. iPhone’da Ayarlar → Kamera → Formatlar → “En Uyumlu” seçip tekrar çekin.'
      );
    };

    video.onloadedmetadata = () => {
      if (!video.videoWidth || !video.videoHeight) {
        window.clearTimeout(timer);
        fail('Videonun görüntüsü okunamadı.');
        return;
      }
      if (video.duration > MAX_VIDEO_SECONDS + 0.5) {
        window.clearTimeout(timer);
        fail(`Video en fazla ${MAX_VIDEO_SECONDS} saniye olabilir.`);
        return;
      }
      // A frame a little in, not 0 — the first frame is often black
      video.currentTime = Math.min(0.5, video.duration / 2);
    };

    video.onseeked = async () => {
      window.clearTimeout(timer);
      try {
        const scale = Math.min(1, 1280 / Math.max(video.videoWidth, video.videoHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(video.videoWidth * scale);
        canvas.height = Math.round(video.videoHeight * scale);
        canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height);
        const poster = await canvasToJpeg(canvas, 0.8);
        URL.revokeObjectURL(url);
        resolve({
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration,
          poster,
        });
      } catch {
        fail('Videodan kapak görseli alınamadı.');
      }
    };

    video.src = url;
  });
}

// ─── Storage ───────────────────────────────────────────────────────────────

function upload(
  path: string,
  blob: Blob,
  contentType: string,
  onProgress?: (fraction: number) => void
): Promise<string> {
  const objectRef = ref(storage(), path);
  const task = uploadBytesResumable(objectRef, blob, {
    contentType,
    cacheControl: CACHE_CONTROL,
  });
  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snap) => onProgress?.(snap.bytesTransferred / snap.totalBytes),
      reject,
      () => getDownloadURL(objectRef).then(resolve, reject)
    );
  });
}

async function removeFile(path?: string): Promise<void> {
  if (!path) return;
  try {
    await deleteObject(ref(storage(), path));
  } catch {
    // Already gone — not worth failing the delete over
  }
}

function newId(): string {
  return `g-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/**
 * Validates, prepares and uploads one photo or video, then publishes it.
 * The Firestore document is written last, so a half-finished upload never
 * shows up on the site.
 */
export async function addGalleryFile(
  file: File,
  caption: string,
  onProgress?: (fraction: number) => void
): Promise<void> {
  const id = newId();
  const isVideo = file.type.startsWith('video/');
  const isImage = file.type.startsWith('image/');
  if (!isVideo && !isImage) {
    throw new GalleryUploadError('Yalnızca fotoğraf veya video yüklenebilir.');
  }

  const base: Pick<GalleryItem, 'caption' | 'createdAt' | 'order' | 'isVisible'> = {
    caption: caption.trim() || undefined,
    createdAt: Date.now(),
    order: -Date.now(),
    isVisible: true,
  };

  let item: Omit<GalleryItem, 'id'>;

  if (isImage) {
    const { blob, width, height } = await prepareImage(file);
    const path = `gallery/${id}.jpg`;
    const url = await upload(path, blob, 'image/jpeg', onProgress);
    item = { ...base, kind: 'image', url, path, shape: shapeFor(width, height) };
  } else {
    if (file.size > MAX_VIDEO_BYTES) {
      throw new GalleryUploadError(
        `Video ${MAX_VIDEO_BYTES / 1024 / 1024} MB’tan küçük olmalı. Daha kısa bir video deneyin.`
      );
    }
    const { width, height, poster } = await probeVideo(file);
    const extension = file.type === 'video/quicktime' ? 'mov' : file.type === 'video/webm' ? 'webm' : 'mp4';
    const path = `gallery/${id}.${extension}`;
    const posterPath = `gallery/${id}-poster.jpg`;
    // The poster is tiny; report progress on the video, which is the wait
    const posterUrl = await upload(posterPath, poster, 'image/jpeg');
    let url: string;
    try {
      url = await upload(path, file, file.type, onProgress);
    } catch (error) {
      await removeFile(posterPath);
      throw error;
    }
    item = {
      ...base,
      kind: 'video',
      url,
      path,
      posterUrl,
      posterPath,
      shape: shapeFor(width, height),
    };
  }

  const clean = Object.fromEntries(
    Object.entries(item).filter(([, v]) => v !== undefined)
  );
  await setDoc(doc(db(), GALLERY, id), clean);
  notifyPublicGalleryChanged();
}

// ─── Edits ─────────────────────────────────────────────────────────────────

export async function setGalleryCaption(id: string, caption: string) {
  await updateDoc(doc(db(), GALLERY, id), { caption: caption.trim() });
  notifyPublicGalleryChanged();
}

export async function setGalleryVisible(id: string, isVisible: boolean) {
  await updateDoc(doc(db(), GALLERY, id), { isVisible });
  notifyPublicGalleryChanged();
}

export async function swapGalleryOrder(a: GalleryItem, b: GalleryItem) {
  const batch = writeBatch(db());
  batch.update(doc(db(), GALLERY, a.id), { order: b.order });
  batch.update(doc(db(), GALLERY, b.id), { order: a.order });
  await batch.commit();
  notifyPublicGalleryChanged();
}

export async function deleteGalleryItem(item: GalleryItem) {
  // Document first: the site stops linking to the file before it disappears
  await deleteDoc(doc(db(), GALLERY, item.id));
  notifyPublicGalleryChanged();
  await Promise.all([removeFile(item.path), removeFile(item.posterPath)]);
}
