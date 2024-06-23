export function loadTheme(inputSwitch) {
  // @param {string} inputSwitch - ID of the input switch
  // Request the preferred color scheme and set the theme accordingly

  const preferredColorScheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  setTheme(localStorage.getItem("theme") || preferredColorScheme || "light");

  // Keep the previous state of the switch
  const input = document.getElementById(inputSwitch);
  if (!input) {
    console.error("Input switch not found");
    return;
  }

  if (localStorage.getItem("theme") === "dark") {
    input.checked = true;
  }
}

export function toggleTheme(inputSwitch) {
  // @param {string} inputSwitch - ID of the input switch
  // Adds the event listener to the input switch to toggle the theme

  const input = document.getElementById(inputSwitch);
  if (!input) {
    console.error("Input switch not found");
    return;
  }

  const togggleThemeHandler = () => {
    if (input.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light"); 
    }
  }

  input.addEventListener("change", togggleThemeHandler);
}
