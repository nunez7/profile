"use client";

import { useLang } from "@/i18n/lang-context";
import { Container } from "./ui/Container";
import { TextLink } from "./ui/TextLink";

const LINKEDIN_URL = "https://www.linkedin.com/in/felix-nunezg";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="pt-16 pb-14 md:pt-24 md:pb-20">
      <Container>
        <h1 className="text-[clamp(2.6rem,8.5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
          <span className="animate-rise block">FÉLIX JAVIER</span>
          <span
            className="animate-rise block"
            style={{ animationDelay: "80ms" }}
          >
            NÚÑEZ GONZÁLEZ
          </span>
        </h1>

        <p
          className="animate-rise mt-6 text-lead font-medium"
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
          className="no-print animate-rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
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

        <div
          className="animate-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-6 font-mono text-meta text-muted"
          style={{ animationDelay: "380ms" }}
        >
          <span>{t.hero.stats.years}</span>
          <span aria-hidden className="h-3.5 w-px bg-rule" />
          <span>{t.hero.stats.roles}</span>
          <span aria-hidden className="h-3.5 w-px bg-rule" />
          <span>{t.hero.stats.certs}</span>
        </div>
      </Container>
    </section>
  );
}
