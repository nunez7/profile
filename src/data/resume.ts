import type { Certifications, Dict } from "@/i18n/dict";

/**
 * Inicio de la trayectoria profesional (ene 2016). El cálculo de años
 * vive en `years.ts` (scope `use cache`).
 */
export const CAREER_START = { year: 2016, month: 0 } as const;

/** Sustituye el token `{years}` del copy por el valor calculado. */
export function withYears(text: string, years: number): string {
  return text.replace(/\{years\}/g, String(years));
}

/** Total de certificaciones: la destacada + las agrupadas. */
export function countCertifications(certifications: Certifications): number {
  return (
    1 +
    certifications.groups.reduce(
      (total, group) => total + group.items.length,
      0,
    )
  );
}

/**
 * KPIs del hero derivados del contenido: experiencia calculada,
 * número real de roles y de certificaciones. El copy (labels/unidades)
 * sigue viviendo en el dict.
 */
export function getHeroKpis(t: Dict, years: number) {
  return t.hero.kpis.map((kpi, index) => {
    if (index === 0) return { ...kpi, value: `${years}+` };
    if (index === 1) return { ...kpi, value: String(t.experience.length) };
    if (index === 2)
      return {
        ...kpi,
        value: String(countCertifications(t.certifications)),
      };
    return kpi;
  });
}
