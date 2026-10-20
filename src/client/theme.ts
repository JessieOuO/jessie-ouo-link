// Compiled by Bun into a tiny, CSP-hashed head script. React stays build-time only.
type Theme = "light" | "dark";
const storageKey = "jessie-theme";
const root = document.documentElement;
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let toggle: HTMLButtonElement | null = null;

function readPreference(): Theme | null {
  try {
    const value = localStorage.getItem(storageKey);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

let preference = readPreference();

function applyTheme() {
  const theme = preference ?? (systemTheme.matches ? "dark" : "light");
  root.dataset.theme = theme;
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    meta.content = theme === "dark" ? "#202938" : "#fcfaf5";
  }
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
    toggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  }
}

// Apply a saved preference before the stylesheet and body paint.
applyTheme();

systemTheme.addEventListener("change", () => {
  if (preference === null) applyTheme();
});

window.addEventListener("storage", (event) => {
  if (event.key !== storageKey && event.key !== null) return;
  preference = readPreference();
  applyTheme();
});

document.addEventListener("DOMContentLoaded", () => {
  toggle = document.querySelector<HTMLButtonElement>("#theme-toggle");
  if (!toggle) return;
  applyTheme();
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    preference = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme();
    try {
      localStorage.setItem(storageKey, preference);
    } catch {
      // The current page still switches when browser storage is unavailable.
    }
  });
});

export {};
