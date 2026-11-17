import { menuPrices } from "./prices";
import type { PriceOption, SinglePrice } from "./prices";

export type { PriceOption } from "./prices";

export type MenuCategory =
  | "Döner"
  | "Köfte"
  | "Burger"
  | "Izgara"
  | "Kilo ile Lezzet"
  | "Kahvaltı"
  | "Çorba & Pilav"
  | "İçecekler";

export type CategoryFilter = "Tümü" | MenuCategory;

/** Eski SVG yemek illüstrasyonlarının varyant adları (kullanımdan kaldırıldı). */
export type DishArtVariant =
  | "doner-soslu"
  | "doner-ekmek"
  | "doner-zurna"
  | "kofte-izgara"
  | "kofte-ekmek"
  | "burger-klasik"
  | "burger-cheese"
  | "burger-chicken";

/**
 * Editoryal ızgara varyantları.
 * feature: geniş görselli vitrin kartı
 * editorial: yatay görsel + metin düzeni
 * standard: kompakt dikey kart
 */
export type CardLayout = "feature" | "editorial" | "standard";

/** Görselin sahnedeki giriş yönü. */
export type RevealDirection = "left" | "right" | "up";

export type ProductImage = {
  /** PNG; AVIF ve WebP desteklenmeyen tarayıcılar için son yedek. */
  src: string;
  /** AVIF birincil kaynak. Eski görsellerde bulunmaz. */
  avif?: string;
  /** WebP ikincil kaynak. Eski görsellerde bulunmaz. */
  webp?: string;
  alt: string;
  width: number;
  height: number;
};

export type MenuProduct = {
  id: string;
  name: string;
  category: MenuCategory;
  /** Basılı menüde açıklama yoksa alan tamamen gizlenir. */
  description?: string;
  image: ProductImage;
  layout: CardLayout;
  reveal: RevealDirection;
  /** Tek fiyatlı ürünler için. */
  price?: SinglePrice;
  /** Gramaj gibi birden fazla fiyat seçeneği olan ürünler için. */
  prices?: PriceOption[];
};

export const restaurant = {
  name: "AsChef'in Konak",
  phoneDisplay: "0312 260 25 55",
  phoneHref: "tel:03122602555",
  menuLabel: "Dijital Menü",
  emblem: {
    src: "/images/aschefin-amblem-seffaf.png",
    width: 222,
    height: 195
  },
  wordmark: {
    src: "/images/aschefin-yazi-logosu-seffaf.png",
    width: 523,
    height: 201
  }
} as const;

export const menuCategories: CategoryFilter[] = [
  "Tümü",
  "Döner",
  "Köfte",
  "Burger",
  "Izgara",
  "Kilo ile Lezzet",
  "Kahvaltı",
  "Çorba & Pilav",
  "İçecekler"
];

/**
 * Ürün görselleri `public/images/products/` altındadır.
 * Yeni ürünlerde AVIF birincil, WebP ikincil, PNG son yedektir.
 * Kartlarda `object-fit: contain` ile orijinal en-boy oranı korunur.
 */
