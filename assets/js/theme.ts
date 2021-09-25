const toggleSelectors = {
  toggleButton: document.querySelector(".theme"),
  toggleSpan: document.querySelector(".theme span")
}

const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
const userLocalStorage = window.localStorage.getItem("theme");

const userPrefersDark = window.matchMedia && prefersColorScheme.matches;

const toggleTheme = (state: any, handlerEvent?:boolean) => {
  if (state) {
    document.body.className = "dark";
    toggleSelectors.toggleSpan.textContent = "Light";

    if (handlerEvent) window.localStorage.setItem("theme", "dark");
  } else {
    document.body.className = "light";
    toggleSelectors.toggleSpan.textContent = "Dark";

    if (handlerEvent) window.localStorage.setItem("theme", "light");
  }
};

if (userLocalStorage) {
  toggleTheme(userLocalStorage === "dark");
} else {
  toggleTheme(userPrefersDark);
}

if (!userLocalStorage) {
  prefersColorScheme.addEventListener("change", (event) => {
    toggleTheme(event.matches);
  });
}

toggleSelectors.toggleButton.addEventListener("click", () => {
  toggleTheme(document.body.className === "light", true);
});
