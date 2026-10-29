/**
 * ARCHIVO MAESTRO DE CONTENIDOS Y CONFIGURACION DE TEXTOS (ES / EN)
 * Gestiona de forma centralizada toda la redaccion corporativa de LESSSO.
 * Para modificar textos, datos de contacto o anadir traducciones, edite este archivo.
 */

export const SITE_CONFIG = {
  brandName: "LESSSO",
  tagline: "Ingeniería de precisión, trato humano",
  
  // ---------------------------------------------------------------------------
  // DATOS DE CONTACTO CORPORATIVO (Editar aqui para reemplazos definitivos)
  // ---------------------------------------------------------------------------
  contact: {
    officialEmail: "contacto@lessso.com",
    displayPhone: "+52 (664) 227-6711",
    whatsappNumber: "526642276711",
    address: { city: "Tijuana", country: "México" },
  },

  // ---------------------------------------------------------------------------
  // REDES Y ENLACES SOCIALES CORPORATIVOS
  // Modifique aqui las URLs oficiales definitivas de la marca
  // ---------------------------------------------------------------------------
  socialLinks: {
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
    tiktok: "https://www.tiktok.com",
    x: "https://x.com",
    github: "https://github.com",
  },
};

export const SITE_CONTENT = {
  es: {
    meta: {
      title: "LESSSO | Ingeniería de Precisión, Trato Humano",
      description: "Plataforma de ciberseguridad avanzada, desarrollo de software crítico y arquitectura de infraestructura resiliente para organizaciones modernas.",
    },
    nav: {
      cybersecurity: "Ciberseguridad",
      software: "Desarrollo de Software",
      infrastructure: "Infraestructura",
      us: "Nosotros",
      contact: "Contacto",
      langSelect: "Idioma",
    },
    hero: {
      pretitle: "ARQUITECTURA DIGITAL Y CIBERSEGURIDAD",
      titleLine1: "Ingeniería tecnológica de",
      titleLine2Italic: "precisión",
      titleLine3: "con trato cercano.",
      subtitle: "Protegemos sus operaciones, desarrollamos software y ayudamos a mejorar su infraestructura tecnológica con atención cercana y soluciones claras.",
      ctaPrimary: "Solicitar diagnóstico",
      ctaSecondary: "Conocer Nuestro Método",
      scrollHint: "Desplazar para explorar",
    },
    pillars: {
      sectionBadge: "LOS TRES PILARES DE CONFIANZA",
      sectionTitle: "Por qué las organizaciones eligen trabajar con",
      sectionTitleBrand: "LESSSO",
      
      // Pilar 1: El Problema que Resolvemos
      pillar1: {
        number: "01",
        label: "EL PROBLEMA QUE RESOLVEMOS",
        title: "Claridad frente a la dispersión tecnológica",
        description: "Los sistemas desconectados, las dudas de seguridad y una infraestructura difícil de mantener pueden frenar el trabajo de una organización. En LESSSO escuchamos sus necesidades, analizamos el problema y proponemos soluciones claras para su equipo.",
        highlights: [
          "Diagnóstico sin jerga confusa ni sobrecostos ocultos.",
          "Trato directo con ingenieros especialistas, sin intermediarios comerciales.",
          "Resolución basada en métricas verificables de seguridad y disponibilidad.",
        ],
      },

      // Pilar 2: Nuestra Filosofía (Misión y Visión de Alto Contraste)
      pillar2: {
        number: "02",
        label: "NUESTRA FILOSOFÍA",
        title: "Ingeniería de precisión, trato humano",
        missionCard: {
          tag: "MISIÓN",
          heading: "Asegurar y potenciar los activos digitales de cada cliente.",
          text: "Diseñar, construir y proteger sistemas tecnológicos con atención al detalle, para que las soluciones sean útiles y comprensibles para el equipo del cliente.",
        },
        visionCard: {
          tag: "VISIÓN",
          heading: "Ser un equipo de confianza para quienes necesitan soluciones tecnológicas.",
          text: "Consolidarnos como el socio de confianza preferido por empresas en crecimiento y corporativos que exigen excelencia técnica sin perder la calidez, la transparencia y el compromiso de un equipo dedicado.",
        },
      },

      // Pilar 3: Transparencia y Proceso
      pillar3: {
        number: "03",
        label: "TRANSPARENCIA Y PROCESO",
        title: "Un método predecible en tres etapas claras",
        steps: [
          {
            stepNumber: "01",
            title: "Diagnóstico Claro",
            description: "Evaluamos el estado real de sus sistemas, código y perímetros defensivos. Entregamos un informe ejecutivo comprensible con prioridades técnicas clasificadas por impacto y riesgo.",
          },
          {
            stepNumber: "02",
            title: "Arquitectura sin Sorpresas",
            description: "Definimos la solución, el alcance, los tiempos y el presupuesto junto con usted antes de comenzar el trabajo.",
          },
          {
            stepNumber: "03",
            title: "Acompañamiento Continuo",
            description: "Documentamos lo que entregamos y acordamos con usted el acompañamiento que necesite después del proyecto.",
          },
        ],
      },
    },

    contact: {
      sectionBadge: "INICIEMOS LA CONVERSACIÓN",
      sectionTitle: "Cuéntenos sobre su",
      sectionTitleItalic: "próximo desafío",
      sectionSubtitle: "Complete el formulario para enviarnos su consulta por correo.",
      
      switch: {
        person: "Persona",
        company: "Empresa",
      },

      fields: {
        fullName: {
          label: "Nombre Completo",
          placeholder: "Ej. Roberto Morales",
        },
        email: {
          label: "Correo Electrónico Corporativo",
          placeholder: "nombre@organizacion.com",
        },
        phone: {
          label: "Teléfono / WhatsApp",
          placeholder: "0000000000",
          helper: "10 dígitos local, hasta 15 con lada",
        },
        area: {
          label: "Área de Interés Principal",
          placeholder: "Seleccione una disciplina...",
          options: [
            "Ciberseguridad",
            "Desarrollo de Software",
            "Infraestructura",
            "Consultoría Integral",
          ],
        },
        projectDetails: {
          label: "Detalles del Proyecto o Necesidad",
          placeholder: "Describa brevemente el objetivo, tecnologías actuales o desafíos que desea resolver (mínimo 20 caracteres)...",
        },
        companyName: {
          label: "Nombre de la Organización",
          placeholder: "Ej. Grupo Industrial Nexus",
        },
        jobTitle: {
          label: "Puesto o Cargo",
          placeholder: "Ej. Director de Tecnología / Fundador",
        },
        companySize: {
          label: "Tamaño de la Organización",
          placeholder: "Seleccione el rango de colaboradores...",
          options: [
            "1-10 empleados",
            "11-50 empleados",
            "51-200 empleados",
            "Más de 200 empleados",
          ],
        },
        urgency: {
          label: "Nivel de Urgencia",
          placeholder: "Seleccione el horizonte de tiempo...",
          options: [
            "Inmediato / Crítico",
            "1 a 3 meses",
            "Explorando opciones",
          ],
        },
        budget: {
          label: "Presupuesto Estimado",
          placeholder: "Rango de inversión previsto...",
          options: [
            "Menos de $2,500 USD",
            "$2,500 - $10,000 USD",
            "Más de $10,000 USD",
            "A definir / Necesito cotización",
          ],
        },
        terms: {
          checkbox: "He leído y acepto los Términos de Servicio y el Aviso de Privacidad de LESSSO.",
        },
      },

      buttons: {
        submit: "Enviar consulta",
        submitting: "Procesando Solicitud...",
        whatsappDefault: "Iniciar Conversación en WhatsApp",
      },

      cooldown: {
        activeTitle: "Periodo de espera activo",
        activeMessage: "Para evitar solicitudes repetidas, podrá volver a enviar el formulario en:",
        secondsLabel: "segundos",
      },

      feedback: {
        successHeading: "Consulta enviada",
        successText: "Su consulta fue enviada. Nos pondremos en contacto con usted.",
      },
    },

    footer: {
      tagline: "Ingeniería de precisión, trato humano. Soluciones tecnológicas rigurosas para organizaciones que no admiten fallas.",
      navigationHeading: "Navegación",
      servicesHeading: "Servicios",
      divisionsHeading: "Especialidades",
      legalHeading: "Transparencia Legal",
      contactHeading: "Contacto Directo",
      rights: "Todos los derechos reservados.",
      leapOfFaith: "Just a leap of faith.",
      termsLink: "Términos de Servicio",
      privacyLink: "Aviso de Privacidad",
      cookiesLink: "Política de Cookies",
    },

    notFound: {
      badge: "ESTADO DEL SERVICIO: MODULO EN DESPLIEGUE",
      code: "404",
      title: "Ruta no disponible o en desarrollo",
      description: "El módulo que intenta consultar se encuentra actualmente bajo proceso de arquitectura e implementación controlada. No se han detectado brechas ni fallos en la infraestructura.",
      backButton: "Regresar al Inicio",
    },
  },

  // ---------------------------------------------------------------------------
  // ESTRUCTURA PREPARADA PARA IDIOMA INGLES (EN)
  // ---------------------------------------------------------------------------
  en: {
    meta: {
      title: "LESSSO | Precision Engineering, Human Commitment",
      description: "Advanced cybersecurity, critical software development, and resilient infrastructure architecture for modern organizations.",
    },
    nav: {
      cybersecurity: "Cybersecurity",
      software: "Software Development",
      infrastructure: "Infrastructure",
      us: "About Us",
      contact: "Contact",
      langSelect: "Language",
    },
    hero: {
      pretitle: "DIGITAL ARCHITECTURE AND CYBERSECURITY",
      titleLine1: "Technological engineering of",
      titleLine2Italic: "precision",
      titleLine3: "with direct human focus.",
      subtitle: "We safeguard your operations, build high-performance software, and streamline technical infrastructure. Less corporate friction, greater technical certainty.",
      ctaPrimary: "Request an Assessment",
      ctaSecondary: "Explore Our Method",
      scrollHint: "Scroll to explore",
    },
    pillars: {
      sectionBadge: "THREE PILLARS OF TRUST",
      sectionTitle: "Why leading organizations partner with",
      sectionTitleBrand: "LESSSO",
      pillar1: {
        number: "01",
        label: "THE PROBLEM WE SOLVE",
        title: "Clarity amidst technological dispersion",
        description: "Disconnected systems, security concerns, and infrastructure that is difficult to maintain can slow an organization down. We listen to your needs, examine the problem, and propose clear solutions for your team.",
        highlights: [
          "Assessment with zero confusing jargon or hidden fees.",
          "Direct dialogue with senior engineers, no sales intermediaries.",
          "Resolution based on measurable security and uptime metrics.",
        ],
      },
      pillar2: {
        number: "02",
        label: "OUR PHILOSOPHY",
        title: "Precision engineering, human commitment",
        missionCard: {
          tag: "MISSION",
          heading: "Protect and empower every client's digital assets.",
          text: "Design, build, and protect technology with care, creating solutions that are useful and understandable to our clients.",
        },
        visionCard: {
          tag: "VISION",
          heading: "Become a trusted team for people who need technology solutions.",
          text: "Become the preferred strategic partner for growing enterprises requiring technical rigor without sacrificing clarity and personal dedication.",
        },
      },
      pillar3: {
        number: "03",
        label: "TRANSPARENCY AND PROCESS",
        title: "A predictable method in three clear stages",
        steps: [
          {
            stepNumber: "01",
            title: "Clear Diagnosis",
            description: "We evaluate the real status of your infrastructure and source code, delivering a prioritized roadmap classified by impact.",
          },
          {
            stepNumber: "02",
            title: "Zero-Surprise Architecture",
            description: "We define the solution, scope, timeline, and budget with you before work begins.",
          },
          {
            stepNumber: "03",
            title: "Continuous Partnership",
            description: "We document what we deliver and agree on the support you need after the project.",
          },
        ],
      },
    },
    contact: {
      sectionBadge: "START THE CONVERSATION",
      sectionTitle: "Tell us about your",
      sectionTitleItalic: "upcoming challenge",
      sectionSubtitle: "Complete the form to send us your inquiry by email.",
      switch: {
        person: "Individual",
        company: "Company",
      },
      fields: {
        fullName: {
          label: "Full Name",
          placeholder: "e.g. Robert Miller",
        },
        email: {
          label: "Corporate Email",
          placeholder: "name@company.com",
        },
        phone: {
          label: "Phone / WhatsApp",
          placeholder: "0000000000",
          helper: "10 digits local, up to 15 with country code",
        },
        area: {
          label: "Primary Area of Interest",
          placeholder: "Select a discipline...",
          options: [
            "Ciberseguridad",
            "Desarrollo de Software",
            "Infraestructura",
            "Consultoría Integral",
          ],
        },
        projectDetails: {
          label: "Project Scope or Technical Need",
          placeholder: "Briefly describe your objectives, current stack, or key challenges (minimum 20 characters)...",
        },
        companyName: {
          label: "Company / Organization Name",
          placeholder: "e.g. Nexus Industrial Group",
        },
        jobTitle: {
          label: "Job Title",
          placeholder: "e.g. Chief Technology Officer / Founder",
        },
        companySize: {
          label: "Organization Size",
          placeholder: "Select employee range...",
          options: [
            "1-10 empleados",
            "11-50 empleados",
            "51-200 empleados",
            "Más de 200 empleados",
          ],
        },
        urgency: {
          label: "Urgency Level",
          placeholder: "Select timeframe...",
          options: [
            "Inmediato / Crítico",
            "1 a 3 meses",
            "Explorando opciones",
          ],
        },
        budget: {
          label: "Estimated Budget",
          placeholder: "Expected investment range...",
          options: [
            "Menos de $2,500 USD",
            "$2,500 - $10,000 USD",
            "Más de $10,000 USD",
            "A definir / Necesito cotización",
          ],
        },
        terms: {
          checkbox: "I have read and agree to LESSSO's Terms of Service and Privacy Notice.",
        },
      },
      buttons: {
        submit: "Send inquiry",
        submitting: "Processing Request...",
        whatsappDefault: "Start Conversation on WhatsApp",
      },
      cooldown: {
        activeTitle: "Active cooldown period",
        activeMessage: "To prevent repeated requests, you can submit the form again in:",
        secondsLabel: "seconds",
      },
      feedback: {
        successHeading: "Inquiry sent",
        successText: "Your inquiry has been sent. We will get in touch with you.",
      },
    },
    footer: {
      tagline: "Precision engineering, human commitment. Rigorous technological solutions for organizations that cannot afford downtime.",
      navigationHeading: "Navigation",
      servicesHeading: "Services",
      divisionsHeading: "Specialties",
      legalHeading: "Legal Transparency",
      contactHeading: "Direct Inquiries",
      rights: "All rights reserved.",
      leapOfFaith: "Just a leap of faith.",
      termsLink: "Terms of Service",
      privacyLink: "Privacy Notice",
      cookiesLink: "Cookie Policy",
    },
    notFound: {
      badge: "SERVICE STATUS: MODULE IN DEPLOYMENT",
      code: "404",
      title: "Route unavailable or under construction",
      description: "The requested module is undergoing scheduled engineering and architectural review. No infrastructure anomalies detected.",
      backButton: "Return to Homepage",
    },
  },
};

export type Locale = "es" | "en";
export type SiteContent = typeof SITE_CONTENT.es;
