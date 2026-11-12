import { useState, type CSSProperties } from "react";
import { formatPrice, restaurant, type MenuProduct } from "../data/menu";
import { useInView } from "../hooks/useInView";
import { FrameCorners } from "./FrameCorners";
import { ArrowUpRightIcon, PhoneIcon } from "./Icons";

type ProductCardProps = {
  product: MenuProduct;
  index: number;
};

export function ProductCard({ product, index }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0.12,
    rootMargin: "0px 0px -4% 0px"
  });
  const showImage = !imageFailed;
  const headingId = `product-${product.id}-title`;
  const singlePrice = product.price;

  return (
    <article
      ref={ref}
      className={[
        "product-card",
        `product-card--${product.layout}`,
        inView ? "is-visible" : ""
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--card-index": index } as CSSProperties}
      aria-labelledby={headingId}
      data-category={product.category}
      data-layout={product.layout}
      data-reveal={product.reveal}
    >
      <span className="product-card__frame" aria-hidden="true">
        <FrameCorners corners={["tr", "bl"]} />
      </span>

      <div className="product-card__layout">
        <div className="product-card__visual">
          {showImage ? (
            <img
              className="product-card__photo"
              src={product.image.src}
              alt={product.image.alt}
              width={product.image.width}
              height={product.image.height}
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className="product-card__fallback" aria-hidden="true">
              <span className="product-card__fallback-ring" />
              <span className="product-card__fallback-label">
                AsChef'in Konak
              </span>
            </span>
          )}
          <span className="product-card__category">{product.category}</span>
          <span className="product-card__visual-corner" aria-hidden="true" />
        </div>

        <div className="product-card__body">
          <div className="product-card__heading">
            <h3 id={headingId} className="product-card__title">
              {product.name}
            </h3>
            <span className="product-card__rule" aria-hidden="true" />
          </div>

          <p className="product-card__description">{product.description}</p>

          <div className="product-card__footer">
            {product.prices ? (
              <div
                className="price-plate"
                role="group"
                aria-label={`${product.name} fiyat seçenekleri`}
              >
                <span className="price-plate__gem" aria-hidden="true" />
                {product.prices.map((option) => (
                  <div className="price-row" key={option.label}>
                    <span className="price-row__label">{option.label}</span>
                    <span className="price-row__rule" aria-hidden="true" />
                    <span className="price-row__amount">
                      {formatPrice(option.price)}
                      <span className="price-row__currency">TL</span>
                    </span>
                  </div>
                ))}
              </div>
            ) : singlePrice !== undefined ? (
              <div
                className="price-plate price-plate--single"
                role="group"
                aria-label={`${product.name} fiyatı`}
              >
                <span className="price-plate__gem" aria-hidden="true" />
                <div className="price-row">
                  <span className="price-row__label">Fiyat</span>
                  <span className="price-row__rule" aria-hidden="true" />
                  <span className="price-row__amount">
                    {formatPrice(singlePrice)}
                    <span className="price-row__currency">TL</span>
                  </span>
                </div>
              </div>
            ) : (
              <a
                className="product-card__ask"
                href={restaurant.phoneHref}
                aria-label={`${product.name} için fiyat bilgisi alın: ${restaurant.phoneDisplay}`}
              >
                <PhoneIcon className="product-card__ask-icon" />
                <span className="product-card__ask-text">
                  Fiyat bilgisi için arayın
                </span>
                <ArrowUpRightIcon className="product-card__ask-arrow" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
