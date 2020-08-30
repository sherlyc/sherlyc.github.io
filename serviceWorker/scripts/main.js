if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker and Push is supported");

  navigator.serviceWorker
    .register("./scripts/service-worker.js")
    .then(function (registration) {
      console.log("Service Worker is registered", registration);
      return registration;
    })
    .then(function () {
      return new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (
          result
        ) {
          resolve(result);
        });
        if (permissionResult) {
          permissionResult.then(resolve, reject);
        }
      }).then(function (permissionResult) {
        if (permissionResult !== "granted") {
          throw new Error("We weren't granted permission.");
        }
      });
    })
    .catch(function (error) {
      console.error("Service Worker Error", error);
    });
} else {
  console.warn("Push messaging is not supported");
  console.error("Unable to register service worker.", err);
}
