'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Pencil, Plus, Search, Star, Trash2 } from 'lucide-react';
import {
  deleteProduct,
  setFeatured,
  swapOrder,
} from '@/lib/menu-repo';
import {
  byOrder,
  formatPrice,
  type MenuCategory,
  type MenuProduct,
} from '@/lib/menu-types';
import ProductForm from './ProductForm';
import { Button, IconButton, Input, Panel, Select } from './ui';

type ProductManagerProps = {
  categories: MenuCategory[];
  products: MenuProduct[];
};

function newId(): string {
  return `urun-${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

export default function ProductManager({
  categories,
  products,
}: ProductManagerProps) {
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<MenuProduct | null>(null);
  const [busy, setBusy] = useState(false);

  const category = categories.find((c) => c.id === categoryId);

  /** Rows of the selected category, in menu order. */
  const rows = useMemo(
    () => products.filter((p) => p.categoryId === categoryId).sort(byOrder),
    [products, categoryId]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr');
    if (!q) return rows;
    return rows.filter((p) => p.name.toLocaleLowerCase('tr').includes(q));
  }, [rows, query]);

  // Reordering swaps neighbours in full category order, so it must be
  // disabled while a search filter hides the actual neighbour.
  const canReorder = visible.length === rows.length;

  const move = async (product: MenuProduct, direction: -1 | 1) => {
    const index = rows.findIndex((p) => p.id === product.id);
    const target = rows[index + direction];
    if (!target) return;
    setBusy(true);
    await swapOrder('products', product, target);
    setBusy(false);
  };

  const startNew = () => {
    setEditing({
      id: newId(),
      name: '',
      price: null,
      kcal: null,
      allergens: [],
      categoryId,
      subcategory: category?.subcategories[0] ?? '',
      order: rows.length ? Math.max(...rows.map((p) => p.order)) + 1 : 0,
    });
  };

  if (editing) {
    return (
      <Panel title={editing.name ? 'Ürünü Düzenle' : 'Yeni Ürün'}>
        <ProductForm
          product={editing}
          categories={categories}
          onDone={() => setEditing(null)}
        />
      </Panel>
    );
  }

  return (
    <Panel
      title="Ürünler"
      action={
        <Button variant="primary" onClick={startNew} disabled={!categories.length}>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Yeni Ürün
        </Button>
      }
    >
      <div className="flex flex-wrap gap-3">
        <div className="min-w-[180px] flex-1">
          <Select
            aria-label="Kategori seç"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} ({products.filter((p) => p.categoryId === c.id).length})
              </option>
            ))}
          </Select>
        </div>
        <div className="relative min-w-[180px] flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel"
            strokeWidth={1.4}
            aria-hidden="true"
          />
          <Input
            aria-label="Ürün ara"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ürün ara…"
            className="pl-9"
          />
        </div>
      </div>

      {query && !canReorder && (
        <p className="mt-3 text-[11px] text-steel">
          Sıralama, arama filtresi açıkken devre dışı — aramayı temizleyin.
        </p>
      )}

      <ul className="mt-5 space-y-2">
        {visible.map((product) => {
          const index = rows.findIndex((p) => p.id === product.id);

          return (
            <li
              key={product.id}
              className="flex items-center gap-3 rounded-xl border border-pearl/10 bg-obsidian/60 p-3"
            >
              <div className="flex flex-col gap-1">
                <IconButton
                  aria-label={`${product.name} yukarı taşı`}
                  disabled={busy || !canReorder || index === 0}
                  onClick={() => move(product, -1)}
                  className="h-6 w-6"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton
                  aria-label={`${product.name} aşağı taşı`}
                  disabled={busy || !canReorder || index === rows.length - 1}
                  onClick={() => move(product, 1)}
                  className="h-6 w-6"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </IconButton>
              </div>

              <div className="relative h-12 w-10 flex-none overflow-hidden rounded-md border border-pearl/10 bg-graphite">
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-pearl">
                  {product.name || '(isimsiz)'}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-steel">
                  {product.subcategory || 'Alt kategori yok'}
                  {product.kcal ? ` · ${product.kcal} kcal` : ''}
                  {product.allergens?.length
                    ? ` · ${product.allergens.length} alerjen`
                    : ''}
                </p>
              </div>

              <span className="flex-none text-sm tabular-nums text-platinum">
                {product.price === null ? '—' : formatPrice(product.price)}
              </span>

              <IconButton
                aria-label={`${product.name} şefin önerisi`}
                aria-pressed={Boolean(product.isFeatured)}
                disabled={busy}
                onClick={() => setFeatured(product.id, !product.isFeatured)}
                className={product.isFeatured ? 'border-pearl/60' : ''}
              >
                <Star
                  className={`h-4 w-4 ${
                    product.isFeatured ? 'fill-pearl text-pearl' : ''
                  }`}
                />
              </IconButton>

              <IconButton
                aria-label={`${product.name} düzenle`}
                onClick={() => setEditing(product)}
              >
                <Pencil className="h-4 w-4" />
              </IconButton>

              <IconButton
                aria-label={`${product.name} sil`}
                disabled={busy}
                onClick={async () => {
                  if (!confirm(`"${product.name}" silinsin mi?`)) return;
                  setBusy(true);
                  await deleteProduct(product);
                  setBusy(false);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </IconButton>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <p className="mt-6 text-center text-sm text-steel">
          {query ? 'Aramanızla eşleşen ürün yok.' : 'Bu kategoride henüz ürün yok.'}
        </p>
      )}
    </Panel>
  );
}
