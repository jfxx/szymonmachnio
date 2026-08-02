/* ── Lightbox — shared across all pages with a lightbox ── */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxWrap = document.getElementById("lightbox-wrap");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxFullscreen = document.getElementById("lightbox-fullscreen");
const lightboxCounter = document.getElementById("lightbox-counter");

let currentIndex = 0;

/* imageSources must be populated by each page before lightbox is used.
   It is declared as a global array so pages can push items into it. */
if (typeof imageSources === "undefined") {
  var imageSources = [];
}

function openLightbox(index) {
  currentIndex = index;
  updateLightboxImage();
  lightbox.classList.add("lightbox--open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("lightbox--open");
  document.body.style.overflow = "";
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
}

function updateLightboxImage() {
  const data = imageSources[currentIndex];
  if (!data) return;
  lightboxImg.src = data.src;
  lightboxImg.alt = data.alt;
  lightboxCounter.textContent = (currentIndex + 1) + " / " + imageSources.length;
  lightboxPrev.style.display = imageSources.length > 1 ? "" : "none";
  lightboxNext.style.display = imageSources.length > 1 ? "" : "none";
}

function showPrev() {
  currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
  updateLightboxImage();
}

function showNext() {
  currentIndex = (currentIndex + 1) % imageSources.length;
  updateLightboxImage();
}

/* ── Fullscreen ── */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    lightbox.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

/* ── Event Listeners ── */
lightboxClose.addEventListener("click", (e) => { e.stopPropagation(); closeLightbox(); });
lightboxPrev.addEventListener("click", (e) => { e.stopPropagation(); showPrev(); });
lightboxNext.addEventListener("click", (e) => { e.stopPropagation(); showNext(); });
lightboxFullscreen.addEventListener("click", (e) => { e.stopPropagation(); toggleFullscreen(); });

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === lightboxWrap) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("lightbox--open")) return;
  switch (e.key) {
    case "Escape": closeLightbox(); break;
    case "ArrowLeft": showPrev(); break;
    case "ArrowRight": showNext(); break;
    case "f": case "F": toggleFullscreen(); break;
  }
});

/* ── Touch swipe ── */
let touchStartX = 0, touchStartY = 0;
lightboxWrap.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
  touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

lightboxWrap.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx > 0) showPrev(); else showNext();
  }
}, { passive: true });
