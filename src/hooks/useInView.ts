import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * Görünüm alanına giren öğeleri tek seferlik işaretler.
 * Animasyonlar CSS'te yürür; bu kanca yalnızca tetikleyici sınıfı sağlar.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.16,
  rootMargin = "0px 0px -6% 0px",
  once = true
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  // IntersectionObserver yoksa içerik başlangıçtan görünür kalmalı.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setInView(true);

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
