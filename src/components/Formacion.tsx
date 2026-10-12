"use client";

import { useLang } from "@/i18n/lang-context";
import { Section } from "./Section";

export default function Formacion() {
  const { t } = useLang();

  return (
    <Section title={t.sections.education}>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-hairline pt-4">
        <span className="font-mono text-[13px] text-graphite">
          {t.education.date}
        </span>
        <div>
          <p className="text-[19px] font-semibold tracking-[-0.01em]">
            {t.education.school}
          </p>
          <p className="mt-0.5 text-[15.5px] text-graphite">
            {t.education.degree}
          </p>
        </div>
      </div>

      <h3 className="mt-12 font-mono text-[13px] text-graphite">
        {t.sections.certifications}
      </h3>
      <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
        {t.certifications.map((cert) => (
          <li
            key={cert}
            className="border-t border-hairline py-3 text-[15px] leading-snug"
          >
            {cert}
          </li>
        ))}
      </ul>

      <h3 className="mt-12 font-mono text-[13px] text-graphite">
        {t.sections.languages}
      </h3>
      <ul className="mt-4 flex flex-col gap-2 text-[15.5px] sm:flex-row sm:gap-12">
        {t.languages.map((language) => (
          <li key={language.name}>
            <span className="font-medium">{language.name}</span>{" "}
            <span className="text-graphite">— {language.level}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
