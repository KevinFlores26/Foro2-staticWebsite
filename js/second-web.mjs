import { loadTheme, toggleTheme } from "./components/theme-handler.mjs";
import { loadLang, toggleLang } from "./components/lang-handler.mjs";

loadTheme("theme-input");

window.addEventListener("load", () => {
  const translations = {
    en: "/lang/en.json",
    es: "/lang/es.json",
  };
  const langs = Object.entries(translations);
  const userLangs = navigator.languages;
  let preferredLang = '';
  
  for (let i = 0; i < userLangs.length; i++) {
    if (userLangs[i].startsWith('es') || userLangs[i].startsWith('en')) {
      preferredLang = userLangs[i].split('-')[0];
    }
  }

  const localeFallback = localStorage.getItem("lang") || preferredLang || langs[0];
  const translationFallback = () => {
    if (preferredLang === "en" || localStorage.getItem("lang") === "en") {
      return langs[0][1];
    } else if (preferredLang === "es" || localStorage.getItem("lang") === "es") {
      return langs[1][1];
    }
  }

  loadLang(translationFallback(), localeFallback, "lang-input");
  toggleLang(langs[0], langs[1], "lang-input");

  toggleTheme("theme-input");
});