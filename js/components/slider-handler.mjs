export function sliderHandler(hashes, sectionsClass) {
  const sections = document.querySelectorAll(sectionsClass);

  let hashTarget = window.location.hash;

  const matchTarget = (hash) =>  {
    for (let i = 0; i < hashes.length; i++) {
      if (hashes[i].match(hash)) {
        return hashes.indexOf(hash);
      }
    }
  }

  let target = matchTarget(hashTarget);
  if (target === -1 || target === undefined) {
    return
  }

  sections.forEach((section) => section.classList.remove("--active"));
  sections[target].classList.add("--active");
}
