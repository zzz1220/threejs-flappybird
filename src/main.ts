import Game from "./game";
import "./style.css";

new Game();

const THEME_STORAGE_KEY = "theme-preference";
const root = document.documentElement;

const themeToggle = document.createElement("button");
themeToggle.className = "theme-toggle";
themeToggle.type = "button";

const getPreferredTheme = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme: "light" | "dark") => {
  root.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle.textContent = theme === "dark" ? "切换到亮色" : "切换到暗黑";
};

applyTheme(getPreferredTheme());

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
});

document.body.appendChild(themeToggle);
