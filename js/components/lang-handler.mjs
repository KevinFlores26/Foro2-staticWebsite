function loadTranslations(translationPath, locale, inputSwitch) {
  console.info(translationPath);
  fetch(translationPath)
    .then((response) => response.json())
    .then((data) => updateContent(data, locale, inputSwitch))
    .catch((error) => console.error("Error loading translations:", error));
}

function updateContent(translations, locale, inputSwitch) {
  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.getAttribute("data-lang");
    element.innerText = translations[key];
  });

  document.documentElement.setAttribute("lang", locale);
  localStorage.setItem("lang", locale);

  if (localStorage.getItem("lang") === "en") {
    const input = document.getElementById(inputSwitch);
    if (!input) {
      return;
    }

    console.info(input);
    input.checked = true;
  }
}

export function loadLang(translationArray, locale, inputSwitch) {
  loadTranslations(translationArray, locale, inputSwitch);
}

export function toggleLang(translationArray1, translationArray2, inputSwitch) {
  const input = document.getElementById(inputSwitch);
  if (!input) {
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
