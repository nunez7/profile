"use client";

import { useLang } from "@/i18n/lang-context";
import { Section } from "./ui/Section";

export default function Formacion() {
  const { t } = useLang();

  return (
    <Section title={t.sections.education}>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-rule pt-4">
        <span className="font-mono text-meta text-muted">
          {t.education.date}
        </span>
        <div>
          <p className="text-lead font-semibold tracking-[-0.01em]">
            {t.education.school}
          </p>
          <p className="mt-0.5 text-detail text-muted">
            {t.education.degree}
          </p>
        </div>
      </div>

      <h3 className="subhead mt-12">{t.sections.certifications}</h3>
      <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
        {t.certifications.map((cert) => (
          <li key={cert} className="border-t border-rule py-3 text-detail leading-snug">
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
