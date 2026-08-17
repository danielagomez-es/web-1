document.addEventListener("DOMContentLoaded", () => {
  const ageGate = document.getElementById("age-gate");
  const siteShell = document.getElementById("site-shell");
  const enterSite = document.getElementById("enter-site");
  const currentYear = document.getElementById("current-year");
  const contentSection = document.getElementById("inicio") || siteShell?.querySelector("main");

  currentYear.textContent = new Date().getFullYear();

  enterSite.addEventListener("click", () => {
    ageGate.hidden = true;
    siteShell.hidden = false;

    requestAnimationFrame(() => {
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
  });
});
