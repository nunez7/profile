"use client";

import { useLang } from "@/i18n/lang-context";
import { withYears } from "@/data/resume";
import Header from "./Header";
import Hero from "./Hero";
import Stack from "./Stack";
import ExperienceTimeline from "./ExperienceTimeline";
import Formacion from "./Formacion";
import Footer from "./Footer";
import StatusBar from "./StatusBar";
import { Section } from "./ui/Section";

export default function CVPage({ years }: { years: number }) {
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
        <Hero years={years} />
        <Section id="summary" title={t.sections.summary} tone="band">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start lg:gap-12">
            {/* Frases cortas: una por línea, misma medida de lectura */}
            <div className="max-w-[58ch] space-y-2 text-body">
              {t.summary.map((sentence) => (
                <p key={sentence}>{withYears(sentence, years)}</p>
              ))}
            </div>
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
          {/* Tres señales para el escaneo de 10 segundos: el «+» es una
              línea agregada del mundo git, no un bullet genérico */}
          <ul className="mt-8 grid gap-x-8 gap-y-4 border-t border-rule pt-6 sm:grid-cols-3">
            {t.summaryHighlights.map((highlight) => (
              <li key={highlight.label}>
                <p className="flex items-baseline gap-2">
                  <span
                    aria-hidden
                    className="font-mono text-[13px] leading-none text-added"
                  >
                    +
                  </span>
                  <span className="subhead">{highlight.label}</span>
                </p>
                <p className="mt-1 text-detail text-muted">{highlight.text}</p>
              </li>
            ))}
          </ul>
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
