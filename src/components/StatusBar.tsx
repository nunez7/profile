"use client";

import { useLang } from "@/i18n/lang-context";

const GIT_BRANCH_ICON = (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3"
  >
    <circle cx="4" cy="3.5" r="1.75" />
    <circle cx="4" cy="12.5" r="1.75" />
    <circle cx="12" cy="5.5" r="1.75" />
    <path d="M4 5.25v5.5M12 7.25c0 2.5-2 3.25-4.5 3.75" />
  </svg>
);

/**
 * Barra de estado inferior estilo editor: rama, encoding, idioma y
 * disponibilidad. Puro ambiente de herramienta — se oculta en print
 * y el `body` ya reserva su altura para que no tape el contenido.
 */
export default function StatusBar() {
  const { lang, t } = useLang();

  return (
    <div
      aria-hidden
      className="no-print fixed inset-x-0 bottom-0 z-10 border-t border-rule bg-surface"
    >
      <div className="mx-auto flex h-7 w-full max-w-cv items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-4 font-mono text-[11px] text-muted">
          <span className="flex items-center gap-1.5 text-muted">
            {GIT_BRANCH_ICON}
            {t.statusBar.branch}
          </span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden md:inline">LF</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="size-[7px] rounded-full bg-added motion-safe:animate-pulse"
            />
            {t.statusBar.available}
          </span>
          <span>TSX</span>
          <span className="uppercase">{lang}</span>
        </div>
      </div>
    </div>
  );
}
