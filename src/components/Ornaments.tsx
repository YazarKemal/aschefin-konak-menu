type OrnamentProps = {
  className?: string;
};

/**
 * Menü başlığında kullanılan merkezi geometrik amblem.
 * Kanat çizgileri, uzun elmas gövde ve içteki dolu elmastan oluşur.
 */
export function SectionEmblem({ className = "" }: OrnamentProps) {
  return (
    <svg
      className={`section-emblem ${className}`.trim()}
      viewBox="0 0 180 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="section-emblem__wing">
        <path d="M2 32h54" stroke="currentColor" strokeWidth="1" />
        <path d="m48 24 8 8-8 8" stroke="currentColor" strokeWidth="1" />
        <path d="M124 32h54" stroke="currentColor" strokeWidth="1" />
        <path d="m132 24-8 8 8 8" stroke="currentColor" strokeWidth="1" />
      </g>
      <g className="section-emblem__core">
        <path
          d="M90 6 106 32 90 58 74 32Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M90 16 98 32 90 48 82 32Z"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <path d="M90 0v6M90 58v6" stroke="currentColor" strokeWidth="1" />
        <path
          d="M90 28.6 93.4 32 90 35.4 86.6 32Z"
          fill="currentColor"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}

/**
 * Bölümler arasında kullanılan ince, ortası elmaslı ayraç.
 */
export function OrnamentDivider({ className = "" }: OrnamentProps) {
  return (
    <div
      className={`ornament-divider ${className}`.trim()}
      aria-hidden="true"
    >
      <span className="ornament-divider__line" />
      <svg
        className="ornament-divider__mark"
        viewBox="0 0 64 16"
        fill="none"
        focusable="false"
      >
        <path d="M0 8h20M44 8h20" stroke="currentColor" strokeWidth="1" />
        <path
          d="M32 1.5 38.5 8 32 14.5 25.5 8Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M32 5.2 34.8 8 32 10.8 29.2 8Z"
          fill="currentColor"
          opacity="0.72"
        />
      </svg>
      <span className="ornament-divider__line" />
    </div>
  );
}
