document.addEventListener("DOMContentLoaded", () => {
  const ageGate = document.getElementById("age-gate");
  const siteShell = document.getElementById("site-shell");
  const enterSite = document.getElementById("enter-site");
  const currentYear = document.getElementById("current-year");
  const mainContent = document.querySelector("main");

  currentYear.textContent = new Date().getFullYear();

  enterSite.addEventListener("click", () => {
    ageGate.hidden = true;
    siteShell.hidden = false;

    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  });
});
