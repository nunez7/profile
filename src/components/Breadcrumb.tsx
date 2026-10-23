"use client";

import { useMemo } from "react";
import { useLang } from "@/i18n/lang-context";
import { useScrollSpy } from "./ui/use-scroll-spy";

type SectionId = "summary" | "stack" | "experience" | "education" | "contact";

const SECTION_IDS: SectionId[] = [
  "summary",
  "stack",
  "experience",
  "education",
  "contact",
];

/**
 * Ruta de editor dentro del header: `~/cv/<sección>.md` sigue el scroll.
 * Los atajos de sección aparecen solo cuando hay ancho para ellos; en
 * móvil basta la ruta activa para orientarse.
 */
export default function Breadcrumb() {
  const { t } = useLang();
  const ids = useMemo(() => ["top", ...SECTION_IDS], []);
  const activeId = useScrollSpy(ids);

  const fileFor = (id: SectionId) => {
    switch (id) {
      case "summary":
        return `${t.sections.summary.toLowerCase()}.md`;
      case "stack":
        return `${t.sections.stack.toLowerCase()}.md`;
      case "experience":
        return `${t.sections.experience.toLowerCase()}.md`;
      case "education":
        return `${t.sections.education.toLowerCase()}.md`;
      case "contact":
        return `${t.sections.contact.toLowerCase()}.md`;
    }
  };

  const activeFile =
    activeId === "top" ? t.nav.home : fileFor(activeId as SectionId);

  return (
    <nav aria-label={t.nav.ariaLabel} className="min-w-0 flex-1">
      <div className="flex min-w-0 items-center justify-between gap-4">
        {/* Ruta activa */}
        <p className="flex min-w-0 items-center gap-1 font-mono text-[12px] text-muted">
          <span aria-hidden className="hidden shrink-0 sm:inline">
            ~/cv/
          </span>
          <span
            className="min-w-0 truncate text-accent"
            aria-current="location"
          >
            {activeFile}
          </span>
        </p>

        {/* Atajos de sección: solo cuando el header tiene ancho */}
        <ul className="hidden shrink-0 items-center gap-3 lg:flex">
          {SECTION_IDS.map((id) => {
            const file = fileFor(id);
            const active = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active ? "location" : undefined}
                  className={`press flex min-h-6 items-center gap-1 font-mono text-[12px] transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {file}
                  {active && (
                    <span
                      aria-hidden
                      className="inline-block size-1 rounded-full bg-accent"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
