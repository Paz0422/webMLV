(() => {
  const selectors = [
    ".company-hero-content > *",
    ".hero-copy > *",
    ".hero-media",
    ".kpi-grid article",
    ".proposition > div",
    ".proposal-cards article",
    ".service-grid article",
    ".timeline article",
    ".photo-track img",
    ".clients-grid > article",
    ".cta",
    ".contact-grid > article",
    ".faq-list details"
  ];

  const elements = document.querySelectorAll(selectors.join(","));
  elements.forEach((el, index) => {
    el.classList.add("reveal-item");
    el.style.setProperty("--reveal-delay", `${(index % 8) * 60}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));

  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileLinks = document.querySelectorAll(".mobile-nav a");

  if (siteHeader && menuToggle) {
    menuToggle.addEventListener("click", () => {
      const open = siteHeader.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        siteHeader.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!siteHeader.contains(event.target)) {
        siteHeader.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const clientImage = document.getElementById("client-rotating-image");
  const clientCaption = document.getElementById("client-rotating-caption");
  const clientChips = document.querySelectorAll(".client-chip");

  const clientSlides = [
    {
      src: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80",
      caption: "Caso destacado: mantencion de bulldozers en faena."
    },
    {
      src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
      caption: "Continuidad operativa con soporte tecnico en terreno."
    },
    {
      src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
      caption: "Intervencion planificada para flota de maquinaria pesada."
    },
    {
      src: "https://images.unsplash.com/photo-1581093196277-9f608bb3f53b?auto=format&fit=crop&w=1200&q=80",
      caption: "Respuesta en contingencia para equipos criticos."
    }
  ];

  if (!clientImage || !clientCaption || !clientChips.length) {
    return;
  }

  let currentIndex = 0;
  let clientTimer = null;

  const setClientSlide = (index) => {
    currentIndex = index;
    const slide = clientSlides[index];
    clientImage.src = slide.src;
    clientCaption.textContent = slide.caption;
    clientChips.forEach((chip, chipIndex) => {
      chip.classList.toggle("active", chipIndex === index);
    });
  };

  const startClientRotation = () => {
    if (clientTimer) clearInterval(clientTimer);
    clientTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % clientSlides.length;
      setClientSlide(nextIndex);
    }, 3800);
  };

  clientChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const index = Number(chip.dataset.index || 0);
      setClientSlide(index);
      startClientRotation();
    });
  });

  setClientSlide(0);
  startClientRotation();
})();
