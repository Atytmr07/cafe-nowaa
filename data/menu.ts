/**
 * CAFE NOWAA — MENÜ
 *
 * Transcribed from the venue's printed menu (photographed in-house).
 * Prices are in TRY, KDV dahil. Update here when the kitchen revises
 * the card; every surface (/, /menu, JSON-LD) reads from this file.
 *
 * Only a handful of signature items carry photography — the rest is
 * typographic, mirroring the printed menu. Featured items feed both the
 * homepage teaser and the "Şefin Önerisi" tag on /menu.
 */

export type Category = {
  slug: string;
  label: string;
  /** Ordered sub-sections inside the category, as printed */
  groups: string[];
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  /** null when the kitchen quotes on the day (e.g. scooped ice cream) */
  price: number | null;
  /** Small qualifier printed next to the price, e.g. "2 kişilik" */
  priceNote?: string;
  group: string;
  categorySlug: string;
  isFeatured?: boolean;
  /** Signature items only — placeholder shots pending the real shoot */
  imageUrl?: string;
};

export const formatPrice = (price: number) => `${price} ₺`;

export const CATEGORIES: Category[] = [
  {
    slug: 'kahvalti',
    label: 'Kahvaltı',
    groups: ['Kahvaltı Tabakları', 'Ara Sıcaklar'],
  },
  {
    slug: 'yeni-nesil',
    label: 'Yeni Nesil Kahvaltı',
    groups: ['Ekmek Üstü Lezzetler', 'Kruvasanlı Lezzetler'],
  },
  {
    slug: 'tost-atistirmalik',
    label: 'Tost & Atıştırmalık',
    groups: ['Tost Çeşitleri', 'Gözleme Çeşitleri', 'Atıştırmalıklar'],
  },
  { slug: 'burger', label: 'Burger', groups: ['Hamburger'] },
  { slug: 'pizza', label: 'Pizza', groups: ['Pizza Çeşitleri'] },
  { slug: 'makarna', label: 'Makarna', groups: ['Makarna Çeşitleri'] },
  { slug: 'ana-yemekler', label: 'Ana Yemekler', groups: ['Ana Yemekler'] },
  {
    slug: 'salata-wrap',
    label: 'Salata & Wrap',
    groups: ['Salata Çeşitleri', 'Wraplar'],
  },
  {
    slug: 'kahve',
    label: 'Kahve',
    groups: [
      'Sıcak Kahveler',
      'Latte Seçenekleri',
      'Soğuk Kahveler',
      'Türk Kahve Çeşitleri',
    ],
  },
  {
    slug: 'icecekler',
    label: 'İçecekler',
    groups: [
      'Sıcak İçecekler',
      'Soft İçecekler',
      'Vitamin Bar',
      'Frappe',
      'Smoothie',
      'Frozen',
      'Milkshake Çeşitleri',
    ],
  },
  {
    slug: 'tatlilar',
    label: 'Tatlılar',
    groups: ['Tatlı Çeşitleri', 'Magnolia', 'Dev Cookie', 'Dondurma Çeşitleri'],
  },
];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`;

export const PRODUCTS: Product[] = [
  // ─── KAHVALTI ────────────────────────────────────────────────────────────
  {
    id: 'sefin-kahvalti-tabagi',
    name: 'Şefin Kahvaltı Tabağı',
    description:
      'Ezine peynir, taze kaşar peyniri, burgu ve süt damlası, söğüş eşliğinde, iki çeşit zeytin, iki çeşit jambon, tereyağı, bal, haşlanmış yumurta, 2 bardak çay.',
    price: 450,
    group: 'Kahvaltı Tabakları',
    categorySlug: 'kahvalti',
  },
  {
    id: 'serpme-kahvalti',
    name: 'Serpme Kahvaltı',
    description:
      'Ezine peynir, taze kaşar peyniri, burgu ve süt damlası, eski kaşar, tereyağı, acuka, siyah ve yeşil zeytin, söğüş tabağı, 2 çeşit reçel, ızgara hellim, ızgara sucuk, patates ve sosis tabağı, kalem böreği, omlet veya göz yumurta seçeneği ile.',
    price: 1100,
    priceNote: '2 kişilik · ilave servis ücreti alınmaktadır',
    group: 'Kahvaltı Tabakları',
    categorySlug: 'kahvalti',
    isFeatured: true,
    imageUrl: img('photo-1533089860892-a7c6f0a88666'),
  },
  {
    id: 'peynirli-omlet',
    name: 'Peynirli Omlet',
    price: 150,
    group: 'Ara Sıcaklar',
    categorySlug: 'kahvalti',
  },
  {
    id: 'kasarli-omlet',
    name: 'Kaşarlı Omlet',
    price: 200,
    group: 'Ara Sıcaklar',
    categorySlug: 'kahvalti',
  },
  {
    id: 'sebzeli-omlet',
    name: 'Sebzeli Omlet',
    price: 200,
    group: 'Ara Sıcaklar',
    categorySlug: 'kahvalti',
  },
  {
    id: 'sucuk-kasarli-omlet',
    name: 'Sucuk Kaşarlı Omlet',
    price: 200,
    group: 'Ara Sıcaklar',
    categorySlug: 'kahvalti',
  },
  {
    id: 'menemen',
    name: 'Menemen',
    description: 'Kaşarlı seçeneğiyle.',
    price: 200,
    group: 'Ara Sıcaklar',
    categorySlug: 'kahvalti',
  },
  {
    id: 'mihlama',
    name: 'Mıhlama',
    description: 'Trabzon peyniri ve tereyağı ile.',
    price: 250,
    group: 'Ara Sıcaklar',
    categorySlug: 'kahvalti',
  },

  // ─── YENİ NESİL KAHVALTI ─────────────────────────────────────────────────
  {
    id: 'pastirmali',
    name: 'Pastırmalı',
    description:
      'Ekşi mayalı ekmek üzerinde çırpılmış yumurta, çıtır pastırma ve özel labne-hardal sos, mevsim yeşillikleri ve söğüş.',
    price: 250,
    group: 'Ekmek Üstü Lezzetler',
    categorySlug: 'yeni-nesil',
  },
  {
    id: 'hindi-fumeli',
    name: 'Hindi Fümeli',
    description:
      'Ekşi mayalı ekmek, labne, avokado sos, çırpılmış yumurta, hindi füme, mevsim yeşillikleri ve söğüş.',
    price: 230,
    group: 'Ekmek Üstü Lezzetler',
    categorySlug: 'yeni-nesil',
  },
  {
    id: 'avokadolu',
    name: 'Avokadolu',
    description:
      'Ekşi mayalı ekmek, hardal ve labne sos ile göz yumurta, avokado dilimleri, mevsim yeşillikleri ve söğüş.',
    price: 300,
    group: 'Ekmek Üstü Lezzetler',
    categorySlug: 'yeni-nesil',
  },
  {
    id: 'nowaakado',
    name: 'Nowaakado',
    description:
      'Avokado içerisinde göz yumurta, iki çeşit peynir, zeytin, mevsim yeşillikleri yanında ekşi mayalı ekmek.',
    price: 250,
    group: 'Ekmek Üstü Lezzetler',
    categorySlug: 'yeni-nesil',
    isFeatured: true,
    imageUrl: img('photo-1541519227354-08fa5d50c44d'),
  },
  {
    id: 'sade-kruvasan',
    name: 'Sade Kruvasan',
    description: 'Çikolata eşliğinde.',
    price: 250,
    group: 'Kruvasanlı Lezzetler',
    categorySlug: 'yeni-nesil',
  },
  {
    id: 'hindi-fumeli-kruvasan',
    name: 'Hindi Fümeli Kruvasan',
    description:
      'Nowaa sos, çırpılmış yumurta, hindi füme, mevsim yeşillikleri.',
    price: 350,
    group: 'Kruvasanlı Lezzetler',
    categorySlug: 'yeni-nesil',
  },
  {
    id: 'avokado-kruvasan',
    name: 'Avokado Kruvasan',
    description:
      'Nowaa sos, çırpılmış yumurta, avokado dilimleri, mevsim yeşillikleri.',
    price: 350,
    group: 'Kruvasanlı Lezzetler',
    categorySlug: 'yeni-nesil',
  },
  {
    id: 'meyveli-kruvasan',
    name: 'Meyveli Kruvasan',
    description: 'Pastacı kreması ile muz ve çilek eşliğinde çikolata ile.',
    price: 550,
    group: 'Kruvasanlı Lezzetler',
    categorySlug: 'yeni-nesil',
  },

  // ─── TOST & ATIŞTIRMALIK ─────────────────────────────────────────────────
  {
    id: 'kasarli-tost',
    name: 'Kaşarlı Tost',
    description: 'Jumbo boy ekmek ve patates ile.',
    price: 200,
    group: 'Tost Çeşitleri',
    categorySlug: 'tost-atistirmalik',
  },
  {
    id: 'karisik-tost',
    name: 'Karışık Tost',
    description: 'Jumbo boy ekmek ve patates ile.',
    price: 250,
    group: 'Tost Çeşitleri',
    categorySlug: 'tost-atistirmalik',
  },
  {
    id: 'kavurmali-tost',
    name: 'Kavurmalı Tost',
    description: 'Jumbo boy ekmek ve patates ile.',
    price: 270,
    group: 'Tost Çeşitleri',
    categorySlug: 'tost-atistirmalik',
  },
  {
    id: 'beyaz-peynirli-gozleme',
    name: 'Beyaz Peynirli Gözleme',
    description: 'Söğüş ile.',
    price: 250,
    group: 'Gözleme Çeşitleri',
    categorySlug: 'tost-atistirmalik',
  },
  {
    id: 'kasar-peynirli-gozleme',
    name: 'Kaşar Peynirli Gözleme',
    description: 'Söğüş ile.',
    price: 250,
    group: 'Gözleme Çeşitleri',
    categorySlug: 'tost-atistirmalik',
  },
  {
    id: 'patatesli-gozleme',
    name: 'Patatesli Gözleme',
    description: 'Söğüş ile.',
    price: 250,
    group: 'Gözleme Çeşitleri',
    categorySlug: 'tost-atistirmalik',
  },
  {
    id: 'sosis-tabagi',
    name: 'Sosis Tabağı',
    description: 'Patates ile.',
    price: 250,
    group: 'Atıştırmalıklar',
    categorySlug: 'tost-atistirmalik',
  },
  {
    id: 'citir-tavuk',
    name: 'Çıtır Tavuk',
    description: 'Patates ile.',
    price: 400,
    group: 'Atıştırmalıklar',
    categorySlug: 'tost-atistirmalik',
  },
  {
    id: 'combo-tabagi',
    name: 'Combo Tabağı',
    description: 'Soğan halkası, sosis, kalem böreği.',
    price: 300,
    group: 'Atıştırmalıklar',
    categorySlug: 'tost-atistirmalik',
  },
  {
    id: 'patates-tava',
    name: 'Patates Tava',
    description: 'Cajun ile.',
    price: 200,
    group: 'Atıştırmalıklar',
    categorySlug: 'tost-atistirmalik',
  },

  // ─── BURGER ──────────────────────────────────────────────────────────────
  {
    id: 'klasik-hamburger',
    name: 'Klasik Hamburger',
    description: '150 gr. et, marul, domates, turşu, patates ile.',
    price: 400,
    group: 'Hamburger',
    categorySlug: 'burger',
  },
  {
    id: 'cheeseburger',
    name: 'Cheeseburger',
    description: '150 gr. et, cheddar, marul, domates, turşu, patates.',
    price: 430,
    group: 'Hamburger',
    categorySlug: 'burger',
  },
  {
    id: 'nowaa-burger',
    name: 'Nowaa Burger',
    description: '150 gr. et, domates, turşu, çıtır soğan, patates ile.',
    price: 400,
    group: 'Hamburger',
    categorySlug: 'burger',
    isFeatured: true,
    imageUrl: img('photo-1568901346375-23c9450c58cd'),
  },
  {
    id: 'double-nowaa-burger',
    name: 'Double Nowaa Burger',
    description: '2 adet 150 gr. et, cheddar, çıtır soğan, Nowaa sos ve patates ile.',
    price: 500,
    group: 'Hamburger',
    categorySlug: 'burger',
  },

  // ─── PİZZA ───────────────────────────────────────────────────────────────
  {
    id: 'margarita-pizza',
    name: 'Margarita Pizza',
    description: 'Mozarella peyniri, çeri domates, fesleğen.',
    price: 400,
    group: 'Pizza Çeşitleri',
    categorySlug: 'pizza',
  },
  {
    id: 'nowaa-karisik-pizza',
    name: 'Nowaa Karışık Pizza',
    description:
      'Mozarella peyniri, mantar, sucuk, sosis, salam, mısır, fesleğen.',
    price: 500,
    group: 'Pizza Çeşitleri',
    categorySlug: 'pizza',
    isFeatured: true,
    imageUrl: img('photo-1574071318508-1cdbab80d002'),
  },
  {
    id: 'tonbalikli-pizza',
    name: 'Tonbalıklı Pizza',
    description: 'Mozarella peyniri, ton balığı, soğan, mısır, fesleğen.',
    price: 450,
    group: 'Pizza Çeşitleri',
    categorySlug: 'pizza',
  },
  {
    id: 'sucuk-sever-pizza',
    name: 'Sucuk Sever Pizza',
    description: 'Mozarella peyniri, sucuk, fesleğen.',
    price: 450,
    group: 'Pizza Çeşitleri',
    categorySlug: 'pizza',
  },

  // ─── MAKARNA ─────────────────────────────────────────────────────────────
  {
    id: 'pesto-soslu-penne',
    name: 'Pesto Soslu Penne',
    description: '150 gr. tavuk, mantar, krema, fesleğen, parmesan.',
    price: 350,
    group: 'Makarna Çeşitleri',
    categorySlug: 'makarna',
  },
  {
    id: 'spagetti-bolonez',
    name: 'Spagetti Bolonez',
    description: '150 gr. kıyma, domates sosu, fesleğen.',
    price: 350,
    group: 'Makarna Çeşitleri',
    categorySlug: 'makarna',
  },
  {
    id: 'penne-arrabbiata',
    name: 'Penne Arrabbiata',
    description: '350 gr. domates sosu, kaşar peyniri, fesleğen.',
    price: 350,
    group: 'Makarna Çeşitleri',
    categorySlug: 'makarna',
  },
  {
    id: 'manti',
    name: 'Mantı',
    description: '210 gr. özel yoğurt sos eşliğinde.',
    price: 350,
    group: 'Makarna Çeşitleri',
    categorySlug: 'makarna',
  },
  {
    id: 'citir-manti',
    name: 'Çıtır Mantı',
    description: '210 gr. özel yoğurt sos eşliğinde.',
    price: 350,
    group: 'Makarna Çeşitleri',
    categorySlug: 'makarna',
  },

  // ─── ANA YEMEKLER ────────────────────────────────────────────────────────
  {
    id: 'izgara-kofte',
    name: 'Izgara Köfte',
    description: '200 gr. dana köfte, pilav, patates, domates eşliğinde.',
    price: 500,
    group: 'Ana Yemekler',
    categorySlug: 'ana-yemekler',
  },
  {
    id: 'izgara-tavuk-pirzola',
    name: 'Izgara Tavuk Pirzola',
    description: '220 gr. tavuk, pilav, patates, domates eşliğinde.',
    price: 450,
    group: 'Ana Yemekler',
    categorySlug: 'ana-yemekler',
  },
  {
    id: 'kori-soslu-tavuk',
    name: 'Köri Soslu Tavuk',
    description:
      '200 gr. tavuk, pilav, patates eşliğinde, 3 renk biber, mantar, krema, köri.',
    price: 500,
    group: 'Ana Yemekler',
    categorySlug: 'ana-yemekler',
  },
  {
    id: 'soya-soslu-tavuk',
    name: 'Soya Soslu Tavuk',
    description: '200 gr. tavuk, pilav, patates eşliğinde.',
    price: 500,
    group: 'Ana Yemekler',
    categorySlug: 'ana-yemekler',
  },
  {
    id: 'kremali-kekikli-tavuk',
    name: 'Kremalı Kekikli Tavuk',
    description: '200 gr. tavuk, pilav, patates eşliğinde, mantar, krema.',
    price: 500,
    group: 'Ana Yemekler',
    categorySlug: 'ana-yemekler',
  },
  {
    id: 'barbeku-soslu-tavuk',
    name: 'Barbekü Soslu Tavuk',
    description:
      '200 gr. tavuk, pilav, patates eşliğinde, 3 renk biber, mantar ve barbekü sos.',
    price: 500,
    group: 'Ana Yemekler',
    categorySlug: 'ana-yemekler',
  },
  {
    id: 'meksika-soslu-tavuk',
    name: 'Meksika Soslu Tavuk',
    description:
      '200 gr. tavuk, pilav, patates eşliğinde, 3 renk biber, mantar, Meksika sos ile.',
    price: 500,
    group: 'Ana Yemekler',
    categorySlug: 'ana-yemekler',
  },
  {
    id: 'karisik-izgara',
    name: 'Karışık Izgara',
    description: '200 gr. köfte + 250 gr. tavuk, pilav, patates eşliğinde.',
    price: 600,
    group: 'Ana Yemekler',
    categorySlug: 'ana-yemekler',
  },
  {
    id: 'tavuk-fajita',
    name: 'Tavuk Fajita',
    description:
      '200 gr. tavuk, 3 renk biber, soğan, ekşi krema, avokado sos, salsa sos.',
    price: 500,
    group: 'Ana Yemekler',
    categorySlug: 'ana-yemekler',
  },

  // ─── SALATA & WRAP ───────────────────────────────────────────────────────
  {
    id: 'hellimli-avokadolu-salata',
    name: 'Hellimli Avokadolu Salata',
    description:
      'Mevsim yeşillikleri, Akdeniz yeşilliği, avokado dilimleri, ızgara hellim.',
    price: 400,
    group: 'Salata Çeşitleri',
    categorySlug: 'salata-wrap',
  },
  {
    id: 'citir-tavuklu-salata',
    name: 'Çıtır Tavuklu Salata',
    description:
      'Mevsim yeşillikleri, Akdeniz yeşilliği, çıtır paneli tavuk dilimleri.',
    price: 450,
    group: 'Salata Çeşitleri',
    categorySlug: 'salata-wrap',
  },
  {
    id: 'tonbalikli-salata',
    name: 'Tonbalıklı Salata',
    description: 'Mevsim yeşillikleri, Akdeniz yeşilliği, ton balığı, mısır.',
    price: 350,
    group: 'Salata Çeşitleri',
    categorySlug: 'salata-wrap',
  },
  {
    id: 'sezar-salata',
    name: 'Sezar Salata',
    description:
      'Mevsim yeşillikleri, Akdeniz yeşilliği, ızgara tavuk parçaları, sezar sos.',
    price: 300,
    group: 'Salata Çeşitleri',
    categorySlug: 'salata-wrap',
  },
  {
    id: 'akdeniz-salata',
    name: 'Akdeniz Salata',
    description:
      'Mevsim yeşillikleri, Akdeniz yeşilliği, çeri domates, mısır eşliğinde.',
    price: 280,
    group: 'Salata Çeşitleri',
    categorySlug: 'salata-wrap',
  },
  {
    id: 'barbeku-soslu-wrap',
    name: 'Barbekü Soslu Wrap',
    description: '100 gr. tavuk, 3 renk biber, mantar ve patates eşliğinde.',
    price: 450,
    group: 'Wraplar',
    categorySlug: 'salata-wrap',
  },
  {
    id: 'kofteli-wrap',
    name: 'Köfteli Wrap',
    description: '150 gr. köfte, kaşar peynir ve patates eşliğinde.',
    price: 450,
    group: 'Wraplar',
    categorySlug: 'salata-wrap',
  },
  {
    id: 'tavuklu-wrap',
    name: 'Tavuklu Wrap',
    description: '100 gr. tavuk, 3 renk biber, mantar ve patates eşliğinde.',
    price: 450,
    group: 'Wraplar',
    categorySlug: 'salata-wrap',
  },
  {
    id: 'meksika-soslu-wrap',
    name: 'Meksika Soslu Wrap',
    description:
      '100 gr. tavuk, üç renk biber, mantar, Meksika sos ile patates eşliğinde.',
    price: 450,
    group: 'Wraplar',
    categorySlug: 'salata-wrap',
  },
  {
    id: 'soya-soslu-wrap',
    name: 'Soya Soslu Wrap',
    description:
      '100 gr. tavuk, üç renk biber, mantar, soya sos ile patates eşliğinde.',
    price: 450,
    group: 'Wraplar',
    categorySlug: 'salata-wrap',
  },

  // ─── KAHVE ───────────────────────────────────────────────────────────────
  {
    id: 'filtre-kahve',
    name: 'Filtre Kahve',
    price: 120,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'americano',
    name: 'Americano',
    price: 130,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'espresso',
    name: 'Espresso',
    price: 130,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'espresso-double',
    name: 'Espresso Double',
    price: 150,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Yulaf, laktozsuz, badem seçenekleri.',
    price: 150,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    price: 150,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    price: 150,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'cortado',
    name: 'Cortado',
    price: 210,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'mocha',
    name: 'Mocha',
    price: 170,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'white-mocha',
    name: 'White Mocha',
    price: 210,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'affogato',
    name: 'Affogato',
    price: 230,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    price: 270,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'espresso-macchiato',
    name: 'Espresso Macchiato',
    price: 170,
    group: 'Sıcak Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'vanilya-latte',
    name: 'Vanilya Latte',
    price: 180,
    group: 'Latte Seçenekleri',
    categorySlug: 'kahve',
  },
  {
    id: 'karamel-latte',
    name: 'Karamel Latte',
    price: 180,
    group: 'Latte Seçenekleri',
    categorySlug: 'kahve',
  },
  {
    id: 'hazelnut-latte',
    name: 'Hazelnut Latte',
    price: 180,
    group: 'Latte Seçenekleri',
    categorySlug: 'kahve',
  },
  {
    id: 'coconut-latte',
    name: 'Coconut Latte',
    price: 180,
    group: 'Latte Seçenekleri',
    categorySlug: 'kahve',
  },
  {
    id: 'lotus-latte',
    name: 'Lotus Latte',
    price: 180,
    group: 'Latte Seçenekleri',
    categorySlug: 'kahve',
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    price: 180,
    group: 'Latte Seçenekleri',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-filtre',
    name: 'Ice Filtre',
    price: 120,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-americano',
    name: 'Ice Americano',
    price: 130,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-latte',
    name: 'Ice Latte',
    price: 150,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-matcha-latte',
    name: 'Ice Matcha Latte',
    price: 200,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-strawberry-matcha',
    name: 'Ice Strawberry Matcha',
    price: 300,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-cappuccino',
    name: 'Ice Cappuccino',
    price: 170,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-mocha',
    name: 'Ice Mocha',
    price: 170,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-white-mocha',
    name: 'Ice White Mocha',
    price: 190,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-vanilya-latte',
    name: 'Ice Vanilya Latte',
    price: 170,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-hazelnut-latte',
    name: 'Ice Hazelnut Latte',
    price: 200,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-chocolate-latte',
    name: 'Ice Chocolate Latte',
    price: 200,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-chai-tea-latte',
    name: 'Ice Chai Tea Latte',
    price: 170,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'ice-caramel-latte',
    name: 'Ice Caramel Latte',
    price: 170,
    group: 'Soğuk Kahveler',
    categorySlug: 'kahve',
  },
  {
    id: 'turk-kahvesi',
    name: 'Türk Kahvesi',
    price: 100,
    group: 'Türk Kahve Çeşitleri',
    categorySlug: 'kahve',
  },
  {
    id: 'turk-kahvesi-double',
    name: 'Türk Kahvesi Double',
    price: 120,
    group: 'Türk Kahve Çeşitleri',
    categorySlug: 'kahve',
  },
  {
    id: 'menengic-kahvesi',
    name: 'Menengiç Kahvesi',
    price: 150,
    group: 'Türk Kahve Çeşitleri',
    categorySlug: 'kahve',
  },
  {
    id: 'menengic-kahvesi-double',
    name: 'Menengiç Kahvesi Double',
    price: 170,
    group: 'Türk Kahve Çeşitleri',
    categorySlug: 'kahve',
  },
  {
    id: 'dibek-kahvesi',
    name: 'Dibek Kahvesi',
    price: 150,
    group: 'Türk Kahve Çeşitleri',
    categorySlug: 'kahve',
  },
  {
    id: 'dibek-kahvesi-double',
    name: 'Dibek Kahvesi Double',
    price: 190,
    group: 'Türk Kahve Çeşitleri',
    categorySlug: 'kahve',
  },
  {
    id: 'damla-sakizli-turk-kahvesi',
    name: 'Damla Sakızlı Türk Kahvesi',
    price: 150,
    group: 'Türk Kahve Çeşitleri',
    categorySlug: 'kahve',
  },
  {
    id: 'damla-sakizli-turk-kahvesi-double',
    name: 'Damla Sakızlı Türk Kahvesi Double',
    price: 170,
    group: 'Türk Kahve Çeşitleri',
    categorySlug: 'kahve',
  },

  // ─── İÇECEKLER ───────────────────────────────────────────────────────────
  {
    id: 'cay',
    name: 'Çay',
    price: 50,
    group: 'Sıcak İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'fincan-cay',
    name: 'Fincan Çay',
    price: 70,
    group: 'Sıcak İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'beyaz-sicak-cikolata',
    name: 'Beyaz Sıcak Çikolata',
    price: 190,
    group: 'Sıcak İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'findikli-salep',
    name: 'Fındıklı Salep',
    price: 160,
    group: 'Sıcak İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'sahlep',
    name: 'Sahlep',
    price: 150,
    group: 'Sıcak İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'balli-sut',
    name: 'Ballı Süt',
    price: 100,
    group: 'Sıcak İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'oreolu-sicak-cikolata',
    name: "Oreo'lu Sıcak Çikolata",
    price: 200,
    group: 'Sıcak İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'sicak-cikolata',
    name: 'Sıcak Çikolata',
    price: 150,
    group: 'Sıcak İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'su',
    name: 'Su',
    price: 40,
    group: 'Soft İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'soda-cesitleri',
    name: 'Soda Çeşitleri',
    description: 'Limon, narlı, elma, karpuz, çilek.',
    price: 70,
    group: 'Soft İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'churchill',
    name: 'Churchill',
    price: 100,
    group: 'Soft İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'coca-cola',
    name: 'Coca Cola',
    price: 100,
    group: 'Soft İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'coca-cola-zero',
    name: 'Coca Cola Zero',
    price: 100,
    group: 'Soft İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'fuse-tea',
    name: 'Fuse Tea',
    price: 100,
    group: 'Soft İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'fanta',
    name: 'Fanta',
    price: 100,
    group: 'Soft İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'ayran',
    name: 'Ayran',
    price: 70,
    group: 'Soft İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'sprite',
    name: 'Sprite',
    price: 100,
    group: 'Soft İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'limonata-cesitleri',
    name: 'Limonata Çeşitleri',
    description: 'Çilekli, naneli, elmalı.',
    price: 150,
    group: 'Soft İçecekler',
    categorySlug: 'icecekler',
  },
  {
    id: 'nar-suyu',
    name: 'Nar Suyu',
    price: 300,
    group: 'Vitamin Bar',
    categorySlug: 'icecekler',
  },
  {
    id: 'elma-suyu',
    name: 'Elma Suyu',
    price: 300,
    group: 'Vitamin Bar',
    categorySlug: 'icecekler',
  },
  {
    id: 'detox-nowaa',
    name: 'Detox Nowaa',
    price: 200,
    group: 'Vitamin Bar',
    categorySlug: 'icecekler',
  },
  {
    id: 'galaxy-tea',
    name: 'Galaxy Tea',
    price: 300,
    group: 'Vitamin Bar',
    categorySlug: 'icecekler',
  },
  {
    id: 'taze-sikma-portakal-suyu',
    name: 'Taze Sıkma Portakal Suyu',
    price: 300,
    group: 'Vitamin Bar',
    categorySlug: 'icecekler',
  },
  {
    id: 'cikolatali-frappe',
    name: 'Çikolatalı Frappe',
    price: 230,
    group: 'Frappe',
    categorySlug: 'icecekler',
  },
  {
    id: 'oreolu-frappe',
    name: 'Oreolu Frappe',
    price: 250,
    group: 'Frappe',
    categorySlug: 'icecekler',
  },
  {
    id: 'muzlu-frappe',
    name: 'Muzlu Frappe',
    price: 230,
    group: 'Frappe',
    categorySlug: 'icecekler',
  },
  {
    id: 'elmali-frappe',
    name: 'Elmalı Frappe',
    price: 230,
    group: 'Frappe',
    categorySlug: 'icecekler',
  },
  {
    id: 'cikolatali-smoothie',
    name: 'Çikolatalı Smoothie',
    price: 300,
    group: 'Smoothie',
    categorySlug: 'icecekler',
  },
  {
    id: 'muzlu-smoothie',
    name: 'Muzlu Smoothie',
    price: 300,
    group: 'Smoothie',
    categorySlug: 'icecekler',
  },
  {
    id: 'elmali-smoothie',
    name: 'Elmalı Smoothie',
    price: 300,
    group: 'Smoothie',
    categorySlug: 'icecekler',
  },
  {
    id: 'nane-limon-frozen',
    name: 'Nane Limon Frozen',
    price: 150,
    group: 'Frozen',
    categorySlug: 'icecekler',
  },
  {
    id: 'cilekli-frozen',
    name: 'Çilekli Frozen',
    price: 150,
    group: 'Frozen',
    categorySlug: 'icecekler',
  },
  {
    id: 'elmali-frozen',
    name: 'Elmalı Frozen',
    price: 150,
    group: 'Frozen',
    categorySlug: 'icecekler',
  },
  {
    id: 'muzlu-frozen',
    name: 'Muzlu Frozen',
    price: 150,
    group: 'Frozen',
    categorySlug: 'icecekler',
  },
  {
    id: 'cilekli-milkshake',
    name: 'Çilekli Milkshake',
    price: 200,
    group: 'Milkshake Çeşitleri',
    categorySlug: 'icecekler',
  },
  {
    id: 'muzlu-milkshake',
    name: 'Muzlu Milkshake',
    price: 200,
    group: 'Milkshake Çeşitleri',
    categorySlug: 'icecekler',
  },
  {
    id: 'oreolu-milkshake',
    name: 'Oreolu Milkshake',
    price: 250,
    group: 'Milkshake Çeşitleri',
    categorySlug: 'icecekler',
  },
  {
    id: 'cikolatali-milkshake',
    name: 'Çikolatalı Milkshake',
    price: 200,
    group: 'Milkshake Çeşitleri',
    categorySlug: 'icecekler',
  },
  {
    id: 'vanilya-karamel-milkshake',
    name: 'Vanilya Karamel Milkshake',
    price: 250,
    group: 'Milkshake Çeşitleri',
    categorySlug: 'icecekler',
  },

  // ─── TATLILAR ────────────────────────────────────────────────────────────
  {
    id: 'cupta-limonlu-cheesecake',
    name: 'Cupta Limonlu Cheesecake',
    price: 250,
    group: 'Tatlı Çeşitleri',
    categorySlug: 'tatlilar',
  },
  {
    id: 'spoonful',
    name: 'Spoonful',
    price: 250,
    group: 'Tatlı Çeşitleri',
    categorySlug: 'tatlilar',
  },
  {
    id: 'hamsikoy-firin-sutlac',
    name: 'Hamsiköy Fırın Sütlaç',
    price: 250,
    group: 'Tatlı Çeşitleri',
    categorySlug: 'tatlilar',
  },
  {
    id: 'kupta-tiramisu',
    name: 'Kupta Tiramisu',
    price: 250,
    group: 'Tatlı Çeşitleri',
    categorySlug: 'tatlilar',
  },
  {
    id: 'cheesecake-cesitleri',
    name: 'Cheesecake Çeşitleri',
    description: 'Limonlu, frambuazlı, orman meyveli, oreolu.',
    price: 250,
    group: 'Tatlı Çeşitleri',
    categorySlug: 'tatlilar',
  },
  {
    id: 'cevizli-tarcinli-kek',
    name: 'Cevizli Tarçınlı Kremalı Özel Soslu Kek',
    price: 250,
    group: 'Tatlı Çeşitleri',
    categorySlug: 'tatlilar',
  },
  {
    id: 'san-sebastian',
    name: 'San Sebastian',
    description: '1 kalıp (10-12 dilim).',
    price: 250,
    group: 'Tatlı Çeşitleri',
    categorySlug: 'tatlilar',
  },
  {
    id: 'mozaik-pasta',
    name: 'Mozaik Pasta',
    price: 250,
    group: 'Tatlı Çeşitleri',
    categorySlug: 'tatlilar',
  },
  {
    id: 'beyaz-cikolatali-browni',
    name: 'Beyaz Çikolatalı Browni',
    price: 250,
    group: 'Tatlı Çeşitleri',
    categorySlug: 'tatlilar',
  },
  {
    id: 'pasta-cesitleri',
    name: 'Pasta Çeşitleri',
    price: 250,
    group: 'Tatlı Çeşitleri',
    categorySlug: 'tatlilar',
  },
  {
    id: 'cilekli-magnolia',
    name: 'Çilekli Magnolia',
    price: 300,
    group: 'Magnolia',
    categorySlug: 'tatlilar',
  },
  {
    id: 'muzlu-magnolia',
    name: 'Muzlu Magnolia',
    price: 300,
    group: 'Magnolia',
    categorySlug: 'tatlilar',
  },
  {
    id: 'red-velvet-cookie',
    name: 'Red Velvet Cookie',
    price: 400,
    group: 'Dev Cookie',
    categorySlug: 'tatlilar',
  },
  {
    id: 'lotuslu-cookie',
    name: 'Lotuslu Cookie',
    price: 400,
    group: 'Dev Cookie',
    categorySlug: 'tatlilar',
  },
  {
    id: 'klasik-cookie',
    name: 'Klasik Cookie',
    price: 400,
    group: 'Dev Cookie',
    categorySlug: 'tatlilar',
  },
  {
    id: 'oreolu-cookie',
    name: 'Oreolu Cookie',
    price: 500,
    group: 'Dev Cookie',
    categorySlug: 'tatlilar',
  },
  {
    id: 'nutella-cookie',
    name: 'Nutella Cookie',
    price: 500,
    group: 'Dev Cookie',
    categorySlug: 'tatlilar',
  },
  {
    id: 'nutella-lotuslu-cookie',
    name: 'Nutella ve Lotuslu Cookie',
    description: 'Çikolata sos eşliğinde, iki kişiliktir.',
    price: 500,
    group: 'Dev Cookie',
    categorySlug: 'tatlilar',
  },
  {
    id: 'dondurma-cesitleri',
    name: 'Dondurma Çeşitleri',
    description:
      'Porsiyon, külahta ve kg. — çilekli, muzlu, oreolu, çikolatalı, vanilya, karamel.',
    price: null,
    group: 'Dondurma Çeşitleri',
    categorySlug: 'tatlilar',
  },
];

export type FeaturedProduct = Product & { imageUrl: string };

/** Signature dishes for the homepage teaser — never the full list. */
export const FEATURED_PRODUCTS = PRODUCTS.filter(
  (p): p is FeaturedProduct => Boolean(p.isFeatured && p.imageUrl)
);

export const productsByCategory = (slug: string) =>
  PRODUCTS.filter((p) => p.categorySlug === slug);

/** Products of one category, bucketed into its printed sub-sections. */
export const groupedProducts = (category: Category) =>
  category.groups
    .map((group) => ({
      group,
      items: PRODUCTS.filter(
        (p) => p.categorySlug === category.slug && p.group === group
      ),
    }))
    .filter((bucket) => bucket.items.length > 0);
