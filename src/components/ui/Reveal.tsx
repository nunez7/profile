"use client";

import type { ReactNode } from "react";
import { useReveal } from "./use-reveal";

/** Contenido que se revela una vez al entrar al viewport, con stagger. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
