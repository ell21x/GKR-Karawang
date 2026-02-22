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
  const navbar      = document.querySelector(".navbar");



  /* =========================================
     BURGER MENU
  ========================================= */
  burger.addEventListener("click", () => {

    const open = menu.classList.toggle("show");

    burger.textContent = open ? "✕" : "☰";
    burger.classList.toggle("active", open);

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
     SEARCH FUNCTION
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
     SLIDESHOW PENGUMUMAN
  ========================================= */
  let slideIndex = 1;

  const slides = document.querySelectorAll(".slide");
  const dots   = document.querySelectorAll(".dot");

  function showSlides(n){

    if(!slides.length) return;

    if(n > slides.length) slideIndex = 1;
    if(n < 1) slideIndex = slides.length;

    slides.forEach(s => s.style.display = "none");
    dots.forEach(d => d.classList.remove("active-dot"));

    slides[slideIndex-1].style.display = "block";

    if(dots[slideIndex-1]){
      dots[slideIndex-1].classList.add("active-dot");
    }
  }

  window.plusSlides = (n) => {
    showSlides(slideIndex += n);
  };

  window.currentSlide = (n) => {
    showSlides(slideIndex = n);
  };

  showSlides(slideIndex);

  setInterval(() => {
    plusSlides(1);
  }, 5000);



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
     STICKY NAVBAR EFFECT (FIX)
  ========================================= */
  window.addEventListener("scroll", () => {

    if(window.scrollY > 20){
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  });



  /* =========================================
     RIPPLE BUTTON EFFECT
  ========================================= */
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
const track = document.querySelector(".hero-track");
const slides = document.querySelectorAll(".hero-slide");
let idx = 0, startX = 0, auto;

function go(i){track.style.transform=`translateX(-${i*100}%)`;idx=i}
function nxt(){idx=(idx+1)%slides.length;go(idx)}
function prv(){idx=(idx-1+slides.length)%slides.length;go(idx)}

auto=setInterval(nxt,5000);

const hero=document.querySelector(".hero-header");
hero.addEventListener("touchstart",e=>{startX=e.touches[0].clientX;clearInterval(auto)});
hero.addEventListener("touchend",e=>{const diff=startX-e.changedTouches[0].clientX;Math.abs(diff)>50&&(diff>0?nxt():prv());auto=setInterval(nxt,5000)});
hero.addEventListener("mousedown",e=>{startX=e.clientX;clearInterval(auto)});
hero.addEventListener("mouseup",e=>{const diff=startX-e.clientX;Math.abs(diff)>50&&(diff>0?nxt():prv());auto=setInterval(nxt,5000)});
