if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('./scripts/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker is registered', swReg);
      return registration
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Push messaging is not supported');
  console.error("Unable to register service worker.", err);
}
