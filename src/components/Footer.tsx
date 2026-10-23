"use client";

import { useLang } from "@/i18n/lang-context";
import { Container } from "./ui/Container";
import { TextLink } from "./ui/TextLink";

const LINKEDIN_URL = "https://www.linkedin.com/in/felix-nunezg";

export default function Footer() {
  const { t } = useLang();
  const { contact, contactLabels } = t;

  const items = [
    {
      label: contactLabels.email,
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      label: contactLabels.linkedin,
      value: contact.linkedin,
      href: LINKEDIN_URL,
      external: true,
    },
    {
      /* Sin href: el número va enmascarado en el dict — un tel: con
         «xx» sería un canal roto. Clicables solo email y LinkedIn. */
      label: contactLabels.phone,
      value: contact.phone,
    },
    {
      label: contactLabels.location,
      value: contact.location,
    },
  ];

  return (
    <footer
      id="contact"
      className="scroll-mt-16 border-t border-rule bg-section-band"
    >
      <Container className="py-12 md:py-16">
        <h2 className="text-[25px] font-semibold tracking-[-0.02em] md:text-[31px]">
          {t.sections.contact}
        </h2>
        {/* CTA de cierre: el reclutador convencido por el timeline actúa
            aquí, sin volver 4000px al hero. Mismo tratamiento que el
            botón primario; oculto en print (ya estás imprimiendo). */}
        <div className="no-print mt-6">
          <button
            type="button"
            onClick={() => window.print()}
            className="press group relative overflow-hidden rounded-panel bg-accent px-6 py-3 text-lead font-medium text-accent-contrast"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-300 [transition-timing-function:var(--ease-drawer)] group-hover:translate-x-0 motion-reduce:transition-none"
            />
            <span className="relative transition-colors duration-200 group-hover:text-background">
              {t.hero.ctaDownload}
            </span>
          </button>
        </div>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="border-t border-rule pt-4">
              <dt className="subhead">{item.label}</dt>
              <dd className="mt-1 text-detail break-words">
                {item.href ? (
                  <TextLink
                    href={item.href}
                    {...(item.external ? { external: true } : {})}
                  >
                    {item.value}
                  </TextLink>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-12 border-t border-rule pt-6 font-mono text-meta text-muted">
          {t.footer}
        </p>
      </Container>
    </footer>
  );
}
