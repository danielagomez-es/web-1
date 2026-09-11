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

    const firstInteractiveElement = siteShell.querySelector(
      "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
    );

    if (firstInteractiveElement instanceof HTMLElement) {
      firstInteractiveElement.focus();
    } else if (siteShell instanceof HTMLElement) {
      siteShell.focus();
    }

    requestAnimationFrame(() => {
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
  });
});