export const menuProducts: MenuProduct[] = [
  // ---------- Döner ----------
  {
    id: "soslu-doner",
    name: "Soslu Döner",
    category: "Döner",
    description: "Usta döneri, özel sosuyla buluşup sıcak servis edilir.",
    image: {
      src: "/images/products/soslu-tavuk-doner.png",
      alt: "Soslu döner tabağı",
      width: 1536,
      height: 1024
    },
    layout: "feature",
    reveal: "up"
  },
  {
    id: "hatay-durum",
    name: "Hatay Dürüm",
    category: "Döner",
    description: "Usta döneri, özel sosuyla sıcak servis edilir.",
    image: {
      src: "/images/products/hatay-durum.png",
      avif: "/images/products/hatay-durum.avif",
      webp: "/images/products/hatay-durum.webp",
      alt: "Hatay dürüm",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "left",
    price: menuPrices.hatayDurum
  },
  {
    id: "ekmek-arasi-doner",
    name: "Ekmek Arası Döner",
    category: "Döner",
    description: "Taze ekmek arasında ince dilimlenmiş döner.",
    image: {
      src: "/images/products/ekmek-arasi-tavuk-doner.png",
      alt: "Ekmek arası döner",
      width: 1536,
      height: 1024
    },
    layout: "editorial",
    reveal: "left",
    prices: menuPrices.ekmekArasiDoner
  },
  {
    id: "zurna-doner",
    name: "Zurna Döner",
    category: "Döner",
    description: "İnce lavaşa sarılmış, dumanı üstünde zurna döner.",
    image: {
      src: "/images/products/zurna-tavuk-doner.png",
      alt: "Zurna döner dürüm",
      width: 1536,
      height: 1024
    },
    layout: "standard",
    reveal: "right",
    prices: menuPrices.zurnaDoner
  },
  {
    id: "dortlu-durum-kampanyasi",
    name: "4 Dürüm Kampanyası",
    category: "Döner",
    image: {
      src: "/images/products/dortlu-durum-kampanyasi.png",
      avif: "/images/products/dortlu-durum-kampanyasi.avif",
      webp: "/images/products/dortlu-durum-kampanyasi.webp",
      alt: "Dörtlü dürüm kampanya tabağı",
      width: 1200,
      height: 800
    },
    layout: "feature",
    reveal: "right",
    price: menuPrices.dortluDurumKampanyasi
  },

  // ---------- Köfte ----------
  {
    id: "ekmek-arasi-kofte",
    name: "Ekmek Arası Köfte",
    category: "Köfte",
    description: "Sıcak ekmek arasında ızgara köfte ve taze garnitür.",
    image: {
      src: "/images/products/ekmek-arasi-tavuk-kofte.png",
      alt: "Ekmek arası köfte",
      width: 1536,
      height: 1024
    },
    layout: "standard",
    reveal: "up",
    price: menuPrices.ekmekArasiKofte
  },

  // ---------- Burger ----------
  {
    id: "hamburger",
    name: "Hamburger",
    category: "Burger",
    description: "Klasik burger; sıcak servis edilir.",
    image: {
      src: "/images/products/hamburger.png",
      alt: "Hamburger",
      width: 1536,
      height: 1024
    },
    layout: "feature",
    reveal: "right",
    price: menuPrices.hamburger
  },
  {
    id: "cheeseburger",
    name: "Cheeseburger",
    category: "Burger",
    description: "Peynirli burger; sıcak servis edilir.",
    image: {
      src: "/images/products/cheeseburger.png",
      alt: "Cheeseburger",
      width: 1536,
      height: 1024
    },
    layout: "standard",
    reveal: "left",
    price: menuPrices.cheeseburger
  },
  {
    id: "chickenburger",
    name: "Chickenburger",
    category: "Burger",
    description: "Tavuklu burger; sıcak servis edilir.",
    image: {
      src: "/images/products/chickenburger.png",
      alt: "Chickenburger",
      width: 1536,
      height: 1024
    },
    layout: "standard",
    reveal: "up",
    price: menuPrices.chickenburger
  },

  // ---------- Izgara ----------
  {
    id: "izgara-tavuk-pirzola",
    name: "Izgara Tavuk Pirzola",
    category: "Izgara",
    image: {
      src: "/images/products/izgara-tavuk-pirzola.png",
      avif: "/images/products/izgara-tavuk-pirzola.avif",
      webp: "/images/products/izgara-tavuk-pirzola.webp",
      alt: "Izgara tavuk pirzola",
      width: 1200,
      height: 800
    },
    layout: "editorial",
    reveal: "left",
    price: menuPrices.izgaraTavukPirzola
  },
  {
    id: "izgara-kofte",
    name: "Izgara Köfte",
    category: "Izgara",
    image: {
      src: "/images/products/izgara-kofte.png",
      avif: "/images/products/izgara-kofte.avif",
      webp: "/images/products/izgara-kofte.webp",
      alt: "Izgara köfte tabağı",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "right",
    price: menuPrices.izgaraKofte
  },
  {
    id: "izgara-tavuk-kulbasti",
    name: "Izgara Tavuk Kulbaştı",
    category: "Izgara",
    image: {
      src: "/images/products/izgara-tavuk-kulbasti.png",
      avif: "/images/products/izgara-tavuk-kulbasti.avif",
      webp: "/images/products/izgara-tavuk-kulbasti.webp",
      alt: "Izgara tavuk kulbaştı",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "up",
    price: menuPrices.izgaraTavukKulbasti
  },

  // ---------- Kilo ile Lezzet ----------
  {
    id: "bir-kg-tavuk-doner",
    name: "1 KG Tavuk Döner",
    category: "Kilo ile Lezzet",
    image: {
      src: "/images/products/bir-kg-tavuk-doner.png",
      avif: "/images/products/bir-kg-tavuk-doner.avif",
      webp: "/images/products/bir-kg-tavuk-doner.webp",
      alt: "Bir kilogram tavuk döner",
      width: 1200,
      height: 800
    },
    layout: "editorial",
    reveal: "left",
    price: menuPrices.birKgTavukDoner
  },
  {
    id: "bir-kg-kofte",
    name: "1 KG Köfte",
    category: "Kilo ile Lezzet",
    image: {
      src: "/images/products/bir-kg-kofte.png",
      avif: "/images/products/bir-kg-kofte.avif",
      webp: "/images/products/bir-kg-kofte.webp",
      alt: "Bir kilogram köfte",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "right",
    price: menuPrices.birKgKofte
  },

  // ---------- Kahvaltı ----------
  {
    id: "kahvalti-tabagi",
    name: "Kahvaltı Tabağı",
    category: "Kahvaltı",
    image: {
      src: "/images/products/kahvalti-tabagi.png",
      avif: "/images/products/kahvalti-tabagi.avif",
      webp: "/images/products/kahvalti-tabagi.webp",
      alt: "Kahvaltı tabağı",
      width: 1200,
      height: 800
    },
    layout: "feature",
    reveal: "up",
    price: menuPrices.kahvaltiTabagi
  },

  // ---------- Çorba & Pilav ----------
  {
    id: "corba",
    name: "Çorba",
    category: "Çorba & Pilav",
    image: {
      src: "/images/products/corba.png",
      avif: "/images/products/corba.avif",
      webp: "/images/products/corba.webp",
      alt: "Çorba kasesi",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "left",
    price: menuPrices.corba
  },
  {
    id: "pilav",
    name: "Pilav",
    category: "Çorba & Pilav",
    image: {
      src: "/images/products/pilav.png",
      avif: "/images/products/pilav.avif",
      webp: "/images/products/pilav.webp",
      alt: "Pilav tabağı",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "right",
    price: menuPrices.pilav
  },

  // ---------- İçecekler ----------
  {
    id: "buyuk-ayran",
    name: "Büyük Ayran",
    category: "İçecekler",
    image: {
      src: "/images/products/buyuk-ayran.png",
      avif: "/images/products/buyuk-ayran.avif",
      webp: "/images/products/buyuk-ayran.webp",
      alt: "Büyük ayran",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "up",
    price: menuPrices.buyukAyran
  },
  {
    id: "kucuk-ayran",
    name: "Küçük Ayran",
    category: "İçecekler",
    image: {
      src: "/images/products/kucuk-ayran.png",
      avif: "/images/products/kucuk-ayran.avif",
      webp: "/images/products/kucuk-ayran.webp",
      alt: "Küçük ayran",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "left",
    price: menuPrices.kucukAyran
  },
  {
    id: "pepsi",
    name: "Pepsi",
    category: "İçecekler",
    image: {
      src: "/images/products/pepsi.png",
      avif: "/images/products/pepsi.avif",
      webp: "/images/products/pepsi.webp",
      alt: "Pepsi",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "right",
    price: menuPrices.pepsi
  },
  {
    id: "yedi-up",
    name: "7UP",
    category: "İçecekler",
    image: {
      src: "/images/products/yedi-up.png",
      avif: "/images/products/yedi-up.avif",
      webp: "/images/products/yedi-up.webp",
      alt: "7UP",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "up",
    price: menuPrices.yediUp
  },
  {
    id: "yedigun",
    name: "Yedigün",
    category: "İçecekler",
    image: {
      src: "/images/products/yedigun.png",
      avif: "/images/products/yedigun.avif",
      webp: "/images/products/yedigun.webp",
      alt: "Yedigün",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "left",
    price: menuPrices.yedigun
  },
  {
    id: "doganay-salgam",
    name: "Doğanay Şalgam",
    category: "İçecekler",
    description: "Acılı / acısız seçenekleriyle.",
    image: {
      src: "/images/products/doganay-salgam.png",
      avif: "/images/products/doganay-salgam.avif",
      webp: "/images/products/doganay-salgam.webp",
      alt: "Doğanay şalgam suyu",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "right",
    price: menuPrices.doganaySalgam
  },
  {
    id: "su",
    name: "Su",
    category: "İçecekler",
    image: {
      src: "/images/products/su.png",
      avif: "/images/products/su.avif",
      webp: "/images/products/su.webp",
      alt: "Su",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "up",
    price: menuPrices.su
  },
  {
    id: "sinirsiz-cay",
    name: "Sınırsız Çay",
    category: "İçecekler",
    image: {
      src: "/images/products/sinirsiz-cay.png",
      avif: "/images/products/sinirsiz-cay.avif",
      webp: "/images/products/sinirsiz-cay.webp",
      alt: "Sınırsız çay",
      width: 1200,
      height: 800
    },
    layout: "standard",
    reveal: "left",
    price: menuPrices.sinirsizCay
  }
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 0
  }).format(price);
