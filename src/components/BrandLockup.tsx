import { restaurant } from "../data/menu";

type BrandLockupProps = {
  className?: string;
};

export function BrandLockup({ className = "" }: BrandLockupProps) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <img
        className="brand-lockup__emblem"
        src={restaurant.emblem.src}
        alt=""
        width={restaurant.emblem.width}
        height={restaurant.emblem.height}
        decoding="async"
        draggable="false"
      />
      <span className="brand-lockup__rule" aria-hidden="true" />
      <img
        className="brand-lockup__wordmark"
        src={restaurant.wordmark.src}
        alt={restaurant.name}
        width={restaurant.wordmark.width}
        height={restaurant.wordmark.height}
        decoding="async"
        draggable="false"
      />
    </span>
  );
}
