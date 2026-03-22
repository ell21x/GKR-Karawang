/* =========================================
   HERO CAROUSEL (Global — runs immediately)
========================================= */
let heroTrack  = null;
let heroSlides = [];
let heroIdx = 0;
let heroAuto;
let swipeStartX = 0;

function goToSlide(i) {
  if (!heroTrack || !heroSlides.length) return;
  heroIdx = (i + heroSlides.length) % heroSlides.length;
  heroTrack.style.transform = `translateX(-${heroIdx * 100}%)`;
}

function nextSlide() { goToSlide(heroIdx + 1); }
function prevSlide() { goToSlide(heroIdx - 1); }

function startAutoSlide() { heroAuto = setInterval(nextSlide, 5000); }
function stopAutoSlide()  { clearInterval(heroAuto); }

document.addEventListener('DOMContentLoaded', () => {
  heroTrack  = document.querySelector(".hero-track");
  heroSlides = document.querySelectorAll(".hero-slide");
  if (heroTrack && heroSlides.length) startAutoSlide();
});

// Hero swipe - set up in DOMContentLoaded below



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
  const searchBox   = document.getElementById("searchPanel");
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

/* Open a generated article page via the viewer router */
function bukaHalamanArtikel(pageFile) {
  window.open(pageUrl(pageFile), '_blank');
}

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
    document.body.classList.add('editor-active');
    document.body.style.paddingTop = ''; // toolbar is now at bottom
    document.getElementById('editorLoginError').classList.add('hidden');
    document.getElementById('editorUsername').value = '';
    document.getElementById('editorPassword').value = '';
    toggleDelButtons(true);
    // Show FAB
    const fab = document.getElementById('fabMain');
    const fabMenu = document.getElementById('fabMenu');
    if (fab) fab.classList.remove('fab-hidden');
    if (fabMenu) fabMenu.classList.add('fab-hidden'); // menu starts closed
    // Show Keluar Editor button
    const btnKeluar = document.getElementById('btnKeluarEditor');
    if (btnKeluar) btnKeluar.classList.remove('fab-hidden');
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
  document.body.classList.remove('editor-active');
  document.body.style.paddingTop = '';
  editorTutup('artikel');
  editorTutup('pastoral');
  toggleDelButtons(false);
  // Hide FAB
  const fab = document.getElementById('fabMain');
  const fabMenu = document.getElementById('fabMenu');
  if (fab) fab.classList.add('fab-hidden');
  if (fabMenu) fabMenu.classList.add('fab-hidden');
  // Hide Keluar Editor button
  const btnKeluar = document.getElementById('btnKeluarEditor');
  if (btnKeluar) btnKeluar.classList.add('fab-hidden');
}

let fabOpen = false;
function toggleFab() {
  fabOpen = !fabOpen;
  const menu = document.getElementById('fabMenu');
  const btn = document.getElementById('fabMain');
  if (fabOpen) {
    menu.classList.remove('fab-hidden');
    btn.classList.add('fab-open');
  } else {
    menu.classList.add('fab-hidden');
    btn.classList.remove('fab-open');
  }
}

// Close FAB menu when a panel opens
const _origEditorBuka = window.editorBuka;
document.addEventListener('DOMContentLoaded', () => {
  // Close FAB when clicking outside
  document.addEventListener('click', e => {
    if (fabOpen) {
      const fab = document.getElementById('fabMain');
      const menu = document.getElementById('fabMenu');
      if (fab && !fab.contains(e.target) && menu && !menu.contains(e.target)) {
        fabOpen = false;
        menu.classList.add('fab-hidden');
        fab.classList.remove('fab-open');
      }
    }
  });
});

// Enter key on login
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const m = document.getElementById('editorLoginModal');
    if (m && !m.classList.contains('hidden')) doEditorLogin();
  }
});

/* ─── BUKA / TUTUP PANEL ─────────────────── */
function editorBuka(type) {
  // Close FAB menu
  fabOpen = false;
  const menu = document.getElementById('fabMenu');
  const btn = document.getElementById('fabMain');
  if (menu) menu.classList.add('fab-hidden');
  if (btn) btn.classList.remove('fab-open');

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
  document.getElementById('artTanggal').valueAsDate = new Date();
  document.getElementById('artUploadMsg').classList.add('hidden');
  renderFotoSlot(0, 'art', null);
  updateFotoPreview('art');
  updateArtLiveCard();
}

function resetPasForm() {
  pasFotos = [null, null, null, null];
  document.getElementById('pasJudul').value = '';
  document.getElementById('pasDesc').value = '';
  document.getElementById('pasTanggal').valueAsDate = new Date();
  document.getElementById('pasUploadMsg').classList.add('hidden');
  renderFotoSlot(0, 'pas', null);
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
  const judul = document.getElementById('artJudul') ? document.getElementById('artJudul').value || 'Judul artikel' : 'Judul artikel';
  const kat   = document.getElementById('artKategori') ? document.getElementById('artKategori').value || 'Kategori' : 'Kategori';
  const ring  = document.getElementById('artRingkasan') ? document.getElementById('artRingkasan').value || 'Ringkasan...' : 'Ringkasan...';
  const tgl   = document.getElementById('artTanggal') ? document.getElementById('artTanggal').value : '';
  const tglFmt = tgl ? new Date(tgl).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : 'Tanggal';

  const lKat  = document.getElementById('artLiveKat');   if (lKat)  lKat.textContent  = kat;
  const lJudul= document.getElementById('artLiveJudul'); if (lJudul) lJudul.textContent = judul;
  const lRing = document.getElementById('artLiveRing');  if (lRing)  lRing.textContent  = ring;
  const lMeta = document.getElementById('artLiveMeta');  if (lMeta)  lMeta.textContent  = tglFmt;

  const foto = artFotos[0];
  const imgEl = document.getElementById('artLiveImg');
  if (imgEl) imgEl.innerHTML = foto
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
  // Reset file input
  const fi = document.getElementById('galeriFileInput');
  if (fi) fi.value = '';
}

/* ─── UPLOAD FOTO DARI PERANGKAT LOKAL (PROFESSIONAL) ─── */
function galeriUploadLokal(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  prosesUploadFile(file);
}

function prosesUploadFile(file) {
  if (!file || !file.type.startsWith('image/')) {
    alert('Harap pilih file gambar (JPG, PNG, WEBP).');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    alert('Ukuran file terlalu besar. Maksimal 10MB.');
    return;
  }

  // Show progress bar animation
  const progress = document.getElementById('galeriDropProgress');
  const bar = document.getElementById('galeriDropBar');
  const dropzone = document.getElementById('galeriDropzone');
  if (progress) progress.classList.remove('hidden');
  if (bar) { bar.style.width = '0%'; bar.style.transition = 'none'; }
  if (dropzone) dropzone.classList.add('galeri-drop-loading');

  // Simulate progress then read file
  let pct = 0;
  const iv = setInterval(() => {
    pct = Math.min(pct + Math.random() * 18, 85);
    if (bar) { bar.style.transition = 'width 0.2s ease'; bar.style.width = pct + '%'; }
  }, 80);

  const sizeKB = (file.size / 1024).toFixed(0);
  const sizeTxt = file.size > 1024 * 1024
    ? (file.size / (1024*1024)).toFixed(1) + ' MB'
    : sizeKB + ' KB';

  const reader = new FileReader();
  reader.onload = function(e) {
    clearInterval(iv);
    if (bar) { bar.style.width = '100%'; }

    setTimeout(() => {
      const src = e.target.result;

      // Show preview in dropzone
      if (dropzone) {
        dropzone.classList.remove('galeri-drop-loading');
        // Replace content with preview card
        dropzone.innerHTML = `
          <div class="galeri-drop-preview">
            <img src="${src}" alt="preview">
            <div class="galeri-drop-preview-info">
              <span class="galeri-drop-preview-name">${file.name}</span>
              <span class="galeri-drop-preview-size">${sizeTxt}</span>
            </div>
            <div class="galeri-drop-preview-done">✓</div>
          </div>
          <div style="display:flex;gap:8px;margin-top:10px;justify-content:center;">
            <button onclick="galeriKonfirmasiUpload('${src.replace(/'/g,"\\'")}', event)"
              style="background:linear-gradient(135deg,#27ae60,#2ecc71);color:#fff;border:none;border-radius:20px;padding:8px 20px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 3px 12px rgba(39,174,96,0.35);">
              ✓ Pakai Foto Ini
            </button>
            <button onclick="galeriResetDropzone()"
              style="background:rgba(0,0,0,0.07);color:#5a4030;border:none;border-radius:20px;padding:8px 16px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;">
              ✕ Ganti
            </button>
          </div>`;
      }
    }, 300);
  };
  reader.onerror = () => { clearInterval(iv); alert('Gagal membaca file.'); };
  reader.readAsDataURL(file);
}

