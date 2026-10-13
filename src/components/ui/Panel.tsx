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
 */
export function Panel({
  children,
  className,
  style,
  elevated = false,
  flat = false,
  hue,
}: Readonly<{
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  elevated?: boolean;
  flat?: boolean;
  hue?: string;
}>) {
  const surface = flat
    ? "bg-surface"
    : elevated
      ? "bg-surface-elevated shadow-elevated"
      : "bg-surface shadow-panel";

  return (
    <div
      className={`rounded-panel border border-rule ${hue ? "border-t-2" : ""} ${surface} ${className ?? ""}`}
      style={hue ? { ...style, borderTopColor: hue } : style}
    >
      {children}
    </div>
  );
}
