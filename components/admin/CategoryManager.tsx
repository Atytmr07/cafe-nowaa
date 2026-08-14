'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2, X } from 'lucide-react';
import {
  deleteCategory,
  saveCategory,
  swapOrder,
} from '@/lib/menu-repo';
import type { MenuCategory, MenuProduct } from '@/lib/menu-types';
import { Button, Field, IconButton, Input, Panel } from './ui';

/** Turkish-aware slug so "Çorbalar" becomes "corbalar", not "orbalar". */
function slugify(value: string): string {
  const map: Record<string, string> = {
    ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i',
    ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u',
  };
  return value
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

type CategoryManagerProps = {
  categories: MenuCategory[];
  products: MenuProduct[];
};

export default function CategoryManager({
  categories,
  products,
}: CategoryManagerProps) {
  const [newLabel, setNewLabel] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countFor = (id: string) =>
    products.filter((p) => p.categoryId === id).length;

  const addCategory = async () => {
    const label = newLabel.trim();
    if (!label) return;
    const id = slugify(label);
    if (!id) {
      setError('Bu isimden geçerli bir adres üretilemedi.');
      return;
    }
    if (categories.some((c) => c.id === id)) {
      setError('Bu isimde bir kategori zaten var.');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await saveCategory({
        id,
        label,
        order: categories.length
          ? Math.max(...categories.map((c) => c.order)) + 1
          : 0,
        subcategories: [],
      });
      setNewLabel('');
    } catch {
      setError('Kategori eklenemedi.');
    } finally {
      setBusy(false);
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = categories[index + direction];
    if (!target) return;
    setBusy(true);
    await swapOrder('categories', categories[index], target);
    setBusy(false);
  };

  return (
    <Panel title="Kategoriler">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <Field label="Yeni kategori">
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  void addCategory();
                }
              }}
              placeholder="Örn. Çorbalar"
            />
          </Field>
        </div>
        <Button
          variant="primary"
          disabled={busy || !newLabel.trim()}
          onClick={addCategory}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Ekle
        </Button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-xs text-red-300">
          {error}
        </p>
      )}

      <ul className="mt-6 space-y-2">
        {categories.map((category, index) => {
          const isOpen = expanded === category.id;
          const count = countFor(category.id);

          return (
            <li
              key={category.id}
              className="rounded-xl border border-pearl/10 bg-obsidian/60"
            >
              <div className="p-3">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : category.id)}
                  className="block w-full min-w-0 text-left"
                >
                  <p className="truncate text-sm text-pearl">{category.label}</p>
                  <p className="mt-0.5 text-[11px] text-steel">
                    {count} ürün · {category.subcategories.length} alt kategori
                  </p>
                </button>

                {/* Controls sit under the title so a long category name never
                    squeezes them off a narrow screen */}
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-pearl/10 pt-2.5">
                  <div className="flex items-center gap-1.5">
                    <IconButton
                      aria-label={`${category.label} yukarı taşı`}
                      disabled={busy || index === 0}
                      onClick={() => move(index, -1)}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </IconButton>
                    <IconButton
                      aria-label={`${category.label} aşağı taşı`}
                      disabled={busy || index === categories.length - 1}
                      onClick={() => move(index, 1)}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </IconButton>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      onClick={() => setExpanded(isOpen ? null : category.id)}
                      className="px-4"
                    >
                      {isOpen ? 'Kapat' : 'Alt kategoriler'}
                    </Button>

                    <IconButton
                      aria-label={`${category.label} kategorisini sil`}
                      disabled={busy}
                      onClick={async () => {
                        if (count > 0) {
                          setError(
                            `"${category.label}" içinde ${count} ürün var. Önce ürünleri taşıyın veya silin.`
                          );
                          return;
                        }
                        if (!confirm(`"${category.label}" silinsin mi?`)) return;
                        setBusy(true);
                        await deleteCategory(category.id);
                        setBusy(false);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
              </div>

              {isOpen && (
                <SubcategoryEditor category={category} products={products} />
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

function SubcategoryEditor({
  category,
  products,
}: {
  category: MenuCategory;
  products: MenuProduct[];
}) {
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);

  const persist = async (subcategories: string[]) => {
    setBusy(true);
    await saveCategory({ ...category, subcategories });
    setBusy(false);
  };

  const move = (index: number, direction: -1 | 1) => {
    const next = [...category.subcategories];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    void persist(next);
  };

  return (
    <div className="border-t border-pearl/10 p-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[200px] flex-1">
          <Field label="Yeni alt kategori">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const label = value.trim();
                  if (label && !category.subcategories.includes(label)) {
                    void persist([...category.subcategories, label]);
                    setValue('');
                  }
                }
              }}
              placeholder="Örn. Ara Sıcaklar"
            />
          </Field>
        </div>
        <Button
          disabled={
            busy ||
            !value.trim() ||
            category.subcategories.includes(value.trim())
          }
          onClick={() => {
            void persist([...category.subcategories, value.trim()]);
            setValue('');
          }}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Ekle
        </Button>
      </div>

      {category.subcategories.length === 0 ? (
        <p className="mt-4 text-[11px] text-steel">
          Alt kategori yok — ürünler doğrudan kategori altında listelenir.
        </p>
      ) : (
        <ul className="mt-4 space-y-1.5">
          {category.subcategories.map((subcategory, index) => {
            const used = products.filter(
              (p) =>
                p.categoryId === category.id && p.subcategory === subcategory
            ).length;

            return (
              <li
                key={subcategory}
                className="flex items-center gap-2 rounded-lg bg-onyx px-3 py-2"
              >
                <IconButton
                  aria-label={`${subcategory} yukarı taşı`}
                  disabled={busy || index === 0}
                  onClick={() => move(index, -1)}
                  className="h-7 w-7"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton
                  aria-label={`${subcategory} aşağı taşı`}
                  disabled={busy || index === category.subcategories.length - 1}
                  onClick={() => move(index, 1)}
                  className="h-7 w-7"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </IconButton>

                <span className="min-w-0 flex-1 truncate text-sm text-pearl">
                  {subcategory}
                </span>
                <span className="text-[11px] text-steel">{used} ürün</span>

                <IconButton
                  aria-label={`${subcategory} alt kategorisini sil`}
                  disabled={busy}
                  onClick={() => {
                    if (used > 0) {
                      alert(
                        `"${subcategory}" içinde ${used} ürün var. Önce ürünleri başka bir alt kategoriye taşıyın.`
                      );
                      return;
                    }
                    void persist(
                      category.subcategories.filter((s) => s !== subcategory)
                    );
                  }}
                  className="h-7 w-7"
                >
                  <X className="h-3.5 w-3.5" />
                </IconButton>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
