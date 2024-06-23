import { sliderHandler } from "./components/slider-handler.mjs";
import { loadTheme, toggleTheme } from "./components/theme-handler.mjs";
import { loadTranslations, toggleLang } from "./components/lang-handler.mjs";

const themeID = "theme-input";
loadTheme(themeID);

window.addEventListener("load", () => {
  // Setting up the translations
  const translations = {
    en: "/lang/en.json",
    es: "/lang/es.json",
  };
  const langs = Object.entries(translations);
  const userLangs = navigator.languages;
  let preferredLang = "";

  for (let i = 0; i < userLangs.length; i++) {
    if (!(userLangs[i].startsWith("es")) || !(userLangs[i].startsWith("en"))) {
      break;
    }

    const lang = userLangs[i];
    if (lang && lang.length > 2) {
      preferredLang = lang.split("-")[0];
    } else if (lang) {
      preferredLang = lang;
    }
    return;
  }

  const storagedLang = localStorage.getItem("lang");
  const localeFallback = storagedLang || preferredLang || langs[0];
  const translationFallback = () => {
    if (preferredLang === "en" || storagedLang === "en") {
      return langs[0][1];
    } else if (preferredLang === "es" || storagedLang === "es") {
      return langs[1][1];
    }

    return langs[0][1];
  };

  loadTranslations(translationFallback(), localeFallback, "lang-input");
  toggleLang(langs[0], langs[1], "lang-input");

  // Add the event listener to the input switch to toggle the theme
  toggleTheme(themeID);

  // Setting up the sections slider
  const targets = ["#home", "#about", "#services"];
  const sectionClass = ".--section";
  sliderHandler(targets, sectionClass);

  window.addEventListener("hashchange", () => sliderHandler(targets, sectionClass));
});
