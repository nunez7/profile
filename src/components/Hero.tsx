"use client";

import { useLang } from "@/i18n/lang-context";
import { Container } from "./ui/Container";
import { Panel } from "./ui/Panel";
import { TextLink } from "./ui/TextLink";
import ProfileWindow from "./ProfileWindow";

const LINKEDIN_URL = "https://www.linkedin.com/in/felix-nunezg";

/* Color por métrica del KPI: trayectoria (roles) en naranja de
   backend, certificados en esmeralda de prácticas — coherente con
   la paleta semántica del sistema. */
const KPI_HUES = ["var(--brand)", "var(--cat-backend)", "var(--cat-practices)"];

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative isolate pt-16 pb-14 md:pt-24 md:pb-20">
      {/* Textura de fondo: grid hairline + halos de marca + ruido */}
      <div aria-hidden className="hero-texture absolute inset-0 -z-10" />
      <Container>
        <h1 className="text-[clamp(2.6rem,8.5vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.03em]">
          <span className="animate-rise block">FÉLIX JAVIER</span>
          <span
            className="animate-rise block"
            style={{ animationDelay: "80ms" }}
          >
            NÚÑEZ GONZÁLEZ
          </span>
        </h1>
        {/* Subrayado de marca: gradiente que se dibuja al cargar */}
        <span
          aria-hidden
          className="name-underline mt-4 block h-[7px] w-full max-w-[34rem] rounded-full"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          {/* Columna izquierda: identidad, CTAs y KPIs */}
          <div>
            <p
              className="animate-rise text-lead font-medium"
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.role}
            </p>
            <p
              className="animate-rise mt-2 font-mono text-meta text-muted"
              style={{ animationDelay: "220ms" }}
            >
              {t.hero.meta}
            </p>
            <p className="mt-2 hidden font-mono text-meta text-muted print:block">
              {t.contact.email}
              {" · "}
              {t.contact.phone}
              {" · "}
              {t.contact.linkedin}
            </p>

            <div
              className="no-print animate-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{ animationDelay: "300ms" }}
            >
              {/* CTA primario: barrido direccional al hover, press al tocar */}
              <button
                type="button"
                onClick={() => window.print()}
                className="press group relative overflow-hidden bg-accent px-5 py-2.5 text-detail font-medium text-accent-contrast"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-300 [transition-timing-function:var(--ease-drawer)] group-hover:translate-x-0 motion-reduce:transition-none"
                />
                <span className="relative transition-colors duration-200 group-hover:text-background">
                  {t.hero.ctaDownload}
                </span>
              </button>
              <TextLink href={`mailto:${t.contact.email}`}>
                {t.hero.ctaEmail}
              </TextLink>
              <TextLink href={LINKEDIN_URL} external>
                {t.hero.ctaLinkedin}
              </TextLink>
            </div>

            {/* KPIs: paneles de datos, label mono + cifra display.
                Cada métrica lleva su color: marca/trayectoria/certs */}
            <dl
              className="animate-rise mt-9 grid grid-cols-3 gap-3"
              style={{ animationDelay: "380ms" }}
            >
              {t.hero.kpis.map((kpi, i) => (
                <Panel
                  key={kpi.label}
                  className="border-t-2 px-4 py-3"
                  style={{ borderTopColor: KPI_HUES[i] ?? "var(--rule)" }}
                >
                  <dt className="subhead">{kpi.label}</dt>
                  <dd className="mt-1 flex items-baseline gap-1">
                    <span
                      className="text-[28px] font-semibold leading-none tracking-[-0.02em]"
                      style={{ color: KPI_HUES[i] ?? "var(--foreground)" }}
                    >
                      {kpi.value}
                    </span>
                    {kpi.unit && (
                      <span className="font-mono text-meta text-muted">
                        {kpi.unit}
                      </span>
                    )}
                  </dd>
                </Panel>
              ))}
            </dl>
          </div>

          {/* Columna derecha: ventana profile.ts */}
          <ProfileWindow />
        </div>
      </Container>
    </section>
  );
}
