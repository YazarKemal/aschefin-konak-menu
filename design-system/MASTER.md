# AsChef'in Konak — Master Design System

**Sürüm:** 2.0  
**Son güncelleme:** 13 Kasım 2026  
**Kapsam:** Dijital menü (mobil öncelikli, QR ile açılan web deneyimi)  
**Kaynak:** UI UX Pro Max aramaları + frontend-design değerlendirmesi + mevcut marka varlıkları

---

## 1. Tasarım Yönü

**İsim:** Gold Engraving / Altın Gravür

AsChef'in Konak için hedef; siyahın derinliğini, metalik altının sıcaklığını ve
usta işi mutfağın ciddiyetini bir araya getiren editoryal bir menü deneyimi.
Hazır restoran şablonlarındaki kutu-kart kalabalığı yerine; ince altın çizgiler,
geniş tipografik hiyerarşi ve ürün odaklı sakin bir ritim kullanılır.

### Tasarım ilkeleri

1. **Tek sahne, güçlü giriş.** Hero, sayfanın akılda kalan tek büyük jestidir.
2. **Altın bir vurgu, kaplama değil.** Altın; yalnızca hiyerarşi, fiyat ve
   etkileşim noktalarında kullanılır. Her yüzeye altın gradient uygulanmaz.
3. **Fotoğraf doğru olmalı.** Her ürün yalnızca kendi şeffaf PNG'siyle temsil
   edilir. Başka bir yemeğin fotoğrafı, stok görsel veya yanlış eşleşme
   kullanılmaz. Fotoğraf yüklenemezse nötr marka yer tutucusu gösterilir.
4. **Okunabilirlik lüksten önce gelir.** Menü, telefonla ve ayakta okunur.
   Gövde metni mobilde en az 16 px'dir.
5. **Hareket bir koreografi izler.** Hero açılışı, menü sahnesinin çizilmesi,
   kartların sırayla belirmesi ve kategori geçişi aynı ritmi paylaşır. Sürekli
   dönen dekoratif animasyon, scroll-jacking ve kullanıcıyı bekletme yoktur;
   hareket yalnızca `transform` ve `opacity` üzerinden çalışır.
6. **Çerçeve sahneyi taşır, yemeği gölgelemez.** Çift ince altın çizgi, küçük
   köşe işaretleri ve geometrik amblem kullanılır; kalın çerçeve, yoğun süsleme
   ve ürünün önüne geçen altın yüzey yoktur. Yemek fotoğrafı kutuya hapsedilmez;
   negatif insetlerle çerçevenin üzerine hafifçe taşan katmanlı bir kompozisyon
   kurar.
7. **İçerik uydurulmaz.** Fiyat, gramaj, çalışma saati veya ürün içeriği
   doğrulanmadan yayınlanmaz.
8. **Tek kaynak.** Fiyatlar `src/data/prices.ts`, ürün ve görsel bilgileri
   `src/data/menu.ts` içinde tutulur; bileşenlerde kopya fiyat veya sabit
   görsel yolu bulunmaz.

---

## 2. Renk Sistemi

### Primitive tokenlar

| Token | Hex | Kullanım |
|---|---:|---|
| `--obsidian-950` | `#080706` | Sayfa zemini |
| `--obsidian-900` | `#0D0B08` | Header / bar zeminleri |
| `--obsidian-850` | `#110E0A` | Ana yüzey |
| `--obsidian-800` | `#17120C` | Yükseltilmiş kart yüzeyi |
| `--ember-800` | `#24160D` | Sıcak gölge / ürün yüzeyi |
| `--gold-300` | `#E8C67F` | Metalik altın açık |
| `--gold-400` | `#D2AC66` | Ana altın |
| `--gold-500` | `#B98E49` | Altın çizgi / ikincil vurgu |
| `--gold-700` | `#7A5928` | Altın gölge |
| `--bone-100` | `#F6EFE1` | Başlık / birincil metin |
| `--bone-300` | `#D7CAB6` | Güçlü gövde metni |
| `--stone-400` | `#B2A48E` | İkincil metin |
| `--stone-500` | `#938673` | Üçüncül metin / ipucu |
| `--brick-500` | `#B96E4E` | Sıcak yemek vurgusu (sınırlı) |
| `--herb-500` | `#7E8B62` | Yeşil garnitür vurgusu (sınırlı) |

### Semantic tokenlar

| Token | Değer | Kullanım |
|---|---|---|
| `--color-bg` | `var(--obsidian-950)` | Sayfa |
| `--color-surface` | `var(--obsidian-850)` | Paneller |
| `--color-surface-raised` | `var(--obsidian-800)` | Kartlar |
| `--color-text` | `var(--bone-100)` | Başlıklar |
| `--color-text-body` | `var(--bone-300)` | Açıklamalar |
| `--color-text-muted` | `var(--stone-400)` | Yardımcı metin |
| `--color-accent` | `var(--gold-400)` | Ana altın |
| `--color-accent-strong` | `var(--gold-300)` | Hover / fiyat vurgusu |
| `--color-accent-deep` | `var(--gold-700)` | Kenarlık gölgesi |
| `--color-line` | `rgba(210, 172, 102, .24)` | İnce ayraç |
| `--color-line-soft` | `rgba(210, 172, 102, .13)` | Bölme / iç çizgi |
| `--color-line-strong` | `rgba(210, 172, 102, .5)` | Aktif kenarlık |
| `--color-frame` | `rgba(210, 172, 102, .42)` | Dış çerçeve çizgisi |
| `--color-frame-soft` | `rgba(210, 172, 102, .16)` | İç çerçeve / hover |
| `--color-frame-faint` | `rgba(210, 172, 102, .07)` | Kart iç çerçevesi |
| `--color-focus` | `var(--gold-300)` | Klavye odağı |

