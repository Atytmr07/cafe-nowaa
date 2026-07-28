'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { saveProduct } from '@/lib/menu-repo';
import {
  ALLERGEN_OPTIONS,
  type MenuCategory,
  type MenuProduct,
} from '@/lib/menu-types';
import ImageUploader from './ImageUploader';
import { Button, Field, Input, Select, Textarea } from './ui';

type ProductFormProps = {
  product: MenuProduct;
  categories: MenuCategory[];
  onDone: () => void;
};

export default function ProductForm({
  product,
  categories,
  onDone,
}: ProductFormProps) {
  const [draft, setDraft] = useState<MenuProduct>(product);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const category = categories.find((c) => c.id === draft.categoryId);
  const patch = (next: Partial<MenuProduct>) =>
    setDraft((current) => ({ ...current, ...next }));

  const toggleAllergen = (allergen: string) => {
    const current = draft.allergens ?? [];
    patch({
      allergens: current.includes(allergen)
        ? current.filter((a) => a !== allergen)
        : [...current, allergen],
    });
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (!draft.name.trim()) {
          setError('Ürün adı zorunlu.');
          return;
        }
        setBusy(true);
        setError(null);
        try {
          await saveProduct({ ...draft, name: draft.name.trim() });
          onDone();
        } catch {
          setError('Kaydedilemedi. Yetkinizi ve bağlantınızı kontrol edin.');
          setBusy(false);
        }
      }}
      className="space-y-5 rounded-xl border border-pearl/15 bg-obsidian/70 p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ürün adı">
          <Input
            value={draft.name}
            onChange={(e) => patch({ name: e.target.value })}
            required
            placeholder="Örn. Serpme Kahvaltı"
          />
        </Field>

        <Field label="Fiyat (₺)" hint="Boş bırakılırsa menüde “Sorunuz” yazar.">
          <Input
            type="number"
            min={0}
            step={1}
            value={draft.price ?? ''}
            onChange={(e) =>
              patch({
                price: e.target.value === '' ? null : Number(e.target.value),
              })
            }
            placeholder="450"
          />
        </Field>
      </div>

      <Field label="Açıklama">
        <Textarea
          rows={3}
          value={draft.description ?? ''}
          onChange={(e) => patch({ description: e.target.value })}
          placeholder="İçindekiler, servis şekli…"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Kategori">
          <Select
            value={draft.categoryId}
            onChange={(e) =>
              // Sub-section labels are per category, so reset on switch
              patch({ categoryId: e.target.value, subcategory: '' })
            }
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Alt kategori">
          <Select
            value={draft.subcategory ?? ''}
            onChange={(e) => patch({ subcategory: e.target.value })}
            disabled={!category?.subcategories.length}
          >
            <option value="">— Yok —</option>
            {category?.subcategories.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Fiyat notu">
          <Input
            value={draft.priceNote ?? ''}
            onChange={(e) => patch({ priceNote: e.target.value })}
            placeholder="Örn. 2 kişilik"
          />
        </Field>

        <Field
          label="Kalori (kcal)"
          hint="Yalnızca mutfaktan doğrulanmış değeri girin."
        >
          <Input
            type="number"
            min={0}
            step={1}
            value={draft.kcal ?? ''}
            onChange={(e) =>
              patch({
                kcal: e.target.value === '' ? null : Number(e.target.value),
              })
            }
            placeholder="—"
          />
        </Field>
      </div>

      <div>
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-silver">
          Alerjenler
        </span>
        <div className="flex flex-wrap gap-2">
          {ALLERGEN_OPTIONS.map((allergen) => {
            const active = (draft.allergens ?? []).includes(allergen);
            return (
              <button
                key={allergen}
                type="button"
                aria-pressed={active}
                onClick={() => toggleAllergen(allergen)}
                className={`min-h-9 rounded-full border px-3.5 text-[11px] font-medium transition-colors ${
                  active
                    ? 'border-pearl bg-pearl text-obsidian'
                    : 'border-pearl/20 text-silver hover:border-pearl/45'
                }`}
              >
                {allergen}
              </button>
            );
          })}
        </div>
      </div>

      <ImageUploader
        productId={draft.id}
        imageUrl={draft.imageUrl}
        imagePath={draft.imagePath}
        onChange={(next) => patch(next)}
      />

      <button
        type="button"
        aria-pressed={Boolean(draft.isFeatured)}
        onClick={() => patch({ isFeatured: !draft.isFeatured })}
        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
          draft.isFeatured
            ? 'border-pearl/60 bg-pearl/10'
            : 'border-pearl/15 hover:border-pearl/35'
        }`}
      >
        <Star
          className={`h-5 w-5 flex-none ${
            draft.isFeatured ? 'fill-pearl text-pearl' : 'text-silver'
          }`}
          strokeWidth={1.4}
          aria-hidden="true"
        />
        <span>
          <span className="block text-sm text-pearl">Şefin Önerisi</span>
          <span className="mt-0.5 block text-[11px] text-steel">
            Ana sayfadaki menü önizlemesinde ve menüde öne çıkar. Görsel
            eklenmiş ürünler önizlemede gösterilir.
          </span>
        </span>
      </button>

      {error && (
        <p role="alert" className="text-xs text-red-300">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={busy}>
          {busy ? 'Kaydediliyor…' : 'Kaydet'}
        </Button>
        <Button type="button" onClick={onDone} disabled={busy}>
          Vazgeç
        </Button>
      </div>
    </form>
  );
}
