"use client";

import { useLang } from "@/i18n/lang-context";
import { langs } from "@/i18n/dict";

export default function Header() {
  const { lang, setLang } = useLang();

  return (
    <header className="no-print sticky top-0 z-10 border-b border-hairline bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-[1080px] items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-tight text-ink"
        >
          FJN<span className="text-cobalt">.</span>
        </a>
        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Idioma / Language"
        >
          {langs.map((l, i) => (
            <span key={l} className="flex items-center gap-1">
              {i > 0 && (
                <span aria-hidden className="text-hairline">
                  /
                </span>
              )}
              <button
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-1.5 py-0.5 font-mono text-[13px] transition-colors ${
                  lang === l
                    ? "text-ink underline decoration-cobalt decoration-2 underline-offset-4"
                    : "text-graphite hover:text-ink"
                }`}
              >
                {l}
              </button>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
