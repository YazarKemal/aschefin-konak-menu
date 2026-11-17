/**
 * Menü fiyatlarının tek kaynağı.
 * Tüm ürün fiyatları yalnızca bu dosyada tutulur.
 */

export type PriceOption = {
  label: string;
  price: number;
};

/** Ücretsiz ürünler için tek kaynaklı fiyat durumu. */
export const FREE_PRICE = "Ücretsiz" as const;

export type SinglePrice = number | typeof FREE_PRICE;

export const menuPrices = {
  ekmekArasiDoner: [
    { label: "100 gr", price: 170 },
    { label: "120 gr", price: 200 }
  ],
  zurnaDoner: [
    { label: "120 gr", price: 200 },
    { label: "140 gr", price: 230 }
  ],
  ekmekArasiKofte: 250,
  hamburger: 250,
  cheeseburger: 270,
  chickenburger: 200,
  hatayDurum: 170,
  dortluDurumKampanyasi: 600,
  izgaraTavukPirzola: 280,
  izgaraKofte: 280,
  izgaraTavukKulbasti: 250,
  birKgTavukDoner: 800,
  birKgKofte: 900,
  kahvaltiTabagi: 150,
  corba: 70,
  pilav: 50,
  buyukAyran: 60,
  kucukAyran: 40,
  pepsi: 60,
  yediUp: 60,
  yedigun: 60,
  doganaySalgam: 60,
  su: 20,
  sinirsizCay: FREE_PRICE
} satisfies Record<string, SinglePrice | PriceOption[]>;
