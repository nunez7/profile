import { cacheLife } from "next/cache";
import { CAREER_START } from "./resume";

/**
 * Años completos de experiencia desde ene 2016.
 *
 * `new Date()` no puede leerse durante el prerender con Cache Components
 * (valor inestable), así que el cálculo vive en un scope `use cache`:
 * se resuelve en el build y se revalida como mucho una vez al día. El
 * resultado se pasa a los componentes como prop, de modo que el HTML
 * estático y la hidratación siempre coinciden.
 *
 * Módulo solo-servidor: los componentes cliente importan `withYears`
 * desde `resume.ts`, que no arrastra `next/cache` al bundle.
 */
export async function getYearsOfExperience(): Promise<number> {
  "use cache";
  cacheLife("days");

  const now = new Date();
  const years = now.getFullYear() - CAREER_START.year;
  return now.getMonth() < CAREER_START.month ? years - 1 : years;
}
