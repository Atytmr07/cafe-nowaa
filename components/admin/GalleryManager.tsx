'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronUp,
  ImagePlus,
  Play,
  Trash2,
} from 'lucide-react';
import {
  addGalleryFile,
  deleteGalleryItem,
  GalleryUploadError,
  MAX_VIDEO_BYTES,
  MAX_VIDEO_SECONDS,
  setGalleryCaption,
  setGalleryVisible,
  subscribeToGallery,
  swapGalleryOrder,
} from '@/lib/gallery-repo';
import { isGalleryItemVisible, type GalleryItem } from '@/lib/gallery-types';
import { Button, Field, IconButton, Input, Panel, Switch } from './ui';

type Progress = { name: string; fraction: number; index: number; total: number };

/**
 * The café's own posts for the homepage gallery: pick photos or videos on
 * the phone, optionally say what they show, publish. Newest goes first.
 */
export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState<Progress | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () =>
      subscribeToGallery(setItems, () => {
        setLoadError(true);
        setItems([]);
      }),
    []
  );

  const handleFiles = async (files: File[]) => {
    setErrors([]);
    const failures: string[] = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      setProgress({ name: file.name, fraction: 0, index, total: files.length });
      try {
        await addGalleryFile(file, caption, (fraction) =>
          setProgress({ name: file.name, fraction, index, total: files.length })
        );
      } catch (error) {
        failures.push(
          `${file.name}: ${
            error instanceof GalleryUploadError
              ? error.message
              : 'Yükleme başarısız. Bağlantınızı kontrol edin.'
          }`
        );
      }
    }

    setProgress(null);
    setErrors(failures);
    if (failures.length < files.length) setCaption('');
  };

  const move = async (index: number, direction: -1 | 1) => {
    if (!items) return;
    const target = items[index + direction];
    if (!target) return;
    setBusy(true);
    try {
      await swapGalleryOrder(items[index], target);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item: GalleryItem) => {
    if (!confirm('Bu paylaşım siteden ve depolamadan silinecek. Emin misiniz?')) return;
    setBusy(true);
    try {
      await deleteGalleryItem(item);
    } finally {
      setBusy(false);
    }
  };

  const uploading = progress !== null;

  return (
    <div className="space-y-6">
      <Panel title="Yeni Paylaşım">
        <div className="space-y-4">
          <Field
            label="Açıklama (isteğe bağlı)"
            hint="Örn. “Akşam terası”. Seçtiğiniz tüm dosyalara eklenir."
          >
            <Input
              value={caption}
              maxLength={120}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Görselde ne var?"
              disabled={uploading}
            />
          </Field>

          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/mp4,video/quicktime,video/webm"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              e.target.value = '';
              if (files.length) void handleFiles(files);
            }}
          />

          <Button
            variant="primary"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="w-full sm:w-auto"
          >
            <ImagePlus className="h-4 w-4" aria-hidden="true" />
            {uploading ? 'Yükleniyor…' : 'Fotoğraf / Video Seç'}
          </Button>

          {progress && (
            <div role="status" aria-live="polite">
              <p className="truncate text-xs text-silver">
                {progress.total > 1 && `${progress.index + 1}/${progress.total} · `}
                {progress.name} — %{Math.round(progress.fraction * 100)}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-graphite">
                <div
                  className="h-full bg-gold transition-[width] duration-200"
                  style={{ width: `${Math.max(3, progress.fraction * 100)}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-steel">
                Yükleme bitene kadar bu sayfayı kapatmayın.
              </p>
            </div>
          )}

          {errors.length > 0 && (
            <ul role="alert" className="space-y-1 text-xs text-red-300">
              {errors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          )}

          <p className="text-[11px] leading-relaxed text-steel">
            Fotoğraflar otomatik küçültülür. Videolar en fazla{' '}
            {MAX_VIDEO_SECONDS} saniye ve {MAX_VIDEO_BYTES / 1024 / 1024} MB
            olabilir; sitede başlatma tuşuyla görünür, basınca sesli açılır.
            4K yerine 1080p çekim dosyayı küçük tutar.
          </p>
        </div>
      </Panel>

      <Panel
        title="Galerideki Paylaşımlar"
        action={
          items && items.length > 0 ? (
            <span className="text-[11px] text-steel">
              {items.filter(isGalleryItemVisible).length} yayında · {items.length} toplam
            </span>
          ) : undefined
        }
      >
        {loadError && (
          <p className="text-sm text-red-300">
            Galeri okunamadı. Firestore kurallarını kontrol edin.
          </p>
        )}
        {!items && <p className="text-sm text-steel">Yükleniyor…</p>}
        {items && items.length === 0 && !loadError && (
          <p className="text-sm font-light text-silver">
            Henüz paylaşım yok. Sitede şimdilik mekanın hazır fotoğrafları
            görünüyor; yüklediğiniz her şey onların önüne eklenir.
          </p>
        )}

        {items && items.length > 0 && (
          <ul className="divide-y divide-pearl/10">
            {items.map((item, index) => (
              <GalleryRow
                key={item.id}
                item={item}
                busy={busy}
                isFirst={index === 0}
                isLast={index === items.length - 1}
                onUp={() => move(index, -1)}
                onDown={() => move(index, 1)}
                onDelete={() => remove(item)}
              />
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function GalleryRow({
  item,
  busy,
  isFirst,
  isLast,
  onUp,
  onDown,
  onDelete,
}: {
  item: GalleryItem;
  busy: boolean;
  isFirst: boolean;
  isLast: boolean;
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
}) {
  const [caption, setCaption] = useState(item.caption ?? '');
  const visible = isGalleryItemVisible(item);
  const thumb = item.kind === 'video' ? item.posterUrl : item.url;

  // Follow remote edits unless the field is mid-edit
  useEffect(() => setCaption(item.caption ?? ''), [item.caption]);

  const saveCaption = () => {
    if (caption.trim() !== (item.caption ?? '')) {
      void setGalleryCaption(item.id, caption);
    }
  };

  return (
    <li className={`flex gap-3 py-4 ${visible ? '' : 'opacity-50'}`}>
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="relative h-24 w-20 flex-none overflow-hidden rounded-lg border border-pearl/15 bg-graphite"
        aria-label="Dosyayı yeni sekmede aç"
      >
        {thumb && (
          <Image src={thumb} alt="" fill sizes="96px" className="object-cover" unoptimized />
        )}
        {item.kind === 'video' && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian/60 text-pearl">
              <Play className="h-3.5 w-3.5 translate-x-px" fill="currentColor" aria-hidden="true" />
            </span>
          </span>
        )}
      </a>

      <div className="min-w-0 flex-1 space-y-2">
        <Input
          value={caption}
          maxLength={120}
          placeholder="Açıklama ekle"
          onChange={(e) => setCaption(e.target.value)}
          onBlur={saveCaption}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
          aria-label="Açıklama"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Switch
            checked={visible}
            onChange={() => void setGalleryVisible(item.id, !visible)}
            label={visible ? 'Siteden gizle' : 'Sitede göster'}
          />
          <span className="text-[11px] text-steel">
            {visible ? 'Yayında' : 'Gizli'} ·{' '}
            {new Date(item.createdAt).toLocaleDateString('tr-TR')}
          </span>
        </div>
      </div>

      <div className="flex flex-none flex-col gap-1.5">
        <IconButton onClick={onUp} disabled={busy || isFirst} aria-label="Yukarı taşı">
          <ChevronUp className="h-4 w-4" />
        </IconButton>
        <IconButton onClick={onDown} disabled={busy || isLast} aria-label="Aşağı taşı">
          <ChevronDown className="h-4 w-4" />
        </IconButton>
        <IconButton
          onClick={onDelete}
          disabled={busy}
          aria-label="Sil"
          className="hover:border-red-500/60 hover:text-red-300"
        >
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </div>
    </li>
  );
}
