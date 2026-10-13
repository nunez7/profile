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
 * Breadcrumb de editor bajo el header: ruta `~/cv/<sección>.md` que
 * sigue el scroll + atajos a secciones en desktop. La ruta usa el
 * label localizado de cada sección (es contenido, vive en el dict).
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

  const activeFile = activeId === "top" ? t.nav.home : fileFor(activeId as SectionId);

  return (
    <nav
      aria-label={t.nav.ariaLabel}
      className="no-print border-t border-rule bg-background/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-8 w-full max-w-cv items-center justify-between px-6 md:px-10">
        {/* Ruta activa */}
        <p className="flex items-center gap-1 font-mono text-[11px] text-muted">
          <span aria-hidden>~/cv/</span>
          <span className="text-accent" aria-current="location">
            {activeFile}
          </span>
        </p>

        {/* Atajos de sección (solo desktop; en mobile la ruta basta) */}
        <ul className="hidden items-center gap-4 md:flex">
          {SECTION_IDS.map((id) => {
            const file = fileFor(id);
            const active = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active ? "location" : undefined}
                  className={`press font-mono text-[11px] transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {file}
                  <span aria-hidden className="text-accent">
                    {active ? " ●" : ""}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
