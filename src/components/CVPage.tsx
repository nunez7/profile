"use client";

import { useLang } from "@/i18n/lang-context";
import Header from "./Header";
import Hero from "./Hero";
import Stack from "./Stack";
import ExperienceTimeline from "./ExperienceTimeline";
import Formacion from "./Formacion";
import Footer from "./Footer";
import StatusBar from "./StatusBar";
import { Section } from "./ui/Section";

export default function CVPage() {
  const { t } = useLang();

  return (
    <>
      {/* Skip-to-content: primera parada de teclado, antes del header */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2 focus:text-detail focus:font-medium focus:text-foreground focus:shadow-panel"
      >
        {t.nav.skip}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Hero />
        <Section id="summary" title={t.sections.summary} tone="band">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start lg:gap-12">
            <p className="max-w-[58ch] text-body">{t.summary}</p>
            {/* Aside editorial: estado, ubicación y enfoque — cierra el
                hueco derecho de la sección y da a lectores de pantalla
                la disponibilidad que la status bar (aria-hidden) calla */}
            <aside className="flex flex-col gap-4 border-t border-rule pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <p className="flex items-center gap-2 font-mono text-meta text-muted">
                <span
                  aria-hidden
                  className="size-[7px] shrink-0 rounded-full bg-added"
                />
                {t.statusBar.available}
              </p>
              <div>
                <p className="subhead">{t.summaryAside.location}</p>
                <p className="mt-0.5 text-detail">{t.contact.location}</p>
              </div>
              <div>
                <p className="subhead">{t.summaryAside.focus}</p>
                <p className="mt-0.5 text-detail">{t.hero.role}</p>
              </div>
            </aside>
          </div>
        </Section>
        <Stack />
        <ExperienceTimeline />
        <Formacion />
      </main>
      <Footer />
      <StatusBar />
    </>
  );
}
