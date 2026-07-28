'use client';

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { db, storage } from './firebase-services';
import { byOrder, type MenuCategory, type MenuData, type MenuProduct } from './menu-types';

const CATEGORIES = 'categories';
const PRODUCTS = 'products';

/** Firestore rejects undefined; strip it rather than writing nulls everywhere. */
function clean<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== undefined)
  ) as T;
}

/**
 * Live menu subscription. Calls back with null while Firestore is empty
 * so callers can keep showing the seed instead of flashing a blank menu.
 */
export function subscribeToMenu(
  onData: (data: MenuData | null) => void,
  onError?: (error: Error) => void
): () => void {
  let categories: MenuCategory[] | null = null;
  let products: MenuProduct[] | null = null;

  const emit = () => {
    if (!categories || !products) return;
    onData(categories.length ? { categories, products } : null);
  };

  const stopCategories = onSnapshot(
    collection(db(), CATEGORIES),
    (snap) => {
      categories = snap.docs
        .map((d) => ({ ...(d.data() as MenuCategory), id: d.id }))
        .sort(byOrder);
      emit();
    },
    (error) => onError?.(error)
  );

  const stopProducts = onSnapshot(
    collection(db(), PRODUCTS),
    (snap) => {
      products = snap.docs
        .map((d) => ({ ...(d.data() as MenuProduct), id: d.id }))
        .sort(byOrder);
      emit();
    },
    (error) => onError?.(error)
  );

  return () => {
    stopCategories();
    stopProducts();
  };
}

export async function fetchMenu(): Promise<MenuData> {
  const [categorySnap, productSnap] = await Promise.all([
    getDocs(collection(db(), CATEGORIES)),
    getDocs(collection(db(), PRODUCTS)),
  ]);
  return {
    categories: categorySnap.docs
      .map((d) => ({ ...(d.data() as MenuCategory), id: d.id }))
      .sort(byOrder),
    products: productSnap.docs
      .map((d) => ({ ...(d.data() as MenuProduct), id: d.id }))
      .sort(byOrder),
  };
}

// ─── Categories ────────────────────────────────────────────────────────────

export async function saveCategory(category: MenuCategory): Promise<void> {
  const { id, ...rest } = category;
  await setDoc(doc(db(), CATEGORIES, id), clean(rest), { merge: true });
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db(), CATEGORIES, id));
}

// ─── Products ──────────────────────────────────────────────────────────────

export async function saveProduct(product: MenuProduct): Promise<void> {
  const { id, ...rest } = product;
  await setDoc(doc(db(), PRODUCTS, id), clean(rest), { merge: true });
}

export async function deleteProduct(product: MenuProduct): Promise<void> {
  if (product.imagePath) await deleteProductImage(product.imagePath);
  await deleteDoc(doc(db(), PRODUCTS, product.id));
}

export async function setFeatured(id: string, isFeatured: boolean) {
  await updateDoc(doc(db(), PRODUCTS, id), { isFeatured });
}

/**
 * Reordering swaps the `order` of two neighbours in one batch, so a
 * failed write can never leave two items claiming the same slot.
 */
export async function swapOrder(
  collectionName: 'categories' | 'products',
  a: { id: string; order: number },
  b: { id: string; order: number }
): Promise<void> {
  const batch = writeBatch(db());
  batch.update(doc(db(), collectionName, a.id), { order: b.order });
  batch.update(doc(db(), collectionName, b.id), { order: a.order });
  await batch.commit();
}

// ─── Images ────────────────────────────────────────────────────────────────

export async function uploadProductImage(
  productId: string,
  file: File
): Promise<{ imageUrl: string; imagePath: string }> {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  // Timestamped so replacing an image busts the CDN cache
  const imagePath = `menu/${productId}-${Date.now()}.${extension}`;
  const objectRef = ref(storage(), imagePath);
  await uploadBytes(objectRef, file, { contentType: file.type });
  return { imageUrl: await getDownloadURL(objectRef), imagePath };
}

export async function deleteProductImage(imagePath: string): Promise<void> {
  try {
    await deleteObject(ref(storage(), imagePath));
  } catch {
    // Already gone, or never ours to delete — not worth failing the save
  }
}

// ─── Seeding ───────────────────────────────────────────────────────────────

/** Publishes the printed card into Firestore. Batched in chunks of 400. */
export async function seedMenu(data: MenuData): Promise<void> {
  const writes: Array<() => void> = [];
  let batch = writeBatch(db());
  let count = 0;

  const flush = async () => {
    if (count > 0) await batch.commit();
    batch = writeBatch(db());
    count = 0;
  };

  for (const category of data.categories) {
    const { id, ...rest } = category;
    batch.set(doc(db(), CATEGORIES, id), clean(rest));
    if (++count >= 400) await flush();
  }

  for (const product of data.products) {
    const { id, ...rest } = product;
    batch.set(doc(db(), PRODUCTS, id), clean(rest));
    if (++count >= 400) await flush();
  }

  await flush();
  void writes;
}
