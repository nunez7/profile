"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
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

type Marker = {
  x: number;
  width: number;
  visible: boolean;
};

/**
 * Ruta de editor dentro del header: `~/cv/<sección>.md` sigue el scroll.
 * Los atajos de sección aparecen solo cuando hay ancho para ellos; en
 * móvil basta la ruta activa para orientarse.
 *
 * El estado activo es una barra de 2px que se desliza entre archivos.
 * Se mide con `getBoundingClientRect` y se mueve con `transform` (solo
 * compositor), no con `left`/`width`. La primera medición ocurre antes
 * del paint y las siguientes se animan a 220ms.
 */
export default function Breadcrumb() {
  const { lang, t } = useLang();
  const ids = useMemo(() => ["top", ...SECTION_IDS], []);
  const activeId = useScrollSpy(ids);
  const shortcutsRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState<Marker>({
    x: 0,
    width: 0,
    visible: false,
  });

  /* Re-mide al cambiar de sección, de idioma (los nombres de archivo
     cambian de ancho), al redimensionar y cuando cargan las fuentes. */
  useLayoutEffect(() => {
    const shortcuts = shortcutsRef.current;
    if (!shortcuts) return;

    const measure = () => {
      const active = shortcuts.querySelector<HTMLElement>(
        '[aria-current="location"]',
      );
      if (!active) {
        setMarker((prev) => (prev.visible ? { ...prev, visible: false } : prev));
        return;
      }

      const base = shortcuts.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      const next: Marker = {
        x: rect.left - base.left,
        width: rect.width,
        visible: true,
      };

      setMarker((prev) =>
        prev.visible === next.visible &&
        prev.x === next.x &&
        prev.width === next.width
          ? prev
          : next,
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(shortcuts);
    const active = shortcuts.querySelector<HTMLElement>(
      '[aria-current="location"]',
    );
    if (active) observer.observe(active);

    void document.fonts.ready.then(measure);

    return () => observer.disconnect();
  }, [activeId, lang]);

  const fileFor = (id: SectionId) => `${t.sections[id].toLowerCase()}.md`;

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
          <span className="min-w-0 truncate text-accent">{activeFile}</span>
        </p>

        {/* Atajos de sección: solo cuando el header tiene ancho */}
        <div ref={shortcutsRef} className="relative hidden shrink-0 lg:block">
          {/* Barra activa: 1px de ancho escalado al ancho del enlace.
              Decorativa — el estado real es `aria-current` + color. */}
          <span
            aria-hidden
            className="nav-marker pointer-events-none absolute bottom-[-4px] left-0 h-[2px] w-px origin-left bg-accent"
            style={{
              transform: `translateX(${marker.x}px) scaleX(${marker.width})`,
              opacity: marker.visible ? 1 : 0,
            }}
          />
          <ul className="flex items-center gap-3">
            {SECTION_IDS.map((id) => {
              const file = fileFor(id);
              const active = activeId === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active ? "location" : undefined}
                    /* El nombre visible es el archivo; para AT el enlace
                       se anuncia con el nombre de la sección. */
                    aria-label={t.sections[id]}
                    className={`press tap-target flex min-h-6 items-center gap-1 font-mono text-[12px] transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {file}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
