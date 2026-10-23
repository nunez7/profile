"use client";

import { flushSync } from "react-dom";

/**
 * Ejecuta un cambio de estado dentro de una View Transition del
 * navegador, para que el contenido viejo y el nuevo se fundan en vez
 * de intercambiarse de golpe. Es el caso del cambio de idioma: el dict
 * entero refluye y el crossfade tapa el salto de alturas.
 *
 * `flushSync` garantiza que React ya pintó el texto nuevo cuando el
 * navegador captura el snapshot final. `afterUpdate` corre en ese
 * mismo punto, con el DOM nuevo ya legible: ahí se restaura el ancla
 * de scroll para que el reflujo no cambie el punto de lectura.
 *
 * Sin soporte de la API —o con `prefers-reduced-motion`— el cambio se
 * aplica al instante: el movimiento es opcional, el contenido no.
 *
 * La clase `lang-transition` vive solo lo que dura el fundido y acota
 * el CSS a este caso (el tema tiene su propio crossfade de colores).
 */

type TransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

/* Varios toggles seguidos: el contador evita que el `finished` de una
   transición cancelada retire la clase durante la siguiente. */
let activeTransitions = 0;

export function withViewTransition(update: () => void, afterUpdate?: () => void) {
  if (typeof document === "undefined") {
    update();
    afterUpdate?.();
    return;
  }

  const doc = document as TransitionDocument;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (typeof doc.startViewTransition !== "function" || reduceMotion) {
    update();
    afterUpdate?.();
    return;
  }

  const root = document.documentElement;
  root.classList.add("lang-transition");
  activeTransitions += 1;

  const transition = doc.startViewTransition(() => {
    flushSync(update);
    /* Corre después de que React ya escribió el DOM (y antes del
       snapshot nuevo): aquí se corrige el scroll del cambio de idioma. */
    afterUpdate?.();
  });

  const clear = () => {
    activeTransitions -= 1;
    if (activeTransitions === 0) {
      root.classList.remove("lang-transition");
    }
  };

  /* Si el callback falla, `finished` rechaza: el finally limpia igual
     y el catch evita un unhandled rejection. */
  transition.finished.finally(clear).catch(() => {});
}
