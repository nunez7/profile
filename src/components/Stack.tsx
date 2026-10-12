"use client";

import { useLang } from "@/i18n/lang-context";
import { STACK_HUES, TECH_COLORS } from "@/data/tech-colors";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";

export default function Stack() {
  const { t } = useLang();

  return (
    <Section title={t.sections.stack}>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {t.stack.map((group, i) => {
          const hue = STACK_HUES[group.id] ?? "var(--rule)";
          return (
            <Reveal key={group.id} delay={i * 60}>
              {/* Regla de categoría: 2px en el hue del grupo */}
              <div
                className="border-t-2 pt-4"
                style={{ borderTopColor: hue }}
              >
                <h3 className="subhead">{group.label}</h3>
                <ul
                  className={
                    group.primary
                      ? "mt-3 flex flex-wrap gap-x-5 gap-y-2 text-lead font-medium tracking-[-0.01em]"
                      : "mt-3 flex flex-wrap gap-x-5 gap-y-2 text-detail text-muted"
                  }
                >
                  {group.items.map((item) => {
                    const dot = TECH_COLORS[item];
                    return (
                      <li key={item} className="flex items-center gap-2">
                        {dot && (
                          <span
                            aria-hidden
                            className="size-[9px] shrink-0 rounded-full"
                            style={{ backgroundColor: dot }}
                          />
                        )}
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
