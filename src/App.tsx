import { useEffect, useMemo, useState } from "react";
import {
  menuCategories,
  menuProducts,
  restaurant,
  type CategoryFilter
} from "./data/menu";
import { BrandLockup } from "./components/BrandLockup";
import { FrameCorners } from "./components/FrameCorners";
import { OrnamentDivider, SectionEmblem } from "./components/Ornaments";
import { ProductCard } from "./components/ProductCard";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  CloseIcon,
  PhoneIcon,
  SearchIcon
} from "./components/Icons";
import { useInView } from "./hooks/useInView";
import "./App.css";

const currentYear = new Date().getFullYear();

const heroProduct =
  menuProducts.find((product) => product.id === "soslu-doner") ??
  menuProducts[0];

const normalizeForSearch = (value: string) =>
  value.toLocaleLowerCase("tr").normalize("NFC");

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Tümü");
  const [displayCategory, setDisplayCategory] = useState<CategoryFilter>("Tümü");
  const [transitionKey, setTransitionKey] = useState(0);
  const [search, setSearch] = useState("");

  const {
    ref: menuStageRef,
    inView: isMenuStageInView
  } = useInView<HTMLDivElement>({
    threshold: 0.01,
    rootMargin: "0px 0px -10% 0px"
  });
  const {
    ref: contactRef,
    inView: isContactInView
  } = useInView<HTMLDivElement>({
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px"
  });

  // Kategori çıkışı, görünen içerik henüz değişmemişken aktif seçimden türetilir.
  const isCategoryExiting = activeCategory !== displayCategory;

  useEffect(() => {
    if (activeCategory === displayCategory) {
      return;
    }

    // Azaltılmış harekette çıkış beklemesi yapılmaz; yine de senkron
    // setState'ten kaçınmak için 0 ms'lik bir görev kullanılır.
    const transitionDelay = prefersReducedMotion() ? 0 : 220;

    const timer = window.setTimeout(() => {
      setDisplayCategory(activeCategory);
      setTransitionKey((key) => key + 1);
    }, transitionDelay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeCategory, displayCategory]);

  const filteredProducts = useMemo(() => {
    const term = normalizeForSearch(search.trim());

    return menuProducts.filter((product) => {
      const matchesCategory =
        displayCategory === "Tümü" || product.category === displayCategory;
      const searchableText = normalizeForSearch(
        `${product.name} ${product.category} ${product.description}`
      );
      const matchesSearch = !term || searchableText.includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [displayCategory, search]);

  const hasActiveFilters = activeCategory !== "Tümü" || search.trim() !== "";
  const hasGridFilter =
    displayCategory !== "Tümü" || search.trim() !== "";
  const resultText =
    filteredProducts.length === 0
      ? "Bu filtrede ürün bulunamadı."
      : `${filteredProducts.length} ürün gösteriliyor.`;
  const gridKey = `${displayCategory}-${transitionKey}`;
  const gridClassName = [
    "product-grid",
    isCategoryExiting ? "product-grid--exiting" : "",
    hasGridFilter ? "product-grid--filtered" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const resetFilters = () => {
    setActiveCategory("Tümü");
    setSearch("");
  };

  return (
    <>
      <a className="skip-link" href="#menu">
        Menüye geç
      </a>

      <header className="site-header">
        <div className="site-header__inner container">
          <a
            className="site-header__brand"
            href="#top"
            aria-label={`${restaurant.name} ana sayfa`}
          >
            <BrandLockup />
          </a>

          <div className="site-header__actions">
            <a className="site-header__menu-link" href="#menu">
              Menü
            </a>
            <a
              className="site-header__phone"
              href={restaurant.phoneHref}
              aria-label={`Bizi arayın: ${restaurant.phoneDisplay}`}
            >
              <PhoneIcon className="site-header__phone-icon" />
              <span className="site-header__phone-number">
                {restaurant.phoneDisplay}
              </span>
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__inner container">
            <div className="hero__copy">
              <p className="hero__eyebrow">
                <span className="hero__eyebrow-line" aria-hidden="true" />
                {restaurant.menuLabel}
              </p>

              <h1 id="hero-title" className="hero__title">
                <span className="hero__line">
                  <span>Ateşin ve ustanın</span>
                </span>{" "}
                <span className="hero__line">
                  <span>buluştuğu sofra.</span>
                </span>
              </h1>

              <p className="hero__lede">
                Döner, köfte ve burger; mutfağımızda özenle hazırlanır, sıcak
                servis edilir.
              </p>

              <div className="hero__actions">
                <a className="button button--gold" href="#menu">
                  Menüyü keşfet
                  <ArrowDownIcon className="button__icon" />
                </a>
                <a className="hero__phone-link" href={restaurant.phoneHref}>
                  <PhoneIcon className="hero__phone-icon" />
                  <span>
                    <span className="hero__phone-caption">Telefon</span>
                    {restaurant.phoneDisplay}
                  </span>
                </a>
              </div>

              <dl className="hero__facts">
                <div>
                  <dt>Döner</dt>
                  <dd>Usta işi</dd>
                </div>
                <div>
                  <dt>Köfte</dt>
                  <dd>Izgara</dd>
                </div>
                <div>
                  <dt>Burger</dt>
                  <dd>Sıcak servis</dd>
                </div>
              </dl>
            </div>

            <figure className="hero__visual">
              <div className="hero__art">
                <img
                  className="hero__food"
                  src={heroProduct.image.src}
                  alt={heroProduct.image.alt}
                  width={heroProduct.image.width}
                  height={heroProduct.image.height}
                  fetchPriority="high"
                  decoding="async"
                  draggable={false}
                />
                <span className="hero__art-frame" aria-hidden="true">
                  <FrameCorners corners={["tl", "br"]} />
                </span>
              </div>
              <figcaption className="hero__art-label">
                <span>Menüden</span>
                <strong>{heroProduct.name}</strong>
              </figcaption>
            </figure>
          </div>

          <OrnamentDivider className="hero__divider container" />
        </section>

        <section
          className="menu-section section"
          id="menu"
          aria-labelledby="menu-title"
        >
          <div className="container">
            <div
              ref={menuStageRef}
              className={`menu-stage${isMenuStageInView ? " is-revealed" : ""}`}
            >
              <span
                className="menu-stage__rail menu-stage__rail--top"
                aria-hidden="true"
              />
              <span
                className="menu-stage__rail menu-stage__rail--right"
                aria-hidden="true"
              />
              <span
                className="menu-stage__rail menu-stage__rail--bottom"
                aria-hidden="true"
              />
              <span
                className="menu-stage__rail menu-stage__rail--left"
                aria-hidden="true"
              />
              <span className="menu-stage__gem" aria-hidden="true" />
              <FrameCorners className="menu-stage__corners" />

              <div className="menu-stage__inner">
                <div className="section-heading">
                  <SectionEmblem className="section-heading__emblem" />
                  <p className="section-heading__label">AsChef'in Konak</p>
                  <h2 id="menu-title">Menümüz</h2>
                  <p className="section-heading__copy">
                    Döner, köfte ve burger çeşitlerimizden size uygun olanı
                    seçin. Döner fiyatları gramaj seçeneğine göre
                    belirtilmiştir.
                  </p>
                </div>

                <div className="menu-toolbar">
                  <div
                    className="category-tabs"
                    role="group"
                    aria-label="Menü kategorileri"
                  >
                    {menuCategories.map((category) => {
                      const isActive = activeCategory === category;

                      return (
                        <button
                          key={category}
                          type="button"
                          className="category-tab"
                          aria-pressed={isActive}
                          onClick={() => setActiveCategory(category)}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>

                  <div className="menu-search">
                    <SearchIcon className="menu-search__icon" />
                    <label
                      className="visually-hidden"
                      htmlFor="menu-search-input"
                    >
                      Menüde ara
                    </label>
                    <input
                      id="menu-search-input"
                      className="menu-search__input"
                      type="search"
                      placeholder="Menüde ara"
                      autoComplete="off"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                    {search && (
                      <button
                        type="button"
                        className="menu-search__clear"
                        onClick={() => setSearch("")}
                        aria-label="Aramayı temizle"
                      >
                        <CloseIcon className="menu-search__clear-icon" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="menu-meta">
                  <p
                    className="menu-meta__count"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {resultText}
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      className="menu-meta__reset"
                      onClick={resetFilters}
                    >
                      Filtreleri temizle
                    </button>
                  )}
                </div>

                {filteredProducts.length > 0 ? (
                  <div
                    key={gridKey}
                    className={gridClassName}
                    aria-busy={isCategoryExiting}
                  >
                    {filteredProducts.map((product, index) => (
                      <ProductCard
                        key={`${gridKey}-${product.id}`}
                        product={product}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="menu-empty" key={`empty-${gridKey}`}>
                    <SectionEmblem className="menu-empty__emblem" />
                    <h3>Bu aramada ürün bulamadık.</h3>
                    <p>
                      Farklı bir kategori seçebilir veya aramayı
                      temizleyebilirsiniz.
                    </p>
                    <button
                      type="button"
                      className="button button--outline"
                      onClick={resetFilters}
                    >
                      Tüm menüyü göster
                    </button>
                  </div>
                )}

                <p className="menu-section__note">
                  Güncel menü ve fiyat bilgisi için bizi arayabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section" aria-labelledby="contact-title">
          <div className="container">
            <OrnamentDivider className="contact__divider" />
            <div
              ref={contactRef}
              className={`contact__inner${isContactInView ? " is-visible" : ""}`}
            >
              <FrameCorners className="contact__corners" />

              <div className="contact__emblem" aria-hidden="true">
                <PhoneIcon className="contact__emblem-icon" />
              </div>

              <div className="contact__copy">
                <p className="contact__label">Telefon</p>
                <h2 id="contact-title">Bir telefon kadar yakınız.</h2>
                <p>Menü ve fiyat bilgisi için bize ulaşabilirsiniz.</p>
              </div>

              <a
                className="contact__phone"
                href={restaurant.phoneHref}
                aria-label={`Hemen arayın: ${restaurant.phoneDisplay}`}
              >
                <span className="contact__phone-number">
                  {restaurant.phoneDisplay}
                </span>
                <span className="contact__phone-cta">
                  Hemen ara
                  <ArrowUpRightIcon className="contact__phone-icon" />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner container">
          <a
            className="site-footer__brand"
            href="#top"
            aria-label={`${restaurant.name} ana sayfa`}
          >
            <BrandLockup />
          </a>
          <p className="site-footer__tagline">Döner, köfte ve burger.</p>
          <p className="site-footer__copyright">
            © {currentYear} {restaurant.name}
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
