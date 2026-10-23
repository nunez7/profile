import { TECH_ICONS } from "@/data/tech-icons";

/**
 * Ícono de marca de una tecnología desde `TECH_ICONS`.
 * Decorativo: el nombre siempre aparece como texto junto a él.
 */
export function TechIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const path = TECH_ICONS[name];
  if (!path) return null;

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}
