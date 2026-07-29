(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  function targetTop(target) {
    var nav = document.querySelector(".site-nav");
    var navHeight = nav ? nav.getBoundingClientRect().height : 0;
    var top = target.getBoundingClientRect().top + window.pageYOffset;
    return Math.max(top - navHeight * 0.25, 0);
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href");
      var target = document.querySelector(id);

      if (!target) {
        return;
      }

      event.preventDefault();

      if (reduceMotion) {
        window.location.hash = id;
        window.scrollTo(0, targetTop(target));
        return;
      }

      var destination = targetTop(target);

      if (window.gsap) {
        var scrollState = { y: window.pageYOffset };
        window.gsap.to(scrollState, {
          y: destination,
          duration: 1.05,
          ease: "power3.inOut",
          onUpdate: function () {
            window.scrollTo(0, scrollState.y);
          },
          onComplete: function () {
            history.pushState(null, "", id);
          }
        });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", id);
      }
    });
  });
})();
