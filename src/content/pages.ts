export const pageContent = {
  home: {
    metadata: {
      title: "Inicio",
      openGraphTitle: "Keniart | Portafolio de arte contemporáneo",
    },
    hero: {
      eyebrow: "Galería digital",
      title: "Retratos de compañía en óleo sobre lienzo pintado.",
      description: "Pinto tu mascota: presencia, gesto y mirada de cada animal en una lectura pictórica cercana.",
      primaryCta: "Ver obras",
      secondaryCta: "Entrar a la serie",
      featuredLabel: "Obra destacada",
    },
    recentWorks: {
      eyebrow: "Selección",
      title: "Obras recientes",
      cta: "Ver catálogo completo",
    },
  },
  artworks: {
    metadata: {
      title: "Obras",
      description: "Catálogo de óleos sobre lienzo pintado de la serie Pinto tu mascota.",
    },
    header: {
      eyebrow: "Catálogo",
      title: "Obras",
      description:
        "Retratos de compañía organizados como archivo público del estudio. Las medidas finales se mantienen pendientes hasta contar con ficha confirmada.",
    },
    collectionSchemaName: "Catálogo de obras Keniart",
  },
  series: {
    metadata: {
      title: "Series",
      description: "Cuerpos de trabajo y narrativas visuales de Keniart.",
      notFoundTitle: "Serie no encontrada",
    },
    header: {
      eyebrow: "Cuerpos de trabajo",
      title: "Series",
    },
  },
  galleries: {
    metadata: {
      title: "Para galerías",
      description: "Selección fullscreen curada para galerías y propuestas curatoriales.",
    },
  },
  galleryExperience: {
    hero: {
      eyebrow: "Serie Pinto tu mascota",
      title: "Entrar a la serie actual.",
      description:
        "Retratos de compañía reunidos en una lectura silenciosa. Cada obra abre su ficha para observar imágenes, presencia y datos disponibles.",
      ctaPrefix: "Comenzar por",
    },
    list: {
      eyebrow: "Recorrido",
      title: "La serie completa queda a la vista.",
      description: "Abrí cada retrato para ver su ficha y, cuando existan, sus imágenes adicionales.",
      cardCta: "Ver ficha",
    },
  },
  dossier: {
    metadata: {
      title: "Dossier",
      description: "Dossier web con statement, bio y selección de obra para galerías.",
    },
    hero: {
      eyebrow: "Dossier para galerías",
      title: "Una selección curada para lectura profesional.",
    },
    selectedWorks: {
      title: "Selección de obra",
      description: "Pinto tu mascota reunida para revisión editorial y consulta profesional.",
    },
    download: {
      eyebrow: "Dossier PDF",
      title: "Press kit para galerías",
      description:
        "Placeholder del MVP: la página interactiva está lista y el PDF final se conectará en",
      assetPath: "public/dossier/dossier-galerias.pdf",
      assetSuffix: "cuando existan assets definitivos.",
      cta: "Ver dossier web",
    },
  },
  contact: {
    metadata: {
      title: "Contacto",
      description: "Consultas de obra, galerías, dossier y contacto directo por WhatsApp.",
    },
    header: {
      eyebrow: "Contacto",
      title: "Consultas y galerías",
      description: "Para disponibilidad, reservas, dossier o propuestas curatoriales, escribí al estudio por WhatsApp.",
      whatsappLabel: "WhatsApp directo",
      instagramLabel: "Referencia en Instagram",
      dossierLink: "Ver dossier web",
      whatsappMessage: "Hola, quiero consultar una obra de Keniart.",
    },
  },
  artist: {
    metadata: {
      title: "Artista",
    },
    bio: {
      eyebrow: "Artista",
    },
    cvTitle: "CV breve",
  },
  artworkDetail: {
    fields: {
      year: "Año",
      technique: "Técnica",
      support: "Soporte",
      dimensions: "Medidas",
      price: "Precio",
    },
    galleryAside: {
      eyebrow: "Galería premium",
      fallbackNotes: "Lectura disponible dentro del recorrido de la serie actual.",
      cta: "Volver a la serie",
    },
    actions: {
      inquire: "Consultar obra",
      backToCatalog: "Volver al catálogo",
    },
  },
} as const;