### Kontrast kuralları

- Ana metin `#F6EFE1` / `#0D0B08`: WCAG AAA.
- İkincil metin en az `#B2A48E`: koyu zemin üzerinde 4.5:1 üzeri.
- Fiyatlar `#E8C67F`; yardımcı fiyat etiketi `#D7CAB6`.
- Altın, tek başına durum göstergesi olarak kullanılmaz; aktif kategori aynı
  zamanda `aria-pressed` ve alt çizgiyle belirtilir.
- Renk geçişlerinde yalnızca `color`, `background-color`, `border-color`,
  `opacity` ve `transform` değişir.

---

## 3. Tipografi

| Rol | Font | Ağırlıklar | Not |
|---|---|---|---|
| Display | **Cormorant Garamond** | 500, 600, 700 | Zarif, yüksek kontrastlı serif |
| UI / gövde | **Jost** | 400, 500, 600 | Geometrik, temiz, Türkçe karakter desteği |
| Sayısal fiyat | Jost | 500 | `font-variant-numeric: tabular-nums` |

**Neden bu ikili?** UI UX Pro Max'in "Restaurant Menu" önerisi (Playfair Display SC
+ Karla) ve "Luxury Serif" önerisi (Cormorant + Montserrat) incelendi. Markanın
el yazısı altın logosuyla daha sıcak bir uyum kurduğu için Cormorant Garamond
seçildi; geometrik Jost, modern menü etiketlerinde okunabilirliği artırır.
Fontlar Google Fonts'tan `display=swap` ile yüklenir.

### Tip ölçeği

| Token | Değer | Kullanım |
|---|---|---|
| `--text-display` | `clamp(3.25rem, 7vw, 5.7rem)` | Genel display; hero kendi kırılımlarını kullanır |
| `--text-h2` | `clamp(2.8rem, 5.4vw, 4.6rem)` | Bölüm başlığı; menü H2'si 1024+'ta `clamp(3.5rem, 5.2vw, 4.8rem)` |
| `--text-h3` | `clamp(1.5rem, 2vw, 1.82rem)` | Genel H3; ürün başlıkları varyanta göre ayrı ölçeklenir |
| `--text-price` | `1.16rem` | Fiyat |
| `--text-body` | `1rem` | Mobil gövde |
| `--text-body-lg` | `clamp(1.04rem, 1.3vw, 1.16rem)` | Hero açıklaması |
| `--text-small` | `.875rem` | Yardımcı metin |
| `--text-label` | `.75rem` | Kategori / etiket, min 12 px |

**Hero başlığı (uygulanan kırılımlar):**

| Genişlik | `font-size` |
|---|---|
| 0–359px | `2.36rem` |
| 360–767px | `clamp(2.7rem, 11vw, 4.4rem)` |
| 768–1023px | `clamp(2.95rem, 5.2vw, 5.6rem)` |
| 1024–1359px | `clamp(4.05rem, 5.6vw, 5.75rem)` |
| 1360–1439px | `5.75rem` |
| 1440px+ | `6rem` |

Hero başlığı iki satıra bölünür; her satır taşma maskesi içinde alttan yükselir.
Satır yüksekliği `0.96`, letter-spacing `-0.022em`. 1440'ta üst sınır `6rem`'dir.

- Display satır yüksekliği: `0.92–1.0`; gövde: `1.6–1.75`.
- H1 satır uzunluğu mobilde en fazla 12 karakterlik ritim; gövde en fazla 62ch.
- Başlıklarda aşırı negatif letter-spacing kullanılmaz; display için `-0.02em`.
- Tüm caps yalnızca kısa kategorilerde (`DÖNER`, `KÖFTE`, `BURGER`) ve
  `letter-spacing: .12em` ile kullanılır. Uzun cümleler caps yazılmaz.

---

## 4. Spacing ve Grid

**Temel birim:** 4 px. Tüm boşluklar 4'ün katıdır.

| Token | Değer | Kullanım |
|---|---|---|
| `--space-1` | 4px | Mikro |
| `--space-2` | 8px | İkon-metin |
| `--space-3` | 12px | Kompakt |
| `--space-4` | 16px | Kart içi |
| `--space-5` | 20px | Kart içi geniş |
| `--space-6` | 24px | Grup |
| `--space-8` | 32px | Bölüm içi |
| `--space-10` | 40px | Büyük grup |
| `--space-12` | 48px | Komponent aralığı |
| `--space-16` | 64px | Bölüm |
| `--space-20` | 80px | Hero / CTA |

- İçerik genişliği: `min(1280px, 100% - 2 * gutter)`.
- Gutter: 400'ün altında `16px`; 400–767 arası `20px`; 768–1023 arası `32px`;
  1024 ve üzeri `48px`.
- Header yüksekliği: temel `68px`; 768+ `80px`; 1440+ `88px`.
- Ürün gridi: 768 altında 1 sütun; 768–1023 arası 2 sütun; 1024–1359 arası
  3 sütun; 1360 ve üzeri 4 sütun.
- Feature ve editorial kartlar 768'den itibaren 2 sütun kaplar; standart kartlar
  1 sütundur. 768'den itibaren `grid-auto-flow: row dense` kullanılır.
