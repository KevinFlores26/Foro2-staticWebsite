export function adaptTabIndicator(tabIndicatorID, URLHash) {
  // @param {string} tabIndicatorID - ID of the tab indicator
  // @param {string} URLHash - Current target in the URL (optional)
  // Adapts the tab indicator to the current tab
  
  let hash = URLHash || window.location.hash;
  if (hash === "" || hash === "#") {
    hash = "#home";
  }

  const tabIndicator = document.getElementById(tabIndicatorID);
  if (!tabIndicator) {
    return;
  }

  const currentTab = document.querySelector(`[href="${hash}"]`).closest("li");
  const currentTabRect = currentTab.getBoundingClientRect();
  const navBarRect = tabIndicator.offsetParent.getBoundingClientRect();

  const tabLeft = currentTabRect.left - navBarRect.left;
  tabIndicator.style.width = `${currentTab.scrollWidth}px`;
  tabIndicator.style.left = `${tabLeft}px`;
}
