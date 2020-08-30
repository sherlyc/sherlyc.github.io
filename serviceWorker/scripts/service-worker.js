console.log("service worker script is loaded");

(function askPermission() {
  console.log("asking permission");
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    })
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
    .then(function(permissionResult) {
      if (permissionResult !== "granted") {
        throw new Error("We weren't granted permission.");
      }
    });
}());