- Filtrelenmiş sonuçlar tek tip düzene geçer: mobil 1 sütun, 768+ 2 sütun,
  1024+ 3 sütun, 1360+ yine 3 sütun. Filtrede feature/editorial genişlemesi
  uygulanmaz; böylece sonuçlar dengeli bir ızgarada durur. Arama sonuçları da
  aynı `product-grid--filtered` düzenini kullanır.
- Kart boşluğu: temel `14px`; 768+ `16px`; 1360+ `18px`.
- Bölüm dikey ritmi: `clamp(60px, 8vw, 112px)`.
- Grid satırları gerektiğinde açıkça tanımlanır
  (`grid-template-rows: auto minmax(0, 1fr)`); böylece `aspect-ratio` ile
  gerilen satır yüksekliği kart genişliğini şişirmez ve yatay taşma oluşmaz.

### Kırılım noktaları

| Genişlik | Beklenen düzen |
|---|---|
| 360px | Tek sütun dikey ürün kartları; logo + ikon telefon; 4 sekmeli kategori; hero CTA'ları alt alta 166px |
| 390px | Aynı; hero CTA'ları yan yana 166px; hero görseli tam genişlik |
| 768px | 2 sütun ürün (308.76px); hero split; header 80px; feature 16:9 tam genişlik; editorial iç düzeni yatay |
| 1024px | 3 sütun ürün (266.3px); desktop gutter; CTA'lar yan yana |
| 1440px | 4 sütun ürün; 1280px içerik; header 88px; geniş negatif alan |

768 ve üzerinde `dense` yerleşim, farklı yükseklikteki feature/editorial
kartların oluşturduğu boşlukları kapatır. Kartlar birbirinden bağımsız menü
öğeleridir; filtrelenmiş görünümde `row` akışına dönülerek sıra korunur.

Yatay taşma yasaktır. `overflow-x: hidden` tek başına çözüm değildir; her
komponent kendi `min-width: 0` ve `max-width: 100%` kurallarını taşır.

---

## 5. Logo Kullanımı

Kaynak dosyalar (orijinal renk ve oranlar korunur):

- `public/images/aschefin-amblem-seffaf.png` — 222 × 195
- `public/images/aschefin-yazi-logosu-seffaf.png` — 523 × 201

Kurallar:

- İki dosya header'da birlikte, dengeli bir lockup olarak kullanılır.
- Emblem yüksekliği wordmark'ın yaklaşık 1.35 katıdır.
- `object-fit: contain`; genişlik `auto`; aspect ratio korunur.
- Renk değiştiren filtre, tint veya yeniden çizim yoktur.
- Mobilde lockup küçülür; taşma yerine ikincil navigasyon sadeleşir.
- Logo metinle taklit edilmez. Footer'da da gerçek varlıklar kullanılabilir.
- Minimum dokunma alanı 44 × 44 px.

---

## 6. Komponentler

### 6.1 Header

- Sticky; yükseklik temel 68px, 768+ 80px, 1440+ 88px.
- Zemin: `rgba(8, 7, 6, .9)` + `backdrop-filter: blur(16px)`.
- Alt kenar: 1px `--color-line-soft`.
- Sol: gerçek logo lockup. Sağ: "Menü" bağlantısı + telefon.
- "Menü" bağlantısı 640px altında gizlenir; telefon numarası 560px altında
  gizlenir ve telefon 44 × 44px ikon bağlantısı olur; `aria-label` korunur.

### 6.2 Butonlar

**Primary (gold):**
- Yükseklik 50px; padding `0 21px`; radius 2px.
- Zemin: `linear-gradient(145deg, #F0D8A2 0%, #D2AC66 54%, #A87D38 100%)`.
- Metin: `#171009`, 600, `.82rem`, letter-spacing `.02em`.
- Hover (yalnızca hover + ince işaretçi): `translateY(-1px)` +
  `brightness(1.045)`; ikon `translateY(2px)`.
- Active: `translateY(0)` + `brightness(.98)`.
- Focus-visible: 2px `--gold-300` outline, offset 3px.

**Secondary (outline):**
- Şeffaf zemin; 1px `--color-line-strong`; altın metin; 50px yükseklik.
- Hover: `rgba(210,172,102,.07)` zemin + `--color-accent` kenarlık.

**Hero telefon CTA'sı:**
- 50px yükseklik; 1px `--color-line`; 15px yatay padding; tabular-nums.
- Hero'daki iki CTA `min-width: 166px` taşır; 360'ta alt alta tam hizalı,
  390 ve üzerinde yan yana durur. Metin sıkıştırılmaz, buton küçültülmez.

**Text link:**
- Altın; alt çizgi yalnızca hover/focus'ta; geçiş 160ms.

### 6.3 Kategori sekmeleri

- Minimum 44 × 44px.
- Varsayılan: şeffaf, `--color-text-muted`, 1px şeffaf kenarlık.
- Aktif: `--color-accent-strong` metin, `rgba(210,172,102,.1)` zemin,
  `--color-line` kenarlık ve 2px altın iç alt çizgi (`inset 0 -2px 0`);
  `aria-pressed="true"`. Alt çizgiye ek elmas işaret kullanılmaz.
- Mobilde 4 eşit sütun; 768+ yatay flex, min 84px; 1024+ min 92px. Etiket
  taşmaz, 12px'in altına inmez.
- Odak halkası her durumda görünür.

