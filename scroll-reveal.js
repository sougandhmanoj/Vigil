(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    return;
  }

  var groups = [
    { selector: ".metrics article", delay: 115 },
    { selector: ".steps h2, .step-card, .step-flow .arrow", delay: 95 },
    { selector: ".comparison-art, .comparison h2, .comparison-lower > p", delay: 110 },
    { selector: ".comparison-table .pill", delay: 70 },
    { selector: ".features h2, .feature-grid, .features blockquote", delay: 130 },
    { selector: ".pricing > div, .price-card", delay: 130 }
  ];

  var revealed = new Set();

  groups.forEach(function (group) {
    var delay = group.delay || 0;
    var base = group.base || 0;

    document.querySelectorAll(group.selector).forEach(function (element, index) {
      if (revealed.has(element)) {
        return;
      }

      revealed.add(element);
      element.setAttribute("data-reveal", "");
      element.style.setProperty("--reveal-delay", base + index * delay + "ms");
    });
  });

  document.documentElement.classList.add("reveal-ready");

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.16
  });

  revealed.forEach(function (element) {
    observer.observe(element);
  });
})();
