/* ==========================================================================
   main.js — Funcionalidades globales
   - Botones de WhatsApp dinámicos (usando window.CONFIG)
   - Datos de contacto (correo, redes, horarios, modalidad) desde CONFIG
   - Año automático en el footer
   - Header con estado al hacer scroll
   - Botón "volver arriba"
   - Scroll suave con respeto a prefers-reduced-motion
   - Animaciones de aparición (IntersectionObserver)
   - Formulario de contacto: validación + confirmación + WhatsApp
   ========================================================================== */

(function () {
  "use strict";

  var CONFIG = window.CONFIG || {};

  /* ------------------------------------------------------------------
   * Utilidades
   * ------------------------------------------------------------------ */

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  // Número de WhatsApp validado: solo dígitos y con al menos 10 dígitos.
  // Evita abrir wa.me con números incompletos o de ejemplo ("593XXXXXXXXX").
  function getValidatedNumber() {
    var number = String(CONFIG.whatsappNumber || "").trim();
    if (!/^\d+$/.test(number)) {
      return "";
    }
    if (number.length < 10) {
      return "";
    }
    return number;
  }

  function getConfiguredWhatsAppUrl() {
    var url = String(CONFIG.whatsappUrl || "").trim();
    if (!url) {
      return "";
    }
    if (!/^https:\/\/wa\.me\/message\/[A-Za-z0-9]+$/.test(url)) {
      return "";
    }
    return url;
  }

  // URL de WhatsApp en formato internacional (sin "+", sin espacios).
  // Si no hay número válido, usa el enlace directo configurado por la clienta.
  function buildWhatsAppUrl(message) {
    var number = getValidatedNumber();
    if (number) {
      return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
    }
    return getConfiguredWhatsAppUrl() || null;
  }

  function getServiceMessage(serviceId) {
    if (!serviceId) {
      return "";
    }
    var services = CONFIG.services || [];
    for (var i = 0; i < services.length; i++) {
      if (services[i].id === serviceId) {
        return services[i].whatsappMessage || "";
      }
    }
    return "";
  }

  /* ------------------------------------------------------------------
   * Año automático en el footer
   * ------------------------------------------------------------------ */

  var yearEls = document.querySelectorAll("[data-year]");
  var currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = String(currentYear);
  });

  /* ------------------------------------------------------------------
   * Header con estado al hacer scroll
   * ------------------------------------------------------------------ */

  var header = document.querySelector(".site-header");

  function updateHeaderState() {
    if (!header) {
      return;
    }
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();

  /* ------------------------------------------------------------------
   * Botón "volver arriba"
   * ------------------------------------------------------------------ */

  var backToTop = document.querySelector(".back-to-top");

  function updateBackToTop() {
    if (!backToTop) {
      return;
    }
    var visible = window.scrollY > 600;
    backToTop.classList.toggle("is-visible", visible);
    backToTop.setAttribute("aria-hidden", visible ? "false" : "true");
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  }

  /* ------------------------------------------------------------------
   * Scroll suave para enlaces internos (#ancla)
   * ------------------------------------------------------------------ */

  function scrollToAnchor(target) {
    if (!target) {
      return;
    }

    const reduceMotion = prefersReducedMotion();
    const rect = target.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const centeredOffset = Math.max(0, (viewportHeight - rect.height) / 2);
    const targetTop = window.pageYOffset + rect.top - centeredOffset;
    const maxTop =
      document.documentElement.scrollHeight - viewportHeight;
    const nextTop = Math.min(Math.max(0, targetTop), Math.max(0, maxTop));

    window.scrollTo({
      top: nextTop,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href");
      if (targetId === "#") {
        return;
      }
      var target = document.querySelector(targetId);
      if (!target) {
        return;
      }
      event.preventDefault();
      scrollToAnchor(target);
      // Actualiza la URL sin saltar de nuevo.
      if (history.pushState) {
        history.pushState(null, "", targetId);
      }
    });
  });

  /* ------------------------------------------------------------------
   * Botones de WhatsApp dinámicos
   * Cualquier elemento con [data-whatsapp] abre el chat con un mensaje.
   * Uso:
   *   data-whatsapp                  -> habilita el botón
   *   data-service-id="plan-..."      -> usa el mensaje definido en CONFIG
   *   data-whatsapp-msg="..."         -> mensaje personalizado (opcional)
   * ------------------------------------------------------------------ */

  var defaultMessage = FSF.u(
    "Hola, me gustaría recibir más información sobre sus servicios."
  );

  // Estado "no configurado" para el sistema de botones aprobado
  // (docs/UIVERSE_BUTTON_PATTERNS.md, patrón 4): si el número oficial aún
  // no es válido, los controles de WhatsApp se marcan como deshabilitados.
  var whatsappAvailable = Boolean(getValidatedNumber() || getConfiguredWhatsAppUrl());

  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    if (!whatsappAvailable) {
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-unconfigured");
    }
    el.addEventListener("click", function (event) {
      event.preventDefault();

      var serviceId = el.getAttribute("data-service-id");
      var customMsg = el.getAttribute("data-whatsapp-msg");
      var message = customMsg || getServiceMessage(serviceId) || defaultMessage;

      var number = getValidatedNumber();
      var directUrl = getConfiguredWhatsAppUrl();

      if (!number && !directUrl) {
        // El número aún no está configurado de forma válida: informamos al visitante.
        alert(
          FSF.u(
            "El número oficial de WhatsApp todavía no está configurado. Inténtalo más tarde."
          )
        );
        return;
      }

      var url = buildWhatsAppUrl(message);
      if (url) {
        window.open(url, "_blank", "noopener");
      }
    });
  });

  /* ------------------------------------------------------------------
   * Datos de contacto desde CONFIG
   * - Enlaces de correo y redes sociales: se rellenan desde CONFIG y se
   *   ocultan si no están confirmados (PENDIENTE_CLIENTE).
   * - Horarios y modalidad de atención: se ocultan si no están confirmados.
   * ------------------------------------------------------------------ */

  document.querySelectorAll("[data-email]").forEach(function (el) {
    var email = String(CONFIG.email || "").trim();
    if (!email) {
      el.hidden = true;
      return;
    }
    var link = el.matches("a") ? el : el.querySelector("a");
    if (link) {
      link.setAttribute("href", "mailto:" + email);
      link.textContent = email;
    }
  });

  document.querySelectorAll("[data-social]").forEach(function (el) {
    var network = el.getAttribute("data-social");
    var url = String(CONFIG[network + "Url"] || "").trim();
    var link = el.matches("a") ? el : el.querySelector("a");
    if (!url) {
      el.hidden = true;
      return;
    }
    document
      .querySelectorAll('[data-social-pending="' + network + '"]')
      .forEach(function (pendingIcon) {
        pendingIcon.hidden = true;
      });
    if (link) {
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

  // Oculta los contenedores de iconos sociales si no quedan enlaces visibles.
  document.querySelectorAll(".social-list").forEach(function (list) {
    var hasVisibleLink = Array.prototype.some.call(
      list.querySelectorAll("a"),
      function (link) {
        return !link.hidden;
      }
    );
    if (!hasVisibleLink) {
      list.hidden = true;
    }
  });

  document.querySelectorAll("[data-contact-schedule]").forEach(function (el) {
    var schedule = String(CONFIG.schedule || "").trim();
    if (!schedule) {
      el.hidden = true;
      return;
    }
    var textEl = el.querySelector("[data-contact-schedule-text]");
    if (textEl) {
      textEl.textContent = schedule;
    }
  });

  document.querySelectorAll("[data-contact-modality]").forEach(function (el) {
    var modality = String(CONFIG.modality || "").trim();
    if (!modality) {
      el.hidden = true;
      return;
    }
    var textEl = el.querySelector("[data-contact-modality-text]");
    if (textEl) {
      textEl.textContent = modality;
    }
  });

  /* Resplandor direccional para tarjetas en dispositivos con ratón. */
  var supportsFinePointer =
    window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (supportsFinePointer && !prefersReducedMotion()) {
    document
      .querySelectorAll(".service-card, .benefit-card, .process-card")
      .forEach(function (card) {
        card.classList.add("has-spotlight");
        card.addEventListener("pointermove", function (event) {
          var rect = card.getBoundingClientRect();
          card.style.setProperty("--pointer-x", event.clientX - rect.left + "px");
          card.style.setProperty("--pointer-y", event.clientY - rect.top + "px");
        });
      });
  }

  /* ------------------------------------------------------------------
   * Animaciones de aparición (IntersectionObserver)
   * ------------------------------------------------------------------ */

  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ------------------------------------------------------------------
   * Formulario de contacto
   * - Valida los campos con mensajes de error accesibles.
   * - No finge enviar datos: muestra una confirmación y abre WhatsApp
   *   con la información escrita.
   * ------------------------------------------------------------------ */

  var contactForm = document.querySelector("[data-contact-form]");

  function setFieldError(field, message) {
    var group = field.closest(".form-group");
    var errorEl = group ? group.querySelector(".field-error") : null;
    if (!group || !errorEl) {
      return;
    }
    group.classList.add("has-error");
    field.setAttribute("aria-invalid", "true");
    if (errorEl.id) {
      field.setAttribute("aria-describedby", errorEl.id);
    }
    errorEl.textContent = message;
  }

  function clearFieldError(field) {
    var group = field.closest(".form-group");
    var errorEl = group ? group.querySelector(".field-error") : null;
    if (!group || !errorEl) {
      return;
    }
    group.classList.remove("has-error");
    field.removeAttribute("aria-invalid");
    if (errorEl.id && field.getAttribute("aria-describedby") === errorEl.id) {
      field.removeAttribute("aria-describedby");
    }
    errorEl.textContent = "";
  }

  function validateField(field) {
    var value = field.value.trim();
    var valid = true;

    if (field.required && value === "") {
      setFieldError(field, FSF.u("Este campo es obligatorio."));
      valid = false;
    } else if (field.type === "email" && value !== "") {
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!emailOk) {
        setFieldError(field, FSF.u("Escribe un correo electrónico válido."));
        valid = false;
      }
    } else if (field.name === "whatsapp" && value !== "") {
      var digits = value.replace(/[^0-9]/g, "");
      if (digits.length < 7) {
        setFieldError(field, FSF.u("Escribe un número de WhatsApp válido."));
        valid = false;
      }
    }

    if (valid) {
      clearFieldError(field);
    }

    return valid;
  }

  if (contactForm) {
    var formFields = contactForm.querySelectorAll("input, select, textarea");
    var formFeedback = contactForm.querySelector(".form-feedback");

    // Limpia el error mientras la persona corrige.
    formFields.forEach(function (field) {
      field.addEventListener("input", function () {
        if (field.closest(".form-group").classList.contains("has-error")) {
          validateField(field);
        }
      });
      field.addEventListener("blur", function () {
        if (field.value.trim() !== "" || field.required) {
          validateField(field);
        }
      });
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var allValid = true;
      var firstInvalid = null;

      formFields.forEach(function (field) {
        if (!validateField(field)) {
          allValid = false;
          if (!firstInvalid) {
            firstInvalid = field;
          }
        }
      });

      if (!allValid) {
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Crea el mensaje de WhatsApp con los datos del formulario.
      var name = contactForm.querySelector('[name="name"]').value.trim();
      var email = contactForm.querySelector('[name="email"]').value.trim();
      var whatsapp = contactForm
        .querySelector('[name="whatsapp"]')
        .value.trim();
      var serviceSelect = contactForm.querySelector('[name="service"]');
      var service =
        serviceSelect && serviceSelect.value
          ? serviceSelect.options[serviceSelect.selectedIndex].text
          : FSF.u("No especificado");
      var goalSelect = contactForm.querySelector('[name="goal"]');
      var goal =
        goalSelect && goalSelect.value
          ? goalSelect.options[goalSelect.selectedIndex].text
          : FSF.u("No especificado");
      var message = contactForm.querySelector('[name="message"]').value.trim();

      var lines = [
        FSF.u("Hola, soy ") + name + FSF.u(" y quiero comenzar."),
        "",
        FSF.u("• Servicio de interés: ") + service,
        FSF.u("• Objetivo principal: ") + goal,
      ];

      if (whatsapp) {
        lines.push(FSF.u("• Mi WhatsApp: ") + whatsapp);
      }
      lines.push(FSF.u("• Mi correo: ") + email);
      lines.push("");
      lines.push(FSF.u("Mensaje:"));
      lines.push(message);

      var fullMessage = lines.join("\n");

      var number = getValidatedNumber();

      if (!number) {
        if (formFeedback) {
          formFeedback.classList.add("is-visible");
          formFeedback.querySelector("[data-feedback-title]").textContent =
            FSF.u("Aún no podemos conectar por WhatsApp");
          formFeedback.querySelector("[data-feedback-text]").textContent =
            FSF.u(
              "El número oficial de WhatsApp todavía no está configurado. Tu mensaje fue validado correctamente; vuelve más tarde para completar el contacto."
            );
          formFeedback.querySelector("[data-feedback-action]").style.display =
            "none";
        }
        return;
      }

      // Muestra la confirmación antes de abrir WhatsApp.
      openConfirmationModal({
        preview: fullMessage,
        whatsappUrl: buildWhatsAppUrl(fullMessage),
        onCancel: function () {
          if (formFeedback) {
            formFeedback.classList.remove("is-visible");
          }
        },
      });
    });
  }

  /* ------------------------------------------------------------------
   * Modal de confirmación accesible
   * ------------------------------------------------------------------ */

  function openConfirmationModal(data) {
    var modal = document.getElementById("confirmation-modal");
    if (!modal) {
      return;
    }

    var previewEl = modal.querySelector("[data-modal-preview]");
    var waLink = modal.querySelector("[data-modal-whatsapp]");
    var cancelBtn = modal.querySelector("[data-modal-cancel]");
    var closeBtn = modal.querySelector("[data-modal-close]");
    var dialog = modal.querySelector("[role='dialog']");
    var lastFocused = document.activeElement;

    if (previewEl) {
      previewEl.textContent = data.preview;
    }
    if (waLink) {
      waLink.setAttribute("href", data.whatsappUrl);
    }

    modal.classList.add("is-open");
    modal.removeAttribute("aria-hidden");
    dialog.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    var focusTarget =
      waLink || cancelBtn || closeBtn || dialog.querySelector("button");
    if (focusTarget) {
      focusTarget.focus();
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      dialog.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", trapKey);
      if (typeof data.onCancel === "function") {
        data.onCancel();
      }
      if (lastFocused && lastFocused.focus) {
        lastFocused.focus();
      }
    }

    function trapKey(event) {
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      var focusables = modal.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) {
        return;
      }
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", trapKey);

    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeModal, { once: true });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal, { once: true });
    }
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  /* ------------------------------------------------------------------
   * Botones de pago pendientes (Whop)
   * - Los enlaces [data-whop] aún no tienen URL real: en lugar de
   *   navegar a un enlace roto, muestran un aviso glass flotante.
   * ------------------------------------------------------------------ */

  var whopToast = document.createElement("div");
  whopToast.className = "whop-toast";
  whopToast.setAttribute("role", "status");
  whopToast.setAttribute("aria-live", "polite");
  whopToast.innerHTML =
    '<svg class="icon" aria-hidden="true"><use href="#icon-info"></use></svg>' +
    '<span class="whop-toast__text"></span>';
  document.body.appendChild(whopToast);

  var whopToastText = whopToast.querySelector(".whop-toast__text");

  function renderWhopToast() {
    whopToastText.textContent = FSF.u("Este servicio aún no está disponible.");
  }

  renderWhopToast();
  document.addEventListener("fsf:language", renderWhopToast);

  var whopToastTimer = null;

  function showWhopToast() {
    whopToast.classList.add("is-visible");
    if (whopToastTimer) {
      clearTimeout(whopToastTimer);
    }
    whopToastTimer = setTimeout(function () {
      whopToast.classList.remove("is-visible");
    }, 4000);
  }

  document.querySelectorAll("[data-whop]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      showWhopToast();
    });
  });

  /* ------------------------------------------------------------------
   * Modal de documentos legales (Políticas / Términos)
   * - Abre una tarjeta glass con el contenido de politicas.html
   *   en lugar de navegar a otra página.
   * - Si el fetch no es posible (p. ej. file://), conserva la
   *   navegación normal como respaldo.
   * ------------------------------------------------------------------ */

  var legalModal = document.getElementById("legal-modal");

  function openLegalModal(sectionId, pagePath) {
    if (!legalModal) {
      return;
    }

    var body = legalModal.querySelector("[data-legal-body]");
    var closeBtn = legalModal.querySelector("[data-legal-close]");
    var dialog = legalModal.querySelector("[role='dialog']");
    var lastFocused = document.activeElement;

    if (!body) {
      return;
    }

    function closeLegalModal() {
      legalModal.classList.remove("is-open");
      legalModal.setAttribute("aria-hidden", "true");
      if (dialog) {
        dialog.setAttribute("aria-hidden", "true");
      }
      document.body.style.overflow = "";
      document.removeEventListener("keydown", trapLegalKey);
      if (lastFocused && lastFocused.focus) {
        lastFocused.focus();
      }
    }

    function trapLegalKey(event) {
      if (event.key === "Escape") {
        closeLegalModal();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      var focusables = legalModal.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) {
        return;
      }
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    fetch(pagePath)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("No se pudo cargar el documento");
        }
        return response.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var fragment = document.createDocumentFragment();
        var privacy = doc.getElementById("privacidad");
        var terms = doc.getElementById("terminos");
        if (privacy) {
          fragment.appendChild(privacy.cloneNode(true));
        }
        if (terms) {
          fragment.appendChild(terms.cloneNode(true));
        }
        body.innerHTML = "";
        body.appendChild(fragment);

        legalModal.classList.add("is-open");
        legalModal.removeAttribute("aria-hidden");
        if (dialog) {
          dialog.setAttribute("aria-hidden", "false");
        }
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", trapLegalKey);

        var focusTarget =
          closeBtn || dialog.querySelector("button");
        if (focusTarget) {
          focusTarget.focus();
        }

        if (sectionId) {
          var target = body.querySelector("#" + sectionId);
          if (target && target.scrollIntoView) {
            target.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
          }
        }

        if (closeBtn) {
          closeBtn.addEventListener("click", closeLegalModal, { once: true });
        }
        legalModal.addEventListener("click", function (event) {
          if (event.target === legalModal) {
            closeLegalModal();
          }
        }, { once: true });
      })
      .catch(function () {
        // Respaldo: navegación normal a la página legal.
        if (lastFocused && lastFocused.href) {
          window.location.href = lastFocused.getAttribute("href");
        }
      });
  }

  document.querySelectorAll("[data-legal]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var href = link.getAttribute("href") || "";
      var hashIndex = href.indexOf("#");
      var pagePath = hashIndex > -1 ? href.slice(0, hashIndex) : href;
      var sectionId = hashIndex > -1 ? href.slice(hashIndex + 1) : "";
      openLegalModal(sectionId, pagePath);
    });
  });
})();