### 6.4 Arama

- Yükseklik 48px; 1px kenarlık; 2px radius.
- Sol ikon 18px; placeholder `--stone-500` üzeri.
- `focus-within`: altın kenarlık + 3px yumuşak halka.
- Temizleme düğmesi 44 × 44px, yalnızca metin varken görünür.
- `aria-label` ve `aria-live` sonuç sayısı.

### 6.5 Ürün kartı

#### Ortak yapı

- Zemin: `linear-gradient(150deg, --obsidian-800, #0A0806 80%)`; 1px
  `--color-line`; radius 3px; boşta gölge yok.
- Kartın içinde 5px inset `--color-frame-faint` ikinci çizgi; sağ üst ve sol
  alt köşede 23px Art Deco köşe işareti (opacity .56) bulunur.
- Görsel alanı: sıcak radial zemin ve ince altın elips. Yedi ürünün tamamında
  gerçek, şeffaf arka planlı PNG kullanılır; `object-fit: contain` ve orijinal
  en-boy oranı korunur. Fotoğraf kırpılmaz, esnetilmez, siyah kutu içinde
  gösterilmez.
- Fotoğraf `overflow: visible` görsel alanında negatif insetlerle
  (`--photo-inset`) çerçevenin üzerine taşar. Böylece ürün, kartın içine
  hapsedilmiş bir küçük resim değil, sahnenin önünde duran katmanlı bir yemek
  gibi okunur. Fotoğrafın altında yumuşak `drop-shadow` vardır.
- Fotoğraf boyutları veri dosyasındaki gerçek piksel değerleriyle (`width` /
  `height`) verilir; `loading="lazy"`, `decoding="async"`, `draggable={false}`.
  Hero görseli `fetchPriority="high"` ile yüklenir.
