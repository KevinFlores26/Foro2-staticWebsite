import { adaptTabIndicator } from "./tab-indicator.mjs";

function updateContent(translations, locale, inputSwitch) {
  // @param {Object} translations - Translations object
  // @param {string} locale - locale name from loadTranslations function
  // @param {string} inputSwitch - ID of the input switch from loadTranslations function
  // Update the content of the page with the translations

  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.getAttribute("data-lang");
    element.innerHTML = translations[key];
  });

  document.documentElement.setAttribute("lang", locale);
  localStorage.setItem("lang", locale);

  // Update the properties of the tab indicator, since the language has changed
  adaptTabIndicator("tab-indicator", null);

  // Keep the previous state of the switch
  if (localStorage.getItem("lang") === "en") {
    const input = document.getElementById(inputSwitch);
    if (!input) {
      return;
    }

    input.checked = true;
  }
}

export function loadTranslations(translationPath, locale, inputSwitch) {
  // @param {string} translationPath - Path to the translation JSON file
  // @param {string} locale - locale name
  // @param {string} inputSwitch - ID of the input switch
  // Request the translation JSON file and update the content through the updateContent function

  if (!translationPath || !locale) {
    console.error("Translation path or locale not provided");
    return;
  }

  fetch(translationPath)
    .then((response) => response.json())
    .then((data) => updateContent(data, locale, inputSwitch))
    .catch((error) => console.error("Error loading translations:", error));
}

export function toggleLang(translationArray1, translationArray2, inputSwitch) {
  // @param {Array} translationArray1 - Array with the first path to the translation JSON file and the locale name
  // @param {Array} translationArray2 - Array with the second path to the translation JSON file and the locale name
  // @param {string} inputSwitch - ID of the input switch
  // Adds the event listener to the input switch to toggle the language (only two languages are supported)

  const input = document.getElementById(inputSwitch);
  if (!input) {
    console.error("Input switch not found");
    return;
  }

  const toggleLangHandler = () => {
    if (input.checked) {
      loadTranslations(translationArray1[1], translationArray1[0]);
    } else {
      loadTranslations(translationArray2[1], translationArray2[0]);
    }
  };

  input.addEventListener("change", toggleLangHandler);
}
