import { LangProvider } from "@/i18n/lang-context";
import CVPage from "@/components/CVPage";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Félix Javier Núñez González",
  jobTitle: "Ingeniero IT & Lead Full Stack",
  email: "mailto:felixjavier0@gmail.com",
  telephone: "+52-323-104-5265",
  url: "https://www.linkedin.com/in/felix-nunezg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago Ixcuintla",
    addressRegion: "Nayarit",
    addressCountry: "MX",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Tecnológica de La Costa",
  },
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Google Cloud Platform",
    "MuleSoft",
    "Apigee",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Arquitectura de software",
  ],
};

export default function Page() {
  return (
    <LangProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <CVPage />
    </LangProvider>
  );
}
