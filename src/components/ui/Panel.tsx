import type { CSSProperties, ReactNode } from "react";

/**
 * Panel: superficie elevada con borde `rule` y radio del sistema.
 * Es la primitiva de "herramienta" del CV — todo bloque con estructura
 * (KPIs, entradas del timeline, grupos del stack) se construye con ella
 * para que borde, radio y sombra sean idénticos en todo el sitio.
 * `elevated` sube a la capa alta de superficie (más tinte de marca
 * y sombra más pronunciada) — reservado al artefacto del hero.
 */
export function Panel({
  children,
  className,
  style,
  elevated = false,
}: Readonly<{
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  elevated?: boolean;
}>) {
  return (
    <div
      className={`rounded-panel border border-rule ${
        elevated ? "bg-surface-elevated shadow-elevated" : "bg-surface shadow-panel"
      } ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
