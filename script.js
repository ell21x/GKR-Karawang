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

  /* KLIK LOGO → SEMUA KARTU MUNCUL */
window.addEventListener('DOMContentLoaded', () => {
  const logoImg  = document.querySelector('image[href="logoparoki.png"]');
  const boxes    = document.querySelectorAll('.label-box');
  const lines    = document.querySelectorAll('.garis-box');
  let revealed   = false;

  if(logoImg){ logoImg.style.cursor = 'pointer'; }

  function toggle(){
    revealed = !revealed;
    boxes.forEach(b => {
      b.style.opacity    = revealed ? '1' : '0';
      b.style.transform  = revealed ? 'scale(1)' : 'scale(0.85)';
    });
    lines.forEach(l => {
      l.style.opacity = revealed ? '1' : '0';
    });
  }

  if(logoImg) logoImg.addEventListener('click', toggle);

  /* juga bisa klik lingkaran logo */
  const logoCircle = document.querySelector('circle[r="175"]');
  if(logoCircle){ logoCircle.style.cursor='pointer'; logoCircle.addEventListener('click', toggle); }
});
/* MOBILE: ketuk logo → kartu muncul */
(function(){
  var logo  = document.getElementById('mob-logo');
  var hint  = document.getElementById('mob-hint');
  var pre   = document.getElementById('mob-pre');
  var cards = document.querySelectorAll('.mob-card');
  var shown = false;
  if(!logo) return;
  logo.addEventListener('click', function(){
    shown = !shown;
    hint.classList.toggle('gone', shown);
    if(pre) pre.classList.toggle('hidden', shown);
    cards.forEach(function(c, i){
      if(shown){ setTimeout(function(){ c.classList.add('show'); }, i * 80); }
      else { c.classList.remove('show'); }
    });
  });
})();


  /* =========================================
     FULLSCREEN — expose ke window (DOMReady)
  ========================================= */
  window.bukaFullscreenMisa  = bukaFullscreenMisa;
  window.closeMisa           = closeMisa;
  window.showSekretariat     = showSekretariat;
  window.closeSekretariat    = closeSekretariat;

}); // end DOMContentLoaded

/* =========================================
   EDITOR SYSTEM v3
   - Tahan logo navbar 3 detik → login
   - Panel fullscreen artikel & pastoral
   - Slot foto 3-4 dari galeri server
   - Simpan ke localStorage → muncul langsung
========================================= */

const EDITOR_CREDS = { u: 'admin', p: 'gkr2026' };
let editorOn = false;

// State foto per panel: array 4 elemen (null jika kosong)
let artFotos = [null, null, null, null];
let pasFotos = [null, null, null, null];

// State galeri
let galeriTargetType  = null; // 'art' | 'pas'
let galeriTargetSlot  = null; // 0-3
let galeriSelectedSrc = null;
let galeriCurrentAlbum = null;

/* ─── ALBUM SERVER ─────────────────────── */
const GALERI_ALBUMS = [
  {
    id: 'kegiatan', nama: 'Kegiatan Paroki', icon: '⛪',
    foto: [
      { src: 'lhps4.jpg',     nama: 'HPS & Pesta Nama' },
      { src: 'FOKUSPAS.jpeg', nama: 'Fokus Pastoral' },
      { src: 'pelkam.jpeg',   nama: 'Pelatihan Kamera' },
      { src: 'patuyesus.jpg', nama: 'APP Lingkungan' },
      { src: 'altar.jpeg',    nama: 'Altar Gereja' },
      { src: 'jdwlpsk.jpeg',  nama: 'Jadwal Paskal' },
    ]
  },
  {
    id: 'pengumuman', nama: 'Pengumuman', icon: '📢',
    foto: [
      { src: 'umumm1.jpeg', nama: 'Pengumuman 1' },
      { src: 'umumm2.jpeg', nama: 'Pengumuman 2' },
      { src: 'umumm3.jpeg', nama: 'Pengumuman 3' },
      { src: 'umumm4.jpeg', nama: 'Pengumuman 4' },
    ]
  },
  {
    id: 'liturgi', nama: 'Liturgi & Misa', icon: '✝️',
    foto: [
      { src: 'jadwalmisagkr.jpg',     nama: 'Jadwal Misa' },
      { src: 'jadwalsekretariat.jpg', nama: 'Sekretariat' },
    ]
  },
];

