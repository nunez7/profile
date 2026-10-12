"use client";

import { useLang } from "@/i18n/lang-context";

const LINKEDIN_URL = "https://www.linkedin.com/in/felix-nunezg";

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="top"
      className="mx-auto w-full max-w-[1080px] px-6 pt-16 pb-14 md:px-10 md:pt-24 md:pb-20"
    >
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
        className="animate-rise mt-6 text-[19px] font-medium md:text-[20px]"
        style={{ animationDelay: "160ms" }}
      >
        {t.hero.role}
      </p>
      <p
        className="animate-rise mt-2 font-mono text-[13px] text-graphite"
        style={{ animationDelay: "220ms" }}
      >
        {t.hero.meta}
      </p>
      <p className="mt-2 hidden font-mono text-[13px] text-graphite print:block">
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
        <button
          type="button"
          onClick={() => window.print()}
          className="bg-cobalt px-5 py-2.5 text-[15px] font-medium text-paper transition-colors hover:bg-ink"
        >
          {t.hero.ctaDownload}
        </button>
        <a
          href={`mailto:${t.contact.email}`}
          className="text-[15px] text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-cobalt"
        >
          {t.hero.ctaEmail}
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-cobalt"
        >
          {t.hero.ctaLinkedin}
        </a>
      </div>

      <div
        className="animate-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-6 font-mono text-[13px] text-graphite"
        style={{ animationDelay: "380ms" }}
      >
        <span>{t.hero.stats.years}</span>
        <span aria-hidden className="h-3.5 w-px bg-hairline" />
        <span>{t.hero.stats.roles}</span>
        <span aria-hidden className="h-3.5 w-px bg-hairline" />
        <span>{t.hero.stats.certs}</span>
      </div>
    </section>
  );
}
