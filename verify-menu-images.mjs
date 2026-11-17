/**
 * Playwright doğrulama betiği — AsChef'in Konak dijital menü entegrasyonu.
 *
 * Çalıştırma:
 *   npm run build
 *   npm run preview -- --host 127.0.0.1 --port 4173
 *   BASE_URL=http://127.0.0.1:4173 node verify-menu-images.mjs
 *
 * Kontroller: 25 ürün, 9 kategori, fiyatlar, Ücretsiz etiketi, açıklama
 * koşulları, AVIF → WebP → PNG kaynak sırası, WebP/PNG yedekleri, ağ hatasında
 * PNG'ye düşüş, görsel kapsama, 320/390/768/1440 yatay taşma ve konsol hataları.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:4173";
const PRODUCT_COUNT = 25;
const SHOT_DIR = path.resolve("asset-staging/integration-qa");
const RESULT_FILE = path.join(SHOT_DIR, "test-results.json");

const viewports = [
  { name: "mobile-320", width: 320, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 }
];

const categories = [
  { name: "Tümü", count: 25 },
  { name: "Döner", count: 5 },
  { name: "Köfte", count: 1 },
  { name: "Burger", count: 3 },
  { name: "Izgara", count: 3 },
  { name: "Kilo ile Lezzet", count: 2 },
  { name: "Kahvaltı", count: 1 },
  { name: "Çorba & Pilav", count: 2 },
  { name: "İçecekler", count: 8 }
];

const expectedProducts = [
  { id: "soslu-doner", name: "Soslu Döner", category: "Döner", state: "ask", amounts: [], description: true, legacy: true },
  { id: "hatay-durum", name: "Hatay Dürüm", category: "Döner", state: "fixed", amounts: ["170TL"], description: true },
  { id: "ekmek-arasi-doner", name: "Ekmek Arası Döner", category: "Döner", state: "options", amounts: ["170TL", "200TL"], description: true, legacy: true },
  { id: "zurna-doner", name: "Zurna Döner", category: "Döner", state: "options", amounts: ["200TL", "230TL"], description: true, legacy: true },
  { id: "dortlu-durum-kampanyasi", name: "4 Dürüm Kampanyası", category: "Döner", state: "fixed", amounts: ["600TL"], description: false },
  { id: "ekmek-arasi-kofte", name: "Ekmek Arası Köfte", category: "Köfte", state: "fixed", amounts: ["250TL"], description: true, legacy: true },
  { id: "hamburger", name: "Hamburger", category: "Burger", state: "fixed", amounts: ["250TL"], description: true, legacy: true },
  { id: "cheeseburger", name: "Cheeseburger", category: "Burger", state: "fixed", amounts: ["270TL"], description: true, legacy: true },
  { id: "chickenburger", name: "Chickenburger", category: "Burger", state: "fixed", amounts: ["200TL"], description: true, legacy: true },
  { id: "izgara-tavuk-pirzola", name: "Izgara Tavuk Pirzola", category: "Izgara", state: "fixed", amounts: ["280TL"], description: false },
  { id: "izgara-kofte", name: "Izgara Köfte", category: "Izgara", state: "fixed", amounts: ["280TL"], description: false },
  { id: "izgara-tavuk-kulbasti", name: "Izgara Tavuk Kulbaştı", category: "Izgara", state: "fixed", amounts: ["250TL"], description: false },
  { id: "bir-kg-tavuk-doner", name: "1 KG Tavuk Döner", category: "Kilo ile Lezzet", state: "fixed", amounts: ["800TL"], description: false },
  { id: "bir-kg-kofte", name: "1 KG Köfte", category: "Kilo ile Lezzet", state: "fixed", amounts: ["900TL"], description: false },
  { id: "kahvalti-tabagi", name: "Kahvaltı Tabağı", category: "Kahvaltı", state: "fixed", amounts: ["150TL"], description: false },
  { id: "corba", name: "Çorba", category: "Çorba & Pilav", state: "fixed", amounts: ["70TL"], description: false },
  { id: "pilav", name: "Pilav", category: "Çorba & Pilav", state: "fixed", amounts: ["50TL"], description: false },
  { id: "buyuk-ayran", name: "Büyük Ayran", category: "İçecekler", state: "fixed", amounts: ["60TL"], description: false },
  { id: "kucuk-ayran", name: "Küçük Ayran", category: "İçecekler", state: "fixed", amounts: ["40TL"], description: false },
  { id: "pepsi", name: "Pepsi", category: "İçecekler", state: "fixed", amounts: ["60TL"], description: false },
  { id: "yedi-up", name: "7UP", category: "İçecekler", state: "fixed", amounts: ["60TL"], description: false },
  { id: "yedigun", name: "Yedigün", category: "İçecekler", state: "fixed", amounts: ["60TL"], description: false },
  { id: "doganay-salgam", name: "Doğanay Şalgam", category: "İçecekler", state: "fixed", amounts: ["60TL"], description: true },
  { id: "su", name: "Su", category: "İçecekler", state: "fixed", amounts: ["20TL"], description: false },
  { id: "sinirsiz-cay", name: "Sınırsız Çay", category: "İçecekler", state: "free", amounts: ["Ücretsiz"], description: false }
];

async function revealAll(page) {
  await page.evaluate(async () => {
    const scroller = document.scrollingElement ?? document.documentElement;
    for (let y = 0; y <= scroller.scrollHeight; y += 350) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    await new Promise((resolve) => setTimeout(resolve, 350));
  });
}

async function waitForCards(page, expectedCount) {
  await page.waitForFunction(
    (count) => {
      const grid = document.querySelector(".product-grid");
      return (
        document.querySelectorAll(".product-card").length === count &&
        grid &&
        !grid.classList.contains("product-grid--exiting")
      );
    },
    expectedCount,
    { timeout: 8000 }
  );
}

async function selectCategory(page, name, expectedCount) {
  await page.getByRole("button", { name, exact: true }).click();
  await page.waitForFunction(
    ({ label, count }) => {
      const active = document.querySelector(
        '.category-tab[aria-pressed="true"]'
      );
      const grid = document.querySelector(".product-grid");
      return (
        active?.textContent?.trim() === label &&
        document.querySelectorAll(".product-card").length === count &&
        grid &&
        !grid.classList.contains("product-grid--exiting")
      );
    },
    { label: name, count: expectedCount },
    { timeout: 8000 }
  );
}

function addCheck(state, name, pass, detail = "") {
  state.checks.push({ name, pass, detail });
  if (!pass) {
    state.failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
  }
}

async function screenshot(page, name) {
  const file = path.join(SHOT_DIR, `${name}.png`);
  await page.screenshot({ path: file });
  return file;
}

async function inspectFallbacks(browser, state) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark",
    reducedMotion: "reduce"
  });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(String(error)));

  // AVIF ve WebP ağ hatalarında ürünün PNG'ye düşmesi beklenir.
  await page.route("**/yedigun.avif", (route) => route.abort());
  await page.route("**/yedigun.webp", (route) => route.abort());
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForSelector(".product-card", { timeout: 15000 });
  await revealAll(page);
  let pngFallback = false;
  try {
    await page.waitForFunction(
      () => {
        const img = document.querySelector(
          '[data-product-id="yedigun"] .product-card__photo'
        );
        return (
          img &&
          img.complete &&
          img.naturalWidth > 0 &&
          img.currentSrc.endsWith(".png")
        );
      },
      null,
      { timeout: 12000 }
    );
    pngFallback = true;
  } catch {
    pngFallback = false;
  }
  addCheck(state, "AVIF/WebP hata yedeği PNG'ye düştü", pngFallback);
  await page.close();

  // Üç format da yüklenemezse kart içi zarif yer tutucu görünmelidir.
  const blockedPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark",
    reducedMotion: "reduce"
  });
  const blockedPageErrors = [];
  blockedPage.on("pageerror", (error) => blockedPageErrors.push(String(error)));
  for (const ext of ["avif", "webp", "png"]) {
    await blockedPage.route(`**/su.${ext}`, (route) => route.abort());
  }
  await blockedPage.goto(BASE_URL, { waitUntil: "networkidle" });
  await blockedPage.waitForSelector(".product-card", { timeout: 15000 });
  await revealAll(blockedPage);
  let placeholder = false;
  try {
    await blockedPage.waitForFunction(
      () =>
        Boolean(
          document.querySelector(
            '[data-product-id="su"] .product-card__fallback'
          )
        ),
      null,
      { timeout: 12000 }
    );
    placeholder = true;
  } catch {
    placeholder = false;
  }
  const suHasNoPhoto = await blockedPage.evaluate(
    () =>
      !document.querySelector(
        '[data-product-id="su"] .product-card__photo'
      )
  );
  addCheck(state, "Tüm formatlar hatasında yer tutucu göründü", placeholder);
  addCheck(state, "Yer tutucuda kırık görsel kalmadı", suHasNoPhoto);
  addCheck(
    state,
    "Yedek testlerinde React çalışma hatası yok",
    pageErrors.length === 0 && blockedPageErrors.length === 0,
    [...pageErrors, ...blockedPageErrors].join(" | ")
  );
  await blockedPage.close();
}