- Kategori rozeti görselin sol üstünde; sağ altta 14px çizgi köşesi.
- Başlık Cormorant Garamond; açıklama 0.95–0.97rem, 1.55 satır yüksekliği,
  `--color-text-muted`; başlık altında 30px altın mikro çizgi (feature'da 56px).
- Fiyat satırları yalnızca gerçek fiyatı olan ürünlerde, çift çizgili fiyat
  plakası içinde: etiket sol, noktalı ayraç, tutar sağ; tabular-nums.
  Plakanın üst ortasında 7px elmas işareti vardır.
- Fiyat yoksa: "Fiyat bilgisi için arayın" bağlantısı; uydurma fiyat yoktur.
- Kartın tamamı tıklanabilir değildir; yalnızca gerçek bağlantılar tıklanır.
- Hover yalnızca `(hover: hover) and (pointer: fine)` altında: 1px güçlü
  kenarlık, sınırlı sıcak gölge, iç çerçeve belirginleşmesi ve görselde 1.035
  ölçek. Mobilde hover'a bağlı bilgi yoktur.

#### Varyantlar

| Varyant | Ürünler | Mobil (<768) | 768–1023 | 1024–1359 | 1360+ |
|---|---|---|---|---|---|
| Standart | Zurna Döner, Ekmek Arası Köfte, Cheeseburger, Chickenburger | Dikey; görsel 4:3 | 2 sütunda 1 sütun; görsel 4:3; başlık 1.65rem | 3 sütunda 1 sütun; başlık 1.7rem | 4 sütunda 1 sütun; başlık 1.72rem |
| Feature | Soslu Döner, Hamburger | Dikey; görsel 5:4 | 2 sütun; görsel 16:9; başlık 2.15rem | 2 sütun; başlık 2.3rem | 2 sütun; görsel 16:9; başlık 2.4rem |
| Editorial | Ekmek Arası Döner | Dikey; görsel 4:3 | 2 sütun; 0.6fr görsel / 0.4fr metin, dikey ortalanmış; başlık 1.85rem | 2 sütun; başlık 1.95rem | 2 sütun; başlık 2rem |

- Editorial görselde `aspect-ratio` kullanılmaz; kart yüksekliğini doldurur,
  sağ kenarında ince çizgi taşır. Gövde dikey ortalanır, footer boşluk bırakmaz.
- 768+'ta editorial fotoğrafın insetleri `-6% 3% -6% -7%` ve
  `object-position: left center` olur; mobilde fotoğraf yatayda ortalanır.
- Feature fotoğrafı geniş görsel alanında `left: 50%` +
  `translateX(-50%)` ile optik olarak ortalanır; doğal genişliği korunur.
- Standart ve feature kartlarda `grid-template-rows: auto minmax(0, 1fr)`
  açıkça tanımlanır; `aspect-ratio`'nun satır yüksekliğinden genişlik türetmesi
  engellenir.
- Filtrelenmiş görünümde tüm varyantlar tek tipe döner: 1 sütun kaplar,
  dikey düzen ve 4:3 görsel kullanır; fotoğraf insetleri `-8% -3%` ve yatayda
  ortalanır. 1360+'ta grid 4 değil 3 sütundur.

### 6.6 Telefon / CTA bandı

- Çift altın çerçeve (dış 1px güçlü çizgi, iç 7px inset ince çizgi); sıcak
  siyah gradient; 3px radius; dört köşede Art Deco işaret.
- Telefon numarası büyük serif; `tel:03122602555`; CTA en az 74px yüksekliğinde.
- Hover'da yüzey altına döner, metin koyu mürekkep olur; mobilde tam genişlik.
- Çalışma saati, kampanya veya teslimat iddiası yazılmaz (doğrulanmamış).

### 6.7 Görsel fallback

Ürün fotoğrafı yüklenemezse:

- Yanlış yemek görseli, stok fotoğraf veya eski SVG yemek çizimi gösterilmez.
- Görsel alanında nötr marka yer tutucusu görünür: ince altın eşkenar dörtgen
  halka + "AsChef'in Konak" etiketi. Yer tutucu `aria-hidden`'dır; ürün adı,
  açıklaması ve fiyatı metin olarak okunmaya devam eder.
- Fallback yalnızca `<img onError>` tetiklendiğinde devreye girer; normal
  koşulda yedi gerçek PNG kullanılır.

### 6.8 Art Deco çerçeve ve süsleme sistemi

- **Çift katman:** Dış çerçeve 1px `--color-frame`; iç çerçeve 5–7px inset,
  1px `--color-frame-faint` / `--color-frame-soft`. Kalınlık asla 1px'i geçmez.
- **Sahne (menü):** Dört kenarda 1px ray; üç duraklı altın gradient
  (`rgba(210,172,102,.38) → .14 → .38`). Raylar görünür olduğunda sırayla
  çizilir: üst 60ms, sağ 200ms, alt 340ms, sol 480ms; süre 880ms.
  İç çerçeve 700ms'de belirir, üst ortadaki elmas 720ms'de açılır.
- **Köşe işaretleri:** Kartlarda yalnızca iki köşe (sağ üst + sol alt), 23px,
  opacity .56. Sahne ve iletişim kartında dört köşe, 26–38px, opacity .72.
  Hero görselinde iki köşe (sol üst + sağ alt), 26px, opacity .8.
- **Amblem:** Bölüm başlığında geometrik, kanatlı elmas amblem; genişlik
  `clamp(142px, 21vw, 180px)`. Kanatlar .52, çekirdek .92 opacity.
- **Ayraçlar:** 1px çizgi + ortada küçük elmas; hero .78, iletişim .68.
- **Fiyat plakası:** 1px dış çerçeve + 3px inset ikinci çizgi + üst ortada
  elmas; yalnızca gerçek fiyatlı ürünlerde.
- **Sınırlama:** Altın çizgi normalde .42'yi, güçlü durumda .5'i geçmez.
  Yemeğin veya metnin önüne geçen dolgu, ağır süsleme, parlayan gradient
  yoktur. Tüm dekoratif katmanlar `pointer-events: none` ve `aria-hidden`.
  Çerçeve çizgileri odak halkasıyla karışmaz; odak her zaman en üsttedir.

---

## 7. Hareket

### 7.1 Tokenlar

| Token | Değer | Kullanım |
|---|---|---|
| `--ease-out` | `cubic-bezier(.22, 1, .36, 1)` | Hover / küçük geçişler |
| `--ease-entrance` | `cubic-bezier(.16, 1, .3, 1)` | Giriş ve sahne çizimi |
| `--ease-exit` | `cubic-bezier(.4, 0, 1, 1)` | Kategori çıkışı |
| `--duration-fast` | `160ms` | Hover, focus, renk |
| `--duration-base` | `240ms` | Kenarlık / gölge |
| `--duration-slow` | `560ms` | Yumuşak vurgular |
| `--duration-reveal` | `720ms` | İletişim bloğu |
| `--duration-frame` | `880ms` | Sahne rayları |
| `--stagger-card` | `55ms` | Kart sıralaması |

Tüm hareket `transform` ve `opacity` üzerinden çalışır. `width`, `height`,
`top`, `left` animasyonu yoktur; layout kayması oluşmaz.

### 7.2 Hero açılışı (tek seferlik koreografi)

| Öğe | Hareket | Süre / gecikme |
|---|---|---|
| Eyebrow | fade + 15px yukarı | 700ms / 100ms |
| Başlık 1. satır | maskeden yukarı (translateY %114 → 0) | 900ms / 180ms |
| Başlık 2. satır | maskeden yukarı | 900ms / 320ms |
| Açıklama | fade + 15px yukarı | 760ms / 520ms |
| CTA grubu | fade + 15px yukarı | 760ms / 640ms |
| Hero fact satırı (768+) | fade + 15px yukarı | 760ms / 760ms |
| Görsel çerçevesi | fade + 18px yukarı + .992 ölçek | 980ms / 260ms |
| Görsel (Soslu Döner PNG) | 1.1 → 1.02 yavaş zoom-out | 1500ms / 160ms |
| Görsel köşe işaretleri | fade | 620ms / 950ms |

Hero animasyonları sayfa yüklenirken bir kez çalışır; scroll ile tekrar
tetiklenmez. Kullanıcı sayfaya menüden girerse içerik zaten görünür durumdadır.
Hero görseli `soslu-doner.png` dosyasıdır ve `fetchPriority="high"` taşır.

### 7.3 Scroll ile sahne çizimi

- Menü sahnesi `IntersectionObserver` ile eşik `0.01`, alt `rootMargin: -10%`
  olduğunda `is-revealed` alır.
- Raylar 880ms'de sırayla çizilir (üst 60, sağ 200, alt 340, sol 480ms).
- İç çerçeve 700ms gecikmeyle 900ms'lik fade ile belirir; elmas 720ms'de açılır.
- Köşe işaretleri 680 / 790 / 900 / 1010ms sırasıyla belirir.
- Bölüm amblemi 620, etiket 700, H2 780, açıklama 860ms gecikmeyle
  yukarıdan 14px gelir.
- İletişim bloğu eşik `0.12`, alt `rootMargin: -6%`; 720ms fade + 24px
  yukarı hareket eder, köşe işaretleri 420ms gecikmeyle belirir.

### 7.4 Ürün fotoğrafı ve kart girişi

Her kart kendi `IntersectionObserver`'ına sahiptir: eşik **0.12**, alt
`rootMargin: -4%`, `once: true`. Görünür olduğunda observer bağlantıyı keser;
kart bir kez yerleşir, scroll ile geri dönüşte yeniden oynamaz. Scroll-jacking
yoktur; sayfa normal hızda kaydırılır.

| Katman | Hareket | Süre / gecikme |
|---|---|---|
| Kart | opacity 0 → 1; `--card-index × 55ms` stagger | 640ms |
| Kart iç düzeni | 18px aşağıdan yerine; aynı stagger | 780ms |
| Fotoğraf | opacity 0 → 1 | 760ms / `70ms + index × 62ms` |
| Fotoğraf | scale .88 → 1, yön vektörü → 0, rotate → 0 | 980ms / aynı gecikme |
| Köşe işaretleri | opacity 0 → .56 | 480ms / 300ms |
| Hover (yalnızca masaüstü) | fotoğraf scale 1.035 | 240ms |

**Ürün bazlı giriş yönleri:**

| Ürün | `data-reveal` | Başlangıç |
|---|---|---|
| Soslu Döner | `up` | 24–42px aşağıdan, +1.2° |
| Ekmek Arası Döner | `left` | 18–40px soldan, −2.2° |
| Zurna Döner | `right` | 18–40px sağdan, +2.2° |
| Ekmek Arası Köfte | `up` | 24–42px aşağıdan, +1.2° |
| Hamburger | `right` | 18–40px sağdan, +2.2° |
| Cheeseburger | `left` | 18–40px soldan, −2.2° |
| Chickenburger | `up` | 24–42px aşağıdan, +1.2° |

- Yatay kayma `clamp(18px, 2.6vw, 40px)`, dikey kayma
  `clamp(24px, 3.6vw, 42px)` aralığındadır. Her ürünün gecikmesi kart
  sırasına göre 62ms artar; böylece yedi fotoğraf tek blok halinde değil,
  sırayla sahneye girer.
- Feature fotoğrafı `translate3d(-50%, …)` tabanlı ortalamayı korur; editorial
  fotoğrafı `translate3d(…, -50%, …)` ile dikeyde ortalanır. Final durumda
  feature `translate3d(-50%, 0, 0)`, editorial `translate3d(0, -50%, 0)`
  döner açısı sıfır ve ölçek 1'dir.
- Fotoğraf ve kart ayrı ayrı sıçramaz; tek bir kart hareketi olarak algılanır.
- `IntersectionObserver` desteklenmiyorsa kartlar doğrudan görünür duruma
  gelir; içerik hiçbir koşulda kalıcı olarak gizli kalmaz. Azaltılmış harekette
  aynı güvence CSS ile sağlanır.

### 7.5 Kategori geçişi

1. Aktif kategori değişir; mevcut grid 220ms'de opacity 0'a ve `-6px` yukarı
   hareket eder (`--ease-exit`), `pointer-events: none` olur.
2. Süre bitince görünen kategori güncellenir, `transitionKey` artar ve yeni
   grid sıfırdan stagger ile açılır. Çıkış durumu, görünen içerik henüz
   değişmemişken `activeCategory !== displayCategory` üzerinden türetilir;
   ayrı bir kilit state'i tutulmaz.
3. Geçiş sırasında grid `aria-busy="true"` taşır; sonuç sayacı `aria-live`
   ile yeni sayıyı duyurur.
4. Hızlı ardışık tıklamalarda önceki zamanlayıcı temizlenir; eski çıkış sınıfı
   kilitli kalmaz. Bileşen kaldırılırsa timer iptal edilir.
5. `prefers-reduced-motion` açıksa çıkış animasyonu atlanır; gecikme 0ms olur
   ve kategori anında değişir.

### 7.6 Azaltılmış hareket

`prefers-reduced-motion: reduce` durumunda global kural tüm animasyon ve
geçişleri 0.01ms'e indirir; ek olarak hero, sahne, kart, çerçeve ve iletişim
bloğu için tüm aşamalı öğeler `opacity: 1` ve hareketsiz bırakılır. Ürün
fotoğrafları görünür kalır; feature ve editorial kartlarda yalnızca optik
ortalamayı sağlayan `translate3d(-50%, 0, 0)` / `translate3d(0, -50%, 0)`
dönüşümü korunur. Dekoratif çizgiler statik görünür. Kategori değişimi
beklemesizdir.

Sonsuz dönen dekoratif animasyon, parallax, scroll-jacking ve içerik gizleyen
giriş efekti yoktur.

---

## 8. Erişilebilirlik

- İlk sekme durağı "Menüye geç" skip link'idir; görünür altın zemin ve koyu
  metinle klavye odağına açılır, hedef `#menu`'dür.
- Tüm etkileşimli öğeler ≥ 44 × 44px ve görünür focus halkasına sahiptir;
  sticky header odaklanan öğeyi örtmez (`scroll-padding-top` tanımlıdır).
- Semantik sıra: header → ana içerik → menü → iletişim → footer.
- Tek H1; bölümlerde H2; ürünlerde H3.
- Arama sonucu sayacı `aria-live="polite"` ve `aria-atomic="true"` taşır; boş
  durum metni de bu tek canlı bölgede duyurulur (çift duyuru yoktur).
- Kategori seçimi `aria-pressed` ile bildirilir; geçiş sırasında grid
  `aria-busy="true"` taşır.
- Dekoratif SVG, çerçeve çizgileri, amblem ve ikonlar `aria-hidden="true"`.
- Her ürün fotoğrafının açıklayıcı `alt` metni vardır. Görsel yalnızca
  destekleyicidir; ürün adı, açıklaması ve fiyatı metinle verilir.
- Renk tek başına anlam taşımaz.
- `prefers-reduced-motion` desteklenir; animasyonlar bilgiyi geciktirmez,
  kartlar AT için her zaman DOM'da ve erişilebilirdir.
- Metin yakınlaştırmasında kart yüksekliği içeriğe göre büyür; sabit yükseklik yoktur.
- Klavye ile arama temizleme, kategori seçimi ve tüm CTA'lar kullanılabilir.

---

## 9. İçerik ve Güvenlik

- Telefon: **0312 260 25 55** → `tel:03122602555`.
- Menüde yedi ürün vardır. Fiyatlar yalnızca `src/data/prices.ts` içindeki
  doğrulanmış değerlerdir:
  - Ekmek Arası Döner: 100 gr **180 TL** / 120 gr **210 TL**
  - Zurna Döner: 100 gr **200 TL** / 120 gr **230 TL**
  - Ekmek Arası Köfte: **250 TL**
  - Hamburger: **250 TL**
  - Cheeseburger: **270 TL**
  - Chickenburger: **200 TL**
  - Soslu Döner: fiyat verilmedi; kartta "Fiyat bilgisi için arayın"
    bağlantısı kullanılır. Fiyat uydurulmaz.
- Düz "Köfte" ürünü menüden tamamen kaldırılmıştır; yalnızca
  "Ekmek Arası Köfte" bulunur. Ürün sayısı 7'dir.
- Çalışma saati, kampanya veya teslimat iddiası yazılmaz (doğrulanmamış).
- API anahtarı, `.env` değeri veya gizli bilgi frontend kaynağına yazılmaz.
- Dış görsel URL'sine bağımlılık yoktur; tüm varlıklar `public/` altındadır.
  Tek dış kaynak Google Fonts CSS/woff2 dosyalarıdır.
- Referans video `design-references/menu-motion-reference.mp4` teslim
  edilmedi; yalnızca yazılı brifteki çerçeve ve hareket ilkeleri uygulandı.
  Jack Daniel's marka öğeleri, sarı zemin, ürün veya metinleri kullanılmadı.
- Yedi ürün fotoğrafı teslim edilen `aschefin-menu-urun-gorselleri.zip`
  arşivinden doğrulandı; dosyalar `public/images/products/` altındadır ve
  SHA-256 eşleşmeleri birebirdir. Yanlış veya yinelenen görsel yoktur.
- Fotoğraflar şeffaf PNG'dir; karakteristik boyutları:
  `soslu-doner` 469 × 363, `ekmek-arasi-doner` 424 × 325,
  `zurna-doner` 431 × 397, `ekmek-arasi-kofte` 451 × 353,
  `hamburger` 411 × 362, `cheeseburger` 429 × 365,
  `chickenburger` 450 × 358. Kenarlardaki küçük garnitür parçaları tedarik
  edilen dosyanın parçasıdır; kırpılmamış veya maskelenmemiştir.
- İki gerçek logo dosyası yeniden renklendirilmeden, oranları korunarak
  kullanılır: `aschefin-amblem-seffaf.png` (222 × 195) ve
  `aschefin-yazi-logosu-seffaf.png` (523 × 201).
- Yeni bağımlılık eklenmez; React + Vite + TypeScript korunur.

---

## 10. Responsive Kontrol Listesi ve Doğrulama

**Son doğrulama:** 13 Kasım 2026 — üretim build'i (`npm run preview`),
Playwright, 360 / 390 / 768 / 1440 px.

### Düzen ve taşma

| Genişlik | `scrollWidth` / `clientWidth` | `scrollHeight` | Görünen ve yüklenen kart | Yatay taşma |
|---|---:|---:|---:|---|
| 360px | 345 / 345 | 5060 | 7 / 7 | Yok |
| 390px | 375 / 375 | 5156 | 7 / 7 | Yok |
| 768px | 753 / 753 | 4159 | 7 / 7 | Yok |
| 1440px | 1425 / 1425 | 3564 | 7 / 7 | Yok |

- [x] 360px: tek sütun; hero CTA'ları alt alta 166px ve hizalı; logo lockup
  taşmıyor; telefon bağlantısı erişilebilir; yatay taşma yok.
- [x] 390px: hero CTA'ları yan yana 166px; skip link 115 × 49px; iletişim ve
  footer düzeni tam; `scrollWidth` 375 < 390.
- [x] 768px: 2 sütun × 308.76px, gap 16px; hero split; feature 16:9;
  CTA'lar alt alta 166px hizalı; `scrollWidth` 753 < 768.
- [x] 1440px: 4 sütunlu tam menü; tüm kartlar ölçüldü, DOM ve görsel sıra
  uyumlu; `scrollWidth` 1425 < 1440; içerik 1280px.
- [x] 1440px filtre: 3 kart × 377px, tek satır, tümü span 1; 1360+ kuralı
  4 sütuna dönmüyor.
- [x] Hiçbir test genişliğinde `documentElement.scrollWidth > clientWidth`
  görülmedi; `min-width: 0` ve açık grid satırları korunuyor.
- [x] Sayfa yatayda taşan görünür öğe taraması 390px'te boş döndü.

### Ürünler, fiyatlar ve görseller

- [x] Yedi ürün doğru sırada: Soslu Döner, Ekmek Arası Döner, Zurna Döner,
  Ekmek Arası Köfte, Hamburger, Cheeseburger, Chickenburger.
- [x] Düz "Köfte" başlığı DOM'da yok; yalnızca "Ekmek Arası Köfte" var.
- [x] Fiyatlar: Ekmek Arası Döner 180 / 210 TL, Zurna Döner 200 / 230 TL,
  Ekmek Arası Köfte 250 TL, Hamburger 250 TL, Cheeseburger 270 TL,
  Chickenburger 200 TL. Soslu Döner'de fiyat yok; telefon bağlantısı var.
- [x] Telefonun tüm bağlantıları `tel:03122602555`; görünen numara
  `0312 260 25 55`.
- [x] Yedi ürün fotoğrafı da yüklendi (`naturalWidth > 0`), `object-fit:
  contain`, reveal sonrası opacity 1; siyah kutu, kırpma veya esneme yok.
- [x] Hero görseli ve iki logo dosyası yüklendi. Görsel yolları yerel ve
  doğru ürünlerle eşleşiyor.
- [x] Yalnızca iki döner ürününde çoklu gramaj plakası var; tek fiyatlı
  ürünlerde tek satırlı plaka, Soslu Döner'de arama bağlantısı kullanılıyor.

### Hareket ve etkileşim

- [x] Scroll reveal: hero, sahne rayları, bölüm başlığı, yedi ürün kartı ve
  iletişim bloğu eşiklerinde bir kez açılıyor; geri scroll'da tekrar
  oynamıyor.
- [x] Fotoğraf yönleri: Soslu/Köfte/Chickenburger aşağıdan, Ekmek Arası
  Döner/Cheeseburger soldan, Zurna/Hamburger sağdan; her ürünün gecikmesi
  sırayla artıyor.
- [x] Final transform'lar: feature fotoğrafları `translate3d(-50%, 0, 0)`,
  editorial fotoğrafı `translate3d(0, -50%, 0)`, standart kartlarda kimlik
  matrisi; tüm fotoğraflarda ölçek 1, dönüş 0°.
- [x] Kategori geçişi: eski grid 220ms çıkış → yeni grid stagger giriş;
  `aria-busy`, sonuç sayacı ve `transitionKey` doğru çalışıyor. 30ms'de
  `aria-busy=true` ve çıkış sınıfı, 350ms'de yeni grid gözlendi.
- [x] Hızlı ardışık kategori tıklamalarında eski timer temizleniyor; çıkış
  sınıfı kilitli kalmıyor.
- [x] "Köfte" filtresi 1 kart (Ekmek Arası Köfte, 250 TL), "Burger" filtresi
  3 kart (250 / 270 / 200 TL), "Döner" filtresi 3 kart gösteriyor; "Tümü"
  7 karta dönüyor. Boş arama durumu ayrı ve erişilebilir.
- [x] `prefers-reduced-motion: reduce` (390px): kartlar opacity 1 ve yatay/
  dikey ortalamayı koruyan transform'la görünür; geçiş süresi 0.00001s;
  kategori tıklaması beklemesiz uygulanır. Animasyon yok.
- [x] Klavye: ilk Tab skip link'i açıyor; hero telefon, sekmeler, arama ve
  kart bağlantılarında altın focus halkası görünüyor.
- [x] Dekoratif çerçeveler ve amblem `aria-hidden`; odak halkasını örtmüyor.

### Konsol ve ağ

- [x] Konsol: 0 hata, 0 uyarı (1440px ve 390px son turlarında).
- [x] Yerel görseller 200/304; dış istek yalnızca Google Fonts CSS/woff2.
- [x] Hero dışındaki ürün fotoğrafları `loading="lazy"` ile yükleniyor;
  görünür olduklarında eksiksiz boyanıyor.

### Build ve lint

- [x] `npm run build`: başarılı. `dist/index.html` 1.00 kB (gzip 0.53 kB);
  CSS 42.68 kB (gzip 8.58 kB); JS 238.23 kB (gzip 73.33 kB); 25 modül,
  144ms.
- [x] `npm run lint`: 0 hata, 0 uyarı. `.claude/**` yerel skill betikleri
  lint kapsamı dışında tutulur; uygulama kodunda uyarı yoktur.
- [x] Ekran görüntüleri depo kökünde `round1-*` ve `round2-*` adlarıyla
  kaydedildi; `.playwright-mcp/` yalnızca oturum/artefakt dosyalarını tutar.

### Bilinen eksikler

- `design-references/menu-motion-reference.mp4` teslim edilmedi; yazılı
  brifteki ilkeler uygulandı.
- Tedarik edilen ürün PNG'lerinde kenarlarda küçük garnitür yaprakları vardır;
  bunlar dosyaların parçası olduğu için kırpılmadı veya maskelenmedi.
- Gelecekte yeni bir ürün eklenirse `src/data/menu.ts` içindeki görsel,
  düzen ve giriş yönü alanları doldurulur; fiyat `src/data/prices.ts`'e
  eklenir. Bileşenlere sabit fiyat yazılmaz.
