import type { CSSProperties, ReactNode } from "react";

/**
 * Panel: superficie elevada con borde `rule` y radio del sistema.
 * Es la primitiva de "herramienta" del CV — todo bloque con estructura
 * (KPIs, entradas del timeline, grupos del stack) se construye con ella
 * para que borde, radio y sombra sean idénticos en todo el sitio.
 */
export function Panel({
  children,
  className,
  style,
}: Readonly<{
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}>) {
  return (
    <div
      className={`rounded-panel border border-rule bg-surface shadow-panel ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