async function inspectFormatMatrix(page, state) {
  const matrix = await page.evaluate(async () => {
    const rows = [];
    const cards = [
      ...document.querySelectorAll(".product-card")
    ].filter((card) => card.querySelector('picture source[type="image/webp"]'));

    for (const card of cards) {
      const id = card.dataset.productId;
      const avif = card
        .querySelector('picture source[type="image/avif"]')
        ?.getAttribute("srcset");
      const webp = card
        .querySelector('picture source[type="image/webp"]')
        ?.getAttribute("srcset");
      const png = card
        .querySelector(".product-card__photo")
        ?.getAttribute("src");

      const load = (src, type) =>
        new Promise((resolve) => {
          const picture = document.createElement("picture");
          if (type) {
            const source = document.createElement("source");
            source.type = type;
            source.srcset = src;
            picture.append(source);
          }
          const img = document.createElement("img");
          img.alt = "";
          img.loading = "eager";
          img.src = png;
          img.style.cssText =
            "position:fixed;left:-9999px;top:0;width:1200px;height:800px";
          picture.append(img);
          document.body.append(picture);
          const done = () => {
            const result = {
              src: img.currentSrc,
              width: img.naturalWidth,
              height: img.naturalHeight
            };
            picture.remove();
            resolve(result);
          };
          if (img.complete) {
            done();
          } else {
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          }
        });

      const webpOnly = await load(webp, "image/webp");
      const pngOnly = await load(png, null);
      rows.push({
        id,
        avif,
        webp,
        png,
        webpOk:
          webpOnly.src.endsWith(".webp") &&
          webpOnly.width === 1200 &&
          webpOnly.height === 800,
        pngOk:
          pngOnly.src.endsWith(".png") &&
          pngOnly.width === 1200 &&
          pngOnly.height === 800
      });
    }
    return rows;
  });

  addCheck(
    state,
    "18 ürünün WebP yedeği 1200×800 yüklendi",
    matrix.length === 18 && matrix.every((row) => row.webpOk),
    `${matrix.filter((row) => row.webpOk).length}/18`
  );
  addCheck(
    state,
    "18 ürünün PNG yedeği 1200×800 yüklendi",
    matrix.length === 18 && matrix.every((row) => row.pngOk),
    `${matrix.filter((row) => row.pngOk).length}/18`
  );
  return matrix;
}

