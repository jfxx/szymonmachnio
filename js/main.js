/* ── main.js — index.html specific logic ── */
/* Theme and i18n are loaded via theme.js and i18n.js */
/* Lightbox is loaded via lightbox.js */

const page = document.getElementById("page");
const scrollHint = document.querySelector(".scroll-hint");
const hero = document.getElementById("home");

/* ── i18n ── */
initI18n();

/* ── Footer year ── */
(function () {
  var el = document.querySelector(".footer__copy");
  if (el) {
    el.textContent = "\u00A9 " + new Date().getFullYear() + " Szymon Machnio";
  }
})();

/* ── Blur animation replay ── */
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

/* ── Gallery items → populate imageSources for lightbox ── */
const galleryItems = document.querySelectorAll(".gallery__item");

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

/* ── Email obfuscation — decode href on interaction ── */
(function () {
  var el = document.getElementById('email-link');
  if (!el) return;
  var parts = ['szymonmachnio', 'foto', '@', 'gmail', '.com'];
  var revealed = false;
  function reveal() {
    if (revealed) return;
    revealed = true;
    var addr = parts[0] + parts[1] + parts[2] + parts[3] + parts[4];
    el.href = 'mailto:' + addr;
  }
  el.addEventListener('mouseenter', reveal);
  el.addEventListener('focus', reveal);
  el.addEventListener('touchstart', reveal, { passive: true });
  el.addEventListener('click', function (e) {
    reveal();
    if (el.href.indexOf('mailto:') === -1) {
      e.preventDefault();
    }
  });
})();
