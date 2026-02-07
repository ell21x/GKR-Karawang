/* =========================================
   DOM READY (AMAN DARI ERROR LOAD)
========================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================= */
  const burger      = document.getElementById("hamburger");
  const menu        = document.getElementById("sideMenu");

  const searchBtn   = document.getElementById("searchBtn");
  const searchBox   = document.getElementById("searchBox");
  const searchInput = document.getElementById("searchInput");

  const hero        = document.querySelector(".hero-header");
  const sections    = document.querySelectorAll("section");



  /* =========================================
     BURGER MENU
  ========================================= */
  burger.addEventListener("click", () => {

    const open = menu.classList.toggle("show");

    burger.textContent = open ? "✕" : "☰";

    searchBox.classList.remove("show");

  });



  /* =========================================
     SEARCH TOGGLE
  ========================================= */
  searchBtn.addEventListener("click", () => {

    const open = searchBox.classList.toggle("show");

    menu.classList.remove("show");
    burger.textContent = "☰";

    if(open) searchInput.focus();

  });



  /* =========================================
     CLICK OUTSIDE (AUTO CLOSE)
  ========================================= */
  document.addEventListener("click", (e) => {

    if(!menu.contains(e.target) && !burger.contains(e.target)){
      menu.classList.remove("show");
      burger.textContent = "☰";
    }

    if(!searchBox.contains(e.target) && !searchBtn.contains(e.target)){
      searchBox.classList.remove("show");
    }

  });



  /* =========================================
     ESC CLOSE
  ========================================= */
  document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){
      menu.classList.remove("show");
      searchBox.classList.remove("show");
      burger.textContent = "☰";
    }

  });



  /* =========================================
     SEARCH FUNCTION (REAL)
  ========================================= */
  searchInput.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){

      const text = searchInput.value.toLowerCase();

      const elements = document.querySelectorAll("section, h1, h2, h3, p, div");

      for(let el of elements){
        if(el.innerText.toLowerCase().includes(text)){
          el.scrollIntoView({behavior:"smooth", block:"center"});
          break;
        }
      }

    }

  });



  /* =========================================
     SLIDESHOW AUTO
  ========================================= */
  let slideIndex = 0;

  const slides = document.querySelectorAll(".slide");
  const dots   = document.querySelectorAll(".dot");

  function showSlide(n){

    slides.forEach(s => s.style.display = "none");
    dots.forEach(d => d.classList.remove("active-dot"));

    slideIndex = (n + slides.length) % slides.length;

    slides[slideIndex].style.display = "block";
    if(dots[slideIndex]) dots[slideIndex].classList.add("active-dot");
  }

  function nextSlide(){
    showSlide(slideIndex + 1);
  }

  if(slides.length){
    showSlide(0);
    setInterval(nextSlide, 5000);
  }



  /* =========================================
     PARALLAX HERO
  ========================================= */
  if(hero){
    window.addEventListener("scroll", () => {
      hero.style.backgroundPositionY = window.pageYOffset * 0.5 + "px";
    });
  }



  /* =========================================
     SCROLL REVEAL
  ========================================= */
  function revealOnScroll(){

    const trigger = window.innerHeight * 0.85;

    sections.forEach(sec => {

      const top = sec.getBoundingClientRect().top;

      if(top < trigger){
        sec.classList.add("show");
      }

    });

  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();



  /* =========================================
     FULLSCREEN JADWAL MISA
  ========================================= */
  window.bukaFullscreenMisa = () => {
    document.getElementById("fullscreen-misa").classList.remove("hidden");
  };

  window.closeMisa = () => {
    document.getElementById("fullscreen-misa").classList.add("hidden");
  };



  /* =========================================
     FULLSCREEN SEKRETARIAT
  ========================================= */
  window.showSekretariat = () => {
    document.getElementById("sekretariatFull").classList.remove("hidden");
  };

  window.closeSekretariat = () => {
    document.getElementById("sekretariatFull").classList.add("hidden");
  };

});
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if(window.scrollY > 20){
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
document.querySelectorAll("button").forEach(btn=>{

  btn.addEventListener("click", function(e){

    const circle = document.createElement("span");
    circle.classList.add("ripple");

    const rect = btn.getBoundingClientRect();

    circle.style.left = e.clientX - rect.left + "px";
    circle.style.top  = e.clientY - rect.top + "px";

    btn.appendChild(circle);

    setTimeout(()=>circle.remove(),600);

  });

});
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("show");

  burger.textContent = open ? "✕" : "☰";

  /* tambahkan ini */
  burger.classList.toggle("active", open);

  searchBox.classList.remove("show");
});
