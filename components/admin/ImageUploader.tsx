'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Trash2 } from 'lucide-react';
import { deleteProductImage, uploadProductImage } from '@/lib/menu-repo';
import { Button } from './ui';

const MAX_BYTES = 8 * 1024 * 1024;

type ImageUploaderProps = {
  productId: string;
  imageUrl?: string;
  imagePath?: string;
  onChange: (next: { imageUrl?: string; imagePath?: string }) => void;
};

export default function ImageUploader({
  productId,
  imageUrl,
  imagePath,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Yalnızca görsel dosyaları yüklenebilir.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('Görsel 8 MB’tan küçük olmalı.');
      return;
    }

    setBusy(true);
    try {
      const uploaded = await uploadProductImage(productId, file);
      // Replace only after the new file is safely stored
      if (imagePath) await deleteProductImage(imagePath);
      onChange(uploaded);
    } catch {
      setError('Yükleme başarısız. Bağlantınızı ve yetkinizi kontrol edin.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-silver">
        Görsel
      </span>

      <div className="flex items-start gap-4">
        <div className="relative h-28 w-24 flex-none overflow-hidden rounded-lg border border-pearl/15 bg-graphite">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="flex h-full items-center justify-center text-steel">
              <ImagePlus className="h-6 w-6" strokeWidth={1.2} />
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
              e.target.value = '';
            }}
          />
          <Button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            {busy ? 'Yükleniyor…' : imageUrl ? 'Değiştir' : 'Görsel Yükle'}
          </Button>

          {imageUrl && (
            <Button
              type="button"
              variant="danger"
              disabled={busy}
              onClick={async () => {
                if (imagePath) await deleteProductImage(imagePath);
                onChange({ imageUrl: undefined, imagePath: undefined });
              }}
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Kaldır
            </Button>
          )}

          <p className="max-w-[16rem] text-[11px] leading-relaxed text-steel">
            JPG veya PNG, en fazla 8 MB. Dikey (3:4) görseller menüde en iyi
            görünür.
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
