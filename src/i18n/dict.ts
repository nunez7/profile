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
  /** Hash corto cosmético del «commit» (estable, estilo git log) */
  hash: string;
  /** El rol actual es HEAD en el grafo de git */
  head?: boolean;
  /** Tecnologías del rol; nombres idénticos en ES/EN (como el Stack) */
  tech: string[];
  bullets: string[];
};

export type Certification = {
  name: string;
  /** Solo cuando el dato existe; nunca se inventa una fecha */
  year?: string;
};

export type CertificationGroup = {
  id: string;
  label: string;
  items: Certification[];
};

export type Certifications = {
  featured: {
    /** «Certificación principal» / «Featured certification» */
    label: string;
    name: string;
    issuer: string;
    /** Año o rango; entre corchetes si está pendiente de confirmar */
    year: string;
    /** Key de TECH_ICONS para el ícono del emisor */
    icon: string;
  };
  groups: CertificationGroup[];
};

export type SummaryHighlight = {
  label: string;
  text: string;
};

export type Dict = {
  header: {
    print: string;
    themeToLight: string;
    themeToDark: string;
  };
  nav: {
    ariaLabel: string;
    home: string;
    skip: string;
  };
  hero: {
    role: string;
    meta: string;
    ctaEmail: string;
    ctaLinkedin: string;
    ctaDownload: string;
    kpis: {
      label: string;
      value: string;
      unit?: string;
    }[];
    /** Bloque `profile.ts` del hero: ventana de editor con syntax highlight */
    code: {
      prompt: string;
      years: string;
      location: string;
      stack: string[];
      status: string;
    };
  };
  statusBar: {
    branch: string;
    available: string;
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
  summary: string[];
  summaryHighlights: SummaryHighlight[];
  summaryAside: {
    location: string;
    focus: string;
  };
  stack: StackGroup[];
  experience: ExperienceEntry[];
  /** aria-label de la lista de chips de tecnologías por rol */
  experienceTechLabel: string;
  experienceToggle: {
    show: string;
    hide: string;
  };
  education: {
    date: string;
    school: string;
    degree: string;
  };
  certifications: Certifications;
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
    nav: {
      ariaLabel: "Secciones del CV",
      home: "inicio.md",
      skip: "Saltar al contenido",
    },
    hero: {
      role: "Ingeniero IT · Lead Full Stack",
      meta: "Nayarit, MX · +{years} años · GCP · Java · Spring Boot · React",
      ctaEmail: "Email",
      ctaLinkedin: "LinkedIn",
      ctaDownload: "Descargar CV",
      kpis: [
        { label: "experiencia", value: "{years}+", unit: "años" },
        { label: "trayectoria", value: "3", unit: "roles" },
        { label: "certificaciones", value: "26" },
      ],
      code: {
        prompt: "cat profile.ts",
        years: "+{years} años",
        location: "Nayarit, MX",
        stack: ["Java", "Spring Boot", "GCP", "Next.js"],
        status: "disponible",
      },
    },
    statusBar: {
      branch: "main",
      available: "Disponible para proyectos",
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
    summary: [
      "Ingeniero IT y Lead Full Stack con +{years} años construyendo e integrando soluciones empresariales en la nube.",
      "Lidero equipos en VASS LATAM y combino la gestión técnica con arquitectura, revisión de código y diseño de sistemas.",
      "Especialista en Java (Spring Boot), GCP, APIs (Apigee, MuleSoft) y frontend moderno (Next.js, React, TypeScript).",
      "Integro IA en el ciclo de desarrollo para entregar antes, sin sacrificar la revisión humana.",
    ],
    summaryHighlights: [
      {
        label: "Liderazgo",
        text: "Equipos Full Stack con mentoría, revisión de código y estándares de entrega.",
      },
      {
        label: "Arquitectura",
        text: "Sistemas cloud en GCP con Java, Spring Boot y APIs seguras.",
      },
      {
        label: "Integración",
        text: "Ecosistemas empresariales conectados con MuleSoft y Apigee.",
      },
    ],
    summaryAside: {
      location: "Ubicación",
      focus: "Enfoque",
    },
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
        hash: "8f2c1ad",
        head: true,
        tech: ["Java", "Spring Boot", "GCP", "React", "Next.js", "TypeScript"],
        bullets: [
          "Lidero un equipo de desarrolladores Full Stack: mentoría, planificación y seguimiento operativo que mejoran la previsibilidad de entrega.",
          "Trabajo con los arquitectos en decisiones y documentación de arquitectura; los diagramas y especificaciones que produzco reducen el retrabajo entre diseño e implementación.",
          "Responsable de la revisión de código previa a producción y del estándar documental de los proyectos, reduciendo los incidentes originados en cambios.",
          "Integro herramientas de IA en el desarrollo Full Stack y acorto el ciclo de implementación sin relajar la revisión humana.",
        ],
      },
      {
        company: "VASS LATAM",
        role: "Integrador de Servicios",
        location: "Ciudad de México",
        period: "feb 2023 — jun 2025",
        duration: "+2 años 4 meses",
        hash: "c47d902",
        tech: [
          "MuleSoft",
          "Anypoint Studio",
          "Spring Boot",
          "GCP",
          "Node.js",
          "SQL Server",
          "PostgreSQL",
        ],
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
        hash: "b91e6f3",
        tech: [
          "JSP",
          "Java Servlets",
          "Spring Boot",
          "Thymeleaf",
          "SQL Server",
          "PostgreSQL",
          "MySQL",
        ],
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
    experienceTechLabel: "Tecnologías del rol",
    education: {
      date: "2015",
      school: "Universidad Tecnológica de La Costa",
      degree: "Ingeniería en Tecnologías de la Información y Comunicación",
    },
    certifications: {
      featured: {
        label: "Certificación principal",
        name: "Google Cloud Associate Cloud Engineer (ACE)",
        issuer: "Google Cloud",
        year: "[2026-2029]",
        icon: "Google Cloud Platform (GCP)",
      },
      groups: [
        {
          id: "cloud",
          label: "Cloud & DevOps",
          items: [
            {
              name: "Build Infrastructure with Terraform on Google Cloud — Skill Badge",
            },
            {
              name: "Implement Cloud Security Fundamentals on Google Cloud — Skill Badge",
            },
            { name: "Desarrollo de software seguro", year: "2025" },
            { name: "Azure DevOps" },
            { name: "Git", year: "2024" },
          ],
        },
        {
          id: "integration",
          label: "Integración & APIs",
          items: [
            { name: "API Development with Apigee", year: "2024" },
            { name: "MuleSoft 4 Fundamentals" },
            { name: "API REST y Docker" },
            { name: "Integraciones con SQL Server", year: "2024" },
          ],
        },
        {
          id: "frontend",
          label: "Frontend",
          items: [
            { name: "Next.js: el framework de React" },
            { name: "Angular Pro", year: "2025" },
          ],
        },
        {
          id: "ai",
          label: "IA & Automatización",
          items: [
            { name: "IA Generativa", year: "2025" },
            { name: "n8n", year: "2025" },
          ],
        },
        {
          id: "backend",
          label: "Backend & Arquitectura",
          items: [
            { name: "Microservicios con Spring Cloud" },
            { name: "Microservicios con Spring" },
            { name: "Tuning del servidor PostgreSQL" },
            { name: "DBA Postgres", year: "2025" },
            { name: "Principios SOLID y Clean Code" },
            { name: "Patrones de diseño y SOLID", year: "2024" },
            { name: "Spring Batch", year: "2024" },
            { name: "JUnit & Mockito", year: "2024" },
            { name: "Alternativas modernas para la Arquitectura de Software" },
            { name: "Certificación Profesional en Java 6 — Oracle" },
          ],
        },
        {
          id: "leadership",
          label: "Liderazgo",
          items: [
            { name: "Liderazgo: Gerencia en Tecnología" },
            { name: "Jira", year: "2024" },
          ],
        },
      ],
    },
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Intermedio" },
    ],
    contact: {
      email: "felixjavier0@gmail.com",
      phone: "(+52) 323-104-0000",
      location: "Nayarit, México",
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
    nav: {
      ariaLabel: "CV sections",
      home: "home.md",
      skip: "Skip to content",
    },
    hero: {
      role: "IT Engineer · Full Stack Developer",
      meta: "Nayarit, MX · +{years} yrs · GCP · Java · Spring Boot · React",
      ctaEmail: "Email",
      ctaLinkedin: "LinkedIn",
      ctaDownload: "Download CV",
      kpis: [
        { label: "experience", value: "{years}+", unit: "yrs" },
        { label: "trajectory", value: "3", unit: "roles" },
        { label: "certifications", value: "26" },
      ],
      code: {
        prompt: "cat profile.ts",
        years: "+{years} yrs",
        location: "Nayarit, MX",
        stack: ["Java", "Spring Boot", "GCP", "Next.js"],
        status: "available",
      },
    },
    statusBar: {
      branch: "main",
      available: "Open to projects",
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
    summary: [
      "IT Engineer & Full Stack Developer with +{years} years building and integrating enterprise cloud solutions.",
      "I lead teams at VASS LATAM, combining technical management with architecture, code review and system design.",
      "Specialized in Java (Spring Boot), GCP, APIs (Apigee, MuleSoft) and modern frontend (Next.js, React, TypeScript).",
      "I embed AI into the development cycle to ship faster without sacrificing human review.",
    ],
    summaryHighlights: [
      {
        label: "Leadership",
        text: "Full Stack teams with mentoring, code review and delivery standards.",
      },
      {
        label: "Architecture",
        text: "Cloud systems on GCP with Java, Spring Boot and secure APIs.",
      },
      {
        label: "Integration",
        text: "Enterprise ecosystems connected with MuleSoft and Apigee.",
      },
    ],
    summaryAside: {
      location: "Location",
      focus: "Focus",
    },
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
        hash: "8f2c1ad",
        head: true,
        tech: ["Java", "Spring Boot", "GCP", "React", "Next.js", "TypeScript"],
        bullets: [
          "Lead a team of Full Stack developers, with mentoring, planning and operational tracking that improve delivery predictability.",
          "Partner with architects on architecture decisions and documentation; the diagrams and specifications I produce cut design-to-implementation rework.",
          "Own pre-production code review and the project documentation standard, reducing change-induced incidents.",
          "Embed AI tooling in Full Stack delivery, shortening the implementation cycle without relaxing human review.",
        ],
      },
      {
        company: "VASS LATAM",
        role: "Services Integrator",
        location: "Mexico City",
        period: "Feb 2023 — Jun 2025",
        duration: "+2 yr 4 mo",
        hash: "c47d902",
        tech: [
          "MuleSoft",
          "Anypoint Studio",
          "Spring Boot",
          "GCP",
          "Node.js",
          "SQL Server",
          "PostgreSQL",
        ],
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
        hash: "b91e6f3",
        tech: [
          "JSP",
          "Java Servlets",
          "Spring Boot",
          "Thymeleaf",
          "SQL Server",
          "PostgreSQL",
          "MySQL",
        ],
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
    experienceTechLabel: "Role technologies",
    education: {
      date: "2015",
      school: "Universidad Tecnológica de La Costa",
      degree: "B.Eng. in Information and Communication Technologies",
    },
    certifications: {
      featured: {
        label: "Featured certification",
        name: "Google Cloud Associate Cloud Engineer (ACE)",
        issuer: "Google Cloud",
        year: "[2026-2029]",
        icon: "Google Cloud Platform (GCP)",
      },
      groups: [
        {
          id: "cloud",
          label: "Cloud & DevOps",
          items: [
            {
              name: "Build Infrastructure with Terraform on Google Cloud — Skill Badge",
            },
            {
              name: "Implement Cloud Security Fundamentals on Google Cloud — Skill Badge",
            },
            { name: "Secure Software Development", year: "2025" },
            { name: "Azure DevOps" },
            { name: "Git", year: "2024" },
          ],
        },
        {
          id: "integration",
          label: "Integration & APIs",
          items: [
            { name: "API Development with Apigee", year: "2024" },
            { name: "MuleSoft 4 Fundamentals" },
            { name: "REST API and Docker" },
            { name: "SQL Server Integrations", year: "2024" },
          ],
        },
        {
          id: "frontend",
          label: "Frontend",
          items: [
            { name: "Next.js: the React framework" },
            { name: "Angular Pro", year: "2025" },
          ],
        },
        {
          id: "ai",
          label: "AI & Automation",
          items: [
            { name: "Generative AI", year: "2025" },
            { name: "n8n", year: "2025" },
          ],
        },
        {
          id: "backend",
          label: "Backend & Architecture",
          items: [
            { name: "Microservices with Spring Cloud" },
            { name: "Microservices with Spring" },
            { name: "PostgreSQL Server Tuning" },
            { name: "DBA Postgres", year: "2025" },
            { name: "SOLID Principles and Clean Code" },
            { name: "Design Patterns and SOLID", year: "2024" },
            { name: "Spring Batch", year: "2024" },
            { name: "JUnit & Mockito", year: "2024" },
            { name: "Modern Alternatives for Software Architecture" },
            { name: "Oracle Certified Professional Java 6" },
          ],
        },
        {
          id: "leadership",
          label: "Leadership",
          items: [
            { name: "Leadership: Technology Management" },
            { name: "Jira", year: "2024" },
          ],
        },
      ],
    },
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Intermediate (B2)" },
    ],
    contact: {
      email: "felixjavier0@gmail.com",
      phone: "323-104-0000",
      location: "Nayarit, Mexico",
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
