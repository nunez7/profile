import type { ReactNode } from "react";
import { Container } from "./Container";

/** Sección del CV: regla superior, título display y contenido. */
export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-rule py-14 md:py-20">
      <Container>
        <h2 className="text-[25px] font-semibold tracking-[-0.02em] md:text-[31px]">
          {title}
        </h2>
        <div className="mt-8 md:mt-10">{children}</div>
      </Container>
    </section>
  );
}
