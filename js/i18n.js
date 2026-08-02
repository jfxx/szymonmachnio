/**
 * i18n.js — Internationalization (PL / EN) for Szymon Machnio Portfolio
 * 
 * Uses data-i18n attributes on HTML elements.
 * Polish is the default language.
 */

const TRANSLATIONS = {
  pl: {
    /* ── index.html navigation ── */
    "nav.works": "Prace",
    "nav.about": "O mnie",
    "nav.contact": "Kontakt",

    /* ── index.html hero ── */
    "hero.title": "SZYMON MACHNIO",

    /* ── index.html sections ── */
    "works.title": "Prace",
    "works.cta": "Wszystkie kategorie",
    "about.title": "O mnie",
    "about.text": "Fotograf specjalizujący się w portretach, fotografii dokumentalnej i wizualnym opowiadaniu historii. Każde zdjęcie to świadoma decyzja — światło, kompozycja i czas.",
    "contact.title": "Kontakt",

    /* ── categories.html ── */
    "categories.title": "Kategorie",
    "categories.subtitle": "Wybierz kategorię, aby zobaczyć pełną galerię",
    "categories.back": "Strona główna",
    "categories.return": "Powrót",

    /* ── category counts ── */
    "photos": "zdjęć",

    /* ── category.html ── */
    "category.allCategories": "Wszystkie kategorie",
    "category.mainPage": "Strona główna",
    "category.notFound": "Nie znaleziono kategorii",
    "category.notFoundDesc": "Sprawdź adres URL lub wróć do kategorii.",
    "category.backToCategories": "Kategorie",

    /* ── category names ── */
    "cat.arctic.name": "Arktyka",
    "cat.astro.name": "Astro",
    "cat.automotive.name": "Samochody",
    "cat.blue.name": "Niebiesko",
    "cat.landscapes.name": "Krajobrazy",
    "cat.portraits.name": "Portrety",
    "cat.other.name": "Inne",

    /* ── category subtitles ── */
    "cat.arctic.subtitle": "Fotografia arktycznych krajobrazów",
    "cat.astro.subtitle": "Astrofotografia — gwiazdy i nocne niebo",
    "cat.automotive.subtitle": "Fotografia motoryzacyjna",
    "cat.blue.subtitle": "Odcienie błękitu i nastroje",
    "cat.landscapes.subtitle": "Krajobrazy i natura",
    "cat.portraits.subtitle": "Fotografia portretowa",
    "cat.other.subtitle": "Inne prace",

    /* ── footer ── */
    "footer.copy": "© 2026 Szymon Machnio",

    /* ── aria ── */
    "aria.theme": "Przełącz motyw",
    "aria.lang": "Zmień język",
    "aria.instagram": "Instagram",
    "aria.nav": "Nawigacja główna",
    "aria.lightbox": "Powiększone zdjęcie",
    "aria.fullscreen": "Pełny ekran",
    "aria.close": "Zamknij",
    "aria.prev": "Poprzednie",
    "aria.next": "Następne",
  },

  en: {
    /* ── index.html navigation ── */
    "nav.works": "Works",
    "nav.about": "About me",
    "nav.contact": "Contact",

    /* ── index.html hero ── */
    "hero.title": "SZYMON MACHNIO",

    /* ── index.html sections ── */
    "works.title": "Works",
    "works.cta": "All categories",
    "about.title": "About me",
    "about.text": "A photographer specializing in portraits, documentary photography, and visual storytelling. Every shot is a conscious decision—light, composition, and timing.",
    "contact.title": "Contact",

    /* ── categories.html ── */
    "categories.title": "Categories",
    "categories.subtitle": "Select a category to view the full gallery",
    "categories.back": "Main page",
    "categories.return": "Return",

    /* ── category counts ── */
    "photos": "photos",

    /* ── category.html ── */
    "category.allCategories": "All categories",
    "category.mainPage": "Main page",
    "category.notFound": "Category not found",
    "category.notFoundDesc": "Check the URL or go back to categories.",
    "category.backToCategories": "Categories",

    /* ── category names ── */
    "cat.arctic.name": "Arctic",
    "cat.astro.name": "Astro",
    "cat.automotive.name": "Automotive",
    "cat.blue.name": "Blue",
    "cat.landscapes.name": "Landscapes",
    "cat.portraits.name": "Portraits",
    "cat.other.name": "Other",

    /* ── category subtitles ── */
    "cat.arctic.subtitle": "Photography of Arctic Landscapes",
    "cat.astro.subtitle": "Astrophotography — Stars and the Night Sky",
    "cat.automotive.subtitle": "Automotive Photography",
    "cat.blue.subtitle": "Shades of blue and moods",
    "cat.landscapes.subtitle": "Landscapes and Nature",
    "cat.portraits.subtitle": "Portrait Photography",
    "cat.other.subtitle": "Other Works",

    /* ── footer ── */
    "footer.copy": "© 2026 Szymon Machnio",

    /* ── aria ── */
    "aria.theme": "Toggle theme",
    "aria.lang": "Change language",
    "aria.instagram": "Instagram",
    "aria.nav": "Main navigation",
    "aria.lightbox": "Enlarged photo",
    "aria.fullscreen": "Full screen",
    "aria.close": "Close",
    "aria.prev": "Previous",
    "aria.next": "Next",
  }
};

/* ── Language state ── */
const LANG_STORAGE_KEY = "szymon-machnio-lang";

function getSavedLang() {
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  if (stored === "pl" || stored === "en") return stored;
  return "pl"; // Polish is default
}

function setLang(lang) {
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  document.documentElement.setAttribute("lang", lang);
  applyTranslations(lang);
  updateLangButton(lang);
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

function toggleLang() {
  const current = getSavedLang();
  const next = current === "pl" ? "en" : "pl";
  setLang(next);
}

function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.pl;

  // Translate all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // Translate all elements with data-i18n-aria attribute
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria");
    if (dict[key] !== undefined) {
      el.setAttribute("aria-label", dict[key]);
    }
  });

  // Translate all elements with data-i18n-title attribute
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (dict[key] !== undefined) {
      el.setAttribute("title", dict[key]);
    }
  });
}

function updateLangButton(lang) {
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    const label = btn.querySelector(".lang-toggle__label");
    if (label) {
      label.textContent = lang === "pl" ? "EN" : "PL";
    }
  }
}

function t(key) {
  const lang = getSavedLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.pl;
  return dict[key] || key;
}

/* ── Initialize on load ── */
function initI18n() {
  const lang = getSavedLang();
  document.documentElement.setAttribute("lang", lang);
  applyTranslations(lang);
  updateLangButton(lang);

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", toggleLang);
  }
}
