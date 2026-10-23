"use client";

import { useLang } from "@/i18n/lang-context";
import { useTheme, type Theme } from "@/theme/theme-context";
import { langs } from "@/i18n/dict";
import { Container } from "./ui/Container";
import Breadcrumb from "./Breadcrumb";

const ICON = "size-4";

function MoonIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={ICON}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={ICON}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
    </svg>
  );
}

/** Icono de tema con morph: luna y sol apilados, giran y se funden. */
function ThemeIcon({ theme }: { theme: Theme }) {
  const base =
    "absolute inset-0 transition-[opacity,transform] duration-300 [transition-timing-function:var(--ease-in-out)] motion-reduce:transition-none";
  return (
    <span className="relative block size-4">
      <span
        className={`${base} ${theme === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
      >
        <MoonIcon />
      </span>
      <span
        className={`${base} ${theme === "dark" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`}
      >
        <SunIcon />
      </span>
    </span>
  );
}

export default function Header() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="no-print sticky top-0 z-30 border-b border-rule bg-background/95 backdrop-blur-sm">
      <Container className="flex h-14 items-center gap-3">
        <a
          href="#top"
          className="flex min-h-8 shrink-0 items-center font-mono text-sm font-medium tracking-tight text-foreground"
        >
          FJN<span className="text-accent">.</span>
        </a>
        <Breadcrumb />
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <div
            className="flex items-center gap-0.5"
            role="group"
            aria-label="Idioma / Language"
          >
            {langs.map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden className="px-0.5 text-rule">
                    /
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`press tap-target flex min-h-8 min-w-8 items-center justify-center px-1.5 font-mono text-[12px] transition-colors ${
                    lang === l
                      ? "text-foreground underline decoration-accent decoration-2 underline-offset-4"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light" ? t.header.themeToDark : t.header.themeToLight
            }
            className="press tap-target flex size-9 items-center justify-center rounded-panel border border-rule text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ThemeIcon theme={theme} />
          </button>
        </div>
      </Container>
    </header>
  );
}