/* ─── HOLD LOGO 3 DETIK ──────────────────
   Tidak ada tombol editor yang terlihat publik.
   Tahan logo paroki di navbar 3 detik → login muncul.
─────────────────────────────────────────── */
(function() {
  const HOLD_MS = 3000;
  let holdTimer = null, holdStart = 0, rafId = null;
  const logo = document.getElementById('navLogo');
  const ring = document.getElementById('editorHoldRing');
  if (!logo || !ring) return;

  const R = 26, CX = 32, CY = 32, CIRC = 2 * Math.PI * R;
  ring.innerHTML = `<svg width="64" height="64" viewBox="0 0 64 64">
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="rgba(200,121,30,0.18)" stroke-width="4"/>
    <circle id="eRingArc" cx="${CX}" cy="${CY}" r="${R}" fill="none"
      stroke="#c8791e" stroke-width="4"
      stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC}"
      stroke-linecap="round" transform="rotate(-90 ${CX} ${CY})"/>
  </svg>`;
  const arc = document.getElementById('eRingArc');

  function posRing() {
    const r = logo.getBoundingClientRect();
    ring.style.left = (r.left + r.width/2 - 32) + 'px';
    ring.style.top  = (r.top  + r.height/2 - 32) + 'px';
  }

  function startHold(e) {
    e.preventDefault();
    holdStart = Date.now();
    logo.classList.add('holding');
    ring.classList.add('active');
    posRing();
    (function draw() {
      const p = Math.min((Date.now() - holdStart) / HOLD_MS, 1);
      arc.style.strokeDashoffset = CIRC * (1 - p);
      if (p < 1) rafId = requestAnimationFrame(draw);
      else finish();
    })();
    holdTimer = setTimeout(finish, HOLD_MS);
  }

  function finish() {
    clearTimeout(holdTimer); cancelAnimationFrame(rafId);
    logo.classList.remove('holding');
    ring.classList.remove('active');
    arc.style.strokeDashoffset = CIRC;
    if (!editorOn) {
      document.getElementById('editorLoginModal').classList.remove('hidden');
      setTimeout(() => document.getElementById('editorUsername').focus(), 80);
    }
  }

  function cancel() {
    clearTimeout(holdTimer); cancelAnimationFrame(rafId);
    logo.classList.remove('holding');
    ring.classList.remove('active');
    arc.style.strokeDashoffset = CIRC;
  }

  logo.addEventListener('mousedown',  startHold);
  logo.addEventListener('mouseup',    cancel);
  logo.addEventListener('mouseleave', cancel);
  logo.addEventListener('touchstart', startHold, { passive: false });
  logo.addEventListener('touchend',   cancel);
  logo.addEventListener('touchcancel',cancel);
})();

/* ─── LOGIN ──────────────────────────────── */
function doEditorLogin() {
  const u = document.getElementById('editorUsername').value.trim();
  const p = document.getElementById('editorPassword').value;
  if (u === EDITOR_CREDS.u && p === EDITOR_CREDS.p) {
    editorOn = true;
    document.getElementById('editorLoginModal').classList.add('hidden');
    document.getElementById('editorToolbar').classList.remove('hidden');
    document.body.style.paddingTop = '46px';
    document.getElementById('editorLoginError').classList.add('hidden');
    document.getElementById('editorUsername').value = '';
    document.getElementById('editorPassword').value = '';
    toggleDelButtons(true);
  } else {
    document.getElementById('editorLoginError').classList.remove('hidden');
    document.getElementById('editorPassword').value = '';
    document.getElementById('editorPassword').focus();
  }
}

function closeEditorLogin() {
  document.getElementById('editorLoginModal').classList.add('hidden');
  document.getElementById('editorLoginError').classList.add('hidden');
  document.getElementById('editorUsername').value = '';
  document.getElementById('editorPassword').value = '';
}

function doEditorLogout() {
  editorOn = false;
  document.getElementById('editorToolbar').classList.add('hidden');
  document.body.style.paddingTop = '';
  editorTutup('artikel');
  editorTutup('pastoral');
  toggleDelButtons(false);
}

// Enter key on login
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const m = document.getElementById('editorLoginModal');
    if (m && !m.classList.contains('hidden')) doEditorLogin();
  }
});