function galeriKonfirmasiUpload(src, e) {
  if (e) e.stopPropagation();
  if (galeriTargetType === 'art') artFotos[galeriTargetSlot] = src;
  else pasFotos[galeriTargetSlot] = src;
  renderFotoSlot(galeriTargetSlot, galeriTargetType, src);
  updateFotoPreview(galeriTargetType);
  if (galeriTargetSlot === 0) {
    galeriTargetType === 'art' ? updateArtLiveCard() : updatePasLiveCard();
  }
  closeGaleri();
}

function galeriResetDropzone() {
  const dz = document.getElementById('galeriDropzone');
  if (!dz) return;
  dz.innerHTML = `
    <input type="file" id="galeriFileInput" accept="image/*" style="display:none" onchange="galeriUploadLokal(this)">
    <div class="galeri-drop-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="32" height="32"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    </div>
    <div class="galeri-drop-title">Drag &amp; drop foto di sini</div>
    <div class="galeri-drop-sub">atau <span class="galeri-drop-browse">pilih dari perangkat</span></div>
    <div class="galeri-drop-types">JPG, PNG, WEBP — maks. 10MB</div>
    <div class="galeri-drop-progress hidden" id="galeriDropProgress">
      <div class="galeri-drop-bar" id="galeriDropBar"></div>
    </div>`;
  dz.classList.remove('galeri-drop-loading','galeri-drop-hover');
  dz.onclick = () => document.getElementById('galeriFileInput').click();
}

/* ─── DRAG & DROP DROPZONE ─────────────── */
(function() {
  function initDropzone() {
    const dz = document.getElementById('galeriDropzone');
    if (!dz) return;

    dz.addEventListener('dragover', e => {
      e.preventDefault();
      dz.classList.add('galeri-drop-hover');
    });
    dz.addEventListener('dragleave', e => {
      if (!dz.contains(e.relatedTarget)) dz.classList.remove('galeri-drop-hover');
    });
    dz.addEventListener('drop', e => {
      e.preventDefault();
      dz.classList.remove('galeri-drop-hover');
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) prosesUploadFile(file);
    });
  }

  // Re-init dropzone each time galeri opens
  const orig = window.bukaGaleriSlot;
  window.bukaGaleriSlot = function(slot, type) {
    galeriTargetType = type;
    galeriTargetSlot = slot;
    galeriSelectedSrc = null;
    galeriCurrentAlbum = null;
    renderGaleriAlbum();
    document.getElementById('galeriModal').classList.remove('hidden');
    // Reset dropzone state
    const dz = document.getElementById('galeriDropzone');
    if (dz) { galeriResetDropzone(); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropzone);
  } else {
    initDropzone();
  }
})();

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

/* Generate a slug from title */
function makeSlug(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 50) + '-' + Date.now();
}

