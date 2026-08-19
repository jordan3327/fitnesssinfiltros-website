(function () {
  "use strict";

  var LANG_KEY = "fsf-language";
  var SUPPORTED = { es: true, en: true };
  var ATTR_NAMES = ["aria-label", "placeholder", "alt", "title", "data-whatsapp-msg"];

  var currentLang = "es";
  var dictEn = new Map();
  var uiEn = new Map();
  var textTargets = [];
  var attrTargets = [];
  var originalSeo = null;

  function normalize(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function buildDictionaries() {
    if (window.FSFTranslations && window.FSFTranslations.en) {
      Object.keys(window.FSFTranslations.en).forEach(function (key) {
        dictEn.set(normalize(key), window.FSFTranslations.en[key]);
      });
    }

    if (window.FSFUiTexts && window.FSFUiTexts.en) {
      Object.keys(window.FSFUiTexts.en).forEach(function (key) {
        uiEn.set(key, window.FSFUiTexts.en[key]);
      });
    }
  }

  function t(text) {
    if (currentLang === "es") {
      return text;
    }

    var found = dictEn.get(normalize(text));
    return found === undefined ? text : found;
  }

  function u(text) {
    if (currentLang === "es") {
      return text;
    }

    var found = uiEn.get(text);
    return found === undefined ? text : found;
  }

  function detectLanguage() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === "es" || saved === "en") {
        return saved;
      }
    } catch (e) {
      /* localStorage no disponible */
    }

    var langs = [];
    try {
      if (window.navigator.languages && window.navigator.languages.length) {
        langs = window.navigator.languages.slice();
      }
      if (window.navigator.language) {
        langs.push(window.navigator.language);
      }
    } catch (e) {
      /* navegador sin navigator.language */
    }

    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i] || "").toLowerCase();
      if (code.indexOf("en") === 0) {
        return "en";
      }
    }

    return "es";
  }

  function getPageKey() {
    var parts = window.location.pathname.split("/");
    var last = parts[parts.length - 1] || "";
    return last || "index.html";
  }

  function isProtectedElement(el) {
    if (!(el instanceof Element)) {
      return false;
    }

    if (el.closest("script, style, svg")) {
      return true;
    }

    if (el.closest("[data-language-menu], [data-translate='none'], .service-card, .service-detail")) {
      return true;
    }

    return false;
  }

  function captureSeoOriginals() {
    if (originalSeo) {
      return;
    }

    var metaDesc = document.querySelector('meta[name="description"]');
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');
    var ogLocale = document.querySelector('meta[property="og:locale"]');

    originalSeo = {
      title: document.title,
      description: metaDesc ? metaDesc.getAttribute("content") : null,
      ogTitle: ogTitle ? ogTitle.getAttribute("content") : null,
      ogDescription: ogDesc ? ogDesc.getAttribute("content") : null,
      ogLocale: ogLocale ? ogLocale.getAttribute("content") : null
    };
  }

  function captureTargets() {
    textTargets = [];
    attrTargets = [];

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !normalize(node.nodeValue)) {
          return NodeFilter.FILTER_REJECT;
        }

        if (isProtectedElement(node.parentElement)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    });

    while (walker.nextNode()) {
      textTargets.push({
        node: walker.currentNode,
        original: walker.currentNode.nodeValue
      });
    }

    var elements = document.querySelectorAll("body *");
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];

      if (isProtectedElement(el)) {
        continue;
      }

      for (var a = 0; a < ATTR_NAMES.length; a++) {
        var name = ATTR_NAMES[a];
        if (el.hasAttribute(name)) {
          attrTargets.push({
            element: el,
            name: name,
            original: el.getAttribute(name)
          });
        }
      }
    }
  }

  function applySeo(lang) {
    captureSeoOriginals();

    var seo = window.FSFSeo && window.FSFSeo[getPageKey()];
    var values = seo && seo[lang];

    document.title = values ? values.title : originalSeo.title;

    var metaDesc = document.querySelector('meta[name="description"]');
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');
    var ogLocale = document.querySelector('meta[property="og:locale"]');

    if (metaDesc) {
      metaDesc.setAttribute("content", values && values.description ? values.description : originalSeo.description);
    }
    if (ogTitle) {
      ogTitle.setAttribute("content", values && values.ogTitle ? values.ogTitle : originalSeo.ogTitle);
    }
    if (ogDesc) {
      ogDesc.setAttribute("content", values && values.ogDescription ? values.ogDescription : originalSeo.ogDescription);
    }
    if (ogLocale) {
      ogLocale.setAttribute("content", values && values.ogLocale ? values.ogLocale : originalSeo.ogLocale);
    }
  }

  function renderTargets() {
    for (var i = 0; i < textTargets.length; i++) {
      var textTarget = textTargets[i];
      textTarget.node.nodeValue = t(textTarget.original);
    }

    for (var j = 0; j < attrTargets.length; j++) {
      var attrTarget = attrTargets[j];
      attrTarget.element.setAttribute(attrTarget.name, t(attrTarget.original));
    }
  }

  function updateLanguageMenu() {
    var menu = document.querySelector("[data-language-menu]");
    var trigger = document.querySelector("[data-language-trigger]");
    var current = document.querySelector("[data-language-current]");
    var label = document.querySelector("[data-language-label]");
    var panel = document.querySelector("[data-language-options]");
    var options = document.querySelectorAll("[data-language-option]");

    if (trigger) {
      trigger.setAttribute("aria-label", u("Seleccionar idioma"));
      trigger.setAttribute("aria-expanded", menu && menu.classList.contains("is-open") ? "true" : "false");
    }

    if (current) {
      current.textContent = currentLang.toUpperCase();
    }

    if (label) {
      label.textContent = currentLang.toUpperCase();
    }

    if (menu) {
      var optionsLabel = currentLang === "en" ? "Languages" : u("Idiomas");
      menu.setAttribute("aria-label", optionsLabel);
    }

    if (panel) {
      panel.setAttribute("aria-label", currentLang === "en" ? "Languages" : u("Idiomas"));
    }

    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      option.setAttribute("aria-selected", String(option.getAttribute("data-language-option") === currentLang));
    }
  }

  function closeLanguageMenu() {
    var menu = document.querySelector("[data-language-menu]");
    var trigger = document.querySelector("[data-language-trigger]");

    if (menu) {
      menu.classList.remove("is-open");
    }
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  }

  function applyLanguage(lang) {
    if (!SUPPORTED[lang]) {
      lang = "es";
    }

    currentLang = lang;

    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* localStorage no disponible */
    }

    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";

    applySeo(lang);
    renderTargets();
    updateLanguageMenu();

    var evt;
    try {
      evt = new CustomEvent("fsf:language", { detail: { lang: lang } });
    } catch (e) {
      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("fsf:language", false, false, { lang: lang });
    }
    document.dispatchEvent(evt);

    if (window.FSF) {
      window.FSF.currentLang = currentLang;
    }
  }

  function initLanguageMenu() {
    var menu = document.querySelector("[data-language-menu]");
    var trigger = document.querySelector("[data-language-trigger]");
    var options = document.querySelectorAll("[data-language-option]");

    if (!menu || !trigger) {
      return;
    }

    trigger.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener("click", function () {
        applyLanguage(this.getAttribute("data-language-option") || "es");
        closeLanguageMenu();
      });
    }

    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target)) {
        closeLanguageMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeLanguageMenu();
      }
    });
  }

  function init() {
    captureTargets();
    applyLanguage(detectLanguage());
    initLanguageMenu();
  }

  buildDictionaries();

  window.FSF = {
    currentLang: "es",
    get lang() {
      return currentLang;
    },
    t: t,
    u: u,
    applyLanguage: applyLanguage,
    detectLanguage: detectLanguage
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