async function main() {
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const state = { checks: [], failures: [], screenshots: [] };
  const summary = [];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: "dark",
      reducedMotion: "reduce"
    });
    const consoleErrors = [];
    const pageErrors = [];
    const failedProductRequests = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(String(error)));
    page.on("requestfailed", (request) => {
      if (
        request.url().includes("/images/products/") &&
        request.failure()?.errorText !== "net::ERR_ABORTED"
      ) {
        failedProductRequests.push(
          `${request.url()} — ${request.failure()?.errorText}`
        );
      }
    });

    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.waitForSelector(".product-card", { timeout: 15000 });
    await page.waitForTimeout(800);

    const initialLayout = await page.evaluate(() => {
      const doc = document.documentElement;
      const tabs = document.querySelector(".category-tabs");
      const tabButtons = [...document.querySelectorAll(".category-tab")];
      const tabsRect = tabs.getBoundingClientRect();
      const search = document.querySelector(".menu-search");
      return {
        overflow: Math.max(0, doc.scrollWidth - doc.clientWidth),
        tabCount: tabButtons.length,
        tabLabels: tabButtons.map((tab) => tab.textContent.trim()),
        tabsScrollable: tabs.scrollWidth > tabs.clientWidth + 1,
        tabsScrollWidth: tabs.scrollWidth,
        tabsClientWidth: tabs.clientWidth,
        lastTabClipped:
          tabButtons.at(-1).getBoundingClientRect().right >
          tabsRect.right + 1,
        searchHeight: search.getBoundingClientRect().height
      };
    });

    addCheck(state, `${vp.name}: 9 kategori sekmesi`, initialLayout.tabCount === 9);
    addCheck(
      state,
      `${vp.name}: kategori etiketleri doğru`,
      JSON.stringify(initialLayout.tabLabels) ===
        JSON.stringify(categories.map((category) => category.name))
    );
    addCheck(
      state,
      `${vp.name}: ilk yüklemede yatay taşma yok`,
      initialLayout.overflow <= 1,
      `${initialLayout.overflow}px`
    );
    addCheck(
      state,
      `${vp.name}: arama alanı yüksekliği normal`,
      initialLayout.searchHeight >= 36 && initialLayout.searchHeight <= 64,
      `${initialLayout.searchHeight.toFixed(1)}px`
    );
    if (vp.width < 768) {
      addCheck(
        state,
        `${vp.name}: kategori şeridi yatay kaydırılabilir`,
        initialLayout.tabsScrollable && initialLayout.lastTabClipped
      );
    } else {
      addCheck(
        state,
        `${vp.name}: kategoriler satır kaydırmadan görünür`,
        !initialLayout.tabsScrollable && !initialLayout.lastTabClipped
      );
    }

    state.screenshots.push(await screenshot(page, `round3-${vp.name}-hero`));

    await page.evaluate(() => {
      const menu = document.querySelector("#menu");
      window.scrollTo({
        top: Math.max(0, menu.offsetTop - 14),
        behavior: "instant"
      });
    });
    await page.waitForTimeout(500);
    state.screenshots.push(
      await screenshot(page, `round3-${vp.name}-menu-top`)
    );

    await revealAll(page);
    await page.waitForFunction(
      () =>
        [...document.querySelectorAll(".product-card__photo")].every(
          (img) => img.complete && img.naturalWidth > 0
        ),
      null,
      { timeout: 20000 }
    );

    const report = await page.evaluate(() => {
      const cards = [...document.querySelectorAll(".product-card")];
      const data = cards.map((card) => {
        const id = card.dataset.productId;
        const img = card.querySelector(".product-card__photo");
        const picture = card.querySelector("picture");
        const sourceTypes = picture
          ? [...picture.querySelectorAll("source")].map(
              (source) => source.getAttribute("type")
            )
          : [];
        const amounts = [
          ...card.querySelectorAll(".price-row__amount")
        ].map((el) => el.textContent.replace(/\s+/g, "").trim());
        const labels = [...card.querySelectorAll(".price-row__label")].map(
          (el) => el.textContent.trim()
        );
        const visual = card.querySelector(".product-card__visual");
        const imgRect = img.getBoundingClientRect();
        const visualRect = visual.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        return {
          id,
          name: card.querySelector(".product-card__title")?.textContent.trim(),
          category: card.dataset.category,
          priceState: card.dataset.priceState,
          amounts,
          labels,
          description: card.querySelector(".product-card__description")
            ?.textContent.trim() ?? "",
          hasDescriptionElement: Boolean(
            card.querySelector(".product-card__description")
          ),
          loaded: img.complete && img.naturalWidth > 0,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          currentSrc: new URL(img.currentSrc).pathname,
          sourceTypes,
          objectFit: getComputedStyle(img).objectFit,
          withinVisual:
            imgRect.left >= visualRect.left - 1 &&
            imgRect.right <= visualRect.right + 1 &&
            imgRect.top >= visualRect.top - 1 &&
            imgRect.bottom <= visualRect.bottom + 1,
          withinCard:
            imgRect.left >= cardRect.left - 1 &&
            imgRect.right <= cardRect.right + 1 &&
            imgRect.top >= cardRect.top - 1 &&
            imgRect.bottom <= cardRect.bottom + 1,
          freePlate: Boolean(card.querySelector(".price-plate--free")),
          freeText: card.querySelector(".price-row__amount--free")
            ?.textContent.trim(),
          freeHasTl: Boolean(
            card.querySelector(".price-plate--free .price-row__currency")
          )
        };
      });
      const doc = document.documentElement;
      return {
        cardCount: cards.length,
        data,
        overflow: Math.max(0, doc.scrollWidth - doc.clientWidth)
      };
    });

    addCheck(
      state,
      `${vp.name}: 25 ürün kartı`,
      report.cardCount === PRODUCT_COUNT,
      `${report.cardCount}`
    );
    addCheck(
      state,
      `${vp.name}: görsel kartlarından sonra yatay taşma yok`,
      report.overflow <= 1,
      `${report.overflow}px`
    );

    const byId = new Map(report.data.map((row) => [row.id, row]));
    let productChecks = 0;
    let priceChecks = 0;
    let imageChecks = 0;

    for (const expected of expectedProducts) {
      const actual = byId.get(expected.id);
      if (!actual) {
        addCheck(state, `${vp.name}: ${expected.id} kartı bulundu`, false);
        continue;
      }
      productChecks += 1;

      const identityOk =
        actual.name === expected.name &&
        actual.category === expected.category &&
        actual.hasDescriptionElement === expected.description;
      addCheck(
        state,
        `${vp.name}: ${expected.name} ad/kategori/açıklama`,
        identityOk,
        !identityOk
          ? `ad=${actual.name}, kategori=${actual.category}, açıklama=${actual.hasDescriptionElement}`
          : ""
      );
      if (!expected.description) {
        addCheck(
          state,
          `${vp.name}: ${expected.name} boş açıklama göstermiyor`,
          !actual.hasDescriptionElement && actual.description === ""
        );
      }

      const amountsOk =
        actual.priceState === expected.state &&
        JSON.stringify(actual.amounts) === JSON.stringify(expected.amounts);
      addCheck(
        state,
        `${vp.name}: ${expected.name} fiyatı`,
        amountsOk,
        !amountsOk
          ? `durum=${actual.priceState}, tutarlar=${actual.amounts.join(",")}`
          : ""
      );
      if (amountsOk) priceChecks += 1;

      if (expected.id === "ekmek-arasi-doner") {
        addCheck(
          state,
          `${vp.name}: Ekmek Arası Döner gramaj etiketleri`,
          JSON.stringify(actual.labels) === JSON.stringify(["100 gr", "120 gr"])
        );
      }
      if (expected.id === "zurna-doner") {
        addCheck(
          state,
          `${vp.name}: Zurna Döner gramaj etiketleri`,
          JSON.stringify(actual.labels) === JSON.stringify(["120 gr", "140 gr"])
        );
      }
      if (expected.id === "sinirsiz-cay") {
        addCheck(
          state,
          `${vp.name}: Sınırsız Çay ayrı Ücretsiz etiketi`,
          actual.freePlate &&
            actual.freeText === "Ücretsiz" &&
            !actual.freeHasTl,
          `plaka=${actual.freePlate}, metin=${actual.freeText ?? "yok"}, TL=${actual.freeHasTl}`
        );
      }

      const expectedSources = expected.legacy ? [] : ["image/avif", "image/webp"];
      const formatOk = expected.legacy
        ? actual.currentSrc.endsWith(".png") &&
          actual.currentSrc.includes(`/${expected.id === "soslu-doner" ? "soslu-tavuk-doner" : expected.id === "ekmek-arasi-doner" ? "ekmek-arasi-tavuk-doner" : expected.id === "zurna-doner" ? "zurna-tavuk-doner" : expected.id === "ekmek-arasi-kofte" ? "ekmek-arasi-tavuk-kofte" : expected.id}.png`) &&
          actual.naturalWidth === 1536 &&
          actual.naturalHeight === 1024
        : actual.currentSrc.endsWith(".avif") &&
          actual.naturalWidth === 1200 &&
          actual.naturalHeight === 800;
      const imageOk =
        actual.loaded &&
        actual.objectFit === "contain" &&
        actual.withinVisual &&
        actual.withinCard &&
        JSON.stringify(actual.sourceTypes) === JSON.stringify(expectedSources) &&
        formatOk;
      addCheck(
        state,
        `${vp.name}: ${expected.name} görseli ve formatı`,
        imageOk,
        !imageOk
          ? `yüklenme=${actual.loaded}, kaynak=${actual.currentSrc}, türler=${actual.sourceTypes.join(",")}, boyut=${actual.naturalWidth}×${actual.naturalHeight}, object-fit=${actual.objectFit}`
          : ""
      );
      if (imageOk) imageChecks += 1;
    }

    const expectedDescriptions = expectedProducts.filter(
      (product) => product.description
    ).length;
    addCheck(
      state,
      `${vp.name}: açıklamasız ürünlerde boş alan yok`,
      report.data.filter((row) => row.hasDescriptionElement).length ===
        expectedDescriptions
    );
    addCheck(
      state,
      `${vp.name}: 25 ürün ad/kategori/açıklama`,
      productChecks === PRODUCT_COUNT,
      `${productChecks}/25`
    );
    addCheck(
      state,
      `${vp.name}: 25 ürün fiyatı`,
      priceChecks === PRODUCT_COUNT,
      `${priceChecks}/25`
    );
    addCheck(
      state,
      `${vp.name}: 25 ürün görseli`,
      imageChecks === PRODUCT_COUNT,
      `${imageChecks}/25`
    );

    await page.evaluate(() => {
      const card = document.querySelector(
        '[data-product-id="soslu-doner"]'
      );
      const header = document.querySelector(".site-header");
      const offset = (header?.getBoundingClientRect().height ?? 0) + 18;
      window.scrollTo({
        top: card.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "instant"
      });
    });
    await page.waitForTimeout(500);
    state.screenshots.push(
      await screenshot(page, `round3-${vp.name}-grid-top`)
    );

    // Kategori sayaçları ve filtreleme.
    const categoryResults = [];
    for (const category of categories) {
      await selectCategory(page, category.name, category.count);
      const result = await page.evaluate(() => ({
        count: document.querySelectorAll(".product-card").length,
        ids: [...document.querySelectorAll(".product-card")].map(
          (card) => card.dataset.productId
        ),
        overflow: Math.max(
          0,
          document.documentElement.scrollWidth -
            document.documentElement.clientWidth
        )
      }));
      const expectedIds = expectedProducts
        .filter(
          (product) =>
            category.name === "Tümü" || product.category === category.name
        )
        .map((product) => product.id);
      const pass =
        result.count === category.count &&
        result.overflow <= 1 &&
        expectedIds.every((id) => result.ids.includes(id));
      addCheck(
        state,
        `${vp.name}: ${category.name} filtresi ${category.count} ürün`,
        pass,
        !pass
          ? `sayı=${result.count}, taşma=${result.overflow}px`
          : ""
      );
      categoryResults.push({ category: category.name, ...result, pass });
    }

    await page.evaluate(() => {
      const menu = document.querySelector("#menu");
      window.scrollTo({
        top: Math.max(0, menu.offsetTop - 14),
        behavior: "instant"
      });
    });
    await page.waitForTimeout(500);
    state.screenshots.push(
      await screenshot(page, `round3-${vp.name}-icecekler`)
    );

    await page
      .locator('[data-product-id="sinirsiz-cay"]')
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    state.screenshots.push(
      await screenshot(page, `round3-${vp.name}-sinirsiz-cay`)
    );

    await selectCategory(page, "Tümü", 25);

    // Arama testleri.
    for (const searchCase of [
      { term: "çay", count: 1, id: "sinirsiz-cay" },
      { term: "dürüm", count: 2, ids: ["hatay-durum", "dortlu-durum-kampanyasi"] }
    ]) {
      await page.getByPlaceholder("Menüde ara").fill(searchCase.term);
      await page.waitForFunction(
        (count) => document.querySelectorAll(".product-card").length === count,
        searchCase.count,
        { timeout: 5000 }
      );
      const searchIds = await page.evaluate(() =>
        [...document.querySelectorAll(".product-card")].map(
          (card) => card.dataset.productId
        )
      );
      const pass =
        searchCase.id !== undefined
          ? searchIds.includes(searchCase.id)
          : searchCase.ids.every((id) => searchIds.includes(id));
      addCheck(
        state,
        `${vp.name}: "${searchCase.term}" araması`,
        pass && searchIds.length === searchCase.count,
        searchIds.join(",")
      );
      await page.getByRole("button", { name: "Aramayı temizle" }).click();
      await waitForCards(page, 25);
    }

    if (vp.width === 1440) {
      await inspectFormatMatrix(page, state);
    }

    addCheck(
      state,
      `${vp.name}: konsol hatası yok`,
      consoleErrors.length === 0,
      consoleErrors.join(" | ")
    );
    addCheck(
      state,
      `${vp.name}: sayfa çalışma hatası yok`,
      pageErrors.length === 0,
      pageErrors.join(" | ")
    );
    addCheck(
      state,
      `${vp.name}: başarısız ürün görseli isteği yok`,
      failedProductRequests.length === 0,
      failedProductRequests.join(" | ")
    );

    const viewportChecks = state.checks.filter((check) =>
      check.name.startsWith(`${vp.name}:`)
    );
    const viewportFailed = viewportChecks.filter((check) => !check.pass);
    summary.push({
      viewport: vp.name,
      width: vp.width,
      checks: viewportChecks.length,
      failed: viewportFailed.length,
      products: report.cardCount,
      avif: report.data.filter((row) => row.currentSrc.endsWith(".avif"))
        .length,
      overflow: report.overflow,
      consoleErrors: consoleErrors.length,
      categories: distributionFromIds(categoryResults)
    });

    console.log(
      `[${vp.name}] ürün=${report.cardCount}/${PRODUCT_COUNT} ` +
        `AVIF=${report.data.filter((row) => row.currentSrc.endsWith(".avif")).length}/18 ` +
        `kategori=${categoryResults.filter((row) => row.pass).length}/9 ` +
        `taşma=${report.overflow}px konsol=${consoleErrors.length} ` +
        `=> ${viewportFailed.length === 0 ? "PASS" : `FAIL (${viewportFailed.length})`}`
    );

    await page.close();
  }

  await inspectFallbacks(browser, state);

  const result = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    products: PRODUCT_COUNT,
    categories: categories.length,
    viewports,
    summary,
    screenshots: state.screenshots,
    checks: state.checks,
    failures: state.failures,
    passed: state.failures.length === 0
  };
  fs.writeFileSync(RESULT_FILE, JSON.stringify(result, null, 2), "utf8");

  console.log(
    `TOPLAM ${state.checks.length} kontrol, ${state.failures.length} başarısız`
  );
  if (state.failures.length > 0) {
    state.failures.forEach((failure) => console.log(`  FAIL: ${failure}`));
  }
  console.log(`Rapor: ${RESULT_FILE}`);
  console.log(
    state.failures.length === 0 ? "TÜM TESTLER GEÇTİ" : "BAZI TESTLER BAŞARISIZ"
  );

  await browser.close();
  process.exit(state.failures.length === 0 ? 0 : 1);
}

function distributionFromIds(rows) {
  return Object.fromEntries(
    rows.map((row) => [row.category, row.count])
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
