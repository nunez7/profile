"use client";

import { useLang } from "@/i18n/lang-context";
import { Section } from "./ui/Section";
import { Panel } from "./ui/Panel";

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
      <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
        {t.certifications.map((cert) => (
          <li
            key={cert}
            className="border-t border-rule py-3 text-detail leading-snug"
          >
            {cert}
          </li>
        ))}
      </ul>

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
