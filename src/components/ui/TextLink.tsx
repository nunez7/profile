/** Enlace de texto del CV: underline sutil que tiñe el acento en hover. */
export function TextLink({
  href,
  external = false,
  children,
  className,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`press text-detail text-foreground underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
