/* ==========================================================================
   config.js — CONFIGURACIÓN EDITABLE DE LA CLIENTA
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
      id: "entrenamiento-1-1",
      name: "Entrenamiento personal 1:1",
      price: "$50",
      priceNote: "por sesión",
      // REEMPLAZAR: mensaje enviado por WhatsApp al pulsar "Me interesa"
      whatsappMessage:
        "Hola, me interesa el servicio de Entrenamiento personal 1:1. Quiero conocer más información.",
    },
    {
      id: "rutina-pdf-sin-seguimiento",
      name: "Rutina PDF sin seguimiento",
      price: "$200",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, me interesa la Rutina PDF sin seguimiento. Quiero conocer más información.",
    },
    {
      id: "rutina-pdf-seguimiento",
      name: "Rutina PDF con seguimiento",
      price: "$250",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, me interesa la Rutina PDF con seguimiento. Quiero conocer más información.",
    },
    {
      id: "plan-alimentacion-seguimiento",
      name: "Plan de alimentación con seguimiento personalizado",
      price: "$250",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, me interesa el Plan de alimentación con seguimiento personalizado. Quiero conocer más información.",
    },
    {
      id: "plan-alimentacion-sin-seguimiento",
      name: "Plan de alimentación sin seguimiento",
      price: "$200",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, me interesa el Plan de alimentación sin seguimiento. Quiero conocer más información.",
    },
    {
      id: "asesoria-personalizada",
      name: "Asesoría personalizada de una hora",
      price: "$50",
      priceNote: "por sesión",
      whatsappMessage:
        "Hola, me interesa la Asesoría personalizada de una hora. Quiero conocer más información.",
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
