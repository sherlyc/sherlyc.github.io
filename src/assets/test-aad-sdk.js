document.addEventListener('NavigationEnd', () => {
  setTimeout(() => {
    document.querySelectorAll('app-basic-ad-unit').forEach((node, index) => {
      if (index % 5 === 0) {
        node.innerHTML = 'Ad content dynamic';
      }
    });
  }, 1000);
});
