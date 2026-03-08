/* =========================================
   HERO CAROUSEL (Global — runs immediately)
========================================= */
const heroTrack  = document.querySelector(".hero-track");
const heroSlides = document.querySelectorAll(".hero-slide");
let heroIdx = 0;
let heroAuto;
let swipeStartX = 0;

function goToSlide(i) {
  heroIdx = (i + heroSlides.length) % heroSlides.length;
  heroTrack.style.transform = `translateX(-${heroIdx * 100}%)`;
}

function nextSlide() { goToSlide(heroIdx + 1); }
function prevSlide() { goToSlide(heroIdx - 1); }

function startAutoSlide() { heroAuto = setInterval(nextSlide, 5000); }
function stopAutoSlide()  { clearInterval(heroAuto); }

startAutoSlide();

const heroEl = document.querySelector(".hero-header");
if (heroEl) {
  // Touch
  heroEl.addEventListener("touchstart", (e) => {
    swipeStartX = e.touches[0].clientX;
    stopAutoSlide();
  });
  heroEl.addEventListener("touchend", (e) => {
    const diff = swipeStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    startAutoSlide();
  });

  // Mouse drag
  heroEl.addEventListener("mousedown", (e) => {
    swipeStartX = e.clientX;
    stopAutoSlide();
  });
  heroEl.addEventListener("mouseup", (e) => {
    const diff = swipeStartX - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    startAutoSlide();
  });
}



/* =========================================
   NAVBAR VISIBILITY PER-PAGE
========================================= */
const navbar = document.getElementById("navbar");
const topbar = document.getElementById("topbar"); // pastikan ada di HTML bila dipakai

window.addEventListener("load", () => {
  const currentPage = window.location.pathname;
  const hideOnPages = ["jadwal-misa", "sekretariat"];
  const shouldHide  = hideOnPages.some(page => currentPage.includes(page));

  shouldHide ? hideHeader() : showHeader();
});

function hideHeader() {
  setHeaderVisibility(navbar, false);
  setHeaderVisibility(topbar, false);
}

function showHeader() {
  setHeaderVisibility(navbar, true);
  setHeaderVisibility(topbar, true);
}

function setHeaderVisibility(el, visible) {
  if (!el) return;
  el.style.opacity        = visible ? "1" : "0";
  el.style.visibility     = visible ? "visible" : "hidden";
  el.style.pointerEvents  = visible ? "auto" : "none";
}



/* =========================================
   FULLSCREEN — JADWAL MISA
========================================= */
function bukaFullscreenMisa() {
  document.getElementById("fullscreen-misa").classList.remove("hidden");
  document.body.classList.add("fullscreen-active");
}

function closeMisa() {
  document.getElementById("fullscreen-misa").classList.add("hidden");
  document.body.classList.remove("fullscreen-active");
}



/* =========================================
   FULLSCREEN — SEKRETARIAT
========================================= */
function showSekretariat() {
  document.getElementById("sekretariatFull").classList.remove("hidden");
  document.body.classList.add("fullscreen-active");
}

function closeSekretariat() {
  document.getElementById("sekretariatFull").classList.add("hidden");
  document.body.classList.remove("fullscreen-active");
}



/* =========================================
   DOM READY
========================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* --- Elements --- */
  const burger      = document.getElementById("hamburger");
  const sideMenu    = document.getElementById("sideMenu");
  const searchBtn   = document.getElementById("searchBtn");
  const searchBox   = document.getElementById("searchBox");
  const searchInput = document.getElementById("searchInput");
  const hero        = document.querySelector(".hero-header");
  const sections    = document.querySelectorAll("section");
  const navbarEl    = document.querySelector(".navbar");


  /* =========================================
     BURGER MENU
  ========================================= */
  burger.addEventListener("click", () => {
    const isOpen = sideMenu.classList.toggle("show");
    burger.textContent = isOpen ? "✕" : "☰";
    burger.classList.toggle("active", isOpen);
    searchBox.classList.remove("show");
  });


  /* =========================================
     SEARCH TOGGLE
  ========================================= */
  searchBtn.addEventListener("click", () => {
    const isOpen = searchBox.classList.toggle("show");
    sideMenu.classList.remove("show");
    burger.textContent = "☰";
    if (isOpen) searchInput.focus();
  });


  /* =========================================
     CLICK OUTSIDE — AUTO CLOSE
  ========================================= */
  document.addEventListener("click", (e) => {
    if (!sideMenu.contains(e.target) && !burger.contains(e.target)) {
      sideMenu.classList.remove("show");
      burger.textContent = "☰";
    }
    if (!searchBox.contains(e.target) && !searchBtn.contains(e.target)) {
      searchBox.classList.remove("show");
    }
  });


  /* =========================================
     ESC — CLOSE ALL
  ========================================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sideMenu.classList.remove("show");
      searchBox.classList.remove("show");
      burger.textContent = "☰";
    }
  });


  /* =========================================
     SEARCH — SCROLL TO RESULT
  ========================================= */
  searchInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const query    = searchInput.value.toLowerCase();
    const elements = document.querySelectorAll("section, h1, h2, h3, p, div");

    for (const el of elements) {
      if (el.innerText.toLowerCase().includes(query)) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      }
    }
  });


  /* =========================================
     SLIDESHOW PENGUMUMAN
  ========================================= */
  let slideIndex = 1;
  const slides = document.querySelectorAll(".slide");
  const dots   = document.querySelectorAll(".dot");

  function showSlides(n) {
    if (!slides.length) return;

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach(s => s.style.display = "none");
    dots.forEach(d => d.classList.remove("active-dot"));

    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add("active-dot");
  }

  window.plusSlides    = (n) => showSlides(slideIndex += n);
  window.currentSlide  = (n) => showSlides(slideIndex = n);

  showSlides(slideIndex);
  setInterval(() => window.plusSlides(1), 5000);


  /* =========================================
     PARALLAX HERO
  ========================================= */
  if (hero) {
    window.addEventListener("scroll", () => {
      hero.style.backgroundPositionY = window.pageYOffset * 0.5 + "px";
    });
  }


  /* =========================================
     SCROLL REVEAL
  ========================================= */
  function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top < trigger) {
        sec.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();


  /* =========================================
     STICKY NAVBAR
  ========================================= */
  window.addEventListener("scroll", () => {
    navbarEl.classList.toggle("scrolled", window.scrollY > 20);
  });


  /* =========================================
     RIPPLE EFFECT
  ========================================= */
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      circle.classList.add("ripple");

      const rect = btn.getBoundingClientRect();
      circle.style.left = e.clientX - rect.left + "px";
      circle.style.top  = e.clientY - rect.top  + "px";

      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });


  /* =========================================
     FULLSCREEN — expose ke window (DOMReady)
  ========================================= */
  window.bukaFullscreenMisa  = bukaFullscreenMisa;
  window.closeMisa           = closeMisa;
  window.showSekretariat     = showSekretariat;
  window.closeSekretariat    = closeSekretariat;

}); // end DOMContentLoaded