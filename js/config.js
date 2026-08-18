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
      id: "entrenamiento-1-1",
      name: "Entrenamiento personal conmigo 1:1",
      price: "$50",
      priceNote: "por sesión",
      // Mensaje enviado por WhatsApp al consultar un servicio.
      whatsappMessage:
        "Hola, quiero saber si el servicio de Entrenamiento personal conmigo 1:1 es adecuado para mi objetivo.",
    },
    {
      id: "rutina-pdf-sin-seguimiento",
      name: "Rutina PDF sin seguimiento",
      price: "$200",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, quiero saber si la Rutina PDF sin seguimiento es adecuada para mi objetivo.",
    },
    {
      id: "rutina-pdf-seguimiento",
      name: "Rutina PDF con seguimiento",
      price: "$250",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, quiero saber si la Rutina PDF con seguimiento es adecuada para mi objetivo.",
    },
    {
      id: "plan-alimentacion-seguimiento",
      name: "Plan de alimentación + seguimiento personalizado",
      price: "$250",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, quiero saber si el Plan de alimentación + seguimiento personalizado es adecuado para mi objetivo.",
    },
    {
      id: "plan-alimentacion-sin-seguimiento",
      name: "Plan de alimentación sin seguimiento",
      price: "$200",
      priceNote: "pago único",
      whatsappMessage:
        "Hola, quiero saber si el Plan de alimentación sin seguimiento es adecuado para mi objetivo.",
    },
    {
      id: "asesoria-personalizada",
      name: "Asesoría personalizada de 1 hora",
      price: "$50",
      priceNote: "por sesión",
      whatsappMessage:
        "Hola, quiero saber si la Asesoría personalizada de 1 hora es adecuada para mi objetivo.",
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
