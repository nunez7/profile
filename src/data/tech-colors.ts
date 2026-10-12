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
 */
export const STACK_HUES: Record<string, string> = {
  integration: "#0ea5c6",
  cloud: "#7c3aed",
  backend: "#ea580c",
  frontend: "#2563eb",
  practices: "#059669",
};
