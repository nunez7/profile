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
      label: contactLabels.phone,
      value: contact.phone,
      href: `tel:${contact.phone.replace(/-/g, "")}`,
    },
    {
      label: contactLabels.location,
      value: contact.location,
    },
  ];

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-rule">
      <Container className="py-12 md:py-16">
        <h2 className="text-[25px] font-semibold tracking-[-0.02em] md:text-[31px]">
          {t.sections.contact}
        </h2>
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
