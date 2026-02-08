import Game from "./game";
import "./style.css";

new Game();

const THEME_STORAGE_KEY = "theme-preference";
const root = document.documentElement;

const themeToggle = document.createElement("button");
themeToggle.className = "theme-toggle theme-switch";
themeToggle.type = "button";
themeToggle.setAttribute("aria-pressed", "false");
themeToggle.setAttribute("aria-label", "切换主题");

const sunIcon = document.createElement("span");
sunIcon.className = "theme-switch__icon theme-switch__icon--sun";
sunIcon.textContent = "☀️";

const moonIcon = document.createElement("span");
moonIcon.className = "theme-switch__icon theme-switch__icon--moon";
moonIcon.textContent = "🌙";

const thumb = document.createElement("span");
thumb.className = "theme-switch__thumb";

const label = document.createElement("span");
label.className = "theme-switch__label";
label.textContent = "切换暗黑/亮色主题";

themeToggle.append(sunIcon, moonIcon, thumb, label);

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
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "切换到亮色主题" : "切换到暗黑主题",
  );
};

applyTheme(getPreferredTheme());

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
});

document.body.appendChild(themeToggle);
