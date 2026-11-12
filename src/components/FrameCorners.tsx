export type FrameCornerPosition = "tl" | "tr" | "br" | "bl";

type FrameCornersProps = {
  className?: string;
  corners?: FrameCornerPosition[];
};

const ALL_CORNERS: FrameCornerPosition[] = ["tl", "tr", "br", "bl"];

/**
 * İnce çift çizgili Art Deco köşe işaretleri.
 * Kare köşe yerine kademeli L çizgisi ve küçük elmas kullanır.
 */
export function FrameCorners({
  className = "",
  corners = ALL_CORNERS
}: FrameCornersProps) {
  return (
    <span className={`frame-corners ${className}`.trim()} aria-hidden="true">
      {corners.map((position) => (
        <svg
          key={position}
          className={`frame-corners__corner frame-corners__corner--${position}`}
          viewBox="0 0 40 40"
          fill="none"
          focusable="false"
        >
          <path
            d="M1 27V1h26"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M8 27V8h19"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.48"
          />
          <path
            d="M8 4.6 11.4 8 8 11.4 4.6 8Z"
            fill="currentColor"
            opacity="0.84"
          />
        </svg>
      ))}
    </span>
  );
}
