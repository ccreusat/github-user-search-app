const toggleButton = document.querySelector(".theme");
const toggleSpan = document.querySelector(".theme span");
const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
const localStorage = window.localStorage.getItem("theme");

const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const userPrefersLight =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

const toggleTheme = (state, handlerEvent) => {
  if (state) {
    document.body.className = "dark";
    toggleSpan.textContent = "Light";

    if (handlerEvent) window.localStorage.setItem("theme", "dark");
  } else {
    document.body.className = "light";
    toggleSpan.textContent = "Dark";

    if (handlerEvent) window.localStorage.setItem("theme", "light");
  }
};

if (localStorage) {
  toggleTheme(localStorage === "dark");
} else {
  toggleTheme(userPrefersDark);
}

if (!localStorage) {
  prefersColorScheme.addEventListener("change", (event) => {
    toggleTheme(event.matches);
  });
}

toggleButton.addEventListener("click", () => {
  toggleTheme(document.body.className === "light", true);

  /* if (document.body.className === "light") {
    window.localStorage.setItem("theme", "dark");
  } else {
    window.localStorage.setItem("theme", "light");
  } */
});
