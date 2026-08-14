'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
} from 'lucide-react';
import {
  deleteProduct,
  setFeatured,
  setPrice,
  swapOrder,
} from '@/lib/menu-repo';
import {
  byOrder,
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
              className="rounded-xl border border-pearl/10 bg-obsidian/60 p-3"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-14 w-12 flex-none overflow-hidden rounded-md border border-pearl/10 bg-graphite">
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt=""
                      fill
                      sizes="48px"
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

                <PriceEditor product={product} />
              </div>

              {/* Actions on their own row: seven controls on one line
                  overflowed the viewport on a phone, which is where the
                  owner actually updates the card. */}
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-pearl/10 pt-2.5">
                <div className="flex items-center gap-1.5">
                  <IconButton
                    aria-label={`${product.name} yukarı taşı`}
                    disabled={busy || !canReorder || index === 0}
                    onClick={() => move(product, -1)}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    aria-label={`${product.name} aşağı taşı`}
                    disabled={busy || !canReorder || index === rows.length - 1}
                    onClick={() => move(product, 1)}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </IconButton>
                </div>

                <div className="flex items-center gap-1.5">
                  <IconButton
                    aria-label={`${product.name} şefin önerisi`}
                    aria-pressed={Boolean(product.isFeatured)}
                    disabled={busy}
                    onClick={() => setFeatured(product.id, !product.isFeatured)}
                    className={product.isFeatured ? 'border-gold/70' : ''}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        product.isFeatured ? 'fill-gold text-gold' : ''
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
                </div>
              </div>
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

/**
 * Price, editable in place. Zam günü means touching dozens of figures, and
 * opening the full product form for each one is the wrong shape of work —
 * this writes only the `price` field, on blur or Enter.
 *
 * An empty field means "Sorunuz" (no figure on the card), which is a real
 * state on this menu, so it has to be reachable — not just a validation
 * failure.
 */
function PriceEditor({ product }: { product: MenuProduct }) {
  const asText = (price: number | null) => (price === null ? '' : String(price));
  const [value, setValue] = useState(() => asText(product.price));
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>(
    'idle'
  );

  // Re-sync when the figure changes underneath us — our own save echoing
  // back through the live subscription, or an edit from another device.
  useEffect(() => {
    setValue(asText(product.price));
  }, [product.price]);

  const commit = async () => {
    const raw = value.trim().replace(',', '.');
    const next = raw === '' ? null : Number(raw);

    if (next !== null && (!Number.isFinite(next) || next < 0)) {
      setState('error');
      return;
    }
    if (next === product.price) {
      setState('idle');
      return;
    }

    setState('saving');
    try {
      await setPrice(product.id, next);
      setState('saved');
      window.setTimeout(
        () => setState((s) => (s === 'saved' ? 'idle' : s)),
        1400
      );
    } catch {
      setState('error');
    }
  };

  return (
    <div className="flex flex-none items-center gap-1.5">
      <div className="relative">
        <input
          inputMode="decimal"
          value={value}
          aria-label={`${product.name} fiyatı`}
          placeholder="—"
          disabled={state === 'saving'}
          onChange={(e) => {
            setValue(e.target.value);
            if (state !== 'idle') setState('idle');
          }}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.currentTarget.blur();
            }
            if (e.key === 'Escape') {
              setValue(asText(product.price));
              setState('idle');
            }
          }}
          className={`w-20 rounded-lg border bg-onyx py-2 pl-2.5 pr-6 text-right text-sm tabular-nums text-pearl placeholder:text-steel focus:outline-none disabled:opacity-50 ${
            state === 'error'
              ? 'border-red-500/70'
              : state === 'saved'
                ? 'border-gold/70'
                : 'border-pearl/15 focus:border-gold/60'
          }`}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-steel"
        >
          ₺
        </span>
      </div>

      <span className="w-4 flex-none" aria-live="polite">
        {state === 'saved' && (
          <Check className="h-4 w-4 text-gold" aria-label="Kaydedildi" />
        )}
        {state === 'error' && (
          <span className="text-xs text-red-400" role="alert" title="Kaydedilemedi">
            !
          </span>
        )}
      </span>
    </div>
  );
}
