"use client";

import { useLang } from "@/i18n/lang-context";
import { STACK_HUES, TECH_COLORS } from "@/data/tech-colors";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { Panel } from "./ui/Panel";

/**
 * Stack como manifiesto de dependencias: cada grupo es un panel con
 * filas alineadas. Un único marcador —punto de 9px en el color real de
 * la tecnología, o el hue de la categoría cuando no hay color— y una
 * sola escala tipográfica para las cinco categorías.
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
              {/* Regla de categoría: 2px en el hue del grupo; en hover,
                  todo el borde se tiñe con ese mismo hue y la tarjeta
                  se eleva (solo puntero fino) */}
              <Panel flat hue={hue} hoverHue={hue} className="overflow-hidden">
                <h3 className="subhead border-b border-rule px-4 py-2.5">
                  {group.label}
                </h3>
                <ul>
                  {group.items.map((item) => {
                    const color = TECH_COLORS[item] ?? hue;
                    return (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 border-b border-rule px-4 py-2 last:border-b-0"
                      >
                        <span
                          aria-hidden
                          className="size-[9px] shrink-0 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-detail font-medium tracking-[-0.005em] text-foreground">
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
