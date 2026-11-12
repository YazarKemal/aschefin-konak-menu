/**
 * Menü fiyatlarının tek kaynağı.
 * Tüm ürün fiyatları yalnızca bu dosyada tutulur.
 */

export type PriceOption = {
  label: string;
  price: number;
};

export const menuPrices = {
  ekmekArasiDoner: [
    { label: "100 gr", price: 180 },
    { label: "120 gr", price: 210 }
  ],
  zurnaDoner: [
    { label: "100 gr", price: 200 },
    { label: "120 gr", price: 230 }
  ],
  ekmekArasiKofte: 250,
  hamburger: 250,
  cheeseburger: 270,
  chickenburger: 200
} satisfies Record<string, number | PriceOption[]>;
