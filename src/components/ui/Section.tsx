import type { ReactNode } from "react";
import { Container } from "./Container";

/** Sección del CV: regla superior, título display y contenido. */
export function Section({
  title,
  id,
  children,
}: {
  title: string;
  /** Ancla para el scrollspy/breadcrumb; reserva espacio bajo el header */
  id?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-rule py-14 md:py-20"
    >
      <Container>
        <h2 className="text-[25px] font-semibold tracking-[-0.02em] md:text-[31px]">
          {title}
        </h2>
        <div className="mt-8 md:mt-10">{children}</div>
      </Container>
    </section>
  );
}
