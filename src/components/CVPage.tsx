"use client";

import { useLang } from "@/i18n/lang-context";
import Header from "./Header";
import Hero from "./Hero";
import Stack from "./Stack";
import ExperienceTimeline from "./ExperienceTimeline";
import Formacion from "./Formacion";
import Footer from "./Footer";
import { Section } from "./ui/Section";

export default function CVPage() {
  const { t } = useLang();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Section title={t.sections.summary}>
          <p className="max-w-[58ch] text-body">{t.summary}</p>
        </Section>
        <Stack />
        <ExperienceTimeline />
        <Formacion />
      </main>
      <Footer />
    </>
  );
}
