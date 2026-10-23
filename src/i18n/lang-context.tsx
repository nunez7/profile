"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dict, type Dict, type Lang } from "./dict";
import { withViewTransition } from "@/components/ui/with-view-transition";
import {
  captureScrollAnchor,
  restoreScrollAnchor,
} from "@/components/ui/scroll-anchor";

const STORAGE_KEY = "cv-lang";

const listeners = new Set<() => void>();

function readStoredLang(): Lang {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "en" ? "en" : "es";
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  // Cambios desde otras pestañas
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function storeLang(next: Lang) {
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

type LangContextValue = {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: Readonly<{ children: ReactNode }>) {
  const lang = useSyncExternalStore<Lang>(
    subscribe,
    readStoredLang,
    () => "es",
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      /* Volver a pulsar el idioma activo no debe disparar un fundido. */
      if (next === lang) return;

      /* El cambio de idioma refluye todo el CV (títulos, roles, rutas):
         lo cruzamos con una View Transition para que el reflujo no se
         lea como un salto, y devolvemos el scroll al mismo punto de
         lectura. Sin soporte o con reduced motion, directo. */
      const anchor = captureScrollAnchor();
      withViewTransition(
        () => {
          document.documentElement.lang = next;
          storeLang(next);
        },
        () => restoreScrollAnchor(anchor),
      );
    },
    [lang],
  );

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      t: dict[lang],
      setLang,
      toggleLang: () => setLang(lang === "es" ? "en" : "es"),
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider");
  }
  return ctx;
}
