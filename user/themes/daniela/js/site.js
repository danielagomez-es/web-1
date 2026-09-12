document.addEventListener("DOMContentLoaded", () => {
  const ageGate = document.getElementById("age-gate");
  const siteShell = document.getElementById("site-shell");
  const enterSite = document.getElementById("enter-site");
  const currentYear = document.getElementById("current-year");
  const contentSection = document.getElementById("inicio") || siteShell?.querySelector("main");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (!ageGate || !siteShell || !enterSite) {
    return;
  }

  enterSite.addEventListener("click", () => {
    ageGate.hidden = true;
    siteShell.hidden = false;
    const focusTarget =
      contentSection instanceof HTMLElement ? contentSection : siteShell;

    focusTarget.focus();
  });
});
