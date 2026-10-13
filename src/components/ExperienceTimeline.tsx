"use client";

import { useState } from "react";
import { useLang } from "@/i18n/lang-context";
import { COMPANY_COLORS } from "@/data/tech-colors";
import { Section } from "./ui/Section";
import { Panel } from "./ui/Panel";
import { useReveal } from "./ui/use-reveal";
import type { ExperienceEntry } from "@/i18n/dict";

function Entry({
  entry,
  open,
  onToggle,
  toggleLabel,
}: {
  entry: ExperienceEntry;
  open: boolean;
  onToggle: () => void;
  toggleLabel: () => string;
}) {
  const { ref, visible } = useReveal<HTMLLIElement>("-60px");

  /* Cada empresa tiñe su nodo, su hash y su badge HEAD — el grafo
     de git distingue de un vistazo quién es quién. */
  const companyColor = COMPANY_COLORS[entry.company] ?? "var(--brand)";

  return (
    <li ref={ref} data-visible={visible} className="reveal relative pl-9 md:pl-12">
      {/* Nodo del grafo de git: anillo en color de empresa; el HEAD
          va relleno con un halo suave de su color */}
      <span
        aria-hidden
        className={`absolute left-0 top-[19px] size-[15px] rounded-full border-2 ${
          entry.head ? "" : "bg-background"
        }`}
        style={{
          borderColor: companyColor,
          ...(entry.head
            ? {
                backgroundColor: companyColor,
                boxShadow: `0 0 0 4px color-mix(in oklab, ${companyColor} 18%, transparent)`,
              }
            : {}),
        }}
      />
      {/* Hover: borde en accent al 70% — ≥3:1 sobre tarjeta y fondo
          en ambos temas (contraste de estado, WCAG 1.4.11) */}
      <Panel
        className={`transition-colors ${
          open ? "" : "hover:border-accent/70"
        }`}
        style={
          open
            ? {
                borderColor: `color-mix(in oklab, ${companyColor} 55%, transparent)`,
              }
            : undefined
        }
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={toggleLabel()}
          className="press group block w-full cursor-pointer px-4 py-3.5 text-left md:px-5"
        >
          {/* Fila de commit: hash + rol + etiqueta HEAD + toggle diff */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              aria-hidden
              className="font-mono text-[11px] motion-reduce:transition-none"
              style={{ color: companyColor }}
            >
              {entry.hash}
            </span>
            <h3 className="text-[19px] font-semibold tracking-[-0.015em] md:text-[22px]">
              {entry.role}
            </h3>
            {entry.head && (
              <span
                className="rounded-[3px] border px-1.5 py-px font-mono text-[10px] tracking-tight"
                style={{
                  borderColor: `color-mix(in oklab, ${companyColor} 40%, transparent)`,
                  backgroundColor: `color-mix(in oklab, ${companyColor} 12%, transparent)`,
                  color: companyColor,
                }}
              >
                HEAD → main
              </span>
            )}
            {/* Diff: + agrega líneas (verde), − las quita (rojo) */}
            <span
              aria-hidden
              className={`ml-auto select-none font-mono text-[15px] leading-none transition-colors group-hover:text-foreground print:hidden ${
                open ? "text-removed" : "text-added"
              }`}
            >
              <span className={`diff-glyph inline-block ${open ? "rotate-180" : ""}`}>
                {open ? "−" : "+"}
              </span>
            </span>
          </div>
          <p className="mt-1 font-mono text-meta text-muted">
            <span className="text-foreground">{entry.company}</span>
            {" · "}
            {entry.location}
            {" · "}
            {entry.period}
            {" · "}
            <span className="text-foreground">{entry.duration}</span>
          </p>
        </button>
        {/* Logros: se despliegan dentro del panel con borde superior */}
        <div
          className={`exp-panel grid transition-[grid-template-rows] duration-[260ms] [transition-timing-function:var(--ease-out)] motion-reduce:transition-none ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <ul className="overflow-hidden border-t border-rule">
            {entry.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-4 px-4 py-[9px] text-detail text-muted md:px-5 md:[&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-rule/60"
              >
                {/* Cada bullet es una «línea agregada» del diff */}
                <span aria-hidden className="mt-[12px] h-px w-4 shrink-0 bg-added" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </li>
  );
}

export default function ExperienceTimeline() {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section id="experience" title={t.sections.experience}>
      <div className="relative">
        <span aria-hidden className="exp-rail absolute left-[7px] top-3 bottom-3 w-px" />
        <ul className="relative flex flex-col gap-4 md:gap-5">
          {t.experience.map((entry, i) => (
            <Entry
              key={`${entry.company}-${entry.role}`}
              entry={entry}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              toggleLabel={() =>
                `${openIdx === i ? t.experienceToggle.hide : t.experienceToggle.show} ${entry.role}`
              }
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}
