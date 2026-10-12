"use client";

import { useLang } from "@/i18n/lang-context";
import { Section } from "./Section";

export default function Stack() {
  const { t } = useLang();

  return (
    <Section title={t.sections.stack}>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {t.stack.map((group) => (
          <div key={group.label} className="border-t border-hairline pt-4">
            <h3 className="font-mono text-[13px] text-graphite">
              {group.label}
            </h3>
            <ul
              className={
                group.primary
                  ? "mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[19px] font-medium tracking-[-0.01em]"
                  : "mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-graphite"
              }
            >
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
