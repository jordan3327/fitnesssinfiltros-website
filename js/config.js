/* ==========================================================================
   config.js - CONFIGURACIÓN EDITABLE DE LA CLIENTA
   --------------------------------------------------------------------------
   Toda la información que debe personalizar la propietaria del sitio está
   centralizada aquí. Busca los comentarios "PENDIENTE_CLIENTE" y actualiza
   cada valor confirmado.
   Este archivo se carga primero (antes de main.js).
   ========================================================================== */

window.CONFIG = {
  /* ------------------------------------------------------------------
   * Contacto principal
   * ------------------------------------------------------------------ */
  // PENDIENTE_CLIENTE: número real de WhatsApp en formato internacional,
  // SOLO dígitos, sin "+", sin espacios, sin guiones.
  // Ejemplo: "593991234567" (Ecuador, 12 dígitos).
  // Mientras esté vacío, los botones de WhatsApp informarán que aún
  // no está configurado en lugar de abrir un enlace roto.
  whatsappNumber: "",

  // PENDIENTE_CLIENTE: nombre de la entrenadora / profesional
  trainerName: "",

  // PENDIENTE_CLIENTE: correo de contacto real.
  // Vacío = se oculta el correo en el sitio.
  email: "",

  // PENDIENTE_CLIENTE: enlaces oficiales de redes sociales.
  // Vacíos = se ocultan en el sitio.
  instagramUrl: "",
  facebookUrl: "",
  tiktokUrl: "",
  youtubeUrl: "",

  // PENDIENTE_CLIENTE: ciudad o zona de atención (se usa en "location").
  location: "",

  // PENDIENTE_CLIENTE: modalidad de atención (online / presencial / híbrida).
  // Vacío = se oculta la sección de modalidad.
  modality: "",

  // PENDIENTE_CLIENTE: horarios de atención.
  // Vacío = se ocultan los horarios.
  schedule: "",

  // PENDIENTE_CLIENTE: métodos de pago disponibles.
  // Vacío = no se muestran métodos de pago.
  paymentMethods: [],

  /* ------------------------------------------------------------------
   * Servicios y precios
   * ------------------------------------------------------------------ */
  services: [
    {
      id: "rutina-pdf-sin-seguimiento",
      name: "Rutina PDF sin seguimiento personalizado",
      price: "$200",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, quiero saber si la Rutina PDF sin seguimiento personalizado es adecuada para mi objetivo.",
    },
    {
      id: "rutina-pdf-seguimiento",
      name: "Rutina PDF + seguimiento personalizado",
      price: "$250",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, quiero saber si la Rutina PDF + seguimiento personalizado es adecuada para mi objetivo.",
    },
    {
      id: "guia-alimentacion-seguimiento",
      name: "Guía Personal de Alimentación Fitness + seguimiento personalizado",
      price: "$250",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, quiero saber si la Guía Personal de Alimentación Fitness + seguimiento personalizado es adecuada para mi objetivo.",
    },
    {
      id: "guia-alimentacion-sin-seguimiento",
      name: "Guía Personal de Alimentación Fitness sin seguimiento",
      price: "$200",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, quiero saber si la Guía Personal de Alimentación Fitness sin seguimiento es adecuada para mi objetivo.",
    },
    {
      id: "asesoria-20-min",
      name: "Asesoría personalizada (20 minutos)",
      price: "$50",
      priceNote: "por sesión",
      whatsappMessage:
        "Hola, quiero saber si la Asesoría personalizada (20 minutos) es adecuada para mi objetivo.",
    },
    {
      id: "pack-8-semanas",
      name: "Pack especial 8 semanas",
      price: "$399",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, quiero saber si el Pack especial 8 semanas es adecuado para mi objetivo.",
    },
  ],

  /* ------------------------------------------------------------------
   * Opciones del formulario de contacto
   * (los servicios se reutilizan arriba en el campo "Servicio de interés")
   * ------------------------------------------------------------------ */
  contactGoals: [
    "Definición",
    "Ganar masa muscular",
    "Entrenamiento guiado",
    "Mejorar hábitos alimenticios",
    "Aumentar energía",
    "Otro objetivo",
  ],

  /* ------------------------------------------------------------------
   * Textos de marca
   * ------------------------------------------------------------------ */
  tagline: "Resultados reales, sin mitos, sin extremos y sin estrés.",
};
