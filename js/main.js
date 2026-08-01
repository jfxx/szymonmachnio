const themeToggle = document.getElementById("theme-toggle");
const page = document.getElementById("page");
const header = document.getElementById("header");
const scrollHint = document.querySelector(".scroll-hint");
const hero = document.getElementById("home");
const storageKey = "szymon-machnio-theme";

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

function getPreferredTheme() {
  const stored = localStorage.getItem(storageKey);
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function toggleTheme() {
  const isDark = document.documentElement.hasAttribute("data-theme");
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(storageKey, next);
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener("click", toggleTheme);

function replayBlurAnimation() {
  page.style.animation = "none";
  void page.offsetWidth;
  page.style.animation = "";
}

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    replayBlurAnimation();
  }
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

let ticking = false;

function updateOnScroll() {
  if (scrollHint && hero) {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const pastHero = window.scrollY > heroBottom - window.innerHeight * 0.15;
    scrollHint.classList.toggle("scroll-hint--hidden", pastHero);
  }

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  },
  { passive: true }
);

updateOnScroll();

/* ── Enhanced Lightbox ── */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxWrap = document.getElementById("lightbox-wrap");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxFullscreen = document.getElementById("lightbox-fullscreen");
const lightboxCounter = document.getElementById("lightbox-counter");
const galleryItems = document.querySelectorAll(".gallery__item");

let currentIndex = 0;
const imageSources = [];

galleryItems.forEach((item, i) => {
  const img = item.querySelector("img");
  if (!img) return;
  imageSources.push({ src: img.src, alt: img.alt });

  item.addEventListener("click", () => {
    openLightbox(i);
  });

  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(i);
    }
  });
});

function openLightbox(index) {
  currentIndex = index;
  updateLightboxImage();
  lightbox.classList.add("lightbox--open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("lightbox--open");
  document.body.style.overflow = "";
  exitFullscreenIfActive();
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

function exitFullscreenIfActive() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

/* ── Event Listeners ── */
lightboxClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  showPrev();
});

lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  showNext();
});

lightboxFullscreen.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleFullscreen();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target === lightboxWrap) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("lightbox--open")) return;

  switch (event.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowLeft":
      showPrev();
      break;
    case "ArrowRight":
      showNext();
      break;
    case "f":
    case "F":
      toggleFullscreen();
      break;
  }
});

/* ── Touch swipe for mobile ── */
let touchStartX = 0;
let touchStartY = 0;

lightboxWrap.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
  touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

lightboxWrap.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx > 0) showPrev();
    else showNext();
  }
}, { passive: true });
