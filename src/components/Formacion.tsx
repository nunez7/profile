"use client";

import { useLang } from "@/i18n/lang-context";
import { CERT_GROUP_HUES } from "@/data/tech-colors";
import { Section } from "./ui/Section";
import { Panel } from "./ui/Panel";
import { PendingText } from "./ui/PendingText";
import { TechIcon } from "./ui/TechIcon";

export default function Formacion() {
  const { t } = useLang();

  return (
    <Section id="education" title={t.sections.education}>
      {/* Registro de formación: el año ocupa un gutter fijo y la
          institución + carrera se apilan a su derecha. Una sola
          estructura, alineada por la primera línea, en vez de tres
          columnas con topes distintos. */}
      <Panel flat className="px-4 py-4 md:px-5">
        <div className="grid gap-x-6 gap-y-1 md:grid-cols-[5rem_minmax(0,1fr)] md:items-start">
          <span className="font-mono text-meta text-muted md:pt-1">
            {t.education.date}
          </span>
          <div className="min-w-0 md:border-l md:border-rule md:pl-5">
            <p className="text-lead font-semibold tracking-[-0.01em]">
              {t.education.school}
            </p>
            <p className="mt-1 text-detail text-muted">{t.education.degree}</p>
          </div>
        </div>
      </Panel>

      <h3 className="subhead mt-12">{t.sections.certifications}</h3>

      {/* Credencial principal: la ACE abre la sección con su emisor,
          ícono de Google Cloud y año (placeholder hasta confirmarlo).
          Es una tarjeta estática: no eleva ni hace hover. */}
      <Panel
        flat
        hue="var(--cat-cloud)"
        className="mt-4 overflow-hidden"
      >
        <div className="flex items-start gap-4 p-4 md:p-5">
          <span
            className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-panel border border-rule"
            style={{ color: "var(--cat-cloud)" }}
          >
            <TechIcon
              name={t.certifications.featured.icon}
              className="size-5"
            />
          </span>
          <div className="min-w-0">
            <p className="subhead">{t.certifications.featured.label}</p>
            <p className="mt-0.5 text-lead font-semibold tracking-[-0.01em]">
              {t.certifications.featured.name}
            </p>
            <p className="mt-1 font-mono text-meta text-muted">
              {t.certifications.featured.issuer}
              {" · "}
              <PendingText text={t.certifications.featured.year} />
            </p>
          </div>
        </div>
      </Panel>

      {/* Agrupadas por dominio: regla de categoría + lista hairline.
          Una sola columna en móvil; los nombres largos en inglés no
          caben en tres columnas. */}
      <div className="mt-8 grid items-start gap-x-10 gap-y-7 sm:grid-cols-2">
        {t.certifications.groups.map((group) => {
          const hue = CERT_GROUP_HUES[group.id] ?? "var(--rule)";
          return (
            <div key={group.id}>
              <h4
                className="subhead border-t-2 pt-2.5"
                style={{ borderTopColor: hue }}
              >
                {group.label}
              </h4>
              <ul className="mt-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="border-t border-rule py-2.5 text-detail leading-snug first:border-t-0 first:pt-0"
                  >
                    {item.name}
                    {item.year && (
                      <span className="ml-2 font-mono text-meta text-muted">
                        {item.year}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <h3 className="subhead mt-12">{t.sections.languages}</h3>
      <ul className="mt-4 flex flex-col gap-2 text-detail sm:flex-row sm:gap-12">
        {t.languages.map((language) => (
          <li key={language.name}>
            <span className="font-medium">{language.name}</span>{" "}
            <span className="text-muted">— {language.level}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
