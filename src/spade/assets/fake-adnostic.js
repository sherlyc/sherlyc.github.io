document.addEventListener("NavigationEnd", () => {
  setTimeout(() => {
    Array.from(document.querySelectorAll("app-sticky-container")).forEach(
      (node) => {
        node.style.height = "100%";
      }
    );

    Array.from(document.querySelectorAll("app-basic-ad-unit")).forEach(
      (node) => {
        node.classList.add("ad-container");
        node.innerHTML = "Ad";
        node.style.display = "block";
        node.style.backgroundColor = "#f7f7f7";
      }
    );
  }, 100);
});
