(function () {
  var telegramButton = document.querySelector(".telegram-hover");

  if (telegramButton) {
    telegramButton.addEventListener("mouseenter", function () {
      telegramButton.classList.remove("is-leaving");
      telegramButton.classList.add("is-entering");
    });

    telegramButton.addEventListener("mouseleave", function () {
      telegramButton.classList.remove("is-entering");
      telegramButton.classList.add("is-leaving");
    });

    telegramButton.addEventListener("animationend", function (event) {
      if (event.animationName === "telegram-plane-return") {
        telegramButton.classList.remove("is-leaving");
      }
    });
  }
})();
