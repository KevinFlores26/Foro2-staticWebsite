export function loadTheme(inputSwitch) {
  const preferredColorScheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  setTheme(localStorage.getItem("theme") || preferredColorScheme || "light");

  const input = document.getElementById(inputSwitch);
  if (!input) {
    return;
  }

  if (localStorage.getItem("theme") === "dark") {
    input.checked = true;
  }
}

export function toggleTheme(inputSwitch) {
  const input = document.getElementById(inputSwitch);
  if (!input) {
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
