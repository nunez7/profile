"use client";

import { useLang } from "@/i18n/lang-context";
import { STACK_HUES, TECH_COLORS } from "@/data/tech-colors";
import { TECH_ICONS } from "@/data/tech-icons";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { Panel } from "./ui/Panel";

/**
 * Stack como manifiesto de dependencias: cada grupo es un panel con
 * filas alineadas — icono de la tecnología en su color de marca,
 * nombre y su categoría (hue) como regla superior. Jerarquía:
 * grupos `primary` en lead. Cada tarjeta mide su contenido.
 */
export default function Stack() {
  const { t } = useLang();

  return (
    <Section id="stack" title={t.sections.stack}>
      <div className="grid items-start gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.stack.map((group, i) => {
          const hue = STACK_HUES[group.id] ?? "var(--rule)";
          /* Backend (8 items) ocupa dos filas: el grupo más alto
             sostiene la tercera columna y elimina los huecos que
             dejaba el auto-placement contra grupos de 3 items */
          return (
            <Reveal
              key={group.id}
              delay={i * 60}
              className={group.id === "backend" ? "sm:row-span-2" : undefined}
            >
              {/* Regla de categoría: 2px en el hue del grupo */}
              <Panel flat hue={hue} className="overflow-hidden">
                <h3 className="subhead border-b border-rule px-4 py-2.5">
                  {group.label}
                </h3>
                <ul>
                  {group.items.map((item) => {
                    const color = TECH_COLORS[item];
                    const icon = TECH_ICONS[item];
                    return (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 border-b border-rule px-4 py-2 last:border-b-0"
                      >
                        {icon ? (
                          /* Icono de simple-icons tiñendo con el color
                             de marca real de la tecnología */
                          <svg
                            aria-hidden
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-[14px] shrink-0"
                            style={{ color: color ?? "var(--muted)" }}
                          >
                            <path d={icon} />
                          </svg>
                        ) : color ? (
                          <span
                            aria-hidden
                            className="size-[9px] shrink-0 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ) : (
                          /* Las prácticas no son «tecnología»: van sin
                             icono ni punto, marcadas con un guión mono
                             para alinear la columna */
                          <span
                            aria-hidden
                            className="w-[9px] shrink-0 text-center font-mono text-meta text-rule"
                          >
                            —
                          </span>
                        )}
                        <span
                          className={
                            group.primary
                              ? "text-lead font-medium tracking-[-0.01em]"
                              : "text-detail text-muted"
                          }
                        >
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Panel>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
