# AsChef'in Konak — Master Design System

**Sürüm:** 3.0<br />
**Son güncelleme:** 18 Kasım 2026<br />
**Kapsam:** Dijital menü — 25 ürün, 9 kategori (mobil öncelikli, QR ile açılan web deneyimi)<br />
**Kaynak:** UI UX Pro Max aramaları + frontend-design değerlendirmesi + mevcut marka varlıkları + 18 yeni ürün entegrasyonu

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
3. **Fotoğraf doğru olmalı.** Her ürün yalnızca kendi şeffaf görseliyle temsil
   edilir. Yeni 18 üründe AVIF birincil, WebP ikincil, PNG son yedektir; eski
   yedi ürün PNG ile sunulur. Başka bir yemeğin fotoğrafı, stok görsel veya
   yanlış eşleşme kullanılmaz. Modern biçim yüklenemezse PNG'ye, PNG de
   yüklenemezse nötr marka yer tutucusuna geçilir.
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
| 320px | Tek sütun dikey ürün kartları; logo + ikon telefon; 9 kategorili yatay kaydırmalı şerit; hero CTA'ları alt alta; hero görseli tam genişlik |
| 390px | Aynı tek sütun; hero CTA'ları yan yana (en az 166px); kategori şeridi kaydırmalı; hero görseli tam genişlik |
| 768px | 2 sütun ürün; hero split; header 80px; kategori sekmeleri sarar; arama 276px sağa hizalı; feature 16:9 tam genişlik; editorial iç düzeni yatay |
| 1024px | 3 sütun ürün; desktop gutter; kategori sekmeleri tek blokta sarar; arama 300px; CTA'lar yan yana |
| 1440px | 4 sütun ürün; 1280px içerik; header 88px; geniş negatif alan |

768 ve üzerinde `dense` yerleşim, farklı yükseklikteki feature/editorial
kartların oluşturduğu boşlukları kapatır. Kartlar birbirinden bağımsız menü
öğeleridir; filtrelenmiş görünümde `row` akışına dönülerek sıra korunur.

`dense` akışı DOM sırasını değiştirmez, ancak görsel yerleşimde sonraki
kartları açılan boşluklara çekebilir. 1440px'te ilk görsel satır örneğin
Soslu Döner, Hatay Dürüm ve Zurna Döner olarak oluşur; DOM ve erişilebilirlik
sırası ise Soslu Döner, Hatay Dürüm, Ekmek Arası Döner, Zurna Döner'dir.
Bu, editoryal ritim için bilinçli olarak kabul edilen bir görsel sıra
farkıdır; klavye ve ekran okuyucu sırası DOM sırasıdır.

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

- Dokuz sekme: Tümü, Döner, Köfte, Burger, Izgara, Kilo ile Lezzet, Kahvaltı,
  Çorba & Pilav, İçecekler. Her sekme en az 44 × 44px'dir.
- Varsayılan: şeffaf, `--color-text-muted`, 1px şeffaf kenarlık.
- Aktif: `--color-accent-strong` metin, `rgba(210,172,102,.1)` zemin,
  `--color-line` kenarlık ve 2px altın iç alt çizgi (`inset 0 -2px 0`);
  `aria-pressed="true"`. Alt çizgiye ek elmas işaret kullanılmaz.
- 768 altında sekmeler tek satırlı yatay kaydırma şerididir: `min-width: 84px`,
  `scroll-snap-type: inline proximity`, ince altın scrollbar ve dokunmatik
  `-webkit-overflow-scrolling: touch`. Şeridin iki kenarında 22px'lik koyu
  degrade okunabilirlik perdesi bulunur; perde `pointer-events: none` ve
  dekoratiftir. Seçilen sekme kırpılıyorsa şerit onu yumuşakça ortalar;
  `prefers-reduced-motion` açıksa bu kaydırma animasyonsuz yapılır.
