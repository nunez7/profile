"use client";

/**
 * Ancla de lectura para cambios que refluyen la página (idioma).
 * Captura el elemento que cruza una línea bajo el header sticky y su
 * offset; después del cambio, corrige el scroll para que ese mismo
 * elemento quede a la misma altura. Así el lector no aterriza en otra
 * sección aunque los textos ES/EN midan distinto.
 */

const SECTION_SELECTOR =
  "#top, #summary, #stack, #experience, #education, #contact";

/* Suficientemente abajo para no tocar el header sticky (56px). */
const ANCHOR_LINE = 160;

export type ScrollAnchor = {
  node: Element | null;
  section: Element | null;
  top: number;
};

export function captureScrollAnchor(): ScrollAnchor | null {
  if (typeof document === "undefined") return null;

  const hit = document.elementFromPoint(
    Math.min(200, window.innerWidth / 2),
    ANCHOR_LINE,
  );
  const section = hit?.closest(SECTION_SELECTOR) ?? null;
  const node =
    hit && hit !== document.documentElement && hit !== document.body
      ? hit
      : section;

  if (!node && !section) return null;

  return {
    node,
    section,
    top: (node ?? section)!.getBoundingClientRect().top,
  };
}

export function restoreScrollAnchor(anchor: ScrollAnchor | null) {
  if (!anchor) return;

  const node = anchor.node?.isConnected
    ? anchor.node
    : anchor.section?.isConnected
      ? anchor.section
      : null;
  if (!node) return;

  const delta = node.getBoundingClientRect().top - anchor.top;
  if (Math.abs(delta) >= 1) {
    window.scrollBy(0, delta);
  }
}
