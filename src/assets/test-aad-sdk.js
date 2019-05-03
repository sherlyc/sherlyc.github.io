document.addEventListener('NavigationEnd', () => {
  setTimeout(() => {
    document.querySelectorAll('app-basic-ad-unit').forEach((node, index) => {
      if (index % 5 === 0) {
        node.classList.add('ad-container');
        node.innerHTML = 'Ad content dynamic';
      }
    });
  }, 100);
});