/* ─── BUKA / TUTUP PANEL ─────────────────── */
function editorBuka(type) {
  if (type === 'artikel') {
    resetArtForm();
    document.getElementById('panelArtikel').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    resetPasForm();
    document.getElementById('panelPastoral').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function editorTutup(type) {
  const id = type === 'artikel' ? 'panelArtikel' : 'panelPastoral';
  document.getElementById(id).classList.add('hidden');
  document.body.style.overflow = '';
}

/* ─── RESET FORM ─────────────────────────── */
function resetArtForm() {
  artFotos = [null, null, null, null];
  document.getElementById('artJudul').value = '';
  document.getElementById('artRingkasan').value = '';
  document.getElementById('artIsi').value = '';
  document.getElementById('artPenulis').value = 'Komsos GKR';
  document.getElementById('artTanggal').valueAsDate = new Date();
  document.getElementById('artUploadMsg').classList.add('hidden');
  // reset slot UI
  for (let i = 0; i < 4; i++) renderFotoSlot(i, 'art', null);
  updateFotoPreview('art');
  updateArtLiveCard();
  // template default
  document.querySelectorAll('.ep-tpl').forEach(t => t.classList.remove('active'));
  document.querySelector('.ep-tpl').classList.add('active');
  artPilihTemplate(document.querySelector('.ep-tpl'), 'berita');
}

function resetPasForm() {
  pasFotos = [null, null, null, null];
  document.getElementById('pasJudul').value = '';
  document.getElementById('pasDesc').value = '';
  document.getElementById('pasLink').value = '';
  document.getElementById('pasTanggal').valueAsDate = new Date();
  document.getElementById('pasUploadMsg').classList.add('hidden');
  for (let i = 0; i < 4; i++) renderFotoSlot(i, 'pas', null);
  updateFotoPreview('pas');
  updatePasLiveCard();
}

/* ─── TEMPLATE ARTIKEL ──────────────────── */
const ART_TEMPLATES = {
  berita: {
    judul: 'Kegiatan ... Paroki Kristus Raja',
    ringkasan: 'Ringkasan singkat kegiatan yang berlangsung di Paroki Kristus Raja Karawang.',
    isi: 'Pada hari ... telah berlangsung kegiatan ...\n\nKegiatan ini dihadiri oleh ...\n\nDengan tema ..., umat diajak untuk ...\n\nSemoga kegiatan ini membawa berkat bagi seluruh umat.'
  },
  renungan: {
    judul: 'Renungan: ...',
    ringkasan: 'Refleksi iman dari bacaan Injil hari ini mengajak kita untuk merenungkan...',
    isi: 'Bacaan Injil:\n"..."\n\nRefleksi:\nSaudara-saudari terkasih, bacaan hari ini mengajak kita untuk...\n\nMari kita berdoa...\n\nDoa Penutup:\nTuhan yang Maha Kasih, ...'
  },
  pengumuman: {
    judul: 'Pengumuman: ...',
    ringkasan: 'Informasi penting untuk seluruh umat Paroki Kristus Raja Karawang.',
    isi: 'Kepada seluruh umat Paroki Kristus Raja yang terkasih,\n\nDengan hormat kami sampaikan:\n\n1. ...\n2. ...\n\nAtas perhatiannya, kami ucapkan terima kasih.\n\nSalam dan doa,\nPengurus Paroki Kristus Raja Karawang'
  },
  sejarah: {
    judul: 'Mengenal ...',
    ringkasan: 'Mengenal lebih dekat perjalanan dan makna dari ...',
    isi: 'Latar Belakang:\n...\n\nSejarah Singkat:\n...\n\nPerkembangan Hingga Kini:\n...\n\nSemoga sejarah ini menginspirasi kita semua.'
  }
};

function artPilihTemplate(el, tpl) {
  document.querySelectorAll('.ep-tpl').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const t = ART_TEMPLATES[tpl];
  if (!document.getElementById('artJudul').value) document.getElementById('artJudul').value = t.judul;
  if (!document.getElementById('artRingkasan').value) document.getElementById('artRingkasan').value = t.ringkasan;
  if (!document.getElementById('artIsi').value) document.getElementById('artIsi').value = t.isi;
  updateArtLiveCard();
}

/* ─── LIVE PREVIEW UPDATE ────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  ['artJudul','artRingkasan','artKategori','artPenulis','artTanggal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateArtLiveCard);
    if (el) el.addEventListener('change', updateArtLiveCard);
  });
  ['pasJudul','pasDesc','pasKategori','pasTanggal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updatePasLiveCard);
    if (el) el.addEventListener('change', updatePasLiveCard);
  });

  // Load dari localStorage saat halaman dibuka
  loadFromStorage();
});

function updateArtLiveCard() {
  const judul = document.getElementById('artJudul').value || 'Judul artikel';
  const kat   = document.getElementById('artKategori').value || 'Kategori';
  const ring  = document.getElementById('artRingkasan').value || 'Ringkasan artikel...';
  const penulis = document.getElementById('artPenulis').value || 'Penulis';
  const tgl   = document.getElementById('artTanggal').value;
  const tglFmt = tgl ? new Date(tgl).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : 'Tanggal';

  document.getElementById('artLiveKat').textContent   = kat;
  document.getElementById('artLiveJudul').textContent = judul;
  document.getElementById('artLiveRing').textContent  = ring;
  document.getElementById('artLiveMeta').textContent  = penulis + ' · ' + tglFmt;

  const foto = artFotos[0];
  const imgEl = document.getElementById('artLiveImg');
  imgEl.innerHTML = foto
    ? `<img src="${foto}" alt="">`
    : `<div class="ep-live-placeholder">🖼️</div>`;
}

function updatePasLiveCard() {
  const judul = document.getElementById('pasJudul').value || 'Judul kegiatan';
  const kat   = document.getElementById('pasKategori').value || 'Kategori';
  const desc  = document.getElementById('pasDesc').value || 'Deskripsi...';
  const tgl   = document.getElementById('pasTanggal').value;
  const tglFmt = tgl ? new Date(tgl).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : 'Tanggal';

  document.getElementById('pasLiveKat').textContent   = kat;
  document.getElementById('pasLiveJudul').textContent = judul;
  document.getElementById('pasLiveDesc').textContent  = desc;
  document.getElementById('pasLiveMeta').textContent  = tglFmt;

  const foto = pasFotos[0];
  const imgEl = document.getElementById('pasLiveImg');
  imgEl.innerHTML = foto
    ? `<img src="${foto}" alt="">`
    : `<div class="ep-live-placeholder">🖼️</div>`;
}

/* ─── SLOT FOTO ──────────────────────────── */
function bukaGaleriSlot(slot, type) {
  galeriTargetType  = type;
  galeriTargetSlot  = slot;
  galeriSelectedSrc = null;
  galeriCurrentAlbum = null;
  renderGaleriAlbum();
  document.getElementById('galeriModal').classList.remove('hidden');
}

function renderFotoSlot(slot, type, src) {
  const el = document.getElementById((type === 'art' ? 'artSlot' : 'pasSlot') + slot);
  if (!el) return;
  if (src) {
    el.innerHTML = `
      <img src="${src}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">
      <button class="ep-slot-remove" onclick="hapusFotoSlot(${slot},'${type}',event)">✕</button>`;
  } else {
    const labels = ['Foto Utama','Foto 2','Foto 3','Foto 4'];
    el.innerHTML = `<div class="ep-slot-empty"><span>+</span><small>${labels[slot]}</small></div>`;
  }
}

function hapusFotoSlot(slot, type, e) {
  e.stopPropagation();
  if (type === 'art') artFotos[slot] = null;
  else pasFotos[slot] = null;
  renderFotoSlot(slot, type, null);
  updateFotoPreview(type);
  if (slot === 0) {
    type === 'art' ? updateArtLiveCard() : updatePasLiveCard();
  }
}

function updateFotoPreview(type) {
  const fotos = type === 'art' ? artFotos : pasFotos;
  const grid  = document.getElementById(type === 'art' ? 'artFotoPreviewGrid' : 'pasFotoPreviewGrid');
  const filled = fotos.filter(Boolean);
  if (!filled.length) {
    grid.innerHTML = '<div class="ep-fp-empty">Belum ada foto dipilih</div>';
    return;
  }
  grid.innerHTML = filled.map(src =>
    `<div class="ep-fp-item"><img src="${src}" alt=""></div>`
  ).join('');
}

/* ─── GALERI MODAL ───────────────────────── */
function closeGaleri() {
  document.getElementById('galeriModal').classList.add('hidden');
  galeriSelectedSrc = null;
}

function galeriGoRoot() {
  galeriCurrentAlbum = null;
  renderGaleriAlbum();
}

function renderGaleriAlbum() {
  document.getElementById('galeriAlbumView').classList.remove('hidden');
  document.getElementById('galeriFotoView').classList.add('hidden');
  document.getElementById('galeriBreadcrumb').innerHTML =
    `<span class="galeri-bc-root" onclick="galeriGoRoot()">📁 Album</span>`;
  document.getElementById('galeriSelectedLabel').textContent = '';
  document.getElementById('galeriAlbumGrid').innerHTML = GALERI_ALBUMS.map(a =>
    `<div class="galeri-album-card" onclick="galeriOpenAlbum('${a.id}')">
      <div class="galeri-album-icon">${a.icon}</div>
      <div class="galeri-album-name">${a.nama}</div>
      <div class="galeri-album-count">${a.foto.length} foto</div>
    </div>`
  ).join('');
}

function galeriOpenAlbum(id) {
  const album = GALERI_ALBUMS.find(a => a.id === id);
  if (!album) return;
  galeriCurrentAlbum = album;
  galeriSelectedSrc  = null;
  document.getElementById('galeriAlbumView').classList.add('hidden');
  document.getElementById('galeriFotoView').classList.remove('hidden');
  document.getElementById('galeriBreadcrumb').innerHTML =
    `<span class="galeri-bc-root" onclick="galeriGoRoot()">📁 Album</span>
     <span class="galeri-bc-sep">›</span>
     <span class="galeri-bc-cur">${album.icon} ${album.nama}</span>`;
  document.getElementById('galeriSelectedLabel').textContent = '';

  document.getElementById('galeriFotoGrid').innerHTML = album.foto.map(f =>
    `<div class="galeri-foto-item" data-src="${f.src}" onclick="galeriPilihFoto('${f.src}','${f.nama}',this)">
      <img src="${f.src}" alt="${f.nama}" onerror="this.parentNode.style.background='#f0e8d8';">
      <div class="galeri-foto-check">✓</div>
      <div class="galeri-foto-name">${f.nama}</div>
    </div>`
  ).join('');
}

function galeriPilihFoto(src, nama, el) {
  document.querySelectorAll('.galeri-foto-item.selected').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
  galeriSelectedSrc = src;
  document.getElementById('galeriSelectedLabel').textContent = '✓ ' + nama;
}

function pakaiGambar() {
  if (!galeriSelectedSrc) { alert('Pilih foto terlebih dahulu.'); return; }
  const type = galeriTargetType;
  const slot = galeriTargetSlot;
  if (type === 'art') artFotos[slot] = galeriSelectedSrc;
  else pasFotos[slot] = galeriSelectedSrc;
  renderFotoSlot(slot, type, galeriSelectedSrc);
  updateFotoPreview(type);
  if (slot === 0) type === 'art' ? updateArtLiveCard() : updatePasLiveCard();
  closeGaleri();
}

/* ─── UPLOAD & SIMPAN KE LOCALSTORAGE ────── */
function artUpload() {
  const judul   = document.getElementById('artJudul').value.trim();
  const kat     = document.getElementById('artKategori').value;
  const penulis = document.getElementById('artPenulis').value.trim() || 'Komsos GKR';
  const tgl     = document.getElementById('artTanggal').value;
  const ringkasan = document.getElementById('artRingkasan').value.trim();
  const isi     = document.getElementById('artIsi').value.trim();

  if (!judul) { alert('Judul artikel wajib diisi.'); return; }

  const tglFmt = tgl ? new Date(tgl).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}) : '';
  const id = 'art_' + Date.now();

  const data = { id, judul, kat, penulis, tgl, tglFmt, ringkasan, isi, fotos: [...artFotos], type: 'artikel', ts: Date.now() };

  // Simpan ke localStorage
  const stored = JSON.parse(localStorage.getItem('gkr_konten') || '[]');
  stored.unshift(data);
  localStorage.setItem('gkr_konten', JSON.stringify(stored));

  // Tampilkan langsung ke halaman
  renderArtikelCard(data, true);
  // Tombol hapus langsung aktif karena editor sedang on
  toggleDelButtons(true);

  // Feedback + tawarkan simulasi
  document.getElementById('artUploadMsg').classList.remove('hidden');
  document.getElementById('artUploadMsg').innerHTML =
    '✅ Berhasil! &nbsp;<button class="ep-sim-quick-btn" onclick="bukaSimulasi(' + JSON.stringify(data).replace(/'/g,"\\'") + ')">👁 Lihat Simulasi</button>';
  setTimeout(() => {
    document.getElementById('artUploadMsg').classList.add('hidden');
    editorTutup('artikel');
    document.querySelector('#artikel').scrollIntoView({ behavior: 'smooth' });
  }, 4000);
}

function pasUpload() {
  const judul = document.getElementById('pasJudul').value.trim();
  const kat   = document.getElementById('pasKategori').value;
  const tgl   = document.getElementById('pasTanggal').value;
  const desc  = document.getElementById('pasDesc').value.trim();
  const link  = document.getElementById('pasLink').value.trim() || '#kegiatan';

  if (!judul) { alert('Judul kegiatan wajib diisi.'); return; }

  const tglFmt = tgl ? new Date(tgl).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}) : '';
  const id = 'pas_' + Date.now();

  const data = { id, judul, kat, tgl, tglFmt, desc, link, fotos: [...pasFotos], type: 'pastoral', ts: Date.now() };

  const stored = JSON.parse(localStorage.getItem('gkr_konten') || '[]');
  stored.unshift(data);
  localStorage.setItem('gkr_konten', JSON.stringify(stored));

  renderPastoralCard(data, true);
  toggleDelButtons(true);

  document.getElementById('pasUploadMsg').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('pasUploadMsg').classList.add('hidden');
    editorTutup('pastoral');
    document.querySelector('#kegiatan').scrollIntoView({ behavior: 'smooth' });
  }, 1800);
}

