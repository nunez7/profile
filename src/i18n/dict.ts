export const langs = ["es", "en"] as const;
export type Lang = (typeof langs)[number];

export type StackGroup = {
  id: string;
  label: string;
  items: string[];
  /** Grupos principales: se muestran con mayor jerarquía tipográfica */
  primary: boolean;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  period: string;
  duration: string;
  /** El rol actual es HEAD en el grafo de git */
  head?: boolean;
  bullets: string[];
};

export type Dict = {
  header: {
    print: string;
    themeToLight: string;
    themeToDark: string;
  };
  hero: {
    role: string;
    meta: string;
    ctaEmail: string;
    ctaLinkedin: string;
    ctaDownload: string;
    stats: {
      years: string;
      roles: string;
      certs: string;
    };
  };
  sections: {
    summary: string;
    stack: string;
    experience: string;
    education: string;
    certifications: string;
    languages: string;
    contact: string;
  };
  summary: string;
  stack: StackGroup[];
  experience: ExperienceEntry[];
  experienceToggle: {
    show: string;
    hide: string;
  };
  education: {
    date: string;
    school: string;
    degree: string;
  };
  certifications: string[];
  languages: {
    name: string;
    level: string;
  }[];
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  contactLabels: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  footer: string;
};

export const dict: Record<Lang, Dict> = {
  es: {
    header: {
      print: "Imprimir",
      themeToLight: "Activar tema claro",
      themeToDark: "Activar tema oscuro",
    },
    hero: {
      role: "Ingeniero IT · Lead Full Stack",
      meta: "Nayarit, MX · +8 años · GCP · Java · Spring Boot · React",
      ctaEmail: "Email",
      ctaLinkedin: "LinkedIn",
      ctaDownload: "Descargar CV",
      stats: {
        years: "8+ años de experiencia",
        roles: "3 roles",
        certs: "15 certificaciones",
      },
    },
    sections: {
      summary: "Síntesis",
      stack: "Stack",
      experience: "Experiencia",
      education: "Formación",
      certifications: "Certificaciones",
      languages: "Idiomas",
      contact: "Contacto",
    },
    summary:
      "Ingeniero IT & Lead Full Stack con +8 años de experiencia diseñando e integrando soluciones empresariales en la nube. Actualmente lidero equipos en VASS LATAM, combinando la gestión técnica con decisiones de arquitectura, revisión de código y diseño de sistemas. Especializado en Java (Spring Boot), GCP, APIs (Apigee, MuleSoft) y frontend moderno (Next.js, React, TypeScript). Enfocado en entregar arquitecturas escalables, seguras y de alto rendimiento, optimizando el ciclo de desarrollo mediante la integración de IA.",
    stack: [
      {
        id: "integration",
        label: "Integración",
        items: ["MuleSoft", "Anypoint Studio", "Apigee API Gateway"],
        primary: true,
      },
      {
        id: "cloud",
        label: "Cloud",
        items: ["Google Cloud Platform (GCP)", "Terraform", "Vercel"],
        primary: true,
      },
      {
        id: "backend",
        label: "Backend",
        items: [
          "Java",
          "Spring Boot",
          "Node.js",
          "Next.js",
          "Prisma",
          "PostgreSQL",
          "SQL Server",
          "MySQL",
        ],
        primary: true,
      },
      {
        id: "frontend",
        label: "Frontend",
        items: ["React", "Angular", "Thymeleaf", "TypeScript", "Tailwind CSS"],
        primary: false,
      },
      {
        id: "practices",
        label: "Prácticas y herramientas",
        items: [
          "Git / Git Flow",
          "DevOps",
          "Metodologías ágiles",
          "Code review",
          "Jira",
          "Arquitectura de software",
          "IA aplicada al desarrollo",
        ],
        primary: false,
      },
    ],
    experience: [
      {
        company: "VASS LATAM",
        role: "Líder Técnico TI",
        location: "Ciudad de México",
        period: "jun 2025 — hoy",
        duration: "+1 año 4 meses",
        head: true,
        bullets: [
          "Dirijo un equipo de desarrollo Full Stack, brindando asesoría técnica y fomentando el crecimiento profesional de sus integrantes.",
          "Colaboro con arquitectos de equipo en la revisión de documentación y la toma de decisiones estratégicas para implementar mejoras escalables en los sistemas.",
          "Elaboro y reviso documentación técnica detallada para la implementación de soluciones, asegurando la correcta ejecución y estandarización de los proyectos.",
          "Realizo revisiones de código previas al despliegue en ambientes de producción, minimizando riesgos y garantizando la calidad del software.",
          "Genero diagramas técnicos claros y concisos que facilitan la comprensión y el mantenimiento de los sistemas.",
          "Superviso y oriento el desarrollo de componentes Full Stack, asegurando coherencia y calidad en la entrega, apoyándome en herramientas de IA para acelerar el ciclo de desarrollo.",
          "Programación y seguimiento de actividades de operadores para garantizar eficiencia y cumplimiento de objetivos de los equipos.",
        ],
      },
      {
        company: "VASS LATAM",
        role: "Integrador de Servicios",
        location: "Ciudad de México",
        period: "feb 2023 — jun 2025",
        duration: "+2 años 4 meses",
        bullets: [
          "Desarrollé y optimicé interfaces y flujos de integración empresarial complejos utilizando MuleSoft y Anypoint Studio, conectando sistemas clave para Coppel a nivel empresarial (SQL Server y PostgreSQL).",
          "Implementé soluciones de integración de servicios con Google Cloud Platform (GCP) y Spring Boot, aplicando metodologías ágiles y prácticas DevOps para asegurar entregas continuas y eficientes.",
          "Desarrollé nuevas features en servicios REST con Spring Boot, PHP y Node.js, integrando APIs de terceros y optimizando la comunicación entre sistemas internos.",
          "Realicé análisis exhaustivos de código y remediación de vulnerabilidades críticas en componentes front-end (React, Angular) y back-end (Java), mejorando la seguridad y robustez de las aplicaciones.",
          "Elaboré manuales e instructivos técnicos para la correcta adopción de las soluciones desarrolladas.",
        ],
      },
      {
        company: "Universidad Tecnológica de La Costa",
        role: "Desarrollador de Aplicaciones Web",
        location: "Nayarit",
        period: "ene 2016 — ene 2023",
        duration: "+7 años",
        bullets: [
          "Lideré el desarrollo y la administración de un sistema estudiantil integral (registro de ingreso, calificaciones, asistencias, pagos, horarios, cargas académicas y planeación docente), desarrollado con JSP y Java Servlets, iniciando además su migración a Spring Boot para optimizar rendimiento y escalabilidad.",
          "Administré y respaldé bases de datos SQL Server, PostgreSQL y MySQL, garantizando la integridad y disponibilidad de la información crítica del sistema.",
          "Brindé capacitación y soporte técnico continuo (presencial y remoto) al personal sobre el uso de los distintos módulos del sistema, mejorando su adopción y eficiencia operativa.",
          "Coordiné actividades de estudiantes en prácticas y estadías, y elaboré guías de usuario detalladas que redujeron los tiempos de capacitación.",
          "Coordiné el desarrollo del Sistema de Información y Gestión Académica (SIGA), definiendo diseño y estructura de sus módulos principales (versión beta) con Spring Boot, Thymeleaf y PostgreSQL.",
        ],
      },
    ],
    experienceToggle: {
      show: "Ver logros de",
      hide: "Ocultar logros de",
    },
    education: {
      date: "2015",
      school: "Universidad Tecnológica de La Costa",
      degree: "Ingeniería en Tecnologías de la Información y Comunicación",
    },
    certifications: [
      "Google Cloud Associate Cloud Engineer (ACE)",
      "Build Infrastructure with Terraform on Google Cloud — Skill Badge",
      "Implement Cloud Security Fundamentals on Google Cloud — Skill Badge",
      "Alternativas modernas para la Arquitectura de Software",
      "Liderazgo: Gerencia en Tecnología",
      "Azure DevOps",
      "API Development with Apigee",
      "Microservicios con Spring Cloud",
      "Principios SOLID y Clean Code",
      "Next.js: el framework de React",
      "MuleSoft 4 Fundamentals",
      "Tuning del servidor PostgreSQL",
      "Microservicios con Spring",
      "API REST y Docker",
      "Certificación Profesional en Java 6 — Oracle",
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Intermedio — Limited Working Proficiency" },
    ],
    contact: {
      email: "felixjavier0@gmail.com",
      phone: "323-104-5265",
      location: "Santiago Ixcuintla, Nayarit, México",
      linkedin: "linkedin.com/in/felix-nunezg",
    },
    contactLabels: {
      email: "Email",
      phone: "Teléfono",
      location: "Ubicación",
      linkedin: "LinkedIn",
    },
    footer: "Félix Javier Núñez González — CV en línea",
  },
  en: {
    header: {
      print: "Print",
      themeToLight: "Switch to light theme",
      themeToDark: "Switch to dark theme",
    },
    hero: {
      role: "IT Engineer · Full Stack Lead",
      meta: "Nayarit, MX · 8+ yrs · GCP · Java · Spring Boot · React",
      ctaEmail: "Email",
      ctaLinkedin: "LinkedIn",
      ctaDownload: "Download CV",
      stats: {
        years: "8+ yrs of experience",
        roles: "3 roles",
        certs: "15 certifications",
      },
    },
    sections: {
      summary: "Summary",
      stack: "Stack",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
      languages: "Languages",
      contact: "Contact",
    },
    summary:
      "IT Engineer & Full Stack Lead with 8+ years of experience designing and integrating enterprise solutions in the cloud. Currently leading teams at VASS LATAM, combining hands-on technical management with architecture decisions, code review and system design. Specialized in Java (Spring Boot), GCP, APIs (Apigee, MuleSoft) and modern frontend (Next.js, React, TypeScript). Focused on delivering scalable, secure, high-performance architectures while speeding up the development cycle with AI.",
    stack: [
      {
        id: "integration",
        label: "Integration",
        items: ["MuleSoft", "Anypoint Studio", "Apigee API Gateway"],
        primary: true,
      },
      {
        id: "cloud",
        label: "Cloud",
        items: ["Google Cloud Platform (GCP)", "Terraform", "Vercel"],
        primary: true,
      },
      {
        id: "backend",
        label: "Backend",
        items: [
          "Java",
          "Spring Boot",
          "Node.js",
          "Next.js",
          "Prisma",
          "PostgreSQL",
          "SQL Server",
          "MySQL",
        ],
        primary: true,
      },
      {
        id: "frontend",
        label: "Frontend",
        items: ["React", "Angular", "Thymeleaf", "TypeScript", "Tailwind CSS"],
        primary: false,
      },
      {
        id: "practices",
        label: "Practices & tools",
        items: [
          "Git / Git Flow",
          "DevOps",
          "Agile methodologies",
          "Code review",
          "Jira",
          "Software architecture",
          "AI applied to development",
        ],
        primary: false,
      },
    ],
    experience: [
      {
        company: "VASS LATAM",
        role: "IT Technical Lead",
        location: "Mexico City",
        period: "Jun 2025 — now",
        duration: "+1 yr 4 mo",
        head: true,
        bullets: [
          "I lead a Full Stack development team, providing technical guidance and fostering each member's professional growth.",
          "I work with solution architects reviewing documentation and making strategic decisions to ship scalable system improvements.",
          "I write and review detailed technical documentation for solution implementation, ensuring correct execution and project standardization.",
          "I run pre-deployment code reviews for production environments, minimizing risk and guaranteeing software quality.",
          "I produce clear, concise technical diagrams that make systems easier to understand and maintain.",
          "I supervise and guide Full Stack component development, keeping deliveries coherent and high quality, using AI tools to speed up the development cycle.",
          "I plan and track operator activities to keep teams efficient and on target.",
        ],
      },
      {
        company: "VASS LATAM",
        role: "Services Integrator",
        location: "Mexico City",
        period: "Feb 2023 — Jun 2025",
        duration: "+2 yr 4 mo",
        bullets: [
          "Built and optimized complex enterprise integration interfaces and flows with MuleSoft and Anypoint Studio, connecting key Coppel systems company-wide (SQL Server and PostgreSQL).",
          "Implemented service integration solutions on Google Cloud Platform (GCP) and Spring Boot, applying agile methodologies and DevOps practices for continuous, efficient delivery.",
          "Performed exhaustive code analysis and remediated critical vulnerabilities in front-end (React, Angular) and back-end (Java) components, improving application security and robustness.",
          "Wrote technical manuals and guides to drive proper adoption of the developed solutions.",
        ],
      },
      {
        company: "Universidad Tecnológica de La Costa",
        role: "Web Applications Developer",
        location: "Nayarit, Mexico",
        period: "Jan 2016 — Jan 2023",
        duration: "+7 yrs",
        bullets: [
          "Led the development and administration of a comprehensive student system (enrollment, grades, attendance, payments, schedules, course loads and lesson planning) built with JSP and Java Servlets, and started its migration to Spring Boot for better performance and scalability.",
          "Administered and backed up SQL Server, PostgreSQL and MySQL databases, guaranteeing the integrity and availability of the system's critical data.",
          "Provided continuous training and technical support (on-site and remote) to staff on the system's modules, improving adoption and operational efficiency.",
          "Coordinated intern activities and wrote detailed user guides that cut training time.",
          "Coordinated development of the Academic Information and Management System (SIGA), defining the design and structure of its main modules (beta) with Spring Boot, Thymeleaf and PostgreSQL.",
        ],
      },
    ],
    experienceToggle: {
      show: "Show achievements for",
      hide: "Hide achievements for",
    },
    education: {
      date: "2015",
      school: "Universidad Tecnológica de La Costa",
      degree: "B.Eng. in Information and Communication Technologies",
    },
    certifications: [
      "Google Cloud Associate Cloud Engineer (ACE)",
      "Build Infrastructure with Terraform on Google Cloud — Skill Badge",
      "Implement Cloud Security Fundamentals on Google Cloud — Skill Badge",
      "Modern Alternatives for Software Architecture",
      "Leadership: Technology Management",
      "Azure DevOps",
      "API Development with Apigee",
      "Microservices with Spring Cloud",
      "SOLID Principles and Clean Code",
      "Next.js: the React framework",
      "MuleSoft 4 Fundamentals",
      "PostgreSQL Server Tuning",
      "Microservices with Spring",
      "REST API and Docker",
      "Oracle Certified Professional Java 6",
    ],
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Intermediate — Limited Working Proficiency" },
    ],
    contact: {
      email: "felixjavier0@gmail.com",
      phone: "323-104-5265",
      location: "Santiago Ixcuintla, Nayarit, Mexico",
      linkedin: "linkedin.com/in/felix-nunezg",
    },
    contactLabels: {
      email: "Email",
      phone: "Phone",
      location: "Location",
      linkedin: "LinkedIn",
    },
    footer: "Félix Javier Núñez González — Online CV",
  },
};
