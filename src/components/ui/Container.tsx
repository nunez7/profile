import type { ReactNode } from "react";

/** Contenedor de contenido del CV: ancho máximo y gutter del proyecto. */
export function Container({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={`mx-auto w-full max-w-cv px-6 md:px-10 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
