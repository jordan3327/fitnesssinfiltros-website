/* ==========================================================================
   faq.js — Acordeón de preguntas frecuentes (accesible)
   - Un solo elemento abierto a la vez.
   - Indica el estado con aria-expanded en el botón y aria-hidden en la respuesta.
   - Controla la altura con max-height para que la respuesta abierta sea visible.
   ========================================================================== */

(function () {
  "use strict";

  var items = document.querySelectorAll(".faq-item");

  if (!items.length) {
    return;
  }

  var CLOSED = "0px";

  function applyState(item, question, answer, isOpen) {
    item.classList.toggle("is-open", isOpen);
    question.setAttribute("aria-expanded", isOpen ? "true" : "false");
    answer.setAttribute("aria-hidden", isOpen ? "false" : "true");
    answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : CLOSED;
  }

  items.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");

    if (!question || !answer) {
      return;
    }

    var id = question.getAttribute("aria-controls");
    var isOpen = item.classList.contains("is-open");

    question.setAttribute("aria-expanded", isOpen ? "true" : "false");
    question.setAttribute("aria-controls", id);
    answer.setAttribute("id", id);
    answer.setAttribute("aria-hidden", isOpen ? "false" : "true");
    answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : CLOSED;

    question.addEventListener("click", function () {
      var willOpen = question.getAttribute("aria-expanded") === "false";

      items.forEach(function (other) {
        var otherQuestion = other.querySelector(".faq-question");
        var otherAnswer = other.querySelector(".faq-answer");
        if (otherQuestion && otherAnswer) {
          applyState(other, otherQuestion, otherAnswer, false);
        }
      });

      if (willOpen) {
        applyState(item, question, answer, true);
      }
    });
  });

  // Recalcula la altura de las respuestas abiertas al cambiar el tamaño.
  window.addEventListener("resize", function () {
    items.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      var answer = item.querySelector(".faq-answer");
      if (
        answer &&
        item.classList.contains("is-open") &&
        answer.style.maxHeight !== CLOSED
      ) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
})();
