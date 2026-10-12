"use client";

import { useState } from "react";
import { useLang } from "@/i18n/lang-context";
import { Section } from "./Section";
import type { ExperienceEntry } from "@/i18n/dict";

function Entry({
  entry,
  open,
  onToggle,
  toggleLabel,
}: {
  entry: ExperienceEntry;
  open: boolean;
  onToggle: () => void;
  toggleLabel: () => string;
}) {
  return (
    <li className="relative pl-9 md:pl-12">
      <span
        aria-hidden
        className={`absolute left-0 top-[9px] size-[15px] rounded-full border-2 border-cobalt ${
          entry.head ? "bg-cobalt" : "bg-paper"
        }`}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={toggleLabel()}
        className="group block w-full cursor-pointer text-left"
      >
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="text-[21px] font-semibold tracking-[-0.015em] md:text-[24px]">
            {entry.role}
          </h3>
          {entry.head && (
            <span className="font-mono text-[11px] text-cobalt">HEAD</span>
          )}
          <span
            aria-hidden
            className="ml-auto select-none font-mono text-[15px] leading-none text-graphite transition-colors group-hover:text-ink print:hidden"
          >
            {open ? "−" : "+"}
          </span>
        </div>
        <p className="mt-1 font-mono text-[13px] text-graphite">
          <span className="text-ink">{entry.company}</span>
          {" · "}
          {entry.location}
          {" · "}
          {entry.period}
          {" · "}
          <span className="text-ink">{entry.duration}</span>
        </p>
      </button>
      <div
        className={`exp-panel grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="overflow-hidden pt-1">
          {entry.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-4 py-[7px] text-[15.5px] leading-[1.6] text-graphite"
            >
              <span aria-hidden className="mt-[12px] h-px w-4 shrink-0 bg-hairline" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function ExperienceTimeline() {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section title={t.sections.experience}>
      <div className="relative">
        <span
          aria-hidden
          className="absolute left-[7px] top-3 bottom-3 w-px bg-hairline"
        />
        <ul className="relative flex flex-col gap-10 md:gap-12">
          {t.experience.map((entry, i) => (
            <Entry
              key={`${entry.company}-${entry.role}`}
              entry={entry}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              toggleLabel={() =>
                `${openIdx === i ? t.experienceToggle.hide : t.experienceToggle.show} ${entry.role}`
              }
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}
