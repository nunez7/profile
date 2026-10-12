import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
