"use client";

import { useLang } from "@/i18n/lang-context";
import { Panel } from "./ui/Panel";

/**
 * Ventana de editor con el «perfil» como archivo `profile.ts`.
 * Es el artefacto del hero: syntax highlighting ganado por contenido —
 * keyword en accent, strings en `--added`, puntuación en muted.
 * Todo el copy viene del dict; los nombres de propiedad son tokens
 * de código (role/years/…) idénticos en ambos idiomas.
 */
export default function ProfileWindow() {
  const { t } = useLang();
  const c = t.hero.code;

  return (
    <div className="animate-rise" style={{ animationDelay: "300ms" }}>
      <Panel className="overflow-hidden">
        {/* Chrome de editor: semáforo + pestaña activa */}
        <div className="flex h-9 items-center gap-2 border-b border-rule px-3">
          <span aria-hidden className="flex items-center gap-1.5">
            <span className="size-[9px] rounded-full bg-rule" />
            <span className="size-[9px] rounded-full bg-rule" />
            <span className="size-[9px] rounded-full bg-rule" />
          </span>
          <span className="ml-1 rounded-[4px] border border-b-2 border-rule border-b-accent bg-background px-2 py-0.5 font-mono text-[11px] text-foreground">
            profile.ts
          </span>
        </div>

        {/* Contenido del archivo */}
        <div className="overflow-x-auto px-4 py-4 md:px-5">
          <p className="whitespace-pre font-mono text-[12px] leading-[1.75] md:text-[12.5px]">
            <span className="text-accent">$</span>{" "}
            <span className="text-foreground">{c.prompt}</span>
          </p>

          <p className="mt-3 whitespace-pre font-mono text-[12px] leading-[1.75] md:text-[12.5px]">
            <span className="text-accent">interface</span>{" "}
            <span className="font-medium text-foreground">Profile</span>{" "}
            <span className="text-muted">{"{"}</span>
          </p>
          <p className="whitespace-pre pl-4 font-mono text-[12px] leading-[1.75] md:text-[12.5px]">
            <span className="text-foreground">{"role:    "}</span>
            <span className="text-added">{`"${t.hero.role}"`}</span>
          </p>
          <p className="whitespace-pre pl-4 font-mono text-[12px] leading-[1.75] md:text-[12.5px]">
            <span className="text-foreground">{"years:   "}</span>
            <span className="text-added">{`"${c.years}"`}</span>
          </p>
          <p className="whitespace-pre pl-4 font-mono text-[12px] leading-[1.75] md:text-[12.5px]">
            <span className="text-foreground">{"location:"}</span>
            <span className="text-added">{` "${c.location}"`}</span>
          </p>
          <p className="whitespace-pre pl-4 font-mono text-[12px] leading-[1.75] md:text-[12.5px]">
            <span className="text-foreground">{"stack:   "}</span>
            <span className="text-muted">[</span>
            {c.stack.map((tech, i) => (
              <span key={tech}>
                <span className="text-added">{`"${tech}"`}</span>
                {i < c.stack.length - 1 && <span className="text-muted">, </span>}
              </span>
            ))}
            <span className="text-muted">]</span>
          </p>
          <p className="whitespace-pre pl-4 font-mono text-[12px] leading-[1.75] md:text-[12.5px]">
            <span className="text-foreground">{"status:  "}</span>
            <span className="text-added">{`"${c.status}"`}</span>
            <span aria-hidden className="caret ml-1 -mb-[2px]" />
          </p>
          <p className="whitespace-pre font-mono text-[12px] leading-[1.75] md:text-[12.5px]">
            <span className="text-muted">{"}"}</span>
          </p>
        </div>
      </Panel>
    </div>
  );
}
