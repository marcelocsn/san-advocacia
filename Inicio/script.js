document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ANIMAÇÃO AO SCROLL (INTERSECTION)
  =============================== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    ".area-card, .testimonial, .differential, .about-text, .about-image, .partner-card, .support-item, .team-button"
  ).forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  /* ===============================
     ATUALIZA ANO FOOTER
  =============================== */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ===============================
     BOTÃO VOLTAR AO TOPO
  =============================== */
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.opacity = "0.6";
      backToTop.style.pointerEvents = "auto";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.pointerEvents = "none";
    }
  });

  /* ===============================
     SCROLL SUAVE REAL (COM EASING)
  =============================== */

  const easeInOutCubic = (t) =>
    t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function smoothScrollTo(targetY, duration = 900) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function animation(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (elapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  /* ===============================
     INTERCEPTA LINKS DO MENU E SETA
  =============================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerOffset = 90; // ajuste se tiver header fixo
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.scrollY - headerOffset;

        smoothScrollTo(offsetPosition);
      }
    });
  });

});

document.addEventListener("DOMContentLoaded", function () {

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookiesBtn = document.getElementById("accept-cookies");

  if (!cookieBanner || !acceptCookiesBtn) return;

  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (!cookiesAccepted) {
    cookieBanner.style.display = "block";
  }

  acceptCookiesBtn.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.display = "none";
  });

});

