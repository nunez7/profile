"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Revela un elemento una sola vez cuando entra al viewport.
 * Devuelve la ref para colocarla en el elemento raíz.
 */
export function useReveal<T extends HTMLElement>(rootMargin = "-40px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}
