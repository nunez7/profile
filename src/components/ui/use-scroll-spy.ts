"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección activa según el scroll.
 * Regla simple y estable: la última sección cuyo top cruzó el umbral
 * del header (56px) + un respiro de 96px queda como activa.
 */
export function useScrollSpy(ids: string[], offset = 152) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return activeId;
}
