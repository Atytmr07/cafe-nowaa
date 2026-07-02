/**
 * MOCK MENU DATA — demo build only.
 * All items, prices and photos are realistic placeholders; swap for the
 * client's confirmed menu and real food photography before launch.
 *
 * Consumed by:
 *  - components/MenuTeaser.tsx  → featured items only (isFeatured: true)
 *  - app/menu (ProductGrid)     → the full category-tabbed menu
 */

export type Category = {
  slug: string;
  label: string;
};

export type Product = {
  id: string;
  name: string;
  description: string; // one-liner shown on the card
  longDescription: string; // revealed on tap-to-expand
  allergens: string[];
  price: number; // TRY
  imageUrl: string; // placeholder food photography — replace with real shots
  isFeatured: boolean;
  categorySlug: string;
};

export const formatPrice = (price: number) => `${price} ₺`;

export const CATEGORIES: Category[] = [
  { slug: 'kahvalti', label: 'Kahvaltı' },
  { slug: 'pizza', label: 'Pizza' },
  { slug: 'burger', label: 'Burger' },
  { slug: 'makarna', label: 'Makarna' },
  { slug: 'soslu-tavuk', label: 'Soslu Tavuk' },
  { slug: 'kahve-icecekler', label: 'Kahve & İçecekler' },
];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`;

export const PRODUCTS: Product[] = [
  // ─── Kahvaltı ────────────────────────────────────────────────────────────
  {
    id: 'serpme-kahvalti',
    name: 'Serpme Kahvaltı',
    description: 'İki kişilik zengin köy kahvaltısı, sınırsız çay eşliğinde.',
    longDescription:
      'Ezine peyniri, eski kaşar, çeçil, zeytin çeşitleri, bal-kaymak, ev yapımı reçeller, sigara böreği, sahanda yumurta, taze söğüş ve sıcak köy ekmeği. İki kişiliktir, sınırsız demleme çay dahildir.',
    allergens: ['Gluten', 'Süt', 'Yumurta'],
    price: 380,
    imageUrl: img('photo-1533089860892-a7c6f0a88666'),
    isFeatured: true,
    categorySlug: 'kahvalti',
  },
  {
    id: 'sahanda-yumurta',
    name: 'Sahanda Yumurta',
    description: 'Tereyağında çift yumurta, köy ekmeği ile.',
    longDescription:
      'Bakır sahanda tereyağıyla pişirilmiş iki köy yumurtası; pul biber, taze kekik ve kızarmış köy ekmeği dilimleri ile servis edilir.',
    allergens: ['Yumurta', 'Süt', 'Gluten'],
    price: 160,
    imageUrl: img('photo-1525351484163-7529414344d8'),
    isFeatured: false,
    categorySlug: 'kahvalti',
  },
  {
    id: 'menemen',
    name: 'Menemen',
    description: 'Bol domatesli, tereyağlı klasik menemen.',
    longDescription:
      'Közlenmiş domates, çarliston biber ve tereyağıyla ağır ateşte pişirilen menemen; isteğe göre kaşarlı veya sucuklu hazırlanır. Köy ekmeği ile servis edilir.',
    allergens: ['Yumurta', 'Süt', 'Gluten'],
    price: 180,
    imageUrl: img('photo-1590412200988-a436970781fa'),
    isFeatured: false,
    categorySlug: 'kahvalti',
  },
  {
    id: 'avokadolu-toast',
    name: 'Avokadolu Toast',
    description: 'Ekşi maya ekmek, avokado ezmesi, poşe yumurta.',
    longDescription:
      'Kızarmış ekşi maya ekmeği üzerinde limonlu avokado ezmesi, poşe yumurta, cherry domates ve chili flake. Hafif ama doyurucu bir başlangıç.',
    allergens: ['Gluten', 'Yumurta'],
    price: 220,
    imageUrl: img('photo-1541519227354-08fa5d50c44d'),
    isFeatured: false,
    categorySlug: 'kahvalti',
  },

  // ─── Pizza ───────────────────────────────────────────────────────────────
  {
    id: 'margherita',
    name: 'Margherita',
    description: 'San Marzano sos, fior di latte, taze fesleğen.',
    longDescription:
      '24 saat mayalanmış hamur, San Marzano domates sosu, fior di latte mozzarella, taze fesleğen ve sızma zeytinyağı. Taş fırında yüksek ısıda pişirilir.',
    allergens: ['Gluten', 'Süt'],
    price: 240,
    imageUrl: img('photo-1604382354936-07c5d9983bd3'),
    isFeatured: false,
    categorySlug: 'pizza',
  },
  {
    id: 'sucuklu-pizza',
    name: 'Sucuklu Pizza',
    description: 'Kangal sucuk, mozzarella, közlenmiş biber.',
    longDescription:
      'İnce dilimlenmiş kangal sucuk, bol mozzarella, közlenmiş kapya biber ve kekik. Taş fırından çıkan en çok istenen pizzamız.',
    allergens: ['Gluten', 'Süt'],
    price: 280,
    imageUrl: img('photo-1574071318508-1cdbab80d002'),
    isFeatured: true,
    categorySlug: 'pizza',
  },
  {
    id: 'dort-peynirli',
    name: 'Dört Peynirli',
    description: 'Mozzarella, gorgonzola, parmesan, kaşar.',
    longDescription:
      'Mozzarella, gorgonzola, parmesan ve eski kaşarın taş fırında buluşması; üzerine bal gezdirilmiş ceviz içi ile tatlı-tuzlu bir denge.',
    allergens: ['Gluten', 'Süt', 'Yemiş'],
    price: 300,
    imageUrl: img('photo-1513104890138-7c749659a591'),
    isFeatured: false,
    categorySlug: 'pizza',
  },
  {
    id: 'akdeniz-pizza',
    name: 'Akdeniz Pizza',
    description: 'Zeytin, kurutulmuş domates, beyaz peynir, roka.',
    longDescription:
      'Siyah zeytin, kurutulmuş domates, tam yağlı beyaz peynir ve fırın çıkışı eklenen taze roka; zeytinyağı ve limon ile tazelenir.',
    allergens: ['Gluten', 'Süt'],
    price: 290,
    imageUrl: img('photo-1571407970349-bc81e7e96d47'),
    isFeatured: false,
    categorySlug: 'pizza',
  },

  // ─── Burger ──────────────────────────────────────────────────────────────
  {
    id: 'nowaa-burger',
    name: 'Nowaa Burger',
    description: '160 gr dana köfte, karamelize soğan, Nowaa sos.',
    longDescription:
      'Günlük çekilmiş 160 gr dana köfte, brioche ekmek, karamelize soğan, cheddar, turşu ve imza Nowaa sosumuz. El kesimi patates ile servis edilir.',
    allergens: ['Gluten', 'Süt', 'Yumurta', 'Hardal'],
    price: 320,
    imageUrl: img('photo-1568901346375-23c9450c58cd'),
    isFeatured: true,
    categorySlug: 'burger',
  },
  {
    id: 'cheddar-burger',
    name: 'Cheddar Burger',
    description: 'Çift kat eritme cheddar, turşu, hardal mayo.',
    longDescription:
      '160 gr dana köfte üzerinde çift kat eritilmiş cheddar, ekşi turşu ve hardallı mayonez; brioche ekmekte, el kesimi patates eşliğinde.',
    allergens: ['Gluten', 'Süt', 'Yumurta', 'Hardal'],
    price: 290,
    imageUrl: img('photo-1550547660-d9450f859349'),
    isFeatured: false,
    categorySlug: 'burger',
  },
  {
    id: 'mantarli-burger',
    name: 'Mantarlı Burger',
    description: 'Sote mantar, kaşar, trüf mayonez.',
    longDescription:
      'Tereyağında sote edilmiş kültür mantarı, eritilmiş kaşar ve trüf aromalı mayonez; 160 gr dana köfte ile brioche ekmekte.',
    allergens: ['Gluten', 'Süt', 'Yumurta'],
    price: 310,
    imageUrl: img('photo-1553979459-d2229ba7433b'),
    isFeatured: false,
    categorySlug: 'burger',
  },
  {
    id: 'crispy-tavuk-burger',
    name: 'Crispy Tavuk Burger',
    description: 'Çıtır pane tavuk, coleslaw, acı-tatlı sos.',
    longDescription:
      'Ayran marine edilmiş çıtır pane tavuk göğsü, ev yapımı coleslaw ve acı-tatlı sos; brioche ekmekte, patates eşliğinde.',
    allergens: ['Gluten', 'Süt', 'Yumurta'],
    price: 260,
    imageUrl: img('photo-1606755962773-d324e0a13086'),
    isFeatured: false,
    categorySlug: 'burger',
  },

  // ─── Makarna ─────────────────────────────────────────────────────────────
  {
    id: 'penne-arrabbiata',
    name: 'Penne Arrabbiata',
    description: 'Acılı domates sos, sarımsak, taze fesleğen.',
    longDescription:
      'Al dente penne; sarımsak ve kuru acı biberle dövülmüş domates sos, taze fesleğen ve parmesan ile tamamlanır.',
    allergens: ['Gluten', 'Süt'],
    price: 220,
    imageUrl: img('photo-1621996346565-e3dbc646d9a9'),
    isFeatured: false,
    categorySlug: 'makarna',
  },
  {
    id: 'fettuccine-alfredo',
    name: 'Fettuccine Alfredo',
    description: 'Krema, parmesan, tavuk julyen.',
    longDescription:
      'Taze fettuccine; krema ve bol parmesanla bağlanmış Alfredo sos, ızgara tavuk julyen ve taze çekilmiş karabiber ile.',
    allergens: ['Gluten', 'Süt', 'Yumurta'],
    price: 260,
    imageUrl: img('photo-1645112411341-6c4fd023714a'),
    isFeatured: false,
    categorySlug: 'makarna',
  },
  {
    id: 'pesto-makarna',
    name: 'Pesto Linguine',
    description: 'Ev yapımı fesleğen pestosu, çam fıstığı.',
    longDescription:
      'Taze fesleğen, çam fıstığı, parmesan ve sızma zeytinyağıyla hazırlanan ev yapımı pesto; linguine ile harmanlanır.',
    allergens: ['Gluten', 'Süt', 'Yemiş'],
    price: 250,
    imageUrl: img('photo-1473093295043-cdd812d0e601'),
    isFeatured: false,
    categorySlug: 'makarna',
  },
  {
    id: 'bolonez',
    name: 'Spaghetti Bolonez',
    description: 'Ağır ateşte pişmiş dana ragu, parmesan.',
    longDescription:
      'Dört saat ağır ateşte pişirilmiş dana kıymalı ragu; spaghetti üzerinde taze rendelenmiş parmesan ile servis edilir.',
    allergens: ['Gluten', 'Süt', 'Kereviz'],
    price: 270,
    imageUrl: img('photo-1622973536968-3ead9e780960'),
    isFeatured: false,
    categorySlug: 'makarna',
  },

  // ─── Soslu Tavuk ─────────────────────────────────────────────────────────
  {
    id: 'mantarli-soslu-tavuk',
    name: 'Mantarlı Soslu Tavuk',
    description: 'Krema ve mantar sosunda tavuk, pilav eşliğinde.',
    longDescription:
      'Izgara tavuk göğsü; kültür mantarı ve kremayla hazırlanan yoğun sosla kaplanır, tereyağlı pilav ve taze maydanoz ile servis edilir.',
    allergens: ['Süt'],
    price: 290,
    imageUrl: img('photo-1598103442097-8b74394b95c6'),
    isFeatured: true,
    categorySlug: 'soslu-tavuk',
  },
  {
    id: 'barbeku-soslu-tavuk',
    name: 'Barbekü Soslu Tavuk',
    description: 'İsli barbekü sos, ızgara sebze, patates.',
    longDescription:
      'Ev yapımı isli barbekü sosuyla kaplanmış ızgara tavuk; közlenmiş sebzeler ve el kesimi patates eşliğinde.',
    allergens: ['Hardal'],
    price: 300,
    imageUrl: img('photo-1532550907401-a500c9a57435'),
    isFeatured: false,
    categorySlug: 'soslu-tavuk',
  },
  {
    id: 'korili-tavuk',
    name: 'Körili Tavuk',
    description: 'Hafif baharatlı köri sos, basmati pilavı.',
    longDescription:
      'Hindistan cevizi sütü ve körili sosla ağır ateşte pişirilmiş tavuk parçaları; basmati pilavı ve taze kişniş ile.',
    allergens: ['Süt'],
    price: 290,
    imageUrl: img('photo-1565557623262-b51c2513a641'),
    isFeatured: false,
    categorySlug: 'soslu-tavuk',
  },

  // ─── Kahve & İçecekler ───────────────────────────────────────────────────
  {
    id: 'filtre-kahve',
    name: 'Filtre Kahve',
    description: 'Günlük taze kavrulmuş çekirdek, V60 demleme.',
    longDescription:
      'Haftalık kavrulan single origin çekirdekler; V60 ile demlenir. Çekirdek seçimi için baristamıza danışın. Sade veya sütlü servis edilir.',
    allergens: [],
    price: 90,
    imageUrl: img('photo-1495474472287-4d71bcdd2085'),
    isFeatured: false,
    categorySlug: 'kahve-icecekler',
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Çift shot espresso, ipeksi buharlanmış süt.',
    longDescription:
      'Çift shot espresso üzerine ipeksi mikroköpüklü süt; isteğe göre yulaf veya badem sütü ile hazırlanır.',
    allergens: ['Süt'],
    price: 110,
    imageUrl: img('photo-1509042239860-f550ce710b93'),
    isFeatured: false,
    categorySlug: 'kahve-icecekler',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: '16 saat soğuk demleme, buz üzerinde.',
    longDescription:
      '16 saat soğuk demlenen yoğun gövdeli kahve; buz üzerinde, isteğe göre tonik veya süt ile servis edilir.',
    allergens: [],
    price: 120,
    imageUrl: img('photo-1517701550927-30cf4ba1dba5'),
    isFeatured: false,
    categorySlug: 'kahve-icecekler',
  },
  {
    id: 'turk-kahvesi',
    name: 'Türk Kahvesi',
    description: 'Közde pişirilmiş, lokum eşliğinde.',
    longDescription:
      'Geleneksel usulde közde pişirilen Türk kahvesi; yanında lokum ve bir bardak su ile servis edilir.',
    allergens: [],
    price: 85,
    imageUrl: img('photo-1512568400610-62da28bc8a13'),
    isFeatured: false,
    categorySlug: 'kahve-icecekler',
  },
  {
    id: 'ev-limonatasi',
    name: 'Ev Yapımı Limonata',
    description: 'Taze sıkım limon, nane, az şekerli.',
    longDescription:
      'Her sabah taze sıkılan limon, taze nane yaprakları ve az şekerle hazırlanır; buz üzerinde servis edilir.',
    allergens: [],
    price: 95,
    imageUrl: img('photo-1523677011781-c91d1bbe2f9e'),
    isFeatured: false,
    categorySlug: 'kahve-icecekler',
  },
];

/** Featured dishes for the homepage teaser — never the full list. */
export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.isFeatured);

export const productsByCategory = (slug: string) =>
  PRODUCTS.filter((p) => p.categorySlug === slug);
