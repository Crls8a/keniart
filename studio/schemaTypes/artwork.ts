import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Obra de Arte',
  type: 'document',

  fields: [
    // ============================================
    // TÍTULO - Identificación principal de la obra
    // ============================================
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // ============================================
    // SLUG - URL estable y SEO-friendly
    // No cambia aunque se modifique el título
    // ============================================
    defineField({
      name: 'slug',
      title: 'URL / Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ============================================
    // DESCRIPCIÓN - Contexto y detalles de la obra
    // Opcional para obras que no requieren explicación
    // ============================================
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),

    // ============================================
    // IMÁGENES - Galería de la obra
    // Alt obligatorio solo en la primera imagen (portada)
    // Las imágenes adicionales tienen alt opcional
    // ============================================
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description:
                'Obligatorio en la portada (primera imagen). Opcional en el resto.',
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.custom((images) => {
          // La primera imagen debe tener alt
          if (images && images.length > 0) {
            const first = images[0]
            if (!first.alt || first.alt.trim() === '') {
              return {
                message: 'La primera imagen (portada) debe tener texto alternativo.',
                paths: [
                  {
                    path: ['0', 'alt'],
                  },
                ],
              }
            }
          }
          return true
        }).min(1).required(),
    }),

    // ============================================
    // TÉCNICA - Dropdown con valores predefinidos
    // ============================================
    defineField({
      name: 'medium',
      title: 'Técnica',
      type: 'string',
      initialValue: 'oil_on_canvas',
      options: {
        list: [
          {title: 'Óleo sobre lienzo', value: 'oil_on_canvas'},
          {title: 'Acrílico sobre lienzo', value: 'acrylic_on_canvas'},
          {title: 'Acuarela', value: 'watercolor'},
          {title: 'Gouache', value: 'gouache'},
          {title: 'Tinta / Ink', value: 'ink'},
          {title: 'Mixta (mixed media)', value: 'mixed_media'},
          {title: 'Digital', value: 'digital'},
          {title: 'Grafito / Lápiz', value: 'graphite'},
          {title: 'Pastel', value: 'pastel'},
          {title: 'Carbón', value: 'charcoal'},
          {title: 'Otra', value: 'other'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'mediumOther',
      title: 'Técnica (otra)',
      type: 'string',
      description: 'Solo si seleccionaste "Otra".',
      hidden: ({parent}) => parent?.medium !== 'other',
    }),

    // ============================================
    // DIMENSIONES - Medidas físicas de la obra
    // ============================================
    defineField({
      name: 'dimensions',
      title: 'Dimensiones',
      type: 'string',
      description: 'Ej: 50 x 70 cm',
    }),

    // ============================================
    // AÑO - Fecha de creación
    // ============================================
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1900).max(new Date().getFullYear() + 1),
    }),

    // ============================================
    // ESTADO - Control de disponibilidad
    // available: Disponible para venta
    // reserved: Reservada (proceso de venta en curso)
    // sold: Vendida (ya no disponible)
    // ============================================
    defineField({
      name: 'status',
      title: 'Estado de disponibilidad',
      type: 'string',
      options: {
        list: [
          {title: 'Disponible', value: 'available'},
          {title: 'Reservada', value: 'reserved'},
          {title: 'Vendida', value: 'sold'},
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),

    // ============================================
    // PRECIO - Valor de la obra
    // showPrice: false oculta el precio públicamente
    // (útil para obras vendidas o por acuerdo privado)
    // ============================================
    defineField({
      name: 'priceMxn',
      title: 'Precio (MXN)',
      type: 'number',
      validation: (Rule) => Rule.min(0).precision(2),
    }),

    defineField({
      name: 'showPrice',
      title: 'Mostrar precio públicamente',
      description: 'Desactiva esto para ocultar el precio en la web (ej: obras vendidas)',
      type: 'boolean',
      initialValue: true,
    }),

    // ============================================
    // ORDEN - Curaduría manual (opcional)
    // ============================================
    defineField({
      name: 'order',
      title: 'Orden (curaduría)',
      type: 'number',
      description: 'Opcional. Menor número aparece primero (1 = primero). Déjalo vacío si no te importa el orden.',
      validation: (Rule) => Rule.integer().min(1),
    }),

    // ============================================
    // FECHA DE PUBLICACIÓN - Para ordenar cronológicamente
    // ============================================
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],

  // Configuración de vista previa en el Studio
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      status: 'status',
    },
    prepare(selection) {
      const {title, media, status} = selection

      const statusEmoji = {
        available: '🟢',
        reserved: '🟡',
        sold: '🔴',
      }

      return {
        title: `${statusEmoji[status as keyof typeof statusEmoji] || ''} ${title}`,
        media,
      }
    },
  },
})
