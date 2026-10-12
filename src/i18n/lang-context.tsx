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

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore<Lang>(
    subscribe,
    readStoredLang,
    () => "es",
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    storeLang(next);
  }, []);

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