- 768 ve üzerinde sekmeler sarar (`flex-wrap: wrap`), yatay kaydırma ve
  kenar perdeleri kapanır; scrollbar gizlenir. 768+'ta min 84px, 1024+'ta
  min 92px. Etiket taşmaz, 12px'in altına inmez.
- Odak halkası her durumda görünür.

### 6.4 Arama

- Yükseklik 48px; 1px kenarlık; 2px radius.
- Mobilde tam genişlik; 768+'ta 276px ve sağa hizalı; 1024+'ta 300px.
  Kolon yönlü `.menu-toolbar` içinde `flex-basis` kullanılmaz; aksi hâlde
  değer yükseklik olarak yorumlanır ve alan dikeyde şişer.
- Sol ikon 18px; placeholder `--stone-500` üzeri.
- `focus-within`: altın kenarlık + 3px yumuşak halka.
- Temizleme düğmesi 44 × 44px, yalnızca metin varken görünür.
- `aria-label` ve `aria-live` sonuç sayısı.
- Regresyon kontrolü: arama alanı yüksekliği her viewport'ta 36–64px
  aralığında kalmalıdır.

### 6.5 Ürün kartı

#### Ortak yapı

- Zemin: `linear-gradient(150deg, --obsidian-800, #0A0806 80%)`; 1px
  `--color-line`; radius 3px; boşta gölge yok.
- Kartın içinde 5px inset `--color-frame-faint` ikinci çizgi; sağ üst ve sol
  alt köşede 23px Art Deco köşe işareti (opacity .56) bulunur.
- Görsel alanı: sıcak radial zemin ve ince altın elips. 25 ürünün tamamında
  gerçek, şeffaf arka planlı görsel kullanılır; `object-fit: contain` ve
  orijinal en-boy oranı korunur. Fotoğraf kırpılmaz, esnetilmez, siyah kutu
  içinde gösterilmez. Yeni 18 görsel 1200 × 800 RGBA'dır; eski yedi görsel
  1536 × 1024 RGBA olarak değiştirilmeden korunur.
- Fotoğraf `overflow: visible` görsel alanında negatif insetlerle
  (`--photo-inset`) çerçevenin üzerine taşar. Böylece ürün, kartın içine
  hapsedilmiş bir küçük resim değil, sahnenin önünde duran katmanlı bir yemek
  gibi okunur. Fotoğrafın altında yumuşak `drop-shadow` vardır.
- Fotoğraf boyutları veri dosyasındaki gerçek piksel değerleriyle (`width` /
  `height`) verilir; `loading="lazy"`, `decoding="async"`, `draggable={false}`.
  Yeni ürünlerde `<picture>` sırası AVIF → WebP → PNG'dir; eski yedi üründe
  yalnızca PNG `<img>` bulunur. Hero görseli `fetchPriority="high"` ile yüklenir.
