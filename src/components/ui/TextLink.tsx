/**
 * Enlace de texto del CV: underline sutil que tiñe el acento en hover.
 * `quiet` lo baja a `muted` hasta hover — para CTAs secundarios junto
 * al botón primario, así el botón no compite con enlaces del mismo peso.
 */
export function TextLink({
  href,
  external = false,
  quiet = false,
  children,
  className,
}: {
  href: string;
  external?: boolean;
  quiet?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`press text-detail ${quiet ? "text-muted hover:text-foreground" : "text-foreground"} underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
