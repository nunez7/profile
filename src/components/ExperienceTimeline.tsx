"use client";

import { useState, useSyncExternalStore } from "react";
import { useLang } from "@/i18n/lang-context";
import { COMPANY_COLORS, TECH_COLORS } from "@/data/tech-colors";
import { Section } from "./ui/Section";
import { Panel } from "./ui/Panel";
import { PendingText } from "./ui/PendingText";
import { useReveal } from "./ui/use-reveal";
import type { ExperienceEntry } from "@/i18n/dict";

function Entry({
  entry,
  open,
  onToggle,
  toggleLabel,
  techLabel,
  index,
}: {
  entry: ExperienceEntry;
  open: boolean;
  onToggle: () => void;
  toggleLabel: () => string;
  techLabel: string;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLLIElement>("-60px");

  /* Cada empresa tiñe su nodo, su hash y su badge HEAD — el grafo
     de git distingue de un vistazo quién es quién. */
  const companyColor = COMPANY_COLORS[entry.company] ?? "var(--brand)";

  return (
    <li
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${index * 60}ms` }}
      className="reveal relative pl-9 md:pl-12"
    >
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
      {/* Hover (solo puntero fino, vía .panel-hover): borde al color de
          empresa + elevación un rung. El hue viaja en --panel-hue; el
          borde de la entrada abierta lo fija el style inline y manda. */}
      <Panel hoverHue={companyColor}>
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
                className="rounded-[3px] border px-1.5 py-px font-mono text-[11px] tracking-tight"
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
        {/* Chips de tecnologías: fuera del <button> para que el
            aria-label del toggle no los oculte a lectores de pantalla.
            Visibles también con la entrada plegada — el reclutador ve
            el stack sin abrir el acordeón. */}
        <ul
          aria-label={techLabel}
          className="flex flex-wrap gap-1.5 px-4 pb-3 md:px-5"
        >
          {entry.tech.map((tech) => (
            <li
              key={tech}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-[3px] border border-rule bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              <span
                aria-hidden
                className="size-[6px] shrink-0 rounded-full"
                style={{ backgroundColor: TECH_COLORS[tech] ?? companyColor }}
              />
              {tech}
            </li>
          ))}
        </ul>
        {/* Logros: se despliegan dentro del panel con borde superior.
            Entrada y salida asimétricas (260/200ms): abrir tarda en
            mostrar contenido, cerrar debe despejar la vista ya. */}
        <div
          className={`exp-panel grid [transition-timing-function:var(--ease-out)] motion-reduce:transition-none ${
            open
              ? "grid-rows-[1fr] transition-[grid-template-rows] duration-[260ms]"
              : "grid-rows-[0fr] transition-[grid-template-rows] duration-[200ms]"
          }`}
        >
          <ul className="overflow-hidden border-t border-rule">
            {entry.bullets.map((bullet, i) => (
              <li
                key={bullet}
                className={`flex gap-4 px-4 py-[9px] text-detail text-muted transition-[opacity,transform] duration-200 [transition-timing-function:var(--ease-out)] motion-reduce:transition-none md:px-5 md:[&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-rule/60 ${
                  /* Al colapsar no hay delay (style ausente): los bullets
                     se van con el contenedor, no en oleada tras el cierre */
                  open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
                style={open ? { transitionDelay: `${i * 30}ms` } : undefined}
              >
                {/* Cada bullet es una «línea agregada» del diff */}
                <span aria-hidden className="mt-[12px] h-px w-4 shrink-0 bg-added" />
                <span>
                  <PendingText text={bullet} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </li>
  );
}

/* Viewport estrecho como external store (patrón de theme-context):
   el servidor snapshot «no estrecho» hidrata con la primera entrada
   abierta; el cliente corrige sin setState dentro de un effect, y el
   MediaQueryList se cachea para no recrearlo en cada snapshot. */
let narrowMq: MediaQueryList | null = null;

function getNarrowMq(): MediaQueryList {
  narrowMq ??= window.matchMedia("(max-width: 767px)");
  return narrowMq;
}

function subscribeNarrow(onChange: () => void) {
  const mq = getNarrowMq();
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function ExperienceTimeline() {
  const { t } = useLang();

  /* En pantallas estrechas el escaneo empieza con las tres entradas
     plegadas: la primera abierta empujaba el resto fuera de vista
     (6 pantallas de bullets antes del segundo puesto). Una vez el
     usuario hace toggle, su elección manda sobre el viewport. */
  const isNarrow = useSyncExternalStore(
    subscribeNarrow,
    () => getNarrowMq().matches,
    () => false,
  );
  const [userChoice, setUserChoice] = useState<number | null | undefined>(
    undefined,
  );
  const openIdx =
    userChoice === undefined ? (isNarrow ? null : 0) : userChoice;

  return (
    <Section id="experience" title={t.sections.experience} tone="band">
      <div className="relative">
        <span aria-hidden className="exp-rail absolute left-[7px] top-3 bottom-3 w-px" />
        <ul className="relative flex flex-col gap-4 md:gap-5">
          {t.experience.map((entry, i) => (
            <Entry
              key={`${entry.company}-${entry.role}`}
              entry={entry}
              index={i}
              open={openIdx === i}
              techLabel={t.experienceTechLabel}
              onToggle={() => setUserChoice(openIdx === i ? null : i)}
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
