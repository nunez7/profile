"use client";

import { useLang } from "@/i18n/lang-context";

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
    <footer className="border-t border-hairline">
      <div className="mx-auto w-full max-w-[1080px] px-6 py-12 md:px-10 md:py-16">
        <h2 className="text-[25px] font-semibold tracking-[-0.02em] md:text-[31px]">
          {t.sections.contact}
        </h2>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="border-t border-hairline pt-4">
              <dt className="font-mono text-[13px] text-graphite">
                {item.label}
              </dt>
              <dd className="mt-1 text-[15.5px] break-words">
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="underline decoration-hairline underline-offset-4 transition-colors hover:decoration-cobalt"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-12 border-t border-hairline pt-6 font-mono text-[12px] text-graphite">
          {t.footer}
        </p>
      </div>
    </footer>
  );
}