/* Generate full article HTML page — matching existing article pages */
function generateArtikelPage(d) {
  const fotos = (d.fotos || []).filter(Boolean);
  const extraFotos = fotos.slice(1);
  const fotoGridHTML = extraFotos.length
    ? `<div class="gen-foto-grid gen-foto-${Math.min(extraFotos.length, 3)}">
        ${extraFotos.map(f => `<div class="gen-foto-item"><img src="${f}" alt=""></div>`).join('')}
       </div>`
    : '';

  const isiHTML = (d.isi || '')
    .split(/\n\n+/)
    .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${d.judul} – Gereja Katolik Kristus Raja Karawang</title>

  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <style>
    /* ── Halaman Artikel ── */
    body { background: #f8f5f0; }

    .gen-topbar {
      background: #7a4b00;
      color: rgba(255,255,255,0.9);
      text-align: center;
      padding: 8px 12px;
      font-size: 12px;
      font-family: 'Poppins', sans-serif;
    }

    .gen-navbar {
      background: #fff;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      padding: 0 24px;
      height: 60px;
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 999;
    }
    .gen-nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .gen-nav-logo {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #5a2100;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #fff;
      font-weight: 700;
    }
    .gen-nav-name {
      font-family: 'DM Serif Display', serif;
      font-size: 16px;
      color: #2a1000;
      line-height: 1.2;
    }
    .gen-nav-name small {
      display: block;
      font-family: 'Poppins', sans-serif;
      font-size: 10px;
      color: #999;
      font-weight: 400;
    }

    /* Round back button — same as existing pages */
    .btn-back {
      position: fixed;
      top: 80px;
      left: 16px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(0,0,0,0.55);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      transition: transform 0.2s ease, background 0.2s ease;
      text-decoration: none;
    }
    .btn-back:hover {
      background: rgba(0,0,0,0.78);
      transform: scale(1.07);
    }
    .btn-back svg {
      width: 22px;
      height: 22px;
      stroke: #fff;
      stroke-width: 2.5;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      pointer-events: none;
    }
    @media (max-width: 600px) {
      .btn-back { width: 40px; height: 40px; top: 74px; left: 12px; }
      .btn-back svg { width: 20px; height: 20px; }
    }

    /* Article content */
    .gen-wrap {
      max-width: 780px;
      margin: 0 auto;
      padding: 40px 24px 80px;
    }

    .gen-breadcrumb {
      font-size: 12px;
      color: #aaa;
      margin-bottom: 28px;
      font-family: 'Poppins', sans-serif;
    }
    .gen-breadcrumb a {
      color: #c8791e;
      text-decoration: none;
    }
    .gen-breadcrumb a:hover { text-decoration: underline; }

    .gen-meta-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .gen-kat {
      background: #fff3e8;
      color: #c8791e;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 30px;
      font-family: 'Poppins', sans-serif;
    }
    .gen-sep { color: #ccc; }
    .gen-author, .gen-date {
      font-size: 13px;
      color: #999;
      font-family: 'Poppins', sans-serif;
    }

    .gen-judul {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(26px, 4vw, 38px);
      color: #1a0a00;
      line-height: 1.22;
      margin-bottom: 20px;
    }

    .gen-hero {
      width: 100%;
      border-radius: 18px;
      overflow: hidden;
      margin-bottom: 32px;
      max-height: 480px;
    }
    .gen-hero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .gen-ringkasan {
      font-family: 'Poppins', sans-serif;
      font-size: 17px;
      color: #5a3a1a;
      line-height: 1.75;
      margin-bottom: 28px;
      padding-bottom: 28px;
      border-bottom: 2px solid #e8ddd0;
      font-weight: 500;
    }

    .gen-isi {
      font-family: 'Poppins', sans-serif;
      font-size: 15px;
      color: #333;
      line-height: 1.9;
    }
    .gen-isi p { margin-bottom: 20px; }

    .gen-foto-grid {
      display: grid;
      gap: 12px;
      margin: 32px 0;
      border-radius: 14px;
      overflow: hidden;
    }
    .gen-foto-1 { grid-template-columns: 1fr; }
    .gen-foto-2 { grid-template-columns: 1fr 1fr; }
    .gen-foto-3 { grid-template-columns: 1fr 1fr 1fr; }
    .gen-foto-item img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
    }
    @media (max-width: 600px) {
      .gen-foto-2, .gen-foto-3 { grid-template-columns: 1fr 1fr; }
      .gen-foto-item img { height: 140px; }
      .gen-wrap { padding: 28px 16px 60px; }
    }

    .gen-divider {
      height: 2px;
      background: linear-gradient(90deg, #e8ddd0, transparent);
      margin: 32px 0;
      border-radius: 2px;
    }

    .gen-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 32px;
    }
    .gen-tag {
      background: #f0ece4;
      color: #7a5535;
      font-size: 12px;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      padding: 5px 14px;
      border-radius: 30px;
    }

    footer {
      background: linear-gradient(135deg, #4a2400, #7b3f00);
      color: rgba(255,255,255,0.75);
      text-align: center;
      padding: 22px;
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      margin-top: 60px;
    }
  </style>
</head>
<body>

<!-- Topbar -->
<div class="gen-topbar">Gereja Katolik Kristus Raja Karawang – Keuskupan Bandung</div>

<!-- Navbar -->
<nav class="gen-navbar">
  <a href="index.html" class="gen-nav-brand">
    <div class="gen-nav-logo">✝</div>
    <div class="gen-nav-name">
      Kristus Raja Karawang
      <small>Keuskupan Bandung</small>
    </div>
  </a>
</nav>

<!-- Tombol Back — bulat di kiri atas (sama seperti artikel lain) -->
<a href="index.html#artikel" class="btn-back" title="Kembali ke Artikel">
  <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
</a>

<!-- Konten -->
<div class="gen-wrap">

  <!-- Breadcrumb -->
  <div class="gen-breadcrumb">
    <a href="index.html">Beranda</a> &rsaquo;
    <a href="index.html#artikel">Artikel</a> &rsaquo;
    ${d.judul}
  </div>

  <!-- Meta -->
  <div class="gen-meta-row">
    <span class="gen-kat">${d.kat}</span>
    <span class="gen-sep">·</span>
    <span class="gen-author">${d.penulis || 'Komsos GKR'}</span>
    <span class="gen-sep">·</span>
    <span class="gen-date">${d.tglFmt}</span>
  </div>

  <!-- Judul -->
  <h1 class="gen-judul">${d.judul}</h1>

  <!-- Foto Hero -->
  ${fotos[0] ? `<div class="gen-hero"><img src="${fotos[0]}" alt="${d.judul}"></div>` : ''}

  <!-- Ringkasan -->
  ${d.ringkasan ? `<p class="gen-ringkasan">${d.ringkasan}</p>` : ''}

  <!-- Isi Artikel -->
  <div class="gen-isi">${isiHTML}</div>

  <!-- Foto tambahan -->
  ${fotoGridHTML}

  <div class="gen-divider"></div>

  <!-- Tags -->
  <div class="gen-tags">
    <span class="gen-tag">${d.kat}</span>
    <span class="gen-tag">Paroki Kristus Raja</span>
    <span class="gen-tag">Karawang</span>
  </div>

</div>

<footer>© 2025 Gereja Katolik Kristus Raja Karawang – Keuskupan Bandung</footer>

</body>
</html>`;
}

/* Generate full pastoral page HTML — matching existing article pages */
function generatePastoralPage(d) {
  const fotos = (d.fotos || []).filter(Boolean);
  const extraFotos = fotos.slice(1);
  const fotoGridHTML = extraFotos.length
    ? `<div class="gen-foto-grid gen-foto-${Math.min(extraFotos.length, 3)}">
        ${extraFotos.map(f => `<div class="gen-foto-item"><img src="${f}" alt=""></div>`).join('')}
       </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${d.judul} – Gereja Katolik Kristus Raja Karawang</title>

  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <style>
    body { background: #f8f5f0; }

    .gen-topbar {
      background: #7a4b00;
      color: rgba(255,255,255,0.9);
      text-align: center;
      padding: 8px 12px;
      font-size: 12px;
      font-family: 'Poppins', sans-serif;
    }

    .gen-navbar {
      background: #fff;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      padding: 0 24px;
      height: 60px;
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 999;
    }
    .gen-nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .gen-nav-logo {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #5a2100;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #fff;
      font-weight: 700;
    }
    .gen-nav-name {
      font-family: 'DM Serif Display', serif;
      font-size: 16px;
      color: #2a1000;
      line-height: 1.2;
    }
    .gen-nav-name small {
      display: block;
      font-family: 'Poppins', sans-serif;
      font-size: 10px;
      color: #999;
      font-weight: 400;
    }

    .btn-back {
      position: fixed;
      top: 80px;
      left: 16px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(0,0,0,0.55);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      transition: transform 0.2s ease, background 0.2s ease;
      text-decoration: none;
    }
    .btn-back:hover {
      background: rgba(0,0,0,0.78);
      transform: scale(1.07);
    }
    .btn-back svg {
      width: 22px;
      height: 22px;
      stroke: #fff;
      stroke-width: 2.5;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      pointer-events: none;
    }
    @media (max-width: 600px) {
      .btn-back { width: 40px; height: 40px; top: 74px; left: 12px; }
      .btn-back svg { width: 20px; height: 20px; }
    }

    .gen-wrap {
      max-width: 780px;
      margin: 0 auto;
      padding: 40px 24px 80px;
    }

    .gen-breadcrumb {
      font-size: 12px;
      color: #aaa;
      margin-bottom: 28px;
      font-family: 'Poppins', sans-serif;
    }
    .gen-breadcrumb a { color: #c8791e; text-decoration: none; }
    .gen-breadcrumb a:hover { text-decoration: underline; }

    .gen-meta-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .gen-kat {
      background: #fff3e8;
      color: #c8791e;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 30px;
      font-family: 'Poppins', sans-serif;
    }
    .gen-sep { color: #ccc; }
    .gen-date {
      font-size: 13px;
      color: #999;
      font-family: 'Poppins', sans-serif;
    }

    .gen-judul {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(26px, 4vw, 38px);
      color: #1a0a00;
      line-height: 1.22;
      margin-bottom: 20px;
    }

    .gen-hero {
      width: 100%;
      border-radius: 18px;
      overflow: hidden;
      margin-bottom: 32px;
      max-height: 480px;
    }
    .gen-hero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .gen-ringkasan {
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      color: #5a3a1a;
      line-height: 1.75;
      margin-bottom: 28px;
      padding-bottom: 28px;
      border-bottom: 2px solid #e8ddd0;
    }

    .gen-foto-grid {
      display: grid;
      gap: 12px;
      margin: 32px 0;
      border-radius: 14px;
      overflow: hidden;
    }
    .gen-foto-1 { grid-template-columns: 1fr; }
    .gen-foto-2 { grid-template-columns: 1fr 1fr; }
    .gen-foto-3 { grid-template-columns: 1fr 1fr 1fr; }
    .gen-foto-item img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
    }
    @media (max-width: 600px) {
      .gen-foto-2, .gen-foto-3 { grid-template-columns: 1fr 1fr; }
      .gen-foto-item img { height: 140px; }
      .gen-wrap { padding: 28px 16px 60px; }
    }

    .gen-divider {
      height: 2px;
      background: linear-gradient(90deg, #e8ddd0, transparent);
      margin: 32px 0;
      border-radius: 2px;
    }

    .gen-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 32px;
    }
    .gen-tag {
      background: #f0ece4;
      color: #7a5535;
      font-size: 12px;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      padding: 5px 14px;
      border-radius: 30px;
    }

    footer {
      background: linear-gradient(135deg, #4a2400, #7b3f00);
      color: rgba(255,255,255,0.75);
      text-align: center;
      padding: 22px;
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      margin-top: 60px;
    }
  </style>
</head>
<body>

<div class="gen-topbar">Gereja Katolik Kristus Raja Karawang – Keuskupan Bandung</div>

<nav class="gen-navbar">
  <a href="index.html" class="gen-nav-brand">
    <div class="gen-nav-logo">✝</div>
    <div class="gen-nav-name">
      Kristus Raja Karawang
      <small>Keuskupan Bandung</small>
    </div>
  </a>
</nav>

<!-- Tombol Back bulat — sama persis seperti artikel lain -->
<a href="index.html#kegiatan" class="btn-back" title="Kembali ke Kegiatan Pastoral">
  <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
</a>

<div class="gen-wrap">

  <div class="gen-breadcrumb">
    <a href="index.html">Beranda</a> &rsaquo;
    <a href="index.html#kegiatan">Kegiatan Pastoral</a> &rsaquo;
    ${d.judul}
  </div>

  <div class="gen-meta-row">
    <span class="gen-kat">${d.kat}</span>
    <span class="gen-sep">·</span>
    <span class="gen-date">${d.tglFmt}</span>
  </div>

  <h1 class="gen-judul">${d.judul}</h1>

  ${fotos[0] ? `<div class="gen-hero"><img src="${fotos[0]}" alt="${d.judul}"></div>` : ''}

  ${d.desc ? `<p class="gen-ringkasan">${d.desc}</p>` : ''}

  ${fotoGridHTML}

  <div class="gen-divider"></div>

  <div class="gen-tags">
    <span class="gen-tag">${d.kat}</span>
    <span class="gen-tag">Kegiatan Pastoral</span>
    <span class="gen-tag">Kristus Raja Karawang</span>
  </div>

</div>

<footer>© 2025 Gereja Katolik Kristus Raja Karawang – Keuskupan Bandung</footer>

</body>
</html>`;
}

/* Store generated page HTML to localStorage */
function savePageToStorage(filename, html) {
  try {
    const pages = JSON.parse(localStorage.getItem('gkr_pages') || '{}');
    pages[filename] = html;
    localStorage.setItem('gkr_pages', JSON.stringify(pages));
    console.log('[GKR] Page saved:', filename, '— size:', html.length);
  } catch(e) { console.warn('[GKR] Page storage failed:', e); }
}

/* Build the URL for a generated page — uses artikel-viewer.html router */
function pageUrl(filename) {
  if (!filename) return '#';
  return 'artikel-viewer.html?page=' + encodeURIComponent(filename);
}

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
  const slug = makeSlug(judul);
  const pageFile = 'artikel-' + slug + '.html';

  const data = { id, judul, kat, penulis, tgl, tglFmt, ringkasan, isi, fotos: [...artFotos], type: 'artikel', ts: Date.now(), pageFile };

  // Generate & save HTML page
  const pageHTML = generateArtikelPage(data);
  savePageToStorage(pageFile, pageHTML);

  // Simpan ke localStorage
  const stored = JSON.parse(localStorage.getItem('gkr_konten') || '[]');
  stored.unshift(data);
  localStorage.setItem('gkr_konten', JSON.stringify(stored));

  // Tampilkan langsung ke halaman
  renderArtikelCard(data, true);
  toggleDelButtons(true);

  // Feedback
  document.getElementById('artUploadMsg').classList.remove('hidden');
  document.getElementById('artUploadMsg').innerHTML =
    '✅ Berhasil! Artikel tersimpan. &nbsp;<a class="ep-sim-quick-btn" href="' + pageUrl(pageFile) + '&mode=edit" target="_blank">✏️ Edit & Publish</a>';
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

  if (!judul) { alert('Judul kegiatan wajib diisi.'); return; }

  const tglFmt = tgl ? new Date(tgl).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}) : '';
  const id = 'pas_' + Date.now();
  const slug = makeSlug(judul);
  const pageFile = 'kegiatan-' + slug + '.html';

  const data = { id, judul, kat, tgl, tglFmt, desc, link: pageFile, fotos: [pasFotos[0], null, null, null], type: 'pastoral', ts: Date.now(), pageFile };

  // Generate & save HTML page
  const pageHTML = generatePastoralPage(data);
  savePageToStorage(pageFile, pageHTML);

  const stored = JSON.parse(localStorage.getItem('gkr_konten') || '[]');
  stored.unshift(data);
  localStorage.setItem('gkr_konten', JSON.stringify(stored));

  renderPastoralCard(data, true);
  toggleDelButtons(true);

  document.getElementById('pasUploadMsg').classList.remove('hidden');
  document.getElementById('pasUploadMsg').innerHTML = '✅ Kegiatan berhasil ditambahkan!';
  setTimeout(() => {
    document.getElementById('pasUploadMsg').classList.add('hidden');
    editorTutup('pastoral');
    document.querySelector('#kegiatan').scrollIntoView({ behavior: 'smooth' });
  }, 1800);
}

function pasNext() {
  const judul = document.getElementById('pasJudul').value.trim();
  const kat   = document.getElementById('pasKategori').value;
  const tgl   = document.getElementById('pasTanggal').value;
  const desc  = document.getElementById('pasDesc').value.trim();

  if (!judul) { alert('Judul kegiatan wajib diisi.'); return; }

  const tglFmt = tgl
    ? new Date(tgl).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})
    : new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});

  const id = 'pas_' + Date.now();
  const slug = makeSlug(judul);
  const pageFile = 'kegiatan-' + slug + '.html';

  const data = {
    id, judul, kat, tgl, tglFmt, desc, isi: desc,
    fotos: [pasFotos[0], null, null, null],
    type: 'pastoral',
    ts: Date.now(),
    pageFile
  };

  const stored = JSON.parse(localStorage.getItem('gkr_konten') || '[]');
  stored.unshift(data);
  localStorage.setItem('gkr_konten', JSON.stringify(stored));

  renderPastoralCard(data, true);
  toggleDelButtons(true);

  const pageHTML = generatePastoralArtikelPage(data);
  savePageToStorage(data.pageFile, pageHTML);

  editorTutup('pastoral');
  const editUrl = pageUrl(data.pageFile) + '&mode=edit';
  const editorWin = window.open(editUrl, '_blank');
  if (editorWin) setTimeout(() => { try { editorWin._pageFile = data.pageFile; } catch(e){} }, 600);
  document.querySelector('#kegiatan').scrollIntoView({ behavior: 'smooth' });
}

/* ─── ARTIKEL NEXT: sama persis pasNext, output ke grid artikel ── */
function artNext() {
  const judul = document.getElementById('artJudul').value.trim();
  const kat   = document.getElementById('artKategori').value;
  const tgl   = document.getElementById('artTanggal').value;
  const ring  = document.getElementById('artRingkasan').value.trim();

  if (!judul) { alert('Judul artikel wajib diisi.'); return; }

  const tglFmt = tgl
    ? new Date(tgl).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})
    : new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});

  const id = 'art_' + Date.now();
  const slug = makeSlug(judul);
  const pageFile = 'artikel-' + slug + '.html';

  const data = {
    id, judul, kat, tgl, tglFmt,
    ringkasan: ring, desc: ring, isi: ring,
    penulis: 'Komsos GKR',
    fotos: [artFotos[0], null, null, null],
    type: 'artikel',
    ts: Date.now(),
    pageFile
  };

  const stored = JSON.parse(localStorage.getItem('gkr_konten') || '[]');
  stored.unshift(data);
  localStorage.setItem('gkr_konten', JSON.stringify(stored));

  renderArtikelCard(data, true);
  toggleDelButtons(true);

  const pageHTML = generatePastoralArtikelPage(data);
  savePageToStorage(data.pageFile, pageHTML);

  editorTutup('artikel');
  const editUrl = pageUrl(data.pageFile) + '&mode=edit';
  const editorWin = window.open(editUrl, '_blank');
  if (editorWin) setTimeout(() => { try { editorWin._pageFile = data.pageFile; } catch(e){} }, 600);
  document.querySelector('#artikel').scrollIntoView({ behavior: 'smooth' });
}

/* ─── GENERATE HALAMAN ARTIKEL KEGIATAN (EDITABLE) ──── */
function generatePastoralArtikelPage(d) {
  const fotos = (d.fotos || []).filter(Boolean);
  const foto1 = fotos[0] || '';

  // Build paragraf blocks — tiap paragraf punya tombol sisip foto di bawahnya
  const paraBlocks = (d.isi || d.desc || 'Tulis isi artikel di sini...')
    .split(/\n\n+/)
    .map((p, i) => `<div class="para-block" data-para="${i}">
      <p contenteditable="true" class="editable-p">${p.replace(/\n/g,'<br>')}</p>
      <div class="para-insert-row">
        <button class="para-ins-foto-btn" onclick="insertFotoSetelahPara(this)" title="Sisipkan foto di sini">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          + Foto di sini
        </button>
        <button class="para-del-btn" onclick="hapusPara(this)" title="Hapus paragraf ini">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${d.judul}</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Poppins',Arial,sans-serif;background:#f0f2f5}

    /* ── TOPBAR ── */
    .gen-topbar{background:#7a4b00;color:rgba(255,255,255,.9);text-align:center;padding:8px 12px;font-size:12px;font-family:'Poppins',sans-serif;}

    /* ── NAVBAR ── */
    .gen-navbar{background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.08);padding:0 24px;height:60px;display:flex;align-items:center;position:sticky;top:0;z-index:100;}
    .gen-nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none;}
    .gen-nav-logo{width:38px;height:38px;border-radius:50%;background:#5a2100;display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;font-weight:700;}
    .gen-nav-name{font-family:'DM Serif Display',serif;font-size:16px;color:#2a1000;line-height:1.2;}
    .gen-nav-name small{display:block;font-family:'Poppins',sans-serif;font-size:10px;color:#999;font-weight:400;}

    /* ── BACK BUTTON ── */
    .btn-back{position:fixed;top:80px;left:16px;width:44px;height:44px;border-radius:50%;background:rgba(0,0,0,.55);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:9999;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:.2s;text-decoration:none;}
    .btn-back:hover{background:rgba(0,0,0,.78);transform:scale(1.07)}
    .btn-back svg{width:22px;height:22px;stroke:#fff;stroke-width:2.5;fill:none;stroke-linecap:round;stroke-linejoin:round;pointer-events:none;}

    /* ── EDITOR TOOLBAR (fixed top, above topbar) ── */
    .editor-bar{
      position:fixed;top:0;left:0;right:0;z-index:9999;
      background:#1e1e2e;
      display:flex;align-items:center;gap:10px;
      padding:10px 20px;
      box-shadow:0 2px 12px rgba(0,0,0,.35);
    }
    .editor-bar-label{font-size:12px;font-weight:700;letter-spacing:1px;color:#aaa;text-transform:uppercase;margin-right:6px;}
    .editor-bar-mode{font-size:13px;color:#7dd3fc;font-weight:600;background:#0f172a;padding:4px 12px;border-radius:20px;}
    .bar-spacer{flex:1}
    .bar-btn{display:flex;align-items:center;gap:6px;padding:8px 18px;border-radius:8px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:.15s;font-family:'Poppins',sans-serif;}
    .bar-btn.upload{background:linear-gradient(135deg,#552604,#d4853c);color:#fff;box-shadow:0 3px 12px rgba(160,82,26,.4);}
    .bar-btn.upload:hover{opacity:.88}
    .bar-btn.upload:active{transform:scale(.97)}
    .bar-btn svg{stroke:currentColor;fill:none;stroke-width:2.5}

    /* ── CONTAINER ── */
    .gen-wrap{
      max-width:780px;margin:0 auto;padding:40px 24px 80px;
    }

    /* ── EDIT HINTS ── */
    [contenteditable="true"]{outline:none;cursor:text}
    [contenteditable="true"]:hover{background:#fffbf0;border-radius:4px}
    [contenteditable="true"]:focus{background:#fffdf5;box-shadow:0 0 0 2px #f59e0b44;border-radius:4px;outline:none;}
    .editable-hint{position:fixed;bottom:18px;right:18px;background:#1e1e2e;color:#7dd3fc;font-size:12px;padding:8px 14px;border-radius:8px;opacity:.85;pointer-events:none;z-index:9998;}

    /* ── BREADCRUMB ── */
    .gen-breadcrumb{font-size:12px;color:#aaa;margin-bottom:28px;font-family:'Poppins',sans-serif;}
    .gen-breadcrumb a{color:#c8791e;text-decoration:none;}

    /* ── META ── */
    .gen-meta-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:16px;}
    .gen-kat{background:#fff3e8;color:#c8791e;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:5px 14px;border-radius:30px;font-family:'Poppins',sans-serif;}
    .gen-author,.gen-date{font-size:13px;color:#999;font-family:'Poppins',sans-serif;}

    /* ── JUDUL ── */
    .gen-judul{font-family:'DM Serif Display',serif;font-size:clamp(26px,4vw,38px);color:#1a0a00;line-height:1.22;margin-bottom:20px;min-height:1em;}

    /* ── FOTO UTAMA ── */
    .gen-hero{width:100%;border-radius:18px;overflow:hidden;margin-bottom:32px;max-height:480px;position:relative;}
    .gen-hero img{width:100%;height:100%;object-fit:cover;display:block;}
    .foto-change-btn{position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,.6);color:#fff;border:none;padding:7px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;font-family:'Poppins',sans-serif;}
    .foto-change-btn:hover{background:rgba(0,0,0,.8)}
    .foto-utama-empty{width:100%;height:220px;background:#f5f5f5;border:2px dashed #ccc;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:15px;color:#999;cursor:pointer;margin-bottom:32px;}
    .foto-utama-empty:hover{background:#eee}

    /* ── RINGKASAN / BLOCKQUOTE ── */
    .gen-ringkasan{font-family:'Poppins',sans-serif;font-size:17px;color:#5a3a1a;line-height:1.75;margin-bottom:28px;padding-bottom:28px;border-bottom:2px solid #e8ddd0;font-weight:500;}
    blockquote{border-left:4px solid #662d17;padding:10px 16px;font-style:italic;color:#555;margin:24px 0;background:#fdf8f5;border-radius:0 6px 6px 0;}

    /* ── ISI ARTIKEL (paragraf blok) ── */
    .gen-isi{font-family:'Poppins',sans-serif;font-size:15px;color:#333;line-height:1.9;}
    .para-block{position:relative;}
    .gen-isi p,.para-block p{font-size:15px;line-height:1.9;color:#222;margin-bottom:16px;font-family:'Poppins',sans-serif;}

    /* ── TOMBOL INSERT FOTO ANTAR PARAGRAF ── */
    .para-insert-row{
      display:flex;align-items:center;gap:8px;
      margin:4px 0 12px;opacity:0;
      transition:opacity .2s;
    }
    .para-block:hover .para-insert-row{opacity:1}
    .para-ins-foto-btn{
      display:flex;align-items:center;gap:5px;
      background:#fff3e8;color:#c8791e;border:1.5px dashed #f0a060;
      padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;
      cursor:pointer;font-family:'Poppins',sans-serif;transition:.15s;
    }
    .para-ins-foto-btn:hover{background:#ffe8cc;border-color:#c8791e}
    .para-del-btn{
      background:#fff0f0;color:#c0392b;border:1.5px solid #fca5a5;
      padding:5px 10px;border-radius:20px;font-size:12px;cursor:pointer;
      display:flex;align-items:center;gap:4px;font-family:'Poppins',sans-serif;transition:.15s;
    }
    .para-del-btn:hover{background:#fee2e2}

    /* ── FOTO INLINE (disisipkan di antara paragraf) ── */
    .inline-foto-block{
      margin:20px 0;border-radius:14px;overflow:hidden;position:relative;
      box-shadow:0 2px 12px rgba(0,0,0,.08);
    }
    .inline-foto-block img{width:100%;max-height:420px;object-fit:cover;display:block;}
    .inline-foto-caption{
      font-size:13px;color:#888;font-style:italic;text-align:center;
      padding:8px 12px;background:#fafaf8;
      font-family:'Poppins',sans-serif;
    }
    .inline-foto-caption[contenteditable]:empty:before{content:'Keterangan foto (opsional)...';color:#ccc;}
    .inline-foto-actions{
      position:absolute;top:8px;right:8px;
      display:flex;gap:6px;opacity:0;transition:.2s;
    }
    .inline-foto-block:hover .inline-foto-actions{opacity:1}
    .inline-foto-act-btn{
      background:rgba(0,0,0,.6);color:#fff;border:none;
      padding:5px 10px;border-radius:6px;font-size:12px;
      font-weight:600;cursor:pointer;font-family:'Poppins',sans-serif;
    }
    .inline-foto-act-btn:hover{background:rgba(0,0,0,.85)}
    .inline-foto-act-btn.del{background:rgba(180,30,30,.75)}
    .inline-foto-act-btn.del:hover{background:rgba(180,30,30,.95)}

    /* ── TAMBAH PARAGRAF / FOTO BAWAH ── */
    .add-para-btn{width:100%;margin:8px 0;padding:10px;border:2px dashed #e0e0e0;border-radius:6px;background:none;color:#bbb;font-size:13px;cursor:pointer;transition:.15s;font-family:'Poppins',sans-serif;}
    .add-para-btn:hover{border-color:#aaa;color:#888;background:#fafafa}

    /* ── SECTION LABEL ── */
    .section-editor-label{font-size:11px;font-weight:700;letter-spacing:1px;color:#aaa;text-transform:uppercase;margin:24px 0 10px;display:flex;align-items:center;gap:8px;}
    .section-editor-label::after{content:'';flex:1;height:1px;background:#eee}

    /* ── DIVIDER & TAGS ── */
    .gen-divider{height:2px;background:linear-gradient(90deg,#e8ddd0,transparent);margin:32px 0;border-radius:2px;}
    .gen-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:32px;}
    .gen-tag{background:#f0ece4;color:#7a5535;font-size:12px;font-family:'Poppins',sans-serif;font-weight:500;padding:5px 14px;border-radius:30px;}

    footer{background:linear-gradient(135deg,#4a2400,#7b3f00);color:rgba(255,255,255,.75);text-align:center;padding:22px;font-family:'Poppins',sans-serif;font-size:13px;margin-top:60px;}

    /* ── MODE VIEWER: sembunyikan semua elemen editor ── */
    body.viewer-mode .editor-bar,
    body.viewer-mode .editable-hint,
    body.viewer-mode .add-para-btn,
    body.viewer-mode .section-editor-label,
    body.viewer-mode .foto-change-btn,
    body.viewer-mode .inline-foto-actions,
    body.viewer-mode .para-insert-row{display:none!important}
    body.viewer-mode [contenteditable]{cursor:default!important;background:none!important;box-shadow:none!important;outline:none!important;}

    @media(max-width:600px){
      .gen-wrap{padding:28px 16px 60px;}
      .gen-judul{font-size:22px}
      .gen-isi p,.para-block p{font-size:14px}
      .editor-bar{padding:8px 12px;gap:6px;}
      .bar-btn.upload{padding:7px 12px;font-size:12px;}
      .btn-back{width:40px;height:40px;top:74px;left:12px;}
      .btn-back svg{width:20px;height:20px;}
    }
  </style>
</head>
<body>

<!-- EDITOR BAR -->
<div class="editor-bar">
  <span class="editor-bar-label">Mode</span>
  <span class="editor-bar-mode">✏️ Edit Artikel</span>
  <div class="bar-spacer"></div>
  <button class="bar-btn upload" onclick="doUpload()">
    <svg viewBox="0 0 24 24" width="15" height="15"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
    Upload & Tampilkan
  </button>
</div>

<!-- TOPBAR -->
<div class="gen-topbar">Gereja Katolik Kristus Raja Karawang – Keuskupan Bandung</div>

<!-- NAVBAR -->
<nav class="gen-navbar">
  <a href="index.html" class="gen-nav-brand">
    <div class="gen-nav-logo">✝</div>
    <div class="gen-nav-name">Kristus Raja Karawang<small>Keuskupan Bandung</small></div>
  </a>
</nav>

<!-- Tombol Back -->
<a href="index.html#kegiatan" class="btn-back" title="Kembali">
  <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
</a>

<div class="gen-wrap" id="artikelContainer">

  <!-- Breadcrumb -->
  <div class="gen-breadcrumb">
    <a href="index.html">Beranda</a> &rsaquo;
    <a href="index.html#kegiatan">Kegiatan Pastoral</a> &rsaquo;
    ${d.judul}
  </div>

  <!-- Meta -->
  <div class="gen-meta-row">
    <span class="gen-kat">${d.kat}</span>
    <span class="gen-author">·</span>
    <span class="gen-date" contenteditable="true" id="editMeta">${d.tglFmt}</span>
    <span class="gen-author">· Paroki Kristus Raja Karawang</span>
  </div>

  <!-- Judul -->
  <h1 class="gen-judul" contenteditable="true" id="editJudul">${d.judul}</h1>

  <!-- FOTO UTAMA -->
  <div class="section-editor-label">Foto Utama</div>
  <div id="fotoUtamaWrap">
    ${foto1
      ? `<div class="gen-hero">
           <img src="${foto1}" alt="" id="fotoUtamaImg">
           <button class="foto-change-btn" onclick="document.getElementById('inputFoto0').click()">🔄 Ganti Foto</button>
         </div>`
      : `<div class="foto-utama-empty" onclick="document.getElementById('inputFoto0').click()">+ Tambah Foto Utama</div>`
    }
    <input type="file" id="inputFoto0" accept="image/*" style="display:none" onchange="handleFotoUtama(this)">
  </div>

  <!-- KUTIPAN / DESKRIPSI -->
  ${d.desc
    ? `<p class="gen-ringkasan" contenteditable="true" id="editDesc">${d.desc}</p>`
    : `<p class="gen-ringkasan" contenteditable="true" id="editDesc" style="color:#bbb;font-style:italic">Tambahkan ringkasan atau deskripsi singkat...</p>`
  }

  <!-- ISI ARTIKEL -->
  <div class="section-editor-label">Isi Artikel &nbsp;<small style="font-weight:400;letter-spacing:0;font-size:10px;color:#ccc">Arahkan kursor ke paragraf → klik "+ Foto di sini" untuk sisipkan foto</small></div>
  <div class="gen-isi" id="isiArtikel">
    ${paraBlocks}
  </div>
  <div style="display:flex;gap:8px;margin-top:4px;">
    <button class="add-para-btn" style="flex:1" onclick="tambahParagraf()">+ Tambah Paragraf</button>
    <button class="add-para-btn" style="flex:0 0 auto;width:auto;padding:10px 16px" onclick="tambahFotoAkhir()" title="Tambah foto di akhir">🖼 + Foto</button>
  </div>

</div>

<!-- TAGS & FOOTER -->
<div class="gen-wrap" style="padding-top:0" id="tagsWrap">
  <div class="gen-divider"></div>
  <div class="gen-tags">
    <span class="gen-tag">${d.kat}</span>
    <span class="gen-tag">Paroki Kristus Raja</span>
    <span class="gen-tag">Karawang</span>
  </div>
</div>

<footer>© 2025 Gereja Katolik Kristus Raja Karawang – Keuskupan Bandung</footer>

<div class="editable-hint">✏️ Klik teks untuk edit · Arahkan paragraf untuk sisip foto</div>

<script>
  // ── CEK MODE: jika bukan dari editor, masuk viewer-mode (sembunyikan toolbar) ──
  (function() {
    // Halaman ini hanya boleh tampil editor-bar jika dibuka dari pasNext() via window.open
    // yang menyuntikkan window._pageFile. Kalau tidak ada, berarti akses publik.
    function checkEditorMode() {
      if (!window._pageFile) {
        document.body.classList.add('viewer-mode');
      }
    }
    // Cek setelah DOM ready (agar _pageFile sudah di-set oleh opener)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkEditorMode);
    } else {
      // Tunggu sebentar untuk beri kesempatan opener set _pageFile
      setTimeout(checkEditorMode, 300);
    }
  })();

  // ── FOTO UTAMA ──
  function handleFotoUtama(input) {
    if (!input.files[0]) return;
    const reader = new FileReader();
    reader.onload = e => {
      const wrap = document.getElementById('fotoUtamaWrap');
      wrap.innerHTML = \`
        <div class="gen-hero">
          <img src="\${e.target.result}" alt="" id="fotoUtamaImg">
          <button class="foto-change-btn" onclick="document.getElementById('inputFoto0').click()">🔄 Ganti Foto</button>
        </div>
        <input type="file" id="inputFoto0" accept="image/*" style="display:none" onchange="handleFotoUtama(this)">
      \`;
    };
    reader.readAsDataURL(input.files[0]);
  }

  // ── SISIPKAN FOTO SETELAH PARAGRAF ──
  function insertFotoSetelahPara(btn) {
    const paraBlock = btn.closest('.para-block');
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.onchange = function() {
      if (!this.files[0]) return;
      const reader = new FileReader();
      reader.onload = e => {
        const fotoBlock = document.createElement('div');
        fotoBlock.className = 'inline-foto-block';
        fotoBlock.innerHTML = \`
          <img src="\${e.target.result}" alt="">
          <div class="inline-foto-caption" contenteditable="true"></div>
          <div class="inline-foto-actions">
            <label class="inline-foto-act-btn">
              🔄 Ganti
              <input type="file" accept="image/*" style="display:none" onchange="gantiInlineFoto(this)">
            </label>
            <button class="inline-foto-act-btn del" onclick="this.closest('.inline-foto-block').remove()">🗑 Hapus</button>
          </div>
        \`;
        paraBlock.after(fotoBlock);
      };
      reader.readAsDataURL(this.files[0]);
    };
    input.click();
  }

  // ── GANTI FOTO INLINE ──
  function gantiInlineFoto(input) {
    if (!input.files[0]) return;
    const reader = new FileReader();
    reader.onload = e => {
      input.closest('.inline-foto-block').querySelector('img').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }

  // ── TAMBAH FOTO DI AKHIR ──
  function tambahFotoAkhir() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.onchange = function() {
      if (!this.files[0]) return;
      const reader = new FileReader();
      reader.onload = e => {
        const isi = document.getElementById('isiArtikel');
        const fotoBlock = document.createElement('div');
        fotoBlock.className = 'inline-foto-block';
        fotoBlock.innerHTML = \`
          <img src="\${e.target.result}" alt="">
          <div class="inline-foto-caption" contenteditable="true"></div>
          <div class="inline-foto-actions">
            <label class="inline-foto-act-btn">
              🔄 Ganti
              <input type="file" accept="image/*" style="display:none" onchange="gantiInlineFoto(this)">
            </label>
            <button class="inline-foto-act-btn del" onclick="this.closest('.inline-foto-block').remove()">🗑 Hapus</button>
          </div>
        \`;
        isi.appendChild(fotoBlock);
      };
      reader.readAsDataURL(this.files[0]);
    };
    input.click();
  }

  // ── TAMBAH PARAGRAF ──
  function tambahParagraf() {
    const isi = document.getElementById('isiArtikel');
    const block = document.createElement('div');
    block.className = 'para-block';
    const uid = Date.now();
    block.innerHTML = \`
      <p contenteditable="true" class="editable-p"></p>
      <div class="para-insert-row">
        <button class="para-ins-foto-btn" onclick="insertFotoSetelahPara(this)" title="Sisipkan foto di sini">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          + Foto di sini
        </button>
        <button class="para-del-btn" onclick="hapusPara(this)">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    \`;
    isi.appendChild(block);
    block.querySelector('p').focus();
  }

  // ── HAPUS PARAGRAF ──
  function hapusPara(btn) {
    const block = btn.closest('.para-block');
    if (document.querySelectorAll('.para-block').length <= 1) { alert('Minimal satu paragraf harus ada.'); return; }
    if (confirm('Hapus paragraf ini?')) block.remove();
  }

  // ── UPLOAD & SIMPAN ──
  function doUpload() {
    const btn = document.querySelector('.bar-btn.upload');
    btn.disabled = true;
    btn.innerHTML = '⏳ Menyimpan...';

    // Clone seluruh body content untuk versi publik
    const bodyClone = document.body.cloneNode(true);

    // Hapus semua elemen editor-only
    bodyClone.querySelectorAll('.editor-bar,.editable-hint,.add-para-btn,.section-editor-label,.para-insert-row,.foto-change-btn,.inline-foto-actions,.para-del-btn').forEach(el => el.remove());
    bodyClone.querySelectorAll('input[type=file]').forEach(el => el.remove());

    // Strip contenteditable
    bodyClone.querySelectorAll('[contenteditable]').forEach(el => {
      el.removeAttribute('contenteditable');
      // Hapus placeholder warna bbb
      if (el.style.color === 'rgb(187, 187, 187)' || el.getAttribute('style') === 'color:#bbb;font-style:italic') el.removeAttribute('style');
    });

    const css = document.querySelector('style') ? document.querySelector('style').textContent : '';
    const cleanHTML = \`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>\${document.title}</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
<style>\${css}</style>
</head>
<body class="viewer-mode">\${bodyClone.innerHTML}</body>
</html>\`;

    // Simpan ke gkr_pages via opener atau localStorage langsung
    const pf = window._pageFile;
    let saved = false;
    if (pf) {
      // Coba via opener dulu
      if (window.opener && !window.opener.closed) {
        try { window.opener.savePageToStorage(pf, cleanHTML); saved = true; } catch(e){}
      }
      // Juga simpan langsung ke localStorage window ini (fallback)
      if (!saved) {
        try {
          const pages = JSON.parse(localStorage.getItem('gkr_pages') || '{}');
          pages[pf] = cleanHTML;
          localStorage.setItem('gkr_pages', JSON.stringify(pages));
          saved = true;
        } catch(e){}
      }
    }

    btn.disabled = false;
    btn.innerHTML = saved
      ? \`✅ Tersimpan! &nbsp;<a href="artikel-viewer.html?page=\${encodeURIComponent(pf)}" target="_blank" style="color:#fff;text-decoration:underline;font-size:12px;">Buka →</a>\`
      : '✅ Tersimpan!';
    btn.style.background = '#166534';
    setTimeout(() => {
      btn.innerHTML = \`<svg viewBox="0 0 24 24" width="15" height="15" style="stroke:#fff;fill:none;stroke-width:2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Upload & Tampilkan\`;
      btn.style.background = '';
    }, 4000);
  }
<\/script>
</body>
</html>`;
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
  a.href = pageUrl(d.pageFile);
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
  wrap.appendChild(a);

  // Tombol Edit — hanya muncul saat editor aktif
  const editBtn = document.createElement('a');
  editBtn.href = pageUrl(d.pageFile) + '&mode=edit';
  editBtn.target = '_blank';
  editBtn.className = 'ep-edit-btn' + (editorOn ? '' : ' ep-del-hidden');
  editBtn.innerHTML = '✏️ Edit';
  editBtn.addEventListener('click', e => e.stopPropagation());
  wrap.appendChild(editBtn);

  // Tombol hapus — hanya muncul saat editor aktif
  const delBtn = document.createElement('button');
  delBtn.className = 'ep-del-btn' + (editorOn ? '' : ' ep-del-hidden');
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
  a.href = pageUrl(d.pageFile) || d.link || '#kegiatan';
  a.className = 'pastoral-card';
  a.innerHTML = `
    <div class="pastoral-card-img">
      ${foto ? `<img src="${foto}" alt="${d.judul}">` : '<div style="height:190px;background:linear-gradient(135deg,#f0e8d8,#e8d4b8);display:flex;align-items:center;justify-content:center;font-size:40px;">🕊️</div>'}
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

  const editBtn = document.createElement('a');
  editBtn.href = pageUrl(d.pageFile) + '&mode=edit';
  editBtn.target = '_blank';
  editBtn.className = 'ep-edit-btn' + (editorOn ? '' : ' ep-del-hidden');
  editBtn.innerHTML = '✏️ Edit';
  editBtn.addEventListener('click', e => e.stopPropagation());
  wrap.appendChild(editBtn);

  const delBtn = document.createElement('button');
  delBtn.className = 'ep-del-btn' + (editorOn ? '' : ' ep-del-hidden');
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

/* ─── TAMPILKAN / SEMBUNYIKAN TOMBOL HAPUS & EDIT ── */
function toggleDelButtons(show) {
  document.querySelectorAll('.ep-del-btn, .ep-edit-btn').forEach(btn => {
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

/* =========================================
   BACAAN LITURGI HARIAN — via Claude AI
   Mengambil bacaan liturgi Katolik Indonesia
   berdasarkan tanggal hari ini
========================================= */
(function() {
  const BULAN_ID = ['Januari','Februari','Maret','April','Mei','Juni',
                    'Juli','Agustus','September','Oktober','November','Desember'];
  const HARI_ID  = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];

  async function loadBacaanLiturgi() {
    const today = new Date();
    const hari  = HARI_ID[today.getDay()];
    const tgl   = today.getDate();
    const bln   = BULAN_ID[today.getMonth()];
    const thn   = today.getFullYear();

    const listEl = document.getElementById('liturgiBacaanList');
    const linkEl = document.getElementById('liturgiEkatolikLink');
    if (!listEl) return;

    // Build URL imankatolik.or.id
    const blnSingkat = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][today.getMonth()];
    const imanUrl = `https://www.imankatolik.or.id/kalender/${tgl}${blnSingkat}.html`;
    if (linkEl) linkEl.href = imanUrl;

    // Cek cache dulu (localStorage, key per tanggal)
    const cacheKey = `gkr_bacaan_${thn}_${today.getMonth()}_${tgl}`;
    const cached = (() => { try { return JSON.parse(localStorage.getItem(cacheKey)); } catch(e) { return null; } })();
    if (cached) { renderBacaan(listEl, cached); return; }

    // --- COBA FETCH DARI IMANKATOLIK VIA CORS PROXY ---
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(imanUrl)}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error('proxy error');
      const json = await res.json();
      const html = json.contents || '';

      // Parse HTML string untuk ambil data bacaan
      const parsed = parseImanKatolikHtml(html, hari, tgl, bln, thn);
      if (parsed) {
        try { localStorage.setItem(cacheKey, JSON.stringify(parsed)); } catch(e) {}
        renderBacaan(listEl, parsed);
        return;
      }
      throw new Error('parse failed');

    } catch(proxyErr) {
      // --- FALLBACK: Claude AI ---
      try {
        // Hitung tahun liturgi untuk prompt yang lebih akurat
        function getPaskahQ(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451);return new Date(y,Math.floor((h+l-7*m+114)/31)-1,((h+l-7*m+114)%31)+1);}
        function getAdven1Q(y){const n=new Date(y,10,30);return new Date(n.getFullYear(),n.getMonth(),n.getDate()-n.getDay());}
        const thnNow = today.getFullYear();
        const adven1Q = getAdven1Q(thnNow);
        const liturgiCycleYear = today >= adven1Q ? thnNow+1 : thnNow;
        const cycleChar = ['A','B','C'][((liturgiCycleYear-1)%3+3)%3];

        const prompt = `Kamu adalah pakar liturgi Gereja Katolik Ritus Roma. Berikan daftar bacaan Misa Katolik untuk:
Tanggal: ${hari}, ${tgl} ${bln} ${thn}
Tahun Liturgi: ${cycleChar}
Berdasarkan Leksionarium Katolik edisi Bahasa Indonesia (Lectionary, Ordo Lectionum Missae).

Balas HANYA JSON ini (tanpa backtick, tanpa teks lain):
{"pekan":"nama lengkap hari liturgi ini","bacaan":[{"label":"Bacaan I","ref":"kitab bab:ayat"},{"label":"Mazmur Tanggapan","ref":"Mzm bab:ayat"},{"label":"Injil","ref":"kitab bab:ayat"}],"warna":"warna liturgi"}

Jika Minggu tambahkan Bacaan II sebelum Injil. Warna: Hijau/Ungu/Putih/Merah/Merah Muda. JSON saja.`;

        const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 500,
            messages: [{ role: 'user', content: prompt }]
          })
        });
        if (!aiRes.ok) throw new Error('AI error');
        const aiData = await aiRes.json();
        const rawText = (aiData.content || []).map(b => b.text || '').join('').trim();
        const clean = rawText.replace(/```json|```/g, '').trim();
        const aiParsed = JSON.parse(clean);
        try { localStorage.setItem(cacheKey, JSON.stringify(aiParsed)); } catch(e) {}
        renderBacaan(listEl, aiParsed);

      } catch(aiErr) {
        listEl.innerHTML = `<div class="liturgi-bacaan-fallback">
          Tidak dapat memuat bacaan. Klik tombol di bawah.
        </div>`;
      }
    }
  }

  // --- PARSER HTML IMANKATOLIK ---
  function parseImanKatolikHtml(html, hari, tgl, bln, thn) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const bodyText = doc.body ? doc.body.innerText || doc.body.textContent : '';

      // Cari nama pekan/hari
      const pekanMatch = bodyText.match(/(Hari\s+(?:Biasa|Raya|Pesta|Peringatan)[^\n\r]{0,80})/i) ||
                         bodyText.match(/(Minggu\s+[^\n\r]{0,60})/i) ||
                         bodyText.match(/(Prapaskah[^\n\r]{0,60})/i);
      const pekan = pekanMatch ? pekanMatch[1].trim().slice(0,80) : `${hari}, ${tgl} ${bln} ${thn}`;

      // Cari warna liturgi
      const warnaMatch = bodyText.match(/Warna\s*[Ll]iturgi[:\s]*([A-Za-z\s]+)/i) ||
                         bodyText.match(/warna\s*:\s*([A-Za-z]+)/i);
      let warna = 'Hijau';
      if (warnaMatch) {
        const w = warnaMatch[1].trim().toLowerCase();
        if (w.includes('ungu') || w.includes('violet'))  warna = 'Ungu';
        else if (w.includes('merah muda') || w.includes('pink') || w.includes('rose')) warna = 'Merah Muda';
        else if (w.includes('merah') || w.includes('red'))  warna = 'Merah';
        else if (w.includes('putih') || w.includes('white')) warna = 'Putih';
        else if (w.includes('hijau') || w.includes('green')) warna = 'Hijau';
      }

      // Cari referensi bacaan — pola umum kitab + pasal:ayat
      const refRegex = /\b((?:[1-3]\s*)?[A-ZÄÖÜ][a-zA-ZäöüÄÖÜ]+\.?\s*\d+:\d+[\d\-,;.]*)/g;
      const allRefs = [...bodyText.matchAll(refRegex)].map(m => m[1].trim()).filter(r => r.length > 3);
      const uniqueRefs = [...new Set(allRefs)].slice(0, 5);

      // Bentuk label-label bacaan
      const bacaan = [];
      const labelPairs = [
        ['Bacaan I', 0], ['Mazmur', 1], ['Bacaan II', 2], ['Injil', -1]
      ];

      if (uniqueRefs.length >= 2) {
        bacaan.push({ label: 'Bacaan I', ref: uniqueRefs[0] });
        if (uniqueRefs.length >= 3) {
          bacaan.push({ label: 'Mazmur', ref: uniqueRefs[1] });
          if (uniqueRefs.length >= 4 && hari === 'Minggu') {
            bacaan.push({ label: 'Bacaan II', ref: uniqueRefs[2] });
            bacaan.push({ label: 'Injil', ref: uniqueRefs[uniqueRefs.length - 1] });
          } else {
            bacaan.push({ label: 'Injil', ref: uniqueRefs[uniqueRefs.length - 1] });
          }
        } else {
          bacaan.push({ label: 'Injil', ref: uniqueRefs[1] });
        }
      }

      // Juga coba cari langsung pola "Bacaan I/Injil"
      const bacaanIMatch = bodyText.match(/Bacaan\s+I[:\s]+([^\n\r]{4,50})/i);
      const injilMatch   = bodyText.match(/Injil[:\s]+([^\n\r]{4,50})/i);
      const mazmurMatch  = bodyText.match(/Mzm\.?\s*\d+[:\d\-,;.]+/i);

      if (bacaanIMatch || injilMatch) {
        const result = [];
        if (bacaanIMatch) result.push({ label: 'Bacaan I', ref: bacaanIMatch[1].trim().slice(0,50) });
        if (mazmurMatch) result.push({ label: 'Mazmur', ref: mazmurMatch[0].trim().slice(0,40) });
        if (injilMatch)  result.push({ label: 'Injil', ref: injilMatch[1].trim().slice(0,50) });
        if (result.length >= 2) return { pekan, bacaan: result, warna };
      }

      if (bacaan.length >= 2) return { pekan, bacaan, warna };
      return null;
    } catch(e) {
      return null;
    }
  }

  function renderBacaan(listEl, data) {
    const warnaMap = {
      'Hijau':'#2d7a3a', 'Ungu':'#6a0dad', 'Putih':'#888',
      'Merah':'#c0392b', 'Merah Muda':'#e91e8c'
    };
    const warnaHex = warnaMap[data.warna] || '#888';
    const bacaanHtml = (data.bacaan || []).map(b =>
      `<div class="liturgi-bacaan-item">
        <span class="liturgi-bacaan-lbl">${b.label}</span>
        <span class="liturgi-bacaan-ref">${b.ref}</span>
      </div>`
    ).join('');

    listEl.innerHTML = `
      <div class="liturgi-bacaan-pekan" style="border-left-color:${warnaHex}">
        <span class="liturgi-bacaan-warna-dot" style="background:${warnaHex}"></span>
        ${data.pekan || ''}
      </div>
      ${bacaanHtml}
    `;
  }

  // Jalankan setelah DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBacaanLiturgi);
  } else {
    loadBacaanLiturgi();
  }
})();
m