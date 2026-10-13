"use client";

import { useLang } from "@/i18n/lang-context";
import { STACK_HUES, TECH_COLORS } from "@/data/tech-colors";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { Panel } from "./ui/Panel";

/**
 * Stack como manifiesto de dependencias: cada grupo es un panel con
 * filas alineadas — punto de color de marca, nombre y su categoría
 * (hue) como regla superior. Jerarquía: grupos `primary` en lead.
 */
export default function Stack() {
  const { t } = useLang();

  return (
    <Section id="stack" title={t.sections.stack}>
      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.stack.map((group, i) => {
          const hue = STACK_HUES[group.id] ?? "var(--rule)";
          return (
            <Reveal key={group.id} delay={i * 60}>
              {/* Regla de categoría: 2px en el hue del grupo */}
              <Panel className="h-full overflow-hidden border-t-2" style={{ borderTopColor: hue }}>
                <h3 className="subhead border-b border-rule px-4 py-2.5">
                  {group.label}
                </h3>
                <ul>
                  {group.items.map((item) => {
                    const dot = TECH_COLORS[item];
                    return (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 border-b border-rule px-4 py-2 last:border-b-0"
                      >
                        {dot ? (
                          <span
                            aria-hidden
                            className="size-[9px] shrink-0 rounded-full"
                            style={{ backgroundColor: dot }}
                          />
                        ) : (
                          /* Las prácticas no son «tecnología»: van sin punto,
                             marcadas con un guión mono para alinear la columna */
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
