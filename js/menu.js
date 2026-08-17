/* ==========================================================================
   menu.js — Menú móvil (abrir / cerrar, cierre automático, accesibilidad)
   ========================================================================== */

(function () {
  "use strict";

  var toggle = document.querySelector(".menu-toggle");
  var menu = document.querySelector(".mobile-menu");

  if (!toggle || !menu) {
    return;
  }

  var lastFocused = null;

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  function openMenu() {
    lastFocused = document.activeElement;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) {
      lastFocused.focus();
    }
  }

  toggle.addEventListener("click", function () {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cierre automático al seleccionar un enlace del menú móvil.
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Cierre con la tecla Escape.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) {
      closeMenu();
    }
  });

  // Mantiene el foco dentro del menú mientras esté abierto.
  menu.addEventListener("keydown", function (event) {
    if (event.key !== "Tab" || !isOpen()) {
      return;
    }

    var focusables = menu.querySelectorAll(
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
  });

  // Si la ventana crece (escritorio), resetea el estado del menú.
  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 1024px)").matches && isOpen()) {
      closeMenu();
    }
  });
})();