/* ─── RENDER KARTU KE DOM ────────────────── */
function renderArtikelCard(d, animate) {
  const grid = document.getElementById('artikelGrid');
  if (!grid) return;
  const foto = d.fotos && d.fotos[0] ? d.fotos[0] : null;

  const wrap = document.createElement('div');
  wrap.className = 'ep-card-wrap' + (animate ? ' ep-card-anim' : '');
  wrap.setAttribute('data-konten-id', d.id);

  const a = document.createElement('a');
  a.href = '#';
  a.className = 'artikel-card-pro';
  a.innerHTML = `
    <div class="artikel-img-wrap">
      ${foto ? `<img src="${foto}" alt="${d.judul}">` : '<div style="height:200px;background:linear-gradient(135deg,#f0e8d8,#e8d4b8);"></div>'}
      <span class="artikel-badge">${d.kat}</span>
    </div>
    <div class="artikel-info-pro">
      <div class="artikel-meta">${d.penulis} &nbsp;·&nbsp; ${d.tglFmt}</div>
      <h3>${d.judul}</h3>
      <p>${d.ringkasan}</p>
      <span class="artikel-baca-btn">Baca Selengkapnya</span>
    </div>`;
  a.addEventListener('click', e => { e.preventDefault(); bukaSimulasi(d); });

  wrap.appendChild(a);

  // Tombol hapus — hanya muncul saat editor aktif
  const delBtn = document.createElement('button');
  delBtn.className = 'ep-del-btn ep-del-hidden';
  delBtn.innerHTML = '🗑 Hapus';
  delBtn.addEventListener('click', e => { e.stopPropagation(); hapusKonten(d.id, wrap); });
  wrap.appendChild(delBtn);

  grid.prepend(wrap);
}

