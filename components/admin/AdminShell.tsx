'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { User } from 'firebase/auth';
import { CloudUpload, ExternalLink, LogOut } from 'lucide-react';
import NVLogo from '@/components/NVLogo';
import { subscribeToMenu, seedMenu } from '@/lib/menu-repo';
import { SEED_MENU } from '@/data/seed';
import type { MenuData } from '@/lib/menu-types';
import CategoryManager from './CategoryManager';
import ProductManager from './ProductManager';
import { Button } from './ui';

type Tab = 'urunler' | 'kategoriler';

export default function AdminShell({
  user,
  onSignOut,
}: {
  user: User;
  onSignOut: () => void;
}) {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<Tab>('urunler');
  const [seeding, setSeeding] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    return subscribeToMenu(
      (data) => {
        setMenu(data);
        setLoaded(true);
      },
      () => {
        setNotice('Veriler okunamadı. Firestore kurallarını kontrol edin.');
        setLoaded(true);
      }
    );
  }, []);

  const publishSeed = async () => {
    if (
      !confirm(
        'Basılı menü Firestore’a aktarılacak. Aynı isimli kayıtların üzerine yazılır. Devam edilsin mi?'
      )
    )
      return;
    setSeeding(true);
    setNotice(null);
    try {
      await seedMenu(SEED_MENU);
      setNotice('Menü aktarıldı.');
    } catch {
      setNotice('Aktarım başarısız. Yetkinizi kontrol edin.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-[100svh] bg-obsidian">
      <header className="sticky top-0 z-40 border-b border-pearl/10 bg-obsidian/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3.5 sm:px-5">
          <NVLogo className="h-8 w-8 flex-none text-gold" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-base leading-tight text-pearl">
              Menü Yönetimi
            </p>
            <p className="truncate text-[11px] text-steel">{user.email}</p>
          </div>

          <Link
            href="/menu"
            target="_blank"
            className="inline-flex min-h-10 flex-none items-center gap-2 rounded-full border border-pearl/20 px-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-pearl transition-colors hover:border-gold/60 sm:px-4"
            aria-label="Menüyü yeni sekmede aç"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Menüyü Gör</span>
          </Link>
          <Button onClick={onSignOut} className="flex-none px-3.5 sm:px-5">
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Çıkış</span>
          </Button>
        </div>

        <div className="mx-auto flex max-w-5xl gap-1.5 px-4 pb-3 sm:px-5">
          {(
            [
              ['urunler', 'Ürünler'],
              ['kategoriler', 'Kategoriler'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              aria-current={tab === value ? 'true' : undefined}
              className={`min-h-10 rounded-full px-5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                tab === value
                  ? 'bg-gold text-ink'
                  : 'text-silver hover:text-pearl'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-5">
        {notice && (
          <p
            role="status"
            className="rounded-xl border border-pearl/20 bg-onyx px-4 py-3 text-sm text-pearl"
          >
            {notice}
          </p>
        )}

        {!loaded && <p className="text-sm text-steel">Yükleniyor…</p>}

        {loaded && !menu && (
          <section className="rounded-2xl border border-pearl/15 bg-onyx/60 p-8 text-center">
            <CloudUpload
              className="mx-auto h-8 w-8 text-silver"
              strokeWidth={1.2}
              aria-hidden="true"
            />
            <h2 className="mt-5 font-display text-2xl text-pearl">
              Firestore boş
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-silver">
              Site şu anda kod içindeki basılı menüyü gösteriyor. Düzenlemeye
              başlamak için menüyü bir kez Firestore’a aktarın — bundan sonra
              tüm değişiklikler anında yayına girer.
            </p>
            <Button
              variant="primary"
              onClick={publishSeed}
              disabled={seeding}
              className="mt-6"
            >
              {seeding ? 'Aktarılıyor…' : 'Basılı Menüyü Aktar'}
            </Button>
          </section>
        )}

        {loaded && menu && (
          <>
            {tab === 'urunler' ? (
              <ProductManager
                categories={menu.categories}
                products={menu.products}
              />
            ) : (
              <CategoryManager
                categories={menu.categories}
                products={menu.products}
              />
            )}

            <p className="text-center text-[11px] leading-relaxed text-steel">
              Değişiklikler anında yayına girer · {menu.products.length} ürün ·{' '}
              {menu.categories.length} kategori
            </p>
          </>
        )}
      </main>
    </div>
  );
}
