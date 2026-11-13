import { menuPrices } from "./prices";
import type { PriceOption } from "./prices";

export type { PriceOption } from "./prices";

export type MenuCategory = "Döner" | "Köfte" | "Burger";

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
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type MenuProduct = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  image: ProductImage;
  layout: CardLayout;
  reveal: RevealDirection;
  /** Tek fiyatlı ürünler için. */
  price?: number;
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
  "Burger"
];

/**
 * Ürün görselleri `public/images/products/` altındadır.
 * Görsellerin hepsi şeffaf arka planlı PNG dosyalarıdır; kartlarda
 * `object-fit: contain` ile ve orijinal en-boy oranı korunarak gösterilir.
 */
export const menuProducts: MenuProduct[] = [
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
  }
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 0
  }).format(price);
