import type { CSSProperties, ReactNode } from "react";

/**
 * Panel: primitiva de superficie del CV — borde `rule` y radio del
 * sistema en todo el sitio, con dos alturas de elevación con intención:
 * `flat` para estructura estática (KPIs, grupos del stack, formación —
 * solo borde, sin sombra) y `shadow-panel` para las entradas
 * interactivas del timeline, donde la sombra señala "clicable".
 * `elevated` sube a la capa alta de superficie (más tinte de marca y
 * sombra más pronunciada) — reservado al artefacto del hero.
 * `hue` dibuja la regla superior de 2px en un color de métrica o de
 * categoría — el mismo patrón en KPIs y grupos del stack.
 * `hoverHue` convierte el panel en `.panel-hover`: en puntero fino,
 * el borde se tiñe con ese color (categoría o empresa) y la tarjeta
 * se eleva un rung de sombra. Gateado en CSS tras
 * `@media (hover: hover) and (pointer: fine)`.
 */
export function Panel({
  children,
  className,
  style,
  elevated = false,
  flat = false,
  hue,
  hoverHue,
}: Readonly<{
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  elevated?: boolean;
  flat?: boolean;
  hue?: string;
  hoverHue?: string;
}>) {
  const surface = flat
    ? "bg-surface"
    : elevated
      ? "bg-surface-elevated shadow-elevated"
      : "bg-surface shadow-panel";

  /* La tarjeta plana (sin sombra) gana la sombra de panel en hover;
     la ya sombreada sube a la capa elevada. La escera se resuelve en
     vars para que .panel-hover no conozca la jerarquía. */
  const hoverVars = hoverHue
    ? ({
        "--panel-hue": hoverHue,
        "--panel-hover-shadow": flat
          ? "var(--panel-shadow)"
          : "var(--elevated-shadow)",
      } as CSSProperties)
    : {};

  return (
    <div
      className={`rounded-panel border border-rule ${hue ? "border-t-2" : ""} ${surface} ${hoverHue ? "panel-hover" : ""} ${className ?? ""}`}
      style={{
        ...hoverVars,
        ...(hue ? { ...style, borderTopColor: hue } : style),
      }}
    >
      {children}
    </div>
  );
}
