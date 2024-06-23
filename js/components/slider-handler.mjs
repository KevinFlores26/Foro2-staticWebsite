export function sliderHandler(hashes, sectionsClass) {
  // @param {Array} hashes - Array of hashes that correspond to the sections
  // @param {String} sectionsClass - Comun class name of the sections
  // Find the current target from URL and keeps the section and nav tab active

  const sections = document.querySelectorAll(sectionsClass);
  const hashTarget = window.location.hash;

  if (!sections || !hashTarget) {
    console.error("Invalid parameters from sliderHandler");
    return;
  }

  // Returns index of hash in array or -1 if not found
  const matchTarget = (hash) => {
    for (let i = 0; i < hashes.length; i++) {
      if (hashes[i].match(hash)) {
        return hashes.indexOf(hash);
      }
    }
  };

  // Use the found index to set the correct active section (class="--active")
  let targetIndex = matchTarget(hashTarget);
  if (targetIndex === -1 || targetIndex === undefined) {
    return;
  }

  sections.forEach((section) => section.classList.remove("--active"));
  sections[targetIndex].classList.add("--active");

  // Keep active current nav tab (class="--active")
  const currentNavTab = document.querySelector(`[href="${hashTarget}"]`);
  for (let i = 0; i < hashes.length; i++) {
    document
      .querySelector(`[href="${hashes[i]}"]`)
      .closest("li")
      .classList.remove("--active");
  }
  currentNavTab.closest("li").classList.add("--active");
}
