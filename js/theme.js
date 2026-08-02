/* ── Theme toggle — shared across all pages ── */
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
  if (stored === "dark" || stored === "light") return stored;
  return "light";
}

function toggleTheme() {
  const isDark = document.documentElement.hasAttribute("data-theme");
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(storageKey, next);
}

applyTheme(getPreferredTheme());

document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