function renderPastoralCard(d, animate) {
  const grid = document.getElementById('pastoralGrid');
  if (!grid) return;
  const foto = d.fotos && d.fotos[0] ? d.fotos[0] : null;
  const katShort = d.kat.split('&')[0].trim().split(' ')[0];

  const wrap = document.createElement('div');
  wrap.className = 'ep-card-wrap' + (animate ? ' ep-card-anim' : '');
  wrap.setAttribute('data-konten-id', d.id);

  const a = document.createElement('a');
  a.href = d.link || '#kegiatan';
  a.className = 'pastoral-card';
  a.innerHTML = `
    <div class="pastoral-card-img">
      ${foto ? `<img src="${foto}" alt="${d.judul}">` : '<div style="height:200px;background:linear-gradient(135deg,#f0e8d8,#e8d4b8);display:flex;align-items:center;justify-content:center;font-size:40px;">🕊️</div>'}
      <span class="pastoral-badge">${katShort}</span>
    </div>
    <div class="pastoral-card-info">
      <div class="pastoral-meta-row">
        <span class="pastoral-kategori">${d.kat}</span>
        <span class="pastoral-dot-sep">·</span>
        <span class="pastoral-tanggal">${d.tglFmt}</span>
      </div>
      <h4>${d.judul}</h4>
      <p>${d.desc}</p>
      <span class="pastoral-baca-link">Baca →</span>
    </div>`;

  wrap.appendChild(a);

  const delBtn = document.createElement('button');
  delBtn.className = 'ep-del-btn ep-del-hidden';
  delBtn.innerHTML = '🗑 Hapus';
  delBtn.addEventListener('click', e => { e.stopPropagation(); hapusKonten(d.id, wrap); });
  wrap.appendChild(delBtn);

  grid.prepend(wrap);
}

