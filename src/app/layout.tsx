import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Félix Núñez — Ingeniero IT & Lead Full Stack",
  description:
    "Ingeniero IT & Lead Full Stack con +8 años de experiencia diseñando e integrando soluciones empresariales en la nube. Java, Spring Boot, GCP, MuleSoft, Apigee, Next.js y React.",
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
};

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