- Kategori rozeti görselin sol üstünde; sağ altta 14px çizgi köşesi.
- Başlık Cormorant Garamond; açıklama 0.95–0.97rem, 1.55 satır yüksekliği,
  `--color-text-muted`; başlık altında 30px altın mikro çizgi (feature'da 56px).
  Açıklama yalnızca veri varsa render edilir. 25 üründen 9'unda açıklama
  vardır; kalan 16 üründe paragraf DOM'a basılmaz, boş açıklama alanı veya
  boşluk bırakılmaz.
- Fiyat satırları yalnızca gerçek fiyatı olan ürünlerde, çift çizgili fiyat
  plakası içinde: etiket sol, noktalı ayraç, tutar sağ; tabular-nums.
  Plakanın üst ortasında 7px elmas işareti vardır. İki döner ürününde gramaj
  başına iki fiyat satırı bulunur.
- Sınırsız Çay'da ayrı "Ücretsiz" durumu kullanılır: plaka `Sınırsız` etiketi
  ve büyük harfli `Ücretsiz` değeri gösterir; TL simgesi veya tutar yazılmaz.
  `aria-label` "Sınırsız Çay: ücretsiz" olarak verilir.
- Fiyat yoksa: "Fiyat bilgisi için arayın" bağlantısı; uydurma fiyat yoktur.
  Bu durum yalnızca Soslu Döner'de geçerlidir.
- Kartın tamamı tıklanabilir değildir; yalnızca gerçek bağlantılar tıklanır.
- Hover yalnızca `(hover: hover) and (pointer: fine)` altında: 1px güçlü
  kenarlık, sınırlı sıcak gölge, iç çerçeve belirginleşmesi ve görselde 1.035
  ölçek. Mobilde hover'a bağlı bilgi yoktur.

#### Varyantlar

| Varyant | Adet | Mobil (<768) | 768–1023 | 1024–1359 | 1360+ |
|---|---:|---|---|---|---|
| Standart | 18 | Dikey; görsel 4:3 | 2 sütunda 1 sütun; görsel 4:3; başlık 1.65rem | 3 sütunda 1 sütun; başlık 1.7rem | 4 sütunda 1 sütun; başlık 1.72rem |
| Feature | 4 | Dikey; görsel 5:4 | 2 sütun; görsel 16:9; başlık 2.15rem | 2 sütun; başlık 2.3rem | 2 sütun; görsel 16:9; başlık 2.4rem |
| Editorial | 3 | Dikey; görsel 4:3 | 2 sütun; 0.6fr görsel / 0.4fr metin, dikey ortalanmış; başlık 1.85rem | 2 sütun; başlık 1.95rem | 2 sütun; başlık 2rem |

- **Feature (4):** Soslu Döner, 4 Dürüm Kampanyası, Hamburger, Kahvaltı Tabağı.
- **Editorial (3):** Ekmek Arası Döner, Izgara Tavuk Pirzola, 1 KG Tavuk Döner.
- **Standart (18):** Hatay Dürüm, Zurna Döner, Ekmek Arası Köfte, Cheeseburger,
  Chickenburger, Izgara Köfte, Izgara Tavuk Kulbaştı, 1 KG Köfte, Çorba,
  Pilav, Büyük Ayran, Küçük Ayran, Pepsi, 7UP, Yedigün, Doğanay Şalgam, Su,
  Sınırsız Çay.

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

### 6.7 Görsel formatı ve fallback

Yeni ürünlerde kaynak seçimi tarayıcıya bırakılır:

1. `<source type="image/avif">` — birincil.
2. `<source type="image/webp">` — AVIF desteklenmiyorsa.
3. `<img src="...png">` — son yedek.

Çalışma zamanı hataları:

- AVIF/WebP kaynağı seçildikten sonra ağ hatası oluşursa `onError` bir kez
  tetiklenir; modern `<source>` öğeleri kaldırılır ve PNG yeni bir `key` ile
  yeniden bağlanır. Böylece tarayıcı önbelleğindeki başarısız modern kayıt
  yeniden denenmez.
- PNG de yüklenemezse görsel alanında nötr marka yer tutucusu görünür: ince
  altın eşkenar dörtgen halka + "AsChef'in Konak" etiketi. Yer tutucu
  `aria-hidden`'dır; ürün adı, açıklaması ve fiyatı metin olarak okunmaya
  devam eder.
- Yanlış yemek görseli, stok fotoğraf veya eski SVG yemek çizimi gösterilmez.
- Eski yedi ürün PNG-only olduğu için doğrudan PNG yükler; hata durumunda
  aynı marka yer tutucusuna geçer. Normal koşulda 25 gerçek görsel kullanılır.

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
Hero görseli `soslu-tavuk-doner.png` dosyasıdır ve `fetchPriority="high"`
taşır.

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
| Hatay Dürüm | `left` | 18–40px soldan, −2.2° |
| Ekmek Arası Döner | `left` | 18–40px soldan, −2.2° |
| Zurna Döner | `right` | 18–40px sağdan, +2.2° |
| 4 Dürüm Kampanyası | `right` | 18–40px sağdan, +2.2° |
| Ekmek Arası Köfte | `up` | 24–42px aşağıdan, +1.2° |
| Hamburger | `right` | 18–40px sağdan, +2.2° |
| Cheeseburger | `left` | 18–40px soldan, −2.2° |
| Chickenburger | `up` | 24–42px aşağıdan, +1.2° |
| Izgara Tavuk Pirzola | `left` | 18–40px soldan, −2.2° |
| Izgara Köfte | `right` | 18–40px sağdan, +2.2° |
| Izgara Tavuk Kulbaştı | `up` | 24–42px aşağıdan, +1.2° |
| 1 KG Tavuk Döner | `left` | 18–40px soldan, −2.2° |
| 1 KG Köfte | `right` | 18–40px sağdan, +2.2° |
| Kahvaltı Tabağı | `up` | 24–42px aşağıdan, +1.2° |
| Çorba | `left` | 18–40px soldan, −2.2° |
| Pilav | `right` | 18–40px sağdan, +2.2° |
| Büyük Ayran | `up` | 24–42px aşağıdan, +1.2° |
| Küçük Ayran | `left` | 18–40px soldan, −2.2° |
| Pepsi | `right` | 18–40px sağdan, +2.2° |
| 7UP | `up` | 24–42px aşağıdan, +1.2° |
| Yedigün | `left` | 18–40px soldan, −2.2° |
| Doğanay Şalgam | `right` | 18–40px sağdan, +2.2° |
| Su | `up` | 24–42px aşağıdan, +1.2° |
| Sınırsız Çay | `left` | 18–40px soldan, −2.2° |

Dağılım: 8 `up`, 9 `left`, 8 `right`.

- Yatay kayma `clamp(18px, 2.6vw, 40px)`, dikey kayma
  `clamp(24px, 3.6vw, 42px)` aralığındadır. Her ürünün gecikmesi kart
  sırasına göre 62ms artar; böylece 25 fotoğraf tek blok halinde değil,
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
  `aria-busy="true"` taşır. Dokuz kategori sekmesi klavye ile sırayla
  gezilebilir; mobil yatay şerit `role="group"` ve `aria-label="Menü
  kategorileri"` taşır, kenar perdeleri dekoratiftir.
- Dekoratif SVG, çerçeve çizgileri, amblem ve ikonlar `aria-hidden="true"`.
- Her ürün fotoğrafının açıklayıcı `alt` metni vardır. Görsel yalnızca
  destekleyicidir; ürün adı, açıklaması ve fiyatı metinle verilir.
- Açıklaması olmayan 16 üründe açıklama paragrafı hiç render edilmez; ekran
  okuyucuya boş açıklama duyurulmaz.
- Sınırsız Çay'ın fiyat grubu `aria-label="Sınırsız Çay: ücretsiz"` taşır;
  görsel "Sınırsız / Ücretsiz" metni TL simgesi olmadan okunur.
- Görsel yüklenemezse dekoratif yer tutucu `aria-hidden` kalır; ürünün adı,
  varsa açıklaması ve fiyatı erişilebilir metin olarak korunur.
- Renk tek başına anlam taşımaz.
- `prefers-reduced-motion` desteklenir; animasyonlar bilgiyi geciktirmez,
  kartlar AT için her zaman DOM'da ve erişilebilirdir.
- Metin yakınlaştırmasında kart yüksekliği içeriğe göre büyür; sabit yükseklik yoktur.
- Klavye ile arama temizleme, kategori seçimi ve tüm CTA'lar kullanılabilir.

---

## 9. İçerik ve Güvenlik

- Telefon: **0312 260 25 55** → `tel:03122602555`.
- Menüde **25 ürün** ve **9 kategori** vardır. Kategori dağılımı:
  Döner 5, Köfte 1, Burger 3, Izgara 3, Kilo ile Lezzet 2, Kahvaltı 1,
  Çorba & Pilav 2, İçecekler 8.
- Fiyatlar yalnızca `src/data/prices.ts` içindeki doğrulanmış değerlerdir:
  - Ekmek Arası Döner: 100 gr **170 TL** / 120 gr **200 TL**
  - Zurna Döner: 120 gr **200 TL** / 140 gr **230 TL**
  - Ekmek Arası Köfte: **250 TL**
  - Hamburger: **250 TL**
  - Cheeseburger: **270 TL**
  - Chickenburger: **200 TL**
  - Hatay Dürüm: **170 TL**
  - 4 Dürüm Kampanyası: **600 TL**
  - Izgara Tavuk Pirzola: **280 TL**
  - Izgara Köfte: **280 TL**
  - Izgara Tavuk Kulbaştı: **250 TL**
  - 1 KG Tavuk Döner: **800 TL**
  - 1 KG Köfte: **900 TL**
  - Kahvaltı Tabağı: **150 TL**
  - Çorba: **70 TL**
  - Pilav: **50 TL**
  - Büyük Ayran: **60 TL**
  - Küçük Ayran: **40 TL**
  - Pepsi: **60 TL**
  - 7UP: **60 TL**
  - Yedigün: **60 TL**
  - Doğanay Şalgam: **60 TL**
  - Su: **20 TL**
  - Sınırsız Çay: **Ücretsiz**
  - Soslu Döner: fiyat verilmedi; kartta "Fiyat bilgisi için arayın"
    bağlantısı kullanılır. Fiyat uydurulmaz.
- 9 üründe açıklama vardır: eski yedi ürünün tamamı, Hatay Dürüm ve
  Doğanay Şalgam. Diğer 16 üründe açıklama alanı hiç render edilmez.
- Düz "Köfte" başlığı kullanılmaz; ürünler "Ekmek Arası Köfte", "Izgara
  Köfte" ve "1 KG Köfte" olarak ayrıştırılmıştır. Ürün sayısı 25'tir.
- Çalışma saati, kampanya veya teslimat iddiası yazılmaz (doğrulanmamış).
- API anahtarı, `.env` değeri veya gizli bilgi frontend kaynağına yazılmaz.
- Dış görsel URL'sine bağımlılık yoktur; tüm varlıklar `public/` altındadır.
  Tek dış kaynak Google Fonts CSS/woff2 dosyalarıdır.
- QR kodun hedef adresi ve Vercel alan adı bu entegrasyonda değiştirilmedi;
  yayınlama ayrı onaya bağlıdır.
- Referans video `design-references/menu-motion-reference.mp4` teslim
  edilmedi; yalnızca yazılı brifteki çerçeve ve hareket ilkeleri uygulandı.
  Jack Daniel's marka öğeleri, sarı zemin, ürün veya metinleri kullanılmadı.
- Eski yedi ürün görseli değiştirilmedi; `git diff` ile izlenen dosyalarda
  değişiklik olmadığı doğrulandı. Boyutları 1536 × 1024 RGBA'dır ve yalnızca
  PNG olarak sunulur.
- Yeni 18 görsel QA'dan geçti ve 1200 × 800 RGBA şeffaf tuvale normalize
  edildi. Her biri için PNG, WebP (q85) ve AVIF (q65) üretildi; alfa kanalı
  korunur. Toplam boyutlar: 25 PNG **35.92 MB**, 18 WebP **3.36 MB**,
  18 AVIF **1.74 MB**. WebP/AVIF yalnızca tarayıcı desteklediğinde indirilir;
  PNG son yedektir.
- Görsel adları ürün kimlikleriyle birebir eşleşir; yanlış veya yinelenen
  görsel yoktur. Dosyalar `public/images/products/` altındadır.
- Kenarlardaki küçük garnitür parçaları tedarik edilen dosyanın parçasıdır;
  kırpılmamış veya maskelenmemiştir.
- İki gerçek logo dosyası yeniden renklendirilmeden, oranları korunarak
  kullanılır: `aschefin-amblem-seffaf.png` (222 × 195) ve
  `aschefin-yazi-logosu-seffaf.png` (523 × 201).
- **İşletme verisi düzeltmesi (18 Kasım 2026):** Basılı menü esas alınarak
  Ekmek Arası Döner 100 gr **170 TL** / 120 gr **200 TL** olarak güncellendi;
  Zurna Döner gramajları **120 gr / 140 gr** yapıldı, fiyatları **200 TL /
  230 TL** olarak korundu. Diğer 23 ürünün fiyat ve gramajları değişmedi.
- Yeni bağımlılık eklenmez; React + Vite + TypeScript korunur.

---

## 10. Responsive Kontrol Listesi ve Doğrulama

**Son doğrulama:** 18 Kasım 2026 — üretim build'i (`npm run preview`),
Playwright, 320 / 390 / 768 / 1440 px. Toplam **482 kontrol, 0 başarısız**.

### Düzen ve taşma

| Genişlik | Kontrol | Ürün | AVIF | Kategori | Yatay taşma | Konsol hatası |
|---|---:|---:|---:|---:|---:|---:|
| 320px | 119 | 25 / 25 | 18 / 18 | 9 / 9 | 0px | 0 |
| 390px | 119 | 25 / 25 | 18 / 18 | 9 / 9 | 0px | 0 |
| 768px | 119 | 25 / 25 | 18 / 18 | 9 / 9 | 0px | 0 |
| 1440px | 119 | 25 / 25 | 18 / 18 | 9 / 9 | 0px | 0 |

- [x] 320px: tek sütun; hero CTA'ları alt alta; 9 kategorili şerit yatay
  kaydırılıyor; logo lockup ve telefon bağlantısı erişilebilir; taşma yok.
- [x] 390px: hero CTA'ları yan yana; kategori şeridinde seçili sekme gerektiğinde
  otomatik ortalanıyor; iki kenar degradesi görünür; taşma yok.
- [x] 768px: 2 sütun, gap 16px; hero split; feature 16:9; kategori sekmeleri
  sarıyor; arama 276px ve sağa hizalı; taşma yok.
- [x] 1440px: 4 sütunlu tam menü; içerik 1280px; ilk görsel satırda editoryal
  `dense` yerleşimi gözlendi; taşma yok.
- [x] 1440px filtre: tüm kartlar span 1; 1360+ kuralı 4 sütuna dönmüyor;
  filtrelenmiş grid 3 sütun kalıyor.
- [x] Hiçbir test genişliğinde `documentElement.scrollWidth > clientWidth`
  görülmedi; `min-width: 0` ve açık grid satırları korunuyor.
- [x] Sayfa yatayda taşan görünür öğe taraması dört genişlikte de boş döndü.
- [x] 1440px arama alanı 36–64px yükseklik aralığında; eski `flex-basis`
  kaynaklı ~306px'lik dikey şişme regresyonu tekrar etmiyor.

### Ürünler, fiyatlar ve görseller

- [x] 25 ürün doğru sırada ve doğru kategoride: Döner 5, Köfte 1, Burger 3,
  Izgara 3, Kilo ile Lezzet 2, Kahvaltı 1, Çorba & Pilav 2, İçecekler 8.
- [x] Düz "Köfte" başlığı DOM'da yok; "Ekmek Arası Köfte", "Izgara Köfte" ve
  "1 KG Köfte" ayrı ürünler olarak doğrulandı.
- [x] Tüm fiyatlar `prices.ts` ile eşleşiyor. Ekmek Arası Döner 170/200 TL,
  Zurna Döner 120/140 gr ve 200/230 TL, Ekmek Arası Köfte 250 TL, Hamburger 250 TL,
  Cheeseburger 270 TL, Chickenburger 200 TL, Hatay Dürüm 170 TL,
  4 Dürüm Kampanyası 600 TL, Izgara Tavuk Pirzola 280 TL, Izgara Köfte
  280 TL, Izgara Tavuk Kulbaştı 250 TL, 1 KG Tavuk Döner 800 TL, 1 KG Köfte
  900 TL, Kahvaltı Tabağı 150 TL, Çorba 70 TL, Pilav 50 TL, Büyük Ayran
  60 TL, Küçük Ayran 40 TL, Pepsi 60 TL, 7UP 60 TL, Yedigün 60 TL,
  Doğanay Şalgam 60 TL, Su 20 TL. Soslu Döner'de fiyat yok; telefon bağlantısı
  var.
- [x] Sınırsız Çay'ın fiyat durumu `free`: "Sınırsız" ve "Ücretsiz" okunuyor;
  TL simgesi veya tutar yok. `aria-label` doğru.
- [x] Telefonun tüm bağlantıları `tel:03122602555`; görünen numara
  `0312 260 25 55`.
- [x] 25 görselin tamamı yüklendi (`naturalWidth > 0`), `object-fit: contain`,
  reveal sonrası opacity 1; siyah kutu, kırpma veya esneme yok.
- [x] Yeni 18 ürünün `<picture>` sırası AVIF → WebP → PNG; kaynak tipleri ve
  URL'leri doğru. 18 WebP ve 18 PNG yedeği 1200 × 800 olarak ayrıca
  doğrulandı. Eski 7 görsel 1536 × 1024 PNG-only kaldı.
- [x] Hero görseli ve iki logo dosyası yüklendi. Görsel yolları yerel ve
  doğru ürünlerle eşleşiyor.
- [x] Yalnızca iki döner ürününde çoklu gramaj plakası var; tek fiyatlı
  ürünlerde tek satırlı plaka, Soslu Döner'de arama bağlantısı kullanılıyor.
- [x] 9 üründe açıklama render edildi; 16 üründe açıklama öğesi DOM'da yok,
  boş alan oluşmuyor.
- [x] Arama "çay" için 1, "dürüm" için 2 sonuç veriyor; kategori filtreleri
  ve "Filtreleri temizle" doğru çalışıyor.

### Hareket ve etkileşim

- [x] Scroll reveal: hero, sahne rayları, bölüm başlığı, 25 ürün kartı ve
  iletişim bloğu eşiklerinde bir kez açılıyor; geri scroll'da tekrar
  oynamıyor. `prefers-reduced-motion: reduce` altında ölçümler kararlı.
- [x] Fotoğraf yönleri: 8 `up`, 9 `left`, 8 `right`; her ürünün gecikmesi
  kart sırasına göre artıyor. 25 kartın tamamı DOM'daki `data-reveal`
  değeriyle eşleşiyor.
- [x] Final transform'lar: feature fotoğrafları `translate3d(-50%, 0, 0)`,
  editorial fotoğrafı `translate3d(0, -50%, 0)`, standart kartlarda kimlik
  matrisi; tüm fotoğraflarda ölçek 1, dönüş 0°.
- [x] Kategori geçişi: eski grid 220ms çıkış → yeni grid stagger giriş;
  `aria-busy`, sonuç sayacı ve `transitionKey` doğru çalışıyor. 30ms'de
  `aria-busy=true` ve çıkış sınıfı, 350ms'de yeni grid gözlendi.
- [x] Hızlı ardışık kategori tıklamalarında eski timer temizleniyor; çıkış
  sınıfı kilitli kalmıyor.
- [x] "Köfte" filtresi 1 kart (Ekmek Arası Köfte, 250 TL), "Burger" filtresi
  3 kart (250 / 270 / 200 TL), "Döner" filtresi 5 kart, "İçecekler" filtresi
  8 kart gösteriyor; "Tümü" 25 karta dönüyor. Boş arama durumu ayrı ve
  erişilebilir.
- [x] `prefers-reduced-motion: reduce` (390px): kartlar opacity 1 ve yatay/
  dikey ortalamayı koruyan transform'la görünür; geçiş süresi 0.00001s;
  kategori tıklaması beklemesiz uygulanır. Animasyon yok.
- [x] Klavye: ilk Tab skip link'i açıyor; hero telefon, sekmeler, arama ve
  kart bağlantılarında altın focus halkası görünüyor.
- [x] Mobil kategori şeridi: 9 sekme, en az 44px dokunma alanı, yatay kaydırma
  ve snap; seçili sekme kırpılıyorsa otomatik ortalanıyor; iki kenar degradesi
  768 altında görünür, 768+ gizleniyor.
- [x] Dekoratif çerçeveler ve amblem `aria-hidden`; odak halkasını örtmüyor.

### Konsol ve ağ

- [x] Konsol: dört viewport'ta da 0 hata, 0 sayfa hatası.
- [x] Başarısız ürün görseli isteği yok; yerel görseller 200/304, dış istek
  yalnızca Google Fonts CSS/woff2.
- [x] Hero dışındaki ürün fotoğrafları `loading="lazy"` ile yükleniyor;
  görünür olduklarında eksiksiz boyanıyor.
- [x] Format matrisi: 18 WebP ve 18 PNG yedeği 1200 × 800 olarak istendi.
- [x] Hata enjeksiyonu: Yedigün'ün AVIF + WebP istekleri engellendiğinde PNG
  seçildi; Su'nun AVIF + WebP + PNG istekleri engellendiğinde dekoratif
  yer tutucu göründü, kırık fotoğraf simgesi oluşmadı.
- [x] Yatay taşma ölçümü dört genişlikte 0px; `documentElement.scrollWidth`
  `clientWidth`'i aşmadı.

### Build ve lint

- [x] `npm run build`: başarılı. `dist/index.html` 0.99 kB (gzip 0.52 kB);
  CSS 42.70 kB (gzip 8.72 kB); JS 245.65 kB (gzip 74.87 kB); 25 modül,
  268ms.
- [x] `npm run lint`: 0 hata, 0 uyarı. `.claude/**` yerel skill betikleri
  lint kapsamı dışında tutulur; uygulama kodunda uyarı yoktur.
- [x] Ekran görüntüleri `asset-staging/integration-qa/` altında
  `round3-{mobile-320,mobile-390,tablet-768,desktop-1440}-{hero,menu-top,grid-top,icecekler,sinirsiz-cay}.png`
  olarak kaydedildi. Dört viewport × beş görünüm = 20 dosya.
- [x] Fiyat düzeltmesi için 4 hedefli kart görüntüsü:
  `final-{desktop-1440,mobile-390}-{ekmek-arasi-doner,zurna-doner}.png`.
  Ekmek Arası Döner 170/200 TL, Zurna Döner 120/140 gr ve 200/230 TL
  görsel olarak doğrulandı.
- [x] Playwright özeti: `mobile-320`, `mobile-390`, `tablet-768`,
  `desktop-1440` için ürün 25/25, AVIF 18/18, kategori 9/9, taşma 0px,
  konsol 0; toplam 482 kontrol, 0 başarısız.

### Bilinen eksikler

- `design-references/menu-motion-reference.mp4` teslim edilmedi; yazılı
  brifteki ilkeler uygulandı.
- Tedarik edilen ürün PNG'lerinde kenarlarda küçük garnitür yaprakları vardır;
  bunlar dosyaların parçası olduğu için kırpılmadı veya maskelenmedi.
- `grid-auto-flow: row dense` nedeniyle 1440px'te görsel kart sırası DOM
  sırasından farklı olabilir. Erişilebilirlik ve klavye sırası DOM sırasıdır;
  bu durum bilinçli kabul edilmiştir.
- Eski yedi görsel yalnızca PNG'dir; AVIF/WebP dönüşümü kullanıcı koruma
  kuralı gereği yapılmadı. Yeni 18 görsel AVIF/WebP/PNG üçlüsüyle sunulur.
- Entegrasyon yalnızca yerel projede tamamlandı; GitHub'a push ve Vercel
  deploy yapılmadı. Yayın ayrı onaya bağlıdır.
- Gelecekte yeni bir ürün eklenirse `src/data/menu.ts` içindeki görsel,
  düzen ve giriş yönü alanları doldurulur; yeni görsel için PNG yanında
  AVIF/WebP üretilir; fiyat `src/data/prices.ts`'e eklenir. Bileşenlere
  sabit fiyat yazılmaz.
