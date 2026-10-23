import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/data/site";
import { getYearsOfExperience } from "@/data/years";
import "./globals.css";

/* Display+body: grotesca con carácter (ejes ópticos, detalles
   quirúrgicos). Datos de ingeniería: Plex Mono, más personalidad
   que la mono habitual. Ambas self-hosted vía next/font. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

/* Título y descripción viven en constantes: los comparten la metadata
   base, Open Graph y Twitter Card, y así no se desincronizan. Los años
   vienen del mismo cálculo cacheado que el hero. */
const TITLE = "Félix Núñez — Ingeniero IT & Lead Full Stack";

export async function generateMetadata(): Promise<Metadata> {
  const years = await getYearsOfExperience();
  const description = `Ingeniero IT & Lead Full Stack con +${years} años de experiencia diseñando e integrando soluciones empresariales en la nube. Java, Spring Boot, GCP, MuleSoft, Apigee, Next.js y React.`;

  return {
    /* Necesario para resolver a URL absoluta el og:image que genera
       src/app/opengraph-image.tsx. En Vercel sale de su propia variable. */
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description,
    applicationName: SITE_NAME,
    keywords: [
      "Félix Núñez",
      "Lead Full Stack",
      "Ingeniero IT",
      "Java",
      "Spring Boot",
      "GCP",
      "MuleSoft",
      "Apigee",
      "Next.js",
      "React",
      "TypeScript",
      "CV",
    ],
    authors: [{ name: "Félix Javier Núñez González" }],
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      locale: "es_MX",
      siteName: SITE_NAME,
      title: TITLE,
      description,
      url: "/",
    },
    /* La imagen se inyecta sola desde el file convention opengraph-image.tsx;
       Twitter reutiliza og:image cuando no hay twitter:image. */
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description,
    },
  };
}

const themeInitScript = `try{var t=localStorage.getItem("cv-theme");var d=t==="dark"||((!t||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Aplica el tema guardado antes del primer paint (sin FOUC).
            suppressHydrationWarning cubre la clase "dark" que añade. */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
