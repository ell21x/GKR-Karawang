
/* === FULLSCREEN JADWAL MISA === */
function bukaFullscreenMisa() {
  document.getElementById("fullscreen-misa").classList.remove("hidden");
}

function tutupFullscreenMisa() {
  document.getElementById("fullscreen-misa").classList.add("hidden");
}



/* ===== FULLSCREEN SEKRETARIAT ===== */
function showSekretariat() {
  document.getElementById("sekretariatFull").style.display = "block";
}

function closeFullscreen() {
  document.getElementById("sekretariatFull").style.display = "none";
}

/* ===== SLIDESHOW PENGUMUMAN ===== */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

/* ===== PANAH KIRI MENUTUP FULLSCREEN ===== */
function handlePrevClick() {
  const fullscreenMisa = document.getElementById("fullscreen-img");
  const fullscreenSekretariat = document.getElementById("sekretariatFull");

  if (fullscreenMisa.style.display === "block") {
    closeFullscreenMisa();
  } else if (fullscreenSekretariat.style.display === "block") {
    closeFullscreen();
  } else {
    // Jika fullscreen tidak terbuka, jalankan navigasi slide
    plusSlides(-1);
  }
}





// Fungsi slideshow
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active-dot");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active-dot");
}

// Auto Slide setiap 5 detik
setInterval(() => {
  plusSlides(1);
}, 5000);


/* Buka Halaman Kegiatan */
function bukaHalaman(halaman) {
  window.open(halaman, "_blank");
}

/* Fullscreen Sekretariat */
function showSekretariat() {
  document.getElementById("sekretariatFull").style.display = "flex";
}

function hideSekretariat() {
  document.getElementById("sekretariatFull").style.display = "none";
}


let startX = 0;
let startY = 0;

function enableSwipe(element, closeFn) {
  element.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  element.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    // swipe kanan atau bawah
    if (diffX > 80 || diffY > 80) {
      closeFn();
    }
  });
}

function bukaFullscreenMisa() {
  document.getElementById("fullscreen-misa").classList.remove("hidden");
}

function closeMisa() {
  document.getElementById("fullscreen-misa").classList.add("hidden");
}

function showSekretariat() {
  document.getElementById("sekretariatFull").classList.remove("hidden");
}

function closeSekretariat() {
  document.getElementById("sekretariatFull").classList.add("hidden");
}
