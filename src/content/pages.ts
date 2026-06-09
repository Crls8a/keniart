export const pageContent = {
  home: {
    metadata: {
      title: "Inicio",
      openGraphTitle: "Keniart | Portafolio de arte contemporáneo",
    },
    hero: {
      eyebrow: "Galería digital",
      title: "Cartografías del alma: paisajes interiores, viaje y memoria.",
      description: "Una serie de pinturas reunidas como mapas sensibles: territorios íntimos, luz, naturaleza y presencia simbólica.",
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
      description: "Catálogo de obras de la serie Cartografías del alma.",
    },
    header: {
      eyebrow: "Catálogo",
      title: "Obras",
      description:
        "Obras de Cartografías del alma reunidas como un recorrido de paisajes interiores, viaje, memoria y símbolos de transformación.",
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
      eyebrow: "Serie Cartografías del alma",
      title: "Entrar a la serie actual.",
      description:
        "Pinturas reunidas en una lectura silenciosa. Cada obra abre su ficha para observar imágenes, presencia y datos disponibles.",
      ctaPrefix: "Comenzar por",
    },
    list: {
      eyebrow: "Recorrido",
      title: "La serie completa queda a la vista.",
      description: "Abrí cada obra para ver su ficha y, cuando existan, sus imágenes adicionales.",
      cardCta: "Ver ficha",
    },
  },
  galleryPresence: {
    eyebrow: "Presencia en galerías",
    title: "Presentación en galería.",
    description:
      "Un registro silencioso de sala, encuentro y contexto expositivo: imágenes de presencia en galería, separadas del catálogo de obra.",
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
      description: "Selección curada para revisión editorial y consulta profesional.",
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
