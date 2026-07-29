(function () {
  var contact = document.querySelector(".footer-contact");
  var trigger = document.querySelector(".contact-trigger");
  var popover = document.querySelector(".contact-popover");

  if (!contact || !trigger || !popover) {
    return;
  }

  var closeTimer = null;

  function openPopover() {
    window.clearTimeout(closeTimer);
    popover.hidden = false;
    trigger.setAttribute("aria-expanded", "true");

    window.requestAnimationFrame(function () {
      popover.classList.add("is-open");
    });
  }

  function closePopover() {
    popover.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");

    closeTimer = window.setTimeout(function () {
      if (!popover.classList.contains("is-open")) {
        popover.hidden = true;
      }
    }, 220);
  }

  trigger.addEventListener("click", function (event) {
    event.stopPropagation();

    if (popover.hidden) {
      openPopover();
      return;
    }

    closePopover();
  });

  popover.addEventListener("click", function (event) {
    event.stopPropagation();

    if (event.target.closest("a")) {
      closePopover();
    }
  });

  document.addEventListener("click", function (event) {
    if (!contact.contains(event.target)) {
      closePopover();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !popover.hidden) {
      closePopover();
      trigger.focus();
    }
  });
})();
