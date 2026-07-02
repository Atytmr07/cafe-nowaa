/**
 * MOCK REVIEWS — placeholder content for the demo build.
 * Structured so real Google Reviews can be swapped in 1:1 later
 * (name, rating, quote, source label).
 */

export type Review = {
  id: string;
  name: string;
  rating: number; // 1–5
  quote: string;
  source: string;
};

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Elif K.',
    rating: 5,
    quote:
      'Marmaray çıkışında böyle bir yer bulmak inanılmaz. Sabah kahvemi almadan trene binmiyorum artık — latte art bile yapıyorlar!',
    source: 'Google Yorumu',
  },
  {
    id: 'r2',
    name: 'Mert A.',
    rating: 5,
    quote:
      'Dışarıdan butik otel lobisi gibi görünüyor, içi de öyle. Nowaa Burger gerçekten iddialı, fiyatlar da gayet makul.',
    source: 'Google Yorumu',
  },
  {
    id: 'r3',
    name: 'Zeynep D.',
    rating: 5,
    quote:
      'Hafta sonu serpme kahvaltısı için geldik, ambiyans ve ilgi harikaydı. Bostancı’da bu kalitede bir mekan yoktu.',
    source: 'Google Yorumu',
  },
  {
    id: 'r4',
    name: 'Can Y.',
    rating: 4,
    quote:
      'Taş fırın pizzaları çok başarılı, sucuklu pizzayı özellikle öneririm. Akşam ışıklandırması ayrı güzel.',
    source: 'Google Yorumu',
  },
  {
    id: 'r5',
    name: 'Selin T.',
    rating: 5,
    quote:
      'İş çıkışı arkadaşlarımla uğradık, cold brew ve mantarlı soslu tavuk favorim oldu. Konum ulaşım için mükemmel.',
    source: 'Google Yorumu',
  },
];
