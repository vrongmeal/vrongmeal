const THEME_KEY = "theme";
const THEME_DARK = "theme-dark";
const THEME_LIGHT = "theme-light";
const THEME_SYSTEM = "theme-system";

const setTheme = theme => {
  // Persist the theme preference.
  localStorage.setItem(THEME_KEY, theme);

  let themeElem = document.getElementById("theme");
  if (themeElem) {
    // Set the text for link.
    let text = "";
    switch (theme) {
    case THEME_DARK:
      text = "Dark";
      break;
    case THEME_LIGHT:
      text = "Light";
      break;
    case THEME_SYSTEM:
      text = "System";
      break;
    }
    themeElem.innerText = text;
  }

  let themeClass = theme;
  if (theme === THEME_SYSTEM) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      themeClass = THEME_DARK;
    } else {
      themeClass = THEME_LIGHT;
    }
  }
  document.documentElement.className = themeClass;
};

const toggleTheme = availableThemes => {
  const [theme, ...others] = availableThemes;
  setTheme(theme);
  return [...others, theme];
};

export default () => {
  let availableThemes = [
    THEME_SYSTEM,
    THEME_LIGHT,
    THEME_DARK,
  ];

  const localStorageTheme = localStorage.getItem(THEME_KEY);
  if (localStorageTheme === THEME_DARK) {
    setTheme(THEME_DARK);
    availableThemes = [
      THEME_SYSTEM,
      THEME_LIGHT,
      THEME_DARK,
    ];
  } else if (localStorageTheme === THEME_LIGHT) {
    setTheme(THEME_LIGHT);
    availableThemes = [
      THEME_DARK,
      THEME_SYSTEM,
      THEME_LIGHT,
    ];
  } else {
    setTheme(THEME_SYSTEM);
    availableThemes = [
      THEME_LIGHT,
      THEME_DARK,
      THEME_SYSTEM,
    ];
  }

  document.getElementById("theme").addEventListener("click", e => {
    e.stopPropagation();
    availableThemes = toggleTheme(availableThemes);
  });
};
