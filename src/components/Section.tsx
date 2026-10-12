import type { ReactNode } from "react";

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-hairline py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1080px] px-6 md:px-10">
        <h2 className="text-[25px] font-semibold tracking-[-0.02em] md:text-[31px]">
          {title}
        </h2>
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  );
}
