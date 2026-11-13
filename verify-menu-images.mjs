/**
 * Playwright doğrulama betiği — AsChef'in Konak ürün görselleri.
 *
 * Çalıştırma (tarayıcı kurulumu olan bir makinede):
 *   npm run dev   (ayrı bir terminalde)
 *   npx playwright install chromium
 *   node verify-menu-images.mjs
 *
 * BASE_URL ortam değişkeni ile farklı bir sunucuya işaret edilebilir.
 */
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:5173";
const PRODUCT_COUNT = 7;

const viewports = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

async function revealAll(page) {
  await page.evaluate(async () => {
    const scroller = document.scrollingElement ?? document.documentElement;
    for (let y = 0; y <= scroller.scrollHeight; y += 350) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
}

async function main() {
  const browser = await chromium.launch();
  let allPass = true;

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.waitForSelector(".product-card", { timeout: 15000 });
    await revealAll(page);
    await page.waitForTimeout(900);

    const report = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll(".product-card__photo")];
      const loaded = imgs.filter((i) => i.complete && i.naturalWidth > 0).length;

      const objectFit = imgs.length
        ? getComputedStyle(imgs[0]).objectFit
        : "n/a";

      const containment = imgs.map((img) => {
        const visual = img.closest(".product-card__visual");
        const card = img.closest(".product-card");
        const ir = img.getBoundingClientRect();
        const vr = visual.getBoundingClientRect();
        const cr = card.getBoundingClientRect();
        return {
          alt: img.getAttribute("alt") ?? "?",
          withinVisual:
            ir.left >= vr.left - 1 &&
            ir.right <= vr.right + 1 &&
            ir.top >= vr.top - 1 &&
            ir.bottom <= vr.bottom + 1,
          withinCard:
            ir.left >= cr.left - 1 &&
            ir.right <= cr.right + 1 &&
            ir.top >= cr.top - 1 &&
            ir.bottom <= cr.bottom + 1,
        };
      });

      const doc = document.documentElement;
      const horizOverflow = Math.max(
        0,
        doc.scrollWidth - doc.clientWidth
      );

      return {
        loaded,
        total: imgs.length,
        objectFit,
        containment,
        horizOverflow,
      };
    });

    const allLoaded = report.loaded === PRODUCT_COUNT && report.total === PRODUCT_COUNT;
    const allContained = report.containment.every(
      (c) => c.withinVisual && c.withinCard
    );
    const noOverflow = report.horizOverflow <= 1;
    const pass = allLoaded && allContained && noOverflow && report.objectFit === "contain";
    if (!pass) allPass = false;

    console.log(
      `[${vp.name}] yüklendi=${report.loaded}/${PRODUCT_COUNT} ` +
        `object-fit=${report.objectFit} taşma=${report.horizOverflow}px ` +
        `=> ${pass ? "PASS" : "FAIL"}`
    );

    if (!allContained) {
      report.containment
        .filter((c) => !c.withinVisual || !c.withinCard)
        .forEach((c) =>
          console.log(`   !! kapsam dışı: ${c.alt}`)
        );
    }

    await page.close();
  }

  await browser.close();
  console.log(allPass ? "TÜM TESTLER GEÇTİ" : "BAZI TESTLER BAŞARISIZ");
  process.exit(allPass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