/* ─── HAPUS KONTEN ────────────────────────── */
function hapusKonten(id, wrap) {
  if (!confirm('Hapus konten ini? Tidak bisa dibatalkan.')) return;
  // Hapus dari localStorage
  let stored = JSON.parse(localStorage.getItem('gkr_konten') || '[]');
  stored = stored.filter(d => d.id !== id);
  localStorage.setItem('gkr_konten', JSON.stringify(stored));
  // Animasi keluar lalu hapus elemen
  wrap.style.transition = 'opacity 0.3s, transform 0.3s';
  wrap.style.opacity = '0';
  wrap.style.transform = 'scale(0.92)';
  setTimeout(() => wrap.remove(), 320);
}

/* ─── TAMPILKAN / SEMBUNYIKAN TOMBOL HAPUS ── */
function toggleDelButtons(show) {
  document.querySelectorAll('.ep-del-btn').forEach(btn => {
    btn.classList.toggle('ep-del-hidden', !show);
  });
}

/* ─── SIMULASI TAMPILAN ARTIKEL PENUH ────── */
function bukaSimulasi(d) {
  const fotos = (d.fotos || []).filter(Boolean);

  // Grid foto tambahan (foto 2-4)
  const extraFotos = fotos.slice(1);
  const fotoGrid = extraFotos.length
    ? `<div class="sim-foto-grid sim-foto-${Math.min(extraFotos.length, 3)}">
        ${extraFotos.map(f => `<div class="sim-foto-item"><img src="${f}" alt=""></div>`).join('')}
       </div>`
    : '';

  const sim = document.createElement('div');
  sim.className = 'ep-sim-overlay';
  sim.id = 'epSimOverlay';
  sim.innerHTML = `
    <!-- Browser chrome mockup -->
    <div class="ep-sim-chrome">
      <div class="ep-sim-chrome-dots">
        <span class="ep-sim-dot ep-dot-red"></span>
        <span class="ep-sim-dot ep-dot-yellow"></span>
        <span class="ep-sim-dot ep-dot-green"></span>
      </div>
      <div class="ep-sim-url">
        <span class="ep-sim-lock">🔒</span>
        kristusrajakarawang.id/<span style="color:#c8791e">${(d.judul||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,30)}</span>
      </div>
      <button class="ep-sim-close" onclick="document.getElementById('epSimOverlay').remove()">✕ Tutup Simulasi</button>
    </div>

    <!-- Halaman artikel tiruan -->
    <div class="ep-sim-page">

      <!-- Navbar tiruan -->
      <div class="ep-sim-navbar">
        <div class="ep-sim-nav-brand">
          <div class="ep-sim-nav-logo">✝</div>
          <span>Kristus Raja Karawang</span>
        </div>
        <div class="ep-sim-nav-links">
          <span>Beranda</span><span>Pengumuman</span><span>Kegiatan</span><span>Artikel</span>
        </div>
      </div>

      <!-- Konten artikel -->
      <div class="ep-sim-content">

        <!-- Breadcrumb -->
        <div class="ep-sim-breadcrumb">
          <span>Beranda</span> › <span>Artikel</span> › <span class="ep-sim-bc-cur">${d.judul}</span>
        </div>

        <!-- Hero foto -->
        ${fotos[0] ? `<div class="ep-sim-hero"><img src="${fotos[0]}" alt="${d.judul}"></div>` : ''}

        <!-- Meta -->
        <div class="ep-sim-meta-row">
          <span class="ep-sim-kat">${d.kat}</span>
          <span class="ep-sim-meta-sep">·</span>
          <span class="ep-sim-penulis">${d.penulis || 'Komsos GKR'}</span>
          <span class="ep-sim-meta-sep">·</span>
          <span class="ep-sim-tgl">${d.tglFmt}</span>
        </div>

        <!-- Judul -->
        <h1 class="ep-sim-judul">${d.judul}</h1>

        <!-- Ringkasan -->
        <p class="ep-sim-ringkasan">${d.ringkasan}</p>

        <!-- Divider -->
        <div class="ep-sim-divider"></div>

        <!-- Isi artikel -->
        <div class="ep-sim-isi">${(d.isi || '').replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>')}</div>

        <!-- Grid foto tambahan -->
        ${fotoGrid}

        <!-- Tags -->
        <div class="ep-sim-tags">
          <span class="ep-sim-tag">${d.kat}</span>
          <span class="ep-sim-tag">Paroki Kristus Raja</span>
          <span class="ep-sim-tag">Karawang</span>
        </div>

        <!-- Kembali -->
        <div class="ep-sim-back">← Kembali ke Artikel</div>

      </div><!-- end content -->

      <!-- Footer tiruan -->
      <div class="ep-sim-footer">
        © 2025 Gereja Katolik Kristus Raja Karawang – Keuskupan Bandung
      </div>

    </div><!-- end page -->

    <!-- Label simulasi -->
    <div class="ep-sim-label">👁 SIMULASI TAMPILAN ARTIKEL</div>
  `;

  sim.addEventListener('click', e => {
    if (e.target === sim) sim.remove();
  });

  document.body.appendChild(sim);
  // Scroll simulasi ke atas
  setTimeout(() => sim.querySelector('.ep-sim-page').scrollTop = 0, 50);
}

