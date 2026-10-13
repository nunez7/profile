/**
 * Colores de marca reales de cada tecnología (paleta estilo GitHub).
 * Keyed por el nombre exacto del item en el dict — los nombres de
 * tecnología son idénticos en ES y EN, así que un solo mapa sirve
 * para ambos idiomas. Solo se dotechnologías; las prácticas no.
 */
export const TECH_COLORS: Record<string, string> = {
  // Integración
  "MuleSoft": "#00a0df",
  "Anypoint Studio": "#00758f",
  "Apigee API Gateway": "#5c6bc0",

  // Cloud
  "Google Cloud Platform (GCP)": "#4285f4",
  "Terraform": "#7b42bc",
  "Vercel": "#8b949e",

  // Backend
  "Java": "#e76f00",
  "Spring Boot": "#6db33f",
  "Node.js": "#5fa04e",
  "Next.js": "#94a3b8",
  "Prisma": "#47a248",
  "PostgreSQL": "#4169e1",
  "SQL Server": "#cc2927",
  "MySQL": "#4479a1",

  // Frontend
  "React": "#22b8cf",
  "Angular": "#dd0031",
  "Thymeleaf": "#2e9e5b",
  "TypeScript": "#3178c6",
  "Tailwind CSS": "#06b6d4",
};

/**
 * Hue de categoría para la regla superior de cada grupo del Stack.
 * Keyed por el `id` localizable del grupo (los labels varían por idioma).
 * Son vars semánticas: cada tema trae su propio valor (saturado en
 * claro, con brillo controlado en oscuro) sin tocar los componentes.
 */
export const STACK_HUES: Record<string, string> = {
  integration: "var(--cat-integration)",
  cloud: "var(--cat-cloud)",
  backend: "var(--cat-backend)",
  frontend: "var(--cat-frontend)",
  practices: "var(--cat-practices)",
};

/**
 * Color de empresa para el nodo del timeline (nodo, hash y badge
 * HEAD). Keyed por el nombre exacto de la empresa en el dict —
 * idéntico en ES y EN. VASS (marca, índigo) contra Universidad (cian):
 * los dos hashes del grafo se distinguen de un vistazo.
 */
export const COMPANY_COLORS: Record<string, string> = {
  "VASS LATAM": "var(--brand)",
  "Universidad Tecnológica de La Costa": "var(--cat-integration)",
};