/* ─── MUAT DARI LOCALSTORAGE ─────────────── */
function loadFromStorage() {
  const stored = JSON.parse(localStorage.getItem('gkr_konten') || '[]');
  [...stored].reverse().forEach(d => {
    if (d.type === 'artikel') renderArtikelCard(d, false);
    else renderPastoralCard(d, false);
  });
}

function infoSimulasi() {
  // Klik salah satu kartu artikel untuk buka simulasi
  const hint = document.createElement('div');
  hint.className = 'ep-sim-hint-toast';
  hint.textContent = '👆 Klik kartu artikel mana saja untuk lihat simulasi tampilan penuhnya';
  document.body.appendChild(hint);
  setTimeout(() => hint.remove(), 3500);
}

/* =========================================
   PASTORAL GRID — MOBILE SCROLL HINT
========================================= */
(function() {
  function initPastoralScroll() {
    const grid = document.getElementById('pastoralGrid');
    const hint = document.getElementById('pastoralScrollHint');
    if (!grid || !hint) return;

    function checkScroll() {
      const atBottom = grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 10;
      const hasScroll = grid.scrollHeight > grid.clientHeight + 10;

      // Mask: hilang saat di bawah
      if (atBottom) {
        grid.setAttribute('data-scrolled', 'bottom');
        grid.style.webkitMaskImage = 'none';
        grid.style.maskImage = 'none';
      } else {
        grid.removeAttribute('data-scrolled');
        grid.style.webkitMaskImage = 'linear-gradient(to bottom, black 82%, transparent 100%)';
        grid.style.maskImage = 'linear-gradient(to bottom, black 82%, transparent 100%)';
      }

      // Hint text
      hint.style.display = hasScroll && !atBottom ? 'flex' : 'none';
    }

    grid.addEventListener('scroll', checkScroll);

    // Cek ulang saat resize (masuk/keluar mobile)
    window.addEventListener('resize', checkScroll);

    // Jalankan saat konten sudah dirender
    setTimeout(checkScroll, 300);

    // Observer jika kartu baru ditambahkan (editor upload)
    const obs = new MutationObserver(() => setTimeout(checkScroll, 100));
    obs.observe(grid, { childList: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPastoralScroll);
  } else {
    initPastoralScroll();
  }
})();
